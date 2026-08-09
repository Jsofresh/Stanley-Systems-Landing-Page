# Stanley Website Review Context

Generated for Full-Context Smart Vision Reviewer. This file is compiled from canonical Stanley Systems context files and is intentionally not a tiny summary.
Generated at: 2026-04-30T22:14:18.233Z


---

## Source file: /home/jaden/.openclaw/workspace/project/stanley-context/00_START_HERE.md

# 00 Start Here

This is the Stanley Systems context set for Stanley, the OpenClaw Telegram bot.

Use this folder to keep Stanley useful without burning tokens. Read only the files needed for the task. Do not load the whole folder by default.

## Core rules

- Keep one source of truth per topic.
- Separate stable context from changing state.
- Keep client-specific context out of core files.
- Do not recreate a generic ACTIVE_STATE file.
- Do not duplicate the same idea across multiple files.
- If a fact affects live infrastructure, verify it live before acting.

## Read order by task

### Default
- `00_START_HERE.txt`
- `01_CORE_FOUNDATION.txt`

### Business, copy, positioning, outreach, site messaging
- `00_START_HERE.txt`
- `01_CORE_FOUNDATION.txt`
- `02_WRITING_AND_LANGUAGE_RULES.txt`
- `03_BUSINESS_AND_GTM_STATE.txt`

### Coding, VPS, deployment, OpenClaw, PM2, n8n, automation
- `00_START_HERE.txt`
- `01_CORE_FOUNDATION.txt`
- `04_BUILD_INFRA_AND_AGENT_STATE.txt`
- `05_DEMO_AND_AUTOMATION_STATE.txt`

### Demo planning, demo page, or product video
- `00_START_HERE.txt`
- `01_CORE_FOUNDATION.txt`
- `02_WRITING_AND_LANGUAGE_RULES.txt`
- `03_BUSINESS_AND_GTM_STATE.txt`
- `05_DEMO_AND_AUTOMATION_STATE.txt`
- `08_MOTION_GRAPHICS_AND_VIDEO_RENDERING_STANDARD.txt` if video or Remotion work is involved
- `09_FOLLOW_UP_SYSTEM_BUNDLE.txt` if the Repeat Revenue System is involved

### Coastline, Wallace, or MarineFlow
- `00_START_HERE.txt`
- `01_CORE_FOUNDATION.txt`
- `06_COASTLINE_MINI_CONTEXT.txt`
- Add `04` or `05` only if the work touches infra, demo workflow state, or automation build work.

## Source-of-truth map

- Identity, positioning, client fit, Jaden working style: `01_CORE_FOUNDATION.txt`
- Voice, wording, scripts, blog rules: `02_WRITING_AND_LANGUAGE_RULES.txt`
- Current business strategy and GTM state: `03_BUSINESS_AND_GTM_STATE.txt`
- Stable infra, OpenClaw, VPS, deploy, and technical operating rules: `04_BUILD_INFRA_AND_AGENT_STATE.txt`
- Current demo build status, live workflows, queued work, and technical gotchas: `05_DEMO_AND_AUTOMATION_STATE.txt`
- Coastline-specific facts: `06_COASTLINE_MINI_CONTEXT.txt`
- Motion graphics and video rendering rules: `08_MOTION_GRAPHICS_AND_VIDEO_RENDERING_STANDARD.txt`
- Repeat Revenue System bundle spec: `09_FOLLOW_UP_SYSTEM_BUNDLE.txt`
- Folder hygiene and conflict rules: `99_MAINTENANCE_AND_SOURCE_RULES.txt`

## Operating memory pointer

For operating memory, loops, reports, and queryable company memory, use:
`/home/jaden/.openclaw/workspace/project/stanley-os/`

For future spec-first build work, use:
`/home/jaden/.openclaw/workspace/project/software-factory/`

## Update rules

- If strategy changes, update `03`, not `01`.
- If shipped workflows or demo status change, update `05`.
- If stable VPS or deployment facts change, update `04`.
- If a note only matters for one client, keep it out of core and put it in the client file.
- Archive old notes instead of stacking duplicates into active files.


---

## Source file: /home/jaden/.openclaw/workspace/project/stanley-context/01_CORE_FOUNDATION.md

# 01 Core Foundation

Last revised: 2026-04-25

## What Stanley Systems is

Stanley Systems fixes the office-side gaps that slow billing, break follow-up, and force the owner to become the backup system.

## North star

Service businesses should not have to scale overhead at the same rate they scale revenue. Stanley Systems helps them absorb more office-side load inside the tools they already use so billing, follow-up, and admin work stop breaking as the business grows.

## What Stanley Systems fixes

- Broken handoffs between field work, office admin, and billing
- Slow invoicing and slow cash collection
- Missed estimate and post-job follow-up
- Duplicate entry, rework, and owner rescue work
- Office-side drag inside the shop's current stack

## What Stanley Systems is not

- Not a marketing agency
- Not a website builder
- Not an AI consultancy
- Not a software vendor
- Do not push software migrations unless Jaden explicitly asks

## Best-fit client

Stanley Systems is built for service businesses that already have a real stack and a real office function.

Best fit usually means all of this is true:
- QuickBooks Online is already in the stack
- A field, shop, or service system is already in the stack
- There is at least one real office or admin person whose time can be saved
- The owner feels office drag, billing drag, or follow-up drag

Typical lanes:
- trade contractors
- marine service shops
- other field service businesses with real admin load

## Bad fit

- Tiny owner-operators who treat their own admin time as free
- Shops running mostly by hand with no real software stack
- Prospects who do not value office time, admin time, or follow-up time
- Businesses looking for a marketing agency or full software migration

## Owner-facing translation

Owners do not say "data bottleneck." They say things like:
- We did the work and still have not billed it
- My office person keeps retyping the same thing
- Estimates sit there and nobody follows up
- The office cannot keep up
- I am still the one everyone has to ask

## Outcome hierarchy

1. Get paid faster
2. Stop losing good leads
3. Free the owner from being the backup system
4. Reduce office errors and rework

## Positioning rules

- Lead with money, time, or owner relief
- Keep Stanley Systems practical, trustworthy, and trades-friendly
- Treat "bottleneck" as internal language, not public headline language
- Keep the business grounded in real workflow fixes inside the client's current stack
- Do not market Stanley Systems as AI-first

## Business naming rule

- Use `Stanley Systems` as the full business name in public-facing work unless Jaden explicitly asks for a shorter label
- Internal notes can use `Stanley` as shorthand

## Jaden working style

