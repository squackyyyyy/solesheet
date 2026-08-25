## Why

The required survey should prioritize the strongest validation signals for deciding whether SoleSheet is worth building and how it should be priced. A visitor's current tracking method remains useful research, but willingness to pay after seeing the website demo is more important for every completed response.

## What Changes

- Move the existing planned-price/plan-interest question from the optional follow-ups into the four-question required core.
- Reword that question to ask what the visitor would be willing to pay for SoleSheet based on the website demo while retaining price-aligned answer choices.
- Move **What do you use to track inventory today?** from the required core to the first optional follow-up instead of removing it.
- Keep the survey at four required core questions and five optional follow-ups, including automatic single-choice advancement and the ability to finish once the required core is complete.
- Align browser request construction, server validation, privacy wording, and tests with required plan interest and optional inventory method.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `validation-survey`: Replace current inventory method with willingness to pay in the required core, and retain current inventory method as an optional follow-up.
- `survey-persistence`: Require plan interest in completed survey requests while allowing inventory method and its Other detail to be omitted.

## Impact

Affected areas include survey question copy and ordering, wizard group definitions, progress guidance, request construction, API validation, privacy disclosures, and component/API/browser tests. Existing D1 columns and accepted answer identifiers remain compatible, so no database migration or new dependency is expected.
