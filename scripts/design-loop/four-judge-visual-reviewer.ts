/**
 * Locked stateless four-judge visual reviewer.
 *
 * Usage:
 *   node --experimental-strip-types scripts/design-loop/four-judge-visual-reviewer.ts <critical-visual-review-packet.json>
 *
 * The runner makes four fresh Hermes vision calls with screenshot bytes attached.
 * It does not accept or inject Hermes design reasoning, Higgsfield prompts, Codex build reports,
 * approval claims, implementation excuses, or ready-for-deploy framing.
 */
import { spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { pathToFileURL } from "node:url"

type ReviewPacket = {
  packet_version: string
  run_id: string
  section_id: string
  section_purpose?: string
  route?: string
  screenshots: Record<string, string | undefined>
  metadata: {
    captured_at: string
    screenshot_hashes: Record<string, string | undefined>
    screenshot_modified_times?: Record<string, string | undefined>
  }
}

type VisionResult = {
  provider: string
  model: string
  content: string
}

type JudgeDecision = {
  judge: "fresh_client" | "mobile_trust" | "stanley_strategy"
  pass: boolean
  score: number
  image_seen: boolean
  image_byte_proof: Record<string, string>
  blockers: string[]
  critique: string
}

type FinalDecision = {
  pass: boolean
  final_decision: "pass" | "fail_patch_needed" | "fail_generated_asset_needed" | "fail_major_redesign_needed" | "blocked_image_not_seen" | "blocked_context_missing"
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

type JudgeArtifact = {
  role: string
  provider: string
  model: string
  attached_screenshot_files: string[]
  prompt_contract: string
  raw_output: string
  parsed: JudgeDecision | FinalDecision | null
}

type StanleyContext = {
  loaded_files: string[]
  missing_requested_files: string[]
  markdown: string
}

const HERMES_AGENT_ROOT = process.env.HERMES_AGENT_ROOT || "/home/jaden/.hermes/hermes-agent"
const SOFTWARE_FACTORY_ROOT = process.env.SOFTWARE_FACTORY_ROOT || "/home/jaden/.openclaw/workspace/project/software-factory"
const STANLEY_CONTEXT_ROOT = process.env.STANLEY_CONTEXT_ROOT || "/home/jaden/.openclaw/workspace/project/stanley-context"

const CONTEXT_FILES = [
  "00_START_HERE.md",
  "01_CORE_FOUNDATION.md",
  "02_WRITING_AND_LANGUAGE_RULES.md",
  "03_BUSINESS_AND_GTM_STATE.md",
  "05_DEMO_AND_AUTOMATION_STATE.md",
  "STANLEY-SYSTEMS-OFFER-ARCHITECTURE-AND-PACKAGE-1-V3.md",
  "09_FOLLOW_UP_SYSTEM_BUNDLE.md",
  "08_MOTION_GRAPHICS_AND_VIDEO_RENDERING_STANDARD.md",
] as const

const REQUESTED_ALIAS_FILES = [
  "STANLEY-SYSTEMS-—-THE-FOLLOW-UP-SYSTEM-V2.txt",
  "MOTION-GRAPHICS-AND-VIDEO-RENDERING-STANDARD.txt",
] as const

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    const packetPath = process.argv[2]
    if (!packetPath) throw new Error("Expected packet path: node --experimental-strip-types scripts/design-loop/four-judge-visual-reviewer.ts <packet.json>")
    const result = runFourJudgeVisualReview(packetPath)
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`)
    process.exitCode = 1
  }
}

export function runFourJudgeVisualReview(packetPath: string): { artifact_dir: string; decision: FinalDecision; reviewer_model: string; reviewer_provider: string } {
  const packet = readPacket(packetPath)
  const screenshotFiles = screenshotFilesFromPacket(packet)
  const route = packet.route || "/"
  const visibleText = loadVisiblePageText(packet)
  const context = loadStanleyContext()
  const artifactDir = join(SOFTWARE_FACTORY_ROOT, "artifacts", "critical-visual-review", `${packet.run_id}-four-judge-stateless-review`)
  mkdirSync(artifactDir, { recursive: true })

  const fresh = runJudge("fresh-client-judge", buildFreshClientPrompt(packet, route), screenshotFiles)
  const freshDecision = validateJudgeDecision(parseJson(fresh.content), "fresh_client")
  writeJudgeArtifact(artifactDir, "01-fresh-client-judge", fresh, screenshotFiles, "screenshots + minimal service-business website instruction only", freshDecision)

  const mobile = runJudge("mobile-trust-judge", buildMobileTrustPrompt(packet, route), screenshotFiles)
  const mobileDecision = validateJudgeDecision(parseJson(mobile.content), "mobile_trust")
  writeJudgeArtifact(artifactDir, "02-mobile-trust-judge", mobile, screenshotFiles, "screenshots + locked mobile UX rubric only", mobileDecision)

  const strategy = runJudge("stanley-systems-strategy-judge", buildStrategyPrompt(packet, route, visibleText, context), screenshotFiles)
  const strategyDecision = validateJudgeDecision(parseJson(strategy.content), "stanley_strategy")
  writeJudgeArtifact(artifactDir, "03-stanley-systems-strategy-judge", strategy, screenshotFiles, "screenshots + visible page text + full Stanley Systems context + locked strategy rubric", strategyDecision)

  const final = runJudge("design-director-final-gatekeeper", buildFinalGatekeeperPrompt(packet, route, visibleText, context, fresh, mobile, strategy, freshDecision, mobileDecision, strategyDecision), screenshotFiles)
  const markdownCritique = extractMarkdown(final.content)
  const finalDecision = validateFinalDecision(parseJson(final.content), freshDecision, mobileDecision, strategyDecision, context)
  writeJudgeArtifact(artifactDir, "04-design-director-final-gatekeeper", final, screenshotFiles, "screenshots + Stanley context + raw first-three judge outputs; no Hermes design/build framing", finalDecision)

  writeFileSync(join(artifactDir, "final-markdown-critique.md"), markdownCritique)
  writeFileSync(join(artifactDir, "final-json-decision.json"), JSON.stringify(finalDecision, null, 2))
  writeFileSync(join(artifactDir, "codex-patch-brief.task.md"), buildCodexPatchTask(packet, route, context, freshDecision, mobileDecision, strategyDecision, markdownCritique, finalDecision, screenshotFiles, final))
  writeFileSync(join(artifactDir, "screenshots-attached.json"), JSON.stringify({ attached_screenshot_files: screenshotFiles, hashes: packet.metadata.screenshot_hashes }, null, 2))
  writeFileSync(join(artifactDir, "context-files-loaded.json"), JSON.stringify({ loaded_files: context.loaded_files, missing_requested_files: context.missing_requested_files }, null, 2))
  writeFileSync(join(artifactDir, "model-used.json"), JSON.stringify({ provider: final.provider, model: final.model, judge_models_match: [fresh, mobile, strategy, final].every((item) => item.provider === final.provider && item.model === final.model) }, null, 2))
  writeFileSync(join(artifactDir, "image-byte-proof.json"), JSON.stringify({
    proof_type: "Each judge call attached local screenshot bytes as base64 data:image/... image_url content parts through Hermes vision task path.",
    attached_screenshot_files: screenshotFiles,
    judges: {
      fresh_client: freshDecision.image_byte_proof,
      mobile_trust: mobileDecision.image_byte_proof,
      stanley_strategy: strategyDecision.image_byte_proof,
      final_gatekeeper: extractFinalImageProof(final.content),
    },
  }, null, 2))

  process.stderr.write(`four_judge_visual_review_artifact_dir=${artifactDir}\n`)
  process.stderr.write(`four_judge_visual_review_model=${final.provider}/${final.model}\n`)
  return { artifact_dir: artifactDir, decision: finalDecision, reviewer_model: final.model, reviewer_provider: final.provider }
}

function readPacket(packetPath: string): ReviewPacket {
  if (!existsSync(packetPath)) throw new Error(`Review packet does not exist: ${packetPath}`)
  const packet = JSON.parse(readFileSync(packetPath, "utf8")) as ReviewPacket
  if (packet.packet_version !== "critical-visual-review-v1") throw new Error("Unsupported packet_version; expected critical-visual-review-v1")
  if (!packet.run_id || !packet.section_id) throw new Error("Review packet missing run_id or section_id")
  return packet
}

function screenshotFilesFromPacket(packet: ReviewPacket): string[] {
  const files: string[] = []
  const seen = new Set<string>()
  for (const key of ["mobile_after", "desktop_after", "mobile_before", "desktop_before"]) {
    const file = packet.screenshots[key]
    if (!file || seen.has(file)) continue
    verifyScreenshot(packet, key, file)
    files.push(file)
    seen.add(file)
  }
  if (!files.length) throw new Error("No screenshots available for four-judge visual review")
  return files
}

function verifyScreenshot(packet: ReviewPacket, key: string, file: string): void {
  if (!existsSync(file)) throw new Error(`Missing screenshot: ${file}`)
  const stat = statSync(file)
  if (!stat.isFile()) throw new Error(`Screenshot path is not a file: ${file}`)
  const expectedHash = packet.metadata.screenshot_hashes[key]
  if (!expectedHash) throw new Error(`Missing screenshot hash for ${key}`)
  const actualHash = createHash("sha256").update(readFileSync(file)).digest("hex")
  if (actualHash !== expectedHash) throw new Error(`${key} screenshot hash mismatch: expected ${expectedHash}, received ${actualHash}`)
}

function loadVisiblePageText(packet: ReviewPacket): string {
  const domPath = join(SOFTWARE_FACTORY_ROOT, "design-audit", "runs", packet.run_id, "dom", "after", `${packet.section_id}.json`)
  if (!existsSync(domPath) || statSync(domPath).size === 0) return ""
  try {
    const parsed = JSON.parse(readFileSync(domPath, "utf8"))
    const text = JSON.stringify(parsed)
    return text.slice(0, 12000)
  } catch {
    return ""
  }
}

function loadStanleyContext(): StanleyContext {
  const loaded: string[] = []
  const missing: string[] = []
  const chunks: string[] = ["# Locked Stanley Systems Review Context", "", "Generated by scripts/design-loop/four-judge-visual-reviewer.ts from canonical context files."]
  for (const rel of CONTEXT_FILES) {
    const path = join(STANLEY_CONTEXT_ROOT, rel)
    if (!existsSync(path)) {
      missing.push(path)
      continue
    }
    loaded.push(path)
    chunks.push(`\n---\n\n## Source file: ${path}\n\n${readFileSync(path, "utf8").trim()}\n`)
  }
  for (const rel of REQUESTED_ALIAS_FILES) {
    const path = join(STANLEY_CONTEXT_ROOT, rel)
    if (!existsSync(path)) missing.push(path)
  }
  if (!loaded.length) throw new Error(`No Stanley Systems context files loaded from ${STANLEY_CONTEXT_ROOT}`)
  return { loaded_files: loaded, missing_requested_files: missing, markdown: chunks.join("\n") }
}

