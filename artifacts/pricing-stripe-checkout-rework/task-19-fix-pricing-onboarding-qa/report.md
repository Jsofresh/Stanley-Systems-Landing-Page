# Task 19 Fix Pricing/Onboarding QA Findings

Timestamp: 2026-05-05T23:00:42Z
Scope: local code fix and non-production verification only. No deploy, PM2 restart, Stripe mutation, valid onboarding submission, secret access, or OpenClaw runtime mutation was performed.

## Changed files

- `lib/pricing/offers.ts`
  - Replaced the internal Both Systems Monthly disabled reason with user-safe public copy.
- `components/pricing/PlanCard.tsx`
  - Replaced red/orange warning styling with neutral paused-card styling.
  - Removed duplicated visible `Checkout paused` wording by rendering `Monthly checkout unavailable` once.
  - Let paused-plan secondary CTA span the card width and keep the CTA label from wrapping.
- `components/checkout/BuyerOnboardingForm.tsx`
  - Shortened mobile placeholders and moved long examples into helper text.
  - Enlarged SMS consent checkbox, made the label cursor/tap behavior explicit, and increased legal link tap height.
- `components/footer.tsx`
  - Kept the mobile footer to a single column at the narrowest viewport and made link text wrap safely.

## Verification

- `git diff --check`: passed.
- `npm run build`: passed.
- Local server: `PORT=3139 HOSTNAME=127.0.0.1 npm run start`.
- HTTP checks:
  - `/pricing`: 200
  - `/checkout/onboarding`: 200
- Playwright/DOM checks with system Chromium (`/usr/bin/chromium`): passed.
  - `/pricing` desktop 1440x1100: no horizontal overflow (`scrollWidth=1440`, `clientWidth=1440`).
  - `/checkout/onboarding` desktop 1440x1100: no horizontal overflow (`scrollWidth=1440`, `clientWidth=1440`).
  - `/pricing` mobile 390x844: no horizontal overflow (`scrollWidth=390`, `clientWidth=390`).
  - `/checkout/onboarding` mobile 390x844: no horizontal overflow (`scrollWidth=390`, `clientWidth=390`).
  - Visible body text on checked public routes did not include forbidden package names: `Customer Revenue System`, `Follow-Up System`, `Cash Collection System`, `Cash Flow Collection System`.
  - Both Systems Monthly card has `activeStripeLinks=0`.
  - Public pricing text no longer includes `Checkout paused: Checkout paused` or `Stripe currently shows a $495`.
  - Both Systems Monthly Compare CTA measured `184px` inside a `392px` card.
  - Onboarding form placeholders are now: `Jane Smith`, `Your business name`, `jane@company.com`, `+1 (555) 123-4567`, `Current job system`, `Current billing system`, `What should we fix first?`, `Weekday mornings`, `Optional notes`.
  - SMS consent label click toggled checkbox from unchecked to checked.
  - Onboarding legal links measured 28px tap height each.

## Safety confirmation

- No deploy.
- No PM2 restart.
- No Stripe edits.
- No valid onboarding webhook submission.
- No OpenClaw runtime edits.

## Notes

The repo was already heavily dirty with many tracked and untracked changes from prior pricing/site work. This task only intentionally touched the four files listed above plus this report artifact.
