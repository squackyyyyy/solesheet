# custom-domain-search-readiness Specification

## Purpose

Make the permanent SoleSheet domain consistently discoverable by search crawlers while keeping canonical URLs, public-route inventory, and owner-operated indexing handoff accurate and reviewable.

## Requirements

### Requirement: SoleSheet uses one permanent canonical origin
Public metadata, generated discovery documents, environment examples, and deployment guidance SHALL use `https://solesheet.app` as the permanent canonical origin and SHALL NOT fall back to `solesheet.ph`. Preview or provider-hosted copies SHALL identify the same permanent canonical URLs rather than presenting themselves as separate indexable origins.

#### Scenario: Production metadata is rendered
- **WHEN** a crawler requests the homepage or Privacy Policy from the production deployment
- **THEN** canonical and absolute metadata URLs use the secure `solesheet.app` origin

#### Scenario: Canonical configuration is absent
- **WHEN** a build does not receive an explicit public site URL
- **THEN** generated metadata and discovery URLs fall back to `https://solesheet.app` rather than an obsolete or provider hostname

#### Scenario: Repository guidance is followed
- **WHEN** an operator uses the committed environment and deployment documentation
- **THEN** the documented production site URL is `https://solesheet.app` and no active instruction directs a release to `solesheet.ph`

### Requirement: Sitemap exposes only indexable public pages
The production site SHALL serve a valid sitemap at `/sitemap.xml` using absolute `https://solesheet.app` URLs for the public homepage and Privacy Policy. The sitemap SHALL exclude API routes, capture studios, framework assets, provider-hosted duplicates, and any route unavailable to ordinary production visitors.

#### Scenario: Crawler requests the sitemap
- **WHEN** a crawler requests `/sitemap.xml`
- **THEN** it receives a successful XML sitemap containing `https://solesheet.app` and `https://solesheet.app/privacy`

#### Scenario: Crawler reviews sitemap scope
- **WHEN** the sitemap entries are inspected
- **THEN** no API, studio, internal asset, preview hostname, or non-public route is listed

### Requirement: Robots directives support search discovery without becoming access control
The origin SHALL serve robots directives that allow normal search crawling of public pages, reference `https://solesheet.app/sitemap.xml`, and exclude `/api/` and production-disabled studio route families from crawler discovery. The directives SHALL remain valid when Cloudflare prepends its managed robots or content-signal policy. Robots rules SHALL be treated as crawler guidance and SHALL NOT replace the application's existing route protection.

#### Scenario: Search crawler requests robots
- **WHEN** a crawler requests `/robots.txt` through Cloudflare
- **THEN** the successful text response contains the origin's public-search directives and absolute sitemap reference even when Cloudflare-managed policy text is prepended

#### Scenario: Crawler sees a non-public path
- **WHEN** a crawler evaluates an API or studio URL against the origin directives
- **THEN** the applicable route family is disallowed without making that directive the security boundary

### Requirement: Search-console activation remains an owner-operated handoff
The repository SHALL document how the owner verifies the `solesheet.app` property in Google Search Console, submits the production sitemap, requests indexing for the canonical public pages, and confirms later crawl or indexing status. The procedure SHALL NOT store account credentials or verification secrets and SHALL state that deployment and sitemap submission do not guarantee immediate ranking or indexing.

#### Scenario: Owner submits the sitemap
- **WHEN** the production discovery endpoints pass verification and the owner completes Search Console setup
- **THEN** the owner can submit `https://solesheet.app/sitemap.xml` and record a non-sensitive confirmation without exposing credentials

#### Scenario: Search results do not appear immediately
- **WHEN** the sitemap is accepted but the site is not yet indexed or ranked
- **THEN** the runbook directs the owner to inspect crawl and indexing status later rather than treating the delay as an application failure
