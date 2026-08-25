## 1. Production-Gated Analytics Integration

- [x] 1.1 Add a shallow Cloudflare Web Analytics component that derives the approved hostname from `NEXT_PUBLIC_SITE_URL`, requires the public analytics token, loads the official module beacon after interactivity, and emits nothing for missing, invalid, or mismatched configuration.
- [x] 1.2 Mount the analytics component once in the root layout without coupling it to waitlist or survey state, and add an empty public analytics-token entry plus guidance that it remains unset until `solesheet.app` activation.
- [x] 1.3 Add focused component tests for missing configuration, matching production hostname, unmatched preview or localhost hostname, invalid canonical URL, and exactly-one-beacon behavior.
- [x] 1.4 Verify that a blocked or failed analytics script produces no visitor-facing error and does not change landing-page, privacy-page, waitlist, or survey behavior.

## 2. Privacy and Owner Reporting

- [x] 2.1 Update the privacy notice in present tense to state that SoleSheet uses Cloudflare Web Analytics and disclose its measurements, purposes, cookie-free configuration, separation from submitted forms, and collection boundaries; increment the notice version and effective date in the same change even though the beacon remains dormant.
- [x] 2.2 Add `docs/traffic-analytics.md` with the dormant `workers.dev` release, future `solesheet.app` dashboard setup, build-variable scopes, manual-snippet selection, production network/dashboard verification, duplicate-injection checks, expected reporting delay and undercounting caveats, CSP guidance, and rollback.
- [x] 2.3 Document the initial metrics review and estimated waitlist-conversion calculation using privacy-safe D1 signup counts and Cloudflare visits over the same explicit UTC boundaries, without exporting individual records.
- [x] 2.4 Update the backend roadmap to mark Phase 3 accepted, identify Phase 4 code as analytics-ready but dormant until `solesheet.app`, and preserve protected reporting or administration as optional later work.

## 3. Verification and Handoff

- [x] 3.1 Run the focused analytics and privacy tests, then run the repository typecheck, lint, and standard test suite.
- [x] 3.2 Run the Next.js and OpenNext production builds with analytics configuration absent and confirm the public application builds without requiring the beacon token.
- [x] 3.3 Inspect a controlled matching-host configuration to confirm the future beacon uses only the public token and no runtime secrets, then confirm the token-free `workers.dev`, localhost, and unmatched-host paths remain beacon-free.
- [x] 3.4 Record the owner-only `solesheet.app` activation and post-deploy smoke-test checklist without creating a Web Analytics property, configuring the token, changing dashboard settings, or deploying production unless separately authorized.
