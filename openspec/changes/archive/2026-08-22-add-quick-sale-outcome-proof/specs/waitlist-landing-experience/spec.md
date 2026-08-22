## MODIFIED Requirements

### Requirement: Product section accurately frames the static showcase
The public product section SHALL present the upcoming application as a set of static workflow previews rather than a live or interactive demo. The section SHALL use **Inside SoleSheet** as its label, **See the workflows we’re building for everyday reselling.** as its heading, and explanatory copy that identifies the seven screens as static product previews spanning sale logging, installment payments, and record protection. The copy SHALL explicitly state that the screens illustrate the planned app and are not a live demo. The default Quick Sale preview SHALL lead the product narrative with the concrete outcome **sale recorded → stock updated → profit calculated** before the visitor explores the other operating flows.

#### Scenario: Visitor reaches the product section
- **WHEN** a visitor scrolls to the product showcase
- **THEN** the label, heading, and description explain that the visitor can inspect workflows being built for SoleSheet without suggesting that the pictured app controls are operable

#### Scenario: Visitor distinguishes the gallery from a demo
- **WHEN** a visitor reads the product-section introduction before using a gallery selector
- **THEN** the introduction identifies the content as seven static product previews and explicitly says it is not a live demo

#### Scenario: Visitor sees the first product payoff
- **WHEN** the default Quick Sale preview is visible
- **THEN** the visitor sees that recording one paid sale updates stock and calculates profit before being invited to inspect the remaining workflows
