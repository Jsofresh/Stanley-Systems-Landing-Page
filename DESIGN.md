---
version: alpha
name: Stanley Systems Website
description: Premium light-mode service-business website for Stanley Systems. Money-first, owner-relief-first, clean and practical.
colors:
  primary: "#15803D"
  secondary: "#102033"
  neutral: "#F7F2EA"
  canvas: "#F7F2EA"
  canvasSoft: "#FBF8F2"
  surface: "#FFFFFF"
  ink: "#102033"
  inkStrong: "#071421"
  muted: "#667085"
  border: "#DED6C8"
  borderSoft: "#ECE4D8"
  stanleyGreen: "#15803D"
  stanleyGreenDark: "#116832"
  stanleyGreenSoft: "#DDF7E8"
  success: "#15803D"
  danger: "#B42318"
typography:
  hero:
    fontFamily: Geist, Inter, system-ui, sans-serif
    fontSize: 6rem
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.06em"
  h1:
    fontFamily: Geist, Inter, system-ui, sans-serif
    fontSize: 4.75rem
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.055em"
  h2:
    fontFamily: Geist, Inter, system-ui, sans-serif
    fontSize: 3.25rem
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.045em"
  h3:
    fontFamily: Geist, Inter, system-ui, sans-serif
    fontSize: 1.75rem
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: Geist, Inter, system-ui, sans-serif
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: Geist, Inter, system-ui, sans-serif
    fontSize: 0.75rem
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.12em"
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  sectionY: 120px
  pageX: 40px
rounded:
  sm: 10px
  md: 18px
  lg: 28px
  xl: 36px
  pill: 999px
components:
  button-primary:
    backgroundColor: "{colors.stanleyGreen}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: 14px
  button-primary-hover:
    backgroundColor: "{colors.stanleyGreenDark}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 28px
---

## Overview

Stanley Systems needs a premium, practical, money-first website for service-business owners. The design should feel modern and expensive without becoming generic SaaS. The page should be easy for a plumber, HVAC owner, marine service shop owner, or office manager to understand in seconds.

The website should borrow broad design logic from high-quality modern sites: Apple-style whitespace, Wise-style money clarity, Stripe/Webflow-style rhythm, and restrained product-grade polish. Do not copy any brand literally.

## Colors

- **Canvas:** warm off-white, never pure gray and never dark mode.
- **Ink:** deep navy for headlines and important copy.
- **Stanley green:** the only strong accent. Use it for CTAs, highlights, success states, scroll cues, and key visual connections.
- **Surface:** white cards only when they help comprehension.
- **Borders:** thin warm-neutral borders. Avoid heavy outlines.

Do not use black sections, orange, amber, loud purple, rainbow gradients, or neon accents.

## Typography

Use type as the primary design tool. Headlines should be oversized, confident, and tightly spaced. Body copy should be plain English, readable, and calm.

Avoid clever SaaS language. Lead with money, time saved, billing speed, office drag, and owner relief.

## Layout

Use guided scroll storytelling. One idea per section. Avoid stacking generic cards just to fill space.

Sections should have generous spacing, strong hierarchy, and clear alignment. Mobile should feel intentionally composed, not squeezed.

## Elevation & Depth

Use soft shadows and subtle depth only where useful. Prefer borders, spacing, and type hierarchy before adding shadow.

Subtle green radial glows and faint abstract workflow or revenue-flow linework are allowed when they support the message. Do not add fake dashboards unless the brief explicitly asks for one.

## Shapes

Use rounded corners consistently. Cards and panels should be softly rounded. CTAs should usually be pill-shaped.

## Components

- **Primary CTA:** Stanley green, high contrast, clear action.
- **Secondary CTA:** white or transparent surface with navy text and warm border.
- **Cards:** white, soft border, low shadow, real content only.
- **Visual systems:** show revenue leaks, billing movement, follow-up flow, or owner relief. Avoid arbitrary metrics.
- **Motion:** smooth fade/up or subtle continuity motion. No bounce. Respect `prefers-reduced-motion`.

## Do's and Don'ts

Do:
- Lead with money, time, and owner relief.
- Keep Stanley Systems as the public business name.
- Make the Workflow Audit the paid first step when the page needs a first action.
- Use Cashflow Control System and Customer Revenue System as public package names.
- Build section by section and verify desktop plus mobile.

Do not:
- Say Stanley in public copy when the business name is needed.
- Make AI, automation, integrations, or optimization the public hero.
- Use fake KPI boxes, fake dashboards, generic icon grids, or filler testimonials.
- Redesign downstream sections unless the task explicitly asks for them.
- Use em dashes or en dashes in public-facing website copy.
