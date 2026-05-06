# Stanley Systems Skeptical-Buyer Redesign North Star

## Operating rule

Stanley H runs this redesign loop until the site is fixed or a real blocker appears. Do not ask Jaden for approval unless something violates scope, safety, pricing/legal truth, secrets, protected systems, or production risk. After build/QA/commit/push pass, stop and ask for deploy approval.

## North star

The site must convert a skeptical trade contractor who saw an ad/video and is checking from a phone.

They need to believe four things fast:

1. This is for my kind of business.
2. This names a real money leak I probably have.
3. I understand how Stanley fixes it.
4. The money upside is obvious enough to take action.

If a section is attractive but does not help one of those four beliefs, cut it or rewrite it.

## Page jobs

- Homepage: earn trust fast, diagnose the money leaks, explain the two systems, route the buyer to the right system page.
- Cashflow Control page: sell the cost of slow collection, office drag, staff payroll waste, and the mechanism for getting finished work to cash faster.
- Repeat Revenue page: sell the repeat-revenue flywheel: reviews, referrals, Google visibility, missed-call recovery, reactivation, and the cycle repeating.
- Pricing page: make offers easy to compare on mobile and route based on readiness.
- Calculator/result flow: diagnose and route to the correct next step.

## Mandatory site flow

1. Hero with one-sentence subtext max.
2. Marine shop proof immediately under hero.
3. Hidden-problem diagnostic that makes the owner think: “oh shit, that’s me.”
4. Two system paths: Cashflow Control System and Repeat Revenue System.
5. Mechanism visuals: before/after red-green and pipeline diagrams.
6. Proof/math with simple scenarios and minimal explanation.
7. Compact pricing preview / pricing page.
8. Objection handling / FAQ.
9. Final CTA.

## Copy rules

- Trade contractors do not read long paragraphs. Use short direct lines.
- Hero subtext is one sentence max.
- Big money ranges need as little explanation as possible.
- Use money language, not software language.
- Do not imply guaranteed outcomes.
- Scenario math must be framed as scenario/if/worth-checking, not promised result.
- Every claim must be truthful and commercially reasonable.

### Range rule

For numbers like `$50K-$300K`, use:

1. Big number.
2. Tiny explanation.
3. Clear action implication.

Example:

> `$50K-$300K may be sitting in customers you already paid to acquire.`
> Past buyers. Old estimates. Missed follow-up.

## Cashflow Control required messages

Cashflow Control must include:

- Late cash is growth money the business cannot use.
- Best competitors collect faster, reinvest faster, and outpace slow operators.
- Staff chasing billing/status/follow-up burns payroll and steals output from the business.
- Repeat admin work should not live in people’s heads or manual reminders.
- Stanley moves job-complete, invoice, follow-up, balance, and owner-visibility work into a repeatable system.

Approved direction:

> Late cash is growth money you cannot use. Your best competitors collect faster, reinvest faster, and outpace you while your cash sits in admin drag.

> Every hour your staff spends chasing billing is payroll not producing output. Stanley removes the repeat admin work a computer should handle.

## Repeat Revenue required messages

Repeat Revenue must not be only old-customer activation. It must sell the flywheel:

- Every good job should create the next one.
- Customer receives private 1-5 rating after a job.
- 1-3 star ratings go to managers before they become public problems.
- 4-5 star customers are routed toward Google reviews.
- Best customers are asked for referrals.
- More reviews/referrals improve trust and Google visibility.
- Past customers, old estimates, seasonal buyers, and dormant customers are reactivated.
- More inbound volume makes missed calls more expensive, so missed-call recovery turns them into follow-up and booked work.
- More customers create more reviews/referrals/visibility, and the cycle repeats.

Approved direction:

> Stanley turns completed jobs, happy customers, referrals, reviews, missed calls, and past buyers into a repeat revenue cycle.

## CTA routing rules

- Cold homepage CTAs go to system explanation pages, calculator, or pricing — not premature checkout.
- Homepage/package cards for Cashflow Control and Repeat Revenue go to their system pages.
- System explanation page CTAs go to checkout/onboarding.
- Calculator/result CTAs go to the recommended next step.
- Nav/footer must not link public users to `/dev` routes.
- No stale package names or old redirects.

## Section scorecard

Score each section 0-2:

- Buyer clarity: understood by a trade contractor in 5 seconds.
- Skeptic trust: reduces doubt instead of raising it.
- Money relevance: connects to revenue, cash, payroll drag, reviews, referrals, missed calls, or repeat work.
- Mechanism clarity: helps buyer explain how Stanley works.
- Mobile scan: understandable on phone without reading a paragraph.
- CTA logic: next click matches buyer readiness.
- Visual variety: feels meaningfully different from surrounding sections.

Pass criteria:

- At least 10/14.
- No 0 on Buyer clarity, CTA logic, or Mobile scan.

## Generic feature-grid ban

Generic icon grids are banned unless each item has:

- specific trade-business symptom
- specific business cost
- specific Stanley fix

No filler cards like “automated follow-up,” “smart reminders,” or “better reporting” without a business-cost explanation.

## QA gates

Each phase must pass before moving on:

- `npm run build` or scoped build check where practical.
- Playwright desktop screenshot.
- Playwright mobile screenshot at ~390px.
- No horizontal overflow.
- CTA route checks for changed/related CTAs.
- Required phrases/mechanisms present.
- Stale public package names absent from mounted public source/live HTML.
- Screenshot evidence tied to current branch/build.

## Valid stopping states

- READY_FOR_DEPLOY_APPROVAL: all implementation, QA, commit, and push are complete; deploy approval is needed.
- DONE_DEPLOYED: deploy approved, PM2 restarted, live verification passed.
- BLOCKED_REAL: credentials, build, protected paths, production risk, legal/pricing truth, or repo corruption prevents safe continuation.
- ROLLED_BACK: deploy failed live verification and rollback completed.

Invalid stopping reasons:

- “Homepage done.”
- “Looks better.”
- “Need your thoughts.”
- “QA mostly passed.”
- “Mobile probably fine.”
- “Rest can be future work.”
