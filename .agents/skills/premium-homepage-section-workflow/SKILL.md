---
name: premium-homepage-section-workflow
description: Use for Stanley Systems homepage redesign work section by section. Keeps scope tight, preserves locked copy, verifies desktop/mobile, and prevents downstream redesign drift.
---

# Premium Homepage Section Workflow

Use this skill whenever the user asks for Stanley Systems homepage redesign, section work, visual polish, responsive fixes, or conversion-section implementation.

## Prime rule

Work section by section. Do not skip ahead. Do not batch sections. Do not redesign downstream sections unless the user explicitly signs off and asks for the next section.

## Required steps

1. Identify the exact section in scope.
2. Identify locked copy, locked CTA text, locked destinations, and forbidden elements.
3. Read the current component/page files before editing.
4. Read `DESIGN.md` and use `stanley-site-design-director` guidance if available.
5. Make the smallest high-quality implementation that satisfies the section brief.
6. Keep shared chrome changes minimal and only when needed to preserve first-viewport or section quality.
7. Run build/checks after code changes.
8. Capture or request desktop and mobile visual verification.
9. Report changed files, commands, verification, and divergences.
10. Stop and wait for sign-off before moving to the next section.

## Design target

The homepage should become a guided scroll story, not a pile of cards.

Use this structure of thought:
- What money problem does this section make obvious?
- What owner relief does it create?
- What should the visitor understand before the next section?
- What is the cleanest visual system for that idea?

## Section constraints

Unless the user says otherwise:
- light mode only
- warm off-white canvas
- navy text
- Stanley green accent
- white cards only where useful
- plain English
- no AI-first language
- no fake dashboards
- no random KPI cards
- no generic feature grids
- no black/dark sections
- no orange/amber/loud purple
- no em dashes or en dashes in public copy

## Implementation rules

When editing a section:
- Prefer existing project components and styles.
- Do not add new dependencies unless necessary.
- Keep animation native and subtle.
- Respect `prefers-reduced-motion`.
- Keep mobile hit targets at least 44px where interactive.
- Keep desktop nav and mobile nav clean.
- Do not change production secrets, env files, PM2 config, API clients, or unrelated workflows.

## Verification checklist

After implementation, verify:
- `npm run build` passes, unless the task is planning/review only.
- Desktop viewport looks intentional.
- Mobile viewport looks intentional.
- No clipped text or buttons.
- No CTA appears in a section where the brief forbids it.
- Locked copy remains exact.
- Browser console has no relevant JavaScript errors if browser verification is available.

## Report format

Use this concise format:

- CHANGED: files and purpose.
- VERIFIED: commands and visual checks.
- DIVERGENCES: anything outside the requested component, with why.
- NOT TOUCHED: downstream sections or protected surfaces.
- NEXT: ask for sign-off if this is section-by-section work.
