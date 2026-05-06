# Pricing + Stripe Checkout Rework — Build/Deploy Plan

Created: 2026-05-05
Owner: Stanley H / ops
Task: t_0e7c4e90 — Task 20: Build and deploy plan
Repo: `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page`
Branch at planning time: `design-loop/20260429T211436Z-3xfco`
HEAD at planning time: `52481195`
Production domain: `https://stanley-systems.com`
Production PM2 process: `stanley-landing` under `PM2_HOME=/home/jaden/.pm2`

## Deployment decision

Do not deploy yet.

This plan is ready, but shipment remains blocked by external Stripe dashboard readiness. No PM2 restart, production deploy, Stripe dashboard/API mutation, payment attempt, or secret handling should happen until the launch blockers below are resolved and a separate deploy gate explicitly authorizes shipment.

## Hard launch blockers before deploy gate

1. Both Systems Monthly Stripe link must be fixed or explicitly re-scoped.
   - Current verified blocker: checkout shows `$495.00` installation and `$1,392.00` due today.
   - Required model: `$897.00` monthly + `$449.00` installation = `$1,346.00` due today.
   - Source artifact: `artifacts/pricing-stripe-checkout-rework/stripe-readiness-remediation-20260505.md`.

2. Repeat Revenue Monthly Stripe-hosted copy must remove the 5-star overpromise.
   - Current verified blocker: Stripe description includes `turns happy customers into 5-star Google reviews`.
   - Required: remove guaranteed/ranking-style review wording.

3. Combined-plan Stripe checkout naming must be resolved.
   - Preferred: rename Stripe visible products/headings to `Both Systems Monthly` and `Both Systems Yearly`.
   - Alternative: Jaden explicitly approves current `Cashflow Control + Repeat Revenue Monthly/Yearly` checkout naming as acceptable.

4. Stripe redirect settings must be verified after routes are deployed/staged.
   - Success URL: `https://stanley-systems.com/checkout/success`
   - Cancel URL: `https://stanley-systems.com/checkout/cancel`
   - Do not assume these are configured until a Stripe dashboard owner verifies each Payment Link.

5. Repo state must be checkpointed before release.
   - Current worktree has broad dirty/untracked changes from sibling tasks/design-loop work.
   - Stage exact shipped pricing/checkout/legal/package files only; do not `git add .`.
   - Protected surfaces must remain untouched: secrets/env, PM2/ecosystem files, nginx/proxy config, OpenClaw runtime, n8n/QBO/HCP/Twilio/Gmail/Telegram config, payment secrets, production workflow files.

## Scope expected to ship

The release should include only the Pricing + Stripe Checkout Rework surfaces that passed local QA:

- Pricing page and pricing components.
- Pricing source of truth with public Stripe Payment Link URLs only.
- Cashflow Control System package route.
- Repeat Revenue System package route.
- Checkout success/cancel pages.
- Checkout onboarding page/API, without test submissions that send real notifications.
- Terms and FAQ consistency updates.
- CTA/link changes needed to route purchase-intent users to package/checkout flow.
- PostHog/client analytics support for checkout clicks if already implemented in this rework.
- Evidence artifacts for this project.

Do not include unrelated design-loop visual-kit changes unless Jaden explicitly approves bundling them with this release.

## Pre-deploy release gate

Run these only after Stripe blockers are resolved and deploy is explicitly authorized.

1. Capture release baseline.
   - `cd /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page`
   - `git status --short`
   - `git diff --name-status`
   - `git branch --show-current`
   - `git rev-parse HEAD`
   - Save outputs under a new artifact directory such as `artifacts/pricing-stripe-checkout-rework/deploy-gate-YYYYMMDD-HHMM/`.

2. Check protected surfaces.
   - Confirm no staged or unstaged deploy-scope diffs in `.env*`, secret files, PM2/ecosystem files, nginx/proxy config, OpenClaw runtime/config, n8n, QBO, HCP, Twilio, Gmail, Telegram, payment-secret/server-secret configuration, or workflow/runtime files.
   - If any protected surface changed, stop and ask Jaden for a narrow decision.

