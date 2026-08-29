## MODIFIED Requirements

### Requirement: Survey provides a complete prototype ending
The survey SHALL provide a deliberate completion action after the fourth core question and throughout the optional follow-ups. Activating completion SHALL replace question navigation with an accessible pending state, prevent repeated activation, and transition to the existing thank-you state only after the server confirms the generic durable outcome. The thank-you state SHALL provide a clickable `support@solesheet.app` contact for respondents who need to request a change to their submitted responses. Selecting an answer or entering a comment alone SHALL NOT complete or submit the survey. A validation, authorization, network, or database failure SHALL retain the current answers and position in page memory, present a safe retry action, and SHALL NOT mark the shared journey complete.

#### Scenario: Visitor completes immediately after the core questions
- **WHEN** the visitor activates **Finish this survey** on the first optional question after all four core answers are present
- **THEN** the survey submits the current answer set without requiring a follow-up answer and reaches thank-you only after server confirmation

#### Scenario: Visitor completes during optional follow-ups
- **WHEN** the visitor activates **Finish this survey** during an optional question
- **THEN** the survey submits all current core and optional answers without requiring the remaining questions and reaches the same confirmed thank-you state

#### Scenario: Visitor completes on the final optional question
- **WHEN** the visitor leaves the additional comment blank or enters a supported comment and activates **Finish this survey**
- **THEN** the current answer set is submitted once and completion does not depend on the optional comment being present

#### Scenario: Survey submission fails
- **WHEN** the completion request is rejected or cannot receive a confirmed durable outcome
- **THEN** the thank-you state does not appear, the visitor's answers and position remain available, and a retry can submit them again

#### Scenario: Respondent wants to change a submitted response
- **WHEN** the confirmed thank-you state is shown
- **THEN** it explains that response-change requests can be emailed to `support@solesheet.app` through a working email link
