## 1. Canonical Dashboard State

- [x] 1.1 Extend the shared dashboard mock data with available and reserved counts derived from the canonical inventory records, and add focused tests that assert 9 available plus 3 reserved equals 12 active pairs.
- [x] 1.2 Update the dashboard and Quick Actions equivalent descriptions to use the same canonical totals, Stock mix values, labels, and basic-analytics scope.

## 2. Consistent Home Dashboard Presentation

- [x] 2.1 Add a compact, text-labeled 75/25 Stock mix card to the overview Home dashboard between the KPI row and unpaid-installment summary, using restrained emerald and amber segments.
- [x] 2.2 Replace flow-specific dashboard literals with shared dashboard data and rebuild the underlying Quick Actions Home screen in the canonical module order: active inventory, KPI row, Stock mix, unpaid installments, and recent activity.
- [x] 2.3 Tune the Quick Actions dashboard and overlay layering so the Stock mix remains recognizable while the complete menu, Quick Log label, highlighted `+`, bottom navigation, and external hold callout remain dominant and unclipped in both capture layouts.

## 3. Automated Coverage

- [x] 3.1 Add or update component and metadata tests to verify canonical dashboard values, Stock mix text, the decorative noninteractive visualization, and the Quick Actions equivalent description.
- [x] 3.2 Update browser assertions for the revised Quick Actions description while preserving responsive source selection, static-image semantics, menu action order, and absence of operable controls inside the photograph.
- [x] 3.3 Run unit tests, type checking, linting, and the production build; resolve any regression caused by the dashboard changes.

## 4. Asset Regeneration and Visual Verification

- [x] 4.1 Run the deterministic flow capture pipeline to regenerate PNG masters and optimized WebP derivatives, then confirm unrelated flow destinations did not acquire unintended visual changes.
- [x] 4.2 Inspect the Quick Actions desktop and mobile masters for Stock mix legibility, factual consistency, menu hierarchy, complete anchoring, bottom-navigation visibility, and absence of clipping or overflow.
- [x] 4.3 Run the browser suite at desktop and mobile breakpoints and confirm the final public gallery serves the revised responsive assets with their matching accessible description.
