import { spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import { existsSync, readFileSync, statSync } from "node:fs"
import { basename, join, relative, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import {
  git,
  loadManifest,
  main,
  SITE_REPO,
  SOFTWARE_FACTORY_ROOT,
  slugify,
  toBool,
  updateStatus,
  writeJson,
  writeText,
  type Manifest,
} from "./_lib.ts"

export type CriticalAssetStrategy =
  | "code_only"
  | "code_plus_generated_asset"
  | "generated_asset_primary"
  | "blocked_missing_required_asset"

export type CriticalFinalDecision =
  | "pass"
  | "fail_codex_patch_needed"
  | "fail_generated_asset_needed"
  | "fail_revert_recommended"
  | "blocked_missing_screenshot"
  | "blocked_missing_required_asset"

export type CriticalSectionMatch = "yes" | "no" | "unclear"

export type CriticalScreenshotKey = "desktop_after" | "mobile_after" | "desktop_before" | "mobile_before"

export type CriticalScreenshotMap = Partial<Record<CriticalScreenshotKey, string>> & {
  desktop_after: string
  mobile_after: string
}

export type CriticalSectionReview = {
  section_id: string
  reviewer_version: string
  reviewed_screenshot_paths: CriticalScreenshotMap
  reviewed_screenshot_hashes: CriticalScreenshotMap
  section_match: CriticalSectionMatch
  desktop_pass: boolean
  mobile_pass: boolean
  visual_quality_score: number
  ai_slop_score: number
  clarity_score: number
  mobile_score: number
  asset_strategy: CriticalAssetStrategy
  blockers: string[]
  warnings: string[]
  exact_fix_recommendation: string
  final_decision: CriticalFinalDecision
}

export type CriticalReviewPacket = {
  packet_version: "critical-visual-review-v1"
  run_id: string
  section_id: string
  section_purpose: string
  screenshots: CriticalScreenshotMap
  metadata: {
    git_sha: string
    build_id: string
    run_id: string
    captured_at: string
    screenshot_hashes: CriticalScreenshotMap
    screenshot_modified_times: CriticalScreenshotMap
  }
  review_prompt: {
    role: string
    output_contract: string
    mandatory_questions: string[]
    visual_rules: string[]
    anti_ai_slop_rules: string[]
    approved_offer_copy_guardrails: string[]
  }
}

export type CriticalScreenshotQaFinding = {
  severity: "blocker"
  category: "missing_evidence" | "mobile_visual"
  message: string
  evidence: string
  final_decision: CriticalFinalDecision
}

export type CriticalScreenshotQaPrecheck = {
  section_id: string
  status: "pass" | "fail"
  checked_at: string
  route: string
  mobile_screenshot: string
  mobile_metadata_path: string
  mobile_viewport: { width: number; height: number } | null
  findings: CriticalScreenshotQaFinding[]
}

export type PublicCopyGuardrailFinding = {
  severity: "blocker" | "warning"
  term_or_issue: string
  evidence: string
  fix: string
}

export type PublicCopyGuardrailScan = {
  section_id: string
  status: "pass" | "fail"
  findings: PublicCopyGuardrailFinding[]
  scanned_fields: string[]
}

export type CriticalReviewAggregate = {
  run_id: string
  status: "pass" | "fail"
  aggregate_decision: "pass" | "blocked"
  next_status:
    | "critical_visual_review_passed"
    | "needs_patch_2"
    | "blocked_missing_required_asset"
    | "blocked"
  final_gate_decision: "verified_pending_deploy" | "blocked"
  report_paths: {
    run_json: string
    run_markdown: string
    artifact_json: string
    artifact_markdown: string
    packet_dir: string
    response_dir: string
    copy_guardrail_json: string
    screenshot_qa_json: string
  }
  command_mode: "safe_allowlisted" | "legacy_shell" | "fixture_callback"
  thresholds: typeof DEFAULT_THRESHOLDS
  max_visual_patch_attempts: number
  visual_patch_attempt: number
  copy_guardrail_scans: PublicCopyGuardrailScan[]
  screenshot_qa_prechecks: CriticalScreenshotQaPrecheck[]
  sections: CriticalSectionReview[]
  validation_failures: Array<{ section_id: string; error: string }>
  write_errors: Array<{ path: string; error: string }>
  checked_at: string
}

type SectionRegistryEntry = {
  route?: string
  section_id?: string
  purpose?: string
  offer?: string
  text?: string
  html?: string
  dom_preview?: string
  visual_summary?: string
  text_path?: string
  screenshots?: Record<string, string>
  viewport_metadata?: Record<string, ScreenshotQaMetadata>
  mobile_metadata?: ScreenshotQaMetadata
  asset_strategy_hint?: CriticalAssetStrategy
}

type ScreenshotQaMetadata = {
  captured_at?: string
  route?: string
  phase?: string
  viewport?: { name?: string; width?: number; height?: number }
  page?: {
    body_scroll_width?: number
    body_client_width?: number
    document_scroll_width?: number
    document_client_width?: number
    body_font_family?: string
    body_color?: string
    body_background_color?: string
    body_class_name?: string
    html_class_name?: string
    stylesheet_count?: number
  }
  section?: {
    class_name?: string
    element_count?: number
    classed_element_count?: number
    anchor_count?: number
    h1_texts?: string[]
    h2_texts?: string[]
  }
  links?: Array<{
    text?: string
    href?: string
    color?: string
    text_decoration_line?: string
    display?: string
    class_name?: string
    role?: string
    width?: number
    height?: number
  }>
  copy?: {
    text?: string
    h1_texts?: string[]
    major_headlines?: string[]
  }
}

type ReviewOptions = {
  dryRun?: boolean
  fixture?: boolean
  updateManifest?: boolean
  reviewer?: (packet: CriticalReviewPacket) => string | CriticalSectionReview
  beforeInvoke?: (packet: CriticalReviewPacket, packetPath: string) => void
}

export const DEFAULT_THRESHOLDS = {
  visual_quality_score: 7,
  clarity_score: 7,
  mobile_score: 7,
  ai_slop_score_max: 3,
  max_visual_patch_attempts: 2,
} as const

export const CRITICAL_VISUAL_REVIEW_CONFIG = {
  reviewer_version: "critical-visual-review-gate-v1.1",
  command: "node",
  argsBeforePacket: ["--experimental-strip-types", "scripts/design-loop/hermes-critical-visual-review-command.ts"],
  cwd: SITE_REPO,
  legacyEnv: "HERMES_CRITICAL_VISUAL_REVIEW_COMMAND",
  legacyAllowEnv: "HERMES_CRITICAL_VISUAL_REVIEW_ALLOW_LEGACY_SHELL",
} as const

const REQUIRED_FIELDS = [
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
] as const

const ALLOWED_ASSET_STRATEGIES: CriticalAssetStrategy[] = [
  "code_only",
  "code_plus_generated_asset",
  "generated_asset_primary",
  "blocked_missing_required_asset",
]

const ALLOWED_FINAL_DECISIONS: CriticalFinalDecision[] = [
  "pass",
  "fail_codex_patch_needed",
  "fail_generated_asset_needed",
  "fail_revert_recommended",
  "blocked_missing_screenshot",
  "blocked_missing_required_asset",
]

const SEVERE_PUBLIC_COPY_PATTERNS: Array<{ label: string; pattern: RegExp; fix: string }> = [
  { label: "Hermes", pattern: /\bHermes\b/i, fix: "Remove internal reviewer/tool names from public copy." },
  { label: "Codex", pattern: /\bCodex\b/i, fix: "Remove internal implementation tool names from public copy." },
  { label: "OpenClaw", pattern: /\bOpenClaw\b/i, fix: "Remove internal platform names from public copy." },
  { label: "n8n", pattern: /\bn8n\b/i, fix: "Keep private workflow tooling out of public copy." },
  { label: "QBO API", pattern: /\bQBO API\b/i, fix: "Do not expose private accounting API internals publicly." },
  { label: "HCP API", pattern: /\bHCP API\b/i, fix: "Do not expose private field-service API internals publicly." },
  { label: "Twilio", pattern: /\bTwilio\b/i, fix: "Do not make third-party plumbing public-facing unless explicitly approved." },
  { label: "AI as public hero", pattern: /\bAI(?:-|\s)?(?:powered|first|driven|automation)\b/i, fix: "Lead with business outcomes, not AI." },
  { label: "backend automation", pattern: /\bbackend automation\b/i, fix: "Replace backend/process phrasing with owner outcome language." },
  { label: "public Stanley shorthand", pattern: /\bStanley\b(?!\s+Systems\b)(?!-)/i, fix: "Use Stanley Systems in public-facing copy." },
]

const WEAK_PUBLIC_COPY_PATTERNS = [
  "operational efficiency",
  "streamline",
  "optimize",
  "synergy",
  "transform",
  "empower",
  "cutting-edge",
  "innovative",
] as const

const OUTCOME_TERMS = [
  "money",
  "time",
  "owner relief",
  "collected revenue",
  "repeat customers",
  "reviews",
  "referrals",
  "captured calls",
  "missed work",
] as const

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  await runCriticalVisualReviewCli()
}

export async function runCriticalVisualReviewCli(): Promise<void> {
  await main(async (args) => {
    const manifest = loadManifest(String(args.run_id || ""))
    const report = runCriticalVisualReviewGate(manifest, {
      dryRun: toBool(args.dry_run, false),
      updateManifest: true,
    })
    if (report.status !== "pass") process.exitCode = 1
  })
}

export function runCriticalVisualReviewGate(manifest: Manifest, options: ReviewOptions = {}): CriticalReviewAggregate {
  const packetDir = join(manifest.run_dir, "critical-visual-review", "packets")
  const responseDir = join(manifest.run_dir, "critical-visual-review", "responses")
  const report = makeEmptyReport(manifest, packetDir, responseDir, options.reviewer ? "fixture_callback" : commandMode())
  const sections = loadSectionRegistry(manifest)

  if (!sections.length) {
    const section = missingScreenshotReview("homepage", "No section registry entries were available for critical visual review.")
    report.sections.push(section)
    report.validation_failures.push({ section_id: section.section_id, error: "missing section registry entries" })
  }

  for (const entry of sections) {
    const packet = buildPacket(manifest, entry)
    const packetPath = join(packetDir, `${slugify(packet.section_id || "section")}.json`)
    writeJson(packetPath, packet)

    const screenshotFailure = validatePacketScreenshots(packet, manifest)
    if (screenshotFailure) {
      report.sections.push(missingScreenshotReview(packet.section_id, screenshotFailure))
      continue
    }

    const screenshotQa = runMobileScreenshotQaPrecheck(entry, packet, manifest)
    report.screenshot_qa_prechecks.push(screenshotQa)
    if (screenshotQa.status === "fail") {
      report.sections.push(screenshotQaFailureReview(packet.section_id, packet, screenshotQa))
      continue
    }

    const scan = scanPublicCopyGuardrails(entry)
    report.copy_guardrail_scans.push(scan)
    if (scan.status === "fail") {
      report.sections.push(publicCopyFailureReview(String(entry.section_id || "section"), scan))
      continue
    }

    options.beforeInvoke?.(packet, packetPath)
    const revalidationFailure = validatePacketScreenshots(packet, manifest)
    if (revalidationFailure) {
      report.validation_failures.push({ section_id: packet.section_id, error: revalidationFailure })
      report.sections.push(validationFailureReview(packet.section_id, revalidationFailure))
      continue
    }

    const responsePath = join(responseDir, `${slugify(packet.section_id || "section")}.json`)
    const raw = invokeReviewer(packet, packetPath, options)
    writeText(responsePath, typeof raw === "string" ? raw : JSON.stringify(raw, null, 2))
    const parsed = parseAndValidateReview(raw, packet)
    if (parsed.ok) {
      report.sections.push(applyCalibrationAndEscalation(parsed.review, packet, report.visual_patch_attempt, report.max_visual_patch_attempts))
    } else {
      report.validation_failures.push({ section_id: packet.section_id, error: parsed.error })
      report.sections.push(validationFailureReview(packet.section_id, parsed.error))
    }
  }

  finalizeReport(report)
  writeCriticalReviewReports(manifest, report)
  if (options.updateManifest && !options.dryRun && !options.fixture) updateStatus(manifest, report.next_status)
  return report
}

export function validateCriticalSectionReview(value: unknown, expectedSectionIdOrPacket?: string | CriticalReviewPacket): CriticalSectionReview {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("review output must be a JSON object")
  }
  const packet = typeof expectedSectionIdOrPacket === "object" ? expectedSectionIdOrPacket : undefined
  const expectedSectionId = typeof expectedSectionIdOrPacket === "string" ? expectedSectionIdOrPacket : packet?.section_id
  const review = value as Record<string, unknown>
  const keys = Object.keys(review).sort()
  const required = [...REQUIRED_FIELDS].sort()
  const missing = required.filter((field) => !keys.includes(field))
  const extra = keys.filter((field) => !required.includes(field as (typeof REQUIRED_FIELDS)[number]))
  if (missing.length) throw new Error(`missing required field(s): ${missing.join(", ")}`)
  if (extra.length) throw new Error(`unexpected field(s): ${extra.join(", ")}`)
  if (typeof review.section_id !== "string" || !review.section_id.trim()) throw new Error("section_id must be a non-empty string")
  if (expectedSectionId && review.section_id !== expectedSectionId) {
    throw new Error(`section_id mismatch: expected ${expectedSectionId}, received ${review.section_id}`)
  }
  if (typeof review.reviewer_version !== "string" || !review.reviewer_version.trim()) {
    throw new Error("reviewer_version must be a non-empty string")
  }
  validateScreenshotProofMap(review.reviewed_screenshot_paths, "reviewed_screenshot_paths", packet?.screenshots)
  validateScreenshotProofMap(review.reviewed_screenshot_hashes, "reviewed_screenshot_hashes", packet?.metadata.screenshot_hashes)
  if (!["yes", "no", "unclear"].includes(String(review.section_match))) {
    throw new Error("section_match must be yes, no, or unclear")
  }
  for (const field of ["desktop_pass", "mobile_pass"] as const) {
    if (typeof review[field] !== "boolean") throw new Error(`${field} must be boolean`)
  }
  for (const field of ["visual_quality_score", "ai_slop_score", "clarity_score", "mobile_score"] as const) {
    if (typeof review[field] !== "number" || !Number.isFinite(review[field])) throw new Error(`${field} must be a finite number`)
    if (review[field] < 1 || review[field] > 10) throw new Error(`${field} must be between 1 and 10`)
  }
  if (!ALLOWED_ASSET_STRATEGIES.includes(review.asset_strategy as CriticalAssetStrategy)) {
    throw new Error(`asset_strategy must be one of ${ALLOWED_ASSET_STRATEGIES.join(", ")}`)
  }
  if (!ALLOWED_FINAL_DECISIONS.includes(review.final_decision as CriticalFinalDecision)) {
    throw new Error(`final_decision must be one of ${ALLOWED_FINAL_DECISIONS.join(", ")}`)
  }
  if (!Array.isArray(review.blockers) || review.blockers.some((item) => typeof item !== "string")) {
    throw new Error("blockers must be an array of strings")
  }
  if (!Array.isArray(review.warnings) || review.warnings.some((item) => typeof item !== "string")) {
    throw new Error("warnings must be an array of strings")
  }
  if (typeof review.exact_fix_recommendation !== "string") {
    throw new Error("exact_fix_recommendation must be a string")
  }
  return review as CriticalSectionReview
}

