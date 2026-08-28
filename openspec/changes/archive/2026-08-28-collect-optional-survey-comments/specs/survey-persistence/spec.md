## MODIFIED Requirements

### Requirement: Survey endpoint validates the complete request independently
The survey endpoint SHALL accept only its supported method and JSON content type, SHALL bound the request body and token, and SHALL reject malformed JSON, unknown fields, duplicate list values, unsupported answer values, missing core answers, over-limit text, and inconsistent Other details without writing any response. Primary phone platform, active inventory size, willingness-to-pay plan interest, and highest-value feature SHALL each contain one supported answer. Current inventory method, its applicable Other detail, the remaining five follow-up questions, and the additional comment SHALL remain optional. Free text SHALL be trimmed, whitespace-only text SHALL become absent, Other-detail text SHALL be accepted only while its corresponding Other choice is selected, and the additional comment SHALL contain no more than 500 characters.

#### Scenario: Visitor submits the required core only
- **WHEN** a valid request contains supported primary-phone, active-inventory-size, plan-interest, and highest-value-feature answers and omits current inventory method, every other follow-up, every Other detail, and the additional comment
- **THEN** the server accepts the omitted optional content without inventing values

#### Scenario: Required core answer is missing
- **WHEN** a request omits primary phone platform, active inventory size, plan interest, or highest-value feature
- **THEN** the server returns a safe validation error and writes neither a survey response nor sales channels

#### Scenario: Optional inventory method is omitted
- **WHEN** a valid request omits inventory method and inventory-method Other detail
- **THEN** the server accepts the omission without inventing either value

#### Scenario: Additional comment is normalized
- **WHEN** a valid request supplies an additional comment within 500 characters with leading or trailing whitespace
- **THEN** the server accepts its trimmed value, or omits it when trimming leaves no content

#### Scenario: Invalid option or text is submitted
- **WHEN** a request contains an answer outside the current allow-list, a repeated channel, an over-limit free-text value, or Other detail without its matching selection
- **THEN** the server returns a safe validation error and writes neither a survey response nor sales channels

#### Scenario: Unsupported request shape is submitted
- **WHEN** the endpoint receives an unsupported content type, oversized body, malformed JSON, unknown property, or invalid field type
- **THEN** it rejects the request without persisting submitted survey data

### Requirement: Finished survey is stored atomically once
The system SHALL store at most one survey response per waitlist signup. The response SHALL contain the submitted optional answer values, trimmed applicable Other details, a trimmed optional additional comment, submission and update timestamps, and a foreign-key relationship to the signup. Selected sales channels SHALL be stored as zero or more normalized child rows linked to that response. Creating the response, its channel rows, and the signup's survey-completion timestamp SHALL succeed or fail as one logical operation.

#### Scenario: Survey contains an additional comment
- **WHEN** a valid finished survey includes a non-empty supported additional comment
- **THEN** its trimmed value is stored on the one response linked to the signup

#### Scenario: Survey contains multiple sales channels
- **WHEN** a valid survey selects more than one offered sales channel
- **THEN** one response is stored for the signup and one linked child row is stored for each distinct selected channel

#### Scenario: Survey contains no sales channels or comment
- **WHEN** a valid finished survey omits the sales-channel and additional-comment questions
- **THEN** the response is stored successfully with no linked sales-channel rows and no invented comment

#### Scenario: A related write fails
- **WHEN** the response, any selected channel, or completion-marker write fails
- **THEN** the logical submission is not reported as successful and no partial survey result remains committed

#### Scenario: Signup relationship is invalid
- **WHEN** a request cannot resolve an existing signup from its validated continuation token
- **THEN** no orphan survey response or channel row is created

### Requirement: Survey storage remains private and operationally safe
Survey database access SHALL remain server-only, submitted values SHALL be bound separately from SQL text, and client failures SHALL expose neither stored answers, signup existence, SQL details, tokens, nor stack traces. Application diagnostics SHALL identify only coarse outcomes and non-personal request identifiers and SHALL NOT intentionally log survey answers, Other text, additional comments, contact details, continuation tokens, or raw bodies. The published privacy notice SHALL explain that survey participation is optional, identify primary phone, active inventory size, willingness to pay, and highest-value feature as the four core answers required to submit a survey, identify current inventory method, the remaining follow-ups, Other-detail fields, and the additional comment as optional, and describe their product-research purpose, Cloudflare processing, retention approach, and access or deletion contact before the changed collection is enabled.

#### Scenario: Database operation fails
- **WHEN** the database binding or survey write is unavailable or fails
- **THEN** the client receives a generic retryable failure, no success is claimed, and submitted content and internal details are not exposed

#### Scenario: Survey failure is diagnosed
- **WHEN** an invalid request, authorization failure, or persistence failure is recorded for operations
- **THEN** diagnostics contain no survey answer, free text, additional comment, email, name, continuation token, or raw request body

#### Scenario: Visitor reviews survey collection terms
- **WHEN** the production survey offers its additional optional comment
- **THEN** the linked privacy notice accurately distinguishes optional participation, required willingness-to-pay and other core answers, optional inventory method, follow-ups, Other details, and additional comment, and the active deletion process
