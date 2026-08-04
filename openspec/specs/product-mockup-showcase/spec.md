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
