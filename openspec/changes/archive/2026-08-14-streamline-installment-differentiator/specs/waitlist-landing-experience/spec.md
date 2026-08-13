## MODIFIED Requirements

### Requirement: Page tells a complete validation-focused story
The page SHALL include a hero, product mockup showcase, key features, a compact installment-tracking differentiator, pricing preview, founding-seller offer, final waitlist call to action, supporting privacy-link presentation, and FAQ access. The product mockup showcase SHALL be the only landing-page surface that visually demonstrates the installment-setup and payment-recording workflows; the differentiator SHALL reinforce their business meaning without duplicating a device preview. The pricing preview SHALL communicate a useful Free plan, a Starter plan focused on protection and routine convenience, and a Growth plan focused on time savings at larger scale. Pricing SHALL show the free direction, PHP 99 Starter direction, PHP 349 Growth direction, and PHP 65 founding-seller offer as validation-stage pricing rather than a purchase offer. The Free plan SHALL explicitly include search and filtering alongside core inventory, profit, installment, sold-history, and local-export workflows. Starter SHALL present up to 150 active pairs, automatic cloud backup and recovery, installment reminders, and monthly business summaries. Growth SHALL present up to 750 active pairs, planned Web Inventory, spreadsheet import, planned cross-device synchronization, and advanced reporting. The planned annual Growth direction SHALL be PHP 3,490 per year.

#### Scenario: Visitor evaluates product fit
- **WHEN** a visitor scrolls through the landing page
- **THEN** the visitor can understand the spreadsheet problem, planned solution, core differentiators, pricing direction, founding offer, and next step

#### Scenario: Visitor reviews pricing
- **WHEN** a visitor reaches the pricing preview
- **THEN** prices and plan limits are labeled as planned or subject to validation, Free includes search and filtering, Starter communicates protection and routine convenience, Growth communicates scale and time savings, and no checkout action is presented

### Requirement: Installment differentiator explains sold versus settled
After the product mockup showcase, the page SHALL retain a compact section at `#installments` that uses **Sold doesn’t always mean settled.** as its headline and explains that SoleSheet keeps inventory state and payment state separate. The callout SHALL present the fixture-derived cash collected and balance remaining alongside **Sold** inventory state and **Partially paid** payment state, without rendering a second payment-recording device preview. It SHALL state that the product is seller-managed tracking only and does not provide lending, interest, late fees, collections, or payment processing.

#### Scenario: Visitor reads the post-gallery installment callout
- **WHEN** a visitor continues after the Inside SoleSheet gallery
- **THEN** the visitor can understand that a sold pair can retain an outstanding tracked installment balance without seeing a duplicate payment screen

#### Scenario: Visitor follows the Installments navigation link
- **WHEN** a visitor selects the primary-navigation Installments link
- **THEN** the browser moves to the compact installment differentiator at the stable `#installments` destination
