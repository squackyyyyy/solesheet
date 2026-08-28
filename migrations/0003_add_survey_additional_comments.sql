ALTER TABLE survey_responses
ADD COLUMN additional_comments TEXT
CHECK (
	additional_comments IS NULL
	OR length(additional_comments) BETWEEN 1 AND 500
);
