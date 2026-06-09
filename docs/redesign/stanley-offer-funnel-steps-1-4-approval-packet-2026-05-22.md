# Stanley Systems Offer/Funnel Cleanup — Steps 1–4 Approval Packet

Date: 2026-05-22

Scope followed:
- No deploy.
- No PM2 restart.
- No OpenClaw runtime mutation.
- No clean/stash/reset/delete/overwrite of unrelated work.
- Repo clean-tree gate found only pre-existing untracked `.qa/` and `.worktrees/`; Jaden approved option `c` to ignore and proceed.

## 1. Source-of-truth document

Created:

`docs/redesign/stanley-offer-funnel-source-of-truth-2026-05-22.md`

This doc captures the final ladder and copy/funnel rules:

- Free Money Leak Calculator
- $97 Office Process Assessment
- $1,500 Systems Installation Sprint
- Monthly Control Plan only after the Systems Installation Sprint, priced $147–$297/month based on systems/automations built and monitored
- Office Process Assessment gives the full fix list for every money leak found
- $97 Office Process Assessment becomes a $194 credit toward the Sprint
- Systems Installation Sprint positioning: “Install the systems your business needs most.”
- Systems pages must convey that customers can choose individual automations from Cashflow Control or Repeat Revenue and that the systems work best together
- “How the Assessment Works” should become its own education page, while main CTAs stay conversion-focused
- Contact language: “Get the Office Process Assessment. Stanley Systems finds the leaks, gives you the fix list, and can build the systems your business needs next.”

## 2. Live/source reconciliation findings

### Homepage `/`

Live scan:
- No `Money Leak Recovery Sprint`
- No `Workflow Audit`
- No `Monthly Control`
- No `fix the first one`
- Contains `Office Process Assessment`

Source findings:
- `components/home/cash-flow-homepage.tsx` hero headline already matches:
  - `Find the money your service business is missing.`
- Hero subcopy does **not** match the approved new version. Source currently says:
  - `See where calls, invoices, follow-ups, and past customers are costing the business real cash.`
- Approved hero subcopy should be:
  - `Run the free calculator. See what calls, invoices, follow-ups, reviews, referrals, and past customers cost your business.`
- Calculator section headline already matches approved copy:
  - `Use the free calculator to see what your business is losing.`
- Leaks section is present and should remain untouched unless a factual/routing issue appears.
- Homepage Assessment section source currently says Stanley looks at where money is missed, likely cost, and which system should be built first. It should be updated to the approved subheading and avoid extra bullets.
- Homepage final CTA still says “which billing, follow-up, or repeat-customer system should be fixed first,” which should be aligned with the full fix-list/Sprint framing.

### Pricing `/pricing`

Live scan found active stale language that conflicts with the final ladder:
- `Money Leak Recovery Sprint` appears live.
- `Monthly Control` appears live.
- `fix the first one` appears live.
- `$97` appears live.
- `Systems Installation Sprint` does not appear live.

Live snippet examples:
- `Find the money leak. Fix the first one. Keep it under control.`
- `free calculator, $97 Office Process Assessment, $1,500 recovery sprint, then monthly control...`
- `Money Leak Recovery Sprint Start fixing the leak that costs the most...`

Source findings:
- `lib/pricing/source-of-truth.ts` still contains old direct package grid economics:
  - Cashflow Control Monthly: `$397/mo`
  - Repeat Revenue Monthly: `$697/mo`
  - Both Systems Monthly: `$897/mo`
  - yearly equivalents and install fees
- `lib/pricing/offers.ts` still treats post-assessment offers as direct-purchase system packages.
- `components/pricing/PricingHero.tsx` says:
  - `Get the Office Process Assessment if you want Stanley Systems to find the first leak before you choose a system...`
- `components/pricing/PricingCTA.tsx` still says:
  - `which money leak is worth fixing first`
- Pricing contains calculator/free-calculator framing and a money-leak checks form; this should be reduced so pricing focuses on buying/pricing.

Conclusion:
- Pricing needs the largest structural correction.
- Live has newer/staler copy that source scan does not fully show (`Money Leak Recovery Sprint` live but not in source scan). Before any deploy, implementation must patch source to the final ladder and verify live does not reintroduce the old sprint/recovery language.

### Office Process Assessment `/workflow-audit`

Live scan:
- `Money Leak Recovery Sprint` appears live.
- `$97` appears live.
- `Systems Installation Sprint` does not appear live.

