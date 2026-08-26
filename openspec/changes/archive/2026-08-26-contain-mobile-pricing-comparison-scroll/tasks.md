## 1. Mobile Overflow Containment

- [x] 1.1 Apply layout containment at the mobile comparison table's horizontal scroll region while preserving the 38rem table width, sticky Feature column, and table-local scrolling.

## 2. Regression Coverage

- [x] 2.1 Add focused component coverage for the mobile scroll boundary without changing the disclosure or table semantics.
- [x] 2.2 Add rendered mobile-browser coverage that opens the comparison, confirms the table region still overflows internally, and confirms the document remains viewport-wide before and after horizontal table scrolling.
- [x] 2.3 Run focused component and browser checks, typecheck, lint, and strict OpenSpec validation; record an actual-iPhone smoke check as the production-device follow-up.

Post-deployment follow-up: On the physical iPhone, open **Compare every feature**, scroll the table horizontally, then swipe elsewhere in the pricing section and confirm that only the table moves horizontally.
