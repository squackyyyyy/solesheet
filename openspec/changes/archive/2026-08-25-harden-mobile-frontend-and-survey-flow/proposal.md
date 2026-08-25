## Why

A senior mobile QA review found page-width leakage, a context-breaking survey help link, inconsistent disclosure controls, duplicated comparison copy, ambiguous survey optionality, and repetitive waitlist calls to action. These issues should be corrected before backend Phase 3 so the production funnel is stable and understandable on iPhone-sized viewports.

## What Changes

- Contain the waitlist and pricing-comparison layouts so wide content scrolls only inside its intended region and never widens or shifts the document.
- Replace the survey's separate-tab active-pair help with an in-modal definition that preserves the current question and answers.
- Standardize disclosure indicators to show plus when closed and minus when open, and remove the duplicated mobile comparison heading.
- Make the four core survey questions required for a finished survey while keeping the survey dismissible, the saved waitlist signup independent, Other-detail fields optional, and all five follow-up questions optional.
- Continue automatic advancement from the fourth core answer into the optional follow-ups, where visitors can finish immediately or keep answering without an extra decision screen.
- Reduce perceived CTA repetition on mobile and use context-specific labels while keeping every CTA connected to the same progress-aware waitlist journey.
- Use the horizontal SoleSheet logo in the header at every viewport now that the narrow mobile header no longer needs to reserve space for a waitlist action.
- Add focused responsive and accessibility coverage for narrow mobile widths, survey navigation, disclosures, and page-level overflow.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `waitlist-landing-experience`: Refine the mobile CTA hierarchy, disclosure behavior, comparison containment, and in-survey active-pair explanation.
- `validation-survey`: Require the four core answers for deliberate completion, preserve optional follow-ups, and make the core completion boundary explicit.
- `survey-persistence`: Require the four supported core answers in completed survey requests while preserving optional follow-up and Other-detail behavior.

## Impact

Affected areas include the landing-page CTA placements, pricing comparison disclosure and scroll container, waitlist card width containment, survey wizard navigation and validation, active-pair help, privacy wording about survey fields, survey request validation, and related component/API/browser tests. No database migration or new dependency is expected.
