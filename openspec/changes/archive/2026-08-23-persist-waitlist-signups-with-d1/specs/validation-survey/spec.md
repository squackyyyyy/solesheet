## ADDED Requirements

### Requirement: Survey follows a confirmed persisted signup
The existing optional survey SHALL open automatically after the server confirms the waitlist signup outcome, SHALL remain dismissible without an explicit encouragement to skip, and SHALL retain its temporary-answer behavior in this phase. It SHALL NOT open while the signup request is pending or after the request fails.

#### Scenario: Persisted signup succeeds
- **WHEN** the visitor reaches the signup success state after server confirmation
- **THEN** the optional survey opens at its first core question and the visitor can close it without affecting the stored signup

#### Scenario: Visitor closes the survey
- **WHEN** the visitor dismisses the automatically opened survey without finishing it
- **THEN** the signup success state remains available, the durable signup remains stored, and no validation error encourages the visitor to answer

#### Scenario: Signup is not confirmed
- **WHEN** the signup request is pending or has failed
- **THEN** the survey does not open

## REMOVED Requirements

### Requirement: Survey follows the simulated signup experience
**Reason**: The survey now follows a server-confirmed durable signup rather than a client-only simulated transition.
**Migration**: Use `Survey follows a confirmed persisted signup`; survey answers themselves remain temporary until the separate survey-persistence change.
