import { existsSync, readFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { isAbsolute, join } from "node:path"
import { pathToFileURL } from "node:url"
import {
  loadManifest,
  main,
  SOFTWARE_FACTORY_ROOT,
  STANLEY_OS_ROOT,
  updateStatus,
  writeJson,
  writeText,
  type Manifest,
} from "./_lib.ts"

export type AssetStrategy =
  | "code_only"
  | "code_plus_generated_asset"
  | "generated_asset_primary"
  | "blocked_missing_required_asset"

export type GeneratedAssetStatus =
  | "not_required"
  | "requested"
  | "generated_pending_qa"
  | "approved"
  | "rejected"
  | "unavailable"
  | "missing"

export type SlopPattern =
  | "unnecessary_pill"
  | "floating_chip"
  | "unnecessary_support_box"
  | "generic_icon_list"
  | "too_many_small_cards"
  | "fake_process_rectangles"
  | "orbiting_pill_checklist"
  | "simple_icon_when_asset_required"
  | "other"

export type SectionEvidence = {
  section_name: string
  section_id?: string
  purpose?: string
  offer?: string
  text?: string
  html?: string
  visual_summary?: string
  asset_strategy_hint?: AssetStrategy
  generated_asset_status?: GeneratedAssetStatus
  generated_asset_path?: string
  generated_asset_route_available?: boolean
  controller_downgrade_approved?: boolean
  code_only_justification?: string
}

export type SlopFinding = {
  pattern: SlopPattern
  severity: "blocker" | "major" | "minor"
  evidence: string
  fix: string
}

export type LanguageFinding = {
  term_or_issue: string
  severity: "blocker" | "major" | "minor"
  evidence: string
  fix: string
}

export type SectionGateReport = {
  section_name: string
  asset_strategy: AssetStrategy
  slop_findings: SlopFinding[]
  language_findings: LanguageFinding[]
  generated_asset_required: boolean
  generated_asset_status: GeneratedAssetStatus
  passes_gate: boolean
  exact_fix_recommendation: string
}

export type GateReport = {
  run_id: string
  status: "pass" | "fail"
  next_status: "anti_ai_slop_passed" | "anti_ai_slop_failed" | "blocked_missing_required_asset" | "downgraded_visual_strategy"
  final_gate_decision: "verified_pending_deploy" | "blocked"
  sections: SectionGateReport[]
  asset_requests: string[]
  report_paths: Record<string, string>
  write_errors: Array<{ path: string; error: string }>
  checked_at: string
}

const SECTION_RULES = {
  hero: {
    defaultStrategy: "code_only" as AssetStrategy,
    generatedAssetRequired: false,
  },
  cashflow: {
    defaultStrategy: "code_plus_generated_asset" as AssetStrategy,
    generatedAssetRequired: true,
  },
  customerRevenue: {
    defaultStrategy: "generated_asset_primary" as AssetStrategy,
    generatedAssetRequired: true,
  },
}

const INTERNAL_LANGUAGE = [
  "bottlenecks",
  "AI-powered",
  "AI first",
  "automation-first",
  "optimize",
  "streamline",
  "digital transformation",
  "OpenClaw",
  "Hermes",
  "Codex",
  "Stanley H",
  "n8n",
  "QBO",
  "HCP",
]

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  await runVisualAssetGateCli()
}

export async function runVisualAssetGateCli(): Promise<void> {
  await main(async (args) => {
    const manifest = args.fixture
      ? makeFixtureManifest(`visual-asset-gate-fixture-${Date.now()}`)
      : loadManifest(String(args.run_id || ""))
    const sections = args.fixture ? fixtureSections() : loadSections(manifest)
    const report = runVisualAssetGate(manifest, sections)
    writeGateReports(manifest, report)
    if (!args.dry_run && !args.fixture) updateStatus(manifest, report.next_status)
    if (report.status !== "pass" && !args.fixture) process.exitCode = 1
  })
}