function runJudge(role: string, prompt: string, screenshotFiles: string[]): VisionResult {
  const result = callHermesVisionModel(prompt, screenshotFiles)
  process.stderr.write(`four_judge_role=${role} model=${result.provider}/${result.model} screenshots=${screenshotFiles.join(",")}\n`)
  return result
}

function buildFreshClientPrompt(packet: ReviewPacket, route: string): string {
  return [
    "LOCKED STATELESS REVIEWER ROLE: Fresh Client Judge.",
    "You are in a fresh stateless review pass. You do not know Hermes design intent, Higgsfield prompts, Codex reports, approvals, implementation excuses, previous reviews, or deploy status.",
    "Allowed inputs: actual screenshot image bytes, route, section_id, and this locked instruction only.",
    "Forbidden: infer approval, readiness, implementation effort, or intent. Judge only the pixels.",
    "Minimal context: this is a service-business website. The buyer is skeptical and busy.",
    `route: ${route}`,
    `section_id: ${packet.section_id}`,
    "Judge first impression, trust, clarity, perceived offer, and whether a skeptical service-business owner would click.",
    "Hard fail trust if it looks generic, unfinished, default, confusing, over-polished SaaS filler, or not credible on phone.",
    baseJudgeJsonContract("fresh_client"),
  ].join("\n")
}

