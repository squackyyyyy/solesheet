## Context

The current composition uses a React Aria-authored table but presents it as a temporary batch: four rows, Add row, global Duplicate/Delete actions, Save 12 pairs, “12 pairs ready,” and a detached “Planned cloud connection” card built from ambiguous text glyphs. The intended product model is instead one structured inventory shared across browser and mobile, while the public surface remains a static responsive image.

## Goals / Non-Goals

**Goals:**

- Make the browser workspace read as the seller’s real inventory rather than an unsaved import batch.
- Demonstrate that adding multiple rows is the web efficiency advantage without introducing a second Add pair action.
- Make newly added pairs unmistakable through both color and text.
- Align mockup copy, image equivalents, FAQ, pricing, roadmap, and business brief with the same product model.
- Preserve React Aria table semantics in the local authoring surface and one-image semantics on the public page.

**Non-Goals:**

- Implementing persistence, mobile synchronization, autosave, required-field validation, error states, conflict resolution, or offline behavior.
- Defining whether saved inventory rows are deleted, archived, or moved through a status lifecycle.
- Implementing user-defined columns, formulas, spreadsheet import, bulk selection, or a complete production inventory grid.
- Renaming internal routes and asset filenames solely to match the new public terminology.

## Decisions

### Present one shared inventory, not a batch

Change the visible browser navigation selection and workspace heading from Quick-Add to **Inventory** and the marketing label to **Growth · Web Inventory**. Retain the six fixed inventory columns and populated cell treatments so the experience feels Excel-like without suggesting arbitrary spreadsheet structure. Existing rows use neutral styling; the table has no separate batch boundary or save step.

Alternative considered: keep the Web Quick-Add name and only remove the footer actions. That would leave the feature’s identity centered on creation even though the intended table also represents ongoing inventory edits.

### Make Add row the sole creation metaphor

Keep **+ Add row** at the table edge. The mockup shows two fully populated new rows because one highlighted row could look like selection or focus. Both receive a thin emerald outline/glow across the full row and a compact **New** label within the Brand/model cell. The text label ensures the meaning does not depend on color.

No Add pair or Save batch action is shown. Future missing-field validation is intentionally not depicted because the static proof uses complete rows and validation behavior has not been designed.

### Remove ambiguous and untargeted actions

Remove global Duplicate and Delete buttons because the image has no selected row or per-row menu to establish their target. This proposal does not reject those capabilities permanently; it keeps row-lifecycle and contextual-action design outside the marketing mockup until their behavior is specified, especially because sold history must be retained.

### Use text-led summaries and an integrated mobile outcome

Replace the current summary with three unambiguous facts derived from the canonical fixture:

- **12 pairs in inventory**
- **2 newly added on web**
- **₱53,200 inventory cost**

Remove the detached mobile-inventory card and all raw box/grid glyphs. Integrate a concise planned-state note into the workspace summary or header: **Planned: web changes appear in mobile inventory.** If an icon is retained, use a recognisable inline SVG phone with directional arrows as secondary decoration; the text must carry the meaning.

### Preserve stable capture plumbing

Prefer retaining the existing internal capture IDs, routes, and asset filenames to limit churn; public labels, headings, descriptions, and visible workspace terminology change. Regenerate the canonical desktop and mobile masters and WebP derivatives through the existing capture pipeline, then verify that only the intended Web Inventory assets and required metadata change.

## Risks / Trade-offs

- [Emerald rows could look selected instead of newly created] → Highlight at least two rows and pair the glow with explicit New labels and a “2 newly added on web” summary.
- [“Changes appear on mobile” could sound live today] → Prefix the integrated outcome with **Planned** and retain the static-product-preview disclosure outside and inside the image.
- [Removing Save could make persistence unclear] → Frame the surface as the same inventory rather than a temporary form; real autosave or commit behavior remains deliberately unspecified.
- [Renaming the public feature could create stale Web Quick-Add references] → Search the site content, FAQ, pricing, specifications, roadmap, business brief, registry, and tests, then reconcile each user-facing occurrence.
- [New rows may become illegible in the mobile crop] → Compose and visually inspect the separate 2:3 master so both highlighted rows and their summary remain recognizable.

## Migration Plan

1. Update the shared fixture annotations and local authoring composition while retaining stable internal capture identifiers.
2. Reconcile public section copy, plan language, FAQ, accessible descriptions, product documents, and automated tests.
3. Regenerate the desktop/mobile masters and optimized derivatives with the canonical capture workflow.
4. Visually inspect both art directions, verify exact dimensions and unrelated-asset stability, then run the broader test and build checks.
5. Roll back the composition, copy, fixture annotations, and regenerated assets together if verification fails; no data migration is involved.
