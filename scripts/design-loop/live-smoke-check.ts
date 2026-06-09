import { join } from "node:path"
import { loadManifest, main, runCmd, updateStatus, writeJson } from "./_lib.ts"

await main(async (args) => {
  const manifest = loadManifest(String(args.run_id || ""))
  const url = String(args.url || process.env.STANLEY_LIVE_URL || "http://127.0.0.1:3012/")
  const first = await fetch(url).catch((error) => ({ status: 0, error: String(error) }) as any)
  await new Promise((resolve) => setTimeout(resolve, 1500))
  const second = await fetch(url).catch((error) => ({ status: 0, error: String(error) }) as any)
  const pm2 = runCmd("pm2", ["describe", "stanley-landing"], manifest.site_repo)
  const html = first.status ? await first.text().catch(() => "") : ""
  const sectionProof = html.includes("data-audit-section") || html.includes("Office Process Assessment")
  const status = first.status === 200 && second.status === 200 && sectionProof && !String(second.status).startsWith("502") ? "pass" : "fail"
  const report = {
    run_id: manifest.run_id,
    url,
    status,
    http_status: first.status || 0,
    recheck_http_status: second.status || 0,
    homepage_reachable: first.status === 200,
    changed_section_visible: sectionProof,
    no_obvious_502_after_recheck: second.status !== 502,
    pm2_status: pm2.status === 0 ? "checked" : "check_failed",
    compact_dom_proof: html.slice(0, 800).replace(/\s+/g, " "),
    rollback_required: status !== "pass",
  }
  const reportPath = join(manifest.run_dir, "live-smoke", "live-smoke-report.json")
  writeJson(reportPath, report)
  manifest.live_smoke = report
  updateStatus(manifest, status === "pass" ? "live_verified" : "blocked")
})
