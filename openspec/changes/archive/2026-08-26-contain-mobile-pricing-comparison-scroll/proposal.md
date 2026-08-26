## Why

Opening the mobile **Compare every feature** disclosure exposes a deliberately wide comparison table whose scrollable overflow still expands the root document on narrow viewports. This allows the whole landing page to pan horizontally even when a visitor swipes outside the table, despite the comparison card itself appearing constrained.

## What Changes

- Isolate the wide comparison table at its own horizontal scroll boundary so its overflow cannot contribute to document width.
- Preserve the readable multi-column table, sticky Feature column, disclosure behavior, and table-local horizontal scrolling.
- Add browser-level regression coverage that opens the disclosure at a mobile viewport and distinguishes intentional table overflow from forbidden page overflow.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `waitlist-landing-experience`: Strengthen the mobile pricing-comparison contract so opening or horizontally scrolling the table never widens or pans the surrounding page.

## Impact

- Affects the mobile pricing comparison component and its focused browser coverage.
- Does not change pricing content, APIs, dependencies, desktop presentation, or the table's internal scroll width.
