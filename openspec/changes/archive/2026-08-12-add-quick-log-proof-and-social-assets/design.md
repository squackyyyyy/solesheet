## Context

See [proposal.md](proposal.md) for motivation and [specs/product-mockup-showcase/spec.md](specs/product-mockup-showcase/spec.md) for observable behavior. The current public gallery uses selector buttons around code-drawn phone fragments, while the pending plan would turn Quick Log into a miniature interactive application. The approved direction instead treats every destination as a polished static product photograph. The gallery selectors remain real controls; everything depicted inside a selected image is presentation-only.

Three 4:3 desktop masters already establish the approved style: Quick Sale, Quick Actions, and Installment Setup. The implementation must extend that system to Search Stock, Add Stock, Payments, and Backup, create independent taller 2:3 mobile compositions for all seven destinations, and use optimized public derivatives without making Figma or an image-generation model the source of truth.

## Goals / Non-Goals

**Goals:**

- Give every Flow destination a consistent, photo-style static composition.
- Keep product labels, peso values, dates, fields, and menu placement exact through code rendering.
- Use separate desktop and mobile art direction so product UI remains readable at 360px.
- Make Quick Sale, anchored Quick Actions, stock search, and stock entry feel visibly fast.
- Keep the public interaction model limited to accessible selector buttons.
- Preserve deterministic regeneration, equivalent descriptions, honest preview labeling, and responsive performance.

**Non-Goals:**

- Building an interactive product demo, long-press recognizer, menu, form, reducer, validation flow, temporary completion state, or backend behavior.
- Making depicted phone controls focusable, clickable, searchable, editable, or available to assistive technology as individual elements.
- Using one desktop image for every viewport through shrinking or destructive cropping.
- Generating UI text with an image model or making Figma the asset source of truth.
- Loading full-resolution PNG masters directly for every public visitor.

## Decisions

### 1. Use seven selector destinations with one image panel

The selector order is:

1. **Quick Sale** — default and Fastest path
2. **Quick Actions**
3. **Search Stock**
4. **Add Stock**
5. **Installments**
6. **Payments**
7. **Backup**

The previous Overview destination is folded into Quick Actions because that composition already uses the Home dashboard as the setting for the anchored `+` menu. The previous Sell destination becomes Quick Sale, avoiding two destinations that tell the same story.

Only selector buttons update React state. The selected panel renders a single responsive figure and a concise live announcement. No event handler, pointer gesture, form control, or navigation target exists inside the image panel.

Alternative considered: keep Overview and Sell as separate destinations. Rejected because Overview duplicates the Quick Actions dashboard and Sell duplicates the default Quick Sale path, creating unnecessary tabs without adding a distinct product moment.

### 2. Keep a centralized Flow asset registry

One typed registry stores, for every destination:

- stable id and selector label
- short title and Fastest path flag
- desktop PNG-master filename
- mobile PNG-master filename
- optimized public desktop and mobile filenames
- intrinsic desktop and mobile dimensions
- one equivalent nonvisual description

The gallery and capture script consume the same registry. Tests assert unique ids and filenames, complete desktop/mobile pairs, expected dimensions, truthful Product preview disclosure, and required product facts. Product values come from the existing fictional fixtures where they overlap application or social content.

Alternative considered: hardcode file paths and descriptions inside the selector component. Rejected because capture, rendering, and tests would drift independently.

### 3. Compose desktop and mobile art independently

Desktop master dimensions remain 1600×1200 CSS pixels captured at device scale 2, producing 3200×2400 PNGs. Mobile master dimensions are 800×1200 CSS pixels captured at device scale 2, producing 1600×2400 PNGs.

Desktop compositions use an editorial text column beside an angled phone. Mobile compositions use a shorter headline, reduced framing copy, a realistically tall phone shell, and an intentional tilted crop that lets the device continue beyond the composition edge without looking unnaturally short. Supporting evidence is reordered so essential UI remains readable at rendered mobile width. Mobile is not a crop of desktop and does not rely on browser `object-position` to rescue the composition.

All seven destinations share:

- SoleSheet Grid Shoe identity and visible Product preview disclosure
- Geist typography
- warm stone, emerald, citrus, amber, and restrained dark surfaces
- angled black phone shell, realistic ambient shadow, subtle glare, and background depth
- fictional Philippine-peso values and concise operational copy

The taller mobile frame must keep the complete Quick Actions menu and its anchored `+` trigger visible together. Alternative considered: capture only desktop and let CSS shrink it. Rejected because headline and in-phone UI become too small at 360px.

### 4. Show exact static states for search and add

**Search Stock** depicts a compact query such as `530 7 silver`, a small count, and distinguishable results. The primary result is New Balance 530 · US 7 · White / Silver with Available status, ₱4,200 cost, and ₱5,600 target. Supporting results demonstrate that model, size, colorway, and status remain visible without turning the image into a dense catalog.

**Add Stock** depicts the essentials-first record: New Balance 530, US 7, White / Silver, ₱4,200 cost, visibly optional ₱5,600 target, and one Add pair action. Secondary copy communicates that details can be completed later.

Both states remain static. Their purpose is to communicate intended ease, not prove a working search algorithm or persistence.

### 5. Preserve the approved states for sale, hold, installments, payments, and backup

