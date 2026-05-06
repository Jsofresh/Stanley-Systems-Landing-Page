# Live Deploy Summary — Pricing + Stripe Checkout Rework

Timestamp: 2026-05-05T23:31Z

## User decisions

- Repeat Revenue Stripe-hosted `5-star` copy accepted by Jaden for now.
- Combined-plan Stripe naming accepted by Jaden for now.
- Jaden said Both Systems Monthly install mismatch was fixed, but a public Stripe checkout verification during this deploy still showed `$495.00` installation / `$1,392.00` due today on `https://buy.stripe.com/28EbJ0bDV7U7eeBeNsg7e05`.

## Deployment action

- Built the Next.js app with `npm run build`.
- Restarted only the production PM2 process `stanley-landing` using `PM2_HOME=/home/jaden/.pm2 pm2 restart stanley-landing --update-env`.
- Did not mutate Stripe dashboard settings, secrets, OpenClaw runtime, n8n, Gmail, Twilio, QBO, HCP, or other protected services.

## Live pages verified

All returned HTTP 200 after PM2 warmup:

- `/pricing`
- `/systems/cashflow-control`
- `/systems/repeat-revenue`
- `/checkout/success`
- `/checkout/cancel`
- `/checkout/onboarding`
- `/terms-and-conditions`
- `/sitemap.xml`

## Success/cancel redirect pages

The needed pages for Stripe redirects are live:

- Success URL: `https://stanley-systems.com/checkout/success`
- Cancel URL: `https://stanley-systems.com/checkout/cancel`

The live success page contains the required title and four-step process:

- `Payment received. Here is what happens next.`
- `Fill out the onboarding form`
- `Book your kickoff or audit call`
- `Stanley Systems reviews your info`
- `We begin setup or audit`

## Remaining Stripe dashboard action

Stripe Payment Links still need their dashboard redirect settings pointed to:

- Success: `https://stanley-systems.com/checkout/success`
- Cancel: `https://stanley-systems.com/checkout/cancel`

This repo deployment created and verified the destination pages. It did not change Stripe dashboard settings because no dashboard/API mutation was available in this environment.

## Both Systems Monthly safety state

Because public Stripe verification still showed the old `$495.00` installation amount during this deploy, the website still does not expose the Both Systems Monthly checkout link. It remains safer to keep paused until that Stripe page visibly shows `$449.00` installation / `$1,346.00` due today.
