import "server-only";

import { privacyNotice } from "@/app/lib/privacy";
import type { ValidWaitlistSignup } from "@/app/lib/waitlist";

type WaitlistRepositoryOptions = {
	createId?: () => string;
	now?: () => Date;
};

const insertWaitlistSignupSql = `
	INSERT INTO waitlist_signups (
		id,
		email,
		email_normalized,
		name,
		consented_at,
		privacy_policy_version,
		created_at,
		updated_at,
		survey_completed_at
	)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL)
	ON CONFLICT(email_normalized) DO NOTHING
`;

const selectWaitlistSignupIdSql = `
	SELECT id
	FROM waitlist_signups
	WHERE email_normalized = ?
`;

export async function persistWaitlistSignup(
	db: D1Database,
	signup: ValidWaitlistSignup,
	options: WaitlistRepositoryOptions = {},
) {
	const id = options.createId ? options.createId() : crypto.randomUUID();
	const timestamp = (options.now ?? (() => new Date()))().toISOString();

	await db
		.prepare(insertWaitlistSignupSql)
		.bind(
			id,
			signup.email,
			signup.emailNormalized,
			signup.name,
			timestamp,
			privacyNotice.version,
			timestamp,
			timestamp,
		)
		.run();

	const storedSignup = await db
		.prepare(selectWaitlistSignupIdSql)
		.bind(signup.emailNormalized)
		.first<{ id: string }>();
	if (!storedSignup?.id) {
		throw new Error("Waitlist signup could not be resolved after persistence.");
	}

	return storedSignup.id;
}
