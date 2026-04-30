import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { git, loadManifest, main, protectedPathCheck, runCmd, SITE_REPO, toBool, updateStatus, writeJson, writeText } from "./_lib.ts"
import { runVisualAssetGate, writeGateReports, type SectionEvidence } from "./anti-ai-slop-gate.ts"
import { runCriticalVisualReviewGate } from "./critical-visual-review-gate.ts"

type FailureClass =
  | "design_verification_failed"
  | "copy_guardrail_failed"
  | "offer_guardrail_failed"
  | "build_failed"
  | "protected_surface_touched"
  | "infrastructure_verification_bug"
  | "bridge_missing"
  | "capture_failed"
  | "live_smoke_failed"
  | "anti_ai_slop_failed"
  | "critical_visual_review_failed"
  | "blocked_missing_required_asset"
  | "downgraded_visual_strategy"
  | null

type Finding = {
  term: string
  path: string
  line: number
  source: "changed_file" | "dom_file" | "explicit_section_file" | "ignored_file"
  in_scope: boolean
  reason: string
  excerpt: string
}

const BANNED_TERMS = ["AI-powered", "AI first", "Stanley H", "Hermes", "Codex", "OpenClaw", "n8n", "QBO API", "HCP API"]
const APPROVED_OFFERS = ["Workflow Audit", "Cashflow Control System", "Customer Revenue System"]

await main(async (args) => {
  const manifest = loadManifest(String(args.run_id || ""))
  const dryRun = toBool(args.dry_run, false)
  const skipBuild = toBool(args.skip_build, false)
  if (!dryRun) updateStatus(manifest, "verification_running")

  const build = skipBuild ? { status: 0, stdout: "skipped by --skip-build", stderr: "", command: "npm run build" } : runCmd("npm", ["run", "build"], manifest.site_repo)
  const diffCheck = git(["diff", "--check"])
  const protectedCheck = protectedPathCheck()
  const scope = collectVerificationScope(manifest)
  const visualAssetGate = runVisualAssetGate(manifest, scope.visualAssetSections)
  writeGateReports(manifest, visualAssetGate)
  const criticalVisualReview = runCriticalVisualReviewGate(manifest, { dryRun, updateManifest: false })

  writeText(join(manifest.run_dir, "build-reports", dryRun ? "verification-build.dry-run.stdout.txt" : "verification-build.stdout.txt"), build.stdout)
  writeText(join(manifest.run_dir, "build-reports", dryRun ? "verification-build.dry-run.stderr.txt" : "verification-build.stderr.txt"), build.stderr)

  const inScopeFindings = [
    ...scanTextFiles(scope.changedFilesChecked, "changed_file", true, "changed public-facing file"),
    ...scanTextFiles(scope.domFilesChecked, "dom_file", true, "captured audited section DOM"),
    ...scanTextFiles(scope.explicitSectionFilesChecked, "explicit_section_file", true, "explicit patch spec file"),
  ]
  const outOfScopeFindings = scanTextFiles(scope.ignoredFiles, "ignored_file", false, "ignored by verification scope")
  const bannedTermsFound = [...inScopeFindings, ...outOfScopeFindings]
  const inScopeText = readCombinedText([...scope.changedFilesChecked, ...scope.domFilesChecked, ...scope.explicitSectionFilesChecked])
  const requiredCopyPass = APPROVED_OFFERS.some((offer) => inScopeText.includes(offer))

  const captureFailure =
    scope.captureProblem ||
    (scope.expectedAuditedSections && scope.domFilesChecked.length === 0
      ? "section registry exists but no captured DOM files were readable"
      : "")

  const failureClass = classifyFailure({
    buildPass: build.status === 0,
    diffPass: diffCheck.status === 0,
    protectedPass: protectedCheck.status === "pass",
    requiredCopyPass,
    inScopeBannedCount: inScopeFindings.length,
    captureFailure,
    visualAssetGateStatus: visualAssetGate.status,
    visualAssetNextStatus: visualAssetGate.next_status,
    criticalVisualReviewStatus: criticalVisualReview.status,
    criticalVisualReviewNextStatus: criticalVisualReview.next_status,
  })
  const finalGateDecision = failureClass ? "blocked" : "verified_pending_deploy"
  const reasonForBlock = reasonForFailure(failureClass, captureFailure)

  const report = {
    run_id: manifest.run_id,
    status: failureClass ? "blocked" : "pass",
    failure_class: failureClass,
    build: build.status === 0 ? "pass" : "fail",
    diff_check: diffCheck.status === 0 ? "pass" : "fail",
    protected_path_check: protectedCheck,
    required_copy_check: requiredCopyPass ? "pass" : "fail",
    banned_copy_check: inScopeFindings.length === 0 ? "pass" : "fail",
    visual_asset_strategy_gate: visualAssetGate.status,
    visual_asset_strategy_next_status: visualAssetGate.next_status,
    visual_asset_strategy_report: visualAssetGate.report_paths.run_json,
    anti_ai_slop_sections: visualAssetGate.sections,
    critical_visual_review_gate: criticalVisualReview.status,
    critical_visual_review_next_status: criticalVisualReview.next_status,
    critical_visual_review_report: criticalVisualReview.report_paths.run_json,
    critical_visual_review_aggregate_decision: criticalVisualReview.aggregate_decision,
    critical_visual_review_sections: criticalVisualReview.sections,
    changed_files_checked: scope.changedFilesChecked,
    dom_files_checked: scope.domFilesChecked,
    explicit_section_files_checked: scope.explicitSectionFilesChecked,
    ignored_files: scope.ignoredFiles,
    banned_terms_found: bannedTermsFound,
    in_scope_findings: inScopeFindings,
    out_of_scope_findings: outOfScopeFindings,
    final_gate_decision: finalGateDecision,
    reason_for_block_if_blocked: reasonForBlock,
    blocker_reason: reasonForBlock,
    checked_at: new Date().toISOString(),
  }
  const reportPath = join(manifest.run_dir, "verification", dryRun ? "verification-report.dry-run.json" : "verification-report.json")
  writeJson(reportPath, report)
  manifest.reports.push(reportPath)
  if (!dryRun) {
    updateStatus(
      manifest,
      failureClass === "anti_ai_slop_failed" ||
        failureClass === "downgraded_visual_strategy"
        ? visualAssetGate.next_status
        : failureClass === "blocked_missing_required_asset"
          ? criticalVisualReview.status === "fail"
            ? criticalVisualReview.next_status
            : visualAssetGate.next_status
        : failureClass === "critical_visual_review_failed"
          ? criticalVisualReview.next_status
        : failureClass
          ? "blocked"
          : "verified_pending_deploy",
    )
  }
})

