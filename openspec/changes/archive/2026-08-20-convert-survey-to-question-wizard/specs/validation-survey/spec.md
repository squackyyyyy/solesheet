## ADDED Requirements

### Requirement: Survey presents one question at a time
The survey SHALL present the four core questions as an ordered, one-question-at-a-time wizard: primary phone platform, active inventory size, current inventory method, and highest-value feature. It SHALL identify the current core position as **Question n of 4**, provide a visible progress indicator, and keep every question optional.

#### Scenario: Visitor opens the core survey
- **WHEN** the optional survey opens for the first time in a page session
- **THEN** only the primary-phone question is presented as **Question 1 of 4** with the progress indicator showing the first of four positions

#### Scenario: Visitor chooses a standard single-choice answer
- **WHEN** the visitor activates a standard answer before the final core question
- **THEN** the selected state remains perceptible briefly and the wizard advances once to the next core question without requiring a separate Next action

#### Scenario: Visitor selects Other
- **WHEN** the visitor selects **Other** for current inventory method or highest-value feature
- **THEN** the associated optional detail field appears on the same question and the wizard waits for an explicit navigation or completion action

#### Scenario: Visitor skips a core question
- **WHEN** the visitor activates the available skip or forward action without selecting an answer
- **THEN** the wizard advances without a validation error and leaves that question unanswered

#### Scenario: Visitor returns to an earlier core question
- **WHEN** the visitor activates Back
- **THEN** the previous question reappears with its temporary answer and any applicable Other detail preserved

#### Scenario: Visitor reaches the fourth core question
- **WHEN** the visitor arrives at or answers the highest-value-feature question
- **THEN** the wizard keeps continuing into the follow-up questions as the primary path, makes **Finish this survey** available as a low-emphasis exit, and does not complete automatically

#### Scenario: Visitor answers the fourth core question
- **WHEN** the visitor commits a standard highest-value-feature answer
- **THEN** the wizard advances once to the first follow-up question after the brief selected-state confirmation

### Requirement: Optional follow-ups remain separate and navigable
The likely pricing plan, installment-sales frequency, cloud-backup interest, sales channels, and follow-up-interview permission SHALL remain available as five explicitly optional follow-up questions presented one at a time. Optional progress SHALL be distinguishable from the four-question core progress through both its explicit optional wording and a muted blue visual treatment, and the visitor SHALL be able to return to earlier optional questions or the final core question without losing answers.

After the visitor reaches the fourth core question, **Finish this survey** SHALL remain available during the follow-up flow as a low-emphasis completion action. It SHALL become the primary action only on the final follow-up question.

#### Scenario: Visitor continues after the core questions
- **WHEN** the visitor chooses to answer optional follow-ups from the fourth core question
- **THEN** the likely-plan question appears as **Optional question 1 of 5** without marking any core or optional response as required

#### Scenario: Optional single-choice answer is committed
- **WHEN** the visitor activates a standard single-choice answer before the final optional question
- **THEN** the selected state remains perceptible briefly and the wizard advances once to the next optional question

#### Scenario: Visitor answers the multi-select sales-channel question
- **WHEN** the visitor selects or deselects one or more sales channels
- **THEN** the wizard remains on that question until the visitor explicitly continues so multiple choices and an optional Other detail can be edited

#### Scenario: Visitor reaches the final optional question
- **WHEN** the follow-up-interview question is presented
- **THEN** it describes a 15-minute interview, explains that the visitor will be messaged through the contact details used to join, and offers distinct choices for availability within two weeks, availability next month or later, receiving more details first, or declining
- **AND** the wizard provides **Finish quick survey** and Back actions and does not complete solely because an answer was selected

### Requirement: Wizard progress and question changes are accessible
The wizard SHALL expose the current position and total programmatically, move focus to each newly presented question heading, and announce meaningful progress changes. The persistent visual progress fill SHALL reveal from left to right as its width increases. Each newly presented question SHALL enter with a restrained upward movement from below and SHALL NOT use an opacity fade. Automatic advancement SHALL occur only after an answer is activated, not when an option merely receives focus. When reduced motion is requested, progress and question changes SHALL occur without nonessential animation.

#### Scenario: Pointer or keyboard visitor activates an answer
- **WHEN** the visitor commits a standard answer by tap, click, Space, or Enter
- **THEN** the option is selected once, the next question is presented once, and focus moves to its heading

