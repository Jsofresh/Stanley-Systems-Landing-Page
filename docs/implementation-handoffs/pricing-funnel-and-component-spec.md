# Pricing funnel and component implementation handoff

Date: 2026-05-04
Status: build-ready spec, no code implemented
Scope: Stanley Systems public website pricing funnel, pricing page components, calculator handoff, Workflow Audit checkout/contact path, and post-audit system selection.

## Jaden approval update, 2026-05-04

Jaden approved the current public naming correction: Workflow Audit, Cash Flow Collection System, Repeat Revenue System, Cash Flow Collection System, Finished Work to Collected Cash, and Repeat Revenue System.

Jaden rejected adding a complimentary system to the guarantee. Do not promise a no-cost Repeat Revenue System or any no-cost system as the guarantee.

Approved commercial incentive: if the client buys a monthly plan after the Workflow Audit, the Workflow Audit price comes off the monthly plan. If the client buys a yearly plan after the Workflow Audit, double the Workflow Audit price comes off the yearly plan. Do not stack this credit with a refunded audit. Do not invent dollar amounts until Jaden provides approved prices.

## Source inputs read

- `docs/decision-records/pricing-architecture.md`
- `docs/pricing-copy-conversion-direction.md`
- `docs/design-directions/pricing-design-acceptance-criteria.md`
- `docs/architecture/workflow-audit-stripe-checkout-v1.md`
- `/home/jaden/.hermes/workspaces/stanley-systems/context/source-md/00_START_HERE.md`
- `/home/jaden/.hermes/workspaces/stanley-systems/context/source-md/01_CORE_FOUNDATION.md`
- `/home/jaden/.hermes/workspaces/stanley-systems/context/source-md/02_WRITING_AND_LANGUAGE_RULES.md`
- `/home/jaden/.hermes/workspaces/stanley-systems/context/source-md/03_BUSINESS_AND_GTM_STATE.md`
- `/home/jaden/.openclaw/workspace/project/stanley-context/STANLEY-SYSTEMS-OFFER-ARCHITECTURE-AND-PACKAGE-1-V3.md`

## Repo surfaces found

Current homepage composition:

- `app/page.tsx`
  - Imports and renders `GlassmorphismNav`, `HeroSection`, `CalculatorPathSection`, `HowItWorksSection`, `ProofStripSection`, `PricingSection`, `FAQSection`, `FinalCTASection`, `Footer`, and `MobileStickyCTA`.
  - Current pricing/system area is a homepage section, not a standalone pricing page.

Current CTA and navigation surfaces:

- `components/glassmorphism-nav.tsx`
  - Navigation currently includes `About`, `Calculator`, `Systems`, `Who we help`, `Proof`, and `Blog`.
  - Primary nav CTA routes to `/contact` and labels it `Workflow Audit`.
- `components/cta-link.tsx`
  - Tracks CTA clicks through `stanley:cta-click` and `gtag("event", "cta_click", payload)`.
  - Current `CTAKind` values are `book_meeting`, `call_front_desk`, `case_study`, `internal_page`, `calculator`, and `systems`.
- `components/final-cta-section.tsx`
  - Final homepage CTA routes to `/contact` with `Book the Workflow Audit`.
- `components/contact-section.tsx`
  - Contact form is already framed as the paid Workflow Audit path.
  - Form posts to `/api/contact`.
- `app/contact/page.tsx`
  - Page headline is `Apply for the Workflow Audit.`

Current pricing/system implementation:

- `components/pricing-section.tsx`
  - Current exported component is `PricingSection` but it functions as the homepage `systems` section.
  - Current internal components include `SectionHeader`, `SystemCTACluster`, `CashCollectionSystemSection`, `CashflowPathCard`, `SystemResultCard`, `FollowUpSystemSection`, `FollowUpImpactCard`, `FollowUpModuleGrid`, `FollowUpModuleCard`, and `FollowUpCTACluster`.
  - Current repo public package names are mixed in at least one visible place: `Repeat Revenue System` appears in the calculator client, while this file uses `Repeat Revenue System`. Downstream implementation must standardize the pricing pass names.

Current calculator surfaces:

- `components/calculator-path-section.tsx`
  - Homepage calculator preview routes primary CTA to `/invoicing-delay-cash-flow-calculator`.
  - Secondary CTA routes to `/contact`.
  - Current copy correctly introduces `Cash Flow Collection System` and `Repeat Revenue System`.
- `app/invoicing-delay-cash-flow-calculator/page.tsx`
  - Renders `InvoicingDelayCalculatorClient`.
- `app/invoicing-delay-cash-flow-calculator/calculator-client.tsx`
  - Result step displays annual range first and monthly range second.
  - Result step has a `details` block for exact math notes.
  - CTA step routes to `/contact` and phone.
  - One visible stale name exists around lines 504 to 508: `Repeat Revenue System:` should become `Repeat Revenue System:` for this pricing pass.
  - CTA step line around 844 also says `Customer Revenue brings back customers you already earned`; this should become `Repeat Revenue System brings back customers you already earned`.
- `app/invoicing-delay-cash-flow-calculator/paid/page.tsx`
- `app/invoicing-delay-cash-flow-calculator/paid-calculator-client.tsx`
  - Existing older paid calculator flow posts to `/api/send-breakdown`.
  - Do not wire this older paid calculator into the new Workflow Audit checkout unless Jaden explicitly wants it revived.

Current API and payment state:

- `app/api/contact/route.ts` exists.
- `app/api/send-breakdown/route.ts` exists.
- No `app/api/checkout/workflow-audit/route.ts` found.
- No `app/checkout/success/page.tsx` found.
- No `app/checkout/cancel/page.tsx` found.
- `package.json` has no `stripe` dependency in the discovered dependency list.

## Locked offer rules for implementation

1. Workflow Audit is the paid diagnostic front door.
2. Workflow Audit is not Package 1.
3. Workflow Audit is not a free consultation.
4. Public package names for this pricing pass are:
   - Workflow Audit
   - Cash Flow Collection System
   - Repeat Revenue System
5. Do not mix in `Cash Flow Collection System` or `Repeat Revenue System` on public pricing surfaces during this pass unless Jaden reverses the current naming correction.
6. Smart Re-Engagement is a module inside Repeat Revenue System, not the full package.
7. Do not show package prices for Cash Flow Collection System or Repeat Revenue System in v1.
8. Do not show a Workflow Audit dollar amount unless Jaden provides an explicit approved current audit fee.
9. Do not introduce old price tests: `$297`, `$147`, `$97`, `$397`, `$697`, `$897`.
10. Do not add self-serve checkout for Cash Flow Collection System, Repeat Revenue System, custom builds, guarantee eligibility, non-approved credit variants, or implementation commitments.
11. If checkout is implemented, it is for Workflow Audit only and must safely fall back to `/contact` when Stripe env is missing.
12. Do not mention Hermes, Codex, Stanley H, OpenClaw, n8n, QBO internals, HCP internals, secrets, or private implementation tools in public copy.

## Funnel architecture

### 1. Homepage to pricing

Goal: Move visitors from problem awareness into a dedicated pricing decision page without turning the homepage systems section into a full pricing table.

Recommended route:

- Create `app/pricing/page.tsx`.
- Add `/pricing` to `components/glassmorphism-nav.tsx` as `Pricing`.
- Keep the current nav `Systems` link if needed, but make pricing the destination for offer decision and Workflow Audit action.
- Update key homepage CTAs that currently send high-intent users straight to `/contact` so they can optionally route to `/pricing` where the paid audit is explained first.

Homepage CTA routing recommendation:

- Hero primary CTA: `/pricing`, label `Find My Money Leaks` or `Apply for the Workflow Audit`.
- Hero secondary CTA, if present: `/invoicing-delay-cash-flow-calculator`, label `Calculate Your Revenue Leak`.
- Calculator preview primary CTA: keep `/invoicing-delay-cash-flow-calculator`.
- Calculator preview secondary CTA: route to `/pricing`, label `See the Workflow Audit` or keep `/contact` if Jaden wants fewer steps.
- Systems section CTAs: route to `/pricing`, not checkout.
- Final CTA primary: `/pricing` or `/contact`. Prefer `/pricing` until checkout is approved because it explains the paid audit and guarantee first.
- Footer CTA: `/pricing` or `/contact`. Prefer `/pricing` for consistency.

