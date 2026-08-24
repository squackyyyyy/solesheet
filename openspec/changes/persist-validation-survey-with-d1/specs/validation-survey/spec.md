## MODIFIED Requirements

### Requirement: Survey follows a confirmed persisted signup
The existing optional survey SHALL open automatically only after the server confirms the waitlist signup outcome and supplies a valid survey continuation token. It SHALL remain dismissible without an explicit encouragement to skip and SHALL retain unsubmitted answers only in temporary page memory. It SHALL NOT open while the signup request is pending, after the request fails, or without the continuation token required to submit it.

#### Scenario: Persisted signup succeeds
- **WHEN** the visitor reaches the signup success state after server confirmation and receives a survey continuation token
- **THEN** the optional survey opens at its first core question and the visitor can close it without affecting the stored signup

#### Scenario: Visitor closes the survey
- **WHEN** the visitor dismisses the automatically opened survey without finishing it
- **THEN** the signup success state remains available, the durable signup remains stored, and no survey response or validation error encourages the visitor to answer

#### Scenario: Signup is not confirmed
- **WHEN** the signup request is pending, has failed, or does not provide a usable survey continuation token
- **THEN** the survey does not open

### Requirement: Answers remain temporary
Survey answers, the active core-or-optional group, and the current question position SHALL remain only in temporary page memory until the visitor deliberately activates **Finish this survey**. Question selection, skipping, advancing, closing, and reopening SHALL NOT autosave answers, use durable browser storage, or emit data-bearing analytics. Finishing SHALL send the current normalized answer set once to the survey endpoint. A reload before confirmed submission SHALL discard the temporary answers; confirmed submitted answers SHALL remain durable in D1 without being restored into the browser wizard.

#### Scenario: Visitor changes an answer or question
- **WHEN** a visitor selects or changes a survey answer, skips, advances, or navigates backward
- **THEN** the visible state updates without a data-bearing network request, analytics event, cookie, or durable storage write

#### Scenario: Visitor closes and reopens during the same page session
- **WHEN** a visitor closes and reopens the survey without reloading or submitting it
- **THEN** the same question, temporary answers, applicable Other details, and continuation token remain available in page memory

#### Scenario: Visitor finishes the survey
- **WHEN** the visitor activates an available **Finish this survey** action
- **THEN** the browser submits the current normalized answer set once and does not submit omitted questions as invented answers

#### Scenario: Page reloads before submission succeeds
- **WHEN** the visitor reloads after navigating or answering questions but before the server confirms submission
- **THEN** previous answers, question position, and completion state are not restored from persistent browser storage

### Requirement: Survey provides a complete prototype ending
The survey SHALL provide a deliberate completion action after the fourth core question and throughout the optional follow-ups. Activating completion SHALL replace question navigation with an accessible pending state, prevent repeated activation, and transition to the existing thank-you state only after the server confirms the generic durable outcome. The thank-you state SHALL provide a clickable `solesheetph@gmail.com` contact for respondents who need to request a change to their submitted responses. Selecting an answer alone SHALL NOT complete or submit the survey. A validation, authorization, network, or database failure SHALL retain the current answers and position in page memory, present a safe retry action, and SHALL NOT mark the shared journey complete.

#### Scenario: Visitor completes after the core questions
- **WHEN** the visitor activates **Finish this survey** on the fourth core question, whether answered or blank
- **THEN** the survey submits the current answer set without requiring or opening the optional follow-ups and reaches thank-you only after server confirmation

#### Scenario: Visitor completes during optional follow-ups
- **WHEN** the visitor activates **Finish this survey** during an optional question, whether answered or blank
- **THEN** the survey submits all current core and optional answers without requiring the remaining questions and reaches the same confirmed thank-you state

#### Scenario: Visitor selects the final answer
- **WHEN** the visitor selects an answer on the fourth core or fifth optional question
- **THEN** the selected state remains visible and the survey waits for the corresponding completion action

#### Scenario: Survey submission fails
- **WHEN** the completion request is rejected or cannot receive a confirmed durable outcome
- **THEN** the thank-you state does not appear, the visitor's answers and position remain available, and a retry can submit them again

#### Scenario: Respondent wants to change a submitted response
- **WHEN** the confirmed thank-you state is shown
- **THEN** it explains that response-change requests can be emailed to `solesheetph@gmail.com` through a working email link
