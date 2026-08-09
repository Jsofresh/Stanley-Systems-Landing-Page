# T12 Design / Browser / Mobile QA

Task: t_c87ab668
Repo: /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page
Local server: http://127.0.0.1:3227
Date: 2026-05-11

## Scope

Routes checked:
- /
- /pricing
- /workflow-audit
- /invoicing-delay-cash-flow-calculator
- /how-stanley-systems-works
- /systems/cashflow-control
- /systems/repeat-revenue

Viewports:
- Desktop: 1440x950
- Laptop: 1280x720
- Mobile: 390x844
- Narrow mobile smoke: 320x700 for /, /pricing, /workflow-audit, /invoicing-delay-cash-flow-calculator

Safety:
- No deploy
- No PM2 restart
- No live form/checkout/webhook submission
- No secrets/env/runtime config mutation
- No OpenClaw cleanup/mutation

## Verification commands

- `git status --porcelain | head -50` returned only expected untracked `.worktrees/` before QA.
- `npm run build` passed; Next generated 57/57 pages.
- `PORT=3227 npm run start` served the production build locally.
- `node .qa/t12-visual-qa.mjs` captured browser QA screenshots/metrics.
- `node .qa/t12-320-smoke.mjs` captured 320px mobile smoke screenshots/metrics.

## Artifacts

Machine report:
- /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12-visual-qa-report.json
- /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12-320-smoke.json

Screenshots directory:
- /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12-screenshots

Key screenshots:
- Desktop homepage fold: /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12-screenshots/desktop-home-fold.png
- Desktop homepage full: /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12-screenshots/desktop-home-full.png
- Mobile homepage full: /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12-screenshots/mobile-home-full.png
- Mobile pricing full: /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12-screenshots/mobile-pricing-full.png
- Mobile assessment full: /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12-screenshots/mobile-assessment-full.png
- Mobile calculator fold: /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12-screenshots/mobile-calculator-fold.png
- 320px homepage full: /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12-screenshots/mobile320-home-full.png
- 320px pricing full: /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12-screenshots/mobile320-pricing-full.png
- 320px assessment full: /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12-screenshots/mobile320-workflow-audit-full.png
- 320px calculator fold: /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/.qa/t12-screenshots/mobile320-invoicing-delay-cash-flow-calculator-fold.png

## Browser/runtime results

Pass:
- All checked routes rendered locally without page errors.
- No non-favicon 4xx/5xx browser responses were observed.
- No horizontal body overflow at 390px or 320px.
- Homepage/pricing/assessment/system routes kept CTA(s) visible in first viewport.
- Calculator page CTA is visible in mobile and desktop fold.
- Build passed before browser QA.

Notes:
- Desktop calculator produced WebGL GPU-stall performance warnings in Chromium only; no page error and no bad response. Treated as non-blocking browser/GPU noise.
- Assessment route metrics flagged internal element scrollWidth > clientWidth at desktop/laptop, but body width did not overflow and screenshots did not show visible horizontal page overflow.
- Narrow 320px mobile smoke found small top tap targets: phone link height 18px, logo/hamburger 40px. Not deploy-blocking, but worth improving if mobile polish pass happens.

## Design QA verdict

Verdict: fail deploy-readiness on mobile conversion/visual QA, not on broken rendering.

The redesign is visually coherent and stronger than a generic small-business site. Desktop hero/calculator hierarchy is polished, CTA color is high-contrast, and the calculator result numbers are memorable. However, mobile pages are objectively too long and dense for pre-deploy conversion QA:

- 320px homepage height: 11,475px
- 320px pricing height: 13,699px
- 320px Cash Flow Assessment height: 13,969px
- 390px homepage height: 10,542px
- 390px pricing height: 12,386px
- 390px Cash Flow Assessment height: 13,390px

This creates severe mobile long-scroll fatigue before users can compare packages or return to a CTA. Pricing and assessment pages repeat full package details, before/after panels, pricing breakdowns, credits, and CTAs. The assessment-first message is also diluted because the Cash Flow Assessment page asks users to start with the $97 assessment, then immediately exposes many monthly/yearly system purchase options.

## Findings

### Blocking / fix before human deploy checkpoint

1. Mobile scroll length and card density are too high on homepage/pricing/assessment.
   - Evidence: full-page screenshot heights above; mobile screenshots show repeated stacked cards and repeated before/after modules.
   - Impact: mobile users must read through thousands of pixels of repeated card copy before comparing packages or returning to a primary action.
   - Fix direction: collapse or summarize repeated package sections on mobile; use a compact comparison/toggle/accordion; keep the assessment as the dominant next step.

2. Cash Flow Assessment page hierarchy is diluted by full system pricing.
   - Evidence: mobile assessment page starts with assessment-first copy, then introduces many monthly/yearly system cards with purchase CTAs.
   - Impact: users may think they need to choose a system immediately, conflicting with “Start with the Cash Flow Assessment.”
   - Fix direction: show the $97 assessment and outcome first; move detailed systems into a secondary collapsed comparison or separate “compare systems” section.

3. Mobile graphics/cards are too text-heavy in key places.
   - Evidence: assessment process visuals and pricing/package cards contain many small labels, dense paragraphs, before/after lists, fee rows, credits, and badges.
   - Impact: visual modules become mini essays, especially on mobile; some diagram labels are hard to read.
   - Fix direction: simplify mobile graphics to 3-4 high-signal steps with larger labels; hide dense details behind accordions.

4. No sticky/repeated mobile action once users enter long package/detail sections.
   - Evidence: primary CTAs are visible at top, but the long mobile pages have no sticky bottom CTA; scroll heights exceed 10k–14k px.
   - Impact: users who decide mid-scroll must keep searching for the next action.
   - Fix direction: add a lightweight mobile sticky CTA, probably “Start $97 Assessment,” after the hero/once scrolling begins.

### Non-blocking polish

1. CTA hierarchy is split between calculator-first and assessment-first.
   - Homepage hero primary CTA is calculator-first; header primary is assessment-first. The site can support both, but the sequence should be more deliberate.

2. Calculator page fold is clean, but intro looks like a result before interaction.
   - The number dominates correctly and CTA is visible. Consider labeling it as a preview or showing “Step 1” / first input cue sooner.

3. Desktop hero right-side visual is polished but slightly underweighted relative to the huge headline.
   - Not broken; just a balance/punch issue.

4. 320px mobile top tap targets are slightly small.
   - Phone link is 18px high; logo and menu are 40px high. Body CTAs are fine.

## Fix tasks created

- t_43320795: T12A Fix mobile conversion density before deploy checkpoint. Assignee: frontend. Linked as a parent of T15 deploy checkpoint.

## Final notes

No source code was intentionally changed. QA artifacts were written under `.qa/` only.
