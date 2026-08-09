# T12A mobile density verification

Scope: homepage `/`, pricing `/pricing`, Cash Flow Assessment `/workflow-audit`.
Server used for QA: local Next production start on `http://127.0.0.1:3228` after `npm run build`.
No deploy, PM2 restart, push, live forms, checkout submissions, secrets, runtime config, or OpenClaw cleanup were performed.

## Build

- Command: `npm run build`
- Result: passed. Next compiled successfully and generated 57/57 static pages.

## Mobile browser QA

Command: `node .qa/t12a-mobile-density-qa.mjs`
Report: `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12a-mobile-density-report.json`
Screenshots directory: `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12a-screenshots`

| viewport | route | old height | new height | horizontal overflow | non-favicon 4xx/5xx | page errors | sticky CTA after scroll |
|---|---:|---:|---:|---|---:|---:|---|
| 390 | home | 10,542 | 8,646 | no | 0 | 0 | yes |
| 390 | pricing | 12,386 | 5,128 | no | 0 | 0 | yes |
| 390 | assessment | 13,390 | 6,209 | no | 0 | 0 | yes |
| 320 | home | 11,475 | 9,507 | no | 0 | 0 | yes |
| 320 | pricing | 13,699 | 5,773 | no | 0 | 0 | yes |
| 320 | assessment | 13,969 | 6,471 | no | 0 | 0 | yes |

## Design/browser review notes

- Mobile pricing now leads with the $97 Cash Flow Assessment and collapses system pricing behind “System pricing after the assessment.”
- Mobile assessment now keeps the $97 assessment card dominant and collapses direct system options behind “Direct system options.”
- Package before/after details, fee rows, credit rows, and bullets are summarized on mobile and remain expanded on tablet/desktop.
- Text-heavy assessment process/access visuals are replaced or hidden on phone widths with compact step cards / assessment-first pricing.
- Homepage mobile package demos and repeated before/after proof are summarized to reduce scroll fatigue without removing the calculator/assessment spine.
- `MobileStickyCTA` is rendered on homepage, pricing, and assessment, with a “Start $97 Assessment” primary action visible after scrolling past the hero.

## Key screenshot paths

- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12a-screenshots/mobile390-home-full.png`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12a-screenshots/mobile390-pricing-full.png`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12a-screenshots/mobile390-assessment-full.png`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12a-screenshots/mobile320-home-full.png`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12a-screenshots/mobile320-pricing-full.png`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12a-screenshots/mobile320-assessment-full.png`
