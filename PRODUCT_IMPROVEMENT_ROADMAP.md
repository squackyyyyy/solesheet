# SoleSheet Phased Product Improvement Roadmap

## Purpose

This document organizes the next waitlist-site and product-preview improvements into separate implementation phases. Each phase should become its own OpenSpec change so that scope, design decisions, acceptance criteria, and verification remain clear.

The priorities are:

1. Make the product mockup visibly prove a fast inventory workflow.
2. Turn that proof into reusable, post-ready social visuals.
3. Improve the waitlist and survey CTA lifecycle.
4. Clarify the founding-seller offer.
5. Demonstrate browser-based inventory entry as a Growth-plan advantage.

The current `add-modern-waitlist-page` change should be completed and archived before these phases are implemented, unless a new change has a deliberately non-overlapping scope.

## Recommended Phase Order

| Phase | Proposed OpenSpec change                | Main outcome                                                                        | Priority           | Relative size     |
| ----- | --------------------------------------- | ----------------------------------------------------------------------------------- | ------------------ | ----------------- |
| 1     | `add-progress-aware-waitlist-cta`       | CTA lifecycle and corrected founding-offer messaging                                | Quick win          | Small             |
| 2     | `add-quick-log-proof-and-social-assets` | Responsive Flow photographs, anchored Quick Actions cue, and reusable social assets | Critical           | Large             |
| 3     | `add-growth-web-quick-add-showcase`     | Static browser Quick-Add mockup showing Growth batch entry                          | High               | Medium            |
| 4     | `add-founding-offer-redemption`         | Durable eligibility, unique codes, and first-year Starter discount enforcement      | Before paid launch | Backend-dependent |

Phases 1–3 remain validation-stage frontend work. Phase 4 requires real persistence, identity, and billing integration and should not be presented as functional until those systems exist.

## Pricing Direction

The validation-stage pricing story should keep the free tier genuinely useful and charge for protection, scale, and operational time savings:

- **Free:** up to 20 active pairs, local-only records, search and filtering, profit and installment tracking, sold history, and local export.
- **Starter — ₱99/month:** up to 150 active pairs, automatic cloud backup and recovery, installment reminders, and monthly business summaries.
- **Growth — ₱349/month or ₱3,490/year:** up to 750 active pairs, cloud synchronization, browser Quick-Add, spreadsheet import, and advanced reports.

All amounts remain planned validation-stage pricing until the product, payment flow, and customer research are ready for launch. A future Pro/Team price is intentionally deferred until team-specific value is validated.

---

## Phase 1 — Progress-Aware Waitlist CTA and Offer Messaging

**Proposed OpenSpec change:** `add-progress-aware-waitlist-cta`

### Goal

Make every waitlist CTA reflect the visitor's current progress in the same page session and use the post-signup state to encourage survey completion.

### CTA state model

```text
NOT JOINED
    │ valid waitlist form completion
    ▼
JOINED — SURVEY INCOMPLETE
    │ survey completion
    ▼
SURVEY COMPLETE
```

### Recommended CTA presentation

| State                     | Primary CTA label              | Behavior                                                 | Supporting message                                        |
| ------------------------- | ------------------------------ | -------------------------------------------------------- | --------------------------------------------------------- |
| Not joined                | **Join the waitlist**          | Focus or scroll to the waitlist form                     | None required                                             |
| Joined, survey incomplete | **Answer the quick survey**    | Open the survey and restore in-session answers           | “You’re on the waitlist. Help shape what we build first.” |
| Survey complete           | **You’re all set — thank you** | Disabled/non-actionable completion state with check icon | “Thanks for helping shape SoleSheet.”                     |

“You’re all set — thank you” is preferable to “Thank you for joining” because it confirms that both actions are complete and does not look like another invitation to click.

### Scope

- Give all waitlist CTAs one shared state source so header, hero, pricing, and final-section CTAs change together.
- Preserve the three states only in component memory for the current prototype.
- Reset to “Not joined” when the page reloads, consistent with the existing non-saving prototype.
- Keep the completed state visibly distinct without relying only on color.
- Announce CTA state changes to assistive technology.
- Keep the survey reopenable while it is incomplete.
- Avoid claiming that the waitlist or survey was permanently saved.

