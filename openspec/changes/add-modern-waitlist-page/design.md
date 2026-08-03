## Context

See `proposal.md` for motivation. The repository currently contains a single static Next.js 16.2 landing route built with React 19, Tailwind CSS 4, Geist, and React Aria Components. The existing page sketches an earlier waitlist direction but does not yet provide the richer marketing composition, complete mobile-app mockups, or the signup-to-survey interaction being proposed.

`DESIGN_SPEC.md` describes a calm stone-and-emerald “Stockroom Utility” interface. Per the requested boundary, that language will guide only the mobile app shown inside the mockups; the surrounding waitlist page will use a distinct marketing system. This change is frontend-only: signup and survey fields are a non-saving visual prototype with temporary client state and no API, database, analytics, or durable browser storage.

## Goals / Non-Goals

**Goals:**

- Establish a distinctive, modern marketing direction that frames rather than imitates the app UI.
- Make realistic, code-native mockups of the planned core mobile journey the visual centerpiece.
- Demonstrate the complete waitlist, success, optional survey, and thank-you flow using accessible client-side interactions.
- Keep the page usable at a 360px Android viewport and polished through desktop widths.
- Use the attached React Aria documentation as the reference for composing and styling accessible interactive primitives.

**Non-Goals:**

- Building the production mobile app or a fully functional app prototype.
- Submitting, storing, deduplicating, analyzing, or sending waitlist and survey information.
- Adding backend endpoints, server actions for submission, a database, authentication, rate limiting, resume tokens, or deployment infrastructure.
- Persisting prototype state in cookies, local storage, session storage, or another durable browser mechanism.
- Implementing subscriptions, checkout, cloud inventory sync, buyer-data storage, item photos, QR workflows, teams, or payment processing.

## Decisions

### 1. Use an “Editorial Product Studio” marketing direction

The waitlist page will use a warm paper base, deep ink typography, crisp cobalt as the primary marketing accent, and a small citrus highlight reserved for proof points and selected states. Large editorial type, thin rules, asymmetrical but disciplined grids, generous whitespace, and restrained depth will create a modern product-launch feel. Motion will be limited to short opacity/translation reveals and mockup transitions, with a complete reduced-motion path.

The app screens inside device frames will retain the guide's calm stone, white, and emerald operational palette, rounded cards, compact labels, and emphasized numbers. Device framing and a neutral presentation rail will make the boundary between marketing site and app product clear.

Alternative considered: extend the stone-and-emerald app language across the whole page. This was rejected because the surrounding marketing design is intentionally independent and should make the app mockups feel like the featured product.

### 2. Compose the page as a visual product story

The route will use semantic sections in this order: compact navigation, hero plus lead mockup, spreadsheet-friction problem, core workflow showcase, installment differentiator, pricing preview, founding-seller offer, FAQ, final signup CTA, and footer links. The mobile reading order will place the value proposition and a primary CTA in the first viewport, followed quickly by a credible app screen.

On desktop, the hero will use a text/mockup split and later sections will expand into editorial grids. On mobile, content will stack without horizontal overflow, long text lines, or clipped device frames. Copy will use “planned,” “coming,” and “help shape” language for the product while the signup interaction itself remains natural and free of technical prototype warnings.

Alternative considered: place a long research form in the hero. This was rejected because the primary visual goal is understanding the product; the survey belongs after the short signup interaction.

### 3. Render the app mockups as code-native screen components

Each required app screen will be a deterministic React presentation component backed by a shared mock-data module and common device shell. This keeps type and interface details crisp at multiple sizes, supports accessible descriptions, and allows the same screens to appear in a mobile selector and desktop layered composition without large exported image payloads.

The coherent mock-data set will include examples such as Nike Dunk Low and New Balance 530 records, common US sizes, peso-denominated costs and sale prices, and separate inventory and payment states. Dashboard, sale, and installment values will agree. The screen set will cover dashboard, inventory list, add shoe, mark as sold, installment setup, payment tracking, and upgrade/backup, without showing deferred product features.

Alternative considered: export every mockup as a raster image. This was rejected as the default because code-native screens scale more cleanly and are easier to describe accessibly. A single optimized social-preview image remains appropriate for metadata.

### 4. Keep static storytelling server-rendered and isolate interactive client components

Static sections and initial mockup markup will remain server-rendered. Client boundaries will be limited to the mockup selector, waitlist form state, and optional survey sheet/dialog. Before implementation, the installed Next.js 16 documentation must be consulted for the exact server/client, metadata, font, image, and caching conventions required by `AGENTS.md`.