Live snippet:
- `The $97 Office Process Assessment counts as $194 toward the Money Leak Recovery Sprint...`

Source findings:
- `app/workflow-audit/page.tsx` is the current Office Process Assessment page behind the internal `/workflow-audit` route.
- It contains useful assessment structure, but some copy conflicts with the new source of truth:
  - deliverable says `A short list of what to fix first`; should become full fix list for every money leak found.
  - pricing section says `which paid fix should come first`; should avoid making this sound like one fix only.
  - “Start here for $97” is fine as price-card context, but CTA labels should avoid `$97` button text.
  - current page mixes education with conversion. The separate detailed “How the Assessment Works” page should take over skeptical-buyer education.

### Cashflow Control `/systems/cashflow-control`

Live scan:
- `Money Leak Recovery Sprint` appears live.
- `Monthly Control` appears live.
- `$97` appears live.
- `Systems Installation Sprint` does not appear live.

Live snippet examples:
- `Start with the $97 Office Process Assessment... counts as $194 toward the Money Leak Recovery Sprint.`
- `Keep Cashflow Control running... Ongoing control Cashflow Control $197/mo Monthly control.`

Source findings:
- `app/systems/cashflow-control/page.tsx` has direct checkout buttons:
  - `Buy Cashflow Control`
- It has a direct `PackagePricingGrid` with Cashflow monthly/yearly cards.
- It frames the question as `Is this the right first fix?`
- It says `Buy the $97 Office Process Assessment and credit it toward the system`, but the new rule is $97 assessment → $194 Sprint credit.
- It does not heavily convey that customers can choose individual automations from either system and that the Sprint can cover fixes beyond Cashflow Control.

### Repeat Revenue `/systems/repeat-revenue`

Live scan:
- `Money Leak Recovery Sprint` appears live.
- `Monthly Control` appears live.
- `$97` appears live.
- `Systems Installation Sprint` does not appear live.

Live snippet examples:
- `$97 Office Process Assessment counts as $194 toward the Money Leak Recovery Sprint...`
- `Repeat Revenue $297/mo Monthly control.`

Source findings:
- `app/systems/repeat-revenue/page.tsx` has direct checkout buttons:
  - `Buy Repeat Revenue`
- It has a direct `PackagePricingGrid` with Repeat Revenue monthly/yearly cards.
- It frames the page as a direct system purchase instead of a system category/Sprint path.
- It does not heavily convey pick-and-choose individual automations or that systems work best together.

### Both Systems `/systems/both-systems`

Live scan:
- `Monthly Control` appears live.
- `Money Leak Recovery Sprint` did not appear live.
- `Systems Installation Sprint` does not appear live.

Source findings:
- `app/systems/both-systems/page.tsx` is still a direct-buy page with `Buy Both Monthly` and a `PackagePricingGrid`.
- Metadata says `Buy Cashflow Control and Repeat Revenue together...`
- Depending on Jaden’s direction, this page may become a supporting comparison/bridge page instead of a direct pricing package page.

### Contact `/contact`

Live scan:
- Does not show `Money Leak Recovery Sprint`, `Monthly Control`, or `fix the first one`.
- Contains `Office Process Assessment`.

Source findings:
- `components/contact-router.tsx` currently says:
  - `The Office Process Assessment is the paid diagnostic first step. Stanley Systems checks where money is being lost, which leak should be fixed first, and whether Cashflow Control, Repeat Revenue, both, or neither is the right next move.`
- This should be simplified to the approved contact language.
- It should not imply Monthly Control is a standalone next step.

### Navigation / “How the Assessment Works”

Source findings:
- `components/hero-section.tsx` nav group has:
  - label: `How the assessment works`
  - href: `/workflow-audit`
- This should route to a new dedicated detailed Office Process Assessment education page.
- Existing conversion CTAs can still point to the Office Process Assessment checkout/page path; do not route all conversion CTAs to the education page by mistake.

## 3. Exact page-order implementation plan

### A. Preserve and correct homepage first

Files likely touched:
- `components/home/cash-flow-homepage.tsx`

Changes:
1. Preserve hero headline exactly:
   - `Find the money your service business is missing.`
2. Replace hero subcopy with:
   - `Run the free calculator. See what calls, invoices, follow-ups, reviews, referrals, and past customers cost your business.`
3. Keep calculator section headline:
   - `Use the free calculator to see what your business is losing.`
4. Do not rework the leaks section.
5. Replace homepage Assessment subheading with approved line:
   - `Stanley Systems shows where money is being missed, what it likely costs, how to fix every problem found, and which fix should happen first.`