export function scanPublicCopyGuardrails(entry: SectionRegistryEntry): PublicCopyGuardrailScan {
  const fields: Array<[string, string]> = [
    ["section_id", String(entry.section_id || "")],
    ["purpose", String(entry.purpose || "")],
    ["offer", String(entry.offer || "")],
    ["text", String(entry.text || "")],
    ["dom_preview", String(entry.dom_preview || "")],
    ["visual_summary", String(entry.visual_summary || "")],
  ]
  if (entry.text_path && existsSync(entry.text_path)) {
    try {
      const payload = JSON.parse(readFileSync(entry.text_path, "utf8"))
      fields.push(["text_path.text", String(payload.text || "")])
      fields.push(["text_path.visual_summary", String(payload.visual_summary || "")])
    } catch {
      fields.push(["text_path", readFileSync(entry.text_path, "utf8").slice(0, 5000)])
    }
  }
  const text = fields.map(([name, value]) => `${name}: ${value}`).join("\n")
  const findings: PublicCopyGuardrailFinding[] = []
  for (const item of SEVERE_PUBLIC_COPY_PATTERNS) {
    const match = text.match(item.pattern)
    if (match) {
      findings.push({
        severity: "blocker",
        term_or_issue: item.label,
        evidence: excerpt(text, match.index ?? 0),
        fix: item.fix,
      })
    }
  }
  for (const term of WEAK_PUBLIC_COPY_PATTERNS) {
    const index = text.toLowerCase().indexOf(term.toLowerCase())
    if (index >= 0) {
      findings.push({
        severity: "warning",
        term_or_issue: term,
        evidence: excerpt(text, index),
        fix: "Replace generic improvement language with concrete money, time, revenue, customer, calls, reviews, referrals, or missed-work outcomes.",
      })
    }
  }
  if (!OUTCOME_TERMS.some((term) => text.toLowerCase().includes(term))) {
    findings.push({
      severity: "warning",
      term_or_issue: "missing outcome lead",
      evidence: "No required outcome terms were found in the section registry text.",
      fix: "Lead with money, time, owner relief, collected revenue, repeat customers, reviews, referrals, captured calls, or missed work.",
    })
  }
  return {
    section_id: String(entry.section_id || "section"),
    status: findings.some((finding) => finding.severity === "blocker") ? "fail" : "pass",
    findings,
    scanned_fields: fields.map(([name]) => name),
  }
}

