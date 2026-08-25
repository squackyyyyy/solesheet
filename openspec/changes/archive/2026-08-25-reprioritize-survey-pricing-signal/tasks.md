## 1. Survey Content and Flow

- [x] 1.1 Reword the plan-interest prompt as willingness to pay based on the website demo and map the five price-aligned labels to the existing normalized plan identifiers.
- [x] 1.2 Move plan interest into core question three and current inventory method into optional question one while preserving four core and five optional questions.
- [x] 1.3 Preserve automatic advancement, Other-detail pauses, Back navigation across the group boundary, and **Finish this survey** availability after the required core.
- [x] 1.4 Update survey guidance and completion validation so plan interest is required and current inventory method is optional.

## 2. Request and Server Validation

- [x] 2.1 Update survey request construction to require and submit plan interest in the core-only payload while omitting an unanswered inventory method.
- [x] 2.2 Update independent API validation to require phone platform, active inventory size, plan interest, and highest-value feature while accepting an omitted inventory method.
- [x] 2.3 Preserve inventory-method Other-detail consistency, answer allow-lists, safe failures, idempotency, and existing D1 repository behavior without a migration.

## 3. Privacy Alignment

- [x] 3.1 Update the Privacy Policy and survey collection copy to identify willingness to pay as required for submission and current inventory method as optional.
- [x] 3.2 Advance the privacy-policy version and effective date used by newly stored consent records.

## 4. Verification

- [x] 4.1 Add content and mapping tests for every willingness-to-pay display label and existing normalized identifier.
- [x] 4.2 Update component tests for the reprioritized core, optional inventory-method flow, Back navigation, core-only completion, and Other details.
- [x] 4.3 Update API tests for required plan interest, optional inventory method, invalid Other details, and unchanged duplicate handling.
- [x] 4.4 Update browser coverage for question ordering, automatic transitions, progress, keyboard focus, and completing before any optional answer.
- [x] 4.5 Run focused tests, the full automated suite, type and lint checks, and the production build.
