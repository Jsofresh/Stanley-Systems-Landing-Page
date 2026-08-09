# Checkout and analytics readiness scan

Task: t_29ac6ec4
Scope: no-deploy code/config-reference scan only. I did not implement Stripe, did not read env files, did not touch secrets, and did not deploy.

## Executive read

The current pricing funnel is intentionally contact-path only, not checkout-ready. That part is coherent in code: the pricing data has `priceDisplay: null`, `priceApproved: false`, `contactPathOnly: true`, and every pricing CTA points to `/contact`.

The bigger readiness issue is not Stripe. It is that attribution and lead-event capture are only partially wired, and the public offer names/guarantee in the pricing source do not fully match the current Stanley Systems offer architecture.

## Files inspected

- `AGENTS.md`
- `package.json`
- `app/page.tsx`
- `app/layout.tsx`
- `app/pricing/page.tsx`
- `app/contact/page.tsx`
- `app/api/contact/route.ts`
- `app/invoicing-delay-cash-flow-calculator/calculator-client.tsx`
- `app/invoicing-delay-cash-flow-calculator/paid-calculator-client.tsx`
- `components/hero-section.tsx`
- `components/glassmorphism-nav.tsx`
- `components/mobile-sticky-cta.tsx`
- `components/final-cta-section.tsx`
- `components/contact-section.tsx`
- `components/cta-link.tsx`
- `components/cta-phone-link.tsx`
- `components/posthog-provider.tsx`
- `components/pricing/*`
- `lib/pricing/offers.ts`
- `lib/posthog-attribution.ts`

## Checkout readiness

### What is coherent

- No Stripe or checkout implementation was found in app/components/lib source.
- The current pricing model is explicitly not self-serve checkout:
  - `lib/pricing/offers.ts` sets `priceDisplay: null` for Workflow Audit and both post-audit plans.
  - `priceApproved: false` is set for all plans.
  - `contactPathOnly: true` is set for the audit and post-audit systems.
  - CTAs route to `/contact`, not a payment page.
- `app/pricing/page.tsx` renders the pricing route through `PricingPage` with the Workflow Audit as the front door.
- `components/pricing/PlanCard.tsx` uses `CTALink` and routes each plan to the plan CTA href from `lib/pricing/offers.ts`, currently `/contact`.
- `app/contact/page.tsx` frames `/contact` as "Apply for the Workflow Audit" and describes it as the paid diagnostic first step.
- `components/contact-section.tsx` posts to `/api/contact` and asks for fit/intake details, not card/payment details.

### Checkout blockers before Stripe or payment links

1. Public offer naming mismatch.
   - Current approved public offers in repo instructions: Workflow Audit, Cash Flow Collection System, Repeat Revenue System.
   - Pricing source currently uses `Cash Flow Collection System` and `Repeat Revenue System` in `lib/pricing/offers.ts` and pricing UI components.
   - Current GTM context says Repeat Revenue System should remain internal/legacy shorthand and public copy should favor Repeat Revenue System.
   - Recommendation: do not add checkout/payment until Jaden approves the public offer names for the pricing page.

2. Workflow Audit guarantee mismatch.
   - Current GTM context says the public guarantee is: if Stanley Systems cannot find one clear money leak we can fix, the prospect gets the audit fee back and a free Repeat Revenue System.
   - `lib/pricing/offers.ts` currently says only the Workflow Audit fee is refunded and explicitly says it does not include a system build.
   - Recommendation: get Jaden approval on the guarantee terms before any payment/checkout implementation.

3. Public audit price is intentionally not approved.
   - `workflowAuditOffer.priceDisplay` is `null` and `priceApproved` is `false`.
   - `priceNote` says the fee is shown only after the current public audit price is approved.
   - Recommendation: leave checkout blocked until audit price, refund terms, and credit terms are approved.

4. Contact delivery depends on unverified env/config.
   - `/api/contact` forwards only if `STANLEY_CONTACT_WEBHOOK_URL` is set.
   - If it is not set, the API returns success with `delivery: "not-configured"` and tells the visitor to email directly, but it does not persist the lead.
   - I did not inspect env files per task constraints.
   - Recommendation: before relying on the funnel, verify env/config in a separate approved ops task without exposing values.

