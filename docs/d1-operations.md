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

## Local development

Apply all pending migrations to local D1:

```sh
bunx wrangler d1 migrations apply solesheet-waitlist --local
```

Check whether the local database has pending migrations:

```sh
bunx wrangler d1 migrations list solesheet-waitlist --local
```

Inspect the local schema without reading signup data:

```sh
bunx wrangler d1 execute solesheet-waitlist --local --command "PRAGMA table_info(waitlist_signups);"
bunx wrangler d1 execute solesheet-waitlist --local --command "PRAGMA index_list(waitlist_signups);"
bunx wrangler d1 execute solesheet-waitlist --local --command "PRAGMA table_info(survey_responses);"
bunx wrangler d1 execute solesheet-waitlist --local --command "PRAGMA table_info(survey_sales_channels);"
```

Count local records without printing personal information:

```sh
bunx wrangler d1 execute solesheet-waitlist --local --command "SELECT COUNT(*) AS signup_count FROM waitlist_signups;"
bunx wrangler d1 execute solesheet-waitlist --local --command "SELECT COUNT(*) AS response_count FROM survey_responses;"
bunx wrangler d1 execute solesheet-waitlist --local --command "SELECT COUNT(*) AS channel_count FROM survey_sales_channels;"
```

Verify relationship integrity and one-response idempotency without printing
contacts or answers:

```sh
bunx wrangler d1 execute solesheet-waitlist --local --command "SELECT COUNT(*) AS orphaned_responses FROM survey_responses AS r LEFT JOIN waitlist_signups AS w ON w.id = r.signup_id WHERE w.id IS NULL;"
bunx wrangler d1 execute solesheet-waitlist --local --command "SELECT COUNT(*) AS duplicate_response_groups FROM (SELECT signup_id FROM survey_responses GROUP BY signup_id HAVING COUNT(*) > 1);"
```

Regenerate binding and runtime types after changing `wrangler.jsonc`:

```sh
bun run types:worker
```

## Remote production database

Remote commands require an authenticated, owner-controlled Cloudflare session. Treat `--remote` as a production switch and obtain explicit approval before applying migrations or changing data.

Review pending production migrations:

```sh
bunx wrangler d1 migrations list solesheet-waitlist --remote
```

Apply committed migrations before deploying Worker code that depends on them:

```sh
bunx wrangler d1 migrations apply solesheet-waitlist --remote
```

Perform a non-sensitive production health check:

```sh
bunx wrangler d1 execute solesheet-waitlist --remote --command "SELECT COUNT(*) AS signup_count FROM waitlist_signups;"
bunx wrangler d1 execute solesheet-waitlist --remote --command "SELECT COUNT(*) AS response_count FROM survey_responses;"
bunx wrangler d1 execute solesheet-waitlist --remote --command "SELECT COUNT(*) AS channel_count FROM survey_sales_channels;"
```

Do not run ad-hoc schema changes in production. Create a new committed migration, test it locally, and then apply it remotely.

## Destructive operations

Deleting local state is recoverable because Wrangler can recreate it from committed migrations, but it also removes all local test rows. Confirm the exact `.wrangler/state/` target before clearing it.

Deleting the remote D1 database is not part of normal rollback. A Worker rollback must retain the database, migration history, and collected records. Use `wrangler d1 delete solesheet-waitlist` only after a separate destructive-action review, a verified export or retention decision, and explicit owner approval.

## Production privacy requests

Handle access and deletion requests only from a private, owner-controlled Cloudflare session. Verify the requester's identity before looking up or changing a row. Normalize the verified address by trimming surrounding whitespace and converting it to lowercase; do not remove dots, plus tags, or other provider-specific characters.

1. Record the aggregate count before the operation without printing contact fields:

   ```sh
   bunx wrangler d1 execute solesheet-waitlist --remote --command "SELECT COUNT(*) AS signup_count FROM waitlist_signups;"
   ```

2. In the private D1 console, locate only the minimum metadata needed to confirm a match:

   ```sql
   SELECT id, created_at, privacy_policy_version
   FROM waitlist_signups
   WHERE email_normalized = lower(trim('<verified-request-email>'));
   ```

   Do not copy the query, result, email, name, or row identifier into shared chat, tickets, screenshots, or logs. If no row matches, report that the request was completed without confirming whether the address had ever been registered.

3. After identity and scope are confirmed, delete the matching signup in the
   same private console. The foreign-key cascade also removes its survey
   response and sales-channel rows:

   ```sql
   DELETE FROM waitlist_signups
   WHERE email_normalized = lower(trim('<verified-request-email>'));

   SELECT changes() AS deleted_rows;
   ```

4. Verify `deleted_rows` is `1`, or `0` when no matching row existed. Record only the completion date and request status in any operational note; do not retain the submitted contact there.

## Failure diagnosis without personal data

The public endpoint returns a generic retryable error and logs a random request correlation value plus an error category. It intentionally does not log the submitted email or name.

For a persistence failure:

1. Confirm the Worker has a `DB` binding in its active deployment.
2. Check that production has no pending migrations with `wrangler d1 migrations list solesheet-waitlist --remote`.
3. Confirm all required tables exist using `SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('waitlist_signups', 'survey_responses', 'survey_sales_channels');`.
4. Use the correlation value and error category in Workers Logs to narrow the time and failure class. Do not add form contents or raw request bodies to logs while debugging.
5. If the database is unavailable, keep returning the generic failure and restore service before asking the visitor to retry. Never claim success without a completed D1 outcome.

## Release and rollback

Before releasing survey persistence:

1. Confirm the public privacy contact works and the displayed notice version matches `app/lib/privacy.ts`.
2. Complete the production Turnstile setup above, add the independent
   `SURVEY_SUBMISSION_SECRET`, and confirm the build-time Text sitekey and
   Turnstile runtime Secret belong to the same widget.
3. Run typecheck, lint, tests, the standard Next.js build, the OpenNext build, and `wrangler deploy --dry-run`.
4. Review production pending migrations, obtain explicit approval, and apply migrations before deploying the Worker.
5. Deploy the Worker, then submit one controlled signup and survey. Verify only
   aggregate counts and the generic public success flow from shared tooling;
   inspect the controlled row only in a private owner session.
6. Record the deployed Worker version and migration name. Do not record the controlled contact in shared release notes.

If the release must be rolled back:

- Retain `solesheet-waitlist`, `d1_migrations`, and all collected rows. Never use database deletion as application rollback.
- Prefer a forward fix or a D1-capable Worker version. Do not roll back to the
  old simulated-success implementation, because it can claim a signup or survey
  succeeded without durable storage.
- For a frontend-only regression, revert or redeploy the frontend behavior while preserving `/api/waitlist`, the `DB` binding, and the current privacy notice.
- For a persistence incident, keep the current generic 503 behavior until D1 is healthy; do not bypass the database and do not expose raw errors.
- Schema corrections use a new forward migration. Do not edit an already-applied migration or drop columns/tables as an emergency response.
- After recovery, repeat the controlled signup, duplicate, count, privacy, success, and automatic-survey checks before declaring the incident closed.
