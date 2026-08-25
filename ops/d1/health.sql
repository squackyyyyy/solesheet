-- Privacy-safe D1 health checks. These statements return only schema and
-- aggregate information; they do not select contacts, answers, or row IDs.

SELECT COUNT(*) AS required_table_count
FROM sqlite_master
WHERE type = 'table'
	AND name IN (
		'waitlist_signups',
		'survey_responses',
		'survey_sales_channels'
	);

SELECT
	(SELECT COUNT(*) FROM waitlist_signups) AS signup_count,
	(SELECT COUNT(*) FROM survey_responses) AS response_count,
	(SELECT COUNT(*) FROM survey_sales_channels) AS channel_count;

SELECT COUNT(*) AS orphaned_response_count
FROM survey_responses AS response
LEFT JOIN waitlist_signups AS signup ON signup.id = response.signup_id
WHERE signup.id IS NULL;

SELECT COUNT(*) AS orphaned_channel_count
FROM survey_sales_channels AS channel
LEFT JOIN survey_responses AS response ON response.signup_id = channel.signup_id
WHERE response.signup_id IS NULL;

SELECT COUNT(*) AS completion_marker_mismatch_count
FROM waitlist_signups AS signup
LEFT JOIN survey_responses AS response ON response.signup_id = signup.id
WHERE (signup.survey_completed_at IS NULL) <> (response.signup_id IS NULL);
