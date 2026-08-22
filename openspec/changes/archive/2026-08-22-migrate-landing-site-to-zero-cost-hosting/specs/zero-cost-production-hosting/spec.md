## Purpose

Provide a commercially permitted, zero-recurring-cost production home for the SoleSheet waitlist while preserving the site's public behavior and keeping deployment reversible.

## ADDED Requirements

### Requirement: Commercially permitted zero-cost deployment
The production landing site SHALL run on a hosting plan whose published terms permit the intended commercial waitlist use without requiring a recurring hosting subscription or paid add-on at the site's current scale.

#### Scenario: Site operates within the free tier
- **WHEN** the production deployment is built and its configured hosting resources are reviewed
- **THEN** the deployment fits within the active free-plan limits and does not depend on an enabled paid hosting feature

### Requirement: Public route and interaction parity
The migrated deployment SHALL preserve the existing homepage, privacy page, responsive presentation, navigation, waitlist interaction, and survey interaction without exposing production-disabled studio routes.

#### Scenario: Public pages remain available
- **WHEN** a visitor requests the homepage or privacy page from the migrated deployment
- **THEN** the requested page responds successfully with the same user-facing content and interaction flow as the pre-migration site

#### Scenario: Production-only studio routes remain unavailable
- **WHEN** a visitor requests a capture studio route without its explicit enablement flag
- **THEN** the deployment does not expose the studio experience

### Requirement: Static and generated presentation assets remain available
The migrated deployment SHALL serve the site's logos, workflow previews, web quick-add previews, fonts, icons, manifest, and social sharing image without relying on a runtime filesystem path that is unavailable in production.

#### Scenario: Landing-page assets load
- **WHEN** the homepage is loaded and workflow previews are changed
- **THEN** each referenced SVG, WebP, PNG, font, icon, and manifest asset responds successfully

#### Scenario: Social sharing image loads
- **WHEN** a crawler requests the Open Graph image referenced by the homepage metadata
- **THEN** the request returns a successful image response with the expected dimensions and content type

### Requirement: Production-like Worker verification
The project SHALL provide a repeatable way to build and preview the site in the same Worker runtime family used by production before deployment.

#### Scenario: Worker compatibility is checked locally
- **WHEN** the production-like preview command is run with the documented toolchain
- **THEN** the Worker bundle builds within the free-plan size limit and the critical public routes can be exercised locally

### Requirement: Provider URL release remains independent from domain cutover
The hosting migration SHALL support releasing the verified site on its assigned Cloudflare provider URL without requiring a purchased custom domain, changing existing DNS, or detaching the retained Vercel deployment.

#### Scenario: Candidate checks pass
- **WHEN** the Cloudflare provider URL passes the documented route, asset, metadata, interaction, and free-plan checks
- **THEN** the provider URL can serve as the current public waitlist deployment while existing domain and Vercel configuration remain unchanged

#### Scenario: A custom domain is considered later
- **WHEN** the website is otherwise finished and the owner decides to purchase or attach a custom domain
- **THEN** domain attachment, DNS switching, and Vercel detachment are handled through a separate explicitly approved change

### Requirement: Existing development workflow remains available
The migration SHALL preserve the standard local Next.js development and build commands while adding separately named Worker-specific commands.

#### Scenario: Developer uses the normal local workflow
- **WHEN** a developer runs the existing development or standard build command
- **THEN** the project continues to use the established Next.js workflow without requiring the Worker preview runtime
