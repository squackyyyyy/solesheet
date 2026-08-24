## Context

See [proposal.md](proposal.md) for motivation. The deployed Worker already verifies waitlist signups with Turnstile, stores them in D1, and opens a nine-question optional wizard after `/api/waitlist` returns `{ ok: true }`. Survey answers currently remain in component memory, while completion uses a fixed five-second timer before updating the shared journey state. The existing `waitlist_signups.survey_completed_at` column anticipated this phase, but no survey tables, submission contract, or safe browser-to-signup continuation credential exists yet.

The implementation must remain compatible with Cloudflare Workers and D1, raw prepared SQL, the current zero-cost deployment, and local Wrangler preview. All questions remain optional, including finishing after four core questions or with no selected answers.

## Goals / Non-Goals

**Goals:**

- Preserve the generic and private new-or-duplicate signup outcome while giving the resulting page session authority to submit that signup's survey.
- Validate the full survey contract on the server and store one answer set plus normalized multi-select channels atomically.
- Make retries safe when a successful response is lost or a request fails before commitment.
- Retain the fixed-size, accessible survey wizard and continuous branded pending-to-success transition.
- Keep schema changes reproducible and understandable through a committed migration, updated diagram, and operating guide.

**Non-Goals:**

- Autosaving per question, restoring drafts after reload, editing a submitted response, or collecting navigation analytics.
- Treating the survey token as account authentication or supporting survey completion from another device.
- Adding an ORM, queue, Durable Object, administration UI, data export feature, or traffic analytics.
- Changing the questions, option wording, optionality, wizard navigation, or current Turnstile signup verification.

## Decisions

### Issue a two-hour signed survey continuation token

After Turnstile verification and persistence, the waitlist repository will return the existing or newly inserted signup UUID. The route will create a compact versioned token containing that UUID, the `survey_submission` purpose, issued-at time, and a two-hour expiry. A server-only `SURVEY_SUBMISSION_SECRET` of at least 32 random bytes will sign the payload with HMAC-SHA-256 through the Workers Web Crypto API. The survey route will verify the signature, purpose, version, and expiry before using the UUID.

The successful waitlist response will always have the same `{ ok: true, surveyToken }` shape for new and duplicate emails. The token is opaque application data, contains no email or name, and is kept only in React state. This preserves duplicate privacy and avoids accepting a browser-chosen `signupId`.

A raw UUID bearer reference was considered, but a signed token provides explicit purpose and expiry and prevents an altered identifier from reaching D1. Persisting a separate random token hash was rejected because duplicate signups would require token rotation or storage updates and add schema state solely for this short, same-page handoff. Reusing the Turnstile secret was rejected because unrelated security purposes must have independent secrets.

### Use stable answer identifiers at the network and storage boundary

The survey contract will define stable identifiers for every selectable value rather than persisting display labels such as prices or punctuation that marketing copy may later change. The UI will map its displayed options to these identifiers at submission. Shared server-safe definitions will drive request typing and allow-list validation; server modules will not import client components.

The JSON body will contain `surveyToken` plus optional named fields for phone type, active inventory range, inventory method and its Other detail, priority feature and its Other detail, likely plan, installment frequency, cloud-backup preference, sales channels and their Other detail, and follow-up availability. The body will be limited to 8 KiB. Unknown properties, invalid types, unsupported identifiers, repeated channels, and inconsistent Other-detail combinations will fail validation. Whitespace-only detail values normalize to absence.

Storing display labels directly was rejected because harmless copy changes would fragment reporting. Accepting arbitrary strings and validating only lengths was rejected because it would pollute research results and widen the input surface.

### Store one response row and normalized channel child rows

Migration `0002_create_survey_responses.sql` will add:

```text
waitlist_signups
  id (PK)
    |
    | 1 -> 0..1
    v
survey_responses
  signup_id (PK, FK -> waitlist_signups.id ON DELETE CASCADE)
  phone_type, active_inventory_range, inventory_method
  inventory_method_other, priority_feature, priority_other
  likely_plan, installment_frequency, cloud_backup_preference
  sales_channel_other, follow_up_availability
  submitted_at, updated_at
    |
    | 1 -> 0..many
    v
survey_sales_channels
  signup_id (PK part, FK -> survey_responses.signup_id ON DELETE CASCADE)
  channel (PK part)
```

Nullable columns represent unanswered questions. `CHECK` constraints will enforce text bounds and stable option identifiers as a defense behind TypeScript validation. `survey_sales_channels` remains separate because the question is multi-select and normalized rows support simple counts and filtering without parsing JSON. `sales_channel_other` stays on the response because it is a single optional explanation associated with selecting the `other` channel.

Using JSON for channels was considered but rejected because the small join table keeps uniqueness and reporting constraints in SQLite. A generic question-and-answer table was rejected because the survey is fixed, typed columns are easier to validate and query, and premature flexibility would make constraints weaker.

### Commit the complete result with one D1 batch

The repository will first check whether a response already exists for the verified signup and return generic success when it does. For a new response it will execute one D1 batch containing the response insert, one prepared insert per selected channel, and the waitlist completion-timestamp update. D1 batches are the transaction boundary: a failed statement rolls back the batch so response, channels, and completion marker cannot disagree.

