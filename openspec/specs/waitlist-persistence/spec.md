# waitlist-persistence Specification

## Purpose

Persist genuine SoleSheet waitlist interest through a secure server-side contract while preserving consent evidence, preventing duplicate contacts, and avoiding exposure of personal data.

## Requirements

### Requirement: Accepted signup is stored as one durable record
The system SHALL store each newly accepted waitlist signup with a generated identifier, the trimmed submitted email, a trimmed lowercase normalized email, an optional normalized name or reseller alias, the consent timestamp, the effective privacy-policy version, and creation and update timestamps. The normalized email SHALL be unique across signup records, and the stored field lengths SHALL enforce the same 60-character name and 254-character email limits exposed by the form.

#### Scenario: New signup is accepted
- **WHEN** the server receives a valid email, an optional valid name, and affirmative consent
- **THEN** one durable signup record is created with the submitted contact, normalized contact, consent evidence, policy version, and timestamps

#### Scenario: Optional name is omitted
- **WHEN** the submitted name is absent or contains only whitespace
- **THEN** the signup is stored without a name and without a whitespace-only value

#### Scenario: Equivalent email spellings are submitted
- **WHEN** email values differ only by surrounding whitespace or letter casing
- **THEN** they resolve to the same normalized email identity

### Requirement: Signup endpoint validates independently from the browser
The server SHALL accept waitlist signup requests only through the supported method and content type, SHALL bound the request size, and SHALL validate every submitted field without relying on browser validation. It SHALL reject malformed JSON, unknown or invalid field shapes, missing consent, invalid email addresses, and values beyond supported limits without writing a signup record.

#### Scenario: Browser validation is bypassed
- **WHEN** a request directly submits an invalid email, missing consent, or an over-limit field
- **THEN** the server returns a safe validation response and no signup record is written

#### Scenario: Unsupported request is sent
- **WHEN** a client uses an unsupported method, content type, or unreasonably large request body
- **THEN** the server rejects the request without parsing or persisting personal information beyond what is necessary to handle it

### Requirement: Duplicate signup is idempotent and private
Submitting an email whose normalized value already exists SHALL produce the same user-facing success outcome as a new signup, SHALL NOT create another record, SHALL NOT reveal that the email was already registered, and SHALL NOT overwrite the original email, optional name, or consent evidence.

#### Scenario: Existing normalized email is submitted again
- **WHEN** a valid request uses an email whose normalized value already belongs to a signup
- **THEN** the request receives the generic successful outcome and the database still contains exactly one unchanged signup record for that normalized email

### Requirement: Database access remains server-only
The browser SHALL communicate through the waitlist endpoint and SHALL NOT receive database credentials, privileged Cloudflare tokens, raw SQL errors, internal stack traces, stored signup records, or an indication that a particular email exists. Database queries SHALL bind submitted values separately from SQL text, and application logs SHALL NOT intentionally include submitted names or emails.

#### Scenario: Database operation fails
- **WHEN** the database binding, query, or migration is unavailable or fails
- **THEN** the client receives a generic retryable failure, no success is claimed, and internal database details and submitted form contents are not exposed

#### Scenario: Malicious SQL text is submitted as a field value
- **WHEN** a form field contains SQL syntax or control characters
- **THEN** the value is handled as bound input and cannot alter the intended database statement

### Requirement: Collection matches the published privacy notice
Before production signup persistence is enabled, the public privacy notice SHALL accurately describe the collected signup fields, purposes, Cloudflare-backed storage or processing, retention approach, consent withdrawal, and access or deletion contact. Every stored signup SHALL identify the policy version effective when consent was submitted.

#### Scenario: Visitor reviews privacy terms before joining
- **WHEN** the production waitlist form can write to D1
- **THEN** its linked privacy notice describes the active data practice and exposes an effective version that can be associated with the signup

### Requirement: Survey data remains outside this persistence phase
The signup persistence capability SHALL NOT store survey answers, survey navigation state, website traffic events, or interview responses in this phase.

#### Scenario: Persisted signup enters the survey
- **WHEN** a stored signup proceeds into, answers, or closes the existing survey
- **THEN** only the waitlist signup remains durable and the survey state continues to follow the temporary-storage requirements of the survey capability
