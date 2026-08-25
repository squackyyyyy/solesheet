## Purpose

Provide privacy-conscious aggregate traffic and performance measurement for SoleSheet so visits can be understood and compared with waitlist conversions without creating an individual page-view database.

## ADDED Requirements

### Requirement: Analytics remains dormant until the custom domain is activated
The public application SHALL load exactly one Cloudflare Web Analytics beacon only when a public analytics site token is configured and the browser hostname matches the configured production site. The current `workers.dev` deployment SHALL leave the token unconfigured and emit no analytics measurements. Localhost, automated tests, unmatched previews, and alternate hostnames SHALL render and operate without loading the beacon.

#### Scenario: Analytics-ready code runs on the provider hostname
- **WHEN** the analytics-ready application is deployed on the current `workers.dev` hostname without a configured site token
- **THEN** no Web Analytics beacon or measurement request is emitted

#### Scenario: Visitor opens the activated custom domain
- **WHEN** `solesheet.app` is the configured production site, a valid analytics token is present, and the browser hostname matches it
- **THEN** one non-blocking Cloudflare Web Analytics beacon is loaded for the page

#### Scenario: Developer opens the site locally
- **WHEN** the application runs on localhost or without production analytics configuration
- **THEN** no Web Analytics beacon or measurement request is emitted

#### Scenario: Visitor opens an unmatched deployment hostname
- **WHEN** a deployment contains analytics configuration but its browser hostname does not match the configured production site
- **THEN** the analytics beacon remains disabled and the visit is not intentionally counted in the production property

### Requirement: Analytics failure does not affect the website flow
Analytics loading and measurement SHALL be asynchronous and SHALL NOT block page rendering, navigation, waitlist submission, survey interaction, or form persistence. Failure, blocking, or delayed availability of the analytics provider SHALL leave the public experience functional and SHALL NOT produce a visitor-facing error.

#### Scenario: Beacon is blocked or unavailable
- **WHEN** a browser extension, network condition, or provider outage prevents the analytics beacon from loading or reporting
- **THEN** the landing page, privacy page, waitlist, and survey continue to operate normally

### Requirement: Collection remains aggregate and purpose-limited
The analytics configuration SHALL be limited to Cloudflare Web Analytics page and performance measurements such as visits, page views, paths, referrers, country, device class, browser, operating system, and Core Web Vitals. SoleSheet SHALL NOT add analytics cookies, visitor profiles, session replay, custom behavioral events, exact hardware-model collection, or individual page-view rows in D1 as part of this capability.

#### Scenario: Owner reviews traffic characteristics
- **WHEN** the owner opens the Cloudflare Web Analytics dashboard
- **THEN** aggregate traffic, source, device-class, browser, operating-system, geography, path, and performance reports are available without exposing waitlist contacts or survey answers

#### Scenario: Exact phone model is requested
- **WHEN** the owner wants to know whether a visitor used a particular phone, tablet, or computer model
- **THEN** this capability reports only the available aggregate device class, browser, and operating system and does not introduce additional fingerprinting or hardware telemetry

### Requirement: Analytics collection is disclosed as active before activation
The public privacy notice SHALL describe Cloudflare Web Analytics in present-tense language, including the aggregate traffic and performance measurements used, product-improvement and conversion-analysis purposes, and cookie-free configuration, while the implementation remains dormant. This disclosure and its updated notice version SHALL be deployed before the production beacon is enabled. Enabling the exact disclosed configuration later SHALL NOT require another notice-version change, while materially changing the collection SHALL update the notice and version before that change begins.

#### Scenario: Dormant implementation is released
- **WHEN** the analytics-ready code is deployed without its production token
- **THEN** the public notice already describes Cloudflare Web Analytics as an active practice and exposes the updated notice version

#### Scenario: Disclosed analytics is later activated
- **WHEN** the token is configured for `solesheet.app` using only the measurements and purposes already disclosed
- **THEN** collection can begin under the existing analytics-aware notice without another version change

#### Scenario: Analytics collection becomes more invasive
- **WHEN** a future change proposes cookies, custom events, session replay, visitor profiling, or another analytics provider
- **THEN** the change requires a separate privacy and consent review rather than being treated as part of this capability

### Requirement: Traffic and signup reporting uses comparable aggregates
The owner runbook SHALL define an initial review of visits, page views, paths, referrers, countries, device classes, browsers, operating systems, and Core Web Vitals. It SHALL calculate an estimated waitlist conversion rate by comparing aggregate D1 signup counts with Web Analytics visits over the same documented time window and SHALL state that beacon blocking, delivery loss, sampling, duplicate-signup behavior, and differing visitor definitions can affect the estimate.

#### Scenario: Owner reviews waitlist conversion
- **WHEN** the owner compares analytics and signup performance for a reporting period
- **THEN** the conversion estimate uses signup and visit aggregates from the same period and records the calculation boundaries and known limitations without exporting personal records

#### Scenario: Analytics and D1 counts differ
- **WHEN** measured visits and stored signups do not reconcile exactly
- **THEN** the difference is treated as an expected measurement limitation to investigate rather than evidence that individual visit rows should be added to D1

### Requirement: Analytics activates with the custom production domain
The deployment procedure SHALL keep analytics disabled on the current provider hostname and SHALL document how to activate and verify measurement when `solesheet.app` becomes the production domain. Activation SHALL configure the approved hostname and Cloudflare analytics property together and SHALL ensure that automatic injection and manual embedding are not active together on the same page.

#### Scenario: Provider hostname remains active before domain purchase
- **WHEN** SoleSheet is deployed on its current `workers.dev` hostname before `solesheet.app` activation
- **THEN** the public analytics token remains absent and production verification confirms no beacon or measurement request

#### Scenario: SoleSheet activates its custom domain
- **WHEN** the owner connects and approves `solesheet.app` as the production domain
- **THEN** analytics is configured for that hostname, preview and provider hostnames are excluded from intended production reporting, and no page loads duplicate beacons
