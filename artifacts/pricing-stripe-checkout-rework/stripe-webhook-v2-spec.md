# Stripe Webhook v2 Spec

Date: 2026-05-05
Status: draft_spec, future implementation only
Owner: Stanley H ops
Scope: Future server-side Stripe webhook handling for the Pricing + Stripe Checkout Rework.

This is a spec only. Do not implement it in the current Payment Links v1 pass. Do not deploy, restart PM2, edit secrets, or touch OpenClaw runtime from this task.

## Purpose

Stripe Payment Links v1 can collect payment and redirect the buyer, but the site still needs a future server-side confirmation path before Stanley Systems treats a purchase as operationally received.

Webhook v2 will add `/api/stripe/webhook` so the site can:

- verify Stripe webhook signatures server-side
- process `checkout.session.completed`
- process async payment outcomes for delayed payment methods
- prevent duplicate processing across Stripe retries and local retries
- store only safe operational fields
- create an onboarding task or notification for paid buyers
- optionally send server-side PostHog events without exposing buyer details or secrets to the browser

## Non-goals

Do not use this v2 spec to:

- replace Stripe Payment Links v1 with server-created Checkout Sessions
- create or edit Stripe products, prices, coupons, or Payment Links
- request or expose Stripe secret values
- write to QBO, HCP, Gmail, Twilio, n8n, Telegram, OpenClaw, or production workflow files
- start fulfillment automatically without a paid-buyer onboarding/review step
- promise implementation start, guaranteed revenue, customers, reviews, referrals, rankings, or unlimited custom development
- store raw Stripe event payloads, full Checkout Session objects, raw form submissions, raw financial records, or secrets

## Public naming rules

Use these public package names only:

- Workflow Audit
- Cashflow Control System
- Repeat Revenue System
- Both Systems

Do not use these public package names:

- Customer Revenue System
- Follow-Up System
- Cash Collection System
- Cash Flow Collection System

Stripe short checkout/product names may remain the short approved names from the source-of-truth model where applicable: Cashflow Control, Repeat Revenue, Both Systems.

## Required server-only environment variables

