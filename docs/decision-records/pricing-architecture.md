# Pricing architecture decision record

Date: 2026-05-04
Status: accepted for v1 implementation planning
Scope: Stanley Systems public website pricing and offer flow

## Jaden approval update, 2026-05-04

Jaden approved the current public naming correction: Workflow Audit, Cash Flow Collection System, Repeat Revenue System, Cash Flow Collection System, Finished Work to Collected Cash, and Repeat Revenue System.

Jaden rejected adding a complimentary system to the guarantee. Do not promise a no-cost Repeat Revenue System or any no-cost system as the guarantee.

Approved commercial incentive: if the client buys a monthly plan after the Workflow Audit, the Workflow Audit price comes off the monthly plan. If the client buys a yearly plan after the Workflow Audit, double the Workflow Audit price comes off the yearly plan. Do not stack this credit with a refunded audit. Do not invent dollar amounts until Jaden provides approved prices.

## Inputs reviewed

- Parent discovery t_a395907c: current repo has no Stripe dependency, no payment environment variables, no checkout, success, or cancel routes, and Workflow Audit CTAs currently route to the application flow at `/contact`.
- Parent discovery t_ed4b2aac: current repo has no public legacy price strings found, no success or cancel pages, and CTAs are split across `/contact`, calculator, phone, mailto, and Calendly.
- Offer architecture: `/home/jaden/.openclaw/workspace/project/stanley-context/STANLEY-SYSTEMS-OFFER-ARCHITECTURE-AND-PACKAGE-1-V3.md`.
- Current Kanban correction from Stanley H: for this run, public naming is Cash Flow Collection System and Repeat Revenue System. Do not reintroduce Cash Flow Collection System as the public package name in this pricing pass, and do not treat Smart Re-Engagement as the full package.

## Decision

### 1. Front-door offer

The Workflow Audit is the paid front-door offer.

It is not Package 1, not a free consultation, and not a generic contact form. It is the diagnostic first step that finds where money is leaking through office workflow, then decides whether the prospect should move into a build path.

Public language should make clear that the Workflow Audit checks both money paths:

1. Finished work to collected cash.
2. Past customers, reviews, referrals, and missed calls.

### 2. Post-audit build paths

The post-audit build paths for this pricing pass are:

1. Cash Flow Collection System.
   - Meaning: money already earned, stuck before collection.
   - Short visual label: Cash Flow Collection System.
   - Larger headline when useful: Finished Work to Collected Cash.
   - Promise: turn finished work into collected cash faster.

2. Repeat Revenue System.
   - Visual or section name: Repeat Revenue System.
   - Promise: get more money from the customers already earned.
   - Modules stay: Smart Re-Engagement, Review Booster, Referral Engine, Call Catcher.
   - Smart Re-Engagement is one module, not the full package.

Note: the V3 offer file and repo AGENTS.md still mention Cash Flow Collection System and Repeat Revenue System. For this Kanban run, the explicit Stanley H correction overrides those names for the pricing pass. Downstream implementation should not mix both naming sets on public surfaces.

### 3. Public price display rules

No public package prices should be shown for Cash Flow Collection System or Repeat Revenue System in v1.

Do not publish old price tests such as $297, $147, $97, $397, $697, or $897 unless Jaden provides a new explicit current pricing brief.

For the Workflow Audit, v1 may say it is paid. A dollar amount should only be shown if Jaden explicitly approves the current audit fee. If no approved fee is supplied, use paid-audit language without a number and route to the application flow.

### 4. Audit credit and guarantee placement

The Workflow Audit guarantee should be visible near the Workflow Audit explanation and repeated or linked near the terms language.

Use the guarantee as a selling point, not a quiet footnote:

"If Stanley Systems cannot find one clear money leak we can fix, you get your Workflow Audit fee back."

Qualification language belongs nearby in compact fine print or linked terms. It should protect the offer without weakening the public promise.

Guardrails:

