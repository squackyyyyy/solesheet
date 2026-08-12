# validation-survey Specification

## Purpose

Define an optional, non-saving survey prototype that demonstrates the intended post-signup flow without collecting or persisting research responses.

## Requirements

### Requirement: Survey follows the simulated signup experience
The survey prototype SHALL be offered after the client-side signup success transition and SHALL remain optional and dismissible.

#### Scenario: Simulated signup succeeds
- **WHEN** a visitor reaches the signup prototype's success state
- **THEN** the visitor is offered the optional survey with clear skip and close actions

#### Scenario: Visitor skips survey
- **WHEN** the visitor dismisses the survey without answering
- **THEN** the success state remains available and no validation error is shown

### Requirement: Survey captures prioritized validation signals
The survey SHALL support questions about primary phone platform, likely pricing plan, active inventory size, installment-sales frequency, current inventory method, highest-value feature, cloud-backup interest, sales channels, and permission for a follow-up interview. The current inventory method, highest-value feature, and sales-channel questions SHALL each include an **Other** choice that reveals an associated free-text detail field when selected. Every question and Other-detail field SHALL remain optional, and the survey SHALL NOT request information about the reseller's buyers.

#### Scenario: Visitor answers only selected questions
- **WHEN** the visitor answers one or more questions and leaves others, including any visible Other-detail field, blank
- **THEN** the answered values are accepted without requiring completion of unanswered questions or Other details

#### Scenario: Visitor selects Other for a single-choice question
- **WHEN** the visitor selects Other for current inventory method or highest-value feature
- **THEN** one clearly labeled text field associated with that question appears and accepts a temporary free-text response

#### Scenario: Visitor selects Other as a sales channel
- **WHEN** the visitor selects Other for the multi-select sales-channel question
- **THEN** one clearly labeled text field associated with sales channels appears without clearing any other selected channels

#### Scenario: Visitor deselects Other
- **WHEN** the visitor changes a single-choice answer away from Other or deselects Other from sales channels
- **THEN** that question's Other-detail field is hidden and its temporary text is cleared while unrelated answers remain unchanged

#### Scenario: Prohibited buyer data
- **WHEN** the survey is rendered
- **THEN** no prompt asks for buyer names, buyer contact details, payment histories, or other buyer information

### Requirement: Survey adapts to mobile and desktop presentation
The survey SHALL appear as a bottom or full-screen sheet on narrow viewports and as an accessible dialog or equivalent focused surface on desktop. In every presentation, focus SHALL be managed, closing SHALL be available, and background interaction SHALL behave appropriately.

#### Scenario: Survey opens on mobile
- **WHEN** the survey is opened at 360px wide
- **THEN** controls are thumb-friendly, content can scroll within the sheet, and the close action remains discoverable

#### Scenario: Survey opens on desktop
- **WHEN** the survey is opened on a desktop viewport
- **THEN** focus enters the dialog, the dialog has an accessible title and description, and closing returns focus to the triggering control

### Requirement: Answers remain temporary
Survey answers SHALL be held only in temporary page memory for the current prototype session. Answers SHALL NOT be sent to a server, written to durable browser storage, or included in analytics, and they SHALL reset when the page reloads.

#### Scenario: Visitor changes an answer
- **WHEN** a visitor selects or changes a survey answer
- **THEN** the visible prototype state updates immediately without a network request or durable storage write

#### Scenario: Visitor closes and reopens during the same page session
- **WHEN** a visitor closes and reopens the survey without reloading the page
- **THEN** temporary answers remain available so the prototype flow can continue

#### Scenario: Page reloads
- **WHEN** a visitor reloads after answering survey questions
- **THEN** previous answers are not restored from persistent storage

### Requirement: Survey provides a complete prototype ending
The survey SHALL provide a clear completion action and an accessible thank-you state so the full intended journey can be reviewed without recording a response.

#### Scenario: Visitor completes the survey prototype
- **WHEN** a visitor activates the survey completion action
- **THEN** the survey transitions to an accessible thank-you state without submitting answers or recording completion analytics
