import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { loadManifest, main, runCmd, updateStatus, writeBlockedBridgeReport, writeJson, writeText } from "./_lib.ts"

await main(async (args) => {
  const manifest = loadManifest(String(args.run_id || ""))
  updateStatus(manifest, "audit_running")
  const bridgeCommand = process.env.HERMES_DESIGN_AUDIT_COMMAND
  const promptDir = join(manifest.run_dir, "prompts")
  const promptFiles = existsSync(promptDir) ? readdirSync(promptDir).filter((file) => file.endsWith(".audit.md")) : []

  if (!bridgeCommand) {
    writeBlockedBridgeReport(manifest, "hermes", {
      missing: "HERMES_DESIGN_AUDIT_COMMAND",
      expected_command: "An executable command that accepts a prompt file path and writes structured audit JSON.",
      verification_command: "HERMES_DESIGN_AUDIT_COMMAND='your-hermes-command' npm run design-loop:audit -- --run-id <run-id>",
      fallback_manual_command:
        "Run each prompt in software-factory/design-audit/runs/<run-id>/prompts through Hermes and save JSON into audits/.",
    })
    updateStatus(manifest, "blocked_bridge_missing")
    return
  }

  const auditPaths: string[] = []
  for (const file of promptFiles) {
    const promptPath = join(promptDir, file)
    const outputPath = join(manifest.run_dir, "audits", file.replace(".audit.md", ".audit.json"))
    const result = runCmd(bridgeCommand, [promptPath], process.cwd())
    writeText(join(manifest.run_dir, "audits", `${file}.stdout.txt`), result.stdout)
    writeText(join(manifest.run_dir, "audits", `${file}.stderr.txt`), result.stderr)
    if (result.status !== 0) {
      writeJson(outputPath, {
        status: "blocked",
        bridge: "hermes",
        command: result.command,
        stderr: result.stderr,
        prompt_path: promptPath,
      })
    } else {
      const stdout = result.stdout.trim()
      writeText(outputPath, stdout || JSON.stringify({ status: "blocked", reason: "empty_hermes_response", prompt_path: promptPath }, null, 2))
    }
    auditPaths.push(outputPath)
  }

  const needsAssets = auditPaths.some((path) => readFileSync(path, "utf8").toLowerCase().includes("asset"))
  writeJson(join(manifest.run_dir, "audits", "audit-manifest.json"), {
    run_id: manifest.run_id,
    audit_paths: auditPaths,
    needs_assets: needsAssets,
  })
  updateStatus(manifest, needsAssets ? "asset_direction_needed" : "patch_spec_ready")
})
