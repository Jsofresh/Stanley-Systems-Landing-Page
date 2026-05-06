# Workflow Audit Stripe checkout v1 architecture spec

Date: 2026-05-04
Status: implementation-ready spec, not implemented
Scope: Stanley Systems public website Workflow Audit checkout only

## Jaden approval update, 2026-05-04

Jaden approved the current public naming correction: Workflow Audit, Cash Flow Collection System, Repeat Revenue System, Cash Flow Collection System, Finished Work to Collected Cash, and Repeat Revenue System.

Jaden rejected adding a complimentary system to the guarantee. Do not promise a no-cost Repeat Revenue System or any no-cost system as the guarantee.

Approved commercial incentive: if the client buys a monthly plan after the Workflow Audit, the Workflow Audit price comes off the monthly plan. If the client buys a yearly plan after the Workflow Audit, double the Workflow Audit price comes off the yearly plan. Do not stack this credit with a refunded audit. Do not invent dollar amounts until Jaden provides approved prices.

## Purpose

This spec defines the safest Stripe checkout v1 for Stanley Systems.

The only v1 payment flow is a paid Workflow Audit checkout. Cash Flow Collection System, Repeat Revenue System, custom builds, guarantee eligibility, non-approved credit variants, and implementation commitments must stay outside self-serve checkout.

This document uses environment variable names only. Do not put secret values in code, docs, logs, analytics events, checkout metadata, or chat.

## Source decisions

Use this spec together with:

- `docs/decision-records/pricing-architecture.md`
- Parent payment discovery t_a395907c: no current Stripe dependency, no payment environment variables, no checkout routes, no success page, no cancel page, and Workflow Audit CTAs currently route to `/contact`.

Resolved pricing architecture for this Kanban run:

- Workflow Audit is the paid diagnostic front door.
- Cash Flow Collection System and Repeat Revenue System are post-audit build paths.
- Smart Re-Engagement is a Repeat Revenue System module, not the full package.
- No package prices appear in v1.
- Workflow Audit dollar amount appears only if Jaden provides an explicit current approved fee.
- If no approved Stripe price is configured, the site must keep routing Workflow Audit intent to `/contact`.

## Non-goals

Do not implement any of these in v1:

- Self-serve checkout for Cash Flow Collection System.
- Self-serve checkout for Repeat Revenue System.
- Self-serve checkout for custom builds.
- Package selection that starts implementation automatically.
- Guarantee qualification through checkout.
- Audit-credit application through checkout.
- Automatic promise of revenue, profit, customers, reviews, referrals, call volume, or implementation start.
- Customer portal, subscriptions, upsells, coupons, payment plans, invoices, or saved payment methods.
- Public Stripe Payment Links for full systems.

## Recommended architecture

Use a server-created Stripe Checkout Session, not public Payment Links.

Reason: server-created sessions let Stanley Systems attach consistent metadata, enforce one safe product only, handle missing configuration safely, and keep future ops reconciliation cleaner.

### v1 flow

1. A visitor clicks a Workflow Audit checkout CTA.
2. The frontend posts a small intent payload to a server route.
3. The server route validates the payload and checks required env vars.
4. If Stripe env is complete, the server creates a Stripe Checkout Session for the Workflow Audit price only.
5. Stripe redirects the visitor to hosted checkout.
6. On successful payment, Stripe redirects to the site success page.
7. On cancel, Stripe redirects to the cancel page.
8. The success and cancel pages do not unlock any paid system or guarantee eligibility by themselves. They route the user to the next scheduling or contact step.

### Recommended files for implementation

Frontend build task:

- Modify CTAs in `components/pricing-section.tsx`, `components/final-cta-section.tsx`, `components/contact-section.tsx`, calculator result/handoff files, and any other Workflow Audit CTA surfaces only after checking current CTA inventory.
- Create a small checkout client helper or form action only if it keeps the UI simpler.
- Add copy for safe fallback when checkout is not configured.

Ops/build task:

- Add Stripe dependencies to the root app only when implementation begins.
- Create `app/api/checkout/workflow-audit/route.ts`.
- Create `app/checkout/success/page.tsx`.
- Create `app/checkout/cancel/page.tsx`.
- Optionally create `lib/stripe/workflow-audit.ts` for shared validation and metadata shaping.
- Do not touch n8n, QBO, HCP, Gmail, Twilio, OpenClaw, or production workflow files for this checkout v1.

## Environment variables

Required for live checkout:

- `STRIPE_SECRET_KEY`
- `STRIPE_WORKFLOW_AUDIT_PRICE_ID`
- `NEXT_PUBLIC_SITE_URL`

