## 1. Responsive Preload Scheduling

- [x] 1.1 Detect the gallery's current mobile or desktop art direction from the existing breakpoint and derive only that variant's non-default asset paths from the registry.
- [x] 1.2 Start background warming only after the initial Quick Sale image reports ready and the browser grants idle time, with a bounded fallback for browsers without idle callbacks.
- [x] 1.3 Skip proactive warming when the browser reports data saving and retain normal on-demand selection behavior.
- [x] 1.4 Reschedule and deduplicate warming when the viewport crosses the art-direction breakpoint, with complete listener, timer, idle-callback, and preloader cleanup.

## 2. Gallery Integration

- [x] 2.1 Integrate the scheduler locally with the planned-flow gallery while preserving Quick Sale's eager high priority and existing responsive `<picture>` rendering.
- [x] 2.2 Preserve the stable gallery frame, selector semantics, live announcement, and current no-loader behavior for both warmed and cold selections.

## 3. Verification

- [x] 3.1 Add focused tests for initial-image gating, mobile-versus-desktop path selection, data-saving opt-out, breakpoint changes, deduplication, and cleanup.
- [x] 3.2 Verify with a production build and throttled browser network that Quick Sale remains the only critical gallery request and warmed tab selections reuse cached responsive assets.
- [x] 3.3 Confirm that early selection still loads on demand without layout shift, duplicate accessible image content, horizontal overflow, or a loading overlay.
- [x] 3.4 Run the focused test suite, full automated test suite, type or lint checks, and production build.
