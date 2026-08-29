## 1. Canonical Origin Foundation

- [x] 1.1 Add one shallow shared canonical-site helper with `https://solesheet.app` as the fallback and use it for root metadata and discovery URL construction.
- [x] 1.2 Update active environment examples, README deployment instructions, and current operational documentation from `solesheet.ph` to `solesheet.app` while leaving archived change records untouched.
- [x] 1.3 Add assertions that missing configuration falls back to `solesheet.app` and active public metadata does not emit the stale `.ph` or provider hostname as canonical.

## 2. Search Discovery Endpoints

- [x] 2.1 Add a typed Next.js sitemap metadata route containing only the homepage and Privacy Policy as absolute `https://solesheet.app` URLs, without synthetic modification dates.
- [x] 2.2 Add a typed origin robots metadata route that allows public search crawling, references the absolute sitemap, and disallows `/api/`, `/flow-mockup-studio/`, `/social-studio/`, and `/web-quick-add-studio/` without treating robots as route protection.
- [x] 2.3 Add focused tests for response structure, public-route inclusion, excluded-route absence, canonical origin, and the required robots directives.

## 3. Operational Handoff

- [x] 3.1 Add `docs/search-discovery.md` covering local and production endpoint checks, Cloudflare-managed robots prepending, rollback, Google Search Console Domain-property verification, sitemap submission, URL inspection, indexing requests, later status review, and credential hygiene.
- [x] 3.2 Document that indexing and ranking are external asynchronous outcomes, not deployment guarantees, and record only non-sensitive owner completion evidence if Search Console is activated.

## 4. Verification and Activation

- [x] 4.1 Run lint, type checking, focused metadata-route tests, the production build, and a production-like Worker preview of `/`, `/privacy`, `/robots.txt`, and `/sitemap.xml`.
- [ ] 4.2 After an authorized production deployment, verify successful status and content types, canonical `solesheet.app` URLs, exact sitemap scope, required origin robots directives within Cloudflare's combined response, and continued production blocking of studio routes.
- [ ] 4.3 Guide the owner through Search Console property verification, submit `https://solesheet.app/sitemap.xml`, request indexing for `/` and `/privacy`, and record the non-sensitive submission date and status without storing verification secrets.
