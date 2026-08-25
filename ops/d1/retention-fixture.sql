-- Synthetic local-only fixture for exercising retention and cascade behavior.
-- The reserved .invalid domain cannot receive email.

DELETE FROM waitlist_signups WHERE id LIKE 'ops-retention-%';

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
VALUES
	(
		'ops-retention-old-survey',
		'old-survey@example.invalid',
		'old-survey@example.invalid',
		NULL,
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'start of month', '-13 months'),
		'test-only',
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'start of month', '-13 months'),
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'start of month', '-12 months'),
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'start of month', '-12 months')
	),
	(
		'ops-retention-old-signup',
		'old-signup@example.invalid',
		'old-signup@example.invalid',
		NULL,
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'start of month', '-12 months'),
		'test-only',
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'start of month', '-12 months'),
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'start of month', '-12 months'),
		NULL
	),
	(
		'ops-retention-cutoff',
		'cutoff@example.invalid',
		'cutoff@example.invalid',
		NULL,
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'start of month', '-11 months'),
		'test-only',
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'start of month', '-11 months'),
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'start of month', '-11 months'),
		NULL
	),
	(
		'ops-retention-recent-survey',
		'recent-survey@example.invalid',
		'recent-survey@example.invalid',
		NULL,
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'start of month', '-13 months'),
		'test-only',
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'start of month', '-13 months'),
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'start of month', '-13 months'),
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-1 month')
	);

INSERT INTO survey_responses (
	signup_id,
	submitted_at,
	updated_at
)
VALUES
	(
		'ops-retention-old-survey',
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'start of month', '-12 months'),
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', 'start of month', '-12 months')
	),
	(
		'ops-retention-recent-survey',
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-1 month'),
		strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-1 month')
	);

INSERT INTO survey_sales_channels (signup_id, channel)
VALUES
	('ops-retention-old-survey', 'instagram'),
	('ops-retention-recent-survey', 'physical_store');
