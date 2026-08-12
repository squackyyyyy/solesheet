## Why

Asking for a Philippine mobile number alongside email may make privacy-conscious visitors hesitate before joining the waitlist. The optional research survey also needs a clear way to capture answers outside its predefined inventory-tool, feature-priority, and sales-channel choices.

## What Changes

- Replace the combined email-or-mobile signup field with an email-only field and email-specific validation, labels, placeholders, errors, and browser autofill behavior.
- Keep the optional name and consent controls, simulated signup transition, and non-saving prototype boundaries unchanged.
- Add an **Other** choice with a conditionally revealed text field for the current inventory method question.
- Add an **Other** choice with a conditionally revealed text field for the highest-value feature question.
- Add an **Other** choice with a conditionally revealed text field for the multi-select sales-channel question.
- Keep all survey questions and Other-detail fields optional, accessible, temporary within the page session, and absent from network requests, durable browser storage, and analytics.
- Clear a question's hidden Other detail when its Other choice is deselected so temporary answers do not retain contradictory values.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `waitlist-signup`: Narrow the accepted contact method and its validation contract from email or Philippine mobile number to email only.
- `validation-survey`: Add conditional free-text Other responses to inventory method, highest-value feature, and sales channels while preserving optionality, accessibility, and temporary-answer behavior.

## Impact

- Affects the waitlist form copy, client-side contact validator, field semantics, signup component tests, and desktop/mobile browser journeys that currently use phone-number fixtures.
- Affects centralized survey options, temporary answer state, conditional field rendering, multi-select handling, and survey component/browser tests.
- Introduces no backend submission, persistence, analytics, account, or third-party dependency changes.
