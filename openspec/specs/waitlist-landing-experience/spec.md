# waitlist-landing-experience Specification

## Purpose

Define the public-facing experience that explains the upcoming product and turns mobile social traffic into informed waitlist interest.

## Requirements

### Requirement: Product positioning is immediately understandable
The page SHALL identify the product as an upcoming mobile inventory and profit tracker for Philippine shoe resellers and SHALL foreground faster updates, profit clarity, and installment tracking without implying that the app is already released.

#### Scenario: First mobile viewport
- **WHEN** a visitor opens the page at a 360px-wide viewport
- **THEN** the visitor can identify the intended audience, primary value proposition, upcoming status, and a waitlist action without horizontal scrolling

#### Scenario: Product availability language
- **WHEN** a visitor reads the hero, pricing, and calls to action
- **THEN** the copy consistently describes the product as planned, in development, or available through future early access

### Requirement: Page tells a complete validation-focused story
The page SHALL include a hero, product mockup showcase, key features, a compact installment-tracking differentiator, pricing preview, founding-seller offer, final waitlist call to action, supporting privacy-link presentation, and FAQ access. The product mockup showcase SHALL be the only landing-page surface that visually demonstrates the installment-setup and payment-recording workflows; the differentiator SHALL reinforce their business meaning without duplicating a device preview. The pricing preview SHALL communicate a useful Free plan, a Starter plan focused on protection and routine convenience, and a Growth plan focused on time savings at larger scale. Pricing SHALL show the free direction, PHP 99 Starter direction, PHP 349 Growth direction, and PHP 65 founding-seller offer as validation-stage pricing rather than a purchase offer. The Free plan SHALL explicitly include search and filtering alongside core inventory, profit, installment, sold-history, and local-export workflows. Starter SHALL present up to 150 active pairs, automatic cloud backup and recovery, installment reminders, and monthly business summaries. Growth SHALL present up to 750 active pairs, Web Inventory, spreadsheet import, cross-device synchronization, and advanced reporting as intended plan benefits. The planned annual Growth direction SHALL be PHP 3,490 per year.

#### Scenario: Visitor evaluates product fit
- **WHEN** a visitor scrolls through the landing page
- **THEN** the visitor can understand the spreadsheet problem, planned solution, core differentiators, pricing direction, founding offer, and next step

#### Scenario: Visitor reviews pricing
- **WHEN** a visitor reaches the pricing preview
- **THEN** prices and plan limits are labeled as planned or subject to validation, Free includes search and filtering, Starter communicates protection and routine convenience, Growth communicates scale and time savings, and no checkout action is presented

### Requirement: Pricing comparison makes plan coverage clear
The pricing preview SHALL retain its Free, Starter, and Growth plan cards and add a **Compare every feature** matrix after those cards and before the founding-seller offer. The matrix SHALL make the tier model explicit: Starter includes the Free core, and Growth includes the Starter and Free benefits in addition to its own scale features. It SHALL compare active-pair limits and coverage for core inventory, search and filters, profit tracking, installment tracking, sold history, local export, automatic cloud backup and restore, installment reminders and monthly summaries, Web Inventory, spreadsheet import, cross-device sync, and advanced reports. Inclusion and exclusion SHALL be understandable without relying on color alone. Web Inventory, spreadsheet import, cross-device sync, and advanced reports SHALL be shown as included intended Growth benefits. The pricing section SHALL retain one clear validation-stage disclosure that the product, pricing, and features are not available yet; the matrix SHALL NOT use **Planned** labels to single out only those Growth scale benefits.

#### Scenario: Desktop visitor compares plans
- **WHEN** a visitor reaches pricing at a desktop viewport
- **THEN** the visitor can see the visible feature-by-plan matrix with Feature, Free, Starter, and Growth columns, plan limits, clear inclusion states, the cumulative-tier explanation, and the pricing section's validation-stage disclosure before the founding-seller offer

#### Scenario: Mobile visitor compares plans
- **WHEN** a visitor reaches pricing at a 360px-wide viewport
- **THEN** the plan cards remain readable and the feature matrix is available through a closed **Compare every feature** disclosure whose opened table can be horizontally compared without page-level overflow or loss of the Feature column

### Requirement: Pricing comparison is semantic and non-interactive
The feature matrix SHALL be a read-only semantic data table with a caption or equivalent accessible name, column headers for Feature, Free, Starter, and Growth, and row headers for each compared feature. Included, excluded, and limited states SHALL each expose an equivalent text meaning to assistive technology. The comparison SHALL not expose sorting, row selection, column controls, checkout controls, or other product interactions.

#### Scenario: Screen-reader visitor reads a feature row
- **WHEN** a screen-reader visitor navigates the opened pricing comparison
- **THEN** the visitor can associate each plan’s included, excluded, or limited state with the corresponding feature and plan header

#### Scenario: Visitor interacts with the comparison
- **WHEN** a visitor scans or scrolls the feature matrix
- **THEN** no pricing state changes, checkout starts, product-data request is sent, or browser storage entry is created

