# Stanley Systems Design Source Registry

**Status:** Active

**Updated:** 2026-08-04

This registry prevents historical Stanley Systems design prompts from silently becoming current design authority.

## Active visual authority

Use these sources in this order:

1. `/home/jaden/stanley-landing/DESIGN.md`
   - Canonical style, color, formatting, imagery, motion, interaction, and layout rules.
2. `https://stanley-systems.com/`
   - Visual comparison only. Its content, offers, pricing, claims, labels, routes, and funnel logic are not authoritative.
3. `/home/jaden/stanley-landing/docs/stanley-systems-image-ruleset.md`
   - Image, video, moving display, pop-up, and interactive visual rules.
4. `/home/jaden/stanley-landing/scripts/design-loop/critical-visual-review.md`
   - Verification process and visual failure gates.
5. `/home/jaden/stanley-assets/openclaw-project/design-taste-library/stanley-taste-stack-status-v2.md`
   - Shared taste-library source order.
6. `/home/jaden/stanley-assets/openclaw-project/design-taste-library/stanley-website-design-workflow-v2.md`
   - Shared section design workflow.
7. Rejected-pattern records under:
   - `/home/jaden/stanley-assets/openclaw-project/design-taste-library/rejected/`

## Active build and review enforcement

- `/home/jaden/stanley-landing/AGENTS.md`
- `/home/jaden/stanley-landing/scripts/design-loop/hermes-critical-visual-review-command.ts`
- `/home/jaden/stanley-landing/scripts/design-loop/four-judge-visual-reviewer.ts`
- `/home/jaden/stanley-landing/scripts/design-loop/build-stanley-image-context-pack.ts`
- `/home/jaden/stanley-assets/openclaw-project/software-factory/specs/codex-as-design-translator-v2.md`
- `/home/jaden/stanley-assets/openclaw-project/software-factory/templates/codex-section-build-task.template.md`
- `/home/jaden/stanley-assets/openclaw-project/software-factory/templates/codex-design-interpretations/pre-build-design-interpretation.template.md`

The image-context builder now requires an explicit current `--brief_path`. It will not generate a concept from obsolete package names embedded in old source files.

## Content authority is separate

The visual system does not approve public copy.

Use the current approved task brief and current Stanley Systems offer/product truth for:

- words
- offer names
- product names
- pricing
- claims
- guarantees
- navigation
- routes
- funnel order

Do not retain obsolete content because its styling is preserved.

## Retired from active design authority

The following files may remain as historical records or legacy implementation notes, but builders and reviewers must not use them as current visual direction.

### Repository design history

- `/home/jaden/stanley-landing/docs/redesign/stanley-site-redesign-north-star.md`
  - Old Workflow Audit, Cashflow Control, Repeat Revenue, and calculator-era architecture.
- `/home/jaden/stanley-landing/docs/redesign/post-deploy-feedback-notes.md`
  - Old liquid-glass direction and unimplemented redesign reactions.
- `/home/jaden/stanley-landing/docs/specs/stanley-component-foundry.md`
  - Legacy component/API reference only; its card-first visual grammar is not a style source.
- `/home/jaden/stanley-landing/scripts/design-loop/generated/stanley-website-review-context.md`
  - Generated derivative artifact containing historical business context.
- `/home/jaden/stanley-landing/docs/design-directions/homepage-conversion-block-acceptance-criteria.md`
  - Historical conversion-block acceptance record.
- `/home/jaden/stanley-landing/docs/design-audits/homepage-revenue-leak-systems-ui-audit-2026-05-07.md`
  - Historical visual/business audit.
- `/home/jaden/stanley-landing/docs/visual-references/stanley-systems/`
  - Old package and section references; historical only.
- `/home/jaden/stanley-landing/visual-assets/requests/`
  - Old asset-generation prompts; historical only unless a current task explicitly revives one.

### Shared taste-library history

- `/home/jaden/stanley-assets/openclaw-project/design-taste-library/stanley-taste-stack-status-v1.md`
- `/home/jaden/stanley-assets/openclaw-project/design-taste-library/stanley-website-design-workflow-v1.md`
- `/home/jaden/stanley-assets/openclaw-project/design-taste-library/refero/stanley-refero-style-synthesis-v1.md`
- `/home/jaden/stanley-assets/openclaw-project/design-taste-library/refero/styles-v1/plain.md`
- `/home/jaden/stanley-assets/openclaw-project/design-taste-library/refero/styles-v1/cycle.md`
- `/home/jaden/stanley-assets/openclaw-project/design-taste-library/refero/styles-v1/mintlify.md`
- `/home/jaden/stanley-assets/openclaw-project/design-taste-library/refero/styles-v1/minimalissimo.md`
- `/home/jaden/stanley-assets/openclaw-project/software-factory/design-audit/context/stanley-website-truth-packet.md`
  - Old offer truth packet. Current visual system must not inherit its offer architecture.
- `/home/jaden/stanley-assets/openclaw-project/software-factory/specs/codex-as-design-translator-v1.md`
  - Replaced by v2.
- `/home/jaden/stanley-assets/openclaw-project/software-factory/specs/stanley-image-generation-context-pack-v1.md`
  - Replaced by the current brief-required image-context builder.

### Historical prompts and copied instructions

- `/home/jaden/.hermes/workspaces/stanley-systems/stanley-website-update-build-spec-and-hermes-prompt.md`
- `/home/jaden/.hermes/workspaces/stanley-systems/stanley-website-update-critical-reviewed-resend-prompt.md`
- `/home/jaden/.hermes/workspaces/stanley-systems/context/source-md/stanley-website-copy-rules.md`
  - Plain-language guidance may be reusable, but its historical offer and calculator direction is not current authority.

### Retired skill references

The following references were removed from the active Stanley design skill because they combine historical design with obsolete products, funnels, pricing, or one-off corrections:

- `references/stanley-ai-profit-map-demo-video-prompts.md`
- `references/stanley-website-plain-copy-and-calculator-spine.md`
- `references/stanley-servicetitan-hero-correction.md`
- `references/stanley-workflow-audit-pricing-cards.md`
- `references/about-page-founder-swap.md`
- `references/stanley-homepage-mechanism-section4.md`
- `references/stanley-package-page-supporting-imagery.md`
- `references/generated-section-reference-image-packets.md`
- `references/stanley-voice-note-build-prompts.md`

## Generic tools are subordinate

Generic frontend/design skills may help with implementation quality, accessibility, responsive behavior, and component engineering. They do not define Stanley Systems style.

In particular, generic instructions encouraging gradient meshes, unusual typography, glassmorphism, exaggerated asymmetry, excessive motion, or novelty must not override `DESIGN.md`.

## Removal policy

“Retired” means removed from active authority, not silently erased from history.

- Tracked repository records remain available through Git.
- Legacy files that are still referenced by scripts or reports receive a deprecation header rather than destructive deletion.
- New work must not link to a retired source as current direction.
- A current task may use a retired file only when it explicitly identifies the file as historical evidence and names the exact lesson to reuse.
