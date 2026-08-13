# product-mockup-showcase Specification

## Purpose

Define credible mobile-app mockups that let prospective resellers judge the planned workflow before the product itself is built.

## Requirements

### Requirement: Mockups represent the planned core journey
The showcase SHALL include recognizable mobile screens for the dashboard, inventory list, add-shoe flow, mark-as-sold flow, installment setup, installment payment tracking, and upgrade or backup state.

#### Scenario: Visitor explores the showcase
- **WHEN** a visitor advances through or scrolls the mockup showcase
- **THEN** every required core-journey screen is available and each screen is clearly labeled by purpose

### Requirement: Mockups use the mobile app design language
The interface inside each device mockup SHALL follow the app design guide's calm operational visual language, typography hierarchy, generous touch sizing, soft card treatment, and restrained status colors. The surrounding marketing page SHALL remain visually distinct and is not required to inherit the app design system.

#### Scenario: App and marketing layers appear together
- **WHEN** a mockup is displayed within the waitlist page
- **THEN** the mockup reads as one coherent mobile product while its device frame and surrounding page remain distinguishable as marketing presentation

### Requirement: Mockup content is realistic and scoped
Mockups SHALL use plausible Philippine sneaker-reseller examples, Philippine peso values, common shoe sizes, and the planned inventory and payment states. They SHALL NOT depict item-photo management, QR scanning, team administration, payment processing, or other deferred functionality as available in the first release.

#### Scenario: Dashboard data is shown
- **WHEN** a visitor views the dashboard mockup
- **THEN** the screen displays internally consistent examples for active pairs, inventory value, revenue or profit, and unpaid installment balance using peso formatting

#### Scenario: Installment workflow is shown
- **WHEN** a visitor views the installment setup and tracking mockups
- **THEN** the screens distinguish inventory status, payment status, cash collected, and remaining balance without suggesting that the app lends money or processes payments

### Requirement: Home dashboard previews share one canonical basic summary
Every Home dashboard representation in the product showcase SHALL use the same canonical mock state and information hierarchy. The shared state SHALL show 12 active pairs, ₱53,200 inventory cost, ₱8,950 monthly profit, ₱2,500 unpaid installment balance, and a **Stock mix** of 9 available and 3 reserved pairs. The Stock mix SHALL use a compact segmented visualization derived from those status counts and SHALL remain a basic status summary rather than imply time-series, ranking, drill-down, or advanced reporting capability.

#### Scenario: Visitor compares dashboard representations
- **WHEN** a visitor views the general dashboard preview and the Home dashboard beneath Quick Actions
- **THEN** both representations use the same dashboard labels, values, Stock mix counts, status proportions, and module order without contradictory information

#### Scenario: Visitor sees the free basic-dashboard value
- **WHEN** a Home dashboard preview is visible
- **THEN** the Stock mix communicates 9 available and 3 reserved pairs through text and a restrained segmented bar without presenting paid advanced analytics as available

#### Scenario: Dashboard equivalent descriptions are read nonvisually
- **WHEN** assistive technology encounters a dashboard preview or the Quick Actions photograph
- **THEN** its concise equivalent description communicates the canonical active inventory and Stock mix state without exposing the segmented bar as a separate control

### Requirement: Showcase is usable without a pointer
All mockup navigation SHALL support touch, keyboard, and assistive technology. Screen labels and equivalent textual descriptions SHALL communicate the important information when visual detail cannot be perceived.

#### Scenario: Keyboard navigation
- **WHEN** a keyboard visitor focuses the showcase controls and changes the selected screen
- **THEN** the selected state is announced, focus remains predictable, and the newly selected mockup has an accessible name and description

#### Scenario: Nonvisual access
- **WHEN** a screen reader encounters a decorative device rendering
- **THEN** redundant visual fragments are hidden and a concise equivalent description of the screen's purpose and key data is available

### Requirement: Mockups remain performant on mobile connections
The showcase SHALL avoid loading unnecessary high-resolution assets and SHALL reserve stable layout space so that loading it does not cause disruptive content movement.

#### Scenario: Page loads on a constrained mobile connection
- **WHEN** mockup content is requested on a narrow mobile viewport
- **THEN** the initially visible mockup is prioritized, offscreen visual assets are deferred, and the visitor can use the page before all showcase content has loaded

### Requirement: Planned-flow gallery uses seven static product-photograph destinations
The product showcase SHALL present **Quick Sale**, **Quick Actions**, **Search Stock**, **Add Stock**, **Installments**, **Payments**, and **Backup** under the eyebrow **Product preview gallery** and heading **Seven everyday workflows, shown clearly.** The supporting instruction SHALL explain that selecting a moment switches the preview image and that controls pictured inside the phone are illustrative and do not operate. Quick Sale SHALL be selected by default and identified as the fastest path. Only the seven selector buttons SHALL operate; every selected panel SHALL be one static product-preview image with no focusable or operable controls inside the depicted phone.

#### Scenario: Visitor reaches the product preview gallery
- **WHEN** a visitor reaches **Product preview gallery**
- **THEN** the gallery uses the updated static-preview heading and instruction, Quick Sale is selected and visibly identified as the fastest path, and its static responsive product photograph is shown

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
The Quick Actions image SHALL depict the canonical Home dashboard, including its compact **Stock mix** visualization, beneath a menu visually anchored to the bottom-right `+`. The menu SHALL list **Sell a pair**, **Record a payment**, and **Add a pair** in that order, and the composition SHALL visibly explain **Hold + for more** without implying that the image itself responds to a hold. The menu, Quick Log label, and trigger SHALL remain the dominant visual message; the open menu MAY naturally cover lower dashboard modules but the visible underlying dashboard content SHALL remain consistent with the general dashboard preview.

#### Scenario: Visitor views Quick Actions
- **WHEN** Quick Actions is selected
- **THEN** the image shows the canonical dashboard and Stock mix while clearly associating the three-action menu with the `+` button rather than presenting it as a centered modal

#### Scenario: Mobile visitor views Quick Actions
- **WHEN** Quick Actions is selected at 360px wide
- **THEN** the complete three-action menu, Quick Log label, anchored `+` trigger, and enough of the Stock mix to recognize the basic visualization are visible together inside the mobile photograph

#### Scenario: Quick Actions is described nonvisually
- **WHEN** assistive technology encounters the selected Quick Actions photograph
- **THEN** one equivalent description identifies the canonical Home summary, the 9-available and 3-reserved Stock mix, and the three actions anchored to Quick Log

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
The Add Stock image SHALL depict a short new-pair form whose primary facts are brand/model, size, colorway, and cost price, with target price visibly optional. Between the target-price field and the primary Add pair action, the image SHALL depict a collapsed **Optional details** disclosure that identifies **Date acquired**, **Status**, and **Notes** as additional fields and states that they can be added or edited later. The optional fields themselves SHALL remain hidden, the Add pair action SHALL remain visually primary, and the composition SHALL NOT imply that item photos or supplier data are supported by the initial product.

#### Scenario: Visitor views Add Stock
- **WHEN** Add Stock is selected
- **THEN** the image shows the New Balance 530 example with US 7, White / Silver, ₱4,200 cost, optional ₱5,600 target, a collapsed Optional details disclosure naming Date acquired, Status, and Notes with add-or-edit-later guidance, and one clear Add pair action

#### Scenario: Add Stock is described nonvisually
- **WHEN** assistive technology encounters the selected Add Stock photograph
- **THEN** one concise equivalent description communicates the essentials-first form, the supported optional details, their later editability, and the Add pair action without exposing the depicted disclosure or fields as operable controls

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
