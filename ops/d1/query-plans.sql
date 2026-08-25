-- Query-plan review for the recurring operational queries. Plan output contains
-- only schema/index names and planner strategy, never stored record values.

EXPLAIN QUERY PLAN
SELECT id
FROM waitlist_signups
WHERE email_normalized = 'synthetic@example.invalid';

EXPLAIN QUERY PLAN
SELECT COUNT(*)
FROM waitlist_signups;

EXPLAIN QUERY PLAN
SELECT COUNT(*)
FROM survey_responses AS response
LEFT JOIN waitlist_signups AS signup ON signup.id = response.signup_id
WHERE signup.id IS NULL;

EXPLAIN QUERY PLAN
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
)
SELECT COUNT(*)
FROM signup_activity
WHERE last_interaction_day < julianday('now', 'start of month', '-11 months');
