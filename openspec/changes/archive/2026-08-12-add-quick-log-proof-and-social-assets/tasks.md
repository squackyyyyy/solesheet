## 1. Shared Product Proof Model

- [x] 1.1 Replace the fixed showcase-only summary values with typed fictional fixtures for the 12-pair initial stockroom, the New Balance 530 Quick Log example, and the existing Nike Dunk installment example while preserving centralized peso formatting.
- [x] 1.2 Implement a fresh-state factory, narrow reducer actions for saving a Quick Log pair, adding an installment payment, and resetting the demo, plus pure selectors for inventory capital, potential margin, collected amount, remaining balance, progress, and payment status.
- [x] 1.3 Add unit tests proving the Quick Log totals, optional-target behavior, partial and full installment payments, overpayment rejection, duplicate-save prevention, and exact reset invariants.

## 2. Reusable Product UI and Controls

- [x] 2.1 Separate the presentation-only device treatment from a responsive interactive proof shell so static fragments retain image-equivalent semantics and real controls remain natively accessible without `role="application"`.
- [x] 2.2 Build pure app-themed metric, inventory-row, payment-summary, progress, preview-disclosure, and before/after view primitives that accept explicit snapshot data for reuse by the website and social compositions.
- [x] 2.3 Extend the project UI wrappers with app-themed React Aria Tabs, ComboBox/manual entry, Select, and PHP NumberField controls with visible labels, inline errors, focus-visible states, and 44px minimum targets.
- [x] 2.4 Add the short changed-value and row-highlight motion treatment, ensure state remains clear without motion or color, and verify the existing reduced-motion and forced-colors rules cover the new primitives.

## 3. Quick Log Proof

- [x] 3.1 Build the four-field Quick Log panel for brand/model, size, cost, and visibly optional target price using the approved New Balance example and essentials-first copy.
- [x] 3.2 Validate required and peso values inline while preserving valid drafts and preventing inventory changes on invalid submission.
- [x] 3.3 Connect a valid save to the reducer and render the `12 → 13` active-pair change, `₱53,200 → ₱57,400` inventory-capital change, highlighted inventory row, conditional potential margin, and concise live success message.
- [x] 3.4 Prevent repeated saves after completion and make the shared Reset demo action restore the exact Quick Log form, result, focus guidance, and announcement state.

## 4. Installment Payment Proof

- [x] 4.1 Build the installment proof with the fictional ₱6,500 sale, ₱4,000 collected amount, ₱2,500 remaining balance, payment history, progress, and clearly separate inventory/payment states.
- [x] 4.2 Add a PHP payment field and connect valid partial payments to collected amount, remaining balance, progress, history, and Partially paid status updates.
- [x] 4.3 Support a payment equal to the remaining balance as the Paid terminal state and reject zero, invalid, or over-balance values without mutating committed state.
- [x] 4.4 Place Quick Log and Track a payment in the accessible two-tab proof switcher and make Reset demo restore both panels from either selected tab.

## 5. Landing-Page Composition

- [x] 5.1 Recompose the product section around “Save once. See your stockroom update.” with the proof switcher, temporary-data disclosure, desktop side-by-side action/result layout, and 360px stacked layout without an internally scaled phone canvas.
- [x] 5.2 Move the complete dashboard, inventory, add, sale, installment, payment, and backup mockup coverage into a secondary “The rest of the planned flow” presentation with clear labels and equivalent nonvisual descriptions.
- [x] 5.3 Preserve one progress-aware waitlist CTA after the proof, keep presentation-only mockup controls non-focusable, and verify the new section does not introduce page-level horizontal overflow or competing nested horizontal scrolling.
- [x] 5.4 Add the Home-only circular floating Quick log cue to presentation mockups, include its future add/sold/payment action-sheet intent in equivalent descriptions, and keep it non-focusable on the waitlist site.
- [x] 5.5 Capture the complete Quick Log and installment proof plus the revised Home dashboard at 360px and 1440px, present the images for user design review, and fold approved visual revisions into the shared primitives before producing social assets.
- [x] 5.6 Update `PRODUCT_IMPROVEMENT_ROADMAP.md` and `DESIGN_SPEC.md` to replace the full guided-sandbox direction with the approved focused proof, Home quick-action cue, and code-first social asset workflow.