- Fast and direct
- Low tolerance for progress theater
- Wants real pushback, not validation
- Prefers action when the task is clear and low-risk
- For business judgment, give a recommendation instead of a menu unless tradeoffs truly matter
- If blocked, ask one precise question, not three vague ones

## Global operating defaults

- Use evidence for technical, system, or debugging claims
- Keep proof compact
- Prefer additive and non-destructive changes
- Important working state should live in project files, not only in chat


---

## Source file: /home/jaden/.openclaw/workspace/project/stanley-context/02_WRITING_AND_LANGUAGE_RULES.md

# 02 Writing and Language Rules

## Prime directive

Lead with money, results, time saved, billing speed, owner relief, and admin drag.

Be clear, not clever. If a line sounds impressive but the owner would not instantly understand what changes in the business, rewrite it.

## Voice

- Use plain English.
- Write for speech, not for reading.
- Use strong nouns and verbs.
- Make every line easy to say out loud and easy to subtitle.
- Sound practical, calm, and sharp.
- Trades-friendly beats polished-consultant.
- Specific beats clever.
- Result-first beats tool-first.

## Copy rules

- Lead with the financial or time consequence, not the process fix.
- "Invoices go out same-day" beats "cleaner office handoffs."
- "Cash comes in faster" beats "reduced admin friction."
- "The owner stops chasing office cleanup" beats "workflow optimization."
- Always connect the fix to money, time, owner relief, billing speed, lead recovery, or fewer dropped balls.
- Do not make the tech stack the star.
- Default soft CTA is a low-pressure mention plus `/contact`.

## Words and frames to avoid

Avoid these in public-facing Stanley Systems copy when possible:
- AI
- AI-powered
- automation as the hero
- optimize
- streamline
- transform
- empower
- innovative
- cutting-edge
- efficiency
- synergy
- ecosystem
- leverage
- scalable solution
- digital transformation

Also avoid weak filler:
- basically
- usually
- sometimes
- may
- might
- could
- probably
- kind of
- sort of
- generally

## Preferred verbs

Prefer:
- fix
- clean up
- speed up
- stop losing
- get paid faster
- catch
- route
- follow up
- send out
- free up
- recover
- bring back
- turn into
- collect

## Format rules

- No em dashes or en dashes in public-facing Stanley Systems deliverables.
- Use periods, commas, colons, or parentheses instead.
- Keep lines easy to say out loud.
- Use short paragraphs over dense blocks.
- Do not oversell.
- Do not sound like a lecture.
- Keep Stanley Systems as the full business name.

## 10-second check

Would a plumber, HVAC owner, or marine shop owner immediately know what changes in their day after reading the sentence?

If not, rewrite it.

## Script rules

Every script should:
1. Identify the visible pain.
2. Reveal the real cause.
3. Explain the cost in money, time, and control.
4. Make clear that competitors with cleaner systems move faster.
5. Show what better looks like.
6. End with a soft Stanley Systems CTA.

## Blog and content rules

- Blog structure should usually be: this happened, here is what it cost, here is the fix.
- Every post should include a soft CTA and `/contact`.
- Use specific operational pain over generic business advice.
- If Jaden gives multiple blog ideas, track what is written and what remains.
- If asked for an SVG asset for blog posts, clarify whether he means the Stanley Systems brand/logo SVG or a per-post cover illustration.

## Internal vs customer-facing language

Internal briefs may use: n8n, webhooks, Twilio, QBO, HCP, PM2, OpenClaw, API, automation.

Customer-facing content should translate that into: text line, billing follow-up, customer follow-up, missed-call capture, review requests, referral tracking, office cleanup, faster invoices, more money from past customers.


---

## Source file: /home/jaden/.openclaw/workspace/project/stanley-context/03_BUSINESS_AND_GTM_STATE.md

# 03 Business and GTM State

Last revised: 2026-04-28

## Current business reality

- Multiple warm discovery and advice calls have happened.
- Paid conversions are still at zero.
- Coastline is a proof case, not an active paying client right now.
- The core problem is conversion, not lead volume.
- The old "curious college student learning how businesses run" frame gets access but hurts closes.
- Current GTM should lead with money, collected cash, time saved, and revenue already earned.

## Current targeting rule

Target only the core fit defined in `01_CORE_FOUNDATION.md`.

Right now, the practical filter that matters most is not employee count. It is whether the shop has a real office or admin function whose time can actually be saved.

No exceptions for:
- tiny owner-operators
- shops running mostly by hand
- prospects who treat admin time as free

## Current offer architecture

Detailed source of truth: `/home/jaden/.openclaw/workspace/project/stanley-context/STANLEY-SYSTEMS-OFFER-ARCHITECTURE-AND-PACKAGE-1-V3.md`.

Do not duplicate the full V3 offer file here. Use this section as the concise GTM summary.

Current architecture:
1. Paid first step: Workflow Audit.
2. Package 1: Cash Flow Collection System.
3. Package 2: Repeat Revenue System.

The Workflow Audit is the paid diagnostic wedge, not Package 1. It should find the money leaks hiding inside the prospect's office workflow and recommend Cash Flow Collection System, Repeat Revenue System, both, or neither.

Package 1 is Cash Flow Collection System. Public promise: "Turn finished work into collected cash faster."

Package 1 must lead with money, cash movement, payroll hours saved, delayed invoices, time saved, and completed work turning into collected revenue. Do not lead with generic automation, handoff optimization, or process language.

Package 2 is Repeat Revenue System. Public promise: "Get more money from the customers you already earned."

Package 2 must lead with repeat customers, reviews, referrals, captured calls, and more revenue from customers already earned.

Repeat Revenue System can remain internal shorthand or legacy language only. Public website copy should favor Repeat Revenue System unless Jaden decides otherwise.

## Workflow Audit guarantee

The guarantee is a major public selling point. Do not weaken it into a quiet internal note.

Public guarantee: "If Stanley Systems cannot find one clear money leak we can fix, you get your audit fee back and a free Repeat Revenue System."

Guarantee qualification rules should protect the offer without weakening the public promise. Qualification should require a real service business, enough job/customer/invoice/call/estimate/review volume for leaks to matter, access to relevant systems, permission to inspect the workflow, and a reachable decision maker or operations contact.

Internal guardrails:
- The money-back part applies to the Workflow Audit fee.
- The free Repeat Revenue System applies only to businesses that qualify for the guarantee.
- The free Repeat Revenue System should be scoped to Stanley Systems' standard package and normal implementation requirements.
- Do not promise unlimited custom development.
- Do not promise guaranteed revenue, profit, or customers.
- Keep the public guarantee bold, then place qualification language nearby or in fine print.

