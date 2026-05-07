# Cashflow Control System visual contract

Project: Stanley Systems — Homepage Section 5 + Cashflow Control System Page + Repeat Revenue System Page
Task: Card 1.2 Cashflow Control visual contract
Source brief: `/home/jaden/.hermes/cache/documents/doc_83244fad04fc_message.txt`
Repo route discovery: `artifacts/stanley-section-5-system-pages/discovery/repo-route-primitive-audit.md`

## Contract status

This is the implementation contract for the Cashflow Control System page. It is written for Codex/build workers and visual judges.

Reference image access status:
- The source brief refers to attached screenshots for the Cashflow Control System page, but this worker did not receive direct attachment file paths.
- No source reference images with the named cashflow reference roles were found under the new `docs/visual-references/stanley-systems/` tree at authoring time.
- Existing repo screenshots under `artifacts/**/cashflow-control-*.png` are previous implementation/QA artifacts, not source reference targets, and must not be treated as the target design.
- Therefore this contract uses the written reference descriptions and crop targets from the source brief. Any screenshot text not explicitly listed below should be treated as approximate if later images surface.

## Route decision

Use the existing intended route discovered in the repo:

- Route: `/systems/cashflow-control`
- Source file: `app/systems/cashflow-control/page.tsx`
- Canonical metadata already points to `https://stanley-systems.com/systems/cashflow-control`

Do not create a duplicate `/cashflow-control-system` route unless Jaden explicitly asks. The brief default was overridden by repo discovery.

## Page purpose

The Cashflow Control page must make the cost of office drag feel concrete, then show a premium native system that moves completed work toward collected cash without manual chasing.

It should sell this outcome:

Finished work should not sit around waiting for the office to notice, gather details, send invoices, chase A/R, or find money leaks after they already hurt cash. Stanley Systems connects the steps around the business’s existing tools so the billing path keeps moving and exceptions go to the right person.

## Non-negotiable implementation rules

- Native React/Tailwind UI only.
- Text must remain DOM text.
- Do not embed the reference screenshots/images in production.
- Do not use screenshots as dashboard panels.
- Do not bake meaningful labels, metrics, or CTA text into images.
- Do not invent package names.
- Do not change pricing, Stripe/payment links, package data, secrets, infra, PM2, nginx, CI/workflows, or unrelated homepage sections.
- Reuse the component foundry once it exists. Page files may use layout classes, but may not invent new card shadows, button styles, medallion styles, underline styles, headline styles, or a new palette.
- If a visual pattern is missing, add it to the shared foundry first and document it there.

## Global visual language

The page must feel like a premium Stanley Systems public offer page, not a generic SaaS dashboard.

Required look:
- Light mode only.
- Soft off-white page background.
- Deep navy headlines and primary text.
- Stanley green highlights.
- Curved green underline under highlighted headline phrases.
- Pale green radial/corner shapes in the background, used subtly.
- Large left/right hero composition.
- White premium panels with thick rounded corners.
- Subtle borders; green-tinted borders where helpful.
- Soft layered shadows, never harsh black shadows.
- Pale-green medallion icons with white ring feel, inset highlight, and depth.
- Native dashboard cards and flow diagrams.
- Generous section padding and whitespace.
- Mobile layouts must stack cleanly and remain readable.

Avoid:
- dark mode
- orange, amber, yellow, gold, sepia, or warm alert dominance
- generic icon-library styling
- generic dashboard card walls
- cramped mobile cards
- screenshot embeds
- giant image wells
- people, robots, AI metaphors, or fake SaaS analytics filler

## Required page sections

The page has five major sections from the source references.

### 1. Cashflow hero

Required copy:

Badge:
Cashflow Control System

Main headline:
Turn finished work into collected cash faster.

Hero subtext:
Stanley Systems builds customer-fit systems around your current software so customer intake, completed jobs, billing details, accounting handoffs, invoices, and A/R follow-up keep moving without your office chasing every step manually.

Primary CTA:
Book a Workflow Audit

Secondary CTA:
See how Cashflow Control works

Hero flow:
Customer Intake → Job Complete → Billing Ready → Invoice Sent → Followed Up → Cash Collected

Hero panels:
- Workflow Status
- Invoice Performance
- Next Up
- Metric strip:
  - 40%+ Faster time to invoice
  - 25–35% Improvement in cash velocity
  - 2–5 hrs/week Less office drag
  - 100% Visibility across the flow

Layout notes:
- Use a large left/right hero composition.
- Left side: badge, headline, underline/highlight treatment, subtext, primary/secondary CTA cluster.
- Right side: premium native dashboard composition, not a screenshot.
- The dashboard should feel like a billing movement command center: status cards, flow row, metric strip, and next-action panel.
- The hero flow can sit inside or below the dashboard, but it must be visually prominent enough for the page concept to be understood immediately.
- Use medallion/icon treatments for key states; avoid flat pills as the main visual.

CTA paths:
- `Book a Workflow Audit` should use the current site audit convention, route `/#audit`, unless implementation discovery identifies a newer approved audit route.
- `See how Cashflow Control works` should anchor to the first explanatory section on this page, suggested `#cashflow-system-flow`.

