import { spawn, spawnSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, copyFileSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"

export type LoopStatus =
  | "backup_pending"
  | "backup_complete"
  | "captured_pending_audit"
  | "audit_running"
  | "asset_direction_needed"
  | "visual_asset_strategy_pending"
  | "visual_asset_strategy_running"
  | "asset_request_needed"
  | "generated_asset_pending"
  | "generated_asset_qa_running"
  | "generated_asset_ready"
  | "downgraded_visual_strategy"
  | "blocked_missing_required_asset"
  | "anti_ai_slop_gate_running"
  | "anti_ai_slop_failed"
  | "anti_ai_slop_passed"
  | "critical_visual_review_passed"
  | "higgsfield_generating"
  | "asset_qa_running"
  | "patch_spec_ready"
  | "codex_building"
  | "built_pending_verification"
  | "verification_running"
  | "needs_patch_2"
  | "needs_hermes_redirection"
  | "verified_pending_deploy"
  | "deploying"
  | "live_verification_running"
  | "live_verified"
  | "logged"
  | "blocked"
  | "rolled_back"
  | "blocked_bridge_missing"
  | "blocked_bridge_or_backup"

export type Manifest = {
  run_id: string
  status: LoopStatus
  created_at: string
  updated_at: string
  scope: string
  auto_deploy: boolean
  max_sections: number
  max_iterations: number
  site_repo: string
  software_factory_root: string
  stanley_os_root: string
  run_dir: string
  pre_run_commit?: string
  branch?: string
  tag?: string
  backup?: Record<string, unknown>
  bridge_status?: Record<string, unknown>
  deploy_result?: Record<string, unknown>
  live_smoke?: Record<string, unknown>
  rollback?: Record<string, unknown>
  reports: string[]
}

export const SITE_REPO = resolve(process.env.STANLEY_SITE_REPO || process.cwd())
export const SOFTWARE_FACTORY_ROOT = resolve(
  process.env.SOFTWARE_FACTORY_ROOT || "/home/jaden/.openclaw/workspace/project/software-factory",
)
export const DESIGN_AUDIT_ROOT = join(SOFTWARE_FACTORY_ROOT, "design-audit")
export const STANLEY_OS_ROOT = resolve(
  process.env.STANLEY_OS_ROOT || "/home/jaden/.openclaw/workspace/project/stanley-os",
)
export const CONFIG_PATH = join(DESIGN_AUDIT_ROOT, "design-loop.config.json")

export function parseArgs(argv = process.argv.slice(2)): Record<string, string | boolean> {
  const out: Record<string, string | boolean> = {}
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (!arg.startsWith("--")) continue
    const key = arg.slice(2).replace(/-/g, "_")
    const next = argv[i + 1]
    if (!next || next.startsWith("--")) {
      out[key] = true
    } else {
      out[key] = next
      i += 1
    }
  }
  return out
}

export function readConfig(): Record<string, unknown> {
  if (!existsSync(CONFIG_PATH)) return {}
  return JSON.parse(readFileSync(CONFIG_PATH, "utf8"))
}

export function makeRunId(): string {
  const now = new Date()
  const stamp = now.toISOString().replace(/[-:]/g, "").replace(/\..+/, "Z")
  const suffix = Math.random().toString(36).slice(2, 7)
  return `${stamp}-${suffix}`
}

export function ensureRunDirs(runId: string): string {
  const runDir = join(DESIGN_AUDIT_ROOT, "runs", runId)
  for (const dir of [
    "",
    "screenshots/before/desktop",
    "screenshots/before/mobile",
    "screenshots/after/desktop",
    "screenshots/after/mobile",
    "dom/before",
    "dom/after",
    "prompts",
    "audits",
    "asset-briefs",
    "generated-assets/source",
    "generated-assets/public",
    "asset-qa",
    "patch-specs",
    "build-reports",
    "verification",
    "live-smoke",
    "rollback",
  ]) {
    mkdirSync(join(runDir, dir), { recursive: true })
  }
  return runDir
}

export function createManifest(args: Record<string, string | boolean>): Manifest {
  const config = readConfig()
  const runId = String(args.run_id || args.runId || makeRunId())
  const runDir = ensureRunDirs(runId)
  const existingPath = join(runDir, "manifest.json")
  if ((args.run_id || args.runId) && existsSync(existingPath)) {
    return JSON.parse(readFileSync(existingPath, "utf8"))
  }
  const manifest: Manifest = {
    run_id: runId,
    status: "backup_pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    scope: String(args.scope || config.scope || "homepage"),
    auto_deploy: toBool(args.auto_deploy ?? args.autoDeploy ?? config.auto_deploy, false),
    max_sections: Number(args.max_sections || args.maxSections || config.max_sections_per_wave || 3),
    max_iterations: Number(args.max_iterations || args.maxIterations || config.max_iterations_per_section || 3),
    site_repo: SITE_REPO,
    software_factory_root: SOFTWARE_FACTORY_ROOT,
    stanley_os_root: STANLEY_OS_ROOT,
    run_dir: runDir,
    reports: [],
  }
  writeManifest(manifest)
  return manifest
}

