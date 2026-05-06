# Stripe dashboard readiness gate

Task: `t_9fbf302a` — Stripe dashboard readiness gate for Pricing + Checkout launch
Checked: 2026-05-05T23:09:51Z
Scope: Public browser inspection of active Stripe Payment Links and public checkout redirect routes only. No payment submitted. No Stripe secret keys requested or used. No Stripe dashboard/API mutation performed.

## Gate result

Status: BLOCKED / NOT LAUNCH-READY

The same Stripe dashboard blockers remain present on public Payment Links:

1. Both Systems Monthly still does not match the approved model.
   - Link: https://buy.stripe.com/28EbJ0bDV7U7eeBeNsg7e05
   - Current visible heading/product: `Subscribe to Cashflow Control + Repeat Revenue Monthly`
   - Current recurring line: `$897.00` per month
   - Current installation line: `Cashflow Control + Repeat Revenue Monthly Installation` at `$495.00`
   - Current total due today: `$1,392.00`
   - Approved required model: `$897.00` monthly + `$449.00` installation = `$1,346.00` due today
   - Result: FAIL

2. Repeat Revenue Monthly Stripe-hosted copy still contains the ranking/review overpromise.
   - Link: https://buy.stripe.com/cNi7sK5fxgqD5I534Kg7e04
   - Current visible copy includes: `turns happy customers into 5-star Google reviews`
   - Requirement: remove the 5-star / ranking-style overpromise
   - Result: FAIL

3. Combined-plan checkout naming is still unresolved.
   - Both Systems Monthly link currently shows `Cashflow Control + Repeat Revenue Monthly`, not `Both Systems Monthly`.
   - Both Systems Yearly link currently shows `Cashflow Control + Repeat Revenue Yearly`, not `Both Systems Yearly`.
   - Preferred visible names remain `Both Systems Monthly` and `Both Systems Yearly` unless Jaden explicitly approves the current longer names.
   - Result: BLOCKED pending Stripe dashboard rename or Jaden approval of current naming

4. Success/cancel redirect configuration could not be verified from public Payment Link pages.
   - Required success URL: https://stanley-systems.com/checkout/success
   - Required cancel URL: https://stanley-systems.com/checkout/cancel
   - Public route spot-checks currently load a client-side application error on the live domain, with chunk-load failures in browser console.
   - Stripe Payment Link success/cancel redirect settings are dashboard-only and were not exposed in the public checkout page inspection.
   - Result: BLOCKED pending Stripe dashboard access/owner verification after route deployment/staging is healthy

## Current evidence snapshots from public inspection

### Both Systems Monthly

Observed on the public Stripe Checkout page:
- `Subscribe to Cashflow Control + Repeat Revenue Monthly`
- `$1,392.00`
- `Then $897.00 per month`
- `Cashflow Control + Repeat Revenue Monthly`
- `Cashflow Control + Repeat Revenue Monthly Installation` — `$495.00`
- `Total due today` — `$1,392.00`
- Promotion code field visible as `Add promotion code`

### Repeat Revenue Monthly

Observed on the public Stripe Checkout page:
- `Subscribe to Repeat Revenue Monthly`
- `$1,046.00`
- `Then $697.00 per month`
- `Repeat Revenue Monthly`
- Copy: `Get more money from the customers you already earned. Stanley Systems brings old customers back, turns happy customers into 5-star Google reviews, turns reviews into referrals, and catches extra calls.`
- `Repeat Revenue Installation` — `$349.00`
- `Total due today` — `$1,046.00`
- Promotion code field visible as `Add promotion code`

### Both Systems Yearly

Observed on the public Stripe Checkout page:
- `Subscribe to Cashflow Control + Repeat Revenue Yearly`
- `$8,610.00`
- `$717.50 / month billed annually`
- `Cashflow Control + Repeat Revenue Yearly`
- `Total due today` — `$8,610.00`
- Promotion code field visible as `Add promotion code`

## Exact unblock request

A Stripe dashboard owner needs to either perform these dashboard changes or explicitly authorize Jaden/Stanley H to make exactly these changes in Stripe:

1. Both Systems Monthly Payment Link
   - Change installation amount from `$495.00` to `$449.00` so total due today becomes `$1,346.00`.
   - Rename visible combined monthly product/checkout display to `Both Systems Monthly` and install line to `Both Systems Monthly Installation`, unless Jaden approves the current `Cashflow Control + Repeat Revenue Monthly` naming.

2. Repeat Revenue Monthly Payment Link
   - Remove `5-star Google reviews` / ranking-style copy.
   - Safe replacement: `Get more money from the customers you already earned. Stanley Systems helps bring old customers back, request fresh reviews, create referral opportunities, and catch extra calls.`

3. Both Systems Yearly Payment Link
   - Rename visible combined yearly product/checkout display to `Both Systems Yearly`, unless Jaden approves the current `Cashflow Control + Repeat Revenue Yearly` naming.

4. Active Payment Links redirect settings
   - Verify every active Payment Link uses:
     - Success URL: `https://stanley-systems.com/checkout/success`
     - Cancel URL: `https://stanley-systems.com/checkout/cancel`
   - Re-check after the routes are deployed/staged and not returning client-side chunk-load errors.

## Metadata values for gate

- blockers_resolved: false
- both_monthly_due_today: `$1,392.00 observed; required $1,346.00`
- repeat_copy_ok: false
- combined_naming_status: `blocked: current Stripe names are Cashflow Control + Repeat Revenue Monthly/Yearly; preferred names are Both Systems Monthly/Yearly unless Jaden approves current names`
- redirects_verified: false
- artifact_path: `artifacts/pricing-stripe-checkout-rework/stripe-dashboard-readiness-gate-20260505.md`
