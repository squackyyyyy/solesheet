## Context

See `proposal.md` for motivation and `specs/brand-loading-animation/spec.md` for the behavior contract. The brand animation is a reusable visual primitive whose first consumer is the prototype survey completion flow. `MockupShowcase` continues to render only its selected responsive `<picture>` and retains its existing browser-native image-loading behavior.

SoleSheet already ships canonical light- and dark-background SVG marks. The existing `app/components/brand/` directory provides the right shallow location for a reusable status mark.

## Goals / Non-Goals

**Goals:**

- Preserve the canonical mark geometry and exact settled frame.
- Keep animation ownership, styles, and tests co-located in the existing brand directory.
- Make loading and success caller-controlled visual states without embedding form or media logic in the brand component.
- Keep survey submission orchestration inside the existing waitlist experience and preserve the fixed wizard dialog geometry.
- Use the UI library's native pending-button contract for the short email signup action.

**Non-Goals:**

- Adding a root `app/loading.tsx`, full-page splash, or a site-wide loading state.
- Creating native SVGator, Rive, After Effects, or Lottie source files.
- Preloading every desktop and mobile Flow asset.
- Implementing waitlist persistence or backend submission.
- Integrating the mark with Flow gallery previews or changing their loading lifecycle.
- Optimizing, preloading, or migrating Flow images to a different Next.js image-delivery strategy.
- Replacing static logos, favicons, app icons, social assets, or the gallery images themselves.
- Building a general-purpose asynchronous state framework.

## Decisions

### Keep the file structure shallow and responsibilities local

Use the existing structure without creating another nested directory:

```text
app/components/
├── brand/
│   ├── brand-logo.tsx
│   ├── brand-loader.tsx
│   ├── brand-loader.module.css
│   └── brand-loader.test.tsx
```

`brand-loader.tsx` owns the inline SVG composition and small presentational interface. Its CSS Module owns loader-specific motion and reduced-motion rules. Keeping SVG geometry in the component avoids a single-consumer constants module.

**Alternative considered:** create `components/brand/loading/` with separate geometry, animation, state, and accessibility files. Rejected because it adds hierarchy and indirection without reusable behavior at those boundaries.

### Build the motion as inline SVG plus a co-located CSS Module

Recreate the canonical shoe path, clip path, grid lines, sole line, and laces as named inline SVG groups. The loading state uses a roughly 1.4–1.8 second loop:

1. A compact sheet outline and grid draw into view.
2. The sheet grid moves and compresses into alignment with the shoe silhouette.
3. The shoe outline and sole line draw while the green field reveals through the canonical shoe clip.
4. Grid cells sweep left to right and lace strokes settle into place.
5. The exact completed mark holds before a coordinated reset begins the next cycle.

Prefer transforms, clip paths, stroke dash offsets, and a restrained visibility handoff over node-heavy path morphing. The complete logo never spins. This preserves the exact settled geometry and avoids exporter-controlled JavaScript or a runtime dependency.

The success state does not loop. It forces the logo layers into their completed values, draws a small restrained check or equivalent completion stroke, and holds. Changing state must not impose a timeout before the caller can replace the component.

**Alternative considered:** use SVGator path morphing, Rive, or Lottie. Rejected because each introduces exported script or a player/runtime for an effect that existing SVG geometry and CSS can express directly.

### Keep the brand component presentational and minimally configurable

`BrandLoader` accepts `state` (`loading` or `success`), `background` (`light` or `dark`), a required caller-owned status label, and an optional class name. It renders a status container, decorative `aria-hidden` SVG, and screen-reader-only text; it renders no visible copy. CSS responds to state and motion preference, so the component requires no timer or internal async state.

The inline clip identifier must remain valid when more than one component renders. Use React's stable identifier support inside the synchronous component rather than hardcoding a duplicate document-global ID or making callers manage SVG internals.

**Alternative considered:** embed image-loading and submission state inside `BrandLoader`. Rejected because resource ownership belongs to each caller and would make a brand primitive depend on unrelated workflows.

### Do not couple the mark to Flow image loading

Keep `MockupShowcase` free of brand-loader imports, loaded-image caches, load-event orchestration, and animation overlays. The selected responsive image continues to be requested according to the gallery's existing `<picture>` and `<img>` behavior.

Image loading performance is a separate concern that should be measured before choosing between targeted preloading, image sizing/compression changes, or a Next.js image component strategy. Keeping it separate avoids using an animation to conceal an unmeasured delivery issue.

