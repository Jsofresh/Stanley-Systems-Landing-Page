# AI Office Staff Training Website Repositioning Implementation Plan

> **For Hermes:** Use `subagent-driven-development` or direct task execution with independent viewer/reviewer agents after each major page group. Do not deploy or restart PM2 unless Jaden explicitly approves deployment.

**Goal:** Rewrite the Stanley Systems website around the new paid-first-step conversion path: train office staff on AI + install practical workflows so the same team can handle paperwork, billing, and job admin without hiring another person.

**Architecture:** This is a public copy/content and route-consistency update, not a new product build. Keep the Next.js app structure intact, centralize offer wording where possible, update high-conversion pages first, then sweep shared components, legacy routes, public markdown/LLM surfaces, and calculator handoff copy. Use subagent “viewer” critiques as conversion QA, then fix their issues.

**Tech Stack:** Next.js App Router, React/TSX, Tailwind, existing CTA/analytics components, existing pricing source of truth, local `npm run build`, Playwright/browser screenshots for visual QA.

---

## Approved positioning source of truth

### External primary line

Use this exact idea as the top-level public positioning:

> Stanley Systems helps growing service and trade businesses train their office staff on AI and install practical workflows so the same team can handle more paperwork, billing, and job admin without hiring another person.

Allowed variants:

- “Train your office team to handle more paperwork, billing, and job admin without hiring another person.”
- “Help your current office team keep up before you hire another admin.”
- “Train staff on AI and install workflows around the real office work.”

### Internal/product line

Use internally for implementation and occasional explanatory copy, not as raw homepage jargon:

> Stanley Systems installs a company-specific AI office layer that captures how the business actually runs, trains staff to use AI in their real work, and helps the team turn job updates, paperwork, spreadsheets, billing details, and customer information into clean work faster.

### Company brain external translation

Internal concept:

> The Stanley layer is a shared company brain for office work: it stores how the business handles jobs, billing, follow-up, customer records, exceptions, templates, SOPs, and role-specific knowledge. Staff use AI against that shared context so they are not asking generic ChatGPT questions — they are working from the company’s actual playbook.

External language:

- “your company playbook”
- “how your business actually runs”
- “AI-guided office workflows based on your real process”
- “approved office rules, examples, templates, and escalation points”

Avoid public lead language like:

- “shared context”
- “company brain” as the first explanation
- “Hermes,” “Codex,” “OpenClaw,” “n8n,” “QBO internals,” “HCP internals,” or private tool names

### Offer ladder

Use these as the active public offer names:

1. **Admin Drag Calculator** — free lead magnet.
2. **AI Office Map** — **$197** paid first step / diagnostic.
3. **AI Office Installation Sprint** — **$3,500 starting** implementation.
4. **AI Office Ops** — **$500/month starting** ongoing support.

Primary commercial objective of this pass: convert viewers into buyers of the **$197 AI Office Map**.

---

## Important repo safety and scope rules

1. Before touching `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page`, run:

```bash
cd /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page
git status --porcelain | head -50
```

If non-empty, stop and report dirty files before editing.

2. Do **not** rename internal package IDs like `workflow_audit`, `cashflow_control_monthly`, or `repeat_revenue_monthly` unless doing a separate checkout/analytics dependency audit.

3. Do **not** run live deploy/restart commands unless explicitly approved:

```bash
pm2 restart stanley-landing --update-env
npm run design-loop:deploy
```

4. Do not change API routes, Stripe env names, QBO/HCP/Jobber/Twilio/n8n/demo integrations, secrets, or OAuth/webhook routes unless required for visible copy and separately approved.

5. The repo-local `AGENTS.md` still lists older public offers. This plan intentionally supersedes those old public offer names for this task because Jaden approved the newer AI Office Map / Installation Sprint / Ops positioning in-chat.

---

## Subagent critique findings to implement

Three read-only viewer/reviewer subagents inspected the repo. Consolidated findings:

- The site is partially updated but still feels like a transition from old “workflow audit / cashflow / repeat revenue” positioning.
- The paid first step is under-explained. Buyers need to know exactly what the $197 AI Office Map includes, what happens after buying, and how it connects to the Sprint.
- CTAs are inconsistent: calculator, workflow audit, pricing anchor, checkout, “assessment,” “Book,” “Get,” and “Start” compete.
- Credit language is inconsistent and must be standardized to `$197 credited toward the AI Office Installation Sprint` if that is the approved rule.
- Homepage hero is outcome-good but mechanism-light; it should lead with staff AI training + practical workflows + no new admin hire.
- Installation Sprint undersells training + workflows + company playbook.
- The public bridge for company brain should be “your company playbook.”
- Existing legacy routes should be reframed as workflow examples or subordinated to the AI Office Map path, not sold as separate primary systems.
- Public markdown files under `public/*.md` and `public/systems/*.md` can leak stale LLM/search-visible copy and must be swept.

