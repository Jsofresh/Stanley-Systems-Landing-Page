import { existsSync, readdirSync } from "node:fs"
import { extname, join } from "node:path"
import { copyIfExists, loadManifest, main, updateStatus, writeJson } from "./_lib.ts"

await main(async (args) => {
  const manifest = loadManifest(String(args.run_id || ""))
  const sourceDir = String(args.source_dir || join(manifest.run_dir, "generated-assets", "source"))
  const accepted = []
  const rejected = []
  const allowed = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"])

  if (existsSync(sourceDir)) {
    for (const file of readdirSync(sourceDir)) {
      const ext = extname(file).toLowerCase()
      if (!allowed.has(ext)) continue
      const source = join(sourceDir, file)
      const target = join(manifest.run_dir, "generated-assets", "public", file)
      copyIfExists(source, target)
      accepted.push({ source, staged_path: target, status: "accepted_pending_asset_qa" })
    }
  }

  const qaPath = join(manifest.run_dir, "asset-qa", "asset-ingestion-manifest.json")
  writeJson(qaPath, {
    run_id: manifest.run_id,
    accepted,
    rejected,
    note: "Assets are staged for QA. Public website integration must still be approved by asset QA and patch verification.",
  })
  manifest.reports.push(qaPath)
  updateStatus(manifest, "patch_spec_ready")
})
