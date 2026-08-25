# SoleSheet D1 operations

This document explains the D1 setup used by the waitlist and the commands that are safe to run during development and production operations.

## Mental model

- `migrations/` is the version-controlled source of truth for the database schema.
- `wrangler.jsonc` binds the Cloudflare database named `solesheet-waitlist` to server code as `DB`.
- `.wrangler/state/` contains the local D1 database used by `next dev` and local Worker previews. It is generated, ignored by Git, and separate from production.
- The remote D1 database is persistent Cloudflare infrastructure. A command affects it only when `--remote` is present.
- Browser code calls `/api/waitlist`, then sends a short-lived continuation
  token to `/api/survey` only when the visitor finishes the survey. It never
  receives the `DB` binding, Cloudflare credentials, raw SQL results, or a
  database row ID.

Use Node.js 24 for Wrangler commands. Run `nvm use` from the repository root, then run commands from that directory.

## Turnstile verification

Waitlist writes are protected by Cloudflare Turnstile. The browser receives only
the public sitekey; `/api/waitlist` sends each token to Siteverify using the
server-only secret and does not touch D1 unless verification succeeds.

For localhost, copy the committed examples if the ignored files do not exist:

```sh
cp .env.example .env.local
cp .dev.vars.example .dev.vars
```

These examples use Cloudflare's official always-pass dummy credentials. They
work with `next dev`, OpenNext preview, and automated tests, but the server
rejects the dummy secret on non-local hostnames. Never put a production secret
in `.env.local`, `.env.example`, `.dev.vars.example`, `wrangler.jsonc`, source
code, client-side variables, test output, or logs.

Before the production release:

1. In Cloudflare Turnstile, create a **Managed** widget named `SoleSheet waitlist`.
2. Restrict its hostnames to `solesheet.solesheet.workers.dev` and each active
   SoleSheet custom domain. Do not add `localhost`; local development uses the
   dummy credentials.
