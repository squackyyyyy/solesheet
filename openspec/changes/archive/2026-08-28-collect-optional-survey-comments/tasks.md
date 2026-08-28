## 1. Survey Contract and Storage

- [x] 1.1 Add the shared 500-character comment limit and extend survey request construction and server validation with normalized optional `additionalComments`.
- [x] 1.2 Add an additive D1 migration for nullable `additional_comments` with a database length constraint.
- [x] 1.3 Bind and atomically persist the optional comment through the existing survey repository without changing idempotent duplicate behavior.

## 2. Survey Experience and Privacy

- [x] 2.1 Add the final **Optional question 6 of 6** multiline comment step with sensitive-data guidance, character count, Back, and explicit completion behavior.
- [x] 2.2 Keep the survey dialog introduction concise and accurate for four required questions followed by optional questions.
- [x] 2.3 Update the privacy notice to disclose the optional comment and its product-research purpose.

## 3. Verification

- [x] 3.1 Cover client request mapping and server validation for accepted, trimmed, blank, wrong-type, unknown, and over-limit comment values.
- [x] 3.2 Cover repository persistence, omission, existing-response idempotency, and the additive migration locally.
- [x] 3.3 Cover wizard progress, navigation, character limit, optional completion, retry preservation, and privacy copy with focused component or route tests.
- [x] 3.4 Run OpenSpec strict validation, lint, type checking, focused tests, and the production build; document that the committed migration must be applied remotely before deploying this application change.