3. Check public naming/source guardrails.
   - Forbidden public package names must be absent from mounted public app/components source:
     - `Customer Revenue System`
     - `Follow-Up System`
     - `Cash Collection System`
     - `Cash Flow Collection System`
   - Required public package names must be present where appropriate:
     - `Workflow Audit`
     - `Cashflow Control System`
     - `Repeat Revenue System`
     - `Both Systems`
   - Source must contain only public `buy.stripe.com` Payment Link URLs for checkout; no Stripe secret keys, custom Checkout Sessions, webhook secrets, or secret values.

4. Check Stripe link readiness in browser without payment.
   - Re-open all 7 Jaden-provided Payment Links.
   - Confirm:
     - Workflow Audit: `$97.00`, product `Workflow Audit`.
     - Cashflow Monthly: `$397.00` monthly + `$199.00` installation = `$596.00` due today.
     - Repeat Monthly: `$697.00` monthly + `$349.00` installation = `$1,046.00` due today and no `5-star` overpromise.
     - Both Monthly: `$897.00` monthly + `$449.00` installation = `$1,346.00` due today; combined naming resolved.
     - Cashflow Yearly: `$3,810.00` yearly, install waived.
     - Repeat Yearly: `$6,690.00` yearly, install waived.
     - Both Yearly: `$8,610.00` yearly, combined naming resolved.
     - Promotion-code entry remains enabled on all package links.
   - Do not submit payment.

5. Build and static checks.
   - `npm run build`
   - `npm run lint` if the project lint command is currently valid; if it fails because `next lint` is unavailable/deprecated, record the exact failure and rely on build plus scoped QA unless Jaden requires lint remediation.
   - `git diff --check -- <exact deploy-scope paths>`

6. Local preview verification on a non-production port.
   - Start a fresh local preview, not the production PM2 port:
     - `PORT=3150 HOSTNAME=127.0.0.1 npm run start`
   - Verify HTTP 200 locally for:
     - `/`
     - `/pricing`
     - `/systems/cashflow-control`
     - `/systems/repeat-revenue`
     - `/checkout/success`
     - `/checkout/cancel`
     - `/checkout/onboarding`
     - `/terms-and-conditions`
   - Run the existing Task 19 QA script if still valid:
     - `QA_BASE_URL=http://127.0.0.1:3150 node artifacts/pricing-stripe-checkout-rework/task-19-package-page-qa/package-page-qa.mjs`
   - Capture desktop and mobile screenshots for the same 7/8 key routes.
   - Verify no horizontal overflow on pricing/package/checkout/onboarding pages.
   - Do not submit the live onboarding/contact form unless notifications are explicitly mocked/disabled; prior testing sent a real lead notification.

7. Git checkpoint.
   - Create a release branch or checkpoint commit before PM2 restart.
   - Stage exact files only.
   - Include artifact report files if they are intended to be preserved in the repo; otherwise leave transient screenshots/logs untracked.
   - Record rollback SHA and rollback command.

## Deploy command

Only after all pre-deploy gates pass and deployment is explicitly authorized:

```bash
cd /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page
npm run build
PM2_HOME=/home/jaden/.pm2 pm2 restart stanley-landing --update-env
```

Do not restart `stanley-landing-preview`, `stanley-website`, OpenClaw processes, n8n, Gmail/Twilio/Telegram processes, or unrelated PM2 apps for this release.

## Post-deploy live verification

After restart, retry through warmup before declaring failure:

```bash
for path in / /pricing /systems/cashflow-control /systems/repeat-revenue /checkout/success /checkout/cancel /checkout/onboarding /terms-and-conditions; do
  for i in 1 2 3 4 5 6; do
    code=$(curl -L -s -o "/tmp/stanley-live-${path//\//_}.html" -w '%{http_code}' "https://stanley-systems.com${path}?verify=pricing-stripe-release")
    echo "$path attempt_$i=$code"
    [ "$code" = "200" ] && break
    sleep 2
  done
  [ "$code" = "200" ] || exit 1
done
```

