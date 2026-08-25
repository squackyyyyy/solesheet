## Purpose

Provide repeatable, privacy-conscious operating procedures for SoleSheet's production waitlist and survey data so the owner can maintain, recover, and remove records without exposing personal information unnecessarily.

## ADDED Requirements

### Requirement: Routine inspection minimizes personal-data exposure
The system SHALL provide owner-run health checks that report aggregate signup, survey, channel, integrity, and retention-candidate counts without returning contacts, survey answers, free text, tokens, or row identifiers. Commands that can access production data SHALL clearly distinguish local from remote execution and SHALL require an authenticated, owner-controlled environment.

#### Scenario: Owner checks production data health
- **WHEN** the owner runs the documented routine production checks
- **THEN** the results show counts and integrity outcomes without printing personal data or individual answers

#### Scenario: Development check runs locally
- **WHEN** the owner follows the local inspection procedure without selecting remote execution
- **THEN** only the local D1 state is queried and production records are not accessed

### Requirement: Recovery snapshots are protected and verifiable
The system SHALL document how to create a complete SQL export before a data-changing operation that warrants a portable recovery snapshot, verify that the export contains the expected schema and table counts, keep the export outside version control in an owner-controlled location, and securely remove it after the documented recovery window. An export SHALL be treated as personal data and SHALL NOT be printed, committed, attached to shared tooling, or used as an ordinary reporting file.

#### Scenario: Risky operation requires a portable snapshot
- **WHEN** the owner prepares for a production operation whose recovery plan calls for an export
- **THEN** a protected full export is created, verified using non-sensitive metadata, associated with the operation time, and kept outside the repository

#### Scenario: Export recovery window ends
- **WHEN** the operation has been verified and its documented recovery window has elapsed
- **THEN** the owner securely removes the export and records only non-personal completion metadata

### Requirement: Recent production state can be recovered deliberately
The system SHALL document D1 point-in-time recovery using a current bookmark and a reviewed target bookmark or timestamp. A production restore SHALL be treated as destructive, SHALL require explicit owner approval, SHALL record the bookmark that can undo the restore, and SHALL be followed by schema, aggregate-count, relationship-integrity, and application health checks. The recovery procedure SHALL state the active Cloudflare plan's Time Travel window rather than assuming paid-plan retention.

#### Scenario: Owner prepares a data-changing production operation
- **WHEN** the owner reaches the production change checkpoint
- **THEN** the current recovery bookmark and applicable recovery window are confirmed before the operation continues

#### Scenario: Point-in-time restore is required
- **WHEN** the owner approves restoring production D1 to a reviewed bookmark or timestamp
- **THEN** the database is restored in place, the previous bookmark is retained as the undo path, and post-restore checks run before service is declared healthy

### Requirement: Verified deletion requests remove the linked data set
The system SHALL provide a private owner procedure to verify a requester's identity, normalize the verified email using the same rule as signup persistence, locate only the minimum metadata needed to scope the request, and delete the matching signup plus every linked survey response and sales-channel row. The procedure SHALL return or record only a generic completion outcome outside the private owner session and SHALL NOT reveal whether the email was registered.

#### Scenario: Verified requester has a stored signup
- **WHEN** the owner completes the deletion procedure for a verified email that matches a signup
- **THEN** the signup and all of its linked survey and sales-channel data are removed and aggregate relationship checks confirm that no linked rows remain

#### Scenario: Verified requester has no stored signup
- **WHEN** the owner completes the deletion procedure for a verified email with no match
- **THEN** no unrelated row changes and the requester receives the same generic completion wording used for a matching request

### Requirement: Retention cleanup enforces the published limit
The system SHALL calculate a signup's last recorded interaction from its stored signup and submitted-survey timestamps and SHALL provide a recurring owner-run cleanup that removes records before they would exceed 12 months of inactivity. Each run SHALL preview only aggregate candidate counts, use a reviewed cutoff that accounts for the next scheduled run, establish the documented recovery checkpoint, delete through the signup relationship so linked survey data is also removed, and verify aggregate counts and relationship integrity afterward.

