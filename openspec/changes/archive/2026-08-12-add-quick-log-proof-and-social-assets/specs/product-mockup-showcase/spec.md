## ADDED Requirements

### Requirement: Planned-flow gallery uses seven static product-photograph destinations
The product showcase SHALL present **Quick Sale**, **Quick Actions**, **Search Stock**, **Add Stock**, **Installments**, **Payments**, and **Backup** under **“The rest of the planned flow.”** Quick Sale SHALL be selected by default and identified as the fastest path. Only the seven selector buttons SHALL operate; every selected panel SHALL be one static product-preview image with no focusable or operable controls inside the depicted phone.

#### Scenario: Visitor reaches the planned flow
- **WHEN** a visitor reaches **“The rest of the planned flow”**
- **THEN** Quick Sale is selected, visibly identified as the fastest path, and its static responsive product photograph is shown

#### Scenario: Visitor selects another destination
- **WHEN** a visitor activates Quick Actions, Search Stock, Add Stock, Installments, Payments, or Backup
- **THEN** the selected product photograph replaces the previous image and no depicted phone control becomes operable

### Requirement: Every destination has desktop and mobile art direction
Each planned-flow destination SHALL have a 4:3 desktop composition and a separately composed, taller 2:3 mobile composition. The website SHALL choose the matching source for the current viewport rather than shrinking, cropping, or horizontally scrolling a single desktop image. PNG masters SHALL be exactly 3200 by 2400 pixels for desktop and 1600 by 2400 pixels for mobile.

#### Scenario: Desktop visitor selects a destination
- **WHEN** the gallery is viewed above the mobile breakpoint
- **THEN** the selected destination uses its 4:3 desktop source without clipped essential text or phone content

#### Scenario: Mobile visitor selects a destination
- **WHEN** the gallery is viewed at 360px wide
- **THEN** the selected destination uses its 2:3 mobile source with a realistically tall phone body, an intentional tilted crop, legible headline, product UI, and disclosure, and no horizontal page overflow

#### Scenario: Master assets are captured
- **WHEN** the local capture workflow runs
- **THEN** every registered destination produces deterministic desktop and mobile PNG masters at the required dimensions

### Requirement: Quick Sale depicts the minimum sale workflow
The Quick Sale image SHALL depict one combined search covering model, size, and colorway; one selected sellable pair; read-only size, colorway, and cost facts; a dominant selling-price value; an editable sold date shown as today; Paid in full and Installment choices; and the appropriate sale action. It SHALL communicate the intended workflow without accepting visitor input.

#### Scenario: Visitor views Quick Sale
- **WHEN** Quick Sale is selected
- **THEN** the image shows that selecting Nike Dunk Low · US 8.5 · Cacao Wow prefills size, colorway, and ₱4,800 cost while the seller supplies the ₱6,500 sale price

### Requirement: Quick Actions depicts the anchored hold menu
The Quick Actions image SHALL depict the Home dashboard and a menu visually anchored to the bottom-right `+`. The menu SHALL list **Sell a pair**, **Record a payment**, and **Add a pair** in that order, and the composition SHALL visibly explain **Hold + for more** without implying that the image itself responds to a hold.

#### Scenario: Visitor views Quick Actions
- **WHEN** Quick Actions is selected
- **THEN** the image clearly associates the three-action menu with the `+` button rather than presenting it as a centered modal

#### Scenario: Mobile visitor views Quick Actions
- **WHEN** Quick Actions is selected at 360px wide
- **THEN** the complete three-action menu, Quick Log label, and anchored `+` trigger are visible together inside the mobile photograph

### Requirement: Public product identity uses the supplied SoleSheet brand kit
The landing page, browser metadata and icons, product photographs, social compositions, and link-preview image SHALL identify the product as **SoleSheet** and SHALL reuse the supplied Grid Shoe logo variants appropriate to light and dark backgrounds. The public marketing shell SHALL use SoleSheet Green `#22C55E`, Deep Ink `#14213D`, and Soft White `#F7FAF5` as its defining palette. White-text actions MAY use a darker accessible green, and citrus MAY remain a restrained secondary highlight; unrelated bright blue SHALL NOT remain the dominant interactive or section color.