Live content checks:

- `/pricing` contains required pricing/package copy and public Stripe links.
- `/systems/cashflow-control` and `/systems/repeat-revenue` return 200 and contain package-specific scope/no-guarantee lines.
- `/checkout/success` directs paid buyers to onboarding and states implementation proceeds after fit/access/scope/tool/data review.
- `/checkout/cancel` returns users to package/pricing decision paths.
- `/checkout/onboarding` renders without submitting a real notification.
- `/terms-and-conditions` contains direct package purchase/onboarding review and refund/redirect/pause/custom-scope rights.
- Forbidden public names are absent from live body text on the checked public routes.
- No public Hermes/Codex/OpenClaw/n8n/QBO/HCP/private-backend jargon appears on checked routes.
- Checkout buttons open the expected Stripe Payment Link URL in a new/current tab without completing payment.
- Both Systems Monthly remains paused on the website unless the Stripe dashboard blocker was fixed and the link has been re-enabled intentionally.

Visual/browser checks:

- Capture desktop and mobile screenshots for `/pricing`, package pages, checkout pages, and onboarding.
- Confirm no `Application error`, no console runtime errors attributable to this release, and no horizontal overflow.
- Classify unrelated third-party analytics/script noise separately if page content and assets load correctly.

## Rollback plan

If post-deploy verification fails:

1. Do not attempt Stripe payments or secret-key debugging.
2. Restore the pre-deploy Git SHA/branch or revert the checkpoint commit.
3. Rebuild: `npm run build`.
4. Restart only `stanley-landing` with `PM2_HOME=/home/jaden/.pm2 pm2 restart stanley-landing --update-env`.
5. Re-run live HTTP checks for `/`, `/pricing`, and `/terms-and-conditions` at minimum.
6. Record the failure, rollback SHA, commands, and live status in the deploy artifact directory.

## Current preflight evidence gathered for this plan

- Decision memo read: `artifacts/pricing-stripe-checkout-rework/decision-memo.md`.
- Task 19 local QA report read: `artifacts/pricing-stripe-checkout-rework/task-19-package-page-qa/report.md`.
- Stripe readiness artifact read: `artifacts/pricing-stripe-checkout-rework/stripe-readiness-remediation-20260505.md`.
- Redirect URL artifact read: `artifacts/pricing-stripe-checkout-rework/checkout-redirect-urls.md`.
- `PM2_HOME=/home/jaden/.pm2 pm2 list` shows `stanley-landing` online.
- Current public live preflight before deployment shows:
  - `/` = 200
  - `/pricing` = 200
  - `/systems/cashflow-control` = 404
  - `/systems/repeat-revenue` = 404
  - `/checkout/success` = 404
  - `/checkout/cancel` = 404
  - `/checkout/onboarding` = 404
  - `/terms-and-conditions` = 200
- Source search found 7 public `buy.stripe.com` URLs in `lib/pricing/source-of-truth.ts` and checkout-click tracking logic in `components/posthog-provider.tsx`.
- Scoped public source search found no occurrences of forbidden names in `*.tsx` files for `Customer Revenue System`, `Follow-Up System`, `Cash Collection System`, or `Cash Flow Collection System`.

## Notes for the deploying operator

- The current `pm2 list` without `PM2_HOME=/home/jaden/.pm2` starts/uses the Hermes ops PM2 home and shows no production processes. Use `PM2_HOME=/home/jaden/.pm2` for Jaden's production PM2 list/restart.
- Do not run `hermes claw cleanup`, delete `~/.openclaw`, or mutate OpenClaw runtime.
- Avoid real form/API submissions during verification unless Jaden explicitly approves notification side effects.
- Payment Link URLs are public and safe client-side; Stripe secret keys are not needed for this Payment Links v1 release.
