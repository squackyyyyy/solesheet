import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import {
	TURNSTILE_TEST_REJECT_SECRET_KEY,
	TURNSTILE_TEST_SECRET_KEY,
} from "@/app/lib/turnstile";
import { verifyTurnstileToken } from "@/app/lib/server/turnstile";

const options = {
	secretKey: "production-secret-value",
	token: "private-turnstile-token",
	expectedHostname: "solesheet.app",
	requestId: "4edbed65-2f04-4d55-8c93-a1600ebfe370",
	clientIp: "203.0.113.5",
};

describe("verifyTurnstileToken", () => {
	beforeEach(() => {
		vi.stubGlobal("fetch", vi.fn());
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it("accepts a successful production response and sends bounded verification context", async () => {
		vi.mocked(fetch).mockResolvedValue(
			Response.json({
				success: true,
				action: "waitlist_signup",
				hostname: "solesheet.app",
			}),
		);

		await expect(verifyTurnstileToken(options)).resolves.toEqual({ ok: true });
		expect(fetch).toHaveBeenCalledOnce();
		const [url, request] = vi.mocked(fetch).mock.calls[0] ?? [];
		expect(url).toBe(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
		);
		const body = request?.body as FormData;
		expect(body.get("response")).toBe(options.token);
		expect(body.get("secret")).toBe(options.secretKey);
		expect(body.get("idempotency_key")).toBe(options.requestId);
		expect(body.get("remoteip")).toBe(options.clientIp);
	});

	it("classifies unsuccessful tokens as rejected", async () => {
		vi.mocked(fetch).mockResolvedValue(
			Response.json({
				success: false,
				"error-codes": ["timeout-or-duplicate"],
			}),
		);

		await expect(verifyTurnstileToken(options)).resolves.toEqual({
			ok: false,
			kind: "rejected",
			reason: "invalid_token",
		});
	});

	it("rejects mismatched production actions and hostnames", async () => {
		vi.mocked(fetch)
			.mockResolvedValueOnce(
				Response.json({
					success: true,
					action: "other_form",
					hostname: "solesheet.app",
				}),
			)
			.mockResolvedValueOnce(
				Response.json({
					success: true,
					action: "waitlist_signup",
					hostname: "other.example",
				}),
			);

		await expect(verifyTurnstileToken(options)).resolves.toMatchObject({
			ok: false,
			kind: "rejected",
			reason: "action_mismatch",
		});
		await expect(verifyTurnstileToken(options)).resolves.toMatchObject({
			ok: false,
			kind: "rejected",
			reason: "hostname_mismatch",
		});
	});

	it("fails closed for missing configuration and provider failures", async () => {
		await expect(
			verifyTurnstileToken({ ...options, secretKey: undefined }),
		).resolves.toMatchObject({
			ok: false,
			kind: "unavailable",
			reason: "missing_secret",
		});
		expect(fetch).not.toHaveBeenCalled();

		vi.mocked(fetch)
			.mockRejectedValueOnce(new Error("provider offline with private values"))
			.mockResolvedValueOnce(new Response("unavailable", { status: 503 }))
			.mockResolvedValueOnce(Response.json({ unexpected: true }));
		for (let attempt = 0; attempt < 3; attempt += 1) {
			await expect(verifyTurnstileToken(options)).resolves.toMatchObject({
				ok: false,
				kind: "unavailable",
				reason: "provider_failure",
			});
		}
	});

	it("allows the official test secret only for a local hostname", async () => {
		vi.mocked(fetch).mockResolvedValue(
			Response.json({
				success: true,
				action: "test",
				hostname: "localhost",
			}),
		);

		await expect(
			verifyTurnstileToken({
				...options,
				secretKey: TURNSTILE_TEST_SECRET_KEY,
				expectedHostname: "localhost",
			}),
		).resolves.toEqual({ ok: true });
		expect(fetch).toHaveBeenCalledOnce();

		vi.mocked(fetch).mockClear();
		await expect(
			verifyTurnstileToken({
				...options,
				secretKey: TURNSTILE_TEST_SECRET_KEY,
				expectedHostname: "solesheet.app",
			}),
		).resolves.toMatchObject({
			ok: false,
			kind: "unavailable",
			reason: "test_secret_in_production",
		});
		expect(fetch).not.toHaveBeenCalled();

		await expect(
			verifyTurnstileToken({
				...options,
				secretKey: TURNSTILE_TEST_REJECT_SECRET_KEY,
				expectedHostname: "solesheet.app",
			}),
		).resolves.toMatchObject({
			ok: false,
			kind: "unavailable",
			reason: "test_secret_in_production",
		});
		expect(fetch).not.toHaveBeenCalled();
	});

	it("never logs the provider secret, token, IP, or response", async () => {
		const consoleSpies = [
			vi.spyOn(console, "log").mockImplementation(() => {}),
			vi.spyOn(console, "info").mockImplementation(() => {}),
			vi.spyOn(console, "warn").mockImplementation(() => {}),
			vi.spyOn(console, "error").mockImplementation(() => {}),
		];
		vi.mocked(fetch).mockRejectedValue(new Error("network failure"));

		await verifyTurnstileToken(options);
		expect(consoleSpies.every((spy) => spy.mock.calls.length === 0)).toBe(true);
	});
});
