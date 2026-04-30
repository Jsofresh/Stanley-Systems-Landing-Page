# Critical Visual Review Gate

Run the real gate from the landing repo:

```bash
npm run design-loop:critical-visual-review -- --run-id <run-id>
```

The default reviewer invocation is repo-local and allowlisted. The gate runs:

```text
command: node
args: --experimental-strip-types scripts/design-loop/hermes-critical-visual-review-command.ts <packet-json-path>
cwd: landing repo root
shell: false
```

Do not use shell command strings for normal runs. A legacy shell fallback exists only when both `HERMES_CRITICAL_VISUAL_REVIEW_ALLOW_LEGACY_SHELL=1` and `HERMES_CRITICAL_VISUAL_REVIEW_COMMAND` are set; reports mark that as `legacy_shell`.

## Fail-Closed Rules

The gate blocks on missing, unreadable, stale, or hash-mismatched screenshots; malformed reviewer JSON; missing schema fields; section mismatch; reviewed path/hash mismatch; protected public-copy terms; and reviewer command failure.

Each packet includes `git_sha`, `build_id`, `run_id`, `captured_at`, screenshot paths, screenshot hashes, and screenshot modified times. The reviewer must echo reviewed screenshot paths and hashes.

## Score Thresholds

Passing requires:

- `visual_quality_score >= 7`
- `clarity_score >= 7`
- `mobile_score >= 7`
- `ai_slop_score <= 3`
- `desktop_pass === true`
- `mobile_pass === true`
- `section_match === "yes"`
- `final_decision === "pass"`

If the reviewer says `pass` but a threshold fails, the gate fails closed and routes to `needs_patch_2` for section-fixable failures.

## Retry And Escalation

The default visual patch cap is 2 attempts. `run-design-loop.ts` records `critical_visual_review_attempt` for the gate. Missing screenshots, malformed JSON, hash/proof mismatch, and section mismatch block instead of retrying. If repeated code-only review still describes generic or AI-slop visuals, the gate escalates to `fail_generated_asset_needed`.

## Public Copy Guardrail

Before visual review, the gate scans section registry fields and any readable `text_path` payload. Severe public-copy terms such as Hermes, Codex, OpenClaw, n8n, QBO API, HCP API, Twilio, AI-first hero language, backend automation, and public `Stanley` shorthand fail the gate. Weak generic terms such as streamline, optimize, synergy, transform, empower, cutting-edge, and innovative are warnings. Section copy should lead with money, time, owner relief, collected revenue, repeat customers, reviews, referrals, captured calls, or missed work.

## Override Logging

Jaden can log a human override artifact without converting the gate to deploy-ready:

```bash
npm run design-loop:critical-visual-review-override -- --run-id <run-id> --section-id <section-id> --operator Jaden --reason "<reason>"
```

The reason is required. The artifact is written under the run verification directory and Software Factory artifacts. It records the section, run, reviewer decision, original blockers, reason, and timestamp. It does not deploy, restart PM2, mark verified, or update the manifest status.

## Protected Surfaces

This gate must not touch `.env*`, secrets, credentials, PM2 or ecosystem config, proxy config, n8n, QBO, HCP, Telegram config, OpenClaw config/runtime, live workflow files, or production runtime configuration.