## 6. Code-Rendered Social Asset Studio

- [x] 6.1 Create a centralized social composition registry and manifest with stable ids, filenames, dimensions, sequence order, preview disclosures, headlines, and shared product snapshot references.
- [x] 6.2 Build the reusable editorial composition frame with the supplied SoleSheet identity, warm marketing surface, product-preview badge, safe margins, oversized product proof, concise headline, and evidence caption.
- [x] 6.3 Compose the four-frame 1080×1350 Quick Log feed carousel covering the mobile-update problem, four essentials, connected stockroom update, and waitlist close.
- [x] 6.4 Compose the four-frame 1080×1350 installment feed carousel covering sold-versus-paid state, starting balance, payment action, and updated progress.
- [x] 6.5 Compose one 1080×1920 Quick Log Story summary and one 1080×1920 installment Story summary with at least 160px top and 240px bottom overlay-safe areas.
- [x] 6.6 Add an explicitly enabled, non-indexable authoring route that renders named compositions for local capture, returns not-found when the task-specific flag is absent, and is never linked from the public site.
- [x] 6.7 Add a Playwright capture command that waits for fonts and a capture-ready marker, disables animation, writes the eleven stable PNG outputs plus manifest to `artifacts/social/`, and fails on missing compositions or incorrect dimensions.
- [x] 6.8 Refactor the 1200×630 Next.js Open Graph image to use the approved shared product copy and values, and include its captured counterpart in the social manifest without exposing the authoring route.

## 7. Verification and Visual Review

- [x] 7.1 Add component tests for React Aria field behavior, validation focus, optional target price, success announcements, both payment outcomes, reset, and static-versus-interactive semantics.
- [x] 7.2 Add Playwright journeys at 360px and 1440px for Quick Log, installment payment, tab switching, keyboard-only use, visible focus, 44px targets, reduced motion, and exact reset behavior.
- [x] 7.3 Add browser request and storage inspection proving that Quick Log, payment, tab, and reset interactions send no demo-bearing requests and write no cookies, local storage, or session storage.
- [x] 7.4 Test the authoring-route gate, social manifest, stable filenames, required preview disclosure, shared product values, and exact PNG dimensions for all eleven outputs.
- [x] 7.5 Generate every social asset and inspect the website at mobile and desktop sizes plus each feed, Story, and link-preview image at its native aspect ratio; revise clipping, hierarchy, safe areas, and readability before approval.
- [x] 7.6 Run formatting, lint, type checks, component tests, browser tests, and the production build; resolve all failures and cross-check every product and pricing statement against centralized content and the business brief.

## 8. Replace the Public Demo with the Expanded Quick Log Story

- [x] 8.1 Remove the standalone Quick Log/payment demo and demo-specific CTA from the public product section, retire its editable UI and reset behavior, and update the section copy to introduce a planned product preview rather than an operable workflow.
- [x] 8.2 Replace the redundant Add pair selector with a visibly emphasized **Quick Log · Fastest path** item, make Quick Log the default selection, and retain Overview, Stock, Sell, Installments, Payments, and Backup as the broader planned journey.
- [x] 8.3 Build the expanded Quick Log presentation as four readable illustrative stages—Home shortcut, three-action sheet, four essential fields, and connected result—using the approved New Balance example and exact derived figures.
- [x] 8.4 Keep selector buttons as the only operable showcase controls, provide one equivalent nonvisual description for the expanded story, announce selection changes concisely, preserve 44px targets and visible focus, and stack the four stages without horizontal overflow at 360px.
- [x] 8.5 Update `PRODUCT_IMPROVEMENT_ROADMAP.md` and `DESIGN_SPEC.md` so the approved public experience is an extensive illustrative Quick Log story under **“The rest of the planned flow,”** not a two-action demo.
- [x] 8.6 Replace demo interaction tests with component and Playwright coverage for default selection, emphasized Quick Log styling and copy, selector semantics, illustrative-control exclusion, exact amounts, keyboard use, reduced motion, no product-data persistence/transmission, and responsive layout at 360px and 1440px.
- [x] 8.7 Close the superseded four-stage-story verification after the approved sale-first wireframe replaced that direction; verification resumes against the replacement tasks below.

## 9. Replace Selected Panels with Responsive Product Photographs

