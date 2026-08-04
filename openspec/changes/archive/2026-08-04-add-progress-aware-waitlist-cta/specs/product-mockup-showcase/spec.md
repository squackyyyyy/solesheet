## MODIFIED Requirements

### Requirement: Mockup content is realistic and scoped
Mockups SHALL use plausible Philippine sneaker-reseller examples, Philippine peso values, common shoe sizes, and the planned inventory and payment states. Upgrade mockup content that references the founding offer SHALL describe the same planned PHP 65 per month Starter offer for the first 50 eligible survey respondents during their first 12 paid months as the surrounding waitlist page and SHALL NOT imply guaranteed eligibility. Mockups SHALL NOT depict item-photo management, QR scanning, team administration, payment processing, or other deferred functionality as available in the first release.

#### Scenario: Dashboard data is shown
- **WHEN** a visitor views the dashboard mockup
- **THEN** the screen displays internally consistent examples for active pairs, inventory value, revenue or profit, and unpaid installment balance using peso formatting

#### Scenario: Installment workflow is shown
- **WHEN** a visitor views the installment setup and tracking mockups
- **THEN** the screens distinguish inventory status, payment status, cash collected, and remaining balance without suggesting that the app lends money or processes payments

#### Scenario: Upgrade offer is shown
- **WHEN** a visitor views founding-offer copy in the upgrade mockup
- **THEN** the copy identifies Starter as the eligible plan, limits the rate to the first 12 paid months for the first 50 eligible survey respondents, and remains framed as a planned offer rather than an available purchase or guaranteed reward
