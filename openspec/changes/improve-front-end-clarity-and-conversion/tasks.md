## 1. Canonical Terminology and Trust Copy

- [x] 1.1 Change the centralized hero trust line to **Being built for Filipino resellers** and update copy assertions that depend on the previous wording.
- [x] 1.2 Add the `faq-active-pairs` FAQ record with the approved Available-or-Reserved definition, sold-history behavior, and outstanding-installment clarification.
- [x] 1.3 Render the active-pair FAQ item expanded with a stable hash destination, scroll margin, semantic summary, and keyboard-visible focus behavior.
- [x] 1.4 Add a reusable contextual active-pair link treatment and apply it to pricing cards, the comparison row heading, and the founding-offer active-pair summary without altering static preview artwork.

## 2. Progressive Optional Survey

- [x] 2.1 Add temporary `core` and `optional` survey step state that resets on reload and is preserved when the dialog closes and reopens.
- [x] 2.2 Render phone, inventory size, current tool, and priority on Step 1 with **Step 1 of 2**, **About 30 seconds**, Continue, and **Finish survey now** actions.
- [x] 2.3 Render plan, installment frequency, backup interest, sales channels, and interview permission on **Step 2 of 2 · Optional** with Back and **Finish quick survey** actions.
- [x] 2.4 Preserve all answer values and existing Other-detail reveal and cleanup behavior while moving between steps or returning from the optional step.
- [x] 2.5 Add an adjacent **What counts as active?** link outside the inventory-size field label that opens `/#faq-active-pairs` in a new tab without changing the answer or survey state.

## 3. Product-Proof Conversion Point

- [x] 3.1 Add the responsive **Seen enough to have an opinion?** callout directly after the core product-preview gallery with the approved heading and four-question support copy.
- [x] 3.2 Reuse `WaitlistCta` in the callout and verify that not-joined, survey-incomplete, and survey-complete labels and actions stay synchronized with every other CTA.
- [x] 3.3 Verify the callout stacks cleanly at 360px, remains compact on desktop, and introduces no sticky overlay, overflow, or deferred outcome-proof claim.

## 4. Privacy and Accessibility Safeguards

- [ ] 4.1 Review the existing `/privacy` route against the specification and confirm that `privacy@solesheet.ph`, the stated 12-month retention rule, and recipient classes match launch operations before collection is enabled.
- [x] 4.2 Verify that consent opens the Privacy Notice in a new tab, the footer links to the same route, and both links have accessible names and visible focus.
- [x] 4.3 Verify heading order, dialog focus movement, step announcements, link focus, reduced motion, and 44-by-44-pixel touch targets across the changed surfaces.

## 5. Automated and Visual Verification

- [x] 5.1 Extend waitlist component tests for question grouping, blank core-step completion, Continue/Back behavior, preserved answers, Other-detail cleanup, and survey-step restoration.
- [x] 5.2 Extend browser tests for the visible hash-targeted FAQ definition, active-pair links, separate survey-help context, and synchronized mid-page CTA states.
- [x] 5.3 Assert that survey step navigation and completion still create no data-bearing request, analytics event, cookie, local-storage entry, or session-storage entry.
- [x] 5.4 Run lint, type checking, unit/component tests, desktop and mobile browser journeys, and the production build; resolve failures attributable to this change.
- [x] 5.5 Visually review the landing page and survey at 360px and 1440px for hierarchy, clipping, overflow, focus visibility, and CTA repetition.
