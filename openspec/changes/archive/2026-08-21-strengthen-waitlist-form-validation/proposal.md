## Why

The waitlist and survey currently accept unbounded optional free text, allowing unusually long names or Other responses to weaken the layout and create poorly bounded data for future collection. The highest-value-feature Other response is also constrained to a single line even though it invites an explanation.

## What Changes

- Limit the optional name or reseller alias to 60 characters and ensure the confirmation heading remains robust for long unbroken values.
- Limit the email address to 254 characters while retaining the existing email-specific validation.
- Limit Other inventory-method and sales-channel details to 100 characters each.
- Replace the Other highest-value-feature input with a fixed-height multiline field limited to 300 characters and show a useful character count.
- Treat whitespace-only free-text values as empty and trim meaningful values at the point where the current frontend flow consumes them.
- Keep every optional field optional, including Other details, and continue clearing a detail when its Other selection is removed.
- Add reusable accessible multiline-field presentation beside the existing shared text-input component.
- Keep the change frontend-only; it does not add persistence or backend submission.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `waitlist-signup`: Bound and safely present the optional name and email fields while preserving accessible client-side validation.
- `validation-survey`: Bound every Other detail and provide an accessible fixed-height textarea for explaining another highest-value feature.

## Impact

- Updates shared React Aria text-field presentation in `app/components/ui/aria.tsx`.
- Updates waitlist and survey field configuration and value handling in `app/components/waitlist/waitlist-experience.tsx`.
- Updates focused component and browser coverage for length limits, whitespace handling, textarea semantics, conditional clearing, and mobile layout stability.
- Adds no dependency, API, storage, analytics, or backend behavior.
