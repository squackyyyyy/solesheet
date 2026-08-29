## Why

`solesheet.app` is now the permanent public origin, but the project still has stale `.ph` fallbacks and deployment guidance, and the deployed site does not provide a sitemap. Completing the domain's search-discovery surface reduces the chance of incorrect canonical URLs in a future build and gives search engines an explicit, reviewable inventory of the public pages.

## What Changes

- Make `https://solesheet.app` the single canonical fallback used by application metadata, examples, and deployment documentation.
- Add a Next.js sitemap endpoint containing only the public homepage and Privacy Policy with absolute `solesheet.app` URLs.
- Add an origin robots endpoint that permits normal search indexing, references the sitemap, and excludes non-public application surfaces, while remaining compatible with Cloudflare's prepended managed robots/content-signal policy.
- Add automated checks for canonical, sitemap, robots, public-page inclusion, and private/studio/API exclusion behavior.
- Document production verification and the owner-performed Google Search Console property, sitemap submission, and indexing-request steps without treating search indexing as immediate or guaranteed.
- Keep analytics, paid SEO tools, new marketing pages, structured-data expansion, and changes to Cloudflare AI-crawler preferences out of scope.

## Capabilities

### New Capabilities

- `custom-domain-search-readiness`: Canonical-origin consistency, crawler discovery endpoints, public-route indexing scope, and manual search-console handoff for `solesheet.app`.

### Modified Capabilities

None.

## Impact

- Root metadata configuration, new Next.js metadata route files, environment examples, and hosting/deployment documentation.
- Production responses for `/robots.txt` and `/sitemap.xml`, including their interaction with Cloudflare-managed robots content.
- Metadata-route and production smoke tests.
- No changes to page copy, waitlist or survey data, D1, Turnstile, Cloudflare Web Analytics, DNS, Email Routing, or hosting-plan cost.
