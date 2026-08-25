import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { logOperationalOutcome } from "@/app/lib/server/operational-events";

describe("logOperationalOutcome", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
		vi.spyOn(console, "log").mockImplementation(() => {});
		vi.spyOn(console, "warn").mockImplementation(() => {});
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	it("writes successful outcomes as an allow-listed structured object", () => {
		logOperationalOutcome({
			route: "waitlist",
			outcome: "success",
			status: 200,
			requestId: "request-1",
		});

		expect(console.log).toHaveBeenCalledWith({
			event: "form_request_outcome",
			route: "waitlist",
			outcome: "success",
			status: 200,
			requestId: "request-1",
		});
		expect(Object.keys(vi.mocked(console.log).mock.calls[0]![0])).toEqual([
			"event",
			"route",
			"outcome",
			"status",
			"requestId",
		]);
	});

	it("uses warning and error severity for client and server failures", () => {
		logOperationalOutcome({
			route: "survey",
			outcome: "invalid_session",
			status: 400,
			requestId: "request-2",
		});
		logOperationalOutcome({
			route: "survey",
			outcome: "persistence_failed",
			status: 503,
			requestId: "request-3",
		});

		expect(console.warn).toHaveBeenCalledTimes(1);
		expect(console.error).toHaveBeenCalledTimes(1);
		expect(console.log).not.toHaveBeenCalled();
	});
});
