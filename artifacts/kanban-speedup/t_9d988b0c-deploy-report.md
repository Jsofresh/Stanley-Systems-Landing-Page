# t_9d988b0c deploy report

Run time: 2026-05-05T00:56:07+00:00
Repo: /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page
Task: Fix public copy QA blockers before pricing/homepage deploy.

## Changed files

- components/calculator-path-section.tsx
- components/how-it-works-section.tsx
- components/pricing-section.tsx
- components/best-fit-section.tsx

## Scope

Removed unsupported-looking public dollar amounts from the homepage funnel source refs flagged by the copy QA report while keeping approved public naming:

- Cash Flow Collection System
- Repeat Revenue System
- Repeat Revenue System
- Cash Flow Collection System

## Commands run

- Source check for forbidden dollar amounts in the four scoped files.
- `git diff --check -- components/calculator-path-section.tsx components/how-it-works-section.tsx components/pricing-section.tsx components/best-fit-section.tsx`
- `npm run build`
- `PM2_HOME=/home/jaden/.pm2 pm2 restart stanley-landing --update-env`
- Live copy QA script against:
  - `https://stanley-systems.com/?verify=copy-qa-20260505`
  - `https://stanley-systems.com/pricing?verify=copy-qa-20260505`
- `PM2_HOME=/home/jaden/.pm2 pm2 list | grep -E 'stanley-landing|name'`

## Verification

- `npm run build`: passed.
- PM2 restart: `stanley-landing` restarted and reported online.
- Live `/`: HTTP 200 on first try.
- Live `/pricing`: HTTP 200 on first try.
- Live `/` visible text: forbidden dollar amounts absent, internal tool names absent, approved names present.
- Live `/pricing` visible text: forbidden dollar amounts absent, internal tool names absent.

## Notes

The repo already had many unrelated modified and untracked files before this task. This task touched only the four scoped component files above plus this deploy report artifact.
