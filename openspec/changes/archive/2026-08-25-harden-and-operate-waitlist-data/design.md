## Context

See `proposal.md` for motivation and `specs/waitlist-data-operations/spec.md` for the behavioral contract. SoleSheet currently runs as a Next.js 16 application through OpenNext on a Cloudflare Worker. `POST /api/waitlist` and `POST /api/survey` use prepared D1 statements and already emit a few JSON-formatted failure messages, while `docs/d1-operations.md` contains initial migration, count, deletion-request, and failure-diagnosis notes.

Production data is small enough for private owner-run operations. The current schema already supports the important operations: normalized email is unique, a survey is keyed by signup, child channel rows have a composite key, and both survey tables cascade when a signup is deleted. The privacy notice promises deletion or anonymization within 12 months after the last interaction. SoleSheet currently uses the Workers Free plan, whose D1 Time Travel window must be checked at operation time and must not be documented as the paid-plan window.

## Goals / Non-Goals

**Goals:**

- Turn the existing partial notes into one safe, repeatable runbook with explicit local/remote boundaries, approval points, and verification steps.
- Make every form request produce one allow-listed operational outcome that can be filtered in Workers Logs without storing submitted content.
- Enforce the existing 12-month promise with a practical manual schedule while production volume is small.
- Make deletion, retention, schema release, export, and restore procedures recoverable and testable using the existing D1 schema and Cloudflare tooling.
- Leave the database unchanged unless query-plan evidence demonstrates a missing index.

**Non-Goals:**

- A public data-management endpoint, owner dashboard, scheduled Worker, cron trigger, email-verification flow, or staff role system.
- Product traffic analytics, per-user behavioral analytics, or storing request telemetry in D1.
- An always-on external backup pipeline, R2 bucket, third-party logging service, ORM, or paid Cloudflare upgrade.
- Automatic rate blocking or a second visitor challenge without production evidence.

## Decisions

### 1. Keep operational procedures in one runbook with a small SQL-template directory

`docs/d1-operations.md` remains the owner-facing entry point. Reusable non-personal queries will live in a shallow `ops/d1/` directory, grouped by intent rather than copied through the document. Expected templates are aggregate health/integrity checks, retention preview, retention deletion, and query-plan review. Request-specific email values stay out of committed files; verified deletion requests continue through a private D1 console or an ephemeral owner-only query.

Each production mutation is presented as a checklist with a preview, current bookmark, explicit approval, mutation, aggregate verification, and recovery step. Local examples remain the default, and production examples must visibly include `--remote`.

Alternative considered: build an authenticated admin application or a general-purpose command-line client. That adds authentication, authorization, and another sensitive-data surface before the volume justifies it. The private runbook is safer and easier to audit for the current single-owner operation.

### 2. Use a monthly look-ahead retention sweep

The owner runs retention cleanup during the first five days of every month. A signup's last interaction is the latest non-null value among `waitlist_signups.created_at`, `waitlist_signups.updated_at`, `waitlist_signups.survey_completed_at`, and the linked survey's submitted or updated timestamp. A duplicate signup remains idempotent and does not extend retention because it does not update the stored record.

The cutoff looks ahead to the next scheduled run: it includes records whose 12-month anniversary will occur before the first day of the following month. In practical terms, a run in August 2026 includes records whose last interaction occurred before September 1, 2025. Records are therefore removed after roughly 11 to 12 months of inactivity rather than being allowed to exceed the 12-month promise between monthly runs.

Preview and deletion use the same reviewed cutoff. Deletion begins at `waitlist_signups`; existing foreign-key cascades remove the linked survey and sales-channel rows. Afterward, the same aggregate health and orphan checks run again. If a monthly run is missed, the owner runs it immediately, records the operational exception without personal data, and pauses collection if the schedule cannot remain reliable.

Alternative considered: add a daily scheduled Worker now. Automation provides tighter enforcement but introduces a new execution path, production schedule, failure alert, and destructive job. It becomes the preferred follow-up once manual operation is unreliable or volume grows.

### 3. Use Time Travel first and short-lived exports only when warranted

D1 Time Travel is the primary recent recovery path because Cloudflare maintains it automatically. Before a production mutation, the runbook checks `d1 info`, confirms the active plan's recovery window, and records the current bookmark in the private operation record. A restore uses a reviewed bookmark or RFC3339 timestamp, requires explicit approval because it overwrites D1 in place, and retains the `previous_bookmark` returned by Cloudflare as the immediate undo path.

A full SQL export is added only for an operation whose risk or duration needs a portable snapshot beyond the immediate bookmark workflow. It is written to an owner-controlled temporary directory outside the repository, given restrictive local permissions, checksummed, and restore-tested against a disposable local database without printing rows. It is deleted after the operation's verification window, which defaults to seven days unless the operation records a shorter period. Exports are never the source for reporting.

After any restore, the owner reruns the current retention sweep and replays verified deletion requests received after the restore target using the private privacy-request mailbox. This prevents a backup or Time Travel restore from silently reintroducing data that should remain deleted. The existing notice already allows the minimum request information needed to honor a withdrawal or deletion.

Alternative considered: retain periodic exports indefinitely or automate D1 exports into R2. Longer retention increases the amount and lifetime of personal data and creates backup-deletion duties. It is unnecessary while Time Travel plus operation-scoped exports cover the present risk.

### 4. Centralize allow-listed operational events

A small server-only helper will own the structured event shape and severity. Each handled waitlist and survey request receives a random request ID at handler entry and emits one final event with only:

