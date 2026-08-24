## ADDED Requirements

### Requirement: Confirmed signup supplies protected survey continuation
Every generic successful new-or-duplicate signup outcome SHALL include an opaque, integrity-protected continuation token that identifies the associated signup only to the server, is limited to survey submission, and expires after a documented short lifetime. The browser SHALL hold the token only in current-page memory and SHALL NOT receive the underlying signup record, contact data, database credentials, or token-signing secret.

#### Scenario: New signup is confirmed
- **WHEN** a newly accepted signup is stored successfully
- **THEN** the generic successful response includes a continuation token that can authorize that signup's optional survey

#### Scenario: Duplicate signup receives the generic outcome
- **WHEN** an already registered normalized email completes a valid signup request
- **THEN** the same response shape supplies a fresh continuation token without revealing that the signup already existed or changing its stored contact and consent evidence

#### Scenario: Continuation token leaves page memory
- **WHEN** the visitor reloads or leaves the current page before submitting the survey
- **THEN** the browser does not restore the continuation token from durable client storage

## REMOVED Requirements

### Requirement: Survey data remains outside this persistence phase

**Reason**: Phase 2 intentionally introduces server-side survey persistence after a confirmed waitlist signup.

**Migration**: Existing signup rows remain valid with no data rewrite; the new survey tables and continuation flow apply when a visitor deliberately finishes a survey.
