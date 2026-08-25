import { beforeEach, describe, expect, it, vi } from "vitest";

const getCloudflareContextMock = vi.hoisted(() => vi.fn());
const verifyTurnstileTokenMock = vi.hoisted(() => vi.fn());
const createSurveyTokenMock = vi.hoisted(() => vi.fn());

vi.mock("server-only", () => ({}));
vi.mock("@opennextjs/cloudflare", () => ({
	getCloudflareContext: getCloudflareContextMock,
}));
vi.mock("@/app/lib/server/turnstile", () => ({
	verifyTurnstileToken: verifyTurnstileTokenMock,
}));
vi.mock("@/app/lib/server/survey-token", () => ({
	createSurveyToken: createSurveyTokenMock,
}));

import { POST } from "@/app/api/waitlist/route";
import { WAITLIST_REQUEST_MAX_BYTES } from "@/app/lib/waitlist";

function createDatabase(run: () => Promise<D1Result> = async () => ({
	success: true,
	results: [],
	meta: {
		duration: 0,
		size_after: 0,
		rows_read: 0,
		rows_written: 1,
		last_row_id: 0,
		changed_db: true,
		changes: 1,
	},
})) {
	const queries: string[] = [];
	const bindings: unknown[][] = [];
	const statement = {
		bind: vi.fn((...values: unknown[]) => {
			bindings.push(values);
			return statement;
		}),
		run: vi.fn(run),
		first: vi.fn(async () => ({
			id: "00000000-0000-4000-8000-000000000001",
		})),
		all: vi.fn(),
		raw: vi.fn(),
	} as D1PreparedStatement;
	const db = {
		prepare: vi.fn((query: string) => {
			queries.push(query);
			return statement;
		}),
		batch: vi.fn(),
		exec: vi.fn(),
		withSession: vi.fn(),
		dump: vi.fn(),
	} as D1Database;

	return { bindings, db, queries, statement };
}

function jsonRequest(
	value: unknown,
	headers?: HeadersInit,
	includeToken = true,
) {
	const body =
		includeToken &&
		typeof value === "object" &&
		value !== null &&
		!Array.isArray(value)
			? { turnstileToken: "private-test-token", ...value }
			: value;
	return new Request("http://localhost/api/waitlist", {
		method: "POST",
		headers: { "content-type": "application/json", ...headers },
		body: JSON.stringify(body),
	});
}

function useDatabase(database: D1Database) {
	getCloudflareContextMock.mockReturnValue({
			env: {
			DB: database,
			TURNSTILE_SECRET_KEY: "private-server-secret",
			SURVEY_SUBMISSION_SECRET: "private-survey-signing-secret-value",
		},
	});
}

