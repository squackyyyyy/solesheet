import { beforeEach, describe, expect, it, vi } from "vitest";

const getCloudflareContextMock = vi.hoisted(() => vi.fn());
const verifySurveyTokenMock = vi.hoisted(() => vi.fn());
const persistSurveyResponseMock = vi.hoisted(() => vi.fn());

vi.mock("server-only", () => ({}));
vi.mock("@opennextjs/cloudflare", () => ({
	getCloudflareContext: getCloudflareContextMock,
}));
vi.mock("@/app/lib/server/survey-token", () => ({
	verifySurveyToken: verifySurveyTokenMock,
}));
vi.mock("@/app/lib/server/survey-repository", () => ({
	persistSurveyResponse: persistSurveyResponseMock,
}));

import { POST } from "@/app/api/survey/route";
import { SURVEY_REQUEST_MAX_BYTES } from "@/app/lib/survey";

function jsonRequest(value: unknown, headers?: HeadersInit) {
	return new Request("http://localhost/api/survey", {
		method: "POST",
		headers: { "content-type": "application/json", ...headers },
		body: JSON.stringify(value),
	});
}

const requiredCorePayload = {
	phoneType: "android",
	activeInventoryRange: "21_50",
	likelyPlan: "founding_starter_65",
	priorityFeature: "profit_tracking",
} as const;

