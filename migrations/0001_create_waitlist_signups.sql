CREATE TABLE waitlist_signups (
	id TEXT PRIMARY KEY NOT NULL,
	email TEXT NOT NULL,
	email_normalized TEXT NOT NULL UNIQUE,
	name TEXT,
	consented_at TEXT NOT NULL,
	privacy_policy_version TEXT NOT NULL,
	created_at TEXT NOT NULL,
	updated_at TEXT NOT NULL,
	survey_completed_at TEXT,
	CHECK (length(email) BETWEEN 3 AND 254),
	CHECK (length(email_normalized) BETWEEN 3 AND 254),
	CHECK (name IS NULL OR length(name) BETWEEN 1 AND 60)
);
