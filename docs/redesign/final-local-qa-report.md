# Stanley Systems Redesign Final Local QA Report

Run timestamp: 2026-05-06T01:40 local loop artifact
Branch: `redesign/skeptical-buyer-flow-20260506T012055Z`
Base commit: `b41427a7`

## Verification

- `git diff --check`: PASS
- `npm run build`: PASS
- Local Next preview: `http://127.0.0.1:3040`
- Screenshot QA script: PASS
  - `/` desktop/mobile: HTTP 200, no horizontal overflow, PNG screenshots written
  - `/pricing` desktop/mobile: HTTP 200, no horizontal overflow, PNG screenshots written
  - `/systems/cashflow-control` desktop/mobile: HTTP 200, no horizontal overflow, PNG screenshots written
  - `/systems/repeat-revenue` desktop/mobile: HTTP 200, no horizontal overflow, PNG screenshots written
- Console/resource 404 issue: FIXED
  - Cause: `@vercel/speed-insights/next` was requesting `/_vercel/speed-insights/script.js` from local/PM2 Next where that Vercel endpoint does not exist.
  - Fix: removed Speed Insights component from `app/layout.tsx` for this PM2-hosted site.
  - Re-run: zero bad responses on checked routes. Homepage desktop only emitted non-blocking headless Chromium GPU `ReadPixels` warnings.
- CTA route QA: PASS
  - Homepage Cashflow CTAs route to `/systems/cashflow-control`.
  - Homepage Repeat Revenue CTAs route to `/systems/repeat-revenue`.
  - Homepage calculator CTAs route to `/invoicing-delay-cash-flow-calculator`.
  - Pricing Both Systems Monthly checkout link is present and equals `https://buy.stripe.com/28EbJ0bDV7U7eeBeNsg7e05`.
  - Rendered internal links on checked pages returned non-4xx statuses.
- Stale public package-name check: PASS
  - Removed public/source occurrences of old public names checked: `Customer Revenue System`, `Follow-Up System`, `Cash Collection System`, `Cash Flow Collection System`, `Cash Flow Collection`.
- Protected path check: PASS
  - No `.env*`, secrets, credentials, PM2/ecosystem, nginx, n8n, QBO, HCP, Twilio, Telegram, OpenClaw config, or Stripe secret-key paths were touched.
  - Diff secret-literal scan found no obvious secrets.

## Screenshots

Final screenshot artifacts are local under:

`artifacts/redesign-final-qa-20260506T0140/screenshots/`

These are intentionally not required for production runtime.

## Deployment state

Not deployed. Stop point is deploy approval.
