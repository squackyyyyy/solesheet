## Why

SoleSheet plans to use a separate local owner dashboard to send individually addressed interview and product-research messages through Resend and offer consenting respondents an optional Google Calendar booking page. The public privacy notice currently names Cloudflare but not these outbound-email and scheduling providers or the resulting delivery and booking data, so the notice and related documentation must be updated before respondent outreach is enabled.

## What Changes

- Update the public Privacy Notice to name Resend as SoleSheet's outbound email delivery processor and describe the minimum recipient, message, delivery, bounce, complaint, failure, and suppression information it processes.
- Name Google Calendar as the optional appointment-scheduling service and describe the booking name or alias, accessible email address, selected time, event, confirmation, cancellation, and Google Meet information it processes when a respondent chooses to book.
- Explain that respondents do not need to provide a legal name and may use an alias or shop name, while an accessible email address is needed for confirmation and meeting details.
- State that interview outreach uses individually addressed messages and does not enable open tracking or link-click tracking.
- Preserve the existing product-research and optional-interview purposes without broadening the signup consent into general marketing, newsletter, profiling, or engagement-analytics consent.
- Clarify the stop-contact path through reply and `privacy@solesheet.app`, the existing verified deletion process, provider suppression, possible processing outside the Philippines, and the respective retention boundaries for D1, Resend delivery records, and the local pseudonymous campaign journal.
- Increment the privacy-notice version and effective date, update focused tests, and deploy the disclosure before the local dashboard's production outreach flag can be enabled.
- Reconcile the local-dashboard roadmap and email-routing runbook so Cloudflare Email Routing remains clearly inbound-only while Resend and Google Calendar retain distinct outbound-delivery and optional-scheduling roles.
- Keep Resend API calls, Google Calendar API integration, DNS configuration, the local dashboard, D1 recipient queries, production email sending, and deployment outside this change.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `waitlist-landing-experience`: Expand the dedicated privacy-notice requirement so a separately operated interview-outreach and optional-booking workflow is disclosed accurately before activation, including its providers, data categories, data minimization, tracking boundary, retention, safeguards, and withdrawal path.

## Impact

- Affects `app/privacy/page.tsx`, `app/lib/privacy.ts`, focused privacy tests, the public privacy-notice requirement, and documentation for the local dashboard, appointment scheduling, inbound email routing, and privacy operations where needed.
- Coordinates with the separate `waitlist-dashboard` change `add-interview-outreach` but does not make either repository a runtime dependency of the other.
- Does not change signup or survey request schemas, D1 migrations, Cloudflare Worker behavior, inbound forwarding, analytics, consent checkbox wording, or production data.
- Requires the owner to verify Resend and Google Calendar's applicable settings and disclosures and obtain a Philippines-qualified privacy review before enabling real respondent outreach.
