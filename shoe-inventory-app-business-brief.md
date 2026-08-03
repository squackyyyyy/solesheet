# Shoe Inventory App Business Brief

## 1. Project Overview

This project is a mobile-first inventory application for shoe resellers in the Philippines, especially sneaker resellers who currently manage inventory using Google Sheets, Excel, notes apps, Messenger, or notebooks.

The app should make inventory management faster and easier on a phone. The core value is not simply "inventory tracking"; the app should reduce the hassle of updating inventory whenever a reseller buys, reserves, or sells a pair.

The likely initial launch platform is Android, reflecting the broader Philippine mobile market. The product should preferably use a cross-platform approach so iOS can follow without maintaining two separate apps. The final implementation choice will be confirmed after 30 to 50 qualified reseller responses and interviews; it is not an iOS-first project by default.

## 2. Target Users

Primary users:

- Filipino sneaker and shoe resellers
- Solo resellers managing small to medium inventory
- Growing resellers handling many sizes, models, and sales transactions
- Resellers who sell through Facebook Marketplace, Facebook groups, Instagram, TikTok, or direct messages

Initial beachhead market:

- Facebook and Instagram shoe resellers in the Philippines
- Sellers who do not yet use a dedicated inventory system
- Sellers managing approximately 20 to 150 active pairs
- Sellers who accept installment payments from buyers

Possible future users:

- Small sneaker shops
- Consignment sellers
- Reseller teams with staff
- Sellers of other collectible or size-based items

## 3. Problem Statement

Many shoe resellers use spreadsheets or manual notes to track inventory, but those tools are inconvenient on mobile.

Common problems:

- Updating Google Sheets or Excel on a phone is slow
- It is easy to forget to update inventory after a sale
- Size-level inventory is awkward to manage
- Sellers may not know their total capital, revenue, or profit clearly
- Sold history can become messy over time
- Bulk encoding inventory is easier on desktop than on mobile

The app should solve the "I do not want to update my inventory because it is a hassle" problem.

## 4. Core Product Concept

The app helps a reseller:

- Add shoe inventory
- Track available, reserved, and sold pairs
- Record cost price and selling price
- Compute profit automatically
- Track installment payments for sold shoes
- See inventory value and sales performance
- Add inventory from mobile or through a web quick-add page
- Preserve sold history without automatically deleting records

The app should feel simpler and faster than a spreadsheet.

## 5. Product Features

### Inventory Item Fields

Each inventory record should support:

- Brand
- Model
- Size
- Colorway
- Cost price
- Target selling price
- Actual selling price
- Date acquired
- Status
- Notes

Initial statuses:

- Available
- Reserved
- Sold

Possible future statuses:

- On hold
- Consigned
- Returned
- Archived

### Core Actions

Users should be able to:

- Add a shoe record
- Edit a shoe record
- Mark a shoe as reserved
- Mark a shoe as sold
- Enter actual selling price when sold
- Mark a sale as fully paid or installment-based
- Track installment payment progress
- View profit per sold item
- Search and filter inventory
- View active inventory
- View sold inventory history

### Dashboard

The dashboard should show:

- Total active pairs
- Total inventory cost/value
- Total expected revenue
- Total sold pairs
- Total revenue from sold pairs
- Total profit
- Monthly profit
- Total unpaid installment balance
- Total collected installment payments

### Installment Tracking

Installment tracking should be included because installment-based shoe sales appear to be common among Filipino resellers and buyers.

When marking a shoe as sold, the user should be able to choose:

- Fully paid
- Installment

For installment sales, the app should support:

- Buyer name or nickname
- Buyer contact handle or notes
- Total sale price
- Down payment
- Remaining balance
- Payment due dates
- Payment entries
- Payment method notes
- Paid/unpaid status
- Overdue indicator

This feature should be included in the free plan because it is part of the core local reseller workflow. It may also become one of the app's strongest differentiators versus generic inventory tools or spreadsheets.

Initial installment rules:

