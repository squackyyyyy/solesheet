# SoleSheet Email Routing Runbook

## Approved scope

- Domain: `solesheet.app`
- Destination inbox: `solesheetph@gmail.com`
- Exact inbound aliases: `hello@solesheet.app`, `support@solesheet.app`, and `privacy@solesheet.app`
- Catch-all: disabled
- Delivery model: Cloudflare Email Routing direct forwarding only
- Out of scope for Cloudflare Email Routing: Email Workers, outbound sending,
  automatic replies, message storage, and branded Gmail replies

Cloudflare Email Routing forwards incoming messages to the Gmail destination. It does not create a mailbox, and replies sent from Gmail may expose the Gmail address unless branded outbound sending is configured separately.

## Separate outbound interview-outreach boundary

Cloudflare Email Routing remains inbound-only. A separately reviewed local
Interview Outreach workflow may use Resend to send individually addressed
interview invitations or requested details from
`SoleSheet Interviews <interviews@outreach.solesheet.app>`. Those messages use
`hello@solesheet.app` as their Reply-To address, so replies return through the
existing Cloudflare forwarding route to `solesheetph@gmail.com`.

Resend is independent outbound infrastructure. Its domain verification, API
key, SPF and DKIM records, optional DMARC policy, tracking settings, and
delivery status are managed separately from Cloudflare Email Routing. Do not
replace or remove the apex MX records or the existing inbound routes while
configuring the Resend sending subdomain. The public site has no Resend key and
does not send messages.

An outreach message may contain a public Google Calendar booking link. Google
Calendar is an optional scheduling provider, not an email-routing component.
The respondent opens and submits Google's booking form directly; no Calendar
API, recipient prefill, automatic event creation from the dashboard, or contact
list synchronization is used. Booking instructions must state that a legal
name is unnecessary, an alias or shop name is acceptable, and an accessible
email address is required for confirmation and meeting details.

## Preflight snapshot

Captured through the Cloudflare API on 2026-08-26 before activation.

- Cloudflare zone: active, full setup, and not paused
- Authoritative nameservers: `bill.ns.cloudflare.com` and `melina.ns.cloudflare.com`
- Email Routing: disabled, `unconfigured`, and synchronized
- Apex MX records: none
- TXT records, including SPF, DKIM, and DMARC: none
- Destination addresses: none
- Exact routing rules: none
- Catch-all rule: disabled with a drop action

No existing apex MX record or email-authentication record serves an external inbound provider, so activation has no provider migration conflict. The rollback DNS baseline is therefore an empty MX/TXT email-routing state rather than another provider's records.

## API setup checklist

1. Enable Email Routing for `solesheet.app` and read back its status and generated DNS records.
2. Add `solesheetph@gmail.com` as an account-level destination.
3. Open Cloudflare's verification email in Gmail and select the verification link.
4. Confirm the API reports the destination as verified.
5. Create one enabled literal-address forwarding rule per approved alias.
6. Read all rules back and confirm the catch-all remains disabled.

Never store Cloudflare credentials, verification links, message contents, or Gmail credentials in this repository.

## Activation snapshot

Activated through the Cloudflare API on 2026-08-26.

- Email Routing: enabled, `ready`, and synchronized
- MX: `route3.mx.cloudflare.net` priority 21
- MX: `route2.mx.cloudflare.net` priority 31
- MX: `route1.mx.cloudflare.net` priority 80
- SPF: `v=spf1 include:_spf.mx.cloudflare.net ~all`
- DKIM selector: `cf2024-1._domainkey.solesheet.app` (Cloudflare-managed public key)
- Destination: `solesheetph@gmail.com`, verified on 2026-08-26
- Exact routing rules: all three approved literal-address forward rules are enabled and target the verified destination
- Catch-all: disabled with a drop action
- Final API read-back: Email Routing is `ready` and synchronized

## End-to-end verification

From an unrelated external email account, send a uniquely identifiable message with a safe small attachment to each approved alias. For every alias, confirm the Gmail inbox receives the original sender, subject, body, and attachment. Record only the date and pass/fail result below; do not copy message contents into this file.

| Alias | Last external test | Result |
| --- | --- | --- |
| `hello@solesheet.app` | 2026-08-27 | Passed |
| `support@solesheet.app` | 2026-08-27 | Passed |
| `privacy@solesheet.app` | 2026-08-27 | Passed |

The operator confirmed external delivery through the approved aliases to Gmail and observed the routed message in Cloudflare's activity log. One initial message was classified as spam by Gmail and was subsequently found; operators should check Spam during incident triage and mark legitimate routed messages as not spam.

## Monitoring

- Monitoring location: Cloudflare dashboard for `solesheet.app` → Email Routing. Review its status, routing rules, destination addresses, catch-all state, and activity log.
- After setup, inspect Email Routing status, destination verification, routing rules, catch-all state, and recent Email Routing activity in Cloudflare.
- Repeat all three external delivery tests after DNS, route, destination, or application contact changes.
- Repeat at least quarterly while the aliases are publicly advertised.
- Investigate any bounce, missing message, disabled rule, unverified destination, or misconfigured routing status immediately.

## Rollback

1. Restore `solesheetph@gmail.com` as the public application contact and deploy that safe contact before changing routing or DNS.
2. Disable affected exact-address rules, or disable Email Routing when the domain-wide service must be reversed.
3. Confirm Cloudflare removes the routing-managed MX and authentication records.
4. Compare DNS with the preflight baseline: no apex MX records and no routing-related SPF, DKIM, or DMARC TXT records.
5. Verify the Gmail address remains visible and its deployed `mailto:` link works.

Rollback owner: SoleSheet Cloudflare account owner. The owner should perform the checklist as a tabletop review before public cutover and after any routing redesign.

Tabletop review passed on 2026-08-26. The sequence preserves a published working contact before any routing mutation, the recorded DNS baseline is sufficient to identify Cloudflare-managed records for removal, and no prior mail-provider records need restoration.

## Scope verification

Verified on 2026-08-26:

- `wrangler.jsonc` has no `send_email` binding.
- Application source has no Email Worker `email()` handler.
- Every enabled Email Routing rule uses direct forwarding; no rule targets a Worker.
- No outbound sending, automatic reply, or message-storage capability was introduced.

## Handoff state

- Approved aliases: `hello@solesheet.app`, `support@solesheet.app`, and `privacy@solesheet.app`
- Verified destination: `solesheetph@gmail.com`
- Destination verification: passed on 2026-08-26
- Route creation: passed for all three approved aliases on 2026-08-26
- Cloudflare configuration read-back: passed on 2026-08-26
- External alias delivery and activity-log review: passed on 2026-08-27
- Deployed branded contact, `mailto:` behavior, and production routing: owner-confirmed working on 2026-08-28
- Rollback tabletop review: passed on 2026-08-26
- Public privacy-contact cutover: deployed with `privacy@solesheet.app`
- Monitoring location: the `solesheet.app` Email Routing dashboard and activity log in Cloudflare
- Rollback owner: SoleSheet Cloudflare account owner
- Current cost scope: free direct forwarding; no Email Worker or outbound email binding
