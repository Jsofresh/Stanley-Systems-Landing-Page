# Stanley Systems Site Instructions

Codex builds from approved specs. Codex does not own public-site strategy, invent services, rename offers, add unapproved pricing, or preserve old public copy merely because its visual treatment is being preserved.

## Current design and content authority

For public website work, use this order:

1. The current approved task brief for public copy, offers, product names, pricing, claims, guarantees, navigation, routes, and funnel logic.
2. `/home/jaden/stanley-landing/DESIGN.md` for visual style, color, formatting, layout, imagery, and interaction.
3. The current live website at `https://stanley-systems.com/` as a visual comparison only.

The live website's style, colors, formatting, moving imagery, text-over-image sections, interactive buttons, and visual pop-ups are approved visual references. Its current words, offer names, product names, prices, claims, CTAs, navigation labels, routes, and funnel order are not approved content sources.

Do not use bento grids, interchangeable feature-card walls, generic AI dashboards, excessive floating panels, or vibe-coded SaaS decoration as the page structure. Prefer one dominant image, moving scene, or interactive mechanism per major section, with a short title and clear CTA.

Never render a section eyebrow, kicker, category tag, or decorative pre-title above a public `h1` or `h2`. Start the section with its real headline. Functional form labels, workflow stages, statuses, table headings, metric labels, and approval states are not eyebrows and remain allowed.

Historical redesign north stars, generated review context, old taste-site summaries, legacy component foundries, old build prompts, and obsolete offer documents are not active design authority unless the current task explicitly names one as a historical reference.

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
