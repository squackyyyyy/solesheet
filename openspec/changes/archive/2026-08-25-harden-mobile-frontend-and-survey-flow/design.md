## Context

The landing page uses one client-side waitlist journey, a responsive survey dialog, native disclosure elements, a wide semantic comparison table, and Cloudflare Turnstile. The comparison table has an intentional minimum width, while several ancestor grid and form containers depend on intrinsic sizing. The survey currently opens active-pair help in a new tab and permits empty completion. See `proposal.md` for motivation and the delta specs for observable requirements.

## Goals / Non-Goals

**Goals:**

- Eliminate document-level horizontal overflow from 320px upward while retaining an independently scrollable comparison table.
- Keep survey help inside the modal and preserve temporary state and focus.
- Align client and server validation around four required core answers and five optional follow-ups.
- Make disclosure state and CTA hierarchy visually consistent without changing the shared waitlist journey.

**Non-Goals:**

- Changing the survey questions, option allow-lists, D1 schema, signup persistence, or Turnstile provider.
- Making survey participation a condition of joining the waitlist.
- Rebuilding the pricing table for vertical card presentation.
- Implementing workflow-image preloading, which is planned separately.

## Decisions

### Contain intrinsic width at component boundaries

The pricing section, mobile disclosure, disclosure content, horizontal-scroll region, waitlist grid children, form, and verification container will explicitly allow shrinking and cap themselves to the viewport. The table will retain its minimum readable width only inside its scroll region. A page-level horizontal clipping safeguard will be added after the actual overflowing descendants are corrected. This preserves sticky table headers and intentional table scrolling instead of hiding inaccessible columns.

### Treat survey participation and survey completion separately

Closing the automatically offered survey remains valid because the waitlist signup is already stored. Once a visitor chooses to finish the survey, all four core answers are required; follow-ups and Other details remain optional. Client validation will guide the visitor to the first missing core question, while the API independently enforces the same rule. No D1 migration is necessary because required values already map to existing nullable columns and new accepted submissions will populate them.

### Flow directly into optional follow-ups

Standard answers on all four core questions retain brief automatic advancement, with the fourth answer moving directly to the first optional follow-up. From that point onward, **Finish this survey** remains available at lower emphasis while the current optional question remains skippable or answerable. This encourages more follow-up answers without requiring them or obscuring completion.

### Reveal active-pair help inline

The inventory-size question will use an accessible disclosure-style help control that reveals concise definition text in the question body. It will not change the URL, open a tab, close the modal, or reset focus and answers. Full FAQ links elsewhere remain unchanged.

### Use one disclosure state convention

FAQ and mobile comparison disclosures will expose plus while closed and minus while open. The native expanded state remains the programmatic source of truth. The mobile comparison summary owns its heading; the expanded content keeps only supporting copy to avoid duplication.

### Reduce CTA repetition without forking behavior

The narrow mobile header will omit its CTA because the hero action immediately follows, and the available header width will carry the horizontal SoleSheet lockup instead of switching to the compact mark. Hero, post-gallery, and pricing actions remain, with later actions allowed to use context-specific labels. All actions continue through the same journey controller, so joined and completed states remain synchronized.

## Risks / Trade-offs

- [Required core answers may reduce completed-survey volume] → Keep participation dismissible, retain only four required choices, use automatic advancement for the first three, and leave all follow-ups optional.
- [Global overflow clipping could conceal an unresolved child] → Add it only as defense-in-depth after viewport-width regression checks identify and constrain every overflowing component.
- [Inline help can increase question height] → Keep the definition concise and rely on the existing stable dialog body scroll region without resizing the outer sheet.
- [Context-specific CTA labels could obscure shared behavior] → Preserve consistent accessible intent and verify every CTA against each waitlist journey state.

## Migration Plan

1. Update survey client and server validation together with the privacy notice.
2. Apply layout, disclosure, active-pair-help, and CTA changes.
3. Run component/API tests, then responsive browser checks at 320px, 360px, 393px, 430px, and desktop.
4. Deploy as a backward-compatible application update; no D1 migration is required.
5. Roll back the application release if completion or layout regressions appear; existing stored surveys remain compatible.
