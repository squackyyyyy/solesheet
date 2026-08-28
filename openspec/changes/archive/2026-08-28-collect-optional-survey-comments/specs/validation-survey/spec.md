## MODIFIED Requirements

### Requirement: Survey captures prioritized validation signals
The survey SHALL support questions about primary phone platform, likely pricing plan or willingness to pay, active inventory size, installment-sales frequency, current inventory method, highest-value feature, cloud-backup interest, sales channels, permission for a follow-up interview, and any additional comment the respondent chooses to share. Primary phone platform, active inventory size, willingness to pay based on the website demo, and highest-value feature SHALL form the required core answer set for a deliberately finished survey. Current inventory method and the remaining five follow-up questions SHALL remain optional. The current inventory method, highest-value feature, and sales-channel questions SHALL each include an **Other** choice that reveals an associated optional free-text detail control when selected. Current-inventory-method and sales-channel Other details SHALL be single-line and limited to 100 characters each. The highest-value-feature Other detail SHALL be a fixed-height multiline response limited to 300 characters with a visible associated character count. The additional-comment question SHALL use a fixed-height multiline response limited to 500 characters with a visible associated character count and concise guidance not to include sensitive or customer information. Whitespace-only free text SHALL be treated as empty. The survey SHALL NOT request information about the reseller's buyers.

#### Scenario: Visitor completes the required core
- **WHEN** the visitor selects one supported answer for primary phone, active inventory size, willingness to pay, and highest-value feature
- **THEN** the visitor can deliberately finish the survey without answering current inventory method or any other follow-up or Other-detail control

#### Scenario: Visitor omits a core answer
- **WHEN** the visitor attempts to finish without answering one or more required core questions
- **THEN** submission does not begin and the wizard identifies and returns to the first unanswered core question

#### Scenario: Visitor leaves optional content blank
- **WHEN** the visitor leaves current inventory method, another follow-up question, an additional comment, or a visible Other-detail control blank or whitespace-only
- **THEN** the completed core answers remain eligible for submission and blank optional content is omitted

#### Scenario: Visitor selects Other for current inventory method
- **WHEN** the visitor selects Other for current inventory method
- **THEN** one clearly labeled single-line field associated with that question appears and accepts up to 100 characters of temporary free text

#### Scenario: Visitor explains another highest-value feature
- **WHEN** the visitor selects Other for highest-value feature
- **THEN** one clearly labeled fixed-height multiline field appears, accepts up to 300 characters without resizing the survey surface, and exposes its current character count

#### Scenario: Visitor selects Other as a sales channel
- **WHEN** the visitor selects Other for the multi-select sales-channel question
- **THEN** one clearly labeled single-line field associated with sales channels appears, accepts up to 100 characters, and does not clear any other selected channels

#### Scenario: Visitor shares an additional comment
- **WHEN** the visitor enters text in the final optional comment question
- **THEN** the field accepts up to 500 characters, exposes its current character count, remains within the stable survey surface, and reminds the visitor not to include sensitive or customer information

#### Scenario: Visitor reaches a free-text limit
- **WHEN** the visitor types or pastes beyond a free-text field's supported length
- **THEN** the temporary value does not exceed that field's limit and the wizard remains usable without horizontal overflow

#### Scenario: Visitor deselects Other
- **WHEN** the visitor changes a single-choice answer away from Other or deselects Other from sales channels
- **THEN** that question's Other-detail control is hidden and its temporary text is cleared while unrelated answers remain unchanged

#### Scenario: Prohibited buyer data
- **WHEN** the survey is rendered
- **THEN** no prompt asks for buyer names, buyer contact details, payment histories, or other buyer information

### Requirement: Survey presents one question at a time
The survey SHALL present the four required core questions as an ordered, one-question-at-a-time wizard: primary phone platform, active inventory size, willingness to pay based on the website demo, and highest-value feature. It SHALL identify the current core position as **Question n of 4**, provide a visible progress indicator, and communicate before completion that these four answers are required while later follow-ups are optional.

#### Scenario: Visitor opens the core survey
- **WHEN** the optional survey opens for the first time in a page session
- **THEN** only the primary-phone question is presented as **Question 1 of 4** with the progress indicator showing the first of four positions and concise required-core guidance

#### Scenario: Visitor reaches the willingness-to-pay question
- **WHEN** the visitor completes the first two core questions
- **THEN** question three asks what the visitor would be willing to pay for SoleSheet based on the website demo and presents the supported price-aligned choices

#### Scenario: Visitor chooses a standard single-choice answer
- **WHEN** the visitor activates a standard answer before the final core question
- **THEN** the selected state remains perceptible briefly and the wizard advances once to the next core question without requiring a separate Next action

#### Scenario: Visitor selects Other for highest-value feature
- **WHEN** the visitor selects **Other** on the fourth core question
- **THEN** the associated optional detail field appears on the same question and the wizard waits for an explicit navigation or completion action

