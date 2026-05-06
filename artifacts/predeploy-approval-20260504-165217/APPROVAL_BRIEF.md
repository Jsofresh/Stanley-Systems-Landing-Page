# Stanley Systems pre-deploy approval packet

Prepared: 2026-05-04 16:52 local VPS time.
Task: t_dd0c81ae.
Scope: approval packet only. No deploy. No PM2 restart.

## Approval question

Jaden, approve deploying the current local Stanley Systems website changes to production with the standard command path?

If approved, the deploy action should be:
1. `npm run build`
2. `pm2 restart stanley-landing --update-env`
3. live verification on `https://stanley-systems.com/`, `/pricing`, and `/contact`

## What would ship

### Pricing page and offer architecture

New public route:
- `app/pricing/page.tsx`

New pricing implementation:
- `components/pricing/PricingPage.tsx`
- `components/pricing/PricingHero.tsx`
- `components/pricing/WorkflowAuditCard.tsx`
- `components/pricing/AuditCreditPanel.tsx`
- `components/pricing/CalculatorHandoffPanel.tsx`
- `components/pricing/PlanCard.tsx`
- `components/pricing/PricingFAQ.tsx`
- `components/pricing/PricingCTA.tsx`
- `components/pricing/index.ts`
- `lib/pricing/offers.ts`

Pricing behavior:
- Workflow Audit is the paid first step.
- Cash Flow Collection System and Repeat Revenue System show as post-audit build paths, not self-serve packages.
- Public package prices remain unset. `priceDisplay: null` and `priceApproved: false` remain in offer data.
- No Stripe checkout, success route, cancel route, or payment path is added.
- CTAs route to `/contact`.
- Audit credit copy is present: Workflow Audit price comes off monthly, double the Workflow Audit price comes off yearly.
- Calculator handoff params render on `/pricing` when the calculator sends context.

### Homepage conversion flow

Touched homepage files:
- `app/page.tsx`
- `components/best-fit-section.tsx`
- `components/final-cta-section.tsx`
- `components/founder-section.tsx`
- `app/who-stanley-systems-helps/page.tsx`

Homepage changes:
- Adds a new Best Fit section before the final CTA.
- Reorders homepage so Proof Strip comes before Pricing, then Trust, FAQ, Best Fit, Final CTA, Founder.
- Replaces the old final CTA with: “Almost nothing to do. Costs everything to not do.”
- Keeps the final CTA pointed at the Workflow Audit and `/contact`.
- Replaces the old founder section with a founder-led diagnosis and hands-on build credibility block.
- Reuses the Best Fit section on `/who-stanley-systems-helps`.

### Calculator and pricing handoff

Touched calculator-related files:
- `app/invoicing-delay-cash-flow-calculator/calculator-client.tsx`
- `app/invoicing-delay-cash-flow-calculator/page.tsx`
- `app/invoicing-delay-cash-flow-calculator/paid-calculator-client.tsx`
- `components/calculator-path-section.tsx`
- `components/pricing-section.tsx`
- `components/visual-primitives/RevenueLoop.tsx`

Calculator and homepage pricing changes:
- Calculator result flow was revised heavily.
- Result screen points toward the pricing path with contextual leak estimates.
- Homepage pricing section was rebuilt around current approved offers and visual-kit assets.
- Old test offer prices are absent from rendered routes checked.

### Naming and commercial-term cleanup

QA and rendered checks confirm, for `/`, `/pricing` with calculator params, and `/contact`:
- “Cash Flow Collection System” is not rendered.
- “Repeat Revenue System” is not rendered.
- No no-cost or free system guarantee is rendered.
- No Stripe or checkout language is rendered.
- No old test prices `$147`, `$297`, `$497`, or `$997` are rendered.
- No standalone “Stanley” is rendered after removing valid “Stanley Systems” occurrences.
- No em dash or en dash is rendered.
- No horizontal overflow at 390px mobile viewport.

Important nuance:
- Unmounted `/app/dev` previews and unmounted experiment components still contain old Repeat Revenue System labels. Parent QA explicitly treated those as non-public leftovers, not deploy blockers.
- Calculator dollar estimates such as `$120K` and `$10K` are business-impact estimates, not public package prices.

## Current dirty workspace inventory

The workspace is broadly dirty. This approval packet did not try to clean or collapse the whole repo.