function loadSectionRegistry(manifest: Manifest): SectionRegistryEntry[] {
  const registryPath = join(manifest.run_dir, "section-registry.json")
  if (!existsSync(registryPath)) return []
  const registry = JSON.parse(readFileSync(registryPath, "utf8"))
  return Array.isArray(registry.sections) ? registry.sections : []
}

function buildPacket(manifest: Manifest, entry: SectionRegistryEntry): CriticalReviewPacket {
  const sectionId = String(entry.section_id || "section")
  const id = slugify(sectionId)
  const desktopAfter = entry.screenshots?.desktop || entry.screenshots?.desktop_after || join(manifest.run_dir, "screenshots", "after", "desktop", `${id}.png`)
  const mobileAfter = entry.screenshots?.mobile || entry.screenshots?.mobile_after || join(manifest.run_dir, "screenshots", "after", "mobile", `${id}.png`)
  const desktopBefore = entry.screenshots?.desktop_before || join(manifest.run_dir, "screenshots", "before", "desktop", `${id}.png`)
  const mobileBefore = entry.screenshots?.mobile_before || join(manifest.run_dir, "screenshots", "before", "mobile", `${id}.png`)
  const screenshots = {
    desktop_after: desktopAfter,
    mobile_after: mobileAfter,
    ...(existsSync(desktopBefore) ? { desktop_before: desktopBefore } : {}),
    ...(existsSync(mobileBefore) ? { mobile_before: mobileBefore } : {}),
  }
  const capturedAt = new Date().toISOString()
  return {
    packet_version: "critical-visual-review-v1",
    run_id: manifest.run_id,
    section_id: sectionId,
    section_purpose: [entry.purpose, entry.offer].filter(Boolean).join(" | "),
    screenshots,
    metadata: {
      git_sha: gitSha(),
      build_id: String((manifest as Record<string, unknown>).build_id || manifest.run_id),
      run_id: manifest.run_id,
      captured_at: capturedAt,
      screenshot_hashes: hashExistingScreenshots(screenshots),
      screenshot_modified_times: screenshotMtimes(screenshots),
    },
    review_prompt: {
      role: "You are a harsh, screenshot-first visual reviewer for Stanley Systems. Judge only the packet evidence.",
      output_contract:
        "Return only strict JSON with exactly the required section-level fields, including reviewer_version, reviewed_screenshot_paths, reviewed_screenshot_hashes, and section_match. No markdown, no prose outside JSON.",
      mandatory_questions: [
        "Mobile-first trust test: would a skeptical HVAC, plumbing, electrical, marine, or landscaping owner trust Stanley Systems after seeing this on their phone? If no, final_decision must not be pass.",
        "Do the screenshots show the intended section described by section_id and section_purpose? Return section_match as yes, no, or unclear.",
        "Does the mobile evidence include the full route/continuity a real user sees, not only a polished fragment?",
        "Does this look like a real premium service-business website section, or AI-generated SaaS filler?",
        "Would a service business owner understand the point in 10 seconds?",
        "Are there unnecessary pills, chips, badges, support boxes, fake dashboards, simple icon clutter, or generic card walls?",
        "Is the main visual doing real communication work?",
        "Should this section be code_only, code_plus_generated_asset, generated_asset_primary, or blocked_missing_required_asset?",
        "Does the mobile layout look intentionally designed?",
        "Are CTAs clear and visible?",
        "Does the section lead with money, time, owner relief, collected revenue, repeat customers, reviews, referrals, captured calls, or missed work?",
        "Is there any public-facing internal/process-heavy language like bottlenecks?",
        "Should this pass, fail, need Codex patch, need generated asset, or be reverted?",
      ],
      visual_rules: [
        "Stanley Systems is practical, premium, trustworthy, and service-business focused.",
        "Homepage sections must lead with money, time, owner relief, collected revenue, repeat customers, reviews, referrals, captured calls, or missed work.",
        "Hard-fail browser-default or nearly unstyled HTML appearance.",
        "Hard-fail purple underlined browser-default links, especially CTA-like links.",
        "Hard-fail default serif typography or missing Stanley Systems brand typography.",
        "Hard-fail duplicated major headlines, duplicated hero headings, visible public copy typos, and spacing mistakes such as number,not.",
        "Hard-fail horizontal overflow, broken mobile spacing, accidental-looking mobile layout, clipped CTAs, or CTA links that do not look actionable.",
        "Hard-fail raw stacked icons unless they are clearly arranged as an intentional designed layout or card system.",
        "Hard-fail isolated abstract visuals, generic AI/SaaS filler visuals, fake dashboards, cluttered card/pill walls, and unclear hierarchy.",
        "Hard-fail any revenue calculator or conversion section that looks like a content dump instead of a designed conversion surface.",
        "Hard-fail any mobile page or section that looks unfinished to a skeptical service-business owner.",
        "Avoid AI-looking metaphor imagery, robots, generic humans, noisy textures, and dark/orange/amber/tan/yellow/gold/sepia palettes.",
        "Prefer clean designed diagram/product-style support artwork over AI-looking metaphor images.",
        "Generated imagery must not contain baked-in critical headlines, CTAs, offer labels, metric cards, or business logic unless explicitly approved.",
        "Important text and CTAs must remain DOM text.",
        "A section should not feel like a generic AI automation SaaS template.",
      ],
      anti_ai_slop_rules: [
        "Reject or warn on unnecessary pills/chips/badges.",
        "Reject or warn on floating support boxes that repeat copy.",
        "Reject or warn on fake dashboards and fake SaaS UI card walls.",
        "Reject or warn on too many small icon cards.",
        "Reject or warn on repeated rounded-rectangle process graphics.",
        "Reject or warn on orbiting pills/checklists when a real flywheel is needed.",
        "Reject or warn on simple icon clutter where a stronger visual asset is required.",
        "Reject or warn on weak hierarchy where the main visual is decorative instead of communicative.",
        "Reject or warn on awkward mobile stacking, cramped cards, cropped visuals, hidden CTAs, or mobile overlays covering content.",
      ],
      approved_offer_copy_guardrails: [
        "Use Stanley Systems, not public-facing Stanley shorthand.",
        "Public first step is the paid Workflow Audit.",
        "Workflow Audit: Find the money leaks hiding inside your office workflow.",
        "Cashflow Control System: Turn finished work into paid invoices without the chase.",
        "Customer Revenue System: Get more money from the customers you already earned.",
        "Avoid public/internal process-heavy language such as bottlenecks.",
        "Do not make AI, Hermes, Codex, OpenClaw, automation tooling, QBO API, HCP API, n8n, or internals the public star.",
      ],
    },
  }
}

