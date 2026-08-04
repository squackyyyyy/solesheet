## Context

See [proposal.md](proposal.md) for motivation. The page currently renders several independent `WaitlistCta` instances outside `WaitlistExperience`; each CTA always focuses the signup contact field, while signup, survey visibility, survey completion, and temporary answers are local to `WaitlistExperience`. Phase 1 must coordinate those existing surfaces without introducing persistence, network submission, or a backend.

The affected behavior contracts are defined in the four delta specs under `specs/`. The survey remains optional and all survey questions remain optional; “eligible survey respondents” is launch-planning language, not a new frontend validation rule.

## Goals / Non-Goals

**Goals:**

- Give all waitlist CTAs one authoritative current-page journey state.
- Make CTA labels, actions, disabled state, support copy, focus behavior, and accessible announcements change together.
- Preserve incomplete survey answers while the current document remains mounted.
- Make the planned founding Starter offer consistent from centralized content.
- Keep the implementation straightforward to replace with durable backend state in a later phase.

**Non-Goals:**

- Persisting signup, survey answers, eligibility, or journey progress across reloads.
- Defining or enforcing the production rule that determines the first 50 eligible respondents.
- Issuing vouchers, collecting payment, authenticating visitors, or integrating analytics.
- Making survey questions required or changing the survey's research scope.
- Implementing Phase 2's interactive mobile mockups or Phase 3's browser quick-add preview.

## Decisions

### 1. Model progress as a three-state frontend journey

Use one explicit union state with these values and one-way transitions:

```text
not-joined -> survey-incomplete -> survey-complete
```

The initial state is `not-joined`. Valid simulated signup is the only event that advances to `survey-incomplete`; survey completion is the only event that advances to `survey-complete`. Closing or skipping the survey does not change progress, and there is no UI transition back to the form after signup. A reload or remount naturally recreates the initial state.

This is preferable to separate `hasJoined` and `surveyComplete` booleans because the union cannot represent impossible combinations such as a completed survey before signup. A reducer is unnecessary for only two forward transitions; a typed state plus named transition functions is sufficient.

### 2. Place shared journey state in a client provider around the page

Add a waitlist journey provider at the page composition boundary so the header, hero, pricing, final section, signup surface, and survey dialog consume the same context. The context exposes the current state and semantic actions such as completing signup, requesting the appropriate CTA destination, opening or closing the survey, and completing the survey.

Keep signup field values and survey answers local to the mounted waitlist experience because no other page region reads them. Survey visibility belongs in the shared controller because CTAs outside `WaitlistExperience` must open the dialog. This separates shared navigation/progress from private form data while preserving all values for the current page session.

Alternatives considered:

- Lifting every field and answer into `app/page.tsx` would force the server-oriented page composition to become a large client component and broaden the state API unnecessarily.
- Custom DOM events would avoid context but create an implicit, weakly typed contract and make state synchronization and testing harder.
- Browser storage would make reload behavior incorrect and imply a durability guarantee that Phase 1 explicitly excludes.

### 3. Derive every CTA presentation and action from the shared state

`WaitlistCta` will no longer accept arbitrary marketing labels that can contradict progress. It maps the journey state to a single presentation:

| State | Label | Action | Presentation |
| --- | --- | --- | --- |
| `not-joined` | Join the waitlist | Focus the contact field in the signup prototype | Enabled, directional icon |
| `survey-incomplete` | Answer the quick survey | Open/focus the survey dialog | Enabled, directional icon |
| `survey-complete` | You’re all set — thank you | None | Disabled/non-actionable, check icon |

Existing visual variants may remain so a CTA fits its background, but wording and semantics do not vary by section. The pricing CTA therefore stops using “Get the founding rate.” Nearby dynamic support copy can reinforce “You’re on the waitlist. Help shape what we build first.” or “Thanks for helping shape ShoeTrack.” without changing the button's accessible name.

The provider will expose one polite live region message for progress changes. React Aria's button disabled semantics and dialog focus management remain the primitive accessibility behavior. Completion uses both text and an icon, not color alone.

Alternative considered: hiding CTAs after completion reduces clutter, but it removes feedback at locations the visitor may revisit and makes the page state less legible than a stable completed control.

### 4. Keep offer language in one content model

Add a centralized founding-offer content object in the site's content module containing the display price, eligible audience, plan, duration, and approved short/long copy. Pricing, final signup copy, FAQ content, survey plan options, and the mobile upgrade mockup will render or compose from this source instead of embedding independent claims.

The approved meaning is: a planned Starter rate of ₱65 per month for the first 50 eligible survey respondents during their first 12 paid months, after which standard Starter pricing applies, with eligibility and redemption details to be confirmed before launch. The frontend will not calculate respondent rank or mark a visitor eligible.

Alternatives considered: duplicating final prose in each section is faster initially but caused the current “first 50–100” inconsistency and makes later copy review error-prone.

### 5. Verify behavior at component and real-browser boundaries

Component tests will render the provider with multiple CTA instances and the waitlist experience to assert both state transitions and the absence of fetch/storage writes. Browser tests will exercise the header/hero/pricing/final CTA synchronization, survey answer retention after closing and reopening from an external CTA, disabled completion controls, accessibility, and reset behavior after reload. Existing physical-touch coverage remains to protect Android and iOS behavior on the LAN-served page.

Copy consistency tests will assert that the old “first 50–100” statement is absent and that the approved Starter/12-month scope appears in the pricing and mockup surfaces.

## Risks / Trade-offs

- **[A visitor can appear joined without being durably registered]** → Keep the implementation session-only, avoid claims of saved membership or guaranteed eligibility, and treat durable signup as a later backend phase.
- **[Context placement can accidentally turn more of the page into client-rendered code]** → Use a small client provider that accepts the existing page as children; keep static page sections and content rendering unchanged.
- **[A state-aware CTA may try to focus a target before it is mounted]** → Keep the signup and survey host mounted for the page lifetime and use established focus targets/dialog focus management.
- **[Disabling every completed CTA can reduce the number of interactive elements without explaining why]** → Pair the disabled label with a check icon, nearby thank-you copy, and a polite status announcement.
- **[Centralized offer fragments can produce awkward prose in compact mockups]** → Store approved short and long variants in the same content model and test their meaning rather than forcing one string into every layout.
- **[“Eligible” could be interpreted as requiring survey answers now]** → Preserve optional questions and describe eligibility/redemption as pre-launch confirmation; do not add client-side qualification logic.

## Migration Plan

1. Introduce the shared provider and preserve the current `not-joined` behavior as the default.
2. Connect signup and survey transitions, then update every CTA consumer to use the shared state mapping.
3. Centralize founding-offer content and replace all legacy occurrences in the landing page, FAQ/survey content, and upgrade mockup.
4. Expand component and browser tests, including reload-reset and no-persistence assertions.
5. Deploy as a frontend-only change. Rollback consists of reverting the provider/CTA wiring and content update; there is no stored data or schema to migrate.
