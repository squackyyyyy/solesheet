## Context

See `proposal.md` for motivation. The current site already serves seven responsive static mobile-product photographs from deterministic React/Playwright authoring routes, and `react-aria-components` is already installed for real interactions. The new browser proof must extend that pattern without turning the public waitlist into a second application or confusing Growth-plan validation copy with released functionality.

The generated `artifacts/concepts/growth-web-quick-add-concept.png` establishes visual direction only. It is not the source of truth for text, values, accessibility, or the final public asset; the implementation will replace it with a deterministic code-rendered capture.

## Goals / Non-Goals

**Goals:**

- Create one coherent desktop-browser application language that feels related to the mobile product while taking advantage of horizontal space.
- Ground every app-like table and control in reusable React Aria Components so the preview is a credible precursor to the future browser app.
- Produce separately composed desktop and mobile assets with deterministic data, stable dimensions, and optimized delivery.
- Add an accessible, truthfully framed landing-page section that makes the Growth time-saving advantage immediately understandable.

**Non-Goals:**

- Building an editable table, functional batch-save flow, account, cloud synchronization, spreadsheet import, or browser application.
- Making the public preview image clickable or exposing depicted controls to assistive technology.
- Replacing individual mobile inventory entry or moving it behind a paid plan.
- Treating the generated concept image or an image-generation model as the production asset pipeline.

## Decisions

### 1. Add a separate proof section after the mobile gallery

The browser mockup will appear immediately after the core product gallery and before the installment section. This preserves the narrative: prove the useful mobile core first, then show how Growth saves time at batch scale.

Alternative considered: add Web Quick-Add as an eighth gallery selector. Rejected because the existing gallery is explicitly a seven-screen mobile workflow and a wide browser workspace would weaken both its visual proportions and its clear mobile-app promise.

### 2. Use React Aria for every app-like interactive primitive in the capture source

The authoring composition will wrap React Aria `Table`, `TableHeader`, `Column`, `TableBody`, `Row`, and `Cell`, plus React Aria field, selection, and button primitives wherever those controls are depicted. Layout-only containers, headings, browser chrome, logos, and decorative icons can remain semantic HTML or presentational elements. Shared wrappers will live with the browser-app composition rather than duplicating ad hoc native controls.

The authoring route can display a fixed snapshot, but its component structure and states will model the intended accessible browser app, including table naming, column headers, labeled fields, disabled/read-only snapshot behavior where appropriate, visible focus styles, and minimum control targets. On the public page, only the captured image and its alternative description remain.

Alternative considered: draw the table entirely from styled `div` elements because the output is a screenshot. Rejected because it would not exercise the intended browser-app component foundation and would make the visual prototype a poor implementation reference.

### 3. Derive one canonical 12-row batch fixture

A shared `webQuickAddBatch` fixture will reuse the established `ShoeRecord` fields and existing sample records, with any additional rows declared centrally. The ready count and inventory cost will be computed from the fixture through the existing peso formatter. Tests will assert the calculation and representative rows rather than duplicating totals in multiple files.

The visible table may show a representative subset while still indicating 12 pairs ready, provided the composition clearly signals that more rows exist and the summary is calculated from the entire fixture.

Alternative considered: hard-code the concept image's visible numbers. Rejected because image-generation text can drift and display-only totals have already proven easy to contradict.

### 4. Reuse the deterministic capture architecture with a dedicated registry

Add a gated `/web-quick-add-studio/[asset]` authoring route, a typed asset registry, and an `assets:web-quick-add` Playwright capture command. The registry will define two captures:

- Desktop master: 3200×2400 PNG from a 1600×1200 composition.
- Mobile master: 1600×2400 PNG from an 800×1200 composition with independent art direction.

The capture command will verify exact dimensions, write stable master filenames under `artifacts/web-quick-add/`, generate optimized WebP derivatives under `public/web-quick-add/`, and record a manifest. The authoring route will require a task-specific environment flag, remain unlinked, return unavailable without the flag, and carry noindex metadata when enabled.

Alternative considered: ship the generated concept PNG directly. Rejected because the dense table needs exact text, deterministic fixtures, responsive variants, reproducible updates, and close alignment with the implemented component system.

### 5. Serve a single semantic picture with explicit planned-state copy

The public section will render a `<picture>` that selects the mobile derivative at the small-screen breakpoint and otherwise uses the desktop derivative. The image gets one concise equivalent description covering the batch table, row duplication, 12-pair summary, inventory cost, and intended mobile-inventory result. Decorative pixels and depicted controls remain inaccessible.

Section copy will use the exact label, heading, and positioning in the delta spec and include a restrained planned-product disclosure. The Growth plan card continues to say Web Quick-Add; no CTA inside the preview suggests that visitors can open or try it.

The FAQ will provide the longer explanation: Web Quick-Add is planned as manual row-based batch entry for Growth, saved pairs would appear in mobile inventory, and spreadsheet import remains a separate planned feature. This avoids overloading the proof-section copy while keeping availability and plan boundaries consistent.

Alternative considered: expose the React Aria capture composition directly on the landing page with disabled controls. Rejected because disabled controls would still make the page feel like a demo, add unnecessary runtime and accessibility complexity, and contradict the current static-preview contract.

### 6. Treat the generated concept as disposable design input

The concept image remains under `artifacts/concepts/` so implementation can compare hierarchy, palette, and composition. Once the deterministic captures pass visual review, the concept is not referenced by application code, asset registries, or public URLs. It may remain as design history unless the team elects to remove it during implementation.

## Risks / Trade-offs

- [A wide six-column table can become illegible in a mobile marketing asset] → Use an independently composed 2:3 mobile layout with a tighter representative row set, enlarged summary, and intentional browser crop rather than shrinking the desktop scene.
- [React Aria controls in a fixed capture could accidentally become public interactive UI] → Keep the authoring route gated and render only responsive image derivatives in the public section; cover both boundaries with browser tests.
- [The concept image's AI-rendered text or totals may differ from canonical fixtures] → Treat it only as composition direction and assert final capture values directly from `webQuickAddBatch`.
- [Adding another large product image can increase mobile payload and layout shift] → Generate optimized derivatives, declare intrinsic dimensions/aspect ratios, defer loading below the fold, and verify responsive request behavior.
- [Growth messaging could imply cloud sync or CSV import already works] → Keep manual batch entry primary, label the whole surface planned, and test copy consistency with pricing and availability disclosures.

## Migration Plan

1. Add canonical fixtures, React Aria browser-app primitives, the gated authoring composition, and capture registry without changing the public page.
2. Capture and visually approve both masters and optimized derivatives against the concept direction and canonical data.
3. Add the public section and shared Growth copy, then verify accessibility, responsive source selection, payload behavior, and no product-side effects.
4. If regressions appear, remove the additive section and registry references; existing mobile Flow assets and pricing behavior remain independently usable.