export function runVisualAssetGate(manifest: Manifest, sections: SectionEvidence[]): GateReport {
  const sectionReports = sections.map((section) => evaluateSection(section, manifest))
  const assetRequests = sectionReports
    .filter((section) => section.generated_asset_required && section.generated_asset_status === "missing")
    .map((section) => writeAssetRequest(manifest, section))

  const hasMissingAsset = sectionReports.some(
    (section) => section.asset_strategy === "blocked_missing_required_asset" || section.generated_asset_status === "missing",
  )
  const hasDowngrade = sectionReports.some(
    (section) => section.generated_asset_required && section.generated_asset_status === "unavailable",
  )
  const failed = sectionReports.some((section) => !section.passes_gate)

  return {
    run_id: manifest.run_id,
    status: failed ? "fail" : "pass",
    next_status: failed
      ? hasMissingAsset
        ? "blocked_missing_required_asset"
        : hasDowngrade
          ? "downgraded_visual_strategy"
          : "anti_ai_slop_failed"
      : "anti_ai_slop_passed",
    final_gate_decision: failed ? "blocked" : "verified_pending_deploy",
    sections: sectionReports,
    asset_requests: assetRequests,
    report_paths: {},
    write_errors: [],
    checked_at: new Date().toISOString(),
  }
}

export function evaluateSection(section: SectionEvidence, manifest?: Manifest): SectionGateReport {
  const text = [section.section_name, section.purpose, section.offer, section.text, section.html, section.visual_summary]
    .filter(Boolean)
    .join("\n")
  const normalized = text.toLowerCase()
  const sectionKind = classifySection(section)
  const rule = SECTION_RULES[sectionKind] || SECTION_RULES.hero
  const hasApprovedCodeOnlyDowngrade = Boolean(
    rule.generatedAssetRequired &&
      section.asset_strategy_hint === "code_only" &&
      section.controller_downgrade_approved &&
      hasMeaningfulCodeOnlyJustification(section.code_only_justification),
  )
  const generatedRequired = hasApprovedCodeOnlyDowngrade
    ? false
    : rule.generatedAssetRequired || Boolean(section.asset_strategy_hint && section.asset_strategy_hint !== "code_only")
  const generatedStatus = generatedAssetStatus(section, generatedRequired, manifest)
  const assetStrategy = chooseAssetStrategy(section, generatedRequired, generatedStatus, rule.defaultStrategy)
  const slopFindings = findSlop(sectionKind, normalized, generatedRequired)
  const languageFindings = findLanguage(sectionKind, text)

  if (
    rule.generatedAssetRequired &&
    section.asset_strategy_hint === "code_only" &&
    !hasApprovedCodeOnlyDowngrade
  ) {
    slopFindings.push({
      pattern: "simple_icon_when_asset_required",
      severity: "blocker",
      evidence: `Generated/custom visual is required for ${section.section_name}, but asset_strategy_hint requested code_only without controller approval and a meaningful justification.`,
      fix: "Keep the required generated/custom visual route, or record controller_downgrade_approved with a concrete code_only_justification.",
    })
  }

  if (generatedRequired && (generatedStatus === "missing" || generatedStatus === "rejected")) {
    slopFindings.push({
      pattern: "simple_icon_when_asset_required",
      severity: "blocker",
      evidence: `Generated/custom visual is required for ${section.section_name}, but status is ${generatedStatus}.`,
      fix: "Request or approve the required generated visual before Codex builds fallback UI fragments.",
    })
  }
  if (generatedRequired && generatedStatus === "unavailable" && !section.controller_downgrade_approved) {
    slopFindings.push({
      pattern: "simple_icon_when_asset_required",
      severity: "blocker",
      evidence: "Preferred generated image route is unavailable and no controller downgrade is approved.",
      fix: "Record downgraded_visual_strategy with missing route details or block as missing required asset.",
    })
  }

  const passes = !slopFindings.some((finding) => finding.severity === "blocker") && !languageFindings.some((finding) => finding.severity === "blocker")
  return {
    section_name: section.section_name,
    asset_strategy: assetStrategy,
    slop_findings: slopFindings,
    language_findings: languageFindings,
    generated_asset_required: generatedRequired,
    generated_asset_status: generatedStatus,
    passes_gate: passes,
    exact_fix_recommendation: passes ? "No anti-AI-slop fix required." : recommendation(sectionKind, assetStrategy, generatedStatus),
  }
}