- The money-back portion applies only to the Workflow Audit fee.
- Do not offer or imply a no-cost Repeat Revenue System as part of the guarantee.
- The commercial incentive is audit-fee credit toward a later approved plan, not a no-cost system.
- Do not promise unlimited custom development.
- Do not promise guaranteed revenue, profit, customers, reviews, referrals, or call volume.

If an audit-credit concept is used, it should be framed as an audit fee credit toward a post-audit build only when Jaden approves that commercial term. Do not imply both a refund guarantee and a build credit stack automatically unless that is explicitly approved.

### 5. CTA labels

Primary Workflow Audit CTAs should stay money-first and specific.

Approved CTA labels for v1:

- Book the Workflow Audit.
- Apply for the Workflow Audit.
- Find My Money Leaks.
- Get the Money Leak Map.
- Find the Cash Stuck in Your Office.
- Calculate Your Revenue Leak.

Avoid weak generic CTAs for pricing surfaces:

- Learn More.
- Get Started.
- Book a Consultation.

CTA destinations for v1:

- Main paid-audit CTAs route to `/contact` unless Jaden approves a payment flow.
- Calculator CTAs route to `/invoicing-delay-cash-flow-calculator` or the paid calculator path when intentionally used.
- Phone, mailto, and Calendly can remain secondary fallback or post-submit actions, but they should not compete with the primary Workflow Audit path.

### 6. Calculator handoff

The calculator is a problem-awareness and lead-capture tool, not a checkout replacement.

Calculator result screens should hand off to the Workflow Audit by making the leak concrete first, then offering the audit as the next diagnostic step.

Recommended flow:

1. User sees the estimated revenue or cash timing leak.
2. User can request the full breakdown and checklist.
3. If the issue looks serious, the page presents the Workflow Audit as the next step.
4. The handoff routes to `/contact` in v1 unless Jaden approves a direct payment flow.

Public result-screen naming should use Customer Revenue leak/math when the calculator is about customer revenue, and cash timing or invoicing delay language when the calculator is about finished work to collected cash. Do not label calculator results as the Repeat Revenue System itself.

### 7. Not self-serve checkout in v1

The following must not be self-serve checkout in v1:

- Cash Flow Collection System purchase.
- Repeat Revenue System purchase.
- Custom implementation packages.
- Guarantees, free-system eligibility, or guarantee qualification.
- Audit-credit application toward a build.
- Any package selection that implies a client relationship, implementation start, access approval, data review, or scoped build commitment.

If a payment flow is added later, it should be limited to the paid Workflow Audit only, with clear success and cancel pages, confirmation copy, terms acknowledgement, and no automatic promise of implementation.

## Acceptance criteria for downstream implementation

1. Workflow Audit is presented as the paid diagnostic front door across pricing, hero, contact, calculator handoff, and final CTA surfaces.
2. Public package naming is consistent for this pass: Cash Flow Collection System and Repeat Revenue System. No public mix with Cash Flow Collection System or Repeat Revenue System unless Jaden reverses the correction.
3. Smart Re-Engagement appears only as a module inside Repeat Revenue System.
4. Cash Flow Collection System is framed as money already earned but stuck before collection.
5. Repeat Revenue System is framed as revenue from customers already earned, using Repeat Revenue System when a visual section label is needed.
6. No old public price tests are introduced.
7. No package prices are displayed in v1.
8. Workflow Audit price is displayed only if Jaden gives an explicit approved current fee.
9. Guarantee copy is visible near the audit offer and tied to qualification language without hiding or weakening it.
10. Guarantee scope matches terms: Workflow Audit fee refund for qualified businesses only. No no-cost system is included.
11. CTA labels are money-first and route primary audit intent to `/contact` unless an approved payment flow exists.
12. Calculator results hand off to the Workflow Audit after showing the leak, and do not imply checkout or package purchase.
13. No self-serve checkout is added for Cash Flow Collection System, Repeat Revenue System, custom builds, guarantee eligibility, non-approved credit variants, or implementation commitments.
14. If direct payment is later approved, it is for Workflow Audit only and requires success and cancel routes before launch.
15. Public copy uses Stanley Systems, never standalone Stanley.
16. Public copy avoids AI-first, automation-first, and generic SaaS language.
