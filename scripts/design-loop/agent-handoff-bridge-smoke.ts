import { chmodSync, mkdtempSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import { spawnSync } from "node:child_process"

const REPO = resolve("/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page")
const BRIDGE = join(REPO, "scripts", "design-loop", "agent-handoff-bridge.ts")

type Scenario = {
  name: string
  taskStatus: string
  agent: "codex" | "hermes"
  fakeExit?: string
  fakeStatus?: string
  fakeStdout?: string
  expectedStatus: string
  expectedAction: string
  missingBridge?: boolean
  invocationErrorAfterPreflight?: boolean
  dryRun?: boolean
}

const scenarios: Scenario[] = [
  {
    name: "codex-zero-with-evidence-controller-marks-built",
    taskStatus: "ready_for_codex",
    agent: "codex",
    fakeExit: "0",
    fakeStdout: [
      "Final Codex report",
      "files changed: scripts/design-loop/agent-handoff-bridge.ts",
      "commands run: npm run design-loop:handoff-bridge:smoke exit 0; npm run build exit 0",
      "dry-run or verification result: local checks passed",
      "bridge or implementation status: built_pending_verification",
      "blocked setup requirements: none",
      "remaining risks: Hermes still verifies",
      "",
    ].join("\n"),
    expectedStatus: "built_pending_verification",
    expectedAction: "codex_exited_zero_controller_marked_built_pending_verification",
  },
  {
    name: "codex-zero-with-blocked-setup-requirements-label-marks-built",
    taskStatus: "ready_for_codex",
    agent: "codex",
    fakeExit: "0",
    fakeStdout: [
      "Final Codex report",
      "files changed: scripts/design-loop/agent-handoff-bridge.ts",
      "commands run: npm run design-loop:handoff-bridge:smoke exit 0; npm run build exit 0",
      "dry-run or verification result: local checks passed",
      "Bridge or implementation status:",
      "- Implementation is built pending Hermes verification.",
      "",
      "Blocked setup requirements: none",
      "remaining risks: Hermes still verifies",
      "",
    ].join("\n"),
    expectedStatus: "built_pending_verification",
    expectedAction: "codex_exited_zero_controller_marked_built_pending_verification",
  },
  {
    name: "codex-zero-status-blocked-marks-report-missing",
    taskStatus: "ready_for_codex",
    agent: "codex",
    fakeExit: "0",
    fakeStdout: [
      "Final Codex report",
      "files changed: scripts/design-loop/agent-handoff-bridge.ts",
      "commands run: npm run design-loop:handoff-bridge:smoke exit 0",
      "dry-run or verification result: local checks passed",
      "bridge or implementation status: built_pending_verification",
      "blocked setup requirements: none",
      "remaining risks: Hermes still verifies",
      "Status: blocked",
      "",
    ].join("\n"),
    expectedStatus: "blocked_codex_report_missing",
    expectedAction: "blocked_codex_report_missing",
  },
  {
    name: "codex-zero-final-status-blocked-marks-report-missing",
    taskStatus: "ready_for_codex",
    agent: "codex",
    fakeExit: "0",
    fakeStdout: [
      "Final Codex report",
      "files changed: scripts/design-loop/agent-handoff-bridge.ts",
      "commands run: npm run design-loop:handoff-bridge:smoke exit 0",
      "dry-run or verification result: local checks passed",
      "bridge or implementation status: built_pending_verification",
      "blocked setup requirements: none",
      "remaining risks: Hermes still verifies",
      "Final status: blocked_codex_execution_failed",
      "",
    ].join("\n"),
    expectedStatus: "blocked_codex_report_missing",
    expectedAction: "blocked_codex_report_missing",
  },
  {
    name: "codex-zero-exit-zero-alone-marks-report-missing",
    taskStatus: "ready_for_codex",
    agent: "codex",
    fakeExit: "0",
    fakeStdout: "exit 0\n",
    expectedStatus: "blocked_codex_report_missing",
    expectedAction: "blocked_codex_report_missing",
  },
  {
    name: "codex-zero-built-pending-alone-marks-report-missing",
    taskStatus: "ready_for_codex",
    agent: "codex",
    fakeExit: "0",
    fakeStdout: "built_pending_verification\n",
    expectedStatus: "blocked_codex_report_missing",
    expectedAction: "blocked_codex_report_missing",
  },
  {
    name: "codex-zero-without-evidence-marks-report-missing",
    taskStatus: "ready_for_codex",
    agent: "codex",
    fakeExit: "0",
    fakeStdout: "codex completed without a final report\n",
    expectedStatus: "blocked_codex_report_missing",
    expectedAction: "blocked_codex_report_missing",
  },
  {
    name: "codex-nonzero-stuck-running-marks-execution-failed",
    taskStatus: "ready_for_codex",
    agent: "codex",
    fakeExit: "7",
    expectedStatus: "blocked_codex_execution_failed",
    expectedAction: "blocked_codex_execution_failed",
  },
  {
    name: "codex-nonzero-ready-for-codex-not-preserved",
    taskStatus: "ready_for_codex",
    agent: "codex",
    fakeExit: "7",
    fakeStatus: "ready_for_codex",
    expectedStatus: "blocked_codex_execution_failed",
    expectedAction: "blocked_codex_execution_failed",
  },
  {
    name: "codex-preflight-missing-marks-bridge-missing",
    taskStatus: "ready_for_codex",
    agent: "codex",
    expectedStatus: "blocked_codex_bridge_missing",
    expectedAction: "blocked_missing_codex_bridge",
    missingBridge: true,
  },
  {
    name: "codex-invocation-error-after-preflight-marks-bridge-missing",
    taskStatus: "ready_for_codex",
    agent: "codex",
    expectedStatus: "blocked_codex_bridge_missing",
    expectedAction: "blocked_missing_codex_bridge",
    invocationErrorAfterPreflight: true,
  },
  {
    name: "codex-nonzero-preserves-built-pending-verification",
    taskStatus: "ready_for_codex",
    agent: "codex",
    fakeExit: "7",
    fakeStatus: "built_pending_verification",
    expectedStatus: "built_pending_verification",
    expectedAction: "codex_exited_nonzero_preserved_task_status",
  },
  {
    name: "hermes-invocation-error-after-preflight-marks-bridge-missing",
    taskStatus: "built_pending_verification",
    agent: "hermes",
    expectedStatus: "blocked_hermes_bridge_missing",
    expectedAction: "blocked_missing_hermes_bridge",
    invocationErrorAfterPreflight: true,
  },
  {
    name: "hermes-nonzero-preserves-verified",
    taskStatus: "built_pending_verification",
    agent: "hermes",
    fakeExit: "7",
    fakeStatus: "verified",
    expectedStatus: "verified",
    expectedAction: "hermes_exited_nonzero_preserved_task_status",
  },
  {
    name: "hermes-nonzero-preserves-blocked",
    taskStatus: "built_pending_verification",
    agent: "hermes",
    fakeExit: "7",
    fakeStatus: "blocked",
    expectedStatus: "blocked",
    expectedAction: "hermes_exited_nonzero_preserved_task_status",
  },
  {
    name: "hermes-nonzero-preserves-needs-patch-2",
    taskStatus: "built_pending_verification",
    agent: "hermes",
    fakeExit: "7",
    fakeStatus: "needs_patch_2",
    expectedStatus: "needs_patch_2",
    expectedAction: "hermes_exited_nonzero_preserved_task_status",
  },
  {
    name: "hermes-nonzero-preserves-verified-pending-deploy",
    taskStatus: "built_pending_verification",
    agent: "hermes",
    fakeExit: "7",
    fakeStatus: "verified_pending_deploy",
    expectedStatus: "verified_pending_deploy",
    expectedAction: "hermes_exited_nonzero_preserved_task_status",
  },
  {
    name: "hermes-nonzero-built-pending-not-preserved",
    taskStatus: "built_pending_verification",
    agent: "hermes",
    fakeExit: "7",
    fakeStatus: "built_pending_verification",
    expectedStatus: "blocked_hermes_execution_failed",
    expectedAction: "blocked_hermes_execution_failed",
  },
  {
    name: "hermes-nonzero-verification-running-not-preserved",
    taskStatus: "built_pending_verification",
    agent: "hermes",
    fakeExit: "7",
    fakeStatus: "verification_running",
    expectedStatus: "blocked_hermes_execution_failed",
    expectedAction: "blocked_hermes_execution_failed",
  },
  {
    name: "hermes-zero-with-evidence-controller-marks-verified",
    taskStatus: "built_pending_verification",
    agent: "hermes",
    fakeExit: "0",
    fakeStdout: "Verification Result: passed\nStatus: verified\n",
    expectedStatus: "verified",
    expectedAction: "hermes_exited_zero_controller_marked_verified",
  },
  {
    name: "hermes-zero-without-evidence-marks-report-missing",
    taskStatus: "built_pending_verification",
    agent: "hermes",
    fakeExit: "0",
    fakeStdout: "hermes completed without verification evidence\n",
    expectedStatus: "blocked_hermes_report_missing",
    expectedAction: "blocked_hermes_report_missing",
  },
  {
    name: "hermes-zero-built-pending-without-evidence-marks-report-missing",
    taskStatus: "built_pending_verification",
    agent: "hermes",
    fakeExit: "0",
    fakeStatus: "built_pending_verification",
    fakeStdout: "hermes completed without verification evidence\n",
    expectedStatus: "blocked_hermes_report_missing",
    expectedAction: "blocked_hermes_report_missing",
  },
  {
    name: "hermes-nonzero-stuck-running-marks-execution-failed",
    taskStatus: "built_pending_verification",
    agent: "hermes",
    fakeExit: "7",
    expectedStatus: "blocked_hermes_execution_failed",
    expectedAction: "blocked_hermes_execution_failed",
  },
  {
    name: "dry-run-does-not-mutate-status",
    taskStatus: "ready_for_codex",
    agent: "codex",
    fakeExit: "0",
    expectedStatus: "ready_for_codex",
    expectedAction: "dry_run_dispatch_codex",
    dryRun: true,
  },
]

const results = scenarios.map(runScenario)
console.log(JSON.stringify({ status: "pass", scenarios: results }, null, 2))

function runScenario(scenario: Scenario) {
  const root = mkdtempSync(join(tmpdir(), "agent-handoff-bridge-smoke-"))
  const taskRoot = join(root, "tasks")
  const sfRoot = join(root, "software-factory")
  const stanleyRoot = join(root, "stanley-os")
  const binRoot = join(root, "bin")
  mkdirSync(taskRoot, { recursive: true })
  mkdirSync(sfRoot, { recursive: true })
  mkdirSync(stanleyRoot, { recursive: true })
  mkdirSync(binRoot, { recursive: true })

  const taskPath = join(taskRoot, `${scenario.name}.task.md`)
  writeFileSync(taskPath, `# Smoke Task\n\nStatus: ${scenario.taskStatus}\n\nFixture only.\n`)

  if (!scenario.missingBridge) {
    writeFakeAgent(join(binRoot, scenario.agent), scenario.agent, scenario.invocationErrorAfterPreflight)
    const other = scenario.agent === "codex" ? "hermes" : "codex"
    writeFakeAgent(join(binRoot, other), other)
  }

  const env = {
    ...process.env,
    PATH: scenario.missingBridge ? "/bin:/usr/bin" : `${binRoot}:${process.env.PATH || ""}`,
    AGENT_HANDOFF_TASK_ROOT: taskRoot,
    AGENT_HANDOFF_SOFTWARE_FACTORY_ROOT: sfRoot,
    AGENT_HANDOFF_STANLEY_OS_ROOT: stanleyRoot,
    AGENT_HANDOFF_SITE_REPO: REPO,
    AGENT_HANDOFF_CODEX_COMMAND: join(binRoot, "codex"),
    AGENT_HANDOFF_HERMES_COMMAND: join(binRoot, "hermes"),
    FAKE_TASK_PATH: taskPath,
    FAKE_AGENT_STATUS: scenario.fakeStatus || "",
    FAKE_AGENT_EXIT: scenario.fakeExit || "7",
    FAKE_AGENT_STDOUT: scenario.fakeStdout || `${scenario.agent} fake invocation exited non-zero\n`,
  }

  const args = ["--experimental-strip-types", BRIDGE, "--once"]
  if (scenario.dryRun) args.push("--dry-run")
  const proc = spawnSync(process.execPath, args, {
    cwd: REPO,
    env,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  })
  const statusAfter = parseStatus(readFileSync(taskPath, "utf8"))
  const bridgeResult = readLatestBridgeResult(join(sfRoot, "artifacts", "agent-handoff-bridge", "runs"))
  const action = String(bridgeResult.action || "")

  if (proc.status !== 0) {
    throw new Error(`${scenario.name} failed to run bridge\nstdout:\n${proc.stdout}\nstderr:\n${proc.stderr}`)
  }
  if (statusAfter !== scenario.expectedStatus) {
    throw new Error(`${scenario.name} expected status ${scenario.expectedStatus}, got ${statusAfter}\nstdout:\n${proc.stdout}`)
  }
  if (action !== scenario.expectedAction) {
    throw new Error(`${scenario.name} expected action ${scenario.expectedAction}, got ${action}\nstdout:\n${proc.stdout}`)
  }

  return {
    name: scenario.name,
    status_after: statusAfter,
    action,
    task: taskPath,
    artifacts_root: join(sfRoot, "artifacts", "agent-handoff-bridge"),
  }
}

function writeFakeAgent(path: string, kind: "codex" | "hermes", invocationErrorAfterPreflight = false): void {
  const helpMatch = kind === "codex" ? '[[ "$1" == "exec" && "$2" == "--help" ]]' : '[[ "$1" == "chat" && "$2" == "--help" ]]'
  const maybeRemoveSelf = invocationErrorAfterPreflight ? `rm -f "$0"\n` : ""
  writeFileSync(
    path,
    `#!/usr/bin/env bash
set -euo pipefail
if [[ "\${1:-}" == "--version" ]]; then
  echo "${kind}-fake 1.0.0"
  exit 0
fi
if ${helpMatch}; then
  echo "${kind} fake help"
  ${maybeRemoveSelf}
  exit 0
fi
if [[ -n "\${FAKE_AGENT_STATUS:-}" ]]; then
  perl -0pi -e 's/^Status:\\s*\\S+/"Status: ".$ENV{FAKE_AGENT_STATUS}/em' "\${FAKE_TASK_PATH}"
fi
printf "%s" "\${FAKE_AGENT_STDOUT:-}"
exit "\${FAKE_AGENT_EXIT:-7}"
`,
  )
  chmodSync(path, 0o755)
}

function parseStatus(text: string): string {
  return text.match(/^Status:\s*(\S+)/m)?.[1] || "unknown"
}

function readLatestBridgeResult(runsRoot: string): Record<string, unknown> {
  const latest = readdirSync(runsRoot).sort().at(-1)
  if (!latest) throw new Error(`No bridge run found under ${runsRoot}`)
  return JSON.parse(readFileSync(join(runsRoot, latest, "bridge-result.json"), "utf8"))
}