function buildMobileTrustPrompt(packet: ReviewPacket, route: string): string {
  return [
    "LOCKED STATELESS REVIEWER ROLE: Mobile Trust Judge.",
    "You are in a fresh stateless review pass. You do not know Hermes design intent, Higgsfield prompts, Codex reports, approvals, implementation excuses, previous reviews, or deploy status.",
    "Allowed inputs: actual screenshot image bytes, route, section_id, locked mobile rubric, hard-fail rules.",
    `route: ${route}`,
    `section_id: ${packet.section_id}`,
    "Mobile UX rubric: judge spacing, hierarchy, CTA visibility, tap targets, typography, overflow, stacking, readability, sticky/nav behavior if visible, and whether the mobile page feels intentionally designed.",
    "Hard fail mobile usability for horizontal overflow, cramped/cropped sections, tiny text, weak CTA hierarchy, awkward stacking, default browser-style underlined links, duplicated major headlines, raw icon stacks, or unfinished mobile layout.",
    baseJudgeJsonContract("mobile_trust"),
  ].join("\n")
}

function buildStrategyPrompt(packet: ReviewPacket, route: string, visibleText: string, context: StanleyContext): string {
  return [
    "LOCKED STATELESS REVIEWER ROLE: Stanley Systems Strategy Judge.",
    "You are in a fresh stateless review pass. You do not know Hermes design intent, Higgsfield prompts, Codex reports, approvals, implementation excuses, previous reviews, or deploy status.",
    "Allowed inputs: actual screenshot image bytes, route, section_id, visible page text, full Stanley Systems context, locked strategy rubric, hard-fail rules.",
    `route: ${route}`,
    `section_id: ${packet.section_id}`,
    "Visible page text, if capture provided it:",
    visibleText || "[no separate visible text capture available; judge visible text from screenshot pixels]",
    "Stanley Systems context:",
    "<<<STANLEY_CONTEXT_BEGIN>>>",
    context.markdown,
    "<<<STANLEY_CONTEXT_END>>>",
    "Strategy rubric: judge ICP alignment, offer architecture, copy rules, public language rules, result-first positioning, Workflow Audit, Cashflow Control System, and Customer Revenue System.",
    "Hard fail generic SaaS filler, internal tooling language, clever-not-clear copy, weak outcome framing, and visuals that do not support money, time, billing speed, customer revenue, missed calls, follow-up, or owner relief.",
    baseJudgeJsonContract("stanley_strategy"),
  ].join("\n")
}