### Founding-offer copy update

Recommended concise copy:

> **Founding Starter offer**  
> Planned for the first 50 eligible survey respondents: Starter at ₱65/month for their first 12 paid months.

Recommended longer clarification:

> The planned founding rate applies only to the Starter plan and ends after the first 12 paid months. Standard Starter pricing would apply afterward. Eligibility and redemption details will be confirmed before launch.

Update every occurrence, including the pricing section, upgrade mockup, FAQ, survey options, and centralized product copy. Remove the current “first 50–100 paying users while active” language.

### Important validation-stage limitation

The current frontend-only prototype cannot determine the real first 50 respondents, deduplicate people, reserve eligibility, or honor a discount later. Phase 1 changes the presentation and in-session state only. Durable eligibility belongs to Phase 4.

### Recommended eligibility definition to decide before public launch

“First 50 survey answers” needs an exact rule. Recommended definition:

> The first 50 unique waitlist members with a valid contact identifier who finish the survey after answering the four core questions: platform, inventory size, current tool, and priority feature.

The survey remains optional, but the founding offer is an incentive for providing a useful response. This avoids empty survey submissions claiming limited slots.

### Acceptance criteria

- All CTA instances display the correct label and action for each of the three states.
- Joining changes every CTA to the survey action immediately.
- Completing the survey changes every CTA to the final disabled state.
- Closing and reopening an incomplete survey retains answers within the session.
- Reloading the page returns the visual prototype to its initial state.
- Founding-offer language consistently says: first 50 eligible survey respondents, Starter only, first 12 paid months.
- No API, storage, cookie, analytics, or backend submission is introduced.

---

## Phase 2 — Responsive Flow Photographs and Social Assets

**Active OpenSpec change:** `add-quick-log-proof-and-social-assets`

### Goal

Make SoleSheet feel immediately faster than a spreadsheet without turning the waitlist page into a disposable mini-application. Lead with one polished Quick Sale photograph inside the broader planned journey, and generate post-ready Facebook and Instagram visuals from the same code and fictional data.

### Approved experience model: responsive static product photographs

The product section leads with **“A quicker way to keep your stockroom current.”** Under **“The rest of the planned flow,”** Quick Sale is the default, visually emphasized **Fastest path** selection. Seven selectors reveal Quick Sale, Quick Actions, Search Stock, Add Stock, Installments, Payments, and Backup.

Each selected destination is one photo-style static product preview. Desktop uses a separately composed 4:3 image and mobile uses a separately composed 2:3 image, so the phone UI stays legible, the Quick Log trigger remains visible, and the result does not become a scaled desktop crop. Only the planned-flow selectors operate; the fields, buttons, menus, and navigation pictured inside the images never become app controls on the waitlist page.

### Home quick-action direction

The Quick Actions photograph shows a circular emerald `+` floating above the bottom navigation with a visible **Quick Log** label. In the eventual product, holding it opens a short anchored menu:

- Sell a pair
- Record a payment
- Add a pair

Tapping starts Quick Sale immediately. Sale and payment actions select an existing inventory or installment record first. The shortcut appears on Home, stays out of form screens, and complements rather than replaces contextual actions. On the waitlist site it remains part of a non-focusable image with an equivalent description; it does not respond to a real hold.

### Quick Sale essentials

1. Search existing stock by model, size, or colorway
2. Select a sellable pair and prefill size, colorway, and cost
3. Enter the selling price
4. Confirm the today-defaulted sold date and paid/installment choice

The Quick Sale example is **Nike Dunk Low · Cacao Wow · US 8.5**, cost **₱4,800**, selling price **₱6,500**. Search Stock and Add Stock use **New Balance 530 · White / Silver · US 7**, cost **₱4,200**, and optional target **₱5,600** to show that both finding and encoding an exact pair remain lightweight.

### Installment preview

The planned-flow Payments screen and social assets retain the fictional Nike Dunk Low example: **₱6,500 sale price**, **₱4,000 collected**, and **₱2,500 remaining**. Social before/after compositions may show a fictional **₱1,500** payment updating the figures to **₱5,500 collected** and **₱1,000 remaining**, but the public website does not ask visitors to record it.

