## Purpose

Persist deliberately submitted SoleSheet validation surveys in D1 while securely linking each response to its confirmed waitlist signup and protecting optional answers from invalid or duplicate writes.

## ADDED Requirements

### Requirement: Survey submission is authorized by a confirmed signup
The survey endpoint SHALL accept a response only when it includes an opaque, time-limited continuation token issued after a confirmed new-or-duplicate waitlist signup. The server SHALL validate the token's integrity, purpose, and expiry before database access and SHALL derive the linked signup from that token rather than trusting a browser-supplied signup identifier. Missing, malformed, tampered, expired, or wrong-purpose tokens SHALL produce a safe failure and no database write.

#### Scenario: Confirmed signup submits its survey
- **WHEN** a visitor finishes the survey with a valid continuation token from the confirmed signup flow
- **THEN** the server resolves the intended signup and proceeds to validate and persist that survey

#### Scenario: Arbitrary signup identifier is supplied
- **WHEN** a visitor submits a guessed, altered, expired, or independently supplied signup reference without a valid continuation token
- **THEN** the server rejects the request without reading or writing survey records and does not reveal whether that signup exists

### Requirement: Survey endpoint validates the complete request independently
The survey endpoint SHALL accept only its supported method and JSON content type, SHALL bound the request body and token, and SHALL reject malformed JSON, unknown fields, duplicate list values, unsupported answer values, over-limit text, and inconsistent Other details without writing any response. Every question SHALL remain optional, including a survey with no selected answers. Other-detail text SHALL be trimmed, whitespace-only text SHALL become absent, and detail text SHALL be accepted only while its corresponding Other choice is selected.

#### Scenario: Visitor submits selected answers only
- **WHEN** a valid request contains any subset of the offered answers, including no answers
- **THEN** the server accepts the omitted questions without inventing values or requiring an Other detail

#### Scenario: Invalid option or text is submitted
- **WHEN** a request contains an answer outside the current allow-list, a repeated channel, an over-limit Other detail, or Other detail without its matching selection
- **THEN** the server returns a safe validation error and writes neither a survey response nor sales channels

#### Scenario: Unsupported request shape is submitted
- **WHEN** the endpoint receives an unsupported content type, oversized body, malformed JSON, unknown property, or invalid field type
- **THEN** it rejects the request without persisting submitted survey data

### Requirement: Finished survey is stored atomically once
The system SHALL store at most one survey response per waitlist signup. The response SHALL contain the submitted optional answer values, trimmed applicable Other details, submission and update timestamps, and a foreign-key relationship to the signup. Selected sales channels SHALL be stored as zero or more normalized child rows linked to that response. Creating the response, its channel rows, and the signup's survey-completion timestamp SHALL succeed or fail as one logical operation.

#### Scenario: Survey contains multiple sales channels
- **WHEN** a valid survey selects more than one offered sales channel
- **THEN** one response is stored for the signup and one linked child row is stored for each distinct selected channel

#### Scenario: Survey contains no sales channels
- **WHEN** a valid finished survey omits the sales-channel question
- **THEN** the response is stored successfully with no linked sales-channel rows

#### Scenario: A related write fails
- **WHEN** the response, any selected channel, or completion-marker write fails
- **THEN** the logical submission is not reported as successful and no partial survey result remains committed

#### Scenario: Signup relationship is invalid
- **WHEN** a request cannot resolve an existing signup from its validated continuation token
- **THEN** no orphan survey response or channel row is created

### Requirement: Repeated completion is idempotent
After a survey has been stored for a signup, another valid completion request for that signup SHALL return the same generic successful outcome, SHALL NOT create duplicate response or channel rows, and SHALL NOT overwrite the originally submitted answers or completion timestamp.

#### Scenario: Successful request is retried
- **WHEN** the browser repeats a valid completion request after the first response was committed but its response was lost
- **THEN** the endpoint confirms the generic successful outcome and the database still contains the original single response and channel set

#### Scenario: Concurrent completion requests arrive
- **WHEN** two valid completion requests for the same signup overlap
- **THEN** at most one submitted answer set becomes durable and neither request exposes whether it won the race

### Requirement: Survey storage remains private and operationally safe
Survey database access SHALL remain server-only, submitted values SHALL be bound separately from SQL text, and client failures SHALL expose neither stored answers, signup existence, SQL details, tokens, nor stack traces. Application diagnostics SHALL identify only coarse outcomes and non-personal request identifiers and SHALL NOT intentionally log survey answers, Other text, contact details, continuation tokens, or raw bodies. The published privacy notice SHALL describe the stored optional survey fields, their product-research purpose, Cloudflare processing, retention approach, and access or deletion contact before production collection begins.

#### Scenario: Database operation fails
- **WHEN** the database binding or survey write is unavailable or fails
- **THEN** the client receives a generic retryable failure, no success is claimed, and submitted content and internal details are not exposed

#### Scenario: Survey failure is diagnosed
- **WHEN** an invalid request, authorization failure, or persistence failure is recorded for operations
- **THEN** diagnostics contain no survey answer, free text, email, name, continuation token, or raw request body

#### Scenario: Visitor reviews survey collection terms
- **WHEN** the production survey can write answers to D1
- **THEN** the linked privacy notice accurately describes the active survey collection and deletion process