6. Do not add extra homepage bullets under the Assessment section.
7. Update final CTA language so it does not imply a single “first fix” or one limited system.

### B. Create dedicated “How the Assessment Works” education page

Likely route options:
- `app/how-the-assessment-works/page.tsx` — preferred because it matches nav language.
- Or repurpose `app/how-stanley-systems-works/page.tsx` only if Jaden prefers that existing route.

Recommended plan:
1. Create `app/how-the-assessment-works/page.tsx`.
2. Page purpose: skeptical-buyer education, not the main conversion destination.
3. Include sections:
   - what the Office Process Assessment checks
   - what the buyer receives
   - how the full fix list works
   - how the assessment connects to the Systems Installation Sprint
   - how specific/custom fixes can be identified without listing every niche problem publicly
   - what happens if the buyer moves into the Sprint
4. Keep CTAs clear:
   - primary: `Get the Office Process Assessment`
   - secondary: `Run the free calculator` or `Ask one question`
5. Do not use this page as the target for every CTA.

### C. Update nav routing

Files likely touched:
- `components/hero-section.tsx`
- possibly `components/glassmorphism-nav.tsx` if still mounted somewhere

Changes:
1. In the Assessment nav group, change `How the assessment works` from `/workflow-audit` to `/how-the-assessment-works`.
2. Keep `Office Process Assessment` nav/conversion item pointed to the conversion path.
3. Keep calculator nav item pointed to `/invoicing-delay-cash-flow-calculator`.

### D. Rework Office Process Assessment page

Files likely touched:
- `app/workflow-audit/page.tsx`
- possibly `components/workflow-audit/*` if those are still used on any route
- metadata in `app/layout.tsx` if stale global schema text appears

Changes:
1. Keep `/workflow-audit` internal route unless a safer public route migration is explicitly approved.
2. Public copy should say `Office Process Assessment`, not `Workflow Audit`.
3. Replace `short list` language with full fix-list language.
4. Remove/avoid over-explained DIY-vs-Stanley copy.
5. Replace all live/source `Money Leak Recovery Sprint` references with `Systems Installation Sprint`.
6. Make credit language consistent: $97 Assessment becomes $194 credit toward the Systems Installation Sprint.
7. Preserve price display in pricing/card context, but do not put `$97` in button text.

### E. Rework Cashflow Control and Repeat Revenue pages

Files likely touched:
- `app/systems/cashflow-control/page.tsx`
- `app/systems/repeat-revenue/page.tsx`
- possibly `components/cashflow-control/*`
- possibly `components/repeat-revenue/*`

Changes on both pages:
1. Replace direct buy hero CTAs with CTA structure like:
   - primary: `Get the Office Process Assessment`
   - secondary: `Talk through the right system` / `Ask one question` / possibly `See the Sprint`
2. Remove old monthly/yearly pricing cards from the page body.
3. Transform pricing-card areas into CTA/bridge sections.
4. Heavily convey:
   - customers can choose individual automations from Cashflow Control or Repeat Revenue
   - the systems work best together, especially Repeat Revenue
   - Stanley Systems can build the specific fixes the business needs
5. Add a clear Sprint bridge:
   - `Install the systems your business needs most.`
   - make clear the Sprint can cover fixes from Cashflow Control, Repeat Revenue, or specific custom needs found in the assessment.
6. Remove language that makes the page sound like the Sprint only fixes that system.
7. Remove public Monthly Control blocks from the pages or reframe them only as post-Sprint support if kept.

### F. Rework Pricing page

Files likely touched:
- `app/pricing/page.tsx`
- `components/pricing/PricingPage.tsx`
- `components/pricing/PricingHero.tsx`
- `components/pricing/PricingCTA.tsx`
- `components/pricing/CalculatorHandoffPanel.tsx`
- `lib/pricing/source-of-truth.ts`
- `lib/pricing/offers.ts`

Changes:
1. Pricing hero must stop saying `fix the first one` / `find the first leak before you choose a system` if it implies one fix.
2. Replace `Money Leak Recovery Sprint` with `Systems Installation Sprint`.
3. Add/normalize Sprint price: `$1,500`.
4. Replace old direct package grid as main pricing behavior.
5. Monthly Control should be one post-Sprint card/section:
   - `$147–$297/month`
   - only available after Systems Installation Sprint
   - based on systems/automations built and monitored
