# validation-survey Specification

## Purpose

Define the optional post-signup validation survey, keeping unfinished answers temporary while persisting only responses the visitor deliberately finishes.

## Requirements

### Requirement: Survey follows a confirmed persisted signup
The existing optional survey SHALL open automatically only after the server confirms the waitlist signup outcome and supplies a valid survey continuation token. It SHALL remain dismissible without an explicit encouragement to skip and SHALL retain unsubmitted answers only in temporary page memory. It SHALL NOT open while the signup request is pending, after the request fails, or without the continuation token required to submit it.

#### Scenario: Persisted signup succeeds
- **WHEN** the visitor reaches the signup success state after server confirmation and receives a survey continuation token
- **THEN** the optional survey opens at its first core question and the visitor can close it without affecting the stored signup

#### Scenario: Visitor closes the survey
- **WHEN** the visitor dismisses the automatically opened survey without finishing it
- **THEN** the signup success state remains available, the durable signup remains stored, and no survey response or validation error encourages the visitor to answer

#### Scenario: Signup is not confirmed
- **WHEN** the signup request is pending, has failed, or does not provide a usable survey continuation token
- **THEN** the survey does not open

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
Survey answers, the active core-or-optional group, and the current question position SHALL remain only in temporary page memory until the visitor deliberately activates **Finish this survey**. Question selection, skipping, advancing, closing, and reopening SHALL NOT autosave answers, use durable browser storage, or emit data-bearing analytics. Finishing SHALL send the current normalized answer set once to the survey endpoint. A reload before confirmed submission SHALL discard the temporary answers; confirmed submitted answers SHALL remain durable in D1 without being restored into the browser wizard.

#### Scenario: Visitor changes an answer or question
- **WHEN** a visitor selects or changes a survey answer, skips, advances, or navigates backward
- **THEN** the visible state updates without a data-bearing network request, analytics event, cookie, or durable storage write

#### Scenario: Visitor closes and reopens during the same page session
- **WHEN** a visitor closes and reopens the survey without reloading or submitting it
- **THEN** the same question, temporary answers, applicable Other details, and continuation token remain available in page memory

#### Scenario: Visitor finishes the survey
- **WHEN** the visitor activates an available **Finish this survey** action
- **THEN** the browser submits the current normalized answer set once and does not submit omitted questions as invented answers

#### Scenario: Page reloads before submission succeeds
- **WHEN** the visitor reloads after navigating or answering questions but before the server confirms submission
- **THEN** previous answers, question position, and completion state are not restored from persistent browser storage

### Requirement: Survey provides a complete prototype ending
The survey SHALL provide a deliberate completion action after the fourth core question and throughout the optional follow-ups. Activating completion SHALL replace question navigation with an accessible pending state, prevent repeated activation, and transition to the existing thank-you state only after the server confirms the generic durable outcome. The thank-you state SHALL provide a clickable `solesheetph@gmail.com` contact for respondents who need to request a change to their submitted responses. Selecting an answer alone SHALL NOT complete or submit the survey. A validation, authorization, network, or database failure SHALL retain the current answers and position in page memory, present a safe retry action, and SHALL NOT mark the shared journey complete.

#### Scenario: Visitor completes after the core questions
- **WHEN** the visitor activates **Finish this survey** on the fourth core question, whether answered or blank
- **THEN** the survey submits the current answer set without requiring or opening the optional follow-ups and reaches thank-you only after server confirmation

#### Scenario: Visitor completes during optional follow-ups
- **WHEN** the visitor activates **Finish this survey** during an optional question, whether answered or blank
- **THEN** the survey submits all current core and optional answers without requiring the remaining questions and reaches the same confirmed thank-you state

#### Scenario: Visitor selects the final answer
- **WHEN** the visitor selects an answer on the fourth core or fifth optional question
- **THEN** the selected state remains visible and the survey waits for the corresponding completion action

#### Scenario: Survey submission fails
- **WHEN** the completion request is rejected or cannot receive a confirmed durable outcome
- **THEN** the thank-you state does not appear, the visitor's answers and position remain available, and a retry can submit them again

#### Scenario: Respondent wants to change a submitted response
- **WHEN** the confirmed thank-you state is shown
- **THEN** it explains that response-change requests can be emailed to `solesheetph@gmail.com` through a working email link
