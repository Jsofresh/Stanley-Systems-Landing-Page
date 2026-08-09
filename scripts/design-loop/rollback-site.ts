import { join } from "node:path"
import { git, loadManifest, main, runCmd, updateStatus, writeJson, writeText } from "./_lib.ts"

await main(async (args) => {
  const manifest = loadManifest(String(args.run_id || ""))
  const target = String(args.target || manifest.pre_run_commit || manifest.tag || "")
  if (!target) {
    const report = { run_id: manifest.run_id, status: "blocked", reason: "missing_pre_run_commit_or_tag" }
    writeJson(join(manifest.run_dir, "rollback", "rollback-report.json"), report)
    return
  }

  const reset = git(["reset", "--hard", target])
  const build = runCmd("npm", ["run", "build"], manifest.site_repo)
  const restart = runCmd("pm2", ["restart", "stanley-landing", "--update-env"], manifest.site_repo)
  writeText(join(manifest.run_dir, "rollback", "build.stdout.txt"), build.stdout)
  writeText(join(manifest.run_dir, "rollback", "build.stderr.txt"), build.stderr)
  const report = {
    run_id: manifest.run_id,
    status: reset.status === 0 && build.status === 0 && restart.status === 0 ? "rolled_back" : "blocked",
    rollback_target: target,
    commands: [`git reset --hard ${target}`, "npm run build", "pm2 restart stanley-landing --update-env"],
    reset_status: reset.status,
    build_status: build.status,
    restart_status: restart.status,
    restart_stderr: restart.stderr,
  }
  writeJson(join(manifest.run_dir, "rollback", "rollback-report.json"), report)
  manifest.rollback = report
  updateStatus(manifest, report.status === "rolled_back" ? "rolled_back" : "blocked")
})
