import "server-only";

export type OperationalRoute = "survey" | "waitlist";

export type OperationalOutcome =
	| "configuration_unavailable"
	| "continuation_unavailable"
	| "invalid_request"
	| "invalid_session"
	| "persistence_failed"
	| "success"
	| "verification_rejected"
	| "verification_unavailable";

type OperationalEventInput = {
	route: OperationalRoute;
	outcome: OperationalOutcome;
	status: number;
	requestId: string;
};

export function logOperationalOutcome({
	route,
	outcome,
	status,
	requestId,
}: OperationalEventInput) {
	const event = {
		event: "form_request_outcome",
		route,
		outcome,
		status,
		requestId,
	} as const;

	if (status >= 500) {
		console.error(event);
		return;
	}
	if (status >= 400) {
		console.warn(event);
		return;
	}
	console.log(event);
}