- Quick Sale keeps the selected Nike Dunk Low, read-only size/colorway/cost, ₱6,500 selling price, Aug 11 sold date, payment choice, and sale action.
- Quick Actions keeps the three-row menu visibly anchored above the dashboard `+` and the Hold + for more instruction.
- Installments keeps the same sale context, ₱2,500 down payment, ₱4,000 starting balance, and Aug 18 due date.
- Payments depicts one later ₱1,500 installment payment moving collected from ₱4,000 to ₱5,500 and remaining from ₱2,500 to ₱1,000 while remaining Partially paid.
- Backup compares local-only use with the planned ₱99/month Starter backup option and never implies that cloud service is available today.

### 6. Separate master artifacts from website delivery assets

The capture script writes high-resolution PNG masters to `artifacts/flow-mockups/` using stable filenames and dimension checks. It also produces or derives optimized WebP files under `public/flow-mockups/` for website delivery. PNGs remain suitable for Figma import, review, and future recapture; the public gallery does not ship multi-megabyte masters by default.

The selected figure uses a semantic `<picture>` element with a mobile `<source>` at the agreed breakpoint and a desktop fallback image. Intrinsic width and height are present to reserve layout space. Only the selected destination is mounted, and the browser selects the matching responsive source. The image uses its registry description as `alt`; surrounding explanatory copy does not duplicate every depicted label.

Alternative considered: use the high-resolution PNG masters directly. Rejected because each existing master is over two megabytes and mobile visitors do not benefit from desktop dimensions.

### 7. Keep the capture studio private and deterministic

The existing non-indexed local authoring pattern is reused. Named Flow compositions render only from an explicitly supported development/authoring context and are never linked from public navigation. Playwright waits for fonts and a capture-ready marker, disables animation, captures both aspect ratios at device scale 2, validates PNG headers and dimensions, and writes a manifest.

The source composition remains code-rendered HTML/CSS. This preserves exact text and makes review changes reproducible without Figma MCP capacity or manual browser cropping.

### 8. Test selectors, image semantics, art direction, and layout instead of demo behavior

Component tests cover default selection, seven selector labels, selected/pressed semantics, Fastest path emphasis, source filenames, one equivalent description, and absence of operable descendants inside the selected figure.

Browser tests at 360px and 1440px cover keyboard selection, 44px targets, visible focus, concise announcements, the mobile or desktop source in use, no horizontal overflow, no nested scroller, reduced-motion stability, and absence of product-data network/storage writes. Asset tests cover all fourteen PNG masters, public derivatives, exact dimensions, stable filenames, and required copy. Visual review inspects every destination at both native aspect ratios and in the real gallery.

### 9. Let the SoleSheet brand kit lead the marketing palette

The public landing-page shell uses the supplied brand colors as named tokens: SoleSheet Green `#22C55E`, Deep Ink `#14213D`, and Soft White `#F7FAF5`. Deep Ink replaces generic black for major type and dark sections; Soft White becomes the principal page surface; exact SoleSheet Green is reserved for brand accents, icons, rules, and treatments where its contrast is sufficient.

White-text primary buttons use the existing darker emerald `#047857` as an accessible action-green companion rather than placing white text directly on the brighter logo green. Citrus `#E8FF9F` remains a restrained secondary highlight for fastest-path and founding-offer moments. The former marketing blue is removed from primary buttons, selected gallery controls, focus treatments, and decorative section backgrounds so the page no longer appears to carry a second brand.

Alternative considered: replace every green with the exact logo green. Rejected because the brighter green does not provide sufficient contrast with white text at normal control sizes. The accessible dark green keeps interaction legible while remaining visibly related to the supplied identity.

### 10. Use one canonical recorded-payment snapshot

The Payments planned-flow photograph and the payment phone in the standalone installment marketing section represent the same product moment: a ₱1,500 payment has just been recorded. Shared fictional fixtures provide the before and after amounts and progress, while each renderer adapts density to its own phone size. Both retain the same hierarchy: payment received, Partially paid status, collected and remaining changes, progress, history, and recorded confirmation.

The standalone section keeps its established editorial layout and decorative treatment. Its surrounding copy and metrics update to the post-payment totals so the section does not contradict its own phone. Alternative considered: place the full Flow photograph in the section. Rejected because that would duplicate the photograph's marketing headline and framing instead of showing the app UI directly.

## Risks / Trade-offs

- **[Static images can become stale]** → Generate them from the same typed registry, fixtures, and code-rendered source used by tests.
- **[Fourteen masters increase repository size]** → Keep PNGs in artifacts for authoring and serve compressed WebP derivatives publicly; avoid duplicate interim captures.
- **[Mobile art can drift from desktop]** → Render both variants from the same destination component and content model while allowing explicit layout branches.
- **[Phone UI can become unreadable in the real tab panel]** → Inspect at 360px rendered width, not only at native dimensions, and shorten mobile framing copy before reducing product UI.
- **[Images can be mistaken for released functionality]** → Keep Product preview visible in every composition and avoid interactive cursor/focus treatments inside the depicted phone.
- **[Selector row can overflow with seven labels]** → Use the existing responsive wrapping grid and verify native page width rather than introducing horizontal scrolling.

## Migration Plan

1. Replace the pending interactive task plan with the responsive static-asset tasks.
2. Expand the Flow registry and composition studio to seven destinations and two aspect ratios.
3. Capture and visually approve all PNG masters, then create public WebP derivatives.
4. Replace `DeviceFrame`, `QuickLogStory`, and other selected-panel fragments in the public gallery with one registry-driven responsive figure.
5. Update documentation, tests, and generated asset manifests.
6. Run strict OpenSpec validation, lint, typecheck, component tests, browser tests, capture verification, production build, and mobile/desktop visual review.

Rollback restores the previous code-drawn selected panels while leaving the generated masters and private authoring studio intact. No backend or persistent migration is required.