### Privacy and scope boundaries

- No public product form, record mutation, payment action, reset control, or demo state is introduced.
- Selector changes create no product API call, account, analytics event, cookie, local storage, cloud sync, or buyer data.
- The seven-item planned flow uses real React Aria selector buttons with keyboard, touch, visible-focus, and selected-state support.
- Every selected product surface is one image-equivalent, non-focusable responsive photograph.
- Product-photo upload, barcode scanning, AI recognition, import, unrestricted editing, and production payment handling remain out of scope.

### Code-first social workflow

Reuse the same product primitives, tokens, copy, and snapshot values to render:

- Four 1080×1350 Quick Log carousel frames
- Four 1080×1350 installment carousel frames
- One 1080×1920 Quick Log Story
- One 1080×1920 installment Story
- One 1200×630 link preview

An explicitly enabled, non-indexable local authoring route and Playwright capture command produce stable PNG filenames plus a manifest in `artifacts/social/`. Figma is not the source of truth, and no Figma session is required to revise or regenerate the initial set.

### Acceptance criteria

- All fourteen Flow masters have exact 3200×2400 desktop or 1600×2400 mobile dimensions, with optimized WebP delivery copies.
- The Quick Actions photograph makes the held `+` menu obviously anchored without exposing a fake button to assistive technology.
- Quick Sale is the default emphasized selector; Quick Actions, Search Stock, Add Stock, Installments, Payments, and Backup remain accessible.
- Selector changes create no data-bearing request or durable storage write.
- Real selectors have visible focus, keyboard support, 44×44 CSS targets, pressed-state semantics, and concise live status announcements.
- All eleven social PNGs match their required dimensions, stable names, approved preview disclosure, and shared product values.
- The social studio is unavailable without its task-specific environment flag and is never linked from the public waitlist page.
- Lint, type checks, unit/component tests, browser journeys, capture verification, and the production build pass.

---

## Phase 3 — Growth Web Quick-Add Showcase

**Proposed OpenSpec change:** `add-growth-web-quick-add-showcase`

### Goal

Show why the Growth plan is valuable for resellers who prefer encoding several pairs from a laptop or desktop browser. This is a static product mockup for communicating the feature, not an interactive demo.

The strongest presentation is not a larger copy of the mobile form. It should depict a polished batch-entry workspace so visitors immediately understand how they could encode many pairs efficiently.

### Recommended browser-side experience

- A realistic desktop browser frame visually distinct from the mobile app shell.
- A Growth-plan label and short explanation of browser quick-add.
- A compact, populated batch-entry table with columns for brand/model, size, colorway, cost, target price, and starting status.
- Visible examples of Add row, Duplicate row, Delete row, and Save batch controls to communicate the intended workflow, without making them operable.
- A static summary such as “12 pairs ready” and an estimated inventory cost.
- A small visual cue showing that the entered pairs would become available in mobile inventory.
- Visual styling based on the same React Aria component patterns intended for the future browser app, while keeping the landing-page mockup non-interactive.
- An equivalent accessible text description of the feature and screen contents.

### Recommended positioning

> Add one pair quickly from your phone—or encode multiple entries from your browser. Web Quick-Add is planned for Growth sellers who handle inventory in multiple quantities.

This feature should remain a Growth-plan differentiator. The mobile app must still support adding individual pairs; otherwise the paid feature would weaken the core mobile promise.

### Scope boundaries

- The browser mockup is entirely static: no editable fields, row actions, simulated saving, local state, or interactive walkthrough.
- Do not expose presentation-only controls as focusable buttons, fields, or table widgets.
- Depict manual batch entry first.
- Show CSV import only as “planned,” if it is shown at all.
- Do not imply live cloud sync is functional in the frontend prototype.
- Reuse the same inventory field definitions and sample data as the mobile demo.

### Acceptance criteria

