## Why

SoleSheet already promises browser Quick-Add as a Growth-plan time-saving feature, but the waitlist site does not yet show why batch entry is meaningfully faster than adding pairs one at a time on a phone. A credible static browser preview can make that paid-plan advantage concrete while keeping the validation site honest about what is planned rather than functional.

## What Changes

- Add a dedicated Growth Web Quick-Add section to the landing page using the positioning: “Add one pair quickly from your phone—or encode multiple entries from your browser.”
- Present one responsive, static product-preview image of a distinct desktop browser workspace with a populated batch-entry table, row actions, a 12-pair summary, inventory cost, and a cue that saved pairs would be available in mobile inventory.
- Author the browser workspace from reusable React Aria Components—including React Aria Table and React Aria controls—then capture it into deterministic desktop and mobile-directed image assets; the public preview itself remains one non-interactive image.
- Keep every depicted field and action non-operable on the public site, provide an equivalent accessible description, and explicitly identify the feature and Growth pricing as planned.
- Add an FAQ answer that explains the planned browser batch workflow, its relationship to mobile inventory, its Growth-plan assignment, and its distinction from separately planned spreadsheet import.
- Reuse SoleSheet branding, existing inventory field definitions, Philippine-peso formatting, and deterministic reseller fixtures while introducing no account, synchronization, import, persistence, or product API behavior.
- Store the generated concept image as design direction only; the implementation will replace it with the deterministic React Aria-authored capture used by the site.

## Capabilities

### New Capabilities

- `growth-web-quick-add-showcase`: Defines the static browser batch-entry preview, its React Aria-authored capture source, responsive assets, accessible image presentation, truthful Growth positioning, and non-persistence boundaries.

### Modified Capabilities

- `waitlist-landing-experience`: Adds the Web Quick-Add proof section to the page narrative and requires consistent Growth-plan positioning without presenting a live browser application.

## Impact

- Affects the landing-page section structure, shared product copy, pricing references, browser-app mockup composition, responsive image delivery, accessibility descriptions, and browser tests.
- Adds a local-only browser-mockup authoring route, capture registry, deterministic capture script, PNG master, and optimized public derivatives modeled on the existing Flow asset workflow.
- Uses the existing `react-aria-components` dependency for all new browser-app UI primitives and any real landing-page controls introduced by the section; no additional runtime UI library is added.
- The visual-direction concept is stored at `artifacts/concepts/growth-web-quick-add-concept.png` and is not a production delivery asset.