- The app is a seller-managed tracking tool, not a lending, collection, or payment-processing service.
- Each sold pair has separate inventory and payment states.
- Inventory states: Available, Reserved, Released/Sold, Returned, Cancelled.
- Payment states: Unpaid, Partially Paid, Paid, Overdue, Defaulted.
- The app shows expected profit, cash collected, and unpaid balance as separate figures.
- A reservation deposit can be marked as refundable, forfeited, or credited toward the final sale price.
- In the first version, one payment applies to one shoe sale; multi-shoe orders and split payments can be added later.
- Cancellations and returns must record any refund and optionally return the pair to available inventory.
- The first version does not calculate interest, late fees, or take action against buyers.

Future paid enhancements can include:

- Installment reminders
- More advanced overdue reports
- Buyer payment history
- Exportable collection reports
- Multi-device installment sync

### Web Quick-Add Flow

The app should eventually generate or provide a web link where users can add inventory from a browser. This is valuable because bulk encoding is often easier on a laptop or desktop.

This feature should likely be paid, because it creates a strong upgrade reason and may require cloud infrastructure.

## 6. Validation Phase Before App Development

The first step should not be building the MVP app immediately.

Recommended first phase:

- Create a focused, clickable Figma prototype of the core user journey
- Test the Figma prototype with a small number of real target resellers
- Create a mobile-first website/landing page that shows the product concept
- Display realistic app screens and workflows
- Invite visitors to join a waitlist
- Ask optional follow-up questions after the waitlist click
- Use waitlist and survey responses to validate demand before investing in full development

Goal:

- Confirm whether Filipino shoe resellers understand the value quickly
- Learn which platform to prioritize first using qualified reseller responses
- Test pricing sensitivity
- Identify which features matter most before building the app

### Figma Mockup Requirements

The Figma design should show:

- Inventory dashboard
- Add shoe flow
- Inventory list
- Shoe detail page
- Mark as sold flow
- Installment sale flow
- Installment payment tracking screen
- Pricing or upgrade screen

The mockup should feel like a real product, not a generic concept. The screens should use realistic sneaker reseller examples, Philippine peso pricing, and common sizes.

The first Figma prototype should cover only the core journey:

- Dashboard
- Inventory list
- Add shoe
- Mark as sold
- Installment setup
- Installment payment tracking
- Upgrade/backup screen

Do not wait to design every future feature before building the waitlist website.

### Website Requirements

The website should explain:

- The problem: spreadsheets are painful on mobile
- The product: a simple inventory and profit tracker for shoe resellers
- The key benefit: update inventory and sales faster
- The installment tracking feature
- The pricing direction
- The founding-user offer
- The waitlist call to action

Suggested website sections:

- Hero section with clear product positioning
- Product mockup/screenshots from Figma
- Key features
- Installment tracking explanation
- Pricing preview
- Founding seller offer
- Waitlist call to action
- Optional FAQ

The website should not promise features that are not planned. It should present the product as upcoming and invite users to join the waitlist.

### Mobile-First Website Design

The waitlist website must be designed mobile-first because the target market is likely to discover it through Facebook and Instagram on mobile devices.

- Design the primary layout for a 360px-wide Android viewport, then scale it up for larger phones and desktop.
- Use large touch targets, short sections, legible input fields, and one clear waitlist call to action.
- Use a bottom sheet or full-screen sheet for the optional survey on mobile; a modal is acceptable on desktop.
- Optimize mockup images for fast loading on mobile connections.
- Test the finished website at mobile and desktop widths before launch.
- Use Figma screens as source material for website mockups, not as a literal exported website.

### Waitlist Flow

The waitlist should have a low-friction first step.

Recommended flow:

1. User clicks "Join the Waitlist"
2. The server records a waitlist intent or signup event
3. The button becomes disabled or changes state so repeated clicks do not inflate counts
4. The user sees a success message
5. The user is invited to answer optional questions

Best practice:

- The initial waitlist action should collect at least one durable identifier, ideally an email address or phone number.
- A pure click count is weaker because it can be spammed and does not let you contact interested users later.
- Count button clicks separately from verified waitlist signups.

Suggested metrics:

- CTA clicks
- Unique email or phone signups
- Optional survey completion rate
- Selected platform: iOS, Android, or both
- Selected pricing plan
- Most requested feature

