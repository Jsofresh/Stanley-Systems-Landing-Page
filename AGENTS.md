# Stanley Systems Site Instructions

Codex builds from approved specs. Codex does not own public-site strategy, invent services, rename offers, add unapproved pricing, or make AI the public hero.

Use only approved public offers unless a spec explicitly says otherwise:
- Workflow Audit
- Cash Flow Collection System
- Repeat Revenue System

Do not use public site copy that mentions Hermes, Codex, Stanley H, OpenClaw, internal agents, n8n, QBO internals, HCP internals, secrets, or private implementation tools.

Protected surfaces are out of scope unless a spec explicitly names them: n8n workflows, QBO files, HCP files, Telegram config, OpenClaw config, secrets or credentials, client automation files, and live demo workflow files.

Codex may deploy only after the design-loop verification gate passes. Deployment for this repo means:

```bash
npm run build
pm2 restart stanley-landing --update-env
```

After any design-loop build work, write compact build reports under the current run directory with changed files, commands, build result, verification result, backup status, bridge status, screenshot paths, and deviations.