export function writeGateReports(manifest: Manifest, report: GateReport): GateReport {
  const artifactRoot = join(SOFTWARE_FACTORY_ROOT, "artifacts", "visual-asset-strategy", manifest.run_id)
  const osNotePath = join(STANLEY_OS_ROOT, "ops", "visual-asset-strategy", `${manifest.run_id}.md`)
  const runJsonPath = join(manifest.run_dir, "verification", "anti-ai-slop-report.json")
  const runMdPath = join(manifest.run_dir, "verification", "anti-ai-slop-report.md")
  const artifactJsonPath = join(artifactRoot, "anti-ai-slop-report.json")
  const artifactMdPath = join(artifactRoot, "anti-ai-slop-report.md")
  report.report_paths = {
    run_json: runJsonPath,
    run_markdown: runMdPath,
    artifact_json: artifactJsonPath,
    artifact_markdown: artifactMdPath,
    stanley_os_note: osNotePath,
  }
  writeJson(runJsonPath, report)
  writeText(runMdPath, renderMarkdown(report))
  tryWriteJson(artifactJsonPath, report, report)
  tryWriteText(artifactMdPath, renderMarkdown(report), report)
  tryWriteText(osNotePath, renderMarkdown(report), report)
  writeJson(runJsonPath, report)
  writeText(runMdPath, renderMarkdown(report))
  manifest.reports.push(runJsonPath, runMdPath, artifactJsonPath, artifactMdPath, osNotePath)
  return report
}

export function makeFixtureManifest(runId: string): Manifest {
  const runDir = join(tmpdir(), "stanley-design-loop-fixtures", runId)
  return {
    run_id: runId,
    status: "built_pending_verification",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    scope: "fixture",
    auto_deploy: false,
    max_sections: 6,
    max_iterations: 1,
    site_repo: process.cwd(),
    software_factory_root: SOFTWARE_FACTORY_ROOT,
    stanley_os_root: STANLEY_OS_ROOT,
    run_dir: runDir,
    reports: [],
  }
}

function tryWriteJson(path: string, data: unknown, report: GateReport) {
  try {
    writeJson(path, data)
  } catch (error) {
    report.write_errors.push({ path, error: error instanceof Error ? error.message : String(error) })
  }
}

function tryWriteText(path: string, data: string, report: GateReport) {
  try {
    writeText(path, data)
  } catch (error) {
    report.write_errors.push({ path, error: error instanceof Error ? error.message : String(error) })
  }
}

function loadSections(manifest: Manifest): SectionEvidence[] {
  const registryPath = join(manifest.run_dir, "section-registry.json")
  if (!existsSync(registryPath)) {
    return [
      {
        section_name: "Homepage",
        text: "No section registry was available for visual asset strategy review.",
        visual_summary: "missing section-registry.json",
      },
    ]
  }
  const registry = JSON.parse(readFileSync(registryPath, "utf8"))
  return (registry.sections || []).map((entry: { section_id?: string; purpose?: string; offer?: string; text_path?: string; dom_preview?: string }) => {
    const payload = entry.text_path && existsSync(entry.text_path) ? JSON.parse(readFileSync(entry.text_path, "utf8")) : {}
    return {
      section_name: humanSectionName(entry.section_id || entry.purpose || "Section"),
      section_id: entry.section_id,
      purpose: entry.purpose,
      offer: entry.offer,
      text: payload.text || entry.dom_preview || "",
      html: payload.html || "",
      visual_summary: payload.visual_summary || "",
      generated_asset_status: payload.generated_asset_status,
      generated_asset_path: payload.generated_asset_path,
      generated_asset_route_available: payload.generated_asset_route_available,
      asset_strategy_hint: payload.asset_strategy_hint,
      controller_downgrade_approved: payload.controller_downgrade_approved,
      code_only_justification: payload.code_only_justification,
    }
  })
}

function classifySection(section: SectionEvidence): keyof typeof SECTION_RULES {
  const key = [section.section_name, section.section_id, section.offer, section.purpose].filter(Boolean).join(" ").toLowerCase()
  if (key.includes("cashflow") || key.includes("cash flow")) return "cashflow"
  if (key.includes("customer revenue") || key.includes("customer-revenue")) return "customerRevenue"
  return "hero"
}