Acceptance criteria:

- A visitor can reach `/pricing` from the homepage nav and at least one primary homepage CTA.
- Homepage still explains the two systems, but does not behave like package checkout.
- Homepage does not show unapproved prices.
- Homepage CTAs do not bypass the diagnostic explanation unless they intentionally go to `/contact` as the safe application path.

### 2. Calculator to recommended plan to pricing

Goal: Calculator result makes the leak visible, recommends the next diagnostic path, and passes compact context into pricing or checkout without implying package purchase.

Recommended calculator result behavior:

- Keep annual leak as the main result headline.
- Keep monthly leak as secondary context.
- Keep exact math collapsed in the existing `details` block.
- Add a recommendation object after result calculation:
  - `recommendedSystem`: `cash_collection_system`, `follow_up_system`, `both`, or `unknown`.
  - `recommendedPlan`: `cash_collection_path`, `follow_up_path`, `both_paths`, or `workflow_audit_only`.
  - `calculatorKind`: `customer_revenue` for the current combined revenue calculator unless split later.
  - `annualLeakEstimate`: rounded public range only.
  - `monthlyLeakEstimate`: rounded public range only.
- Result CTA should go to `/pricing` with safe query params, not raw calculator inputs.

Recommended URL shape:

```text
/pricing?source=calculator&recommended=both&annual_leak=120k-to-300k&monthly_leak=10k-to-25k
```

Rules:

- Query params use rounded display strings only.
- Do not send raw invoice values, customer counts, missed call counts, form answers, or private business details in the URL.
- Pricing page reads query params only for display-safe context and defaults to general Workflow Audit copy if params are absent or invalid.

Acceptance criteria:

- Calculator result never labels the result as `Repeat Revenue System checkout`.
- Calculator result uses `Customer Revenue leak` or `Customer Revenue math` only for the math category, not as the public package name.
- The recommended next step is always Workflow Audit.
- Pricing page can show a small contextual handoff such as `Your calculator result points to both money paths. The Workflow Audit checks which leak is worth fixing first.`

### 3. Pricing to Workflow Audit checkout or contact

Goal: Pricing page converts qualified users into the paid Workflow Audit path while remaining safe if Stripe checkout is not configured.

Default v1 path before approved Stripe config:

- `PricingHero`, `WorkflowAuditCard`, `PlanCard`, `PricingFAQ`, and `PricingCTA` CTAs route to `/contact`.
- Button label: `Apply for the Workflow Audit` or `Book the Workflow Audit`.
- User-facing helper line: `The audit comes first. Build work is recommended only after the leak is clear.`

Checkout-enabled path after Jaden approves the current audit fee and Stripe env exists:

- Only Workflow Audit buttons use `CheckoutButton`.
- `CheckoutButton` posts to `app/api/checkout/workflow-audit/route.ts`.
- On success, server returns Stripe hosted checkout URL.
- On missing env or controlled failure, frontend routes to `/contact` and shows safe fallback copy.
- Cash Flow Collection System and Repeat Revenue System cards never use `CheckoutButton`.

Acceptance criteria:

- If checkout is not configured, all primary audit actions still work by sending users to `/contact`.
- If checkout is configured, only Workflow Audit can initiate Stripe checkout.
- No browser payload can choose product, price, amount, package, or Stripe price ID.
- No secret env var is exposed in client code.

### 4. Stripe success to intake and booking

Goal: After Workflow Audit payment, send the buyer to scheduling or intake without implying implementation has started.

Recommended route:

- Create `app/checkout/success/page.tsx` only when checkout implementation begins.
- Success page copy:
  - Confirm the Workflow Audit payment path completed.
  - Explain that Stanley Systems will use the Workflow Audit to find the clearest money leak before recommending a build path.
  - Make clear payment does not start Cash Flow Collection System, Repeat Revenue System, or custom implementation.
  - Primary next action: scheduling or intake.
  - If no scheduler route is approved, primary action routes to `/contact` with copy asking the buyer to complete any missing intake details.
  - Secondary fallback: `jaden@stanley-systems.com`.

Recommended later routes if Jaden approves them:

- `app/workflow-audit-intake/page.tsx` for post-payment intake.
- `app/book-workflow-audit/page.tsx` only if booking is separate from `/contact`.

Acceptance criteria:

- Success page renders even if Stripe session lookup fails.
- Success page never dumps raw Stripe objects or metadata.
- Success page never says implementation has started.
- Success page never says guarantee eligibility is approved.

### 5. Checkout cancel to pricing or contact

Goal: Recover the visitor without pressure.

Recommended route:

- Create `app/checkout/cancel/page.tsx` only when checkout implementation begins.
- Primary CTA returns to Workflow Audit checkout only when checkout env is configured.
- Safe fallback CTA routes to `/contact`.
- Secondary CTA can route to `/pricing` or the calculator.

Acceptance criteria:

- Cancel page never implies payment was completed.
- Cancel page never implies guarantee qualification.
- Cancel page keeps Workflow Audit as the diagnostic next step.

### 6. Post-audit to full system selection

Goal: Use the audit output to recommend Cash Flow Collection System, Repeat Revenue System, both, or neither. Do not make this a public self-serve package picker.

Recommended public pricing page behavior:

- Cash Flow Collection System and Repeat Revenue System appear as post-audit build paths.
- Their CTAs say `Start with the Workflow Audit` or `Use the Workflow Audit to choose this path`.
- No direct checkout or package pricing appears.

Recommended internal post-audit output model:

```ts
type AuditRecommendation = {
  recommendedSystem: "cash_collection_system" | "follow_up_system" | "both" | "none"
  reason: string
  firstFix: string
  buildScopeSummary: string
  guaranteeQualified?: boolean
  auditCreditApproved?: boolean
}
```

Acceptance criteria:

- Public pricing does not let visitors buy a full system directly.
- Public pricing does not imply implementation starts after checkout.
- Post-audit selection is framed as a recommendation from the Workflow Audit, not a visitor-selected tier.

## Reusable component architecture

Create a dedicated pricing component folder instead of expanding `components/pricing-section.tsx` further.

Recommended files:

```text
app/pricing/page.tsx
app/checkout/success/page.tsx
app/checkout/cancel/page.tsx
app/api/checkout/workflow-audit/route.ts
components/pricing/index.ts
components/pricing/PricingPage.tsx
components/pricing/PricingHero.tsx
components/pricing/WorkflowAuditCard.tsx
components/pricing/AuditCreditPanel.tsx
components/pricing/MonthlyPlans.tsx
components/pricing/YearlyPlans.tsx
components/pricing/PlanCard.tsx
components/pricing/PricingFAQ.tsx
components/pricing/PricingCTA.tsx
components/pricing/CheckoutButton.tsx
components/pricing/CalculatorHandoffPanel.tsx
lib/pricing/offers.ts
lib/pricing/checkout.ts
lib/stripe/workflow-audit.ts
```

Notes:

- `app/checkout/*` and `app/api/checkout/*` should only be created when checkout implementation is approved.
- `lib/stripe/workflow-audit.ts` should only be created when Stripe implementation begins.
- `components/pricing/CheckoutButton.tsx` can exist earlier if it safely falls back to `/contact`, but it must not be used for full systems.
- Keep `components/pricing-section.tsx` as the homepage systems section or replace its internals with `PlanCard` only after the pricing page component library is stable.

### PricingHero

Role: Introduce the pricing decision model and make Workflow Audit the first step.

Props:

```ts
type PricingHeroProps = {
  offer: WorkflowAuditOffer
  calculatorContext?: PricingCalculatorContext
  primaryHref: string
  secondaryHref: string
  checkoutEnabled: boolean
}
```

Content requirements:

- Headline: `Find where cash, customers, and office time are leaking.`
- Body explains that Workflow Audit is paid and diagnostic.
- Primary CTA: `Apply for the Workflow Audit`.
- Secondary CTA: `Calculate Your Revenue Leak`.
- Helper line: `The audit comes first. Build work is recommended only after the leak is clear.`
- No eyebrow or kicker label.

### WorkflowAuditCard

Role: Explain the paid audit and what the buyer receives.

Props:

```ts
type WorkflowAuditCardProps = {
  offer: WorkflowAuditOffer
  checkoutEnabled: boolean
  calculatorContext?: PricingCalculatorContext
}
```

