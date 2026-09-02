## Context

See `proposal.md` for motivation and the delta spec for the required disclosure behavior. The current public Privacy Notice already describes waitlist and survey fields, Cloudflare Workers, D1, Turnstile, cookie-free Web Analytics, product-research and interview purposes, consent withdrawal, a 12-month inactive-record limit, possible processing outside the Philippines, and data-subject rights. Its sharing section currently names Cloudflare, advisers, and authorities but no outbound email processor.

The planned sender is not part of this public application. A separate loopback-only `waitlist-dashboard` will read current interview cohorts through D1's read API and send one individually addressed message per recipient through Resend, with server-generated branded HTML and a complete plain-text alternative. It will disable open and click tracking and retain only pseudonymous local delivery-control metadata for no more than 90 days. Cloudflare Email Routing remains the independent inbound path for `hello@`, `support@`, and `privacy@` aliases.

For eligible cohorts, the message may link to a public Google Calendar appointment schedule owned by `solesheetph@gmail.com`. The dashboard will not call the Google Calendar API, prefill booking fields, or transfer its respondent list to Google. A respondent who chooses to open and complete the booking page submits a booking name or alias, email address, selected time, and resulting event or Google Meet information directly through Google Calendar.

## Goals / Non-Goals

**Goals:**

- Make the deployed notice accurately describe Resend processing before any respondent email is sent.
- Make the deployed notice accurately describe optional Google Calendar booking and its minimized booking data before any booking link is sent.
- Preserve the existing narrow research and optional-interview purpose and the established withdrawal/deletion path.
- Distinguish D1 retention, Resend message/delivery retention, and local pseudonymous campaign-metadata retention.
- Keep the email-routing and local-dashboard documents accurate after the new follow-on capability is approved.
- Make the privacy version and focused tests prove which disclosure future signups accepted.

**Non-Goals:**

- Implementing Resend, Google Calendar API integration, DNS authentication, outbound messages, dashboard code, public webhooks, or provider credentials.
- Adding a public unsubscribe endpoint, email tracking, marketing campaigns, newsletters, or behavioral profiling.
- Changing signup fields, survey options, consent submission, D1 schema, analytics, or inbound forwarding.
- Declaring that a Philippines-qualified privacy review is complete.

## Decisions

### 1. Modify the existing dedicated-notice requirement rather than add a second privacy capability

The new behavior is an extension of the public waitlist Privacy Notice, not a separate visitor flow. The delta therefore replaces the complete `Dedicated privacy notice supports waitlist collection` requirement and preserves its existing link/navigation scenarios while adding provider-processing and activation scenarios.

Alternatives considered:

- A new email-specific privacy capability would split one public notice across overlapping contracts.
- A docs-only change would not make disclosure-before-activation an observable requirement.

### 2. Name Resend and describe categories in plain language

The notice will state that Resend sends interview and requested-details messages on SoleSheet's behalf and processes the recipient email address, sender and reply addresses, subject and body, send time, provider message identifier, and coarse delivery, bounce, complaint, failure, or suppression status. It will state that open and click tracking are disabled.

The public copy will avoid API terminology, HMAC construction details, DNS values, credentials, and claims that an accepted API request proves inbox delivery. Resend will be described as a processor/service provider rather than a buyer or independent marketer of the data.

Alternatives considered:

- Saying only “trusted service providers” is too vague given that the current list is specific and the provider is already selected.
- Copying provider legal text would make the notice harder to understand and could overstate the configured features.

### 3. Name Google Calendar and distinguish optional direct booking from dashboard transfer

The notice will state that Google Calendar supplies the public booking page, appointment confirmation, calendar event, cancellation or rescheduling path, and Google Meet details when configured. It will describe the booking name or alias, accessible email address, selected appointment time, and event or meeting information submitted through that page.

SoleSheet will not require a legal name. Booking instructions will tell respondents they may enter an alias or shop name in Google's required name fields and should provide an email address they can access for confirmation and meeting details. The notice will not call the booking anonymous because the submitted email address and event remain identifiable.

The public copy will distinguish a respondent choosing to submit a public booking form from the local dashboard sending records to Google: v1 has no Calendar API, automatic booking, prefilled recipient identity, or contact-list synchronization.

Alternatives considered:

- Omitting Google because the respondent follows an external link would hide a planned provider used to arrange the interview.
- Requiring a legal name would collect information SoleSheet does not need for product research.
- Automatically creating calendar events from the dashboard would require broader Google access, new credentials, and a more complex privacy and security boundary.

### 4. Preserve the existing consent wording and narrow purpose

The signup checkbox already covers early access and product research. The interview question separately asks whether the respondent is open to a 15-minute follow-up and says SoleSheet will use the contact details supplied at signup. The notice will clarify delivery, duplicate prevention, failure handling, and withdrawals without changing this proposal into general marketing consent.

The change will not claim that no additional consent or direct notice could ever be required. The operating documentation will retain a Philippines-qualified review checkpoint before activation, with the Data Privacy Act, its implementing rules, and current National Privacy Commission consent guidance as primary sources.

Alternatives considered:

- Broadening the checkbox to “marketing” would alter the purpose and existing respondent expectations unnecessarily.
- Adding a second website consent for the already optional interview choice would change collection behavior beyond a disclosure update.

