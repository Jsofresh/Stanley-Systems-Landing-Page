import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { loadManifest, main, updateStatus, writeBlockedBridgeReport, writeJson, writeText } from "./_lib.ts"

await main(async (args) => {
  const manifest = loadManifest(String(args.run_id || ""))
  const registryPath = join(manifest.run_dir, "section-registry.json")
  const registry = existsSync(registryPath) ? JSON.parse(readFileSync(registryPath, "utf8")) : { sections: [] }
  const specs: string[] = []

  for (const section of registry.sections.slice(0, manifest.max_sections)) {
    const path = join(manifest.run_dir, "patch-specs", `${section.section_id}.codex.md`.replaceAll("/", "-"))
    writeText(
      path,
      `# Codex Patch Spec

Status: patch_spec_ready
Repo: \`${manifest.site_repo}\`
Branch: ${manifest.branch || "backup branch not established"}
Section ids in scope: ${section.section_id}

## Goal
Improve only this marked section if Hermes verification requested a patch. No redesign is authorized by this placeholder spec.

## Evidence
- Desktop screenshot: ${section.screenshots?.desktop || ""}
- Mobile screenshot: ${section.screenshots?.mobile || ""}
- DOM text: ${section.text_path || ""}
- Purpose: ${section.purpose}
- Offer: ${section.offer}

## Required changes
Use the matching Hermes audit JSON from \`${join(manifest.run_dir, "audits")}\` and approved assets from \`${join(manifest.run_dir, "asset-qa")}\`. Keep scope to this section.

## Do not change
- n8n, QBO, HCP, Telegram, OpenClaw, secrets, env files, client workflows, or live demo workflow files.
- Offer names, pricing, guarantees, or public internal-tool language.

## Verification
\`\`\`bash
npm run build
git diff --check
\`\`\`
`,
    )
    specs.push(path)
  }

  const queuePath = join(manifest.run_dir, "patch-specs", "codex-build-queue.json")
  writeJson(queuePath, {
    run_id: manifest.run_id,
    status: "queued",
    max_iterations: manifest.max_iterations,
    specs: specs.map((path) => ({ path, status: "queued", attempts: 0 })),
  })

  if (!process.env.CODEX_PATCH_COMMAND) {
    writeBlockedBridgeReport(manifest, "codex", {
      missing: "CODEX_PATCH_COMMAND",
      expected_command: "An executable command that accepts a Codex patch spec path and applies the patch in the site repo.",
      verification_command: "CODEX_PATCH_COMMAND='your-codex-command' npm run design-loop:dispatch-codex -- --run-id <run-id>",
      fallback_manual_command: "Run Codex with each patch spec path. This is a fallback only, not a closed-loop bridge.",
      queue_path: queuePath,
    })
    updateStatus(manifest, "blocked_bridge_missing")
    return
  }

  updateStatus(manifest, "codex_building")
})