---

## Route and file priority map

### Priority 1 — conversion path

- `components/home/cash-flow-homepage.tsx`
- `components/hero-section.tsx`
- `components/mobile-sticky-cta.tsx`
- `app/workflow-audit/page.tsx`
- `components/workflow-audit/*`
- `app/systems-installation-sprint/page.tsx`
- `components/pricing/PricingPage.tsx`
- `components/pricing/PricingHero.tsx`
- `components/pricing/PricingCTA.tsx`
- `components/pricing/CalculatorHandoffPanel.tsx`
- `lib/pricing/source-of-truth.ts`
- `lib/pricing/offers.ts`

### Priority 2 — support pages

- `app/how-stanley-systems-works/page.tsx`
- `app/how-the-assessment-works/page.tsx`
- `app/who-stanley-systems-helps/page.tsx`
- `app/contact/page.tsx`
- `components/contact-router.tsx`
- `components/contact-section.tsx`
- `components/footer.tsx`
- `components/glassmorphism-nav.tsx`
- `components/pricing-section.tsx`
- `components/calculator-path-section.tsx`

### Priority 3 — SEO/legacy route alignment

- `components/industry-page.tsx`
- `components/problem-page-template.tsx`
- `app/industries/*/page.tsx`
- `app/speed-up-invoicing-for-service-businesses/page.tsx`
- `app/office-handoff-problems-in-field-service-businesses/page.tsx`
- `app/work-order-to-invoice-process-for-service-businesses/page.tsx`
- `app/service-business-billing-process-fix/page.tsx`
- `app/missed-estimate-follow-up-for-service-businesses/page.tsx`
- `app/field-service-automation/page.tsx`
- `app/marine-service-automation/page.tsx`
- `app/systems/page.tsx`
- `app/systems/cashflow-control/page.tsx`
- `app/systems/repeat-revenue/page.tsx`
- `app/systems/both-systems/page.tsx`
- `app/blog/posts.ts`
- `public/*.md`
- `public/systems/*.md`

---

## Implementation tasks

### Task 1: Create a local copy constants note for the run

**Objective:** Make implementation consistent before editing.

**Files:**
- Create or update: `docs/plans/2026-06-11-ai-office-staff-training-site-repositioning.md` (this file)

**Steps:**
1. Confirm this plan contains the approved external line, internal line, company playbook explanation, and offer ladder.
2. Keep this plan open while editing.
3. Do not invent new offer names.

**Verification:**
- Plan contains the exact approved external line.
- Plan contains the exact internal layer language.
- Plan explicitly says no deployment unless approved.

---

### Task 2: Update homepage hero and first-fold conversion path

**Objective:** Make the homepage immediately say what Stanley Systems does and drive the paid first step.

**Files:**
- Modify: `components/home/cash-flow-homepage.tsx`
- Modify if needed: `components/hero-section.tsx`
- Modify if needed: `components/mobile-sticky-cta.tsx`

**Copy target:**

Hero H1 option:

> Train your office team to handle more paperwork, billing, and job admin without hiring another person.

Hero subhead:

> Stanley Systems helps growing service and trade businesses train their office staff on AI and install practical workflows so the same team can process more work with fewer dropped balls.

CTA order:

- Primary: `Book the $197 AI Office Map`
- Secondary: `Calculate Your Admin Drag`

Microcopy:

> The $197 is credited toward your Installation Sprint if you move forward.

**Steps:**
1. Replace homepage H1/subhead without making the first fold too tall on mobile.
2. Make the paid first step CTA primary when the page is in sales mode.
3. Keep calculator as secondary.
4. Add/retain a quick “same office team” outcome strip if it still fits.
5. Ensure nav/menu descriptions do not contradict the new line.

**Verification:**
- `grep -RIn "Book the \$197 AI Office Map\|Train your office team" components/home components/hero-section.tsx components/mobile-sticky-cta.tsx`
- Screenshot homepage at mobile and desktop after build/preview.

---

### Task 3: Rewrite the AI Office Map page as the paid first-step sales page

