# SoleSheet traffic analytics

This document explains the dormant Cloudflare Web Analytics integration and
the owner-only steps for activating it after `solesheet.app` becomes the
production domain.

## Current state: code ready, collection disabled

The application contains the Cloudflare Web Analytics integration, but it does
not load the analytics beacon unless both of these checks pass:

- `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` contains a non-empty public site
  token; and
- the browser hostname exactly matches the hostname in `NEXT_PUBLIC_SITE_URL`.

Keep the analytics token absent from local, preview, and current `workers.dev`
builds. Do not create a Web Analytics site for
`solesheet.solesheet.workers.dev`. With no token, the application emits no
analytics script or measurement request.

The public privacy notice intentionally describes Cloudflare Web Analytics in
present tense before activation. This lets the exact disclosed configuration
be enabled later without another notice-version change. Broader collection,
including cookies, custom events, session replay, visitor profiles, exact
device models, or another analytics provider, still requires a separate
privacy review and notice update.

## What the future dashboard will report

After activation, review only the aggregate reports Cloudflare Web Analytics
provides:

- visits and page views;
- paths and referring websites;
- country;
- device class: mobile, tablet, or desktop;
- browser and operating system; and
- Core Web Vitals and related website-performance measurements.

This setup does not add analytics cookies, UTM query-string reporting, custom
events, session replay, or exact phone, tablet, or computer models. It does not
write page views to D1 or join analytics measurements to waitlist contacts or
survey answers. Workers Logs remain the operational-error source; Web
Analytics is for aggregate traffic and performance trends.

## Activate only after `solesheet.app` is ready

Activation is a separate owner-authorized production operation. Do not perform
these steps merely to test the dormant implementation.

1. Purchase and connect `solesheet.app`, confirm HTTPS works, and make it the
   approved canonical production domain.
2. In the Cloudflare dashboard, open **Web Analytics**, add or select
   `solesheet.app`, and choose the option that requires manual JS snippet
   installation. Do not leave automatic injection enabled because the
   application supplies the manual beacon.
3. Copy the site's public Web Analytics token. It is expected to appear in the
   browser and is not a secret.
4. In the connected Worker's **Settings > Build > Build variables and
   secrets**, configure both values as **Text** build variables:

   ```text
   NEXT_PUBLIC_SITE_URL=https://solesheet.app
   NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=<public site token>
   ```

   Do not put the token in **Variables and Secrets**, `wrangler.jsonc`, a
   committed `.env` file, or a runtime Secret. Next.js must receive both public
   values during the production build.
5. Confirm the active privacy page still describes exactly this Cloudflare Web
   Analytics configuration. If the intended configuration has changed, stop
   and update the privacy review before activation.
6. Build and deploy the custom-domain release.

The committed `.env.example` deliberately leaves the token blank. Do not place
the real production token in `.env.local`, `.env.example`, test fixtures,
screenshots, or shared logs even though it is public; keeping environment
values out of commits prevents configuration drift.

## Production activation smoke test

Use a normal browser on `https://solesheet.app` after the authorized deploy:

1. In **Elements**, search for `cloudflare-web-analytics-beacon` and confirm
   exactly one script is present.
2. In **Network**, confirm one successful load of
   `https://static.cloudflareinsights.com/beacon.min.js` and a successful
   analytics report to Cloudflare after the page is viewed or left.
3. Navigate between the homepage and privacy page and confirm normal rendering.
   Complete a controlled waitlist and survey flow only when the release plan
   already calls for one; analytics failure must not affect either form.
4. Open the provider URL, localhost, and any available preview URL. Confirm none
   contains the analytics script or sends a measurement request.
5. Check the console for Content Security Policy or hostname-mismatch errors.
6. After Cloudflare's normal processing delay, confirm the Web Analytics
   dashboard shows the controlled production visits, paths, device class,
   browser, operating system, country, and performance measurements.

If two beacon scripts or duplicate reports appear, stop and disable either
Cloudflare automatic injection or the manual application token before relying
on the data. SoleSheet's selected setup is manual embedding only.

## Content Security Policy

The application does not currently set a Content Security Policy. If one is
introduced before analytics activation, trial the policy in report-only mode
and allow the official manual-beacon origins in the relevant directives:

```text
script-src ... https://static.cloudflareinsights.com;
connect-src ... https://cloudflareinsights.com;
```

Review Cloudflare's current Web Analytics CSP documentation before releasing a
policy change because endpoint requirements can change.

## Initial owner review

For the first eight weeks after activation, review Web Analytics weekly; after
that, review monthly unless a campaign or incident justifies a shorter window.
Record only the reporting period, aggregate metrics, conversion estimate, and
non-personal observations.

Prioritize these questions:

1. Are visits and page views trending up or down?
2. Which paths and referring websites bring traffic?
3. Are most visits mobile, tablet, or desktop, and which browser/OS
   combinations deserve compatibility attention?
4. Do Core Web Vitals identify a page, element, or device environment that
   needs performance work?
5. What proportion of measured visits becomes a unique stored waitlist signup?

## Estimated waitlist conversion

Use the same explicit reporting boundaries for Cloudflare visits and D1
signups. Record the timezone shown by the Web Analytics dashboard and translate
the selected start-inclusive, end-exclusive range to UTC before querying D1.

For example, September 2026 in Asia/Manila corresponds to this UTC range:

```text
Start: 2026-08-31T16:00:00.000Z
End:   2026-09-30T16:00:00.000Z
```

Run only this aggregate count from an authenticated owner terminal, replacing
the example timestamps with the reviewed period:

```sh
bunx wrangler d1 execute solesheet-waitlist --remote --command "SELECT COUNT(*) AS signup_count FROM waitlist_signups WHERE created_at >= '2026-08-31T16:00:00.000Z' AND created_at < '2026-09-30T16:00:00.000Z';"
```

Do not select emails, names, answers, row identifiers, or individual timestamps
and do not export D1 records for this calculation.

Use the Web Analytics **Visits** total for the identical period:

```text
estimated waitlist conversion = unique stored signups / measured visits × 100
```

Example: 50 unique stored signups divided by 1,000 measured visits is an
estimated conversion rate of 5%. If measured visits is zero, report the rate as
unavailable rather than dividing by zero.

Treat the result as a trend estimate, not an audit total. Beacon blockers,
network delivery loss, browser behavior, Cloudflare sampling or aggregation,
and differences in the visit definition can reduce or alter measured visits.
D1 counts one row per normalized email, so duplicate signup attempts do not
increase the numerator. These expected differences are not a reason to create
individual page-view rows in D1.

## Rollback or pause collection

To disable analytics, remove or blank
`NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` in the production build settings
and redeploy. Confirm the script and measurement request are absent afterward.
No D1 migration, deletion, or application rollback is required.

If the custom domain is replaced later, keep analytics disabled while updating
the Web Analytics site and `NEXT_PUBLIC_SITE_URL`, then repeat the activation
smoke test. Never enable manual embedding and automatic injection together.

Current Cloudflare references:

- <https://developers.cloudflare.com/web-analytics/get-started/>
- <https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/>
- <https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/>
- <https://developers.cloudflare.com/web-analytics/faq/>