#### Scenario: Records will reach the retention limit before the next run
- **WHEN** a scheduled retention preview finds signups whose last recorded interaction will be more than 12 months old before the following scheduled cleanup
- **THEN** those signups are included in the reviewed deletion scope without printing their contacts or survey answers

#### Scenario: Retention cleanup completes
- **WHEN** the owner approves and runs the retention deletion for the reviewed cutoff
- **THEN** the due signups and their linked survey data are removed while newer records remain unchanged

#### Scenario: Cleanup schedule cannot be maintained
- **WHEN** the owner cannot reliably run the manual procedure often enough to meet the published limit
- **THEN** data collection SHALL pause or automated retention enforcement and its operational safeguards SHALL be implemented before the limit can be exceeded

### Requirement: Operational diagnostics exclude submitted content
Waitlist and survey endpoints SHALL emit structured operational outcomes with a route identifier, coarse result category, HTTP status, and non-personal correlation identifier sufficient to diagnose validation, verification, authorization, configuration, and persistence failures. Diagnostics and persisted Workers Logs SHALL NOT intentionally include emails, names, survey answers, Other text, Turnstile tokens or responses, continuation tokens, request bodies, bound SQL values, or raw database errors. Public failures SHALL remain generic and SHALL NOT claim persistence success when a required write fails.

#### Scenario: Persistence request fails in production
- **WHEN** a waitlist or survey request encounters a server, configuration, or database failure
- **THEN** the visitor receives the existing generic retryable response and the diagnostic event contains only the allowed operational fields

#### Scenario: Owner investigates a reported failure
- **WHEN** the owner filters Workers Logs by time, route, result category, status, or correlation identifier
- **THEN** the owner can identify the failure class without viewing submitted form contents or credentials

### Requirement: Abuse controls are evidence-driven
The system SHALL document a recurring review of endpoint outcome counts and Turnstile challenge analytics, including verification failures and interactive-versus-non-interactive solve behavior. Stronger rate limiting or challenge controls SHALL be proposed as a separate change only when observed misuse, cost, availability, or false-positive evidence justifies the additional complexity and user friction.

#### Scenario: Turnstile and endpoint outcomes remain healthy
- **WHEN** the review shows ordinary submission volume, acceptable solve behavior, and no material automated-write pattern
- **THEN** the existing managed Turnstile protection remains in place without adding another visitor challenge or rate limiter

#### Scenario: Review identifies material misuse
- **WHEN** repeated automated attempts, resource pressure, or abnormal verification outcomes cross a documented intervention threshold
- **THEN** the owner records the evidence and opens a separately scoped abuse-control change before altering production behavior

### Requirement: Query and schema changes require evidence and recovery planning
Operational and reporting queries SHALL be reviewed against representative local data using the database query planner before a new index is added. Production schema changes SHALL use a committed forward migration that is tested locally, reviewed with a recovery checkpoint, applied before dependent code, and verified afterward. Applied migrations SHALL NOT be edited, and application rollback SHALL preserve the database and collected records.

#### Scenario: Operational query is reviewed
- **WHEN** a count, deletion, retention, or future reporting query is considered for regular use
- **THEN** its query plan is recorded and an index is added only if the plan and expected data volume demonstrate a need

#### Scenario: Production migration is released
- **WHEN** a committed schema migration is ready for production
- **THEN** the owner follows the preflight, recovery, apply, deploy, and post-deploy verification checklist in order

#### Scenario: Released schema causes a regression
- **WHEN** a migration-related production issue is discovered
- **THEN** recovery uses a forward correction or the explicitly approved recovery path while retaining the D1 database and migration history

### Requirement: Privacy disclosure matches operations
The public privacy notice SHALL state the active retention limit, the data used to determine the last interaction, the contact and identity-verification process for rights requests, the removal of linked waitlist and finished-survey data, and any limited retention needed to honor an unsubscribe or legal requirement. A material change to these practices SHALL update the notice version before the changed processing begins.

#### Scenario: Phase 3 operations become active
- **WHEN** the production procedures for retention, deletion, diagnostics, and recovery are adopted
- **THEN** the linked privacy notice accurately describes the practices and exposes the effective notice version stored with later signup consent