function collectVerificationScope(manifest: ReturnType<typeof loadManifest>) {
  const changedFiles = getChangedFiles(manifest)
  const explicitFiles = getExplicitPatchFiles(manifest.run_dir)
  const registryPath = join(manifest.run_dir, "section-registry.json")
  const registry = existsSync(registryPath) ? JSON.parse(readFileSync(registryPath, "utf8")) : null
  const registryDomFiles = registry?.sections
    ?.map((section: { text_path?: string }) => section.text_path)
    ?.filter((path: string | undefined): path is string => Boolean(path && existsSync(path))) ?? []
  const fallbackDomFiles = registryDomFiles.length ? [] : findCapturedDomFiles(manifest.run_dir)
  const domFiles = registryDomFiles.length ? registryDomFiles : fallbackDomFiles
  const captureProblem = !registry && domFiles.length === 0 ? `missing section registry at ${registryPath}` : ""
  const expectedAuditedSections = Boolean(registry?.sections?.length || domFiles.length)

  const changedPublic = changedFiles.filter(isPublicFacingWebsiteFile)
  const changedIgnored = changedFiles.filter((file) => !isPublicFacingWebsiteFile(file))
  const explicitPublic = explicitFiles.filter(isPublicFacingWebsiteFile)
  const explicitIgnored = explicitFiles.filter((file) => !isPublicFacingWebsiteFile(file))
  const ignored = new Set([...changedIgnored, ...explicitIgnored, ...findSafeIgnoredFilesWithBannedTerms()])

  return {
    changedFilesChecked: unique(changedPublic),
    domFilesChecked: unique(domFiles),
    explicitSectionFilesChecked: unique(explicitPublic),
    ignoredFiles: unique([...ignored]),
    visualAssetSections: collectVisualAssetSections(registry, domFiles),
    captureProblem,
    expectedAuditedSections,
  }
}

