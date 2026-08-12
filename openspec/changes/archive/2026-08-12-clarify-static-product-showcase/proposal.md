## Why

The public product section is now a static seven-image preview gallery, but parts of its heading hierarchy still read like an invitation to try a demo and the phrase “The rest of the planned flow” refers to an earlier interactive section that no longer exists. The framing should accurately explain what visitors can inspect while retaining the gallery's useful workflow proof.

## What Changes

- Reframe the public section as **Inside SoleSheet** with copy that says visitors are viewing the workflows being built for everyday reselling.
- Explicitly describe the seven screens as static product previews rather than a live demo.
- Rename the gallery eyebrow from **The rest of the planned flow** to **Product preview gallery** and replace its repeated speed-focused heading with **Seven everyday workflows, shown clearly.**
- Keep Quick Sale selected by default and retain its **Fastest path** badge, the seven workflow destinations, responsive photographs, selector behavior, and noninteractive phone controls.
- Update section and browser tests so the visible headings, disclosure, selector behavior, and accessible descriptions stay aligned.
- Audit and remove only demo-era code proven to have no live consumer, including the orphaned Quick Log story, interactive proof shell, unused workflow tabs, and unused reducer behavior/tests, while preserving any shared types or presentation helpers still used by social or static assets.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `waitlist-landing-experience`: Require the product section to frame the upcoming app as a static preview gallery without inviting visitors to try a demo.
- `product-mockup-showcase`: Replace the obsolete “rest of the planned flow” framing while preserving the seven responsive static destinations and their accessibility behavior.

## Impact

- Affects product-section copy in `app/page.tsx` and `app/components/mockups/mockup-showcase.tsx`.
- Affects unit and browser assertions for the product section and static gallery.
- May remove or narrow confirmed-unused exports and files under `app/components/mockups`, `app/components/ui`, and `app/lib`, plus tests that cover only removed demo behavior.
- Does not change flow-image content, image dimensions, selector interaction, pricing, waitlist behavior, analytics, APIs, or dependencies.
