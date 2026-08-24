import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { privacyNotice } from "@/app/lib/privacy";
import { persistWaitlistSignup } from "@/app/lib/server/waitlist-repository";

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
	const db = {
		prepare: vi.fn((query: string) => {
			queries.push(query);
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
			return statement;
		}),
		batch: vi.fn(),
		exec: vi.fn(),
		withSession: vi.fn(),
		dump: vi.fn(),
	} as D1Database;

	return { bindings, db, queries };
}

describe("persistWaitlistSignup", () => {
	beforeEach(() => vi.restoreAllMocks());

	it("binds generated identity, timestamps, policy version, and normalized fields", async () => {
		const database = createDatabase();
		await expect(persistWaitlistSignup(
			database.db,
			{
				email: "Seller@Example.com",
				emailNormalized: "seller@example.com",
				name: null,
			},
			{
				createId: () => "00000000-0000-4000-8000-000000000001",
				now: () => new Date("2026-08-23T00:00:00.000Z"),
			},
		)).resolves.toBe("00000000-0000-4000-8000-000000000001");

		expect(database.bindings).toEqual([
			[
				"00000000-0000-4000-8000-000000000001",
				"Seller@Example.com",
				"seller@example.com",
				null,
				"2026-08-23T00:00:00.000Z",
				privacyNotice.version,
				"2026-08-23T00:00:00.000Z",
				"2026-08-23T00:00:00.000Z",
			],
			["seller@example.com"],
		]);
		expect(database.queries[0]).toMatch(
			/ON CONFLICT\(email_normalized\) DO NOTHING/,
		);
		expect(database.queries[0]).not.toMatch(/\bUPDATE\b/i);
		expect(database.queries[1]).toMatch(/SELECT id/i);
	});

	it("fails when the inserted or duplicate signup cannot be resolved", async () => {
		const database = createDatabase();
		vi.mocked(database.db.prepare).mockImplementation(() => {
			const statement = {
				bind: vi.fn(() => statement),
				run: vi.fn(async () => ({ success: true } as D1Result)),
				first: vi.fn(async () => null),
				all: vi.fn(),
				raw: vi.fn(),
			} as D1PreparedStatement;
			return statement;
		});

		await expect(
			persistWaitlistSignup(database.db, {
				email: "seller@example.com",
				emailNormalized: "seller@example.com",
				name: null,
			}),
		).rejects.toThrow(/could not be resolved/i);
	});

	it("propagates a database constraint failure to the Route Handler", async () => {
		const database = createDatabase(async () => {
			const error = new Error("constraint failed");
			error.name = "D1ConstraintError";
			throw error;
		});

		await expect(
			persistWaitlistSignup(database.db, {
				email: "seller@example.com",
				emailNormalized: "seller@example.com",
				name: null,
			}),
		).rejects.toMatchObject({ name: "D1ConstraintError" });
	});
});
