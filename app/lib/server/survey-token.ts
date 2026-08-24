import "server-only";

export const SURVEY_TOKEN_TTL_SECONDS = 2 * 60 * 60;
export const SURVEY_TOKEN_SECRET_MIN_BYTES = 32;

const TOKEN_VERSION = 1;
const TOKEN_PURPOSE = "survey_submission";
const encoder = new TextEncoder();

type SurveyTokenPayload = {
	v: number;
	p: string;
	s: string;
	iat: number;
	exp: number;
};

export type SurveyTokenVerification =
	| { ok: true; signupId: string }
	| {
			ok: false;
			reason:
				| "invalid_secret"
				| "malformed"
				| "invalid_signature"
				| "wrong_purpose"
				| "expired";
	  };

function encodeBase64Url(bytes: Uint8Array) {
	let binary = "";
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return btoa(binary)
		.replaceAll("+", "-")
		.replaceAll("/", "_")
		.replace(/=+$/u, "");
}

function decodeBase64Url(value: string) {
	if (!/^[A-Za-z0-9_-]+$/u.test(value)) throw new Error("Invalid base64url");
	const padding = "=".repeat((4 - (value.length % 4)) % 4);
	const binary = atob(value.replaceAll("-", "+").replaceAll("_", "/") + padding);
	return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function assertSecret(secret: string | undefined): asserts secret is string {
	if (
		!secret ||
		encoder.encode(secret).byteLength < SURVEY_TOKEN_SECRET_MIN_BYTES
	) {
		throw new Error("Survey token signing secret is not configured safely.");
	}
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
	const copy = new Uint8Array(bytes.byteLength);
	copy.set(bytes);
	return copy.buffer;
}

async function importHmacKey(secret: string) {
	return crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign", "verify"],
	);
}

function isTokenPayload(value: unknown): value is SurveyTokenPayload {
	return (
		typeof value === "object" &&
		value !== null &&
		!Array.isArray(value) &&
		Object.keys(value).length === 5 &&
		"v" in value &&
		value.v === TOKEN_VERSION &&
		"p" in value &&
		typeof value.p === "string" &&
		"s" in value &&
		typeof value.s === "string" &&
		value.s.length > 0 &&
		value.s.length <= 128 &&
		"iat" in value &&
		Number.isSafeInteger(value.iat) &&
		"exp" in value &&
		Number.isSafeInteger(value.exp)
	);
}

export async function createSurveyToken({
	signupId,
	secret,
	now = new Date(),
}: {
	signupId: string;
	secret: string | undefined;
	now?: Date;
}) {
	assertSecret(secret);
	if (signupId.length === 0 || signupId.length > 128) {
		throw new Error("Survey token signup identifier is invalid.");
	}

	const issuedAt = Math.floor(now.getTime() / 1_000);
	const payload: SurveyTokenPayload = {
		v: TOKEN_VERSION,
		p: TOKEN_PURPOSE,
		s: signupId,
		iat: issuedAt,
		exp: issuedAt + SURVEY_TOKEN_TTL_SECONDS,
	};
	const payloadPart = encodeBase64Url(encoder.encode(JSON.stringify(payload)));
	const key = await importHmacKey(secret);
	const signature = await crypto.subtle.sign(
		"HMAC",
		key,
		encoder.encode(payloadPart),
	);
	return `${payloadPart}.${encodeBase64Url(new Uint8Array(signature))}`;
}

export async function verifySurveyToken({
	token,
	secret,
	now = new Date(),
}: {
	token: string;
	secret: string | undefined;
	now?: Date;
}): Promise<SurveyTokenVerification> {
	try {
		assertSecret(secret);
	} catch {
		return { ok: false, reason: "invalid_secret" };
	}

	const parts = token.split(".");
	if (parts.length !== 2 || !parts[0] || !parts[1]) {
		return { ok: false, reason: "malformed" };
	}

	let signature: Uint8Array;
	let payloadBytes: Uint8Array;
	try {
		signature = decodeBase64Url(parts[1]);
		payloadBytes = decodeBase64Url(parts[0]);
	} catch {
		return { ok: false, reason: "malformed" };
	}

	const key = await importHmacKey(secret!);
	const validSignature = await crypto.subtle.verify(
		"HMAC",
		key,
		toArrayBuffer(signature),
		encoder.encode(parts[0]),
	);
	if (!validSignature) {
		return { ok: false, reason: "invalid_signature" };
	}

	let payload: unknown;
	try {
		payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as unknown;
	} catch {
		return { ok: false, reason: "malformed" };
	}
	if (!isTokenPayload(payload)) {
		return { ok: false, reason: "malformed" };
	}
	if (payload.p !== TOKEN_PURPOSE) {
		return { ok: false, reason: "wrong_purpose" };
	}
	const nowSeconds = Math.floor(now.getTime() / 1_000);
	if (payload.iat > nowSeconds + 60 || payload.exp <= nowSeconds) {
		return { ok: false, reason: "expired" };
	}

	return { ok: true, signupId: payload.s };
}
