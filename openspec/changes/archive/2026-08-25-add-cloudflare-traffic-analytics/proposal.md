## Why

SoleSheet can now persist waitlist and survey conversions, but it cannot answer how many people reach the site, which pages and sources bring them in, or which device environments deserve the most attention. Preparing privacy-conscious traffic analytics now lets the implementation be reviewed and deployed dormant, while actual collection waits for `solesheet.app` to become the production domain.

## What Changes

- Add one explicit Cloudflare Web Analytics beacon integration that remains inactive while its public site token is absent.
- Deploy the analytics-ready code to the current `workers.dev` site without creating a Web Analytics property or configuring a token, so that hostname continues to produce no analytics measurements.
- Defer dashboard activation and actual collection until `solesheet.app` is purchased, connected, and selected as the production domain.
- Measure aggregate visits, page views, paths, referrers, countries, device classes, browsers, operating systems, and Core Web Vitals in Cloudflare's dashboard.
- Document how to activate and verify `solesheet.app`, avoid counting localhost, previews, and the provider hostname, and prevent two analytics beacons from loading on one page.
- Define a small initial reporting routine, including a manually calculated waitlist conversion rate that compares Cloudflare visit totals with privacy-safe D1 signup counts for the same date range.
- Update the privacy notice and notice version now using present-tense language that assumes the disclosed Cloudflare Web Analytics configuration is active, even though the beacon remains dormant until the custom-domain activation.
- Keep individual page views out of D1 and exclude custom events, UTM-query reporting, session replay, exact hardware-model collection, visitor profiles, and a custom analytics dashboard from this phase.

## Capabilities

### New Capabilities

- `traffic-analytics`: Defines production-only, privacy-conscious traffic and performance measurement, dashboard verification, reporting boundaries, and future-domain migration behavior.

### Modified Capabilities

None.

## Impact

- Affects the root application layout or a shallow analytics component, public build-variable examples, the privacy notice/version, the backend roadmap, and operator documentation.
- Adds no analytics collection to the current `workers.dev` deployment while `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` remains unset.
- Future activation requires creating the Cloudflare Web Analytics site for `solesheet.app` and configuring its public site token and canonical site URL in the production build environment.
- Once activated, sends browser performance and aggregate traffic measurements to Cloudflare Web Analytics; it adds no D1 table, migration, privileged browser credential, cookie banner, external analytics vendor, or paid dependency.
- Current verification proves the dormant path locally and after deployment; active network and dashboard verification is deferred until `solesheet.app` is authorized and deployed.
