# Public copy cleanup rules

Task: t_af5750d3
Project: Pricing + Stripe Checkout Rework
Lifecycle status: draft_spec
Assignee lane: copywriter
Created: 2026-05-05

## Scope

These rules apply to every public page, pricing component, checkout handoff page, onboarding page, FAQ, footer CTA, calculator handoff, public metadata field, and system page touched by the Pricing + Stripe Checkout Rework.

Do not deploy, restart PM2, edit secrets, edit OpenClaw runtime, or request Stripe secret keys for this task.

## Public naming source of truth

Use these public names exactly:

- Stanley Systems
- Workflow Audit
- Cashflow Control System
- Repeat Revenue System
- Both Systems

Short checkout labels may use these names when space is tight:

- Cashflow Control
- Repeat Revenue
- Both Systems

Do not use these as public package names:

- Customer Revenue System
- Follow-Up System
- Cash Collection System
- Cash Flow Collection System

Internal ids may remain snake_case if needed for backwards compatibility, but public text, aria labels, page metadata, CTA labels, FAQ copy, route headings, and analytics event display names must use the approved names above.

## Tone rules

Public copy should sound like a practical operations fix for service business owners.

Lead with:

- money that is stuck
- office time that is wasted
- owner relief
- fewer missed opportunities
- clearer next steps
- keeping work moving inside the tools the business already uses

Avoid:

- AI as the headline or main selling point
- clever slogans that hide the business value
- consultant voice
- backend jargon
- tool-stack language
- inflated transformation language
- em dashes in public copy
- dark section language tied to dark visuals
- orange, amber, yellow, gold, or sepia visual directions

Preferred sentence shape:

- Clear problem.
- Practical fix.
- Owner benefit.

Example:

- Weak: AI-powered automation that transforms your backend operations.
- Use: Stanley Systems finds where invoices, follow-up, and handoffs get stuck, then builds the practical system that keeps money moving.

## Claims and compliance rules

Do not promise or imply:

- guaranteed revenue
- guaranteed customers
- guaranteed Google ranking
- guaranteed 5-star reviews
- unlimited custom development
- unlimited integrations
- that Stanley Systems can fix every business
- that buying a system bypasses fit, access, onboarding, or scope review

Use safer language:

- helps
- reduces
- keeps visible
- moves faster
- catches sooner
- makes the next step clear
- if the business is a fit
- after onboarding and access review
- when the needed records and tools are available

## Stripe and checkout copy rules

Use only the Payment Link URLs from Jaden's brief. Public URLs are allowed in client-side code. Never request, expose, or reference Stripe secret keys.

Checkout CTAs should separate purchase intent from questions:

- Direct buyer CTAs go to the correct Payment Link or checkout selector.
- Question or unusual-fit CTAs can still go to contact.
- Workflow Audit CTAs should not be mixed with package checkout CTAs unless the page is explicitly explaining the audit-first path.

Required checkout caveat near package purchase flow:

Buying starts onboarding. Stanley Systems still reviews fit, access, and scope before implementation begins. If the purchase is not a fit, Stanley Systems may refund, redirect, or pause the work.

## Approved copy replacements

Use these replacements whenever the old phrases appear in public copy.

- Cash Flow Collection System -> Cashflow Control System
- Cash Collection System -> Cashflow Control System
- Customer Revenue System -> Repeat Revenue System
- Follow-Up System -> Repeat Revenue System
- follow-up system -> repeat revenue system
- AI-powered automation -> practical workflow automation
- AI assistant -> Stanley Systems workflow support, unless the page is explicitly a demo page
- backend work -> office work, office handoffs, admin work, or behind-the-scenes work
- 5-star Google reviews -> fresh customer reviews
- 5-star reviews -> stronger customer proof
- 5-star customers -> happy customers
- guaranteed revenue -> avoid the claim
- guaranteed customers -> avoid the claim
- Google ranking -> avoid the claim unless a legal SEO page explicitly qualifies it
- unlimited custom development -> scoped implementation work

## File targets from source scan

Current public app/components/lib scan found copy cleanup targets in these files:

- `app/invoicing-delay-cash-flow-calculator/calculator-client.tsx`
- `app/about/page.tsx`
- `components/pricing-section.tsx`
- `components/calculator-path-section.tsx`
- `components/proof-strip-section.tsx`
- `components/pricing/PricingHero.tsx`
- `components/pricing/PricingPage.tsx`
- `components/pricing/CalculatorHandoffPanel.tsx`
- `lib/pricing/offers.ts`

The scan also found AI, backend, and related words in legacy/demo/API files. Do not blindly delete technical identifiers or route error codes. Clean only rendered public copy, metadata, aria copy, visible CTA labels, FAQ copy, and user-facing messages.

Files needing careful review before public checkout launch:

- `app/layout.tsx`
- `app/field-service-automation/page.tsx`
- `app/safety/page.tsx`
- `app/blog/posts.ts`
- `components/cta-section.tsx`
- `components/features-section.tsx`
- `components/problem-solution-section.tsx`
- `components/what-stanley-fixes-section.tsx`
- `components/ai-team-dealership-section.tsx`
- `components/ai-team-section.tsx`
- `components/testimonials-section.tsx`
- `components/roi-calculator-section.tsx`

## Pricing page copy requirements

The pricing page should make these points plainly:

1. Workflow Audit is the diagnostic entry point when a buyer is not ready to choose a package.
2. Cashflow Control System is for finished work, billing checks, invoice follow-up, and collected cash.
3. Repeat Revenue System is for past customers, review requests, referrals, missed calls, and repeat work.
4. Both Systems is for buyers who need both cashflow control and repeat revenue work.
5. Checkout starts onboarding. It is not a promise that every requested workflow will be built.
6. Stanley Systems can refund, redirect, or pause if fit, access, or scope does not work.
7. Contact remains available for questions, but purchase-intent CTAs should not default to the generic contact form.

## Calculator handoff copy requirements

Calculator handoff copy should use money leak language without implying exact recovery.

Allowed:

- Your result points to a place worth checking.
- This estimate helps choose the first system to review.
- Stanley Systems uses the Workflow Audit or onboarding to confirm the right fix.

Avoid:

- You will recover this amount.
- This system will generate the shown revenue.
- Guaranteed lift, guaranteed recovery, or guaranteed ROI.

## Verification requirements for implementation workers

After copy changes, run a source scan over `app`, `components`, and `lib` for these public-copy blockers:

- Customer Revenue System
- Follow-Up System
- Cash Collection System
- Cash Flow Collection System
- Twilio
- AI headlines
- backend jargon in rendered copy
- guaranteed revenue
- guaranteed customers
- Google ranking
- unlimited custom development
- 5-star Google reviews

Expected outcome:

- No banned package names appear in rendered public copy.
- Any remaining snake_case ids are internal only and not user-facing.
- Any remaining AI/backend terms are either non-rendered code identifiers, route error codes, or explicit legacy demo surfaces outside the checkout rework scope.
- Public copy uses Stanley Systems and approved package names exactly.

## Codex handoff summary

Before implementing Stripe checkout or package page changes, Codex should read this file and apply these rules to every touched public text surface. If a required Payment Link URL from Jaden's brief is unavailable in the task context, block rather than inventing a URL.