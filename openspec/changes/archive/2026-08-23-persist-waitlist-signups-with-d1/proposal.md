## Why

The public waitlist currently simulates success without retaining a visitor's contact information, so genuine interest can be lost. SoleSheet now has a verified Cloudflare Worker deployment and can add a small Worker-native D1 backend before the site is actively promoted.

## What Changes

- Add a Cloudflare D1 database binding and versioned SQL migration for durable waitlist signup records.
- Add a server-side waitlist endpoint that validates email, optional name, and consent independently from browser validation.
- Preserve the submitted email while using a trimmed, lowercase normalized email with a database unique constraint for duplicate prevention.
- Record the consent timestamp and privacy-policy version associated with each accepted signup.
- Replace the simulated signup delay with a real request, preserving accessible pending, error, retry, and success behavior.
- Treat duplicate email submissions as an idempotent generic success without revealing whether the address was already registered or modifying its original record.
- Open the existing optional, non-saving survey automatically only after D1 confirms that the signup request succeeded; keep the survey dismissible.
- Update the privacy notice and operational documentation before real data collection begins.
- Keep survey-answer persistence, traffic analytics, email delivery, custom-domain work, and an administrative dashboard outside this change.

## Capabilities

### New Capabilities

- `waitlist-persistence`: Covers the D1 signup record, server-side validation, normalized-email uniqueness, consent evidence, safe duplicate behavior, and production data-handling boundary.

### Modified Capabilities

- `waitlist-signup`: Replaces the frontend-only simulated transition with a real, accessible, retryable signup request and durable success semantics.
- `validation-survey`: Opens the existing optional survey after a confirmed persisted signup while keeping its answers temporary in this phase.

## Impact

- Adds one D1 database and `DB` Worker binding, a root migration directory, generated binding types, and local/remote migration commands or documentation.
- Adds a Next.js Route Handler and a small server-only data-access boundary using D1 prepared statements without an ORM.
- Updates waitlist validation and UI state handling, the privacy notice/version, focused tests, Worker preview checks, and deployment instructions.
- Requires creating and migrating the remote D1 database before deploying code that depends on the binding; browser code receives no database credentials or privileged Cloudflare tokens.
