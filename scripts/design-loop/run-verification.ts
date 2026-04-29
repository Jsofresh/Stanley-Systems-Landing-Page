import { join } from "node:path"
import { git, loadManifest, main, protectedPathCheck, runCmd, updateStatus, writeJson, writeText } from "./_lib.ts"

await main(async (args) => {
  const manifest = loadManifest(String(args.run_id || ""))
  updateStatus(manifest, "verification_running")

  const build = runCmd("npm", ["run", "build"], manifest.site_repo)
  const diffCheck = git(["diff", "--check"])
  const protectedCheck = protectedPathCheck()
  const bannedCopy = git(["grep", "-nE", "AI-powered|AI first|Stanley H|Hermes|Codex|OpenClaw|n8n|QBO API|HCP API", "--", "app", "components"])
  const requiredCopy = git(["grep", "-nE", "Workflow Audit|Cashflow Control System|Customer Revenue System", "--", "app", "components"])

  writeText(join(manifest.run_dir, "build-reports", "verification-build.stdout.txt"), build.stdout)
  writeText(join(manifest.run_dir, "build-reports", "verification-build.stderr.txt"), build.stderr)

  const pass =
    build.status === 0 &&
    diffCheck.status === 0 &&
    protectedCheck.status === "pass" &&
    bannedCopy.status !== 0 &&
    requiredCopy.status === 0

  const report = {
    run_id: manifest.run_id,
    status: pass ? "pass" : "blocked",
    build: build.status === 0 ? "pass" : "fail",
    diff_check: diffCheck.status === 0 ? "pass" : "fail",
    protected_path_check: protectedCheck,
    banned_copy_check: bannedCopy.status !== 0 ? "pass" : "fail",
    required_copy_check: requiredCopy.status === 0 ? "pass" : "fail",
    next_status: pass ? "verified_pending_deploy" : "blocked",
    checked_at: new Date().toISOString(),
  }
  const reportPath = join(manifest.run_dir, "verification", "verification-report.json")
  writeJson(reportPath, report)
  manifest.reports.push(reportPath)
  updateStatus(manifest, pass ? "verified_pending_deploy" : "blocked")
})
