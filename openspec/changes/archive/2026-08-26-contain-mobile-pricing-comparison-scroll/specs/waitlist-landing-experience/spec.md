## MODIFIED Requirements

### Requirement: Pricing comparison makes plan coverage clear
The pricing preview SHALL retain its Free, Starter, and Growth plan cards and add a **Compare every feature** matrix after those cards and before the founding-seller offer. The matrix SHALL make the tier model explicit: Starter includes the Free core, and Growth includes the Starter and Free benefits in addition to its own scale features. It SHALL compare active-pair limits and coverage for core inventory, search and filters, profit tracking, installment tracking, sold history, local export, automatic cloud backup and restore, installment reminders and monthly summaries, Web Inventory, spreadsheet import, cross-device sync, and advanced reports. Inclusion and exclusion SHALL be understandable without relying on color alone. Web Inventory, spreadsheet import, cross-device sync, and advanced reports SHALL be shown as included intended Growth benefits. The pricing section SHALL retain one clear validation-stage disclosure that the product, pricing, and features are not available yet; the matrix SHALL NOT use **Planned** labels to single out only those Growth scale benefits. On mobile, the disclosure SHALL present **Compare every feature** only once, SHALL communicate closed and open states consistently with the FAQ disclosures, and SHALL contain horizontal table scrolling inside its designated region without increasing the document width or allowing horizontal gestures outside that region to pan the surrounding page.

#### Scenario: Desktop visitor compares plans
- **WHEN** a visitor reaches pricing at a desktop viewport
- **THEN** the visitor can see the visible feature-by-plan matrix with Feature, Free, Starter, and Growth columns, plan limits, clear inclusion states, the cumulative-tier explanation, and the pricing section's validation-stage disclosure before the founding-seller offer

#### Scenario: Mobile visitor compares plans
- **WHEN** a visitor opens the pricing comparison at a 360px-wide viewport
- **THEN** the plan cards remain readable, the feature matrix can be horizontally compared inside its designated scroll region without duplicate heading copy or loss of the Feature column, and the document remains viewport-wide before and after the table is scrolled

#### Scenario: Mobile visitor swipes outside the comparison table
- **WHEN** the mobile comparison is open and the visitor makes a horizontal gesture outside the designated table scroll region
- **THEN** the surrounding landing page does not pan horizontally
