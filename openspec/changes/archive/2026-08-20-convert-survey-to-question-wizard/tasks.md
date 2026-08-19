## 1. Dialog and Motion Foundation

- [x] 1.1 Extend `DialogSheet` with an optional dedicated footer region and a three-row header/body/footer layout while preserving existing callers without a footer.
- [x] 1.2 Make the mobile sheet viewport-safe with dynamic viewport sizing, an opaque non-scrolling footer, and bottom padding that includes `env(safe-area-inset-bottom)` without negative-margin or sticky positioning.
- [x] 1.3 Add reusable forward/back question-transition and progress-fill styles with short durations and explicit reduced-motion overrides.

## 2. Wizard State and Navigation

- [x] 2.1 Define ordered core and optional question descriptors that reuse the centralized survey labels, choices, answer keys, and Other-detail metadata.
- [x] 2.2 Replace the broad survey step state with an in-memory group, question index, and transition direction that restore on dialog reopen and reset on reload.
- [x] 2.3 Add one cancellable auto-advance scheduler for committed intermediate single-choice answers and cancel it on repeat selection, manual navigation, dialog close, completion, and unmount.
- [x] 2.4 Preserve the existing answer object plus single-choice and sales-channel Other-detail cleanup behavior across forward, backward, skip, and cross-group navigation.

## 3. Four-Question Core Experience

- [x] 3.1 Render a persistent **Question n of 4** label and semantically named progress bar derived from the active core index.
- [x] 3.2 Render phone platform and active inventory size as one-question choice-card screens that briefly show selection before advancing, while retaining the separate active-pair FAQ help link.
- [x] 3.3 Render current inventory method and highest-value feature as choice-card screens, keeping **Other** on the current screen with its optional detail field and explicit navigation.
- [x] 3.4 Provide Skip/forward and Back actions for intermediate core questions without validation errors or answer loss.
- [x] 3.5 Keep the fourth core question on screen after selection and provide **Finish survey now** as the primary action plus a distinct action to enter optional follow-ups.

## 4. Optional Follow-Up Experience

- [x] 4.1 Render the five follow-ups one at a time with **Optional question n of 5** progress and Back navigation to the previous optional or final core question.
- [x] 4.2 Apply confirmed-selection auto-advance to intermediate single-choice plan, installment, and backup questions without advancing on focus alone.
- [x] 4.3 Keep the sales-channel multi-select on screen until explicit Continue, preserving multiple choices and the existing optional Other-detail field.
- [x] 4.4 Keep the final interview question on screen after selection and provide **Finish quick survey** without implicit completion.

## 5. Accessibility and Non-Persistence

- [x] 5.1 Move programmatic focus to each newly presented question heading and expose polite progress announcements without announcing the decorative progress fill twice.
- [x] 5.2 Verify every wizard control has an understandable accessible name, visible keyboard focus, and at least a 44-by-44-pixel touch target.
- [x] 5.3 Preserve temporary answers and the exact question position on close/reopen while keeping answers, navigation, and completion out of requests, analytics, cookies, local storage, and session storage.
- [x] 5.4 Verify reduced-motion mode removes question sliding and progress animation delay while retaining selection, focus, Back, Skip, and completion behavior.

## 6. Automated and Visual Verification

- [x] 6.1 Replace component tests for two broad survey steps with coverage for core ordering, confirmed auto-advance, skip, Back, final-question stopping, optional entry, and completion from both paths.
- [x] 6.2 Extend component tests for Other-detail exceptions, timer cancellation, cross-group answer preservation, dialog restoration, reload reset, and active-pair help preservation.
- [x] 6.3 Extend browser journeys for touch and keyboard activation, one-transition-only behavior, progress semantics, focus movement, reduced motion, and synchronized page CTAs after either completion path.
- [x] 6.4 Add mobile layout assertions at 360-by-800 and a shorter-height viewport for footer-edge alignment, safe-area padding, body-only scrolling, onscreen-keyboard/Other-field reachability, and zero content visible beneath the footer.
- [x] 6.5 Run lint, type checking, unit/component tests, desktop and mobile browser journeys, and the production build; resolve failures attributable to this change.
- [x] 6.6 Visually review all four core questions, all five optional questions, Back transitions, Other fields, and both completion paths on mobile and desktop with normal and reduced motion.

## 7. Motion and Dialog Refinement

- [x] 7.1 Keep the progress track mounted across question changes and animate the fill width left-to-right instead of scaling a remounted fill.
- [x] 7.2 Replace question opacity/directional transitions with a short bottom-up transform-only entrance and retain a no-motion reduced-motion state.
- [x] 7.3 Give the survey one stable responsive height sized for the tallest question, including completion states, while preserving the separate opaque footer, safe-area padding, and body-only overflow on short devices.
- [x] 7.4 Update browser assertions for the compact mobile/desktop sheet and verify progress, motion, short-height scrolling, and both completion paths visually.
- [x] 7.5 Continue automatically from a standard fourth-core answer into optional follow-ups, keep explicit continuation for blank or Other, and expose **Finish this survey** as a low-emphasis exit from question four until the final optional question.
- [x] 7.6 Rename the survey FAQ help to **What pairs count as active?** and give it and the public Privacy Policy links a conventional bold blue link treatment.
- [x] 7.7 Distinguish optional follow-ups with a muted blue progress fill and label while retaining explicit optional wording as the non-color cue.
- [x] 7.8 Clarify the 15-minute follow-up interview and replace overlapping answers with distinct near-term, later, more-details, and decline choices plus a contact-method note.
