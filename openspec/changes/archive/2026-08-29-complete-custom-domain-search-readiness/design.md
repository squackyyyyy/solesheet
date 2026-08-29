## Context

See `proposal.md` for motivation. The production homepage currently emits the correct `https://solesheet.app` canonical URL because the deployment supplies `NEXT_PUBLIC_SITE_URL`, but the application fallback and README still reference `solesheet.ph`. `/sitemap.xml` returns 404. Cloudflare currently supplies a content-signals-only `/robots.txt` response because the origin has no robots metadata route. Cloudflare documents that, once the origin returns its own successful robots file, managed robots content is prepended rather than replacing the origin directives.

Next.js 16 supports cached `sitemap.ts` and `robots.ts` metadata routes. The public route inventory is intentionally small: `/` and `/privacy`. API and capture-studio routes are not public marketing pages and must not appear in discovery documents.

## Goals / Non-Goals

**Goals:**

- Make the permanent origin deterministic across metadata and discovery endpoints.
- Serve small, cacheable, testable discovery documents using the framework's native conventions.
- Preserve Cloudflare-managed content signals while supplying conventional search and sitemap directives from the origin.
- Provide a safe owner handoff for Search Console without repository credentials or an indexing promise.

**Non-Goals:**

- Guaranteeing crawl timing, index inclusion, search position, rich results, or organic traffic.
- Adding schema.org structured data, new content pages, paid SEO services, or keyword-targeted copy.
- Changing Cloudflare managed-robots, AI crawler, or content-signal preferences.
- Using robots directives as authentication or route protection.

## Decisions

### Use Next.js metadata routes with a shared canonical-site helper

The implementation will add `app/sitemap.ts` and `app/robots.ts` using `MetadataRoute` types and keep canonical URL construction in one shallow `app/lib/site-url.ts` helper or equivalent existing shared module. The root layout and both metadata routes will consume the same validated origin. The default is `https://solesheet.app`; committed production examples use the same value.

Native metadata routes were chosen over static files in `public/` because Next.js provides typed output, correct content types, and default caching. Hand-written XML and text route handlers were considered but would duplicate serialization and validation already supplied by the framework.

### Keep sitemap scope explicit and omit synthetic freshness

The sitemap will list exactly the homepage and Privacy Policy with absolute canonical URLs. It will not discover routes from the filesystem automatically. `lastModified` will be omitted unless a reliable content date already exists; generating the current time on every build would imply freshness that did not necessarily occur.

An explicit two-route list is easier to review and prevents studio or API routes from entering the sitemap as the project evolves.

### Add origin robots directives without overriding Cloudflare policy

The origin robots response will allow public crawling, disallow `/api/` plus the three studio route families, and include the absolute sitemap URL. Cloudflare may prepend its managed content-signals text to the successful origin response. Production verification therefore checks that SoleSheet's directives appear in the combined response rather than requiring byte-for-byte equality with the origin output.

The change will not toggle Cloudflare's managed robots setting. Any future decision about AI training, AI input, or content-use signals belongs to Cloudflare policy configuration and a separate review.

### Treat Search Console as a manual post-deploy operation

A short `docs/search-discovery.md` runbook will cover production endpoint checks, a Google Search Console Domain property, owner-controlled DNS verification when required, sitemap submission, URL inspection/indexing requests for `/` and `/privacy`, later status review, and rollback. The repository will store only non-sensitive completion dates or status notes if the owner chooses, never Google credentials or verification tokens.

The implementation can finish and deploy before Search Console accepts or indexes the site. External indexing delay is an operational state, not a failed build.

### Clean only active domain guidance

The application fallback, environment example, README, and current operational documentation will be searched for active `solesheet.ph` instructions and updated to `solesheet.app`. Archived OpenSpec artifacts remain historical records and will not be rewritten.

## Risks / Trade-offs

- **[Cloudflare changes the final robots response]** → Assert the origin output locally and check for required directives within the combined production response rather than exact text equality.
- **[A non-public route is accidentally indexed]** → Keep it out of the sitemap and disallow its route family, while preserving actual route-level production protection.
- **[Search Console requires an external verification action]** → Document it as an owner step and do not block code validation on account access.
- **[Sitemap dates mislead crawlers]** → Omit `lastModified` until a trustworthy source exists.
- **[Environment drift reintroduces a wrong canonical]** → Share one fallback and add tests that reject `.ph` and provider-hostname canonical output.

## Migration Plan

1. Add the shared canonical-origin helper and update root metadata plus active environment and deployment examples.
2. Add typed sitemap and robots metadata routes with unit-level output assertions.
3. Add the search-discovery runbook and remove active stale-domain instructions while preserving archives.
4. Run lint, type checking, metadata-route tests, the production build, and local Worker preview checks for `/`, `/privacy`, `/robots.txt`, and `/sitemap.xml`.
5. After an authorized production deployment, verify status, content type, absolute URLs, Cloudflare-combined robots directives, and absence of excluded routes.
6. The owner may then verify the Search Console property, submit the sitemap, request indexing, and review status later.

Rollback removes the metadata routes and restores the prior application release. Search Console sitemap submission can be removed independently; no DNS rollback is required unless the owner separately added a Google verification record and chooses to remove it.
