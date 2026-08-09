# Site scope note implementation spec

Task: t_df5fb87b
Project: Pricing + Stripe Checkout Rework
Lifecycle status: draft_spec
Owner lane: copywriter
Status: ready for Codex/frontend implementation after this task is complete

## Purpose

Add the direct-purchase scope caveat across the buyer-facing surfaces where someone can buy or understand a package: pricing package cards, Cashflow Control System page, Repeat Revenue System page, checkout success, FAQ, and Terms.

The required buyer-facing idea is:

- Buying a package starts onboarding and implementation intake.
- Implementation proceeds only after Stanley Systems reviews fit, tool/access constraints, data quality, and package scope.
- If fit, access, or scope does not work before implementation begins, Stanley Systems may refund, redirect, pause, or propose custom scope.

This is approved implementation copy from the PM legal-copy gate in `audit-guarantee-legal-review-approval.md`, building on `legal-faq-checkout-consistency-spec.md`.

## Non-negotiable public language rules

Use these package names:

- Workflow Audit
- Cashflow Control System
- Repeat Revenue System
- Both Systems

Do not use these as public package names:

- Customer Revenue System
- Follow-Up System
- Cash Collection System
- Cash Flow Collection System

Do not imply:

- direct package purchase means automatic immediate implementation
- every buyer or requested scope will be accepted
- unlimited custom software work is included
- guaranteed revenue, profit, customers, collected cash, reviews, rankings, platform approvals, call volume, or third-party behavior

Do not request or expose Stripe secret keys. Use public Stripe Payment Links only.

## Canonical scope note copy

Use this exact default copy unless a surface needs the shorter version:

> Direct purchase starts onboarding and implementation intake. Stanley Systems reviews fit, access, tool constraints, data quality, and package scope before implementation proceeds. If the purchase is not the right fit, Stanley Systems may redirect, pause, propose a custom scope, or refund before implementation begins.

Short card version:

> Buying starts onboarding. Implementation proceeds after fit, access, and scope review. If this is not the right fit, Stanley Systems may refund, redirect, or pause before work begins.

Checkout success version:

> Your purchase starts onboarding and implementation intake. Before implementation proceeds, Stanley Systems reviews your business details, required access, current tools, data quality, package fit, and first scope. If the selected package is not the right fit, Stanley Systems may redirect you, pause until required access is available, propose custom scope, or refund before implementation begins.

Terms version:

> A direct package purchase starts onboarding and implementation intake; it does not waive Stanley Systems' right to review fit, access, requested scope, third-party tool constraints, data quality, and implementation requirements before work proceeds. Stanley Systems may refund, redirect, pause, decline the engagement, or propose custom scope before implementation begins if the buyer is not a fit, selected the wrong package, requests work outside package scope, cannot provide required access, does not provide required onboarding details, or depends on third-party tools or policies that make the requested implementation impractical.

## Surface-by-surface implementation requirements

### 1. Pricing near package cards

Primary files:

- `components/pricing/PricingPage.tsx`
- `components/pricing/PlanCard.tsx`
- `lib/pricing/offers.ts`

Requirement:

- Every direct-purchase package card must include the short card version near the card CTA or immediately above the CTA.
- The Workflow Audit card does not need this package scope caveat, but can keep its audit guarantee and audit-credit caveats.
- Do not hide the caveat only inside FAQ. It must be visible near the package purchase choice.

Recommended implementation:

- Add a `scopeNote?: string` field to `PricingPlan` in `lib/pricing/offers.ts`.
- Populate it only for `kind: "direct_purchase_system"` with the short card version.
- Render `plan.scopeNote` in `PlanCard` between `plan.helperLine` and the CTA.
- Keep `helperLine` concise, or replace the current direct-purchase helper line with the scope note if duplicate.

Acceptance text to appear near each package card:

> Buying starts onboarding. Implementation proceeds after fit, access, and scope review. If this is not the right fit, Stanley Systems may refund, redirect, or pause before work begins.

### 2. Cashflow Control System page

Primary route:

- `app/systems/cashflow-control/page.tsx` if created in this rework.

Requirement:

- Add the canonical scope note near the primary package CTA and again in any “what happens after checkout” or scope/fit section if present.
- Explain package limits without weakening the offer.

Approved Cashflow-specific scope line:

> Cashflow Control System helps finished work move toward billing, follow-up, and collected cash with fewer manual checks. It does not guarantee collected revenue, profit, customer payment behavior, third-party processor behavior, or unlimited custom billing work.

Approved CTA-adjacent note:

> Buying this package starts onboarding and implementation intake. Stanley Systems confirms fit, access, tool constraints, data quality, and first implementation scope before work proceeds. If the selected package is not the right fit, Stanley Systems may redirect, pause until required access is available, propose custom scope, or refund before implementation begins.

### 3. Repeat Revenue System page

Primary route:

- `app/systems/repeat-revenue/page.tsx` if created in this rework.

Requirement:

- Add the canonical scope note near the primary package CTA and again in any “what happens after checkout” or scope/fit section if present.
- Avoid review/ranking/customer-volume guarantees.

Approved Repeat Revenue-specific scope line:

> Repeat Revenue System helps past customers, reviews, referrals, and missed calls stay visible so the next step is easier to follow. It does not guarantee new customers, review volume, review ratings, search rankings, platform approvals, or unlimited custom outreach work.

Approved CTA-adjacent note:

