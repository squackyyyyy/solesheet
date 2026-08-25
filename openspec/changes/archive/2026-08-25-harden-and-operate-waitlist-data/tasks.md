## 1. Privacy-Safe Operational Events

- [x] 1.1 Add a server-only typed logging helper whose event schema accepts only the approved route, outcome, status, and request-ID fields, with unit tests for severity and allowed keys.
- [x] 1.2 Update `POST /api/waitlist` to create a request ID at handler entry, emit exactly one structured outcome for each success or failure path, remove arbitrary error metadata, and expose the correlation ID safely in the response headers.
- [x] 1.3 Update `POST /api/survey` to use the same one-event outcome contract and correlation header without logging the continuation token or submitted answers.
- [x] 1.4 Extend both route test suites to cover validation, verification/session, configuration, persistence, and success outcomes and to prove that logs contain no submitted content, credentials, bodies, or raw errors.
- [x] 1.5 Explicitly configure persisted Workers Logs with full initial log sampling and no trace or external-log destination, then validate the Wrangler configuration against the installed schema.

## 2. Repeatable D1 Operations

- [x] 2.1 Add shallow `ops/d1/` SQL templates for aggregate health counts, relationship-integrity checks, and schema checks without selecting contacts, identifiers, answers, or free text.
- [x] 2.2 Add retention preview and deletion templates that share the monthly look-ahead cutoff and derive the last interaction from signup and submitted-survey timestamps.
- [x] 2.3 Seed representative local D1 records around the retention boundary and verify that preview and deletion preserve newer rows while cascade-removing due signup, survey, and channel rows.
- [x] 2.4 Run `EXPLAIN QUERY PLAN` against email lookup, relationship, aggregate, and retention queries; record the result and add a numbered migration only if the evidence demonstrates a necessary index.

## 3. Owner Operations Runbook

- [x] 3.1 Reorganize `docs/d1-operations.md` around safe local defaults and visibly separate production commands, authenticated-owner requirements, previews, approval checkpoints, and aggregate verification.
- [x] 3.2 Complete the verified privacy-request procedure, including minimum-data lookup, generic requester wording, cascade verification, private request-record handling, and replay after recovery.
- [x] 3.3 Document the first-five-days monthly retention schedule, look-ahead cutoff, recovery checkpoint, deletion verification, missed-run response, and pause-or-automate rule.
- [x] 3.4 Document operation-scoped SQL export creation, non-sensitive verification, protected storage, disposable local restore testing, default seven-day removal, and the prohibition on commits or reporting use.
- [x] 3.5 Document current-plan D1 Time Travel checks, bookmark and timestamp restore steps, destructive approval, undo bookmark capture, and post-restore retention/deletion replay.
- [x] 3.6 Document Workers Logs filters, Turnstile Analytics review, monthly and incident-driven review timing, intervention thresholds, and when to open a separate abuse-control proposal.
- [x] 3.7 Replace the phase-specific release notes with a reusable migration, deployment, verification, application rollback, and forward-recovery checklist that never treats database deletion as rollback.

## 4. Privacy and Roadmap Alignment

- [x] 4.1 Update the privacy notice to describe the 12-month last-interaction calculation, monthly enforcement, linked-data deletion, temporary recovery history or snapshots, deletion replay after restore, and limited request-record retention.
- [x] 4.2 Update the privacy notice version and effective date in the same change so future consent records identify the operationally accurate notice.
- [x] 4.3 Update `docs/backend-roadmap.md` to reflect the finalized Phase 3 decisions and make Phase 4 traffic analytics the next phase only after this change is accepted.

## 5. Verification and Production Handoff

- [x] 5.1 Run focused logging, route, privacy, and D1-operation tests, then run the repository typecheck, lint, and standard test suite.
- [x] 5.2 Run the Next.js and OpenNext builds plus Wrangler configuration or dry-run validation to confirm the production Worker accepts the observability configuration.
- [x] 5.3 Inspect captured test events and local operation output to confirm no personal fields, survey content, tokens, bound SQL values, or raw database errors are emitted.
- [x] 5.4 Record the explicit owner-only production activation steps, including current bookmark and recovery-window confirmation, aggregate post-deploy checks, a controlled public flow, and recurring calendar reminders; leave remote deletion, restore, and retention commands unexecuted unless separately approved.
