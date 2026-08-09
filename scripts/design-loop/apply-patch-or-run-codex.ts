import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { loadManifest, main, runCmd, updateStatus, writeBlockedBridgeReport, writeJson, writeText } from "./_lib.ts"

await main(async (args) => {
  const manifest = loadManifest(String(args.run_id || ""))
  const bridgeCommand = process.env.CODEX_PATCH_COMMAND
  const queuePath = join(manifest.run_dir, "patch-specs", "codex-build-queue.json")
  if (!bridgeCommand) {
    writeBlockedBridgeReport(manifest, "codex", {
      missing: "CODEX_PATCH_COMMAND",
      expected_command: "Command that applies a queued patch spec in the website repo.",
      verification_command: "CODEX_PATCH_COMMAND='your-codex-command' npm run design-loop:apply-codex -- --run-id <run-id>",
      queue_path: queuePath,
    })
    updateStatus(manifest, "blocked_bridge_missing")
    return
  }

  const queue = existsSync(queuePath) ? JSON.parse(readFileSync(queuePath, "utf8")) : { specs: [] }
  const reports = []
  for (const item of queue.specs) {
    if (item.attempts >= manifest.max_iterations) continue
    const result = runCmd(bridgeCommand, [item.path], manifest.site_repo)
    const out = join(manifest.run_dir, "build-reports", `${item.path.split("/").pop()}.codex-run.json`)
    writeJson(out, { command: result.command, status: result.status, stdout: result.stdout, stderr: result.stderr })
    writeText(out.replace(".json", ".stdout.txt"), result.stdout)
    reports.push(out)
    item.attempts += 1
    item.status = result.status === 0 ? "built_pending_verification" : "needs_patch"
  }
  writeJson(queuePath, queue)
  manifest.reports.push(...reports)
  updateStatus(manifest, "built_pending_verification")
})
