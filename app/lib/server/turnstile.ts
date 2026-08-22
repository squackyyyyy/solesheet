import "server-only";

import {
	isLocalHostname,
	isTurnstileTestSecretKey,
	TURNSTILE_ACTION,
	TURNSTILE_TOKEN_MAX_LENGTH,
} from "@/app/lib/turnstile";

const SITEVERIFY_URL =
	"https://challenges.cloudflare.com/turnstile/v0/siteverify";
const SITEVERIFY_TIMEOUT_MS = 8_000;
const CLIENT_IP_MAX_LENGTH = 64;

type SiteverifyResponse = {
	success: boolean;
	action?: string;
	hostname?: string;
};

export type TurnstileVerificationResult =
	| { ok: true }
	| {
			ok: false;
			kind: "rejected" | "unavailable";
			reason:
				| "invalid_token"
				| "action_mismatch"
				| "hostname_mismatch"
				| "missing_secret"
				| "test_secret_in_production"
				| "provider_failure";
	  };

export type VerifyTurnstileOptions = {
	secretKey: string | undefined;
	token: string;
	expectedHostname: string;
	requestId: string;
	clientIp?: string | null;
};

function isSiteverifyResponse(value: unknown): value is SiteverifyResponse {
	return (
		typeof value === "object" &&
		value !== null &&
		"success" in value &&
		typeof value.success === "boolean" &&
		(!("action" in value) || typeof value.action === "string") &&
		(!("hostname" in value) || typeof value.hostname === "string")
	);
}

export async function verifyTurnstileToken({
	secretKey,
	token,
	expectedHostname,
	requestId,
	clientIp,
}: VerifyTurnstileOptions): Promise<TurnstileVerificationResult> {
	if (!secretKey) {
		return { ok: false, kind: "unavailable", reason: "missing_secret" };
	}

	const usesTestSecret = isTurnstileTestSecretKey(secretKey);
	if (usesTestSecret && !isLocalHostname(expectedHostname)) {
		return {
			ok: false,
			kind: "unavailable",
			reason: "test_secret_in_production",
		};
	}

	if (
		token.length === 0 ||
		token.length > TURNSTILE_TOKEN_MAX_LENGTH
	) {
		return { ok: false, kind: "rejected", reason: "invalid_token" };
	}

	const formData = new FormData();
	formData.set("secret", secretKey);
	formData.set("response", token);
	formData.set("idempotency_key", requestId);
	if (clientIp && clientIp.length <= CLIENT_IP_MAX_LENGTH) {
		formData.set("remoteip", clientIp);
	}

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), SITEVERIFY_TIMEOUT_MS);

	try {
		const response = await fetch(SITEVERIFY_URL, {
			method: "POST",
			body: formData,
			signal: controller.signal,
		});
		if (!response.ok) {
			return { ok: false, kind: "unavailable", reason: "provider_failure" };
		}

		const result: unknown = await response.json();
		if (!isSiteverifyResponse(result)) {
			return { ok: false, kind: "unavailable", reason: "provider_failure" };
		}
		if (!result.success) {
			return { ok: false, kind: "rejected", reason: "invalid_token" };
		}

		// Cloudflare's public dummy response intentionally reports action "test".
		// Production credentials must bind the verification to this form and host.
		if (!usesTestSecret && result.action !== TURNSTILE_ACTION) {
			return { ok: false, kind: "rejected", reason: "action_mismatch" };
		}
		if (!usesTestSecret && result.hostname !== expectedHostname) {
			return { ok: false, kind: "rejected", reason: "hostname_mismatch" };
		}

		return { ok: true };
	} catch {
		return { ok: false, kind: "unavailable", reason: "provider_failure" };
	} finally {
		clearTimeout(timeout);
	}
}