function collectVisualAssetSections(registry: { sections?: Array<Record<string, unknown>> } | null, domFiles: string[]): SectionEvidence[] {
  const entries = registry?.sections?.length
    ? registry.sections
    : domFiles.map((path) => ({ section_id: path.split("/").pop()?.replace(/\.json$/, ""), text_path: path }))
  return entries.map((entry) => {
    const textPath = typeof entry.text_path === "string" ? entry.text_path : ""
    const payload = textPath && existsSync(textPath) ? JSON.parse(readFileSync(textPath, "utf8")) : {}
    return {
      section_name: humanSectionName(String(entry.section_id || entry.purpose || "Section")),
      section_id: String(entry.section_id || ""),
      purpose: String(entry.purpose || ""),
      offer: String(entry.offer || ""),
      text: payload.text || String(entry.dom_preview || ""),
      html: payload.html || "",
      visual_summary: payload.visual_summary || "",
      generated_asset_status: payload.generated_asset_status as SectionEvidence["generated_asset_status"],
      generated_asset_path: payload.generated_asset_path,
      generated_asset_route_available: payload.generated_asset_route_available,
      asset_strategy_hint: payload.asset_strategy_hint as SectionEvidence["asset_strategy_hint"],
      code_only_justification: payload.code_only_justification,
    }
  })
}

function findCapturedDomFiles(runDir: string): string[] {
  const roots = [join(runDir, "dom", "after"), join(runDir, "dom", "before")]
  for (const root of roots) {
    if (!existsSync(root)) continue
    const files = readdirSync(root)
      .filter((file) => file.endsWith(".json"))
      .map((file) => join(root, file))
    if (files.length) return files
  }
  return []
}

function getChangedFiles(manifest: ReturnType<typeof loadManifest>): string[] {
  const base = manifest.pre_run_commit
  const result = base ? git(["diff", "--name-only", base]) : git(["diff", "--name-only", "HEAD"])
  if (result.status !== 0) return []
  return result.stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
}

function getExplicitPatchFiles(runDir: string): string[] {
  const dir = join(runDir, "patch-specs")
  if (!existsSync(dir)) return []
  const files = readdirSync(dir).filter((file) => file.endsWith(".md"))
  const matches = new Set<string>()
  const pattern = /\b((?:app|components|public)\/[A-Za-z0-9._@/[\\\]-]+\.(?:tsx?|jsx?|mdx?|css|json|png|jpe?g|webp|avif|svg))\b/g
  for (const file of files) {
    const text = readFileSync(join(dir, file), "utf8")
    for (const match of text.matchAll(pattern)) {
      matches.add(match[1].replace(/\\/g, "/"))
    }
  }
  return [...matches]
}

function isPublicFacingWebsiteFile(path: string): boolean {
  const normalized = path.replace(/\\/g, "/")
  if (isIgnoredPath(normalized)) return false
  if (normalized.startsWith("components/")) return /\.(tsx|jsx|ts|js|mdx|css)$/.test(normalized)
  if (normalized.startsWith("app/")) {
    const basename = normalized.split("/").at(-1) || ""
    return /^(page|layout|template|error|not-found)\.(tsx|jsx|ts|js|mdx)$/.test(basename)
  }
  return false
}

function isIgnoredPath(path: string): boolean {
  const normalized = path.replace(/\\/g, "/")
  const basename = normalized.split("/").at(-1) || ""
  if (normalized.startsWith("app/api/")) return true
  if (normalized.startsWith("scripts/")) return true
  if (normalized.startsWith("server/")) return true
  if (normalized.startsWith("workflows/")) return true
  if (normalized.startsWith("n8n/")) return true
  if (normalized.startsWith("qbo/")) return true
  if (normalized.startsWith("hcp/")) return true
  if (normalized.startsWith("telegram/")) return true
  if (basename === "route.ts" || basename === "route.tsx") return true
  if (/readme\.md$/i.test(normalized)) return true
  if (/\.env($|\.)/.test(normalized)) return true
  if (/secret|credential|token/i.test(normalized)) return true
  if (/ecosystem\.config\./.test(normalized)) return true
  if (/\.(config|conf)\.(js|ts|mjs|cjs|json)$/.test(normalized)) return true
  return false
}

function findSafeIgnoredFilesWithBannedTerms(): string[] {
  const candidates = ["app/api", "components", "scripts"]
  const found: string[] = []
  for (const root of candidates) {
    const absolute = join(SITE_REPO, root)
    if (!existsSync(absolute)) continue
    for (const file of walk(absolute)) {
      const rel = relative(SITE_REPO, file)
      if (!isIgnoredPath(rel) && rel.startsWith("components/")) continue
      if (!isTextFile(rel)) continue
      const text = readFileSync(file, "utf8")
      if (BANNED_TERMS.some((term) => text.includes(term))) found.push(rel)
    }
  }
  return found
}

