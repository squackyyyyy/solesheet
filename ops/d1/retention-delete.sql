-- DESTRUCTIVE: preview with retention-preview.sql, confirm the current D1
-- bookmark and cutoff, and obtain explicit approval before remote execution.
-- Existing foreign-key cascades remove linked survey and channel rows.

PRAGMA foreign_keys = ON;

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
DELETE FROM waitlist_signups
WHERE id IN (SELECT id FROM retention_candidates);

SELECT changes() AS deleted_signup_count;
