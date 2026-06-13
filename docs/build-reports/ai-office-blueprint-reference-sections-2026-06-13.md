# AI Office Blueprint reference section rebuild — 2026-06-13

## Scope

Rebuilt two `/ai-office-blueprint` sections from Jaden's reference images:

1. Top `Get the Free AI Office Blueprint` hero.
2. `Download the generic AI Office Blueprint` PDF section.

No production deploy, PM2 restart, or commit was performed.

## Changed files

- `app/ai-office-blueprint/page.tsx`
  - Replaced the dark hero with a light, image-backed reference layout.
  - Replaced the generic PDF card/grid module with a white image-backed banner using the supplied book visual.
- `components/ai-office-blueprint/blueprint-intake-form.tsx`
  - Changed initial input focus to `preventScroll: true` so the page no longer auto-scrolls past the hero on load.
- `public/images/uploaded/ai-office-blueprint/ai-office-blueprint-mockup.jpg`
  - Copied from `/home/jaden/.openclaw/workspace/media/ai-office-blueprint-mockup.jpg`.
- `public/images/uploaded/ai-office-blueprint/ai-office-blueprint.jpg`
  - Copied from `/home/jaden/.openclaw/workspace/media/ai-office-blueprint.jpg`.

## Commands run

- `codex exec -C /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page --sandbox workspace-write ...`
- `npm run build`
- `PORT=3217 npm run start -- -p 3217`
- `curl -I http://127.0.0.1:3217/ai-office-blueprint`
- Playwright screenshot captures for desktop and mobile.
- `ffmpeg` comparison sheets against the two reference images.

## Build result

`npm run build` passed.

## Verification artifacts

- Hero screenshot: `/tmp/ai-office-blueprint-hero-1280x720-v2.png`
- Generic section screenshot: `/tmp/ai-office-blueprint-generic-section-v2.png`
- Mobile hero screenshot: `/tmp/ai-office-blueprint-mobile-top-v2.png`
- Mobile generic screenshot: `/tmp/ai-office-blueprint-mobile-generic-v2.png`
- Hero comparison sheet: `/tmp/ai-office-hero-comparison-v4.png`
- Generic comparison sheet: `/tmp/ai-office-generic-comparison-v6.png`

## Visual verification result

- Hero desktop comparison: PASS from vision review after switching to a full image-backed hero canvas.
- Generic desktop comparison: improved after repair loop. Last strict comparison still flagged minor exact-match differences around text placement/wrapping and CTA/visual positioning, but the main book contrast issue was repaired by moving the image above the section background layer.
- Mobile hero sanity: PASS, no blockers.
- Mobile generic sanity: PASS, no blockers.

## Known remaining risk

The generic PDF section is close but not pixel-perfect to the reference. If Jaden wants exact-match tuning, the next pass should adjust only the generic section's x/y spacing and line wrapping while preserving the current high-contrast book asset.

## Protected surfaces not touched

- No deploy.
- No PM2 restart.
- No commit.
- No secrets/env/backend/API changes.
- No OpenClaw runtime mutation.