function chooseAssetStrategy(
  section: SectionEvidence,
  generatedRequired: boolean,
  generatedStatus: GeneratedAssetStatus,
  defaultStrategy: AssetStrategy,
): AssetStrategy {
  if (generatedRequired && (generatedStatus === "missing" || generatedStatus === "rejected")) return "blocked_missing_required_asset"
  if (section.asset_strategy_hint) return section.asset_strategy_hint
  if (!generatedRequired) return "code_only"
  return defaultStrategy
}

function generatedAssetStatus(section: SectionEvidence, generatedRequired: boolean, manifest?: Manifest): GeneratedAssetStatus {
  if (!generatedRequired) return "not_required"
  if (hasGeneratedAssetEvidence(section, manifest)) return "approved"
  if (section.generated_asset_status === "approved") {
    return section.generated_asset_route_available === false ? "unavailable" : "missing"
  }
  if (section.generated_asset_status) return section.generated_asset_status
  if (section.generated_asset_route_available === false) return "unavailable"
  return "missing"
}

function hasGeneratedAssetEvidence(section: SectionEvidence, manifest?: Manifest): boolean {
  if (!section.generated_asset_path) return false

  // Evidence is intentionally limited to a concrete file path: absolute, or relative to the site repo.
  // A stale generated_asset_status alone is not enough to approve generated-required sections.
  if (isAbsolute(section.generated_asset_path)) return existsSync(section.generated_asset_path)
  if (manifest && existsSync(join(manifest.site_repo, section.generated_asset_path))) return true
  return existsSync(join(process.cwd(), section.generated_asset_path))
}

function hasMeaningfulCodeOnlyJustification(value?: string): boolean {
  if (!value) return false
  const normalized = value.trim().toLowerCase()
  return normalized.length >= 24 && !/^(ok|yes|approved|n\/a|na|none|code only)$/.test(normalized)
}

function findSlop(sectionKind: keyof typeof SECTION_RULES, normalized: string, generatedRequired: boolean): SlopFinding[] {
  const findings: SlopFinding[] = []
  addIf(findings, /\b(brand pill|top pill|eyebrow pill|pill above headline)\b/.test(normalized), "unnecessary_pill", "blocker", "Top brand pill or headline pill appears without a conversion purpose.", "Remove the pill unless the controller records a conversion purpose.")
  addIf(findings, /\b(floating chip|floating badge|filler badge|trust chip|extra badge)\b/.test(normalized), "floating_chip", "blocker", "Floating chip or filler badge is present without clear communication value.", "Remove filler chips and make the section communicate through primary copy or one strong visual.")
  addIf(findings, /\b(support box|info box|bottom box|helper box)\b/.test(normalized), "unnecessary_support_box", "blocker", "Support/info box appears to repeat or pad the section.", "Remove the support box unless the controller documents why it changes the decision.")
  addIf(findings, /\b(icon card|icon-card|icon grid|icon list|generic icon)\b/.test(normalized), "generic_icon_list", generatedRequired ? "blocker" : "major", "Generic icon-card/list pattern detected.", generatedRequired ? "Replace icon cards with the required generated/custom visual." : "Use icons only when they add concrete meaning.")
  addIf(findings, /\b(many small cards|too many cards|card grid|four cards|three cards)\b/.test(normalized), "too_many_small_cards", generatedRequired ? "blocker" : "major", "Small-card assembly is standing in for the main visual.", "Consolidate into one strong visual or a simpler layout.")
  addIf(findings, /\b(rounded rectangle|repeated rectangles|fake process|placeholder process)\b/.test(normalized), "fake_process_rectangles", "blocker", "Fake process graphic assembled from repeated rounded rectangles.", "Use a real process visual with a coherent path or block for asset generation.")

  if (sectionKind === "cashflow") {
    addIf(findings, !/\b(left-to-right|pipeline|finished work|collected cash|invoice|follow-up)\b/.test(normalized), "simple_icon_when_asset_required", "blocker", "Cashflow section does not show the required finished-work to collected-cash path.", "Request or integrate a left-to-right pipeline/process visual.")
  }
  if (sectionKind === "customerRevenue") {
    addIf(findings, /\b(orbiting pill|orbiting checklist|orbiting chips|checklist assembly)\b/.test(normalized), "orbiting_pill_checklist", "blocker", "Orbiting pill/checklist assembly detected where a flywheel is required.", "Replace with a generated or custom circular wheel/flywheel visual.")
    addIf(findings, !/\b(wheel|flywheel|circular|bring customers back|get fresh reviews|create referrals|catch extra calls)\b/.test(normalized), "orbiting_pill_checklist", "blocker", "Customer Revenue section lacks the required circular four-part revenue wheel story.", "Create a wheel with bring customers back, get fresh reviews, create referrals, and catch extra calls.")
  }
  return findings
}

