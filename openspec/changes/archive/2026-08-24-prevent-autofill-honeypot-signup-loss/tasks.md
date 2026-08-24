## 1. Configure Verification and Its Contract

- [x] 1.1 Declare the required `TURNSTILE_SECRET_KEY` Worker secret and add safe local/example configuration for Cloudflare’s official dummy sitekey and secret without committing production credentials.
- [x] 1.2 Replace the legacy and replacement honeypot request properties with a bounded `turnstileToken` field in the shared request type and independent server validation.
- [x] 1.3 Update the privacy notice to identify Turnstile as Cloudflare-backed abuse prevention and describe its limited technical processing.

## 2. Add Low-Friction Client Verification

- [x] 2.1 Add a dependency-free Turnstile form component using Managed mode, `interaction-only` appearance, flexible sizing, automatic retry/refresh, and the `waitlist_signup` action.
- [x] 2.2 Integrate the widget response into waitlist submission and prevent API submission when verification evidence is not ready.
- [x] 2.3 Reset verification after client or server failure while retaining the visitor’s name, email, consent, accessible feedback, and closed survey state.

## 3. Gate D1 Through Siteverify

- [x] 3.1 Add a server-only Siteverify module with bounded typed parsing, awaited network handling, idempotency, optional Cloudflare client IP, action/hostname checks, and non-local dummy-secret rejection.
- [x] 3.2 Update `/api/waitlist` to verify every token before D1 access and return privacy-safe verification or service failures with content-free structured diagnostics.

## 4. Verify the Replacement

- [x] 4.1 Replace shared validation tests with missing, bounded, malformed, and accepted Turnstile-token coverage.
- [x] 4.2 Add Siteverify unit tests for success, rejection, mismatched action/hostname, provider/configuration failure, dummy-key safety, and secret/token log exclusion.
- [x] 4.3 Update route tests for verification-before-D1 ordering, safe failure responses, duplicate privacy, and successful persistence.
- [x] 4.4 Update component tests for interaction-only widget configuration, token submission, blocked readiness, reset-and-retry behavior, retained values, and no honeypot field.
- [x] 4.5 Run focused tests, the full unit suite, type checking, linting, and an OpenNext Worker build.
- [x] 4.6 Run the localhost Worker preview with official dummy credentials and confirm a normal signup reaches local D1 while failed verification writes no row.

## 5. Prepare Production Verification

- [x] 5.1 Document and complete creation of a Managed production widget, restricted production hostnames, the public build-time sitekey, and the encrypted Worker secret.
- [x] 5.2 Deploy the client and Worker together, submit one controlled signup, and confirm the production D1 row before archiving.