describe("POST /api/survey", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
		vi.spyOn(console, "log").mockImplementation(() => {});
		vi.spyOn(console, "warn").mockImplementation(() => {});
		vi.spyOn(console, "error").mockImplementation(() => {});
		getCloudflareContextMock.mockReset();
		getCloudflareContextMock.mockReturnValue({
			env: {
				DB: { prepare: vi.fn() },
				SURVEY_SUBMISSION_SECRET: "private-survey-signing-secret-value",
			},
		});
		verifySurveyTokenMock.mockReset();
		verifySurveyTokenMock.mockResolvedValue({ ok: true, signupId: "signup-1" });
		persistSurveyResponseMock.mockReset();
		persistSurveyResponseMock.mockResolvedValue("created");
	});

	it("verifies the token before storing normalized core and optional answers", async () => {
		const response = await POST(
			jsonRequest({
				surveyToken: "private-survey-token",
				...requiredCorePayload,
				inventoryMethod: "other",
				inventoryMethodOther: "  POS export  ",
				salesChannels: ["instagram", "physical_store"],
			}),
		);

		expect(response.status).toBe(200);
		expect(response.headers.get("X-Request-ID")).toMatch(/^[0-9a-f-]{36}$/u);
		expect(await response.json()).toEqual({ ok: true });
		expect(verifySurveyTokenMock).toHaveBeenCalledWith({
			token: "private-survey-token",
			secret: "private-survey-signing-secret-value",
		});
		expect(verifySurveyTokenMock.mock.invocationCallOrder[0]).toBeLessThan(
			persistSurveyResponseMock.mock.invocationCallOrder[0]!,
		);
		expect(persistSurveyResponseMock).toHaveBeenCalledWith(
			expect.anything(),
			"signup-1",
			{
				...requiredCorePayload,
				inventoryMethod: "other",
				inventoryMethodOther: "POS export",
				salesChannels: ["instagram", "physical_store"],
			},
		);
		expect(console.log).toHaveBeenCalledWith({
			event: "form_request_outcome",
			route: "survey",
			outcome: "success",
			status: 200,
			requestId: response.headers.get("X-Request-ID"),
		});
		expect(console.warn).not.toHaveBeenCalled();
		expect(console.error).not.toHaveBeenCalled();
	});

	it("returns the same success for an idempotent existing response", async () => {
		persistSurveyResponseMock.mockResolvedValue("existing");
		const response = await POST(
			jsonRequest({ surveyToken: "token", ...requiredCorePayload }),
		);
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ ok: true });
	});

	it("accepts the required core when optional inventory method is omitted", async () => {
		const response = await POST(
			jsonRequest({ surveyToken: "token", ...requiredCorePayload }),
		);
		expect(response.status).toBe(200);
		expect(persistSurveyResponseMock).toHaveBeenCalledWith(
			expect.anything(),
			"signup-1",
			requiredCorePayload,
		);
	});

	it("rejects a missing core answer before token verification or D1", async () => {
		const response = await POST(
			jsonRequest({
				surveyToken: "token",
				...requiredCorePayload,
				likelyPlan: undefined,
			}),
		);

		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({
			ok: false,
			error: {
				code: "invalid_request",
				message: "Complete the four required survey questions.",
			},
		});
		expect(verifySurveyTokenMock).not.toHaveBeenCalled();
		expect(persistSurveyResponseMock).not.toHaveBeenCalled();
		expect(console.warn).toHaveBeenCalledTimes(1);
	});

	it("rejects malformed, oversized, unsupported, and invalid answers before token verification", async () => {
		const responses = await Promise.all([
			POST(
				new Request("http://localhost/api/survey", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: "{not json",
				}),
			),
			POST(
				new Request("http://localhost/api/survey", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: `"${"x".repeat(SURVEY_REQUEST_MAX_BYTES)}"`,
				}),
			),
			POST(
				new Request("http://localhost/api/survey", {
					method: "POST",
					headers: { "content-type": "text/plain" },
					body: "hello",
				}),
			),
			POST(jsonRequest({ surveyToken: "token", phoneType: "windows" })),
			POST(
				jsonRequest({
					surveyToken: "token",
					...requiredCorePayload,
					salesChannels: ["instagram", "instagram"],
				}),
			),
			POST(
				jsonRequest({
					surveyToken: "token",
					...requiredCorePayload,
					inventoryMethodOther: "Spreadsheet with custom columns",
				}),
			),
		]);

		expect(responses.map((response) => response.status)).toEqual([
			400, 413, 415, 400, 400, 400,
		]);
		expect(verifySurveyTokenMock).not.toHaveBeenCalled();
		expect(persistSurveyResponseMock).not.toHaveBeenCalled();
		expect(console.warn).toHaveBeenCalledTimes(6);
	});

	it("rejects an invalid session before D1 and logs no submitted content", async () => {
		verifySurveyTokenMock.mockResolvedValue({
			ok: false,
			reason: "invalid_signature",
		});
		const consoleWarn = vi.mocked(console.warn);

		const response = await POST(
			jsonRequest({
				surveyToken: "private-survey-token",
				...requiredCorePayload,
				priorityFeature: "other",
				priorityOther: "Private product request",
			}),
		);
		const logged = JSON.stringify(consoleWarn.mock.calls);

		expect(response.status).toBe(400);
		expect(persistSurveyResponseMock).not.toHaveBeenCalled();
		expect(logged).toContain("invalid_session");
		expect(logged).not.toContain("private-survey-token");
		expect(logged).not.toContain("Private product request");
		expect(consoleWarn).toHaveBeenCalledTimes(1);
		expect(response.headers.get("X-Request-ID")).toBe(
			vi.mocked(consoleWarn).mock.calls[0]?.[0].requestId,
		);
	});

	it("fails safely for secret configuration and persistence errors", async () => {
		const consoleWarn = vi.mocked(console.warn);
		const consoleError = vi.mocked(console.error);
		verifySurveyTokenMock.mockResolvedValueOnce({
			ok: false,
			reason: "invalid_secret",
		});
		const configurationResponse = await POST(
			jsonRequest({
				surveyToken: "private-survey-token",
				...requiredCorePayload,
			}),
		);

		verifySurveyTokenMock.mockResolvedValueOnce({ ok: true, signupId: "signup-1" });
		persistSurveyResponseMock.mockRejectedValueOnce(
			new Error("D1 failed with Private answer and private-survey-token"),
		);
		const persistenceResponse = await POST(
			jsonRequest({
				surveyToken: "private-survey-token",
				...requiredCorePayload,
				priorityFeature: "other",
				priorityOther: "Private answer",
			}),
		);
		const logged = JSON.stringify([
			...consoleWarn.mock.calls,
			...consoleError.mock.calls,
		]);

		expect(configurationResponse.status).toBe(503);
		expect(persistenceResponse.status).toBe(503);
		expect(logged).toContain("configuration_unavailable");
		expect(logged).toContain("persistence_failed");
		expect(logged).not.toContain("Private answer");
		expect(logged).not.toContain("private-survey-token");
	});

	it("fails safely when the Worker environment is unavailable", async () => {
		getCloudflareContextMock.mockImplementation(() => {
			throw new Error("DB binding missing with private-survey-token");
		});

		const response = await POST(
			jsonRequest({
				surveyToken: "private-survey-token",
				...requiredCorePayload,
			}),
		);
		const logged = JSON.stringify(vi.mocked(console.error).mock.calls);

		expect(response.status).toBe(503);
		expect(console.error).toHaveBeenCalledWith(
			expect.objectContaining({
				route: "survey",
				outcome: "configuration_unavailable",
				status: 503,
			}),
		);
		expect(logged).not.toContain("private-survey-token");
		expect(logged).not.toContain("DB binding missing");
	});
});