The response's `signup_id` primary key and each channel's composite primary key enforce database-level idempotency. If concurrent requests pass the initial existence check, one batch may encounter the uniqueness constraint; the repository will re-check for the now-existing response and treat it as generic success. It will never replace the first stored answers.

Per-question writes were rejected because the user explicitly finishes once, drafts are not recoverable in this phase, and additional writes would add consent, cleanup, and concurrency complexity. Overwriting on retry was rejected because a lost success response must not make a second payload silently replace the committed research answer.

### Keep route handling parallel to the waitlist endpoint

`POST /api/survey` will use the same no-store JSON headers and bounded streaming-body pattern as `/api/waitlist`. Processing order will be: method/content checks, bounded JSON parsing, structural answer validation, Cloudflare environment access, continuation-token verification, and repository persistence. Validation that does not require identity happens before D1; token verification happens before any D1 lookup.

Responses will use a generic `{ ok: true }` for both first persistence and idempotent repeats. Safe errors will distinguish actionable client validation from retryable service failure without revealing signup existence, stored values, SQL details, or token internals. Structured logs may contain a generated request ID and coarse category only.

Extracting a broad generic API framework was rejected because there are only two endpoints and a small shared bounded-body helper is sufficient if duplication becomes meaningful during implementation.

### Replace the test timer with a real answer-preserving submission state

The waitlist experience will retain the returned survey token in component state. Activating any Finish action will normalize current answers, call `/api/survey`, and enter the existing anchored branded loading state. Only confirmed `{ ok: true }` advances the shared journey to `survey-complete`. The fixed five-second timer and its cleanup path will be removed.

On failure, the component returns to the same question and position with all answers intact, announces a concise message, and presents retry through the existing Finish action or a focused retry control. While pending, completion and navigation remain unavailable to prevent local duplicate actions; server idempotency still protects ambiguous network outcomes. Closing before Finish continues to save nothing beyond the signup. The confirmed success content will include **Need to change your responses? Email us at solesheetph@gmail.com.** with a `mailto:` link so legitimate respondents have a manual correction path without enabling unauthenticated overwrites.

Keeping a minimum artificial loader duration was rejected because it delays real users and can hide fast responses. Moving success content elsewhere was rejected because the anchored loader-to-success continuity is an approved part of the existing interaction.

### Update privacy and operator documentation with the schema

The privacy notice will stop describing survey answers as non-saving, list the optional workflow and interview-preference data, explain product-research use and Cloudflare D1 processing, and advance its effective version before deployment. The D1 operations guide will add local and remote migration commands, privacy-safe verification queries, and the new signing-secret setup. The draw.io schema will add `sales_channel_other` if absent and change its provisional note to reflect the finalized Phase 2 schema.

## Risks / Trade-offs

- [A person who can complete the waitlist flow for a known email receives a fresh survey token] → Treat the survey as low-risk product research, require Turnstile before every token issuance, reveal no signup state, scope tokens to survey submission, expire them after two hours, and keep the first submitted response immutable. Account-grade email ownership verification remains outside this waitlist's scope.
- [The signing secret is absent or inconsistent between deployments] → Fail closed before issuing or accepting tokens, declare it as a required Worker secret, document local dummy configuration, and deploy the secret before the application update.
- [Marketing copy changes while stable identifiers remain] → Keep display-to-identifier mapping explicit and cover every offered option with contract tests so copy can change without rewriting stored categories.
- [A response succeeds but the browser loses the response] → Return idempotent success for the already-linked response and never overwrite the original answer set.
- [A batch fails after receiving personal research text] → Rely on the D1 batch rollback, return a generic retryable error, retain values only in page memory, and exclude content from logs.
- [The two-hour token expires in a long-open tab] → Keep the current answers visible with a safe failure rather than claiming success; rejoining after reload can issue a fresh token. The normal immediately opened survey remains well within the lifetime.
- [Local and production schemas drift] → Commit the migration, apply it locally first, include inspection commands, and verify the migration ledger and table shape remotely before smoke testing.

## Migration Plan

1. Add the migration, shared survey contract, token utility, repository, route, environment declaration, and tests.
2. Apply `0002_create_survey_responses.sql` to the local D1 database and verify the schema and atomic/idempotent repository behavior.
3. Integrate the real client submission, remove the fixed timer, update privacy copy, the D1 guide, and the draw.io schema, then run focused tests and an OpenNext build.
4. Generate a unique production signing secret, configure `SURVEY_SUBMISSION_SECRET` as an encrypted Worker runtime secret, and retain separate non-production configuration locally.
5. Apply the committed migration to remote D1 before deploying the Worker. Existing code remains compatible because the migration only adds tables.
6. Deploy the client and Worker together, complete one controlled signup and survey, and verify one linked response, the expected channel rows, and the signup completion timestamp without printing unrelated personal data.
7. If application rollback is needed, redeploy the previous Worker. Leave the additive empty-or-compatible tables in place; do not run a destructive down migration. Investigate and remove only controlled test data through an explicit targeted command.