**Objective:** Make `/workflow-audit` sell the $197 AI Office Map clearly enough to buy.

**Files:**
- Modify: `app/workflow-audit/page.tsx`
- Modify: `components/workflow-audit/WorkflowAuditHero.tsx`
- Modify: `components/workflow-audit/HowAuditWorks.tsx`
- Modify: `components/workflow-audit/FitAccessPricing.tsx`
- Modify: `components/workflow-audit/WorkflowAuditFAQ.tsx`
- Modify any other imported `components/workflow-audit/*` modules if visible.

**Required content:**

Hero:

> Start with the $197 AI Office Map.

Supporting copy:

> In one focused session, Stanley Systems maps how your office handles paperwork, billing, follow-up, handoffs, and job admin. You leave with a one-page map showing where work is getting stuck, what your current tools already handle, and which AI-guided workflow should be installed first.

Deliverables:

- 45–60 minute owner or office-manager session
- Current office workflow map
- Existing software and handoff review
- Top 3 workflow opportunities
- Staff AI training / company playbook gaps
- One-page AI Office Map
- $197 credited toward your AI Office Installation Sprint

Add sections:

- “What happens after you pay”
- “What we need from you”
- “What you leave with”
- “Good fit / not fit”
- “This is not generic ChatGPT training”

**Steps:**
1. Identify all components imported by `/workflow-audit`.
2. Update visible copy to use `AI Office Map`, not `Workflow Audit` as public label.
3. Standardize CTA: `Book the $197 AI Office Map`.
4. Add clear checkout/next-step explanation.
5. Add objection handling: no software replacement, staff remain in control, no passwords needed for the Map, humans review sensitive work.

**Verification:**
- Source scan finds no public “Workflow Audit” label on this route unless intentionally hidden/internal.
- Screenshot `/workflow-audit` mobile/desktop.
- CTA links still resolve to intended pricing/checkout path.

---

### Task 4: Expand Installation Sprint page around training + company playbook + installed workflows

**Objective:** Make `/systems-installation-sprint` explain what happens after the Map and why the Sprint is worth buying.

**Files:**
- Modify: `app/systems-installation-sprint/page.tsx`
- Modify any imported Sprint components if present.

**Copy target:**

H1:

> Turn your AI Office Map into staff training, a company playbook, and 1–3 installed office workflows.

Subhead:

> Stanley Systems installs practical AI-guided workflows around your existing software so your current office team can handle more billing, follow-up, handoffs, and job admin without another admin hire.

Required sections:

1. **What gets installed**
   - your company playbook
   - staff AI training
   - billing readiness workflow
   - job update cleanup workflow
   - estimate/follow-up workflow
   - customer info cleanup workflow
   - owner exception/escalation rules

2. **What your staff learns**
   - how to use approved prompts/workflows
   - what AI can summarize, draft, check, or route
   - what must stay human-reviewed
   - when to escalate to owner/manager
   - how to turn messy job notes into clean office records

3. **What we do not do**
   - no software migration required
   - no replacing your office person
   - no generic chatbot dropped into the business
   - no unapproved automation touching money without review

4. **Start with the Map**
   - Sprint CTA should usually route to or mention booking the AI Office Map first.

**Verification:**
- Page visibly explains training + playbook + workflows above or near mid-page.
- No stale `Systems Installation Sprint` public label remains unless in legal/terms context and intentionally retained.

---

### Task 5: Make pricing a decision path, not a menu

**Objective:** Make `/pricing` sell the first paid step while preserving the full ladder.

**Files:**
- Modify: `components/pricing/PricingPage.tsx`
- Modify: `components/pricing/PricingHero.tsx`
- Modify: `components/pricing/PricingCTA.tsx`
- Modify: `components/pricing/CalculatorHandoffPanel.tsx`
- Modify carefully: `lib/pricing/source-of-truth.ts`
- Modify carefully: `lib/pricing/offers.ts`

**Pricing hero target:**

> Start with the $197 AI Office Map. Then install only the workflows worth building.

Subhead:

> Stanley Systems first maps where office work is slowing down billing, follow-up, records, and job admin. If there is a clear fit, the Installation Sprint turns that map into staff training, a company playbook, and 1–3 installed workflows.

Card positioning:

- Calculator: estimate the drag.
- AI Office Map: recommended first paid step.
- Installation Sprint: implementation after Map.
- AI Office Ops: support after install.

