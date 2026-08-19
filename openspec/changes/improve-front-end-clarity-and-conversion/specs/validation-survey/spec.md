## ADDED Requirements

### Requirement: Survey presents a short core step before optional follow-up
The survey SHALL present two ordered steps. The first step SHALL contain primary phone platform, active inventory size, current inventory method, and highest-value feature. The second step SHALL be labeled as optional and contain likely pricing plan, installment-sales frequency, cloud-backup interest, sales channels, and permission for a follow-up interview. Every question and Other-detail field SHALL remain optional.

#### Scenario: Visitor opens the survey
- **WHEN** the optional survey opens for the first time in a page session
- **THEN** the visitor sees the four core questions, concise **Step 1 of 2** progress, and guidance that the core step takes about 30 seconds

#### Scenario: Visitor continues to optional questions
- **WHEN** the visitor activates the action to continue from the core step
- **THEN** the survey shows the five optional follow-up questions as **Step 2 of 2** without requiring any core answer

#### Scenario: Visitor finishes after the core step
- **WHEN** the visitor chooses to finish without opening the optional follow-up step
- **THEN** the survey accepts any selected core answers and transitions to the existing accessible thank-you state

#### Scenario: Visitor returns from optional questions
- **WHEN** the visitor activates the Back action from the optional step
- **THEN** the four core questions reappear with all temporary core and optional answers preserved

#### Scenario: Visitor closes and reopens a step
- **WHEN** the visitor closes and reopens the incomplete survey during the same page session
- **THEN** the previously visible step and all temporary answers are restored

#### Scenario: Survey remains non-saving
- **WHEN** the visitor moves between steps or completes either path
- **THEN** no answer, step state, or completion state is sent to a server, written to durable browser storage, or included in analytics

### Requirement: Inventory-size question links to the active-pair definition
The inventory-size question SHALL provide an adjacent **What counts as active?** link that opens the landing page's stable `#faq-active-pairs` destination separately from the survey. The link SHALL NOT be nested inside the field label or interfere with selecting an inventory-size answer.

#### Scenario: Keyboard visitor requests the definition
- **WHEN** a keyboard visitor focuses and activates the active-pair help link
- **THEN** the FAQ destination opens separately, the link has visible focus, and the original survey retains its current step and answers

#### Scenario: Visitor ignores the definition link
- **WHEN** a visitor answers the inventory-size question without activating the help link
- **THEN** the link does not change the selected answer or add another required interaction
