## Context

SoleSheet is a Next.js application deployed through OpenNext on the Worker `solesheet.solesheet.workers.dev`. It already has privacy-safe Workers Logs for form operations and D1 aggregate checks for stored conversions, but no browser traffic measurement. The owner has decided that analytics-ready code can ship now but collection must not begin until `solesheet.app` is purchased and activated as the production domain. The current root layout has no analytics script or Content Security Policy, `NEXT_PUBLIC_SITE_URL` already represents the canonical production origin, and local builds use public environment examples plus ignored local values.

Cloudflare Web Analytics uses a public site token and a browser beacon. Current Cloudflare documentation states that it measures page traffic and real-user performance without analytics cookies or cross-site user tracking, automatically observes supported single-page-application navigations, and can be manually embedded for a hostname that is not configured through a customer-controlled proxied zone. The dashboard may be delayed or sampled, and blockers or browser delivery conditions can prevent some beacons.

See `proposal.md` for motivation and `specs/traffic-analytics/spec.md` for the behavior contract.

## Goals / Non-Goals

**Goals:**

- Make analytics an explicit, inspectable application integration that can ship dormant on the current provider hostname.
- Prevent the provider hostname, localhost, tests, and unrelated preview hostnames from intentionally contributing to production analytics before custom-domain activation.
- Preserve application behavior when the analytics script is absent, blocked, slow, or unavailable.
- Keep the collection and reporting boundary understandable to a solo operator.
- Make the eventual custom-domain change a configuration update rather than an analytics rewrite.

**Non-Goals:**

- Capturing exact phone or computer models, query-string campaign parameters, clicks, form-field behavior, or session recordings.
- Creating a D1 page-view table, joining a visit to a signup, or identifying an individual visitor.
- Building an analytics API, custom dashboard, scheduled report, or multi-provider abstraction.
- Treating Workers Logs as traffic analytics or Web Analytics as operational error monitoring.

## Decisions

### Use one manually embedded Cloudflare Web Analytics beacon

Add a small analytics component near the existing root layout and load Cloudflare's official `beacon.min.js` with Next.js's non-blocking script support. The script will use `type="module"` and the public site token supplied by the production build environment. Current SPA tracking remains enabled so Next.js soft navigations can be measured.

Manual embedding is selected because it keeps the future integration visible in version control and can remain completely dormant until its token is supplied. Dashboard-only automatic injection was considered, but it would make a dormant code-first release harder to verify and could accidentally activate outside the application release. A second analytics library was rejected because the required aggregate measurements already exist in Cloudflare.

The deployment runbook will require manual-snippet mode for the configured Web Analytics site. If a future owner deliberately switches to automatic injection, the committed manual beacon must be disabled first so a page never contains both.

### Gate the beacon with the token and canonical hostname

Use two existing/public build concepts:

- `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` contains the Web Analytics site token.
- `NEXT_PUBLIC_SITE_URL` supplies the approved production hostname already used by metadata.

The analytics component will render no beacon when the token is empty, the configured site URL is invalid, or `window.location.hostname` differs from the configured URL hostname. The token will remain absent from the current `workers.dev` production build as well as local and preview environments. The site token is not a credential and is expected to be visible in HTML after activation; it belongs in a Cloudflare build variable of type Text, not in a runtime Secret. Local example configuration will leave the analytics token empty.

Using the canonical site URL avoids introducing a second hostname variable that could drift from metadata. Relying only on `NODE_ENV=production` was rejected because preview deployments are also production builds. Relying only on Cloudflare's hostname rejection was rejected because it would still download the script and create avoidable browser errors on preview hosts.

### Fail open and avoid application coupling

The beacon will load after the application becomes interactive and will have no dependency path into waitlist or survey state. No UI error, retry, loading state, or server log is added for analytics failure. Tests will prove that gating works and that no analytics configuration is required for layout rendering.

If a Content Security Policy is introduced later, it must allow the official script origin and manual-beacon reporting endpoint before analytics is re-enabled. This change will not add a CSP solely for analytics.

### Keep reporting aggregate and deliberately manual

Add a shallow owner document, `docs/traffic-analytics.md`, covering dashboard access, initial metrics, production verification, known undercounting/sampling limitations, and custom-domain migration. The routine will compare Web Analytics visits with a privacy-safe count of unique D1 signups over the same UTC time bounds:

`estimated conversion rate = unique stored signups / measured visits × 100`

The result is an estimate: ad blockers and beacon delivery can reduce measured visits, D1 uniqueness collapses duplicate email attempts, and Cloudflare's visit definition and sampling do not represent a durable person identifier. The runbook will forbid exporting individual records merely to calculate the rate.

A fully automated cross-system report was considered, but it would require additional API credentials, code, and scheduling for little benefit at the current volume.

### Publish the active-form disclosure before dormant code ships

Update the privacy notice in the dormant-code release to state that SoleSheet uses Cloudflare Web Analytics and describe the aggregate path, referrer, country, device class, browser, operating-system, and performance measurements, their purposes, the cookie-free configuration, and the fact that they are not joined to waitlist or survey submissions. Increment the notice version and effective date in the same release.

This intentionally publishes the active-form disclosure before the token exists. Later activation on `solesheet.app` needs no notice change when the collection exactly matches the disclosure. If future analytics adds cookies, custom events, profiling, session replay, or another provider, it requires a separate review and notice update.

## Risks / Trade-offs

- **[Beacon blockers and delivery loss undercount visits]** → Label conversion as an estimate, compare trends rather than treating counts as an audit ledger, and retain D1 as the source of truth for signups.
- **[Preview or local traffic contaminates production reports]** → Require both a configured token and exact canonical-hostname match; test the negative paths.
- **[The privacy notice describes analytics before measurements begin]** → Keep the dormant period temporary, activate only the exact disclosed configuration on `solesheet.app`, and do not use the early disclosure as permission to broaden collection.
- **[Manual and automatic injection produce duplicate measurements]** → Document manual-snippet mode and verify exactly one beacon element and one reporting flow on production.
- **[Build variable is configured in the wrong scope]** → Document that both the public token and canonical URL are build-time Text values and verify the built output after deployment.
- **[Hostname mismatch causes rejected measurements]** → Configure the Web Analytics property with the exact active hostname and inspect the production network request before relying on dashboard reports.
- **[Analytics script affects performance]** → Load it non-blockingly after interactivity and use Core Web Vitals before/after deployment to detect a material regression.
- **[Cloudflare changes analytics dimensions or retention behavior]** → Link the owner guide to current official documentation and verify dashboard behavior during activation rather than encoding plan limits into application logic.

## Migration Plan

1. Add the gated analytics component, unit tests, empty public environment example, owner guide, present-tense privacy-notice update, and roadmap update.
2. Build and test with no analytics token; confirm the beacon is absent and all public flows remain unchanged.
3. Deploy the analytics-ready code and updated privacy notice to the current `workers.dev` site without creating a Web Analytics property or adding a token. Verify no beacon or measurement request exists.
4. Leave analytics dormant until the owner purchases, connects, and approves `solesheet.app` as the production domain.
5. At activation, add `solesheet.app` to Cloudflare Web Analytics in manual-snippet mode and copy its public site token.
6. Set `NEXT_PUBLIC_SITE_URL=https://solesheet.app` and `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` as production build Text values, then deploy.
7. Verify one beacon script, a successful measurement request, homepage and privacy-page navigation measurement, unchanged waitlist/survey behavior, and the expected dashboard dimensions after normal processing delay.
8. For rollback, remove or blank the analytics token and redeploy. This disables measurement without a database rollback or D1 change.
