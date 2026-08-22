import { describe, expect, it } from "vitest";
import { TURNSTILE_TOKEN_MAX_LENGTH } from "@/app/lib/turnstile";
import {
	normalizeWaitlistEmail,
	validateWaitlistSignup,
} from "@/app/lib/waitlist";

const token = "verified-turnstile-token";

describe("validateWaitlistSignup", () => {
	it("normalizes an accepted signup while preserving the token and email casing", () => {
		expect(
			validateWaitlistSignup({
				email: "  Seller@Example.COM  ",
				name: "  Sole Supply MNL  ",
				consent: true,
				turnstileToken: `  ${token}  `,
			}),
		).toEqual({
			ok: true,
			value: {
				signup: {
					email: "Seller@Example.COM",
					emailNormalized: "seller@example.com",
					name: "Sole Supply MNL",
				},
				turnstileToken: token,
			},
		});
	});

	it("stores an omitted or whitespace-only name as null", () => {
		const withoutName = validateWaitlistSignup({
			email: "seller@example.com",
			consent: true,
			turnstileToken: token,
		});
		const whitespaceName = validateWaitlistSignup({
			email: "seller@example.com",
			name: "   ",
			consent: true,
			turnstileToken: token,
		});

		expect(withoutName).toMatchObject({
			ok: true,
			value: { signup: { name: null } },
		});
		expect(whitespaceName).toMatchObject({
			ok: true,
			value: { signup: { name: null } },
		});
	});

	it("requires a string token within Cloudflare's documented bound", () => {
		const signup = { email: "seller@example.com", consent: true };

		expect(validateWaitlistSignup(signup)).toMatchObject({ ok: false });
		expect(
			validateWaitlistSignup({ ...signup, turnstileToken: "   " }),
		).toMatchObject({ ok: false });
		expect(
			validateWaitlistSignup({ ...signup, turnstileToken: 42 }),
		).toMatchObject({ ok: false });
		expect(
			validateWaitlistSignup({
				...signup,
				turnstileToken: "x".repeat(TURNSTILE_TOKEN_MAX_LENGTH),
			}),
		).toMatchObject({ ok: true });
		expect(
			validateWaitlistSignup({
				...signup,
				turnstileToken: "x".repeat(TURNSTILE_TOKEN_MAX_LENGTH + 1),
			}),
		).toMatchObject({ ok: false });
	});

	it("rejects legacy traps, unknown fields, and wrongly typed fields", () => {
		const signup = {
			email: "seller@example.com",
			consent: true,
			turnstileToken: token,
		};

		expect(validateWaitlistSignup({ ...signup, role: "admin" })).toMatchObject({
			ok: false,
		});
		expect(
			validateWaitlistSignup({ ...signup, formCheck: "value" }),
		).toMatchObject({ ok: false });
		expect(
			validateWaitlistSignup({ ...signup, website: "autofilled" }),
		).toMatchObject({ ok: false });
		expect(
			validateWaitlistSignup({
				email: ["seller@example.com"],
				consent: true,
				turnstileToken: token,
			}),
		).toMatchObject({ ok: false });
	});

	it("requires valid bounded fields and affirmative consent", () => {
		expect(
			validateWaitlistSignup({
				email: "not-an-email",
				consent: true,
				turnstileToken: token,
			}),
		).toMatchObject({ ok: false, field: "email" });
		expect(
			validateWaitlistSignup({
				email: "seller@example.com",
				name: "a".repeat(61),
				consent: true,
				turnstileToken: token,
			}),
		).toMatchObject({ ok: false, field: "name" });
		expect(
			validateWaitlistSignup({
				email: "seller@example.com",
				consent: false,
				turnstileToken: token,
			}),
		).toMatchObject({ ok: false, field: "consent" });
	});
});

describe("normalizeWaitlistEmail", () => {
	it("uses only trimming and lowercase normalization", () => {
		expect(normalizeWaitlistEmail(" Name+Stock@Example.COM ")).toBe(
			"name+stock@example.com",
		);
	});
});
