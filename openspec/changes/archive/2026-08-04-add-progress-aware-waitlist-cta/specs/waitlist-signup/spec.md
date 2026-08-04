## MODIFIED Requirements

### Requirement: Signup prototype presents a realistic low-friction form
The waitlist prototype SHALL present an optional name field, a field accepting an email address or Philippine mobile number, an unticked consent checkbox, concise privacy-link presentation, and one primary submit action. The signup form SHALL be the destination of progress-aware waitlist CTAs only while the current page session remains in the not-joined state.

#### Scenario: Visitor reaches the form
- **WHEN** a visitor activates a “Join the waitlist” call to action before completing simulated signup
- **THEN** the same signup form is revealed or focused with a clear accessible name and logical field order

#### Scenario: Visitor enters a valid contact
- **WHEN** a visitor enters a valid email address or Philippine mobile number and checks the consent control
- **THEN** the submit action becomes ready for the simulated signup transition

### Requirement: Valid submission transitions to a simulated success state
When the visible fields pass client-side validation, the prototype SHALL transition within the current page session to a polished success state, set the shared page journey to joined with survey incomplete, and offer the optional survey flow. The transition SHALL update every progress-aware waitlist CTA, prevent repeated activation while it is occurring, and be announced to assistive technology.

#### Scenario: Simulated signup completes
- **WHEN** a visitor activates submit with valid contact information and consent
- **THEN** the form transitions to a success confirmation, every waitlist CTA offers the optional survey, and the visitor can continue to that survey prototype

#### Scenario: Transition is in progress
- **WHEN** the simulated submit transition is active
- **THEN** the submit control communicates progress and cannot be activated repeatedly

### Requirement: Prototype does not submit or persist visitor data
The signup prototype SHALL NOT send entered values to a server, call a signup endpoint, write entered values or journey progress to durable browser storage, emit analytics containing the values, or claim durable waitlist membership. Form, success, survey-incomplete, and survey-complete states MAY exist only in temporary page memory and SHALL reset when the page is reloaded.

#### Scenario: Visitor completes the visual flow
- **WHEN** the simulated success state is shown and waitlist CTAs reflect the joined state
- **THEN** no network request or durable storage write contains the visitor's form values or journey progress

#### Scenario: Page reloads
- **WHEN** the visitor reloads the page after completing or partially completing the form or survey
- **THEN** entered values and simulated journey progress are not restored, and every waitlist CTA returns to the not-joined state

