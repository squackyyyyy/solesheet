# ShoeTrack Phased Product Improvement Roadmap

## Purpose

This document organizes the next waitlist-site and product-demo improvements into separate implementation phases. Each phase should become its own OpenSpec change so that scope, design decisions, acceptance criteria, and verification remain clear.

The priorities are:

1. Make the product mockup genuinely useful to explore.
2. Demonstrate an exceptionally fast inventory and sales workflow.
3. Improve the waitlist and survey CTA lifecycle.
4. Clarify the founding-seller offer.
5. Demonstrate browser-based inventory entry as a Growth-plan advantage.

The current `add-modern-waitlist-page` change should be completed and archived before these phases are implemented, unless a new change has a deliberately non-overlapping scope.

## Recommended Phase Order

| Phase | Proposed OpenSpec change | Main outcome | Priority | Relative size |
| --- | --- | --- | --- | --- |
| 1 | `add-progress-aware-waitlist-cta` | CTA lifecycle and corrected founding-offer messaging | Quick win | Small |
| 2 | `add-interactive-quick-log-demo` | Interactive, in-memory mobile demo with optimized core UX | Critical | Large |
| 3 | `add-growth-web-quick-add-showcase` | Static browser Quick-Add mockup showing Growth batch entry | High | Medium |
| 4 | `add-founding-offer-redemption` | Durable eligibility, unique codes, and first-year Starter discount enforcement | Before paid launch | Backend-dependent |

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

| State | Primary CTA label | Behavior | Supporting message |
| --- | --- | --- | --- |
| Not joined | **Join the waitlist** | Focus or scroll to the waitlist form | None required |
| Joined, survey incomplete | **Answer the quick survey** | Open the survey and restore in-session answers | “You’re on the waitlist. Help shape what we build first.” |
| Survey complete | **You’re all set — thank you** | Disabled/non-actionable completion state with check icon | “Thanks for helping shape ShoeTrack.” |

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

## Phase 2 — Interactive Mobile Demo and Best-in-Class Quick Logging

**Proposed OpenSpec change:** `add-interactive-quick-log-demo`

### Goal

Turn the static phone mockups into a coherent in-memory product sandbox that lets visitors experience how quickly ShoeTrack handles a pair from inventory entry through sale and installment collection.

This phase combines interactivity and UX improvement. Building interactivity around the current static screens first and redesigning the UX afterward would create avoidable rework.

### Recommended demo model: guided sandbox

| Option | Strength | Weakness |
| --- | --- | --- |
| Scripted tour | Easy to understand and implement | Feels like another slideshow; little user agency |
| Free sandbox | High agency and product realism | Visitors may not know what to try; larger scope |
| **Guided sandbox — recommended** | Clear suggested journey with freedom to explore and reset | Requires careful state and guidance design |

The guided sandbox should provide a subtle “Try this next” cue while preserving normal navigation. It should never trap the user in a forced tutorial.

### Core interactive journey

```text
Dashboard
   ├── Add pair ──▶ Quick Add ──▶ Saved confirmation ──▶ Inventory
   │                                                  │
   └──────────────────────────────────────────────────┘
                                                      ▼
                                              Select a pair
                                                      │
                                  ┌───────────────────┴──────────────┐
                                  ▼                                  ▼
                              Reserve                           Mark sold
                                                                     │
                                                    ┌────────────────┴──────────────┐
                                                    ▼                               ▼
                                               Fully paid                      Installment
                                                                                    │
                                                                                    ▼
                                                                            Add payment
                                                                                    │
                                                                                    ▼
                                                                    Totals and status update
```

### In-memory product behavior

- Start from a believable sample reseller inventory.
- Let users add, edit, reserve, sell, and inspect pairs.
- Let users choose fully paid or installment when recording a sale.
- Let users add a payment and see collected and remaining balances update.
- Recalculate visible dashboard totals from the demo state rather than showing unrelated fixed numbers.
- Keep all records in memory only and reset everything on reload.
- Provide an explicit **Reset demo** action so visitors can safely experiment again.
- Show concise success feedback after meaningful actions.

### Fast inventory-entry UX recommendation

The quickest credible flow is “essentials first, details when needed.”

#### Default Quick Add