Modified tracked files before this packet included 34 files, including:
- `app/about/page.tsx`
- `app/blog/page.tsx`
- `app/field-service-automation/page.tsx`
- `app/how-stanley-systems-works/page.tsx`
- `app/invoicing-delay-cash-flow-calculator/calculator-client.tsx`
- `app/invoicing-delay-cash-flow-calculator/page.tsx`
- `app/invoicing-delay-cash-flow-calculator/paid-calculator-client.tsx`
- `app/layout.tsx`
- `app/marine-service-automation/page.tsx`
- `app/missed-estimate-follow-up-for-service-businesses/page.tsx`
- `app/office-handoff-problems-in-field-service-businesses/page.tsx`
- `app/page.tsx`
- `app/service-business-billing-process-fix/page.tsx`
- `app/speed-up-invoicing-for-service-businesses/page.tsx`
- `app/stanley-systems-case-study/page.tsx`
- `app/terms-and-conditions/page.tsx`
- `app/who-stanley-systems-helps/page.tsx`
- `app/work-order-to-invoice-process-for-service-businesses/page.tsx`
- `components/calculator-path-section.tsx`
- `components/contact-section.tsx`
- `components/faq-section.tsx`
- `components/final-cta-section.tsx`
- `components/footer.tsx`
- `components/founder-section.tsx`
- `components/glassmorphism-nav.tsx`
- `components/how-it-works-section.tsx`
- `components/marine-example-section.tsx`
- `components/pricing-section.tsx`
- `components/problem-solution-map-section.tsx`
- `components/proof-strip-section.tsx`
- `components/reach-out-section.tsx`
- `components/testimonials-section.tsx`
- `components/visual-primitives/RevenueLoop.tsx`
- `components/visual-primitives/SectionShell.tsx`

Major untracked additions include:
- `app/pricing/`
- `components/pricing/`
- `lib/pricing/`
- `components/best-fit-section.tsx`
- `components/visual-kit/`
- `public/visual-kit/`
- `app/dev/` preview routes
- `components/sections/` experimental preview components
- `docs/` pricing and design-direction notes
- this approval packet under `artifacts/predeploy-approval-20260504-165217/`

Full exact inventory:
- `artifacts/predeploy-approval-20260504-165217/git-dirty-inventory.txt`

## Build and QA result

Fresh packet build:
- `npm run build`: passed.
- Next.js 14.2.25 compiled successfully.
- Project config skipped type validation.
- `/pricing` built as dynamic.

Parent QA t_e6b60bca passed:
- source rule checks passed
- `git diff --check` passed
- `npm run build` passed
- local HTTP smoke passed for `/`, `/pricing?source=calculator&recommended=both&annual_leak=$120K&monthly_leak=$10K`, and `/contact`
- Playwright 390px rendered smoke passed for no horizontal overflow and required naming/commercial checks

Packet screenshot/render checks:
- local preview used `127.0.0.1:3066`, not the production PM2 port
- routes returned 200
- no application error text
- no horizontal overflow at checked viewports
- local preview was stopped after screenshots

## Screenshots

Generated screenshots:
- `artifacts/predeploy-approval-20260504-165217/home-desktop-full.png`
- `artifacts/predeploy-approval-20260504-165217/home-mobile-full.png`
- `artifacts/predeploy-approval-20260504-165217/pricing-desktop-full.png`
- `artifacts/predeploy-approval-20260504-165217/pricing-mobile-full.png`
- `artifacts/predeploy-approval-20260504-165217/who-helps-mobile-full.png`

Check files:
- `artifacts/predeploy-approval-20260504-165217/screenshot-checks.json`
- `artifacts/predeploy-approval-20260504-165217/rendered-approval-checks.json`

## Remaining risks

- This is not live yet. No PM2 restart was performed and `stanley-systems.com` was not changed.
- The repo has a broad dirty workspace from multiple parent/pre-existing website and visual-kit tasks. Deploying current local code would ship all current source changes unless a release worker narrows or checkpoints the exact release scope first.
- Unmounted internal preview/dev routes still contain old experimental labels. They were excluded by QA because public mounted routes passed.
- Build output says type validation is skipped by project config. That is baseline project behavior, not a new approval-packet change.

## My recommendation

Approve deploy if you are comfortable shipping the new `/pricing` route and the homepage best-fit/final-CTA/founder sequence together.

Do not approve if you want one more human taste pass on the homepage screenshots first, because the deploy would publish both the pricing page and the homepage conversion changes together.
