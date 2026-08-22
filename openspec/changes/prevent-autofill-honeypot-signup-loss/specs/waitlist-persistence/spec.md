## ADDED Requirements

### Requirement: Signup persistence requires server-verified anti-automation evidence
Every waitlist request SHALL include bounded anti-automation evidence that the server independently validates with the configured verification provider before reading or writing D1. Validation SHALL use a server-only secret and SHALL confirm a successful, unexpired, single-use result; production validation SHALL additionally confirm the expected action and request hostname. Missing, malformed, invalid, expired, replayed, or mismatched evidence SHALL produce a safe retryable response and no signup record. Verification-provider or configuration failure SHALL fail closed with a generic service-unavailable response and no signup record.

#### Scenario: Valid verification evidence accompanies a new signup
- **WHEN** the server receives valid signup fields and successfully verifies the accompanying evidence for the expected action and hostname
- **THEN** the request continues through duplicate handling and durable D1 persistence

#### Scenario: Verification evidence is missing or rejected
- **WHEN** verification evidence is absent, malformed, invalid, expired, replayed, or does not match the expected production action or hostname
- **THEN** the server returns a safe retryable verification failure and does not read or write the signup database

#### Scenario: Verification provider or secret is unavailable
- **WHEN** the server cannot contact the verification provider or the required server secret is unavailable
- **THEN** the server returns a generic service-unavailable response, records no signup, and exposes neither configuration nor provider details

#### Scenario: Verification diagnostics are recorded
- **WHEN** verification fails or the provider is unavailable
- **THEN** structured diagnostics may identify the outcome and a request identifier but SHALL NOT include the submitted email, name, verification token, provider secret, or raw request body

#### Scenario: Local and automated verification uses provider test credentials
- **WHEN** the signup flow runs on localhost or in automated tests
- **THEN** official provider test credentials produce deterministic verification without being accepted as production credentials
