# Pricing + Stripe Checkout Rework Decision Memo

Created: 2026-05-05
Owner: Stanley H orchestrator
Scope: Source scan and task graph before implementation. No production code edited for this memo.

## 1. Current pricing pages and pricing components found

Routes/components found:
- `app/pricing/page.tsx`
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
- Homepage pricing/package display: `components/pricing-section.tsx`

Current pricing model is not the new purchase-path model. `lib/pricing/offers.ts` still treats the Workflow Audit as contact-path-only and says package builds are not self-serve in v1.

## 2. CTA inventory found

CTA surfaces found that currently point to contact, booking, calculator, system/package paths, or pricing:
- Header/nav: `components/glassmorphism-nav.tsx` uses `/contact` for Workflow Audit.
- Mobile sticky CTA: `components/mobile-sticky-cta.tsx` uses `/contact` and phone.
- Footer: `components/footer.tsx` uses `/contact` for Book the Workflow Audit and has Contact links.
- Homepage hero: `components/hero-section.tsx` uses `/contact` and calculator.
- Homepage calculator section: `components/calculator-path-section.tsx` uses calculator primary and `/contact` audit secondary.
- Homepage package/pricing section: `components/pricing-section.tsx` uses `/contact` for audit/system CTAs.
- Homepage final CTA: `components/final-cta-section.tsx` uses `/contact` and phone.
- Homepage proof/how-it-works/pain point sections: `components/proof-strip-section.tsx`, `components/how-it-works-section.tsx`, `components/pain-points-section.tsx` use `/contact`.
- Generic contact route: `app/contact/page.tsx`, `components/contact-section.tsx`.
- Calculator results: `app/invoicing-delay-cash-flow-calculator/calculator-client.tsx` uses `/contact`; paid calculator has Calendly and mailto.
- Blog/article CTAs and service pages: multiple `app/*/page.tsx` routes use `/contact`, case study, calculator, or phone.

Important cleanup target: package purchase-intent CTAs must no longer send direct buyers to the generic contact/application form. Keep contact as fallback for questions/unusual cases.

## 3. Current legal, FAQ, refund, audit guarantee, build credit, package purchase language

Found:
- `app/terms-and-conditions/page.tsx` has Audit Guarantee Terms, disqualifying conditions, and audit guarantee scope.
- `lib/pricing/offers.ts` has guarantee copy and FAQ stating packages cannot be bought directly in v1.
- `components/faq-section.tsx` has general homepage FAQ.

Conflicts needing task coverage:
- Current terms and pricing FAQ are built around the prior audit-first/manual funnel.
- Current guarantee language includes an express Workflow Audit guarantee. The new brief asks for paid direct package purchase with onboarding, implementation, fit/access/scope review, and refund/redirect/pause rights.
- Terms must be updated so they do not contradict pricing/package checkout pages.

## 4. Current package naming drift

Current drift found:
- Older context and existing repo use `Cash Flow Collection System`, `Cash Collection System`, `Customer Revenue System`, and legacy `Follow-Up System`/follow-up terminology.
- `components/pricing/CalculatorHandoffPanel.tsx` maps calculator values to `Cash Flow Collection System` and `Repeat Revenue System`.
- `components/pricing/PricingHero.tsx` mentions `Cash Flow Collection System`.
- `lib/pricing/offers.ts` still has `cashCollectionSystemPlan` with title `Cash Flow Collection System`.
- `components/sections/customer-revenue-system-v*.tsx` filenames still exist and public CTA copy inside them must be checked if rendered.

Latest source of truth from Jaden overrides older files:
- Use `Cashflow Control System`.
- Use `Repeat Revenue System`.
- Do not use public package names `Customer Revenue System`, `Follow-Up System`, or `Cash Collection System`.
- Short checkout/product names may be `Cashflow Control`, `Repeat Revenue`, and `Both Systems`.

## 5. Stripe configuration/code state

Static repo scan found old Stripe architecture docs, but no active public Stripe Payment Links in source and no current `NEXT_PUBLIC_STRIPE_*` URL env usage in app code.

Existing docs found:
- `docs/architecture/workflow-audit-stripe-checkout-v1.md`
- `docs/implementation-handoffs/pricing-funnel-and-component-spec.md`

These older docs describe a server-side Workflow Audit checkout v1 using secret env vars. The new direction is Stripe Payment Links v1 with public URLs and no secret keys.

Live Stripe Payment Link spot-checks completed in browser:
- Workflow Audit: visible product `Workflow Audit`, price `$97.00`.
- Cashflow monthly: visible product `Cashflow Control Monthly`, install line `Cashflow Control Installation`, promotion code entry visible as `Add promotion code` / `Apply`.
- Repeat monthly: visible product `Repeat Revenue Monthly`, install line `Repeat Revenue Installation`, promotion code entry visible.
- Both monthly: visible product `Cashflow Control + Repeat Revenue Monthly`, install line price shows `$495.00`, which conflicts with brief `$449 installation`.
- Cashflow yearly: visible product `Cashflow Control Yearly`, promotion code entry visible.
- Repeat yearly: visible product `Repeat Revenue Yearly`, promotion code entry visible.
- Both yearly: visible product `Cashflow Control + Repeat Revenue Yearly`, promotion code entry visible.

