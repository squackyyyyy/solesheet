## Context

The landing page is a Next.js App Router application deployed as a Cloudflare Worker through `@opennextjs/cloudflare`. Its email-only waitlist currently validates in the browser, waits through a simulated transition, and stores nothing. The survey is also temporary and must remain non-saving in this change.

Cloudflare D1 is managed SQLite exposed to Worker code through an environment binding. In this project, the browser will call a Next.js Route Handler; only server-side code will access the `DB` binding. Wrangler will maintain a local SQLite-backed D1 state for development and a distinct remote D1 database for the deployed Worker.

The existing privacy notice already describes waitlist collection and a 12-month inactive-data retention approach, but its effective version and contact details must match the production collection behavior before the endpoint is deployed.

## Goals / Non-Goals

**Goals:**

- Establish a small, understandable D1 foundation using versioned SQL and one table.
- Make the server, database constraints, and browser collaborate without treating browser validation as a security boundary.
- Ensure success means the signup request reached a durable, idempotent database outcome.
- Keep local development isolated from production data.
- Make migration, deployment, inspection, deletion, and rollback procedures teachable and reproducible.

**Non-Goals:**

- Persisting survey answers or returning a durable survey identifier or token.
- Verifying ownership of an email address or sending confirmation email.
- Adding an ORM, custom admin dashboard, traffic analytics, automated retention job, or Cloudflare Turnstile.
- Purchasing or attaching a custom domain.

## Decisions

### Use one D1 table and a `DB` Worker binding

Create a remote D1 database named `solesheet-waitlist` and bind it to the Worker as `DB`. Ordinary local development uses Wrangler's local D1 state rather than the remote database. `next.config.ts` will initialize the OpenNext Cloudflare development context so App Router server code can resolve the same binding shape during `next dev`.

The initial migration will create:

```sql
CREATE TABLE waitlist_signups (
  id TEXT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  email_normalized TEXT NOT NULL UNIQUE,
  name TEXT,
  consented_at TEXT NOT NULL,
  privacy_policy_version TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  survey_completed_at TEXT,
  CHECK (length(email) BETWEEN 3 AND 254),
  CHECK (length(email_normalized) BETWEEN 3 AND 254),
  CHECK (name IS NULL OR length(name) BETWEEN 1 AND 60)
);
```

`TEXT` is used for UUIDs and ISO 8601 timestamps because SQLite has no dedicated UUID or timestamp storage class. The unique constraint creates the lookup structure required for normalized-email duplicate detection; a redundant email index is unnecessary. `survey_completed_at` remains nullable and unused until the separate survey-persistence change.

Using one table per signup rather than a document store keeps consent, uniqueness, and length constraints explicit. Drizzle, Prisma, and another ORM were considered but rejected for this small first schema because raw prepared SQL is easier to audit and teaches the actual D1 boundary without another migration system.

### Preserve the submitted contact and deduplicate with a normalized contact

The accepted email will be trimmed and stored in `email` with the visitor's valid casing preserved. A second value, `email_normalized`, will be `trim(email).toLowerCase()` and will carry the unique constraint. The system will not remove Gmail dots, strip `+tags`, or apply provider-specific aliases.

The optional name will be trimmed; an empty result becomes SQL `NULL`. The server will generate a random UUID and one UTC ISO timestamp for the request. `consented_at`, `created_at`, and `updated_at` initially receive that timestamp. A shared privacy-policy version constant will be used by both the page and endpoint so the stored version cannot silently drift from the published notice.

### Use an idempotent insert with an indistinguishable response

The repository will use a prepared statement equivalent to:

```sql
INSERT INTO waitlist_signups (...)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL)
ON CONFLICT(email_normalized) DO NOTHING;
```

Both a new insert and an existing normalized email return the same HTTP status and minimal `{ "ok": true }` response. The duplicate path does not update the original casing, name, timestamps, or consent record. This prevents repeated clicks from creating duplicate rows and avoids turning the public endpoint into an email-membership lookup.

Updating the existing record on conflict was rejected because an unverified visitor could overwrite another address's name or consent metadata. Returning a stable signup identifier was rejected in this phase because survey persistence is not yet implemented and an exposed reusable identifier would require a complete authorization design.

### Add a narrow `POST /api/waitlist` contract

The Route Handler will accept JSON shaped as:

```json
{
  "email": "Seller@example.com",
  "name": "Optional reseller alias",
  "consent": true,
  "website": ""
}
```

`website` is an unobtrusive honeypot field and is never stored. The handler will reject unsupported content types, oversized bodies, malformed JSON, unknown or wrongly typed values, invalid email, missing consent, and over-limit text. A filled honeypot will receive the same generic success shape without a database write so it does not teach simple bots how to bypass the check.