## Contact path readiness

### What works structurally

- Primary homepage CTA: `/contact` via `CTALink`, location `home_hero_primary`.
- Pricing CTAs: `/contact` via `CTALink`, locations like `pricing_hero_primary`, `pricing_workflow_audit`, `pricing_cash_collection_system`, `pricing_follow_up_system`, and `pricing_final_primary`.
- Final CTA: `/contact` via `CTALink`, location `final_cta_primary`.
- Mobile sticky primary CTA: `/contact` via `CTALink`, location `mobile_sticky_primary`.
- `/contact` form posts to `/api/contact` with required fields: name, email, company, business type, bottleneck, current process, and problem.
- SMS consent language exists and links to privacy/terms.

### Contact path issues

- `/api/contact` does not receive UTM/session attribution from the client payload.
- `contact_form_started` and `contact_form_submitted` do not include form context, CTA source, UTM values, or current page unless PostHog storage works and the provider is mounted.
- Direct email/phone contact cards in `components/contact-section.tsx` are plain anchors, not `CTAPhoneLink`/`CTALink`, so they rely on global document click tracking. That does not work unless `PostHogProvider` is mounted.
- `components/glassmorphism-nav.tsx` uses a button with `window.location.href = "/contact"`, not `CTALink`, so it is not self-instrumented.
- Calculator final CTA uses raw `Link href="/contact"` and raw phone anchor, not `CTALink`/`CTAPhoneLink`.
- Calculator final phone link is `tel:+16172745391`, while nav/contact/final CTA use `+16179586372`. This looks like a real phone-number inconsistency to fix before paid funnel work.

## Analytics readiness

### Existing instrumentation references

- `lib/posthog-attribution.ts`
  - Defines sessionStorage attribution under `stanley_attribution_v1`.
  - Captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `referrer`, and landing page.
  - Initializes PostHog from `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`.
  - Disables automatic PostHog pageview capture and expects manual `page_viewed` events.

- `components/posthog-provider.tsx`
  - Calls `initializePostHog()`.
  - Captures attribution on route/search param changes.
  - Emits `page_viewed`.
  - Emits `cta_clicked` for custom `stanley:cta-click` events.
  - Emits `cta_clicked` for direct `/contact`, `tel:`, and Calendly anchor clicks.
  - Exposes `trackContactFormStarted()` and `trackContactFormSubmitted()`.

- `components/cta-link.tsx` and `components/cta-phone-link.tsx`
  - Dispatch `stanley:cta-click` custom events.
  - Also call `window.gtag("event", "cta_click", payload)` if `gtag` exists.

- `app/layout.tsx`
  - Mounts Vercel `SpeedInsights` only.

- `app/invoicing-delay-cash-flow-calculator/paid-calculator-client.tsx`
  - Pushes paid calculator events into `window.dataLayer`, including view, started, partial result viewed, email submit started, email submitted, and severity assigned.

### Analytics blockers

1. `PostHogProvider` appears not mounted.
   - Search found the component definition and imports from `contact-section`, but no mount in `app/layout.tsx` or page shell.
   - Result: PostHog initialization, attribution capture, manual pageviews, global click tracking, and contact form events are likely not firing at all.

2. No GA/GTM script was found.
   - CTA helpers call `window.gtag` only if it already exists.
   - Paid calculator pushes to `window.dataLayer`, but no GTM loader was found in inspected layout/source.
   - Result: those fallback events may only accumulate client-side and never leave the browser.

3. Contact form submissions do not pass attribution to `/api/contact`.
   - The client body includes form data plus `source: "contact-page-form"` and `page: "/contact"`.
   - It does not include UTM values, landing page, referrer, prior CTA location, calculator result, or session attribution.

4. Calculator-to-pricing handoff is display-only.
   - `/pricing` can parse `source=calculator`, `recommended`, `annual_leak`, and `monthly_leak` query params.
   - The current main calculator final CTA goes directly to `/contact`, not `/pricing` with those params.
   - No explicit event is emitted when the free calculator starts, reaches result, or clicks the final audit CTA.