> Buying this package starts onboarding and implementation intake. Stanley Systems confirms fit, access, tool constraints, data quality, and first implementation scope before work proceeds. If the selected package is not the right fit, Stanley Systems may redirect, pause until required access is available, propose custom scope, or refund before implementation begins.

### 4. Checkout success

Primary route:

- `app/checkout/success/page.tsx` if created in this rework.

Requirement:

- State that payment was received, then direct the buyer to onboarding.
- Do not say implementation has already started.
- Include the checkout success version of the scope note above or below the onboarding CTA.

Approved success copy:

Headline:

> Payment received. Next, complete onboarding.

Body:

> Stanley Systems has received your purchase. Your next step is to complete onboarding so we can confirm your business details, required access, current tools, package fit, and implementation scope before work proceeds.

Scope note:

> Your purchase starts onboarding and implementation intake. Before implementation proceeds, Stanley Systems reviews your business details, required access, current tools, data quality, package fit, and first scope. If the selected package is not the right fit, Stanley Systems may redirect you, pause until required access is available, propose custom scope, or refund before implementation begins.

CTA:

> Complete onboarding

### 5. FAQ

Primary files:

- `lib/pricing/offers.ts` (`pricingFAQItems`)
- `components/pricing/PricingFAQ.tsx`
- `components/faq-section.tsx` only if the homepage FAQ is touched by this rework

Requirement:

- Pricing FAQ must include direct package purchase, what happens after checkout, wrong package, audit credit, and package inclusion/scope caveats.
- Homepage FAQ may stay more general unless package purchase CTAs are added to the homepage. If package checkout CTAs are added there, include one direct-purchase FAQ or a visible CTA-adjacent scope note.

Required FAQ entries:

Question:

> Can I buy Cashflow Control System or Repeat Revenue System directly?

Answer:

> Yes, when public checkout is available. Direct checkout starts onboarding and implementation intake. Stanley Systems still reviews fit, access, tool constraints, data quality, and requested scope before implementation proceeds. If the selected package is not the right fit, Stanley Systems may redirect you, propose a custom scope, pause the start, or refund before implementation begins.

Question:

> What happens after I buy a package?

Answer:

> You receive onboarding instructions so Stanley Systems can confirm your business details, required access, current tools, data quality, implementation fit, and first scope. Implementation proceeds after the required information and access are provided and Stanley Systems confirms the package fit and first scope.

Question:

> What if I buy the wrong package?

Answer:

> Stanley Systems may redirect you to the better package or a custom scope. Any price difference, credit, or refund will be confirmed in writing before redirected work begins.

Question:

> What is included in the package price?

Answer:

> The package price covers the selected system plan and the setup/onboarding scope described at checkout or in written follow-up. It does not include unlimited custom development, unsupported platform workarounds, third-party software costs, ad spend, legal/compliance advice, or guaranteed revenue, profit, customers, collection, review, ranking, or call-volume results.

### 6. Terms

Primary file:

- `app/terms-and-conditions/page.tsx`

Requirement:

- Replace the old audit-first/manual-funnel language from `No professional or guaranteed outcome` through `Service discussions and proposals` using the Terms sections in `legal-faq-checkout-consistency-spec.md`.
- At minimum, Terms must include direct package purchase and onboarding review, package scope and implementation limits, refunds/redirects/paused starts, third-party tools and buyer responsibilities, and written-scope language.
- Terms must keep the Workflow Audit guarantee limited to the Workflow Audit fee only.

Minimum direct-package Terms sections to include:

- `Direct package purchase and onboarding review`
- `Package scope and implementation limits`
- `Refunds, redirects, and paused starts after package purchase`
- `Third-party tools, platform rules, and buyer responsibilities`
- `Service discussions, proposals, checkout, and written scope`

Use the full section bodies from `legal-faq-checkout-consistency-spec.md` lines 113-131 unless a later legal review supersedes them.

## Verification checklist

Codex/frontend worker must verify:

- `npm run build` passes.
- Search confirms the canonical short card scope note appears near package purchase cards or via a shared constant rendered by `PlanCard`.
- Search confirms checkout success copy includes onboarding, fit/access/tool/data/scope review, and refund/redirect/pause/custom-scope rights before implementation begins.
- Search confirms Terms include direct package purchase/onboarding review, package scope limits, refunds/redirects/paused starts, third-party tool responsibility, and written scope language.
- Search confirms no touched public copy uses banned public package names: Customer Revenue System, Follow-Up System, Cash Collection System, Cash Flow Collection System.
- Search confirms no touched public copy promises guaranteed revenue, profit, customers, collected cash, review volume, review ratings, search rankings, platform approvals, or unlimited custom work.
- No Stripe secret keys are requested, printed, or added.

Suggested search commands:

```bash
npm run build
rg -n "Buying starts onboarding|Direct purchase starts onboarding|Your purchase starts onboarding|Direct package purchase and onboarding review|Refunds, redirects, and paused starts" app components lib
rg -n "Customer Revenue System|Follow-Up System|Cash Collection System|Cash Flow Collection System" app components lib
rg -n "guaranteed revenue|guaranteed profit|guaranteed customers|guaranteed reviews|guaranteed ranking|unlimited custom" app components lib
```

## Handoff notes

This spec is narrower than `legal-faq-checkout-consistency-spec.md`: it only scopes where the required direct-purchase caveat must appear across the site.

If implementation creates `/systems/both-systems`, use the Both Systems package-page note from `legal-faq-checkout-consistency-spec.md`; this task only explicitly requires Cashflow and Repeat Revenue pages.
