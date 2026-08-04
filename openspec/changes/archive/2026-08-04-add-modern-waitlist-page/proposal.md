## Why

The product needs a polished, mobile-first way to show Filipino shoe resellers what the planned app could feel like before committing to full development. A focused frontend prototype with credible app mockups can communicate the value and let the product experience be reviewed before signup infrastructure is introduced.

## What Changes

- Replace the current presentation with a distinct, modern marketing page optimized first for a 360px Android viewport and responsive through desktop.
- Present realistic mockups of the planned mobile app, using the app design guide for the mockup UI while allowing the surrounding waitlist page to have its own visual direction.
- Explain the core value proposition: faster inventory updates, profit clarity, and installment tracking for Philippine shoe resellers.
- Add a polished waitlist form prototype with accessible client-side interaction and a simulated success transition, without sending or storing visitor information.
- Offer a short optional survey prototype after the simulated signup, presented as a mobile sheet or desktop dialog with temporary in-memory answers.
- Include grounded pricing direction, a founding-seller offer, supporting privacy-link presentation, and an optional FAQ without presenting the upcoming app as already available.
- Add responsive, accessibility, performance, and visual-verification expectations for a convincing frontend prototype.

## Capabilities

### New Capabilities

- `waitlist-landing-experience`: Covers the responsive marketing narrative, page sections, calls to action, pricing preview, founding-seller framing, and accessible interaction behavior.
- `product-mockup-showcase`: Covers realistic in-page mobile-app mockups derived from the app design guide and populated with Philippine sneaker-reseller data.
- `waitlist-signup`: Covers the accessible frontend form, client-side validation, and simulated in-session signup transition without network submission or persistence.
- `validation-survey`: Covers the optional non-saving survey prototype, responsive presentation, temporary answer state, and completion experience.

### Modified Capabilities

None.

## Impact

- Affects the Next.js landing route and its shared styling, layout, metadata, and static assets.
- Adds product mockup assets or code-native mockup components and responsive presentation behavior.
- Adds client-side prototype state for the signup and optional survey flows; no backend APIs, database, analytics pipeline, or production data collection are included.
- Requires React Aria Components for accessible interactive controls and tests at mobile and desktop widths.
