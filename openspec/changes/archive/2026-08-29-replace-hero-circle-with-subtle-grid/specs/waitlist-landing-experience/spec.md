## ADDED Requirements

### Requirement: Hero decoration reinforces the SoleSheet grid identity
The landing-page hero SHALL use a localized, partial spreadsheet-grid decoration instead of a generic thin circular outline. The grid SHALL remain low contrast, fade at its edges, preserve the existing soft green glow, and stay visually behind the product preview without obscuring the headline, calls to action, or essential preview content. The decoration SHALL be static, non-interactive, hidden from assistive technology, and contained within the hero so it does not increase the document width at supported viewport sizes.

#### Scenario: Desktop visitor sees the branded hero treatment
- **WHEN** a visitor opens the landing page at a desktop viewport
- **THEN** a subtle partial grid frames the product preview, the soft green glow remains visible, and the former thin circular outline is absent

#### Scenario: Mobile visitor sees a contained decoration
- **WHEN** a visitor opens the landing page at a 320px or 360px-wide viewport
- **THEN** the grid remains a restrained background detail, does not compete with the hero content, and does not cause horizontal page overflow

#### Scenario: Assistive technology encounters the hero
- **WHEN** a screen-reader visitor navigates through the hero
- **THEN** the grid exposes no content, control, or additional navigation stop
