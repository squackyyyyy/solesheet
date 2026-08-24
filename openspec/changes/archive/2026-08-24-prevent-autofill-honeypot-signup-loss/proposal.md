## Why

Browser profile autofill populated both the original semantic honeypot and its opaque replacement during localhost verification, causing legitimate waitlist requests to receive success without being saved. A client-controlled text trap is therefore not reliable enough to make a hard persistence decision, so signup protection must use server-verified anti-automation evidence without adding routine friction.

## What Changes

- Remove the autofill-prone honeypot from the waitlist form and request contract.
- Add Cloudflare Turnstile in Managed mode with `interaction-only` appearance so verification normally runs in the background and only higher-risk visitors may see a checkbox; no image or text puzzle is introduced.
- Require the waitlist endpoint to validate each Turnstile token with Cloudflare Siteverify before reading or writing D1.
- Preserve entered name, email, and consent state when verification is unavailable, incomplete, expired, replayed, or unsuccessful, and present a safe retry path instead of claiming success.
- Keep the Turnstile secret server-only, use official dummy credentials for localhost and automated tests, and require distinct production credentials before deployment.
- Update the privacy notice to identify Turnstile as part of Cloudflare-backed abuse prevention.
- Add focused tests for unobtrusive client presentation, token handling, server verification, retry behavior, secret safety, and D1 write gating.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `waitlist-signup`: Replace the autofill-sensitive hidden trap with low-friction human verification that preserves form progress and exposes interaction only when required.
- `waitlist-persistence`: Require private server-side Turnstile verification before any new or duplicate signup receives a confirmed persistence outcome.

## Impact

- Affects the waitlist form component, shared signup request validation/types, `/api/waitlist`, server-side verification code, privacy copy, Worker secret declarations, environment examples, and focused tests.
- Adds client and server communication with Cloudflare Turnstile but no new application dependency and no D1 migration.
- Requires a public production sitekey at build time and an encrypted `TURNSTILE_SECRET_KEY` Worker secret at runtime; official dummy keys remain local/test-only.
- Does not change visible signup fields, duplicate-email behavior, the D1 schema, consent requirements, survey behavior, or the successful post-signup experience.