1. Brand and model
2. Size
3. Cost price
4. Target price, optional but visible
5. Save

The remaining fields—colorway, date acquired, notes, and starting status—belong under **More details** or receive sensible defaults. New pairs default to Available and today's date.

#### Speed features worth demonstrating

- **Save and add another** for encoding several pairs.
- **Duplicate pair** for the same model/colorway in another size.
- Remember the last-used brand and model within the demo session.
- Numeric keyboards for peso fields on mobile.
- Inline peso formatting without forcing users to type currency symbols.
- Immediate validation beside the field instead of an error summary after submission.
- A compact saved confirmation with a direct path to inventory.
- A sticky primary action that remains reachable above the mobile browser controls.

#### What not to add in this phase

- Product-photo upload
- Barcode scanning
- AI shoe recognition
- CSV import
- Accounts, authentication, or cloud sync
- Real buyer data or production payment processing

These would distract from validating the core promise: logging and updating stock faster than a spreadsheet.

### UX and accessibility requirements

- The device should become a real interactive application region, not a `role="img"` with hidden descendants.
- Use React Aria Components for buttons, text fields, number fields, selects, radio groups, dialogs/sheets, and feedback states where applicable.
- Support touch, mouse, and keyboard navigation.
- Keep touch targets at least 44×44 CSS pixels even when the phone is visually scaled.
- Ensure focus remains visible inside the device frame.
- Announce saved records, status changes, and payment updates.
- Avoid nested controls and horizontal scrolling inside forms.
- Offer a short equivalent text summary outside the demo for visitors who do not want to operate it.
- Respect reduced-motion preferences.

### Open UX questions for the Phase 2 proposal

1. Should Brand + Model be one searchable combobox or two fields?  
   **Recommendation:** one searchable model picker that shows the brand, with a manual-entry option.
2. Should Target price be required?  
   **Recommendation:** optional; Cost is essential for capital tracking, while target price may not yet be known.
3. Should saving return to inventory or keep the form open?  
   **Recommendation:** primary action returns to the saved item; secondary “Save and add another” starts a fresh form.
4. Should the demo allow editing every sample pair?  
   **Recommendation:** yes for status and sale actions; full field editing can be limited to the pair created by the visitor.
5. Should the guided cue automatically advance?  
   **Recommendation:** update the cue after success, but never navigate automatically.

### Acceptance criteria

- Every displayed app action that looks interactive is operable.
- A visitor can complete the add → sell → installment → payment journey without leaving the page.
- Demo inventory, dashboard totals, statuses, profit, and balances remain internally consistent.
- Quick Add supports Save, Save and add another, and Duplicate pair.
- The entire demo is keyboard- and touch-operable at a 360px viewport.
- Reset restores the exact initial sample dataset.
- Reload discards all visitor-entered demo data.
- No request containing demo data leaves the browser.

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

> Add one pair quickly from your phone—or encode a full delivery from your browser. Web Quick-Add is planned for Growth sellers who handle inventory in batches.

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

Make the first-50 founding Starter offer enforceable once ShoeTrack has a real waitlist backend, accounts, and billing.

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
- Preserve the separation between the editorial waitlist visual system and the stone/emerald product UI.
- Use one shared content registry for pricing, offer terms, CTA labels, and feature claims.
- Use one shared in-memory domain model for the interactive mobile demo; reuse its field definitions and believable sample records in the static web mockup.
- Design for a 360px Android viewport first, then verify larger mobile and desktop layouts.
- Use React Aria Components for real interactions and accessible state management. Presentation-only browser mockup controls must not pretend to be operable.
- Keep sample data realistic for Filipino shoe resellers and format money in Philippine pesos.
- Never collect or transmit buyer data from the public demo.
- Add component, browser, touch, keyboard, accessibility, and non-persistence tests within each phase rather than deferring verification.

## Next OpenSpec Action

Start with Phase 1 as a small change, then begin Phase 2 immediately after it. Phase 2 should receive the deepest product-design discussion because it defines the experience visitors will use to judge whether ShoeTrack is genuinely faster than their spreadsheet.

Do not create all four OpenSpec changes at once. Create each proposal when the previous phase is sufficiently clear or complete so new learning can influence the next phase.
