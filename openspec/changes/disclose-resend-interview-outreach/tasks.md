## 1. Disclosure Verification

- [x] 1.1 Verify Resend's current official message-data retention, tracking controls, suppression behavior, data-processing terms, and relevant processing locations against the planned local-dashboard configuration.
- [ ] 1.2 Verify Google Calendar's current appointment-schedule visibility, required booking fields, accessible-email behavior, confirmations, cancellations, Google Meet processing, retention/deletion controls, terms, and relevant processing locations for the actual personal account configuration.
- [x] 1.3 Compare the planned `waitlist-dashboard` outreach spec with the live survey wording, stored consent evidence, privacy notice, appointment schedule, and D1 operations so every disclosed field, purpose, provider, recipient class, and retention period matches actual behavior.
- [x] 1.4 Review the proposed purpose, provider disclosures, alias-or-shop-name guidance, withdrawal path, and existing-respondent treatment against current Philippine Data Privacy Act, implementing rules, and National Privacy Commission consent guidance; record items requiring Philippines-qualified review without claiming legal approval.

## 2. Public Privacy Notice

- [x] 2.1 Update the information section to describe Resend's limited processing of recipient addresses, sender/reply details, message content, provider identifiers, timestamps, and delivery, bounce, complaint, failure, or suppression outcomes.
- [x] 2.2 Update the information section for optional Google Calendar booking names or aliases, accessible email addresses, selected times, calendar events, confirmations, cancellations, and Google Meet details submitted directly through the public booking page.
- [x] 2.3 Update the purposes and choices sections to cover interview/requested-details delivery, optional booking, alias-or-shop-name choice, duplicate prevention, failure handling, reply-based stop-contact, and `privacy@solesheet.app` while preserving the narrow research purpose and existing verified deletion process.
- [x] 2.4 Update the sharing and international-processing section to name Resend as SoleSheet's outbound email processor and Google Calendar as its optional scheduling provider, describe appropriate safeguards, and avoid implying either provider independently markets to respondents.
- [x] 2.5 Update retention and safeguards to distinguish the existing 12-month D1 limit, verified Resend message-data period, verified Google Calendar booking/event behavior, no-more-than-90-day pseudonymous local campaign metadata, limited suppression/request records, disabled open/click tracking, and individually addressed delivery.
- [x] 2.6 Update the at-a-glance summary and affected copy so Cloudflare is not implied to be the only provider, accepted delivery is not described as guaranteed inbox receipt, booking is not described as anonymous, and a legal name is not presented as required by SoleSheet.
- [ ] 2.7 Increment `privacyNotice.version`, `effectiveDate`, and `effectiveDateLabel` together using the actual deployment-effective Manila date.

## 3. Specifications and Operating Documentation

- [x] 3.1 Reconcile `docs/local-admin-dashboard-roadmap.md` so aggregate/read-only reporting remains the foundation and Resend Interview Outreach is a separately reviewed follow-on capability with D1 still read-only.
- [x] 3.2 Update `docs/email-routing.md` to keep Cloudflare Email Routing explicitly inbound-only while documenting Resend as separate authenticated outbound infrastructure and `hello@solesheet.app` as the inbound Reply-To destination.
- [x] 3.3 Document Google Calendar as an optional respondent-driven public booking page with no dashboard Calendar API, automatic event creation, recipient prefill, or contact-list synchronization, and include the alias-or-shop-name instruction wherever the booking link is described.
- [x] 3.4 Update `docs/d1-operations.md` only where needed to connect reply/stop-contact requests with the existing verified deletion, recovery replay, and minimal suppression-information procedure without adding dashboard D1 writes.
- [x] 3.5 Review the delta spec and all changed documents together to remove contradictions about bulk email, automatic sending, provider identity, booking data, tracking, retention, and contact purposes.

## 4. Automated Verification

- [x] 4.1 Update privacy-page tests for the new exact notice version and effective date plus Resend and Google Calendar identity, processed data categories, alias-or-shop-name choice, disabled open/click tracking, withdrawal path, international processing, and separate retention boundaries.
- [x] 4.2 Add regression assertions that the notice does not claim general marketing consent, provider engagement analytics, a public unsubscribe endpoint, guaranteed email delivery, anonymous booking, a required legal name, or automatic dashboard-to-Google transfer.
- [x] 4.3 Run focused privacy tests, formatting, lint, type checking, the complete test suite, production build, and strict OpenSpec validation; resolve every failure without enabling Resend or changing production data.

## 5. Owner-Controlled Review and Release

- [ ] 5.1 Obtain owner copy review and Philippines-qualified privacy review, resolving whether any existing cohort needs direct notice, exclusion, or fresh consent and whether the Google Calendar account configuration requires additional safeguards before outreach.
  - Owner copy review completed locally on 2026-09-02. The Philippines-qualified privacy review and actual Google Calendar account-configuration review remain outstanding, so the combined gate stays unchecked.
- [ ] 5.2 Deploy only the reviewed public-site disclosure and documentation change, then verify `/privacy`, its canonical metadata, working privacy contact, effective date, version, and accurate description of the configured appointment schedule on the live site.
- [ ] 5.3 Record the deployed notice version for the separate dashboard's activation configuration and keep respondent outreach disabled until that exact match and all separate dashboard/provider gates pass.