#### Scenario: Visitor encounters a branded surface
- **WHEN** a visitor loads the page, shares its link, or views a generated product photograph
- **THEN** the visible identity says SoleSheet and uses the supplied logo without a leftover ShoeTrack wordmark or `ST` placeholder badge, and the mobile footer retains the full horizontal SoleSheet lockup rather than reducing it to the shoe mark

#### Scenario: Visitor uses the marketing website
- **WHEN** a visitor encounters navigation, calls to action, selected controls, focus treatments, or major section surfaces
- **THEN** those elements read as one SoleSheet color system while preserving readable contrast and visible keyboard focus

### Requirement: Search Stock makes exact-pair discovery appear effortless
The Search Stock image SHALL show one prominent inventory search whose example query and result treatment demonstrate matching across model, size, and colorway. Results SHALL show enough variant and status information to distinguish records while keeping the composition concise and presentation-only.

#### Scenario: Visitor views Search Stock
- **WHEN** Search Stock is selected
- **THEN** the image shows a short query such as `530 7 silver` resolving to New Balance 530 · US 7 · White / Silver with its availability, cost, and target facts visible

### Requirement: Add Stock depicts essentials-first inventory entry
The Add Stock image SHALL depict a short new-pair form whose primary facts are brand/model, size, colorway, and cost price, with target price visibly optional. The composition SHALL emphasize that a pair can be added without completing a dense inventory record.

#### Scenario: Visitor views Add Stock
- **WHEN** Add Stock is selected
- **THEN** the image shows the New Balance 530 example with US 7, White / Silver, ₱4,200 cost, optional ₱5,600 target, and one clear Add pair action

### Requirement: Installments, Payments, and Backup retain complete journey coverage
The remaining destinations SHALL use the same photo-style system. Installments SHALL show the selected sale continuing to down payment, starting balance, and first due date; Payments SHALL show a later installment payment changing collected and remaining amounts; Backup SHALL distinguish local-only use from the planned Starter plan, with cloud backup presented as a plan feature rather than the plan name, without claiming unavailable service.

#### Scenario: Visitor views Installments
- **WHEN** Installments is selected
- **THEN** the image carries the Nike Dunk Low ₱6,500 sale into a ₱2,500 down payment and ₱4,000 starting balance

#### Scenario: Visitor views Payments
- **WHEN** Payments is selected
- **THEN** the image shows one fictional payment updating collected, remaining, progress, history, and Partially paid status together

#### Scenario: Visitor views Backup
- **WHEN** Backup is selected
- **THEN** the image truthfully compares local-only storage with the planned Starter plan, presents automatic cloud backup and restore as a Starter feature, and includes a planned-product disclosure

### Requirement: Installment marketing section uses the canonical payment snapshot
The payment phone in the dark installment marketing section SHALL depict the same completed-payment snapshot as the Payments planned-flow destination. Both presentations SHALL show the fictional ₱1,500 payment, collected amount changing from ₱4,000 to ₱5,500, remaining balance changing from ₱2,500 to ₱1,000, 85% progress, payment history, and Partially paid status. Their outer editorial framing MAY differ, but the in-phone state and hierarchy SHALL not contradict one another.

#### Scenario: Visitor compares the payment presentations
- **WHEN** a visitor views the Payments destination and the standalone installment marketing section
- **THEN** both payment previews communicate the same recorded-payment state, values, status, progress, and history

### Requirement: Static image presentation remains accessible and efficient
Every selector SHALL preserve visible focus, selected-state semantics, concise live selection announcement, and a minimum 44 by 44 CSS-pixel target. Each selected photograph SHALL expose one concise equivalent description and SHALL not expose depicted labels, fields, buttons, menus, or navigation as separate accessible controls. The public website SHALL use optimized responsive derivatives rather than requiring visitors to download every high-resolution PNG master.

#### Scenario: Keyboard visitor changes the selected image
- **WHEN** a visitor navigates the selectors using a keyboard
- **THEN** visible focus and selected state remain clear and the new destination is announced concisely

#### Scenario: Screen reader reaches the selected panel
- **WHEN** assistive technology encounters the selected product photograph
- **THEN** one equivalent description explains the depicted state without duplicate controls from inside the image

#### Scenario: Visitor loads the gallery on mobile
- **WHEN** a mobile visitor opens the page
- **THEN** only appropriately optimized sources are eligible for display and the gallery introduces no nested horizontal scrolling