## Pricing guardrail

Internal pricing tests and public website pricing are not the same thing.

If public copy mentions price, verify the live site or an explicit current brief before publishing.

The old `$297` audit note is a pricing test, not the definitive public architecture. The current strategic fact is that the Workflow Audit is the paid first step.

## Channel priorities

1. Intake from demo content.
2. Warm referrals with a paid intro fee.
3. In-person shop visits.
4. Small local trade association events.
5. LinkedIn outreach to office managers.

### Channel notes

- Paid intro fee means paying for a successful intro that becomes a client.
- Shop visits should aim to meet the person who handles billing or office flow, not just the owner.
- Demo content is now an intake channel, not just proof.

## Channels to deprioritize

- Cold owner email or DM.
- Facebook group promotion as a vendor.
- Generic short-form content as primary lead gen.

## Content and demo role in GTM

- Content is not for building a vague audience.
- Search content should answer specific pains and tool problems.
- Sales-enablement content should be easy to send mid-conversation.
- Short-form is mainly for reps and familiarity, not near-term direct ROI.
- The demo is a real working environment, not fake client work.
- Demo framing is moving from "reminder automation" to "second office manager."
- Keep the demo clearly labeled as a demo.
- Website/content attribution should show which content, video, page, CTA, or form path creates qualified intent.

## Current public surfaces

- Main domain: `stanley-systems.com`.
- Current public social surfaces: Facebook Business Page and LinkedIn Company Page.

## Website copy rules for current GTM

- Website copy must always say "Stanley Systems" when referring to the company, not "Stanley."
- Internal agent names like Stanley, Stanley H, Hermes, OpenClaw, and Codex should not appear in public website copy.
- Lead with owner-visible outcomes: more collected revenue, faster cash movement, fewer payroll hours wasted, fewer delayed invoices, more repeat customers, more reviews, more referrals, more captured calls, and less office rework.
- Avoid making AI, automation, workflow optimization, or integrations the public hero.

## Near-term priorities

- Align website and sales copy with the V3 offer architecture.
- Make the Workflow Audit the paid diagnostic wedge.
- Lead Package 1 with Cash Flow Collection System and the promise "Turn finished work into collected cash faster."
- Lead Package 2 with Repeat Revenue System and the promise "Get more money from the customers you already earned."
- Keep building the Housecall Pro to QuickBooks demo lane.
- Get Wallace demo or dev access.
- Turn demo content into a real intake source.
- Make referral asks.
- Register for one trade event.
- Start office-manager outreach once the demo is presentable.

## Product lane note

The V3 offer architecture file is the detailed source of truth for the current offer structure and Package 1 positioning.

Use this file for GTM state, current offer state, pricing tests, and channel choices.
Use V3 when the task is offer architecture, Package 1, Package 2, guarantee language, or website package copy.
Use `09` only when the task specifically concerns the broader legacy Repeat Revenue System bundle or internal bundle logic.

## Open strategic flags

- Re-test Coastline later, not now.
- Validate the public Workflow Audit price separately from the offer architecture.
- Measure whether demo content produces attributable intake.
- Measure whether in-person visits convert better than advice calls.
- Confirm first real PostHog-attributed intake path once enough website traffic exists.


---

## Source file: /home/jaden/.openclaw/workspace/project/stanley-context/05_DEMO_AND_AUTOMATION_STATE.md

# 05 Demo and Automation State

Last revised: 2026-04-25
Last confirmed workflow snapshot in source docs: 2026-04-21 to 2026-04-22

This file holds last-known demo build status, live workflow state, current queue, and workflow gotchas.

Treat mutable claims here as a dated snapshot. Verify live before acting if the task depends on current status.

## Scope note

This file is about Stanley Systems demo and workflow state.

The Repeat Revenue System bundle spec lives in `09_FOLLOW_UP_SYSTEM_BUNDLE.md`.
Do not assume the bundle spec in `09` is already shipped just because it is defined there.

## Current demo framing

The main demo lane is being repositioned from "reminder automation" to "second office manager."

The point is not only reminders. The point is showing that the same engine can:
- chase money
- catch invoicing misses
- request reviews
- trigger re-engagement
- reduce office follow-up load across multiple workflows

## Last confirmed built and working

### Demo environment
- Housecall Pro demo account with 11 customers
- Full HVAC price book loaded
- 10 invoiced jobs synced to QBO
- 1 open estimate
- QBO A/R aging report populated across all buckets
- Hero "before" screenshot captured

### Demo contact details last seen in source docs
- Demo business phone for templates: `(781) 913-7585`
- Demo from-email default: `jaden@stanley-systems.com`
- Alternate from-email if configured: `billing@stanley-systems.com`

### Working QBO layer
- QBO OAuth production app was live
- Reusable QBO client at `/home/jaden/.openclaw/qbo/client.js` was working with token refresh
- AR follow-up workflow at `/home/jaden/.openclaw/workflows/qbo_ar_followup.js` had run live
- Demo reset script at `/home/jaden/.openclaw/workflows/qbo_reset_demo.js` was working
- Gmail and Twilio secrets were configured
- Demo phone override was configured

### Last confirmed live intake pipeline
- HCP completed-job intake pipeline was live end-to-end
- Flow: HCP -> Zapier -> n8n -> JSONL persistence -> Telegram
- n8n workflow name: `HCP Job Intake`
- n8n workflow ID in source docs: `s4XTGHZII1QhPZti`
- Persistence wrote weekly audit snapshots by shop, a mirrored intake log, and rejection logs
- Telegram notifications were part of the live path

## Last known open work from source docs

1. Audit whether `{{PayLink}}` in the AR workflow resolves to a real QBO payment URL
2. Build the intake-to-invoice audit workflow at `/home/jaden/.openclaw/workflows/intake_to_invoice_audit.js`
3. Use per-shop config files at `/home/jaden/.openclaw/config/shops/_demo.json` and `_template.json`
4. Keep `DEMO_MODE` routing audit email to `jaden+audit@stanley-systems.com`

### Known blocker to check
- HCP API key may not exist yet in `/home/jaden/.openclaw/secrets/hcp_credentials.json`

## Last known next queue from source docs

- Review request workflow with SMS rating gate and inbound webhook handling
- Flexible re-engagement timer
- Demo page on `stanley-systems.com`
- Final demo video once the main workflows are truly working
- ROI calculator and supporting PDF
- Second smaller demo and estimate-revival support asset later

## Locked demo scope from source docs

