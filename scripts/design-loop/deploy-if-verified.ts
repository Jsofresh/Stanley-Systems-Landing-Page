import { join } from "node:path"
import { loadManifest, main, runCmd, toBool, updateStatus, writeJson, writeText } from "./_lib.ts"

await main(async (args) => {
  const manifest = loadManifest(String(args.run_id || ""))
  const autoDeploy = toBool(args.auto_deploy ?? manifest.auto_deploy, false)
  if (manifest.status !== "verified_pending_deploy") {
    const report = { run_id: manifest.run_id, status: "blocked", reason: `status_${manifest.status}_is_not_verified_pending_deploy` }
    writeJson(join(manifest.run_dir, "build-reports", "deploy-report.json"), report)
    return
  }
  if (!autoDeploy) {
    const report = { run_id: manifest.run_id, status: "skipped", reason: "auto_deploy_false" }
    writeJson(join(manifest.run_dir, "build-reports", "deploy-report.json"), report)
    manifest.deploy_result = report
    return
  }

  updateStatus(manifest, "deploying")
  const build = runCmd("npm", ["run", "build"], manifest.site_repo)
  writeText(join(manifest.run_dir, "build-reports", "deploy-build.stdout.txt"), build.stdout)
  writeText(join(manifest.run_dir, "build-reports", "deploy-build.stderr.txt"), build.stderr)
  if (build.status !== 0) {
    const report = { run_id: manifest.run_id, status: "blocked", failed_step: "npm run build", stderr: build.stderr }
    writeJson(join(manifest.run_dir, "build-reports", "deploy-report.json"), report)
    manifest.deploy_result = report
    updateStatus(manifest, "blocked")
    return
  }

  const restart = runCmd("pm2", ["restart", "stanley-landing", "--update-env"], manifest.site_repo)
  const report = {
    run_id: manifest.run_id,
    status: restart.status === 0 ? "pm2_restarted" : "blocked",
    commands: ["npm run build", "pm2 restart stanley-landing --update-env"],
    restart_stdout: restart.stdout,
    restart_stderr: restart.stderr,
  }
  writeJson(join(manifest.run_dir, "build-reports", "deploy-report.json"), report)
  manifest.deploy_result = report
  updateStatus(manifest, restart.status === 0 ? "live_verification_running" : "blocked")
})
