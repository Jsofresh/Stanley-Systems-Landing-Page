# Blueprint hero + homepage image update — 2026-06-14

## Changed files

- `app/ai-office-blueprint/page.tsx`
  - Replaced the contained/product-shot hero art treatment with the older wide hero background image: `/images/uploaded/ai-office-blueprint/ai-office-blueprint-hero-wide.jpg`.
  - Made the hero use a full-screen background canvas with a left readability gradient.
  - Lowered the headline/content stack to create clear room below the nav.
  - Tightened hero type/spacing/buttons enough for CTAs to remain fully visible at `1280x577`.
- `components/home/cash-flow-homepage.tsx`
  - Swapped the homepage `#calculator` section visual from the Blueprint product shot to the older office/checklist image: `/images/uploaded/homepage/ai-office/office-desk-invoice-checklist-highvis.jpg`.
  - Resized the right visual card to better fit the wide image and reduced the wash overlay.

## Commands run

- `git status --porcelain | head -50`
- `npm run build`
- Local preview: `PORT=3020 npm run start -- -p 3020`
- Local Playwright verification scripts:
  - `/tmp/stanley_verify_blueprint_home.js`
  - `/tmp/stanley_verify_blueprint_mobile.js`
- Commit: `git commit -m "Refine blueprint hero and homepage image"`
- Deploy: `pm2 restart stanley-landing --update-env`
- Live Playwright verification: `/tmp/stanley_live_verify_blueprint_home.js`

## Build result

- `npm run build` passed.
- Next.js `14.2.25`.
- Static generation completed: `80/80`.

## Verification result

Local and live desktop verification at `1280x577` passed:

- `/ai-office-blueprint`
  - Uses wide background image.
  - Full-screen hero feel.
  - Title/image sit lower with room below nav.
  - CTAs fully visible.
  - No severe crop/blocker.
- `/#calculator`
  - Uses office/checklist image instead of Blueprint product shot.
  - No major visual blockers.

Mobile sanity for `/ai-office-blueprint` at `390x844` passed:

- Headline readable.
- CTAs visible.
- No catastrophic clipping.

## Screenshot proof

- Local desktop hero: `/tmp/ai-office-blueprint-hero-local-1280x577.png`
- Local homepage calculator: `/tmp/home-calculator-old-image-local-1280x577.png`
- Local mobile hero: `/tmp/ai-office-blueprint-hero-local-mobile.png`
- Live desktop hero: `/tmp/ai-office-blueprint-hero-live-1280x577.png`
- Live homepage calculator: `/tmp/home-calculator-old-image-live-1280x577.png`

## Backup / bridge / deviations

- Backup: Git history before the commit.
- Bridge status: Deployed to PM2 app `stanley-landing`.
- Deviations: None.
