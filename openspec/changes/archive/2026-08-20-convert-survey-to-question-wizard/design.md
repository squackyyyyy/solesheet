## Context

See `proposal.md` for motivation and `specs/validation-survey/spec.md` for the behavior contract. The current survey keeps one `SurveyAnswers` object plus a two-value step state in `WaitlistExperience`. `SurveyForm` conditionally renders four core questions or five optional questions, and its sticky action block is nested inside `DialogSheet`’s padded scrolling body. On mobile, that nesting can leave the sticky block above the visible bottom edge and expose scrolling question content underneath it.

All answers and journey state intentionally live only in React memory. Existing React Aria primitives provide dialog, choice, field, and focus semantics; the project already has CSS keyframes and a global reduced-motion rule, so this redesign does not need another animation dependency.

## Goals / Non-Goals

**Goals:**

- Make one current question—not a long form page—the unit of survey presentation and navigation.
- Keep the footer visually opaque, structurally outside the scrollable question body, and safe on devices with bottom insets or onscreen keyboards.
- Give a committed choice enough visual confirmation before advancing while preventing duplicate or stale timer transitions.
- Preserve existing answer keys, Other-detail cleanup, active-pair help, temporary state, and completion states.
- Make progress, focus movement, and transition direction understandable with or without animation.

**Non-Goals:**

- Adding or removing research questions.
- Submitting answers, persisting question position, or adding analytics.
- Introducing a carousel or animation package.
- Guaranteeing that the question body never scrolls under extreme height, zoom, orientation, or keyboard constraints.
- Changing the waitlist-signup form or the post-survey thank-you content.

## Decisions

### Model navigation as a group plus question index

Replace the broad `core`/`optional` page switch with a small wizard state containing the active group, an index within that group, and a transition direction. Keep the existing shared answer object unchanged.

```text
CORE 1 ─▶ CORE 2 ─▶ CORE 3 ─▶ CORE 4
  ▲         ▲          ▲          │
  └── Back ─┴── Back ──┴── Back ──┤
                                   ├── Finish ─▶ COMPLETE
                                   └── Optional ─▶ OPTIONAL 1 … OPTIONAL 5
                                                        ▲              │
                                                        └──── Back ─────┤
                                                                       └── Finish ─▶ COMPLETE
```

Ordered descriptors will map core keys (`phone`, `inventorySize`, `currentTool`, `priority`) and optional keys (`plan`, `installments`, `backup`, `channels`, `interview`) to their rendering behavior. The descriptors may live beside the form or be derived from the centralized question registry, but display labels and choices remain centralized.

Closing the dialog leaves group, index, and answers intact. Reloading remounts the provider and resets all three, matching existing non-persistence behavior.

**Alternative considered:** treat all nine questions as one `1 of 9` sequence. Rejected because it weakens the four-question promise and makes the optional follow-up commitment ambiguous.

### Auto-advance only when a choice is terminal for that question

A standard single-choice activation before the last question in a group schedules one forward transition after a brief confirmation interval of roughly 200–250ms. The schedule is canceled before creating another, when navigating manually, when closing, and when unmounting. Focus alone never schedules advancement.

The wizard does not auto-advance when:

- **Other** is selected and its detail field is revealed;
- the sales-channel multi-select is active;
- the current question is the final question in its group; or
- the visitor uses a skip/forward control without answering.

Those cases retain explicit Next, Finish, or optional-follow-up actions. Under reduced motion, a committed standard answer advances immediately after state is committed rather than waiting for an animation interval.

**Alternative considered:** require Next after every answer. Rejected because it adds a second tap to the dominant mobile path and does not deliver the proposed one-tap progression.

### Keep optionality explicit at every position

Each non-final question exposes a restrained Skip or forward action so unanswered questions remain valid. Back is available after the first core question. Core question four continues into optional question one as the default path; a standard answer auto-advances, while Other or a blank answer can continue explicitly. **Finish this survey** becomes available as a low-emphasis exit on core question four and remains available throughout the optional questions. It becomes the primary action only on optional question five. Selecting an answer never completes implicitly.

This separates answer commitment from survey completion, avoids accidental completion, and keeps the higher-signal follow-up path moving without visually encouraging an early exit.

The final follow-up names the expected 15-minute interview duration and explains that scheduling outreach will use the contact details supplied when joining. Its choices separate immediate availability within two weeks, interest next month or later, a request for more details, and a decline so the answers are useful for interview recruitment without asking for exact calendar availability.

### Give DialogSheet three structural rows

Extend the dialog composition so the survey can supply a dedicated footer outside the body scroller:

