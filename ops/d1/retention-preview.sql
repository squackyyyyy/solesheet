-- Run during the first five days of each month. The cutoff looks ahead to the
-- following monthly run so no record crosses 12 months of inactivity.
-- Output is aggregate-only and safe to record in an operational note.

WITH signup_activity AS (
	SELECT
		signup.id,
		max(
			julianday(signup.created_at),
			julianday(signup.updated_at),
			coalesce(julianday(signup.survey_completed_at), 0),
			coalesce(julianday(response.submitted_at), 0),
			coalesce(julianday(response.updated_at), 0)
		) AS last_interaction_day
	FROM waitlist_signups AS signup
	LEFT JOIN survey_responses AS response ON response.signup_id = signup.id
),
retention_candidates AS (
	SELECT id
	FROM signup_activity
	WHERE last_interaction_day < julianday('now', 'start of month', '-11 months')
)
SELECT
	datetime('now', 'start of month', '-11 months') AS cutoff_utc,
	(SELECT COUNT(*) FROM retention_candidates) AS candidate_signup_count,
	(
		SELECT COUNT(*)
		FROM survey_responses
		WHERE signup_id IN (SELECT id FROM retention_candidates)
	) AS candidate_response_count,
	(
		SELECT COUNT(*)
		FROM survey_sales_channels
		WHERE signup_id IN (SELECT id FROM retention_candidates)
	) AS candidate_channel_count;