Optional for stronger operations:

- `STRIPE_WEBHOOK_SECRET`
- `STANLEY_CHECKOUT_FALLBACK_URL`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

Do not use secret values in public runtime code. Only `NEXT_PUBLIC_*` values can be exposed to the browser.

### Safe missing-env behavior

If `STRIPE_SECRET_KEY`, `STRIPE_WORKFLOW_AUDIT_PRICE_ID`, or `NEXT_PUBLIC_SITE_URL` is missing:

- The checkout API must not throw a raw server error.
- The checkout API must return a controlled JSON response with `ok: false`, a stable error code such as `checkout_not_configured`, and a safe fallback URL.
- The frontend must send the visitor to `/contact` or `STANLEY_CHECKOUT_FALLBACK_URL` if configured.
- The user-facing message should say the Workflow Audit application path is available. It should not mention secrets or internal configuration.
- Server logs may name the missing env var names, but must never print values.

Recommended fallback URL order:

1. `STANLEY_CHECKOUT_FALLBACK_URL` if set.
2. `/contact`.

## Checkout session rules

The route must create exactly one checkout session for exactly one product:

- Mode: one-time payment.
- Price: `STRIPE_WORKFLOW_AUDIT_PRICE_ID`.
- Quantity: 1.
- Customer email: include only if the user already provided it.
- Success URL: `${NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`.
- Cancel URL: `${NEXT_PUBLIC_SITE_URL}/checkout/cancel` with safe query params when useful.
- Billing address and phone collection: allowed only if Jaden approves the checkout friction.
- Terms acknowledgement: required before launch if checkout copy references guarantee terms or audit scope.

The server must not accept a price ID, amount, package name, or product type from the browser.

## Metadata fields

Attach metadata to the Checkout Session and PaymentIntent where Stripe supports it.

Required metadata keys:

- `checkout_version`: `workflow_audit_v1`
- `offer`: `workflow_audit`
- `source`: visitor source, default `website`
- `source_page`: page path where the CTA was clicked
- `source_section`: CTA section or component location
- `recommended_system`: `cash_collection_system`, `follow_up_system`, `both`, `unknown`, or `none`
- `recommended_plan`: `workflow_audit_only`, `cash_collection_path`, `follow_up_path`, `both_paths`, `unknown`, or `none`
- `calculator_result`: compact calculator summary or `not_provided`
- `utm_source`: UTM source or empty string
- `utm_medium`: UTM medium or empty string
- `utm_campaign`: UTM campaign or empty string
- `utm_content`: UTM content or empty string
- `utm_term`: UTM term or empty string

Optional metadata keys:

- `calculator_kind`: `invoicing_delay`, `customer_revenue`, or `not_provided`
- `annual_leak_estimate`: rounded string value from calculator, never raw sensitive data
- `monthly_leak_estimate`: rounded string value from calculator, never raw sensitive data
- `contact_email_provided`: `true` or `false`
- `cta_label`: exact CTA label clicked

Metadata must stay compact. Do not include private notes, full form submissions, secret values, raw customer lists, raw financial records, or long calculator payloads.

## Recommended payload from frontend to checkout route

The frontend may send:

- `source`
- `sourcePage`
- `sourceSection`
- `ctaLabel`
- `recommendedSystem`
- `recommendedPlan`
- `calculatorResult`
- `calculatorKind`
- `annualLeakEstimate`
- `monthlyLeakEstimate`
- `email`
- `utmSource`
- `utmMedium`
- `utmCampaign`
- `utmContent`
- `utmTerm`

The server must validate and normalize every field. Unknown values become `unknown`, `none`, empty string, or `not_provided`. The browser must not control the Stripe price or product.

## Success page behavior

Route: `/checkout/success`

Purpose: confirm the Workflow Audit payment path completed and move the buyer to scheduling/intake.

Required behavior:

- Read `session_id` from the query string.
- If Stripe is configured, the server can retrieve the session for display-safe status only.
- If Stripe is not configured or retrieval fails, the page must still render a safe confirmation-style next step with no secret details.
- Explain that Stanley Systems will use the Workflow Audit to find the clearest money leak before recommending a build path.
- Make clear that payment does not automatically start Cash Flow Collection System, Repeat Revenue System, or a custom implementation.
- Primary next action: schedule or complete intake. If no scheduler is configured, route to `/contact`.
- Secondary fallback: email `hello@stanley-systems.com`.

Do not show raw Stripe objects, raw metadata dumps, or internal route errors on the page.

## Cancel page behavior

Route: `/checkout/cancel`

