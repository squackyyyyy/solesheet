## MODIFIED Requirements

### Requirement: Survey endpoint validates the complete request independently
The survey endpoint SHALL accept only its supported method and JSON content type, SHALL bound the request body and token, and SHALL reject malformed JSON, unknown fields, duplicate list values, unsupported answer values, missing core answers, over-limit text, and inconsistent Other details without writing any response. Primary phone platform, active inventory size, willingness-to-pay plan interest, and highest-value feature SHALL each contain one supported answer. Current inventory method, its applicable Other detail, and the remaining four follow-up questions SHALL remain optional. Other-detail text SHALL be trimmed, whitespace-only text SHALL become absent, and detail text SHALL be accepted only while its corresponding Other choice is selected.

#### Scenario: Visitor submits the required core only
- **WHEN** a valid request contains supported primary-phone, active-inventory-size, plan-interest, and highest-value-feature answers and omits current inventory method and every other follow-up and Other detail
- **THEN** the server accepts the omitted optional content without inventing values

#### Scenario: Required core answer is missing
- **WHEN** a request omits primary phone platform, active inventory size, plan interest, or highest-value feature
- **THEN** the server returns a safe validation error and writes neither a survey response nor sales channels

#### Scenario: Optional inventory method is omitted
- **WHEN** a valid request omits inventory method and inventory-method Other detail
- **THEN** the server accepts the omission without inventing either value

#### Scenario: Invalid option or text is submitted
- **WHEN** a request contains an answer outside the current allow-list, a repeated channel, an over-limit Other detail, or Other detail without its matching selection
- **THEN** the server returns a safe validation error and writes neither a survey response nor sales channels

#### Scenario: Unsupported request shape is submitted
- **WHEN** the endpoint receives an unsupported content type, oversized body, malformed JSON, unknown property, or invalid field type
- **THEN** it rejects the request without persisting submitted survey data

### Requirement: Survey storage remains private and operationally safe
Survey database access SHALL remain server-only, submitted values SHALL be bound separately from SQL text, and client failures SHALL expose neither stored answers, signup existence, SQL details, tokens, nor stack traces. Application diagnostics SHALL identify only coarse outcomes and non-personal request identifiers and SHALL NOT intentionally log survey answers, Other text, contact details, continuation tokens, or raw bodies. The published privacy notice SHALL explain that survey participation is optional, identify primary phone, active inventory size, willingness to pay, and highest-value feature as the four core answers required to submit a survey, identify current inventory method and the remaining follow-up and Other-detail fields as optional, and describe their product-research purpose, Cloudflare processing, retention approach, and access or deletion contact before the changed collection is enabled.

#### Scenario: Database operation fails
- **WHEN** the database binding or survey write is unavailable or fails
- **THEN** the client receives a generic retryable failure, no success is claimed, and submitted content and internal details are not exposed

#### Scenario: Survey failure is diagnosed
- **WHEN** an invalid request, authorization failure, or persistence failure is recorded for operations
- **THEN** diagnostics contain no survey answer, free text, email, name, continuation token, or raw request body

#### Scenario: Visitor reviews survey collection terms
- **WHEN** the production survey requires its reprioritized core answers
- **THEN** the linked privacy notice accurately distinguishes optional participation, required willingness-to-pay and other core answers, optional inventory method and follow-ups, and the active deletion process