function invokeReviewer(packet: CriticalReviewPacket, packetPath: string, options: ReviewOptions): string | CriticalSectionReview {
  if (options.reviewer) return options.reviewer(packet)
  if (toBool(process.env[CRITICAL_VISUAL_REVIEW_CONFIG.legacyAllowEnv], false) && process.env[CRITICAL_VISUAL_REVIEW_CONFIG.legacyEnv]) {
    const result = spawnSync(process.env[CRITICAL_VISUAL_REVIEW_CONFIG.legacyEnv] as string, [packetPath], {
      cwd: SITE_REPO,
      encoding: "utf8",
      env: process.env,
      shell: true,
    })
    if ((result.status ?? 1) !== 0) {
      return JSON.stringify(validationFailureReview(packet.section_id, `legacy shell review command failed: ${result.stderr || result.stdout || "no output"}`))
    }
    return result.stdout
  }

  const result = spawnSync(CRITICAL_VISUAL_REVIEW_CONFIG.command, [...CRITICAL_VISUAL_REVIEW_CONFIG.argsBeforePacket, packetPath], {
    cwd: CRITICAL_VISUAL_REVIEW_CONFIG.cwd,
    encoding: "utf8",
    env: process.env,
    shell: false,
    maxBuffer: 20 * 1024 * 1024,
  })
  if ((result.status ?? 1) !== 0) {
    return JSON.stringify(validationFailureReview(packet.section_id, `safe allowlisted review command failed: ${result.stderr || result.stdout || result.error?.message || "no output"}`))
  }
  return result.stdout
}

