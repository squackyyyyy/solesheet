## Why

The Home screen shown in the Quick Actions product photograph leaves a large visually inactive area and does not fully match the richer dashboard used elsewhere in the product mockups. SoleSheet promises a useful basic dashboard for free users, so the previews should demonstrate that value consistently while keeping Quick Log as the dominant interaction.

## What Changes

- Add a compact **Stock mix** visualization to the Home dashboard showing the canonical 12 active pairs as **9 available** and **3 reserved** in a restrained segmented bar.
- Keep the visualization within the free tier's basic-dashboard scope: it summarizes existing inventory statuses and does not introduce time-series reports, drill-down analytics, best-seller rankings, or other paid reporting.
- Make the general dashboard mockup and the Home dashboard beneath the Quick Actions menu use one canonical set of labels, values, module ordering, and representative inventory state.
- Preserve the Quick Actions composition's primary message: the anchored menu, Quick Log label, `+` trigger, action order, and “Hold + for more” explanation remain visually dominant and fully visible at desktop and mobile sizes.
- Update equivalent descriptions, tests, and generated desktop/mobile assets so the visual and nonvisual representations describe the same dashboard state.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `product-mockup-showcase`: Require a basic Stock mix visualization on Home and consistent canonical dashboard content across the overview and Quick Actions product previews.

## Impact

- Affects shared mock data and the dashboard compositions in `app/components/mockups/app-screens.tsx` and `app/components/flow-mockups/flow-mockup-composition.tsx`.
- Affects the Quick Actions equivalent description and relevant mockup/product-proof tests.
- Requires recapturing the Quick Actions desktop and mobile PNG masters and their optimized WebP derivatives; other flow destinations should remain unchanged.
- Adds no runtime backend, analytics service, paid-plan behavior, API, or dependency.
