## ADDED Requirements

### Requirement: Published aliases have distinct contact purposes
Public SoleSheet copy SHALL use `hello@solesheet.app` for general contact, `support@solesheet.app` for product or submitted-response assistance, and `privacy@solesheet.app` for privacy rights, deletion, consent withdrawal, and privacy-policy questions. Each address SHALL remain an inbound forwarding alias to the same verified destination and SHALL not be represented as providing branded outbound replies.

#### Scenario: Visitor requests general information
- **WHEN** a public page offers a general contact method
- **THEN** it presents a working `hello@solesheet.app` email link

#### Scenario: Respondent requests a submitted-response change
- **WHEN** a confirmed survey respondent is told how to request a correction to their submission
- **THEN** the instructions use a working `support@solesheet.app` email link rather than the privacy contact

#### Scenario: Visitor exercises a privacy right
- **WHEN** the Privacy Policy explains how to request access, correction, deletion, withdrawal, or other privacy assistance
- **THEN** it continues presenting a working `privacy@solesheet.app` email link
