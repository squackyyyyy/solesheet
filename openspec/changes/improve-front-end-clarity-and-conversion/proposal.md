## Why

The landing page already communicates SoleSheet's planned workflows in depth, but several high-intent moments still require visitors to infer terminology, product status, or the next action. This change improves front-end clarity and conversion by making the active-pair definition consistently reachable, shortening the optional survey's perceived commitment, and adding a timely waitlist action after product proof.

## What Changes

- Change the hero trust line from **Built with Filipino resellers** to **Being built for Filipino resellers** so the intended audience and validation-stage status are accurate without implying completed collaboration.
- Add a stable FAQ entry defining an active pair as an inventory record marked **Available** or **Reserved**, excluding **Sold** records from plan limits while keeping them in sold history and continuing to track any outstanding installment balance.
- Link user-facing textual uses of **active pairs** to the stable FAQ entry. Provide an adjacent **What counts as active?** link for the inventory-size survey without making static product-preview artwork interactive or nesting a link inside a survey field label.
- Reorganize the optional survey into a short four-question first step for phone platform, inventory size, current tool, and top priority, followed by an explicitly optional second step for plan interest, installment frequency, backup interest, sales channels, and interview permission.
- Add concise progress and time guidance to the survey while preserving all existing answers, Other-detail behavior, dismissal, reopening, completion, and temporary in-session state.
- Add a responsive waitlist CTA immediately after the strongest existing core product proof so a visitor can act after understanding the product without scrolling through every later section.
- Preserve the dedicated collection-ready Privacy Notice and its consent/footer links as part of the public trust experience.
- Explicitly defer the new **sale recorded → stock updated → profit calculated** before/action/after proof to a separate next-phase proposal.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `waitlist-landing-experience`: Clarify validation-stage positioning, provide a stable active-pair FAQ destination with contextual links, place a mid-page waitlist CTA after core proof, and preserve the dedicated privacy notice experience.
- `validation-survey`: Replace the single long survey presentation with a two-step optional flow that foregrounds four core research signals and moves remaining questions to an optional follow-up step.

## Impact

- Affects landing-page copy and section composition in `app/page.tsx` and centralized content in `app/lib/site-content.ts`.
- Affects survey state, step navigation, focus management, and presentation in `app/components/waitlist/`.
- May require a small reusable link or helper treatment for active-pair references in pricing and survey UI.
- Extends component and browser coverage for FAQ anchors, CTA focus behavior, survey step transitions, responsive layout, keyboard use, and non-persistence.
- Does not add APIs, backend submission, analytics, browser persistence, offer enforcement, or new product-preview imagery.
