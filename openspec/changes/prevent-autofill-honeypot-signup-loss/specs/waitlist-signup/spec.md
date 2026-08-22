## ADDED Requirements

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
