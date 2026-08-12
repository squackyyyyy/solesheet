## MODIFIED Requirements

### Requirement: Signup prototype presents a realistic low-friction form
The waitlist prototype SHALL present an optional name field, an email-address field, an unticked consent checkbox, concise privacy-link presentation, and one primary submit action. The form SHALL NOT ask for or accept a mobile number as the signup contact method.

#### Scenario: Visitor reaches the form
- **WHEN** a visitor activates a primary waitlist call to action
- **THEN** the same signup form is revealed or focused with a clear accessible name and logical field order

#### Scenario: Visitor enters a valid contact
- **WHEN** a visitor enters a valid email address and checks the consent control
- **THEN** the submit action becomes ready for the simulated signup transition

### Requirement: Client-side validation is accessible
The prototype SHALL validate the email field and consent control in the browser, preserve entered values when validation fails, and communicate email-specific errors through text and accessibility semantics rather than color alone.

#### Scenario: Contact is invalid
- **WHEN** a visitor activates submit without a valid email address, including when the value is a Philippine mobile number
- **THEN** focus moves to or identifies the email error and the simulated success state does not appear

#### Scenario: Consent is missing
- **WHEN** a visitor activates submit without checking the consent control
- **THEN** the consent error is announced and the simulated success state does not appear