### Waitlist Privacy Notice

Show this short notice beside the waitlist form, with a link to the full Privacy Notice:

> **Privacy note:** We collect your email address or mobile number and any optional survey answers you provide to manage this waitlist, contact you about early access and product research, and help us build the right tool for shoe resellers. Survey questions are optional. We do not sell your personal information. We may use trusted service providers to host the form and send messages on our behalf. You may ask to access, correct, or delete your information by contacting us at [support email]. See our [Privacy Notice].

The website should also include a required, unticked consent checkbox:

> I agree to the collection and use of my information as described in the Privacy Notice, including contact about the waitlist and early access.

Privacy implementation requirements:

- Publish a full Privacy Notice before collecting waitlist signups.
- State the data collected, purpose, legal basis/consent, retention period, service providers, contact details, and data-subject rights.
- Set a specific retention rule, for example delete or anonymize inactive waitlist data after 12 months unless the person opts in to remain informed.
- Do not collect buyer information on the waitlist.
- Store only the minimum information needed for waitlist and research purposes.
- Obtain a Philippines-qualified privacy review before public launch, particularly before paid cloud sync stores buyer names or contact details.

### Spam and Duplicate Prevention

To reduce spam and duplicate waitlist counts:

- Disable the button after a successful submission in the current browser
- Store a local browser flag so refreshing does not immediately re-count the same visitor
- Require email or phone for a true waitlist signup
- Deduplicate by email or phone on the server
- Add basic rate limiting by IP/device
- Add a honeypot field for bots
- Add CAPTCHA only if spam becomes a real problem, because CAPTCHA can hurt conversion

### Optional Survey Flow

After a successful waitlist signup, show:

"You have successfully joined the waitlist. If you have time, answering a few quick questions will help us build the right product for shoe resellers."

On desktop:

- A modal is acceptable
- Keep it short
- Allow users to close it anytime

On mobile:

- A bottom sheet or full-screen sheet is usually better than a small centered modal
- The survey should be easy to close
- Inputs should be large and thumb-friendly

The survey should save progress after each answer so users can leave and resume later if they return with the same browser or account/email.

If a user clicks "Join the Waitlist" again after already signing up:

- Do not create a duplicate signup
- Show the previous success state
- Let them continue unanswered optional survey questions

### Optional Survey Questions

Recommended questions:

- What phone do you mainly use for your reseller business?
- Options: iPhone, Android, both, not sure

- Which plan would you most likely consider?
- Options: Free, Starter at PHP 99/month, Growth at PHP 179/month, founding seller offer at PHP 65/month, not sure yet

- How many active shoe pairs do you usually manage?
- Options: 1-20, 21-50, 51-150, 151-750, 750+

- Do you sell shoes through installments?
- Options: Yes often, sometimes, rarely, never

- What do you currently use to track inventory?
- Options: Google Sheets, Excel, Notes app, Messenger, notebook, memory only, other

- Which feature matters most to you?
- Options: Fast inventory updates, profit tracking, installment tracking, web quick-add, cloud backup, reports

- Would you want cloud backup/sync?
- Options: Yes, no, maybe, only if affordable

- What sales channels do you use?
- Options: Facebook Marketplace, Facebook groups, Instagram, TikTok, Shopee/Lazada, direct messages, physical store

- Optional contact field for interview:
- "Can we message you to ask a few follow-up questions?"

Do not make these questions required after the user has already joined the waitlist.

## 7. Removed / Deferred Features

### Item Photos

Photos are not required for the current concept and should be removed from the initial product plan.

Reasons:

- Users may not need photos to manage shoe inventory
- Photos increase cloud storage cost
- Photos complicate sync, backup, and performance
- The app's main value should be speed, inventory accuracy, and profit tracking

### QR / Barcode Features

QR and barcode features are useful later but should not be part of the first app version unless early users strongly request them.

Possible future QR/barcode features:

- Generate QR labels
- Print QR labels
- Scan a pair to update status
- Scan when marking an item as sold

### Team / Multi-User Features

Team features should be deferred until there are users who clearly need staff access or role permissions.

