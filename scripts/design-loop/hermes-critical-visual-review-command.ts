import { spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import { existsSync, readFileSync, statSync } from "node:fs"
import { pathToFileURL } from "node:url"
import {
  CRITICAL_VISUAL_REVIEW_CONFIG,
  validateCriticalSectionReview,
  type CriticalReviewPacket,
  type CriticalSectionReview,
} from "./critical-visual-review-gate.ts"

const REQUIRED_PACKET_VERSION = "critical-visual-review-v1"

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
    const prompt = buildHermesPrompt(packet)
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
      throw new Error(`Hermes critical visual review failed: ${result.stderr || result.stdout || result.error?.message || "no output"}`)
    }
    const jsonText = extractJsonObject(result.stdout || "")
    if (!jsonText) throw new Error("Hermes returned no parseable JSON object.")
    const parsed = JSON.parse(jsonText)
    const review = validateCriticalSectionReview(parsed, packet)
    return { ok: true, review }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) }
  }
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
  validateScreenshotEvidence(packet, "desktop_after")
  validateScreenshotEvidence(packet, "mobile_after")
  if (packet.screenshots.desktop_before) validateScreenshotEvidence(packet, "desktop_before")
  if (packet.screenshots.mobile_before) validateScreenshotEvidence(packet, "mobile_before")
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

export function buildHermesPrompt(packet: CriticalReviewPacket): string {
  const reviewerContract = {
    required_fields: [
      "section_id",
      "reviewer_version",
      "reviewed_screenshot_paths",
      "reviewed_screenshot_hashes",
      "section_match",
      "desktop_pass",
      "mobile_pass",
      "visual_quality_score",
      "ai_slop_score",
      "clarity_score",
      "mobile_score",
      "asset_strategy",
      "blockers",
      "warnings",
      "exact_fix_recommendation",
      "final_decision",
    ],
    reviewer_version: `non-empty string, use ${CRITICAL_VISUAL_REVIEW_CONFIG.reviewer_version} or Hermes command version`,
    reviewed_screenshot_paths: "must exactly echo packet.screenshots paths for every supplied screenshot",
    reviewed_screenshot_hashes: "must exactly echo packet.metadata.screenshot_hashes for every supplied screenshot",
    section_match: ["yes", "no", "unclear"],
    asset_strategy: ["code_only", "code_plus_generated_asset", "generated_asset_primary", "blocked_missing_required_asset"],
    final_decision: [
      "pass",
      "fail_codex_patch_needed",
      "fail_generated_asset_needed",
      "fail_revert_recommended",
      "blocked_missing_screenshot",
      "blocked_missing_required_asset",
    ],
    score_range: "numbers from 1 to 10 inclusive",
  }

  return [
    "You are Hermes running a harsh Critical Visual Review for Stanley Systems.",
    "",
    "Verification-only boundaries:",
    "- Do not edit files.",
    "- Do not deploy.",
    "- Do not restart PM2.",
    "- Do not run live smoke.",
    "- Do not touch n8n, QBO, HCP, Telegram config, OpenClaw config, secrets, credentials, PM2, or live workflow files.",
    "- Judge only screenshot/context evidence in this prompt and the referenced local screenshots.",
    "- Ignore Codex reasoning, build history, self-evaluation, and implementation debate. None is supplied.",
    "- Return only strict JSON with exactly the required schema. No markdown, no prose, no code fences.",
    "",
    "Screenshot evidence:",
    `- desktop_after: ${packet.screenshots.desktop_after}`,
    `- desktop_after_hash: ${packet.metadata.screenshot_hashes.desktop_after}`,
    `- mobile_after: ${packet.screenshots.mobile_after}`,
    `- mobile_after_hash: ${packet.metadata.screenshot_hashes.mobile_after}`,
    packet.screenshots.desktop_before ? `- desktop_before: ${packet.screenshots.desktop_before}` : "- desktop_before: not supplied",
    packet.screenshots.desktop_before ? `- desktop_before_hash: ${packet.metadata.screenshot_hashes.desktop_before}` : "- desktop_before_hash: not supplied",
    packet.screenshots.mobile_before ? `- mobile_before: ${packet.screenshots.mobile_before}` : "- mobile_before: not supplied",
    packet.screenshots.mobile_before ? `- mobile_before_hash: ${packet.metadata.screenshot_hashes.mobile_before}` : "- mobile_before_hash: not supplied",
    `- run_id: ${packet.run_id}`,
    `- build_id: ${packet.metadata.build_id}`,
    `- captured_at: ${packet.metadata.captured_at}`,
    "",
    "You must verify whether these screenshots show the intended section. If the section is mismatched or unclear, return section_match no or unclear and do not pass.",
    "You must include reviewed_screenshot_paths and reviewed_screenshot_hashes copied from the packet, so the gate can prove exactly which files were reviewed.",
    "",
    "Strict output contract:",
    JSON.stringify(reviewerContract, null, 2),
    "",
    "Review packet context:",
    JSON.stringify(packet, null, 2),
  ].join("\n")
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
