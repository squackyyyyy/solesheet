## Why

Non-default workflow previews currently begin downloading only after their selector is activated, which can leave a visibly empty or delayed gallery frame on production connections. The existing responsive WebP assets are already compact, so warming the correct variants after initial rendering can improve interaction readiness without delaying the page's critical image.

## What Changes

- Keep the default Quick Sale preview as the only high-priority gallery image during initial page loading.
- After the initial preview is ready and the browser has idle capacity, preload the remaining workflow images for the current mobile or desktop art direction.
- Avoid background-preloading both responsive source sets and respect browser data-saving preferences.
- Re-run appropriate warming when the viewport crosses the gallery's mobile breakpoint.
- Preserve the stable gallery frame, existing static-image behavior, and current absence of an image-loading overlay.
- Add focused tests and production-style network verification for request priority, responsive selection, and cache-ready tab changes.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `product-mockup-showcase`: Make non-default responsive workflow previews interaction-ready after the initial critical preview without eagerly loading unnecessary variants.

## Impact

The planned-flow gallery component, its asset registry helpers, and related component/browser performance tests are affected. No asset regeneration, API, database, external service, or new dependency is expected.
