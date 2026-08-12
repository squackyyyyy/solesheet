## 1. Canonical Data and React Aria Browser UI

- [x] 1.1 Add a canonical 12-row Web Quick-Add batch fixture derived from the existing shoe-record model, compute its ready count and inventory cost, and cover representative rows and totals with unit tests.
- [x] 1.2 Create reusable browser-app primitives for React Aria Table, fields, selections, and buttons with the SoleSheet app visual language, labeled semantics, focus treatment, and practical control sizing.
- [x] 1.3 Build independently composed desktop and mobile Web Quick-Add authoring surfaces showing the six-column batch table, Add row, Duplicate, Delete, Save batch, computed summary, Growth label, planned-product disclosure, and mobile-inventory cue.
- [x] 1.4 Add component tests proving the authoring surface uses a named structured table, React Aria-backed labeled controls, canonical fixture values, and no hard-coded contradictory totals.

## 2. Deterministic Asset Pipeline

- [x] 2.1 Add a typed Web Quick-Add asset registry for the 3200×2400 desktop master, 1600×2400 mobile master, stable filenames, descriptions, and optimized public paths.
- [x] 2.2 Add the unlinked `/web-quick-add-studio/[asset]` authoring route with task-specific environment gating, unavailable behavior when disabled, noindex metadata, and deterministic capture-ready signaling.
- [x] 2.3 Add an `assets:web-quick-add` Playwright capture command that verifies source and output dimensions, creates PNG masters and optimized WebP derivatives, and writes a reproducible manifest.
- [x] 2.4 Run the capture workflow, inspect both compositions against the concept direction and canonical data, and keep the concept image unreferenced by application code or public asset registries.

## 3. Public Growth Proof Section

- [x] 3.1 Centralize the exact Growth Web Quick-Add label, heading, positioning, planned-state disclosure, and equivalent image description alongside the existing Growth plan copy.
- [x] 3.2 Add the dedicated section after the mobile product gallery using one responsive `<picture>` with intrinsic sizing, the mobile-specific source, optimized loading, and no operable product controls.
- [x] 3.3 Confirm pricing and feature surfaces consistently identify Web Quick-Add as planned for Growth while preserving individual mobile Add Stock as part of the core product story.
- [x] 3.4 Add component and browser assertions for section order, exact copy, accessible image equivalence, responsive source selection, absence of depicted controls in the public accessibility tree, and no horizontal overflow at 360px.
- [x] 3.5 Add a Web Quick-Add FAQ entry covering the planned manual batch workflow, Growth availability, mobile-inventory outcome, and separately planned spreadsheet import, with content and browser assertions.

## 4. Verification

- [x] 4.1 Run unit/component tests, TypeScript checking, linting, and the production build; resolve regressions without changing existing mobile Flow assets or Home analytics behavior.
- [x] 4.2 Run desktop and mobile browser tests covering authoring-route gating, React Aria table semantics when enabled, public accessibility, keyboard flow, touch sizing for any real page controls, and absence of product requests or durable storage writes.
- [x] 4.3 Verify exact master dimensions, optimized-derivative metadata, stable filenames, and deterministic manifest output, then visually inspect the public section at 1440px and 360px for legibility, hierarchy, intentional cropping, and payload-appropriate responsive delivery.