Keep these in scope:
- AR follow-up
- Intake-to-invoice audit
- Review request with rating gate
- Flexible re-engagement timer

Keep these out of the main demo for now:
- Payment plan offers
- Referral raffle
- Cold estimate revival as a full build
- Lead nurturer as a full build

### Important distinction

The Repeat Revenue System file defines Review Booster, Referral Engine, Smart Re-Engagement, and Call Catcher as a packaged bundle.

This demo file is broader office-side workflow state. It may share components with the bundle spec, but it is not the same thing.

## Workflow gotchas that matter

- Zapier sends flat payloads here. Do not waste time trying to unflatten inside Zapier
- Unflattening happens in the n8n Code node
- n8n production webhooks used the long workflow-ID path form in the source docs
- n8n Code nodes cannot write to disk with `fs`
- File persistence should happen through the external persistence server
- Use HTTP Request with `neverError: true` when the persistence server intentionally returns 400s
- Create and activate n8n workflows through the REST API, not by writing directly into SQLite
- In n8n REST, `active` is read-only in workflow PUT bodies

## Known live issues from source docs

- Zapier MCP connection was broken and needed token regeneration plus OpenClaw re-registration
- Old `.npm-global` OpenClaw binary still existed even though the active service pointed at `.local`
- Zapier had a stale draft after URL changes
- Valid webhook responses were cosmetically messy even when the path was working

## Protected surfaces unless explicitly asked to change them

- `qbo/client.js`
- live persistence server behavior
- the live HCP Job Intake workflow
- sensitive site files when the brief says audit first, modify later

## Video and demo notes

- Open by acknowledging that QBO and HCP already have some reminder capability
- Explain the missing pieces: tone escalation, memo trail, owner escalation path, and richer multi-workflow follow-up
- Show the engine as a broader office-side system, not a one-trick reminder bot
- If showing referral credit amounts, label them as configurable per shop
- Before using the speed-to-lead stat in public material, verify it again

## Shared-infra note

The Repeat Revenue System bundle spec requires shared messaging infrastructure such as opt-out handling and messaging throttle.

In this file, treat those features as last-known design or queue items unless a live check confirms they are already running.


---

## Source file: /home/jaden/.openclaw/workspace/project/stanley-context/STANLEY-SYSTEMS-OFFER-ARCHITECTURE-AND-PACKAGE-1-V3.md

# Stanley Systems Offer Architecture and Package 1 Context v3

Last updated: April 2026

## Core correction

Stanley Systems must lead with money first.

Stanley Systems is not selling generic automations. Stanley Systems is selling more collected revenue, faster cash movement, fewer payroll hours wasted on office drag, and fewer jobs or customers slipping through the cracks.

The current offer architecture is:

1. **Paid first step:** Workflow Audit
2. **Package 1:** Cash Flow Collection System
3. **Package 2:** Repeat Revenue System

The old Package 1 framing, "fix the handoff from finished work to paid invoice," is directionally right but too weak for the website. It explains the mechanism instead of the result.

Use this instead:

**Cash Flow Collection System**

Public promise:
**Turn finished work into collected cash faster.**

Expanded promise:
**Stanley Systems catches the office gaps that delay invoices, slow payment, waste payroll hours, and keep completed work from turning into collected revenue.**

One-line pitch:
**Get more completed work invoiced, followed up with, and collected without paying your office team to chase the same missing details every week.**

Package 2 public name:

**Repeat Revenue System**

Public promise:
**Get more money from the customers you already earned.**

Expanded promise:
**Stanley Systems brings past customers back, turns happy customers into fresh Google reviews, turns those reviews into referral opportunities, and catches extra calls so new work does not fall through.**

The phrase **Repeat Revenue System** can remain as internal shorthand or legacy name, but public website copy should favor **Repeat Revenue System** unless Jaden decides otherwise.

## Paid first step: Workflow Audit

The Workflow Audit is not Package 1. It is the paid diagnostic wedge.

### Public promise

**Find the money leaks hiding inside your office workflow.**

### Stronger website version

Stanley Systems looks at where cash, customers, and payroll hours are slipping through your current setup.

We look at missed calls, slow invoices, stale estimates, weak review flow, old customers nobody has reached back out to, and software handoffs that force your office team to retype, chase, or check details manually.

You leave with a clear map of what is leaking money, what it is costing, and one practical fix your team can use right away.

If the rest is worth building, Stanley Systems can build it. If not, you still leave knowing exactly where the money is slipping through.

### Guarantee

This guarantee is a selling point. Do not weaken it into a quiet internal note.

Public guarantee:

**If Stanley Systems cannot find one clear money leak we can fix, you get your audit fee back and a free Repeat Revenue System.**

Website-safe expanded version:

**If your business qualifies and Stanley Systems cannot find one clear money leak we can fix, you get your audit fee back. We will also give you the Repeat Revenue System free so you can still leave with a real revenue recovery system in place.**

### Guarantee qualification rules

Use qualification rules to protect the offer instead of weakening the marketing promise.

A business must qualify for the guarantee. The business should have:

- A real service business with repeatable jobs, calls, customers, invoices, or estimates
- A real field, job, CRM, dispatch, accounting, or billing system
- Enough monthly volume for leaks to matter
- Access to the systems Stanley Systems needs to inspect
- Permission for Stanley Systems to review the relevant workflow during the audit
- No hidden refusal to share basic job, invoice, call, customer, estimate, or review data needed for diagnosis
- A reachable decision maker or operations contact

Examples of businesses that may not qualify:

- Tiny owner-operators with almost no software and no repeatable office workflow
- Businesses with no meaningful job, invoice, customer, call, estimate, or review volume
- Businesses that refuse access to the systems needed to find the leak
- Businesses that want free custom software without allowing an actual diagnostic review
- Businesses outside Stanley Systems' service scope

### Internal guarantee clarification

Do not delete or soften the public guarantee. The public guarantee is part of the marketing strategy.

Clarify the fulfillment rules internally:

- The money-back part applies to the Workflow Audit fee.
- The free Repeat Revenue System offer applies only when the business qualifies for the guarantee.
- The free Repeat Revenue System should be scoped to Stanley Systems' standard Repeat Revenue System package and normal implementation requirements.
- Do not promise unlimited custom development.
- Do not promise guaranteed revenue, guaranteed profit, or guaranteed customers.
- Do not hide the guarantee behind legalistic copy. Keep the website promise bold, then place qualification language nearby or in fine print.

### Website CTA options

Use money-first CTAs:

- Find My Money Leaks
- See What Is Costing Us Cash
- Book the Workflow Audit
- Show Me What We Are Losing
- Get the Money Leak Map

