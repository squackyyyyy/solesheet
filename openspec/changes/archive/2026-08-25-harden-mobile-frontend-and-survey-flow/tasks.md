## 1. Mobile Width Containment

- [x] 1.1 Constrain the pricing comparison section, mobile disclosure content, and table scroller so the 38rem table remains independently scrollable without increasing document width.
- [x] 1.2 Add shrink and maximum-width containment to the waitlist grid, card, form fields, consent content, and flexible Turnstile host.
- [x] 1.3 Add a page-level horizontal-overflow safeguard after correcting the overflowing descendants.

## 2. Landing-Page Interaction Polish

- [x] 2.1 Standardize FAQ and mobile comparison indicators to plus when closed and minus when open with correct programmatic expanded state.
- [x] 2.2 Remove the duplicated mobile **Compare every feature** heading while retaining its supporting tier explanation.
- [x] 2.3 Hide the redundant header waitlist action on narrow viewports and give later CTA placements context-specific initial labels without forking journey-state behavior.
- [x] 2.4 Use the horizontal SoleSheet logo in the header at mobile and larger viewports and verify the responsive asset selection.

## 3. Survey Core and Help Flow

- [x] 3.1 Replace the separate-tab active-pair link with an accessible inline definition that preserves survey position, answers, and modal context.
- [x] 3.2 Mark the four core questions as required in the wizard, remove core skip paths, and guide incomplete completion attempts to the first missing answer.
- [x] 3.3 Automatically advance from the fourth core answer to the first optional question and expose lower-emphasis **Finish this survey** throughout the optional flow.
- [x] 3.4 Preserve automatic advancement for supported answers on all four core questions and optional single-choice questions where explicit navigation is not needed.
- [x] 3.5 Update survey guidance, footer wording, and completion messaging to distinguish optional participation, four required core answers, and five optional follow-ups.

## 4. Server and Privacy Alignment

- [x] 4.1 Update shared survey request validation so all four core answers are required while follow-ups and applicable Other details remain optional.
- [x] 4.2 Update survey endpoint tests for required-core acceptance and rejection without changing idempotent duplicate handling.
- [x] 4.3 Update the Privacy Policy to distinguish optional survey participation, required core answers for submission, and optional follow-up fields.

## 5. Verification

- [x] 5.1 Add component tests for inline active-pair help, required-core navigation, automatic movement into optional questions, contextual CTA labels, and disclosure indicators.
- [x] 5.2 Add responsive browser coverage asserting no document-level horizontal overflow at 320px, 360px, 393px, and 430px while the comparison disclosure and waitlist card are visible.
- [x] 5.3 Verify keyboard focus, screen-reader names and expanded states, reduced-motion behavior, internal table scrolling, and the unchanged desktop layout.
- [x] 5.4 Run the focused test suites, full automated test suite, type or lint checks, and production build.