These names may appear in server code and docs, but secret values must never be committed, logged, sent to analytics, or exposed to client components.

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_IDS`

`STRIPE_PRICE_IDS` should be parsed server-side into an allowlist mapping approved Stripe price IDs to internal package IDs. It must not be exposed through `NEXT_PUBLIC_*` env or bundled client code.

Optional server-side env, only if implementation needs it:

- `STANLEY_PAID_BUYER_NOTIFICATION_WEBHOOK_URL` for an internal notification/task webhook
- `POSTHOG_PROJECT_API_KEY` and `POSTHOG_HOST` for server-side PostHog capture

If optional env vars are missing, webhook processing must still acknowledge Stripe safely after recording the payment event state that can be recorded locally.

## Route contract

Create this route in a future build task:

- `app/api/stripe/webhook/route.ts`
- Method: `POST`
- Runtime: Node.js runtime, not Edge, unless the Stripe SDK and raw-body signature verification are proven to work in Edge for this app

Required behavior:

1. Read the request body as the exact raw text or raw bytes required by Stripe signature verification.
2. Read the Stripe signature header: `stripe-signature`.
3. Verify the event with `STRIPE_WEBHOOK_SECRET` before parsing business fields.
4. Return `400` on missing signature, missing webhook secret, or signature verification failure.
5. Never call `request.json()` before signature verification.
6. Process only explicitly allowed event types.
7. Return `200` for allowed events after durable idempotency is recorded, even when downstream notification is unavailable.
8. Return `200` for unknown but validly signed event types after recording or logging a safe ignored-event note, so Stripe does not retry forever for irrelevant events.

## Event types

### Required: `checkout.session.completed`

Use this as the primary paid-checkout signal.

Processing rules:

- Require `session.id`.
- Require `session.payment_status` to be `paid` before treating the buyer as paid.
- Map the checkout to an internal package using Stripe line item price IDs, session metadata, or both.
- Prefer price ID allowlist validation over trusting metadata.
- If price ID lookup is not possible from the event payload alone, retrieve line items from Stripe server-side using `STRIPE_SECRET_KEY`.
- Reject or quarantine sessions whose price IDs are not in `STRIPE_PRICE_IDS`.
- Do not trust browser-provided package IDs, prices, totals, or public URL query params as the source of truth.

Expected approved package IDs from the current source-of-truth model:

- `workflow_audit`
- `cashflow_control_monthly`
- `repeat_revenue_monthly`
- `both_systems_monthly`
- `cashflow_control_yearly`
- `repeat_revenue_yearly`
- `both_systems_yearly`

### Required async payment events

Handle delayed/async payment outcomes so operations is not triggered for a payment that later fails.

Minimum required events:

- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

Recommended related events if the selected Stripe payment methods require them:

- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `payment_intent.processing`

Async rules:

- For `checkout.session.async_payment_succeeded`, mark the stored checkout/payment as paid if the session and price IDs match the allowlist.
- For `checkout.session.async_payment_failed`, mark the stored checkout/payment as failed and do not create onboarding fulfillment.
- For `payment_intent.*`, update payment status only when the PaymentIntent can be connected to a known checkout session or stored payment record.
- Never create duplicate onboarding tasks from both `checkout.session.completed` and `payment_intent.succeeded`.

## Duplicate prevention and idempotency

Stripe retries webhooks and can deliver events out of order. Implementation must be idempotent.

Required duplicate-prevention keys:

- Stripe event ID: unique key, store every processed event ID once
- Stripe checkout session ID: unique paid-buyer/order key where available
- Stripe payment intent ID: secondary key where available

Processing sequence:

1. Verify signature.
2. Extract `event.id`, `event.type`, and `event.created`.
3. Try to insert `event.id` into a durable processed-events store with a unique constraint.
4. If insert fails because the event ID already exists, return `200` and do nothing else.
5. For purchase events, upsert a checkout/order record by `checkout_session_id`.
6. Create onboarding notification only after the checkout/order record transitions into a paid state for the first time.
7. Store notification status separately so a notification retry does not duplicate the payment record.

If a database is not yet available in this Next.js app, the future implementation task must first choose a durable store. Do not use in-memory sets, module-level arrays, or temp files for production idempotency.

## Safe stored fields

Store only fields needed for reconciliation, support, and onboarding.

Allowed payment/order fields:

- `stripe_event_id`
- `stripe_event_type`
- `stripe_event_created_at`
- `stripe_checkout_session_id`
- `stripe_payment_intent_id`
- `stripe_customer_id`
- `customer_email` if supplied by Stripe checkout
- `customer_name` if supplied by Stripe checkout
- `package_id`
- `package_public_name`
- `billing_period`
- `stripe_price_id`
- `amount_total`
- `currency`
- `payment_status`
- `mode`
- `created_at`
- `updated_at`
- `onboarding_status`
- `notification_status`
- `notification_last_attempt_at`
- `source_page`, `source_section`, `cta_label`, and UTM fields if already present as compact metadata

Do not store:

- raw Stripe event JSON
- full Checkout Session JSON
- card details or payment method details
- secret keys or webhook secrets
- raw calculator inputs that could reveal private finances
- raw customer lists, invoice lists, job records, or CRM exports
- long free-text form submissions in the payment record

If raw Stripe payload retention is ever required for audit/debugging, make it a separate explicitly approved security task with redaction, TTL, access controls, and no chat exposure.

## Package and price allowlist

The server must map Stripe price IDs to internal package IDs from `STRIPE_PRICE_IDS`.

Recommended serialized shape:

```json
{
  "workflow_audit": ["price_..."],
  "cashflow_control_monthly": ["price_..."],
  "repeat_revenue_monthly": ["price_..."],
  "both_systems_monthly": ["price_..."],
  "cashflow_control_yearly": ["price_..."],
  "repeat_revenue_yearly": ["price_..."],
  "both_systems_yearly": ["price_..."]
}
```

The example above shows placeholders only. Do not commit real price IDs if Jaden considers them private. If real price IDs are already public through Payment Links, they may still stay server-only for this v2 implementation.

Validation requirements:

- exactly one approved internal package must be resolved per paid checkout
- unknown price IDs are quarantined and must not create onboarding tasks
- amount mismatches against the local source-of-truth model should be flagged for review, not silently corrected
- current known launch blocker: Both Systems monthly install line was spot-checked as `$495` in Stripe while the approved model says `$449 installation`; v2 must surface this as a reconciliation warning if still present

## Onboarding task / notification

After first paid-state transition, create exactly one internal onboarding task or notification.

Recommended payload:

```json
{
  "event": "paid_buyer_checkout_completed",
  "checkout_session_id": "cs_...",
  "payment_intent_id": "pi_...",
  "package_id": "cashflow_control_monthly",
  "package_public_name": "Cashflow Control System",
  "billing_period": "monthly",
  "customer_email": "buyer@example.com",
  "customer_name": "Buyer Name",
  "amount_total": 59600,
  "currency": "usd",
  "payment_status": "paid",
  "source_page": "/pricing",
  "source_section": "pricing-card",
  "cta_label": "Buy Cashflow Control Monthly"
}
```

Notification rules:

- Send only after signature verification, allowlist validation, and idempotent paid-state transition.
- Do not include secret values or raw Stripe objects.
- Do not include full form submissions or private customer records.
- If notification delivery fails, keep the payment/order record and mark `notification_status` as failed or pending retry.
- Return `200` to Stripe if the payment/order was safely recorded; retry notification through a separate controlled mechanism instead of forcing Stripe retries to duplicate payment processing.

Acceptable notification destinations for a future task:

- an internal webhook URL controlled by Stanley Systems
- a database-backed task queue
- a durable internal admin table/list for paid buyer follow-up

Do not write directly to QBO, HCP, Gmail, Twilio, n8n, Telegram, or OpenClaw runtime from this webhook unless a later task explicitly approves that integration.

## Optional server-side PostHog

Server-side PostHog is optional and must be non-sensitive.

Allowed events:

- `stripe_webhook_received`
- `stripe_checkout_paid`
- `stripe_async_payment_succeeded`
- `stripe_async_payment_failed`
- `paid_buyer_onboarding_notification_created`
- `paid_buyer_onboarding_notification_failed`

Allowed properties:

- `event_type`
- `package_id`
- `billing_period`
- `amount_total`
- `currency`
- `payment_status`
- `source_page`
- `source_section`
- `cta_label`
- UTM fields

Do not send:

- secret values
- raw Stripe payloads
- full customer names if avoidable
- raw emails unless Jaden explicitly approves analytics identity handling
- raw financial/customer/job records

If identity linking is needed later, write a separate analytics privacy spec before implementation.

## Error handling

Return statuses:

- `200`: valid signature, event ignored or processed safely
- `200`: duplicate event ID already processed
- `400`: missing signature, missing webhook secret, invalid signature, malformed payload
- `500`: unexpected server/storage failure before idempotency or payment state can be safely recorded

Logging rules:

- Logs may include env var names that are missing, event ID, event type, session ID, package ID, and safe status codes.
- Logs must not include secret values, raw event JSON, customer financial records, or full webhook payloads.

## Acceptance criteria for future implementation

A future implementation passes when:

1. `app/api/stripe/webhook/route.ts` verifies Stripe signatures with `STRIPE_WEBHOOK_SECRET` using the raw request body.
2. The route never calls `request.json()` before verification.
3. `checkout.session.completed` creates or updates exactly one paid checkout/order record only for allowed price IDs.
4. Async success/failure events update status without duplicating onboarding.
5. Duplicate Stripe event IDs return `200` without repeating side effects.
6. Duplicate checkout session IDs do not create duplicate onboarding tasks.
7. Stored records contain only the safe fields listed in this spec.
8. Unknown price IDs are quarantined and do not trigger onboarding.
9. Missing optional notification/PostHog env does not break Stripe acknowledgement after safe local recording.
10. No client component imports or reads `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, or `STRIPE_PRICE_IDS`.
11. Static search finds no committed secret values and no raw Stripe payload dumps.
12. Tests cover valid signature, invalid signature, duplicate event, completed checkout, async success, async failure, unknown price ID, and notification failure.
13. No QBO, HCP, Gmail, Twilio, n8n, Telegram, or OpenClaw runtime files are changed.

## Future build notes

Recommended future files, subject to the implementer confirming current repo structure:

- Create `app/api/stripe/webhook/route.ts`
- Create `lib/stripe/webhook.ts` for signature construction, event dispatch, and safe field extraction
- Create `lib/stripe/price-allowlist.ts` for `STRIPE_PRICE_IDS` parsing and package mapping
- Create `lib/paid-buyers/store.ts` or equivalent after choosing a durable store
- Create `lib/paid-buyers/notify.ts` for onboarding notification delivery
- Add tests near the app's existing test conventions; if none exist, create focused route/helper tests without broad test framework churn

Do not begin this future build until Jaden explicitly approves a v2 webhook implementation task and the durable storage choice is resolved.