Possible future team features:

- Multiple users
- Role permissions
- Activity logs
- Multiple locations
- Consignment tracking

## 8. Pricing Strategy

The original idea was a subscription plan around PHP 65 per month.

Current recommendation:

- Do not make PHP 65 the standard public price
- Use PHP 65 per month as a limited founding-user price
- Public pricing should start higher to account for app store fees, cloud costs, support, and ongoing development

Apple and Google may take platform fees from in-app subscriptions. For small developers and subscriptions, this can commonly be around 15%, depending on eligibility and platform rules. Because of this, very low pricing can become thin after fees and operating costs.

## 9. Recommended Pricing Tiers

### Free

Price: PHP 0

Purpose:

- Let users try the app and experience how much easier it is than spreadsheets
- Avoid becoming a permanent free business tool for active sellers

Recommended limits:

- Up to 20 active pairs
- 1 user
- Local device storage only
- No online backup
- No cloud sync
- Basic inventory add/edit
- Available, reserved, and sold statuses
- Basic profit per item
- Basic dashboard
- Installment tracking
- Sold history retained without automatic expiry
- No web quick-add
- Local export through the device share sheet, such as CSV or JSON
- No spreadsheet import
- No advanced analytics
- No QR/barcode features

Important decision:

- The free tier should be limited by active pairs.
- Sold history should not automatically expire.
- The free tier should avoid online backup and cloud sync so free users do not create ongoing cloud storage or sync costs.

Reason:

- Free users with only 10 to 20 active pairs may be able to use the app long term, but if their data stays local to their device, the direct server cost should be minimal.
- This is acceptable if the free tier acts as organic adoption and word-of-mouth while paid plans unlock backup, sync, higher limits, and convenience features.

Important caveat:

- Local-only storage reduces backend cost, but it does not eliminate all cost. There may still be costs for app distribution, support, analytics, website hosting, crash reporting, and maintenance.
- Local-only free users still carry data-loss risk if they uninstall the app, lose their phone, or change devices. The app should explain this clearly, provide free local export, and position cloud backup as a paid protection feature.

### Starter

Price:

- PHP 99 per month
- PHP 999 per year

Best for:

- Solo resellers
- Small but active sellers

Recommended support:

- Up to 150 active pairs
- Full sold history
- Cloud backup
- Installment tracking
- Add/edit inventory
- Mark as available, reserved, or sold
- Cost price, target selling price, actual selling price
- Profit calculation
- Basic monthly dashboard
- Search and filtering
- Export to CSV

Notes:

- This should be the main entry paid plan.
- It should feel affordable but not too cheap.

### Growth

Price:

- PHP 179 per month
- PHP 1,799 per year

Best for:

- Serious resellers
- Sellers with larger inventory
- Sellers who want better reporting and faster encoding

Recommended support:

- Up to 750 active pairs
- Full sold history
- Cloud sync and backup
- Installment tracking with stronger reporting
- Web quick-add link
- Bulk web entry
- Spreadsheet import
- Advanced analytics
- Best-selling sizes
- Best-selling models
- Monthly revenue and profit reports
- Inventory value reports
- Reserved item tracking
- Restock notes
- Priority backup reliability

Notes:

- This is likely the best plan to highlight once the product is mature enough.
- The web quick-add feature should probably start here because it is a clear upgrade driver.

### Pro / Team

Price:

- PHP 349 per month
- PHP 3,499 per year

Best for:

- Bigger resellers
- Small sneaker shops
- Teams with staff
- Resellers managing consignment or multiple storage locations

Recommended support:

- 3 users included
- Higher or unlimited active inventory limit
- Multiple locations or storage boxes
- Consignment tracking
- Advanced installment tracking and collection reports
- Role permissions
- Activity logs
- Inventory audit tools
- QR label generation and scanning
- Priority support

Notes:

- This does not need to launch on day one.
- It should be introduced only when real users need team workflows.

## 10. Founding Seller Offer

Recommended launch offer:

- PHP 65 per month for the first 50 to 100 paying users
- Keep the price while their subscription remains active
- Position it as a reward for joining early

Purpose:

