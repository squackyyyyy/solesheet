## 1. Define the Survey Data Boundary

- [x] 1.1 Add `0002_create_survey_responses.sql` with the one-to-one response table, normalized sales-channel child table, foreign keys, uniqueness, option allow-lists, text limits, and timestamps described by the design.
- [x] 1.2 Add a shared server-safe survey request contract with stable answer identifiers, an 8 KiB request limit, normalization, cross-field Other rules, and focused tests for empty, partial, complete, malformed, duplicate-channel, unsupported-option, and over-limit submissions.
- [x] 1.3 Update the maintained draw.io D1 schema with the finalized survey columns, `sales_channel_other`, relationships, and constraints.

## 2. Protect the Signup-to-Survey Handoff

- [x] 2.1 Declare `SURVEY_SUBMISSION_SECRET` as a required Worker secret and add safe local/example configuration without committing a production value.
- [x] 2.2 Add a server-only two-hour HMAC-SHA-256 survey-token utility using Web Crypto, with deterministic tests for valid, tampered, expired, wrong-purpose, malformed, and invalid-secret cases and proof that token material is not logged.
- [x] 2.3 Make waitlist persistence return the existing-or-new signup ID after verified duplicate-safe storage, then update `/api/waitlist` to issue the same `{ ok: true, surveyToken }` response shape for new and duplicate signups.
- [x] 2.4 Update waitlist repository and route tests for ID resolution, duplicate record immutability, signing/configuration failures, generic outcomes, and the absence of contact or signup details from the response and logs.

## 3. Persist Finished Surveys Atomically

- [x] 3.1 Add a server-only survey repository that detects an existing response, batches the response, distinct channel rows, and signup completion timestamp, and resolves concurrent uniqueness races as idempotent success without overwriting the first result.
- [x] 3.2 Add repository tests for zero-answer and partial surveys, multiple channels, exact normalized values, batch rollback, missing signup relationships, sequential retry, and concurrent duplicate safety.
- [x] 3.3 Add `POST /api/survey` with supported content-type and bounded-body handling, shared validation, environment access, token verification before D1, no-store safe responses, and content-free structured diagnostics.
- [x] 3.4 Add route tests for malformed and oversized requests, token rejection before database access, invalid answer combinations, generic service failures, successful persistence, idempotent repeats, and exclusion of answers, free text, contacts, and tokens from logs.

## 4. Connect the Real Survey Submission Experience

- [x] 4.1 Retain the returned continuation token only in the mounted waitlist experience and map displayed survey choices to stable request identifiers without changing question copy or navigation.
- [x] 4.2 Replace the five-second completion timer with the real survey request while preserving the fixed-size anchored branded pending-to-success sequence, blocking repeated actions, and completing the shared journey only after confirmed success.
- [x] 4.3 Add an accessible failure-and-retry state that restores the same question position and retains all current answers and Other details without claiming completion, plus the confirmed-success email link for manual response-change requests.
- [x] 4.4 Update component and browser tests for core-only, partial optional, zero-answer, successful, failed, retried, close-without-submit, duplicate-safe, reduced-motion, focus, stable-dialog, and no-autosave behavior.
- [x] 4.5 Update the privacy notice and its effective version to accurately describe stored optional survey answers, product-research use, Cloudflare processing, retention, and access or deletion requests.

## 5. Document, Migrate, and Verify

- [x] 5.1 Update the D1 operations guide with the new local and remote migration commands, signing-secret setup, privacy-safe survey inspection queries, idempotency checks, and rollback guidance.
- [x] 5.2 Apply the migration locally, regenerate Cloudflare binding types, and verify the migration ledger plus both survey table schemas against the committed SQL.
- [x] 5.3 Run focused contract, token, repository, route, and component tests followed by the full unit suite, type checking, linting, strict OpenSpec validation, and an OpenNext Worker build.
- [x] 5.4 Run a local Worker preview through signup and survey completion, confirm one linked response and its expected channels in local D1, then verify a repeated completion creates no duplicate or overwrite.
- [ ] 5.5 Configure the production signing secret, apply the committed migration remotely, deploy the Worker and client together, complete one controlled production survey, and verify its response, channel rows, and signup completion timestamp before sync and archive.
- [ ] 5.6 Mark Phase 2 complete and Phase 3 next in the backend roadmap after production verification succeeds.
