## Why

The deployed mobile survey keeps its action row inside the padded scrolling region, allowing controls to float above the viewport edge while question content remains visible underneath. Replacing the long, scrolling steps with a focused question-by-question flow will remove that layout failure and make the promise of “four quick questions” feel accurate on a phone.

## What Changes

- Replace the four-question core survey page with a one-question-at-a-time wizard and visible **Question n of 4** progress.
- Render the four core prompts as thumb-friendly choice cards, advancing after a committed single-choice answer while preserving a short selected-state confirmation.
- Keep **Other** answers on the current question, reveal their existing optional detail field, and require an explicit Next action rather than advancing immediately.
- Provide a manual Back action, preserve answers across navigation and dialog dismissal, and restore the current question when the survey reopens in the same page session.
- Continue naturally from the fourth core question into the five follow-ups, while making **Finish this survey** available as a low-emphasis exit from question four onward rather than presenting completion as the encouraged next step.
- Present optional follow-ups one question at a time with their own progress, Back/Next controls where required, and the existing **Finish quick survey** ending.
- Make the final interview question actionable by stating its 15-minute duration and separating near-term availability, later interest, a request for details, and a clear decline.
- Move survey navigation into a separate, opaque, non-scrolling dialog footer that stays structurally below the question body and accounts for device safe-area insets without forcing the modal to fill the viewport.
- Keep the one-question survey at one stable responsive height across all questions and completion states, sized for the tallest question when the viewport allows, bottom-aligned on mobile and centered on desktop. Short devices use the same viewport-relative cap with body-only scrolling.
- Animate the persistent progress fill by changing its width from left to right, and move each new question upward from below without an opacity fade; reduced-motion mode keeps both changes immediate.
- Preserve the active-pair FAQ help link, accessible dialog behavior, temporary in-memory answers, Other-detail cleanup rules, and the non-saving completion flow.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `validation-survey`: Replace the current two long scrolling survey steps with an accessible, animated question wizard and a viewport-safe navigation footer while retaining all nine optional research questions and non-persistence behavior.

## Impact

- Affects survey state and rendering in `app/components/waitlist/waitlist-experience.tsx`.
- Affects the shared dialog layout in `app/components/ui/aria.tsx`, likely through a dedicated body/footer composition rather than a sticky child inside the scroll region.
- May reshape the core and optional question metadata in `app/lib/site-content.ts` so each prompt can participate in an ordered wizard.
- Requires component and browser coverage for automatic advancement, Other-answer exceptions, backward navigation, focus announcements, safe-area layout, reduced motion, and session-only state.
- Does not add backend submission, analytics, durable storage, new survey questions, or a third-party animation dependency.
