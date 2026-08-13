## Why

The seven-screen Inside SoleSheet gallery already demonstrates installment setup and payment recording. Repeating the Payments phone preview in a large standalone installment section makes the page longer without adding new product proof, yet removing the section entirely would weaken a locally relevant differentiator: a pair can be sold while its installment balance remains open.

## What Changes

- Replace the full-width dark installment showcase with a compact, text-and-state callout immediately after the product gallery.
- Preserve the essential statement: **Sold doesn’t always mean settled.** Explain that inventory status and payment status remain distinct for seller-managed installment tracking.
- Keep the four concise state facts—cash collected, balance remaining, inventory state, and payment state—derived from the existing deterministic fixture.
- Remove the duplicated Payments device frame and its second static product preview; the gallery remains the only place that visually demonstrates the installment and payment workflows.
- Retain the clear boundary that SoleSheet supports seller-managed tracking only, not lending, interest, late fees, collections, or payment processing.
- Keep a stable `#installments` destination so the primary navigation and existing deep links remain valid.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `waitlist-landing-experience`: Replace the redundant standalone installment product preview with a compact post-gallery differentiator callout while preserving the installment-tracking value proposition and navigation destination.

## Impact

- Affects the landing page’s installment section, its imports, responsive layout, and browser/component tests.
- Removes the duplicate use of the Payments static screen outside Inside SoleSheet; no mockup assets, user data, API, storage, payment-processing behavior, or pricing behavior change.