### 5. State separately verified retention boundaries

The existing 12-month D1 inactivity limit remains unchanged. The Resend paragraph will use the provider retention verified from official documentation and account configuration during application of this change; the planning assumption is the current free-plan 30-day message-data retention. The local-dashboard paragraph will state that pseudonymous campaign and delivery-control metadata is removed within 90 days and that it does not form another raw contact list. Google Calendar booking records and related confirmation or meeting information will be described using the retention and deletion behavior verified for the actual personal Google Account configuration, without inventing a fixed period the owner cannot enforce.

The notice will preserve limited retention necessary to honor an unsubscribe, privacy request, recovery replay, or legal obligation. It will not promise deletion from receiving mailbox providers, copies already delivered to a recipient, or systems outside SoleSheet's control.

Alternatives considered:

- Combining all data under the D1 12-month period would conceal materially different provider and local records.
- Hard-coding an unverified provider value risks publishing a promise that does not match the active account.

### 6. Deploy disclosure before activation and version it once

`privacyNotice.version`, `effectiveDate`, and `effectiveDateLabel` will move together using the actual deployment-effective Manila date. Focused tests will assert the new version and the material Resend, Google Calendar, alias-or-shop-name, no-tracking, withdrawal, and retention statements. The changed notice will be deployed before the dashboard's production outreach flag is enabled.

The brief staging interval in which the notice describes Resend before the first live message is intentional: disclosure must lead activation. The site will not claim that messages have already been sent or that interviews have occurred.

Alternatives considered:

- Enabling delivery first would process data through an undisclosed recipient class.
- Using “we may someday use a provider” would not accurately describe the approved configuration used at activation.

### 7. Reconcile documentation without merging service boundaries

`docs/local-admin-dashboard-roadmap.md` will preserve the aggregate/read-only foundation as the first phase and describe Resend Interview Outreach as a later, separately reviewed exception with D1 still read-only. Statements that bulk email is permanently out of scope will be qualified to the foundation rather than silently deleted.

`docs/email-routing.md` will continue to define Cloudflare Email Routing as inbound-only and direct forwarding. It will note that authenticated outbound interview messages use separate Resend infrastructure and that `hello@solesheet.app` remains the inbound Reply-To destination. The local-dashboard roadmap will distinguish Google Calendar's optional public booking page from both email delivery and D1. `docs/d1-operations.md` changes only if wording is needed to connect a stop-contact request with the existing deletion/recovery procedure; it will not add dashboard write access.

Alternatives considered:

- Leaving the older documents untouched would create contradictory operational guidance.
- Reframing Cloudflare Email Routing as outbound-capable would be technically false and could lead to unsafe DNS changes.

## Risks / Trade-offs

- [Provider retention or features change before implementation] → Verify official Resend documentation and the actual account configuration during apply, then use the verified value in copy and tests.
- [Disclosure is mistaken for broad marketing permission] → Tie every statement to the waitlist, requested details, and optional interview; explicitly exclude engagement tracking and avoid newsletter language.
- [A future implementer enables tracking despite the notice] → Make disabled tracking a spec scenario and dashboard activation check; require another versioned privacy change before enabling it.
- [The privacy notice becomes too technical] → Describe data categories, purpose, recipient, retention, and choices in plain language while leaving API and HMAC details in operating docs.
- [Outbound and inbound email documentation conflict] → Keep separate sections and name Resend as outbound delivery and Cloudflare Email Routing as inbound forwarding.
- [The current consent basis is judged insufficient for a subset of records] → Keep live sending disabled until a Philippines-qualified review decides whether any direct notice, exclusion, or fresh consent is required.
- [A public booking link is forwarded or indexed] → Treat the page as public, avoid embedding respondent identifiers, limit its scheduling window and daily capacity, and never describe possession of the link as authentication.
- [A respondent believes a legal name is required] → State beside the booking link that an alias or shop name is acceptable and disclose that the accessible email and booked event remain identifiable.

## Migration Plan

1. Verify current Resend and Google Calendar official processing, retention, booking-page visibility, form-field, confirmation, meeting, and account-setting behavior without creating credentials or sending messages.
2. Update the Privacy Notice sections for information, purpose, choices, sharing, international processing, retention, safeguards, and the at-a-glance summary in consistent plain language.
3. Increment the privacy version/effective date and update focused tests for version, both providers, alias-or-shop-name choice, tracking boundary, withdrawal, and retention.
4. Reconcile the local-dashboard roadmap, email-routing runbook, appointment-scheduling guidance, and privacy operations wording while preserving their distinct service boundaries.
5. Run focused tests, formatting, lint, type checking, the full test suite, production build, and strict OpenSpec validation.
6. Obtain the owner and Philippines-qualified privacy review, deploy the public-site change, and verify the live page and version.
7. Record the deployed version for the local dashboard's activation configuration; only then may its separate change proceed to owner-only tests and eventual live outreach.

If the outreach project is abandoned before activation, the disclosure may be replaced through another versioned notice after confirming Resend never processed respondent data. If outreach has been activated, disable sending and revoke its key first; retain accurate historical/current disclosure until provider and local retention obligations have ended, then publish a new version reflecting the retired processing.
