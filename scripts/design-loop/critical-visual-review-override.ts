import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { pathToFileURL } from "node:url"
import { loadManifest, main, SOFTWARE_FACTORY_ROOT, writeJson } from "./_lib.ts"

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  await runCriticalVisualReviewOverrideCli()
}

export async function runCriticalVisualReviewOverrideCli(): Promise<void> {
  await main(async (args) => {
    const runId = String(args.run_id || "")
    const sectionId = String(args.section_id || "")
    const reason = String(args.reason || "").trim()
    const operator = String(args.operator || "")
    if (!runId) throw new Error("--run-id is required.")
    if (!sectionId) throw new Error("--section-id is required.")
    if (operator !== "Jaden") throw new Error("--operator Jaden is required. Critical Visual Review override is Jaden-only.")
    if (!reason) throw new Error("--reason is required and must be non-empty.")

    const manifest = loadManifest(runId)
    const reportPath = join(manifest.run_dir, "verification", "critical-visual-review-report.json")
    if (!existsSync(reportPath)) throw new Error(`Critical Visual Review report not found: ${reportPath}`)
    const report = JSON.parse(readFileSync(reportPath, "utf8"))
    const section = Array.isArray(report.sections)
      ? report.sections.find((item: { section_id?: string }) => item.section_id === sectionId)
      : null
    if (!section) throw new Error(`Section ${sectionId} not found in ${reportPath}`)

    const artifact = {
      status: "override_logged",
      does_not_auto_deploy: true,
      section_id: sectionId,
      run_id: manifest.run_id,
      operator,
      reviewer_decision: section.final_decision || "unknown",
      original_blockers: Array.isArray(section.blockers) ? section.blockers : [],
      override_reason: reason,
      timestamp: new Date().toISOString(),
      source_report: reportPath,
    }
    const runArtifactPath = join(manifest.run_dir, "verification", `critical-visual-review-override.${sectionId}.json`)
    const factoryArtifactPath = join(
      SOFTWARE_FACTORY_ROOT,
      "artifacts",
      "critical-visual-review",
      manifest.run_id,
      `override.${sectionId}.json`,
    )
    writeJson(runArtifactPath, artifact)
    writeJson(factoryArtifactPath, artifact)
    console.log(JSON.stringify({ status: "override_logged", run_artifact_path: runArtifactPath, factory_artifact_path: factoryArtifactPath }, null, 2))
  })
}