export function loadManifest(runId?: string): Manifest {
  const selectedRunId = runId || findLatestRunId()
  if (!selectedRunId) throw new Error("No design loop run found. Run design-loop:init-backup first.")
  const path = join(DESIGN_AUDIT_ROOT, "runs", selectedRunId, "manifest.json")
  return JSON.parse(readFileSync(path, "utf8"))
}

export function writeManifest(manifest: Manifest): void {
  manifest.updated_at = new Date().toISOString()
  mkdirSync(manifest.run_dir, { recursive: true })
  writeJson(join(manifest.run_dir, "manifest.json"), manifest)
  writeJson(join(manifest.run_dir, "run-state.json"), manifest)
}

export function updateStatus(manifest: Manifest, status: LoopStatus): Manifest {
  manifest.status = status
  writeManifest(manifest)
  return manifest
}

export function findLatestRunId(): string | undefined {
  const root = join(DESIGN_AUDIT_ROOT, "runs")
  if (!existsSync(root)) return undefined
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .at(-1)
}

export function writeJson(path: string, data: unknown): void {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`)
}

export function writeText(path: string, data: string): void {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, data)
}

export function runCmd(command: string, args: string[], cwd = SITE_REPO): {
  status: number
  stdout: string
  stderr: string
  command: string
} {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    env: process.env,
  })
  return {
    status: result.status ?? 1,
    stdout: result.stdout || "",
    stderr: result.stderr || result.error?.message || "",
    command: [command, ...args].join(" "),
  }
}

export function requireOk(result: ReturnType<typeof runCmd>): void {
  if (result.status !== 0) {
    throw new Error(`${result.command} failed\n${result.stderr || result.stdout}`)
  }
}

export function git(args: string[]): ReturnType<typeof runCmd> {
  return runCmd("git", args, SITE_REPO)
}

export function redactRemote(remote: string): string {
  return remote.replace(/https?:\/\/([^@\s]+)@/g, "https://[redacted]@")
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90)
}

export function toBool(value: unknown, fallback: boolean): boolean {
  if (value === undefined || value === null || value === "") return fallback
  if (typeof value === "boolean") return value
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase())
}

export async function ensureLocalServer(baseUrl = "http://127.0.0.1:3012"): Promise<() => Promise<void>> {
  if (await isReachable(baseUrl)) return async () => undefined

  const url = new URL(baseUrl)
  const child = spawn("npm", ["run", "start", "--", "-p", url.port || "3012"], {
    cwd: SITE_REPO,
    env: process.env,
    stdio: "ignore",
    detached: false,
  })

  const started = Date.now()
  while (Date.now() - started < 25000) {
    if (await isReachable(baseUrl)) {
      return async () => {
        child.kill("SIGTERM")
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  child.kill("SIGTERM")
  throw new Error(`Could not start local site at ${baseUrl}. Run npm run build first or pass --url.`)
}

export async function isReachable(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "GET" })
    return response.status >= 200 && response.status < 500
  } catch {
    return false
  }
}

export function readContextBundle(): string {
  const roots = ["context", "roles", "rubrics", "templates"].map((name) => join(DESIGN_AUDIT_ROOT, name))
  const chunks: string[] = []
  for (const root of roots) {
    if (!existsSync(root)) continue
    for (const file of readdirSync(root).sort()) {
      const fullPath = join(root, file)
      chunks.push(`\n\n--- ${relative(DESIGN_AUDIT_ROOT, fullPath)} ---\n${readFileSync(fullPath, "utf8")}`)
    }
  }
  return chunks.join("")
}

export function writeBlockedBridgeReport(manifest: Manifest, bridge: string, details: Record<string, unknown>): string {
  const reportPath = join(manifest.run_dir, "audits", `blocked_bridge_missing.${bridge}.json`)
  writeJson(reportPath, {
    run_id: manifest.run_id,
    status: "blocked_bridge_missing",
    bridge,
    details,
    written_at: new Date().toISOString(),
  })
  manifest.bridge_status = {
    ...(manifest.bridge_status || {}),
    [bridge]: { status: "blocked_bridge_missing", report_path: reportPath, ...details },
  }
  manifest.reports.push(reportPath)
  writeManifest(manifest)
  return reportPath
}

export function copyIfExists(source: string, target: string): boolean {
  if (!existsSync(source)) return false
  mkdirSync(dirname(target), { recursive: true })
  copyFileSync(source, target)
  return true
}

export function protectedPathCheck(): { status: "pass" | "fail"; blocked_paths: string[]; output: string } {
  const diff = git(["diff", "--name-only", "HEAD"]).stdout
  const blocked = diff
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((file) =>
      [
        "n8n",
        "qbo",
        "hcp",
        "telegram",
        "openclaw",
        ".env",
        "secrets",
        "client_workflows",
        "live-demo",
      ].some((needle) => file.toLowerCase().includes(needle)),
    )
  return { status: blocked.length ? "fail" : "pass", blocked_paths: blocked, output: diff }
}

export async function main(fn: (args: Record<string, string | boolean>) => Promise<void> | void): Promise<void> {
  try {
    await fn(parseArgs())
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
}