Must show:

- `Workflow Audit` title.
- Paid diagnostic first step.
- No dollar amount unless `offer.priceDisplay` is explicitly approved.
- Checklist:
  - Finished work to collected cash.
  - Past customers, reviews, referrals, and missed calls.
  - Office handoffs where work gets stuck.
  - Where Stanley Systems can or cannot fix the leak.
- Decision helper: `You leave with a clear money leak map and a recommendation: Cash Flow Collection System, Repeat Revenue System, both, or neither.`

### AuditCreditPanel

Role: Show guarantee and approved audit credit without overpromising.

Props:

```ts
type AuditCreditPanelProps = {
  guarantee: OfferGuarantee
  auditCredit?: AuditCreditTerm
}
```

Must show:

- Guarantee: `If Stanley Systems cannot find one clear money leak we can fix, you get your Workflow Audit fee back.`
- Qualification language.
- Scope language: refund applies to Workflow Audit fee. No-cost Repeat Revenue System is for qualified businesses and standard package scope.
- Audit credit copy only if `auditCredit.status === "approved"`.

### MonthlyPlans

Role: If retained, show ongoing support or decision paths without turning the page into a self-serve subscription grid.

Props:

```ts
type MonthlyPlansProps = {
  plans: PricingPlan[]
  checkoutEnabled: boolean
}
```

Rules:

- Do not show monthly package prices unless Jaden approves a pricing brief.
- If shown, monthly means approved ongoing support after audit/build, not direct package purchase.
- CTAs route back to Workflow Audit.

### YearlyPlans

Role: If retained, mirror MonthlyPlans for an approved annual support term only.

Props:

```ts
type YearlyPlansProps = {
  plans: PricingPlan[]
  checkoutEnabled: boolean
}
```

Rules:

- Do not invent annual contracts or savings.
- Do not use pressure, sale badges, discount ribbons, or `cancel anytime` unless approved for the exact offer shown.
- CTAs route back to Workflow Audit.

### PlanCard

Role: Reusable card for Workflow Audit, Cash Flow Collection System, Repeat Revenue System, and support terms.

Props:

```ts
type PlanCardProps = {
  plan: PricingPlan
  checkoutEnabled: boolean
  calculatorContext?: PricingCalculatorContext
}
```

Rules:

- Workflow Audit card can use `CheckoutButton` only when checkout is configured and approved.
- Cash Flow Collection System and Repeat Revenue System cards always route to Workflow Audit/contact/pricing anchor, never Stripe.
- No price for full systems in v1.
- Card has title, promise, checklist, helper line, CTA.

### PricingFAQ

Role: Remove buyer confusion and protect offer boundaries.

Props:

```ts
type PricingFAQProps = {
  items: PricingFAQItem[]
}
```

Required questions:

- Is the Workflow Audit required first?
- Is the Workflow Audit free?
- What happens after the audit?
- Can I buy Cash Flow Collection System or Repeat Revenue System directly from this page?
- What does the guarantee mean?
- Who qualifies for the guarantee?
- Can Stanley Systems work inside my current tools?

### PricingCTA

Role: Final page CTA after the buyer understands the audit-first model.

Props:

```ts
type PricingCTAProps = {
  checkoutEnabled: boolean
  primaryOffer: WorkflowAuditOffer
  calculatorContext?: PricingCalculatorContext
}
```

Rules:

- CTA label: `Apply for the Workflow Audit` or `Book the Workflow Audit`.
- If checkout is not enabled, route to `/contact`.
- If checkout is enabled, use Workflow Audit checkout only.
- Secondary action: `/invoicing-delay-cash-flow-calculator` or phone.

### CheckoutButton

Role: Start Workflow Audit checkout safely, or route to contact fallback.

Props:

```ts
type CheckoutButtonProps = {
  children: React.ReactNode
  sourcePage: string
  sourceSection: string
  ctaLabel: string
  calculatorContext?: PricingCalculatorContext
  fallbackHref?: string
  className?: string
}
```

Rules:

- Client component.
- Posts only to `/api/checkout/workflow-audit`.
- Does not accept price ID, amount, product, package, or implementation scope.
- On `checkout_not_configured`, route to `/contact` or `fallbackUrl` returned by the server.
- Tracks only safe non-sensitive events.

## Structured offer data model

Create `lib/pricing/offers.ts` as the single source of truth for public pricing page offer content.

Recommended types:

```ts
type OfferId = "workflow_audit" | "cash_collection_system" | "follow_up_system"

type CTAAction = "contact" | "workflow_audit_checkout" | "calculator" | "phone" | "anchor"

type PricingPlanKind = "front_door_audit" | "post_audit_system" | "support_term"

type PricingPlan = {
  id: OfferId | "monthly_support" | "yearly_support"
  kind: PricingPlanKind
  title: string
  shortTitle?: string
  promise: string
  description: string
  priceDisplay: string | null
  priceApproved: boolean
  priceNote: string
  checklist: string[]
  goodFit?: string[]
  helperLine: string
  cta: {
    label: string
    action: CTAAction
    href: string
  }
  checkoutEligible: boolean
  recommended?: boolean
  accent?: "green" | "navy" | "neutral"
}

type WorkflowAuditOffer = PricingPlan & {
  id: "workflow_audit"
  kind: "front_door_audit"
  checkoutEligible: true
  guarantee: OfferGuarantee
}

type OfferGuarantee = {
  headline: string
  qualificationCopy: string
  scopeCopy: string
}

type AuditCreditTerm = {
  status: "not_approved" | "approved"
  copy: string | null
}

type PricingFAQItem = {
  question: string
  answer: string
}

type PricingCalculatorContext = {
  source: "calculator" | "homepage" | "unknown"
  recommendedSystem: "cash_collection_system" | "follow_up_system" | "both" | "none" | "unknown"
  recommendedPlan: "workflow_audit_only" | "cash_collection_path" | "follow_up_path" | "both_paths" | "none" | "unknown"
  calculatorKind: "customer_revenue" | "invoicing_delay" | "not_provided"
  annualLeakEstimate: string | null
  monthlyLeakEstimate: string | null
}
```

Recommended v1 data:

```ts
export const workflowAuditOffer = {
  id: "workflow_audit",
  kind: "front_door_audit",
  title: "Workflow Audit",
  promise: "Find where cash, customers, and office time are leaking before you pay for the build.",
  description: "Stanley Systems reviews the office path where money usually gets stuck and gives you a plain-English money leak map.",
  priceDisplay: null,
  priceApproved: false,
  priceNote: "Paid audit. Fee shown only after Jaden approves the current public audit price.",
  checklist: [
    "Money leak map.",
    "Workflow review.",
    "Highest-value first fix.",
    "Recommendation for Cash Flow Collection System, Repeat Revenue System, both, or neither.",
  ],
  helperLine: "The audit comes first. Build work is recommended only after the leak is clear.",
  cta: { label: "Apply for the Workflow Audit", action: "contact", href: "/contact" },
  checkoutEligible: true,
  recommended: true,
  accent: "green",
  guarantee: {
    headline: "If Stanley Systems cannot find one clear money leak we can fix, you get your Workflow Audit fee back.",
    qualificationCopy: "The guarantee applies to qualified service businesses with enough job, invoice, customer, call, estimate, or review volume for leaks to matter.",
    scopeCopy: "Refund applies to the Workflow Audit fee. No-cost Repeat Revenue System is the standard package for qualified businesses, not unlimited custom work.",
  },
}
```

Cash Flow Collection System:

- `id`: `cash_collection_system`
- `kind`: `post_audit_system`
- `promise`: `Turn finished work into collected cash faster.`
- `priceDisplay`: `null`
- `checkoutEligible`: `false`
- CTA: `Start with the Workflow Audit`, route `/contact` or `/pricing#workflow-audit`.

Repeat Revenue System:

- `id`: `follow_up_system`
- `kind`: `post_audit_system`
- `promise`: `Get more money from the customers you already earned.`
- Modules: Smart Re-Engagement, Review Booster, Referral Engine, Call Catcher.
- `priceDisplay`: `null`
- `checkoutEligible`: `false`
- CTA: `Start with the Workflow Audit`, route `/contact` or `/pricing#workflow-audit`.