**Steps:**
1. Keep prices and payment links intact unless existing public copy is wrong.
2. Fix all public `$194` or doubled-credit inconsistencies to approved `$197 credited toward the AI Office Installation Sprint` if present.
3. Avoid internal “payment links are intentionally wired…” notes in public UI.
4. Do not rename package IDs.

**Verification:**
- `grep -RIn "\$194\|double the assessment\|Payment links are intentionally" app components lib public`
- Pricing page screenshot and CTA link check.

---

### Task 6: Rewrite mechanism explainer pages

**Objective:** Use support pages to explain the mechanism and lower buyer anxiety.

**Files:**
- Modify: `app/how-stanley-systems-works/page.tsx`
- Modify: `app/how-the-assessment-works/page.tsx`
- Modify: `app/who-stanley-systems-helps/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify if used/stale: `components/contact-router.tsx`

**How it works target steps:**

1. Calculate admin drag.
2. Book the $197 AI Office Map.
3. Map how your office actually runs.
4. Build your company playbook.
5. Train staff on where AI helps and where humans review.
6. Install 1–3 workflows.
7. Keep improving with AI Office Ops.

**Contact page target:**

H1 option:

> Not sure if you need another admin or a better office workflow?

Cards:

- Book the $197 AI Office Map
- Ask a fit question
- Already bought? Start intake

**Verification:**
- No public “Monthly Control” label remains.
- No `$194` credit remains.
- Contact/fit pages drive to AI Office Map as primary paid step.

---

### Task 7: Reframe legacy system/problem/industry pages

**Objective:** Keep SEO/useful routes but subordinate them to the AI Office Map → Sprint path.

**Files:**
- Modify: `components/industry-page.tsx`
- Modify: `components/problem-page-template.tsx`
- Modify selected route files under `app/industries/*`
- Modify selected problem pages.
- Modify legacy system pages:
  - `app/systems/page.tsx`
  - `app/systems/cashflow-control/page.tsx`
  - `app/systems/repeat-revenue/page.tsx`
  - `app/systems/both-systems/page.tsx`

**Rule:** Do not delete or redirect legacy routes in this pass unless Jaden explicitly approves. Reframe them.

Public framing for old system pages:

> This is one type of workflow Stanley Systems may uncover and install after the AI Office Map.

Problem page CTA framing:

> Start with the $197 AI Office Map to see whether this is the first workflow worth fixing.

**Verification:**
- Old routes still load.
- Old routes no longer compete as separate active offers.
- CTAs route back to AI Office Map / Calculator / Installation path.

---

### Task 8: Sweep public markdown / LLM-readable surfaces

**Objective:** Prevent stale machine-readable/public docs from contradicting the website.

**Files:**
- Modify: `public/contact.md`
- Modify: `public/who-stanley-systems-helps.md`
- Modify: `public/workflow-audit.md`
- Modify: `public/faq.md`
- Modify: `public/services.md`
- Modify: `public/pricing.md`
- Modify: `public/systems-installation-sprint.md`
- Modify: `public/systems.md`
- Modify: `public/systems/repeat-revenue.md`
- Modify: `public/systems/cashflow-control.md`

**Steps:**
1. Mirror the new external line.
2. Use `AI Office Map`, `AI Office Installation Sprint`, and `AI Office Ops` consistently.
3. Explain `your company playbook` in plain language.
4. Remove stale old package names where they are not historical context.

**Verification:**
- Run stale-term scan over `public/`.

---

### Task 9: Stale-term and required-term scan

**Objective:** Catch contradictions before visual QA.

**Command:**

```bash
cd /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page
python3 - <<'PY'
from pathlib import Path
import re

root = Path('.')
include = ['app', 'components', 'lib', 'public']
stale_terms = [
  'Workflow Audit',
  'Cash Flow Collection System',
  'Repeat Revenue System',
  'Customer Revenue System',
  'Systems Installation Sprint',
  'Monthly Control',
  '$194',
  'double the assessment',
  'Money Leak',
  'revenue leak',
  'billing leak',
]
required_terms = [
  'AI Office Map',
  'AI Office Installation Sprint',
  'office staff',
  'paperwork',
  'billing',
  'job admin',
  'company playbook',
]
files = []
for top in include:
    for p in (root / top).rglob('*'):
        if p.is_file() and p.suffix in {'.ts', '.tsx', '.md', '.json'}:
            files.append(p)

print('STALE TERM HITS')
for term in stale_terms:
    pat = re.compile(re.escape(term), re.I)
    hits = []
    for p in files:
        text = p.read_text(errors='ignore')
        count = len(pat.findall(text))
        if count:
            hits.append((p, count))
    if hits:
        print(f'\n{term}: {sum(c for _, c in hits)} hits in {len(hits)} files')
        for p, count in hits[:40]:
            print(f'  {count:2} {p}')

print('\nREQUIRED TERM HITS')
for term in required_terms:
    pat = re.compile(re.escape(term), re.I)
    total = 0
    paths = []
    for p in files:
        text = p.read_text(errors='ignore')
        count = len(pat.findall(text))
        if count:
            total += count
            paths.append(str(p))
    print(f'{term}: {total} hits in {len(paths)} files')
PY
```

**Pass condition:**
- Stale terms have either zero hits in public surfaces or documented intentional hits.
- Required terms appear on the main conversion path.

---

### Task 10: Build verification

**Objective:** Prove the edited app builds before visual QA.

**Command:**

```bash
cd /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page
npm run build
```

**Expected:** build completes successfully.

If lint exists and is reliable:

```bash
npm run lint
```

If lint is deprecated/broken for this repo, record the exact failure and do not treat it as a copy regression unless new errors are clearly introduced.

---

### Task 11: Local route smoke and screenshots

**Objective:** Verify pages render and the new copy fits visually.

**Start local server:**

```bash
cd /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page
npm run dev
```

Run as a tracked background process in Hermes, not shell `&`.

**Routes to smoke:**

- `/`
- `/workflow-audit`
- `/systems-installation-sprint`
- `/pricing`
- `/how-stanley-systems-works`
- `/how-the-assessment-works`
- `/who-stanley-systems-helps`
- `/contact`
- `/industries/hvac`
- `/speed-up-invoicing-for-service-businesses`
- `/systems/cashflow-control`
- `/systems/repeat-revenue`
- `/blog`

**Viewports:**

- mobile: 390×844
- tablet: 768×1024
- desktop: 1440×1000

**Screenshot proof:**
- Individual screenshots for each changed public-facing page/section.
- Do not rely on one full-page screenshot as proof.

**Check:**
- Above-fold headline reflects new positioning.
- Primary CTA is clear and not duplicated/conflicting.
- New copy does not overflow cards/buttons.
- Mobile sticky CTA is readable.
- No old offer names appear in visible page text.
- Images/background overlays still keep text readable.

---

### Task 12: Subagent viewer loop after implementation

**Objective:** Use fresh eyes to find conversion, copy, and visual issues after the first pass.

Spawn three read-only subagents:

1. **Skeptical owner viewer**
   - Routes: `/`, `/workflow-audit`, `/pricing`, `/systems-installation-sprint`
   - Ask: “Would a service/trade owner understand what Stanley Systems does, why the $197 Map is the next step, and why this helps avoid another admin hire?”

2. **Stale-language reviewer**
   - Inputs: git diff + stale-term scan output.
   - Ask: “Find old offer names, inconsistent credit language, internal jargon, and contradictions.”

3. **Mobile visual QA viewer**
   - Inputs: screenshot paths.
   - Ask: “Find visual issues, CTA clutter, readability problems, and confusing first-fold hierarchy.”

Fix their critiques, then rerun scans/build/screenshots for affected pages.

---

### Task 13: Independent code/copy review before commit

**Objective:** Verify no accidental technical regression, secret exposure, or bad public copy.

**Steps:**
1. Run `git diff -- app components lib public docs/plans`.
2. Run static secret scan over added lines.
3. Use an independent reviewer subagent with the diff and this plan.
4. Fix blocking issues.
5. Commit if Jaden approves or if the session scope includes committing implementation work.

**Review focus:**
- No secrets/internal tools exposed.
- No checkout/payment behavior broken.
- No API route mutation unless intended.
- Copy matches approved offer ladder.
- Primary paid-first-step path is clear.

---

## Final response requirements after implementation

Report:

- Files changed.
- Exact offer/positioning changes made.
- Build result.
- Stale-term scan result.
- Local route smoke result.
- Screenshot paths for changed key pages.
- Subagent viewer critiques and what was fixed.
- Whether anything was not changed and why.
- Deployment status: should be “not deployed” unless Jaden explicitly approves live deployment.

---

## Non-goals for this plan

- No live deploy.
- No PM2 restart.
- No Stripe/payment link renames.
- No API/integration mutation.
- No secret/env changes.
- No deleting legacy routes without explicit approval.
- No broad visual redesign unless needed to make the copy fit.
