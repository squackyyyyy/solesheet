## Purpose

Define recognizable, accessible SoleSheet loading and success motion that the survey completion flow and future asynchronous consumers can present without imposing resource-loading behavior.

## ADDED Requirements

### Requirement: Loading motion expresses the SoleSheet mark
The loading indicator SHALL present a restrained grid-to-sole sequence in which spreadsheet structure assembles into the existing sneaker silhouette. Each loading cycle SHALL resolve to the recognizable static SoleSheet mark, hold it briefly, and loop without rotating the complete logo or replacing it with a generic spinner.

#### Scenario: Branded loading cycle plays
- **WHEN** a caller presents the loading state and the visitor does not request reduced motion
- **THEN** grid and sheet elements progressively assemble into the sneaker mark, the completed mark remains recognizable before the cycle repeats, and the full logo does not continuously rotate

#### Scenario: Animation cycle repeats
- **WHEN** a caller keeps the mark in its loading state beyond one animation cycle
- **THEN** the indicator returns to its starting composition without an abrupt visual jump or cumulative geometry drift

### Requirement: Loading and success states remain accessible without visible copy
The status mark SHALL expose a concise caller-provided screen-reader-only status while treating its SVG artwork as decorative. Visitors requesting reduced motion SHALL receive the same status semantics with a static, recognizable SoleSheet mark and no nonessential animation.

#### Scenario: Assistive technology encounters the status mark
- **WHEN** a caller presents the status mark
- **THEN** a visitor can determine its caller-provided status without visible copy or repeated SVG-shape announcements

#### Scenario: Visitor requests reduced motion
- **WHEN** the device reports `prefers-reduced-motion: reduce`
- **THEN** the completed SoleSheet mark is shown statically and the screen-reader-only status remains available

### Requirement: Reusable status mark supports a settled success outcome
The reusable mark SHALL accept a loading or success state. Loading SHALL use the repeating grid-to-sole sequence; success SHALL stop repeating, settle on the completed mark, add a restrained completion cue, and leave the caller-provided success status available to assistive technology without imposing its own visible message or delay.

#### Scenario: Asynchronous caller reports success
- **WHEN** the survey or another asynchronous consumer changes the reusable mark from loading to success
- **THEN** the mark presents its non-looping completion treatment and exposes the caller's success status without continuing the loading loop

#### Scenario: Survey success preserves the brand concept
- **WHEN** the survey submission delay completes
- **THEN** the completed sneaker, spreadsheet grid, sole details, and restrained check cue remain visible together instead of being replaced by a generic success icon

### Requirement: Survey completion uses the branded status sequence
The survey SHALL replace its question and footer controls with the branded loading state after any available **Finish this survey** action is activated. For prototype testing, loading SHALL last five seconds before the journey becomes complete and the same status mark transitions to success. The delay SHALL NOT perform a network request or persist answers.

#### Scenario: Visitor finishes after the core questions
- **WHEN** the visitor activates **Finish this survey** after the fourth core question
- **THEN** the dialog shows the branded loading state for five seconds, prevents another completion action, and then shows the branded success state and completion content

#### Scenario: Visitor finishes during optional questions
- **WHEN** the visitor activates **Finish this survey** from an optional question
- **THEN** the same loading-to-success sequence runs without requiring the remaining optional answers

#### Scenario: Submission wait remains accessible and stable
- **WHEN** the survey is in its test submission delay
- **THEN** assistive technology receives a concise submitting status, the dialog keeps its fixed wizard dimensions, and question navigation controls are unavailable

#### Scenario: Submission transitions continuously into success
- **WHEN** the survey submission delay completes
- **THEN** the same status mark remains anchored in place, changes from loading to success without being remounted, and the completion content enters beneath it without resizing the dialog

### Requirement: Email signup uses native pending feedback
The email signup button SHALL use React Aria's pending-button state while retaining a visible **Joining waitlist…** label and showing a standard indeterminate progress spinner without changing the button's dimensions. When the existing signup simulation completes, the waitlist confirmation card SHALL replace its generic success icon with the full branded success mark.

#### Scenario: Email signup is pending
- **WHEN** a visitor submits a valid email and consent selection
- **THEN** the button remains focusable but prevents further activation, says **Joining waitlist…**, shows an accessible indeterminate spinner beside that label, and exposes React Aria's native pending semantics

#### Scenario: Email signup completes
- **WHEN** the existing signup delay completes
- **THEN** the confirmation card shows the full sheet-grid sneaker success state while preserving its thank-you copy and survey call to action

#### Scenario: Visitor requests reduced motion during signup
- **WHEN** the pending email button is shown under reduced motion
- **THEN** the spinner does not rotate and the visible **Joining waitlist…** label continues to communicate the pending state

### Requirement: Status presentation remains responsive and stable
The reusable mark SHALL preserve its aspect ratio and SoleSheet colors across 360px mobile and desktop sizes. It SHALL support sufficient contrast on both light and dark surfaces without imposing dimensions on its caller.

#### Scenario: Status mark appears on mobile
- **WHEN** a caller presents the mark at a 360px-wide viewport
- **THEN** the animation remains centered and fully visible without clipping or horizontal page overflow

#### Scenario: Reusable mark appears on a light surface
- **WHEN** a future consumer configures the mark for a light background
- **THEN** its outline, grid, fill, completion cue, and hidden status semantics preserve the SoleSheet identity and remain usable
