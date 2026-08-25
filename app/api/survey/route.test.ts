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
	});

	it("rejects an invalid session before D1 and logs no submitted content", async () => {
		verifySurveyTokenMock.mockResolvedValue({
			ok: false,
			reason: "invalid_signature",
		});
		const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});

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
		expect(logged).toContain("survey_submission_rejected");
		expect(logged).not.toContain("private-survey-token");
		expect(logged).not.toContain("Private product request");
	});

	it("fails safely for secret configuration and persistence errors", async () => {
		const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
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
		expect(logged).toContain("survey_submission_unavailable");
		expect(logged).toContain("survey_persistence_failed");
		expect(logged).not.toContain("Private answer");
		expect(logged).not.toContain("private-survey-token");
	});
});
