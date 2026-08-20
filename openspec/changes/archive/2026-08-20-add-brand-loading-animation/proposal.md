## Why

SoleSheet needs a recognizable branded animation for genuine asynchronous loading and success states. The survey completion flow provides the first focused consumer while the animation remains reusable and stays separate from Flow gallery image switching.

## What Changes

- Add a reusable SoleSheet status mark that animates spreadsheet grid lines and cells into the existing sneaker silhouette during loading and can settle into a restrained, non-looping success state when requested by a caller.
- Keep caller-provided statuses screen-reader-only, treat the SVG as decorative, and provide a static completed mark for reduced-motion preferences.
- Show the branded loading state after a visitor finishes the survey, use a five-second test-only delay, and then transition to the branded success state without allowing duplicate completion actions.
- Use React Aria's native pending-button behavior with a standard indeterminate spinner beside **Joining waitlist…**, then use the full branded success mark in the waitlist confirmation card.
- Keep the completed sneaker and spreadsheet grid visible in the success state while adding its restrained check cue.
- Keep the implementation dependency-free and shallow, co-locating the loader, its styles, and tests in the existing `app/components/brand/` directory.
- Leave the Flow gallery's existing image switching and loading behavior unchanged. Image-delivery optimization is deferred to a separate change.

## Capabilities

### New Capabilities
- `brand-loading-animation`: Defines reusable branded loading and success motion, accessibility, responsive presentation, and reduced-motion behavior.

### Modified Capabilities

None.

## Impact

- Adds a reusable brand status component, co-located styles, and focused tests under `app/components/brand/`.
- Updates the email and survey completion states and tests in `app/components/waitlist/waitlist-experience.tsx` without adding persistence or a network request.
- Reuses the paths, clip geometry, and brand colors from `public/svg/solesheet-mark-on-light.svg`; canonical static logo and gallery image assets remain unchanged.
- Does not alter `MockupShowcase`, optimize image delivery, add `app/loading.tsx`, add a full-page splash, implement backend submission, or add a Rive/Lottie/SVGator runtime dependency.