Avoid weak CTAs:

- Learn More
- Get Started
- Book a Consultation

## Package 1: Cash Flow Collection System

### Customer-facing name

Cash Flow Collection System

### Internal shorthand

Job-to-cash package
Broken handoff package
Finished-work-to-cash package

### Public promise

**Turn finished work into collected cash faster.**

### Customer-facing description

A finished job does not help cashflow until the invoice goes out, the follow-up happens, and the money comes in.

The Cash Flow Collection System watches the path from finished work to collected cash. It catches missing billing details, slow invoices, stuck estimates, open balances, software handoff problems, and repeated office issues that burn payroll hours.

Your office gets a clear action list. Leadership gets a weekly money leak digest. Completed work moves toward collected cash with fewer manual checks, fewer repeated handoffs, and fewer payroll hours spent chasing information between systems.

### Money-first one-liners

Use these across the website, ads, videos, and sales copy:

- Finished work does not pay you until the invoice goes out and the money comes in.
- Every delayed invoice is cash sitting in the office instead of your bank account.
- If your office spends 10 hours a week chasing job details, that is payroll you already paid for work that should have been automatic.
- A few stuck jobs a week can turn into thousands of dollars a month in delayed cash.
- The software is not the problem. The gap between the software is the problem.
- Stanley Systems makes the gap visible, then helps close it.
- More work does not matter if the office cannot turn finished jobs into collected money.

### Results examples for website use

Use these as example scenarios, calculator outputs, or short proof-style cards.

Do not over-caveat every number. Use normal language like "for a shop doing," "example," or "a shop like this." The point is to make the money visible.

Example 1:
A shop finishing 40 jobs a month with a $650 average job only needs 5 jobs delayed to put $3,250 in monthly cash movement at risk.

Example 2:
If your office spends 8 hours a week chasing missing job details, that is over 30 payroll hours a month spent on handoffs instead of billing, scheduling, and customer work.

Example 3:
If 6 invoices a month sit an extra 10 days before being sent, you are not just waiting on customers. You are delaying your own cash before the customer ever sees the bill.

Example 4:
If a $900 job waits 14 days to become invoice-ready, the customer is not the reason cash is late. The handoff is.

Example 5:
For a 15-person service company, cleaning up billing handoffs can be worth more than another software subscription because the money is already earned. It just needs to move.

Example 6:
If one office employee spends 6 hours a week checking whether jobs, invoices, and payments moved between systems, that is about 25 hours a month spent on preventable follow-up.

Example 7:
If 3 estimates worth $2,500 each sit with no next step, that is $7,500 in quoted work waiting for a real follow-up path.

### Best fit

Best for service businesses using a field system, job system, CRM, dispatch system, estimating system, accounting system, billing system, or payment system where job information has to move cleanly.

Mention specific software because owners do not always realize the message applies to them unless their stack is named.

Field, job, CRM, and operations systems to mention:

- ServiceTitan
- Housecall Pro
- Jobber
- FieldEdge
- Service Fusion
- Workiz
- FieldPulse
- ServiceM8
- Kickserv
- GorillaDesk
- Yardbook
- JobTread
- BuildOps
- Simpro
- Service Autopilot
- LMN
- Aspire
- ServiceTrade
- RazorSync
- Skimmer
- ServiceBridge
- Vonigo
- Commusoft
- PestPac
- ServiceMinder
- Shopmonkey
- Tekmetric
- Wallace for marine service shops

Accounting, billing, and back-office systems to mention:

- QuickBooks Online
- QuickBooks Desktop
- Xero
- FreshBooks
- Sage
- NetSuite
- Wave
- Zoho Books
- Microsoft Dynamics
- Stripe invoices
- Square invoices
- Bill.com
- Melio
- PayPal invoices

Website wording:

**Best for shops using ServiceTitan, Housecall Pro, Jobber, FieldEdge, Service Fusion, Workiz, FieldPulse, Yardbook, JobTread, BuildOps, ServiceTrade, Wallace, QuickBooks, Xero, Sage, NetSuite, FreshBooks, Stripe, Square, or another setup where job information has to move cleanly from field work to billing.**

### What makes this package sellable

The parts are useful alone, but the package is stronger because each piece catches a different point where money gets stuck.

Use this phrase internally and adapt it for public copy:

**The pieces work together because one office leak usually creates the next one. A finished job with missing details delays the invoice. A delayed invoice delays payment. Weak A/R follow-up delays collection. A messy customer record creates the same problem again next week. Stanley Systems ties the chain together so cash keeps moving.**

If using the user's phrase:

**The whole is greater than the sum of its parts because each piece protects a different step in the cashflow chain.**

## Package 1 modules

### 1. Completed Job Intake Watch

Lead with result:
**Finished jobs get captured before they turn into delayed invoices.**

What it does:
When a job is marked complete in the field system, Stanley Systems captures it and starts the billing-readiness check.

Why it matters:
Completed work is only valuable when it turns into an invoice and then collected cash. This module makes sure finished jobs enter the cashflow path instead of sitting inside the field system waiting for someone to notice.

Customer-facing benefit:
**More finished jobs move toward billing the same day.**

### 2. Invoice-Ready Check

Lead with result:
**Your office knows which jobs can be billed now and which ones are missing details.**

What it checks:

- Customer name
- Job number
- Completion date
- Technician
- Line items
- Price
- Notes
- Photos or attachments if needed
- Payment status
- Tax, terms, or billing fields where relevant
- Whether the job reached the accounting system

Why it matters:
This stops the office from wasting payroll hours digging through job notes, texts, calls, and software screens just to figure out whether work can be billed.

Customer-facing benefit:
**Less admin chasing, faster invoices, cleaner billing.**

### 3. Missing Billing Detail Alerts

Lead with result:
**Missing details get fixed while the job is still fresh.**

What it does:
If a job is complete but not invoice-ready, Stanley Systems tells the right person exactly what is missing.

Example alert:
"Job #1428 is finished but missing line items and tech notes. Office cannot invoice it yet."

Why it matters:
The longer the gap between job completion and billing cleanup, the more expensive the chase gets. The tech forgets details. The office loses time. The invoice waits.

Customer-facing benefit:
**Fewer jobs stuck in billing limbo.**

### 4. Accounting Handoff Monitor

Lead with result:
**Jobs, invoices, customers, and payments stop disappearing between systems.**

Customer-facing name:
Accounting Handoff Monitor

Stack-specific names when useful:

