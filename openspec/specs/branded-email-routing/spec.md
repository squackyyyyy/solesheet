# branded-email-routing Specification

## Purpose

Provide trustworthy SoleSheet contact addresses on the product domain while forwarding inbound messages safely to the existing managed inbox without introducing a paid mailbox or application-level email processing.

## Requirements

### Requirement: SoleSheet exposes only approved branded inbound addresses
The email-routing configuration SHALL provide exact-address routes for `hello@solesheet.app`, `support@solesheet.app`, and `privacy@solesheet.app`, and SHALL keep catch-all routing disabled so unapproved or mistyped local parts are not silently forwarded.

#### Scenario: Sender contacts an approved address
- **WHEN** an external sender delivers a supported message to `hello@solesheet.app`, `support@solesheet.app`, or `privacy@solesheet.app`
- **THEN** Cloudflare accepts the message through the matching exact-address route

#### Scenario: Sender contacts an unconfigured address
- **WHEN** an external sender addresses a message to any other local part on `solesheet.app`
- **THEN** no catch-all route forwards that message to the destination inbox

### Requirement: Branded addresses forward to the verified existing inbox
Every approved branded route SHALL forward inbound messages to the verified `solesheetph@gmail.com` destination without requiring a new mailbox, an Email Worker, or application database storage.

#### Scenario: Approved message is routed
- **WHEN** Cloudflare accepts a supported inbound message for an approved branded address
- **THEN** the message arrives at the verified Gmail destination with its original sender, subject, body, and supported attachments available to the inbox operator

#### Scenario: Destination is not verified
- **WHEN** the Gmail destination has not completed Cloudflare destination verification
- **THEN** no branded route is considered operational or eligible for publication

### Requirement: Public contact details activate only after end-to-end verification
SoleSheet SHALL continue publishing the existing Gmail contact until an external delivery test for the corresponding branded address succeeds. After `privacy@solesheet.app` is verified end to end, all public privacy-contact links and visible privacy-contact text SHALL use that branded address consistently.

#### Scenario: Routing has not passed verification
- **WHEN** DNS, destination verification, route creation, or external delivery testing remains incomplete or unsuccessful
- **THEN** the deployed site continues to expose the working Gmail contact and does not claim that the branded address is available

#### Scenario: Privacy route passes verification
- **WHEN** a message sent from an unrelated external account to `privacy@solesheet.app` arrives in the verified Gmail inbox and can be identified as routed through the branded address
- **THEN** the public privacy notice may be deployed with `privacy@solesheet.app` as its contact address

### Requirement: Routing activation protects existing mail flow
Before Cloudflare Email Routing changes the domain's MX records, the operator SHALL inventory the active MX and related email-authentication records and SHALL stop activation if the apex domain depends on another inbound email provider without an approved migration plan. The routing setup SHALL document a rollback that restores the last known working public contact and inbound DNS configuration.

#### Scenario: Existing inbound provider is detected
- **WHEN** the preflight DNS inventory shows MX records used by Google Workspace or another external inbound mail provider
- **THEN** activation stops without replacing those records and the conflict is reported for a separate migration decision

#### Scenario: Routed delivery fails after activation
- **WHEN** one or more approved addresses stop delivering successfully
- **THEN** the operator can restore the Gmail contact on the site, disable the affected routes or Email Routing, and restore any recorded prior DNS state

### Requirement: Initial routing remains free and non-programmatic
The initial branded-address capability SHALL rely on Cloudflare's free inbound Email Routing and direct forwarding only. It SHALL NOT require outbound Email Sending, automatic replies, marketing delivery, message parsing or storage, a `send_email` binding, or an `email()` Worker handler.

#### Scenario: Deployment configuration is reviewed
- **WHEN** the completed change is inspected before release
- **THEN** the application contains no outbound email binding or Email Worker handler and the routing design has no recurring paid email dependency

#### Scenario: Future outbound or automated email is requested
- **WHEN** a later requirement calls for confirmations, reminders, campaigns, automatic replies, filtering, or ticket creation
- **THEN** that behavior is evaluated and approved as a separate change rather than being added implicitly to branded forwarding
