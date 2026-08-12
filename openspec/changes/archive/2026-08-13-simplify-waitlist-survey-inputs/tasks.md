## 1. Email-Only Waitlist Signup

- [x] 1.1 Narrow the shared waitlist contact validator to email syntax only and update its unit tests to accept representative valid emails while rejecting malformed values and Philippine mobile-number formats.
- [x] 1.2 Update the signup field label, placeholder, input semantics, autofill behavior, and validation error to be consistently email-specific while preserving optional name, consent, pending, success, and non-saving behavior.
- [x] 1.3 Update component and browser signup journeys to use email fixtures, assert email-field focus and accessible errors, and prove a phone-number-only value cannot reach simulated success.

## 2. Conditional Other Survey Responses

- [x] 2.1 Add the standard **Other** option to the highest-value feature and sales-channel content definitions, retaining the existing inventory-method Other option and all unrelated choices.
- [x] 2.2 Add independent temporary detail keys and selection handlers for inventory method, feature priority, and sales channels, clearing only the matching detail when Other is deselected.
- [x] 2.3 Render an optional, contextually labeled React Aria text field immediately after each owning question while its Other choice is selected, with normal keyboard order and no forced focus.
- [x] 2.4 Add component tests for all three Other paths, independent text values, multi-select coexistence, optional blank details, deselection cleanup, close/reopen retention, and remount reset.

## 3. Responsive, Privacy, and Regression Verification

- [x] 3.1 Add desktop and 360px browser coverage for keyboard/touch selection, conditional field visibility and labels, survey scrolling/completion, no horizontal overflow, and unchanged zero-request/zero-storage privacy behavior.
- [x] 3.2 Search application copy and tests for stale email-or-mobile signup language and phone fixtures, retaining mobile-number references only where they describe unrelated product or survey behavior.
- [x] 3.3 Run the full unit/component suite, TypeScript checking, linting, production build, and public browser suite; resolve regressions without changing unrelated waitlist questions, pricing, or product-preview behavior.
