# SoleSheet Backend Roadmap

This document records the planned path from the current frontend-only waitlist to a small production backend on Cloudflare. It is intentionally divided into separate OpenSpec changes so each phase can be implemented, reviewed, and deployed independently.

## Current direction

- Host the Next.js application on Cloudflare Workers through OpenNext.
- Use Cloudflare Web Analytics for visits and page-view reporting.
- Use Cloudflare D1 for waitlist signups and completed survey responses.
- Save the waitlist signup before opening the survey.
- Allow the survey to be closed without losing the saved signup.
- Save survey answers when the visitor selects **Finish the survey** rather than after every question.
- Keep privileged database access on the server. Browser code must never receive D1 credentials or privileged Cloudflare API tokens.
- Start with Wrangler migrations and prepared SQL instead of adding an ORM.

This is a database selection rather than a data migration: Firebase was investigated, but no production Firebase database or existing records need to be moved.

## Target request flow

```text
Visitor
   |
   | submits name, email, and consent
   v
POST /api/waitlist
   |
   | server validation + prepared SQL
   v
Cloudflare D1: waitlist_signups
   |
   | database confirms the signup was stored
   v
Signup success state -> survey opens automatically
   |
   | visitor answers any number of questions
   | and selects Finish the survey
   v
POST /api/survey
   |
   | server validation + linked database write
   v
Cloudflare D1: survey response tables
```

If the visitor closes the survey or browser after the first database confirmation, their waitlist signup remains stored. Survey answers that were not finished and submitted are not retained in the initial version.

## Phase overview

| Phase | OpenSpec change | Outcome | Status |
|---|---|---|---|
| 0 | `migrate-landing-site-to-zero-cost-hosting` | Establish the Cloudflare Worker deployment foundation | Complete |
| 1 | `persist-waitlist-signups-with-d1` | Store validated waitlist signups and consent records | Complete |
| 2 | `persist-validation-survey-with-d1` | Store completed surveys linked to their waitlist signup | Complete |
| 3 | `harden-and-operate-waitlist-data` | Add the operational, privacy, abuse, export, and recovery procedures needed for collected data | Implemented; pending acceptance |
| 4 | `add-cloudflare-traffic-analytics` | Measure visits and page views without writing each visit to D1 | Next after Phase 3 acceptance |
| 5 | To be proposed only if needed | Add protected reporting or lightweight administration | Optional |

## Phase 0: Cloudflare hosting foundation (complete)

The application has a deployed and verified Worker at its Cloudflare provider URL. This is sufficient for the current public waitlist and for adding D1 because a D1 database is exposed to the application through a Worker binding.

Completed outcomes:

- Added the Cloudflare OpenNext build, preview, deployment, and type-generation workflow.
- Verified public routes, assets, metadata, responsive interactions, and free-plan configuration on the deployed provider URL.
- Preserved the existing Vercel deployment and domain configuration as an independent fallback.
- Established a Worker-compatible foundation for later D1 bindings and Route Handlers.

This phase does not create or bind a database. Custom-domain purchase and attachment, DNS cutover, and Vercel detachment are intentionally deferred until the website is otherwise finished and will belong to a separate future change.

## Phase 1: Persist waitlist signups with D1

Completed change: `persist-waitlist-signups-with-d1`

Goal: reliably save a visitor's waitlist details before inviting them into the survey.

Planned scope:

### Database foundation

- Create separate local-development and production D1 databases.
- Add the D1 binding to the Worker configuration.
- Generate TypeScript binding types.
- Add versioned SQL migration files and document how to apply them locally and remotely.
- Add a small server-side data-access module so SQL is not scattered through UI components.

### Signup storage

- Create the `waitlist_signups` table.
- Store a generated signup ID, normalized email, optional display name, consent timestamp, privacy-policy version, and creation timestamp.
- Enforce duplicate prevention with a database-level unique constraint on normalized email.
- Use ISO 8601 text timestamps consistently because SQLite does not have a native date-time type.

Tentative schema:

```sql
CREATE TABLE waitlist_signups (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  email_normalized TEXT NOT NULL UNIQUE,
  name TEXT,
  consented_at TEXT NOT NULL,
  privacy_policy_version TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  survey_completed_at TEXT
);
```

The exact schema will be finalized in the phase's OpenSpec design before implementation.

### API and frontend integration

