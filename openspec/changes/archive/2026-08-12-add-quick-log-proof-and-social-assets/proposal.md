## Why

The planned-flow gallery should communicate how SoleSheet works without asking visitors to operate a miniature demo. Responsive, code-rendered product photographs can make sale logging, stock search, inventory entry, installment handling, payments, and backup feel tangible while keeping the landing page honest, fast, and simple.

## What Changes

- Keep **“The rest of the planned flow”** as an accessible selector-controlled gallery, but make the selectors the only operable product-showcase controls.
- Replace code-drawn or interactive in-phone panels with seven static product-photograph destinations: **Quick Sale**, **Quick Actions**, **Search Stock**, **Add Stock**, **Installments**, **Payments**, and **Backup**.
- Make **Quick Sale** the default, emphasized fastest path and depict combined model/size/colorway search, selected-pair prefills, selling price, today-defaulted sold date, and paid/installment choice in one truthful static state.
- Depict the Home long-press behavior in a dedicated **Quick Actions** image with the Record a sale, Record a payment, and Add a pair menu visibly anchored to the `+`; the image explains behavior but does not implement it.
- Add focused **Search Stock** and **Add Stock** images that make finding an exact pair and adding a new inventory record look quick and low-friction.
- Preserve the installment continuation, payment tracking, and backup stories as matching photo-style static images.
- Produce separate desktop and mobile art directions for every destination rather than shrinking one composition: 3200×2400 desktop PNG masters and taller 1600×2400 mobile PNG masters whose realistic phone bodies use an intentional tilted editorial crop.
- Apply the supplied SoleSheet Grid Shoe identity across the public website, metadata, browser icons, product photographs, social assets, and link preview, including the full horizontal lockup in the mobile footer.
- Align the public marketing shell with the supplied SoleSheet palette: Deep Ink and Soft White establish the primary surfaces, SoleSheet Green provides brand emphasis, a darker accessible green supports white-text actions, and citrus remains a restrained secondary highlight instead of competing with an unrelated bright blue.
- Keep the standalone installment marketing section's payment phone consistent with the Payments planned-flow destination by reusing the same post-payment state, values, labels, and visual hierarchy.
- Keep PNG masters as deterministic authoring artifacts and publish optimized responsive derivatives for the website through one semantic image per selected destination.
- Maintain concise image-equivalent descriptions, selector focus/pressed semantics, 44px targets, mobile readability, no horizontal overflow, and visible product-preview disclosure.
- Retain the code-first social asset studio, deterministic capture workflow, and truthful upcoming-product labeling.
- Preserve the frontend-only boundary: no product backend, account, analytics, browser storage, buyer-data transmission, cloud sync, or production inventory behavior is introduced.

## Capabilities

### New Capabilities

- `social-marketing-assets`: Defines reusable code-rendered marketing compositions, supported export formats, honest product-preview labeling, deterministic capture, and visual/content consistency with the website.

### Modified Capabilities

- `product-mockup-showcase`: Makes the Flow gallery a responsive, selector-controlled set of static product photographs covering the seven approved destinations, with no operable controls inside depicted phones.

## Impact

- Affects the landing-page planned-flow selector, selected-panel rendering, product-preview asset registry, code-rendered mockup studio, capture script, generated desktop/mobile assets, public optimized derivatives, equivalent descriptions, and responsive tests.
- Reuses the existing Next.js, React, Tailwind CSS, Playwright, fixtures, typography, and product tokens; no new UI, gesture, image-generation, or screenshot dependency is planned.
- Retires the pending interactive Quick Log reducer, gesture, search-field, validation, and completion work in favor of deterministic static imagery whose behavior is communicated visually.