5. Event naming is not yet ready for funnel reporting.
   - Existing intended events include `page_viewed`, `cta_clicked`, `calendly_clicked`, `contact_form_started`, and `contact_form_submitted`.
   - Missing funnel events include calculator start, calculator step complete, calculator result viewed, calculator recommendation assigned, pricing viewed from calculator, audit apply started with source, audit apply submitted with source, phone click, email click, nav CTA click, and webhook delivery result.

6. Attribution retention is session-only.
   - `sessionStorage` preserves attribution only for the current browser session.
   - If Jaden wants multi-day content attribution, this should move to localStorage/cookie or PostHog person/session properties after approval.

## Events currently missing or intentionally not implemented

### Missing

- `calculator_started`
- `calculator_step_completed`
- `calculator_result_viewed`
- `calculator_recommendation_assigned`
- `pricing_viewed`
- `pricing_viewed_from_calculator`
- `audit_apply_started` with UTM/CTA/calculator context
- `audit_apply_submitted` with UTM/CTA/calculator context
- `contact_webhook_delivered`
- `contact_webhook_failed`
- `phone_clicked`
- `email_clicked`
- `nav_workflow_audit_clicked`
- `lead_source_attributed`

### Intentionally not implemented or not ready

- Stripe checkout/session creation.
- Public payment links.
- Public approved price display.
- Self-serve package checkout for post-audit systems.
- Any customer/account creation flow.
- Any CRM/QBO/HCP payment-side write.

## Blockers

- Public offer names on pricing page need approval/alignment before checkout: `Cash Flow Collection System`/`Repeat Revenue System` vs approved `Cash Flow Collection System`/`Repeat Revenue System`.
- Workflow Audit guarantee terms in pricing source conflict with current GTM context.
- Public Workflow Audit price remains unapproved in source.
- PostHog provider is not mounted, so analytics are probably inert.
- Contact delivery depends on `STANLEY_CONTACT_WEBHOOK_URL`, which was not inspected by design and must be verified separately.
- Contact form does not forward attribution/calculator context to the API/webhook.
- Main calculator final phone link uses a different phone number than the rest of the site.

## Non-blockers

- Absence of Stripe is correct for the current contact-path-only funnel.
- `priceDisplay: null` and `priceApproved: false` are correct safeguards until Jaden approves pricing.
- Vercel Speed Insights can remain as performance-only telemetry.
- Existing `CTALink`/`CTAPhoneLink` helpers are a useful base once the provider is mounted and raw CTA links/buttons are normalized.
- `/pricing` already has a basic parser for calculator query params, even though the main calculator does not currently use it.

## What should wait for Jaden approval

- The public Workflow Audit price.
- Whether the no-leak guarantee includes only audit-fee refund or also the free Repeat Revenue System.
- Final public offer names: Cash Flow Collection System vs Cash Flow Collection System, Repeat Revenue System vs Repeat Revenue System.
- Whether Workflow Audit should ever use Stripe checkout, a payment link, invoice-first payment, or contact/apply-first manual approval.
- Analytics vendor choice and event taxonomy: PostHog only, GA/GTM only, or both.
- Attribution retention policy: session-only vs persistent multi-day attribution.
- Whether calculator result handoff should go to `/pricing` first or straight to `/contact` with hidden context.

## Recommended next implementation order after approval

1. Align pricing copy/data with approved offer names and guarantee terms.
2. Mount `PostHogProvider` in `app/layout.tsx` or the shared marketing shell.
3. Normalize all CTAs through `CTALink`/`CTAPhoneLink`, including nav buttons, calculator final CTA, email links, and phone links.
4. Add attribution/context to contact form payload and `/api/contact` webhook payload.
5. Add calculator events and calculator-result context handoff.
6. Add webhook delivery success/failure events server-side.
7. Only then decide whether Stripe/payment links belong in the Workflow Audit path.

## Commands/checks run

- Read-only source scans with `search_files` and `read_file`.
- `git status --short` and `git diff --name-only` to identify existing dirty state before writing this report.

## Dirty worktree note

The repo already had many modified and untracked files before this report was written. For this task, I only added this artifact report under `artifacts/kanban-speedup/`.