function findLanguage(sectionKind: keyof typeof SECTION_RULES, text: string): LanguageFinding[] {
  const findings: LanguageFinding[] = []
  const lines = text.split(/\r?\n/)
  for (const term of INTERNAL_LANGUAGE) {
    lines.forEach((line, index) => {
      if (line.toLowerCase().includes(term.toLowerCase())) {
        findings.push({
          term_or_issue: term,
          severity: sectionKind === "hero" || term.toLowerCase() === "bottlenecks" ? "blocker" : "major",
          evidence: `line ${index + 1}: ${line.trim().slice(0, 180)}`,
          fix: "Replace internal/process-heavy wording with owner-visible outcomes such as get paid faster, collected cash, missed calls, repeat jobs, reviews, or owner relief.",
        })
      }
    })
  }
  if (sectionKind === "hero" && !/\b(cash|paid|revenue|owner|time|calls|jobs|customers)\b/i.test(text)) {
    findings.push({
      term_or_issue: "hero_not_results_first",
      severity: "blocker",
      evidence: "Hero text does not clearly lead with money, time, owner relief, calls, jobs, customers, or revenue.",
      fix: "Rewrite the hero subhead toward a concise result-first business outcome.",
    })
  }
  return findings
}

function addIf(
  findings: SlopFinding[],
  condition: boolean,
  pattern: SlopPattern,
  severity: SlopFinding["severity"],
  evidence: string,
  fix: string,
) {
  if (condition) findings.push({ pattern, severity, evidence, fix })
}

function recommendation(
  sectionKind: keyof typeof SECTION_RULES,
  assetStrategy: AssetStrategy,
  generatedStatus: GeneratedAssetStatus,
): string {
  if (assetStrategy === "blocked_missing_required_asset" || generatedStatus === "missing") {
    return "Block deploy approval. Generate/request the required asset first, then hand integration back to Codex."
  }
  if (generatedStatus === "unavailable") {
    return "Record downgraded_visual_strategy with the missing generation route and do not approve for deploy without controller approval."
  }
  if (sectionKind === "cashflow") return "Replace icon/card process fragments with a single left-to-right pipeline from finished work to collected cash."
  if (sectionKind === "customerRevenue") return "Replace orbiting pills/checklists with a circular four-part Customer Revenue flywheel."
  return "Remove filler pills, support boxes, internal language, and AI/tooling-first framing before deploy approval."
}

function writeAssetRequest(manifest: Manifest, section: SectionGateReport): string {
  const fileName = `${section.section_name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.json`
  const path = join(SOFTWARE_FACTORY_ROOT, "artifacts", "visual-asset-strategy", manifest.run_id, "asset-requests", fileName)
  const fallbackPath = join(manifest.run_dir, "asset-requests", fileName)
  const request = {
    run_id: manifest.run_id,
    section_name: section.section_name,
    asset_strategy: section.asset_strategy,
    intended_website_use: "Homepage or major-section generated visual required before deploy approval.",
    why_code_svg_alone_is_insufficient: section.exact_fix_recommendation,
    what_the_image_is: section.section_name.includes("Cashflow") ? "A single left-to-right process visual from finished work to collected cash." : "A single circular wheel/flywheel visual with the required revenue components.",
    what_the_image_is_not: "Not pills, chips, generic icon cards, fake dashboards, robots, AI motifs, or baked-in critical text.",
    visual_story: section.exact_fix_recommendation,
    exact_visible_objects_or_shapes: "Clean Stanley Systems light-mode visual, no critical baked-in copy.",
    composition_and_safe_areas: "Leave safe areas for DOM text, CTAs, and labels.",
    style_and_palette: "Warm light mode, navy, Stanley green, restrained depth.",
    no_text_or_limited_text_rule: "No critical readable text in the image.",
    dom_integration_instructions: "Codex owns editable DOM copy, CTA, labels, and motion around the approved asset.",
    desktop_and_mobile_usage: "Must remain clear at desktop and mobile section widths.",
    negative_prompt: "No robots, AI motifs, generic SaaS dashboards, orange, amber, tan, sepia, noisy texture, tiny text, fake text, or watermarks.",
    output_requirements: "Transparent PNG/WebP or approved web asset format.",
    rejection_criteria: "Reject if it looks generic, contains unreadable/fake text, relies on UI card fragments, or fails the required visual story.",
    target_public_asset_path_if_approved: `public/images/generated/design-loop/${manifest.run_id}/`,
    fallback_downgrade_policy: "If Higgsfield/preferred generation is unavailable, mark downgraded_visual_strategy or blocked_missing_required_asset. Do not silently approve pill/icon/card fallback.",
  }
  try {
    writeJson(path, request)
    return path
  } catch {
    writeJson(fallbackPath, { ...request, preferred_artifact_write_failed: path })
    return fallbackPath
  }
}

