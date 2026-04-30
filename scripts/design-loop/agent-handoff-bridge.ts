import { spawnSync } from "node:child_process"
import {
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { basename, dirname, join, resolve } from "node:path"
import { main, slugify, toBool, writeJson, writeText } from "./_lib.ts"

const BRIDGE_VERSION = "agent-handoff-bridge-v1"
const SITE_REPO = resolve(process.env.AGENT_HANDOFF_SITE_REPO || "/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page")
const TASK_ROOT = resolve(process.env.AGENT_HANDOFF_TASK_ROOT || "/home/jaden/.openclaw/workspace/project/software-factory/tasks")
const SOFTWARE_FACTORY_ROOT = resolve(process.env.AGENT_HANDOFF_SOFTWARE_FACTORY_ROOT || "/home/jaden/.openclaw/workspace/project/software-factory")
const STANLEY_OS_ROOT = resolve(process.env.AGENT_HANDOFF_STANLEY_OS_ROOT || "/home/jaden/.openclaw/workspace/project/stanley-os")
const ARTIFACT_ROOT = join(SOFTWARE_FACTORY_ROOT, "artifacts", "agent-handoff-bridge")
const RUNS_ROOT = join(ARTIFACT_ROOT, "runs")
const LOCK_PATH = join(ARTIFACT_ROOT, "agent-handoff-bridge.lock")
const CODEX_COMMAND = process.env.AGENT_HANDOFF_CODEX_COMMAND || "codex"
const HERMES_COMMAND = process.env.AGENT_HANDOFF_HERMES_COMMAND || "hermes"

const AGENT_OUTCOME_STATUSES = new Set([
  "built_pending_verification",
  "verified",
  "blocked",
  "needs_patch_2",
  "verified_pending_deploy",
  "rejected",
  "shipped",
  "blocked_codex_bridge_missing",
  "blocked_hermes_bridge_missing",
  "blocked_codex_report_missing",
  "blocked_codex_execution_failed",
  "blocked_hermes_report_missing",
  "blocked_hermes_execution_failed",
])

const HERMES_OUTCOME_STATUSES = new Set(["verified", "blocked", "needs_patch_2", "verified_pending_deploy"])
const HERMES_BRIDGE_BLOCKER_STATUSES = new Set([
  "blocked_hermes_bridge_missing",
  "blocked_hermes_report_missing",
  "blocked_hermes_execution_failed",
])

type TaskStatus =
  | "ready_for_codex"
  | "codex_running"
  | "built_pending_verification"
  | "verification_running"
  | "verified"
  | "blocked"
  | "needs_patch_2"
  | "verified_pending_deploy"
  | "blocked_codex_bridge_missing"
  | "blocked_hermes_bridge_missing"
  | "blocked_codex_report_missing"
  | "blocked_codex_execution_failed"
  | "blocked_hermes_report_missing"
  | "blocked_hermes_execution_failed"
  | string

type TaskInfo = {
  path: string
  status: TaskStatus
  mtimeMs: number
}

type CheckResult = {
  ok: boolean
  label: string
  command: string
  status: number | null
  stdout: string
  stderr: string
  error: string
}

type BridgeResult = {
  selected_task: string
  status_before: string
  action: string
  dry_run: boolean
  run_dir: string
  stanley_os_note?: string
  command_invoked?: string
  status_after?: string
  exit_code?: number | null
  codex?: Record<string, unknown>
  hermes?: Record<string, unknown>
  missing?: string
  setup?: string
  next?: string
}

type EvidenceResult = {
  ok: boolean
  kind: "codex" | "hermes"
  accepted: string[]
  missing: string[]
  report_paths: string[]
  explicit_blocker: boolean
  indicated_status?: string
}

await main(async (args) => {
  const once = toBool(args.once, false)
  const watch = toBool(args.watch, false)
  const dryRun = toBool(args.dry_run, false)
  const intervalMs = Number(args.interval_ms || 10000)

  if (!once && !watch) {
    throw new Error("Pass --once or --watch. Example: npm run design-loop:handoff-bridge -- --once")
  }

  if (watch) {
    while (true) {
      await runOnce(dryRun)
      await new Promise((resolveDone) => setTimeout(resolveDone, intervalMs))
    }
  }

  await runOnce(dryRun)
})

async function runOnce(dryRun: boolean): Promise<void> {
  mkdirSync(ARTIFACT_ROOT, { recursive: true })
  const lockFd = acquireLock(dryRun)
  try {
    const tasks = scanTasks()
    const selected = selectTask(tasks)
    if (!selected) {
      const runDir = makeRunDir("no-task")
      const result: BridgeResult = {
        selected_task: "",
        status_before: "none",
        action: "no_dispatchable_task",
        dry_run: dryRun,
        run_dir: runDir,
        status_after: "none",
        next: "No ready_for_codex, needs_patch_2, or built_pending_verification task found.",
      }
      writeJson(join(runDir, "bridge-result.json"), result)
      printCompact(result)
      return
    }

    const runDir = makeRunDir(taskSlug(selected.path))
    const bridgeAction = actionForStatus(selected.status)
    const result: BridgeResult = {
      selected_task: selected.path,
      status_before: selected.status,
      action: bridgeAction,
      dry_run: dryRun,
      run_dir: runDir,
    }
    writeJson(join(runDir, "run-start.json"), {
      bridge_version: BRIDGE_VERSION,
      task_path: selected.path,
      task_status_before: selected.status,
      bridge_action: bridgeAction,
      dry_run: dryRun,
      started_at: new Date().toISOString(),
    })

    if (selected.status === "ready_for_codex" || selected.status === "needs_patch_2") {
      await handleCodex(selected, runDir, dryRun, result)
    } else if (selected.status === "built_pending_verification") {
      await handleHermes(selected, runDir, dryRun, result)
    } else {
      result.action = "skip_terminal_status"
      result.status_after = selected.status
      result.next = "Selected task is not dispatchable."
    }

    result.stanley_os_note = writeStanleyOsNote(result)
    writeJson(join(runDir, "bridge-result.json"), result)
    printCompact(result)
  } finally {
    releaseLock(lockFd, dryRun)
  }
}

function scanTasks(): TaskInfo[] {
  if (!existsSync(TASK_ROOT)) return []
  return readdirSync(TASK_ROOT)
    .filter((file) => file.endsWith(".task.md"))
    .map((file) => {
      const path = join(TASK_ROOT, file)
      const text = readFileSync(path, "utf8")
      return {
        path,
        status: parseFirstStatus(text),
        mtimeMs: statSync(path).mtimeMs,
      }
    })
}

function selectTask(tasks: TaskInfo[]): TaskInfo | undefined {
  const codexDispatchable = newest(tasks.filter((task) => task.status === "ready_for_codex" || task.status === "needs_patch_2"))
  if (codexDispatchable) return codexDispatchable
  return newest(tasks.filter((task) => task.status === "built_pending_verification"))
}

function newest(tasks: TaskInfo[]): TaskInfo | undefined {
  return tasks.sort((a, b) => b.mtimeMs - a.mtimeMs || a.path.localeCompare(b.path))[0]
}

function parseFirstStatus(text: string): TaskStatus {
  const match = text.match(/^Status:\s*(\S+)/m)
  return match?.[1] || "unknown"
}

function actionForStatus(status: string): string {
  if (status === "ready_for_codex" || status === "needs_patch_2") return "dispatch_codex"
  if (status === "built_pending_verification") return "dispatch_hermes_verification"
  if (
    [
      "verified",
      "blocked",
      "verified_pending_deploy",
      "blocked_codex_bridge_missing",
      "blocked_hermes_bridge_missing",
      "blocked_codex_report_missing",
      "blocked_codex_execution_failed",
      "blocked_hermes_report_missing",
      "blocked_hermes_execution_failed",
    ].includes(status)
  ) {
    return "skip_terminal_status"
  }
  return "unknown_status_skipped"
}

async function handleCodex(task: TaskInfo, runDir: string, dryRun: boolean, result: BridgeResult): Promise<void> {
  const checks = checkCodex()
  result.codex = summarizeChecks(checks)
  writeJson(join(runDir, "codex-availability.json"), checks)

  const prompt = buildCodexPrompt(task.path)
  writeText(join(runDir, "codex-prompt.md"), prompt)
  const command = `codex exec --full-auto --cd ${shellQuote(SITE_REPO)} ${shellQuote("<prompt>")}`
  writeText(join(runDir, "codex-command.txt"), `${command}\n`)
  result.command_invoked = command

  if (dryRun) {
    result.action = "dry_run_dispatch_codex"
    result.status_after = task.status
    result.next = "Dry run only. Re-run without --dry-run to invoke Codex or mark an exact bridge blocker."
    writeText(join(runDir, "codex-stdout.txt"), "dry-run: Codex was not invoked.\n")
    writeText(join(runDir, "codex-stderr.txt"), "")
    writeJson(join(runDir, "codex-result.json"), {
      exit_code: null,
      started_at: null,
      finished_at: new Date().toISOString(),
      task_path: task.path,
      resulting_status: task.status,
      dry_run: true,
    })
    return
  }

  const failed = checks.find((check) => !check.ok)
  if (failed) {
    markBridgeMissing(task.path, "blocked_codex_bridge_missing", codexBlocker(failed, command))
    result.action = "blocked_missing_codex_bridge"
    result.status_after = readTaskStatus(task.path)
    result.missing = `${failed.command} failed`
    result.setup = codexSetup()
    result.next = "Configure Codex CLI non-interactive auth, then set the task back to ready_for_codex or needs_patch_2."
    writeText(join(runDir, "codex-stdout.txt"), "")
    writeText(join(runDir, "codex-stderr.txt"), failed.stderr || failed.error || failed.stdout)
    writeJson(join(runDir, "codex-result.json"), {
      exit_code: failed.status,
      started_at: null,
      finished_at: new Date().toISOString(),
      task_path: task.path,
      resulting_status: result.status_after,
      failed_check: failed.label,
    })
    return
  }

  replaceFirstStatus(task.path, "codex_running")
  appendBridgeRun(task.path, "codex_running", runDir, command)
  const startedAt = new Date().toISOString()
  const proc = spawnSync(CODEX_COMMAND, ["exec", "--full-auto", "--cd", SITE_REPO, prompt], {
    cwd: SITE_REPO,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  })
  const finishedAt = new Date().toISOString()
  writeText(join(runDir, "codex-stdout.txt"), proc.stdout || "")
  writeText(join(runDir, "codex-stderr.txt"), proc.stderr || proc.error?.message || "")
  const statusAfter = readTaskStatus(task.path)
  let exitCode = proc.status

  if (proc.status === null) {
    const blocker = invocationBlocker("Codex", "blocked_codex_bridge_missing", runDir, command, proc.error?.message || "codex exec did not start", proc.stdout || "", proc.stderr || "")
    markBridgeMissing(task.path, "blocked_codex_bridge_missing", blocker)
    result.action = "blocked_missing_codex_bridge"
    result.status_after = readTaskStatus(task.path)
    result.exit_code = proc.status
    result.missing = proc.error?.message || "codex exec did not start"
    result.setup = codexSetup()
    result.next = "Configure Codex CLI invocation access, then set the task back to ready_for_codex or needs_patch_2."
    writeJson(join(runDir, "codex-result.json"), {
      exit_code: proc.status,
      started_at: startedAt,
      finished_at: finishedAt,
      task_path: task.path,
      resulting_status: result.status_after,
      invocation_error: proc.error?.message || "spawn returned null status",
    })
    return
  }

  if (exitCode !== 0) {
    if (shouldPreserveCodexOutcome(statusAfter)) {
      result.action = "codex_exited_nonzero_preserved_task_status"
      result.status_after = statusAfter
      result.next = "Codex exited non-zero, but the task already has an agent outcome status. Preserved task status."
    } else {
      const blocker = executionBlocker("Codex", "blocked_codex_execution_failed", runDir, exitCode, proc.stdout || "", proc.stderr || proc.error?.message || "")
      markTaskBlocked(task.path, "blocked_codex_execution_failed", blocker)
      result.action = "blocked_codex_execution_failed"
      result.status_after = readTaskStatus(task.path)
      result.missing = "codex exec exited non-zero"
      result.next = "Review Codex stdout/stderr artifacts and repair the task before retrying."
    }
  } else {
    const currentStatus = readTaskStatus(task.path)
    const evidence = collectCodexEvidence(task.path, runDir, proc.stdout || "", proc.stderr || "")
    writeJson(join(runDir, "codex-evidence.json"), evidence)
    if (shouldPreserveCodexOutcome(currentStatus)) {
      result.action = "codex_exited_zero_preserved_task_status"
      result.status_after = currentStatus
      result.next = "Codex exited zero and the task already has a valid outcome status. Preserved task status."
    } else if (evidence.ok) {
      replaceFirstStatus(task.path, "built_pending_verification")
      appendBridgeRun(task.path, "built_pending_verification", runDir, renderEvidenceDetail("Codex evidence accepted", evidence))
      result.action = "codex_exited_zero_controller_marked_built_pending_verification"
      result.status_after = readTaskStatus(task.path)
      result.next = "Run bridge again to trigger Hermes verification."
    } else {
      const blocker = reportMissingBlocker("Codex", "blocked_codex_report_missing", runDir, evidence)
      markTaskBlocked(task.path, "blocked_codex_report_missing", blocker)
      result.action = "blocked_codex_report_missing"
      result.status_after = readTaskStatus(task.path)
      result.missing = evidence.missing.join("; ")
      result.next = "Add or identify Codex build/report evidence, then set the task back to ready_for_codex or needs_patch_2."
    }
  }

  result.exit_code = exitCode
  result.status_after = result.status_after || readTaskStatus(task.path)
  result.next = result.next || (result.status_after === "built_pending_verification" ? "Run bridge again to trigger Hermes verification." : "Review task status and bridge artifacts.")
  writeJson(join(runDir, "codex-result.json"), {
    exit_code: exitCode,
    started_at: startedAt,
    finished_at: finishedAt,
    task_path: task.path,
    resulting_status: result.status_after,
  })
}

async function handleHermes(task: TaskInfo, runDir: string, dryRun: boolean, result: BridgeResult): Promise<void> {
  const checks = checkHermes()
  result.hermes = summarizeChecks(checks)
  writeJson(join(runDir, "hermes-availability.json"), checks)

  const prompt = buildHermesPrompt(task.path)
  writeText(join(runDir, "hermes-verification-prompt.md"), prompt)
  const command = `hermes chat -Q --source agent-handoff-bridge -t terminal,file,vision,skills,todo -q ${shellQuote("<prompt>")}`
  writeText(join(runDir, "hermes-command.txt"), `${command}\n`)
  result.command_invoked = command

  if (dryRun) {
    result.action = "dry_run_dispatch_hermes_verification"
    result.status_after = task.status
    result.next = "Dry run only. Re-run without --dry-run to invoke Hermes or mark an exact bridge blocker."
    writeText(join(runDir, "hermes-stdout.txt"), "dry-run: Hermes was not invoked.\n")
    writeText(join(runDir, "hermes-stderr.txt"), "")
    writeJson(join(runDir, "hermes-result.json"), {
      exit_code: null,
      started_at: null,
      finished_at: new Date().toISOString(),
      task_path: task.path,
      resulting_status: task.status,
      dry_run: true,
    })
    return
  }

  const failed = checks.find((check) => !check.ok)
  if (failed) {
    markBridgeMissing(task.path, "blocked_hermes_bridge_missing", hermesBlocker(failed, command))
    result.action = "blocked_missing_hermes_bridge"
    result.status_after = readTaskStatus(task.path)
    result.missing = `${failed.command} failed`
    result.setup = hermesSetup()
    result.next = "Configure Hermes non-interactive chat access, then set the task back to built_pending_verification."
    writeText(join(runDir, "hermes-stdout.txt"), "")
    writeText(join(runDir, "hermes-stderr.txt"), failed.stderr || failed.error || failed.stdout)
    writeJson(join(runDir, "hermes-result.json"), {
      exit_code: failed.status,
      started_at: null,
      finished_at: new Date().toISOString(),
      task_path: task.path,
      resulting_status: result.status_after,
      failed_check: failed.label,
    })
    return
  }

  replaceFirstStatus(task.path, "verification_running")
  appendBridgeRun(task.path, "verification_running", runDir, command)
  const startedAt = new Date().toISOString()
  const proc = spawnSync(HERMES_COMMAND, ["chat", "-Q", "--source", "agent-handoff-bridge", "-t", "terminal,file,vision,skills,todo", "-q", prompt], {
    cwd: SITE_REPO,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  })
  const finishedAt = new Date().toISOString()
  writeText(join(runDir, "hermes-stdout.txt"), proc.stdout || "")
  writeText(join(runDir, "hermes-stderr.txt"), proc.stderr || proc.error?.message || "")
  let exitCode = proc.status
  const statusAfter = readTaskStatus(task.path)

  if (proc.status === null) {
    const blocker = invocationBlocker("Hermes", "blocked_hermes_bridge_missing", runDir, command, proc.error?.message || "hermes chat did not start", proc.stdout || "", proc.stderr || "")
    markBridgeMissing(task.path, "blocked_hermes_bridge_missing", blocker)
    result.action = "blocked_missing_hermes_bridge"
    result.status_after = readTaskStatus(task.path)
    result.exit_code = proc.status
    result.missing = proc.error?.message || "hermes chat did not start"
    result.setup = hermesSetup()
    result.next = "Configure Hermes invocation access, then set the task back to built_pending_verification."
    writeJson(join(runDir, "hermes-result.json"), {
      exit_code: proc.status,
      started_at: startedAt,
      finished_at: finishedAt,
      task_path: task.path,
      resulting_status: result.status_after,
      invocation_error: proc.error?.message || "spawn returned null status",
    })
    return
  }

  if (exitCode !== 0) {
    if (shouldPreserveHermesOutcome(statusAfter)) {
      result.action = "hermes_exited_nonzero_preserved_task_status"
      result.status_after = statusAfter
      result.next = "Hermes exited non-zero, but the task already has an agent outcome status. Preserved task status."
    } else {
      const blocker = executionBlocker("Hermes", "blocked_hermes_execution_failed", runDir, exitCode, proc.stdout || "", proc.stderr || proc.error?.message || "")
      markTaskBlocked(task.path, "blocked_hermes_execution_failed", blocker)
      result.action = "blocked_hermes_execution_failed"
      result.status_after = readTaskStatus(task.path)
      result.missing = "hermes chat exited non-zero"
      result.next = "Review Hermes stdout/stderr artifacts and repair the task before retrying verification."
    }
  } else {
    const currentStatus = readTaskStatus(task.path)
    const evidence = collectHermesEvidence(task.path, runDir, proc.stdout || "", proc.stderr || "")
    writeJson(join(runDir, "hermes-evidence.json"), evidence)
    if (shouldPreserveHermesOutcome(currentStatus)) {
      result.action = "hermes_exited_zero_preserved_task_status"
      result.status_after = currentStatus
      result.next = "Hermes exited zero and the task already has a valid outcome status. Preserved task status."
    } else if (evidence.ok) {
      const nextStatus = evidence.indicated_status && HERMES_OUTCOME_STATUSES.has(evidence.indicated_status) ? evidence.indicated_status : "verified"
      replaceFirstStatus(task.path, nextStatus)
      appendBridgeRun(task.path, nextStatus, runDir, renderEvidenceDetail("Hermes evidence accepted", evidence))
      result.action = "hermes_exited_zero_controller_marked_verified"
      result.status_after = readTaskStatus(task.path)
      result.next = nextStatus === "verified_pending_deploy" ? "Deploy gate is ready. Bridge stops without deploying." : "Review task status and bridge artifacts."
    } else {
      const blocker = reportMissingBlocker("Hermes", "blocked_hermes_report_missing", runDir, evidence)
      markTaskBlocked(task.path, "blocked_hermes_report_missing", blocker)
      result.action = "blocked_hermes_report_missing"
      result.status_after = readTaskStatus(task.path)
      result.missing = evidence.missing.join("; ")
      result.next = "Add or identify Hermes verification evidence, then set the task back to built_pending_verification."
    }
  }

  result.exit_code = exitCode
  result.status_after = result.status_after || readTaskStatus(task.path)
  result.next = result.next || (result.status_after === "verified_pending_deploy" ? "Deploy gate is ready. Bridge stops without deploying." : "Review task status and bridge artifacts.")
  writeJson(join(runDir, "hermes-result.json"), {
    exit_code: exitCode,
    started_at: startedAt,
    finished_at: finishedAt,
    task_path: task.path,
    resulting_status: result.status_after,
  })
}

function checkCodex(): CheckResult[] {
  return [
    runCheck("command -v codex", "bash", ["-lc", "command -v codex"]),
    runCheck("codex --version", CODEX_COMMAND, ["--version"]),
    runCheck("codex exec --help", CODEX_COMMAND, ["exec", "--help"]),
  ]
}

function checkHermes(): CheckResult[] {
  return [
    runCheck("command -v hermes", "bash", ["-lc", "command -v hermes"]),
    runCheck("hermes --version", HERMES_COMMAND, ["--version"]),
    runCheck("hermes chat --help", HERMES_COMMAND, ["chat", "--help"]),
  ]
}

function runCheck(label: string, command: string, args: string[]): CheckResult {
  const result = spawnSync(command, args, {
    cwd: SITE_REPO,
    encoding: "utf8",
    maxBuffer: 4 * 1024 * 1024,
  })
  return {
    ok: (result.status ?? 1) === 0,
    label,
    command: [command, ...args].join(" "),
    status: result.status,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
    error: result.error?.message || "",
  }
}

function summarizeChecks(checks: CheckResult[]): Record<string, unknown> {
  const version = checks.find((check) => check.label.includes("--version"))?.stdout.trim()
  return {
    available: checks.every((check) => check.ok),
    version: version || "unknown",
    checks: checks.map((check) => ({
      label: check.label,
      ok: check.ok,
      status: check.status,
      stdout_first_line: check.stdout.split(/\r?\n/).find(Boolean) || "",
      stderr_first_line: check.stderr.split(/\r?\n/).find(Boolean) || check.error,
    })),
  }
}

function buildCodexPrompt(taskPath: string): string {
  const task = readFileSync(taskPath, "utf8")
  return `You are Codex working in ${SITE_REPO}.

Build the Software Factory task below end to end.

Hard boundaries:
- Do not deploy.
- Do not restart PM2.
- Do not run live smoke.
- Do not touch secrets, credentials, n8n, QBO, HCP, Telegram config, OpenClaw config, live workflow files, or production service config.
- Do not commit.
- Do not mark verified. Hermes verifies.
- Set the task Status to built_pending_verification only after implementation and local verification are complete.

Required final report fields:
- files changed
- commands run
- dry-run or verification result
- bridge or implementation status
- blocked setup requirements if any
- remaining risks

Task path: ${taskPath}

${task}
`
}

function buildHermesPrompt(taskPath: string): string {
  const task = readFileSync(taskPath, "utf8")
  return `You are Hermes verifying a Stanley Systems Software Factory task.

Verification goal:
- Verify the task implementation with local/non-production evidence.
- Do not deploy unless the task explicitly authorizes deploy.
- Do not restart PM2 or run live smoke unless explicitly authorized.
- Do not touch secrets, credentials, n8n, QBO, HCP, Telegram config, OpenClaw config, or live workflow files.

Based on evidence, update the task Status to one of:
- verified
- blocked
- needs_patch_2
- verified_pending_deploy

Write evidence/report paths and a Stanley OS note.

Task path: ${taskPath}

${task}
`
}

function readTaskStatus(path: string): string {
  return parseFirstStatus(readFileSync(path, "utf8"))
}

function shouldPreserveCodexOutcome(status: string): boolean {
  return status !== "codex_running" && AGENT_OUTCOME_STATUSES.has(status)
}

function shouldPreserveHermesOutcome(status: string): boolean {
  return HERMES_OUTCOME_STATUSES.has(status) || HERMES_BRIDGE_BLOCKER_STATUSES.has(status)
}

function collectCodexEvidence(taskPath: string, runDir: string, stdout: string, stderr: string): EvidenceResult {
  const combined = `${stdout}\n${stderr}`
  const taskText = readFileSync(taskPath, "utf8")
  const reportPaths = existingReportPaths(`${combined}\n${taskText}`, runDir)
  const currentStatus = readTaskStatus(taskPath)
  const accepted: string[] = []
  const explicitBlocker = hasExplicitBlocker(combined)
  const hasPassEvidence = hasCodexCommandPassEvidence(combined)
  const finalReportFields = codexFinalReportFields(combined)
  if (hasPassEvidence) accepted.push("explicit_command_pass_evidence")
  if (finalReportFields.length >= 4) accepted.push(`structured_final_report_fields:${finalReportFields.join(",")}`)
  if (reportPaths.length) accepted.push("existing_report_or_artifact_path")
  if (AGENT_OUTCOME_STATUSES.has(currentStatus) && currentStatus !== "codex_running") accepted.push("valid_agent_outcome_status")
  const hasStrongEvidence = reportPaths.length > 0 || (hasPassEvidence && finalReportFields.length >= 4) || (AGENT_OUTCOME_STATUSES.has(currentStatus) && currentStatus !== "codex_running")
  const missing = hasStrongEvidence
    ? []
    : [
        hasPassEvidence ? "Codex stdout had command pass evidence but lacked a structured final report with required fields" : "Codex stdout lacked explicit command pass or exit evidence",
        finalReportFields.length >= 4
          ? "Codex stdout had structured final report fields but lacked explicit command pass or exit evidence"
          : `Codex stdout lacked enough structured final report fields; found ${finalReportFields.length}/4 minimum`,
        "No existing artifact/report path was named in Codex stdout or task markdown",
        "Task status remained codex_running without a valid final agent outcome status",
      ]
  if (explicitBlocker) missing.push("Codex stdout/stderr contained an explicit blocked/failure status")
  return {
    ok: hasStrongEvidence && !explicitBlocker,
    kind: "codex",
    accepted,
    missing,
    report_paths: reportPaths,
    explicit_blocker: explicitBlocker,
  }
}

function hasCodexCommandPassEvidence(text: string): boolean {
  return /\b(exit(?:ed)?\s*(?:code\s*)?0|status\s*0|passed|pass|success|succeeded|build\s+(?:passed|succeeded)|verification\s+(?:passed|succeeded))\b/i.test(text)
}

function codexFinalReportFields(text: string): string[] {
  const fields = [
    ["files changed", /(?:^|\n)\s*(?:[-*]\s*)?(?:files changed|changed files)\s*:/i],
    ["commands run", /(?:^|\n)\s*(?:[-*]\s*)?(?:commands run|command\(s\) run)\s*:/i],
    ["verification result", /(?:^|\n)\s*(?:[-*]\s*)?(?:dry-run or verification result|verification result|dry run or verification result)\s*:/i],
    ["implementation status", /(?:^|\n)\s*(?:[-*]\s*)?(?:bridge or implementation status|implementation status|bridge status)\s*:/i],
    ["blocked setup requirements", /(?:^|\n)\s*(?:[-*]\s*)?(?:blocked setup requirements|blocked setup|setup requirements)\s*:/i],
    ["remaining risks", /(?:^|\n)\s*(?:[-*]\s*)?(?:remaining risks|risks)\s*:/i],
  ] as const
  return fields.filter(([, pattern]) => pattern.test(text)).map(([field]) => field)
}

function collectHermesEvidence(taskPath: string, runDir: string, stdout: string, stderr: string): EvidenceResult {
  const combined = `${stdout}\n${stderr}`
  const taskText = readFileSync(taskPath, "utf8")
  const reportPaths = existingReportPaths(`${combined}\n${taskText}`, runDir)
  const accepted: string[] = []
  const indicatedStatus = indicatedHermesStatus(combined)
  if (/\b(verified|passed|pass|Verification Result|verification report|verified_pending_deploy)\b/i.test(combined)) accepted.push("stdout_verification_marker")
  if (reportPaths.length) accepted.push("existing_report_or_artifact_path")
  if (HERMES_OUTCOME_STATUSES.has(readTaskStatus(taskPath)) && readTaskStatus(taskPath) !== "verification_running") accepted.push("valid_verification_outcome_status")
  return {
    ok: accepted.length > 0,
    kind: "hermes",
    accepted,
    missing: accepted.length
      ? []
      : [
          "Hermes stdout did not contain verified/pass/verification result markers",
          "No existing verification report or artifact path was named in Hermes stdout or task markdown",
          "Task status remained verification_running without a valid verification outcome status",
        ],
    report_paths: reportPaths,
    explicit_blocker: false,
    indicated_status: indicatedStatus,
  }
}

function existingReportPaths(text: string, runDir: string): string[] {
  const candidates = new Set<string>()
  for (const match of text.matchAll(/(?:^|[\s(["'`])((?:\/[^\s)"'`]+|(?:\.{1,2}\/)?[^\s)"'`]+)\.(?:json|md|txt|log))(?:$|[\s)\]"'`,])/gm)) {
    const raw = match[1].replace(/[),.;:]+$/, "")
    if (!/(report|artifact|evidence|verification|build|result|stdout|stderr|run)/i.test(raw)) continue
    candidates.add(raw.startsWith("/") ? raw : resolve(SITE_REPO, raw))
  }
  return [...candidates].filter((path) => {
    try {
      return existsSync(path) && statSync(path).isFile() && statSync(path).size > 0
    } catch {
      return false
    }
  })
}

function hasExplicitBlocker(text: string): boolean {
  return /(?:^|\n)[^\S\r\n]*(?:Status|Final status|Implementation Status|Bridge or implementation status|status_after):[^\S\r\n]*(?:blocked(?:_[a-z0-9_]*)?|rejected)\b/i.test(text)
}

function indicatedHermesStatus(text: string): string | undefined {
  const matches = [...text.matchAll(/\b(verified_pending_deploy|verified|needs_patch_2|blocked)\b/g)].map((match) => match[1])
  return matches.find((status) => HERMES_OUTCOME_STATUSES.has(status))
}

function replaceFirstStatus(path: string, status: string): void {
  const text = readFileSync(path, "utf8")
  const next = text.replace(/^Status:\s*\S+/m, `Status: ${status}`)
  writeFileSync(path, next)
}

function appendBridgeRun(path: string, status: string, runDir: string, detail: string): void {
  const text = readFileSync(path, "utf8")
  writeFileSync(
    path,
    `${text.trimEnd()}

## Bridge run

- timestamp: ${new Date().toISOString()}
- bridge: ${BRIDGE_VERSION}
- status: ${status}
- run_dir: ${runDir}
- detail: ${detail}
`,
  )
}

function markBridgeMissing(path: string, status: "blocked_codex_bridge_missing" | "blocked_hermes_bridge_missing", blocker: string): void {
  markTaskBlocked(path, status, blocker)
}

function markTaskBlocked(path: string, status: string, blocker: string): void {
  replaceFirstStatus(path, status)
  const text = removeSection(readFileSync(path, "utf8"), "Bridge blocker")
  writeFileSync(path, `${text.trimEnd()}\n\n${blocker}\n`)
}

function reportMissingBlocker(agent: string, status: string, runDir: string, evidence: EvidenceResult): string {
  return `## Bridge blocker

- timestamp: ${new Date().toISOString()}
- bridge: ${BRIDGE_VERSION}
- status: ${status}
- agent: ${agent}
- run_dir: ${runDir}
- missing evidence: ${evidence.missing.join("; ")}
- accepted evidence: ${evidence.accepted.length ? evidence.accepted.join("; ") : "none"}
- report paths found: ${evidence.report_paths.length ? evidence.report_paths.join(", ") : "none"}
`
}

function executionBlocker(agent: string, status: string, runDir: string, exitCode: number, stdout: string, stderr: string): string {
  return `## Bridge blocker

- timestamp: ${new Date().toISOString()}
- bridge: ${BRIDGE_VERSION}
- status: ${status}
- agent: ${agent}
- run_dir: ${runDir}
- exit code: ${exitCode}
- stdout artifact: ${join(runDir, agent.toLowerCase() === "codex" ? "codex-stdout.txt" : "hermes-stdout.txt")}
- stderr artifact: ${join(runDir, agent.toLowerCase() === "codex" ? "codex-stderr.txt" : "hermes-stderr.txt")}
- stderr first line: ${(stderr.split(/\r?\n/).find(Boolean) || "none").trim()}
- stdout first line: ${(stdout.split(/\r?\n/).find(Boolean) || "none").trim()}
`
}

function invocationBlocker(agent: string, status: string, runDir: string, command: string, error: string, stdout: string, stderr: string): string {
  return `## Bridge blocker

- timestamp: ${new Date().toISOString()}
- bridge: ${BRIDGE_VERSION}
- status: ${status}
- agent: ${agent}
- run_dir: ${runDir}
- invocation command: ${command}
- invocation error: ${error.trim() || "unknown invocation error"}
- stdout artifact: ${join(runDir, agent.toLowerCase() === "codex" ? "codex-stdout.txt" : "hermes-stdout.txt")}
- stderr artifact: ${join(runDir, agent.toLowerCase() === "codex" ? "codex-stderr.txt" : "hermes-stderr.txt")}
- stderr first line: ${(stderr.split(/\r?\n/).find(Boolean) || "none").trim()}
- stdout first line: ${(stdout.split(/\r?\n/).find(Boolean) || "none").trim()}
`
}

function renderEvidenceDetail(prefix: string, evidence: EvidenceResult): string {
  return `${prefix}: accepted=${evidence.accepted.join(", ") || "none"}; report_paths=${evidence.report_paths.join(", ") || "none"}`
}

function removeSection(text: string, heading: string): string {
  const pattern = new RegExp(`\\n?## ${escapeRegExp(heading)}\\n[\\s\\S]*?(?=\\n## |$)`, "m")
  return text.replace(pattern, "")
}

function codexBlocker(failed: CheckResult, command: string): string {
  return `## Bridge blocker

- timestamp: ${new Date().toISOString()}
- bridge: ${BRIDGE_VERSION}
- failed check: ${failed.label}
- exact command attempted: ${failed.command}
- bridge command: ${command}
- exit code: ${failed.status ?? "none"}
- exact error text: ${(failed.stderr || failed.error || failed.stdout || "no output").trim()}
- setup needed: ${codexSetup()}
- manual fallback command: codex exec --full-auto --cd ${SITE_REPO} "<task markdown content>"
`
}

function hermesBlocker(failed: CheckResult, command: string): string {
  return `## Bridge blocker

- timestamp: ${new Date().toISOString()}
- bridge: ${BRIDGE_VERSION}
- failed check: ${failed.label}
- exact command attempted: ${failed.command}
- bridge command: ${command}
- exit code: ${failed.status ?? "none"}
- exact error text: ${(failed.stderr || failed.error || failed.stdout || "no output").trim()}
- setup needed: ${hermesSetup()}
- manual fallback command: hermes chat -Q --source agent-handoff-bridge -t terminal,file,vision,skills,todo -q "<verification prompt>"
`
}

function codexSetup(): string {
  return 'Install/configure Codex CLI for user jaden; verify with: codex exec -s read-only --ephemeral --skip-git-repo-check "Say READY"'
}

function hermesSetup(): string {
  return 'Install/configure Hermes CLI non-interactive chat for user jaden; verify with: hermes chat -Q --source agent-handoff-bridge -t terminal,file,vision,skills,todo -q "Say READY"'
}

function writeStanleyOsNote(result: BridgeResult): string {
  const date = new Date().toISOString().slice(0, 10)
  const dir = join(STANLEY_OS_ROOT, "ops", "agent-handoffs", date)
  const notePath = join(dir, `${timestampSlug()}-${taskSlug(result.selected_task || "no-task")}.md`)
  mkdirSync(dirname(notePath), { recursive: true })
  writeFileSync(
    notePath,
    `# Agent Handoff

- timestamp: ${new Date().toISOString()}
- bridge version: ${BRIDGE_VERSION}
- task path: ${result.selected_task || "none"}
- task status before: ${result.status_before}
- attempted action: ${result.action}
- dry run: ${result.dry_run}
- command availability results: ${JSON.stringify(result.codex || result.hermes || {})}
- command invoked or blocker command: ${result.command_invoked || result.missing || "none"}
- stdout/stderr artifact paths: ${result.run_dir}
- task status after: ${result.status_after || "unknown"}
- next recommended step: ${result.next || "Review bridge output."}
`,
  )
  return notePath
}

function makeRunDir(slug: string): string {
  const runDir = join(RUNS_ROOT, `${timestampSlug()}-${slug}`)
  mkdirSync(runDir, { recursive: true })
  return runDir
}

function timestampSlug(): string {
  return new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "Z")
}

function taskSlug(path: string): string {
  return slugify(basename(path).replace(/\.task\.md$/, "")) || "task"
}

function acquireLock(dryRun: boolean): number | null {
  if (dryRun) return null
  mkdirSync(dirname(LOCK_PATH), { recursive: true })
  try {
    const fd = openSync(LOCK_PATH, "wx")
    writeFileSync(fd, JSON.stringify({ pid: process.pid, created_at: new Date().toISOString() }))
    return fd
  } catch {
    throw new Error(`Bridge lock exists: ${LOCK_PATH}`)
  }
}

function releaseLock(fd: number | null, dryRun: boolean): void {
  if (dryRun || fd === null) return
  closeSync(fd)
  rmSync(LOCK_PATH, { force: true })
}

function shellQuote(value: string): string {
  return `'${value.replace(/'/g, "'\\''")}'`
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function printCompact(result: BridgeResult): void {
  const lines = [
    "AGENT_HANDOFF_BRIDGE_V1",
    `selected_task=${result.selected_task || "none"}`,
    `status_before=${result.status_before}`,
    `action=${result.action}`,
    `dry_run=${result.dry_run}`,
  ]
  if (result.codex) lines.push(`codex=${result.codex.available ? "available" : "missing"} ${String(result.codex.version || "")}`.trim())
  if (result.hermes) lines.push(`hermes=${result.hermes.available ? "available" : "missing"} ${String(result.hermes.version || "")}`.trim())
  if (result.exit_code !== undefined) lines.push(`exit_code=${result.exit_code}`)
  if (result.status_after) lines.push(`status_after=${result.status_after}`)
  if (result.missing) lines.push(`missing=${result.missing}`)
  if (result.setup) lines.push(`setup=${result.setup}`)
  lines.push(`log=${result.run_dir}`)
  if (result.stanley_os_note) lines.push(`stanley_os_note=${result.stanley_os_note}`)
  if (result.next) lines.push(`next=${result.next}`)
  console.log(lines.join("\n"))
}
