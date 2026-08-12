## Context

See `proposal.md` for motivation. The current waitlist uses one client-side `contact` value and a validator that accepts either email or Philippine mobile formats. The post-signup survey stores string and string-array answers in component memory, renders inventory method and feature priority as single-select controls, and renders sales channels as a checkbox group. Inventory method already lists Other, but none of the three requested questions has conditional free-text state.

The flow is intentionally a non-saving prototype: signup and survey values must not leave page memory, and closing then reopening the survey during the same page session must preserve visible answers.

## Goals / Non-Goals

**Goals:**

- Make the signup's field semantics, validation, keyboard hinting, autofill, and errors consistently email-only.
- Add one predictable conditional Other-detail pattern across both single-select and multi-select survey controls.
- Preserve survey optionality, unrelated answers, dialog behavior, responsive layout, and non-persistence guarantees.
- Keep the conditional fields accessible through explicit visible labels and normal keyboard order.

**Non-Goals:**

- Adding real signup or survey submission, storage, analytics, or backend schemas.
- Requiring Other details, adding an open-ended field to every survey question, or changing the predefined answers beyond the three requested questions.
- Changing the survey's completion flow, pricing research, interview permission, or buyer-data prohibition.

## Decisions

### 1. Narrow the existing contact path to email instead of adding a second field

The single signup contact control will become an email field in place: label and placeholder mention only email, browser semantics use email-oriented input behavior, and the validator accepts only a syntactically valid email. Existing name, consent, pending state, success transition, and temporary `contact` state can remain structurally unchanged.

Alternative considered: retain phone validation internally while hiding it from the label. Rejected because hidden acceptance would contradict the public contract, make tests ambiguous, and keep unused personal-data handling in the prototype.

### 2. Use the standard singular label “Other” and separate detail keys

All three option sets will expose the same visible choice label, **Other**. Their free text will be stored independently under dedicated temporary keys such as inventory-method detail, feature-priority detail, and sales-channel detail rather than replacing the selected option value. This preserves a stable selected value for each React Aria control while preventing one question's detail from leaking into another.

Alternative considered: store the typed text directly as the option value. Rejected because the UI could no longer reliably determine whether Other is selected, and changing or clearing the selection would become error-prone.

### 3. Render each detail field immediately after its owning question

Selecting Other reveals a normal labeled text input directly below that question. The labels will identify their context—for example, “Other inventory method,” “Other feature,” and “Other sales channel”—so each field remains understandable without placeholder text. The field will enter normal tab order but will not receive forced focus, avoiding unexpected focus movement or mobile-sheet scrolling when a selection changes.

Alternative considered: place one generic “Please specify” field at the bottom of the survey. Rejected because its association becomes unclear when multiple Other answers are selected and it weakens screen-reader context.

### 4. Preserve optionality but remove stale hidden detail values

Choosing Other will not make its detail field required; visitors can still finish or dismiss the survey with any subset of answers. When a single-select question changes away from Other, or Other is unchecked in sales channels, the corresponding detail key is removed immediately. Other selections and unrelated details remain unchanged.

Alternative considered: retain hidden text in case the visitor reselects Other. Rejected because the temporary answer object would contain a detail for an option that is no longer selected, producing contradictory state and complicating any future submission implementation.

### 5. Extend tests at the state transitions and privacy boundary

Component tests will cover email-only validation, conditional visibility, independent text entry, optional completion, deselection cleanup, close/reopen retention, and reload/remount reset. Desktop and 360px browser tests will exercise keyboard/touch interaction, confirm the sheet remains usable without horizontal overflow, and continue asserting zero data requests or durable storage writes.

Alternative considered: assert only that the new labels render. Rejected because the main regression risks are conditional-state cleanup, multi-select coexistence, responsive dialog behavior, and accidental phone acceptance.

## Risks / Trade-offs

- [Three conditional fields can lengthen the mobile survey] → Render them only while their matching Other choice is selected and verify in-sheet scrolling and sticky completion controls at 360px.
- [Changing contact validation can leave phone-based tests or copy behind] → Search the app, tests, and relevant specs for mobile-contact language and replace every signup-path fixture and assertion with email-specific behavior.
- [Single-select and multi-select questions update state differently] → Centralize the rule that selection changes clear only the matching detail key and test both paths independently.
- [A blank Other detail may yield a less useful research answer] → Preserve the existing promise that every survey question is optional; the visible contextual prompt encourages detail without adding friction.

## Migration Plan

1. Narrow the shared contact validation and signup field copy/semantics, then update unit and browser fixtures to prove valid email acceptance and mobile-number rejection.
2. Add Other options and dedicated temporary detail keys, then render contextual fields for the two single-select questions and the sales-channel checkbox group.
3. Add cleanup, retention, privacy, accessibility, and responsive tests; run the full test, typecheck, lint, build, and browser suites.
4. Roll back by restoring the prior contact validator/copy and removing the additive Other options/detail keys; no persisted data or server migration is required.