- QuickBooks Online Handoff Monitor
- QuickBooks Desktop Handoff Monitor
- Xero Handoff Monitor
- Sage Handoff Monitor
- NetSuite Handoff Monitor
- FreshBooks Handoff Monitor
- Stripe Invoice Handoff Monitor
- Square Invoice Handoff Monitor

What it does:
Stanley Systems watches whether job and billing information moves cleanly between the field system and the accounting or billing system.

It can be framed around QuickBooks Online when that is the prospect's stack, but the website must make clear that the same idea applies to QuickBooks Desktop, Xero, FreshBooks, Sage, NetSuite, Wave, Zoho Books, Microsoft Dynamics, Stripe invoices, Square invoices, Bill.com, Melio, PayPal invoices, and other accounting or billing setups.

Why it matters:
A sync existing does not mean the handoff is clean. Jobs can be missing details. Customer records can mismatch. Invoices can need manual cleanup. Payments can fail to line up cleanly. The office still ends up doing the work.

Customer-facing benefit:
**Your team spends less time checking whether the software did what it was supposed to do.**

### 5. Same-Day Invoice Nudge

Lead with result:
**More invoices go out while the work is still fresh.**

What it does:
If completed jobs are still not invoice-ready or invoiced by a configured cutoff time, Stanley Systems sends the office a simple nudge.

Example:
"4 jobs were finished today. 3 are invoice-ready. 1 is missing billing details."

Why it matters:
Same-day billing is one of the cleanest ways to speed up cash without getting more leads, hiring more staff, or changing the field team.

Customer-facing benefit:
**Cash starts moving sooner.**

### 6. A/R Follow-Up and Escalation

Lead with result:
**Open invoices get followed up before they turn into leadership-level problems.**

What it does:
Stanley Systems watches open invoices and routes follow-up based on age, amount, customer type, and rules.

What makes it different from basic accounting reminders:

- Tone can change by aging bucket
- High-dollar balances get surfaced
- Weird cases go to a person
- Duplicate or awkward reminders are avoided
- Manager sees what needs attention
- Weekly A/R summary shows where money is stuck
- Payment links and follow-up paths can be checked

Why it matters:
Most accounting tools can send basic reminders. The value here is that Stanley Systems watches the exception layer, the escalation layer, and the money that needs human attention.

Customer-facing benefit:
**Small balances get handled. Big balances get noticed. Weird balances get routed.**

### 7. Sales Estimate Watch

Lead with result:
**Good estimates stop dying quietly.**

What it does:
Stanley Systems flags estimates that have no next step, sit open too long, get accepted but never become jobs, or represent too much revenue to ignore.

What it can catch:

- Estimate sent with no follow-up date
- Estimate open past configured age
- Estimate accepted but not converted to job
- Estimate declined but still open
- High-value estimate with no manager visibility

Why it matters:
An estimate is not revenue until someone follows up, wins it, schedules it, and gets the work billed.

Customer-facing benefit:
**More quoted work gets a real next step.**

### 8. Weekly Money Leak Digest

Lead with result:
**Leadership sees where cash got stuck this week.**

What it includes:

- Finished jobs not invoice-ready
- Finished jobs not in the accounting system
- Invoices open by aging bucket
- High-dollar invoices needing attention
- Estimates stuck with no next step
- Missing customer or job information
- Repeated handoff issues
- Payroll hours likely wasted on manual follow-up
- Suggested first fix

Why it matters:
This gives managers a clean view of office drag without digging through multiple systems or asking the team what happened.

Customer-facing benefit:
**You see the leaks before they become a normal cost of doing business.**

### 9. Office Exception Inbox

Lead with result:
**The office gets one clear action list instead of hunting through every system.**

What it does:
The Office Exception Inbox collects the issues that need attention:

- Missing billing details
- Sync or handoff problems
- Invoice not sent
- Payment overdue
- Estimate stuck
- Customer record mismatch
- High-value issue needing manager review

How to avoid redundancy with the Weekly Money Leak Digest:
The Office Exception Inbox is the working list for the office during the week. The Weekly Money Leak Digest is the leadership summary at the end of the week.

Customer-facing benefit:
**The office knows what to fix today. Leadership sees what keeps breaking over time.**

### 10. Customer and Job Data Cleanup Watch

Lead with result:
**Bad records stop creating the same billing problems every week.**

What it flags:

- Missing phone or email
- Duplicate customer records
- Mismatched names between systems
- Missing billing address
- Jobs with no assigned tech
- Jobs with no line items
- Zero-dollar invoices that need review
- Manual cleanup needs

How to avoid redundancy with the Accounting Handoff Monitor:
The Accounting Handoff Monitor watches whether information moved between systems. The Data Cleanup Watch catches record quality problems that make the handoff messy in the first place.

Customer-facing benefit:
**Cleaner records, fewer billing delays, less repeated admin work.**

## Package 1 website public section copy

### Section headline

**Turn finished work into collected cash faster.**

### Subheadline

Stanley Systems catches the office gaps that delay invoices, slow payments, and waste payroll hours after the work is already done.

### Body copy

A finished job does not help cashflow until the invoice goes out, the customer gets followed up with, and the money comes in.

The Cash Flow Collection System watches the path from your field system to your accounting system. It catches missing billing details, jobs that are not invoice-ready, invoices that need follow-up, estimates with no next step, and customer records that keep creating rework.

Your office gets a clear action list. Leadership gets a weekly money leak digest. Completed work moves toward collected cash with fewer manual checks, fewer repeated handoffs, and fewer payroll hours burned chasing information.

### What it catches

- Finished jobs that are not invoice-ready
- Missing billing details
- Jobs or invoices stuck between systems
- Invoices created but not sent
- Open invoices aging without the right follow-up
- Sales estimates sitting with no next step
- Customer records that cause rework
- Repeated handoff problems that waste office hours

### What you get

- Completed Job Intake Watch
- Invoice-Ready Check
- Missing Billing Detail Alerts
- Accounting Handoff Monitor
- Same-Day Invoice Nudge
- A/R Follow-Up and Escalation
- Sales Estimate Watch
- Weekly Money Leak Digest
- Office Exception Inbox
- Customer and Job Data Cleanup Watch

### Best for

Service businesses using field and accounting systems like ServiceTitan, Housecall Pro, Jobber, FieldEdge, Service Fusion, Workiz, FieldPulse, ServiceM8, Kickserv, GorillaDesk, Yardbook, JobTread, BuildOps, Simpro, Service Autopilot, LMN, Aspire, ServiceTrade, Wallace, QuickBooks Online, QuickBooks Desktop, Xero, FreshBooks, Sage, NetSuite, Stripe invoices, Square invoices, or another setup where job information has to move cleanly from field work to billing.

