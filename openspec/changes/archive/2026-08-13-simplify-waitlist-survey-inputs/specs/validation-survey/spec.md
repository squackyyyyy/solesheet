## MODIFIED Requirements

### Requirement: Survey captures prioritized validation signals
The survey SHALL support questions about primary phone platform, likely pricing plan, active inventory size, installment-sales frequency, current inventory method, highest-value feature, cloud-backup interest, sales channels, and permission for a follow-up interview. The current inventory method, highest-value feature, and sales-channel questions SHALL each include an **Other** choice that reveals an associated free-text detail field when selected. Every question and Other-detail field SHALL remain optional, and the survey SHALL NOT request information about the reseller's buyers.

#### Scenario: Visitor answers only selected questions
- **WHEN** the visitor answers one or more questions and leaves others, including any visible Other-detail field, blank
- **THEN** the answered values are accepted without requiring completion of unanswered questions or Other details

#### Scenario: Visitor selects Other for a single-choice question
- **WHEN** the visitor selects Other for current inventory method or highest-value feature
- **THEN** one clearly labeled text field associated with that question appears and accepts a temporary free-text response

#### Scenario: Visitor selects Other as a sales channel
- **WHEN** the visitor selects Other for the multi-select sales-channel question
- **THEN** one clearly labeled text field associated with sales channels appears without clearing any other selected channels

#### Scenario: Visitor deselects Other
- **WHEN** the visitor changes a single-choice answer away from Other or deselects Other from sales channels
- **THEN** that question's Other-detail field is hidden and its temporary text is cleared while unrelated answers remain unchanged

#### Scenario: Prohibited buyer data
- **WHEN** the survey is rendered
- **THEN** no prompt asks for buyer names, buyer contact details, payment histories, or other buyer information
