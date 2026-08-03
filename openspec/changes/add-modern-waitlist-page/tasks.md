## 1. Framework and Frontend Structure

- [x] 1.1 Read the installed Next.js 16 documentation for server/client component boundaries, metadata, fonts, images, and caching, then use only the documented conventions required by `AGENTS.md`.
- [x] 1.2 Define the page section, mockup, interactive component, shared content, and frontend test structure without adding API routes, server submission actions, database modules, or persistence dependencies.
- [x] 1.3 Add only the frontend testing and accessibility tooling needed for component, browser, and visual verification, and confirm the existing React Aria Components dependency remains the interaction foundation.

## 2. Visual System and Accessible Primitives

- [x] 2.1 Replace the current landing-page tokens with the Editorial Product Studio marketing system while keeping a separate stone-and-emerald token set for the mobile app mockups.
- [x] 2.2 Following the attached React Aria documentation, build typed project wrappers for buttons, fields, checkbox, radio groups, select/listbox where used, and field errors by composing documented primitives in focused client components.
- [x] 2.3 Build shared React Aria dialog/sheet and overlay wrappers with Tailwind styles driven by render props and documented pressed, selected, invalid, disabled, focus-visible, and open state attributes.
- [x] 2.4 Add reduced-motion behavior, visible focus treatments, high-contrast-safe states, minimum touch sizing, semantic typography, and reusable layout utilities for 360px-first responsive composition.

## 3. Mobile App Mockup Showcase

- [x] 3.1 Create typed, internally consistent Philippine reseller mock data with peso formatting, common shoe sizes, inventory states, payment states, and derived dashboard/installment totals.
- [x] 3.2 Build a reusable device shell and the dashboard, inventory list, add-shoe, mark-as-sold, installment setup, installment payment tracking, and upgrade/backup screen mockups using the app design guide.
- [x] 3.3 Add concise accessible names and equivalent text descriptions while hiding redundant decorative screen fragments from assistive technology.
- [x] 3.4 Build the responsive showcase selector so every screen is reachable by touch and keyboard, selected state is announced, mobile transitions respect reduced motion, and desktop can use a layered composition.
- [x] 3.5 Reserve stable mockup dimensions and defer nonessential offscreen visuals so the showcase does not block or shift the first mobile viewport.

## 4. Landing Page Narrative and Metadata

- [x] 4.1 Create centralized validation-stage content for the hero, spreadsheet problem, feature proof, installment differentiator, planned pricing, founding-seller offer, FAQ, CTA labels, and product-status language.
- [ ] 4.2 Rebuild the root route with semantic server-rendered sections in the specified conversion order and responsive layouts that avoid horizontal overflow at 360px and overlong lines at desktop widths.
- [x] 4.3 Connect each primary CTA to the single waitlist form prototype with correct focus movement, consistent wording, and no analytics or submission side effects.
- [x] 4.4 Add accurate title, description, configurable canonical metadata, social metadata, and an optimized social-preview image for the upcoming product.
- [x] 4.5 Add the short consent/privacy presentation, FAQ content, and footer links needed to make the visual flow credible without implementing production privacy processing or data collection.

## 5. Client-Only Signup and Survey Prototype

- [x] 5.1 Build the React Aria waitlist form with optional name, email-or-Philippine-mobile contact, consent checkbox, descriptions, field errors, and an accessible live status region.
- [x] 5.2 Implement client-side validation, a brief pending presentation, and a polished success transition while preserving invalid inputs and preventing repeated activation during the transition.
- [ ] 5.3 Verify the signup path makes no fetch call, server action, API request, analytics transmission, cookie write, or Web Storage write and resets all entered values and state on page reload.
- [x] 5.4 Build the optional survey from the shared question registry, covering platform, pricing, inventory size, installment frequency, current tool, priority feature, backup interest, channels, and interview permission.
- [x] 5.5 Present the survey as a thumb-friendly bottom/full-screen sheet on mobile and accessible dialog on desktop with correct focus entry, scrolling, dismissal, and focus restoration.
- [x] 5.6 Keep survey answers in component memory when closing and reopening during the same page session, reset them on reload, and transition completion to an accessible thank-you state without submission or persistence.

## 6. Frontend Verification

- [ ] 6.1 Add component tests for contact validation, consent feedback, pending/success transitions, survey answer changes, close/reopen behavior, completion, and page-state reset.
- [ ] 6.2 Add browser tests at 360px and 1440px for the full visual flow, CTA focus, keyboard-only operation, dialog focus restoration, reduced motion, touch sizing, and horizontal overflow.
- [ ] 6.3 Add a test or request inspection proving signup and survey interactions make no data-bearing network requests and no durable browser-storage writes.
- [ ] 6.4 Run automated accessibility checks plus manual focus, screen-reader description, color-contrast, and high-contrast-state review for all React Aria interactions.
- [ ] 6.5 Capture responsive visual snapshots and verify mockup data consistency, app/marketing visual separation, social-preview output, stable layout, initial payload behavior, and deferred offscreen visuals.
- [ ] 6.6 Run lint, type checks, frontend tests, and a production build; resolve all failures and cross-check every product, feature, and pricing claim against the business brief.
