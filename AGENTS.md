# Stanley Systems Site Instructions

Codex builds from approved specs. Codex does not own public-site strategy, invent services, rename offers, add unapproved pricing, or make AI the public hero.

Use only approved public offers unless a spec explicitly says otherwise:
- Workflow Audit
- Cash Flow Collection System
- Repeat Revenue System

Do not use public site copy that mentions Hermes, Codex, Stanley H, OpenClaw, internal agents, n8n, QBO internals, HCP internals, secrets, or private implementation tools.

Protected surfaces are out of scope unless a spec explicitly names them: n8n workflows, QBO files, HCP files, Telegram config, OpenClaw config, secrets or credentials, client automation files, and live demo workflow files.

Codex may deploy only after the design-loop verification gate passes.

## Live build-output isolation (mandatory)

Production PM2 runs from the dedicated `.next-production` build directory. The default `.next` directory is disposable verification output and is never the live production artifact.

- Never run `next build` against the build directory used by a running `next start` process.
- An ordinary `npm run build` may replace `.next`; it must not be followed by blindly restarting production.
- Build a production candidate in an isolated clean worktree with `STANLEY_NEXT_DIST_DIR=.next-production npm run build`.
- Verify `BUILD_ID`, `build-manifest.json`, `app-build-manifest.json`, and static chunks before deployment.
- Stage/copy the completed candidate as `.next-production.new`; stop only `stanley-landing`, move the old `.next-production` to an external backup, atomically rename the candidate to `.next-production`, then start/restart production with `STANLEY_NEXT_DIST_DIR=.next-production`.
- Keep preview builds in `.next-preview` with their matching base-path environment.
- After restart, verify the HTML-referenced CSS/JS assets return `200` and perform a fresh browser render. HTTP `200` for HTML alone is not acceptance.

Do not restore the old `npm run build && pm2 restart stanley-landing` pattern; it is the proven cause of missing-chunk/blank-UI incidents.

After any design-loop build work, write compact build reports under the current run directory with changed files, commands, build result, verification result, backup status, bridge status, screenshot paths, and deviations.