Purpose: recover the visitor without pressure.

Required behavior:

- State that checkout was not completed.
- Keep the Workflow Audit positioned as the diagnostic next step.
- Offer a primary CTA back to checkout only if checkout env is configured.
- Offer `/contact` as the safe fallback path.
- Offer calculator or explanatory content as secondary only if it does not compete with the audit CTA.
- Do not imply the visitor has paid, qualified for a guarantee, or reserved implementation capacity.

## Analytics and attribution

If analytics are already configured, track only non-sensitive events:

- `workflow_audit_checkout_started`
- `workflow_audit_checkout_config_missing`
- `workflow_audit_checkout_redirected`
- `workflow_audit_checkout_success_viewed`
- `workflow_audit_checkout_cancel_viewed`

Include page, section, CTA label, recommended system, recommended plan, calculator kind, rounded calculator result, and UTM values where available.

Do not send secret values, raw customer data, raw financial data, full form submissions, or Stripe raw objects into analytics.

## Frontend implementation criteria

A frontend implementation passes this spec when:

1. All primary paid-audit CTAs still work when checkout is not configured.
2. Checkout-enabled CTAs call only the Workflow Audit checkout route.
3. No Cash Flow Collection System, Repeat Revenue System, custom build, guarantee, or audit-credit CTA sends a user to Stripe checkout.
4. The UI never exposes `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, or any non-public env value.
5. The UI keeps `/contact` as the safe fallback path.
6. Calculator handoff metadata is compact and optional.
7. Calculator result screens do not label the result as Repeat Revenue System checkout.
8. Public copy uses Stanley Systems, Cash Flow Collection System, Repeat Revenue System, and Workflow Audit consistently for this pricing pass.
9. Public copy does not introduce unapproved prices.
10. Public copy does not promise automatic implementation, guaranteed revenue, guaranteed customers, guaranteed reviews, or guaranteed referrals.

## Ops implementation criteria

An ops/build implementation passes this spec when:

1. The root app has the Stripe server dependency only after implementation starts.
2. `app/api/checkout/workflow-audit/route.ts` creates sessions for `STRIPE_WORKFLOW_AUDIT_PRICE_ID` only.
3. The route rejects unsupported products, unsupported recommended system values, and browser-supplied price IDs.
4. Missing env vars return controlled fallback JSON and do not crash the site.
5. Server logs name env var names only, never values.
6. Success and cancel URLs use `NEXT_PUBLIC_SITE_URL` and resolve correctly in production.
7. The success page renders safely even if session lookup fails.
8. The cancel page renders safely and offers `/contact` fallback.
9. Optional webhook handling, if added, verifies `STRIPE_WEBHOOK_SECRET` and stores only safe operational fields.
10. No QBO, HCP, Gmail, Twilio, n8n, Telegram, or OpenClaw runtime files are changed for checkout v1.

## QA criteria

Run these checks before any production deploy:

1. Static search confirms no secret values are committed and no non-public Stripe env var is referenced from client components.
2. Static search confirms no checkout route exists for Cash Flow Collection System, Repeat Revenue System, custom builds, guarantees, or non-approved credit variants.
3. With Stripe env vars missing, clicking a checkout CTA routes to `/contact` or the configured fallback and the page does not 500.
4. With Stripe test env vars set, clicking a Workflow Audit CTA creates one Stripe Checkout Session for the configured Workflow Audit price.
5. Test checkout success redirects to `/checkout/success?session_id=...` and renders a clear next step.
6. Test checkout cancel redirects to `/checkout/cancel` and renders a safe recovery path.
7. Metadata in the Stripe test dashboard includes source, recommended system, recommended plan, calculator result, and UTM fields.
8. Metadata does not include raw form submissions, secrets, raw customer records, or raw financial records.
9. `npm run build` passes.
10. If deployed, `pm2 restart stanley-landing --update-env` runs successfully and the live site is checked afterward.
11. Live smoke checks verify `/`, `/contact`, `/checkout/success`, `/checkout/cancel`, and the checkout API fallback behavior.

## Launch gate

Do not launch direct Stripe checkout until all of these are true:

- Jaden approves the current Workflow Audit price or Stripe price ID.
- Production env has `STRIPE_SECRET_KEY`, `STRIPE_WORKFLOW_AUDIT_PRICE_ID`, and `NEXT_PUBLIC_SITE_URL` set.
- Success and cancel pages exist and pass QA.
- Missing-env fallback is verified.
- Package and system checkout remains gated post-audit or later.
- The final QA report names files changed, commands run, test mode result, fallback result, production deploy status, and remaining risk.
