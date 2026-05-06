# Checkout success/cancel redirect URLs

Created for Task 5: Checkout success and cancel pages.

Use these public URLs in Stripe Payment Link dashboard redirect settings after this route work is deployed:

- Success URL: `https://stanley-systems.com/checkout/success`
- Cancel URL: `https://stanley-systems.com/checkout/cancel`

Do not treat these as configured in Stripe until a human with Stripe dashboard access verifies each Payment Link redirect setting.

Notes:
- This rework uses Stripe Payment Links v1 only.
- No Stripe secret keys or custom Checkout Sessions were added.
- Older architecture docs mention `?session_id={CHECKOUT_SESSION_ID}` for custom Checkout Sessions. This task does not require or verify a session_id because Payment Links v1 dashboard redirects are configured in Stripe, outside this repo.
