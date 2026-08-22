import { describe, expect, it } from "vitest";
import {
	normalizeWaitlistEmail,
	validateWaitlistSignup,
} from "@/app/lib/waitlist";

describe("validateWaitlistSignup", () => {
	it("normalizes an accepted signup while preserving submitted email casing", () => {
		expect(
			validateWaitlistSignup({
				email: "  Seller@Example.COM  ",
				name: "  Sole Supply MNL  ",
				consent: true,
				website: "",
			}),
		).toEqual({
			ok: true,
			kind: "signup",
			value: {
				email: "Seller@Example.COM",
				emailNormalized: "seller@example.com",
				name: "Sole Supply MNL",
			},
		});
	});

	it("stores an omitted or whitespace-only name as null", () => {
		const withoutName = validateWaitlistSignup({
			email: "seller@example.com",
			consent: true,
		});
		const whitespaceName = validateWaitlistSignup({
			email: "seller@example.com",
			name: "   ",
			consent: true,
		});

		expect(withoutName).toMatchObject({
			ok: true,
			kind: "signup",
			value: { name: null },
		});
		expect(whitespaceName).toMatchObject({
			ok: true,
			kind: "signup",
			value: { name: null },
		});
	});

	it("detects the honeypot without accepting unknown or wrongly typed fields", () => {
		expect(
			validateWaitlistSignup({
				email: "bot@example.com",
				consent: true,
				website: "https://spam.invalid",
			}),
		).toEqual({ ok: true, kind: "honeypot" });

		expect(
			validateWaitlistSignup({
				email: "seller@example.com",
				consent: true,
				role: "admin",
			}),
		).toMatchObject({ ok: false });
		expect(
			validateWaitlistSignup({ email: ["seller@example.com"], consent: true }),
		).toMatchObject({ ok: false });
	});

	it("requires valid bounded fields and affirmative consent", () => {
		expect(
			validateWaitlistSignup({ email: "not-an-email", consent: true }),
		).toMatchObject({ ok: false, field: "email" });
		expect(
			validateWaitlistSignup({
				email: "seller@example.com",
				name: "a".repeat(61),
				consent: true,
			}),
		).toMatchObject({ ok: false, field: "name" });
		expect(
			validateWaitlistSignup({
				email: "seller@example.com",
				consent: false,
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