function buildFinalGatekeeperPrompt(packet: ReviewPacket, route: string, visibleText: string, context: StanleyContext, freshRaw: VisionResult, mobileRaw: VisionResult, strategyRaw: VisionResult, fresh: JudgeDecision, mobile: JudgeDecision, strategy: JudgeDecision): string {
  const finalContract = {
    pass: "boolean",
    final_decision: ["pass", "fail_patch_needed", "fail_generated_asset_needed", "fail_major_redesign_needed", "blocked_image_not_seen", "blocked_context_missing"],
    trust_score: "number 1-10",
    visual_quality_score: "number 1-10",
    clarity_score: "number 1-10",
    mobile_score: "number 1-10",
    stanley_context_alignment_score: "number 1-10",
    visual_richness_score: "number 1-10: richness, scale variation, visual rhythm, and non-plainness",
    imagery_strength_score: "number 1-10: imagery/visual communication strength, not just icons",
    visual_anchor_score: "number 1-10: dominant visual centerpiece strength",
    memorability_score: "number 1-10: whether a service-business owner would remember it after scrolling",
    repetitive_icon_card_pattern: "boolean: true if repeated icon cards/list patterns are doing most of the visual work",
    underdesigned_plain_section: "boolean: true if clean/mobile-safe but too plain, icon-heavy, underpowered, or visually forgettable",
    blockers: "string[]",
    patch_brief: "Codex-ready patch brief, or exactly no patch needed if pass",
  }
  return [
    "LOCKED STATELESS REVIEWER ROLE: Design Director / Final Gatekeeper.",
    "You are in a fresh stateless final gatekeeper pass. You do not know Hermes design intent, Higgsfield prompts, Codex build reports, asset approval claims, implementation excuses, or deploy status.",
    "Allowed inputs: actual screenshot image bytes, route, section_id, visible page text, Stanley Systems context, and raw outputs from the first three stateless judges.",
    "Forbidden: any persuasive framing from Hermes, any ready-for-deploy framing, any implementation excuses, any prior opinions beyond the raw judge outputs below.",
    "Codex cannot approve its own work. Hermes cannot override you without a written Jaden override artifact. Do not deploy. Do not restart PM2. Do not run production live smoke.",
    `route: ${route}`,
    `section_id: ${packet.section_id}`,
    "Visible page text, if capture provided it:",
    visibleText || "[no separate visible text capture available; judge visible text from screenshot pixels]",
    "Stanley Systems context:",
    "<<<STANLEY_CONTEXT_BEGIN>>>",
    context.markdown,
    "<<<STANLEY_CONTEXT_END>>>",
    "Raw Fresh Client Judge output, exactly as returned by that judge:",
    freshRaw.content,
    "Validated Fresh Client Judge gate signal, derived from raw output for machine enforcement:",
    JSON.stringify(fresh, null, 2),
    "Raw Mobile Trust Judge output, exactly as returned by that judge:",
    mobileRaw.content,
    "Validated Mobile Trust Judge gate signal, derived from raw output for machine enforcement:",
    JSON.stringify(mobile, null, 2),
    "Raw Stanley Systems Strategy Judge output, exactly as returned by that judge:",
    strategyRaw.content,
    "Validated Stanley Systems Strategy Judge gate signal, derived from raw output for machine enforcement:",
    JSON.stringify(strategy, null, 2),
    "Final rules:",
    "- A Stanley Systems section cannot pass only because it is clean, readable, mobile-safe, and strategy-aligned. Clean is table stakes, not approval.",
    "- It must also have a strong visual anchor, enough imagery or visual communication, a memorable section-level visual idea, varied visual rhythm, clear process-to-outcome motion where relevant, and a design that sells rather than merely explains.",
    "- The visuals must reduce explanation load and feel service-business relevant. A plain repeated icon-card stack cannot be the entire section.",
    "- Fail or require patch if the section is too icon-heavy, too plain, visually safe but forgettable, a vertical list instead of a designed system, dependent on the same card pattern for every step, lacking a dominant visual centerpiece, requiring text to do nearly all explanation, technically mobile-safe but boring, or clean but not persuasive.",
    "- Answer these positive visual quality questions in the markdown critique: What is the dominant visual idea? Is there a clear visual anchor or mostly repeated cards? Does the visual reduce explanation load? Would a service-business owner remember it? Does it feel designed or assembled from icon cards? Is it visually persuasive enough to sell the idea? Is there enough imagery, movement, scale variation, and hierarchy? Does it preserve Taste Library direction while avoiding bad patterns? Would it feel premium and memorable on a phone?",
    "- Hard gates: final pass cannot be true if visual_richness_score < 7, imagery_strength_score < 7, visual_anchor_score < 7, underdesigned_plain_section is true, or repetitive_icon_card_pattern is true without visual_anchor_score >= 8, visual_richness_score >= 8, and imagery_strength_score >= 8.",
    "- If Fresh Client Judge fails trust, final cannot pass.",
    "- If Mobile Trust Judge fails mobile usability, final cannot pass.",
    "- If Stanley Systems Strategy Judge says the page violates core positioning, final cannot pass.",
    "- If any judge did not prove image bytes were seen, final_decision must be blocked_image_not_seen.",
    "- If context is missing for strategy/final, final_decision must be blocked_context_missing.",
    "- Write markdown critique first using headings: ## First impression, ## Trust and clarity, ## Positive visual quality, ## Mobile UX, ## Stanley Systems strategy, ## Highest-leverage fixes, ## Image byte proof, ## Codex-ready patch brief.",
    "- After markdown, output exactly one strict JSON object matching this contract:",
    JSON.stringify(finalContract, null, 2),
    "- In ## Image byte proof, name specific visible pixel details from the mobile screenshot and the desktop screenshot. If you cannot see pixels, final_decision must be blocked_image_not_seen. The strict JSON must still only contain the required final fields.",
  ].join("\n")
}

