# Homepage conversion block acceptance criteria

> **DEPRECATED TASK-SPECIFIC DESIGN SOURCE — HISTORICAL ONLY.** The absolute paths, copy, CTA order, and visual direction below were tied to an earlier homepage task. Use `/home/jaden/stanley-landing/DESIGN.md` for current visual style and a current approved brief for content.

Source inputs:
- Kanban task t_faa052ed
- Jaden prompt: /home/jaden/.hermes/cache/documents/doc_5e9952a578d4_Untitled document (79).txt
- CTA correction from task t_ed47d2ed
- Repo string search in /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page

Implementation scope:
- Write a spec only. Do not implement code in this task.
- The downstream implementation should update only the connected homepage conversion block around best fit, final CTA, and founder credibility.
- Do not touch pricing logic, analytics, Stripe, calculator logic, workflows, OpenClaw config, Hermes config, secrets, environment files, PM2 setup, or routes.

Required final order on the homepage:
1. Updated best fit and service businesses section.
2. Revised light CTA section with headline kept exactly as written below.
3. Founder credibility section below the CTA.

Current repo findings:
- app/page.tsx currently renders FounderSection before FinalCTASection and does not render a best fit section directly on the homepage.
- app/who-stanley-systems-helps/page.tsx contains the current best fit and service businesses copy, including the office-side handoff headline and the dark CTA card with See how Stanley works.
- components/final-cta-section.tsx contains the headline Almost nothing to do. Costs everything to not do. and has a valid tel:+16179586372 secondary phone route.
- components/founder-section.tsx contains Founder-led builds. Built for outcomes. and a dense founder biography.
- app/invoicing-delay-cash-flow-calculator/calculator-client.tsx also contains Almost nothing to do. Costs everything to not do., but that calculator CTA is outside this scoped homepage conversion block unless Jaden explicitly expands scope.

Likely files and components touched by downstream implementation:
- app/page.tsx: add or place the best fit section before FinalCTASection, then render FinalCTASection before FounderSection.
- app/who-stanley-systems-helps/page.tsx: update or reuse the same best fit content so the standalone Who we help route does not retain the old office-side handoff framing or See how Stanley works copy.
- components/final-cta-section.tsx: keep the existing CTA component but replace body, support, and trust copy with the corrected structure. Keep light mode.
- components/founder-section.tsx: replace biography block with a two-column credibility module and proof tiles.
- Optional new component: components/best-fit-section.tsx or components/service-business-fit-section.tsx if Codex chooses to share the section between app/page.tsx and app/who-stanley-systems-helps/page.tsx.

Global acceptance criteria:
- Public copy says Stanley Systems, never standalone Stanley.
- Public copy leads with money, time, cash movement, owner relief, billing speed, missed follow-up, or admin drag.
- Do not make technology the hero.
- Do not use headline-level office-side handoff language.
- Do not use the prohibited technology-first terms named in the kanban task body.
- Do not use em dashes or en dashes in public-facing copy.
- Avoid weak filler words named in the source prompt.
- Harvard wording, if used, must be Harvard computer science coursework or Harvard coding coursework. Do not say Harvard student or Harvard-trained.
- Do not introduce orange, black backgrounds, or dark CTA treatment in this area.
- Use off-white, white, pale green, Stanley green, and navy.
- Desktop and mobile must both read as one connected conversion block, not three unrelated sections.

Section 1: best fit and service businesses

Placement:
- On the homepage, this section must appear directly before FinalCTASection.
- On the Who we help page, this copy should replace the current route content or be reused from the shared component.

Headline:
For shops where the work gets done, but the cash still gets stuck.

Subhead:
Stanley Systems fits service businesses already using tools like QuickBooks, Housecall Pro, Jobber, ServiceTitan, Wallace, or Yardbook, but still losing time to late invoices, stale estimates, messy handoffs, and owner cleanup.

Industry cards:
1. Title: Plumbing and HVAC
   Copy: Fast jobs create fast billing problems when tech notes, photos, line items, or approvals are missing.
2. Title: Marine and field service
   Copy: Custom work gets messy when the office has to rebuild the job story before billing or customer updates can happen.
3. Title: Electrical, landscaping, and trades
   Copy: Completed work, open estimates, scheduling updates, and customer follow-up get spread across calls, texts, notes, and software.

Money pain strip:
- Add a compact strip between industry cards and fit cards unless visual balance works better directly below the fit cards.
- It must be easy to skim on mobile.

Money pain strip headline:
What this can cost before anyone notices

Money pain cards:
1. Title: 5 delayed jobs
   Copy: At $650 each, that is $3,250 in cash movement waiting on the office.
2. Title: 8 hours a week chasing details
   Copy: That becomes 30+ payroll hours a month spent on preventable admin work.
3. Title: 3 open estimates
   Copy: At $2,500 each, that is $7,500 in quoted work waiting for a next step.

Fit card heading:
Stanley Systems is a fit if...

Fit card bullets:
- Invoices go out later than they should after the work is already complete.
- Estimate follow-up depends on someone remembering to do it.
- The owner or office manager has become the backup system.
- Job details live across calls, texts, notes, whiteboards, and software.
- The team already has tools, but the workflow between those tools still breaks.

