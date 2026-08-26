## Context

See `proposal.md` for motivation. SoleSheet is a Next.js application deployed as a Cloudflare Worker with D1 and Turnstile bindings, but it has no email binding or inbound email handler. The public privacy contact is currently `solesheetph@gmail.com`. Cloudflare Email Routing operates through domain-level MX and authentication records, so activation is partly an external DNS operation and can interrupt existing mail service if performed without a preflight inventory.

## Goals / Non-Goals

**Goals:**

- Preserve Gmail as the only human-operated inbox while presenting branded SoleSheet addresses publicly.
- Keep the initial capability on Cloudflare's free direct-forwarding path.
- Make publication depend on external end-to-end delivery evidence, not only dashboard status.
- Provide a reversible DNS and application cutover.

**Non-Goals:**

- Providing a mailbox, webmail, or Gmail replacement.
- Sending email as the branded addresses or configuring Gmail “Send mail as.”
- Sending waitlist confirmations, survey campaigns, newsletters, magic links, or other outbound messages.
- Parsing, filtering, automatically replying to, retaining, or writing inbound email into D1, KV, or R2.
- Enabling a catch-all route.

## Decisions

### Use Cloudflare API-managed direct forwarding

Email Routing will be configured through Cloudflare's authenticated REST API as domain routing rules that target one verified destination address. The API workflow will read back the destination, domain-routing status, DNS records, exact rules, and catch-all state after each mutation. The dashboard remains available for the destination-address verification link and as an operational fallback, but it is not the source of truth for the scripted setup. The application will not receive email events and `wrangler.jsonc` will not gain an email handler or sending binding.

This keeps inbound message contents outside the SoleSheet application and avoids Worker CPU limits, storage policy, message-parsing dependencies, and additional failure paths. An Email Worker was considered but rejected because the initial requirement needs aliases and forwarding, not automation.

### Route three exact addresses to one inbox

`hello@solesheet.app`, `support@solesheet.app`, and `privacy@solesheet.app` will each forward to `solesheetph@gmail.com`. Exact routes make the externally supported addresses intentional and limit spam exposure. A catch-all was considered but rejected because accepting every local part creates unnecessary spam and makes address ownership ambiguous.

### Separate infrastructure activation from public publication

The routing destination, DNS records, and routes will be activated and tested before application copy changes. Tests must originate from an unrelated external account so they exercise public DNS, Cloudflare routing, and final Gmail delivery. Only the privacy alias is required to pass before the application changes its privacy contact; all three routes must pass before the routing change is considered complete.

This two-stage cutover preserves a working contact path if Cloudflare shows a healthy configuration while real delivery is failing.

### Record the DNS state and use an abort-first preflight

Implementation will record existing MX, SPF, DKIM, and relevant DMARC state before activation. If existing MX records represent an active external inbound provider, work stops instead of merging or replacing MX records opportunistically. SPF records may require a provider-supported merge, but that decision must follow the observed DNS state rather than an assumed template.

Dashboard-only setup without a recorded preflight was rejected because it provides no dependable rollback and can silently redirect established mail flow. API calls are still gated by the same abort-first preflight; automation does not authorize replacing an active provider's MX records.

### Keep branded outbound identity separate

Free forwarding does not by itself guarantee that replies sent from Gmail appear from `@solesheet.app`. The runbook will state this limitation so the new aliases are not represented as full hosted mailboxes. Branded outbound sending can later use Cloudflare Email Sending or another transactional provider through a separate proposal.

## Risks / Trade-offs

- **[Existing MX records are replaced]** → Inventory DNS first and abort activation when another inbound provider is active without a migration plan.
- **[Cloudflare API status is healthy but mail is not delivered]** → Require external end-to-end tests for all three routes before completion or publication.
- **[Replies reveal the Gmail address]** → Document that inbound routing does not provide branded outbound identity and avoid promising send-as behavior.
- **[Public aliases attract spam]** → Use exact routes and keep catch-all disabled.
- **[Remote configuration drifts from project expectations]** → Read back the Cloudflare API state after mutations and maintain a repository runbook containing the intended aliases, destination, verification evidence checklist, and rollback sequence without storing credentials or sensitive message content.
- **[Cloudflare routing becomes unavailable]** → Restore the Gmail public contact first, then disable routing or restore the recorded prior MX state.

## Migration Plan

1. Confirm that `solesheet.app` is present in the intended Cloudflare account and uses Cloudflare DNS.
2. Record the current MX, SPF, DKIM, and DMARC records and determine whether another inbound provider is active.
3. Abort and seek a separate migration decision if active external inbound MX records are found.
4. Add `solesheetph@gmail.com` through the Cloudflare API and complete the verification link sent to that inbox.
5. Enable Email Routing through the Cloudflare API, compare the resulting DNS state with the preflight, and confirm it is healthy.
6. After the destination is verified, create exact routes for `hello`, `support`, and `privacy` through the API; read back the rules and confirm catch-all remains disabled.
7. Send unique test messages from an unrelated external account to each alias and confirm arrival in Gmail, including sender, subject, body, and a safe small attachment.
8. Record non-sensitive verification results in the runbook, update the public privacy contact to `privacy@solesheet.app`, run application checks, and deploy.
9. Re-test the deployed `mailto:` contact and each route.

Rollback begins by restoring `solesheetph@gmail.com` in the public application and deploying that safe contact. The operator then disables the affected routes or Email Routing and restores the recorded prior DNS state when applicable. A final external message verifies the restored path.