function renderMarkdown(report: GateReport): string {
  return [
    `# Visual Asset Strategy and Anti-AI-Slop Gate`,
    ``,
    `Run id: ${report.run_id}`,
    `Status: ${report.status}`,
    `Next status: ${report.next_status}`,
    `Final gate decision: ${report.final_gate_decision}`,
    ``,
    ...report.sections.flatMap((section) => [
      `## ${section.section_name}`,
      `- section name: ${section.section_name}`,
      `- asset strategy chosen: ${section.asset_strategy}`,
      `- slop findings: ${section.slop_findings.length ? JSON.stringify(section.slop_findings) : "[]"}`,
      `- language findings: ${section.language_findings.length ? JSON.stringify(section.language_findings) : "[]"}`,
      `- generated asset required: ${section.generated_asset_required}`,
      `- generated asset status: ${section.generated_asset_status}`,
      `- current implementation passes or fails: ${section.passes_gate ? "passes" : "fails"}`,
      `- exact fix recommendation: ${section.exact_fix_recommendation}`,
      ``,
    ]),
    `## Asset Requests`,
    ...(report.asset_requests.length ? report.asset_requests.map((path) => `- ${path}`) : ["- none"]),
    ``,
  ].join("\n")
}

function humanSectionName(value: string): string {
  const normalized = value.replace(/[-_.]+/g, " ").trim()
  if (/office map/i.test(normalized)) return "AI Office Map"
  if (/installation|sprint/i.test(normalized)) return "AI Office Installation"
  if (/office ops|managed operation/i.test(normalized)) return "AI Office Ops"
  if (/hero/i.test(normalized)) return "Hero"
  return normalized.replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function fixtureSections(): SectionEvidence[] {
  return [
    {
      section_name: "Hero",
      text: "Stanley Systems removes workflow bottlenecks with automation so your team can optimize operations.",
      visual_summary: "clean headline only",
    },
    {
      section_name: "Hero",
      text: "Current task-approved outcome headline.",
      visual_summary: "brand pill above headline, bottom support box, extra filler badge",
    },
    {
      section_name: "Workflow proof",
      text: "Show one approved office action moving from source to result.",
      visual_summary: "four generic icon cards in an icon grid instead of one image-led workflow mechanism",
      generated_asset_status: "approved",
    },
    {
      section_name: "Office continuity",
      text: "Show office work continuing through one clear visual path.",
      visual_summary: "orbiting pill checklist assembly with no true path or meaningful sequence",
      generated_asset_status: "approved",
    },
    {
      section_name: "Final CTA",
      asset_strategy_hint: "code_only",
      code_only_justification: "Simple CTA section with current task-approved copy and no process visual need.",
      text: "Current task-approved CTA.",
      visual_summary: "plain typography, CTA, and restrained layout",
    },
    {
      section_name: "Workflow proof",
      text: "A real office action should move from source through approval to a proof receipt.",
      visual_summary: "required image-led workflow visual route unavailable",
      generated_asset_status: "missing",
      generated_asset_route_available: false,
    },
  ]
}