- a stable event name;
- route (`waitlist` or `survey`);
- outcome from a closed allow-list such as `success`, `invalid_request`, `verification_rejected`, `invalid_session`, `configuration_unavailable`, or `persistence_failed`;
- HTTP status; and
- request ID.

The request ID may also be returned in a response header so an owner can correlate a privately reported failure. The helper accepts no arbitrary metadata or error object. Existing `errorName` fields and stringified JSON calls are replaced with a typed object passed to the appropriate console severity. Tests cover every endpoint outcome and assert that event keys stay within the allow-list.

`wrangler.jsonc` will explicitly enable persisted Workers Logs. Full sampling is acceptable initially because volume is low and the custom event contains no submitted content; the runbook requires sampling to be reviewed if log volume grows. Traces and external log destinations remain disabled.

Alternative considered: store operational events in D1. That mixes telemetry with collected waitlist data, adds writes on every request, and creates another retention surface. Workers Logs already provides the needed filtering.

### 5. Review Turnstile and endpoint outcomes before changing abuse behavior

The owner reviews the Turnstile dashboard and form outcome logs monthly and after an incident. A separate abuse-control proposal is triggered when at least one of these conditions is observed:

- form traffic or accepted writes create material availability or cost pressure;
- accepted submissions exceed five times the prior seven-day daily median for two consecutive days without a known campaign;
- likely-bot or unsolved Turnstile activity rises together with sustained rejected endpoint attempts; or
- two or more credible legitimate-user reports within seven days indicate Turnstile friction or false rejection.

These thresholds trigger investigation and a proposal, not automatic blocking. That avoids silently rejecting a real marketing spike or adding friction based on one noisy metric.

Alternative considered: immediately add IP-based rate limiting. IP addresses are unreliable identifiers for mobile and shared networks, and adding a limiter before observing misuse could block legitimate Filipino resellers.

### 6. Require query-plan evidence before adding indexes

Representative local data will be used with `EXPLAIN QUERY PLAN` for normalized-email deletion, aggregate counts, relationship checks, and the retention join. The existing unique and primary-key indexes are expected to cover email and relationship lookups. A retention scan is acceptable at current volume; no migration is planned unless the measured plan and expected row count show otherwise.

If an index becomes justified, it is introduced through a new numbered migration and tested locally. Applied migrations are immutable. A schema release follows this order: test and query-plan review, pending-migration review, current bookmark, optional export, explicit approval, remote migration, dependent Worker deploy, aggregate/integrity checks, and a controlled public-flow check.

Alternative considered: add timestamp indexes preemptively. Extra indexes increase write and migration cost and may not help a small joined retention scan. The query planner provides a better decision boundary.

### 7. Version the privacy notice when the procedures take effect

The retention section will name the 12-month inactivity limit and clarify how the last interaction is derived. The rights section will state that identity may be verified, linked waitlist and submitted-survey rows are removed together, and automatic recovery history or short-lived operation snapshots can temporarily contain an earlier state. It will also explain that deletions are reapplied if recovery restores an earlier state. The privacy notice version and effective date change in the same release as the operating procedure.

Alternative considered: leave the current general wording unchanged. The current notice is directionally correct, but the operational phase can describe the actual process more precisely and reduce ambiguity.

## Risks / Trade-offs

- [A monthly manual sweep can be forgotten] → Use a recurring owner calendar reminder, a look-ahead cutoff, and the explicit pause-or-automate rule if reliable execution cannot be maintained.
- [A destructive query targets production accidentally] → Default documentation to local commands, make `--remote` visually explicit, preview counts first, require a bookmark and approval, and verify afterward.
- [Time Travel restore reintroduces previously removed data] → Rerun retention and replay deletion requests received after the restore target before declaring recovery complete.
- [An SQL export creates another copy of personal data] → Create it only when warranted, keep it outside the repo with restricted access, never use it for reporting, and delete it after the short recovery window.
- [Full log sampling grows unexpectedly] → Keep fields minimal, review volume monthly, and lower sampling through a later configuration change when production volume warrants it.
- [Coarse logs omit a detail needed for one incident] → Reproduce locally or add a new reviewed non-personal outcome category; never temporarily log request bodies or form fields.
- [A five-times-baseline spike is legitimate interest] → Treat thresholds as investigation triggers only; do not automatically reject or rate-limit visitors.

## Migration Plan

1. Add the typed operational-event helper and endpoint tests, then convert both form routes to one allow-listed event per outcome.
2. Explicitly enable persisted Workers Logs in `wrangler.jsonc`, validate the configuration, and document dashboard and real-time-log filters.
3. Add the reusable D1 SQL templates and expand `docs/d1-operations.md` with monthly retention, privacy deletion, export verification, Time Travel restore, abuse review, query-plan review, migration, and rollback checklists.
4. Exercise every query and destructive procedure against seeded local D1 data, including cascade deletion and retention boundary cases. Record the query-plan decision; add a migration only if the evidence requires one.
5. Update the privacy notice, effective date, and notice version so new consent records reference the active practice.
6. Run the repository checks and an OpenNext preview. Confirm the logs contain only allowed keys and the public success and failure behavior remains generic.
7. Before production deployment, confirm the current Time Travel bookmark and recovery window. Deploy the Worker and verify aggregate counts, integrity checks, structured outcomes, and one controlled waitlist-plus-survey flow.
8. Mark the monthly retention and abuse review dates in the private owner calendar. Do not execute a production retention deletion merely to test the release.

Application rollback redeploys the prior compatible Worker without deleting D1 or editing migrations. If a schema migration was added, prefer a forward corrective migration; use Time Travel or a verified export only after explicit destructive-action approval. If rollback would remove required privacy-safe diagnostics or retention enforcement, keep collection paused until the forward fix is deployed.
