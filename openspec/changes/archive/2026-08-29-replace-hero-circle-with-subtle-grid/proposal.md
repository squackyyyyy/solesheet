## Why

The hero's thin circular outline is visually generic and does not reinforce SoleSheet's shoe-and-spreadsheet identity. A restrained grid motif can make the first impression feel more intentional and product-specific without competing with the headline or phone preview.

## What Changes

- Replace the hero's thin circular outline with a localized spreadsheet-style grid behind the product preview.
- Keep the existing soft green glow to preserve depth and visual continuity.
- Fade the grid at its edges, keep it low contrast, and contain it so it does not obscure content or create horizontal page overflow on mobile.
- Keep the decoration static, non-interactive, and hidden from assistive technology.
- Leave the hero copy, layout, calls to action, and product preview behavior unchanged.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `waitlist-landing-experience`: The responsive hero decoration will use SoleSheet's sheet-grid visual language while remaining subtle, accessible, and contained.

## Impact

- Affects the decorative hero markup in `app/page.tsx` and its styling in `app/globals.css`.
- Extends focused browser coverage for the hero decoration and horizontal-overflow safeguards.
- Does not affect APIs, D1, analytics, dependencies, form behavior, or hosting cost.
