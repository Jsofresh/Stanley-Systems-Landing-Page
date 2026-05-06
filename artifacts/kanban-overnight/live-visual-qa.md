# Overnight live visual QA

Task: t_80c4b7ea
Generated: 2026-05-05
Scope: live `https://stanley-systems.com/` and `https://stanley-systems.com/pricing` only.
Constraint followed: no deploy, no PM2 restart.

## Verdict

FAIL for homepage due to one objective desktop visual bug.

Pricing passes on desktop and mobile. Homepage has no page-level horizontal overflow and no failed visual-kit image loads, but the desktop homepage clips the `Past customers` metric in the customer-list opportunity card.

## Live routes checked

- Homepage desktop: `https://stanley-systems.com/?qa=overnight-live-visual`
- Homepage mobile: `https://stanley-systems.com/?qa=overnight-live-visual-mobile`
- Pricing desktop: `https://stanley-systems.com/pricing?qa=overnight-live-visual`
- Pricing mobile: `https://stanley-systems.com/pricing?qa=overnight-live-visual-mobile`

## Automated checks

Runner artifact:
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/kanban-overnight/live-visual-qa-runner.js`

JSON artifact:
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/kanban-overnight/live-visual-qa.json`

Results:

- `home-desktop`: HTTP 200; document overflow 0px; 32 `/visual-kit/` images; 0 failed visible images; 0 failed visual-kit images.
- `home-mobile`: HTTP 200; document overflow 0px; 32 `/visual-kit/` images; 0 failed visible images; 0 failed visual-kit images.
- `pricing-desktop`: HTTP 200; document overflow 0px; 0 visual-kit images; 0 failed visible images.
- `pricing-mobile`: HTTP 200; document overflow 0px; 0 visual-kit images; 0 failed visible images.

## Screenshots

MEDIA-ready absolute paths:

- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/kanban-overnight/screenshots/home-desktop.png`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/kanban-overnight/screenshots/home-mobile.png`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/kanban-overnight/screenshots/pricing-desktop.png`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/kanban-overnight/screenshots/pricing-mobile.png`

## Visual QA observations

Homepage desktop:
- Mostly coherent and usable.
- No application error text.
- No failed visual-kit image wells found by DOM image checks.
- Objective bug: `Past customers` in the customer-list opportunity card is clipped/truncated visually on desktop.
- DOM evidence: the enclosing green stat panel has `overflow: hidden` with `clientWidth=1150` and `scrollWidth=1201`; the `Past customers` text element has `clientWidth=239` and `scrollWidth=331`, caused by `whitespace-nowrap` + large font sizing in `components/pricing-section.tsx:275`.

Homepage mobile:
- Page is usable and has no page-level horizontal overflow.
- No failed visual-kit image loads.
- Some small pale status/icon boxes read visually minimal, but automated image checks show no broken `/visual-kit/` images.
- The lower CTA panel has a large blank area. This may be intentional spacing/visual treatment rather than a broken image load; it is not counted as an objective image-load failure.

Pricing desktop:
- Pass. No blank icon wells, no horizontal overflow, no application error text, visually usable.

Pricing mobile:
- Pass. No blank icon wells, no horizontal overflow, no application error text, visually usable.

## Follow-up created

Created a narrow frontend fix task for the objective homepage desktop clipping bug.