### Requirement: Installment differentiator explains sold versus settled
After the product mockup showcase, the page SHALL retain a compact section at `#installments` that uses **Sold doesn’t always mean settled.** as its headline and explains that SoleSheet keeps inventory state and payment state separate. The callout SHALL present the fixture-derived cash collected and balance remaining alongside **Sold** inventory state and **Partially paid** payment state, without rendering a second payment-recording device preview. It SHALL state that the product is seller-managed tracking only and does not provide lending, interest, late fees, collections, or payment processing.

#### Scenario: Visitor reads the post-gallery installment callout
- **WHEN** a visitor continues after the Inside SoleSheet gallery
- **THEN** the visitor can understand that a sold pair can retain an outstanding tracked installment balance without seeing a duplicate payment screen

#### Scenario: Visitor follows the Installments navigation link
- **WHEN** a visitor selects the primary-navigation Installments link
- **THEN** the browser moves to the compact installment differentiator at the stable `#installments` destination

### Requirement: Layout is mobile-first and responsive
The page SHALL remain usable from a 360px Android viewport through larger phones, tablets, and desktop widths. Content SHALL stack in a deliberate reading order on small screens and expand into balanced multi-column compositions only when space permits.

#### Scenario: Narrow Android viewport
- **WHEN** the page is displayed at 360px wide
- **THEN** text remains legible without zoom, controls meet touch-target needs, mockups fit without clipping essential content, and no horizontal page overflow occurs

#### Scenario: Desktop viewport
- **WHEN** the page is displayed at 1440px wide
- **THEN** content uses the available width without excessively long text lines or oversized empty regions and preserves the same narrative order

### Requirement: Calls to action are consistent and accessible
Primary waitlist calls to action SHALL use consistent wording and SHALL move focus to or reveal the same signup prototype. Keyboard focus, client-side validation feedback, landmarks, heading order, color contrast, and reduced-motion preferences SHALL be supported.

#### Scenario: Keyboard visitor activates hero CTA
- **WHEN** a keyboard visitor focuses and activates the primary hero call to action
- **THEN** focus moves to the signup form or the signup form opens with an accessible name and visible focus placement

#### Scenario: Visitor requests reduced motion
- **WHEN** the visitor's device reports a reduced-motion preference
- **THEN** nonessential reveal, parallax, and carousel motion is removed while all content remains available

### Requirement: Page metadata supports trustworthy sharing
The page SHALL provide an accurate title, description, social-sharing metadata, canonical URL configuration, and a meaningful preview image representing the upcoming shoe inventory product.

#### Scenario: Landing page is shared
- **WHEN** a supported social platform retrieves the page metadata
- **THEN** the preview identifies the product, audience, and waitlist context without using placeholder or contradictory copy

### Requirement: Product section accurately frames the static showcase
The public product section SHALL present the upcoming application as a set of static workflow previews rather than a live or interactive demo. The section SHALL use **Inside SoleSheet** as its label, **See the workflows we’re building for everyday reselling.** as its heading, and explanatory copy that identifies the seven screens as static product previews spanning sale logging, installment payments, and record protection. The copy SHALL explicitly state that the screens illustrate the planned app and are not a live demo.

#### Scenario: Visitor reaches the product section
- **WHEN** a visitor scrolls to the product showcase
- **THEN** the label, heading, and description explain that the visitor can inspect workflows being built for SoleSheet without suggesting that the pictured app controls are operable

#### Scenario: Visitor distinguishes the gallery from a demo
- **WHEN** a visitor reads the product-section introduction before using a gallery selector
- **THEN** the introduction identifies the content as seven static product previews and explicitly says it is not a live demo

### Requirement: Landing narrative proves the Growth browser advantage

The page SHALL include a dedicated Growth Web Inventory proof section after the core mobile workflow gallery and before later supporting product sections. It SHALL use **Growth · Web Inventory** as its label, **Your stockroom. One clear table.** as its heading, and the positioning **Manage the same SoleSheet inventory from your browser. Fixed columns keep it simple, while adding rows makes encoding multiple pairs faster. Planned for Growth.** The section, pricing preview, and FAQ SHALL consistently identify Web Inventory as a planned Growth feature and SHALL not present browser editing or mobile synchronization as available in the current prototype. The FAQ SHALL explain that the browser presents the same inventory through SoleSheet-controlled columns, adding a row means adding a pair, valid row edits are intended to appear in mobile inventory, and spreadsheet import remains a separate planned Growth feature.

#### Scenario: Visitor moves from mobile workflows to browser scale

- **WHEN** a visitor finishes the core mobile product gallery and continues through the page
- **THEN** the next product proof explains that individual entry remains available on mobile while Growth is planned to add faster fixed-column inventory row management from a browser

#### Scenario: Visitor compares the section with Growth pricing

- **WHEN** a visitor reads both Web Inventory proof and the Growth plan card
- **THEN** both surfaces describe the same planned browser inventory benefit, Growth plan assignment, shared mobile-inventory outcome, and validation-stage availability

#### Scenario: Visitor asks for Web Inventory details

- **WHEN** a visitor opens the Web Inventory FAQ entry
- **THEN** the answer explains the planned fixed-column row workflow, Add row as pair creation, intended mobile-inventory updates, current unavailability, and distinction from spreadsheet import
