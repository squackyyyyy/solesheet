## ADDED Requirements

### Requirement: Pricing comparison makes plan coverage clear
The pricing preview SHALL retain its Free, Starter, and Growth plan cards and add a **Compare every feature** matrix after those cards and before the founding-seller offer. The matrix SHALL make the tier model explicit: Starter includes the Free core, and Growth includes the Starter and Free benefits in addition to its own scale features. It SHALL compare active-pair limits and coverage for core inventory, search and filters, profit tracking, installment tracking, sold history, local export, automatic cloud backup and restore, installment reminders and monthly summaries, Web Inventory, spreadsheet import, cross-device sync, and advanced reports. Inclusion and exclusion SHALL be understandable without relying on color alone. Web Inventory, spreadsheet import, cross-device sync, and advanced reports SHALL be shown as included intended Growth benefits. The pricing section SHALL retain one clear validation-stage disclosure that the product, pricing, and features are not available yet; the matrix SHALL NOT use **Planned** labels to single out only those Growth scale benefits.

#### Scenario: Desktop visitor compares plans
- **WHEN** a visitor reaches pricing at a desktop viewport
- **THEN** the visitor can see the visible feature-by-plan matrix with Feature, Free, Starter, and Growth columns, plan limits, clear inclusion states, the cumulative-tier explanation, and the pricing section's validation-stage disclosure before the founding-seller offer

#### Scenario: Mobile visitor compares plans
- **WHEN** a visitor reaches pricing at a 360px-wide viewport
- **THEN** the plan cards remain readable and the feature matrix is available through a closed **Compare every feature** disclosure whose opened table can be horizontally compared without page-level overflow or loss of the Feature column

### Requirement: Pricing comparison is semantic and non-interactive
The feature matrix SHALL be a read-only semantic data table with a caption or equivalent accessible name, column headers for Feature, Free, Starter, and Growth, and row headers for each compared feature. Included, excluded, and limited states SHALL each expose an equivalent text meaning to assistive technology. The comparison SHALL not expose sorting, row selection, column controls, checkout controls, or other product interactions.

#### Scenario: Screen-reader visitor reads a feature row
- **WHEN** a screen-reader visitor navigates the opened pricing comparison
- **THEN** the visitor can associate each plan’s included, excluded, or limited state with the corresponding feature and plan header

#### Scenario: Visitor interacts with the comparison
- **WHEN** a visitor scans or scrolls the feature matrix
- **THEN** no pricing state changes, checkout starts, product-data request is sent, or browser storage entry is created
