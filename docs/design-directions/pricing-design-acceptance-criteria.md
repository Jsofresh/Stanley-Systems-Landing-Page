# Pricing design direction and visual acceptance criteria

Date: 2026-05-04
Status: accepted design direction for downstream implementation
Scope: Pricing section rebuild only. This document is not an implementation patch.

## Jaden approval update, 2026-05-04

Jaden approved the current public naming correction: Workflow Audit, Cash Flow Collection System, Repeat Revenue System, Cash Flow Collection System, Finished Work to Collected Cash, and Repeat Revenue System.

Jaden rejected adding a complimentary system to the guarantee. Do not promise a no-cost Repeat Revenue System or any no-cost system as the guarantee.

Approved commercial incentive: if the client buys a monthly plan after the Workflow Audit, the Workflow Audit price comes off the monthly plan. If the client buys a yearly plan after the Workflow Audit, double the Workflow Audit price comes off the yearly plan. Do not stack this credit with a refunded audit. Do not invent dollar amounts until Jaden provides approved prices.

## Source inputs

- Pricing architecture decision record: `docs/decision-records/pricing-architecture.md`
- Current pricing implementation surface: `components/pricing-section.tsx`
- Jaden direction in Kanban task `t_68288073`

## Design north star

The pricing section should feel like a crisp, premium decision page for a practical service business owner.

It should not feel like a SaaS pricing table, fake analytics dashboard, AI product page, or dark-mode landing page insert.

The user should understand three things quickly:

1. The Workflow Audit is the paid first step.
2. The audit checks where money is leaking before Stanley Systems recommends a build.
3. The two post-audit paths are Cash Flow Collection System and Repeat Revenue System.

## Locked offer rules

These rules come from `docs/decision-records/pricing-architecture.md` and must survive the visual redesign.

- Workflow Audit is the paid diagnostic front door.
- Workflow Audit is not Package 1.
- Workflow Audit is not a free consultation.
- Public package names for this pricing pass are Cash Flow Collection System and Repeat Revenue System.
- Do not reintroduce Cash Flow Collection System or Repeat Revenue System in this pricing pass unless Jaden explicitly reverses the naming correction.
- Smart Re-Engagement is a module inside Repeat Revenue System, not the full package.
- No package prices are displayed for Cash Flow Collection System or Repeat Revenue System in v1.
- Workflow Audit can be described as paid, but a dollar amount appears only if Jaden provides an explicit approved current fee.
- No old price tests appear: `$297`, `$147`, `$97`, `$397`, `$697`, `$897`.
- No self-serve checkout is implied for packages, guarantee qualification, audit credit, or implementation work.
- Primary audit CTAs route to `/contact` unless Jaden explicitly approves a payment flow.

## Global visual acceptance criteria

The redesign passes only if all of this is true:

- Background is off-white or warm white, not dark navy, black, gray SaaS chrome, orange, amber, yellow, gold, or sepia.
- Cards are white or near-white with rounded corners, light borders, and soft shadows.
- Hierarchy uses deep navy for headlines, body copy, dividers, and primary button text where applicable.
- Stanley green is used for pricing emphasis, confirmation states, checklist icons, selected states, and primary CTA fill.
- Layout is centered, calm, and crisp. The section should breathe.
- No section eyebrow or kicker labels appear above headings.
- No fake dashboard visuals, graph panels, CRM screenshots, terminal panels, automation canvases, generic SaaS icon stacks, robots, people, or AI metaphors.
- No cramped comparison tables.
- No zoom, scale, transform, or shrink hacks to make desktop content fit mobile.
- Mobile uses real reflow and stacking, not a compressed desktop layout.
- All public copy says Stanley Systems, not Stanley.
- Copy stays practical and owner-visible: money leaks, finished work, collected cash, past customers, reviews, referrals, missed calls, office follow-up.
- Visual emphasis exists only where it explains the decision. More visual weight is not automatically better.

## Component acceptance criteria

### PricingHero

Role: Introduce the pricing decision model and make the Workflow Audit the first step.

Must include:

- Centered headline with a clear money-first idea.
- One short paragraph explaining that Stanley Systems starts with a paid Workflow Audit to find where money is leaking before recommending a build.
- Primary CTA to `/contact` using an approved audit label such as `Book the Workflow Audit`, `Apply for the Workflow Audit`, or `Find My Money Leaks`.
- Secondary helper line that removes confusion: `The audit comes first. Build work is recommended only after the leak is clear.`
- Optional compact guarantee line, but not as the only guarantee placement.

Visual criteria:

- Off-white section background.
- White hero card or very light contained panel.
- Deep navy headline.
- Stanley green CTA.
- Clear vertical rhythm between headline, paragraph, CTA, and helper line.
- No eyebrow label above the headline.

Reject if:

- It says or implies free consultation.
- It opens with package selection before the audit.
- It looks like a generic SaaS pricing hero.
- It uses dark-mode hero styling.

### WorkflowAuditCard

