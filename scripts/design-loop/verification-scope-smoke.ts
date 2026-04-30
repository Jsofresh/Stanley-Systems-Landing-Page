import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { pathToFileURL } from "node:url"
import { DESIGN_AUDIT_ROOT, SITE_REPO, writeJson } from "./_lib.ts"
import { NON_RETRYABLE_FAILURE_CLASSES, shouldRetryCodexPatch } from "./retry-policy.ts"

const knownRunId = "20260429T211436Z-3xfco"

await runVerifier(["--run-id", knownRunId, "--dry-run", "true", "--skip-build", "true"])
const knownReportPath = join(DESIGN_AUDIT_ROOT, "runs", knownRunId, "verification", "verification-report.dry-run.json")
const knownReport = JSON.parse(readFileSync(knownReportPath, "utf8"))

assert(knownReport.changed_files_checked.includes("components/hero-section.tsx"), "hero section should be in-scope")
assert(knownReport.changed_files_checked.includes("components/pricing-section.tsx"), "pricing section should be in-scope")
assert(
  knownReport.out_of_scope_findings.some((finding: { path: string }) => finding.path === "app/api/hcp/completed-job/README.md"),
  "HCP README banned term should be reported out-of-scope",
)
assert(
  knownReport.out_of_scope_findings.some((finding: { path: string }) => finding.path === "app/api/hcp/completed-job/route.ts"),
  "HCP route banned term should be reported out-of-scope",
)
assert(knownReport.banned_copy_check === "pass", "out-of-scope banned terms must not fail banned copy check")
assert(knownReport.final_gate_decision === "verified_pending_deploy", "out-of-scope banned terms must not block final gate")

const syntheticRunId = `verification-scope-smoke-${Date.now()}`
const syntheticRunDir = join(DESIGN_AUDIT_ROOT, "runs", syntheticRunId)
mkdirSync(join(syntheticRunDir, "dom", "before"), { recursive: true })
mkdirSync(join(syntheticRunDir, "verification"), { recursive: true })
mkdirSync(join(syntheticRunDir, "build-reports"), { recursive: true })
mkdirSync(join(syntheticRunDir, "patch-specs"), { recursive: true })

const syntheticDomPath = join(syntheticRunDir, "dom", "before", "home.hero.json")
writeFileSync(
  syntheticDomPath,
  JSON.stringify({ section_id: "home.hero", text: "Workflow Audit copy with AI-powered public language." }, null, 2),
)
writeJson(join(syntheticRunDir, "section-registry.json"), {
  run_id: syntheticRunId,
  sections: [{ section_id: "home.hero", text_path: syntheticDomPath }],
})
writeJson(join(syntheticRunDir, "manifest.json"), {
  run_id: syntheticRunId,
  status: "built_pending_verification",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  scope: "homepage",
  auto_deploy: false,
  max_sections: 1,
  max_iterations: 1,
  site_repo: SITE_REPO,
  software_factory_root: DESIGN_AUDIT_ROOT.replace(/\/design-audit$/, ""),
  stanley_os_root: "/home/jaden/.openclaw/workspace/project/stanley-os",
  run_dir: syntheticRunDir,
  reports: [],
})

await runVerifier(["--run-id", syntheticRunId, "--dry-run", "true", "--skip-build", "true"])
const syntheticReportPath = join(syntheticRunDir, "verification", "verification-report.dry-run.json")
const syntheticReport = JSON.parse(readFileSync(syntheticReportPath, "utf8"))
assert(syntheticReport.banned_copy_check === "fail", "in-scope banned term should fail banned copy")
assert(syntheticReport.failure_class === "copy_guardrail_failed", "in-scope banned term should classify as copy_guardrail_failed")
for (const failureClass of NON_RETRYABLE_FAILURE_CLASSES) {
  assert(
    !shouldRetryCodexPatch({ failureClass, finalGateDecision: "blocked", reason: "fixture", inScopeFindings: [] }),
    `${failureClass} must not retry Codex patches`,
  )
}
assert(
  shouldRetryCodexPatch({
    failureClass: "copy_guardrail_failed",
    finalGateDecision: "blocked",
    reason: "fixture",
    inScopeFindings: [{ path: "components/example.tsx" }],
  }),
  "in-scope copy guardrail failures should remain retryable",
)

console.log(
  JSON.stringify(
    {
      status: "pass",
      known_report_path: knownReportPath,
      synthetic_report_path: syntheticReportPath,
      ignored_examples: knownReport.out_of_scope_findings
        .filter((finding: { path: string }) => finding.path.startsWith("app/api/hcp/"))
        .map((finding: { path: string; term: string }) => ({ path: finding.path, term: finding.term })),
      controller_non_retryable_classes: NON_RETRYABLE_FAILURE_CLASSES,
    },
    null,
    2,
  ),
)

async function runVerifier(args: string[]) {
  const scriptPath = join(SITE_REPO, "scripts", "design-loop", "run-verification.ts")
  const originalArgv = process.argv
  process.argv = [process.execPath, scriptPath, ...args]
  await import(`${pathToFileURL(scriptPath).href}?smoke=${Date.now()}-${Math.random()}`)
  process.argv = originalArgv
}

function assert(value: unknown, message: string) {
  if (!value) throw new Error(message)
}
