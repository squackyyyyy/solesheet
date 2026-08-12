## Purpose

Define a truthful, accessible static preview that demonstrates how Growth sellers could encode a batch of shoe inventory from a desktop browser without presenting an operable product demo.

## ADDED Requirements

### Requirement: Browser Quick-Add preview communicates batch entry
The showcase SHALL depict a desktop browser workspace that is visually distinct from the mobile app and identifies Web Quick-Add as a planned Growth feature. The workspace SHALL include a populated batch-entry table with brand/model, size, colorway, cost, target price, and starting status columns; visible Add row, Duplicate, Delete, and Save batch treatments; a count of 12 pairs ready; a computed inventory-cost summary; and a cue that saved pairs would become available in mobile inventory.

#### Scenario: Visitor views the Web Quick-Add preview
- **WHEN** a visitor reaches the Growth Web Quick-Add section
- **THEN** the static browser workspace makes batch entry, row duplication, batch totals, and the planned mobile-inventory connection understandable without requiring interaction

#### Scenario: Visitor evaluates the paid-plan benefit
- **WHEN** a visitor reads the preview heading, supporting copy, and plan disclosure
- **THEN** Web Quick-Add is identified as a planned Growth time-saving feature while adding one pair from the mobile app remains part of the core product promise

### Requirement: Preview data is realistic and internally consistent
The browser workspace SHALL reuse SoleSheet inventory field definitions and deterministic Filipino reseller fixtures, format money in Philippine pesos, and calculate its ready count and inventory cost from the canonical batch fixture rather than maintaining contradictory display-only totals. Spreadsheet import MAY appear only as a separately labeled planned feature and SHALL NOT replace manual batch entry as the primary story.

#### Scenario: Contributor verifies the batch fixture
- **WHEN** the preview composition is rendered from its canonical batch data
- **THEN** every visible row value, pair count, and inventory-cost total agrees with the shared fixture and the existing mobile product examples

### Requirement: Public preview remains a static accessible image
The public landing page SHALL expose the Web Quick-Add workspace as one responsive image equivalent with a concise accessible description. Depicted table cells, fields, menus, row actions, and save controls SHALL NOT enter the public accessibility tree as operable elements, accept input, change state, or imply that browser entry, cloud synchronization, or import is currently available.

#### Scenario: Keyboard or screen-reader visitor reaches the section
- **WHEN** a visitor navigates through the Web Quick-Add section
- **THEN** no depicted product control receives focus and one equivalent description communicates the batch table, summary, and mobile-inventory outcome

#### Scenario: Visitor interacts with the public page
- **WHEN** a visitor clicks or taps within the preview image
- **THEN** no product state changes, product-data request is sent, or browser storage entry is created

### Requirement: Browser workspace has responsive deterministic art direction
The authoring workflow SHALL produce a deterministic 3200-by-2400 desktop PNG master and a separately composed 1600-by-2400 mobile PNG master, plus optimized public derivatives. Desktop art direction SHALL keep the browser table and editorial framing legible together; mobile art direction SHALL enlarge and intentionally crop the browser workspace without clipping the batch summary, Growth disclosure, or essential table meaning.

#### Scenario: Desktop visitor loads the section
- **WHEN** the section is viewed at 1440px wide
- **THEN** the 4:3 desktop source is eligible for display with the browser table, summary, and editorial framing legible and without excessive empty space

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

