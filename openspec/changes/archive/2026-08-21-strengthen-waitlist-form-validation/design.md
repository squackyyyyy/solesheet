## Context

See `proposal.md` for motivation. The signup and survey share a React Aria `TextInput`, while all three conditional Other details currently use that single-line control without limits. The survey dialog already guarantees a stable outer height and a separately scrolling body, so the multiline control must not introduce user-driven resizing. Values remain controlled React state and are not submitted or persisted.

## Goals / Non-Goals

**Goals:**

- Give every free-text value one explicit, testable upper bound.
- Keep the highest-value-feature explanation comfortable to write without destabilizing the wizard.
- Preserve Unicode names and aliases rather than imposing character-pattern restrictions.
- Keep labels, helper text, limits, and the textarea counter available to assistive technology.

**Non-Goals:**

- Requiring optional names, questions, or Other details.
- Adding backend validation, sanitization, submission, storage, or analytics.
- Redesigning question order, progress, automatic advancement, or the modal shell.
- Turning every Other response into a textarea.

## Decisions

### 1. Centralize free-text limits with validation helpers

Define named limits alongside the existing email validator: 60 for name, 254 for email, 100 for current inventory method, 300 for another highest-value feature, and 100 for another sales channel. Reuse these constants in fields, value clamping, and tests. Extend email validation to reject a trimmed value beyond the supported length even though the native field normally prevents it.

Controlled change handlers will clamp to the relevant limit as a defense beyond the native `maxLength` attribute. Free text will not be trimmed while the visitor is typing. Name/contact values will be trimmed when the signup flow consumes them, and Other details will be trimmed on blur; whitespace-only details therefore become empty without making them invalid.

Alternative considered: rely only on native `maxLength`. That protects ordinary typing and paste, but central clamping and validator limits keep programmatic state and future reuse consistent.

### 2. Add one reusable accessible textarea field

Add a `TextAreaField` beside `TextInput` in the existing React Aria UI module. It will share the same label, description, error, focus, and invalid styling conventions. It will accept a controlled value and explicit maximum, render a four-row fixed-height textarea with vertical overflow, disable manual resizing, and expose a visible `current / maximum` character count through the field description.

Only the Other highest-value-feature response uses this component. Other inventory method and Other sales channel remain single-line because they are classification labels rather than explanations.

Alternative considered: auto-grow the textarea. That gives more writing space but changes the question body's height and works against the stable survey experience the user previously chose.

### 3. Preserve optional navigation semantics

Selecting Other will continue to stop automatic advancement and reveal the associated detail control. A blank or whitespace-only detail will not block Next, Continue, or Finish. Switching away from Other will continue to remove the temporary detail. The character limit is a bound, not a new required-field rule.

Alternative considered: require text whenever Other is selected. That would improve response specificity but contradicts the survey's explicit promise that every question and Other detail is optional.

### 4. Defend presentation as well as input state

The success heading will use robust word wrapping in addition to the 60-character name limit. Browser coverage will exercise long unbroken input and the multiline feature response at 360px to confirm that the dialog body scrolls when needed while the footer and page width remain stable.

## Risks / Trade-offs

- [A 300-character explanation can make the question body taller] → Keep the textarea at four rows with internal scrolling and preserve the existing body-only modal scrolling.
- [Native character counts treat some emoji as more than one code unit] → Accept browser-native counting for this validation prototype rather than adding grapheme-counting complexity.
- [Trimming on each keystroke would make editing frustrating] → Clamp during typing but trim only on blur or flow consumption.
- [Frontend limits could be mistaken for complete data protection] → Keep backend validation explicitly out of scope and duplicate these contracts server-side when collection is implemented.

## Migration Plan

1. Add shared limits, bounded-value helpers, and the reusable textarea field.
2. Apply limits and normalization to signup and conditional survey fields.
3. Add focused component and responsive browser verification.
4. Roll back by restoring the prior unbounded text inputs; no stored data migration is required.