Primitive mapping:
- Main page/hero icon: `dollar-circle` or `shield-check`.
- Customer Intake: `user` or `users`.
- Job Complete: `check-circle`.
- Billing Ready: `file-invoice`.
- Invoice Sent: `message-bubble` or invoice/send treatment built from foundry primitives.
- Followed Up: `phone-missed` or `message-bubble`.
- Cash Collected: `dollar-circle`.
- Faster/time metric: `trend-up`.

Hard visual fails:
- Headline lacks green highlight or underline.
- Dashboard panel is a generic gray SaaS block.
- Metrics are tiny or buried.
- CTA hierarchy is weak.
- Hero is mobile-unreadable.

### 2. Customer intake / billing path

Required headlines:
Clean customer intake keeps billing from breaking later.

When a job is marked complete, the billing path starts automatically.

Required native panels:
- Where customer intake happens
- Required Fields Validation
- Customer Intake Captured
- Job complete triggers the billing path
- Missing details routed before invoice
- On track for same-day billing

Layout notes:
- Build as an explanatory two-part system diagram.
- The first panel shows intake sources and required-field validation.
- The second panel shows job completion triggering the billing path.
- Show the connection from intake quality to invoice readiness with green arrows or a routed-path line.
- Missing details should be presented as an exception path, not as a red-heavy warning wall.
- Same-day billing should be a positive endpoint state.

Primitive mapping:
- Intake/source: `user` or `users`.
- Validation: `check-circle`.
- Captured record: `file-estimate`.
- Job complete: `check-circle`.
- Missing details: `message-bubble` plus alert styling from foundry.
- Same-day billing: `file-invoice` or `dollar-circle`.

Hard visual fails:
- Missing both required headlines.
- No visible before/after or source-to-billing path.
- Text appears only inside an image.
- Exception path overwhelms the section with red/orange.

### 3. Handoff / human exception

Required headlines:
The handoff from job software to accounting gets automated where your tools allow it.

If the system needs a human, it tells the right person exactly what to do.

Required native panels:
- Field / Job Software
- Accounting Software
- Clean Handoff Automated
- Completed job missing details
- Action Needed
- Assigned to
- Next steps

Layout notes:
- Build a left/right or three-step handoff diagram.
- Make the automated path feel clean and green: field/job software → clean handoff → accounting software.
- Show human exception as a clearly routed side panel: blocker detected, assigned owner, next steps.
- Red should be minimal and reserved for true blocker/attention elements.
- The section should reassure that automation is practical, not magic: automated where tools allow it, precise human instruction where needed.

Primitive mapping:
- Field / Job Software: `file-estimate` or `check-circle`.
- Accounting Software: `file-invoice`.
- Clean Handoff Automated: `shield-check` or `check-circle`.
- Missing details / Action Needed: foundry `AlertPanel` using `message-bubble` or `file-invoice`.
- Assigned to: `user`.
- Next steps: `trend-up` or `check-circle`.

Hard visual fails:
- Handoff is just text cards with no directional relationship.
- Human exception lacks assigned owner and next steps.
- Alert treatment uses orange/amber.
- Uses one-off page-only alert/card styles outside the foundry.

### 4. Money leaks / digest section

Required headlines:
Open invoices get followed up before they become owner problems.

Quoted work gets a next step before it goes cold.

The office fixes today’s issues. Leadership sees the pattern.

Required native panels:
- A/R Follow-Up Automation
- Aging Buckets
- Escalation Logic
- Open Estimate Recovery
- Office Exception Inbox
- Weekly Money Leak Digest
- Bottom CTA strip:
  - Cash is the goal. Systems are how you get there.

Layout notes:
- Build as a substantial three-part money-leak control section.
- Desktop target: three-column composition or two rows with clear hierarchy.
- First lane: A/R follow-up automation with aging buckets and escalation logic.
- Second lane: open estimate recovery for quoted work that needs a next step.
- Third lane: office exception inbox and weekly money leak digest.
- End with a strong bottom CTA strip using the exact line: “Cash is the goal. Systems are how you get there.”
- The weekly digest should look like leadership insight, not a generic analytics dashboard.

Primitive mapping:
- A/R Follow-Up Automation: `message-bubble` or `phone-missed`.
- Aging Buckets: `file-invoice`.
- Escalation Logic: `trend-up` or `shield-check`.
- Open Estimate Recovery: `file-estimate`.
- Office Exception Inbox: `message-bubble`.
- Weekly Money Leak Digest: `dollar-circle` or `trend-up`.
- CTA strip: `dollar-circle` plus `StanleyButton`/`SystemCTA`.

Hard visual fails:
- Section lacks three headline beats.
- Weekly Money Leak Digest is absent.
- Bottom CTA strip is weak or missing.
- Looks like a generic KPI dashboard.
- No visible money-leak workflow.

### 5. Details / billing source scan

Required headlines:
The invoice moves when the details are there.

