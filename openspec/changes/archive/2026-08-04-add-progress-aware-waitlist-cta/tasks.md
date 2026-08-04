## 1. Shared Waitlist Journey State

- [x] 1.1 Add a typed client-side waitlist journey provider with `not-joined`, `survey-incomplete`, and `survey-complete` states, one-way transition actions, shared survey visibility, and a default state that resets on remount or reload.
- [x] 1.2 Wrap the waitlist page composition in the provider so header, hero, pricing, final waitlist experience, and survey dialog consume the same current-page state without converting static content into separately managed client state.
- [x] 1.3 Refactor `WaitlistCta` to derive its exact label, action, icon, and disabled semantics from the shared state while retaining only layout-appropriate visual variants.
- [x] 1.4 Add dynamic journey support copy and one polite live region so joined and survey-complete changes are understandable and announced without relying on color alone.

## 2. Signup and Optional Survey Flow

- [x] 2.1 Connect valid simulated signup to the `survey-incomplete` transition, update the final-section success presentation, and remove any control that can incorrectly return the journey to the not-joined form state.
- [x] 2.2 Route every survey-incomplete CTA to the existing accessible survey dialog while preserving temporary answers when the visitor closes and reopens it during the same page session.
- [x] 2.3 Connect survey completion to the `survey-complete` transition so the dialog thank-you state and all page CTAs update together and completed CTAs are non-actionable.
- [x] 2.4 Confirm signup values, survey answers, and journey progress use component memory only and make no API, analytics, cookie, local-storage, or session-storage writes.

## 3. Founding Starter Offer Copy

- [x] 3.1 Add a centralized founding-offer content model with approved compact and explanatory variants covering ₱65 per month, Starter-only scope, the first 50 eligible survey respondents, the first 12 paid months, standard pricing afterward, and pre-launch eligibility/redemption confirmation.
- [x] 3.2 Update pricing, final waitlist copy, FAQ content, and survey plan options to use the centralized offer language without making survey questions required or promising eligibility.
- [x] 3.3 Update the mobile upgrade mockup to match the same planned offer within its compact layout and remove every “first 50–100 paying users” or ongoing-rate claim from the application.

## 4. Component and Browser Coverage

- [x] 4.1 Expand component tests to render multiple CTAs with the provider and verify the exact labels, actions, support status, one-way transitions, completion icon/disabled semantics, and absence of fetch or durable-storage writes.
- [x] 4.2 Expand browser tests to verify that all header, hero, pricing, and final-section CTA instances synchronize after signup and survey completion at desktop and mobile viewports.
- [x] 4.3 Add browser coverage for reopening an incomplete survey from an external CTA with answers intact, resetting to not joined after reload, predictable dialog focus, touch activation, and accessible progress announcements.
- [x] 4.4 Add copy assertions that reject the legacy founding-offer claim and confirm Starter, first-50-eligible, and first-12-paid-month scope in both landing and upgrade-mockup surfaces.

## 5. Verification

- [x] 5.1 Run formatting, static analysis, type checks, and the component test suite; resolve all regressions introduced by the change.
- [x] 5.2 Run the Playwright desktop and mobile projects, including accessibility checks, and confirm the page has no horizontal overflow or new physical-touch regressions.
- [x] 5.3 Inspect the final page at narrow phone and desktop widths to confirm state copy fits each CTA placement, the completed state is visually distinct beyond color, and all offer references remain readable and consistent.