- Add `POST /api/waitlist` as a server-side Next.js Route Handler.
- Repeat all important validation on the server; client validation remains a user-experience aid, not the security boundary.
- Accept only the expected content type and a small request body.
- Use prepared statements with bound values for every database query.
- Return safe, generic failures without exposing SQL details or whether a particular email is already registered.
- Replace the simulated signup delay with the real API request.
- Show retryable UI feedback if the database request fails.
- Show signup success and automatically open the survey only after D1 confirms the signup is stored.
- Retain a safe signup reference in the active browser flow so a later survey submission can be linked to it.

### Privacy and basic abuse protection

- Update the privacy policy before production data collection begins.
- Clearly describe the fields collected, purposes, retention approach, processors, and contact/deletion method.
- Avoid logging submitted names, emails, or survey answers.
- Protect signup persistence with low-friction Cloudflare Turnstile verification before D1 access.

Completion criteria:

- A valid signup is present in production D1 after the user receives success feedback.
- Invalid input is rejected by the server even if browser validation is bypassed.
- Duplicate submissions do not create duplicate signup rows.
- Closing the survey after signup does not remove the saved signup.
- Local and production migrations are reproducible from the repository.

## Phase 2: Persist completed survey responses with D1 (complete)

Completed change: `persist-validation-survey-with-d1`

Goal: save the survey answers the visitor chooses to submit and relate them to the correct waitlist signup.

Planned scope:

- Create a `survey_responses` table linked to `waitlist_signups` by a foreign key.
- Use a separate `survey_sales_channels` table for the multi-select sales-channel question, unless the phase design demonstrates that JSON text is more appropriate.
- Add `POST /api/survey` as a server-side Route Handler.
- Validate question values, custom `Other` text limits, and allowed option values on the server.
- Allow optional questions to remain unanswered.
- Submit the current answers once when **Finish the survey** is selected.
- Write the response and repeated channel values atomically using a D1 batch where appropriate.
- Mark the associated signup's survey completion timestamp.
- Preserve the branded loading-to-success transition during the real request.
- Provide a retry path that keeps the visitor's answers in the browser if submission fails.
- Prevent an arbitrary visitor from attaching a survey response to another person's signup.

Initial non-goal: autosaving every answer or restoring an unfinished survey on another device. This can be reconsidered using actual completion data.

Completion criteria:

- A finished survey is stored once and linked to its signup.
- Optional and partially answered surveys can be submitted successfully.
- Failed requests retain the answers for retry while the page remains open.
- The database does not contain survey records without a valid signup relationship.

## Phase 3: Harden and operate collected data (implemented; pending acceptance)

Change: `harden-and-operate-waitlist-data`

Goal: make the small backend maintainable and responsible once real data is accumulating.

Implemented scope:

- Added reusable aggregate D1 health, integrity, retention, deletion, and query-plan procedures that do not print submitted content.
- Established a monthly look-ahead cleanup during the first five days of each month so inactive records are removed before exceeding 12 months.
- Defined verified privacy-request deletion of a signup and its cascaded survey/channel rows, including replay after recovery.
- Documented D1 Time Travel as the primary recovery path and short-lived protected SQL exports for operations that warrant a portable snapshot.
- Added one allow-listed structured outcome per waitlist or survey request and persisted it in Workers Logs without contacts, answers, tokens, bodies, bound values, or raw errors.
- Established monthly Workers Logs and Turnstile reviews with evidence thresholds that trigger a separate abuse-control proposal rather than automatic blocking.
- Verified operational queries with `EXPLAIN QUERY PLAN`; existing indexes are sufficient at current volume, so no speculative migration was added.
- Replaced phase-specific release notes with reusable production migration, verification, rollback, and forward-recovery checklists.
- Updated the privacy notice and consent version to match the active retention, deletion, and recovery procedures.

Completion criteria:

- Data can be exported, deleted on request, and restored using documented procedures.
- Operators can diagnose failures without exposing form contents in logs.
- The privacy policy and actual retention/deletion behavior agree.

## Phase 4: Add Cloudflare traffic analytics

Proposed change: `add-cloudflare-traffic-analytics`

Goal: answer questions such as how many people visited, where visits came from, and which public pages were viewed after the forms can reliably store conversions.

Planned scope:

- Enable Cloudflare Web Analytics for the public site.
- Confirm the analytics setup works on the current production provider URL and remains ready for a future custom domain.
- Document where to view traffic reports.
- Define which measurements matter initially, such as visits, page views, referrers, countries, devices, and waitlist conversion rate.
- Review privacy-page wording and cookie implications for the chosen analytics configuration.
- Use Workers observability for operational errors rather than treating request logs as product analytics.

Why this is separate from D1: Cloudflare already provides a purpose-built traffic analytics service. Recording every page view in D1 would create unnecessary writes, additional privacy responsibilities, and reporting work.

Completion criteria:

- Production visits appear in the Cloudflare analytics dashboard.
- The analytics configuration does not collect more information than the privacy policy describes.
- Visit counts can be compared with stored D1 signup counts to calculate waitlist conversion.
- No individual visit is manually inserted into D1.

## Phase 5: Optional reporting or administration

This phase should be proposed only when manually querying or exporting D1 becomes inconvenient.

Possible scope:

- A protected summary dashboard for signup and survey counts.
- Aggregated answers by inventory size, current process, preferred feature, or sales channel.
- A protected CSV export action.
- Authentication and authorization for administrative access.

This is deliberately deferred. A public waitlist does not initially need a custom admin application, and Cloudflare's dashboard plus Wrangler queries are sufficient while volume is small.

## D1 concepts we will use

| Concept | Meaning in SoleSheet |
|---|---|
| Database | The managed SQLite database hosted by Cloudflare |
| Table | A structured collection, such as signups or survey responses |
| Row | One stored signup or one submitted survey |
| Primary key | The stable ID that identifies a particular record |
| Unique constraint | A database rule that prevents duplicate normalized emails |
| Foreign key | The rule that connects a survey response to an existing signup |
| Index | An additional database structure that speeds up specific lookups |
| Migration | A versioned SQL file that creates or changes the database schema |
| Binding | The secure Worker-side object, such as `env.DB`, used to access D1 |
| Prepared statement | SQL with separately bound input values, preventing SQL injection |
| Local database | A development database used without modifying production records |
| Remote database | The production D1 database managed by Cloudflare |

## Development and deployment rules

- Apply and verify every migration locally before applying it remotely.
- Never use direct production SQL as a substitute for a committed migration when changing the schema.
- Keep local and production databases distinct.
- Back up or verify the recovery bookmark before a risky production schema change.
- Use database constraints in addition to TypeScript and form validation.
- Do not place privileged Cloudflare tokens or database access in client-side code.
- Do not collect fields that SoleSheet does not currently need.
- Avoid adding an ORM until repeated SQL complexity demonstrates a clear benefit.
- Implement, review, test, sync, and archive each OpenSpec change before starting the next dependent phase.

## Decisions recorded

| Decision | Reason |
|---|---|
| D1 instead of Firebase | D1 is Worker-native, uses familiar SQL, and avoids the Firebase Admin compatibility problem found during the Cloudflare hosting spike |
| Cloudflare Analytics instead of D1 visit rows | It is designed for traffic reporting and avoids unnecessary database writes and personal-data scope |
| Save signup before showing the survey | The contact remains recorded even if the visitor closes the survey or browser |
| Submit survey once at Finish | Simpler and more reliable for the first release than per-question autosaving |
| Separate OpenSpec changes | Keeps deployment risk, review, and rollback manageable |
| Raw prepared SQL initially | The planned schema is small and does not yet justify ORM complexity |
| Server validation in addition to client validation | Browser-side validation can be bypassed |
| Leave duplicate signup data unchanged | Keeps retries private and prevents an unverified repeat submission from replacing the original contact or consent evidence |
| Short-lived signed survey continuation | Links a finished survey to a confirmed signup without exposing a privileged database identifier |
| Normalized survey sales-channel table | Preserves relational integrity and supports multi-select reporting without JSON parsing |
| Monthly 12-month retention look-ahead | Keeps the manual process small while removing records before they exceed the published inactivity limit |
| Workers Logs instead of D1 telemetry rows | Supports failure diagnosis without adding database writes or another personal-data table |

## Open question for a future phase

- Which production domain will be used in privacy disclosures and Cloudflare analytics configuration.

## Recommended next action

Review and accept `harden-and-operate-waitlist-data`. After it is synced and
archived, propose `add-cloudflare-traffic-analytics` as the next independent
backend phase.
