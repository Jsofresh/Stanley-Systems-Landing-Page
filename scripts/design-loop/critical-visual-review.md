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

## Current Visual Authority

Every new Stanley Systems website review must use `/home/jaden/stanley-landing/DESIGN.md` as the visual standard.

The live site at `https://stanley-systems.com/` is evidence for style, color, formatting, moving imagery, text-over-image composition, interactive buttons, and visual pop-ups only. Its current words, offers, product names, pricing, claims, CTA labels, navigation, routes, and funnel order are not content authority.

The reviewer must fail a new section when:

- a bento grid or repeated equal card wall is the dominant layout
- generic AI/SaaS widgets replace one strong image or mechanism
- a slide or display image contains extensive text instead of a title and CTA
- text-over-media lacks a deliberate readability wash or quiet zone
- interactions are ornamental, hover-only on mobile, or lack a visible trigger
- buttons have no useful hover, focus, tap, or directional feedback
- imagery is reduced to tiny thumbnails inside oversized boxes
- the implementation preserves obsolete live-site content merely because its styling is preserved

Historical redesign north stars, Refero summaries, generated review bundles, component foundries, and old package mockups are not current design authority.

## Fail-Closed Rules

The gate blocks on missing, unreadable, stale, or hash-mismatched screenshots; malformed reviewer JSON; missing schema fields; section mismatch; reviewed path/hash mismatch; protected public-copy terms; and reviewer command failure.

Each packet includes `git_sha`, `build_id`, `run_id`, `captured_at`, screenshot paths, screenshot hashes, and screenshot modified times. The reviewer must echo reviewed screenshot paths and hashes.

The intelligent review standard is mobile-first:

> Would a skeptical HVAC, plumbing, electrical, marine, or landscaping owner trust Stanley Systems after seeing this on their phone?

If the answer is no, the reviewer must fail the section or route evidence. Section match alone is not enough to pass.

## Mobile Hard Fails

The reviewer prompt and gate treat these as hard failures:

- browser-default or nearly unstyled HTML
- purple underlined default links, especially CTA-like links
- missing brand typography or default serif typography
- duplicated major headlines or hero headings
- raw stacked icons unless intentionally designed
- horizontal overflow
- broken mobile spacing or accidental-looking mobile layout
- CTA links that do not look actionable
- visual assets that do not communicate the offer
- generic AI/SaaS filler visuals
- cluttered card/pill walls and unclear hierarchy
- visible public copy typos or spacing mistakes such as `number,not`
- conversion sections or calculators that look like content dumps
- any mobile section a real service-business owner would see as unfinished

## Screenshot QA Precheck

Before Hermes review, the gate runs deterministic mobile screenshot QA from the section registry or DOM metadata. Capture writes per-viewport metadata under `viewport_metadata`, including route, viewport, capture time, page widths, computed body font, stylesheet count, section class evidence, links, and major headline text.

The precheck fails closed before reviewer invocation when evidence shows:

- missing, stale, or mismatched mobile route/viewport metadata
- CSS or Stanley Systems brand styling appears unloaded
- default purple underlined CTA/link styling
- horizontal overflow
- duplicated major headline text
- obvious public copy spacing typos

Missing, stale, or mismatched evidence maps to `blocked_missing_screenshot` / `blocked`. Website-fixable mobile visual failures map to `fail_codex_patch_needed` / `needs_patch_2`, even if a reviewer fixture or Hermes response would otherwise say `pass`.

Reports include:

- `critical-visual-review-screenshot-qa.json`
- `screenshot_qa_prechecks` in the main JSON report
- precheck findings rendered in the markdown report

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

This gate does not deploy, restart PM2, run production live smoke, or mark a section `verified_pending_deploy` when the gate fails.

## Human-directed workflow framing

Critical Visual Review is a concrete failure detector, not a final taste authority. It checks for broken mobile, full-section PNG paste-ins, generic SaaS/dashboard drift, repeated card dominance, over-framing, fake testimonials/logos/analytics, bad CTA hierarchy, mismatch with the approved mockup, semantic confusion, clumsy diagrams, ugly generated visuals, and text baked into production images.

A pass means no configured concrete blocker was found and the section can be surfaced to Jaden for screenshot approval. It does not mean Jaden approved the design, it does not authorize deployment, and it must not trigger automatic deploy. Final visual approval and deploy approval belong to Jaden.
