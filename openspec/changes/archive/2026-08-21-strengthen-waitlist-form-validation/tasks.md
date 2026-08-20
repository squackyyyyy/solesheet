## 1. Shared Validation and Fields

- [x] 1.1 Add named free-text limits and bounded/trimmed value helpers, and extend email validation to enforce the 254-character limit.
- [x] 1.2 Add focused validation tests for supported email length, over-limit email rejection, clamping, trimming, whitespace-only values, and Unicode preservation.
- [x] 1.3 Add a reusable accessible fixed-height `TextAreaField` with shared field styling, an associated helper, and a visible current/maximum character count.

## 2. Signup and Survey Integration

- [x] 2.1 Apply the 60-character name and 254-character email limits, trim consumed signup values, and protect the confirmation heading from unbroken-text overflow.
- [x] 2.2 Apply 100-character limits and trim-on-blur behavior to Other inventory-method and sales-channel inputs while preserving their clearing behavior.
- [x] 2.3 Replace Other highest-value feature with the four-row 300-character textarea and retain explicit navigation and optional-answer semantics.

## 3. Verification

- [x] 3.1 Extend component tests for native limits, bounded controlled values, whitespace handling, multiline semantics, character count, and conditional clearing.
- [x] 3.2 Verify the signup and highest-value-feature states at 360px and desktop widths, including body-only scrolling, stable footer placement, and no horizontal overflow.
- [x] 3.3 Run focused and full unit tests, browser tests, type checking, linting, production build, and OpenSpec validation.