#### Scenario: Visitor has not answered the current core question
- **WHEN** the current required core question has no selected answer
- **THEN** the wizard does not offer a skip path that advances beyond it

#### Scenario: Visitor returns to an earlier core question
- **WHEN** the visitor activates Back
- **THEN** the previous question reappears with its temporary answer and any applicable Other detail preserved

#### Scenario: Visitor answers the fourth core question
- **WHEN** the visitor commits a supported highest-value-feature answer other than Other
- **THEN** the selected state remains perceptible briefly and the wizard advances once to **Optional question 1 of 6** without submitting the survey
- **AND** **Finish this survey** is available as a lower-emphasis action while the visitor can continue answering follow-ups

### Requirement: Optional follow-ups remain separate and navigable
Current inventory method, installment-sales frequency, cloud-backup interest, sales channels, follow-up-interview permission, and an additional comment SHALL remain available as six explicitly optional follow-up questions presented one at a time after the required core is complete. Optional progress SHALL be distinguishable from the four-question core progress through both its explicit optional wording and a muted blue visual treatment, and the visitor SHALL be able to return to earlier optional questions or the final core question without losing answers. **Finish this survey** SHALL remain available during the follow-up flow as a low-emphasis completion action and SHALL become the primary action only on the final additional-comment question.

#### Scenario: Visitor enters the optional questions
- **WHEN** the visitor completes question four with a supported standard answer
- **THEN** current inventory method appears as **Optional question 1 of 6** without marking it or another follow-up response as required

#### Scenario: Visitor selects an inventory method
- **WHEN** the visitor activates a standard current-inventory-method answer
- **THEN** the selected state remains perceptible briefly and the wizard advances once to the installment-sales-frequency question

#### Scenario: Visitor selects Other as the inventory method
- **WHEN** the visitor activates **Other** for current inventory method
- **THEN** its optional detail field remains available on that question until the visitor explicitly continues, skips, or finishes

#### Scenario: Optional single-choice answer is committed
- **WHEN** the visitor activates a standard single-choice answer before the final optional question
- **THEN** the selected state remains perceptible briefly and the wizard advances once to the next optional question

#### Scenario: Visitor answers the multi-select sales-channel question
- **WHEN** the visitor selects or deselects one or more sales channels
- **THEN** the wizard remains on that question until the visitor explicitly continues so multiple choices and an optional Other detail can be edited

#### Scenario: Visitor reaches the interview question
- **WHEN** the follow-up-interview question is presented
- **THEN** it describes a 15-minute interview, explains that the visitor will be messaged through the contact details used to join, and offers distinct choices for availability within two weeks, availability next month or later, receiving more details first, or declining
- **AND** committing one choice advances to the final optional comment without completing the survey

#### Scenario: Visitor reaches the final optional question
- **WHEN** the additional-comment question is presented
- **THEN** the wizard provides a bounded optional multiline field, **Finish this survey**, and Back actions and does not require a comment to complete

### Requirement: Survey provides a complete prototype ending
The survey SHALL provide a deliberate completion action after the fourth core question and throughout the optional follow-ups. Activating completion SHALL replace question navigation with an accessible pending state, prevent repeated activation, and transition to the existing thank-you state only after the server confirms the generic durable outcome. The thank-you state SHALL provide a clickable `solesheetph@gmail.com` contact for respondents who need to request a change to their submitted responses. Selecting an answer or entering a comment alone SHALL NOT complete or submit the survey. A validation, authorization, network, or database failure SHALL retain the current answers and position in page memory, present a safe retry action, and SHALL NOT mark the shared journey complete.

#### Scenario: Visitor completes immediately after the core questions
- **WHEN** the visitor activates **Finish this survey** on the first optional question after all four core answers are present
- **THEN** the survey submits the current answer set without requiring a follow-up answer and reaches thank-you only after server confirmation

#### Scenario: Visitor completes during optional follow-ups
- **WHEN** the visitor activates **Finish this survey** during an optional question
- **THEN** the survey submits all current core and optional answers without requiring the remaining questions and reaches the same confirmed thank-you state

#### Scenario: Visitor completes on the final optional question
- **WHEN** the visitor leaves the additional comment blank or enters a supported comment and activates **Finish this survey**
- **THEN** the current answer set is submitted once and completion does not depend on the optional comment being present

#### Scenario: Survey submission fails
- **WHEN** the completion request is rejected or cannot receive a confirmed durable outcome
- **THEN** the thank-you state does not appear, the visitor's answers and position remain available, and a retry can submit them again

#### Scenario: Respondent wants to change a submitted response
- **WHEN** the confirmed thank-you state is shown
- **THEN** it explains that response-change requests can be emailed to `solesheetph@gmail.com` through a working email link