```text
┌─────────────────────────────┐
│ Dialog title + close        │  auto
├─────────────────────────────┤
│ Progress + current question │  minmax(0, 1fr), scrolls if needed
├─────────────────────────────┤
│ Back / Skip / Finish        │  auto, opaque, safe-area padded
└─────────────────────────────┘
```

The modal remains bottom-aligned on narrow screens and centered on desktop. It uses one stable responsive height across every question and the completion state, chosen to accommodate the tallest question on ordinary viewports without becoming a literal full-screen surface. Dynamic viewport units and capped desktop dimensions adapt that fixed-in-flow height across device sizes. On short or keyboard-reduced viewports, the same responsive height cap applies and only the body row scrolls. The footer uses an opaque brand-soft background, a top border, and bottom padding that combines the normal spacing token with `env(safe-area-inset-bottom)`. It contains no negative margins and is not `position: sticky`; its grid row placement keeps content from rendering beneath it. The body retains `min-height: 0`, vertical overflow as needed, and horizontal overflow suppression.

Prefer a reusable optional footer slot on `DialogSheet` over positioning survey controls relative to the viewport. This keeps containment, focus trapping, and desktop sizing within the React Aria modal.

**Alternative considered:** keep the current sticky footer and compensate with additional padding. Rejected because it preserves the fragile relationship between scroll padding, sticky positioning, dynamic viewport height, and safe-area insets.

### Use CSS-driven progress and question transitions

The progress track is persistent across question remounts within a group. Its fill width is derived from `(index + 1) / groupLength` and transitions with a short ease-out so its right edge visibly travels from left to right as progress increases. This is a small custom CSS treatment, not a shadcn component or an animation dependency. It exposes progressbar semantics and adjacent visible text such as **Question 2 of 4** or **Optional question 3 of 5**.

Core progress uses the existing emerald action color. Optional progress changes only the fill and progress label to a muted blue (`#2563eb`), reinforcing the group transition while the explicit **Optional question** wording remains the non-color cue.

Only the current question content is keyed by group and question key, leaving the progress track mounted so width changes can interpolate. New question content uses a short upward entrance from below with no opacity change. The same restrained bottom-up movement is used after forward and backward navigation for visual consistency. Motion stays near 160–220ms and does not block input after the new question mounts. Reduced-motion styles remove transforms and transition duration.

After every question change, focus moves to a programmatically focusable question heading. A polite live region communicates the visible progress text without announcing the decorative bar separately.

**Alternative considered:** use spring animation or a third-party motion library. Rejected because the interaction needs only deterministic progress and directional transitions, and an added runtime dependency would not improve the behavior contract.

### Preserve the existing active-pair help context

The inventory-size question retains **What pairs count as active?** adjacent to the choice group and outside its label. It uses a conventional bold blue link treatment and continues opening `/#faq-active-pairs` separately. Returning to the survey leaves the group, index, and selected inventory answer unchanged.

## Risks / Trade-offs

- **[Automatic advancement feels too fast or hides the selected state]** → Keep a short confirmation interval, make selected styling immediate, and cover timer cancellation and one-transition-only behavior in tests.
- **[A screen reader experiences an unexpected context change]** → Advance only on committed activation, announce progress, and move focus to the new question heading; never advance on focus alone.
- **[The stable survey height exceeds a short viewport]** → Derive it from dynamic viewport height and allow only the body row to scroll while the separate footer remains opaque at the bottom of the sheet.
- **[Onscreen keyboards alter dynamic viewport height]** → Size the sheet with dynamic viewport units, keep the footer in normal grid layout, and verify a revealed Other field remains reachable without content appearing beneath the footer.
- **[Back navigation races a pending advance timer]** → Centralize timer ownership and cancel it before every manual or lifecycle transition.
- **[Progress animations create discomfort]** → Use short, low-distance motion and remove both delay and nonessential animation under reduced-motion preferences.
- **[Optional follow-ups feel like a hidden requirement]** → Label their progress as optional and keep core completion as the primary action on question four.

## Migration Plan

1. Introduce ordered question descriptors and wizard navigation state while retaining the existing answer object and completion transition.
2. Add a dedicated dialog footer region and move survey actions out of the scrolling body before enabling automatic advancement.
3. Render the four core questions individually, then add the optional five-question group and cross-group Back behavior.
4. Add progress, focus announcements, timer cancellation, safe-area styling, and reduced-motion handling.
5. Update component and browser tests, then visually verify short and tall mobile viewports plus desktop.
6. Roll back by restoring the two broad survey pages and removing the footer slot; the answer keys and journey-state contract remain compatible.
