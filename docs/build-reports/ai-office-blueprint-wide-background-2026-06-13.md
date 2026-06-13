# AI Office Blueprint wide-background pass — 2026-06-13

## Changed files

- `app/ai-office-blueprint/page.tsx`
- `public/images/uploaded/ai-office-blueprint/ai-office-blueprint-hero-wide.jpg`
- `public/images/uploaded/ai-office-blueprint/ai-office-blueprint-book-cover-wide.jpg`

## Scope

Used Jaden-provided wide images as the AI Office Blueprint page backgrounds:

- Source: `/home/jaden/.openclaw/workspace/media/ai-office-blueprint-hero.jpg`
- Source: `/home/jaden/.openclaw/workspace/media/ai-office-blueprint-book-cover.jpg`

Implemented:

- Full-width hero image background instead of the previous max-width contained banner.
- DOM headline/copy/pills/buttons over the wide background.
- Softer left readability gradient.
- Bottom fade into warm cream next-section background.
- Compressed hero spacing/font/card/button sizing so CTAs fit in the short `1280x577` fold.
- Generic PDF section now uses the book-cover wide image as its background and has softer card treatment.

## Commands run

```bash
cd /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page
git status --porcelain | head -50
file /home/jaden/.openclaw/workspace/media/ai-office-blueprint-hero.jpg /home/jaden/.openclaw/workspace/media/ai-office-blueprint-book-cover.jpg
cp /home/jaden/.openclaw/workspace/media/ai-office-blueprint-hero.jpg public/images/uploaded/ai-office-blueprint/ai-office-blueprint-hero-wide.jpg
cp /home/jaden/.openclaw/workspace/media/ai-office-blueprint-book-cover.jpg public/images/uploaded/ai-office-blueprint/ai-office-blueprint-book-cover-wide.jpg
npm run build
npm run start -- -p 3077
node /tmp/stanley-blueprint-screenshot.js
```

## Verification

- Clean-tree gate before edits: passed.
- Source image verification:
  - hero wide: JPEG, `1280x511`
  - book cover wide: JPEG, `1280x548`
- `npm run build`: passed.
- Local page check: `http://127.0.0.1:3077/ai-office-blueprint` returned HTTP 200.
- Screenshot QA:
  - `1280x577` screenshot: `/tmp/ai-office-blueprint-1280x577.png`
  - Strict visual QA result after compression patch: PASS.
  - CTA visibility: PASS.
  - Text readability: PASS.
  - Right-side background clipping: acceptable intentional bleed, no critical content cut.
  - Seamless hero treatment: PASS.

## Deployment

Not deployed. No PM2 restart performed.

## Notes / remaining risk

- The wide hero solves the previous hard contained-image cutoff problem.
- The right rolled blueprint still bleeds off the far right edge slightly; visual QA judged it intentional and non-blocking.
- The page can still be taste-tuned after Jaden reviews the screenshot/live local result.
