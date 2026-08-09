# Final viewable pre-deploy approval packet

Prepared: 2026-05-04 19:22 UTC.
Task: t_d67fecd1.
Scope: approval packet only. No deploy. No PM2 restart.

## Primary files

- Telegram-ready packet: `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/final-predeploy-approval-packet-20260504/TELEGRAM_APPROVAL_PACKET.md`
- Final QA source report: `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/final-production-polish-qa-20260504/report.md`

## Approval question

Jaden, approve deploying the current local Stanley Systems website changes to production with `npm run build`, `pm2 restart stanley-landing --update-env`, and live verification on `/`, `/pricing`, calculator handoff pricing URL, and `/contact`? Approval includes shipping `/pricing` without public dollar amounts yet and accepting the current homepage visual direction shown in the screenshots.

## Homepage

Status: pass in final local QA.

Screenshot paths:
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/final-production-polish-qa-20260504/home-desktop.png`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/final-production-polish-qa-20260504/home-mobile.png`

Notes:
- Hero leads with `Make your business more money with less office work.`
- Page flow focuses on Workflow Audit, cash collection, follow-up, best-fit service businesses, founder credibility, and repeated contact CTAs.
- Custom Stanley Systems visual-kit display assets are preserved and visible on homepage sections.

## /pricing

Status: pass in final local QA.

Screenshot paths:
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/final-production-polish-qa-20260504/pricing-desktop.png`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/final-production-polish-qa-20260504/pricing-mobile.png`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/final-production-polish-qa-20260504/pricing-calculator-handoff-desktop.png`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/final-production-polish-qa-20260504/pricing-calculator-handoff-mobile.png`

Commercial terms shown:
- Workflow Audit is the paid first step.
- Build work is recommended only after the leak is clear.
- Cash Flow Collection System and Repeat Revenue System are post-audit paths, not checkout packages.
- No public package prices.
- No Stripe or checkout path.
- CTAs go to `/contact`.
- Audit credit copy is present.
- Guarantee refunds the Workflow Audit fee if Stanley Systems cannot find one clear money leak it can fix, with qualification language nearby.

## Key naming and commercial checks

Final QA passed on checked public routes:
- No `Cash Flow Collection System` rendered.
- No `Repeat Revenue System` rendered.
- No free or no-cost system guarantee rendered.
- No Stripe or checkout language rendered.
- No old test prices `$147`, `$297`, `$497`, or `$997` rendered.
- No internal tools or agent names rendered.
- Calculator handoff pricing URL rendered correctly.

Current visible public offer names:
- Workflow Audit.
- Cash Flow Collection System.
- Repeat Revenue System.

## Visual-kit requirement

Status: pass.

Evidence:
- Homepage/pricing mounted source includes visual-kit usage across `components/calculator-path-section.tsx`, `components/how-it-works-section.tsx`, `components/pricing-section.tsx`, `components/proof-strip-section.tsx`, `components/visual-kit/display-assets/display-assets.tsx`, and `components/visual-kit/mini-features/*`.
- Browser QA detected 23 unique `/visual-kit/` image assets across checked routes.
- 23 direct visual-kit asset checks returned HTTP 200.
- DOM image checks showed non-zero natural dimensions.
- Pricing itself mostly uses cards and small UI affordances. Homepage carries the heavier custom visual-kit display assets.

## QA and build status

Final local QA passed:
- `npm run build`: passed.
- Local production preview: `http://127.0.0.1:3137`.
- Checked routes: `/`, `/pricing`, `/pricing?source=calculator&recommended=both&annual_leak=120k-to-300k&monthly_leak=10k-to-25k`, `/contact`.
- Checked viewports: `390x1200` and `1440x1200`.
- HTTP 200 on all 8 route/viewport checks.
- No page errors.
- No blocking console errors.
- No horizontal overflow.
- Static QA scanned 196 mounted/public source files. Hits: 0.
- `git diff --check`: passed.
- Protected-surface status matches: 0.

QA artifact paths:
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/final-production-polish-qa-20260504/build.log`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/final-production-polish-qa-20260504/browser-qa-summary.txt`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/final-production-polish-qa-20260504/static-qa-summary.txt`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/final-production-polish-qa-20260504/browser-qa-results.json`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/final-production-polish-qa-20260504/static-qa-results.json`

## Remaining risks

- Not live yet. No deploy and no PM2 restart were performed.
- Workspace is broadly dirty from the current website/design loop. A deploy would ship the current combined local source state unless the deploy worker narrows scope first.
- `/pricing` shows no public dollar amount yet. This is the main commercial approval item.
- The homepage lower CTA area can look like a large pale blank panel in full-page screenshots. QA found no missing asset or broken image.
- Type validation is skipped by project config during build. This appears to be baseline behavior.
- Local Chromium WebGL GPU-stall warnings appeared during screenshot capture. Non-blocking local browser noise.
