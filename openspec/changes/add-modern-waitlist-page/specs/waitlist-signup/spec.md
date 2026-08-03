## Purpose

Define a polished frontend waitlist interaction that demonstrates the intended signup experience without submitting or retaining visitor information.

## ADDED Requirements

### Requirement: Signup prototype presents a realistic low-friction form
The waitlist prototype SHALL present an optional name field, a field accepting an email address or Philippine mobile number, an unticked consent checkbox, concise privacy-link presentation, and one primary submit action.

#### Scenario: Visitor reaches the form
- **WHEN** a visitor activates a primary waitlist call to action
- **THEN** the same signup form is revealed or focused with a clear accessible name and logical field order

#### Scenario: Visitor enters a valid contact
- **WHEN** a visitor enters a valid email address or Philippine mobile number and checks the consent control
- **THEN** the submit action becomes ready for the simulated signup transition

### Requirement: Client-side validation is accessible
The prototype SHALL validate the contact field and consent control in the browser, preserve entered values when validation fails, and communicate errors through text and accessibility semantics rather than color alone.

#### Scenario: Contact is invalid
- **WHEN** a visitor activates submit without a valid email address or Philippine mobile number
- **THEN** focus moves to or identifies the contact error and the simulated success state does not appear

#### Scenario: Consent is missing
- **WHEN** a visitor activates submit without checking the consent control
- **THEN** the consent error is announced and the simulated success state does not appear

### Requirement: Valid submission transitions to a simulated success state
When the visible fields pass client-side validation, the prototype SHALL transition within the current page session to a polished success state and offer the optional survey flow. The transition SHALL prevent repeated activation while it is occurring and SHALL be announced to assistive technology.

#### Scenario: Simulated signup completes
- **WHEN** a visitor activates submit with valid contact information and consent
- **THEN** the form transitions to a success confirmation and presents an optional action to continue to the survey prototype

#### Scenario: Transition is in progress
- **WHEN** the simulated submit transition is active
- **THEN** the submit control communicates progress and cannot be activated repeatedly

### Requirement: Prototype does not submit or persist visitor data
The signup prototype SHALL NOT send entered values to a server, call a signup endpoint, write entered values to durable browser storage, emit analytics containing the values, or claim durable waitlist membership. Form and success state MAY exist only in temporary page memory and SHALL reset when the page is reloaded.

#### Scenario: Visitor completes the visual flow
- **WHEN** the simulated success state is shown
- **THEN** no network request or durable storage write contains the visitor's form values

#### Scenario: Page reloads
- **WHEN** the visitor reloads the page after completing or partially completing the form
- **THEN** entered values and simulated membership state are not restored from persistent storage
