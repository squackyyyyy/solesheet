## MODIFIED Requirements

### Requirement: Survey completion uses the branded status sequence
The survey SHALL replace its question and footer controls with the branded loading state after any available **Finish this survey** action is activated. Loading SHALL remain visible while the real survey request is pending, prevent another completion action, and transition the same anchored status mark to success only after the server confirms the durable outcome. A failed request SHALL stop the pending presentation, retain the answers and question position, and expose a safe retry path without showing success.

#### Scenario: Visitor finishes after the core questions
- **WHEN** the visitor activates **Finish this survey** after the fourth core question
- **THEN** the dialog shows the branded loading state, prevents another completion action, submits the available answers, and shows branded success only after server confirmation

#### Scenario: Visitor finishes during optional questions
- **WHEN** the visitor activates **Finish this survey** from an optional question
- **THEN** the same loading-to-success sequence follows the real submission without requiring the remaining optional answers

#### Scenario: Submission wait remains accessible and stable
- **WHEN** the survey request is pending
- **THEN** assistive technology receives a concise submitting status, the dialog keeps its fixed wizard dimensions, and question navigation controls are unavailable

#### Scenario: Submission transitions continuously into success
- **WHEN** the server confirms the durable survey outcome
- **THEN** the same status mark remains visually anchored in place, changes from loading to success, and the completion content enters beneath it without resizing the dialog

#### Scenario: Submission fails
- **WHEN** the survey request fails before a confirmed durable outcome
- **THEN** the success treatment does not appear, the visitor receives an accessible retry message, and the question flow returns with its current answers intact
