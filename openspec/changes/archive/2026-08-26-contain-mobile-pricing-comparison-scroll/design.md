## Context

See `proposal.md` for motivation. The pricing comparison intentionally renders a table with a 38rem minimum width inside a much narrower mobile disclosure. The existing overflow wrappers keep the card visually constrained, but opening the disclosure still increases the root document's scroll width because the table's scrollable overflow is not isolated at the element that owns horizontal scrolling.

At a measured 390px viewport, the table region is approximately 314px wide with 608px of internal scrollable content, while the root document expands to 586px. Applying layout containment directly to the table region returns the document to 390px without changing the region or table widths.

## Goals / Non-Goals

**Goals:**

- Keep the document width equal to the mobile viewport while the comparison is open.
- Preserve table-local horizontal scrolling and the readable four-column layout.
- Protect the behavior with a rendered-browser width assertion.

**Non-Goals:**

- Redesigning the comparison as cards or compressing all columns into the viewport.
- Changing pricing content, disclosure semantics, sticky columns, or desktop layout.
- Relying solely on root-level overflow clipping to hide a descendant sizing leak.

## Decisions

### Contain layout at the element that owns horizontal scrolling

Apply CSS layout containment to the comparison table's horizontal scroll region. This keeps the region's scrollable overflow from contributing to ancestor and root document width while retaining `overflow-x: auto` and the table's minimum width.

The existing outer inline-size containment is insufficient because it constrains intrinsic sizing but does not isolate this nested scrollable-overflow contribution. Removing the table minimum width would also stop the leak, but would make four columns cramped and undermine comparison readability. Root-level `overflow-x` clipping remains defensive rather than being treated as the primary fix.

### Verify both sides of the intended overflow boundary

The browser regression check will open the disclosure at a narrow viewport and assert both that the table region has internal horizontal overflow and that the document does not. This prevents a false pass caused by removing the useful table scrolling along with the page overflow.

## Risks / Trade-offs

- [Containment changes formatting-context behavior around the scroll region] → Scope it to the table region only and verify the sticky Feature column and horizontal scrolling remain usable.
- [DOM-only component tests cannot detect rendered document width] → Keep semantic component coverage and add the width invariant to browser coverage.
- [Mobile Safari may expose elastic scrolling differences not represented by Chromium] → Remove the measurable root-width expansion first, then include an actual-iPhone smoke check in manual verification.

## Migration Plan

Deploy as a presentation-only change with no data or API migration. Roll back the localized containment rule and its regression assertion if it causes an unexpected table-rendering issue.
