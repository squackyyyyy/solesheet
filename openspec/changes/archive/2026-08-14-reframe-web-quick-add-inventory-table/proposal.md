## Why

The current Web Quick-Add preview looks like a temporary batch form even though the intended Growth feature is an Excel-like view of the seller’s actual SoleSheet inventory. Ambiguous glyphs, untargeted Duplicate/Delete actions, “Save batch,” and vague cloud wording obscure the simpler promise: add or edit fixed-column inventory rows on the web and see the same stock on mobile.

## What Changes

- Reframe the planned Growth feature and its public narrative from **Web Quick-Add batch entry** to a **Web Inventory Table** that represents the same inventory used by the mobile app.
- Keep SoleSheet’s columns fixed—brand/model, size, colorway, cost, target price, and status—while depicting Excel-like row editing with no user-created columns.
- Treat **Add row** as the only creation action: adding a row means adding a new pair, so the mockup will not show a separate Add pair or Save batch button.
- Show multiple newly added, fully populated rows with restrained emerald outlines/glows and explicit **New** labels, making the browser’s multi-pair advantage understandable at a glance.
- Replace “12 pairs ready” and batch language with an inventory-state summary such as **12 pairs in inventory** and **2 newly added on web**, while retaining the fixture-derived ₱53,200 inventory cost.
- Remove the floating “Available in mobile inventory / Planned cloud connection” card, unexplained box/grid glyphs, and standalone Duplicate/Delete actions. Communicate the planned cross-device outcome with clear text integrated into the workspace rather than decorative symbols.
- Update the dedicated landing section, FAQ, pricing terminology, accessible image description, product brief, and improvement roadmap so they describe the same planned Growth Web Inventory capability.
- Keep missing-required-field validation, row deletion/archive behavior, conflict resolution, and real synchronization outside this static-preview change.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `growth-web-quick-add-showcase`: Replace the batch-entry mockup contract with a fixed-column synced inventory-table preview, including multiple clearly highlighted new rows and unambiguous inventory summaries.
- `waitlist-landing-experience`: Update the Growth browser-feature narrative, pricing references, and FAQ contract from Web Quick-Add batches to planned Web Inventory row management shared with mobile.

## Impact

- Affects the Web Inventory composition, React Aria authoring primitives where needed, shared fixtures, asset registry, section copy, FAQ, plan copy, and related tests.
- Requires regenerated desktop and mobile PNG masters and optimized WebP derivatives while preserving the existing responsive asset route and delivery behavior unless implementation shows a safe reason to rename internal identifiers.
- Updates `shoe-inventory-app-business-brief.md` and `PRODUCT_IMPROVEMENT_ROADMAP.md` to remove the superseded batch-entry model.
- Introduces no live inventory mutation, data persistence, synchronization, validation, API, browser storage, or public mockup interaction.