6. Reduce Free Money Leak Calculator prominence to a small mention, if any.
7. CTA labels for assessment should say `Get the Office Process Assessment`, not `Start $97 Assessment`.
8. Keep internal checkout/payment identifiers stable unless Jaden explicitly approves payment link/routing changes.

### G. Rework Contact section/page language

Files likely touched:
- `components/contact-router.tsx`
- possibly `components/contact-section.tsx` or `components/reach-out-section.tsx` if mounted publicly

Approved contact language:

> Get the Office Process Assessment. Stanley Systems finds the leaks, gives you the fix list, and can build the systems your business needs next.

Changes:
1. Replace noisy “which leak should be fixed first / whether Cashflow Control, Repeat Revenue, both, or neither” phrasing.
2. Do not mention Monthly Control as a direct next step.
3. Keep pre-buy question route if useful.

## 4. CTA destination map

### Homepage

- Hero primary: `/invoicing-delay-cash-flow-calculator`
  - Label: `Start the free calculator`
- Hero secondary: Office Process Assessment conversion path (`/workflow-audit` page or checkout depending existing intended flow)
  - Label: `Office Process Assessment` / `Get the Office Process Assessment`
- Calculator section primary: `/invoicing-delay-cash-flow-calculator`
  - Label: `Start the free calculator`
- Assessment section primary: Office Process Assessment conversion path
  - Label: `Get the Office Process Assessment`
- Systems cards: system detail pages only, not direct checkout
  - `/systems/cashflow-control`
  - `/systems/repeat-revenue`
- Final CTA primary: Office Process Assessment conversion path
  - Label: `Get the Office Process Assessment`

### Navigation

- `Office Process Assessment`: `/workflow-audit` or approved public assessment conversion route
- `How the Assessment Works`: `/how-the-assessment-works`
- `Office Work Cost Calculator`: `/invoicing-delay-cash-flow-calculator`
- `Cashflow Control System`: `/systems/cashflow-control`
- `Repeat Revenue System`: `/systems/repeat-revenue`
- `Pricing`: `/pricing`
- `Contact`: `/contact`

### Office Process Assessment page

- Primary CTA: Stripe/payment or assessment start path currently represented by `pricingPackageById.workflow_audit.stripePaymentLink.url`
  - Label: `Get the Office Process Assessment`
- Secondary education links: `/how-the-assessment-works`, `/contact?path=pre-buy`, `/invoicing-delay-cash-flow-calculator`
- System links: detail pages only, not default direct-buy package checkout unless Jaden approves that behavior.

### How the Assessment Works page

- Primary CTA: Start Office Process Assessment
- Secondary CTA: Run free calculator
- Optional CTA: Ask one question before buying

### Cashflow Control page

- Primary CTA: Start Office Process Assessment
- Secondary CTA: Ask one question / talk through the right system
- Internal links: Repeat Revenue page and Pricing page as supporting routes
- Remove direct `Buy Cashflow Control` as the main CTA unless Jaden re-approves direct purchase.

### Repeat Revenue page

- Primary CTA: Start Office Process Assessment
- Secondary CTA: Ask one question / talk through the right system
- Internal links: Cashflow Control page and Pricing page as supporting routes
- Remove direct `Buy Repeat Revenue` as the main CTA unless Jaden re-approves direct purchase.

### Pricing page

- Card/section 1: Office Process Assessment
  - CTA: `Get the Office Process Assessment`
- Card/section 2: Systems Installation Sprint
  - CTA: `Get the Office Process Assessment` or `Talk through the Sprint` depending final conversion flow
- Card/section 3: Monthly Control Plan
  - CTA should not be direct checkout; should state available after Sprint.

### Contact page

- Assessment path: Office Process Assessment start/checkout
- Pre-buy path: `/contact?path=pre-buy`
- Already bought path: `/audit-intake`

## 5. Stale-string scan results

### Live scan summary

Routes checked:
- `/`
- `/pricing`
- `/workflow-audit`
- `/systems/cashflow-control`
- `/systems/repeat-revenue`
- `/systems/both-systems`
- `/contact`
- `/invoicing-delay-cash-flow-calculator`

Live stale hits:
- `/pricing`: `Money Leak Recovery Sprint`, `Monthly Control`, `fix the first one`, `$97`
- `/workflow-audit`: `Money Leak Recovery Sprint`, `$97`
- `/systems/cashflow-control`: `Money Leak Recovery Sprint`, `Monthly Control`, `$97`
- `/systems/repeat-revenue`: `Money Leak Recovery Sprint`, `Monthly Control`, `$97`
- `/systems/both-systems`: `Monthly Control`

