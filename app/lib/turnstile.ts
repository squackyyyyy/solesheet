export const TURNSTILE_ACTION = "waitlist_signup";
export const TURNSTILE_RESPONSE_FIELD = "cf-turnstile-response";
export const TURNSTILE_TOKEN_MAX_LENGTH = 2_048;
export const TURNSTILE_WIDGET_ID = "waitlist-turnstile";

export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
export const TURNSTILE_TEST_SECRET_KEY =
	"1x0000000000000000000000000000000AA";
export const TURNSTILE_TEST_REJECT_SECRET_KEY =
	"2x0000000000000000000000000000000AA";
export const TURNSTILE_TEST_SPENT_SECRET_KEY =
	"3x0000000000000000000000000000000AA";

const turnstileTestSecretKeys = new Set([
	TURNSTILE_TEST_SECRET_KEY,
	TURNSTILE_TEST_REJECT_SECRET_KEY,
	TURNSTILE_TEST_SPENT_SECRET_KEY,
]);

export function isTurnstileTestSecretKey(value: string) {
	return turnstileTestSecretKeys.has(value);
}

export function isLocalHostname(hostname: string) {
	return (
		hostname === "localhost" ||
		hostname === "127.0.0.1" ||
		hostname === "0.0.0.0" ||
		hostname === "::1" ||
		hostname.endsWith(".localhost")
	);
}
