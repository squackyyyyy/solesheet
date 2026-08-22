## Context

See `proposal.md` for the signup-loss motivation. Localhost verification showed that browser profile autofill populated an off-screen text field even after it was given an opaque name, `autocomplete="off"`, and common password-manager ignore attributes. A honeypot value is therefore ambiguous—it may represent automation or a legitimate visitor—and cannot safely authorize silent data loss.

The replacement spans the client form, shared request contract, Worker route, server-only verification, environment configuration, privacy copy, and tests. The site already runs on Cloudflare Workers and stores signups in D1, making Cloudflare Turnstile the smallest external trust boundary for reliable anti-automation verification.

## Goals / Non-Goals

**Goals:**

- Verify waitlist submissions without an always-visible control for routine visitors.
- Limit required interaction to an accessible checkbox and avoid image or text puzzles.
- Require independent server verification before any D1 access.
- Preserve all entered form values and provide a fresh verification attempt after client or server failure.
- Keep production secrets and verification tokens out of source, client bundles, responses, and logs.
- Support deterministic localhost and automated testing without consuming production verification traffic.

**Non-Goals:**

- Adding image CAPTCHAs, behavioral scoring thresholds, fingerprint storage, IP blocklists, or application rate limiting.
- Persisting Turnstile tokens, client IP addresses, or verification-provider responses.
- Changing the D1 schema, duplicate-email behavior, visible signup fields, consent flow, or survey flow.

## Decisions

### Replace the honeypot with Turnstile Managed mode

The form will remove both the opaque replacement trap and legacy `website` trap. It will render Cloudflare Turnstile in Managed mode with `interaction-only` appearance, flexible sizing, automatic retry/expiry refresh, and the fixed action `waitlist_signup`. Most visitors will see no widget; only visitors for whom Cloudflare requires further evidence may see a checkbox. Turnstile does not introduce an image or text puzzle.

Continuing to tune honeypot names or autofill attributes was rejected because the reproducing browser ignored those hints. Treating a filled trap as a soft signal was rejected because it would no longer prevent automated writes. Google reCAPTCHA was considered, but Turnstile avoids a persistent badge, keeps the protection within the existing Cloudflare platform, and offers an interaction-only managed experience.

### Use the provider script directly without a React wrapper dependency

The existing form will load the official Turnstile script and use its supported form integration. The widget-generated response field will be read at submission and mapped to a readable `turnstileToken` JSON property. When the token is missing, the browser will not call the waitlist endpoint and will retain the current values. When a server attempt fails, the client will reset Turnstile so the next attempt receives a fresh single-use token.

Using a third-party React wrapper was rejected because the official script already provides rendering, response fields, expiration refresh, retry behavior, and reset APIs; another dependency would add maintenance without changing the user experience.

### Verify every token before D1 access

A focused server-only module will call Cloudflare Siteverify with the Worker secret, submitted token, request identifier as the idempotency key, and the Cloudflare-provided client IP when available. It will bound the client token to the provider’s documented maximum, await the outbound request, validate the response shape, and return a small typed outcome to the route.

The route will require successful validation before obtaining or using the D1 binding. Production requests will require the expected `waitlist_signup` action and a hostname matching the incoming request. Missing, rejected, expired, replayed, or mismatched tokens will return a safe `verification_failed` response. Missing secret configuration, provider network failure, invalid provider responses, or non-success provider HTTP responses will return a generic service-unavailable response. Neither outcome will claim signup success or access D1.

Returning generic `200` for rejected automation was rejected because it recreates silent loss when provider or integration behavior is wrong. The endpoint still does not reveal detailed provider error codes or whether an email already exists.

### Separate test and production credentials

The public sitekey will be supplied at build time through `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. The server secret will be declared as required Worker configuration and supplied locally through ignored development variables and in production through an encrypted Worker secret. Source control will contain documentation/placeholders but no production credentials.

Official always-pass dummy credentials will be used on localhost and in automated tests. Production-host requests will fail closed if a known dummy secret is configured. The production widget will restrict hostnames to the active Workers domain and later custom domain; localhost will use only provider dummy credentials.

### Preserve retry UX and privacy boundaries

The existing pending state will begin only after a token is available. Client-side verification readiness problems and server `verification_failed` responses will show concise retry guidance, keep the name/email/consent values, reset the widget, and leave the survey closed. Provider/configuration outages will use the existing safe service error pattern.

Structured diagnostics may include a fixed event name, request identifier, and coarse outcome category. They will exclude names, emails, tokens, secrets, raw provider bodies, IP addresses, and request bodies. The privacy notice will explicitly identify Turnstile as Cloudflare-backed abuse prevention and describe the limited technical processing already associated with protecting the form.

## Risks / Trade-offs

- [A legitimate visitor is assigned an interaction] → Managed `interaction-only` displays only a checkbox when necessary, retains all entered values, and avoids image or text puzzles.
- [Extensions or network policy block the Turnstile script] → Fail closed, keep form values, and show a retryable verification message instead of claiming success.
- [A token expires or is consumed by a failed/retried request] → Reset the widget after failure and rely on automatic expiry refresh so each retry receives a fresh token.
- [Provider latency delays submission] → Start verification when the form is rendered so a token is normally ready before the visitor finishes entering details.
- [Test credentials reach production configuration] → Reject known dummy secrets for non-localhost requests and document distinct build/runtime production configuration.
- [Existing tabs contain the former request shape] → Return a safe retryable validation error; users must refresh after deployment rather than bypass verification.

## Migration Plan

1. Add official dummy sitekey and secret values to ignored localhost configuration and declare the required Worker secret name without committing a production secret.
2. Implement the client widget, request contract, Siteverify module, route gating, retry UX, privacy copy, and focused tests.
3. Run the OpenNext Worker preview and verify successful and failed dummy-key scenarios against local D1; confirm routine interaction does not show a persistent widget.
4. Create a production Turnstile widget in Managed mode, restrict it to the active production hostname, configure the public sitekey in Cloudflare’s build environment, and store the secret with Worker secret management.
5. Deploy the client and Worker changes together, then submit one controlled production signup and confirm the D1 row.
6. If production verification unexpectedly blocks legitimate signups, roll back the Worker version while preserving D1; no database rollback is required.
