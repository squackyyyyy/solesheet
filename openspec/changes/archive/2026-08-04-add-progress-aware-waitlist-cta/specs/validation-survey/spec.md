## MODIFIED Requirements

### Requirement: Survey follows the simulated signup experience
The survey prototype SHALL be offered after the client-side signup success transition, SHALL remain optional and dismissible, and SHALL be reopenable from every progress-aware waitlist CTA while the current page session is joined with survey incomplete.

#### Scenario: Simulated signup succeeds
- **WHEN** a visitor reaches the signup prototype's success state
- **THEN** the visitor is offered the optional survey with clear skip and close actions and every waitlist CTA becomes a survey entry point

#### Scenario: Visitor skips survey
- **WHEN** the visitor dismisses the survey without completing it
- **THEN** the signup success state remains available, no validation error is shown, and the waitlist CTAs continue to invite the visitor to answer the survey

#### Scenario: Visitor returns through a waitlist CTA
- **WHEN** a visitor in the survey-incomplete state activates any progress-aware waitlist CTA
- **THEN** the survey opens or receives focus with an accessible name and predictable focus placement

### Requirement: Answers remain temporary
Survey answers SHALL be held only in temporary page memory for the current prototype session. Answers SHALL NOT be sent to a server, written to durable browser storage, or included in analytics, and they SHALL reset when the page reloads.

#### Scenario: Visitor changes an answer
- **WHEN** a visitor selects or changes a survey answer
- **THEN** the visible prototype state updates immediately without a network request or durable storage write

#### Scenario: Visitor closes and reopens during the same page session
- **WHEN** a visitor closes the incomplete survey and reopens it from a waitlist CTA without reloading the page
- **THEN** temporary answers remain available so the prototype flow can continue

#### Scenario: Page reloads
- **WHEN** a visitor reloads after answering survey questions
- **THEN** previous answers and survey progress are not restored from persistent storage

### Requirement: Survey provides a complete prototype ending
The survey SHALL provide a clear completion action and an accessible thank-you state so the full intended journey can be reviewed without recording a response. Activating completion SHALL set the shared current-page journey to survey complete and SHALL update every progress-aware waitlist CTA to the non-actionable thank-you state.

#### Scenario: Visitor completes the survey prototype
- **WHEN** a visitor activates the survey completion action
- **THEN** the survey transitions to an accessible thank-you state, every waitlist CTA displays “You’re all set — thank you” with a non-color completion cue, and no answers or completion analytics are submitted or recorded

