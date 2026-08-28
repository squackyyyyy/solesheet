## Why

The structured survey answers reveal what respondents choose from known options, but they do not give respondents a safe place to share an unanticipated concern, idea, or question. A final optional comment provides that qualitative signal without adding another required step or delaying signup persistence.

## What Changes

- Add a final optional free-text question asking whether the respondent wants SoleSheet to know anything else.
- Present the response as a bounded multiline field with a visible character count and a reminder not to include sensitive or customer information.
- Preserve the existing four-question required core and let the new comment be skipped or submitted with any other optional answers.
- Accept, normalize, validate, and persist the optional comment in D1 without logging its content.
- Update the privacy notice and survey copy to describe the additional optional product-research text accurately.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `validation-survey`: Add the final optional comment question to the one-question-at-a-time follow-up flow and keep completion behavior accessible and explicit.
- `survey-persistence`: Allow one bounded optional comment per survey response and store it safely in the existing response record.

## Impact

- Survey question content, wizard ordering, footer behavior, and focused component tests.
- Survey request types, allow-listed validation, request construction, and endpoint tests.
- D1 schema migration, survey repository SQL, generated binding types if affected, and repository tests.
- Privacy-page collection and purpose disclosures.