function baseJudgeJsonContract(judge: JudgeDecision["judge"]): string {
  return [
    "Return only strict JSON, no markdown, with this shape:",
    JSON.stringify({
      judge,
      pass: "boolean",
      score: "number 1-10",
      image_seen: "boolean, true only if you can answer from screenshot pixels",
      image_byte_proof: {
        mobile_specific_visual_detail: "specific detail visible in the mobile screenshot pixels",
        desktop_specific_visual_detail: "specific detail visible in the desktop screenshot pixels, or explain if only one screenshot was attached",
      },
      blockers: ["specific blocker strings; empty only if pass"],
      critique: "direct critique from the allowed inputs only",
    }, null, 2),
    "If you cannot see the actual screenshot pixels, set image_seen=false, pass=false, score=1, and explain in blockers.",
  ].join("\n")
}

function callHermesVisionModel(prompt: string, imagePaths: string[]): VisionResult {
  const tempDir = mkdtempSync(join(tmpdir(), "stanley-four-judge-vision-"))
  const payloadPath = join(tempDir, "payload.json")
  const scriptPath = join(tempDir, "call_hermes_vision.py")
  try {
    writeFileSync(payloadPath, JSON.stringify({ prompt, image_paths: imagePaths }, null, 2))
    writeFileSync(scriptPath, hermesVisionPython())
    const pythonBin = process.env.HERMES_CRITICAL_VISUAL_REVIEW_PYTHON || join(HERMES_AGENT_ROOT, "venv", "bin", "python3")
    const result = spawnSync(pythonBin, [scriptPath, payloadPath], {
      cwd: process.cwd(),
      encoding: "utf8",
      env: { ...process.env, PYTHONPATH: [HERMES_AGENT_ROOT, process.env.PYTHONPATH].filter(Boolean).join(":") },
      shell: false,
      maxBuffer: 40 * 1024 * 1024,
    })
    if ((result.status ?? 1) !== 0) throw new Error(`Hermes vision model call failed: ${result.stderr || result.stdout || result.error?.message || "no output"}`)
    return JSON.parse(result.stdout) as VisionResult
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
    message = response.choices[0].message
    text = getattr(message, "content", None) or ""
    if isinstance(text, list):
        text = "".join(part.get("text", "") if isinstance(part, dict) else str(part) for part in text)
    print(json.dumps({"provider": provider, "model": model, "content": text}, ensure_ascii=False))
asyncio.run(main())
`
}

function parseJson(output: string): unknown {
  const jsonText = extractJsonObject(output)
  if (!jsonText) throw new Error(`No parseable JSON object in reviewer output: ${output.slice(0, 1000)}`)
  return JSON.parse(jsonText)
}

function validateJudgeDecision(value: unknown, expectedJudge: JudgeDecision["judge"]): JudgeDecision {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${expectedJudge} output must be an object`)
  const item = value as Record<string, unknown>
  if (item.judge !== expectedJudge) throw new Error(`${expectedJudge} output has wrong judge field: ${String(item.judge)}`)
  if (typeof item.pass !== "boolean") throw new Error(`${expectedJudge} pass must be boolean`)
  if (typeof item.score !== "number" || item.score < 1 || item.score > 10) throw new Error(`${expectedJudge} score must be 1-10`)
  if (typeof item.image_seen !== "boolean") throw new Error(`${expectedJudge} image_seen must be boolean`)
  if (!item.image_byte_proof || typeof item.image_byte_proof !== "object" || Array.isArray(item.image_byte_proof)) throw new Error(`${expectedJudge} missing image_byte_proof`)
  if (!Array.isArray(item.blockers) || item.blockers.some((blocker) => typeof blocker !== "string")) throw new Error(`${expectedJudge} blockers must be string[]`)
  if (typeof item.critique !== "string" || !item.critique.trim()) throw new Error(`${expectedJudge} critique required`)
  const proofText = JSON.stringify(item.image_byte_proof).toLowerCase()
  const noPixelProof = /cannot see|can't see|unable to see|no image|not visible|only metadata|only path/.test(proofText)
  if (!item.image_seen || noPixelProof) {
    item.pass = false
    item.score = 1
    item.blockers = item.blockers.length ? item.blockers : ["Judge did not prove actual screenshot pixel visibility."]
  }
  return item as JudgeDecision
}