### Result cards

Card 1:
**Delayed invoices delay cash.**
A shop finishing 40 jobs a month at $650 per job only needs 5 jobs delayed to put $3,250 in monthly cash movement at risk.

Card 2:
**Manual handoffs burn payroll.**
8 office hours a week spent chasing job details becomes 30+ hours a month that could have gone toward billing, scheduling, and customer work.

Card 3:
**One leak creates the next.**
A missing job note delays the invoice. A delayed invoice delays payment. Weak follow-up delays collection. The Cash Flow Collection System ties the chain together.

Card 4:
**Quoted work needs a next step.**
3 open estimates at $2,500 each means $7,500 in quoted work waiting for follow-up, scheduling, and billing.

### CTA options

Primary:
**Find the Cash Stuck in Our Office**

Secondary:
**Book the Workflow Audit**

Other options:

- Show Me What Is Delaying Cash
- Find Our Billing Leaks
- See What Is Slowing Down Payment
- Get the Money Leak Map

## Package 2: Repeat Revenue System

### Customer-facing name

Repeat Revenue System

### Internal shorthand

Repeat Revenue System

### Public promise

**Get more money from the customers you already earned.**

### Customer-facing description

The Repeat Revenue System helps service businesses turn completed work into repeat revenue, fresh reviews, referral opportunities, and captured calls.

It brings old customers back, turns happy customers into 5-star Google reviews, turns those reviews into referral opportunities, and catches the extra calls so new work does not fall through.

### Modules

- Smart Re-Engagement
- Review Booster
- Referral Engine
- Call Catcher

### Sum of parts framing

**The pieces work together because each customer touchpoint feeds the next one. A completed job can become a review. A review can become trust. Trust can become referrals. Referrals and better visibility create more calls. Call Catcher helps make sure those calls do not disappear.**

Alternative phrase:

**The whole is greater than the sum of its parts because each piece turns one customer moment into the next revenue opportunity.**

### Relationship between Package 1 and Package 2

Package 1, Cash Flow Collection System, helps businesses collect more of the money already earned from completed work.

Package 2, Repeat Revenue System, helps businesses create more future revenue from past customers, happy customers, referrals, reviews, and inbound calls.

The Workflow Audit should decide which system matters first.

## Website-wide naming rule

When referring to the company, always write **Stanley Systems**.

Do not write:

- Stanley can build it
- Stanley helps shops
- Stanley fixes this

Write:

- Stanley Systems can build it
- Stanley Systems helps shops
- Stanley Systems fixes this

Internal agent names like Stanley, Stanley H, Hermes, OpenClaw, and Codex should not appear in public website copy.

## Website-wide result-first rule

Every section should lead with one of these outcomes:

- More collected revenue
- Faster cash movement
- Fewer payroll hours wasted
- Fewer missed jobs
- Fewer delayed invoices
- More repeat customers
- More fresh reviews
- More referral opportunities
- More captured calls
- Less office rework

Do not lead with process terms like:

- workflow automation
- handoff optimization
- integration layer
- AI system
- backend automation
- operational efficiency

## Context update instructions

Add this file to Stanley Systems project context as the updated offer architecture and Package 1 source of truth.

Recommended path:
`/home/jaden/.openclaw/workspace/project/stanley-context/STANLEY-SYSTEMS-OFFER-ARCHITECTURE-AND-PACKAGE-1-V3.md`

Then update `03_BUSINESS_AND_GTM_STATE.md` to summarize:

- Workflow Audit is the paid diagnostic wedge
- Package 1 is Cash Flow Collection System
- Package 2 is Repeat Revenue System
- The guarantee is a major public selling point and must not be weakened
- All website copy must use Stanley Systems when referring to the company
- Package 1 must lead with money, cash movement, payroll hours saved, and time saved
- Package 2 must lead with more revenue from existing customers, reviews, referrals, and captured calls


---

## Source file: /home/jaden/.openclaw/workspace/project/stanley-context/09_FOLLOW_UP_SYSTEM_BUNDLE.md

# 09 Repeat Revenue System Bundle

Last revised: 2026-04-25

Use this file for Repeat Revenue System packaging, product logic, build planning, and bundle-specific copy rules.

This file is not a live-state tracker.
Live demo and workflow state belongs in `05_DEMO_AND_AUTOMATION_STATE.md`.

## What this product is

The Repeat Revenue System is a bundled set of four connected automations that share one dedicated text line and shared messaging infrastructure.

It is sold as a bundle, not a random list of one-off automations.
The set is the product.

Internal build name:
- Repeat Revenue System

Short product pitch:
- One system, four automations that turn every job into more money

## Revenue story

This bundle should always be presented as one connected revenue story.

Default story chain:
1. Smart Re-Engagement wakes up old customers into repeat revenue
2. Better customer touchpoints create happier customers and more 5-star reviews through Review Booster
3. Happy customers refer friends through Referral Engine
4. More calls and replies need to be caught and routed cleanly, which is where Call Catcher protects the shop

Customer-facing content should sell the business result, not the stack.

## Phone architecture. Lead with this early

The shop's main business number never changes.

Their existing line stays as it is. Trucks, signage, Google Business Profile, website, and normal call habits all stay intact.

The system adds one dedicated local-area-code text line alongside the main line. That line handles:
- outbound SMS
- inbound SMS replies
- accidental calls, which are forwarded cleanly to the main line

Customers only see the dedicated line inside their SMS thread.

This point should appear early in:
- sales calls
- landing pages
- demo videos
- onboarding materials

## The four automations

### 1. Smart Re-Engagement

**Business result**
Wake up forgotten customers into repeat revenue.

**Core behavior**
- service-specific timers fire after completed jobs
- outbound SMS is signed by the original tech where appropriate
- positive replies create the next action, such as a draft job or an office-manager handoff
- includes dormant reawakening across customers untouched for 12 months or more

**Important build note**
Dormant reawakening is a flagship selling point, not an optional extra.

### 2. Review Booster

**Business result**
Get more 5-star Google reviews and protect the shop from bad reviews before they go public.

**Core behavior**
- fires when a QBO invoice is marked paid
- asks the customer for a simple 1 to 5 response
- flexible parsing handles numeric and natural-language replies
- 4 or 5 routes to the Google review ask
- 1 to 3 captures private feedback and alerts the owner

### 3. Referral Engine

**Business result**
Turn happy customers into the shop's best sales channel.

