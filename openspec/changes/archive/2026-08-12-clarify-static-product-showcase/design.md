## Context

See `proposal.md` for motivation. The public `/` route renders `MockupShowcase` as a selector-controlled `<picture>` gallery; no live product state, form, or workflow simulation is mounted in that section. The gallery already explains that phone controls are inoperative, but its outer introduction still tells visitors to “Start with Quick Sale,” and its inner eyebrow says “The rest of the planned flow” even though the earlier interactive proof was removed.

That removal also left several demo-only modules and exports without live consumers. Static and social asset compositions still use selected proof presentation helpers, so cleanup must be based on actual import reachability rather than deleting whole utility files by name.

## Goals / Non-Goals

**Goals:**

- Give the product section one clear hierarchy that distinguishes the upcoming app from the static gallery used to explain it.
- Preserve every current gallery behavior, image source, workflow destination, and accessibility affordance.
- Remove demo-era code only when a repository-wide reference check proves it has no production, authoring, or test consumer beyond tests dedicated to that dead code.
- Keep the resulting terminology consistent in visible copy, accessible names, unit tests, browser tests, and specifications.

**Non-Goals:**

- Reintroducing an interactive demo or changing selector behavior.
- Redesigning or recapturing the fourteen flow photographs.
- Changing workflow names, mock data, pricing, waitlist behavior, or the recently added Home analytics visualization.
- Removing shared proof components that remain in use by social asset compositions.

## Decisions

### 1. Separate product positioning from gallery instructions

The outer product section will introduce the upcoming app:

- Label: **Inside SoleSheet**
- Heading: **See the workflows we’re building for everyday reselling.**
- Description: **Browse seven product previews—from logging a sale to recording installment payments and protecting your records. These screens illustrate the planned app.**

The nested gallery will explain the image-switching interface:

- Eyebrow: **Product preview gallery**
- Heading: **Seven everyday workflows, shown clearly.**
- Helper: **Select a moment to switch the preview image. Controls pictured inside the phone are illustrative and do not operate here.**

This division lets the outer copy answer “what is this product?” and the inner copy answer “how does this gallery behave?” without repeating the same speed claim.

Alternative considered: change only “The rest of the planned flow.” That would remove the most obvious artifact but leave the demo-like “Start with Quick Sale” instruction and duplicated quickness framing.

### 2. Keep the selector semantics and images unchanged

`MockupShowcase` will retain the existing seven buttons, selected state, live selection announcement, responsive `<picture>` sources, Quick Sale default, Fastest path badge, and static figure. The change is limited to headings and explanatory copy, so no flow composition or generated image needs recapture.

Alternative considered: replace selectors with a noninteractive stacked gallery. That would make the static nature obvious but increase page length and download pressure while discarding accessible navigation that already works correctly.

### 3. Remove dead demo code by proven reachability

Before deletion, repeat repository-wide symbol searches excluding generated build output and archived planning artifacts. Based on the current graph:

- Remove the orphaned `QuickLogStory` module.
- Remove `InteractiveProofShell` and `PaymentHistory` from the shared proof-views module while retaining `PreviewDisclosure`, `ProofMetric`, `ProofInventoryRow`, and `PaymentProgress`, which are consumed by social compositions.
- Remove `AppProofTabs` and its now-unused Tabs imports from the shared ARIA module.
- Remove the product-proof reducer module and its dedicated test after removing the last `DemoPayment` type consumer.

If implementation discovers any live or authoring consumer not visible in the current import graph, preserve that code and narrow the cleanup task rather than forcing deletion.

Alternative considered: retain all dead code because it does not affect the bundle route. That avoids deletion risk but leaves misleading demo terminology and maintenance surface in a project that has intentionally moved to static product proof.

### 4. Test the public contract, not deleted internals

Update component and browser tests to assert the new section label, heading, explicit static/not-live-demo disclosure, gallery eyebrow and heading, seven selectors, Quick Sale default, responsive source selection, and absence of focusable controls inside the selected photograph. Remove tests that exercise only the deleted reducer; retained static/social helpers continue to be covered by their existing asset and composition tests.

## Risks / Trade-offs

- **[The section becomes over-explanatory]** → Keep the “not a live demo” disclosure in one concise outer sentence and use the inner helper only for selector mechanics.
- **[Copy changes weaken the speed value proposition]** → Retain the Fastest path badge and speed-focused editorial copy inside individual Quick Sale imagery rather than repeating it in both section headings.
- **[Dead-code removal breaks an authoring-only route]** → Search all application, script, and test imports before deletion and run typecheck, build, social/flow asset tests, and browser coverage afterward.
- **[Concurrent OpenSpec work changes the same showcase files]** → Implement against the current worktree, preserve the completed Home analytics behavior, and resolve only overlapping lines rather than replacing whole components.

## Migration Plan

1. Update the outer product-section and nested gallery copy with matching component/browser assertions.
2. Re-run repository-wide reachability checks and remove only the confirmed orphaned demo code and its dedicated tests/imports.
3. Run unit tests, typecheck, lint, production build, and desktop/mobile browser tests.
4. Visually inspect the product section at desktop and 360px widths for hierarchy, wrapping, and overflow; no data or generated-asset migration is required.
5. If cleanup reveals an unexpected consumer, restore that symbol and keep the copy/spec portion of the change independently releasable.
