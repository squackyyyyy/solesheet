# Search discovery for `solesheet.app`

This runbook prepares SoleSheet's two public pages for crawl discovery. It does
not guarantee that Google or any other search engine will crawl, index, rank,
or show the pages immediately.

## What is public

- `https://solesheet.app/`
- `https://solesheet.app/privacy`

The application serves a sitemap for only those URLs and guides crawlers away
from API and capture-studio route families. `robots.txt` is crawler guidance;
it is not access control.

## Check before deployment

Run the normal code checks:

```sh
bun run lint
bun run typecheck
bun run test -- app/lib/site-url.test.ts app/sitemap.test.ts app/robots.test.ts
bun run build
```

For the Cloudflare Worker-shaped build, use the existing preview workflow and
open these paths there:

- `/`
- `/privacy`
- `/robots.txt`
- `/sitemap.xml`

Confirm the page source canonical URL and every sitemap URL use
`https://solesheet.app`, even if the preview is on another hostname.

## Verify production after an authorized deployment

Only after the owner has approved and completed a production deployment, check:

```sh
curl -I https://solesheet.app/
curl -I https://solesheet.app/privacy
curl -i https://solesheet.app/robots.txt
curl -i https://solesheet.app/sitemap.xml
```

The public pages, robots file, and sitemap must return successful responses.
The sitemap should contain exactly the homepage and Privacy Policy. The robots
response must include `Allow: /`, the four SoleSheet `Disallow` families, and
`Sitemap: https://solesheet.app/sitemap.xml`.

Cloudflare can prepend managed content-signal directives to `robots.txt`. That
is expected: verify that SoleSheet's origin directives appear in the combined
response rather than requiring an exact byte-for-byte response.

Also confirm the capture-studio routes remain unavailable in production and
that the canonical tags on `/` and `/privacy` point to `https://solesheet.app`.

## Google Search Console handoff (owner action)

1. In Google Search Console, create a **Domain** property for `solesheet.app`.
2. Complete the DNS verification record Google shows in the domain's DNS
   provider. Do not put the verification value in this repository, an env file,
   screenshots committed to Git, or application source code.
3. Once verified, submit `https://solesheet.app/sitemap.xml` in **Sitemaps**.
4. Use **URL Inspection** to request indexing for:
   - `https://solesheet.app/`
   - `https://solesheet.app/privacy`
5. Return later to review sitemap processing and each URL's indexing status.

Record only non-sensitive evidence in the project's operational notes, such as
the submission date and Google Search Console's high-level status. Never save
Google credentials, DNS verification values, or tokens in the repository.

## Rollback

If a deployment gives an incorrect canonical origin, sitemap scope, or robots
directive, roll back the application release using the normal Cloudflare
deployment rollback procedure. A submitted sitemap can be removed separately
in Search Console. If the owner added a Google DNS verification record, it can
remain safely or be removed later by the owner; it is independent of the app
rollback.