function parseAndValidateReview(raw: string | CriticalSectionReview, packet: CriticalReviewPacket): { ok: true; review: CriticalSectionReview } | { ok: false; error: string } {
  try {
    const value = typeof raw === "string" ? JSON.parse(raw) : raw
    return { ok: true, review: validateCriticalSectionReview(value, packet) }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) }
  }
}

function validatePacketScreenshots(packet: CriticalReviewPacket, manifest: Manifest): string {
  for (const key of ["desktop_after", "mobile_after", "desktop_before", "mobile_before"] as const) {
    const path = packet.screenshots[key]
    if (!path) continue
    if (!existsSync(path)) return `Missing ${key.replace("_", " ")} screenshot: ${path}`
    let stat
    try {
      stat = statSync(path)
      if (!stat.isFile()) return `Screenshot is not a file: ${path}`
    } catch (error) {
      return `Screenshot is unreadable: ${path}: ${error instanceof Error ? error.message : String(error)}`
    }
    const expectedHash = packet.metadata.screenshot_hashes[key]
    if (!expectedHash) return `Missing ${key} hash metadata for ${path}`
    const actualHash = sha256File(path)
    if (actualHash !== expectedHash) return `${key} hash mismatch: expected ${expectedHash}, received ${actualHash}`
    const capturedAt = Date.parse(packet.metadata.captured_at)
    if (!Number.isFinite(capturedAt)) return "Packet captured_at metadata is invalid."
    if (stat.mtimeMs > capturedAt + 2000) return `${key} screenshot was modified after packet capture: ${path}`
    const runCreated = Date.parse(manifest.created_at)
    if (Number.isFinite(runCreated) && stat.mtimeMs < runCreated - 60_000) {
      return `${key} screenshot is stale for run ${manifest.run_id}: ${path}`
    }
  }
  return ""
}

function applyCalibrationAndEscalation(
  review: CriticalSectionReview,
  packet: CriticalReviewPacket,
  attempt: number,
  maxAttempts: number,
): CriticalSectionReview {
  const blockers = [...review.blockers]
  const warnings = [...review.warnings]
  let finalDecision = review.final_decision
  let assetStrategy = review.asset_strategy

  if (review.section_match !== "yes") {
    blockers.push(`section_match was ${review.section_match}; reviewer could not prove screenshots show ${packet.section_id}.`)
    return {
      ...review,
      desktop_pass: false,
      mobile_pass: false,
      blockers,
      warnings,
      exact_fix_recommendation: "Recapture the intended section screenshots and rerun Critical Visual Review.",
      final_decision: "fail_revert_recommended",
    }
  }

  const thresholdFailures = thresholdFailureReasons(review)
  if (thresholdFailures.length) {
    blockers.push(...thresholdFailures)
    if (review.final_decision === "pass") {
      finalDecision = "fail_codex_patch_needed"
      warnings.push("Reviewer returned pass, but calibrated thresholds failed closed.")
    }
  }

  if (
    finalDecision === "fail_codex_patch_needed" &&
    assetStrategy === "code_only" &&
    attempt >= maxAttempts &&
    looksGeneric(review)
  ) {
    finalDecision = "fail_generated_asset_needed"
    assetStrategy = "code_plus_generated_asset"
    blockers.push(`Code-only visual patch attempts reached ${attempt}/${maxAttempts} and reviewer still described generic/AI-slop visual quality.`)
  }

  return {
    ...review,
    asset_strategy: assetStrategy,
    blockers,
    warnings,
    final_decision: finalDecision,
  }
}

function thresholdFailureReasons(review: CriticalSectionReview): string[] {
  const failures: string[] = []
  if (review.visual_quality_score < DEFAULT_THRESHOLDS.visual_quality_score) failures.push(`visual_quality_score ${review.visual_quality_score} is below ${DEFAULT_THRESHOLDS.visual_quality_score}`)
  if (review.clarity_score < DEFAULT_THRESHOLDS.clarity_score) failures.push(`clarity_score ${review.clarity_score} is below ${DEFAULT_THRESHOLDS.clarity_score}`)
  if (review.mobile_score < DEFAULT_THRESHOLDS.mobile_score) failures.push(`mobile_score ${review.mobile_score} is below ${DEFAULT_THRESHOLDS.mobile_score}`)
  if (review.ai_slop_score > DEFAULT_THRESHOLDS.ai_slop_score_max) failures.push(`ai_slop_score ${review.ai_slop_score} is above ${DEFAULT_THRESHOLDS.ai_slop_score_max}`)
  if (!review.desktop_pass) failures.push("desktop_pass was false")
  if (!review.mobile_pass) failures.push("mobile_pass was false")
  if (review.final_decision !== "pass") failures.push(`final_decision was ${review.final_decision}`)
  return failures
}

