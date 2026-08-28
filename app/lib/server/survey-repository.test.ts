import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { persistSurveyResponse } from "@/app/lib/server/survey-repository";

type RecordedStatement = {
	query: string;
	bindings: unknown[];
	statement: D1PreparedStatement;
};

function createDatabase({
	exists = [false],
	batch = async () => [],
}: {
	exists?: boolean[];
	batch?: (statements: D1PreparedStatement[]) => Promise<D1Result[]>;
} = {}) {
	const existenceResults = [...exists];
	const recorded: RecordedStatement[] = [];
	const db = {
		prepare: vi.fn((query: string) => {
			const record = {} as RecordedStatement;
			const statement = {
				bind: vi.fn((...bindings: unknown[]) => {
					record.bindings = bindings;
					return statement;
				}),
				first: vi.fn(async () =>
					existenceResults.shift()
						? { signup_id: "signup-1" }
						: null,
				),
				run: vi.fn(),
				all: vi.fn(),
				raw: vi.fn(),
			} as D1PreparedStatement;
			record.query = query;
			record.bindings = [];
			record.statement = statement;
			recorded.push(record);
			return statement;
		}),
		batch: vi.fn(batch),
		exec: vi.fn(),
		withSession: vi.fn(),
		dump: vi.fn(),
	} as D1Database;

	return { db, recorded };
}

describe("persistSurveyResponse", () => {
	beforeEach(() => vi.restoreAllMocks());

	it("stores a zero-answer response and completion timestamp in one batch", async () => {
		const database = createDatabase();
		await expect(
			persistSurveyResponse(database.db, "signup-1", {}, {
				now: () => new Date("2026-08-24T01:02:03.000Z"),
			}),
		).resolves.toBe("created");

		expect(database.db.batch).toHaveBeenCalledOnce();
		const batch = vi.mocked(database.db.batch).mock.calls[0]?.[0] ?? [];
		expect(batch).toHaveLength(2);
		const insert = database.recorded.find((record) =>
			/INSERT INTO survey_responses/i.test(record.query),
		);
		expect(insert?.bindings).toEqual([
			"signup-1",
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			"2026-08-24T01:02:03.000Z",
			"2026-08-24T01:02:03.000Z",
		]);
	});

	it("stores an optional additional comment as a bound response value", async () => {
		const database = createDatabase();
		await persistSurveyResponse(
			database.db,
			"signup-1",
			{ additionalComments: "Please add supplier tags." },
			{ now: () => new Date("2026-08-24T01:02:03.000Z") },
		);

		const insert = database.recorded.find((record) =>
			/INSERT INTO survey_responses/i.test(record.query),
		);
		expect(insert?.query).toContain("additional_comments");
		expect(insert?.bindings[12]).toBe("Please add supplier tags.");
	});

	it("stores partial answers and each selected channel as bound values", async () => {
		const database = createDatabase();
		await persistSurveyResponse(
			database.db,
			"signup-1",
			{
				phoneType: "android",
				priorityFeature: "profit_tracking",
				salesChannels: ["instagram", "physical_store"],
			},
			{ now: () => new Date("2026-08-24T01:02:03.000Z") },
		);

		const channelRows = database.recorded.filter((record) =>
			/INSERT INTO survey_sales_channels/i.test(record.query),
		);
		expect(channelRows.map((row) => row.bindings)).toEqual([
			["signup-1", "instagram"],
			["signup-1", "physical_store"],
		]);
		expect(vi.mocked(database.db.batch).mock.calls[0]?.[0]).toHaveLength(4);
	});

	it("returns existing without writing or overwriting answers", async () => {
		const database = createDatabase({ exists: [true] });

		await expect(
			persistSurveyResponse(database.db, "signup-1", {
				phoneType: "iphone",
				additionalComments: "Do not overwrite the first response.",
			}),
		).resolves.toBe("existing");
		expect(database.db.batch).not.toHaveBeenCalled();
		expect(
			database.recorded.some((record) => /\bUPDATE\b/i.test(record.query)),
		).toBe(false);
	});

	it("treats a concurrent uniqueness race as idempotent success", async () => {
		const database = createDatabase({
			exists: [false, true],
			batch: async () => {
				const error = new Error("unique constraint");
				error.name = "D1ConstraintError";
				throw error;
			},
		});

		await expect(
			persistSurveyResponse(database.db, "signup-1", {
				phoneType: "android",
			}),
		).resolves.toBe("existing");
	});

	it("propagates a failed batch when no response exists after rollback", async () => {
		const database = createDatabase({
			exists: [false, false],
			batch: async () => {
				throw new Error("foreign key or channel failure");
			},
		});

		await expect(
			persistSurveyResponse(database.db, "missing-signup", {
				salesChannels: ["instagram"],
			}),
		).rejects.toThrow(/foreign key or channel failure/i);
	});
});