Role: Explain what the paid audit checks and what the buyer receives.

Must include:

- A clear title: `Workflow Audit`.
- A paid-audit statement without a dollar amount unless Jaden provides an approved fee.
- Checklist rows for audit outputs, not vague benefits.
- Required audit checks:
  - Finished work to collected cash.
  - Past customers, reviews, referrals, and missed calls.
  - Office handoffs where work gets stuck.
  - Where Stanley Systems can or cannot fix the leak.
- A decision helper line: `You leave with a clear money leak map and a recommendation: Cash Flow Collection System, Repeat Revenue System, both, or neither.`
- CTA to `/contact`.

Visual criteria:

- White rounded card.
- Soft shadow, light border.
- Checklist rows with green check or dot treatment.
- No dense table.
- Audit card should feel like the anchor offer, not a footnote beside packages.

Reject if:

- It presents the audit as a discovery call.
- It makes the audit visually smaller than the package cards.
- It includes unapproved price numbers.
- It hides the diagnostic outcome behind generic copy.

### AuditCreditPanel

Role: Handle guarantee and optional audit-credit language without overpromising.

Must include:

- The guarantee copy visibly and confidently:
  `If Stanley Systems cannot find one clear money leak we can fix, you get your Workflow Audit fee back.`
- Compact qualification language nearby.
- Guardrail text that makes clear the refund applies to the Workflow Audit fee only and no no-cost system is included.
- Audit credit is approved for this pass: the Workflow Audit price comes off the monthly plan if the client buys monthly, and double the Workflow Audit price comes off the yearly plan if the client buys yearly. Do not stack this with the refund guarantee.

Visual criteria:

- White or very pale green panel.
- Green accent for the guarantee, not orange or yellow.
- Fine print remains readable.
- The guarantee should be easy to notice, but not look like a loud coupon banner.

Reject if:

- It implies automatic refund plus build credit stacking.
- It promises guaranteed revenue, profit, customers, reviews, referrals, or call volume.
- It hides qualification language so deeply that the promise feels misleading.
- It weakens the guarantee into a tiny footnote.

### MonthlyPlans

Role: If retained, show service cadence or decision paths without turning the section into self-serve checkout.

Must include:

- No package prices unless an approved pricing brief exists.
- If monthly framing appears, it should describe the type of ongoing office-side support or next-step path, not a buy-now subscription grid.
- Clear labels that separate Workflow Audit from post-audit build work.
- A helper line explaining that build scope is recommended after the audit.

Visual criteria:

- White cards with calm hierarchy.
- Centered or balanced card grid.
- Green selected or recommended state only if it clarifies the next step.
- No cramped columns.
- No toggle that implies checkout selection if checkout is not approved.

Reject if:

- It creates package tiers that Jaden did not approve.
- It shows old price tests.
- It implies visitors can pick a package and start implementation immediately.

### YearlyPlans

Role: If retained, support the same decision model without implying annual contracts or self-serve purchase.

Must include:

- No annual package price display unless explicitly approved.
- No pressure framing around annual commitment.
- If a yearly view exists, it must be a content grouping or savings explanation approved by Jaden, not a fabricated pricing model.
- CTA still points back to the Workflow Audit path.

Visual criteria:

- Same visual system as MonthlyPlans.
- No aggressive toggle styling.
- No sale badge, discount ribbon, orange urgency marker, or SaaS tier table treatment.

Reject if:

- It invents annual contracts.
- It says cancel anytime unless that commercial term is verified and approved for the specific offer shown.
- It competes with Workflow Audit as the first step.

### PlanCard

Role: Reusable card for Workflow Audit, Cash Flow Collection System, Repeat Revenue System, or decision helper content.

Must include:

- A single clear title.
- One practical promise line.
- Checklist rows.
- A decision helper line at the bottom.
- CTA behavior appropriate to the card:
  - Workflow Audit: primary CTA to `/contact`.
  - Cash Flow Collection System and Repeat Revenue System: CTA should route to the audit or contact path, not checkout.
- No standalone package price unless explicitly approved.

Visual criteria:

- White card.
- Rounded corners.
- Soft shadow.
- Deep navy title.
- Green accent for selected state, check icons, and CTA.
- Enough padding for a premium feel.
- Cards should align cleanly on desktop and stack cleanly on mobile.

Reject if:

- It uses dense pricing-table rows.
- It buries the helper line.
- It uses orange, amber, yellow, dark-mode panels, or fake dashboard visuals.
- It makes the package cards feel like ecommerce checkout cards.

### PricingFAQ

Role: Remove buyer confusion and protect the offer boundaries.

Must include answers for:

- Is the Workflow Audit required first?
- Is the Workflow Audit free?
- What happens after the audit?
- Do I buy Cash Flow Collection System or Repeat Revenue System directly from this page?
- What does the guarantee mean?
- Who qualifies for the guarantee?
- Can Stanley Systems work inside my current tools?

Copy criteria:

