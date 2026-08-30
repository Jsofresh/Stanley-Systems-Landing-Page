import { spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { pathToFileURL } from "node:url"
import {
  CRITICAL_VISUAL_REVIEW_CONFIG,
  validateCriticalSectionReview,
  type CriticalReviewPacket,
  type CriticalSectionReview,
} from "./critical-visual-review-gate.ts"

const REQUIRED_PACKET_VERSION = "critical-visual-review-v1"
const HERMES_AGENT_ROOT = process.env.HERMES_AGENT_ROOT || "/home/jaden/.hermes/hermes-agent"
const STANLEY_CONTEXT_ROOT = process.env.STANLEY_CONTEXT_ROOT || "/home/jaden/.hermes/workspaces/stanley-systems/shared-context"
const STANLEY_DESIGN_PATH = process.env.STANLEY_DESIGN_PATH || join(process.cwd(), "DESIGN.md")
const SOFTWARE_FACTORY_ROOT = process.env.SOFTWARE_FACTORY_ROOT || "/home/jaden/stanley-assets/openclaw-project/software-factory"
const GENERATED_REVIEW_CONTEXT_PATH = process.env.STANLEY_WEBSITE_REVIEW_CONTEXT_PATH || join(process.cwd(), "scripts", "design-loop", "generated", "stanley-website-review-context.md")

const STANLEY_WEBSITE_REVIEW_CONTEXT_FILES = [
  "offer.md",
  "copy-rules.md",
  "company-brain-product-vision-and-launch-doctrine.md",
] as const

type HermesVisionResult = {
  provider: string
  model: string
  content: string
}

type ImageVisibilityProbe = {
  reviewer_model: string
  reviewer_provider: string
  attached_screenshot_files: string[]
  answers: {
    top_visible_headline: string
    primary_links_purple_underlined: string
    typography_serif_or_sans: string
    duplicated_headline: string
    raw_unstyled_icon_stacks: string
    default_browser_html: string
    horizontal_overflow_or_awkward_mobile_spacing: string
  }
  confidence: "pass" | "fail"
  failure_reason: string
}

type StanleyWebsiteReviewContext = {
  path: string
  loaded_files: string[]
  missing_requested_files: string[]
  markdown: string
}

type ContextProof = {
  answers: {
    icp: string
    public_first_step: string
    package_1: string
    package_2: string
    main_copy_standard: string
    public_language_rule: string
  }
  confidence: "pass" | "fail"
  failure_reason: string
  reviewer_provider: string
  reviewer_model: string
}

type SmartReviewJson = {
  pass: boolean
  final_decision: "pass" | "fail_patch_needed" | "fail_major_redesign_needed" | "blocked_image_not_seen" | "blocked_context_missing"
  trust_score: number
  visual_quality_score: number
  clarity_score: number
  mobile_score: number
  stanley_context_alignment_score: number
  visual_richness_score: number
  imagery_strength_score: number
  visual_anchor_score: number
  memorability_score: number
  visual_semantic_clarity_score: number
  visual_metaphor_coherence_score: number
  path_traceability_score: number
  approved_reference_fidelity_score: number
  mockup_fidelity_score: number
  stanley_design_alignment_score: number
  codex_translation_quality_score: number
  real_product_design_quality_score: number
  generic_ai_ui_risk_score: number
  visual_taste_preservation_score: number
  design_research_used_correctly: boolean
  codex_inspected_approved_mockup: boolean
  codex_prebuild_interpretation_present: boolean
  stanley_specificity_score: number
  diagram_aesthetic_quality_score: number
  diagram_geometry_quality_score: number
  diagram_spacing_quality_score: number
  main_visual_premium_quality_score: number
  main_visual_hero_worthiness_score: number
  mobile_diagram_quality_score: number
  generated_asset_scaling_quality: number
  repeated_card_pattern_present: boolean
  repeated_card_pattern_dominates: boolean
  repeated_card_pattern_is_secondary_support: boolean
  primary_visual_anchor_description: string
  visual_anchor_overpowers_card_stack: boolean
  repetitive_icon_card_pattern: boolean
  underdesigned_plain_section: boolean
  over_framed_section: boolean
  too_many_nested_borders: boolean
  border_noise_dominates_visual: boolean
  support_cards_repeat_border_language: boolean
  boxed_in_visual_anchor: boolean
  actual_ui_clipping_or_overflow: boolean
  screenshot_crop_only_not_layout_failure: boolean
  every_visual_element_has_business_role: boolean
  arbitrary_decorative_elements_present: boolean
  visually_rich_but_semantically_confusing: boolean
  viewer_can_explain_visual_in_5_seconds: boolean
  follows_approved_reference_structure: boolean
  matches_selected_mockup_direction: boolean
  could_belong_to_generic_saas_company: boolean
  depends_on_designer_explanation: boolean
  generated_asset_feels_raw_or_ai: boolean
  central_visual_asset_is_ugly: boolean
  diagram_has_awkward_proportions: boolean
  diagram_has_cramped_or_forced_layout: boolean
  main_visual_looks_intentionally_designed: boolean
  main_visual_supports_section_hierarchy: boolean
  generated_asset_text_is_baked_in: boolean
  generated_asset_has_unreadable_text: boolean
  visual_asset_ready_for_production_use: boolean
  blockers: string[]
  patch_brief: string
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  const result = runHermesCriticalVisualReviewCommand(process.argv.slice(2))
  if (result.ok) {
    process.stdout.write(`${JSON.stringify(result.review, null, 2)}\n`)
  } else {
    process.stderr.write(`${result.error}\n`)
    process.exitCode = 1
  }
}

export function runHermesCriticalVisualReviewCommand(argv: string[]): { ok: true; review: CriticalSectionReview } | { ok: false; error: string } {
  try {
    if (argv.length !== 1 || !argv[0]) throw new Error("Expected exactly one positional argument: review packet JSON path.")
    const packetPath = argv[0]
    const packet = readAndValidatePacket(packetPath)
    const context = loadStanleyWebsiteReviewContext()
    const prompt = buildHermesPrompt(packet, context.markdown)
    if (process.env.HERMES_CRITICAL_VISUAL_REVIEW_FIXTURE_MODE === "1" && process.env.HERMES_CRITICAL_VISUAL_REVIEW_HERMES_BIN) {
      return runFixtureHermesTextReview(packet, prompt)
    }
    const screenshotFiles = getAttachedScreenshotFiles(packet)
    const probe = runImageVisibilityProbe(packet, screenshotFiles)
    const contextProof = runContextProof(context)
    if (probe.confidence !== "pass") {
      const blocked = blockedSmartReview("blocked_image_not_seen", `Image visibility probe failed: ${probe.failure_reason}`)
      const markdown = blockedMarkdownCritique(blocked.patch_brief)
      const visionResult = { provider: probe.reviewer_provider, model: probe.reviewer_model, content: `${markdown}\n${JSON.stringify(blocked, null, 2)}` }
      writeSmartReviewArtifacts(packet, context, probe, contextProof, markdown, blocked, visionResult)
      return { ok: true, review: normalizeSmartReviewForGate(packet, blocked, visionResult, markdown) }
    }
    if (contextProof.confidence !== "pass") {
      const blocked = blockedSmartReview("blocked_context_missing", `Stanley Systems context proof failed: ${contextProof.failure_reason}`)
      const markdown = blockedMarkdownCritique(blocked.patch_brief)
      const visionResult = { provider: contextProof.reviewer_provider, model: contextProof.reviewer_model, content: `${markdown}\n${JSON.stringify(blocked, null, 2)}` }
      writeSmartReviewArtifacts(packet, context, probe, contextProof, markdown, blocked, visionResult)
      return { ok: true, review: normalizeSmartReviewForGate(packet, blocked, visionResult, markdown) }
    }
    process.stderr.write(`critical_visual_review_model=${probe.reviewer_provider}/${probe.reviewer_model}\n`)
    process.stderr.write(`critical_visual_review_attached_screenshots=${screenshotFiles.join(",")}\n`)
    process.stderr.write(`critical_visual_review_loaded_context=${context.loaded_files.join(",")}\n`)
    if (context.missing_requested_files.length) process.stderr.write(`critical_visual_review_missing_context_aliases=${context.missing_requested_files.join(",")}\n`)
    process.stderr.write(`critical_visual_review_context_proof=${JSON.stringify(contextProof.answers)}\n`)
    process.stderr.write(`critical_visual_review_probe=${JSON.stringify(probe.answers)}\n`)

    const fullPrompt = `${prompt}\n\nImage visibility probe result that MUST be treated as pixel evidence from the attached screenshots:\n${JSON.stringify(probe, null, 2)}\n\nStanley Systems context proof that MUST be treated as loaded context evidence:\n${JSON.stringify(contextProof, null, 2)}`
    const visionResult = callHermesVisionModel(fullPrompt, screenshotFiles)
    const jsonText = extractJsonObject(visionResult.content || "")
    if (!jsonText) throw new Error("Hermes vision model returned no parseable Smart Vision Review JSON object.")
    const smartJson = validateSmartReviewJson(JSON.parse(jsonText), contextProof, probe)
    const markdownCritique = extractMarkdownCritique(visionResult.content || "")
    writeSmartReviewArtifacts(packet, context, probe, contextProof, markdownCritique, smartJson, visionResult)
    const review = normalizeSmartReviewForGate(packet, smartJson, visionResult, markdownCritique)
    return { ok: true, review }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) }
  }
}

function runFixtureHermesTextReview(packet: CriticalReviewPacket, prompt: string): { ok: true; review: CriticalSectionReview } | { ok: false; error: string } {
  const hermesBin = process.env.HERMES_CRITICAL_VISUAL_REVIEW_HERMES_BIN || "hermes"
  const hermesArgs = ["chat", "-Q", "--source", "critical-visual-review", "-t", "vision,file", "-q", prompt]
  const result = spawnSync(hermesBin, hermesArgs, {
    cwd: process.cwd(),
    encoding: "utf8",
    env: process.env,
    shell: false,
    maxBuffer: 20 * 1024 * 1024,
  })
  if ((result.status ?? 1) !== 0) {
    throw new Error(`Hermes fixture critical visual review failed: ${result.stderr || result.stdout || result.error?.message || "no output"}`)
  }
  const jsonText = extractJsonObject(result.stdout || "")
  if (!jsonText) throw new Error("Hermes fixture returned no parseable JSON object.")
  const parsed = JSON.parse(jsonText)
  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    delete (parsed as Record<string, unknown>).required_fields
  }
  return { ok: true, review: validateCriticalSectionReview(parsed, packet) }
}