- The page includes a polished desktop quick-add mockup that is visually understandable on both mobile and desktop landing-page layouts.
- The static screen clearly communicates batch entry, duplicate-row convenience, inventory cost, and the connection to mobile inventory.
- No part of the browser mockup appears in the accessibility tree as a usable control.
- A concise accessible description conveys the information represented visually.
- The mockup follows the intended React Aria visual language without adding browser-demo interaction or state.
- Growth pricing and feature copy consistently identify Web Quick-Add as a Growth feature.

---

## Phase 4 — Founding Offer Eligibility and Redemption

**Proposed OpenSpec change:** `add-founding-offer-redemption`

### Goal

Make the first-50 founding Starter offer enforceable once SoleSheet has a real waitlist backend, accounts, and billing.

### Is the discount possible?

Yes, but not reliably in the current frontend-only prototype. A production implementation needs to record who qualified, prevent duplicate claims, and apply a time-limited recurring discount only to the Starter subscription.

### Recommended mechanism

1. Store a server-side sequence for valid survey completions.
2. Mark the first 50 unique qualifying waitlist members as eligible.
3. Issue each eligible person a unique, single-use redemption code or signed redemption link.
4. Bind redemption to the same verified email, phone number, or future account.
5. At checkout, allow the code only for the Starter plan.
6. Apply ₱65/month for the first 12 paid billing cycles.
7. Automatically move the subscription to the normal Starter price after month 12, with clear advance disclosure.
8. Record issued, redeemed, expired, and revoked states for support and audit purposes.

### Voucher-code recommendation

Unique codes are a sensible launch approach. Do not use one public code such as `FOUNDER65`; it can be shared and cannot reliably enforce the first-50 rule. Each code should:

- Be generated by the backend.
- Be single-use.
- Be restricted to Starter.
- Expire on a published date if unused.
- Apply for 12 paid months, not forever.
- Be linked to an eligibility record.

For a small pilot, the first 50 codes can be issued manually after reviewing responses, as long as the eligibility list and redemptions are still stored centrally. Later, code issuance can be automated through the selected billing provider.

### Decisions required before implementation

- Exact minimum answers required for a qualifying survey.
- Whether eligibility is based on submission time or manual qualification time.
- How long an unused offer remains reservable.
- Whether a cancelled subscription loses the remaining discount.
- Whether changing plans ends the discount.
- The standard Starter price after month 12.
- Billing provider and its support for recurring, duration-limited discounts.
- Required offer terms, privacy language, and customer notice before the price changes.

### Acceptance criteria

- No more than 50 unique eligibility records can be issued for the campaign.
- Duplicate contacts cannot receive additional founding slots.
- Each code can be redeemed once and only for Starter.
- The discount lasts exactly the first 12 paid billing cycles.
- The normal price and transition timing are disclosed before checkout.
- Support can determine eligibility and redemption status without inspecting raw survey answers unnecessarily.
- Failed, cancelled, refunded, and plan-change scenarios have explicit rules and tests.

---

## Shared Principles Across All Phases

- Keep the validation website honest about what is planned versus functional.
- Preserve compositional separation between the editorial waitlist shell and the product UI while letting both share the SoleSheet Green, Deep Ink, Soft White, and accessible dark-green family.
- Use one shared content registry for pricing, offer terms, CTA labels, and feature claims.
- Use shared deterministic product fixtures and believable sample records across responsive Flow photographs and social compositions.
- Design for a 360px Android viewport first, then verify larger mobile and desktop layouts.
- Use React Aria Components for real interactions and accessible state management. Presentation-only browser mockup controls must not pretend to be operable.
- Keep sample data realistic for Filipino shoe resellers and format money in Philippine pesos.
- Never collect or transmit buyer data from the public product preview.
- Add component, browser, touch, keyboard, accessibility, and non-persistence tests within each phase rather than deferring verification.

## Next OpenSpec Action

Complete and visually verify the active Phase 2 responsive-photo change before starting Phase 3. The Flow photographs and generated social images are now the primary surfaces people will use to judge whether SoleSheet looks genuinely faster than their spreadsheet.

Do not create all four OpenSpec changes at once. Create each proposal when the previous phase is sufficiently clear or complete so new learning can influence the next phase.
