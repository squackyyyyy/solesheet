## Why

Waitlist contacts are now stored reliably, but the product-validation answers that should guide SoleSheet's first release still disappear when the page reloads. The next backend phase should persist only deliberately finished surveys, link them to the correct signup, and preserve the existing optional, low-friction experience when submission fails.

## What Changes

- Add versioned D1 tables for one survey response per waitlist signup and its zero-or-many selected sales channels.
- Return a short-lived, tamper-resistant survey submission token after a confirmed new or duplicate signup so the browser can link a survey without receiving privileged database access.
- Add `POST /api/survey` with bounded request parsing, allow-listed server validation, safe idempotent duplicate handling, and atomic D1 persistence.
- Submit all currently answered questions only when the visitor selects **Finish this survey**; unanswered optional questions remain valid and unfinished surveys are not autosaved.
- Replace the five-second prototype delay with the real request while retaining the anchored branded loading-to-success transition and adding an answer-preserving retry state.
- Add a clickable success-state contact for respondents who need SoleSheet to review a requested response change manually.
- Update the privacy notice and D1 operating documentation for stored survey answers, the new migration, and production verification.

## Capabilities

### New Capabilities

- `survey-persistence`: Securely validate, link, and durably store a completed optional survey and its selected sales channels in D1.

### Modified Capabilities

- `validation-survey`: Change the non-saving prototype ending into an explicit submit, retry, and confirmed-success flow while keeping all questions optional and answers temporary until Finish is selected.
- `waitlist-persistence`: Supply a protected, time-limited continuation token after the confirmed signup outcome and retire the Phase 1 prohibition on survey persistence.
- `brand-loading-animation`: Drive the survey's loading-to-success sequence from the real network outcome instead of a fixed five-second test delay.

## Impact

- Adds a D1 migration for `survey_responses` and `survey_sales_channels` and updates the maintained schema diagram and operations guide.
- Adds a server-only survey token utility, survey validation contract, D1 repository, and `/api/survey` Route Handler.
- Changes the successful `/api/waitlist` response to include an opaque survey submission token while preserving its generic new-or-duplicate outcome.
- Updates the waitlist survey client, journey state, privacy page, generated Cloudflare environment types, and focused unit, route, component, and browser tests.
- Adds a required server-only survey-token signing secret; no ORM, client database credentials, survey autosave, cross-device resume, analytics events, or administrative dashboard is introduced.
