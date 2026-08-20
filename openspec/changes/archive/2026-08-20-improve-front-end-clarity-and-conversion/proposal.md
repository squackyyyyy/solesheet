## Why

The landing page already communicates SoleSheet's planned workflows in depth, but several high-intent moments still require visitors to infer terminology, product status, or the next action. This change improves front-end clarity and conversion by making the active-pair definition consistently reachable and adding a timely waitlist action after product proof without disturbing the survey's newer one-question-at-a-time flow.

## What Changes

- Change the hero trust line from **Built with Filipino resellers** to **Being built for Filipino resellers** so the intended audience and validation-stage status are accurate without implying completed collaboration.
- Add a stable FAQ entry defining an active pair as an inventory record marked **Available** or **Reserved**, excluding **Sold** records from plan limits while keeping them in sold history and continuing to track any outstanding installment balance.
- Link user-facing textual uses of **active pairs** to the stable FAQ entry. Provide an adjacent **What pairs count as active?** link for the inventory-size survey without making static product-preview artwork interactive or nesting a link inside a survey field label.
- Preserve the one-question-at-a-time survey wizard and its separate core and optional progress while adding a conventional **What pairs count as active?** help link beside the inventory-size question.
- Add a responsive waitlist CTA immediately after the strongest existing core product proof so a visitor can act after understanding the product without scrolling through every later section.
- Preserve the dedicated collection-ready Privacy Notice and its consent/footer links as part of the public trust experience; defer final operational confirmation of its contact, providers, and retention behavior until real collection is introduced.
- Explicitly defer the new **sale recorded → stock updated → profit calculated** before/action/after proof to a separate next-phase proposal.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `waitlist-landing-experience`: Clarify validation-stage positioning, provide a stable active-pair FAQ destination with contextual links, place a mid-page waitlist CTA after core proof, and preserve the dedicated privacy notice experience.
- `validation-survey`: Preserve the current one-question wizard while keeping active-pair help recognizable, separate from the answer control, and safe for temporary in-session answers.

## Impact

- Affects landing-page copy and section composition in `app/page.tsx` and centralized content in `app/lib/site-content.ts`.
- Affects survey help-link presentation in `app/components/waitlist/` without changing the current wizard state model.
- May require a small reusable link or helper treatment for active-pair references in pricing and survey UI.
- Extends component and browser coverage for FAQ anchors, CTA focus behavior, survey-help context, responsive layout, keyboard use, and non-persistence.
- Does not add APIs, backend submission, analytics, browser persistence, offer enforcement, or new product-preview imagery.
