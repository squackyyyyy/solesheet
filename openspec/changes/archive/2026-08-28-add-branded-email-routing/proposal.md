## Why

SoleSheet currently publishes a consumer Gmail address for privacy and customer contact, which weakens the product's professional identity and couples public contact details to one mailbox name. Cloudflare Email Routing can provide branded addresses on the SoleSheet domain while retaining the existing Gmail inbox and adding no recurring email cost at the current scope.

## What Changes

- Configure Cloudflare Email Routing for the SoleSheet domain after confirming that its existing MX records do not serve another inbound mail provider.
- Verify `solesheetph@gmail.com` as the sole forwarding destination.
- Create exact-address routes for `hello@solesheet.app`, `support@solesheet.app`, and `privacy@solesheet.app`; do not enable a catch-all route.
- Verify inbound delivery for every branded address before publishing any of them.
- Replace the public privacy contact with `privacy@solesheet.app` only after its route is proven operational, and use the branded support or hello address where future public contact copy needs one.
- Document DNS prerequisites, route verification, monitoring, and rollback so the change can be operated without risking silent mail loss.
- Keep outbound transactional email, marketing email, automatic replies, message storage, and programmable Email Workers out of scope.

## Capabilities

### New Capabilities

- `branded-email-routing`: Branded SoleSheet inbound addresses, verified forwarding, safe publication, and recoverable Cloudflare routing operations.

### Modified Capabilities

None.

## Impact

- Cloudflare Email Service and the SoleSheet domain's MX, SPF, and DKIM records.
- The existing Gmail inbox as the verified destination; no new mailbox or webmail product is introduced.
- Public privacy/contact copy and its associated tests.
- Operational documentation for setup, verification, failure handling, and rollback.
- No D1 schema, waitlist API, survey API, outbound email binding, Email Worker handler, or recurring paid email dependency is introduced.
- Enabling routing is an externally visible DNS change and must not proceed if the apex domain currently depends on another inbound mail provider without an explicit migration plan.