**Alternative considered:** retain the new overlay while investigating image delivery. Rejected because the overlay adds lifecycle complexity and the user prefers ordinary image switching.

### Let the survey own its temporary submission sequence

Add a survey submission state and timer reference to `WaitlistExperience`. Activating any **Finish this survey** control cancels pending question advancement, enters the pending state once, removes the question footer, and renders the light-surface `BrandLoader` inside the existing fixed-height wizard body. A named five-second constant makes the prototype delay conspicuous and easy to replace.

When the timer completes, `WaitlistExperience` marks the journey complete and renders the existing completion copy with `BrandLoader` in its success state instead of the generic circular check. The success mark keeps the canonical shoe, sheet grid, sole, and laces visible while its small completion check settles into place. Clear the timer on unmount and ignore repeated finish attempts.

The timer simulates only the asynchronous transition; it does not call `fetch`, save answers, or change backend scope. When real submission exists, replace the timer callback with the request lifecycle while preserving the same pending and success presentation.

Keep one shared survey outcome stage mounted across pending and complete states. The stage reserves a stable content slot beneath the brand mark, allowing the existing `BrandLoader` instance to change its caller-controlled state in place while the completion copy enters with a short upward movement. This prevents the mark from jumping between a centered loading layout and a separate success layout. Reduced-motion visitors receive the completed content without the entrance movement.

**Alternative considered:** put the five-second timer inside `BrandLoader`. Rejected because the brand component remains presentational and callers must own asynchronous state and duration.

### Use native pending feedback for the email button

Pass the existing signup state to React Aria's `Button` through `isPending`. Keep the visible **Joining waitlist…** text and compose an indeterminate React Aria `ProgressBar` spinner beside it. The pending contract keeps the control focusable, prevents repeat activation, supplies pending semantics, and avoids maintaining a duplicate live region.

Do not change the current 650ms simulation or add a minimum display duration. When signup completes and the confirmation card replaces the form, mount the regular light-surface branded success mark in place of the generic circular check. The detailed shoe-and-sheet motion remains reserved for larger status surfaces where it can be read clearly.

**Alternative considered:** retain a cropped version of `BrandLoader` inside the button. Rejected because the detailed branded motion competes with the short action label and creates a compact-only component API for one brief state.

## Risks / Trade-offs

- **[Inline SVG geometry diverges from the canonical asset]** → Copy from the current SVG once and visually compare the completed light and dark frames against canonical marks.
- **[The loop reset creates a visible jump]** → Coordinate the final hold and starting-frame handoff and review at normal and slowed playback speeds.
- **[Multiple instances collide through SVG IDs]** → Generate a stable per-instance clip identifier and cover multiple-instance rendering in tests.
- **[Survey-specific behavior leaks into the brand primitive]** → Keep timers, completion state, and copy in `WaitlistExperience`; pass only state, surface, and status label to `BrandLoader`.
- **[Pending-to-success content changes move the mark]** → Keep one outcome stage and reserve the completion-copy region before success so the loader stays at the same grid position.
- **[Pending feedback duplicates announcements]** → Let React Aria own pending-button semantics and place one labeled `ProgressBar` in its provided context instead of maintaining a separate live region.
- **[The five-second prototype wait is mistaken for production latency]** → Name and document the constant as test-only, and replace it with the real request lifecycle when backend submission is introduced.
- **[A repeated finish action starts multiple timers]** → Enter pending synchronously, remove footer controls, guard the handler, and clear the single timer reference on unmount.
- **[Animation causes discomfort or unnecessary battery use]** → Animate restrained transform and stroke properties and replace all motion with a static final frame under reduced motion.
- **[Flow previews still fetch only after selection]** → Treat image delivery as a separate performance investigation instead of masking it in this component change.

## Migration Plan

1. Add and verify the reusable loading/success mark beside the existing brand logo.
2. Restore `MockupShowcase` to its original image switching behavior with no brand-loader consumer.
3. Connect the survey's finish action to a five-second test loading state and the branded success state.
4. Validate the transition with fake timers, accessibility assertions, and the existing non-persistence checks.
5. Add native pending-button feedback to email signup and replace the confirmation card's generic check with the full success mark.
6. Roll back form integration by restoring immediate `completeSurvey()` behavior and the email button/card contents; removing the reusable component remains independent.