#### Scenario: Visitor navigates backward
- **WHEN** the visitor activates Back
- **THEN** the prior question uses the backward transition direction and its heading receives focus

#### Scenario: Assistive technology reads progress
- **WHEN** a question is presented
- **THEN** the visitor can determine the current core or optional question number and total without relying on the visual progress bar alone

#### Scenario: Visitor requests reduced motion
- **WHEN** the device reports `prefers-reduced-motion: reduce`
- **THEN** the same questions, selected states, progress, and focus changes remain available without animated sliding or delayed navigation

### Requirement: Active-pair help remains recognizable as a link
The inventory-size question SHALL retain a separate **What pairs count as active?** link to the expanded FAQ definition. The help link SHALL use a conventional bold blue link treatment and opening it SHALL preserve the current survey position and temporary answers.

#### Scenario: Visitor opens active-pair help
- **WHEN** the visitor activates **What pairs count as active?** from the inventory-size question
- **THEN** the expanded FAQ definition opens separately and the survey retains its current position and temporary answers

## MODIFIED Requirements

### Requirement: Survey adapts to mobile and desktop presentation
The survey SHALL use one stable responsive height across all questions and completion states so its outer boundary does not resize during the flow. That height SHALL accommodate the tallest question when the viewport allows, remain below a viewport-safe maximum, appear as a bottom sheet on narrow viewports, and appear as a centered accessible dialog or equivalent focused surface on desktop. Its header, current-question body, and navigation footer SHALL occupy separate layout regions. The body MAY scroll when content, viewport height, orientation, zoom, or an onscreen keyboard requires it, but the opaque navigation footer SHALL remain outside that scrolling region, meet the bottom edge of the sheet without exposing question content beneath it, and include applicable device safe-area inset padding. In every presentation, focus SHALL be managed, closing SHALL remain available, and background interaction SHALL behave appropriately.

#### Scenario: Survey opens on mobile
- **WHEN** the survey is opened at 360px wide on a device with or without a bottom safe-area inset
- **THEN** controls are thumb-friendly, the stable-height sheet is bottom-aligned, the navigation footer forms its visible bottom edge, no question content appears below or through it, and the close action remains discoverable

#### Scenario: Mobile question exceeds available height
- **WHEN** a question, optional detail field, zoom level, orientation, or onscreen keyboard requires more vertical space than the body region provides
- **THEN** only the question body scrolls while the header and opaque navigation footer remain structurally separate and usable

#### Scenario: Survey opens on desktop
- **WHEN** the survey is opened on a desktop viewport
- **THEN** focus enters the dialog, the dialog has an accessible title and description, its body and footer do not overlap, and closing returns focus to the triggering control

### Requirement: Answers remain temporary
Survey answers, the active core-or-optional group, and the current question position SHALL be held only in temporary page memory for the current prototype session. They SHALL NOT be sent to a server, written to durable browser storage, or included in analytics, and they SHALL reset when the page reloads.

#### Scenario: Visitor changes an answer or question
- **WHEN** a visitor selects or changes a survey answer, skips, advances, or navigates backward
- **THEN** the visible prototype state updates without a data-bearing network request, analytics event, cookie, or durable storage write

#### Scenario: Visitor closes and reopens during the same page session
- **WHEN** a visitor closes and reopens the survey without reloading the page
- **THEN** the same question, temporary answers, and applicable Other details are restored

#### Scenario: Page reloads
- **WHEN** the visitor reloads after navigating or answering survey questions
- **THEN** previous answers, question position, and completion state are not restored from persistent storage

### Requirement: Survey provides a complete prototype ending
The survey SHALL provide a deliberate completion action after the fourth core question and after the final optional follow-up, and SHALL transition to an accessible thank-you state without recording a response. Selecting an answer alone SHALL NOT complete the survey.

#### Scenario: Visitor completes after the core questions
- **WHEN** the visitor activates **Finish this survey** on the fourth core question, whether answered or blank
- **THEN** the survey transitions to the accessible thank-you state without opening optional follow-ups or submitting answers

#### Scenario: Visitor completes after optional follow-ups
- **WHEN** the visitor activates **Finish this survey** during optional follow-ups, whether answered or blank
- **THEN** the survey transitions to the same accessible thank-you state without submitting answers or recording completion analytics

#### Scenario: Visitor selects the final answer
- **WHEN** the visitor selects an answer on the fourth core or fifth optional question
- **THEN** the selected state remains visible and the survey waits for the corresponding completion action
