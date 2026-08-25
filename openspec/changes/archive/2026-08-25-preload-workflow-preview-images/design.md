## Context

The gallery renders only the selected destination's `<picture>`, so the browser has no knowledge of six non-default images until their tabs are activated. Each destination already has a responsive mobile WebP of roughly 92–108 KB and desktop WebP of roughly 124–148 KB. The first Quick Sale image is eager and high priority; non-default selected images use ordinary lazy loading. See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**

- Preserve initial-page priority for Quick Sale while making later tab changes cache-ready on typical connections.
- Download only the responsive variant appropriate to the current viewport during background warming.
- Keep the gallery frame stable and retain existing semantics and art direction.

**Non-Goals:**

- Adding a loading overlay, branded loader, skeleton, crossfade, or new transition.
- Regenerating assets, introducing an image CDN, or replacing the existing responsive WebPs.
- Guaranteeing instant switches when data saving is enabled, the browser declines idle work, or a visitor selects before warming completes.

## Decisions

### Start warming after the initial image reports ready and the browser is idle

The gallery will not declare all images as high-priority resources in page metadata. Instead, client-side warming begins only after the selected Quick Sale image loads and an idle callback runs, with a short timer fallback for browsers that do not implement idle callbacks. This avoids competing with the page's critical resources while still beginning soon enough for users reading the gallery introduction.

### Warm only the current responsive source set

The gallery's existing breakpoint will select either all mobile paths or all desktop paths from the central asset registry. It will skip the already selected Quick Sale path. A media-query change listener will cancel or supersede pending work and schedule the newly applicable source set, preventing orientation or responsive testing from leaving the wrong variants as the only warmed assets.

### Respect data-saving signals

When the browser exposes an enabled `saveData` preference, proactive warming will not run. Explicit tab selection still renders and loads the correct responsive image normally. This prevents a convenience optimization from overriding the visitor's bandwidth preference.

### Keep the implementation local to the gallery

Because no other surface currently needs the same warming policy, the scheduling and cleanup logic will remain near the gallery rather than introducing a generalized image-loading framework. Asset-path selection will continue to come from the existing registry helpers. The implementation will clean up idle callbacks, timers, media listeners, and retained preloader objects on unmount or reschedule.

### Preserve native cache and rendering behavior

Background warming will use ordinary browser image requests so the later `<picture>` render can reuse the HTTP memory or disk cache. The visible image remains the semantic source of alt text and load behavior; preloader objects remain non-DOM and expose no duplicate accessibility content.

## Risks / Trade-offs

- [Background warming transfers approximately 600–850 KB per responsive set] → Begin only after critical rendering, request one art-direction set, and skip it under data-saving preferences.
- [Browsers may delay or omit idle callbacks] → Provide a bounded timer fallback while retaining correct on-demand loading as the baseline.
- [Viewport changes can start a second responsive set] → Cancel unscheduled work, deduplicate paths, and only warm the newly applicable set after the breakpoint change.
- [Automated DOM tests cannot prove cache reuse] → Unit-test scheduling and path selection, then verify request timing and cache behavior in a production-style browser run.

## Migration Plan

1. Add the gallery-local preload scheduler and cleanup behavior.
2. Add unit coverage for initial priority, responsive path selection, data saving, and breakpoint changes.
3. Verify network ordering under throttled mobile and desktop conditions using a production build.
4. Deploy as a static client optimization with no data or configuration migration.
5. Roll back the gallery component change if initial loading regresses; on-demand image selection remains the prior fallback behavior.
