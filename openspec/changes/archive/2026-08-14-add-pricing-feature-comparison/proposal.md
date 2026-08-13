## Why

The three pricing cards communicate each plan’s headline benefits, but they do not let a seller quickly compare a specific feature across tiers or confirm whether paid plans retain the useful free core. A concise feature matrix makes the planned upgrade path easier to evaluate without changing the validation-stage pricing story.

## What Changes

- Add a feature-comparison matrix below the Free, Starter, and Growth cards and before the founding-seller offer.
- Make the tier ladder explicit: Starter includes the Free core; Growth includes the Starter and Free benefits, then adds scale features.
- Compare active-pair limits and the agreed feature set: core inventory, search and filters, profit tracking, installment tracking, sold history, local export, backup and restore, installment reminders and monthly summaries, Web Inventory, spreadsheet import, cross-device sync, and advanced reports.
- Show Growth-only scale capabilities as included intended plan benefits; preserve one page-level planned-pricing disclosure that truthfully says the product and pricing are not available yet.
- Use an accessible native HTML data table for the non-interactive comparison—rather than a React Aria grid—with meaningful headers and non-color-only inclusion states.
- Keep the matrix visible on desktop. On small screens, place the same table in a closed native **Compare every feature** disclosure with an accessible horizontally scrollable table region, sticky feature column, and concise swipe cue.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `waitlist-landing-experience`: Extend the pricing preview with a truthful, responsive, accessible plan-feature comparison and explicit cumulative tier model.

## Impact

- Affects shared plan/comparison content, the public pricing section, responsive layout, and component/browser accessibility coverage.
- Introduces no new dependency, live pricing, checkout, billing operation, account state, or React Aria interaction; the comparison remains read-only validation-stage content.
