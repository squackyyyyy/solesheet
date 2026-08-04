## Context

The current page sources plan labels, prices, and concise feature lists from `app/lib/site-content.ts`, while the pricing section renders that registry in `app/page.tsx`. The same source also supplies the likely-plan options in the optional survey. The business brief defines the longer-term product tiers.

## Goals / Non-Goals

**Goals:**

- Keep a single source for waitlist plan copy so the pricing cards and survey cannot advertise different plan prices.
- Make the visual pricing hierarchy match the agreed product philosophy: usefulness is free; payment buys protection, scale, and operational time savings.
- Preserve honest validation-stage language and the Starter-only founding offer.

**Non-Goals:**

- Adding cloud backup, reminders, reports, browser entry, or billing functionality.
- Changing signup, survey persistence, or CTA progress behavior.
- Defining a future Pro or Team price.

## Decisions

### Keep core usability available in Free

Free-plan copy will explicitly include search and filtering. This avoids treating navigation of a small inventory as a paid privilege and aligns the tier boundary with costs and higher-value convenience rather than product friction.

### Give each paid plan a distinct upgrade job

Starter will use concise protection-oriented copy: 150 active pairs, cloud backup and recovery, installment reminders, and monthly summaries. Growth will use efficiency-oriented copy: 750 active pairs, browser quick-add, import, synchronization, and advanced reports. This is clearer than presenting both paid tiers largely as inventory-cap increases.

### Preserve planned-price disclosure

The existing pricing-preview note remains the shared disclosure. The new price is presented as a planned validation-stage direction, not as a purchasable subscription. The annual Growth figure is documented in longer-form product material but need not add another visual price to the three-card preview.

## Risks / Trade-offs

- [Starter features are not built yet] → Describe them as planned and retain the existing no-checkout flow.
- [The business brief's future Pro/Team price would overlap with Growth] → Remove the fixed Pro/Team price and defer its eventual price until its team-specific value is validated.
- [More feature copy can overcrowd mobile cards] → Keep the pricing cards to three concise benefit bullets; longer detail remains in documentation and future product surfaces.

## Migration Plan

1. Update the centralized content registry and pricing-section copy.
2. Align the business brief, roadmap, and OpenSpec main specification with the same tier boundaries.
3. Update the optional survey's Growth option to the planned price.
4. Run type checks, lint, tests, and a production build; review the pricing section at mobile and desktop widths.
