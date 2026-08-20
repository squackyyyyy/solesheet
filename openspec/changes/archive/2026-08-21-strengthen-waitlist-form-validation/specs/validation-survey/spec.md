## MODIFIED Requirements

### Requirement: Survey captures prioritized validation signals
The survey SHALL support questions about primary phone platform, likely pricing plan, active inventory size, installment-sales frequency, current inventory method, highest-value feature, cloud-backup interest, sales channels, and permission for a follow-up interview. The current inventory method, highest-value feature, and sales-channel questions SHALL each include an **Other** choice that reveals an associated free-text detail control when selected. Current-inventory-method and sales-channel Other details SHALL be single-line and limited to 100 characters each. The highest-value-feature Other detail SHALL be a fixed-height multiline response limited to 300 characters with a visible associated character count. Whitespace-only Other details SHALL be treated as empty. Every question and Other-detail control SHALL remain optional, and the survey SHALL NOT request information about the reseller's buyers.

#### Scenario: Visitor answers only selected questions
- **WHEN** the visitor answers one or more questions and leaves others, including any visible Other-detail control, blank or whitespace-only
- **THEN** the answered values are accepted without requiring completion of unanswered questions or Other details

#### Scenario: Visitor selects Other for current inventory method
- **WHEN** the visitor selects Other for current inventory method
- **THEN** one clearly labeled single-line field associated with that question appears and accepts up to 100 characters of temporary free text

#### Scenario: Visitor explains another highest-value feature
- **WHEN** the visitor selects Other for highest-value feature
- **THEN** one clearly labeled fixed-height multiline field appears, accepts up to 300 characters without resizing the survey surface, and exposes its current character count

#### Scenario: Visitor selects Other as a sales channel
- **WHEN** the visitor selects Other for the multi-select sales-channel question
- **THEN** one clearly labeled single-line field associated with sales channels appears, accepts up to 100 characters, and does not clear any other selected channels

#### Scenario: Visitor reaches a free-text limit
- **WHEN** the visitor types or pastes beyond an Other detail's supported length
- **THEN** the temporary value does not exceed that field's limit and the wizard remains usable without horizontal overflow

#### Scenario: Visitor deselects Other
- **WHEN** the visitor changes a single-choice answer away from Other or deselects Other from sales channels
- **THEN** that question's Other-detail control is hidden and its temporary text is cleared while unrelated answers remain unchanged

#### Scenario: Prohibited buyer data
- **WHEN** the survey is rendered
- **THEN** no prompt asks for buyer names, buyer contact details, payment histories, or other buyer information