Stripe blockers before launch:
- Both Systems Monthly Payment Link currently shows install line `$495.00`, but the brief says `$449 installation`. This must be fixed in Stripe or the website pricing must not claim the wrong total.
- Visible Stripe product names do not use `Both Systems` for combined plans. They use `Cashflow Control + Repeat Revenue ...`. This is acceptable only if Jaden approves it as checkout naming; otherwise rename those Stripe products/payment links.
- Monthly Repeat Revenue Stripe copy says `5-star Google reviews`, which risks overpromising. Rename/rewrite inside Stripe before launch.

## 6. PostHog checkout and CTA tracking

Found active client-side PostHog setup:
- `components/posthog-provider.tsx`
- `lib/posthog-attribution.ts`
- `ANALYTICS.md`

Currently tracked events include:
- `cta_clicked`
- `contact_form_started`
- `contact_form_submitted`
- `calendly_clicked`

Missing for new project:
- checkout/package-specific click events
- pricing viewed
- calculator CTA clicked/viewed event variants
- checkout success/cancel viewed
- paid onboarding started/submitted

No sensitive buyer details should be sent to analytics.

## 7. Existing form handling and notification paths

Existing contact form:
- UI: `components/contact-section.tsx`
- API: `app/api/contact/route.ts`
- Submit path: `POST /api/contact`

The contact form is generic and not a paid buyer onboarding form. A separate `/checkout/onboarding` or `/onboarding` flow is needed. Existing notification behavior must be verified in `app/api/contact/route.ts` before reusing it.

## 8. Exact files likely needing edits

Likely implementation files:
- `lib/pricing/offers.ts` or replacement pricing source-of-truth file
- `app/pricing/page.tsx`
- `components/pricing/*`
- `components/pricing-section.tsx`
- `components/calculator-path-section.tsx`
- `components/glassmorphism-nav.tsx`
- `components/footer.tsx`
- `components/mobile-sticky-cta.tsx`
- `components/hero-section.tsx`
- `components/final-cta-section.tsx`
- `components/faq-section.tsx`
- `app/terms-and-conditions/page.tsx`
- `app/api/contact/route.ts` or new onboarding route action
- `app/checkout/success/page.tsx` new
- `app/checkout/cancel/page.tsx` new
- `app/checkout/onboarding/page.tsx` or `app/onboarding/page.tsx` new
- `app/systems/cashflow-control/page.tsx` new
- `app/systems/repeat-revenue/page.tsx` new
- `app/sitemap.ts`
- `components/posthog-provider.tsx`
- `lib/posthog-attribution.ts`

## 9. Current routes for key pages

Found current routes:
- `/pricing` -> `app/pricing/page.tsx`
- `/contact` -> `app/contact/page.tsx`
- `/invoicing-delay-cash-flow-calculator` -> `app/invoicing-delay-cash-flow-calculator/page.tsx`
- `/invoicing-delay-cash-flow-calculator/paid` -> `app/invoicing-delay-cash-flow-calculator/paid/page.tsx`
- No current `/systems` route found.
- No current `/systems/cashflow-control` route found.
- No current `/systems/repeat-revenue` route found.
- No current `/checkout/success`, `/checkout/cancel`, or `/checkout/onboarding` route found.

## 10. Pricing source of truth created

Created additive TypeScript pricing data model:
- `lib/pricing/source-of-truth.ts`

It defines one source-of-truth row for each purchasable offer:
- Workflow Audit
- Cashflow Control System monthly
- Repeat Revenue System monthly
- Both Systems monthly
- Cashflow Control System yearly
- Repeat Revenue System yearly
- Both Systems yearly

Each row includes public name, short checkout name, price, billing period, setup fee, waived setup, audit credit, first-year cost after audit credit, savings, badge, CTA, Stripe Payment Link, package route, analytics package id, and `NEXT_PUBLIC_STRIPE_*_PAYMENT_LINK` env/config name.

Decision note: Public Package 2 changed from Customer Revenue System to Repeat Revenue System. Current public package names are Cashflow Control System, Repeat Revenue System, and Both Systems. Older Customer Revenue System / Follow-Up System naming is subordinate to Jaden's latest direction.

## Launch blockers to track

