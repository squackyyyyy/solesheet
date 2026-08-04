## MODIFIED Requirements

### Requirement: Page tells a complete validation-focused story
The page SHALL include a hero, product mockup showcase, key features, installment-tracking explanation, pricing preview, founding Starter offer, final waitlist call to action, supporting privacy-link presentation, and FAQ access. Pricing SHALL show the free direction, PHP 99 Starter direction, PHP 179 Growth direction, and a planned PHP 65 per month founding Starter offer for the first 50 eligible survey respondents during their first 12 paid months rather than presenting any price as available for purchase. Offer copy SHALL state that the offer applies only to Starter, ends after the first 12 paid months, and remains subject to eligibility and redemption confirmation before launch; it SHALL NOT promise that survey completion alone guarantees the discount.

#### Scenario: Visitor evaluates product fit
- **WHEN** a visitor scrolls through the landing page
- **THEN** the visitor can understand the spreadsheet problem, planned solution, core differentiators, pricing direction, founding Starter offer, and next step

#### Scenario: Visitor reviews pricing
- **WHEN** a visitor reaches the pricing preview
- **THEN** prices and plan limits are labeled as planned or subject to validation, the founding offer is limited to the first 50 eligible survey respondents for Starter's first 12 paid months, and no checkout action is presented

#### Scenario: Visitor compares founding-offer references
- **WHEN** a visitor encounters the founding offer in pricing, FAQ, survey, final call-to-action, or product-mockup content
- **THEN** each reference uses consistent scope and avoids the superseded “first 50–100 paying users” claim

### Requirement: Calls to action are consistent and accessible
Primary waitlist calls to action SHALL derive from one current-page progress state and SHALL present consistent wording and behavior across the header, hero, pricing, and final waitlist section. Before simulated signup, each CTA SHALL read “Join the waitlist” and SHALL move focus to or reveal the same signup prototype. After simulated signup and before survey completion, each CTA SHALL read “Answer the quick survey,” SHALL open or focus the optional survey with current-session answers intact, and SHALL be supported by copy that confirms the visitor is on the simulated waitlist and invites feedback. After survey completion, each CTA SHALL read “You’re all set — thank you,” SHALL be non-actionable, and SHALL communicate completion with a check icon or equivalent cue in addition to color. Progress changes, keyboard focus, client-side validation feedback, landmarks, heading order, color contrast, and reduced-motion preferences SHALL be accessible.

#### Scenario: Keyboard visitor activates hero CTA before joining
- **WHEN** a keyboard visitor focuses and activates the primary hero call to action before completing simulated signup
- **THEN** focus moves to the signup form or the signup form opens with an accessible name and visible focus placement

#### Scenario: Simulated signup updates every CTA
- **WHEN** a visitor completes the valid simulated signup transition
- **THEN** every waitlist CTA on the page changes to the survey-invitation wording and behavior without a page reload

#### Scenario: Joined visitor activates any CTA
- **WHEN** a visitor in the survey-incomplete state activates a waitlist CTA
- **THEN** the optional survey opens or receives focus and any answers entered during the current page session remain available

#### Scenario: Survey completion updates every CTA
- **WHEN** a visitor completes the optional survey prototype
- **THEN** every waitlist CTA changes to the non-actionable thank-you state, includes a non-color completion cue, and the state change is announced to assistive technology

#### Scenario: Visitor requests reduced motion
- **WHEN** the visitor's device reports a reduced-motion preference
- **THEN** nonessential reveal, parallax, and carousel motion is removed while all content and progress states remain available

