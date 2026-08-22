import {
	isValidWaitlistEmail,
	normalizeOptionalText,
	waitlistTextLimits,
} from "@/app/lib/validation";
import { TURNSTILE_TOKEN_MAX_LENGTH } from "@/app/lib/turnstile";

export const WAITLIST_REQUEST_MAX_BYTES = 4_096;

export const waitlistRequestFields = [
	"email",
	"name",
	"consent",
	"turnstileToken",
] as const;

export type WaitlistSignupRequest = {
	email: string;
	name?: string;
	consent: true;
	turnstileToken: string;
};

export type ValidWaitlistSignup = {
	email: string;
	emailNormalized: string;
	name: string | null;
};

export type WaitlistField = "email" | "name" | "consent";

export type ValidWaitlistRequest = {
	signup: ValidWaitlistSignup;
	turnstileToken: string;
};

export type WaitlistValidationResult =
	| { ok: true; value: ValidWaitlistRequest }
	| {
			ok: false;
			field?: WaitlistField;
			message: string;
	  };

function isJsonObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function normalizeWaitlistEmail(value: string) {
	return normalizeOptionalText(value).toLowerCase();
}

export function validateWaitlistSignup(
	value: unknown,
): WaitlistValidationResult {
	if (!isJsonObject(value)) {
		return { ok: false, message: "Enter your waitlist details and try again." };
	}

	const allowedFields = new Set<string>(waitlistRequestFields);
	if (Object.keys(value).some((key) => !allowedFields.has(key))) {
		return { ok: false, message: "The waitlist request was not recognized." };
	}

	if (
		typeof value.email !== "string" ||
		(value.name !== undefined && typeof value.name !== "string") ||
		typeof value.consent !== "boolean" ||
		typeof value.turnstileToken !== "string"
	) {
		return { ok: false, message: "The waitlist request was not recognized." };
	}

	const turnstileToken = value.turnstileToken.trim();
	if (
		turnstileToken.length === 0 ||
		turnstileToken.length > TURNSTILE_TOKEN_MAX_LENGTH
	) {
		return {
			ok: false,
			message: "Complete the security check and try again.",
		};
	}

	const email = normalizeOptionalText(value.email);
	if (!isValidWaitlistEmail(email)) {
		return {
			ok: false,
			field: "email",
			message: "Enter a valid email address.",
		};
	}

	const name = normalizeOptionalText(value.name ?? "");
	if (name.length > waitlistTextLimits.name) {
		return {
			ok: false,
			field: "name",
			message: `Use ${waitlistTextLimits.name} characters or fewer for your name.`,
		};
	}

	if (value.consent !== true) {
		return {
			ok: false,
			field: "consent",
			message: "Please agree to the Privacy Policy to continue.",
		};
	}

	return {
		ok: true,
		value: {
			signup: {
				email,
				emailNormalized: normalizeWaitlistEmail(email),
				name: name || null,
			},
			turnstileToken,
		},
	};
}
