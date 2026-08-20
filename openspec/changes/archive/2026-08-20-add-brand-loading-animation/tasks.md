## 1. Reusable Brand Status Mark

- [x] 1.1 Add `app/components/brand/brand-loader.tsx` with loading/success and light/dark props, a required screen-reader-only status label, decorative inline SVG layers, stable per-instance clip identifiers, and canonical SoleSheet mark geometry.
- [x] 1.2 Add `app/components/brand/brand-loader.module.css` with the grid-to-sheet-to-sole loading loop, exact settled-logo hold, seamless reset, non-looping success treatment, responsive sizing, surface tokens, and static final-frame reduced-motion overrides.
- [x] 1.3 Compare loading and success settled frames against both canonical SVG marks and refine stroke weights, clipping, colors, grid positions, laces, and completion cue without changing source logo assets.

## 2. Keep Flow Image Loading Separate

- [x] 2.1 Restore `MockupShowcase` to ordinary selected responsive-image rendering, removing the brand loader, loaded-image cache, image lifecycle handlers, eager-request override, and loading/showing announcements introduced by this change.
- [x] 2.2 Restore the gallery tests to cover image selection and responsive source switching without asserting brand-loader lifecycle behavior.

## 3. Component Verification

- [x] 3.1 Add `app/components/brand/brand-loader.test.tsx` covering required and custom statuses, decorative SVG semantics, loading/success and light/dark configurations, canonical view box and layers, and unique clip references across multiple instances.
- [x] 3.2 Run focused loader and gallery tests plus lint after removing the current gallery consumer.

## 4. Visual Verification

- [x] 4.1 Visually review the loading loop and success state on 360px mobile and desktop light/dark surfaces at normal and slowed playback.
- [x] 4.2 Verify reduced motion shows a static completed mark and the reusable component causes no horizontal overflow.

## 5. Survey Submission Integration

- [x] 5.1 Add a guarded survey submission state and cleanup-safe five-second test timer so every **Finish this survey** action replaces question navigation with the branded loading state before completing the journey.
- [x] 5.2 Replace the survey's generic completion check with the branded success state while retaining the completed sheet-grid sneaker, completion copy, fixed wizard dimensions, and close action.
- [x] 5.3 Extend waitlist component tests with fake-timer coverage for the pending-to-success transition, disabled duplicate completion path, accessible statuses, and unchanged no-fetch/no-persistence behavior; run focused tests and lint.

## 6. Email Signup Integration

- [x] 6.1 Extend `BrandLoader` with tested compact and decorative configurations that crop the mark for button-scale presentation without duplicate status semantics.
- [x] 6.2 Add the compact dark-surface loading mark beside the disabled **Joining…** label and replace the waitlist confirmation card's generic check with the full light-surface success mark, preserving the existing 650ms simulation, copy, and survey CTA.
- [x] 6.3 Extend focused waitlist tests for pending button dimensions/content, decorative semantics, branded signup success, and unchanged announcements; run component tests and lint without an extensive Playwright pass.

## 7. Continuous Survey Success Transition

- [x] 7.1 Keep one survey outcome stage and `BrandLoader` instance mounted from pending through success, reserve the completion-content region to prevent movement, slide the completion content upward beneath the settled mark, and cover the continuity with a focused component test.

## 8. Native Email Pending Feedback

- [x] 8.1 Replace the email button's compact brand animation and manual live region with React Aria `isPending`, an indeterminate `ProgressBar` spinner, and **Joining waitlist…**; remove the now-unused compact loader API and update focused tests.
