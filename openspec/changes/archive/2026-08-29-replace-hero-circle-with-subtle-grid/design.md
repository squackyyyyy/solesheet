## Context

See `proposal.md` for the visual motivation. The hero currently renders two absolutely positioned decorative circles inside an overflow-hidden section: a thin green outline and a blurred pale-green fill. The content and phone preview are layered after those decorations. The replacement must preserve that layering, remain inexpensive to render, and behave safely from 320px mobile widths through desktop.

## Goals / Non-Goals

**Goals:**

- Express the sheet half of the SoleSheet identity with a subtle, recognizable grid.
- Keep the decoration localized around the product preview rather than turning the page into a patterned background.
- Preserve mobile containment, accessibility, and the existing visual depth.

**Non-Goals:**

- Animating the grid or making it react to pointer or scroll input.
- Changing hero content, spacing, product artwork, or conversion behavior.
- Adding an image asset, canvas renderer, package, or JavaScript solely for decoration.

## Decisions

### Render the grid as one CSS-backed decorative element

The thin outline element will be replaced by a single `aria-hidden` element whose background combines two repeating linear gradients. This produces crisp horizontal and vertical lines without an extra asset request or many DOM nodes. A named CSS class keeps the gradient and mask readable instead of embedding a long arbitrary value in the page markup.

An SVG asset was considered, but it would add asset maintenance without improving this simple repeating geometry. Repeated child elements were rejected because they add unnecessary markup for purely visual content.

### Fade a partial grid rather than expose a rectangular pattern

A radial mask will fade the lines at every edge, making the grid feel like ambient brand texture rather than a boxed spreadsheet. The existing green blur stays in place and continues to soften the decorative layer. The grid uses low-alpha brand green lines and no motion.

A full-width grid was considered, but it would introduce visual noise behind the headline and could make the landing page feel like a generic technical dashboard.

### Use responsive sizing inside the existing overflow boundary

The grid will remain absolutely positioned behind the phone preview. Desktop uses larger, more widely spaced cells; narrow viewports use a smaller extent and cell size with lower perceived prominence. The existing hero `overflow-hidden` boundary provides the primary containment safeguard, and focused browser coverage will retain document-width checks on mobile.

## Risks / Trade-offs

- [Grid lines appear too busy on some displays] → Use low-alpha lines, a strong edge fade, and reduced mobile prominence.
- [CSS masking differs across browsers] → Include the WebKit-prefixed mask declaration; without mask support, low line contrast and hero overflow containment remain safe fallbacks.
- [Decoration competes with product content] → Keep it in the existing background layer and localize its strongest area behind the preview rather than the text column.
- [Responsive positioning creates horizontal overflow] → Keep it inside the hero's overflow-hidden section and verify 320px, 360px, and desktop document widths.

## Migration Plan

Deploy as a presentation-only change with the existing application release. Rollback consists of restoring the former decorative outline and removing the grid class; no data or configuration migration is involved.
