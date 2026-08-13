## Context

The public pricing preview currently has three readable cards, each showing three representative features. It does not reveal how a specific feature compares across plans, and the public site has no pricing interaction or checkout. See proposal.md for motivation and the delta specification for required public behavior.

## Goals / Non-Goals

**Goals:**

- Add a concise, single-source feature matrix that makes the cumulative plan ladder clear.
- Preserve quick plan scanning through the existing cards while supporting detailed plan comparison.
- Provide a mobile comparison pattern that retains column relationships instead of repeating plan content into long cards.

**Non-Goals:**

- Changing prices, limits, the founding offer, or planned availability.
- Adding checkout, a plan selector, sorting, filtering, state persistence, or an interactive pricing calculator.
- Replacing the existing plan cards or implementing the table as a future product-interface grid.

## Decisions

### Use a native semantic table, not a React Aria grid

The comparison is read-only content with stable headers and no row or column action. Implement it with native table semantics, a caption, column headers, and row headers. React Aria Components remain appropriate for interactive site controls, but a React Aria Table would introduce grid behavior with no visitor benefit here.

Alternative considered: use React Aria Table to standardize every table. This would require grid-style keyboard interaction and selection conventions that do not fit a static comparison.

### Keep cards as summary; matrix as detail

Retain the existing plan cards and their visual Starter emphasis. Add the matrix beneath them so visitors first understand the plan positioning and then verify individual feature coverage. Model the comparison rows from one structured data source, with active-pair values and states (`included`, `excluded`) rather than manually duplicating labels in card and table markup. Growth's scale capabilities are included intended benefits, not a separate feature-level availability state.

### Mobile uses progressive disclosure plus horizontal comparison

On desktop, render the matrix open. On small viewports, use a closed native `details` disclosure named **Compare every feature**. Its opened content is a labelled horizontal scroll region with a sticky Feature column and a concise swipe cue. This preserves the essential Free/Starter/Growth side-by-side relationship without causing body overflow.

Alternative considered: turn each feature into three vertically stacked plan cards. That removes horizontal scrolling but makes comparison slower and repeats the plan labels for every row.

### Communicate states with text equivalents

Use a visual check for included features, an em dash for excluded features, and explicit pair limits. Each visual state gets equivalent accessible text; the status cannot depend solely on green color or an icon. Keep the validation-stage message once at the pricing-section level rather than applying a Planned badge to only Growth scale rows.

## Risks / Trade-offs

- [The table is dense on a phone] → Keep the matrix disclosed by default on mobile, use concise labels, sticky Feature column, and retain the quicker plan-card summaries above it.
- [Cumulative plans may surprise visitors] → State the inclusion hierarchy before the table and ensure every inherited feature is marked consistently.
- [The intended plan coverage could be mistaken for a live product] → Retain the page-wide planned-pricing disclosure; do not imply that only Growth scale features are tentative.
- [Duplicate content could drift] → Derive cards and comparison rows from shared pricing content and test exact limits and state labels.

## Migration Plan

1. Normalize plan and comparison content around the approved cumulative coverage model.
2. Add the desktop matrix and mobile disclosure without changing pricing or CTA behavior.
3. Test semantic table associations, mobile disclosure and scrolling, no page overflow, static behavior, and desktop visual hierarchy.
4. Roll back by removing the comparison data and component; no customer data, URL, or payment migration is involved.
