---
name: stanley-visual-qa
description: Use after Stanley Systems website UI changes. Requires desktop/mobile visual checks, first-viewport checks, console checks, and concise evidence before claiming the design is done.
---

# Stanley Visual QA

Use this skill after making visual, layout, responsive, or content changes to the Stanley Systems website.

## Goal

Catch design failures before handing work back. Build success is not enough. The page must look right on desktop and mobile.

## Required visual checks

For any public website UI change, verify at least:

1. Desktop screenshot or browser inspection.
2. Mobile screenshot or browser inspection.
3. Console check for relevant JavaScript errors.
4. First viewport check if the hero or top of page is affected.
5. Scroll check if the section flows into another section.
6. Copy check for locked phrases and banned phrases.

## Stanley-specific first viewport checks

If the top hero is in scope, confirm:
- headline is visible and not clipped
- prompt or CTA is visible if required by the brief
- no CTA appears if the brief says no CTA
- nav does not wrap, collide, or overlap
- mobile sticky CTA does not violate the first viewport brief
- background art does not interfere with text

## Mobile checks

Always inspect mobile. Look for:
- clipped buttons
- unreadably small text
- headings that consume the entire viewport
- sticky elements hiding content
- hamburger/nav collisions
- linework or glows reducing contrast
- sections that require awkward scrolling before the main idea appears

## Visual quality standard

Fail the design if it looks like:
- generic SaaS card grid
- fake dashboard clutter
- random KPI boxes
- loud gradients
- dark-mode tech site
- under-spaced mobile port
- unbalanced blankness with no intentional rhythm

Pass only if it feels:
- premium
- clear
- warm-light
- money-first
- service-business practical
- polished on both desktop and mobile

## Useful commands

If Playwright is available in the repo, screenshots can be captured with a short Node script or Playwright test. Use current local tooling. Do not add heavy new dependencies just to take a screenshot.

Preferred verification sequence for code changes:

```bash
npm run build
```

Then inspect desktop and mobile output using browser tooling, Playwright, or `playwright-cli` if installed.

## Reporting

Report concise proof:
- build command and result
- URLs or screenshots checked
- console result
- known limitations
- any divergences from the requested scope