- Plain English.
- Short answers.
- No AI-first or automation-first language.
- No legal overexplaining in the main answer. Link or route longer terms as needed.
- Use the approved public names: Workflow Audit, Cash Flow Collection System, Repeat Revenue System.

Visual criteria:

- White FAQ cards or accordion rows on off-white background.
- Deep navy question text.
- Green active state or icon.
- Clear row separation.

Reject if:

- It reintroduces stale offer names.
- It makes the guarantee sound optional or hidden.
- It implies self-serve package checkout.

### PricingCTA

Role: Close the section by bringing the user back to the Workflow Audit.

Must include:

- A direct headline that ties back to money leaks or cash stuck in the office.
- Primary CTA to `/contact`.
- A final helper line such as: `Start with the audit. Stanley Systems will show you which money leak is worth fixing first.`
- Optional secondary CTA to calculator only if the calculator handoff is intentional and does not compete with the audit path.

Visual criteria:

- Centered white or pale green CTA card.
- Deep navy headline.
- Stanley green primary button.
- No dark-mode final band unless Jaden explicitly approves.
- No visual noise competing with the CTA.

Reject if:

- It says `Get Started`, `Learn More`, or `Book a Consultation` as the primary CTA.
- It sends users to a package purchase path.
- It adds multiple equal-weight CTAs.

## Desktop behavior

Desktop must pass these criteria:

- Max width keeps the section readable and centered.
- Hero, audit card, guarantee panel, package decision area, FAQ, and final CTA have a clear visual order.
- Cards align without creating a cramped SaaS pricing grid.
- Workflow Audit receives the strongest visual priority.
- Cash Flow Collection System and Repeat Revenue System appear as post-audit paths, not competing front-door offers.
- CTA hierarchy is obvious.
- No horizontal overflow at common desktop widths.
- No layout relies on CSS scale or zoom to fit.

Recommended desktop order:

1. PricingHero
2. WorkflowAuditCard
3. AuditCreditPanel
4. Post-audit path cards using PlanCard
5. MonthlyPlans or YearlyPlans only if approved and framed as non-checkout decision support
6. PricingFAQ
7. PricingCTA

## Mobile behavior

Mobile must pass these criteria:

- Content stacks naturally.
- The primary CTA is reachable without scanning a dense table.
- Checklist rows remain readable.
- Cards do not shrink into two-column mobile grids.
- No horizontal scroll.
- No clipped shadows, labels, or CTA text.
- Package cards appear after the audit explanation.
- FAQ rows have adequate tap targets.
- Mobile spacing stays premium but not bloated.
- No zoom, scale, or transform hacks.

Recommended mobile order:

1. PricingHero copy and primary CTA
2. WorkflowAuditCard
3. Guarantee in AuditCreditPanel
4. Cash Flow Collection System path card
5. Repeat Revenue System path card
6. FAQ
7. Final PricingCTA

## Copy acceptance criteria

Pass if:

- The first read makes clear that the audit comes first.
- Money-first language appears above process language.
- The buyer can tell what each path fixes:
  - Cash Flow Collection System: finished work to collected cash.
  - Repeat Revenue System: more money from customers already earned.
- Public copy avoids AI, AI-powered, automation as the hero, optimize, streamline, transform, empower, innovative, cutting-edge, efficiency, synergy, ecosystem, leverage, scalable solution, and digital transformation.
- Public copy does not mention Hermes, Codex, Stanley H, OpenClaw, n8n, QBO internals, HCP internals, Telegram, secrets, or private implementation tools.

Reject if:

- The section reads like a software vendor pricing table.
- The section reads like a consulting discovery-call page.
- The section uses vague benefits without tying them to money, time, billing speed, follow-up, or owner relief.

## Visual QA checklist

A reviewer should mark the implementation failed if any item below is true:

- Orange, amber, yellow, gold, or sepia appears as a major design color.
- A dark-mode pricing section appears without explicit approval.
- Any section eyebrow or kicker label appears.
- Any fake dashboard, CRM mockup, analytics graph, automation canvas, or generic SaaS visual appears.
- Any unapproved price number appears.
- Any package price appears for Cash Flow Collection System or Repeat Revenue System.
- Workflow Audit appears as free, optional, or secondary.
- Cash Flow Collection System or Repeat Revenue System appears purchasable directly from the page.
- Old public naming appears: Cash Flow Collection System or Repeat Revenue System.
- Smart Re-Engagement appears as the full package instead of one Repeat Revenue System module.
- CTA hierarchy is unclear.
- Mobile layout uses shrink, scale, zoom, or compressed desktop tables.
- The guarantee is missing, hidden, or weakened.
- Qualification language is missing near the guarantee.
- Public copy makes AI or automation the hero.

## Final approval standard

This is a Jaden taste-gate section. Passing technical layout checks is not enough.

The implementation is acceptable only if it feels premium, centered, simple, and practical, with white rounded cards, soft shadows, deep navy hierarchy, Stanley green accents, clear checklist rows, and direct decision-helper lines.
