## MODIFIED Requirements

### Requirement: Dedicated privacy notice supports waitlist collection
The landing page SHALL link from both the waitlist consent copy and footer to a dedicated Privacy Notice at `/privacy`. The notice SHALL identify SoleSheet and a working privacy contact; describe collected and derived information, purposes, consent and withdrawal, recipients or recipient classes, possible international processing, retention, safeguards, data-subject rights, complaint options, material changes, and an effective version; and SHALL match any separately operated workflow that processes waitlist or survey information on SoleSheet's behalf. Before interview outreach through an email delivery provider and optional external appointment scheduler is enabled, the notice SHALL identify both providers; describe the recipient, message, booking-name-or-alias, accessible-email, appointment-time, event, confirmation, cancellation, meeting, and coarse delivery data they process; explain the narrow interview and product-research purpose; state whether open or click tracking occurs; describe provider and pseudonymous local campaign-metadata retention; explain that SoleSheet does not require a legal name for booking; and provide an effective stop-contact path. The consent link SHALL open separately so partially entered form values are not interrupted.

#### Scenario: Visitor reviews privacy before consenting
- **WHEN** a visitor activates the Privacy Notice link within the waitlist consent control
- **THEN** the complete notice opens in a separate browser context and the original form remains available

#### Scenario: Visitor uses the footer
- **WHEN** a visitor activates the footer Privacy link
- **THEN** the browser navigates to `/privacy` and presents the same complete notice

#### Scenario: Privacy practices change
- **WHEN** actual collected or derived fields, purposes, providers, processing workflows, tracking behavior, retention, safeguards, or contact details materially change
- **THEN** the Privacy Notice is versioned and updated to match the real processing behavior before the changed processing is enabled

#### Scenario: Interview outreach disclosure is staged
- **WHEN** SoleSheet prepares to enable the separate local Interview Outreach workflow through Resend
- **THEN** the deployed notice first names Resend, describes the limited recipient, message, and delivery data it processes, states that open and click tracking are disabled, explains the reply and privacy-contact withdrawal path, and distinguishes Resend and local campaign-metadata retention from D1 retention

#### Scenario: Optional appointment booking is disclosed
- **WHEN** an interview-agreement or requested-details message offers a Google Calendar booking-page link
- **THEN** the deployed notice first names Google Calendar as the scheduling provider, describes the booking name or alias, accessible email address, selected time, event, confirmation, cancellation, and meeting information it processes, and explains that the respondent submits those details directly when choosing to book

#### Scenario: Booking minimizes the participant name
- **WHEN** a respondent reviews what is required to schedule an interview
- **THEN** the notice and booking instructions state that SoleSheet does not require a legal name, an alias or shop name may be used in Google's required name fields, and an accessible email address is needed for confirmation and meeting details

#### Scenario: Outreach remains research scoped
- **WHEN** a respondent reads why SoleSheet may send an interview or requested-details message
- **THEN** the notice ties the message to the respondent's waitlist and optional interview choice without claiming consent to unrestricted advertising, newsletters, behavioral profiling, or engagement analytics
