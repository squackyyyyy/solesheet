## 1. Domain and Mail Preflight

- [x] 1.1 Confirm that `solesheet.app` is active in the intended Cloudflare account and uses Cloudflare DNS.
- [x] 1.2 Record the current MX, SPF, DKIM, and DMARC records in a non-secret email-routing runbook, including enough prior-state detail for rollback.
- [x] 1.3 Determine whether the current MX records serve an active external inbound provider; stop the change and report the conflict instead of replacing those records when no migration plan exists.

## 2. Cloudflare Email Routing Setup

- [x] 2.1 Add `solesheetph@gmail.com` through the Cloudflare API and complete destination verification from that inbox.
- [x] 2.2 Enable Email Routing through the Cloudflare API, compare the resulting MX and authentication records with the recorded preflight, and confirm the read-back state is healthy.
- [x] 2.3 After destination verification, create exact-address routes through the Cloudflare API for `hello@solesheet.app`, `support@solesheet.app`, and `privacy@solesheet.app`, all targeting the verified Gmail destination, then read the rules back.
- [x] 2.4 Read back and confirm that the domain catch-all route is disabled and no Email Worker, automatic reply, message store, or outbound Email Sending configuration was added.

## 3. Delivery Verification and Operations

- [x] 3.1 From an unrelated external account, send a uniquely identifiable message to each branded alias and verify that sender, subject, body, and a safe small attachment arrive in Gmail.
- [x] 3.2 Record non-sensitive pass/fail evidence, Cloudflare activity-log checks, the inbound-only reply limitation, periodic verification guidance, and the DNS/application rollback sequence in the runbook.
- [x] 3.3 Exercise the rollback checklist as a tabletop review and confirm it restores the Gmail public contact before any routing or DNS reversal.

## 4. Publish the Verified Contact

- [x] 4.1 After the `privacy@solesheet.app` delivery test passes, update the shared public privacy-contact source from `solesheetph@gmail.com` to `privacy@solesheet.app` and update affected assertions.
- [x] 4.2 Run lint, type checking, relevant privacy/contact tests, and a production build; verify every visible privacy contact and `mailto:` target uses the branded address.
- [ ] 4.3 Deploy the application contact change, test the deployed `mailto:` link, and repeat external delivery checks for all three aliases.

## 5. Final Scope and Cost Check

- [x] 5.1 Confirm `wrangler.jsonc` contains no `send_email` binding, the application exports no `email()` handler, and the delivered configuration remains on free direct forwarding.
- [ ] 5.2 Complete the runbook handoff with the approved alias inventory, verified destination, last successful test date, monitoring location, and rollback owner without storing credentials or message contents.
