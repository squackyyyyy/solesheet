# waitlist-signup Specification

## Purpose

Define an accessible waitlist interaction that validates visitor consent, confirms durable signup persistence, and leads into the optional product-research survey.

## Requirements

### Requirement: Signup prototype presents a realistic low-friction form
The waitlist SHALL present an optional name field, an email-address field, an unticked consent checkbox, concise privacy-link presentation, and one primary submit action. The optional name or reseller alias SHALL accept no more than 60 characters, whitespace-only input SHALL be treated as omitted, and any displayed confirmation name SHALL be trimmed and wrap without overflowing its container. The email field SHALL accept no more than 254 characters. The form SHALL NOT ask for or accept a mobile number as the signup contact method.

#### Scenario: Visitor reaches the form
- **WHEN** a visitor activates a primary waitlist call to action
- **THEN** the same signup form is revealed or focused with a clear accessible name and logical field order

#### Scenario: Visitor enters a valid contact
- **WHEN** a visitor enters a valid email address and checks the consent control
- **THEN** the primary action becomes ready to submit the signup request

#### Scenario: Visitor enters an optional name
- **WHEN** a visitor types or pastes a long name, reseller alias, or whitespace-only value
- **THEN** no more than 60 characters are retained, surrounding whitespace is omitted from the confirmation, and the confirmation layout does not overflow

### Requirement: Client-side validation is accessible
The waitlist SHALL validate the email field and consent control in the browser, SHALL prevent an email value longer than 254 characters from being submitted, SHALL preserve entered values when validation fails, and SHALL communicate email-specific errors through text and accessibility semantics rather than color alone. Passing browser validation SHALL NOT replace the server's independent validation.

#### Scenario: Contact is invalid
- **WHEN** a visitor activates submit without a valid email address, including when the value is a Philippine mobile number or exceeds the supported email length
- **THEN** focus moves to or identifies the email error and no signup request or success state occurs

#### Scenario: Consent is missing
- **WHEN** a visitor activates submit without checking the consent control
- **THEN** the consent error is announced and no signup request or success state occurs

### Requirement: Valid submission transitions only after durable signup succeeds
When the visible fields pass client-side validation, the waitlist SHALL submit them to the server, prevent repeated activation while the request is pending, and transition to the existing polished success state only after the server confirms the durable signup outcome. Pending, failure, retry, and success changes SHALL be announced to assistive technology.

#### Scenario: Signup request is pending
- **WHEN** a visitor submits valid fields and the server response has not completed
- **THEN** the submit control communicates progress, remains disabled against repeated activation, and the success state does not appear

#### Scenario: Signup request succeeds
- **WHEN** the server confirms either a newly stored signup or the generic idempotent outcome
- **THEN** the form transitions to the success confirmation and the optional survey opens automatically

#### Scenario: Signup request fails
- **WHEN** validation, network, binding, or database failure prevents a confirmed signup outcome
- **THEN** the form retains the visitor's entered values, presents a safe retryable error, and does not claim that the visitor joined

### Requirement: Human verification minimizes signup friction and preserves progress
The waitlist SHALL obtain human-verification evidence without presenting an always-visible verification control to routine visitors. When additional interaction is required, the form SHALL present an accessible checkbox rather than an image or text puzzle. The browser SHALL NOT send a signup request until verification evidence is available, and any incomplete, expired, blocked, or unsuccessful verification SHALL preserve the entered name, email, and consent state, communicate a safe retry action, and SHALL NOT transition to signup success.

#### Scenario: Routine visitor completes background verification
- **WHEN** the verification provider determines that no visitor interaction is required
- **THEN** the visitor sees no persistent verification widget and can submit the waitlist form normally

#### Scenario: Higher-risk visitor requires interaction
- **WHEN** the verification provider requires an explicit human action
- **THEN** an accessible checkbox appears within the signup flow without an image or text puzzle, and successful interaction allows submission to continue

#### Scenario: Verification is not ready or cannot complete
- **WHEN** verification is still pending, expires, is blocked, or reports an error
- **THEN** no signup request or success state occurs, the visitor's entered values remain intact, and the form communicates how to retry verification

#### Scenario: Verification failure is returned by the server
- **WHEN** the server cannot confirm the submitted verification evidence
- **THEN** the form retains the visitor's entered values, resets verification for a fresh attempt, presents a safe retryable message, and does not open the optional survey
