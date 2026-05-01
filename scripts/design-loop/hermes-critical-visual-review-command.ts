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
const STANLEY_CONTEXT_ROOT = process.env.STANLEY_CONTEXT_ROOT || "/home/jaden/.openclaw/workspace/project/stanley-context"
const SOFTWARE_FACTORY_ROOT = process.env.SOFTWARE_FACTORY_ROOT || "/home/jaden/.openclaw/workspace/project/software-factory"
const GENERATED_REVIEW_CONTEXT_PATH = process.env.STANLEY_WEBSITE_REVIEW_CONTEXT_PATH || join(process.cwd(), "scripts", "design-loop", "generated", "stanley-website-review-context.md")

const STANLEY_WEBSITE_REVIEW_CONTEXT_FILES = [
  "00_START_HERE.md",
  "01_CORE_FOUNDATION.md",
  "02_WRITING_AND_LANGUAGE_RULES.md",
  "03_BUSINESS_AND_GTM_STATE.md",
  "05_DEMO_AND_AUTOMATION_STATE.md",
  "STANLEY-SYSTEMS-OFFER-ARCHITECTURE-AND-PACKAGE-1-V3.md",
  "STANLEY-SYSTEMS-—-THE-FOLLOW-UP-SYSTEM-V2.txt",
  "STANLEY-SYSTEMS-—-THE-FOLLOW-UP-SYSTEM-V2.md",
  "09_FOLLOW_UP_SYSTEM_BUNDLE.md",
  "MOTION-GRAPHICS-AND-VIDEO-RENDERING-STANDARD.txt",
  "08_MOTION_GRAPHICS_AND_VIDEO_RENDERING_STANDARD.md",
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
  repetitive_icon_card_pattern: boolean
  underdesigned_plain_section: boolean
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
    repetitive_icon_card_pattern: "boolean: true if repeated icon cards/list patterns are doing most visual work",
    underdesigned_plain_section: "boolean: true if clean/mobile-safe but too plain, icon-heavy, underpowered, or forgettable",
    blockers: "string[]",
    patch_brief: "string: Codex-ready patch brief scoped to the failed page/section, no self-approval",
  }

  return [
    "You are the Full-Context Smart Vision Reviewer for Stanley Systems website work.",
    "You are harsh, screenshot-first, context-first, and skeptical. You are reviewing for a real service-business owner, not a SaaS buyer.",
    "",
    "Verification-only boundaries:",
    "- Do not edit files.",
    "- Do not deploy.",
    "- Do not restart PM2.",
    "- Do not run production live smoke.",
    "- Do not touch n8n, QBO, HCP, Telegram config, OpenClaw config, secrets, credentials, PM2, or live workflow files.",
    "- Judge only attached screenshot pixels plus the full Stanley Systems context below.",
    "- Ignore Codex reasoning, build history, self-evaluation, and implementation debate.",
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
    "- The public first step is the Workflow Audit. Package 1 is Cashflow Control System. Package 2 is Customer Revenue System.",
    "- The buyer is a skeptical service-business owner, not a SaaS buyer.",
    "- Copy must be clear, not clever. Use Stanley Systems publicly, not Stanley shorthand.",
    "- Public copy must not make AI, Hermes, Codex, OpenClaw, Twilio, n8n, QBO API, or HCP API the star.",
    "- Generic SaaS filler, fake dashboards, weak cards, card/pill clutter, default browser styling, raw icons, purple underlined links, default serif typography, duplicated headlines, horizontal overflow, and unfinished mobile layouts fail.",
    "- A Stanley Systems section cannot pass only because it is clean, readable, mobile-safe, and strategy-aligned. Clean is table stakes, not approval.",
    "- It must also have a strong visual anchor, enough imagery or visual communication, a memorable section-level visual idea, varied visual rhythm, clear process-to-outcome motion where relevant, and a design that sells rather than merely explains.",
    "- The visuals must reduce explanation load and feel service-business relevant. A plain repeated icon-card stack cannot be the entire section.",
    "- Fail or require patch if the section is too icon-heavy, too plain, visually safe but forgettable, a vertical list instead of a designed system, dependent on the same card pattern for every step, lacking a dominant visual centerpiece, requiring text to do nearly all explanation, technically mobile-safe but boring, or clean but not persuasive.",
    "- Answer these positive visual quality questions in the critique: What is the dominant visual idea? Is there a clear visual anchor or mostly repeated cards? Does the visual reduce explanation load? Would a service-business owner remember it? Does it feel designed or assembled from icon cards? Is it visually persuasive enough to sell the idea? Is there enough imagery, movement, scale variation, and hierarchy? Does it preserve Taste Library direction while avoiding bad patterns? Would it feel premium and memorable on a phone?",
    "- Hard gates: final pass cannot be true if visual_richness_score < 7, imagery_strength_score < 7, visual_anchor_score < 7, underdesigned_plain_section is true, or repetitive_icon_card_pattern is true without visual_anchor_score >= 8, visual_richness_score >= 8, and imagery_strength_score >= 8.",
    "- Do not pass because the site is merely better than before. Pass only if it is credible as a premium service-business homepage.",
    "- If you provide any material Codex patch brief beyond 'no patch needed', JSON pass must be false and final_decision must be fail_patch_needed or fail_major_redesign_needed.",
    "- Passing means blockers is empty and patch_brief is exactly 'no patch needed'.",
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
    "Generated for Full-Context Smart Vision Reviewer. This file is compiled from canonical Stanley Systems context files and is intentionally not a tiny summary.",
    `Generated at: ${new Date().toISOString()}`,
    "",
  ]
  const seen = new Set<string>()
  for (const relativePath of STANLEY_WEBSITE_REVIEW_CONTEXT_FILES) {
    const fullPath = join(STANLEY_CONTEXT_ROOT, relativePath)
    if (!existsSync(fullPath)) {
      if (relativePath.endsWith(".txt") || relativePath.includes("—-THE-FOLLOW-UP-SYSTEM") || relativePath.includes("MOTION-GRAPHICS")) missingRequestedFiles.push(fullPath)
      continue
    }
    if (seen.has(fullPath)) continue
    seen.add(fullPath)
    const text = readFileSync(fullPath, "utf8")
    loadedFiles.push(fullPath)
    chunks.push(`\n---\n\n## Source file: ${fullPath}\n\n${text.trim()}\n`)
  }
  if (!loadedFiles.length) throw new Error(`No Stanley Systems context files loaded from ${STANLEY_CONTEXT_ROOT}`)
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
        public_first_step: "the public first step",
        package_1: "Package 1 name",
        package_2: "Package 2 name",
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
  const expectedSignals = ["workflow audit", "cashflow control system", "customer revenue system"]
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
  for (const field of ["pass", "final_decision", "trust_score", "visual_quality_score", "clarity_score", "mobile_score", "stanley_context_alignment_score", "visual_richness_score", "imagery_strength_score", "visual_anchor_score", "memorability_score", "repetitive_icon_card_pattern", "underdesigned_plain_section", "blockers", "patch_brief"] as const) {
    if (!(field in json)) throw new Error(`Smart Vision Review JSON missing required field: ${field}`)
  }
  if (typeof json.pass !== "boolean") throw new Error("Smart Vision Review pass must be boolean.")
  if (!allowedDecisions.includes(String(json.final_decision))) throw new Error(`Smart Vision Review final_decision must be one of ${allowedDecisions.join(", ")}`)
  for (const field of ["trust_score", "visual_quality_score", "clarity_score", "mobile_score", "stanley_context_alignment_score", "visual_richness_score", "imagery_strength_score", "visual_anchor_score", "memorability_score"] as const) {
    if (typeof json[field] !== "number" || !Number.isFinite(json[field]) || (json[field] as number) < 1 || (json[field] as number) > 10) {
      throw new Error(`Smart Vision Review ${field} must be a number from 1 to 10.`)
    }
  }
  if (typeof json.repetitive_icon_card_pattern !== "boolean") throw new Error("Smart Vision Review repetitive_icon_card_pattern must be boolean.")
  if (typeof json.underdesigned_plain_section !== "boolean") throw new Error("Smart Vision Review underdesigned_plain_section must be boolean.")
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
  if (review.repetitive_icon_card_pattern && (review.visual_anchor_score < 8 || review.visual_richness_score < 8 || review.imagery_strength_score < 8)) positiveVisualFailures.push("repetitive_icon_card_pattern is true without a strong enough visual centerpiece, visual richness, and imagery strength")
  if (review.underdesigned_plain_section) positiveVisualFailures.push("underdesigned_plain_section is true")
  if (positiveVisualFailures.length) {
    review.pass = false
    if (review.final_decision === "pass") review.final_decision = "fail_patch_needed"
    review.blockers = [...review.blockers, ...positiveVisualFailures]
    if (/^(no patch needed|none|no changes needed)$/i.test(review.patch_brief.trim())) {
      review.patch_brief = `Patch required by positive visual quality gate: ${positiveVisualFailures.join("; ")}. Add a stronger visual anchor, more imagery or SVG communication, less repetitive icon-card rhythm, and a more persuasive section-level visual idea while preserving mobile safety.`
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
  if (smart.repetitive_icon_card_pattern && (smart.visual_anchor_score < 8 || smart.visual_richness_score < 8 || smart.imagery_strength_score < 8)) blockers.push("repetitive_icon_card_pattern is true without a strong enough visual centerpiece, visual richness, and imagery strength")
  if (smart.underdesigned_plain_section) blockers.push("underdesigned_plain_section is true")
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
    repetitive_icon_card_pattern: smart.repetitive_icon_card_pattern,
    underdesigned_plain_section: smart.underdesigned_plain_section,
    asset_strategy: smart.final_decision === "fail_major_redesign_needed" ? "code_plus_generated_asset" : "code_only",
    blockers,
    warnings: [
      `trust_score=${smart.trust_score}`,
      `stanley_context_alignment_score=${smart.stanley_context_alignment_score}`,
      `visual_richness_score=${smart.visual_richness_score}`,
      `imagery_strength_score=${smart.imagery_strength_score}`,
      `visual_anchor_score=${smart.visual_anchor_score}`,
      `memorability_score=${smart.memorability_score}`,
      `repetitive_icon_card_pattern=${smart.repetitive_icon_card_pattern}`,
      `underdesigned_plain_section=${smart.underdesigned_plain_section}`,
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
    repetitive_icon_card_pattern: false,
    underdesigned_plain_section: true,
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
  return `# Codex Patch Task: Smart Vision Reviewer Failure\n\nStatus: patch_spec_ready\nRepo: \`/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page\`\nSection id: \`${packet.section_id}\`\nRun id: \`${packet.run_id}\`\n\n## Non-negotiable boundaries\n- Do not deploy.\n- Do not restart PM2.\n- Do not run production live smoke.\n- Do not touch n8n, QBO, HCP, Telegram config, OpenClaw config, Hermes global config, PM2, secrets, credentials, or live workflow files.\n- Do not approve your own work. Hermes must recapture screenshots and rerun the Smart Vision Reviewer.\n\n## Reviewer model and proof\n- Reviewer: ${probe.reviewer_provider}/${probe.reviewer_model}\n- Attached screenshots:\n${probe.attached_screenshot_files.map((file) => `  - ${file}`).join("\n")}\n- Loaded Stanley context files:\n${context.loaded_files.map((file) => `  - ${file}`).join("\n")}\n\n## Context proof\n\`\`\`json\n${JSON.stringify(contextProof.answers, null, 2)}\n\`\`\`\n\n## Vision proof\n\`\`\`json\n${JSON.stringify(probe.answers, null, 2)}\n\`\`\`\n\n## Smart Vision Reviewer critique\n${markdownCritique}\n\n## Strict JSON decision\n\`\`\`json\n${JSON.stringify(smartJson, null, 2)}\n\`\`\`\n\n## Codex patch brief\n${smartJson.patch_brief}\n\n## Verification required after patch\n\`\`\`bash\nnpm run build\nnpm run design-loop:critical-visual-review-smoke\nnpm run design-loop:anti-ai-slop-smoke\ngit diff --check\n\`\`\`\n\nHermes must then capture fresh mobile/desktop screenshots and rerun Smart Vision Reviewer with full context and image bytes.\n`
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