Not fit card heading:
Stanley Systems is not the fit if...

Not fit card bullets:
- The business wants custom enterprise software before fixing the obvious money leaks.
- There is no repeatable workflow, no real software stack, and no clear first bottleneck.
- The team wants a magic tool instead of a cleaner operating process.
- Admin time, billing delays, and missed follow-up are treated as free.

Best fit section rejects:
- Remove the current headline: Stanley Systems is built for service businesses that already do good work, but still lose time in the office-side handoff.
- Remove or replace: The goal is simple: fewer dropped balls, faster handoffs...
- Remove or replace: See how Stanley works.
- Remove any standalone public Stanley usage.
- Remove any dark CTA block in this area or consolidate it into the light CTA below.

Section 2: revised final CTA

Placement:
- Must appear after the best fit section and before the founder credibility section.
- Do not create two competing CTA cards back-to-back.
- If the Who we help page keeps a CTA inside its own page flow, it should not repeat the same section in a way that feels redundant.

CTA headline, exact:
Almost nothing to do. Costs everything to not do.

CTA body, exact:
The jobs are finished. The estimates are open. The customers are already saved in your system. The money leak starts when nobody follows up, sends the invoice, catches the missed call, or moves the next step forward.

Support line, exact:
Stanley Systems starts with the Workflow Audit. We find the leak costing you first, then build the simplest system to keep money moving.

Small trust line, exact:
If the leak is not real enough to fix, Stanley Systems will tell you before you buy a system.

Primary CTA:
Book the Workflow Audit

Primary CTA route:
- Preserve the existing /contact route unless implementation discovers a better current audit route already in the repo.

Secondary CTA:
- Existing final CTA secondary button has tel:+16179586372, so Call now is allowed.
- Preserve the working phone route.
- If the phone route is removed during implementation, use Get the Money Leak Map instead and route to /contact.

CTA design:
- Light mode only.
- Premium conviction statement, not a dark block.
- Use off-white, white, pale green, Stanley green, and navy.
- Buttons must be clear and not cramped on mobile.
- No orange.
- No black background.

CTA correction lock:
- Do not replace the CTA headline with The money is already there. The leak is what happens next.
- That line came from the original uploaded prompt and was superseded by Jaden correction in t_ed47d2ed.

Section 3: founder credibility

Placement:
- Must render below FinalCTASection on the homepage.
- app/page.tsx should order FinalCTASection before FounderSection.

Headline:
Founder-led diagnosis. Hands-on build.

Opening paragraph:
I’m Jaden, founder of Stanley Systems. I built Stanley Systems because service businesses do not need another dashboard, software pitch, or bloated agency process. They need the money leak found, fixed, and kept from coming back.

Second paragraph:
That is the point of the Workflow Audit. Find where cash, follow-up, and office time are slipping. Then build the practical system that closes the gap.

Optional personal line:
Stanley Systems carries my middle name and my grandfather’s name, so the work has to be practical, useful, and built to last.

Closing line:
You are not buying theory. You are getting a founder-led build tied to cash, follow-up, and office time.

Proof tile 1:
Title: Business judgment
Copy: First-place winner in a competitive business school consulting competition.

Proof tile 2:
Title: Hands-on coding
Copy: Earned money for coding work through hackathons and technical builds.

Proof tile 3:
Title: Technical training
Copy: Continuing the coding side through Harvard computer science coursework.

Founder design acceptance criteria:
- Desktop: clean two-column credibility card.
- Left side: headline, two short paragraphs, optional one-line personal note, closing line.
- Right side: three proof tiles.
- Mobile: stack headline, short founder copy, then proof tiles.
- Avoid a giant text block.
- Avoid small dense paragraphs.
- Avoid awkward empty space.
- Keep the card visually balanced.
- No horizontal overflow.
- Do not make the section sound like a resume dump or college application.

Verification checklist for downstream implementation:
- npm run build passes.
- app/page.tsx renders best fit, then FinalCTASection, then FounderSection.
- The new best fit headline appears on the homepage and, if updated, the Who we help route.
- office-side handoff is gone from headline-level public copy in the touched area.
- Industry cards use the revised trade-specific pain copy.
- Money pain strip appears and is readable on desktop and mobile.
- Fit and not-fit cards have clear headings.
- See how Stanley works no longer appears in the touched area.
- No standalone Stanley appears in the touched area except inside Stanley Systems.
- Final CTA headline remains exactly: Almost nothing to do. Costs everything to not do.
- Final CTA body, support line, trust line, and buttons match this spec.
- Founder section appears after the revised CTA.
- Founder-led builds. Built for outcomes. is replaced.
- Founder proof tiles appear.
- Harvard wording is careful and does not imply Jaden is a Harvard student.
- No orange, black background, or dark CTA block is introduced in this area.
- Mobile has no horizontal overflow.
- Cards are readable and visually balanced on desktop and mobile.

Out of scope for downstream implementation unless Jaden explicitly expands scope:
- Calculator page CTA copy in app/invoicing-delay-cash-flow-calculator/calculator-client.tsx.
- Site-wide metadata rewrites.
- Pricing section rebuilds.
- Visual-kit iterations paused by Jaden.
- Live deployment before design-loop verification gate passes.
