## Why

SoleSheet now stores real waitlist contacts and survey answers, but the owner needs a repeatable way to inspect, export, delete, retain, diagnose, and recover that data without unnecessarily exposing personal information. This change closes that operational gap before more production records accumulate and makes the implementation match the commitments already published in the privacy notice.

## What Changes

- Add an owner-run D1 operations runbook for aggregate health checks, protected exports, verified privacy-request deletion, retention cleanup, and post-operation verification.
- Operationalize the existing retention promise by identifying records whose last recorded interaction is more than 12 months old and providing a reviewed, manual cleanup procedure that also removes linked survey rows.
- Document two complementary recovery paths: D1 Time Travel for recent point-in-time recovery and short-lived, protected SQL exports as portable recovery snapshots for operations that warrant one.
- Add privacy-safe structured diagnostics for waitlist and survey request outcomes, with correlation identifiers and coarse failure categories but no contacts, answers, tokens, raw bodies, or SQL details.
- Define how the owner reviews Workers Logs and Turnstile Analytics before deciding whether stronger rate limiting or abuse controls are justified.
- Review actual operational queries with `EXPLAIN QUERY PLAN` and add indexes only when evidence shows they are needed.
- Replace the phase-specific release notes with a reusable production migration, verification, and forward-recovery checklist.
- Update the privacy notice and notice version only where necessary so its retention, deletion, and operational practices exactly match the implemented procedure.
- Keep these operations private and manual at the current waitlist scale; this change does not add an admin dashboard, public data-management endpoint, scheduled deletion job, traffic analytics, or a new paid service.

## Capabilities

### New Capabilities

- `waitlist-data-operations`: Defines privacy-safe inspection, export, deletion, retention enforcement, monitoring, query review, migration, and recovery behavior for the production D1 data set.

### Modified Capabilities

None.

## Impact

- Affects the D1 operations and backend-roadmap documentation, privacy notice/version, Worker observability configuration, and structured diagnostics in `/api/waitlist` and `/api/survey`.
- May add version-controlled, non-PII SQL templates or narrowly scoped operator helpers for repeatable checks and cleanup; production exports and request-specific values remain outside the repository.
- Uses the existing D1 database, foreign-key cascades, Wrangler, Workers Logs, and Turnstile Analytics. No new database, public API, ORM, analytics product, or external dependency is required.
- Production data-changing and restore commands remain explicit owner actions requiring a current bookmark or protected export, target review, and post-operation verification.
