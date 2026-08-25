## Context

The survey currently groups phone platform, active inventory size, current inventory method, and highest-value feature as required core answers. Plan interest is the first optional follow-up. Both fields already have stable browser answer keys, server allow-lists, and nullable D1 columns. See `proposal.md` for motivation and the delta specs for the revised behavior.

## Goals / Non-Goals

**Goals:**

- Swap plan interest and current inventory method between the core and optional groups without changing the total question counts.
- Make the core pricing question explicitly measure willingness to pay after the visitor has seen the website demo.
- Keep existing normalized answer identifiers and stored rows compatible.
- Align client completion checks, independent API validation, privacy language, and tests.

**Non-Goals:**

- Adding, removing, or renaming D1 columns.
- Changing survey authorization, idempotency, Turnstile, waitlist persistence, or the optional interview flow.
- Making the survey itself mandatory for joining the waitlist.
- Introducing adaptive pricing experiments or free-form price entry.

## Decisions

### Swap existing question descriptors instead of creating new fields

The core order will be phone platform, active inventory size, plan interest, and highest-value feature. The optional order will be current inventory method, installment frequency, cloud-backup interest, sales channels, and interview availability. Existing `plan` and `currentTool` answer keys and their API fields remain unchanged; only their group membership, ordering, and required status change. This avoids historical-data fragmentation and a D1 migration.

### Phrase plan interest as bounded willingness to pay

The third core question will ask, **Based on what you’ve seen, what would you be willing to pay for SoleSheet?** Its choices will be **Free only**, **Up to ₱65/month**, **Up to ₱99/month**, **Up to ₱349/month**, and **Not sure yet**. These labels map to the existing normalized identifiers `free`, `founding_starter_65`, `starter_99`, `growth_349`, and `not_sure`. Bounded choices keep completion fast and results directly comparable to the prices shown on the page; free-form pricing was rejected because it increases input effort and produces noisier early validation data.

### Enforce the reprioritized core on both client and server

The browser request builder and completion guard will require plan interest and stop requiring inventory method. The API will independently enforce the same set: phone platform, active inventory size, plan interest, and highest-value feature. Inventory method and its Other detail remain valid only when supplied consistently. Database insert behavior remains unchanged because omitted inventory method already maps to nullable columns.

### Update disclosure language with the collection change

Survey guidance and the Privacy Policy will name willingness to pay among the four required answers for a submitted survey and describe current inventory method as optional. The active privacy-policy version and effective date will be advanced when implementation is applied so stored consent identifies the wording in force.

## Risks / Trade-offs

- [Displayed prices may anchor willingness-to-pay responses] → State that the answer is based on the demo and retain **Not sure yet** rather than requesting an unbounded number.
- [New labels could be mistaken for new stored values] → Keep a deliberate display-label-to-existing-identifier mapping and test every option.
- [Client/server required fields could diverge] → Update shared request construction and server validation in the same release with focused acceptance and rejection tests.
- [Older rows may omit plan interest or include inventory method] → Keep all existing D1 columns nullable and interpret requiredness as a rule for new submissions, not a retroactive database constraint.

## Migration Plan

1. Update survey content, group ordering, request construction, and client completion validation.
2. Update API validation and tests in the same application change.
3. Update Privacy Policy wording, policy version, and effective date before deployment.
4. Run component, API, browser, accessibility, type, lint, and production-build checks.
5. Deploy without a D1 migration; roll back the application release if completion or validation regresses.