describe("POST /api/waitlist", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
		vi.spyOn(console, "log").mockImplementation(() => {});
		vi.spyOn(console, "warn").mockImplementation(() => {});
		vi.spyOn(console, "error").mockImplementation(() => {});
		getCloudflareContextMock.mockReset();
		verifyTurnstileTokenMock.mockReset();
		verifyTurnstileTokenMock.mockResolvedValue({ ok: true });
		createSurveyTokenMock.mockReset();
		createSurveyTokenMock.mockResolvedValue("signed-survey-token");
	});

	it("verifies before storing a normalized request and returns generic success", async () => {
		const database = createDatabase();
		useDatabase(database.db);

		const response = await POST(
			jsonRequest({
				email: "  Seller@Example.COM  ",
				name: "  Sole Supply MNL  ",
				consent: true,
			}),
		);

		expect(response.status).toBe(200);
		expect(response.headers.get("X-Request-ID")).toMatch(/^[0-9a-f-]{36}$/u);
		expect(await response.json()).toEqual({
			ok: true,
			surveyToken: "signed-survey-token",
		});
		expect(verifyTurnstileTokenMock).toHaveBeenCalledWith(
			expect.objectContaining({
				secretKey: "private-server-secret",
				token: "private-test-token",
				expectedHostname: "localhost",
			}),
		);
		expect(verifyTurnstileTokenMock.mock.invocationCallOrder[0]).toBeLessThan(
			vi.mocked(database.db.prepare).mock.invocationCallOrder[0]!,
		);
		expect(database.bindings[0]?.slice(1, 4)).toEqual([
			"Seller@Example.COM",
			"seller@example.com",
			"Sole Supply MNL",
		]);
		expect(createSurveyTokenMock).toHaveBeenCalledWith({
			signupId: "00000000-0000-4000-8000-000000000001",
			secret: "private-survey-signing-secret-value",
		});
		expect(console.log).toHaveBeenCalledWith({
			event: "form_request_outcome",
			route: "waitlist",
			outcome: "success",
			status: 200,
			requestId: response.headers.get("X-Request-ID"),
		});
		expect(console.warn).not.toHaveBeenCalled();
		expect(console.error).not.toHaveBeenCalled();
	});

	it("binds an omitted name as null", async () => {
		const database = createDatabase();
		useDatabase(database.db);

		const response = await POST(
			jsonRequest({ email: "seller@example.com", consent: true }),
		);

		expect(response.status).toBe(200);
		expect(database.bindings[0]?.[3]).toBeNull();
	});

	it("gives duplicate submissions the same private response without an update path", async () => {
		const database = createDatabase();
		useDatabase(database.db);

		const first = await POST(
			jsonRequest({
				email: "Seller@Example.com",
				name: "Original name",
				consent: true,
			}),
		);
		const duplicate = await POST(
			jsonRequest({
				email: " seller@example.COM ",
				name: "Replacement attempt",
				consent: true,
			}),
		);

		expect(await first.json()).toEqual({
			ok: true,
			surveyToken: "signed-survey-token",
		});
		expect(await duplicate.json()).toEqual({
			ok: true,
			surveyToken: "signed-survey-token",
		});
		expect(verifyTurnstileTokenMock).toHaveBeenCalledTimes(2);
		for (const query of database.queries.filter((query) => /INSERT/i.test(query))) {
			expect(query).toMatch(/ON CONFLICT\(email_normalized\) DO NOTHING/);
			expect(query).not.toMatch(/\bUPDATE\b/i);
		}
		expect(database.bindings[0]?.[2]).toBe(database.bindings[2]?.[2]);
		expect(createSurveyTokenMock).toHaveBeenCalledTimes(2);
	});

	it("rejects failed verification before D1 and logs no submitted content", async () => {
		const database = createDatabase();
		useDatabase(database.db);
		verifyTurnstileTokenMock.mockResolvedValue({
			ok: false,
			kind: "rejected",
			reason: "invalid_token",
		});
		const consoleWarn = vi.mocked(console.warn);

		const response = await POST(
			jsonRequest({
				email: "private@example.com",
				name: "Private seller",
				consent: true,
			}),
		);
		const logged = JSON.stringify(consoleWarn.mock.calls);

		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({
			ok: false,
			error: {
				code: "verification_failed",
				message: "We could not verify this attempt. Please try again.",
			},
		});
		expect(database.db.prepare).not.toHaveBeenCalled();
		expect(logged).toContain("verification_rejected");
		expect(logged).not.toContain("private@example.com");
		expect(logged).not.toContain("Private seller");
		expect(logged).not.toContain("private-test-token");
		expect(logged).not.toContain("private-server-secret");
		expect(consoleWarn).toHaveBeenCalledTimes(1);
		expect(response.headers.get("X-Request-ID")).toBe(
			vi.mocked(consoleWarn).mock.calls[0]?.[0].requestId,
		);
	});

	it("fails closed when verification is unavailable without touching D1", async () => {
		const database = createDatabase();
		useDatabase(database.db);
		verifyTurnstileTokenMock.mockResolvedValue({
			ok: false,
			kind: "unavailable",
			reason: "provider_failure",
		});
		const response = await POST(
			jsonRequest({ email: "seller@example.com", consent: true }),
		);

		expect(response.status).toBe(503);
		expect(await response.json()).toEqual({
			ok: false,
			error: {
				code: "service_unavailable",
				message: "We could not verify your signup. Please try again.",
			},
		});
		expect(database.db.prepare).not.toHaveBeenCalled();
		expect(console.error).toHaveBeenCalledWith(
			expect.objectContaining({
				route: "waitlist",
				outcome: "verification_unavailable",
				status: 503,
			}),
		);
	});

	it("fails safely when the Worker environment is unavailable", async () => {
		getCloudflareContextMock.mockImplementation(() => {
			throw new Error("DB binding missing for private@example.com");
		});

		const response = await POST(
			jsonRequest({ email: "private@example.com", consent: true }),
		);
		const logged = JSON.stringify(vi.mocked(console.error).mock.calls);

		expect(response.status).toBe(503);
		expect(console.error).toHaveBeenCalledWith(
			expect.objectContaining({
				route: "waitlist",
				outcome: "configuration_unavailable",
				status: 503,
			}),
		);
		expect(logged).not.toContain("private@example.com");
		expect(logged).not.toContain("DB binding missing");
	});

	it("rejects malformed, oversized, unsupported, unknown, and missing-token requests before verification", async () => {
		const malformed = await POST(
			new Request("http://localhost/api/waitlist", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: "{not json",
			}),
		);
		const oversized = await POST(
			new Request("http://localhost/api/waitlist", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: `"${"a".repeat(WAITLIST_REQUEST_MAX_BYTES)}"`,
			}),
		);
		const unsupported = await POST(
			new Request("http://localhost/api/waitlist", {
				method: "POST",
				headers: { "content-type": "text/plain" },
				body: "hello",
			}),
		);
		const unknown = await POST(
			jsonRequest({
				email: "seller@example.com",
				consent: true,
				isAdmin: true,
			}),
		);
		const missingToken = await POST(
			jsonRequest(
				{ email: "seller@example.com", consent: true },
				undefined,
				false,
			),
		);

		expect(malformed.status).toBe(400);
		expect(oversized.status).toBe(413);
		expect(unsupported.status).toBe(415);
		expect(unknown.status).toBe(400);
		expect(missingToken.status).toBe(400);
		expect(verifyTurnstileTokenMock).not.toHaveBeenCalled();
		expect(getCloudflareContextMock).not.toHaveBeenCalled();
		expect(console.warn).toHaveBeenCalledTimes(5);
		expect(console.log).not.toHaveBeenCalled();
		expect(console.error).not.toHaveBeenCalled();
	});

	it("binds SQL-like name input instead of interpolating it into SQL", async () => {
		const database = createDatabase();
		useDatabase(database.db);
		const sqlLikeName = "Robert'); DROP TABLE waitlist_signups; --";

		const response = await POST(
			jsonRequest({
				email: "seller@example.com",
				name: sqlLikeName,
				consent: true,
			}),
		);

		expect(response.status).toBe(200);
		expect(database.bindings[0]).toContain(sqlLikeName);
		expect(database.queries[0]).not.toContain(sqlLikeName);
	});

	it("turns database failures into a sanitized retryable response", async () => {
		const database = createDatabase(async () => {
			const error = new Error("constraint failed for seller@example.com");
			error.name = "D1ConstraintError";
			throw error;
		});
		useDatabase(database.db);
		const consoleError = vi.mocked(console.error);

		const response = await POST(
			jsonRequest({
				email: "seller@example.com",
				name: "Private seller name",
				consent: true,
			}),
		);
		const logged = JSON.stringify(consoleError.mock.calls);

		expect(response.status).toBe(503);
		expect(await response.json()).toEqual({
			ok: false,
			error: {
				code: "service_unavailable",
				message: "We could not save your signup. Please try again.",
			},
		});
		expect(logged).toContain("persistence_failed");
		expect(logged).not.toContain("D1ConstraintError");
		expect(logged).not.toContain("seller@example.com");
		expect(logged).not.toContain("Private seller name");
		expect(logged).not.toContain("constraint failed");
	});

	it("fails closed when the survey token cannot be issued", async () => {
		const database = createDatabase();
		useDatabase(database.db);
		createSurveyTokenMock.mockRejectedValue(
			new Error("secret missing private-survey-signing-secret-value"),
		);
		const consoleError = vi.mocked(console.error);

		const response = await POST(
			jsonRequest({ email: "seller@example.com", consent: true }),
		);
		const logged = JSON.stringify(consoleError.mock.calls);

		expect(response.status).toBe(503);
		expect(await response.json()).toEqual({
			ok: false,
			error: {
				code: "service_unavailable",
				message: "We could not continue your signup. Please try again.",
			},
		});
		expect(logged).toContain("continuation_unavailable");
		expect(logged).not.toContain("private-survey-signing-secret-value");
	});
});
