## Context

See `proposal.md` for motivation. SoleSheet currently has two independently rendered Home dashboard representations: the compact overview mockup and the larger phone used to generate planned-flow photographs. Both import shared business examples, but the planned-flow dashboard hardcodes a reduced subset of values and omits modules present in the overview. The generated Quick Actions photograph must also preserve a narrow visual window between the KPI row and its open, bottom-anchored action menu.

The Stock mix is presentation-only product proof. It must communicate free basic-dashboard value using locally available inventory statuses without suggesting a new analytics service or a paid reporting feature.

## Goals / Non-Goals

**Goals:**

- Establish one canonical dashboard state and module order for all Home mockup renderers.
- Add a legible 9-available/3-reserved segmented Stock mix that fits above the open Quick Actions menu at both capture layouts.
- Keep data, visible UI, equivalent descriptions, tests, and generated assets synchronized.
- Retain the current deterministic responsive asset pipeline and established SoleSheet visual language.

**Non-Goals:**

- Building an interactive production dashboard, charting subsystem, or analytics backend.
- Adding time ranges, trends, rankings, drill-downs, report navigation, or paid-plan upsells to the Home visualization.
- Changing the seven planned-flow destinations, their selector behavior, or non-Quick-Actions photographs.
- Redesigning Quick Log behavior, labels, action order, or anchoring.

## Decisions

### 1. Shared data contract, renderer-specific presentation

Extend the canonical dashboard object in shared mock data with status counts derived from the inventory records, and make both dashboard renderers consume that object for active inventory, inventory cost, monthly profit, unpaid balance, and Stock mix.

The two renderers will keep separate presentational components because they target substantially different phone sizes and capture scales. Sharing the data contract and module order prevents factual drift without forcing one set of typography and spacing tokens into incompatible compositions.

Alternative considered: extract one shared dashboard component and scale it in both contexts. This would reduce markup duplication but couple the small overview card and high-resolution photograph, making responsive tuning harder and increasing the risk that a future visual adjustment breaks both contexts.

### 2. Status-derived segmented bar

Render Stock mix as one compact card with the text labels **9 available** and **3 reserved** plus a horizontal 75/25 segmented bar. Counts and segment proportions come from the shared status counts; the text remains authoritative, so the visualization does not depend on color alone.

Use emerald for available and restrained amber for reserved, with a quiet white or soft-stone card, thin border, and lower emphasis than the primary KPI and Quick Log menu. The bar is decorative within the static preview and must not be represented as an interactive control.

Alternatives considered:

- A donut chart consumes more space, depends more heavily on color, and would attract too much attention.
- A revenue or profit sparkline implies time-series reporting and blurs the free/basic versus paid/advanced analytics boundary.
- A sell-through metric requires a time window and derived business definition not established in the brief.

### 3. Canonical Home module order with intentional menu occlusion

Use this underlying order in both Home representations:

1. Header
2. Active inventory
3. Inventory cost and monthly profit
4. Stock mix
5. Unpaid installments
6. Recently updated inventory
7. Bottom navigation and Quick Log

In the Quick Actions state, the anchored menu remains layered above the lower dashboard modules. Stock mix must remain recognizable above or immediately behind the upper edge of that menu; unpaid installments and recent activity may be partially or fully occluded. This models a real overlay while preserving a consistent underlying Home screen.

Alternative considered: remove lower modules from the Quick Actions renderer. That preserves empty space but recreates the inconsistency this change is intended to fix.

### 4. Preserve Quick Actions as the visual hero

The analytics card will use compact height and subdued styling. The action menu retains its opaque surface, stronger shadow, higher stacking order, complete three-item content, Quick Log label, highlighted `+`, and external “Hold + for more” callout. Mobile and desktop captures will be visually reviewed for hierarchy and clipping after regeneration.

### 5. Descriptions and verification follow the canonical state

Update the dashboard mockup metadata and Quick Actions registry description to mention the 9/3 Stock mix and canonical totals. Add focused assertions around the derived counts and equivalent description, then run existing unit, type, lint, build, and browser coverage. Regenerate the flow assets through the existing capture command and visually inspect both Quick Actions masters; deterministic non-Quick-Actions outputs should remain unchanged.

## Risks / Trade-offs

- **[The Stock mix is cramped or hidden in the tilted mobile crop]** → Keep the card shallow, position it immediately after the two KPI tiles, and visually verify the 1600×2400 mobile master at full capture size.
- **[The chart competes with Quick Log]** → Use lower-contrast surfaces and small labels while preserving the menu's stronger shadow, opaque background, and stacking order.
- **[Canonical values drift again]** → Derive status counts from shared inventory records, remove flow-specific dashboard literals, and assert the shared state in tests.
- **[Monthly profit on a free preview is mistaken for an advanced report]** → Present one current summary value only; do not add a time-series, comparison period, filter, drill-down, or report affordance.
- **[Regenerating all flow assets creates unrelated binary churn]** → Check the asset diff after deterministic capture and retain changes only where the source composition or description requires them.

## Migration Plan

1. Add the shared status counts and align dashboard metadata.
2. Update both Home renderers and focused tests.
3. Run automated verification before asset capture.
4. Regenerate the deterministic flow assets, inspect desktop and mobile Quick Actions masters, and verify responsive gallery behavior.
5. If visual hierarchy regresses, revert the renderer and generated Quick Actions assets together; no persisted user data or runtime migration is involved.