function walk(root: string): string[] {
  const stat = statSync(root)
  if (stat.isFile()) return [root]
  const out: string[] = []
  for (const entry of readdirSync(root)) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git") continue
    const full = join(root, entry)
    const nextStat = statSync(full)
    if (nextStat.isDirectory()) out.push(...walk(full))
    if (nextStat.isFile()) out.push(full)
  }
  return out
}

function scanTextFiles(paths: string[], source: Finding["source"], inScope: boolean, reason: string): Finding[] {
  const findings: Finding[] = []
  for (const path of paths) {
    if (!isTextFile(path) || !existsPath(path)) continue
    const text = readFileSync(resolvePath(path), "utf8")
    text.split(/\r?\n/).forEach((line, index) => {
      for (const term of BANNED_TERMS) {
        if (line.includes(term)) {
          findings.push({
            term,
            path,
            line: index + 1,
            source,
            in_scope: inScope,
            reason,
            excerpt: line.trim().slice(0, 220),
          })
        }
      }
    })
  }
  return findings
}

function readCombinedText(paths: string[]): string {
  return paths
    .filter((path) => isTextFile(path) && existsPath(path))
    .map((path) => readFileSync(resolvePath(path), "utf8"))
    .join("\n")
}

function existsPath(path: string): boolean {
  return existsSync(resolvePath(path))
}

function resolvePath(path: string): string {
  return path.startsWith("/") ? path : join(SITE_REPO, path)
}

function isTextFile(path: string): boolean {
  return /\.(tsx?|jsx?|mdx?|md|json|txt|css|html)$/.test(path)
}

function classifyFailure(input: {
  buildPass: boolean
  diffPass: boolean
  protectedPass: boolean
  requiredCopyPass: boolean
  inScopeBannedCount: number
  captureFailure: string
  visualAssetGateStatus: "pass" | "fail"
  visualAssetNextStatus: string
  criticalVisualReviewStatus: "pass" | "fail"
  criticalVisualReviewNextStatus: string
}): FailureClass {
  if (!input.buildPass) return "build_failed"
  if (!input.diffPass) return "infrastructure_verification_bug"
  if (!input.protectedPass) return "protected_surface_touched"
  if (input.captureFailure) return "capture_failed"
  if (input.inScopeBannedCount > 0) return "copy_guardrail_failed"
  if (!input.requiredCopyPass) return "offer_guardrail_failed"
  if (input.visualAssetGateStatus === "fail") {
    if (input.visualAssetNextStatus === "blocked_missing_required_asset") return "blocked_missing_required_asset"
    if (input.visualAssetNextStatus === "downgraded_visual_strategy") return "downgraded_visual_strategy"
    return "anti_ai_slop_failed"
  }
  if (input.criticalVisualReviewStatus === "fail") {
    if (input.criticalVisualReviewNextStatus === "blocked_missing_required_asset") return "blocked_missing_required_asset"
    return "critical_visual_review_failed"
  }
  return null
}

function reasonForFailure(failureClass: FailureClass, captureFailure: string): string {
  if (!failureClass) return ""
  if (failureClass === "capture_failed") return captureFailure || "Captured section evidence is missing."
  if (failureClass === "copy_guardrail_failed") return "In-scope public website copy contains banned internal or AI-first terms."
  if (failureClass === "offer_guardrail_failed") return "In-scope evidence does not contain an approved Stanley Systems offer name."
  if (failureClass === "anti_ai_slop_failed") return "The visual asset strategy and anti-AI-slop gate found blocker section patterns."
  if (failureClass === "critical_visual_review_failed") return "The Critical Visual Review gate found a blocker section decision."
  if (failureClass === "blocked_missing_required_asset") return "A section requires a generated/custom visual asset that is missing or rejected."
  if (failureClass === "downgraded_visual_strategy") return "The generated image route is unavailable and the downgrade is not approved for deploy."
  if (failureClass === "build_failed") return "npm run build failed."
  if (failureClass === "protected_surface_touched") return "The patch touched protected paths."
  if (failureClass === "infrastructure_verification_bug") return "Verification infrastructure failed before a design verdict could be trusted."
  return failureClass
}

function humanSectionName(value: string): string {
  const normalized = value.replace(/[-_.]+/g, " ").trim()
  if (/cashflow/i.test(normalized)) return "Cashflow Control System"
  if (/customer revenue/i.test(normalized)) return "Customer Revenue System"
  if (/hero/i.test(normalized)) return "Hero"
  return normalized.replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function unique(values: string[]): string[] {
  return [...new Set(values)].sort()
}
