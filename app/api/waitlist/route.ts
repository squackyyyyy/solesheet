import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
	logOperationalOutcome,
	type OperationalOutcome,
} from "@/app/lib/server/operational-events";
import { verifyTurnstileToken } from "@/app/lib/server/turnstile";
import { createSurveyToken } from "@/app/lib/server/survey-token";
import { persistWaitlistSignup } from "@/app/lib/server/waitlist-repository";
import {
	WAITLIST_REQUEST_MAX_BYTES,
	validateWaitlistSignup,
	type WaitlistField,
} from "@/app/lib/waitlist";

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

function jsonResponse(
	body: unknown,
	status: number,
	requestId: string,
	outcome: OperationalOutcome,
) {
	logOperationalOutcome({ route: "waitlist", outcome, status, requestId });
	return Response.json(body, {
		status,
		headers: { ...responseHeaders, "X-Request-ID": requestId },
	});
}

function invalidRequest(
	message: string,
	requestId: string,
	field?: WaitlistField,
) {
	return jsonResponse(
		{
			ok: false,
			error: {
				code: "invalid_request",
				message,
				...(field ? { field } : {}),
			},
		},
		400,
		requestId,
		"invalid_request",
	);
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
		if (totalBytes > WAITLIST_REQUEST_MAX_BYTES) {
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
	const requestId = crypto.randomUUID();
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
					message: "Send the waitlist request as JSON.",
				},
			},
			415,
			requestId,
			"invalid_request",
		);
	}

	const contentLength = request.headers.get("content-length");
	if (contentLength) {
		const declaredBytes = Number(contentLength);
		if (
			!Number.isSafeInteger(declaredBytes) ||
			declaredBytes < 0 ||
			declaredBytes > WAITLIST_REQUEST_MAX_BYTES
		) {
			return jsonResponse(
				{
					ok: false,
					error: {
						code: "request_too_large",
						message: "The waitlist request is too large.",
					},
				},
				413,
				requestId,
				"invalid_request",
			);
		}
	}

	let body: unknown;
	try {
		const encodedBody = await readBoundedBody(request);
		body = JSON.parse(encodedBody) as unknown;
	} catch (error) {
		if (error instanceof RequestBodyTooLargeError) {
			return jsonResponse(
				{
					ok: false,
					error: {
						code: "request_too_large",
						message: "The waitlist request is too large.",
					},
				},
				413,
				requestId,
				"invalid_request",
			);
		}

		return invalidRequest("The waitlist request could not be read.", requestId);
	}

	const validation = validateWaitlistSignup(body);
	if (!validation.ok) {
		return invalidRequest(validation.message, requestId, validation.field);
	}

	let env: CloudflareEnv;
	try {
		env = getCloudflareContext().env;
	} catch {
		return jsonResponse(
			{
				ok: false,
				error: {
					code: "service_unavailable",
					message: "We could not verify your signup. Please try again.",
				},
			},
			503,
			requestId,
			"configuration_unavailable",
		);
	}

	const verification = await verifyTurnstileToken({
		secretKey: env.TURNSTILE_SECRET_KEY,
		token: validation.value.turnstileToken,
		expectedHostname: new URL(request.url).hostname,
		requestId,
		clientIp: request.headers.get("CF-Connecting-IP"),
	});
	if (!verification.ok) {
		if (verification.kind === "rejected") {
			return jsonResponse(
				{
					ok: false,
					error: {
						code: "verification_failed",
						message: "We could not verify this attempt. Please try again.",
					},
				},
				400,
				requestId,
				"verification_rejected",
			);
		}

		return jsonResponse(
			{
				ok: false,
				error: {
					code: "service_unavailable",
					message: "We could not verify your signup. Please try again.",
				},
			},
			503,
			requestId,
			"verification_unavailable",
		);
	}

	let signupId: string;
	try {
		signupId = await persistWaitlistSignup(env.DB, validation.value.signup);
	} catch {
		return jsonResponse(
			{
				ok: false,
				error: {
					code: "service_unavailable",
					message: "We could not save your signup. Please try again.",
				},
			},
			503,
			requestId,
			"persistence_failed",
		);
	}

	try {
		const surveyToken = await createSurveyToken({
			signupId,
			secret: env.SURVEY_SUBMISSION_SECRET,
		});
		return jsonResponse({ ok: true, surveyToken }, 200, requestId, "success");
	} catch {
		return jsonResponse(
			{
				ok: false,
				error: {
					code: "service_unavailable",
					message: "We could not continue your signup. Please try again.",
				},
			},
			503,
			requestId,
			"continuation_unavailable",
		);
	}
}
