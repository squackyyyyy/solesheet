import { getCloudflareContext } from "@opennextjs/cloudflare";
import { persistSurveyResponse } from "@/app/lib/server/survey-repository";
import { verifySurveyToken } from "@/app/lib/server/survey-token";
import {
	SURVEY_REQUEST_MAX_BYTES,
	validateSurveySubmission,
} from "@/app/lib/survey";

const responseHeaders = {
	"Cache-Control": "no-store",
	"Content-Type": "application/json; charset=utf-8",
	"X-Content-Type-Options": "nosniff",
};

class RequestBodyTooLargeError extends Error {
	constructor() {
		super("Request body exceeds the supported size.");
		this.name = "RequestBodyTooLargeError";
	}
}

function jsonResponse(body: unknown, status: number) {
	return Response.json(body, { status, headers: responseHeaders });
}

async function readBoundedBody(request: Request) {
	if (!request.body) return "";

	const reader = request.body.getReader();
	const chunks: Uint8Array[] = [];
	let totalBytes = 0;

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		totalBytes += value.byteLength;
		if (totalBytes > SURVEY_REQUEST_MAX_BYTES) {
			await reader.cancel();
			throw new RequestBodyTooLargeError();
		}
		chunks.push(value);
	}

	const body = new Uint8Array(totalBytes);
	let offset = 0;
	for (const chunk of chunks) {
		body.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return new TextDecoder().decode(body);
}

export async function POST(request: Request) {
	const contentType = request.headers
		.get("content-type")
		?.split(";", 1)[0]
		.trim()
		.toLowerCase();
	if (contentType !== "application/json") {
		return jsonResponse(
			{
				ok: false,
				error: {
					code: "unsupported_media_type",
					message: "Send the survey submission as JSON.",
				},
			},
			415,
		);
	}

	const contentLength = request.headers.get("content-length");
	if (contentLength) {
		const declaredBytes = Number(contentLength);
		if (
			!Number.isSafeInteger(declaredBytes) ||
			declaredBytes < 0 ||
			declaredBytes > SURVEY_REQUEST_MAX_BYTES
		) {
			return jsonResponse(
				{
					ok: false,
					error: {
						code: "request_too_large",
						message: "The survey submission is too large.",
					},
				},
				413,
			);
		}
	}

	let body: unknown;
	try {
		body = JSON.parse(await readBoundedBody(request)) as unknown;
	} catch (error) {
		if (error instanceof RequestBodyTooLargeError) {
			return jsonResponse(
				{
					ok: false,
					error: {
						code: "request_too_large",
						message: "The survey submission is too large.",
					},
				},
				413,
			);
		}
		return jsonResponse(
			{
				ok: false,
				error: {
					code: "invalid_request",
					message: "The survey submission could not be read.",
				},
			},
			400,
		);
	}

	const validation = validateSurveySubmission(body);
	if (!validation.ok) {
		return jsonResponse(
			{
				ok: false,
				error: { code: "invalid_request", message: validation.message },
			},
			400,
		);
	}

	const requestId = crypto.randomUUID();
	let env: CloudflareEnv;
	try {
		env = getCloudflareContext().env;
	} catch {
		console.error(
			JSON.stringify({
				event: "survey_submission_unavailable",
				requestId,
				outcome: "configuration",
			}),
		);
		return jsonResponse(
			{
				ok: false,
				error: {
					code: "service_unavailable",
					message: "We could not submit your survey. Please try again.",
				},
			},
			503,
		);
	}

	const token = await verifySurveyToken({
		token: validation.value.surveyToken,
		secret: env.SURVEY_SUBMISSION_SECRET,
	});
	if (!token.ok) {
		const unavailable = token.reason === "invalid_secret";
		console.warn(
			JSON.stringify({
				event: unavailable
					? "survey_submission_unavailable"
					: "survey_submission_rejected",
				requestId,
				outcome: unavailable ? "configuration" : "invalid_session",
			}),
		);
		return jsonResponse(
			{
				ok: false,
				error: {
					code: unavailable ? "service_unavailable" : "invalid_session",
					message: unavailable
						? "We could not submit your survey. Please try again."
						: "Your survey session is no longer valid. Please rejoin the waitlist and try again.",
				},
			},
			unavailable ? 503 : 400,
		);
	}

	try {
		await persistSurveyResponse(env.DB, token.signupId, validation.value.answers);
		return jsonResponse({ ok: true }, 200);
	} catch (error) {
		console.error(
			JSON.stringify({
				event: "survey_persistence_failed",
				requestId,
				errorName: error instanceof Error ? error.name : "UnknownError",
			}),
		);
		return jsonResponse(
			{
				ok: false,
				error: {
					code: "service_unavailable",
					message: "We could not submit your survey. Please try again.",
				},
			},
			503,
		);
	}
}
