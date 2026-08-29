## ADDED Requirements

### Requirement: Waitlist promise is explicit and non-guaranteeing
The signup decision surface SHALL explain that joining permits the SoleSheet validation and early-access contact described by the consent and Privacy Policy, requires no payment, and leads to an optional product survey after the email is saved. It SHALL state that joining records interest but does not itself guarantee product access, a launch date, founding-offer eligibility, or a reserved price. The planned PHP 65 founding Starter direction SHALL remain visible for pricing validation, while its eligibility and redemption rules SHALL be identified as pending confirmation before launch.

#### Scenario: Visitor evaluates the signup
- **WHEN** a visitor reads the final signup card before providing an email address
- **THEN** the visitor can tell what contact they are agreeing to, that the following survey is optional, that no payment is collected, and that joining is not a guaranteed reservation

#### Scenario: Visitor evaluates the founding offer
- **WHEN** a visitor reads the founding-offer presentation or its adjacent action
- **THEN** the price is framed as a planned validation-stage offer with later eligibility confirmation and the action does not claim guaranteed founding access

### Requirement: Preview evidence is visibly identified as illustrative
Every landing-page surface that presents fabricated seller counts, currency totals, balances, profits, inventory records, or workflow outcomes for demonstration SHALL place those values within a visibly labeled sample-data or product-preview context. The disclosure SHALL be readable without assistive technology, SHALL remain available on mobile and desktop, and SHALL not describe the values as customer results, business traction, live account data, or measured SoleSheet outcomes.

#### Scenario: Visitor sees summary metrics
- **WHEN** a visitor encounters the active-stock, monthly-profit, unpaid-balance, hero-dashboard, or workflow-preview values
- **THEN** a nearby visible disclosure makes clear that the numbers are illustrative sample data for the planned product

#### Scenario: Assistive technology reads a preview
- **WHEN** a screen-reader visitor reaches a product mockup with data-bearing accessible text
- **THEN** its accessible name or surrounding copy identifies it as a preview rather than a live customer account or verified result

### Requirement: Builder and launch-status trust signals remain honest
The landing page SHALL include a compact, owner-approved builder note that explains the practical reason SoleSheet is being built without claiming customers, testimonials, partnerships, credentials, or research participation that cannot be substantiated. Near the signup decision, the page SHALL identify SoleSheet as currently in validation, Android as the likely first platform rather than a confirmed launch commitment, and feedback from both Android and iPhone resellers as relevant to the final platform decision.

#### Scenario: Visitor looks for the people behind the product
- **WHEN** a visitor reaches the trust content near the final conversion area
- **THEN** the visitor can read a concise reason for building SoleSheet without encountering fabricated social proof or a required personal portrait

#### Scenario: iPhone visitor evaluates relevance
- **WHEN** an iPhone reseller reads the launch-status message
- **THEN** the message does not imply an iPhone release is confirmed or that the visitor's platform feedback is irrelevant

### Requirement: Footer presents SoleSheet as an operating product identity
The public footer SHALL identify the current SoleSheet brand and year without the word **concept**, SHALL retain navigation to the homepage, FAQ, and Privacy Policy, and SHALL publish `hello@solesheet.app` as the general contact through a working email link. Privacy rights and deletion requests SHALL continue using `privacy@solesheet.app`, while response-change or product-support requests SHALL use `support@solesheet.app`.

#### Scenario: Visitor reaches the footer
- **WHEN** a visitor reads the footer
- **THEN** the brand is presented without prototype-like **concept** wording and the visitor can contact the general branded address

#### Scenario: Visitor chooses a contact route
- **WHEN** a visitor needs general information, product support, or privacy assistance
- **THEN** the published copy directs them respectively to the hello, support, or privacy alias rather than treating those purposes as interchangeable

## MODIFIED Requirements

### Requirement: Calls to action are consistent and accessible
Primary waitlist calls to action SHALL use progress-aware behavior and SHALL move focus to or reveal the same signup experience. The hero, post-gallery product prompt, and pricing offer SHALL retain clear waitlist entry actions. The header action SHALL remain available on viewports where it is not immediately redundant with the hero but SHALL be omitted on narrow mobile viewports. Before signup, every primary entry action SHALL use **Join the waitlist** as its visible action promise; surrounding section copy MAY explain the local reason to join without renaming the action as guaranteed access or another offer. After signup, every action SHALL continue using the appropriate survey-incomplete or completed journey label and behavior. Keyboard focus, client-side validation feedback, landmarks, heading order, color contrast, and reduced-motion preferences SHALL be supported.

#### Scenario: Keyboard visitor activates hero CTA
- **WHEN** a keyboard visitor focuses and activates the primary hero call to action
- **THEN** focus moves to the signup form or the signup form opens with an accessible name and visible focus placement

#### Scenario: Visitor reaches the end of the core product proof
- **WHEN** a visitor finishes the core mobile product-preview gallery
- **THEN** the visitor encounters a concise waitlist prompt and a **Join the waitlist** action before continuing to later product and pricing sections

#### Scenario: Mobile visitor sees the first call to action
- **WHEN** a visitor opens the page on a narrow mobile viewport
- **THEN** the header presents the horizontal SoleSheet logo and the hero presents the primary waitlist action without a second adjacent header action competing with it

#### Scenario: Visitor compares initial entry actions
- **WHEN** a visitor encounters the header, hero, product-prompt, or founding-offer action before joining
- **THEN** each action says **Join the waitlist**, leads to the same signup experience, and does not imply a separate or guaranteed benefit

#### Scenario: CTA follows journey state
- **WHEN** the visitor has joined the waitlist or completed the survey in the current page session
- **THEN** every remaining waitlist action displays and performs the appropriate survey or completion state instead of reverting to its initial label

#### Scenario: Visitor requests reduced motion
- **WHEN** the visitor's device reports a reduced-motion preference
- **THEN** nonessential reveal, parallax, and carousel motion is removed while all content remains available
