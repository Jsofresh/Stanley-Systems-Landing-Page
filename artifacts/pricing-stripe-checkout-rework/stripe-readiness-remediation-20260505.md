# Stripe Payment Link Readiness Remediation

Task: `t_f6abbc63` — Launch blocker: Stripe product/link readiness
Date: 2026-05-05
Scope: Browser-only verification of Jaden-provided public Stripe Payment Links. No payment submitted. No secret keys requested or used. No dashboard/API mutations performed.

## Source of truth from Jaden's brief

Required public names:
- Workflow Audit
- Cashflow Control System
- Repeat Revenue System
- Both Systems

Short checkout/product names allowed:
- Cashflow Control
- Repeat Revenue
- Both Systems

Do not use:
- Customer Revenue System
- Follow-Up System
- Cash Collection System

Required prices:
- Workflow Audit: $97
- Cashflow Control Monthly: $397/mo + $199 installation = $596 due today
- Repeat Revenue Monthly: $697/mo + $349 installation = $1,046 due today
- Both Systems Monthly: $897/mo + $449 installation = $1,346 due today
- Cashflow Control Yearly: $3,810/year, installation waived
- Repeat Revenue Yearly: $6,690/year, installation waived
- Both Systems Yearly: $8,610/year, installation waived

## Browser verification results

1. Workflow Audit
- Link: https://buy.stripe.com/4gM7sKgYffmz7Qd8p4g7e02
- Visible heading/product: `Workflow Audit`
- Visible price: `$97.00`
- Status: PASS

2. Cashflow Control Monthly + install
- Link: https://buy.stripe.com/28E7sKdM38Yb2vTaxcg7e03
- Visible checkout heading: `Subscribe to Cashflow Control Monthly`
- Visible product: `Cashflow Control Monthly`
- Visible recurring price: `$397.00` billed monthly
- Visible install line: `Cashflow Control Installation` at `$199.00`
- Visible total due today: `$596.00`
- Promotion-code entry: enabled; checkout shows `Apply`
- Status: PASS

3. Repeat Revenue Monthly + install
- Link: https://buy.stripe.com/cNi7sK5fxgqD5I534Kg7e04
- Visible checkout heading: `Subscribe to Repeat Revenue Monthly`
- Visible product: `Repeat Revenue Monthly`
- Visible recurring price: `$697.00` billed monthly
- Visible install line: `Repeat Revenue Installation` at `$349.00`
- Visible total due today: `$1,046.00`
- Promotion-code entry: enabled; checkout shows `Apply`
- Status: BLOCKER — product description overpromises with `turns happy customers into 5-star Google reviews`

4. Both Systems Monthly + install
- Link: https://buy.stripe.com/28EbJ0bDV7U7eeBeNsg7e05
- Visible checkout heading: `Subscribe to Cashflow Control + Repeat Revenue Monthly`
- Visible product: `Cashflow Control + Repeat Revenue Monthly`
- Visible recurring price: `$897.00` billed monthly
- Visible install line: `Cashflow Control + Repeat Revenue Monthly Installation` at `$495.00`
- Visible total due today: `$1,392.00`
- Required from brief: `$897.00` billed monthly + `$449.00` installation = `$1,346.00` due today
- Promotion-code entry: enabled; checkout shows `Apply`
- Status: BLOCKER — install amount is wrong; combined product naming does not use `Both Systems`

5. Cashflow Control Yearly
- Link: https://buy.stripe.com/aFa3cu5fxa2f3zX7l0g7e07
- Visible checkout heading: `Subscribe to Cashflow Control Yearly`
- Visible product: `Cashflow Control Yearly`
- Visible yearly price: `$3,810.00`
- Visible monthly-equivalent text: `$317.50 / month billed annually`
- Promotion-code entry: enabled; checkout shows `Apply`
- Status: PASS

6. Repeat Revenue Yearly
- Link: https://buy.stripe.com/6oUaEW0Zh7U72vTcFkg7e06
- Visible checkout heading: `Subscribe to Repeat Revenue Yearly`
- Visible product: `Repeat Revenue Yearly`
- Visible yearly price: `$6,690.00`
- Visible monthly-equivalent text: `$557.50 / month billed annually`
- Promotion-code entry: enabled; checkout shows `Apply`
- Status: PASS

7. Both Systems Yearly
- Link: https://buy.stripe.com/eVq3cu9vN5LZgmJfRwg7e08
- Visible checkout heading: `Subscribe to Cashflow Control + Repeat Revenue Yearly`
- Visible product: `Cashflow Control + Repeat Revenue Yearly`
- Visible yearly price: `$8,610.00`
- Visible monthly-equivalent text: `$717.50 / month billed annually`
- Promotion-code entry: enabled; checkout shows `Apply`
- Status: BLOCKER unless Jaden approves `Cashflow Control + Repeat Revenue Yearly` as acceptable checkout naming. Brief-preferred short checkout/product name is `Both Systems`.

## Exact Stripe dashboard edits needed

These require the Stripe dashboard owner. Do not use secret keys for this.

### Required before launch

1. Payment Link: Both Systems Monthly + install
- Public URL: https://buy.stripe.com/28EbJ0bDV7U7eeBeNsg7e05
- Current visible checkout heading/product: `Cashflow Control + Repeat Revenue Monthly`
- Current install line: `Cashflow Control + Repeat Revenue Monthly Installation` at `$495.00`
- Required edit: change the installation line amount from `$495.00` to `$449.00` so total due today becomes `$1,346.00`.
- Required edit: rename combined monthly product/checkout display to `Both Systems Monthly` and install line to `Both Systems Monthly Installation`, unless Jaden explicitly approves the longer `Cashflow Control + Repeat Revenue Monthly` name.

2. Payment Link: Repeat Revenue Monthly + install
- Public URL: https://buy.stripe.com/cNi7sK5fxgqD5I534Kg7e04
- Current risky copy: `turns happy customers into 5-star Google reviews`
- Required edit: remove the guaranteed/overpromising `5-star` wording.
- Suggested replacement description: `Get more money from the customers you already earned. Stanley Systems helps bring old customers back, request fresh reviews, create referral opportunities, and catch extra calls.`

3. Payment Link: Both Systems Yearly
- Public URL: https://buy.stripe.com/eVq3cu9vN5LZgmJfRwg7e08
- Current visible checkout heading/product: `Cashflow Control + Repeat Revenue Yearly`
- Required edit: rename combined yearly product/checkout display to `Both Systems Yearly`, unless Jaden explicitly approves the longer `Cashflow Control + Repeat Revenue Yearly` name.

### Already verified OK

Promotion-code entry appears enabled on all package links checked:
- Cashflow Control Monthly
- Repeat Revenue Monthly
- Both Systems Monthly
- Cashflow Control Yearly
- Repeat Revenue Yearly
- Both Systems Yearly

No `Customer Revenue`, `Follow-Up System`, or `Cash Collection System` public product naming was visible in the checked Stripe pages.

## Launch gate recommendation

Do not mark Stripe readiness as launch-ready until a Stripe dashboard owner completes the edits above and a follow-up browser verification confirms:
- Both Systems Monthly shows `$449.00` installation and `$1,346.00` due today.
- Repeat Revenue Monthly no longer says `5-star Google reviews`.
- Combined plan naming is either changed to `Both Systems Monthly/Yearly` or explicitly approved by Jaden as `Cashflow Control + Repeat Revenue Monthly/Yearly` for checkout.
- Promotion-code entry remains enabled on all package links.
