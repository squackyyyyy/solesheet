## Context

The Add Stock photograph is authored as a responsive code composition and published to the gallery as separate static desktop and mobile assets. Its current form ends with “Photos, notes, and supplier can wait,” even though the business brief excludes photos from the initial product and does not define supplier as an inventory field. The gallery exposes only its destination selectors as real controls; everything pictured inside the phone is illustrative.

## Goals / Non-Goals

**Goals:**

- Make the presence of supported secondary inventory fields discoverable without expanding the form in either static composition.
- Preserve the visual hierarchy of the essentials-first fields and the Add pair action at both responsive art directions.
- Keep visible copy, registry metadata, and the nonvisual image equivalent consistent with the business brief.
- Regenerate the canonical Add Stock assets through the existing deterministic capture workflow.

**Non-Goals:**

- Building an operable disclosure, product form, or inventory persistence workflow on the marketing website.
- Designing the expanded optional-fields state or specifying validation for those fields.
- Adding photos, supplier data, or other inventory fields that are not scoped in the business brief.
- Changing other flow destinations, gallery selector behavior, or the broader product UI.

## Decisions

### Depict a collapsed disclosure rather than a dropdown or tab

Insert one compact bordered row after Target price and before Add pair. It uses the title **Optional details**, a downward chevron, the field summary **Date acquired · Status · Notes**, and the helper **Add or edit these later**. A disclosure accurately communicates subordinate content that can be revealed; a dropdown implies selecting one value, and a tab would give secondary fields too much navigational weight.

The row remains visually quieter than the primary action through neutral styling and compact spacing. The existing trailing footer is removed instead of retained, avoiding duplicate guidance and eliminating unsupported photos and supplier claims.

### Keep the public preview static

The source composition depicts the collapsed state, but the selected gallery panel remains one image equivalent with no focusable control inside the phone. No React Aria disclosure is introduced because there is no public interaction to implement; existing React Aria gallery selectors retain responsibility for selection, focus, and keyboard behavior. The eventual mobile product may implement the depicted disclosure separately, outside this change.

### Use the brief as the field-scope authority

Only Date acquired, Status, and Notes are named in the collapsed row. Target price remains visibly optional in the main form, while actual selling price belongs to the sale lifecycle and is not advertised as an Add Stock detail. Copy and equivalent descriptions are updated from the same shared flow asset record so visible and nonvisual claims do not diverge.

### Regenerate through the canonical capture pipeline

Update the code-authored Add Stock screen and its asset registry, then run the existing flow capture workflow to produce the exact-size desktop and mobile PNG masters and optimized WebP derivatives. Compare generated outputs or hashes so only the intended Add Stock imagery and required manifest metadata change; visually inspect both art directions before acceptance.

## Risks / Trade-offs

- [The extra row could crowd the short form or weaken the CTA] → Keep it collapsed and compact, verify both 3200×2400 desktop and 1600×2400 mobile masters, and preserve clear spacing around Add pair.
- [A chevron inside a static image could appear interactive] → Retain the gallery instruction that pictured controls are illustrative and keep the photograph as a single non-focusable image equivalent.
- [Optional wording could imply unsupported fields] → Restrict the summary and equivalent description to the three inventory fields defined by the brief and remove photos/supplier language everywhere it describes this screen.
- [Regeneration could unintentionally alter unrelated assets] → Use deterministic fixtures and verify unrelated flow outputs remain byte-stable or otherwise unchanged.

## Migration Plan

1. Update the Add Stock composition, registry copy, and equivalent description together.
2. Run focused component and registry tests, then regenerate the responsive flow assets with the canonical script.
3. Visually inspect the Add Stock desktop and mobile masters and verify dimensions, delivery derivatives, and unrelated-asset stability.
4. Roll back the composition, registry, and regenerated Add Stock files together if validation fails; no data or API migration is required.