- [x] 9.1 Replace the pending interactive preview model with a typed seven-destination Flow asset registry covering Quick Sale, Quick Actions, Search Stock, Add Stock, Installments, Payments, and Backup; include stable desktop/mobile master and public filenames, intrinsic dimensions, selector labels, Fastest path metadata, and one equivalent description per destination.
- [x] 9.2 Extend the approved code-rendered photo-style composition system with Search Stock, Add Stock, Payments, and Backup states; preserve the approved Quick Sale, anchored Quick Actions, and Installment states; and implement independent 4:3 desktop and 4:5 mobile layouts whose product facts come from centralized fictional fixtures.
- [x] 9.3 Extend the private capture workflow to render all fourteen deterministic PNG masters at exactly 3200×2400 desktop and 1600×2000 mobile, fail on missing or incorrectly sized assets, write a complete manifest, and produce optimized WebP delivery derivatives under `public/flow-mockups/` without exposing the studio publicly.
- [x] 9.4 Replace the code-drawn selected content in **“The rest of the planned flow”** with one registry-driven semantic `<picture>` figure, make Quick Sale the default emphasized selection, retain the seven selector buttons as the only showcase controls, announce selection changes concisely, and prevent depicted phone controls from entering the accessibility tree.
- [x] 9.5 Update landing-page copy, `PRODUCT_IMPROVEMENT_ROADMAP.md`, `DESIGN_SPEC.md`, and shared marketing content as needed so every public surface describes a responsive static product preview rather than a working demo while preserving sale-first naming and truthful upcoming-product disclosure.
- [x] 9.6 Add component and browser coverage for seven selectors, default/Fastest path state, keyboard and pressed semantics, 44px targets, equivalent descriptions, mobile/desktop source selection, absence of operable image descendants, no nested horizontal scrolling or page overflow at 360px and 1440px, and no product-data network or durable-storage writes.
- [x] 9.7 Run strict OpenSpec validation, lint, typecheck, unit/component/browser tests, Flow and social asset capture, production build, and native plus in-page visual inspection of every desktop/mobile destination; revise clipping, hierarchy, disclosure visibility, mobile readability, file weight, and source selection before approval.

## 10. Taller Mobile Art and SoleSheet Rebrand

- [x] 10.1 Replace the 4:5 Flow mobile registry, composition canvas, gallery ratio, capture checks, and tests with independent 2:3 mobile artwork and 1600×2400 masters; use a realistically tall, deliberately tilted and cropped phone shell while ensuring Quick Actions shows the complete anchored menu, Quick Log label, and `+` trigger together at 360px.
- [x] 10.2 Apply the supplied SoleSheet horizontal and mark assets across the website header, full mobile footer lockup, product previews, phone badges, social compositions, Open Graph image, metadata, favicons, manifest, public copy, equivalent descriptions, tests, and project documentation without recoloring or distorting the logo kit.
- [x] 10.3 Regenerate all fourteen Flow masters and WebPs plus all social assets, keep compact labels such as the Backup Planned status proportionate to their text, run strict validation, lint, typecheck, unit/component/browser tests, and production build, then visually inspect the taller mobile gallery and every rebranded output for clipped controls, obsolete ShoeTrack branding, and responsive regressions.

## 11. SoleSheet Marketing Palette Alignment

- [x] 11.1 Define the supplied SoleSheet Green, Deep Ink, and Soft White as shared marketing tokens; replace bright-blue-led website sections, primary actions, selected controls, links, selection color, and focus treatments with the cohesive brand palette while preserving darker action green for accessible white-text controls and limiting citrus to secondary emphasis.
- [x] 11.2 Update the design documentation and automated expectations, then run strict OpenSpec validation, lint, typecheck, unit/component/browser tests, production build, contrast/accessibility checks, and 360px/1440px visual review for palette coherence, visible focus, and responsive regressions.

## 12. Consistent Payment Preview

- [x] 12.1 Restore the established installment-section layout and update its payment phone and summary metrics to match the Payments destination's post-payment state, values, labels, and visual hierarchy using shared fixtures.
- [x] 12.2 Add payment-state consistency coverage, run strict OpenSpec validation, lint, typecheck, unit/component/browser tests, and production build, then visually compare the installment section and Payments destination at 360px and 1440px.
