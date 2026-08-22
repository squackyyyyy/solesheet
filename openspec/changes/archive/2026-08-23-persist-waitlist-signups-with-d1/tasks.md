## 1. D1 Foundation

- [x] 1.1 Add the initial Wrangler-managed SQL migration for `waitlist_signups` with the approved fields, length checks, normalized-email uniqueness, and nullable future survey-completion marker.
- [x] 1.2 With explicit approval for the external Cloudflare change, create or select the remote `solesheet-waitlist` D1 database, configure the `DB` binding and migration directory in `wrangler.jsonc`, and regenerate `CloudflareEnv` types.
- [x] 1.3 Initialize the OpenNext Cloudflare context for ordinary Next.js development without enabling remote production bindings, then apply and inspect the migration against local D1 state.
- [x] 1.4 Document the database/binding/migration mental model and the safe local, remote, inspection, and deletion commands without embedding personal data in examples.

## 2. Server Contract and Persistence

- [x] 2.1 Add shared request types, field limits, privacy-policy version, email/name normalization, and independent server validation for JSON shape, consent, honeypot, and request bounds.
- [x] 2.2 Add a server-only waitlist repository that generates UUID and ISO timestamps and performs the prepared idempotent insert without updating duplicates.
- [x] 2.3 Add `POST /api/waitlist` with supported content-type enforcement, safe validation responses, indistinguishable new/duplicate success, generic retryable database failure, and sanitized logging.
- [x] 2.4 Add focused server tests for valid and omitted-name records, casing/whitespace normalization, duplicate preservation, database constraint failures, honeypot handling, malformed and oversized requests, and SQL-like field input.

## 3. Waitlist and Survey Experience

- [x] 3.1 Replace the simulated waitlist delay with the real endpoint request while preserving accessible pending state, preventing repeated submission, and retaining values on retryable failure.
- [x] 3.2 Transition to the existing branded success state and automatically open the optional survey only after the generic confirmed signup response; keep survey answers temporary and closing harmless to the saved signup.
- [x] 3.3 Add or update component tests for pending, success, automatic survey opening, failed-request retry, duplicate-equivalent success, and the rule that pending or failed signups do not open the survey.

## 4. Privacy and Operational Readiness

- [x] 4.1 Update the privacy notice and its effective version to describe Cloudflare-backed waitlist storage while retaining the current fields, purposes, 12-month inactive-retention approach, consent withdrawal, and deletion rights.
- [x] 4.2 Confirm a working owner-controlled privacy contact before production persistence is enabled and ensure the form and privacy page expose the same active notice/version.
- [x] 4.3 Document a minimal production procedure for counting records, locating a signup by normalized email, fulfilling deletion requests, and diagnosing failures without printing or logging unnecessary personal data.

## 5. Verification and Production Rollout

- [x] 5.1 Run the focused unit, repository, Route Handler, and component tests plus the full typecheck, lint, test, and standard Next.js production build.
- [x] 5.2 Build and preview the OpenNext Worker with local D1, exercise the valid, duplicate, invalid, honeypot, failure, privacy, success, and automatic-survey paths, and confirm the browser bundle exposes no privileged binding or token.
- [x] 5.3 Recheck the Worker dry-run size and free-plan bindings after D1 is added, ensuring no unapproved paid resource is enabled.
- [x] 5.4 With explicit production approval and the privacy gate satisfied, apply the committed migration to the remote database before deploying the Worker.
- [x] 5.5 Submit one controlled production signup, verify a minimal non-sensitive row/count query and duplicate behavior, then confirm the public success and survey flow without exposing the submitted contact in shared output.
- [x] 5.6 Record the release and rollback procedure: revert the Worker behavior if necessary while retaining the D1 database, migration history, and collected records for recovery.