The endpoint will use these response classes:

| Outcome | Response behavior |
|---|---|
| New or duplicate valid signup | Same `200` response with `{ "ok": true }` |
| Invalid request | `400`, `413`, or `415` with a safe field or request error |
| Database or binding unavailable | Retryable `503` with a generic message |

The response will not include the submitted contact, a database row, a signup ID, SQL text, or duplicate status. Expected validation failures are handled without logging form contents. Unexpected failures may log a sanitized error category and request correlation value, but not the name or email.

### Share validation rules while keeping server authority

Pure normalization and validation functions will be reusable by the client and Route Handler so field limits and email rules remain aligned. Server code will still call them independently on the parsed request. The repository module will remain server-only and receive a `D1Database` dependency, which makes its SQL behavior testable without importing UI components.

The data-access boundary will live under `app/lib/server/`, while the request contract and pure validation remain under `app/lib/`. This adds one purposeful server-only directory without introducing a deeply nested backend tree.

### Access D1 through the OpenNext Cloudflare context

The Route Handler will resolve `getCloudflareContext().env.DB`. The generated `CloudflareEnv` interface will include `DB: D1Database`, and the normal Worker build will package the Route Handler without placing a database credential in the browser bundle.

The browser will call the relative `/api/waitlist` route. It will keep the current accessible pending button behavior, preserve entered values after a retryable error, and show success only for the generic successful response. The survey will open automatically after that transition. Because this phase sends no survey data, the response does not need a client-stored signup reference.

### Use Wrangler migrations as the schema source of truth

The first migration will be committed under the configured root migration directory. The database name, rather than a possibly renamed binding, will be used in documented migration commands. Implementation will apply the migration locally first, exercise the route against local D1, and apply it remotely only after explicit approval.

Direct production SQL is acceptable for read-only inspection or a documented deletion request, but schema changes must use committed migrations so local, CI, and remote environments do not drift.

### Treat privacy readiness as a deployment gate

The privacy page will expose the same version stored with new signups and accurately identify Cloudflare's storage/processing role. The existing 12-month inactive retention statement remains the initial policy. A minimal operator procedure will document locating and deleting a signup by normalized email; automation remains in the later hardening phase.

Production persistence must not be enabled until the privacy contact is a working address controlled by the owner. The endpoint and database may be developed locally before that deployment gate is satisfied.

## Risks / Trade-offs

- [A visitor submits someone else's email] → Store only low-risk waitlist data, do not issue a privileged identifier, add a honeypot, avoid overwriting duplicates, and defer email verification until messaging is introduced.
- [Local code accidentally writes to production] → Use Wrangler local D1 state by default and avoid remote bindings for ordinary `next dev` work.
- [The Worker deploys before its table exists] → Create the remote database, bind it, and apply remote migrations before deploying the endpoint.
- [A database outage produces a false success] → Show success only after the D1 operation completes; return a retryable generic failure otherwise.
- [The unique-email constraint leaks membership] → Give new and duplicate signups the same status and body and never expose raw constraint errors.
- [The public form attracts automated submissions] → Begin with a honeypot and bounded requests; add Turnstile or stronger rate controls later only if observed abuse justifies the added friction.
- [The nullable future survey marker is unused] → Keep it unset in this phase and define its update semantics only in the survey-persistence change.
- [Rollback loses newly collected contacts] → Roll back the Worker code or route behavior without dropping the D1 database or migration; preserve collected rows for recovery and review.

## Migration Plan

1. Add the migration, D1 binding configuration, generated types, local Cloudflare initialization, server contract, and repository without enabling production collection.
2. Apply the migration to local D1 and verify validation, new insert, normalized duplicate, honeypot, and failure paths.
3. Integrate the real request into the waitlist UI, automatic survey opening, privacy version, and accessible retry behavior.
4. Run unit, component, standard Next.js build, OpenNext Worker build, and production-like preview checks against local D1.
5. Confirm a working privacy contact and the final public notice.
6. With explicit approval, create or select `solesheet-waitlist`, record its non-secret database ID in `wrangler.jsonc`, apply the migration remotely, and deploy the Worker.
7. Submit one controlled production signup, confirm the row through a minimal query, verify duplicate behavior, and avoid printing personal data in shared logs or output.
8. If the release fails, redeploy the prior Worker version while retaining the D1 database and its records; diagnose and migrate forward rather than deleting the database.

## Resolved Questions

- The owner-controlled privacy contact is `solesheetph@gmail.com`.