export function readAndValidatePacket(packetPath: string): CriticalReviewPacket {
  if (!existsSync(packetPath)) throw new Error(`Review packet does not exist: ${packetPath}`)
  let parsed: unknown
  try {
    parsed = JSON.parse(readFileSync(packetPath, "utf8"))
  } catch (error) {
    throw new Error(`Review packet JSON is malformed: ${error instanceof Error ? error.message : String(error)}`)
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Review packet must be a JSON object.")
  const packet = parsed as Partial<CriticalReviewPacket>
  if (packet.packet_version !== REQUIRED_PACKET_VERSION) throw new Error(`Review packet version must be ${REQUIRED_PACKET_VERSION}.`)
  assertString(packet.run_id, "run_id")
  assertString(packet.section_id, "section_id")
  assertString(packet.section_purpose, "section_purpose")
  if (!packet.screenshots || typeof packet.screenshots !== "object" || Array.isArray(packet.screenshots)) {
    throw new Error("Review packet screenshots must be an object.")
  }
  assertString(packet.screenshots.desktop_after, "screenshots.desktop_after")
  assertString(packet.screenshots.mobile_after, "screenshots.mobile_after")
  if (packet.screenshots.desktop_before !== undefined) assertString(packet.screenshots.desktop_before, "screenshots.desktop_before")
  if (packet.screenshots.mobile_before !== undefined) assertString(packet.screenshots.mobile_before, "screenshots.mobile_before")
  if (!packet.metadata || typeof packet.metadata !== "object" || Array.isArray(packet.metadata)) {
    throw new Error("Review packet metadata must be an object.")
  }
  assertString(packet.metadata.git_sha, "metadata.git_sha")
  assertString(packet.metadata.build_id, "metadata.build_id")
  assertString(packet.metadata.run_id, "metadata.run_id")
  assertString(packet.metadata.captured_at, "metadata.captured_at")
  if (packet.metadata.run_id !== packet.run_id) throw new Error("Review packet metadata.run_id must match run_id.")
  if (!packet.metadata.screenshot_hashes || typeof packet.metadata.screenshot_hashes !== "object" || Array.isArray(packet.metadata.screenshot_hashes)) {
    throw new Error("Review packet metadata.screenshot_hashes must be an object.")
  }
  if (!packet.metadata.screenshot_modified_times || typeof packet.metadata.screenshot_modified_times !== "object" || Array.isArray(packet.metadata.screenshot_modified_times)) {
    throw new Error("Review packet metadata.screenshot_modified_times must be an object.")
  }
  const typedPacket = packet as CriticalReviewPacket
  validateScreenshotEvidence(typedPacket, "desktop_after")
  validateScreenshotEvidence(typedPacket, "mobile_after")
  if (packet.screenshots.desktop_before) validateScreenshotEvidence(typedPacket, "desktop_before")
  if (packet.screenshots.mobile_before) validateScreenshotEvidence(typedPacket, "mobile_before")
  if (!packet.review_prompt || typeof packet.review_prompt !== "object" || Array.isArray(packet.review_prompt)) {
    throw new Error("Review packet review_prompt must be an object.")
  }
  assertString(packet.review_prompt.role, "review_prompt.role")
  assertString(packet.review_prompt.output_contract, "review_prompt.output_contract")
  for (const field of ["mandatory_questions", "visual_rules", "anti_ai_slop_rules", "approved_offer_copy_guardrails"] as const) {
    assertStringArray(packet.review_prompt[field], `review_prompt.${field}`)
  }
  return packet as CriticalReviewPacket
}

export function buildHermesPrompt(packet: CriticalReviewPacket, stanleyWebsiteReviewContext?: string): string {
  const strictJsonContract = {
    pass: "boolean",
    final_decision: ["pass", "fail_patch_needed", "fail_major_redesign_needed", "blocked_image_not_seen", "blocked_context_missing"],
    trust_score: "number 1-10",
    visual_quality_score: "number 1-10",
    clarity_score: "number 1-10",
    mobile_score: "number 1-10",
    stanley_context_alignment_score: "number 1-10",
    visual_richness_score: "number 1-10: richness, scale variation, visual rhythm, and non-plainness",
    imagery_strength_score: "number 1-10: imagery/visual communication strength, not just icons",
    visual_anchor_score: "number 1-10: dominant visual centerpiece strength",
    memorability_score: "number 1-10: whether a service-business owner would remember it after scrolling",
    visual_semantic_clarity_score: "number 1-10: whether the visual makes the business logic clearer, not just richer; pass requires 8+",
    visual_metaphor_coherence_score: "number 1-10: whether the metaphor is explanatory and coherent; pass requires 8+",
    path_traceability_score: "number 1-10: whether a loop/path journey can be traced from first step to outcome in 5 seconds; pass requires 8+ for loop/path sections",
    approved_reference_fidelity_score: "number 1-10: whether the built section follows the selected approved reference mockup/taste direction; pass requires 8.5+",
    mockup_fidelity_score: "number 1-10: whether final screenshot preserves the approved GPT Image mockup visual intent; hard pass requires 8+",
    stanley_design_alignment_score: "number 1-10: whether the final screenshot follows the canonical Stanley Systems DESIGN.md and current live-site visual grammar without copying obsolete content; hard pass requires 8+",
    codex_translation_quality_score: "number 1-10: whether Codex preserved taste while translating mockup to real UI; hard pass requires 8+",
    real_product_design_quality_score: "number 1-10: whether this looks like real product-quality design, not generic AI UI; hard pass requires 8+",
    generic_ai_ui_risk_score: "number 1-10: risk that final section looks generic AI/SaaS UI; hard pass requires <=3",
    visual_taste_preservation_score: "number 1-10: whether the approved mockup taste survived implementation; hard pass requires 8+",
    design_research_used_correctly: "boolean: true only if Codex cited and correctly applied the canonical Stanley Systems DESIGN.md plus current section-specific research in the pre-build interpretation",
    codex_inspected_approved_mockup: "boolean: true only if the packet/evidence shows Codex visually inspected the approved mockup image before building",
    codex_prebuild_interpretation_present: "boolean: true only if the Codex pre-build design interpretation artifact exists and was considered",
    stanley_specificity_score: "number 1-10: whether the section feels specific to Stanley Systems/service businesses rather than generic SaaS; pass requires 8.5+",
    diagram_aesthetic_quality_score: "number 1-10: taste and beauty of the main diagram/visual module; pass requires 8.5+",
    diagram_geometry_quality_score: "number 1-10: balance, proportions, node placement, arrow/loop elegance; pass requires 8.5+",
    diagram_spacing_quality_score: "number 1-10: breathing room and mobile spacing of the visual module; pass requires 8.5+",
    main_visual_premium_quality_score: "number 1-10: whether the main visual feels premium and intentionally designed; pass requires 8.5+",
    main_visual_hero_worthiness_score: "number 1-10: whether the visual is strong enough to hold the main section position; pass requires 8.5+",
    mobile_diagram_quality_score: "number 1-10: whether the diagram remains polished and high-taste on mobile; pass requires 8.5+",
    generated_asset_scaling_quality: "number 1-10: whether any generated asset scales sharply without blur/crop/tiny details; pass requires 8.5+",
    repeated_card_pattern_present: "boolean: true if repeated same-shaped cards, icon cards, equal-weight step cards, or support cards are visible",
    repeated_card_pattern_dominates: "boolean: true if repeated cards/icons are the dominant design pattern or primary visual system",
    repeated_card_pattern_is_secondary_support: "boolean: true only if repeated cards exist but are clearly secondary support details",
    primary_visual_anchor_description: "string: concrete description of the dominant loop/path/journey/outcome/scene visual anchor; cannot be empty",
    visual_anchor_overpowers_card_stack: "boolean: true only if the dominant visual anchor is stronger than any repeated card stack",
    repetitive_icon_card_pattern: "legacy boolean: mirror repeated_card_pattern_dominates for backward compatibility",
    underdesigned_plain_section: "boolean: true if clean/mobile-safe but too plain, icon-heavy, underpowered, or forgettable",
    over_framed_section: "boolean: true if boxes-inside-boxes, excessive outline chrome, or concentric rounded containers make the section feel busy or stiff",
    too_many_nested_borders: "boolean: true if nested rounded containers or outline layers are visually noticeable as a dominant pattern",
    border_noise_dominates_visual: "boolean: true if border styling/chrome becomes more noticeable than the message or business outcome",
    support_cards_repeat_border_language: "boolean: true if support cards/checklist pills repeat heavy border language and compete with the main visual",
    boxed_in_visual_anchor: "boolean: true if the main loop/path/outcome visual is trapped inside unnecessary frame levels",
    actual_ui_clipping_or_overflow: "boolean: true only for real in-browser clipping, overflow, unreadable cut-off UI, or broken layout evidence",
    screenshot_crop_only_not_layout_failure: "boolean: true if an apparent cut-off is only incomplete screenshot framing or section crop, not actual live UI clipping",
    every_visual_element_has_business_role: "boolean: true only if every major visual element has a clear customer/revenue/business role",
    arbitrary_decorative_elements_present: "boolean: true if decorative curves, roads, floating cards, or art elements are present without business logic",
    visually_rich_but_semantically_confusing: "boolean: true if the section is rich or memorable but does not clearly explain how Stanley Systems creates the result",
    viewer_can_explain_visual_in_5_seconds: "boolean: true only if a visitor can explain the visual journey and outcome in 5 seconds",
    follows_approved_reference_structure: "boolean: true only if this patch follows the approved Customer Revenue central hub, four-node loop, and outcomes structure",
    matches_selected_mockup_direction: "boolean: true only if the built section clearly follows the selected reference mockup hierarchy, composition, visual anchor, density, and section logic",
    could_belong_to_generic_saas_company: "boolean: true if the section could plausibly belong to a random SaaS or RevOps company rather than Stanley Systems",
    depends_on_designer_explanation: "boolean: true if a designer would need to verbally explain what the section visual means",
    generated_asset_feels_raw_or_ai: "boolean: true if the visual module feels like raw AI output, rough generated UI, generic SaaS art, or unrefined prompt output",
    central_visual_asset_is_ugly: "boolean: true if the central/main visual is ugly, clumsy, awkward, or low-taste even if semantically correct",
    diagram_has_awkward_proportions: "boolean: true if hub/node/arrow/card proportions feel awkward, oversized, undersized, or forced",
    diagram_has_cramped_or_forced_layout: "boolean: true if the loop or module feels cramped, squeezed, or forced, especially on mobile",
    main_visual_looks_intentionally_designed: "boolean: true only if the visual looks crafted and premium rather than assembled from default UI pieces",
    main_visual_supports_section_hierarchy: "boolean: true only if the main visual anchors the section without competing with copy/CTAs/outcomes",
    generated_asset_text_is_baked_in: "boolean: true if important copy, labels, headings, outcomes, CTAs, or small public wording are baked into the generated asset",
    generated_asset_has_unreadable_text: "boolean: true if any image text/artifact is unreadable, garbled, or tiny",
    visual_asset_ready_for_production_use: "boolean: true only if the main visual could be shown alone in a premium Stanley Systems design review and not be sent back",
    blockers: "string[]",
    patch_brief: "string: Codex-ready patch brief scoped to the failed page/section, no self-approval",
  }

  return [
    "You are the Full-Context Smart Vision Reviewer for Stanley Systems website work.",
    "You are a concrete failure detector, not the final taste authority. Final visual approval belongs to Jaden.",
    "You are harsh, screenshot-first, context-first, and skeptical. You are reviewing for a real service-business owner, not a SaaS buyer.",
    "",
    "Verification-only boundaries:",
    "- Do not edit files.",
    "- Do not deploy.",
    "- Do not restart PM2.",
    "- Do not run production live smoke.",
    "- Do not touch n8n, QBO, HCP, Telegram config, OpenClaw config, secrets, credentials, PM2, or live workflow files.",
    "- Judge only attached screenshot pixels plus the full Stanley Systems context below.",
    "- Ignore Codex reasoning, build history, self-evaluation, and implementation debate unless the packet explicitly provides a pre-build artifact for mockup-fidelity checks.",
    "- Do not claim final taste approval, Jaden approval, deploy approval, or production readiness. A pass means no configured concrete blocker found and ready for Jaden screenshot checkpoint.",
    "",
    "Stanley Systems canonical project context. This is the main review context, not a tiny summary:",
    "<<<STANLEY_WEBSITE_REVIEW_CONTEXT_BEGIN>>>",
    stanleyWebsiteReviewContext || "BLOCKED: Stanley Systems context was not loaded.",
    "<<<STANLEY_WEBSITE_REVIEW_CONTEXT_END>>>",
    "",
    "Screenshot evidence. The actual image bytes are attached as vision inputs. These paths/hashes are for proof only:",
    `- desktop_after: ${packet.screenshots.desktop_after}`,
    `- desktop_after_hash: ${packet.metadata.screenshot_hashes.desktop_after}`,
    `- mobile_after: ${packet.screenshots.mobile_after}`,
    `- mobile_after_hash: ${packet.metadata.screenshot_hashes.mobile_after}`,
    packet.screenshots.desktop_before ? `- desktop_before: ${packet.screenshots.desktop_before}` : "- desktop_before: not supplied",
    packet.screenshots.desktop_before ? `- desktop_before_hash: ${packet.metadata.screenshot_hashes.desktop_before}` : "- desktop_before_hash: not supplied",
    packet.screenshots.mobile_before ? `- mobile_before: ${packet.screenshots.mobile_before}` : "- mobile_before: not supplied",
    packet.screenshots.mobile_before ? `- mobile_before_hash: ${packet.metadata.screenshot_hashes.mobile_before}` : "- mobile_before_hash: not supplied",
    `- run_id: ${packet.run_id}`,
    `- section_id: ${packet.section_id}`,
    `- section_purpose: ${packet.section_purpose}`,
    `- build_id: ${packet.metadata.build_id}`,
    `- captured_at: ${packet.metadata.captured_at}`,
    "",
    "Harsh website critique standard:",
    "- Ask first: would a skeptical HVAC, plumbing, electrical, marine, landscaping, or field-service owner trust Stanley Systems after seeing this on a phone? If no, fail.",
    "- The site must lead with money, time, owner relief, collected revenue, repeat customers, reviews, referrals, captured calls, missed work, fewer delayed invoices, and less office rescue work.",
    "- Public content must come from the current approved task brief and current Stanley Systems shared offer/copy sources. The live site and historical design packets are not content authority.",
    "- The buyer is a skeptical service-business owner, not a SaaS buyer.",
    "- Copy must be clear, not clever. Use Stanley Systems publicly, not Stanley shorthand.",
    "- Public copy must not make AI, Hermes, Codex, OpenClaw, Twilio, n8n, QBO API, or HCP API the star.",
    "- Generic SaaS filler, fake dashboards, weak cards, card/pill clutter, excessive outline chrome, boxes-inside-boxes layouts, default browser styling, raw icons, purple underlined links, default serif typography, duplicated headlines, horizontal overflow, and unfinished mobile layouts fail.",
    "- A Stanley Systems section cannot pass only because it is clean, readable, mobile-safe, and strategy-aligned. Clean is table stakes, not approval.",
    "- Visual richness is not enough. The visual must make the business logic clearer. Fail visual_richness_without_meaning, visually_rich_but_semantically_confusing, unclear_visual_metaphor, decorative_path_without_clear_sequence, untraceable_customer_journey, floating_cards_without_system_logic, generated_concept_artifacts, visual_anchor_present_but_unclear, metaphor_over_meaning, and road_metaphor_without_traceable_steps.",
    "- It must also have a strong visual anchor, enough imagery or visual communication, a memorable section-level visual idea, varied visual rhythm, clear process-to-outcome motion where relevant, and a design that sells rather than merely explains.",
    "- A visual can be semantically correct and still fail if it is ugly, clumsy, generic, awkward, raw-AI-looking, or not premium enough to hold the main section position.",
    "- For any generated or diagram-like visual, ask: If this visual module were shown alone in a design review, would it be considered polished enough for a premium Stanley Systems website, or would it be sent back? If sent back, fail.",
    "- Fail ugly_generated_diagram, low_taste_diagram_ui, clumsy_circle_hub, awkward_node_geometry, cramped_loop_layout, semantically_correct_but_visually_bad, generated_visual_not_premium_enough, visually_correct_but_taste_fail, main_visual_not_hero_worthy, and diagram_feels_like_raw_generated_ui.",
    "- Generated image assets are allowed only as standalone visual modules. Important public copy, CTAs, headings, labels, and outcome copy must remain real DOM text unless explicitly approved.",
    "- The visuals must reduce explanation load and feel service-business relevant. A plain repeated icon-card stack cannot be the entire section.",
    "- Fail or require patch if the section is too icon-heavy, too plain, visually safe but forgettable, a vertical list instead of a designed system, dependent on the same card pattern for every step, lacking a dominant visual centerpiece, requiring text to do nearly all explanation, technically mobile-safe but boring, or clean but not persuasive.",
    "- New over-framing bad pattern labels: over_framed_section, too_many_nested_borders, concentric_container_overload, excessive_outline_chrome, border_noise_dominates_visual, support_cards_repeat_border_language, premium_by_border_stack, boxed_in_visual_anchor.",
    "- Fail or require patch when a section relies on too many nested rounded containers or outline layers, when border styling becomes more noticeable than the message, when the main visual is boxed in by unnecessary frame levels, when support cards or checklist pills repeat the same border treatment too many times, when framing makes the section feel busy even if spacing is correct, or when mobile feels like boxes inside boxes inside boxes.",
    "- Premium cannot be achieved by adding border stacks. Premium should come from hierarchy, spacing, proportion, contrast, soft tint, shadow, whitespace, and one strong visual idea.",
    "- Current Stanley visual hard gates: one dominant image, moving scene, or interactive mechanism must anchor each major section; bento grids and equal card walls cannot be the primary composition; slides and display images should lead with a short title and CTA rather than extensive text; text over media requires a deliberate readability wash or quiet zone; interactive buttons and visual pop-ups need useful hover, focus, tap, or click behavior; mobile cannot depend on hover-only reveals.",
    "- Source boundary: the live Stanley Systems website is visual evidence for style, color, formatting, imagery, and interaction only. Its current content, offer names, prices, claims, CTA labels, routes, and funnel order are not authority. The current approved task brief and shared offer/copy sources control content.",
    "- Distinguish actual UI clipping from screenshot crop. Do not fail a screenshot because the captured crop does not include the full section. Fail only when the real UI is cut off, overflowing, unreadable, or broken in-browser.",
    "- Answer these positive visual quality questions in the critique: What is the dominant visual idea? Is there a clear visual anchor or mostly repeated cards? Does the visual reduce explanation load? Would a service-business owner remember it? Does it feel designed or assembled from icon cards? Is it visually persuasive enough to sell the idea? Is there enough imagery, movement, scale variation, and hierarchy? Does it preserve canonical DESIGN.md direction while avoiding bad patterns? Would it feel premium and memorable on a phone?",
    "- Additional Codex translation hard gates: final pass cannot be true if an approved mockup is provided and Codex did not inspect it, Codex pre-build interpretation is missing, mockup_fidelity_score < 8, codex_translation_quality_score < 8, real_product_design_quality_score < 8, generic_ai_ui_risk_score > 3, visual_taste_preservation_score < 8, or provided canonical DESIGN.md principles were ignored. If design research was not provided for the task, judge the concrete screenshot failures and do not invent a research requirement.",
    "- Review questions: Did Codex preserve the Jaden-approved mockup’s visual intent? Did Codex cite/use provided style principles correctly in the pre-build interpretation? Did Codex lose taste during implementation? Does the final section look designed, not generic AI UI? Does it feel Stanley-specific? Does it still lead with money, time, owner relief, reviews, referrals, captured calls, or booked work? Would this section be credible beside selected style references when provided?",
    "- Hard gates: final pass cannot be true if visual_richness_score < 7, imagery_strength_score < 7, visual_anchor_score < 7, visual_semantic_clarity_score < 8, visual_metaphor_coherence_score < 8, path_traceability_score < 8 for loop/path sections, approved_reference_fidelity_score < 8.5, stanley_specificity_score < 8.5, diagram_aesthetic_quality_score < 8.5, diagram_geometry_quality_score < 8.5, diagram_spacing_quality_score < 8.5, main_visual_premium_quality_score < 8.5, main_visual_hero_worthiness_score < 8.5, mobile_diagram_quality_score < 8.5, underdesigned_plain_section is true, repeated_card_pattern_dominates is true, over_framed_section is true, too_many_nested_borders is true, border_noise_dominates_visual is true, boxed_in_visual_anchor is true, actual_ui_clipping_or_overflow is true, arbitrary_decorative_elements_present is true, visually_rich_but_semantically_confusing is true, generated_asset_feels_raw_or_ai is true, central_visual_asset_is_ugly is true, generated_asset_text_is_baked_in is true for important copy, generated_asset_has_unreadable_text is true, diagram_has_awkward_proportions is true, diagram_has_cramped_or_forced_layout is true, visual_asset_ready_for_production_use is false, viewer_can_explain_visual_in_5_seconds is false, follows_approved_reference_structure is false when the current task requires a specific approved reference, or no primary_visual_anchor_description is provided.",
    "- If repeated_card_pattern_present is true but secondary, final pass may be true only if visual_anchor_score >= 8, imagery_strength_score >= 8, visual_anchor_overpowers_card_stack is true, and you explain why repeated cards are not dominant through primary_visual_anchor_description and markdown critique.",
    "- If the section is mostly repeated cards plus icons, stacked icon cards, equal-weight repeated steps, same-shaped cards with small icons, lacks a dominant loop/path/outcome visual, or has no memorable system picture, final pass cannot be true.",
    "- For any loop, path, or journey section, pass may be true only if repeated cards are supporting details and the dominant visual anchor clearly communicates the task-approved business mechanism or outcome.",
    "- Do not pass because the site is merely better than before. Pass only if it is credible as a premium service-business homepage.",
    "- If you provide any material Codex patch brief beyond 'no patch needed', JSON pass must be false and final_decision must be fail_patch_needed or fail_major_redesign_needed.",
    "- Passing means blockers is empty and patch_brief is exactly 'no patch needed'. It does not mean final taste approval; it means ready for Jaden screenshot checkpoint.",
    "",
    "Required markdown critique before JSON. Write these exact section headings:",
    "## First impression",
    "## What a service-business owner would think",
    "## Visual trust problems",
    "## Positive visual quality",
    "## Copy and messaging problems",
    "## Offer clarity problems",
    "## Mobile UX problems",
    "## Stanley Systems positioning violations",
    "## Exact highest-leverage fixes",
    "## Codex-ready patch brief",
    "",
    "After the markdown critique, output one strict JSON object and no second JSON object. The JSON must match this contract:",
    JSON.stringify(strictJsonContract, null, 2),
    "",
    "If the image visibility proof says image pixels were not seen, final_decision must be blocked_image_not_seen.",
    "If the Stanley Systems context proof is missing/incorrect, final_decision must be blocked_context_missing.",
    "If major structure/positioning is wrong, use fail_major_redesign_needed. For scoped code/layout/copy fixes, use fail_patch_needed.",
    "",
    "Review packet context:",
    JSON.stringify(packet, null, 2),
  ].join("\n")
}

function getAttachedScreenshotFiles(packet: CriticalReviewPacket): string[] {
  const orderedKeys: Array<keyof CriticalReviewPacket["screenshots"]> = ["mobile_after", "desktop_after", "mobile_before", "desktop_before"]
  const files: string[] = []
  const seen = new Set<string>()
  for (const key of orderedKeys) {
    const path = packet.screenshots[key]
    if (!path || seen.has(path)) continue
    validateScreenshotEvidence(packet, key)
    files.push(path)
    seen.add(path)
  }
  if (!files.length) throw new Error("No screenshot files available to attach to the Hermes vision model.")
  return files
}

function runImageVisibilityProbe(packet: CriticalReviewPacket, screenshotFiles: string[]): ImageVisibilityProbe {
  const prompt = [
    "You are the pre-review image visibility probe for Stanley Systems Critical Visual Review.",
    "You are receiving the actual screenshot image bytes as vision inputs, not just file paths.",
    "Answer from the pixels only. If a question cannot be answered from the attached screenshots, say so and set confidence to fail.",
    "Return only strict JSON with this shape:",
    JSON.stringify({
      answers: {
        top_visible_headline: "exact top visible headline text, or cannot determine",
        primary_links_purple_underlined: "yes/no + visual evidence",
        typography_serif_or_sans: "serif/sans-serif/mixed + visual evidence",
        duplicated_headline: "yes/no + duplicated text if present",
        raw_unstyled_icon_stacks: "yes/no + visual evidence",
        default_browser_html: "yes/no + visual evidence",
        horizontal_overflow_or_awkward_mobile_spacing: "yes/no + visual evidence",
      },
      confidence: "pass or fail",
      failure_reason: "empty if pass, otherwise why the attached image pixels were not visible enough",
    }, null, 2),
    "",
    `section_id: ${packet.section_id}`,
    `section_purpose: ${packet.section_purpose}`,
    "Attached screenshot file labels, in order:",
    ...screenshotFiles.map((file, index) => `${index + 1}. ${file}`),
  ].join("\n")

  const result = callHermesVisionModel(prompt, screenshotFiles)
  const jsonText = extractJsonObject(result.content || "")
  if (!jsonText) throw new Error(`Image visibility probe returned no parseable JSON. Raw output: ${result.content}`)
  const parsed = JSON.parse(jsonText) as Partial<ImageVisibilityProbe>
  const answers = parsed.answers as ImageVisibilityProbe["answers"] | undefined
  const requiredAnswerKeys: Array<keyof ImageVisibilityProbe["answers"]> = [
    "top_visible_headline",
    "primary_links_purple_underlined",
    "typography_serif_or_sans",
    "duplicated_headline",
    "raw_unstyled_icon_stacks",
    "default_browser_html",
    "horizontal_overflow_or_awkward_mobile_spacing",
  ]
  if (!answers || typeof answers !== "object") throw new Error("Image visibility probe missing answers object.")
  for (const key of requiredAnswerKeys) {
    if (typeof answers[key] !== "string" || !answers[key].trim()) throw new Error(`Image visibility probe missing answer: ${key}`)
  }
  const failureText = [parsed.failure_reason, ...requiredAnswerKeys.map((key) => answers[key])].join(" ").toLowerCase()
  const cannotSee = /cannot (determine|answer|see)|can't (determine|answer|see)|unable to (determine|answer|see)|no image|not visible|only metadata|only path/.test(failureText)
  return {
    reviewer_model: result.model,
    reviewer_provider: result.provider,
    attached_screenshot_files: screenshotFiles,
    answers,
    confidence: parsed.confidence === "pass" && !cannotSee ? "pass" : "fail",
    failure_reason: parsed.confidence === "pass" && !cannotSee ? "" : String(parsed.failure_reason || "probe did not prove image visibility"),
  }
}

function callHermesVisionModel(prompt: string, imagePaths: string[]): HermesVisionResult {
  const tempDir = mkdtempSync(join(tmpdir(), "stanley-critical-vision-"))
  const payloadPath = join(tempDir, "payload.json")
  const scriptPath = join(tempDir, "call_hermes_vision.py")
  try {
    writeFileSync(payloadPath, JSON.stringify({ prompt, image_paths: imagePaths }, null, 2))
    writeFileSync(scriptPath, hermesVisionPython())
    const pythonBin = process.env.HERMES_CRITICAL_VISUAL_REVIEW_PYTHON || join(HERMES_AGENT_ROOT, "venv", "bin", "python3")
    const result = spawnSync(pythonBin, [scriptPath, payloadPath], {
      cwd: process.cwd(),
      encoding: "utf8",
      env: {
        ...process.env,
        PYTHONPATH: [HERMES_AGENT_ROOT, process.env.PYTHONPATH].filter(Boolean).join(":"),
      },
      shell: false,
      maxBuffer: 40 * 1024 * 1024,
    })
    if ((result.status ?? 1) !== 0) {
      throw new Error(`Hermes vision model call failed: ${result.stderr || result.stdout || result.error?.message || "no output"}`)
    }
    return JSON.parse(result.stdout) as HermesVisionResult
  } finally {
    rmSync(tempDir, { recursive: true, force: true })
  }
}

function hermesVisionPython(): string {
  return String.raw`
import asyncio
import base64
import json
import mimetypes
import sys
from pathlib import Path

from agent.auxiliary_client import async_call_llm, resolve_vision_provider_client

payload = json.loads(Path(sys.argv[1]).read_text())
prompt = payload["prompt"]
image_paths = payload["image_paths"]

content = [{"type": "text", "text": prompt}]
for raw_path in image_paths:
    path = Path(raw_path)
    if not path.exists() or not path.is_file():
        raise SystemExit(f"missing image file: {path}")
    mime = mimetypes.guess_type(str(path))[0] or "image/png"
    if not mime.startswith("image/"):
        mime = "image/png"
    data = base64.b64encode(path.read_bytes()).decode("ascii")
    content.append({"type": "image_url", "image_url": {"url": f"data:{mime};base64,{data}"}})

provider, _client, model = resolve_vision_provider_client()
if _client is None:
    raise SystemExit("no Hermes vision provider/client resolved")

async def main():
    response = await async_call_llm(
        task="vision",
        messages=[{"role": "user", "content": content}],
        temperature=0,
        max_tokens=8000,
        timeout=180,
    )
    choice = response.choices[0]
    message = choice.message
    text = getattr(message, "content", None) or ""
    if isinstance(text, list):
        text = "".join(part.get("text", "") if isinstance(part, dict) else str(part) for part in text)
    print(json.dumps({"provider": provider, "model": model, "content": text}, ensure_ascii=False))

asyncio.run(main())
`
}

function loadStanleyWebsiteReviewContext(): StanleyWebsiteReviewContext {
  const loadedFiles: string[] = []
  const missingRequestedFiles: string[] = []
  const chunks: string[] = [
    "# Stanley Website Review Context",
    "",
    "Generated for Full-Context Smart Vision Reviewer from the current canonical design source and current shared Stanley Systems context.",
    "",
    "IMPORTANT SOURCE BOUNDARY: DESIGN.md controls visual style only. The current approved task brief and shared offer/copy context control words, offers, pricing, claims, routes, and funnel logic. The live website is not a content source.",
    `Generated at: ${new Date().toISOString()}`,
    "",
  ]
  const seen = new Set<string>()
  if (existsSync(STANLEY_DESIGN_PATH)) {
    const designText = readFileSync(STANLEY_DESIGN_PATH, "utf8")
    seen.add(STANLEY_DESIGN_PATH)
    loadedFiles.push(STANLEY_DESIGN_PATH)
    chunks.push(`\n---\n\n## Canonical visual source: ${STANLEY_DESIGN_PATH}\n\n${designText.trim()}\n`)
  } else {
    missingRequestedFiles.push(STANLEY_DESIGN_PATH)
  }
  for (const relativePath of STANLEY_WEBSITE_REVIEW_CONTEXT_FILES) {
    const fullPath = join(STANLEY_CONTEXT_ROOT, relativePath)
    if (!existsSync(fullPath)) {
      missingRequestedFiles.push(fullPath)
      continue
    }
    if (seen.has(fullPath)) continue
    seen.add(fullPath)
    const text = readFileSync(fullPath, "utf8")
    loadedFiles.push(fullPath)
    chunks.push(`\n---\n\n## Current shared source: ${fullPath}\n\n${text.trim()}\n`)
  }
  if (!loadedFiles.length) throw new Error(`No current Stanley Systems design or shared context files were loaded.`)
  const markdown = chunks.join("\n")
  mkdirSync(join(process.cwd(), "scripts", "design-loop", "generated"), { recursive: true })
  writeFileSync(GENERATED_REVIEW_CONTEXT_PATH, markdown)
  return { path: GENERATED_REVIEW_CONTEXT_PATH, loaded_files: loadedFiles, missing_requested_files: missingRequestedFiles, markdown }
}

function runContextProof(context: StanleyWebsiteReviewContext): ContextProof {
  const prompt = [
    "You are the Stanley Systems context proof step for Critical Visual Review.",
    "Answer only from the loaded Stanley Systems project context below. If the context is not present or cannot answer these items, set confidence to fail.",
    "Return only strict JSON with this shape:",
    JSON.stringify({
      answers: {
        icp: "the ideal customer profile",
        public_first_step: "the free public entry point",
        package_1: "the paid diagnostic offer name",
        package_2: "the implementation offer name",
        main_copy_standard: "main copy standard",
        public_language_rule: "one public-language rule",
      },
      confidence: "pass or fail",
      failure_reason: "empty if pass, otherwise what context was missing",
    }, null, 2),
    "",
    "Loaded context files:",
    ...context.loaded_files.map((file) => `- ${file}`),
    "",
    "<<<STANLEY_WEBSITE_REVIEW_CONTEXT_BEGIN>>>",
    context.markdown,
    "<<<STANLEY_WEBSITE_REVIEW_CONTEXT_END>>>",
  ].join("\n")
  const result = callHermesVisionModel(prompt, [])
  const jsonText = extractJsonObject(result.content || "")
  if (!jsonText) throw new Error(`Context proof returned no parseable JSON. Raw output: ${result.content}`)
  const parsed = JSON.parse(jsonText) as Partial<ContextProof>
  const answers = parsed.answers as ContextProof["answers"] | undefined
  const required: Array<keyof ContextProof["answers"]> = ["icp", "public_first_step", "package_1", "package_2", "main_copy_standard", "public_language_rule"]
  if (!answers || typeof answers !== "object") throw new Error("Context proof missing answers object.")
  for (const key of required) {
    if (typeof answers[key] !== "string" || !answers[key].trim()) throw new Error(`Context proof missing answer: ${key}`)
  }
  const proofText = [parsed.failure_reason, ...required.map((key) => answers[key])].join(" ").toLowerCase()
  const expectedSignals = ["admin drag calculator", "ai office map", "ai office installation sprint"]
  const missingSignal = expectedSignals.find((signal) => !proofText.includes(signal))
  const publicRuleText = answers.public_language_rule.toLowerCase()
  const hasRecognizedPublicLanguageRule = ["stanley systems", "not stanley", "ai", "automation", "hermes", "codex", "openclaw", "twilio", "n8n", "qbo", "hcp", "clear", "clever", "business result", "result", "stack", "money", "owner", "plain"].some((signal) => publicRuleText.includes(signal))
  const cannotAnswer = /cannot (determine|answer)|can't (determine|answer)|unable to (determine|answer)|missing context|not provided/.test(proofText)
  return {
    reviewer_model: result.model,
    reviewer_provider: result.provider,
    answers,
    confidence: parsed.confidence === "pass" && !missingSignal && hasRecognizedPublicLanguageRule && !cannotAnswer ? "pass" : "fail",
    failure_reason: parsed.confidence === "pass" && !missingSignal && hasRecognizedPublicLanguageRule && !cannotAnswer ? "" : String(parsed.failure_reason || `context proof missing required signal: ${missingSignal || "recognized public-language rule"}`),
  }
}

function validateSmartReviewJson(value: unknown, contextProof: ContextProof, probe: ImageVisibilityProbe): SmartReviewJson {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Smart Vision Review JSON must be an object.")
  const json = value as Record<string, unknown>
  const allowedDecisions = ["pass", "fail_patch_needed", "fail_major_redesign_needed", "blocked_image_not_seen", "blocked_context_missing"]
  for (const field of ["pass", "final_decision", "trust_score", "visual_quality_score", "clarity_score", "mobile_score", "stanley_context_alignment_score", "visual_richness_score", "imagery_strength_score", "visual_anchor_score", "memorability_score", "visual_semantic_clarity_score", "visual_metaphor_coherence_score", "path_traceability_score", "approved_reference_fidelity_score", "mockup_fidelity_score", "stanley_design_alignment_score", "codex_translation_quality_score", "real_product_design_quality_score", "generic_ai_ui_risk_score", "visual_taste_preservation_score", "stanley_specificity_score", "diagram_aesthetic_quality_score", "diagram_geometry_quality_score", "diagram_spacing_quality_score", "main_visual_premium_quality_score", "main_visual_hero_worthiness_score", "mobile_diagram_quality_score", "generated_asset_scaling_quality", "repeated_card_pattern_present", "repeated_card_pattern_dominates", "repeated_card_pattern_is_secondary_support", "primary_visual_anchor_description", "visual_anchor_overpowers_card_stack", "repetitive_icon_card_pattern", "underdesigned_plain_section", "over_framed_section", "too_many_nested_borders", "border_noise_dominates_visual", "support_cards_repeat_border_language", "boxed_in_visual_anchor", "actual_ui_clipping_or_overflow", "screenshot_crop_only_not_layout_failure", "every_visual_element_has_business_role", "arbitrary_decorative_elements_present", "codex_inspected_approved_mockup", "codex_prebuild_interpretation_present", "matches_selected_mockup_direction", "could_belong_to_generic_saas_company", "depends_on_designer_explanation", "visually_rich_but_semantically_confusing", "viewer_can_explain_visual_in_5_seconds", "follows_approved_reference_structure", "blockers", "patch_brief"] as const) {
    if (!(field in json)) throw new Error(`Smart Vision Review JSON missing required field: ${field}`)
  }
  if (typeof json.pass !== "boolean") throw new Error("Smart Vision Review pass must be boolean.")
  if (!allowedDecisions.includes(String(json.final_decision))) throw new Error(`Smart Vision Review final_decision must be one of ${allowedDecisions.join(", ")}`)
  for (const field of ["trust_score", "visual_quality_score", "clarity_score", "mobile_score", "stanley_context_alignment_score", "visual_richness_score", "imagery_strength_score", "visual_anchor_score", "memorability_score", "visual_semantic_clarity_score", "visual_metaphor_coherence_score", "path_traceability_score", "approved_reference_fidelity_score", "mockup_fidelity_score", "stanley_design_alignment_score", "codex_translation_quality_score", "real_product_design_quality_score", "generic_ai_ui_risk_score", "visual_taste_preservation_score", "stanley_specificity_score", "diagram_aesthetic_quality_score", "diagram_geometry_quality_score", "diagram_spacing_quality_score", "main_visual_premium_quality_score", "main_visual_hero_worthiness_score", "mobile_diagram_quality_score", "generated_asset_scaling_quality"] as const) {
    if (typeof json[field] !== "number" || !Number.isFinite(json[field]) || (json[field] as number) < 1 || (json[field] as number) > 10) {
      throw new Error(`Smart Vision Review ${field} must be a number from 1 to 10.`)
    }
  }
  for (const field of ["repeated_card_pattern_present", "repeated_card_pattern_dominates", "repeated_card_pattern_is_secondary_support", "visual_anchor_overpowers_card_stack", "repetitive_icon_card_pattern", "underdesigned_plain_section", "over_framed_section", "too_many_nested_borders", "border_noise_dominates_visual", "support_cards_repeat_border_language", "boxed_in_visual_anchor", "actual_ui_clipping_or_overflow", "screenshot_crop_only_not_layout_failure", "every_visual_element_has_business_role", "arbitrary_decorative_elements_present", "codex_inspected_approved_mockup", "codex_prebuild_interpretation_present", "matches_selected_mockup_direction", "could_belong_to_generic_saas_company", "depends_on_designer_explanation", "visually_rich_but_semantically_confusing", "viewer_can_explain_visual_in_5_seconds", "follows_approved_reference_structure", "generated_asset_feels_raw_or_ai", "central_visual_asset_is_ugly", "diagram_has_awkward_proportions", "diagram_has_cramped_or_forced_layout", "main_visual_looks_intentionally_designed", "main_visual_supports_section_hierarchy", "generated_asset_text_is_baked_in", "generated_asset_has_unreadable_text", "visual_asset_ready_for_production_use"] as const) {
    if (typeof json[field] !== "boolean") throw new Error(`Smart Vision Review ${field} must be boolean.`)
  }
  if (typeof json.primary_visual_anchor_description !== "string" || !json.primary_visual_anchor_description.trim()) throw new Error("Smart Vision Review primary_visual_anchor_description must be a non-empty string.")
  if (!Array.isArray(json.blockers) || json.blockers.some((item) => typeof item !== "string")) throw new Error("Smart Vision Review blockers must be string[].")
  if (typeof json.patch_brief !== "string" || !json.patch_brief.trim()) throw new Error("Smart Vision Review patch_brief must be a non-empty string.")
  if (probe.confidence !== "pass" && json.final_decision !== "blocked_image_not_seen") throw new Error("Smart Vision Review must block as blocked_image_not_seen when image proof fails.")
  if (contextProof.confidence !== "pass" && json.final_decision !== "blocked_context_missing") throw new Error("Smart Vision Review must block as blocked_context_missing when context proof fails.")
  const review = json as SmartReviewJson
  const patchBrief = review.patch_brief.trim()
  const noPatchNeeded = /^(none|no patch needed|no changes needed|pass)$/i.test(patchBrief)
  const positiveVisualFailures: string[] = []
  if (review.visual_richness_score < 7) positiveVisualFailures.push(`visual_richness_score ${review.visual_richness_score} is below 7`)
  if (review.imagery_strength_score < 7) positiveVisualFailures.push(`imagery_strength_score ${review.imagery_strength_score} is below 7`)
  if (review.visual_anchor_score < 7) positiveVisualFailures.push(`visual_anchor_score ${review.visual_anchor_score} is below 7`)
  if (review.visual_semantic_clarity_score < 8) positiveVisualFailures.push(`visual_semantic_clarity_score ${review.visual_semantic_clarity_score} is below 8`)
  if (review.visual_metaphor_coherence_score < 8) positiveVisualFailures.push(`visual_metaphor_coherence_score ${review.visual_metaphor_coherence_score} is below 8`)
  if (review.path_traceability_score < 8) positiveVisualFailures.push(`path_traceability_score ${review.path_traceability_score} is below 8`)
  if (review.diagram_aesthetic_quality_score < 8.5) positiveVisualFailures.push(`diagram_aesthetic_quality_score ${review.diagram_aesthetic_quality_score} is below 8.5`)
  if (review.diagram_geometry_quality_score < 8.5) positiveVisualFailures.push(`diagram_geometry_quality_score ${review.diagram_geometry_quality_score} is below 8.5`)
  if (review.diagram_spacing_quality_score < 8.5) positiveVisualFailures.push(`diagram_spacing_quality_score ${review.diagram_spacing_quality_score} is below 8.5`)
  if (review.main_visual_premium_quality_score < 8.5) positiveVisualFailures.push(`main_visual_premium_quality_score ${review.main_visual_premium_quality_score} is below 8.5`)
  if (review.main_visual_hero_worthiness_score < 8.5) positiveVisualFailures.push(`main_visual_hero_worthiness_score ${review.main_visual_hero_worthiness_score} is below 8.5`)
  if (review.mobile_diagram_quality_score < 8.5) positiveVisualFailures.push(`mobile_diagram_quality_score ${review.mobile_diagram_quality_score} is below 8.5`)
  if (review.repeated_card_pattern_dominates) positiveVisualFailures.push("repeated_card_pattern_dominates is true")
  if (review.repeated_card_pattern_present && !review.repeated_card_pattern_is_secondary_support) positiveVisualFailures.push("repeated_card_pattern_present is true but not marked as secondary support")
  if (review.repeated_card_pattern_present && review.repeated_card_pattern_is_secondary_support && (review.visual_anchor_score < 8 || review.imagery_strength_score < 8 || !review.visual_anchor_overpowers_card_stack || !review.primary_visual_anchor_description.trim())) positiveVisualFailures.push("repeated cards are present but not justified by a strong described visual anchor overpowering the card stack")
  if (review.underdesigned_plain_section) positiveVisualFailures.push("underdesigned_plain_section is true")
  if (review.over_framed_section) positiveVisualFailures.push("over_framed_section is true")
  if (review.too_many_nested_borders) positiveVisualFailures.push("too_many_nested_borders is true")
  if (review.border_noise_dominates_visual) positiveVisualFailures.push("border_noise_dominates_visual is true")
  if (review.boxed_in_visual_anchor) positiveVisualFailures.push("boxed_in_visual_anchor is true")
  if (review.actual_ui_clipping_or_overflow) positiveVisualFailures.push("actual_ui_clipping_or_overflow is true")
  if (!review.every_visual_element_has_business_role) positiveVisualFailures.push("every_visual_element_has_business_role is false")
  if (review.arbitrary_decorative_elements_present) positiveVisualFailures.push("arbitrary_decorative_elements_present is true")
  if (review.visually_rich_but_semantically_confusing) positiveVisualFailures.push("visually_rich_but_semantically_confusing is true")
  if (!review.viewer_can_explain_visual_in_5_seconds) positiveVisualFailures.push("viewer_can_explain_visual_in_5_seconds is false")
  if (!review.follows_approved_reference_structure) positiveVisualFailures.push("follows_approved_reference_structure is false")
  if (!review.matches_selected_mockup_direction) positiveVisualFailures.push("matches_selected_mockup_direction is false")
  if (review.could_belong_to_generic_saas_company) positiveVisualFailures.push("could_belong_to_generic_saas_company is true")
  if (review.depends_on_designer_explanation) positiveVisualFailures.push("depends_on_designer_explanation is true")
  if (review.generated_asset_feels_raw_or_ai) positiveVisualFailures.push("generated_asset_feels_raw_or_ai is true")
  if (review.central_visual_asset_is_ugly) positiveVisualFailures.push("central_visual_asset_is_ugly is true")
  if (review.generated_asset_text_is_baked_in) positiveVisualFailures.push("generated_asset_text_is_baked_in is true")
  if (review.generated_asset_has_unreadable_text) positiveVisualFailures.push("generated_asset_has_unreadable_text is true")
  if (review.diagram_has_awkward_proportions) positiveVisualFailures.push("diagram_has_awkward_proportions is true")
  if (review.diagram_has_cramped_or_forced_layout) positiveVisualFailures.push("diagram_has_cramped_or_forced_layout is true")
  if (!review.main_visual_looks_intentionally_designed) positiveVisualFailures.push("main_visual_looks_intentionally_designed is false")
  if (!review.main_visual_supports_section_hierarchy) positiveVisualFailures.push("main_visual_supports_section_hierarchy is false")
  if (!review.visual_asset_ready_for_production_use) positiveVisualFailures.push("visual_asset_ready_for_production_use is false")
  if (positiveVisualFailures.length) {
    review.pass = false
    if (review.final_decision === "pass") review.final_decision = "fail_patch_needed"
    review.blockers = [...review.blockers, ...positiveVisualFailures]
    if (/^(no patch needed|none|no changes needed)$/i.test(review.patch_brief.trim())) {
      review.patch_brief = `Patch required by positive visual quality gate: ${positiveVisualFailures.join("; ")}. Add a stronger visual anchor, more imagery or SVG communication, less repetitive icon-card rhythm, fewer nested borders, quieter support items, and a more persuasive section-level visual idea while preserving mobile safety.`
    }
  }
  if (review.pass && !noPatchNeeded) {
    review.pass = false
    review.final_decision = "fail_patch_needed"
    review.blockers = review.blockers.length ? review.blockers : ["Smart Vision Reviewer returned a pass while also providing a Codex patch brief; harsh review requires patch-needed until no material fixes remain."]
  }
  return review
}

function extractMarkdownCritique(content: string): string {
  const firstJson = content.indexOf("{")
  const markdown = firstJson >= 0 ? content.slice(0, firstJson).trim() : content.trim()
  const requiredHeadings = [
    "## First impression",
    "## What a service-business owner would think",
    "## Visual trust problems",
    "## Positive visual quality",
    "## Copy and messaging problems",
    "## Offer clarity problems",
    "## Mobile UX problems",
    "## Stanley Systems positioning violations",
    "## Exact highest-leverage fixes",
    "## Codex-ready patch brief",
  ]
  const missing = requiredHeadings.filter((heading) => !markdown.includes(heading))
  if (missing.length) throw new Error(`Smart Vision Review markdown critique missing required heading(s): ${missing.join(", ")}`)
  return markdown
}

function normalizeSmartReviewForGate(packet: CriticalReviewPacket, smart: SmartReviewJson, visionResult: HermesVisionResult, markdownCritique: string): CriticalSectionReview {
  const decisionMap: Record<SmartReviewJson["final_decision"], CriticalSectionReview["final_decision"]> = {
    pass: "pass",
    fail_patch_needed: "fail_codex_patch_needed",
    fail_major_redesign_needed: "fail_revert_recommended",
    blocked_image_not_seen: "blocked_missing_screenshot",
    blocked_context_missing: "fail_revert_recommended",
  }
  const blockers = [...smart.blockers]
  if (!smart.pass && !blockers.length) blockers.push("Smart Vision Reviewer failed the page but returned no blocker details.")
  if (smart.stanley_context_alignment_score < 7) blockers.push(`stanley_context_alignment_score ${smart.stanley_context_alignment_score} is below 7`)
  if (smart.visual_richness_score < 7) blockers.push(`visual_richness_score ${smart.visual_richness_score} is below 7`)
  if (smart.imagery_strength_score < 7) blockers.push(`imagery_strength_score ${smart.imagery_strength_score} is below 7`)
  if (smart.visual_anchor_score < 7) blockers.push(`visual_anchor_score ${smart.visual_anchor_score} is below 7`)
  if (smart.visual_semantic_clarity_score < 8) blockers.push(`visual_semantic_clarity_score ${smart.visual_semantic_clarity_score} is below 8`)
  if (smart.visual_metaphor_coherence_score < 8) blockers.push(`visual_metaphor_coherence_score ${smart.visual_metaphor_coherence_score} is below 8`)
  if (smart.path_traceability_score < 8) blockers.push(`path_traceability_score ${smart.path_traceability_score} is below 8`)
  if (smart.approved_reference_fidelity_score < 8.5) blockers.push(`approved_reference_fidelity_score ${smart.approved_reference_fidelity_score} is below 8.5`)
  if (smart.mockup_fidelity_score < 8) blockers.push(`mockup_fidelity_score ${smart.mockup_fidelity_score} is below 8`)
  if (smart.stanley_design_alignment_score < 8) blockers.push(`stanley_design_alignment_score ${smart.stanley_design_alignment_score} is below 8`)
  if (smart.codex_translation_quality_score < 8) blockers.push(`codex_translation_quality_score ${smart.codex_translation_quality_score} is below 8`)
  if (smart.real_product_design_quality_score < 8) blockers.push(`real_product_design_quality_score ${smart.real_product_design_quality_score} is below 8`)
  if (smart.generic_ai_ui_risk_score > 3) blockers.push(`generic_ai_ui_risk_score ${smart.generic_ai_ui_risk_score} is above 3`)
  if (smart.visual_taste_preservation_score < 8) blockers.push(`visual_taste_preservation_score ${smart.visual_taste_preservation_score} is below 8`)
  if (smart.design_research_used_correctly !== true) blockers.push("design_research_used_correctly is false")
  if (!smart.codex_inspected_approved_mockup) blockers.push("codex_inspected_approved_mockup is false")
  if (!smart.codex_prebuild_interpretation_present) blockers.push("codex_prebuild_interpretation_present is false")
  if (smart.stanley_specificity_score < 8.5) blockers.push(`stanley_specificity_score ${smart.stanley_specificity_score} is below 8.5`)
  if (!smart.matches_selected_mockup_direction) blockers.push("matches_selected_mockup_direction is false")
  if (smart.could_belong_to_generic_saas_company) blockers.push("could_belong_to_generic_saas_company is true")
  if (smart.depends_on_designer_explanation) blockers.push("depends_on_designer_explanation is true")
  if (smart.repeated_card_pattern_dominates) blockers.push("repeated_card_pattern_dominates is true")
  if (smart.repeated_card_pattern_present && !smart.repeated_card_pattern_is_secondary_support) blockers.push("repeated_card_pattern_present is true but not marked as secondary support")
  if (smart.repeated_card_pattern_present && smart.repeated_card_pattern_is_secondary_support && (smart.visual_anchor_score < 8 || smart.imagery_strength_score < 8 || !smart.visual_anchor_overpowers_card_stack || !smart.primary_visual_anchor_description.trim())) blockers.push("repeated cards are present but not justified by a strong described visual anchor overpowering the card stack")
  if (smart.underdesigned_plain_section) blockers.push("underdesigned_plain_section is true")
  if (smart.over_framed_section) blockers.push("over_framed_section is true")
  if (smart.too_many_nested_borders) blockers.push("too_many_nested_borders is true")
  if (smart.border_noise_dominates_visual) blockers.push("border_noise_dominates_visual is true")
  if (smart.boxed_in_visual_anchor) blockers.push("boxed_in_visual_anchor is true")
  if (smart.actual_ui_clipping_or_overflow) blockers.push("actual_ui_clipping_or_overflow is true")
  if (!smart.every_visual_element_has_business_role) blockers.push("every_visual_element_has_business_role is false")
  if (smart.arbitrary_decorative_elements_present) blockers.push("arbitrary_decorative_elements_present is true")
  if (smart.visually_rich_but_semantically_confusing) blockers.push("visually_rich_but_semantically_confusing is true")
  if (!smart.viewer_can_explain_visual_in_5_seconds) blockers.push("viewer_can_explain_visual_in_5_seconds is false")
  if (!smart.follows_approved_reference_structure) blockers.push("follows_approved_reference_structure is false")
  return {
    section_id: packet.section_id,
    reviewer_version: `smart-vision-context-reviewer-v1:${visionResult.provider}/${visionResult.model}`,
    reviewed_screenshot_paths: packet.screenshots,
    reviewed_screenshot_hashes: packet.metadata.screenshot_hashes,
    section_match: "yes",
    desktop_pass: smart.pass,
    mobile_pass: smart.pass && smart.mobile_score >= 7,
    visual_quality_score: smart.visual_quality_score,
    ai_slop_score: Math.max(1, Math.min(10, 11 - smart.trust_score)),
    clarity_score: smart.clarity_score,
    mobile_score: smart.mobile_score,
    visual_richness_score: smart.visual_richness_score,
    imagery_strength_score: smart.imagery_strength_score,
    visual_anchor_score: smart.visual_anchor_score,
    memorability_score: smart.memorability_score,
    visual_semantic_clarity_score: smart.visual_semantic_clarity_score,
    visual_metaphor_coherence_score: smart.visual_metaphor_coherence_score,
    path_traceability_score: smart.path_traceability_score,
    approved_reference_fidelity_score: smart.approved_reference_fidelity_score,
    mockup_fidelity_score: smart.mockup_fidelity_score,
    stanley_design_alignment_score: smart.stanley_design_alignment_score,
    codex_translation_quality_score: smart.codex_translation_quality_score,
    real_product_design_quality_score: smart.real_product_design_quality_score,
    generic_ai_ui_risk_score: smart.generic_ai_ui_risk_score,
    visual_taste_preservation_score: smart.visual_taste_preservation_score,
    design_research_used_correctly: smart.design_research_used_correctly,
    codex_inspected_approved_mockup: smart.codex_inspected_approved_mockup,
    codex_prebuild_interpretation_present: smart.codex_prebuild_interpretation_present,
    stanley_specificity_score: smart.stanley_specificity_score,
    diagram_aesthetic_quality_score: smart.diagram_aesthetic_quality_score,
    diagram_geometry_quality_score: smart.diagram_geometry_quality_score,
    diagram_spacing_quality_score: smart.diagram_spacing_quality_score,
    main_visual_premium_quality_score: smart.main_visual_premium_quality_score,
    main_visual_hero_worthiness_score: smart.main_visual_hero_worthiness_score,
    mobile_diagram_quality_score: smart.mobile_diagram_quality_score,
    generated_asset_scaling_quality: smart.generated_asset_scaling_quality,
    repeated_card_pattern_present: smart.repeated_card_pattern_present,
    repeated_card_pattern_dominates: smart.repeated_card_pattern_dominates,
    repeated_card_pattern_is_secondary_support: smart.repeated_card_pattern_is_secondary_support,
    primary_visual_anchor_description: smart.primary_visual_anchor_description,
    visual_anchor_overpowers_card_stack: smart.visual_anchor_overpowers_card_stack,
    repetitive_icon_card_pattern: smart.repetitive_icon_card_pattern,
    underdesigned_plain_section: smart.underdesigned_plain_section,
    over_framed_section: smart.over_framed_section,
    too_many_nested_borders: smart.too_many_nested_borders,
    border_noise_dominates_visual: smart.border_noise_dominates_visual,
    support_cards_repeat_border_language: smart.support_cards_repeat_border_language,
    boxed_in_visual_anchor: smart.boxed_in_visual_anchor,
    actual_ui_clipping_or_overflow: smart.actual_ui_clipping_or_overflow,
    screenshot_crop_only_not_layout_failure: smart.screenshot_crop_only_not_layout_failure,
    every_visual_element_has_business_role: smart.every_visual_element_has_business_role,
    arbitrary_decorative_elements_present: smart.arbitrary_decorative_elements_present,
    visually_rich_but_semantically_confusing: smart.visually_rich_but_semantically_confusing,
    viewer_can_explain_visual_in_5_seconds: smart.viewer_can_explain_visual_in_5_seconds,
    follows_approved_reference_structure: smart.follows_approved_reference_structure,
    matches_selected_mockup_direction: smart.matches_selected_mockup_direction,
    could_belong_to_generic_saas_company: smart.could_belong_to_generic_saas_company,
    depends_on_designer_explanation: smart.depends_on_designer_explanation,
    generated_asset_feels_raw_or_ai: smart.generated_asset_feels_raw_or_ai,
    central_visual_asset_is_ugly: smart.central_visual_asset_is_ugly,
    diagram_has_awkward_proportions: smart.diagram_has_awkward_proportions,
    diagram_has_cramped_or_forced_layout: smart.diagram_has_cramped_or_forced_layout,
    main_visual_looks_intentionally_designed: smart.main_visual_looks_intentionally_designed,
    main_visual_supports_section_hierarchy: smart.main_visual_supports_section_hierarchy,
    generated_asset_text_is_baked_in: smart.generated_asset_text_is_baked_in,
    generated_asset_has_unreadable_text: smart.generated_asset_has_unreadable_text,
    visual_asset_ready_for_production_use: smart.visual_asset_ready_for_production_use,
    asset_strategy: smart.final_decision === "fail_major_redesign_needed" ? "code_plus_generated_asset" : "code_only",
    blockers,
    warnings: [
      `trust_score=${smart.trust_score}`,
      `stanley_context_alignment_score=${smart.stanley_context_alignment_score}`,
      `visual_richness_score=${smart.visual_richness_score}`,
      `imagery_strength_score=${smart.imagery_strength_score}`,
      `visual_anchor_score=${smart.visual_anchor_score}`,
      `memorability_score=${smart.memorability_score}`,
      `visual_semantic_clarity_score=${smart.visual_semantic_clarity_score}`,
      `visual_metaphor_coherence_score=${smart.visual_metaphor_coherence_score}`,
      `path_traceability_score=${smart.path_traceability_score}`,
      `approved_reference_fidelity_score=${smart.approved_reference_fidelity_score}`,
      `mockup_fidelity_score=${smart.mockup_fidelity_score}`,
      `stanley_design_alignment_score=${smart.stanley_design_alignment_score}`,
      `codex_translation_quality_score=${smart.codex_translation_quality_score}`,
      `real_product_design_quality_score=${smart.real_product_design_quality_score}`,
      `generic_ai_ui_risk_score=${smart.generic_ai_ui_risk_score}`,
      `visual_taste_preservation_score=${smart.visual_taste_preservation_score}`,
      `design_research_used_correctly=${smart.design_research_used_correctly}`,
      `codex_inspected_approved_mockup=${smart.codex_inspected_approved_mockup}`,
      `codex_prebuild_interpretation_present=${smart.codex_prebuild_interpretation_present}`,
      `stanley_specificity_score=${smart.stanley_specificity_score}`,
      `repeated_card_pattern_present=${smart.repeated_card_pattern_present}`,
      `repeated_card_pattern_dominates=${smart.repeated_card_pattern_dominates}`,
      `repeated_card_pattern_is_secondary_support=${smart.repeated_card_pattern_is_secondary_support}`,
      `primary_visual_anchor_description=${smart.primary_visual_anchor_description}`,
      `visual_anchor_overpowers_card_stack=${smart.visual_anchor_overpowers_card_stack}`,
      `repetitive_icon_card_pattern=${smart.repetitive_icon_card_pattern}`,
      `underdesigned_plain_section=${smart.underdesigned_plain_section}`,
      `over_framed_section=${smart.over_framed_section}`,
      `too_many_nested_borders=${smart.too_many_nested_borders}`,
      `border_noise_dominates_visual=${smart.border_noise_dominates_visual}`,
      `support_cards_repeat_border_language=${smart.support_cards_repeat_border_language}`,
      `boxed_in_visual_anchor=${smart.boxed_in_visual_anchor}`,
      `actual_ui_clipping_or_overflow=${smart.actual_ui_clipping_or_overflow}`,
      `screenshot_crop_only_not_layout_failure=${smart.screenshot_crop_only_not_layout_failure}`,
      `every_visual_element_has_business_role=${smart.every_visual_element_has_business_role}`,
      `arbitrary_decorative_elements_present=${smart.arbitrary_decorative_elements_present}`,
      `visually_rich_but_semantically_confusing=${smart.visually_rich_but_semantically_confusing}`,
      `viewer_can_explain_visual_in_5_seconds=${smart.viewer_can_explain_visual_in_5_seconds}`,
      `follows_approved_reference_structure=${smart.follows_approved_reference_structure}`,
      `matches_selected_mockup_direction=${smart.matches_selected_mockup_direction}`,
      `could_belong_to_generic_saas_company=${smart.could_belong_to_generic_saas_company}`,
      `depends_on_designer_explanation=${smart.depends_on_designer_explanation}`,
      `diagram_aesthetic_quality_score=${smart.diagram_aesthetic_quality_score}`,
      `diagram_geometry_quality_score=${smart.diagram_geometry_quality_score}`,
      `diagram_spacing_quality_score=${smart.diagram_spacing_quality_score}`,
      `main_visual_premium_quality_score=${smart.main_visual_premium_quality_score}`,
      `main_visual_hero_worthiness_score=${smart.main_visual_hero_worthiness_score}`,
      `mobile_diagram_quality_score=${smart.mobile_diagram_quality_score}`,
      `generated_asset_scaling_quality=${smart.generated_asset_scaling_quality}`,
      `generated_asset_feels_raw_or_ai=${smart.generated_asset_feels_raw_or_ai}`,
      `central_visual_asset_is_ugly=${smart.central_visual_asset_is_ugly}`,
      `diagram_has_awkward_proportions=${smart.diagram_has_awkward_proportions}`,
      `diagram_has_cramped_or_forced_layout=${smart.diagram_has_cramped_or_forced_layout}`,
      `main_visual_looks_intentionally_designed=${smart.main_visual_looks_intentionally_designed}`,
      `main_visual_supports_section_hierarchy=${smart.main_visual_supports_section_hierarchy}`,
      `generated_asset_text_is_baked_in=${smart.generated_asset_text_is_baked_in}`,
      `generated_asset_has_unreadable_text=${smart.generated_asset_has_unreadable_text}`,
      `visual_asset_ready_for_production_use=${smart.visual_asset_ready_for_production_use}`,
      `smart_final_decision=${smart.final_decision}`,
      `markdown_critique_chars=${markdownCritique.length}`,
    ],
    exact_fix_recommendation: smart.patch_brief,
    final_decision: decisionMap[smart.final_decision],
  }
}

function blockedSmartReview(finalDecision: "blocked_image_not_seen" | "blocked_context_missing", reason: string): SmartReviewJson {
  return {
    pass: false,
    final_decision: finalDecision,
    trust_score: 1,
    visual_quality_score: 1,
    clarity_score: 1,
    mobile_score: 1,
    stanley_context_alignment_score: finalDecision === "blocked_context_missing" ? 1 : 5,
    visual_richness_score: 1,
    imagery_strength_score: 1,
    visual_anchor_score: 1,
    memorability_score: 1,
    visual_semantic_clarity_score: 1,
    visual_metaphor_coherence_score: 1,
    path_traceability_score: 1,
    approved_reference_fidelity_score: 1,
    mockup_fidelity_score: 1,
    stanley_design_alignment_score: 1,
    codex_translation_quality_score: 1,
    real_product_design_quality_score: 1,
    generic_ai_ui_risk_score: 10,
    visual_taste_preservation_score: 1,
    design_research_used_correctly: false,
    codex_inspected_approved_mockup: false,
    codex_prebuild_interpretation_present: false,
    stanley_specificity_score: 1,
    diagram_aesthetic_quality_score: 1,
    diagram_geometry_quality_score: 1,
    diagram_spacing_quality_score: 1,
    main_visual_premium_quality_score: 1,
    main_visual_hero_worthiness_score: 1,
    mobile_diagram_quality_score: 1,
    generated_asset_scaling_quality: 1,
    repeated_card_pattern_present: false,
    repeated_card_pattern_dominates: false,
    repeated_card_pattern_is_secondary_support: false,
    primary_visual_anchor_description: "blocked before visual anchor could be reviewed",
    visual_anchor_overpowers_card_stack: false,
    repetitive_icon_card_pattern: false,
    underdesigned_plain_section: true,
    over_framed_section: false,
    too_many_nested_borders: false,
    border_noise_dominates_visual: false,
    support_cards_repeat_border_language: false,
    boxed_in_visual_anchor: false,
    actual_ui_clipping_or_overflow: false,
    screenshot_crop_only_not_layout_failure: false,
    every_visual_element_has_business_role: false,
    arbitrary_decorative_elements_present: false,
    visually_rich_but_semantically_confusing: true,
    viewer_can_explain_visual_in_5_seconds: false,
    follows_approved_reference_structure: false,
    matches_selected_mockup_direction: false,
    could_belong_to_generic_saas_company: true,
    depends_on_designer_explanation: true,
    generated_asset_feels_raw_or_ai: true,
    central_visual_asset_is_ugly: true,
    diagram_has_awkward_proportions: true,
    diagram_has_cramped_or_forced_layout: true,
    main_visual_looks_intentionally_designed: false,
    main_visual_supports_section_hierarchy: false,
    generated_asset_text_is_baked_in: true,
    generated_asset_has_unreadable_text: true,
    visual_asset_ready_for_production_use: false,
    blockers: [reason],
    patch_brief: reason,
  }
}

function blockedMarkdownCritique(reason: string): string {
  return [
    "## First impression",
    reason,
    "",
    "## What a service-business owner would think",
    "Review blocked before owner-trust critique because required review proof failed.",
    "",
    "## Visual trust problems",
    "## Positive visual quality",
    "Review blocked before a valid visual critique could be trusted.",
    "",
    "## Copy and messaging problems",
    "Review blocked before copy critique could be trusted.",
    "",
    "## Offer clarity problems",
    "Review blocked before offer clarity critique could be trusted.",
    "",
    "## Mobile UX problems",
    "Review blocked before mobile UX critique could be trusted.",
    "",
    "## Stanley Systems positioning violations",
    "Review blocked before positioning critique could be trusted.",
    "",
    "## Exact highest-leverage fixes",
    reason,
    "",
    "## Codex-ready patch brief",
    reason,
  ].join("\n")
}

function writeSmartReviewArtifacts(
  packet: CriticalReviewPacket,
  context: StanleyWebsiteReviewContext,
  probe: ImageVisibilityProbe,
  contextProof: ContextProof,
  markdownCritique: string,
  smartJson: SmartReviewJson,
  visionResult: HermesVisionResult,
): void {
  const artifactDir = join(SOFTWARE_FACTORY_ROOT, "artifacts", "critical-visual-review", `${packet.run_id}-smart-vision-context-review`)
  mkdirSync(artifactDir, { recursive: true })
  writeFileSync(join(artifactDir, "stanley-website-review-context.md"), context.markdown)
  writeFileSync(join(artifactDir, "markdown-critique.md"), markdownCritique)
  writeFileSync(join(artifactDir, "smart-review-decision.json"), JSON.stringify(smartJson, null, 2))
  writeFileSync(join(artifactDir, "vision-proof.json"), JSON.stringify(probe, null, 2))
  writeFileSync(join(artifactDir, "context-proof.json"), JSON.stringify(contextProof, null, 2))
  writeFileSync(join(artifactDir, "reviewer-model.json"), JSON.stringify({ provider: visionResult.provider, model: visionResult.model }, null, 2))
  writeFileSync(join(artifactDir, "loaded-context-files.json"), JSON.stringify({ loaded_files: context.loaded_files, missing_requested_files: context.missing_requested_files, generated_context_path: context.path }, null, 2))
  writeFileSync(join(artifactDir, "codex-patch-brief.task.md"), buildCodexPatchTask(packet, markdownCritique, smartJson, context, probe, contextProof))
  process.stderr.write(`critical_visual_review_smart_artifact_dir=${artifactDir}\n`)
  process.stderr.write(`critical_visual_review_codex_patch_task=${join(artifactDir, "codex-patch-brief.task.md")}\n`)
}

function buildCodexPatchTask(packet: CriticalReviewPacket, markdownCritique: string, smartJson: SmartReviewJson, context: StanleyWebsiteReviewContext, probe: ImageVisibilityProbe, contextProof: ContextProof): string {
  return `# Codex Patch Task: Smart Vision Reviewer Failure\n\nStatus: patch_spec_ready\nRepo: \`/home/jaden/stanley-landing\`\nSection id: \`${packet.section_id}\`\nRun id: \`${packet.run_id}\`\n\n## Non-negotiable boundaries\n- Do not deploy.\n- Do not restart PM2.\n- Do not run production live smoke.\n- Do not touch n8n, QBO, HCP, Telegram config, OpenClaw config, Hermes global config, PM2, secrets, credentials, or live workflow files.\n- Do not approve your own work. Hermes must recapture screenshots and rerun the Smart Vision Reviewer.\n\n## Reviewer model and proof\n- Reviewer: ${probe.reviewer_provider}/${probe.reviewer_model}\n- Attached screenshots:\n${probe.attached_screenshot_files.map((file) => `  - ${file}`).join("\n")}\n- Loaded Stanley context files:\n${context.loaded_files.map((file) => `  - ${file}`).join("\n")}\n\n## Context proof\n\`\`\`json\n${JSON.stringify(contextProof.answers, null, 2)}\n\`\`\`\n\n## Vision proof\n\`\`\`json\n${JSON.stringify(probe.answers, null, 2)}\n\`\`\`\n\n## Smart Vision Reviewer critique\n${markdownCritique}\n\n## Strict JSON decision\n\`\`\`json\n${JSON.stringify(smartJson, null, 2)}\n\`\`\`\n\n## Codex patch brief\n${smartJson.patch_brief}\n\n## Verification required after patch\n\`\`\`bash\nnpm run build\nnpm run design-loop:critical-visual-review-smoke\nnpm run design-loop:anti-ai-slop-smoke\ngit diff --check\n\`\`\`\n\nHermes must then capture fresh mobile/desktop screenshots and rerun Smart Vision Reviewer with full context and image bytes.\n`
}

function validateScreenshotEvidence(packet: CriticalReviewPacket, key: keyof CriticalReviewPacket["screenshots"]): void {
  const path = packet.screenshots[key]
  if (!path) return
  if (!existsSync(path)) throw new Error(`Missing ${key.replace("_", " ")} screenshot: ${path}`)
  const stat = statSync(path)
  if (!stat.isFile()) throw new Error(`Screenshot is not a file: ${path}`)
  const expectedHash = packet.metadata.screenshot_hashes[key]
  if (!expectedHash) throw new Error(`Missing ${key} screenshot hash metadata.`)
  const actualHash = createHash("sha256").update(readFileSync(path)).digest("hex")
  if (actualHash !== expectedHash) throw new Error(`${key} screenshot hash mismatch: expected ${expectedHash}, received ${actualHash}`)
  const capturedAt = Date.parse(packet.metadata.captured_at)
  if (!Number.isFinite(capturedAt)) throw new Error("Review packet metadata.captured_at must be a valid timestamp.")
  if (stat.mtimeMs > capturedAt + 2000) throw new Error(`${key} screenshot was modified after packet capture: ${path}`)
}

export function extractJsonObject(output: string): string | null {
  for (let start = 0; start < output.length; start += 1) {
    if (output[start] !== "{") continue
    let depth = 0
    let inString = false
    let escaped = false
    for (let end = start; end < output.length; end += 1) {
      const char = output[end]
      if (inString) {
        if (escaped) {
          escaped = false
        } else if (char === "\\") {
          escaped = true
        } else if (char === "\"") {
          inString = false
        }
        continue
      }
      if (char === "\"") {
        inString = true
      } else if (char === "{") {
        depth += 1
      } else if (char === "}") {
        depth -= 1
        if (depth === 0) {
          const candidate = output.slice(start, end + 1)
          try {
            JSON.parse(candidate)
            return candidate
          } catch {
            break
          }
        }
      }
    }
  }
  return null
}

function assertString(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || !value.trim()) throw new Error(`Review packet ${field} must be a non-empty string.`)
}

function assertStringArray(value: unknown, field: string): asserts value is string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`Review packet ${field} must be an array of strings.`)
  }
}
