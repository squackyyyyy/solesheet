# growth-web-quick-add-showcase Specification

## Purpose

Define a truthful, accessible static preview that demonstrates how Growth sellers could encode a batch of shoe inventory from a desktop browser without presenting an operable product demo.

## Requirements

### Requirement: Browser inventory preview communicates shared row management
The showcase SHALL depict a desktop browser workspace that is visually distinct from the mobile app and identifies **Web Inventory** as a planned Growth feature. The workspace SHALL represent the seller’s actual SoleSheet inventory in a fixed-column table with brand/model, size, colorway, cost, target price, and status columns; users SHALL NOT be shown creating or rearranging columns. The table SHALL include existing inventory rows, an **Add row** treatment whose meaning is adding a new pair, and at least two fully populated newly added rows distinguished by restrained emerald outlines or glows and explicit **New** labels. It SHALL NOT show a separate Add pair action, Save batch action, untargeted Duplicate/Delete actions, or temporary-batch language. The workspace SHALL show **12 pairs in inventory**, **2 newly added on web**, the fixture-derived inventory cost, and a clear integrated statement that web changes are planned to appear in the same mobile inventory.

#### Scenario: Visitor views the Web Inventory preview
- **WHEN** a visitor reaches the Growth Web Inventory section
- **THEN** the static browser workspace makes fixed-column row editing, Add row as pair creation, multiple newly added pairs, inventory totals, and the planned shared mobile-inventory outcome understandable without requiring interaction

#### Scenario: Visitor evaluates the paid-plan benefit
- **WHEN** a visitor reads the preview heading, supporting copy, and plan disclosure
- **THEN** Web Inventory is identified as a planned Growth time-saving feature for managing the same stock from a browser while adding one pair from the mobile app remains part of the core product promise

### Requirement: Preview data is realistic and internally consistent
The browser workspace SHALL reuse SoleSheet inventory field definitions and deterministic Filipino reseller fixtures, format money in Philippine pesos, and calculate its 12-pair inventory count and ₱53,200 inventory-cost summary from the canonical inventory fixture rather than maintaining contradictory display-only totals. Exactly two visible fixture rows SHALL carry the **New** presentation and the **2 newly added on web** summary. Spreadsheet import MAY appear only as a separately labeled planned feature and SHALL NOT replace manual row entry as the primary story.

#### Scenario: Contributor verifies the inventory fixture
- **WHEN** the preview composition is rendered from its canonical inventory data
- **THEN** every visible row value, new-row count, total pair count, and inventory-cost total agrees with the shared fixture and existing mobile product examples

### Requirement: Public preview remains a static accessible image
The public landing page SHALL expose the Web Inventory workspace as one responsive image equivalent with a concise accessible description. Depicted table cells, fields, menus, row actions, and Add row control SHALL NOT enter the public accessibility tree as operable elements, accept input, change state, or imply that browser inventory editing, mobile synchronization, validation, deletion, or import is currently available.

#### Scenario: Keyboard or screen-reader visitor reaches the section
- **WHEN** a visitor navigates through the Web Inventory section
- **THEN** no depicted product control receives focus and one equivalent description communicates the fixed-column inventory table, two highlighted new rows, inventory summaries, and planned shared mobile-inventory outcome

#### Scenario: Visitor interacts with the public page
- **WHEN** a visitor clicks or taps within the preview image
- **THEN** no product state changes, product-data request is sent, or browser storage entry is created

### Requirement: Browser workspace has responsive deterministic art direction
The authoring workflow SHALL produce a deterministic 3200-by-2400 desktop PNG master and a separately composed 1600-by-2400 mobile PNG master, plus optimized public derivatives. Desktop art direction SHALL keep the browser table and editorial framing legible together; mobile art direction SHALL enlarge and intentionally crop the browser workspace without clipping the two highlighted new rows, inventory summaries, Growth disclosure, or essential table meaning.

#### Scenario: Desktop visitor loads the section
- **WHEN** the section is viewed at 1440px wide
- **THEN** the 4:3 desktop source is eligible for display with the browser table, new-row treatment, summaries, and editorial framing legible and without excessive empty space

#### Scenario: Mobile visitor loads the section
- **WHEN** the section is viewed at 360px wide
- **THEN** the separate 2:3 mobile source is eligible for display with no horizontal page overflow and no requirement to shrink the desktop image into illegibility

#### Scenario: Contributor runs the capture workflow
- **WHEN** the supported local capture command completes
- **THEN** the registered masters and optimized derivatives are recreated at their exact dimensions with stable filenames and verified metadata

### Requirement: Authoring surface models the intended browser application semantics
The local authoring representation SHALL use genuine table, row, column, cell, field, selection, and button semantics so the captured design is grounded in the same accessible component patterns intended for a future browser application. The authoring surface SHALL remain local-only, non-indexable, and absent from public navigation.

#### Scenario: Contributor audits the authoring composition
- **WHEN** the gated browser-workspace route is enabled for local capture
- **THEN** the composition exposes a named table with structured headers and rows, labeled app controls, and visible keyboard-focus treatments suitable for the future operable application

#### Scenario: Public visitor requests the authoring route
- **WHEN** the authoring flag is not enabled
- **THEN** the route is unavailable and does not expose a second public product experience
