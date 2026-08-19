## MODIFIED Requirements

### Requirement: Product positioning is immediately understandable
The page SHALL identify the product as an upcoming mobile inventory and profit tracker for Philippine shoe resellers, SHALL use **Being built for Filipino resellers** as the hero trust line, and SHALL foreground faster updates, profit clarity, and installment tracking without implying that the app is already released or that completed reseller collaboration has occurred.

#### Scenario: First mobile viewport
- **WHEN** a visitor opens the page at a 360px-wide viewport
- **THEN** the visitor can identify the intended audience, primary value proposition, upcoming status, and a waitlist action without horizontal scrolling

#### Scenario: Product availability language
- **WHEN** a visitor reads the hero, pricing, and calls to action
- **THEN** the copy consistently describes the product as being built, planned, in development, or available through future early access

### Requirement: Calls to action are consistent and accessible
Primary waitlist calls to action SHALL use consistent progress-aware wording and SHALL move focus to or reveal the same signup prototype. In addition to the existing header, hero, pricing, and final-section actions, the page SHALL provide a responsive waitlist action immediately after the core mobile product-preview gallery and before the installment differentiator. Keyboard focus, client-side validation feedback, landmarks, heading order, color contrast, and reduced-motion preferences SHALL be supported.

#### Scenario: Keyboard visitor activates hero CTA
- **WHEN** a keyboard visitor focuses and activates the primary hero call to action
- **THEN** focus moves to the signup form or the signup form opens with an accessible name and visible focus placement

#### Scenario: Visitor reaches the end of the core product proof
- **WHEN** a visitor finishes the core mobile product-preview gallery
- **THEN** the visitor encounters a concise waitlist prompt and the same progress-aware waitlist action before continuing to later product and pricing sections

#### Scenario: Mid-page CTA follows journey state
- **WHEN** the visitor has joined the simulated waitlist or completed the survey in the current page session
- **THEN** the mid-page action displays and performs the same survey or completion state as every other waitlist action

#### Scenario: Visitor requests reduced motion
- **WHEN** the visitor's device reports a reduced-motion preference
- **THEN** nonessential reveal, parallax, and carousel motion is removed while all content remains available

## ADDED Requirements

### Requirement: Active-pair terminology has one stable explanation
The landing experience SHALL define an **active pair** as an inventory record marked **Available** or **Reserved**. **Sold** records SHALL NOT count toward active-pair plan limits, SHALL remain available in sold history, and SHALL continue to retain any outstanding tracked installment balance without becoming active again. The definition SHALL be available in an expanded FAQ item with the stable destination `#faq-active-pairs`.

#### Scenario: Visitor follows an active-pair reference
- **WHEN** a visitor activates an active-pair definition link from pricing, plan comparison, or the founding-offer summary
- **THEN** the browser moves to the expanded active-pair FAQ entry and the full definition is visible

#### Scenario: Visitor asks from the survey
- **WHEN** a visitor activates **What counts as active?** beside the inventory-size survey question
- **THEN** the active-pair FAQ opens in a separate browser context so the in-progress survey remains available in its original context

#### Scenario: Static preview contains active-pair text
- **WHEN** active-pair wording appears inside illustrative product-preview artwork or an aria-hidden decorative callout
- **THEN** that artwork remains non-interactive and does not expose a fake active-pair link

#### Scenario: Screen-reader visitor encounters a linked term
- **WHEN** a screen-reader visitor reaches a contextual active-pair link
- **THEN** the link has an understandable destination or accessible name without relying on a standalone information icon

### Requirement: Dedicated privacy notice supports waitlist collection
The landing page SHALL link from both the waitlist consent copy and footer to a dedicated Privacy Notice at `/privacy`. The notice SHALL identify SoleSheet and a working privacy contact, describe collected information, purposes, consent and withdrawal, recipients or recipient classes, possible international processing, retention, safeguards, data-subject rights, complaint options, changes, and an effective date. The consent link SHALL open separately so partially entered form values are not interrupted.

#### Scenario: Visitor reviews privacy before consenting
- **WHEN** a visitor activates the Privacy Notice link within the waitlist consent control
- **THEN** the complete notice opens in a separate browser context and the original form remains available

#### Scenario: Visitor uses the footer
- **WHEN** a visitor activates the footer Privacy link
- **THEN** the browser navigates to `/privacy` and presents the same complete notice

#### Scenario: Privacy practices change
- **WHEN** the form's actual collected fields, purposes, providers, retention, or contact details change before collection begins
- **THEN** the Privacy Notice is updated to match the real processing behavior before the changed collection is enabled
