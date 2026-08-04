## Why

The waitlist page currently presents the same “Join the waitlist” call to action after a visitor has already completed the simulated signup, which makes the prototype feel disconnected and misses the opportunity to invite useful survey feedback. Phase 1 gives the frontend a coherent session-only journey while correcting the founding offer so its intended Starter-plan scope and first-year limit are clear.

## What Changes

- Introduce three presentation states for every waitlist CTA on the page: not joined, joined with survey incomplete, and survey complete.
- Synchronize header, hero, pricing, and final-section CTAs from one in-memory frontend state so completing signup or the survey updates the whole page immediately.
- After simulated signup, change the CTA to “Answer the quick survey” and let visitors reopen the optional survey without losing answers during the current page session.
- After survey completion, show a disabled/non-actionable “You’re all set — thank you” CTA with an additional non-color completion cue.
- Keep the entire experience a non-saving visual prototype: no API, database, browser storage, cookie, analytics, or durable waitlist membership is introduced, and refreshing the page resets the journey.
- Replace the broad “first 50–100 paying users” language with a consistent planned offer: the first 50 eligible survey respondents may receive Starter at ₱65/month for their first 12 paid months, subject to eligibility and redemption confirmation before launch.
- Update the pricing story, survey copy, FAQ content, and mobile upgrade mockup wherever the founding offer appears.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `waitlist-landing-experience`: Waitlist CTAs become synchronized, progress-aware controls, and the landing-page founding offer is narrowed to the first 50 eligible survey respondents for Starter’s first 12 paid months.
- `waitlist-signup`: A valid simulated signup advances the shared frontend journey to the joined/survey-incomplete state without persisting visitor data.
- `validation-survey`: The optional survey can be reopened with session answers intact, and prototype completion advances every waitlist CTA to the final thank-you state.
- `product-mockup-showcase`: Founding-offer language shown in the mobile upgrade mockup must match the revised Starter-only, first-year offer.

## Impact

- Affects waitlist page composition, CTA components, simulated signup and survey state, centralized marketing content, pricing/FAQ sections, and mobile app mockup copy.
- Requires frontend component and browser coverage for state transitions, synchronized CTA variants, accessibility cues, answer retention, and reload reset behavior.
- Does not add or change production APIs, backend services, persistence, authentication, cookies, analytics, or third-party dependencies.
