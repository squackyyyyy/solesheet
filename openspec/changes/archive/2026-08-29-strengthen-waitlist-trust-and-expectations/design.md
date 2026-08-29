## Context

See `proposal.md` for motivation. The landing page already centralizes most copy in `app/lib/site-content.ts`, drives every CTA through one journey provider, and renders the final signup card and survey from the same waitlist component. Contact addressing is less consistent: the Privacy Policy owns one privacy constant, while the survey completion currently reuses it for a support task. Preview values also span rendered mockups, summary cards, and raster workflow screenshots, so rewriting each asset is unnecessary and would make the disclosure easy to drift.

## Goals / Non-Goals

**Goals:**

- Make one initial waitlist promise understandable across every entry point while preserving progress-aware post-signup behavior.
- Place honest trust and status information at the signup decision without lengthening the page with another major section.
- Give sample-data and branded-contact disclosures one maintainable source of truth.
- Preserve the present responsive layout, survey flow, persistence behavior, and validation-stage pricing research.

**Non-Goals:**

- Publishing a founder's legal name, portrait, biography, or credentials without a later explicit content decision.
- Defining final founding-offer eligibility, launch timing, or an iPhone release commitment.
- Adding testimonials, reseller counts, partner logos, live usage figures, or fabricated social proof.
- Sending email, changing form consent, modifying stored data, or changing Cloudflare routing.

## Decisions

### Use one initial CTA label and contextual supporting copy

The CTA component will keep one pre-signup label, **Join the waitlist**, at every entry point. Product and pricing sections can retain their local headings and explanations, but they will no longer rename the action to **Help shape SoleSheet** or **Get founding access**. The existing journey-state labels remain unchanged after signup so every CTA can still reopen the survey or show completion.

This separates the action from the motivation: visitors always know that the click starts the same waitlist, while surrounding copy can explain product feedback or the planned founding offer. Keeping multiple action names was considered, but it makes the same form sound like several different commitments.

### Put the full expectation and status explanation at the final decision point

The final waitlist area will carry a compact expectation block covering validation status, likely-first-platform language, contact scope, optional survey behavior, no payment, and the absence of guaranteed access or pricing. Earlier CTAs remain concise and move focus to that fully explained decision surface.

The builder note will be a short first-person, owner-approved statement about making phone-based inventory, sales, profit, and installment work simpler. It will not require a portrait or personal biography. Placing it within the existing final waitlist composition was chosen over adding a new standalone section because the trust question matters most immediately before email collection.

### Disclose illustrative data at the container level

A small reusable disclosure treatment will label data-bearing preview containers as **Illustrative sample data · Planned product preview** or an equivalent concise phrase. It will be applied to the hero/dashboard presentation, the three metric cards, the workflow gallery figure, and the Growth browser preview. Raster preview assets do not need to be regenerated because their containing figure supplies the visible and accessible disclosure.

One disclosure per coherent preview container is preferable to stamping every number, which would create visual noise. Decorative values hidden from accessibility remain decorative, but an adjacent visible disclosure still prevents sighted visitors from interpreting them as traction.

### Centralize public contact roles in one shallow module

A shallow shared contact module under `app/lib/` will define `hello`, `support`, and `privacy` addresses. The Privacy Policy, footer, and survey completion state will consume the appropriate role from that module. This avoids a deeper contact-component hierarchy and prevents a privacy-only constant from becoming the general contact source by accident.

The routing rules remain unchanged: all three aliases continue forwarding inbound mail to the verified Gmail destination, and the UI does not promise branded replies.

### Keep founding pricing visible but remove reservation language

The planned PHP 65 Starter direction remains visible because it is an intentional pricing-validation signal. Supporting copy will explicitly say that eligibility and redemption rules will be confirmed before launch, and the adjacent action will say **Join the waitlist**. The UI will not state that signup reserves access, a place among the first 50, or a price.

Removing the founding price entirely was considered but rejected because it would weaken the willingness-to-pay research that the survey and pricing preview are designed to support.

## Risks / Trade-offs

- **[Additional caveats reduce conversion]** → Keep the explanation compact and place it at the decision point; honesty is more valuable than signups based on a mistaken guarantee.
- **[Sample labels make previews feel less polished]** → Use one restrained badge or caption per preview container rather than watermarking every value.
- **[Builder note feels anonymous]** → Use a first-person reason for building now; a named biography or portrait can be added later through a separate content decision.
- **[Android wording discourages iPhone respondents]** → State Android only as the likely first platform and explicitly say both platform responses influence the decision.
- **[Email-role drift returns]** → Centralize all three aliases and cover each visible use with assertions.

## Migration Plan

1. Introduce the shared contact roles and update existing privacy consumers without changing the Privacy Policy's privacy address.
2. Standardize pre-signup CTA labels and update the founding-offer expectation copy.
3. Add preview disclosures, the builder note, signup expectation/status copy, and the general footer contact.
4. Route survey-response changes to the support alias and update focused tests.
5. Run responsive, accessibility, landing, contact, survey, lint, type, and production-build checks before deployment.

Rollback is a normal application redeploy. Reverting the copy and component changes does not require database, routing, DNS, or consent-version rollback because collection scope and infrastructure do not change.
