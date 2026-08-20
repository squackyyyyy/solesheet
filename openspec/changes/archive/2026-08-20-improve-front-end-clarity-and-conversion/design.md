## Context

See `proposal.md` for motivation. The landing page centralizes marketing and survey copy in `app/lib/site-content.ts`, renders the public narrative in `app/page.tsx`, and shares waitlist journey state across CTA instances through `WaitlistJourneyProvider`.

The survey now uses the separately specified one-question-at-a-time wizard. This change must preserve that flow while keeping the active-pair definition reachable from the inventory-size question. The current waitlist and survey remain frontend simulations with no request or durable persistence. The dedicated `/privacy` route is therefore a collection-ready notice whose operational details must be confirmed when a real backend is introduced.

## Goals / Non-Goals

**Goals:**

- Give every textual active-pair reference a consistent, accessible path to one canonical definition.
- Preserve the current survey wizard while making its active-pair help link conventional and independent from answer controls.
- Reuse the shared waitlist journey state for a timely CTA after the existing core product proof.
- Keep validation-stage wording, privacy access, responsive behavior, and non-persistence explicit.

**Non-Goals:**

- Changing the survey's question-at-a-time navigation, progress, animation, or completion sequence.
- Building the new before/action/after outcome-proof section or any new product imagery.
- Submitting waitlist or survey information, adding durable storage, or selecting backend providers.
- Finalizing the operational privacy contact, processor list, or retention workflow before real collection exists.
- Adding analytics, offer eligibility enforcement, accounts, billing, or checkout.

## Decisions

### Use one canonical active-pair FAQ destination

Keep the content-registry FAQ record with the stable identifier `faq-active-pairs`, and keep its `<details>` element expanded so hash navigation always reveals the definition. The definition states that Available and Reserved records are active, Sold records are excluded from plan limits but remain in history, and outstanding installment balances continue to be tracked after sale.

Textual active-pair occurrences in pricing cards, the comparison row header, and the founding-offer summary link to `#faq-active-pairs`. A small reusable link treatment provides consistent focus and underline behavior without changing surrounding typography. Static screenshots, the device frame, and aria-hidden decorative callouts remain untouched because they are intentionally non-interactive.

**Alternative considered:** repeat a short definition beside every occurrence. Rejected because it would add visual noise and create multiple copies that could drift.

### Preserve the question wizard and keep help outside the answer control

The inventory-size question keeps a separate **What pairs count as active?** link outside its field label. It opens `/#faq-active-pairs` in a new tab, preserving the current question position and temporary answers. No new survey grouping or navigation state is introduced by this change.

**Alternative considered:** link the question label itself. Rejected because nesting or combining interactive answer and navigation semantics would make the field harder to understand and operate.

### Place the mid-page CTA inside the product section after the gallery

Render one compact editorial CTA immediately after `MockupShowcase` and before the product section closes. It uses the existing `WaitlistCta` component so its label and action automatically follow not-joined, survey-incomplete, and survey-complete states.

On mobile it stacks copy above the full-width CTA; on larger screens it becomes a compact horizontal callout. It does not become sticky, avoiding persistent viewport obstruction and adding no new journey state.

**Alternative considered:** add a sticky mobile CTA. Deferred because the page already has multiple progress-aware CTAs and a sticky control could obscure the gallery or survey sheet.

### Keep wording and privacy details centralized or deliberately isolated

Keep **Being built for Filipino resellers** in the content registry and the active-pair FAQ beside the other public FAQs. Keep the longer Privacy Notice on its dedicated route rather than duplicating legal-facing text in the marketing registry.

The current notice retains its contact, twelve-month retention statement, recipient classes, rights, and update commitments. Final confirmation that these match real providers and operational handling is a launch gate for the future backend collection change, not unfinished frontend behavior in this change.

### Verify behavior at component and browser levels

Component and browser coverage verify the FAQ hash, separate survey-help context, mid-page CTA journey synchronization, privacy links, keyboard focus, responsive layout, reduced motion, and non-persistence. The existing wizard-specific tests remain owned by the question-wizard capability.

## Risks / Trade-offs

- **[Every active-pair link becomes visually repetitive]** → Use one restrained text-link treatment and avoid standalone icons or links inside artwork.
- **[An FAQ hash lands on a closed answer]** → Keep the canonical active-pair `<details>` expanded and give it scroll margin for the header.
- **[The help link disrupts temporary survey state]** → Open it separately and keep it outside the field label and answer controls.
- **[New CTA adds repetition]** → Keep the callout compact and place it only after the core gallery, where it resolves a long gap between the hero and pricing actions.
- **[Privacy copy drifts from eventual backend behavior]** → Make provider, contact, retention, and collected-field confirmation an explicit prerequisite of enabling real collection.

## Migration Plan

1. Add the canonical FAQ content and stable identifier before wiring contextual links.
2. Add active-pair links and the mid-page CTA without changing survey question keys, wizard state, or journey-state values.
3. Extend tests, verify mobile and desktop layouts, and confirm that no request or durable storage write is introduced.
4. Roll back by removing the contextual links and CTA callout; the existing FAQ, wizard, and shared journey behavior remain structurally compatible.