Live routes without these stale hits in the checked terms:
- `/`
- `/contact`
- `/invoicing-delay-cash-flow-calculator`

### Source scan summary

`Money Leak Recovery Sprint`:
- No source hit found in `app`, `components`, or `lib` scan, but it is live. This confirms source/live drift or generated/deployed code drift.

`Workflow Audit`:
- No public source hits found in the targeted scan, but internal route/ID names like `/workflow-audit` and `workflow_audit` remain. These should not be blindly renamed.

`Monthly Control`:
- No source hit found in the targeted scan, but it is live on pricing/system pages. This is source/live drift or deployed-code drift.

`Systems Installation Sprint`:
- No source hit found. This needs to be added as the approved Sprint name.

`How the assessment works`:
- `components/hero-section.tsx:95` points to `/workflow-audit`; should point to the new detailed education page.
- `components/pricing-section.tsx` and `components/calculator-path-section.tsx` contain older CTA labels; verify whether these components are mounted before editing.

`$97` in CTA/context:
- `components/mobile-sticky-cta.tsx` contains `ctaLabel="Start $97 Assessment"` and visible `Start $97`; should become `Start Assessment` / `Office Process Assessment` if still mounted.
- Multiple source files use `$97` correctly as price/credit context; do not remove every `$97` blindly.

`fix / first fix / first leak` family:
- Many hits are legitimate calculator/result-helper language, but public funnel pages should avoid “fix the first one” and phrasing that makes Sprint sound like one fix only.
- High-priority public hits to revisit:
  - `components/pricing/PricingHero.tsx:13`
  - `components/pricing/PricingCTA.tsx:14`
  - `components/pricing/CalculatorHandoffPanel.tsx:21`
  - `app/systems/cashflow-control/page.tsx:137,274`
  - `app/systems/repeat-revenue/page.tsx:251`
  - `components/hero-section.tsx:88`
  - `components/final-cta-section.tsx:38` if mounted publicly

Old direct pricing/package behavior:
- `app/systems/cashflow-control/page.tsx`: direct `Buy Cashflow Control` buttons and `PackagePricingGrid`
- `app/systems/repeat-revenue/page.tsx`: direct `Buy Repeat Revenue` buttons and `PackagePricingGrid`
- `app/systems/both-systems/page.tsx`: direct `Buy Both Monthly` and `PackagePricingGrid`
- `lib/pricing/source-of-truth.ts`: old direct monthly/yearly package prices and CTAs
- `lib/pricing/offers.ts`: direct-purchase package logic and FAQ allowing direct package buy

Forbidden DIY/over-explainer strings:
- Targeted scan did not find the exact rejected lines:
  - `Decide whether to build it yourself`
  - `If you want to build it yourself`
  - `Most owners see the list`
- Keep these forbidden for future implementation.

## 6. Blockers / risky decisions before steps 5–6 or Kanban

1. **Source/live drift is real.** Live contains `Money Leak Recovery Sprint` and `Monthly Control` copy that the current source scan did not find. The implementation worker must not assume source equals live; after build/local verification, live deploy will need careful content checks.

2. **Payment/checkout behavior — Jaden decision captured.** Jaden will create new Stripe payment links. Implementation should therefore avoid trying to preserve old public checkout behavior. Until new Stripe links are available, keep checkout/payment records dormant or placeholder-safe internally, remove old package checkout rendering publicly, and do not invent new payment URLs.

3. **Route naming — Jaden decision captured.** Create the new education route at `/how-the-assessment-works`. Leave `/workflow-audit` as the existing assessment conversion/internal route unless Jaden later approves a route migration.

4. **Both Systems page role — recommended decision.** Do not keep it as a direct-buy package pricing page. Keep `/systems/both-systems` as a supporting “work best together” bridge page for now because it solves a real buyer-confusion problem: Cashflow Control and Repeat Revenue can be chosen individually, but the best outcome often comes from using them together. The page should explain how the systems work in tandem, link to each system page, and drive users to the Office Process Assessment / Systems Installation Sprint. Remove package pricing cards and direct “Buy Both” checkout behavior. If later it feels redundant after implementation, de-emphasize it in nav rather than deleting the route.

5. **Monthly Control exact tiers are not specified.** Jaden approved range `$147–$297/mo`, but not exact breakpoints. Implementation should state range only unless Jaden provides tiers.

6. **The source-of-truth doc and approval packet are the only files intentionally created/updated in planning.** No page code has been implemented yet.
