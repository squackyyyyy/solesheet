## Context

See `proposal.md` for motivation. The landing page centralizes marketing and survey copy in `app/lib/site-content.ts`, renders the public narrative in `app/page.tsx`, and shares waitlist journey state across all CTA instances through `WaitlistJourneyProvider`. The optional survey currently renders all nine questions in one scrollable form and keeps answers only in React state. Active-pair meaning already exists in the fixture calculation as `Available + Reserved`, but the public page has no stable definition destination.

The collection-ready `/privacy` route and its form/footer links already exist in the working tree. This change treats them as a protected baseline and adds behavioral coverage rather than redesigning the notice.

## Goals / Non-Goals

**Goals:**

- Give every textual active-pair reference a consistent, accessible path to one canonical definition.
- Make the survey feel short at entry while retaining every existing research question and optional behavior.
- Reuse the shared waitlist journey state for a timely CTA after the existing core product proof.
- Keep validation-stage wording, privacy access, responsive behavior, and non-persistence explicit.

**Non-Goals:**

- Building the new before/action/after outcome-proof section or any new product imagery.
- Submitting waitlist or survey information, adding durable storage, or selecting backend providers.
- Adding analytics, offer eligibility enforcement, accounts, billing, or checkout.
- Changing active-pair limits, pricing amounts, inventory statuses, or sold-versus-settled behavior.

## Decisions

### Use one canonical active-pair FAQ destination

Add a content-registry FAQ record with a stable identifier, `faq-active-pairs`, and keep its `<details>` element expanded so hash navigation always reveals the definition. The definition will state that Available and Reserved records are active, Sold records are excluded from plan limits but remain in history, and outstanding installment balances continue to be tracked after sale.

Textual active-pair occurrences in pricing cards, the comparison row header, and the founding-offer summary will link to `#faq-active-pairs`. A small reusable link treatment should provide consistent focus and underline behavior without changing surrounding typography. Static screenshots, the device frame, and aria-hidden decorative callouts remain untouched because they are intentionally non-interactive.

The survey uses an adjacent link outside the inventory-size field label and opens `/#faq-active-pairs` in a new tab. This avoids nested interactive semantics and preserves the dialog and temporary answers.

**Alternative considered:** repeat a short definition beside every occurrence. Rejected because it would add visual noise and create multiple copies that could drift.

### Model the survey as a small in-memory step state

Add a temporary survey step state with two values: `core` and `optional`. It lives beside the existing answer state and is reset by a page reload like the rest of the prototype.

```text
CORE ── Continue ──▶ OPTIONAL ── Finish ──▶ COMPLETE
  │                     │
  └── Finish now ───────┘
                        └── Back ──▶ CORE
```

The core step contains phone, inventory size, current tool, and priority. Its header communicates **Step 1 of 2** and **About 30 seconds**. The optional step contains plan, installments, backup, channels, and interview and communicates **Step 2 of 2 · Optional**. Core provides both **Continue to optional questions** and a quieter **Finish survey now** action; optional provides **Back** and **Finish quick survey**.

Step navigation must not submit a nested form accidentally. Buttons therefore have explicit action semantics, and only completion actions invoke the existing completion transition. Closing the dialog preserves both answers and current step. Existing Other-answer cleanup behavior stays unchanged.

**Alternative considered:** collapse optional questions in a disclosure within one form. Rejected because the visitor would still encounter one long surface and progress would remain ambiguous.

### Place the mid-page CTA inside the product section after the gallery

Render one compact editorial CTA immediately after `MockupShowcase` and before the product section closes. It uses the existing `WaitlistCta` component so its label and action automatically follow not-joined, survey-incomplete, and survey-complete states.

The supporting copy should connect proof to participation without introducing the deferred outcome-proof claim. Recommended direction:

- Label: **Seen enough to have an opinion?**
- Heading: **Help shape what we build first.**
- Support: **Join the waitlist, then answer four quick questions if you’d like.**

On mobile it stacks copy above the full-width CTA; on larger screens it becomes a compact horizontal callout. It does not become sticky, avoiding persistent viewport obstruction and adding no new journey state.

**Alternative considered:** add a sticky mobile CTA. Deferred because the page already has multiple progress-aware CTAs and a sticky control could obscure the gallery or survey sheet.

### Keep wording and privacy details centralized or deliberately isolated

Change the hero eyebrow in the content registry to **Being built for Filipino resellers**. Store the active-pair FAQ content and stable id alongside existing FAQs. Keep the longer Privacy Notice on its dedicated route rather than duplicating legal-facing text in the marketing registry; tests will verify the route, working contact presentation, required sections, and landing-page links.

### Verify behavior at component and browser levels

Component tests will cover step grouping, navigation, optional completion, Other-field preservation, and active-pair help semantics. Browser tests will cover hash navigation with the FAQ answer visible, new-tab survey help, mid-page CTA focus and journey synchronization, 360px overflow, keyboard focus, reduced motion, non-persistence, and the dedicated privacy links.

## Risks / Trade-offs

- **[Every active-pair link becomes visually repetitive]** → Use one restrained text-link treatment and avoid adding standalone icons or links inside artwork.
- **[An FAQ hash lands on a closed answer]** → Keep the canonical active-pair `<details>` expanded by default and give it scroll margin for the header.
- **[Two survey steps increase navigation complexity]** → Keep only two steps, preserve answers in one shared state object, and provide explicit Back, Continue, and Finish actions.
- **[Visitors interpret the four core questions as required]** → Retain the existing optional language, accept blank completion, and label the second step as optional without marking the first as mandatory.
- **[New CTA adds repetition]** → Keep the callout compact and place it only after the core gallery, where it resolves a long gap between the hero and pricing actions.
- **[Privacy copy drifts from eventual backend behavior]** → Treat provider, contact, retention, and field changes as a release-blocking notice review before collection is enabled.

## Migration Plan

1. Add the canonical FAQ content and stable identifier before wiring contextual links.
2. Add active-pair links, survey step state, and the mid-page CTA without changing existing answer keys or journey-state values.
3. Extend tests, verify mobile and desktop layouts, and confirm that no request or durable storage write is introduced.
4. Roll back by removing the new links, CTA callout, and survey step state; the existing single-form survey and shared CTA behavior remain structurally compatible.
