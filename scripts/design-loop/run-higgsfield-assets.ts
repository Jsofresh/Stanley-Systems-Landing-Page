import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { loadManifest, main, runCmd, updateStatus, writeBlockedBridgeReport, writeJson, writeText } from "./_lib.ts"

await main(async (args) => {
  const manifest = loadManifest(String(args.run_id || ""))
  updateStatus(manifest, "higgsfield_generating")
  const bridgeCommand = process.env.HIGGSFIELD_ASSET_COMMAND
  const registryPath = join(manifest.run_dir, "section-registry.json")
  const registry = existsSync(registryPath) ? JSON.parse(readFileSync(registryPath, "utf8")) : { sections: [] }
  const briefs: string[] = []

  for (const section of registry.sections.slice(0, manifest.max_sections)) {
    const briefPath = join(manifest.run_dir, "asset-briefs", `${section.section_id}.higgsfield.md`.replaceAll("/", "-"))
    writeText(
      briefPath,
      `# Higgsfield Asset Brief

Run id: ${manifest.run_id}
Section: ${section.section_id}
Purpose: ${section.purpose}
Offer: ${section.offer}
Output path target: public/images/generated/design-loop/${manifest.run_id}/${section.section_id}.webp

Use imagery only if it lowers cognitive load. No readable baked-in text, no robots, no AI motifs, no orange or saturated purple, no generic SaaS dashboard.`,
    )
    briefs.push(briefPath)
  }

  writeJson(join(manifest.run_dir, "asset-briefs", "asset-brief-manifest.json"), {
    run_id: manifest.run_id,
    status: "briefs_ready",
    briefs,
  })

  if (!bridgeCommand) {
    writeBlockedBridgeReport(manifest, "higgsfield", {
      missing: "HIGGSFIELD_ASSET_COMMAND",
      expected_command: "An executable command that accepts an asset brief path and writes or returns generated asset paths.",
      verification_command: "HIGGSFIELD_ASSET_COMMAND='your-higgsfield-command' npm run design-loop:assets -- --run-id <run-id>",
      fallback_manual_command:
        "Generate assets from asset-briefs/ and place source files under generated-assets/source before running design-loop:ingest-assets.",
    })
    updateStatus(manifest, "blocked_bridge_missing")
    return
  }

  const generated: string[] = []
  for (const briefPath of briefs) {
    const result = runCmd(bridgeCommand, [briefPath], process.cwd())
    const outputPath = join(manifest.run_dir, "generated-assets", "source", `${briefPath.split("/").pop()}.stdout.txt`)
    writeText(outputPath, result.stdout)
    if (result.status === 0) generated.push(outputPath)
  }
  writeJson(join(manifest.run_dir, "generated-assets", "asset-generation-manifest.json"), {
    run_id: manifest.run_id,
    generated,
  })
  updateStatus(manifest, "asset_qa_running")
})
