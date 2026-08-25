## MODIFIED Requirements

### Requirement: Pricing comparison makes plan coverage clear
The pricing preview SHALL retain its Free, Starter, and Growth plan cards and add a **Compare every feature** matrix after those cards and before the founding-seller offer. The matrix SHALL make the tier model explicit: Starter includes the Free core, and Growth includes the Starter and Free benefits in addition to its own scale features. It SHALL compare active-pair limits and coverage for core inventory, search and filters, profit tracking, installment tracking, sold history, local export, automatic cloud backup and restore, installment reminders and monthly summaries, Web Inventory, spreadsheet import, cross-device sync, and advanced reports. Inclusion and exclusion SHALL be understandable without relying on color alone. Web Inventory, spreadsheet import, cross-device sync, and advanced reports SHALL be shown as included intended Growth benefits. The pricing section SHALL retain one clear validation-stage disclosure that the product, pricing, and features are not available yet; the matrix SHALL NOT use **Planned** labels to single out only those Growth scale benefits. On mobile, the disclosure SHALL present **Compare every feature** only once, SHALL communicate closed and open states consistently with the FAQ disclosures, and SHALL contain horizontal table scrolling without widening the page.

#### Scenario: Desktop visitor compares plans
- **WHEN** a visitor reaches pricing at a desktop viewport
- **THEN** the visitor can see the visible feature-by-plan matrix with Feature, Free, Starter, and Growth columns, plan limits, clear inclusion states, the cumulative-tier explanation, and the pricing section's validation-stage disclosure before the founding-seller offer

#### Scenario: Mobile visitor compares plans
- **WHEN** a visitor reaches pricing at a 360px-wide viewport
- **THEN** the plan cards remain readable and the feature matrix is available through a closed **Compare every feature** disclosure whose opened table can be horizontally compared without duplicate heading copy, page-level overflow, or loss of the Feature column

### Requirement: Layout is mobile-first and responsive
The page SHALL remain usable from a 320px-wide viewport through larger phones, tablets, and desktop widths. Content SHALL stack in a deliberate reading order on small screens and expand into balanced multi-column compositions only when space permits. Wide comparison content SHALL remain inside its designated horizontal scroll region, and the waitlist card, form controls, human-verification surface, and surrounding section SHALL remain within the visual viewport.

#### Scenario: Narrow mobile viewport
- **WHEN** the page is displayed at 320px or 360px wide
- **THEN** text remains legible without zoom, controls meet touch-target needs, mockups fit without clipping essential content, and no section creates horizontal page overflow

#### Scenario: iPhone-sized waitlist form
- **WHEN** the waitlist section is displayed at a 393px-wide viewport
- **THEN** the complete waitlist card, fields, consent content, verification surface, and submit action remain inside the viewport without horizontal page movement

#### Scenario: Desktop viewport
- **WHEN** the page is displayed at 1440px wide
- **THEN** content uses the available width without excessively long text lines or oversized empty regions and preserves the same narrative order

### Requirement: Calls to action are consistent and accessible
Primary waitlist calls to action SHALL use progress-aware behavior and SHALL move focus to or reveal the same signup experience. The hero, post-gallery product prompt, and pricing offer SHALL retain clear waitlist entry actions. The header action SHALL remain available on viewports where it is not immediately redundant with the hero but SHALL be omitted on narrow mobile viewports. Later calls to action MAY use context-specific labels instead of repeating **Join the waitlist**, but their accessible intent and journey state SHALL remain clear. Keyboard focus, client-side validation feedback, landmarks, heading order, color contrast, and reduced-motion preferences SHALL be supported.

#### Scenario: Keyboard visitor activates hero CTA
- **WHEN** a keyboard visitor focuses and activates the primary hero call to action
- **THEN** focus moves to the signup form or the signup form opens with an accessible name and visible focus placement

#### Scenario: Mobile visitor sees the first call to action
- **WHEN** a visitor opens the page on a narrow mobile viewport
- **THEN** the header presents the horizontal SoleSheet logo and the hero presents the primary waitlist action without a second adjacent header action competing with it

#### Scenario: Visitor reaches the end of the core product proof
- **WHEN** a visitor finishes the core mobile product-preview gallery
- **THEN** the visitor encounters a concise context-specific waitlist prompt before continuing to later product and pricing sections

#### Scenario: CTA follows journey state
- **WHEN** the visitor has joined the waitlist or completed the survey in the current page session
- **THEN** every remaining waitlist action displays and performs the appropriate survey or completion state regardless of its contextual label

#### Scenario: Visitor requests reduced motion
- **WHEN** the visitor's device reports a reduced-motion preference
- **THEN** nonessential reveal, parallax, and carousel motion is removed while all content remains available

### Requirement: Active-pair terminology has one stable explanation
The landing experience SHALL define an **active pair** as an inventory record marked **Available** or **Reserved**. **Sold** records SHALL NOT count toward active-pair plan limits, SHALL remain available in sold history, and SHALL continue to retain any outstanding tracked installment balance without becoming active again. The full definition SHALL remain available in an expanded FAQ item with the stable destination `#faq-active-pairs`. The inventory-size survey question SHALL provide the essential definition inside the survey without navigating away from or opening a separate browser context.

#### Scenario: Visitor follows a landing-page active-pair reference
- **WHEN** a visitor activates an active-pair definition link from pricing, plan comparison, or the founding-offer summary
- **THEN** the browser moves to the expanded active-pair FAQ entry and the full definition is visible

#### Scenario: Visitor asks from the survey
- **WHEN** a visitor activates **What pairs count as active?** beside the inventory-size survey question
- **THEN** an in-survey explanation states that Available and Reserved pairs count and Sold pairs do not, while the current question, temporary answers, and modal context remain unchanged

#### Scenario: Static preview contains active-pair text
- **WHEN** active-pair wording appears inside illustrative product-preview artwork or an aria-hidden decorative callout
- **THEN** that artwork remains non-interactive and does not expose a fake active-pair link

#### Scenario: Screen-reader visitor encounters active-pair help
- **WHEN** a screen-reader visitor reaches contextual active-pair help
- **THEN** its control has an understandable accessible name and exposes the definition without relying on a standalone information icon

## ADDED Requirements

### Requirement: Expandable landing-page sections expose consistent state cues
FAQ entries and the mobile pricing comparison SHALL use the same visible disclosure convention: plus when closed and minus when open. The state change SHALL be available programmatically and SHALL not rely on icon shape alone.

#### Scenario: Visitor opens and closes a disclosure
- **WHEN** a visitor toggles either an FAQ entry or the mobile pricing comparison
- **THEN** the visible indicator changes from plus to minus while open and returns to plus when closed, and assistive technology receives the corresponding expanded state