Stanley Systems watches where bills actually get created.

Required native panels:
- Invoice-Ready Checklist
- Technician Notes
- Billing Source Scan
- Blocker Detected
- Routed to the right person

Layout notes:
- Build as a close-up operational scan/checklist section.
- The visual point: the system checks the details at the source before billing stalls.
- Show invoice-ready checklist and technician notes as native cards.
- Show billing source scan as a center or right panel that reads source fields and status.
- Blocker Detected should route to the right person; it should not just display a dead error.
- Keep this section narrower/tighter than the hero; it is a focused proof-of-system detail.

Primitive mapping:
- Invoice-Ready Checklist: `check-circle` or `file-invoice`.
- Technician Notes: `message-bubble`.
- Billing Source Scan: `file-invoice` plus `shield-check`.
- Blocker Detected: foundry `AlertPanel` with restrained red.
- Routed to the right person: `user` or `users`.

Hard visual fails:
- Checklist or source scan is absent.
- Blocker is not routed to a person.
- Section relies on a screenshot/image for text.
- Mobile card order obscures the scan-to-route story.

## Required component-foundry dependencies

Build workers should compose the page from the Stanley component foundry, expected to include:

- `IconMedallion`
- `StanleyIcon`
- `DisplayHeadline`
- `GreenUnderline`
- `PremiumCard`
- `StanleyButton`
- `FlowNode`
- `FlowSequence`
- `DiagramPanel`
- `StepCard`
- `FeatureTile`
- `SupportTile`
- `MetricStrip`
- `AlertPanel`
- `SystemCTA`
- `SystemPageSection`

If one of these does not exist when implementation begins, add or extend the shared foundry. Do not create page-only substitutes.

## Approved visual primitives

The repo discovery confirms these primitives exist under `components/visual-kit/primitives/` and can be used through the visual kit barrel:

- `check-circle` → `CheckCircle`
- `dollar-circle` → `DollarCircle`
- `file-estimate` → `FileEstimate`
- `file-invoice` → `FileInvoice`
- `message-bubble` → `MessageBubble`
- `phone-missed` → `PhoneMissed`
- `shield-check` → `ShieldCheck`
- `trend-up` → `TrendUp`
- `users` → `Users`
- `user` → `User`

Primitive styling should inherit or align with the visual-kit variables:
- Stanley green: `#08a64b` / site primary `#15803D`
- Deep green: `#087b3f` / `#116832`
- Navy: `#05244d` / site navy `#071422`, `#0B1F33`, `#102033`
- Pale green: `#eaf6e6`, `#eef9f2`, `#f4fbf5`

## Required route and anchor behavior

- Page route: `/systems/cashflow-control`
- Primary CTA target: `/#audit` unless later route audit changes approved convention.
- Secondary CTA target: suggested in-page anchor `#cashflow-system-flow` or equivalent first explanatory section.
- Header system link mismatch is known from discovery: header currently points to pricing anchors while footer/pricing source/canonicals use `/systems/*`. Fixing header links is a later scoped implementation decision, not part of this visual contract.

## Mobile rules

- Hero must stack with headline/CTA before dashboard, unless visual review proves dashboard-first works better.
- Flow sequences must become readable vertical or 2-column layouts; arrows may become vertical connectors.
- No horizontal overflow.
- No text under 14px for required content.
- Metric strip should wrap to two columns or stacked cards.
- Dashboard panels should not require pinch-zoom.
- Alerts should remain concise; long exception detail can stack below the main scan/handoff panel.

## Hard fails for the whole page

A visual judge should fail the implementation if any of these occur:

- Production embeds the source/reference screenshots.
- Important text is hidden in images.
- Any of the five major page sections are missing.
- Required headline or CTA copy is materially changed.
- Required route uses duplicate `/cashflow-control-system` instead of discovered `/systems/cashflow-control` without approval.
- Flow diagrams are missing or reduced to generic text cards.
- The page looks like generic dashboard cards instead of Stanley Systems premium offer UI.
- Green highlight/curved underline treatment is absent.
- Medallions are flat circles without ring/depth.
- Orange/amber/yellow/gold/sepia dominates or appears as a primary styling choice.
- Dark mode appears anywhere in this page design.
- Mobile is cramped, horizontally overflowing, or unreadable.
- Page-specific style hacks bypass the component foundry.
- Pricing, Stripe/payment, package names, secrets, infra, PM2, nginx, CI, or unrelated homepage sections are touched.

## Visual judge checklist

For verification, capture desktop and mobile screenshots of `/systems/cashflow-control` and judge against this contract.

Minimum pass thresholds from the source brief:
- Hero: 8.5/10 or higher.
- Other page sections: 8/10 or higher.
- Mobile usability: 8/10 or higher.

Judge should inspect:
- Exact DOM text presence.
- No source/reference image embeds in production.
- Route and CTA behavior.
- Component-foundry consistency.
- Cash movement story clarity.
- Flow arrows and labels readability.
- Premium Stanley visual language: navy, green, off-white, rounded cards, depth, medallions, no clutter.