function validateFinalDecision(value: unknown, fresh: JudgeDecision, mobile: JudgeDecision, strategy: JudgeDecision, context: StanleyContext): FinalDecision {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Final decision must be an object")
  const item = value as Record<string, unknown>
  const allowed = ["pass", "fail_patch_needed", "fail_generated_asset_needed", "fail_major_redesign_needed", "blocked_image_not_seen", "blocked_context_missing"]
  for (const field of ["pass", "final_decision", "trust_score", "visual_quality_score", "clarity_score", "mobile_score", "stanley_context_alignment_score", "visual_richness_score", "imagery_strength_score", "visual_anchor_score", "memorability_score", "repetitive_icon_card_pattern", "underdesigned_plain_section", "blockers", "patch_brief"] as const) {
    if (!(field in item)) throw new Error(`Final decision missing ${field}`)
  }
  if (typeof item.pass !== "boolean") throw new Error("Final pass must be boolean")
  if (!allowed.includes(String(item.final_decision))) throw new Error("Invalid final_decision")
  for (const field of ["trust_score", "visual_quality_score", "clarity_score", "mobile_score", "stanley_context_alignment_score", "visual_richness_score", "imagery_strength_score", "visual_anchor_score", "memorability_score"] as const) {
    if (typeof item[field] !== "number" || (item[field] as number) < 1 || (item[field] as number) > 10) throw new Error(`${field} must be 1-10`)
  }
  if (typeof item.repetitive_icon_card_pattern !== "boolean") throw new Error("repetitive_icon_card_pattern must be boolean")
  if (typeof item.underdesigned_plain_section !== "boolean") throw new Error("underdesigned_plain_section must be boolean")
  if (!Array.isArray(item.blockers) || item.blockers.some((blocker) => typeof blocker !== "string")) throw new Error("Final blockers must be string[]")
  if (typeof item.patch_brief !== "string" || !item.patch_brief.trim()) throw new Error("Final patch_brief required")
  const decision = item as FinalDecision
  const anyImageBlocked = !fresh.image_seen || !mobile.image_seen || !strategy.image_seen
  if (anyImageBlocked) {
    decision.pass = false
    decision.final_decision = "blocked_image_not_seen"
  }
  if (!context.loaded_files.length) {
    decision.pass = false
    decision.final_decision = "blocked_context_missing"
  }
  if (!fresh.pass || !mobile.pass || !strategy.pass) {
    decision.pass = false
    if (decision.final_decision === "pass") decision.final_decision = strategy.score <= 3 || fresh.score <= 3 || mobile.score <= 3 ? "fail_major_redesign_needed" : "fail_patch_needed"
  }
  const positiveVisualFailures: string[] = []
  if (decision.visual_richness_score < 7) positiveVisualFailures.push(`visual_richness_score ${decision.visual_richness_score} is below 7`)
  if (decision.imagery_strength_score < 7) positiveVisualFailures.push(`imagery_strength_score ${decision.imagery_strength_score} is below 7`)
  if (decision.visual_anchor_score < 7) positiveVisualFailures.push(`visual_anchor_score ${decision.visual_anchor_score} is below 7`)
  if (decision.repetitive_icon_card_pattern && (decision.visual_anchor_score < 8 || decision.visual_richness_score < 8 || decision.imagery_strength_score < 8)) positiveVisualFailures.push("repetitive_icon_card_pattern is true without a strong enough visual centerpiece, visual richness, and imagery strength")
  if (decision.underdesigned_plain_section) positiveVisualFailures.push("underdesigned_plain_section is true")
  if (positiveVisualFailures.length) {
    decision.pass = false
    if (decision.final_decision === "pass") decision.final_decision = "fail_patch_needed"
    decision.blockers = [...decision.blockers, ...positiveVisualFailures]
    if (/^(no patch needed|none|no changes needed)$/i.test(decision.patch_brief.trim())) {
      decision.patch_brief = `Patch required by positive visual quality gate: ${positiveVisualFailures.join("; ")}. Add a stronger visual anchor, more imagery or SVG communication, less repetitive icon-card rhythm, and a more persuasive section-level visual idea while preserving mobile safety.`
    }
  }
  if (decision.pass && decision.blockers.length) {
    decision.pass = false
    decision.final_decision = "fail_patch_needed"
  }
  if (decision.pass && !/^(no patch needed|none|no changes needed)$/i.test(decision.patch_brief.trim())) {
    decision.pass = false
    decision.final_decision = "fail_patch_needed"
  }
  return decision
}

