# Task 18 Visual + Mobile QA Report

Scope: Pricing + Stripe Checkout Rework local verification only. No deploy, PM2 restart, Stripe mutation, secret access, OpenClaw runtime mutation, or valid onboarding submission was performed.

Local base URL tested: `http://127.0.0.1:3138`
Viewports: desktop `1440x1100`, mobile `390x844`

## Verdict

Status: built_pending_verification with QA findings.

Blocking before public shipment:
1. Pricing page Both Systems Monthly public warning is visually dominant and duplicates the label: `Checkout paused: Checkout paused: Stripe currently shows a $495 install line, but the approved site price is $449.` This reads like an internal launch/blocker note and also violates the no-orange/no-warning-feel direction.
2. Pricing cards have visual balance issues around Both Systems Monthly: the paused warning makes the monthly card taller/heavier, and `Compare Both Systems` wraps awkwardly on desktop.

Non-blocking polish findings:
1. Mobile onboarding form has long single-line placeholders that visually clip/truncate (`Housecall Pro, ServiceTitan, Jobber, ...`, `QuickBooks, Xero, Stripe, invoices b...`). Move examples to helper text or shorten placeholders.
2. Mobile onboarding checkbox is small; verify the full SMS consent label toggles the checkbox and legal links have comfortable tap spacing.
3. Mobile footer wraps phone/email awkwardly in narrow columns; consider single-column footer on narrow mobile.
4. Desktop pricing price-breakdown rows are readable but dense/tightly wrapped.

## Passed Checks

- `npm run build`: passed.
- Local `next start` on `127.0.0.1:3138`: returned HTTP 200 for tested routes.
- Routes screenshot-tested on desktop and mobile:
  - `/pricing`
  - `/#calculator`
  - `/systems/cashflow-control`
  - `/systems/repeat-revenue`
  - `/checkout/success`
  - `/checkout/cancel`
  - `/checkout/onboarding`
  - `/`
- Horizontal overflow: PASS on all tested desktop/mobile routes (`scrollWidth <= clientWidth`).
- Forbidden public package names visible in tested route body text: PASS. None of `Customer Revenue System`, `Follow-Up System`, `Cash Collection System`, or `Cash Flow Collection System` rendered on tested routes.
- Placeholder/lorem/TODO/TBD visible in tested route body text: PASS.
- Stripe Payment Link presence on pricing CTAs:
  - Workflow Audit: PASS, `https://buy.stripe.com/4gM7sKgYffmz7Qd8p4g7e02`
  - Cashflow Control Monthly: PASS, `https://buy.stripe.com/28E7sKdM38Yb2vTaxcg7e03`
  - Repeat Revenue Monthly: PASS, `https://buy.stripe.com/cNi7sK5fxgqD5I534Kg7e04`
  - Cashflow Control Yearly: PASS, `https://buy.stripe.com/aFa3cu5fxa2f3zX7l0g7e07`
  - Repeat Revenue Yearly: PASS, `https://buy.stripe.com/6oUaEW0Zh7U72vTcFkg7e06`
  - Both Systems Yearly: PASS, `https://buy.stripe.com/eVq3cu9vN5LZgmJfRwg7e08`
  - Both Systems Monthly active checkout link: correctly absent/paused because the known Stripe install mismatch remains unresolved.
- Homepage/header/footer Workflow Audit CTAs: point to the Workflow Audit Stripe Payment Link where tested.
- Onboarding form missing-required validation: PASS. Empty submit produced native required-field validation messages. No valid form submission was sent.
- Scope notes: present in practical wording on pricing/package/success routes, including onboarding/intake, fit/access/scope review, refund/redirect/pause/custom scope before work begins, and no-guarantee limits.

## Console Notes

Every tested route logged one non-blocking 404 resource error in local Playwright. No page runtime exceptions were detected. The local route content still rendered and screenshots were captured.

## Screenshot Evidence

Desktop screenshots:
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/desktop-pricing.png`
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/desktop-calculator-intro-home.png`
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/desktop-cashflow-detail.png`
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/desktop-repeat-revenue-detail.png`
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/desktop-checkout-success.png`
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/desktop-checkout-cancel.png`
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/desktop-onboarding-form.png`
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/desktop-homepage-cta.png`
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/desktop-onboarding-validation.png`

Mobile screenshots:
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/mobile-pricing.png`
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/mobile-calculator-intro-home.png`
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/mobile-cashflow-detail.png`
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/mobile-repeat-revenue-detail.png`
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/mobile-checkout-success.png`
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/mobile-checkout-cancel.png`
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/mobile-onboarding-form.png`
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/screenshots/mobile-homepage-cta.png`

Raw machine results:
- `artifacts/pricing-stripe-checkout-rework/task-18-visual-mobile-qa/qa-raw-results.json`

## Commands Run

- `git status --short`
- `git diff --name-status`
- source naming scan over `app`, `components`, and `lib/pricing`
- `npm run build`
- `PORT=3138 HOSTNAME=127.0.0.1 npm run start`
- Playwright screenshot/DOM QA script against local server
- targeted `curl` body-text checks for scope notes and key route copy

## Notes

- The source scan found forbidden package names only inside non-rendered explanatory notes in `lib/pricing/source-of-truth.ts`; tested public route body text did not render those names.
- The source scan found `guaranteed revenue` in no-guarantee/legal context (`does not guarantee ...`), not as a public guarantee claim.
- Both Systems Monthly remains paused by design until the Stripe install mismatch is resolved.
