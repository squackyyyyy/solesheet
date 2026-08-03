# Shoe Inventory Tracker Waitlist Design Spec

## Overview

This document captures the current design direction for the Shoe Inventory Tracker waitlist landing page.

Chosen direction:

- `Stockroom Utility`

Design intent:

- Calm
- Operational
- Trustworthy
- Mobile-first
- Built for Philippine shoe resellers

Primary goal:

- Convert visitors into waitlist signups
- Communicate product value quickly
- Reinforce that the app solves mobile inventory friction

## Product Positioning

The page is for Filipino shoe resellers who manage roughly 20 to 150 active pairs and need:

- Faster inventory updates
- Profit clarity
- Installment-payment tracking
- A cleaner alternative to spreadsheets on mobile

The page should feel like a useful business tool, not a hype campaign.

## Typography

### Font Family

- Primary sans font: `Geist`
- Mono font: `Geist Mono`
- Fallback stack: `Arial, Helvetica, sans-serif`

Configured in:

- `app/layout.tsx`
- `app/globals.css`

### Typography Style

- Headlines: bold, compact, slightly editorial
- Body text: readable and quiet
- Labels: uppercase with increased tracking
- Numbers: emphasized with strong weight and tight tracking

### Type Scale Used

- Hero headline: `text-4xl sm:text-5xl font-semibold tracking-tight`
- Section heading: `text-3xl font-semibold tracking-tight`
- Card heading: `text-2xl` or `text-lg font-semibold tracking-tight`
- Body copy: `text-sm leading-7` or `text-base leading-7`
- Labels: `text-xs uppercase tracking-[0.3em]` or `tracking-[0.35em]`

## Color System

### Core Background

- Page background: `#f6f4ef`
- Foreground/text: `#141414`

These are defined as CSS variables in:

- `app/globals.css`

### Surface Colors

- Main card background: `white`
- Secondary warm surface: `#fbfaf7`
- Soft neutral surface: `stone-50`
- Input background: `white`

### Brand and Accent Colors

The design uses a restrained operational palette with green accents:

- Primary accent: `emerald-700`
- Accent surface: `emerald-50`
- Success or ready state: `emerald-50` to `emerald-100`
- Secondary neutral accent: `stone-*`
- Warning/accent chip: `amber-100`

### Text Colors

- Primary text: `stone-950`
- Secondary body text: `stone-600`
- Tertiary labels: `stone-500`
- Accent text on green surfaces: `emerald-900` / `emerald-800`

### Background Treatment

The page background uses a soft radial gradient:

- Top: warm off-white
- Middle: light cream
- Bottom: pale cool gray-green

Implementation:

- `bg-[radial-gradient(circle_at_top,_#fff7ed_0%,_#f6f4ef_40%,_#edf0ea_100%)]`

## Layout

### Page Width

- Maximum container width: `max-w-7xl`
- Horizontal padding:
  - Mobile: `px-4`
  - Small screens: `sm:px-6`
  - Large screens: `lg:px-8`

### Vertical Rhythm

- Page spacing: `gap-6`
- Section separation: consistent stacked sections with rounded cards
- Padding:
  - Main header and panels: `p-5` to `p-6`
  - Card content: `p-4` to `p-5`

### Grid Behavior

Used responsive two-column layouts on larger screens:

- Hero area: informational header plus waitlist CTA
- Proof area: product value panel plus CTA panel
- Feature area: 3-column grid on large screens
- Supporting area: 2-column grid on large screens

Mobile behavior:

- Everything stacks vertically
- Cards remain full width
- Waitlist CTA appears before supporting detail sections

## Surfaces And Elevation

### Card Style

Common card traits:

- Rounded corners: `rounded-[2rem]` or `rounded-[2.25rem]`
- Light borders: `border-stone-200` or `border-emerald-200`
- Soft shadows: low-opacity ambient shadows

Typical shadow tokens:

- `shadow-[0_18px_60px_rgba(15,23,42,0.08)]`
- `shadow-[0_20px_70px_rgba(15,23,42,0.08)]`
- `shadow-[0_16px_50px_rgba(15,23,42,0.07)]`
- `shadow-[0_10px_30px_rgba(15,23,42,0.06)]`

The elevation should feel gentle and practical, not flashy.

## Components

### Hero Header

Purpose:

- Introduce the product
- Explain the audience
- Set tone as calm and trustworthy

Content structure:

- Small uppercase eyebrow: `Stockroom Utility`
- Hero title
- Short explanatory paragraph
- Three supporting chips on the right

### Metrics Grid

Purpose:

- Give immediate business proof
- Make the app feel concrete

Metric cards shown:

- Active pairs
- Unpaid balance
- Monthly profit

Card style:

- White surface
- Small uppercase label
- Large numeric value

### Dashboard Preview

Purpose:

- Simulate the in-app inventory experience
- Make the page feel product-oriented

Preview elements:

- Ready status chip
- Example shoe record
- Example cost and target pricing
- Example reserved status with buyer name

### Waitlist CTA Panel

Purpose:

- Capture lead information
- Reinforce the founding-user framing

Form fields:

- Name
- Email or Facebook/Instagram handle
- Short usage question

Button style:

- Rounded pill button
- `bg-emerald-700`
- White text
- Hover darker green

### Feature Cards

Feature themes:

- Inventory made fast
- Profit clarity
- Installment tracking

Each feature card should:

- Feel concise
- Use a strong title
- Include one practical supporting paragraph

### Supporting Benefit List

Purpose:

- Repeat the value proposition in simpler language
- Reinforce the mobile and reseller context

Key messages:

- Spreadsheets are painful on mobile
- Track stock statuses in one place
- See profit and installments clearly
- Built for Facebook and Instagram reseller workflows

### Founding-User Offer Panel

Purpose:

- Close the page with a low-pressure, early-access tone
- Frame the waitlist as product validation

Style:

- Soft warm gradient surface
- Neutral white cards inside
- Clear invitation to shape the first release

## Content Tone

Tone rules:

- Speak like a practical product, not a startup pitch
- Keep copy grounded in real reseller workflows
- Avoid hype language
- Avoid overly technical language
- Use Philippine reseller context naturally

Good tone examples:

- Fast mobile inventory updates
- Profit clarity
- Installment tracking
- Founding-user list

## Mobile Behavior

The design is mobile-first.

Rules:

- Hero and CTA stack vertically
- Chips wrap naturally
- Metric cards become a 1-column or 2-column feel depending on width
- Text should remain readable without zooming
- Buttons and inputs should be large enough for thumb use

## Interaction Style

Current page interactions are minimal and presentation-first.

Preferred interaction behavior for future buildout:

- Subtle hover color shifts
- Clear focus borders on inputs
- No flashy motion
- No distracting animation

## Form Styling

Inputs:

- Height: `h-12`
- Rounded corners: `rounded-2xl`
- Border: `border-emerald-200`
- Background: white
- Focus ring/border: `focus:border-emerald-400`
- Text: `text-sm text-stone-900`

Textarea:

- Similar to inputs
- Taller vertical space with `rows={4}`

Button:

- Pill-shaped
- Strong green fill
- White text
- Medium-large tap target

## Radius And Shape Language

The design uses soft, generous rounding:

- Large panels: `rounded-[2rem]` or `rounded-[2.25rem]`
- Mid-size cards: `rounded-[1.5rem]`
- Small stat cards: `rounded-[1.4rem]`
- Chips: `rounded-full`

This keeps the page friendly and tactile rather than rigid.

## Current Implementation Files

- [app/page.tsx](/Users/mac/proj/shoe-track/app/page.tsx)
- [app/layout.tsx](/Users/mac/proj/shoe-track/app/layout.tsx)
- [app/globals.css](/Users/mac/proj/shoe-track/app/globals.css)

## Summary

The design should communicate:

- Calm operational confidence
- A real solution for shoe resellers
- Mobile-first speed
- Profit and installment clarity
- An early-access product worth joining