The attached React Aria getting-started documentation is the component-construction reference. Interactive controls will be assembled from documented primitives inside explicit client components and wrapped behind small project-owned APIs that extend React Aria prop types. Tailwind styles will use custom class names, render props, and documented state attributes such as selected, pressed, invalid, disabled, focus-visible, and open. Shared field wrappers will consistently compose labels, descriptions, and field errors; a shared dialog/sheet wrapper will provide focus and overlay behavior for the survey.

Alternative considered: make the whole route a client component. This was rejected because most of the page is static content and does not need client-side state or JavaScript.

### 5. Simulate signup entirely in page memory

The form will maintain controlled client state for optional name, email-or-mobile contact, consent, validation messages, a brief pending transition, and success. Valid input will move naturally to the success presentation and reveal the optional survey action. Invalid input will preserve values and direct attention to clear field-level feedback through React Aria semantics.

No form path will call `fetch`, a server action, an API route, or a third-party embed. Entered values and state will not be written to cookies or Web Storage, and no analytics event will include or transmit them. Reloading the page resets the prototype. This makes the complete intended experience reviewable without introducing production data-collection work.

Alternative considered: wire the form to a temporary local or hosted endpoint. This was rejected because the current priority is frontend quality and realistic product mockups.

### 6. Keep the survey interactive but non-saving

The optional survey will use a shared question registry covering phone platform, likely plan, inventory size, installment frequency, current tracking tool, priority feature, backup interest, sales channels, and interview permission. The mobile presentation will be a bottom or full-screen sheet; desktop will use a centered dialog. React Aria will manage the accessible name, overlay, focus entry, dismissal, and focus restoration.

Answers will update in component memory and remain available if the visitor closes and reopens the survey without reloading. Completing the survey will transition to a thank-you state. No answer, completion state, or contact value will leave the browser page or survive a reload.

Alternative considered: show the survey as a static screenshot. This was rejected because the user wants to review the actual user flow and responsive interaction.

### 7. Treat supporting privacy and metadata content as presentation work

The waitlist form may include consent and privacy-link presentation so the visual prototype reflects a credible future flow, but this change will not implement privacy processing, retention, service-provider disclosure, or data-subject workflows because no information is collected. Page metadata will include an accurate title, description, configurable canonical value, and optimized social preview that describe the upcoming product rather than a completed launch.

Alternative considered: remove consent and privacy presentation entirely. This was rejected because keeping those controls makes the frontend flow more representative of a future production signup without requiring backend behavior now.

### 8. Verify the frontend at interaction and visual boundaries

Component tests will cover contact validation, consent feedback, signup state transitions, survey question behavior, closing/reopening, completion, and reload-reset assumptions. Browser checks will cover the complete flow at 360px and 1440px, keyboard-only operation, dialog focus restoration, reduced motion, and horizontal overflow. Automated accessibility checks and manual focus, screen-reader, touch-target, color-contrast, and high-contrast review will complement responsive visual snapshots.

Performance review will verify stable device-frame dimensions, a prioritized first mobile viewport, restrained client JavaScript, and deferred nonessential offscreen visuals. A production build, lint, type checks, and claim/data review against the business brief will complete verification.

## Risks / Trade-offs

- [The separate marketing and app visual systems could feel disconnected] → Reuse compatible type proportions and neutral tones while reserving cobalt for marketing and emerald for app UI.
- [Code-native mockups can drift from the eventual mobile app] → Centralize mockup tokens and data, document their concept status in code, and update them when the app design evolves.
- [A simulated success state can be mistaken internally for completed backend work] → Keep frontend boundaries and implementation notes explicit, and ensure no network or durable-storage code exists in the flow.
- [Temporary form state disappears on refresh] → Accept this intentionally for the frontend prototype and keep future persistence outside this change.
- [Many interactive mockups could increase client JavaScript] → Server-render initial markup and hydrate only selectors, form state, and the survey overlay.
- [Pricing may change after validation] → Label pricing as planned and source all displayed values from one content configuration.

## Migration Plan

1. Build the marketing and app-mockup token systems alongside the existing route.
2. Add the semantic landing sections and all code-native app screens using shared mock data.
3. Add the client-only signup and survey components with React Aria wrappers and temporary state.
4. Replace the existing root presentation once responsive visual, accessibility, interaction, lint, type, test, and production-build checks pass.
5. If rollback is needed, restore the previous page implementation; no data migration or backend cleanup is required.
