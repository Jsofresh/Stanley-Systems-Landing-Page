import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { loadManifest, main, STANLEY_OS_ROOT, updateStatus, writeJson } from "./_lib.ts"

await main(async (args) => {
  const manifest = loadManifest(String(args.run_id || ""))
  const loopDir = join(STANLEY_OS_ROOT, "ops", "loops", "design-loop", manifest.run_id)
  const reportDir = join(STANLEY_OS_ROOT, "reports", "design-loop")
  const decisionDir = join(STANLEY_OS_ROOT, "decisions", "design-loop")
  mkdirSync(loopDir, { recursive: true })
  mkdirSync(reportDir, { recursive: true })
  mkdirSync(decisionDir, { recursive: true })

  const summary = {
    run_id: manifest.run_id,
    status: manifest.status,
    manifest_path: join(manifest.run_dir, "manifest.json"),
    reports: manifest.reports,
    bridge_status: manifest.bridge_status || {},
    deploy_result: manifest.deploy_result || {},
    live_smoke: manifest.live_smoke || {},
    logged_at: new Date().toISOString(),
  }
  writeJson(join(loopDir, "summary.json"), summary)
  writeJson(join(reportDir, `${manifest.run_id}.json`), summary)
  writeFileSync(
    join(decisionDir, `${manifest.run_id}.md`),
    `# Design Loop ${manifest.run_id}

Status: ${manifest.status}
Manifest: ${join(manifest.run_dir, "manifest.json")}
Bridge status: ${JSON.stringify(manifest.bridge_status || {})}
`,
  )
  updateStatus(manifest, manifest.status === "live_verified" ? "logged" : manifest.status)
  console.log(readFileSync(join(loopDir, "summary.json"), "utf8"))
})
