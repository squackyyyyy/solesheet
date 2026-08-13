## Context

The existing `#installments` section follows the gallery and repeats the Payments static screen that the gallery already exposes. It also contains the most explicit explanation of the important domain distinction between a pair’s stock state and its payment state. See proposal.md for motivation and the delta specification for required public behavior.

## Goals / Non-Goals

**Goals:**

- Preserve the post-gallery proof that a sold pair may still have a balance to collect.
- Make that proof more compact than a second full-width product showcase.
- Keep the navigation anchor and fixture-derived amounts consistent with the gallery’s Payment preview.

**Non-Goals:**

- Changing the planned installment workflow, payment fixture, pricing, or the seven-gallery-item model.
- Adding a new product mockup, operable financial control, lending behavior, or payment integration.

## Decisions

### Use a compact state callout, not a second device frame

Replace the dark two-column section with a compact post-gallery callout that leads with **Sold doesn’t always mean settled.** Keep four concise state facts in a responsive grid so the explanation stays concrete without recreating the Payments screen.

Alternative considered: remove the section outright. This would shorten the page further but lose the clearest prose explanation of the payment-state distinction.

### Preserve the `#installments` anchor

Keep the existing section id while changing its structure. This preserves primary navigation, browser-test coverage, and any shared deep links without requiring URL migration.

### Reuse canonical payment fixture values

Continue deriving cash collected and remaining balance from `recordedInstallmentPayment`; do not introduce alternate display values. The gallery and callout should reinforce one consistent example.

## Risks / Trade-offs

- [A smaller callout may feel less visually prominent] → Lead with the distinctive sold-versus-settled headline and retain the four state facts.
- [Removing the device frame could make the feature seem abstract] → Place the callout directly after the gallery, where the Installments and Payments previews remain available.
- [Old tests may assume the duplicate screen exists] → Update tests to assert the single-gallery proof, stable anchor, non-duplicated device rendering, and responsive layout.

## Migration Plan

1. Replace the standalone section markup and unneeded mockup imports while retaining the id and fixture-driven values.
2. Update page and browser tests for the compact callout and absence of a duplicate payment preview.
3. Verify desktop and mobile layouts, accessibility, no horizontal overflow, and the production build.
4. Roll back by restoring the prior standalone section; no data or route migration is involved.