function extractMarkdown(content: string): string {
  const firstJson = content.indexOf("{")
  const markdown = firstJson >= 0 ? content.slice(0, firstJson).trim() : content.trim()
  if (!markdown.includes("## First impression") || !markdown.includes("## Positive visual quality") || !markdown.includes("## Codex-ready patch brief") || !markdown.includes("## Image byte proof")) throw new Error("Final gatekeeper markdown critique missing required headings")
  const proof = markdown.slice(markdown.indexOf("## Image byte proof"), markdown.includes("## Codex-ready patch brief") ? markdown.indexOf("## Codex-ready patch brief") : undefined).toLowerCase()
  if (proof.length < 120 || /cannot see|can't see|unable to see|no image|only metadata|only path/.test(proof) || !/mobile/.test(proof) || !/desktop/.test(proof)) {
    throw new Error("Final gatekeeper markdown does not prove it saw both mobile and desktop screenshot pixels.")
  }
  return markdown
}

function extractFinalImageProof(content: string): Record<string, string> {
  const markdown = extractMarkdown(content)
  const start = markdown.indexOf("## Image byte proof")
  const end = markdown.includes("## Codex-ready patch brief") ? markdown.indexOf("## Codex-ready patch brief") : markdown.length
  const proof = markdown.slice(start, end).trim()
  return { final_gatekeeper_pixel_reference: proof }
}