**Core behavior**
- starts right after a successful review event or review-link completion signal
- sends a referral ask while goodwill is highest
- supports one follow-up message 24 to 48 hours later, then stops
- uses a trackable referral code and shareable link
- writes referral credit to QBO as real credit memos

**Important build note**
Fake credits kill trust. If credit is promised, the accounting entry needs to be real.

### 4. Call Catcher

**Business result**
Catch missed calls without breaking the way existing customers already reach the shop.

**Core behavior**
- lookup happens before any routing decision
- known existing customers should reach the shop's normal flow directly
- unknown callers or unanswered calls go through voicemail capture and transcription
- callers get an automatic reply so they know the message was received
- opt-out handling applies across the full system

**Critical rule**
Customer lookup must happen before routing.
Existing customer calls must not be shoved into an unnecessary automation layer.

## Free included items

Use this list consistently across landing pages, demo materials, one-pagers, proposals, and checkout flows.

- dedicated local-area-code text line while the main business number stays unchanged
- SMS compliance setup and opt-out handling
- automatic reply to missed callers
- voicemail transcription to the office manager
- per-tech signature support on outbound SMS where useful
- messaging throttle so customers do not get stacked SMS in a short window
- weekly digest email
- per-shop configurable timings, dollar amounts, and message copy
- customer lookup logic that checks for real customer matches before routing

## Shared infrastructure

Shared bundle infrastructure should be built once and reused across all four automations.

Core shared pieces:
- one dedicated text line per shop
- inbound SMS webhook
- voice webhook
- per-shop config file
- customer opt-out state
- messaging throttle
- customer lookup service
- QBO integration for real credit handling where referral credits are promised

## Build order

Recommended internal build order:
1. Review Booster
2. Referral Engine
3. Smart Re-Engagement
4. Call Catcher

Why this order:
- Review Booster is the fastest to demo
- Referral Engine can reuse review-driven logic
- Smart Re-Engagement is bigger and more standalone
- Call Catcher depends on careful lookup and routing behavior and should be informed by the rest

## Packaging and pricing rules

- Sell the set as a bundle, not a la carte
- The four paid automations are the headline items
- Shared infrastructure and free included items should be shown clearly, but not confused with the paid headline items
- If a prospect wants to remove one automation, explain shared infrastructure cost and why removing one weakens the set
- Do not pre-solve bundle discount objections before they are real

## Customer-facing copy rules

- Never say `Twilio` in customer-facing content
- Lead with the business result, not the stack
- Every automation description must connect to revenue, time, or owner relief
- `Automation` is fine in customer-facing copy. `AI` is not
- Use `dedicated text line`, `the system`, or `the phone automation` instead of vendor names
- Lead the phone section with `your main business number never changes`

## Video and sales rule

Use the mechanic metaphor:
A mechanic explains that the car is fixed and what it cost, not how the combustion system works.

For customer-facing video, landing pages, calls, and one-pagers:
- show the process and the business result
- do not explain webhooks, vendors, or stack plumbing
- keep the story tied to money, time, and owner relief

## Relationship to the main Stanley demo

The Repeat Revenue System is a product bundle spec.

It may share parts with the broader Stanley Systems demo lane, but this file does not prove that every piece is already built or live.
Check `05_DEMO_AND_AUTOMATION_STATE.md` before speaking as if a workflow is already shipped.


---

## Source file: /home/jaden/.openclaw/workspace/project/stanley-context/08_MOTION_GRAPHICS_AND_VIDEO_RENDERING_STANDARD.md

# 08 Motion Graphics and Video Rendering Standard

Last revised: 2026-04-25

Use this file only for motion graphics, rendered B-roll, or video-composition work.

## Default tool

Default to Remotion.

Not Hyperframes.
Not Lottie from scratch.
Not SVG plus CSS from scratch.

## Why this is locked

- Remotion maps cleanly to existing React and TypeScript skills
- Remotion has already been used successfully on the Stanley Systems VPS
- An earlier Hyperframes attempt stalled at composition setup
- The goal is predictable output, not tool exploration

## Last known project setup

Use these as last-known assumptions. Verify live before acting if the task depends on them.

- Project location: `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/remotion/`
- Installed packages last seen: `remotion`, `@remotion/cli`
- Last noted CLI version: `4.0.451`
- Entry file: `src/index.tsx`
- Render output directory: `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/public/broll/`

## Hard project rules

- Do not reinstall the Remotion project without a clear reason
- Do not move the Remotion project
- Do not wire it into the Next.js app bundle
- If the project directory is missing or corrupted, stop and tell Jaden before rebuilding anything

## Standard workflow

1. Read the existing `src/index.tsx` and any current compositions before editing
2. Make additive or surgical changes when possible
3. Validate with `npm exec remotion compositions src/index.tsx`
4. Render with `npm exec remotion render <compositionId> <outputPath>`
5. Verify the output file exists and the size is reasonable
6. Generate two or three frame screenshots as proof
7. Report back with path, size, render time, screenshots, and any divergence from plan

## Tool selection rules

- If asked for a Hyperframes animation, translate it to a Remotion equivalent unless Hyperframes is explicitly required for an integration
- If asked for Lottie JSON, render the Remotion MP4 first. Produce Lottie only if specifically requested after that
- Do not mix tools inside one deliverable

## Rendering patterns already known to work

- `Sequence` plus `interpolate()` for timeline segmentation and camera-pan timing
- `spring()` for weighted settling motion and eased `interpolate()` for glides
- `AbsoluteFill` plus parent `transform: scale(...) translate(...)` for camera-pan metaphors
- `Composition` plus `registerRoot()` for deterministic entry
- For connector-line and traveling-icon effects, animate `stroke-dashoffset` on the SVG path and sync icon translation to the same progress value
- For 3D or glass-box treatments, use layered CSS with translucent fill, rim-light border, inner highlight, and drop shadow

## Visual defaults for Stanley Systems video work

- Palette leans navy and cool indigo
- Green is for metrics and success states
- White or near-white text on dark backgrounds
- Warm off-white only for intentional light-mode work
- No amber-heavy, orange-heavy, or purple-heavy saturation
- Typography: DM Sans
- Motion feel: slow, weighted, cinematic
- No bounce easing
- No captions, subtitle burn-ins, or watermarks unless explicitly requested

## Session rules

- Run motion work in the main session, not a sub-agent
- Do not request sudo for fonts or system packages. Tell Jaden the exact command and why
- If a render under 30 seconds of runtime takes more than about 10 minutes, stop and inspect the bottleneck

## Honest-answer rule

If asked to use a tool you do not confidently know how to author from scratch, say so plainly before starting.