function runMobileScreenshotQaPrecheck(
  entry: SectionRegistryEntry,
  packet: CriticalReviewPacket,
  manifest: Manifest,
): CriticalScreenshotQaPrecheck {
  const metadata = loadMobileScreenshotQaMetadata(entry)
  const metadataPath = String(entry.text_path || "")
  const findings: CriticalScreenshotQaFinding[] = []

  const pushMissing = (message: string, evidence: string) => {
    findings.push({ severity: "blocker", category: "missing_evidence", message, evidence, final_decision: "blocked_missing_screenshot" })
  }
  const pushVisual = (message: string, evidence: string) => {
    findings.push({ severity: "blocker", category: "mobile_visual", message, evidence, final_decision: "fail_codex_patch_needed" })
  }

  if (!metadata) {
    pushMissing("Mobile screenshot QA failed: mobile route/style metadata missing", metadataPath || "section registry has no mobile viewport metadata")
  } else {
    const viewport = metadata.viewport
    if (viewport?.name && viewport.name !== "mobile") {
      pushMissing("Mobile screenshot QA failed: mobile route/viewport metadata mismatched", `viewport.name=${viewport.name}`)
    }
    if (!Number.isFinite(Number(viewport?.width)) || !Number.isFinite(Number(viewport?.height)) || Number(viewport?.width) > 520) {
      pushMissing("Mobile screenshot QA failed: mobile route/viewport metadata missing or not mobile", `viewport=${JSON.stringify(viewport || null)}`)
    }

    const capturedAt = Date.parse(String(metadata.captured_at || ""))
    if (!Number.isFinite(capturedAt)) {
      pushMissing("Mobile screenshot QA failed: mobile route metadata is missing captured_at", metadataPath || "inline metadata")
    } else {
      const runCreated = Date.parse(manifest.created_at)
      if (Number.isFinite(runCreated) && capturedAt < runCreated - 60_000) {
        pushMissing("Mobile screenshot QA failed: mobile route metadata is stale for this run", `metadata captured_at=${metadata.captured_at}, run created_at=${manifest.created_at}`)
      }
      const screenshotMtime = statSync(packet.screenshots.mobile_after).mtimeMs
      if (Math.abs(screenshotMtime - capturedAt) > 5 * 60_000) {
        pushMissing("Mobile screenshot QA failed: mobile route metadata is stale or mismatched with screenshot", `metadata captured_at=${metadata.captured_at}, screenshot mtime=${new Date(screenshotMtime).toISOString()}`)
      }
    }

    const page = metadata.page || {}
    const bodyWidth = Number(page.body_scroll_width || 0)
    const docWidth = Number(page.document_scroll_width || 0)
    const bodyClient = Number(page.body_client_width || 0)
    const docClient = Number(page.document_client_width || 0)
    const scrollWidth = Math.max(bodyWidth, docWidth)
    const clientWidth = Math.max(bodyClient, docClient, Number(viewport?.width || 0))
    if (scrollWidth && clientWidth && scrollWidth > clientWidth + 2) {
      pushVisual("Mobile screenshot QA failed: horizontal overflow detected", `scrollWidth=${scrollWidth}, clientWidth=${clientWidth}`)
    }

    if (looksLikeUnloadedCss(metadata)) {
      pushVisual(
        "Mobile screenshot QA failed: CSS/brand styling appears unloaded",
        `font=${page.body_font_family || "unknown"}, stylesheets=${page.stylesheet_count ?? "unknown"}, section_classed=${metadata.section?.classed_element_count ?? "unknown"}`,
      )
    }

    const defaultLink = (metadata.links || []).find((link) => isDefaultPurpleUnderlinedLink(link))
    if (defaultLink) {
      pushVisual(
        "Mobile screenshot QA failed: default purple underlined CTA/link styling detected",
        `text=${defaultLink.text || ""}, color=${defaultLink.color || ""}, decoration=${defaultLink.text_decoration_line || ""}, class=${defaultLink.class_name || ""}`,
      )
    }

    const duplicateHeadline = duplicatedMajorHeadline(metadata)
    if (duplicateHeadline) {
      pushVisual("Mobile screenshot QA failed: duplicated major headline detected", duplicateHeadline)
    }

    const typo = obviousCopyTypo(metadata)
    if (typo) {
      pushVisual("Mobile screenshot QA failed: public copy typo or spacing mistake detected", typo)
    }
  }

  return {
    section_id: packet.section_id,
    status: findings.length ? "fail" : "pass",
    checked_at: new Date().toISOString(),
    route: String(metadata?.route || entry.route || "/"),
    mobile_screenshot: packet.screenshots.mobile_after,
    mobile_metadata_path: metadataPath,
    mobile_viewport: metadata?.viewport && Number.isFinite(Number(metadata.viewport.width)) && Number.isFinite(Number(metadata.viewport.height))
      ? { width: Number(metadata.viewport.width), height: Number(metadata.viewport.height) }
      : null,
    findings,
  }
}

function loadMobileScreenshotQaMetadata(entry: SectionRegistryEntry): ScreenshotQaMetadata | null {
  if (entry.viewport_metadata?.mobile) return entry.viewport_metadata.mobile
  if (entry.mobile_metadata) return entry.mobile_metadata
  if (!entry.text_path || !existsSync(entry.text_path)) return null
  try {
    const payload = JSON.parse(readFileSync(entry.text_path, "utf8")) as Record<string, unknown>
    const viewportMetadata = payload.viewport_metadata as Record<string, ScreenshotQaMetadata> | undefined
    if (viewportMetadata?.mobile) return viewportMetadata.mobile
    const mobileMetadata = payload.mobile_metadata as ScreenshotQaMetadata | undefined
    if (mobileMetadata) return mobileMetadata
    if ((payload.viewport as ScreenshotQaMetadata["viewport"] | undefined)?.name === "mobile") return payload as ScreenshotQaMetadata
  } catch {
    return null
  }
  return null
}

