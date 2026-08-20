# Why

The default Quick Sale preview currently proves that recording a sale is short, but it stops before showing the payoff. Visitors still have to infer that one saved paid sale updates stock and calculates profit. Leading with one deterministic before-and-after outcome will make SoleSheet's core value immediately understandable before visitors explore the broader workflow.

# What Changes

- Reframe the default Quick Sale responsive product photograph around a paid-in-full result: **sale recorded → stock updated → profit calculated**.
- Use one consistent example throughout the proof: Nike Dunk Low · Cacao Wow · US 8.5, sold for ₱6,500 with a ₱4,800 cost.
- Show the resulting changes clearly: active pairs move from 12 to 11, sale profit is +₱1,700, and monthly profit moves from ₱8,950 to ₱10,650.
- Preserve enough sale-entry context to make the cause-and-effect relationship clear without turning the landing-page preview into an interactive product form.
- Provide visible and accessible supporting copy that communicates the same outcome as the image.
- Regenerate only the Quick Sale desktop and mobile showcase assets while preserving the remaining gallery items and responsive behavior.
- Keep installment and cash-collection proof separate from this paid-in-full example.
- Keep the experience frontend-only: the proof is deterministic presentation content and does not save or mutate data.

# Capabilities

## New Capabilities

None.

## Modified Capabilities

- `product-mockup-showcase`: Make the default responsive Quick Sale photograph demonstrate the complete deterministic paid-sale outcome and expose an equivalent accessible description.
- `waitlist-landing-experience`: Lead the product narrative with the concrete Quick Sale outcome before inviting visitors to explore the broader operating flow.

# Impact

- Updates the Quick Sale composition and showcase presentation in `app/components/flow-mockups/flow-mockup-composition.tsx` and `app/components/mockups/mockup-showcase.tsx`.
- Updates supporting content and generated-asset metadata in `app/lib/mock-data.ts` and `app/lib/flow-mockup-assets.json` as needed.
- Regenerates the Quick Sale desktop and mobile PNG/WebP assets without changing the other workflow assets.
- Updates focused component, accessibility, and asset-generation verification for the revised default proof.
- Does not add backend submission, persistence, or real product interaction.