- Stripe combined monthly install price appears to be `$495`, not `$449`.
- Stripe combined-plan visible names may need renaming to `Both Systems Monthly` and `Both Systems Yearly`.
- Stripe Repeat Revenue copy says `5-star Google reviews`; rewrite to avoid ranking/review overpromise.
- Guarantee/Terms/pricing/package language legal-copy gate resolved in `artifacts/pricing-stripe-checkout-rework/audit-guarantee-legal-review-approval.md`; implement only with onboarding/intake, fit/access/scope review, pre-implementation refund/redirect/pause/custom-scope rights, and narrow Workflow Audit fee-only guarantee.
- Existing package CTAs route to `/contact` instead of checkout where payment intent exists.
- No success page exists.
- No cancel page exists.
- No paid buyer onboarding form exists.
- Package purchase terms do not yet explain onboarding, access, fit, refund/redirect/pause rights across all required surfaces.
- Mobile pricing cleanliness must be reverified after rebuild.

## Decision note

Public Package 2 name changed from Customer Revenue System to Repeat Revenue System. Current public package names are Cashflow Control System and Repeat Revenue System. Older context files are subordinate to Jaden's latest direction.

## Task 17 copy cleanup artifact

Task 17 added the Codex-ready public copy cleanup rules at `artifacts/pricing-stripe-checkout-rework/public-copy-cleanup-rules.md`.

Key public naming rules for this rework:
- Use `Workflow Audit`, `Cashflow Control System`, `Repeat Revenue System`, and `Both Systems`.
- Do not use `Customer Revenue System`, `Follow-Up System`, `Cash Collection System`, or `Cash Flow Collection System` as public package names.
- Do not use AI headlines, Twilio mentions, backend jargon, guaranteed revenue/customers/ranking claims, unlimited custom development claims, or 5-star review promises in touched public copy.

## Task 8 legal/FAQ/checkout consistency artifact

Task 8 added the Codex-ready legal, FAQ, checkout, and package-page consistency spec at `artifacts/pricing-stripe-checkout-rework/legal-faq-checkout-consistency-spec.md`.

Key rules from this spec:
- Workflow Audit is a paid $97 diagnostic.
- Audit credit applies once only if the buyer bought the Workflow Audit first and buys a package within 24 hours after the audit call.
- Monthly audit credit is $97; yearly audit credit is $194.
- Yearly package installation is waived.
- Direct package purchase starts onboarding and implementation intake, with fit/access/scope review before implementation proceeds.
- Stanley Systems may refund, redirect, pause, or propose custom scope before implementation begins if fit/access/scope does not work.
- Public copy must not guarantee revenue, profit, customers, collected cash, reviews, rankings, platform approvals, or unlimited custom work.
- Terms legal-copy gate was approved in `artifacts/pricing-stripe-checkout-rework/audit-guarantee-legal-review-approval.md`; implementation still must not deploy without the separate deploy gate.

## Task 15 site scope note implementation artifact

Task 15 added the Codex-ready site scope note implementation spec at `artifacts/pricing-stripe-checkout-rework/site-scope-note-implementation-spec.md`.

Required surfaces:
- Pricing package cards: visible CTA-adjacent note that buying starts onboarding and implementation proceeds after fit/access/scope review.
- Cashflow Control System page: CTA-adjacent note plus Cashflow-specific no-guarantee scope line.
- Repeat Revenue System page: CTA-adjacent note plus Repeat-specific no-guarantee scope line.
- Checkout success: payment received, complete onboarding, and scope/fit/access/tool/data review before work proceeds.
- FAQ: direct package purchase, after-checkout, wrong-package, and package-inclusion caveats.
- Terms: direct package purchase/onboarding review, package scope limits, refund/redirect/pause rights, third-party responsibilities, and written-scope language.

## Task 7 future webhook v2 spec artifact

Task 7 added the future Stripe webhook v2 draft spec at `artifacts/pricing-stripe-checkout-rework/stripe-webhook-v2-spec.md`.

Key constraints for that future v2:
- Spec only; no implementation in the current Payment Links v1 pass.
- Future `/api/stripe/webhook` must verify Stripe signatures from the raw request body before parsing business fields.
- Handle `checkout.session.completed`, async payment success/failure, duplicate prevention, safe stored fields, onboarding notification/task creation, and optional server-side PostHog.
- Keep `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `STRIPE_PRICE_IDS` server-only; no secret values in code, docs, logs, analytics, or chat.

## Task 2 Stripe Payment Links v1 implementation note

Task 2 wired the `/pricing` purchase CTAs through `lib/pricing/source-of-truth.ts` and `lib/pricing/offers.ts` to Stripe Payment Links v1. Workflow Audit, Cashflow Control Monthly/Yearly, Repeat Revenue Monthly/Yearly, and Both Systems Yearly render active public `buy.stripe.com` links. Both Systems Monthly intentionally renders a paused checkout notice instead of a link because the Stripe spot-check showed a `$495` install line while the approved model says `$449 installation`.

Task 2 did not add Stripe secret keys, custom Checkout Sessions, webhook handling, deploy/restart, or fake payment state. Launch blockers still include the Both Systems Monthly install mismatch, combined-plan checkout naming approval, Repeat Revenue Stripe copy overpromise, and legal/FAQ/terms consistency before shipment.
