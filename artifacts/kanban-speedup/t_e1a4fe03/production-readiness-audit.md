# No-deploy production readiness audit — t_e1a4fe03

Timestamp: 2026-05-05T00:48:18Z
Repo: /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page
Branch: design-loop/20260429T211436Z-3xfco
HEAD: 52481195

## Decision

PASS WITH RISKS for build/deploy prerequisites from local repo state.

I did not deploy and did not restart the production PM2 process. I only wrote files under artifacts/kanban-speedup/t_e1a4fe03/.

## Verification run

- `git status --short`: dirty tree with broad tracked edits and many untracked new routes/components/assets/docs/artifacts.
- `git diff --stat`: 34 tracked files changed, 1400 insertions, 1248 deletions.
- `git diff --name-status`: tracked app/component changes only in the current diff set.
- `git ls-files --others --exclude-standard`: many untracked app/dev routes, app/pricing, pricing components, visual-kit assets, docs, prior QA artifacts, and this audit artifact.
- `git diff --check`: passed, exit 0.
- `npm run build`: passed. Next.js compiled successfully, skipped type validation per `next.config.mjs`, generated 48 static pages, and exposed `/pricing` as a dynamic route.
- PM2 production process inspection was read-only using `PM2_HOME=/home/jaden/.pm2`.

Logs:
- artifacts/kanban-speedup/t_e1a4fe03/git-diff-check.log
- artifacts/kanban-speedup/t_e1a4fe03/npm-run-build.log

## Deploy command assumption

Project instructions and live PM2 inspection agree that the production deploy command should be:

```bash
npm run build
PM2_HOME=/home/jaden/.pm2 pm2 restart stanley-landing --update-env
```

Project AGENTS.md names the deploy process as `stanley-landing` and says deployment is `npm run build` followed by `pm2 restart stanley-landing --update-env`.

Live read-only PM2 describe for `stanley-landing` showed:
- Status: online
- PM2 id: 39
- Exec cwd: /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page
- Script: /usr/bin/bash
- Args: `-c cd /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page && ./node_modules/.bin/next start -p 3012 -H 127.0.0.1`

Important execution note: the Hermes ops profile has `HOME=/home/jaden/.hermes/profiles/ops/home`, so plain `pm2 ...` targets the profile-local PM2 home, not Jaden's production PM2. Use `PM2_HOME=/home/jaden/.pm2` for production inspection/restart from this profile.

## Protected surface check

No tracked source diff touched obvious protected runtime/config surfaces such as `.env*`, secrets, PM2/ecosystem files, n8n workflows/config, QBO/HCP/Twilio code, or Telegram bot config.

The broad path scan only flagged prior approval artifact filenames containing `TELEGRAM_...`; those are untracked report artifacts, not Telegram runtime config.

I did not read secret contents. Build output showed `.env.local` and `.env.production` were loaded by Next.js, but I did not open or print those files.

## Current readiness risks

1. Dirty tree is large and not release-isolated: 34 tracked modified files plus many untracked directories/files. This is deployable from a build perspective, but high-risk for attribution unless the exact release scope is approved.
2. `/pricing` is currently untracked source (`app/pricing/` and `components/pricing/`), so a deploy would include uncommitted/untracked production route work.
3. Build passes because `next.config.mjs` has `typescript.ignoreBuildErrors: true`; this is known project behavior, but it means production build success is not a full TypeScript gate.
4. Several `/dev/...` routes are present as untracked source and were included in the build route list. Confirm whether internal dev routes are acceptable to ship publicly before deploy.
5. PM2 process currently has 167 restarts and 11h uptime. Not blocking by itself, but worth watching after any restart.
6. This was a local/pre-deploy audit only. No live content, visual QA, or post-restart smoke was run because the task explicitly said no deploy/no PM2 restart.

## Ops recommendation

Do not deploy blindly from this state. If Jaden approves the release scope, the operational gate is ready for a normal deploy sequence: run `npm run build`, restart with `PM2_HOME=/home/jaden/.pm2 pm2 restart stanley-landing --update-env`, then live-smoke homepage and `/pricing` at the public domain.
