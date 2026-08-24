import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import {
	createSurveyToken,
	SURVEY_TOKEN_SECRET_MIN_BYTES,
	SURVEY_TOKEN_TTL_SECONDS,
	verifySurveyToken,
} from "@/app/lib/server/survey-token";

const secret = "s".repeat(SURVEY_TOKEN_SECRET_MIN_BYTES);
const signupId = "00000000-0000-4000-8000-000000000001";
const issuedAt = new Date("2026-08-24T00:00:00.000Z");

describe("survey continuation tokens", () => {
	beforeEach(() => vi.restoreAllMocks());

	it("creates and verifies a deterministic two-hour token", async () => {
		const token = await createSurveyToken({ signupId, secret, now: issuedAt });

		await expect(
			verifySurveyToken({
				token,
				secret,
				now: new Date(issuedAt.getTime() + SURVEY_TOKEN_TTL_SECONDS * 1_000 - 1),
			}),
		).resolves.toEqual({ ok: true, signupId });
	});

	it("rejects tampering, malformed values, and another secret", async () => {
		const token = await createSurveyToken({ signupId, secret, now: issuedAt });
		const [payload, signature] = token.split(".");
		const tamperedSignature = `${signature!.slice(0, -1)}${signature!.endsWith("A") ? "B" : "A"}`;

		await expect(
			verifySurveyToken({
				token: `${payload}.${tamperedSignature}`,
				secret,
				now: issuedAt,
			}),
		).resolves.toMatchObject({ ok: false, reason: "invalid_signature" });
		await expect(
			verifySurveyToken({ token: "not-a-token", secret, now: issuedAt }),
		).resolves.toMatchObject({ ok: false, reason: "malformed" });
		await expect(
			verifySurveyToken({
				token,
				secret: "x".repeat(SURVEY_TOKEN_SECRET_MIN_BYTES),
				now: issuedAt,
			}),
		).resolves.toMatchObject({ ok: false, reason: "invalid_signature" });
	});

	it("rejects expiration, unsafe secrets, and a wrong-purpose payload", async () => {
		const token = await createSurveyToken({ signupId, secret, now: issuedAt });
		await expect(
			verifySurveyToken({
				token,
				secret,
				now: new Date(issuedAt.getTime() + SURVEY_TOKEN_TTL_SECONDS * 1_000),
			}),
		).resolves.toMatchObject({ ok: false, reason: "expired" });
		await expect(
			verifySurveyToken({ token, secret: "short", now: issuedAt }),
		).resolves.toMatchObject({ ok: false, reason: "invalid_secret" });

		const [payloadPart, signaturePart] = token.split(".");
		const payload = JSON.parse(
			atob(payloadPart!.replaceAll("-", "+").replaceAll("_", "/")),
		) as Record<string, unknown>;
		payload.p = "another_purpose";
		const changedPayloadPart = btoa(JSON.stringify(payload))
			.replaceAll("+", "-")
			.replaceAll("/", "_")
			.replace(/=+$/u, "");
		const key = await crypto.subtle.importKey(
			"raw",
			new TextEncoder().encode(secret),
			{ name: "HMAC", hash: "SHA-256" },
			false,
			["sign"],
		);
		const wrongPurposeSignature = new Uint8Array(
			await crypto.subtle.sign(
				"HMAC",
				key,
				new TextEncoder().encode(changedPayloadPart),
			),
		);
		let binary = "";
		for (const byte of wrongPurposeSignature) binary += String.fromCharCode(byte);
		const wrongPurposeToken = `${changedPayloadPart}.${btoa(binary)
			.replaceAll("+", "-")
			.replaceAll("/", "_")
			.replace(/=+$/u, "")}`;

		expect(signaturePart).toBeDefined();
		await expect(
			verifySurveyToken({ token: wrongPurposeToken, secret, now: issuedAt }),
		).resolves.toMatchObject({ ok: false, reason: "wrong_purpose" });
	});

	it("does not log token or secret material", async () => {
		const spies = [
			vi.spyOn(console, "log").mockImplementation(() => {}),
			vi.spyOn(console, "info").mockImplementation(() => {}),
			vi.spyOn(console, "warn").mockImplementation(() => {}),
			vi.spyOn(console, "error").mockImplementation(() => {}),
		];

		await verifySurveyToken({ token: "private-token", secret, now: issuedAt });
		expect(spies.every((spy) => spy.mock.calls.length === 0)).toBe(true);
	});
});
