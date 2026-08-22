import { beforeEach, describe, expect, it, vi } from "vitest";

const getCloudflareContextMock = vi.hoisted(() => vi.fn());

vi.mock("server-only", () => ({}));
vi.mock("@opennextjs/cloudflare", () => ({
	getCloudflareContext: getCloudflareContextMock,
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
		first: vi.fn(),
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

function jsonRequest(value: unknown, headers?: HeadersInit) {
	return new Request("http://localhost/api/waitlist", {
		method: "POST",
		headers: { "content-type": "application/json", ...headers },
		body: JSON.stringify(value),
	});
}

describe("POST /api/waitlist", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
		getCloudflareContextMock.mockReset();
	});

	it("stores a valid normalized request and returns only generic success", async () => {
		const database = createDatabase();
		getCloudflareContextMock.mockReturnValue({ env: { DB: database.db } });

		const response = await POST(
			jsonRequest({
				email: "  Seller@Example.COM  ",
				name: "  Sole Supply MNL  ",
				consent: true,
				website: "",
			}),
		);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ ok: true });
		expect(database.bindings[0]?.slice(1, 4)).toEqual([
			"Seller@Example.COM",
			"seller@example.com",
			"Sole Supply MNL",
		]);
	});

	it("binds an omitted name as null", async () => {
		const database = createDatabase();
		getCloudflareContextMock.mockReturnValue({ env: { DB: database.db } });

		const response = await POST(
			jsonRequest({ email: "seller@example.com", consent: true }),
		);

		expect(response.status).toBe(200);
		expect(database.bindings[0]?.[3]).toBeNull();
	});

	it("gives equivalent submissions the same response without an update path", async () => {
		const database = createDatabase();
		getCloudflareContextMock.mockReturnValue({ env: { DB: database.db } });

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

		expect(await first.json()).toEqual({ ok: true });
		expect(await duplicate.json()).toEqual({ ok: true });
		expect(database.queries).toHaveLength(2);
		for (const query of database.queries) {
			expect(query).toMatch(/ON CONFLICT\(email_normalized\) DO NOTHING/);
			expect(query).not.toMatch(/\bUPDATE\b/i);
		}
		expect(database.bindings[0]?.[2]).toBe(database.bindings[1]?.[2]);
	});

	it("accepts a filled honeypot without reading the database binding", async () => {
		const response = await POST(
			jsonRequest({
				email: "bot@example.com",
				consent: true,
				website: "https://spam.invalid",
			}),
		);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ ok: true });
		expect(getCloudflareContextMock).not.toHaveBeenCalled();
	});

	it("rejects malformed, oversized, unsupported, and unknown requests", async () => {
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

		expect(malformed.status).toBe(400);
		expect(oversized.status).toBe(413);
		expect(unsupported.status).toBe(415);
		expect(unknown.status).toBe(400);
		expect(getCloudflareContextMock).not.toHaveBeenCalled();
	});

	it("binds SQL-like name input instead of interpolating it into SQL", async () => {
		const database = createDatabase();
		getCloudflareContextMock.mockReturnValue({ env: { DB: database.db } });
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

	it("turns database constraint failures into a sanitized retryable response", async () => {
		const database = createDatabase(async () => {
			const error = new Error("constraint failed for seller@example.com");
			error.name = "D1ConstraintError";
			throw error;
		});
		getCloudflareContextMock.mockReturnValue({ env: { DB: database.db } });
		const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

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
		expect(logged).toContain("D1ConstraintError");
		expect(logged).not.toContain("seller@example.com");
		expect(logged).not.toContain("Private seller name");
		expect(logged).not.toContain("constraint failed");
	});
});