function writeJudgeArtifact(artifactDir: string, basename: string, result: VisionResult, screenshots: string[], contract: string, parsed: JudgeDecision | FinalDecision): void {
  const artifact: JudgeArtifact = { role: basename, provider: result.provider, model: result.model, attached_screenshot_files: screenshots, prompt_contract: contract, raw_output: result.content, parsed }
  writeFileSync(join(artifactDir, `${basename}.raw.md`), result.content)
  writeFileSync(join(artifactDir, `${basename}.json`), JSON.stringify(artifact, null, 2))
}

function buildCodexPatchTask(packet: ReviewPacket, route: string, context: StanleyContext, fresh: JudgeDecision, mobile: JudgeDecision, strategy: JudgeDecision, markdown: string, decision: FinalDecision, screenshots: string[], final: VisionResult): string {
  return `# Codex Patch Task: Four-Judge Visual Review Failure\n\nStatus: patch_spec_ready\nRepo: \`/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page\`\nRoute: \`${route}\`\nSection id: \`${packet.section_id}\`\nRun id: \`${packet.run_id}\`\nReviewer: ${final.provider}/${final.model}\n\n## Boundaries\n- Do not deploy.\n- Do not restart PM2.\n- Do not run production live smoke.\n- Do not touch runtime config, secrets, credentials, n8n, QBO, HCP, Telegram config, OpenClaw config, PM2, or live workflow files.\n- Codex cannot approve its own work. Hermes must recapture screenshots and rerun the locked four-judge reviewer.\n\n## Screenshots attached to judges\n${screenshots.map((file) => `- ${file}`).join("\n")}\n\n## Context files loaded\n${context.loaded_files.map((file) => `- ${file}`).join("\n")}\n\n## Fresh Client Judge\n\`\`\`json\n${JSON.stringify(fresh, null, 2)}\n\`\`\`\n\n## Mobile Trust Judge\n\`\`\`json\n${JSON.stringify(mobile, null, 2)}\n\`\`\`\n\n## Stanley Systems Strategy Judge\n\`\`\`json\n${JSON.stringify(strategy, null, 2)}\n\`\`\`\n\n## Final markdown critique\n${markdown}\n\n## Final JSON decision\n\`\`\`json\n${JSON.stringify(decision, null, 2)}\n\`\`\`\n\n## Patch brief\n${decision.patch_brief}\n\n## Required verification after patch\n\`\`\`bash\nnpm run build\nnpm run design-loop:critical-visual-review-smoke\nnpm run design-loop:anti-ai-slop-smoke\ngit diff --check\n\`\`\`\n`
}

function extractJsonObject(output: string): string | null {
  for (let start = 0; start < output.length; start += 1) {
    if (output[start] !== "{") continue
    let depth = 0
    let inString = false
    let escaped = false
    for (let end = start; end < output.length; end += 1) {
      const char = output[end]
      if (inString) {
        if (escaped) escaped = false
        else if (char === "\\") escaped = true
        else if (char === "\"") inString = false
        continue
      }
      if (char === "\"") inString = true
      else if (char === "{") depth += 1
      else if (char === "}") {
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
