## Context

See `proposal.md` for the motivation. The public gallery is driven by a seven-item asset registry. Each destination renders through the same capture composition, produces separate desktop and mobile masters, and is displayed as one static responsive photograph. Quick Sale is selected and eagerly loaded by default, but its current phone composition ends at **Save sale**. The existing fixtures already provide the 12-pair and ₱8,950 monthly-profit starting state, the selected shoe's ₱4,800 cost, and the ₱6,500 sale price.

The gallery must remain honest about being a static preview. Its seven selector buttons are the only controls, and the visual outcome must not imply that clicking controls inside the photograph will mutate data.

## Goals / Non-Goals

**Goals:**

- Derive one internally consistent paid-sale outcome from the existing canonical fixtures.
- Make the action and its three consequences legible in both art-directed aspect ratios.
- Keep the outcome understandable when the photograph cannot be perceived.
- Limit regenerated product assets to the Quick Sale desktop/mobile pair.

**Non-Goals:**

- Simulating form submission, success timing, persistence, or gallery-internal app interaction.
- Changing installment, payment, dashboard, pricing, social, or link-preview artwork.
- Presenting the paid-in-full example as an installment or cash-collection workflow.
- Adding motion to the static product proof.

## Decisions

### 1. Model the result as a shared deterministic fixture

Add a `quickSaleOutcome` fixture beside the existing dashboard and sale fixtures. Its result values will be derived rather than independently typed: profit is sale price minus cost, ending active pairs are starting active pairs minus one, and ending monthly profit is starting monthly profit plus sale profit. The capture composition and focused tests will consume this fixture.

This keeps the arithmetic in one code-owned source and prevents the artwork from drifting as fixture data changes. The asset registry's human-readable equivalent description will repeat the resolved values because JSON cannot import the TypeScript fixture; a focused registry test will protect that boundary.

Alternative considered: hard-code all values directly in the composition. This is simpler initially but makes contradictory stock and profit numbers easier to introduce.

### 2. Use an annotated action-and-result photograph, not a second interactive state

The Quick Sale board will retain enough of the compact sale-entry phone screen to show the selected pair, known cost, ₱6,500 selling price, today's date, Paid in full selection, and save action. A board-level result treatment will then make the before-and-after values visually dominant: 12 → 11 active pairs, +₱1,700 sale profit, and ₱8,950 → ₱10,650 monthly profit. The treatment will read as an explanatory product-preview annotation, not as a clickable success panel.

Desktop will use the existing side-by-side editorial space. Mobile will use a condensed stacked treatment and a deliberately repositioned phone crop so the outcome and essential sale context remain visible without shrinking desktop artwork or overflowing the page. The Quick Sale headline/body will lead with the outcome chain, while the remaining six destinations retain their current compositions.

Alternative considered: replace the form entirely with a success screen. That makes the result prominent but weakens the causal proof because visitors can no longer see what was recorded. Another alternative was an animated form-to-result sequence, but animation conflicts with the gallery's static-preview contract and complicates reduced-motion behavior.

### 3. Put the core claim in real page text as well as the image

The gallery introduction will lead with a concise semantic sentence containing **sale recorded → stock updated → profit calculated**, followed by the existing selector and non-interactive-image instruction. The selected Quick Sale image will retain one comprehensive equivalent description through its registry entry. Text depicted within the generated artwork remains hidden as part of one image rather than becoming duplicate accessible controls.

This gives the claim visible, selectable page text and keeps the image's alternative text focused on the exact example. It also avoids adding conditional overlays or captions that would shift the gallery when another destination is selected.

Alternative considered: render a Quick-Sale-only caption below the photograph. That duplicates the proof and causes the surrounding layout to change as visitors switch destinations.

### 4. Add a scoped capture option while preserving the full registry

Extend the existing capture command with an optional destination filter so this change can regenerate `quick-sale-desktop` and `quick-sale-mobile` without rewriting unrelated masters or public derivatives. An unfiltered run will continue to capture all seven destinations and write the complete manifest. A filtered run will validate the requested registry destination and preserve untouched manifest entries while replacing the selected destination's entries.

This maintains the established capture pipeline and makes narrow asset changes reproducible. No new package or image tool is introduced.

Alternative considered: run the all-destination capture and commit only the Quick Sale files. That relies on working-tree cleanup and can hide unintended nondeterminism in unrelated generated assets.

## Risks / Trade-offs

- [The phone form and three outcome metrics may feel crowded at 360px] → Use the dedicated mobile composition, prioritize the result and essential sale facts, and verify the final 2:3 derivative at its rendered landing-page size.
- [The marketing annotation could be mistaken for live product UI] → Keep it visually outside the phone, retain the Product preview badge and non-interactive disclosure, and expose no controls in the photograph.
- [The JSON equivalent description can drift from the TypeScript fixture] → Add focused assertions for the selected pair and all before/after values.
- [A partial capture could produce an incomplete manifest] → Merge filtered results into the existing manifest and keep the existing full-count validation for unfiltered capture runs.
- [The longer semantic gallery introduction may reduce scanability] → Keep the outcome chain first and preserve the existing instruction in compact copy.

## Migration Plan

1. Add the derived outcome fixture and update the Quick Sale composition and semantic gallery introduction.
2. Update the Quick Sale registry title/description and focused tests.
3. Add the scoped capture option, then regenerate only the two Quick Sale master/public assets.
4. Verify dimensions, responsive source selection, non-interactivity, accessible description, and representative desktop/mobile rendering.
5. Roll back by restoring the prior fixture-independent Quick Sale composition, gallery copy, registry description, and the previous Quick Sale asset pair; no data migration is required.