function looksLikeUnloadedCss(metadata: ScreenshotQaMetadata): boolean {
  const page = metadata.page || {}
  const section = metadata.section || {}
  const font = String(page.body_font_family || "").toLowerCase()
  const bodyClass = String(page.body_class_name || "")
  const htmlClass = String(page.html_class_name || "")
  const sectionClass = String(section.class_name || "")
  const classedCount = Number(section.classed_element_count || 0)
  const elementCount = Number(section.element_count || 0)
  const stylesheetCount = Number(page.stylesheet_count || 0)
  const fontFamilies = font.split(",").map((item) => item.trim().replace(/^["']|["']$/g, ""))
  const defaultSerif = fontFamilies.some((family) => family === "times" || family === "times new roman" || family === "serif")
  const noClassEvidence = !bodyClass && !htmlClass && !sectionClass && elementCount > 0 && classedCount <= 1
  return defaultSerif || (stylesheetCount === 0 && noClassEvidence)
}

function isDefaultPurpleUnderlinedLink(link: NonNullable<ScreenshotQaMetadata["links"]>[number]): boolean {
  const color = normalizeCssColor(String(link.color || ""))
  const decoration = String(link.text_decoration_line || "").toLowerCase()
  const className = String(link.class_name || "")
  const text = String(link.text || "").trim()
  const height = Number(link.height || 0)
  const defaultPurple = color === "rgb(0,0,238)" || color === "rgb(85,26,139)" || color === "#0000ee" || color === "#551a8b"
  const ctaLike = /audit|call|book|get|start|revenue|workflow|cash|learn|contact/i.test(text) || height >= 28
  return defaultPurple && decoration.includes("underline") && !className.trim() && ctaLike
}

function duplicatedMajorHeadline(metadata: ScreenshotQaMetadata): string {
  const h1s = metadata.copy?.h1_texts?.length ? metadata.copy.h1_texts : metadata.section?.h1_texts || []
  const headlines = (h1s.length ? h1s : metadata.copy?.major_headlines || [])
    .map((item) => item.trim().replace(/\s+/g, " ").toLowerCase())
    .filter((item) => item.length >= 12)
  const counts = new Map<string, number>()
  for (const headline of headlines) counts.set(headline, (counts.get(headline) || 0) + 1)
  const duplicate = [...counts.entries()].find(([, count]) => count > 1)
  return duplicate ? `"${duplicate[0]}" appeared ${duplicate[1]} times` : ""
}

function obviousCopyTypo(metadata: ScreenshotQaMetadata): string {
  const text = String(metadata.copy?.text || "").replace(/\s+/g, " ")
  const match = text.match(/\b[\w]+,(?:not|and|but|or|then|the|to|from|with)\b/i)
  return match ? match[0] : ""
}

function normalizeCssColor(value: string): string {
  return value.replace(/\s+/g, "").toLowerCase()
}

function missingScreenshotReview(sectionId: string, reason: string): CriticalSectionReview {
  return baseFailureReview(sectionId, reason, "Capture readable, fresh desktop and mobile after screenshots before requesting critical visual review.", "blocked_missing_screenshot")
}

function validationFailureReview(sectionId: string, reason: string): CriticalSectionReview {
  return baseFailureReview(sectionId, reason, "Fix the critical visual review infrastructure or reviewer response schema, then rerun verification.", "fail_revert_recommended")
}

function publicCopyFailureReview(sectionId: string, scan: PublicCopyGuardrailScan): CriticalSectionReview {
  return baseFailureReview(
    sectionId,
    `Public-copy guardrail failed: ${scan.findings.filter((finding) => finding.severity === "blocker").map((finding) => finding.term_or_issue).join(", ")}`,
    "Remove internal/tool-first public copy and rerun capture before visual review.",
    "fail_codex_patch_needed",
  )
}

function screenshotQaFailureReview(sectionId: string, packet: CriticalReviewPacket, qa: CriticalScreenshotQaPrecheck): CriticalSectionReview {
  const missingEvidence = qa.findings.some((finding) => finding.final_decision === "blocked_missing_screenshot")
  return {
    ...baseFailureReview(
      sectionId,
      qa.findings.map((finding) => finding.message).join("; "),
      missingEvidence
        ? "Recapture fresh full mobile route evidence with QA metadata before requesting critical visual review."
        : "Fix the mobile visual output, recapture full mobile route evidence, and rerun Critical Visual Review.",
      missingEvidence ? "blocked_missing_screenshot" : "fail_codex_patch_needed",
    ),
    reviewed_screenshot_paths: packet.screenshots,
    reviewed_screenshot_hashes: packet.metadata.screenshot_hashes,
    section_match: missingEvidence ? "unclear" : "yes",
    blockers: qa.findings.map((finding) => `${finding.message}: ${finding.evidence}`),
  }
}

function baseFailureReview(sectionId: string, reason: string, recommendation: string, finalDecision: CriticalFinalDecision): CriticalSectionReview {
  return {
    section_id: sectionId,
    reviewer_version: CRITICAL_VISUAL_REVIEW_CONFIG.reviewer_version,
    reviewed_screenshot_paths: { desktop_after: "", mobile_after: "" },
    reviewed_screenshot_hashes: { desktop_after: "", mobile_after: "" },
    section_match: "unclear",
    desktop_pass: false,
    mobile_pass: false,
    visual_quality_score: 1,
    ai_slop_score: 10,
    clarity_score: 1,
    mobile_score: 1,
    asset_strategy: "code_only",
    blockers: [reason],
    warnings: [],
    exact_fix_recommendation: recommendation,
    final_decision: finalDecision,
  }
}

function makeEmptyReport(
  manifest: Manifest,
  packetDir: string,
  responseDir: string,
  commandModeValue: CriticalReviewAggregate["command_mode"],
): CriticalReviewAggregate {
  const artifactRoot = join(SOFTWARE_FACTORY_ROOT, "artifacts", "critical-visual-review", manifest.run_id)
  return {
    run_id: manifest.run_id,
    status: "fail",
    aggregate_decision: "blocked",
    next_status: "blocked",
    final_gate_decision: "blocked",
    report_paths: {
      run_json: join(manifest.run_dir, "verification", "critical-visual-review-report.json"),
      run_markdown: join(manifest.run_dir, "verification", "critical-visual-review-report.md"),
      artifact_json: join(artifactRoot, "critical-visual-review-report.json"),
      artifact_markdown: join(artifactRoot, "critical-visual-review-report.md"),
      packet_dir: packetDir,
      response_dir: responseDir,
      copy_guardrail_json: join(manifest.run_dir, "verification", "critical-visual-review-copy-guardrails.json"),
      screenshot_qa_json: join(manifest.run_dir, "verification", "critical-visual-review-screenshot-qa.json"),
    },
    command_mode: commandModeValue,
    thresholds: DEFAULT_THRESHOLDS,
    max_visual_patch_attempts: DEFAULT_THRESHOLDS.max_visual_patch_attempts,
    visual_patch_attempt: visualPatchAttempt(manifest),
    copy_guardrail_scans: [],
    screenshot_qa_prechecks: [],
    sections: [],
    validation_failures: [],
    write_errors: [],
    checked_at: new Date().toISOString(),
  }
}

function finalizeReport(report: CriticalReviewAggregate) {
  const firstBlockingDecision = report.sections.find((section) => section.final_decision !== "pass")?.final_decision
  const hasValidationFailure = report.validation_failures.length > 0
  report.status = !firstBlockingDecision && !hasValidationFailure ? "pass" : "fail"
  report.aggregate_decision = report.status === "pass" ? "pass" : "blocked"
  report.final_gate_decision = report.status === "pass" ? "verified_pending_deploy" : "blocked"
  if (report.status === "pass") {
    report.next_status = "critical_visual_review_passed"
  } else if (firstBlockingDecision === "fail_codex_patch_needed") {
    report.next_status = "needs_patch_2"
  } else if (firstBlockingDecision === "fail_generated_asset_needed" || firstBlockingDecision === "blocked_missing_required_asset") {
    report.next_status = "blocked_missing_required_asset"
  } else {
    report.next_status = "blocked"
  }
}

function writeCriticalReviewReports(manifest: Manifest, report: CriticalReviewAggregate): CriticalReviewAggregate {
  writeJson(report.report_paths.copy_guardrail_json, report.copy_guardrail_scans)
  writeJson(report.report_paths.screenshot_qa_json, report.screenshot_qa_prechecks)
  writeJson(report.report_paths.run_json, report)
  writeText(report.report_paths.run_markdown, renderMarkdown(report))
  tryWriteJson(report.report_paths.artifact_json, report, report)
  tryWriteText(report.report_paths.artifact_markdown, renderMarkdown(report), report)
  manifest.reports.push(
    report.report_paths.run_json,
    report.report_paths.run_markdown,
    report.report_paths.copy_guardrail_json,
    report.report_paths.screenshot_qa_json,
    report.report_paths.artifact_json,
    report.report_paths.artifact_markdown,
  )
  return report
}

function tryWriteJson(path: string, data: unknown, report: CriticalReviewAggregate) {
  try {
    writeJson(path, data)
  } catch (error) {
    report.write_errors.push({ path, error: error instanceof Error ? error.message : String(error) })
  }
}

function tryWriteText(path: string, data: string, report: CriticalReviewAggregate) {
  try {
    writeText(path, data)
  } catch (error) {
    report.write_errors.push({ path, error: error instanceof Error ? error.message : String(error) })
  }
}

function renderMarkdown(report: CriticalReviewAggregate): string {
  return [
    "# Critical Visual Review Gate",
    "",
    `Run id: ${report.run_id}`,
    `Status: ${report.status}`,
    `Aggregate decision: ${report.aggregate_decision}`,
    `Next status: ${report.next_status}`,
    `Final gate decision: ${report.final_gate_decision}`,
    `Command mode: ${report.command_mode}`,
    `Visual patch attempt: ${report.visual_patch_attempt}/${report.max_visual_patch_attempts}`,
    `Packet dir: ${report.report_paths.packet_dir}`,
    `Response dir: ${report.report_paths.response_dir}`,
    `Copy guardrail report: ${report.report_paths.copy_guardrail_json}`,
    `Screenshot QA report: ${report.report_paths.screenshot_qa_json}`,
    "",
    ...report.sections.flatMap((section) => [
      `## ${section.section_id || basename(section.exact_fix_recommendation)}`,
      `- reviewer version: ${section.reviewer_version}`,
      `- section match: ${section.section_match}`,
      `- final decision: ${section.final_decision}`,
      `- asset strategy: ${section.asset_strategy}`,
      `- desktop pass: ${section.desktop_pass}`,
      `- mobile pass: ${section.mobile_pass}`,
      `- scores: visual ${section.visual_quality_score}, slop ${section.ai_slop_score}, clarity ${section.clarity_score}, mobile ${section.mobile_score}`,
      `- reviewed screenshots: ${JSON.stringify(section.reviewed_screenshot_paths)}`,
      `- reviewed hashes: ${JSON.stringify(section.reviewed_screenshot_hashes)}`,
      `- blockers: ${section.blockers.length ? JSON.stringify(section.blockers) : "[]"}`,
      `- warnings: ${section.warnings.length ? JSON.stringify(section.warnings) : "[]"}`,
      `- exact fix recommendation: ${section.exact_fix_recommendation}`,
      "",
    ]),
    "## Copy Guardrails",
    ...(report.copy_guardrail_scans.length
      ? report.copy_guardrail_scans.map((scan) => `- ${scan.section_id}: ${scan.status} (${scan.findings.length} finding(s))`)
      : ["- none"]),
    "",
    "## Screenshot QA Prechecks",
    ...(report.screenshot_qa_prechecks.length
      ? report.screenshot_qa_prechecks.map((qa) => `- ${qa.section_id}: ${qa.status} (${qa.findings.map((finding) => finding.message).join("; ") || "no findings"})`)
      : ["- none"]),
    "",
    "## Validation Failures",
    ...(report.validation_failures.length ? report.validation_failures.map((item) => `- ${item.section_id}: ${item.error}`) : ["- none"]),
    "",
  ].join("\n")
}

function validateScreenshotProofMap(value: unknown, field: string, expected?: Partial<Record<CriticalScreenshotKey, string>>): asserts value is CriticalScreenshotMap {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`)
  const map = value as Record<string, unknown>
  for (const key of ["desktop_after", "mobile_after"] as const) {
    if (typeof map[key] !== "string" || !map[key]) throw new Error(`${field}.${key} must be a non-empty string`)
    if (expected?.[key] && map[key] !== expected[key]) throw new Error(`${field}.${key} mismatch: expected ${expected[key]}, received ${map[key]}`)
  }
  for (const key of ["desktop_before", "mobile_before"] as const) {
    if (expected?.[key]) {
      if (map[key] !== expected[key]) throw new Error(`${field}.${key} mismatch: expected ${expected[key]}, received ${map[key]}`)
    } else if (map[key] !== undefined) {
      throw new Error(`${field}.${key} was supplied but packet did not include it`)
    }
  }
}

function hashExistingScreenshots(screenshots: CriticalScreenshotMap): CriticalScreenshotMap {
  const hashes: Partial<Record<CriticalScreenshotKey, string>> = {}
  for (const key of Object.keys(screenshots) as CriticalScreenshotKey[]) {
    if (screenshots[key] && existsSync(screenshots[key])) hashes[key] = sha256File(screenshots[key])
  }
  return hashes as CriticalScreenshotMap
}

function screenshotMtimes(screenshots: CriticalScreenshotMap): CriticalScreenshotMap {
  const mtimes: Partial<Record<CriticalScreenshotKey, string>> = {}
  for (const key of Object.keys(screenshots) as CriticalScreenshotKey[]) {
    if (screenshots[key] && existsSync(screenshots[key])) mtimes[key] = statSync(screenshots[key]).mtime.toISOString()
  }
  return mtimes as CriticalScreenshotMap
}

function sha256File(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex")
}

function gitSha(): string {
  const result = git(["rev-parse", "HEAD"])
  return result.status === 0 ? result.stdout.trim() : "unknown"
}

function visualPatchAttempt(manifest: Manifest): number {
  const record = manifest as Record<string, unknown>
  for (const key of ["critical_visual_review_attempt", "visual_patch_attempt", "patch_attempt", "attempt", "iteration", "current_iteration"]) {
    const value = Number(record[key])
    if (Number.isFinite(value) && value > 0) return Math.floor(value)
  }
  return 1
}

function looksGeneric(review: CriticalSectionReview): boolean {
  const text = [...review.blockers, ...review.warnings, review.exact_fix_recommendation].join("\n").toLowerCase()
  return /generic|ai slop|ai-generated|saas filler|template|decorative|fake dashboard|icon clutter/.test(text)
}

function commandMode(): CriticalReviewAggregate["command_mode"] {
  if (toBool(process.env[CRITICAL_VISUAL_REVIEW_CONFIG.legacyAllowEnv], false) && process.env[CRITICAL_VISUAL_REVIEW_CONFIG.legacyEnv]) {
    return "legacy_shell"
  }
  return "safe_allowlisted"
}

function excerpt(text: string, index: number): string {
  return text.slice(Math.max(0, index - 80), index + 140).replace(/\s+/g, " ").trim()
}

function resolveRepoPath(path: string): string {
  return resolve(path.startsWith("/") ? path : join(SITE_REPO, path))
}

export function relativeToSite(path: string): string {
  const absolute = resolveRepoPath(path)
  const rel = relative(SITE_REPO, absolute)
  return rel.startsWith("..") ? absolute : rel
}
