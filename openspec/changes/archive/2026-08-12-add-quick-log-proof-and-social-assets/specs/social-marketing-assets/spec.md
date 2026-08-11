## Purpose

Define reusable, code-rendered SoleSheet marketing compositions that turn the planned product workflow into consistent, truthful, and exportable social images without requiring Figma as the design source of truth.

## ADDED Requirements

### Requirement: Social compositions reuse the product preview system
Social compositions SHALL reuse the website's approved product UI components, product data, content registry, typography, colors, spacing, and status treatment so generated posts do not drift from the public product preview. Social-specific framing and layout MAY differ, but product screen facts SHALL come from the shared source.

#### Scenario: Shared product content changes
- **WHEN** an approved product label, amount, state, or visual token used by both surfaces changes
- **THEN** regenerating the affected social asset reflects the same current value without separately editing a Figma file or duplicating the product fact in an image-only source

### Requirement: Initial assets communicate connected workflow outcomes
The initial asset set SHALL include a sale-first Quick Log feed carousel, an installment-tracking feed carousel, corresponding Story compositions, and a refreshed link-preview image. Each sequence SHALL emphasize an action and its connected result rather than presenting a dense feature list.

#### Scenario: Viewer reads the Quick Log carousel
- **WHEN** the carousel is viewed in order
- **THEN** it communicates that a reseller can tap the labeled Home Quick Log action, find an existing pair by model, size, or colorway, receive its size, colorway, and cost automatically, enter the selling price, and complete or continue the sale according to payment type

#### Scenario: Viewer reads the installment carousel
- **WHEN** the carousel is viewed in order
- **THEN** it distinguishes sold inventory from payment progress and shows one recorded payment updating collected and remaining amounts

#### Scenario: Link preview is requested
- **WHEN** a supported platform retrieves the refreshed social-preview image
- **THEN** the image clearly identifies SoleSheet with the supplied Grid Shoe identity, its Philippine shoe-reseller audience, its upcoming status, and its mobile inventory value without placeholder or contradictory content

### Requirement: Exported assets use approved platform formats
The capture workflow SHALL produce deterministic PNG images at 1080 by 1350 pixels for portrait feed compositions, 1080 by 1920 pixels for Story compositions, and 1200 by 630 pixels for link previews. Essential text, product UI, and brand identification SHALL remain inside safe margins and legible at the target dimensions.

#### Scenario: Feed assets are generated
- **WHEN** the local capture workflow exports a feed composition
- **THEN** each resulting PNG is exactly 1080 by 1350 pixels with no clipped essential content

#### Scenario: Story assets are generated
- **WHEN** the local capture workflow exports a Story composition
- **THEN** each resulting PNG is exactly 1080 by 1920 pixels and keeps essential content away from common top and bottom interface overlays

#### Scenario: Asset generation is repeated without source changes
- **WHEN** the same approved compositions are captured again in the same supported environment
- **THEN** filenames, dimensions, copy, product values, and composition states remain deterministic

### Requirement: Marketing assets describe the product honestly
Every social composition that depicts planned application behavior SHALL visibly identify the interface as a product preview, planned experience, or upcoming product. Assets SHALL NOT imply that accounts, cloud synchronization, buyer payments, or other nonfunctional services are available, and SHALL NOT contain visitor-entered or real buyer data.

#### Scenario: Viewer sees an application mockup in a post
- **WHEN** a generated image depicts a Quick Log or installment screen
- **THEN** a visible preview disclosure and truthful supporting copy distinguish the planned experience from a released application

#### Scenario: Fixture data is rendered
- **WHEN** a composition includes a reseller, shoe, or buyer-like example
- **THEN** the data is fictional, culturally plausible, free of real contact details, and consistent with the website's sample-data rules

### Requirement: Asset authoring does not expand the public visitor journey
The composition surface and capture controls SHALL be intended for local authoring and automated generation only. They SHALL not add navigation, calls to action, or indexable content to the public waitlist journey, and exported files SHALL not require the authoring surface to remain publicly accessible.

#### Scenario: Visitor browses the production waitlist site
- **WHEN** a normal visitor follows public navigation or a search crawler indexes public content
- **THEN** no social asset studio or capture controls are presented as part of the waitlist experience

#### Scenario: Contributor generates assets locally
- **WHEN** a contributor runs the documented capture workflow against the supported local site
- **THEN** all approved assets are produced without a Figma session or manual browser cropping