3. In the connected Worker's **Settings > Build > Build variables and
   secrets**, add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` with type **Text** and the
   widget's public sitekey as its value. This is a build-time value, is expected
   to appear in the browser bundle, and takes effect only after a new build.
4. In the Worker's **Settings > Variables and Secrets** section, add the
   matching server key with these settings, then select **Deploy**:

   ```text
   Variable name: TURNSTILE_SECRET_KEY
   Type: Secret
   Value: <the production widget secret>
   ```

   This dashboard runtime secret is the production method currently used by
   SoleSheet. It is equivalent to setting the value with Wrangler:

   ```sh
   bunx wrangler secret put TURNSTILE_SECRET_KEY
   ```

   Do not run the Wrangler command again when the dashboard secret is already
   configured. The runtime secret and build sitekey belong in separate
   Cloudflare settings: build variables are unavailable at runtime, while the
   runtime secret is not embedded into the client build. Never put the
   production secret in a Text variable, shell command, commit, screenshot,
   issue, shared log, or any `NEXT_PUBLIC_*` variable.
5. Rebuild and deploy the client and Worker together. A client built with the
   dummy sitekey cannot be paired with a production secret, and an old client
   without a token will correctly receive a retryable validation failure.
6. Submit one controlled production signup, confirm the generic success UI,
   and verify only an aggregate D1 count or the controlled row from a private
   owner session. Then remove any temporary test row only if the release plan
   explicitly calls for it.

Turnstile uses `interaction-only` appearance. Routine visitors should not see a
persistent widget; Cloudflare may show an accessible checkbox when it needs
additional evidence. A failed or expired token must retain the visitor's form
values and issue a fresh token before retrying.

## Survey submission signing

After a confirmed new or duplicate signup, `/api/waitlist` returns a two-hour
HMAC-signed survey token. The token lets `/api/survey` link a finished survey to
that signup without trusting a browser-supplied email or exposing a database
identifier. The first finished response is immutable: retries and later
submissions for the same signup return generic success without replacing it.

For local development, `.dev.vars.example` provides a non-production signing
value. Copy the example as described above, or add a unique value of at least 32
characters to the ignored `.dev.vars` file:

```text
SURVEY_SUBMISSION_SECRET=<local-only value with at least 32 characters>
```

Before production deployment, generate a strong independent secret and add it
in the connected Worker's **Settings > Variables and Secrets** as a runtime
**Secret** named `SURVEY_SUBMISSION_SECRET`. Do not reuse the Turnstile secret.
The Wrangler equivalent is:

```sh
bunx wrangler secret put SURVEY_SUBMISSION_SECRET
```

Keep this value out of build variables, `NEXT_PUBLIC_*` variables, source
files, commits, screenshots, and logs. Rotating it invalidates unsubmitted
tokens issued with the old value, but does not change saved survey records.

## Operations safety rules

- Run commands from the repository root after `nvm use`; Wrangler requires the
  Node.js 24 version declared by this project.
- Commands in this guide use `--local` by default. `--remote` is the visible
  production switch and requires an authenticated, owner-controlled Cloudflare
  session.
- Read-only aggregate checks may run when needed. A production migration,
  `DELETE`, restore, or other mutation requires a preview, a recovery bookmark,
  exact-target review, and explicit approval.
- Never paste production contacts, answers, tokens, row IDs, raw SQL errors, or
  exports into chat, tickets, screenshots, test output, or shared logs.
- Record only the operation date, cutoff, aggregate before/after counts,
  bookmark, deployed version, migration name, and completion status.

## Local development

Apply and review local migrations:

```sh
bunx wrangler d1 migrations apply solesheet-waitlist --local
bunx wrangler d1 migrations list solesheet-waitlist --local
```

Run the reusable privacy-safe health and query-plan checks:

```sh
bunx wrangler d1 execute solesheet-waitlist --local --file ops/d1/health.sql
bunx wrangler d1 execute solesheet-waitlist --local --file ops/d1/query-plans.sql
```

The health output contains only required-table, signup, response, channel,
orphan, and completion-marker counts. The query-plan output contains only
schema/index names and planner strategy.

To exercise retention without touching the normal local database, create an
isolated directory and copy the exact path printed by `mktemp` into each
`<isolated-directory>` placeholder:

```sh
mktemp -d /private/tmp/solesheet-d1-ops.XXXXXX
bunx wrangler d1 execute solesheet-waitlist --local --persist-to <isolated-directory> --file migrations/0001_create_waitlist_signups.sql
bunx wrangler d1 execute solesheet-waitlist --local --persist-to <isolated-directory> --file migrations/0002_create_survey_responses.sql
bunx wrangler d1 execute solesheet-waitlist --local --persist-to <isolated-directory> --file ops/d1/retention-fixture.sql
bunx wrangler d1 execute solesheet-waitlist --local --persist-to <isolated-directory> --file ops/d1/retention-preview.sql
bunx wrangler d1 execute solesheet-waitlist --local --persist-to <isolated-directory> --file ops/d1/retention-delete.sql
bunx wrangler d1 execute solesheet-waitlist --local --persist-to <isolated-directory> --file ops/d1/health.sql
```

The expected fixture result is two candidate signups, one linked response, and
one linked channel before deletion; afterward two newer/boundary signups, one
response, and one channel remain with zero integrity mismatches. Remove only
the exact temporary directory after reviewing its path. Never run the fixture
against the normal local database or production.

Regenerate binding and runtime types after changing `wrangler.jsonc`:

```sh
bun run types:worker
```

## Remote production database

Reviewing production requires an authenticated, owner-controlled Cloudflare
session. These two commands are read-only:

```sh
bunx wrangler d1 migrations list solesheet-waitlist --remote
bunx wrangler d1 execute solesheet-waitlist --remote --file ops/d1/health.sql
```

Apply a committed migration only after completing the production checklist:

```sh
bunx wrangler d1 migrations apply solesheet-waitlist --remote
```

Do not run ad-hoc schema changes in production. Never edit an already-applied
migration. Create and test a new numbered forward migration instead.

## Production privacy deletion requests

Handle each request in the privacy mailbox and a private D1 owner session.
Verify that the requester controls the email address before querying D1. Apply
the same normalization as signup persistence: trim surrounding whitespace and
convert letters to lowercase; do not remove dots, plus tags, or other
provider-specific characters.

1. Run the aggregate health check and obtain the current Time Travel bookmark.
2. In the private D1 console, locate only the minimum metadata required to
   scope the request:

   ```sql
   SELECT id, created_at, privacy_policy_version
   FROM waitlist_signups
   WHERE email_normalized = lower(trim('<verified-request-email>'));
   ```

   Do not copy the query, result, email, or identifier outside that private
   session.
3. After identity, target, and approval are confirmed, delete the signup in the
   same private console. Foreign-key cascades remove its submitted survey and
   sales-channel rows:

   ```sql
   DELETE FROM waitlist_signups
   WHERE email_normalized = lower(trim('<verified-request-email>'));

   SELECT changes() AS deleted_signup_count;
   ```

4. Run `ops/d1/health.sql` remotely and confirm every orphan/mismatch count is
   zero. A direct deletion count of `1` means a match was removed; `0` means no
   match existed. Do not expose which result occurred.
5. Reply with generic wording: “Your request has been completed. For privacy,
   we do not confirm whether an address was previously registered.”
6. Keep the original verified request in the private mailbox for at least the
   active Time Travel or export recovery window so it can be replayed after a
   restore. Do not create a second shared contact list. After that window,
   retain only what is necessary to honor an unsubscribe or legal obligation.

After any recovery to an earlier time, replay all verified deletion requests
received after the restore target before declaring recovery complete.

## Monthly retention cleanup

Schedule a recurring owner reminder during the first five days of every month.
The preview calculates the latest stored interaction across signup creation,
signup update, survey completion, survey submission, and survey update. Its
cutoff looks ahead to the next monthly run: an August 2026 run includes records
last active before September 1, 2025. This removes records after roughly 11–12
months instead of letting them cross the published 12-month limit.

1. Run the aggregate preview; it never returns contacts or row IDs:

   ```sh
   bunx wrangler d1 execute solesheet-waitlist --remote --file ops/d1/retention-preview.sql
   ```

2. Record the cutoff and aggregate candidate counts privately. Confirm the
   output is plausible before continuing.
3. Obtain and record the current Time Travel bookmark. Routine cleanup does not
   create an SQL export because doing so would make another copy of data due for
   deletion.
4. Review the exact database, cutoff, counts, and bookmark, then obtain explicit
   approval. Only then run:

   ```sh
   bunx wrangler d1 execute solesheet-waitlist --remote --file ops/d1/retention-delete.sql
   ```

5. Run both `ops/d1/health.sql` and `ops/d1/retention-preview.sql` remotely.
   Confirm zero integrity failures and zero remaining candidates for the cutoff.
6. Record only the operation date, cutoff, deleted signup count, post-operation
   aggregate counts, bookmark, and completion status.

If a reminder is missed, run the procedure immediately and record a
non-personal operational exception. If a reliable monthly schedule cannot be
maintained, pause production collection or implement a separately reviewed
automated retention job before any record can exceed the published limit.

## Protected operation-scoped SQL exports

D1 Time Travel is the primary recovery mechanism. Create a portable SQL export
only when a risky or long-running operation specifically warrants one.
Cloudflare's current export documentation is at
<https://developers.cloudflare.com/d1/best-practices/import-export-data/>.

1. Create a temporary owner-only directory outside the repository and copy its
   exact path into the later placeholders:

   ```sh
   mktemp -d /private/tmp/solesheet-d1-export.XXXXXX
   chmod 700 <temporary-export-directory>
   ```

2. Export the complete production database and restrict the file:

   ```sh
   bunx wrangler d1 export solesheet-waitlist --remote --output <temporary-export-directory>/solesheet-waitlist.sql
   chmod 600 <temporary-export-directory>/solesheet-waitlist.sql
   shasum -a 256 <temporary-export-directory>/solesheet-waitlist.sql
   ```

3. Restore-test the export against a disposable local D1 directory, then run
   the aggregate health check. Do not print or open the SQL contents:

   ```sh
   bunx wrangler d1 execute solesheet-waitlist --local --persist-to <temporary-restore-directory> --file <temporary-export-directory>/solesheet-waitlist.sql
   bunx wrangler d1 execute solesheet-waitlist --local --persist-to <temporary-restore-directory> --file ops/d1/health.sql
   ```

4. Record only the checksum, aggregate counts, creation date, and planned
   deletion date. Never commit, upload to shared tooling, screenshot, or use the
   export for reporting.
5. Delete the exact export and disposable restore directory after the operation
   is verified. The default maximum recovery window is seven days; use a shorter
   window when practical. Confirm the paths before deleting them.

## D1 Time Travel recovery

Cloudflare automatically maintains D1 Time Travel. The current documentation is
<https://developers.cloudflare.com/d1/reference/time-travel/>. At the time of
writing, Workers Free retains seven days and Workers Paid retains 30 days, but
confirm the active plan and current documentation before relying on either.

Check the database backend and current bookmark before a production mutation:

```sh
bunx wrangler d1 info solesheet-waitlist
bunx wrangler d1 time-travel info solesheet-waitlist --json
```

The Time Travel commands act on remote D1 without a separate `--remote` flag.
A restore overwrites production in place, cancels in-flight queries, and is
therefore destructive.

If recovery is required:

1. Record the incident time, current bookmark, current aggregate health output,
   deployed Worker version, and migration state.
2. Resolve and review the target bookmark using an RFC3339 timestamp with an
   explicit timezone:

   ```sh
   bunx wrangler d1 time-travel info solesheet-waitlist --timestamp="<RFC3339-target>" --json
   ```

3. Obtain explicit approval for the database, target, and data-loss interval.
4. Restore using the reviewed bookmark:

   ```sh
   bunx wrangler d1 time-travel restore solesheet-waitlist --bookmark="<reviewed-bookmark>" --json
   ```

5. Preserve the returned `previous_bookmark`; it is the immediate undo path.
6. Review pending migrations and run `ops/d1/health.sql`. Deploy code compatible
   with the restored schema or apply a reviewed forward migration.
7. Rerun the current retention cleanup and replay verified deletion requests
   received after the restore target.
8. Repeat a controlled signup, duplicate-signup, survey, generic-error, and
   aggregate-integrity check before declaring service healthy.

## Workers Logs and failure diagnosis

`wrangler.jsonc` enables persisted Workers Logs with full initial log sampling
and no traces or external destination. Each form request emits one structured
`form_request_outcome` event containing only `route`, `outcome`, `status`, and a
random `requestId`. Responses expose the same value as `X-Request-ID`.

View stored logs in **Workers & Pages > solesheet > Observability**, or inspect a
short real-time window from an owner terminal:

```sh
bunx wrangler tail solesheet --format json --search form_request_outcome
```

Filter by route, outcome, status, time, or a privately reported request ID.
Never add emails, names, survey answers, Other text, Turnstile responses,
continuation tokens, request bodies, bound SQL values, or raw errors while
debugging.

For a persistence failure:

1. Confirm the active deployment has `DB`, `TURNSTILE_SECRET_KEY`, and
   `SURVEY_SUBMISSION_SECRET` configured in their correct runtime/build scopes.
2. Check pending remote migrations and run `ops/d1/health.sql` remotely.
3. Use the request ID and outcome to distinguish invalid input, verification,
   session, configuration, continuation, and persistence failures.
4. Keep returning the generic failure until storage is healthy. Never bypass D1
   or claim success without a completed write.

Review log volume and sampling monthly. Lower sampling in a separately reviewed
configuration change if volume approaches the active plan allowance; do not add
an external logging service by default.

## Turnstile and abuse review

Review **Turnstile > SoleSheet waitlist > Analytics** monthly and after an
incident. Compare issued, solved, unsolved, interactive, non-interactive, and
likely-bot activity with the endpoint outcome counts. Current guidance is at
<https://developers.cloudflare.com/turnstile/turnstile-analytics/>.

Open a separate abuse-control proposal rather than automatically blocking users
when any of these investigation thresholds is reached:

- form traffic or accepted writes create material availability or cost pressure;
- accepted submissions exceed five times the previous seven-day daily median
  for two consecutive days without a known campaign;
- likely-bot or unsolved activity rises with sustained verification rejections; or
- two credible legitimate-user reports within seven days describe Turnstile
  friction or false rejection.

These thresholds start an investigation only. A legitimate marketing spike
must not be silently rate-limited, and IP-only blocking is not assumed safe for
mobile or shared networks.

## Query-plan and index review

Run the committed plan checks against representative local data:

```sh
bunx wrangler d1 execute solesheet-waitlist --local --file ops/d1/query-plans.sql
```

The August 2026 review found that normalized-email lookup uses its unique index,
survey relationships use the existing primary-key indexes, aggregate counts use
a covering index where available, and monthly retention scans the small signup
table while using the survey primary-key index. That plan is appropriate for the
current volume, so this change adds no migration or speculative timestamp index.
Repeat the review when row volume or reporting queries materially change.

## Reusable production release checklist

1. Confirm the public privacy contact works and the displayed notice version
   matches `app/lib/privacy.ts`.
2. Confirm production build variables, runtime secrets, the D1 binding, and
   Turnstile hostnames are configured without exposing their values.
3. Run typecheck, lint, tests, the Next.js build, the OpenNext build, binding-type
   generation, and Wrangler dry-run validation under Node.js 24.
4. Run local migrations, health checks, and query plans. Review remote pending
   migrations and production aggregate health.
5. Record the current Time Travel bookmark and active recovery window. Create a
   protected SQL export only when the release risk warrants it.
6. If a migration exists, obtain approval and apply it before deploying code
   that depends on it. This operational-hardening release is expected to need no
   migration.
7. Deploy the Worker. Verify structured form outcomes and submit one controlled
   signup and survey. Check only aggregate counts in shared tooling.
8. Record the deployed Worker version, migration name or “none,” bookmark,
   aggregate verification, and completion status without recording the test
   contact.
9. Before activating this retention practice, create recurring private calendar
   reminders for the first five days of each month covering retention, Workers
   Logs, and Turnstile review.

## Rollback and forward recovery

- Retain `solesheet-waitlist`, `d1_migrations`, and every collected row during an
  application rollback. Database deletion is never application rollback.
- Prefer a compatible prior Worker for application-only regressions and a new
  forward migration for schema corrections. Never edit an applied migration.
- Do not roll back to simulated success or bypass D1; keep the generic 503
  behavior until persistence is healthy.
- Use Time Travel or a verified export only after explicit destructive-action
  approval and review of the data-loss interval.
- After recovery, rerun retention, replay deletion requests after the target,
  verify health and migrations, and repeat the controlled end-to-end flow.
- If a rollback would remove the promised retention procedure or privacy-safe
  diagnostics, pause collection until a forward fix is deployed.

Deleting local state removes local test rows but can be recovered from committed
migrations. Deleting the remote D1 database is outside normal operations and
requires a separate destructive-action review, verified recovery decision, and
explicit owner approval.