## Stripe checkout implementation boundaries

Only implement after Jaden approves the Workflow Audit fee and Stripe config path.

Files to add when approved:

- `app/api/checkout/workflow-audit/route.ts`
- `app/checkout/success/page.tsx`
- `app/checkout/cancel/page.tsx`
- `lib/stripe/workflow-audit.ts`

Env var names:

- Required: `STRIPE_SECRET_KEY`, `STRIPE_WORKFLOW_AUDIT_PRICE_ID`, `NEXT_PUBLIC_SITE_URL`
- Optional: `STRIPE_WEBHOOK_SECRET`, `STANLEY_CHECKOUT_FALLBACK_URL`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`

Route rules:

- Creates exactly one Checkout Session.
- Mode: one-time payment.
- Price: `STRIPE_WORKFLOW_AUDIT_PRICE_ID` only.
- Quantity: 1.
- Success URL: `${NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`.
- Cancel URL: `${NEXT_PUBLIC_SITE_URL}/checkout/cancel`.
- Never accepts browser-supplied price ID, amount, product type, or package.
- Missing env returns controlled JSON with `ok: false`, `code: "checkout_not_configured"`, and a fallback URL.

Required metadata keys:

- `checkout_version`: `workflow_audit_v1`
- `offer`: `workflow_audit`
- `source`
- `source_page`
- `source_section`
- `recommended_system`
- `recommended_plan`
- `calculator_result`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

Optional metadata keys:

- `calculator_kind`
- `annual_leak_estimate`
- `monthly_leak_estimate`
- `contact_email_provided`
- `cta_label`

## Implementation sequence

### Task 1: Add offer data source

Modify or create:

- Create `lib/pricing/offers.ts`

Steps:

1. Define the pricing types above.
2. Export `workflowAuditOffer`, `cashCollectionSystemPlan`, `followUpSystemPlan`, `pricingFAQItems`, and `auditCreditTerm`.
3. Keep prices `null` and `priceApproved: false`.
4. Verify no old price strings appear.

### Task 2: Create reusable pricing components

Create:

- `components/pricing/index.ts`
- `components/pricing/PlanCard.tsx`
- `components/pricing/PricingHero.tsx`
- `components/pricing/WorkflowAuditCard.tsx`
- `components/pricing/AuditCreditPanel.tsx`
- `components/pricing/PricingFAQ.tsx`
- `components/pricing/PricingCTA.tsx`
- `components/pricing/CalculatorHandoffPanel.tsx`

Steps:

1. Build presentational components from `lib/pricing/offers.ts`.
2. Use off-white background, white rounded cards, deep navy text, Stanley green accents.
3. Do not add section eyebrow labels.
4. Do not include fake dashboards, generic SaaS visuals, robots, people, or AI metaphors.
5. Use existing `CTALink` for non-checkout links.

### Task 3: Add pricing page

Create:

- `components/pricing/PricingPage.tsx`
- `app/pricing/page.tsx`

Steps:

1. `app/pricing/page.tsx` renders metadata and `PricingPage`.
2. `PricingPage` parses safe query params from calculator handoff.
3. Render order:
   - `PricingHero`
   - `CalculatorHandoffPanel`, only when safe calculator context exists
   - `WorkflowAuditCard`
   - `AuditCreditPanel`
   - `MonthlyPlans` or direct plan cards, only if using the requested component architecture
   - `YearlyPlans` only as placeholder-support grouping if needed, not fabricated prices
   - `PricingFAQ`
   - `PricingCTA`
4. Use `/contact` as all audit CTAs until checkout is approved.

### Task 4: Wire homepage into pricing

Modify:

- `components/glassmorphism-nav.tsx`
- `components/calculator-path-section.tsx`
- `components/pricing-section.tsx`
- `components/final-cta-section.tsx`
- `components/footer.tsx`
- Optional: `components/hero-section.tsx`, if current hero CTA needs stronger pricing path

Steps:

1. Add `Pricing` nav item to `/pricing`.
2. Change selected high-intent CTAs from `/contact` to `/pricing` where the user needs explanation first.
3. Keep direct `/contact` fallback CTA available.
4. Do not route system package cards to checkout.
5. Preserve existing `data-audit-*` attributes or update them for pricing attribution.

### Task 5: Fix calculator handoff and stale naming

Modify:

- `app/invoicing-delay-cash-flow-calculator/calculator-client.tsx`

Steps:

1. Replace visible `Repeat Revenue System` package label with `Repeat Revenue System`.
2. Keep `Customer Revenue leak` and `Customer Revenue math` for result/math category naming.
3. Compute a safe recommendation based on current `cashflowImpact` and `customerRevenueLow`/`customerRevenueHigh`.
4. Add result CTA to `/pricing` with rounded query params.
5. Keep exact math collapsed.
6. Do not put raw inputs or private details in query params.

### Task 6: Add checkout only after approval

Modify or create only after Jaden approves:

- Add `stripe` dependency to `package.json`.
- Create `components/pricing/CheckoutButton.tsx`.
- Create `app/api/checkout/workflow-audit/route.ts`.
- Create `lib/stripe/workflow-audit.ts`.
- Create `app/checkout/success/page.tsx`.
- Create `app/checkout/cancel/page.tsx`.

Steps:

1. Build missing-env fallback first.
2. Add server validation.
3. Create Stripe session for Workflow Audit only.
4. Add success and cancel pages.
5. Wire only Workflow Audit CTA to checkout.
6. Confirm all package CTAs still avoid checkout.

## Visual acceptance criteria

The pricing page passes only if:

- Background is off-white or warm white.
- Cards are white or near-white with rounded corners, light borders, and soft shadows.
- Hierarchy uses deep navy.
- Stanley green is used for pricing emphasis, confirmation states, checklist icons, selected states, and CTA fill.
- Layout is centered, calm, crisp, and breathable.
- No section eyebrow or kicker labels appear.
- No fake dashboards, graph panels, CRM screenshots, terminal panels, automation canvases, generic SaaS icon stacks, people, robots, or AI metaphors appear.
- No orange, amber, yellow, gold, sepia, or dark-mode pricing panels appear.
- No cramped comparison table appears.
- Mobile stacks and reflows. It does not use zoom, scale, transform, or shrink hacks.
- Visual emphasis exists only where it explains the buyer decision.

## Copy acceptance criteria

The pricing funnel passes only if:

- Public copy says `Stanley Systems`, not standalone `Stanley`.
- Public copy says Workflow Audit is paid and first.
- Public copy says Cash Flow Collection System and Repeat Revenue System consistently.
- Public copy does not say Cash Flow Collection System or Repeat Revenue System as package names during this pricing pass.
- Smart Re-Engagement appears only as a Repeat Revenue System module.
- Public copy does not say free consultation.
- Public copy does not lead with AI, automation, optimize, streamline, transform, empower, innovative, cutting-edge, efficiency, synergy, ecosystem, leverage, scalable solution, or digital transformation.
- No public copy uses old price tests.
- No package prices appear.
- No revenue, profit, customer, review, referral, or call-volume guarantee appears.
- Guarantee copy is bold and visible, with compact qualification and scope copy nearby.

## Technical acceptance criteria

- `npm run build` passes after implementation.
- Static search finds no old public price strings: `$297`, `$147`, `$97`, `$397`, `$697`, `$897`.
- Static search finds no public pricing pass package-name drift: `Cash Flow Collection System`, `Repeat Revenue System` outside approved historical docs or internal context.
- Static search confirms no self-serve checkout for Cash Flow Collection System or Repeat Revenue System.
- Static search confirms `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are never referenced from client components.
- If Stripe is not configured, Workflow Audit CTA fallback still routes to `/contact`.
- If Stripe is configured, only Workflow Audit can create checkout sessions.
- Success and cancel pages render safely without raw Stripe objects.
- Calculator handoff sends rounded metadata only.
- Existing contact form still submits to `/api/contact`.

## Suggested implementation owner notes

- This is a spec, not an implementation patch.
- Do not deploy from this spec task.
- Do not touch n8n, QBO, HCP, Gmail, Twilio, Telegram, OpenClaw runtime files, or secrets.
- Do not add Stripe until Jaden approves the current Workflow Audit fee and checkout launch.
- Keep `/contact` as the safe default path until checkout is live and verified.
