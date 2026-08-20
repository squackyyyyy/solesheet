## MODIFIED Requirements

### Requirement: Signup prototype presents a realistic low-friction form
The waitlist prototype SHALL present an optional name field, an email-address field, an unticked consent checkbox, concise privacy-link presentation, and one primary submit action. The optional name or reseller alias SHALL accept no more than 60 characters, whitespace-only input SHALL be treated as omitted, and any displayed confirmation name SHALL be trimmed and wrap without overflowing its container. The email field SHALL accept no more than 254 characters. The form SHALL NOT ask for or accept a mobile number as the signup contact method.

#### Scenario: Visitor reaches the form
- **WHEN** a visitor activates a primary waitlist call to action
- **THEN** the same signup form is revealed or focused with a clear accessible name and logical field order

#### Scenario: Visitor enters a valid contact
- **WHEN** a visitor enters a valid email address and checks the consent control
- **THEN** the submit action becomes ready for the simulated signup transition

#### Scenario: Visitor enters an optional name
- **WHEN** a visitor types or pastes a long name, reseller alias, or whitespace-only value
- **THEN** no more than 60 characters are retained, surrounding whitespace is omitted from the confirmation, and the confirmation layout does not overflow

### Requirement: Client-side validation is accessible
The prototype SHALL validate the email field and consent control in the browser, SHALL prevent an email value longer than 254 characters from entering the simulated flow, SHALL preserve entered values when validation fails, and SHALL communicate email-specific errors through text and accessibility semantics rather than color alone.

#### Scenario: Contact is invalid
- **WHEN** a visitor activates submit without a valid email address, including when the value is a Philippine mobile number or exceeds the supported email length
- **THEN** focus moves to or identifies the email error and the simulated success state does not appear

#### Scenario: Consent is missing
- **WHEN** a visitor activates submit without checking the consent control
- **THEN** the consent error is announced and the simulated success state does not appear
