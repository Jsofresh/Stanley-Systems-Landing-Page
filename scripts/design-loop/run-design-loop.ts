import { existsSync } from "node:fs"
import { join } from "node:path"
import { pathToFileURL } from "node:url"
import { createManifest, loadManifest, main, toBool, updateStatus, writeJson, writeText } from "./_lib.ts"

async function runStep(script: string, args: string[]) {
  const originalArgv = process.argv
  const originalExitCode = process.exitCode
  const scriptPath = join(process.cwd(), "scripts", "design-loop", script)
  let stdout = ""
  let stderr = ""
  const originalLog = console.log
  const originalError = console.error

  process.argv = [process.execPath, scriptPath, ...args]
  process.exitCode = 0
  console.log = (...values: unknown[]) => {
    stdout += `${values.map(String).join(" ")}\n`
    originalLog(...values)
  }
  console.error = (...values: unknown[]) => {
    stderr += `${values.map(String).join(" ")}\n`
    originalError(...values)
  }

  try {
    await import(`${pathToFileURL(scriptPath).href}?run=${Date.now()}-${Math.random()}`)
  } catch (error) {
    stderr += `${error instanceof Error ? error.message : String(error)}\n`
    process.exitCode = 1
  } finally {
    process.argv = originalArgv
    console.log = originalLog
    console.error = originalError
  }

  const status = Number(process.exitCode || 0)
  process.exitCode = originalExitCode
  return {
    command: `in-process ${script} ${args.join(" ")}`,
    status,
    stdout,
    stderr,
  }
}

function saveStep(manifestRunDir: string, name: string, result: Awaited<ReturnType<typeof runStep>>) {
  const path = join(manifestRunDir, "build-reports", `${name}.json`)
  writeJson(path, {
    command: result.command,
    status: result.status,
    stdout_tail: result.stdout.slice(-4000),
    stderr_tail: result.stderr.slice(-4000),
  })
  writeText(path.replace(".json", ".stdout.txt"), result.stdout)
  writeText(path.replace(".json", ".stderr.txt"), result.stderr)
}

await main(async (args) => {
  const dryRun = !toBool(args.auto_deploy, false)
  let manifest = createManifest(args)
  const baseArgs = ["--run-id", manifest.run_id]
  const urlArgs = args.url ? ["--url", String(args.url)] : []

  const steps: Array<[string, string, string[]]> = [
    ["init-backup", "init-backup.ts", [...baseArgs, "--dry-run", String(dryRun)]],
    ["capture-before", "capture-sections.ts", [...baseArgs, "--phase", "before", ...urlArgs]],
    ["make-prompts", "make-audit-prompts.ts", baseArgs],
    ["hermes-audit", "run-hermes-audit.ts", baseArgs],
    ["higgsfield-assets", "run-higgsfield-assets.ts", baseArgs],
    ["ingest-assets", "ingest-assets.ts", baseArgs],
    ["dispatch-codex", "dispatch-codex-patch.ts", baseArgs],
  ]

  for (const [name, script, stepArgs] of steps) {
    const result = await runStep(script, stepArgs)
    saveStep(manifest.run_dir, name, result)
    manifest = loadManifest(manifest.run_id)
    const bridgeBlocked = manifest.status === "blocked_bridge_missing"
    const backupBlocked = manifest.status === "blocked_bridge_or_backup"
    if (backupBlocked && !dryRun) {
      updateStatus(manifest, "blocked_bridge_or_backup")
      break
    }
    if (bridgeBlocked && name === "hermes-audit") {
      continue
    }
    if (bridgeBlocked && name === "higgsfield-assets") {
      continue
    }
    if (bridgeBlocked && name === "dispatch-codex") {
      break
    }
    if (result.status !== 0 && !dryRun) {
      updateStatus(manifest, "blocked")
      break
    }
  }

  manifest = loadManifest(manifest.run_id)

  if (!process.env.CODEX_PATCH_COMMAND) {
    writeJson(join(manifest.run_dir, "verification", "dry-run-verification-placeholder.json"), {
      run_id: manifest.run_id,
      status: "not_run",
      reason: "CODEX_PATCH_COMMAND missing, no patch applied.",
    })
    ensureEmptyAfterFolders(manifest.run_dir)
    await runStep("log-to-stanley-os.ts", baseArgs)
    return
  }

  for (let attempt = 1; attempt <= manifest.max_iterations; attempt += 1) {
    saveStep(manifest.run_dir, `codex-attempt-${attempt}`, await runStep("apply-patch-or-run-codex.ts", baseArgs))
    saveStep(manifest.run_dir, `capture-after-${attempt}`, await runStep("capture-sections.ts", [...baseArgs, "--phase", "after", ...urlArgs]))
    saveStep(manifest.run_dir, `verify-${attempt}`, await runStep("run-verification.ts", baseArgs))
    manifest = loadManifest(manifest.run_id)
    if (manifest.status === "verified_pending_deploy") break
    if (attempt < manifest.max_iterations) updateStatus(manifest, `needs_patch_2`)
  }

  manifest = loadManifest(manifest.run_id)
  if (manifest.status !== "verified_pending_deploy") {
    await runStep("log-to-stanley-os.ts", baseArgs)
    return
  }

  saveStep(manifest.run_dir, "deploy", await runStep("deploy-if-verified.ts", [...baseArgs, "--auto-deploy", String(toBool(args.auto_deploy, false))]))
  manifest = loadManifest(manifest.run_id)
  if (manifest.status === "live_verification_running") {
    saveStep(manifest.run_dir, "live-smoke", await runStep("live-smoke-check.ts", baseArgs))
    manifest = loadManifest(manifest.run_id)
    if (manifest.status === "blocked" && toBool(args.rollback_on_live_smoke_failure, true)) {
      saveStep(manifest.run_dir, "rollback", await runStep("rollback-site.ts", baseArgs))
    }
  }
  saveStep(manifest.run_dir, "log-to-stanley-os", await runStep("log-to-stanley-os.ts", baseArgs))
})

function ensureEmptyAfterFolders(runDir: string) {
  for (const dir of ["screenshots/after/desktop", "screenshots/after/mobile", "verification"]) {
    if (!existsSync(join(runDir, dir))) {
      writeJson(join(runDir, dir, ".keep.json"), { created: true })
    }
  }
}
