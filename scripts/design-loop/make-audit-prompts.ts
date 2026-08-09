import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { loadManifest, main, readContextBundle, writeText, writeJson } from "./_lib.ts"

await main(async (args) => {
  const manifest = loadManifest(String(args.run_id || ""))
  const registryPath = join(manifest.run_dir, "section-registry.json")
  if (!existsSync(registryPath)) throw new Error(`Missing section registry: ${registryPath}`)
  const registry = JSON.parse(readFileSync(registryPath, "utf8"))
  const context = readContextBundle()
  const promptPaths: string[] = []

  for (const section of registry.sections.slice(0, manifest.max_sections)) {
    const dom = section.text_path && existsSync(section.text_path) ? readFileSync(section.text_path, "utf8") : ""
    const prompt = `# Stanley Systems Section Audit

Run id: ${manifest.run_id}
Section id: ${section.section_id}
Route: ${section.route}
Offer: ${section.offer}
Purpose: ${section.purpose}
Desktop screenshot: ${section.screenshots.desktop}
Mobile screenshot: ${section.screenshots.mobile}
DOM evidence path: ${section.text_path}

## Clean Context Bundle
${context}

## Section DOM Evidence
\`\`\`json
${dom}
\`\`\`

Return structured JSON with status, severity, evidence paths, asset recommendation, and exact next action. Do not request a sitewide rewrite.`
    const path = join(manifest.run_dir, "prompts", `${section.section_id}.audit.md`.replaceAll("/", "-"))
    writeText(path, prompt)
    promptPaths.push(path)
  }

  writeJson(join(manifest.run_dir, "prompts", "prompt-manifest.json"), {
    run_id: manifest.run_id,
    status: "prompts_ready",
    prompt_paths: promptPaths,
    bridge_note: "These prompts are evidence artifacts. The closed loop requires the Hermes bridge configured in HERMES_DESIGN_AUDIT_COMMAND.",
  })
})