- Makes early adoption easier
- Validates willingness to pay
- Preserves the option to charge healthier public pricing later

## 11. Business Requirements

### Product Requirements

- The app must be fast and mobile-friendly
- Adding inventory should feel easier than editing a spreadsheet
- Marking an item as sold should take only a few taps
- Profit should calculate automatically
- Installment tracking should be treated as a core workflow
- Users should be able to separate active inventory from sold history
- Free users should be able to test the core workflow
- Free users should have local-only usage with no online backup
- Paid users should receive enough value to justify a subscription
- Photos are not required for the initial product

### Data Requirements

- Inventory records must be structured and searchable
- Sold records should not automatically expire
- Free users should store data locally on device
- Paid users should have cloud backup
- Cloud usage should be controlled to avoid free-tier cost leakage
- Installment payment records must be linked to sold shoes
- The app should show unpaid balances clearly

### Pricing Requirements

- Free tier should support up to 20 active pairs
- Free tier should include installment tracking
- Free tier should not include online backup or cloud sync
- Free tier should include a local data export so users are never trapped without access to their records
- Paid tiers should unlock scale, cloud backup, history, analytics, and convenience
- The public starter price should likely be PHP 99 per month, not PHP 65 per month
- PHP 65 per month should be used as an early founding-user offer
- Annual pricing should provide a discount and improve cash flow

### Technical / Platform Requirements

- Do not commit to iOS-first before validation
- Treat Android as the likely first launch platform because of the wider Philippine mobile market
- Prefer a cross-platform implementation if it can release Android first without slowing validation
- Make the final platform call after 30 to 50 qualified target-reseller responses and interviews
- Use React Aria Components for accessible, touch-friendly interactive web controls such as forms, dialogs, radio groups, and validation states.
- React Aria is not required for purely static website sections.
- A web quick-add interface is a valuable future feature
- Backend can start simple and cost-conscious
- Cloud sync/backup should be designed carefully because it affects pricing and operating costs
- Avoid cloud-heavy features such as photos in the initial product
- Local-only free usage should be designed carefully so users understand backup limitations
- Waitlist signup should deduplicate users and avoid counting repeated button clicks as unique demand

### Go-To-Market Requirements

- Validate with real Filipino shoe resellers before building the full app
- Create and test a focused Figma prototype before building the waitlist website
- Create a website that shows the mockup and product idea
- Build the website mobile-first
- Collect waitlist signups
- Ask optional post-signup survey questions
- Interview sellers who currently use spreadsheets
- Test whether users will pay PHP 99 or PHP 179 per month
- Offer a founding-user price to reduce early friction
- Focus messaging on speed, simplicity, installment tracking, and profit clarity

## 12. Key Open Questions

- Should the first actual app be local-first with optional paid cloud backup, or cloud-first for paid users only?
- Should the first version launch Android-first using a cross-platform codebase, or should results justify a different choice?
- What is the minimum inventory size where a reseller feels pain strongly enough to pay?
- How often do target users add inventory in bulk from a computer?
- Do users care more about installment tracking, profit analytics, web quick-add, or backup/sync?
- What payment flow is best for the Philippine market: app store subscription, web payment, GCash/Maya, or a mix?
- Should the waitlist collect email, phone number, or both?
- Should the waitlist website show pricing immediately, or ask pricing interest after signup?

## 13. Current Strategic Recommendation

Start with validation before building the app:

- Figma mockups of the core product
- A tested, focused Figma prototype of the core user journey
- A mobile-first website showing the app concept
- A waitlist signup flow
- Optional post-signup survey questions
- User interviews with Filipino shoe resellers

The eventual app should focus on:

- Fast mobile inventory updates
- Clean active and sold inventory separation
- Automatic profit tracking
- Installment tracking
- A free tier with 20 active pairs, local-only data, and local export
- A PHP 99/month Starter plan
- A PHP 179/month Growth plan
- No photo feature in the initial product
- Android-first or cross-platform-first based on qualified reseller validation, not a default iOS assumption

The product should prove that sneaker resellers will pay for speed and clarity before expanding into heavier features like QR scanning, team access, consignment, or complex reporting.
