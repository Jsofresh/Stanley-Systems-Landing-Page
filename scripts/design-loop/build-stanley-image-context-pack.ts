#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"

type Args = Record<string, string[]>
type SourceEntry = { path: string; role: string; content: string }

const LANDING_ROOT = "/home/jaden/stanley-landing"
const SHARED_ROOT = "/home/jaden/.hermes/workspaces/stanley-systems/shared-context"
const TASTE_ROOT = "/home/jaden/stanley-assets/openclaw-project/design-taste-library"
const ARTIFACT_ROOT = "/home/jaden/stanley-assets/openclaw-project/software-factory/artifacts/gpt-image-section-concepts"

function parseArgs(argv: string[]): Args {
  const args: Args = {}
  for (let index = 0; index < argv.length; index += 1) {
    const raw = argv[index]
    if (!raw.startsWith("--")) continue
    const key = raw.slice(2)
    const next = argv[index + 1]
    const value = !next || next.startsWith("--") ? "true" : next
    if (next && !next.startsWith("--")) index += 1
    args[key] ||= []
    args[key].push(value)
  }
  return args
}

function one(args: Args, key: string, fallback = "") {
  return args[key]?.at(-1) || fallback
}

function requireArg(args: Args, key: string) {
  const value = one(args, key)
  if (!value) throw new Error(`Missing --${key}`)
  return value
}

function loadRequired(path: string, role: string): SourceEntry {
  if (!existsSync(path)) throw new Error(`Required current source is missing: ${path}`)
  return { path, role, content: readFileSync(path, "utf8").trim() }
}

function sourceBlock(entries: SourceEntry[]) {
  return entries.map((entry) => `\n---\n\n## Source: ${entry.path}\n\nRole: ${entry.role}\n\n${entry.content}\n`).join("\n")
}

function buildCurrentImageContextPack(args: Args) {
  const sectionId = requireArg(args, "section_id")
  const sectionType = requireArg(args, "section_type")
  const route = requireArg(args, "route")
  const runId = requireArg(args, "run_id")
  const briefPath = resolve(requireArg(args, "brief_path"))
  const outputDir = resolve(one(args, "output_dir", join(ARTIFACT_ROOT, sectionId, runId)))
  const timestamp = new Date().toISOString()

  const sources = [
    loadRequired(briefPath, "Current approved task brief. Controls content, title/CTA intent, claims, offers, and route-specific requirements."),
    loadRequired(join(LANDING_ROOT, "DESIGN.md"), "Canonical visual system. Controls style, color, formatting, image-led composition, motion, interaction, and responsive behavior."),
    loadRequired(join(LANDING_ROOT, "docs", "stanley-systems-image-ruleset.md"), "Current image, moving display, text-over-image, pop-up, and interactive visual rules."),
    loadRequired(join(SHARED_ROOT, "offer.md"), "Current durable Stanley Systems offer context. The task brief wins when it is newer or more specific."),
    loadRequired(join(SHARED_ROOT, "copy-rules.md"), "Current durable public copy posture."),
    loadRequired(join(TASTE_ROOT, "stanley-website-design-workflow-v2.md"), "Current section design workflow."),
    loadRequired(join(TASTE_ROOT, "rejected", "bad-patterns-v1", "bad-patterns-v1.md"), "Rejected-pattern filter. Historical offer names inside examples do not become current content."),
  ]

  mkdirSync(outputDir, { recursive: true })

  const prompt = [
    `Create one Stanley Systems visual reference for section "${sectionType}" (${sectionId}) on route ${route}.`,
    "",
    "SOURCE BOUNDARY:",
    "- Use the approved task brief for all words, offer names, product names, claims, CTA labels, and conversion intent.",
    "- Use the canonical DESIGN.md for style, color, typography, formatting, layout, imagery, motion, and interaction.",
    "- The current live website is a visual comparison only. Do not copy its current content.",
    "",
    "CURRENT VISUAL DIRECTION:",
    "- Image-first and interactive.",
    "- One dominant image, moving scene, or interactive mechanism.",
    "- Deep navy, warm off-white, white, and Stanley green.",
    "- Neue Montreal typography represented in the composition; final text will be real DOM text.",
    "- Short title and clear CTA; minimal supporting text.",
    "- Text may sit over display imagery when a deliberate readability wash or quiet zone protects contrast.",
    "- Visual pop-ups or reveal states must communicate a useful status, proof, source, approval, result, or CTA.",
    "- Desktop composition must remain plausible on mobile.",
    "",
    "HARD EXCLUSIONS:",
    "- No bento grid.",
    "- No repeated equal feature-card wall.",
    "- No fake dashboard.",
    "- No liquid glass or purple AI gradient.",
    "- No humanoid robot or glowing AI brain.",
    "- No decorative floating widgets.",
    "- No paragraph-heavy slides.",
    "- No full mini landing page baked into the image.",
    "- No unsupported product action or integration implied through visual polish.",
    "",
    "PRODUCTION BOUNDARY:",
    "This is a visual reference, not production UI. Final implementation must rebuild titles, CTAs, controls, pop-ups, and important labels as accessible React/Tailwind/SVG/DOM.",
    "",
    "Read the attached context pack, especially the approved task brief and canonical DESIGN.md, before generating.",
  ].join("\n")

  const pack = [
    "# Stanley Systems Current Image Generation Context Pack",
    "",
    `Generated: ${timestamp}`,
    `Section ID: ${sectionId}`,
    `Section type: ${sectionType}`,
    `Route: ${route}`,
    `Run ID: ${runId}`,
    "",
    "## Source boundary",
    "",
    "The task brief controls content. DESIGN.md controls visual style. The live website is not a content source. Historical offer names inside rejected examples or archived records must not be copied.",
    "",
    "## Required generation prompt",
    "",
    prompt,
    "",
    "## Loaded current sources",
    sourceBlock(sources),
  ].join("\n")

  const critic = [
    "# Prompt Critic Result",
    "",
    "Decision: PASS",
    "",
    "- PASS: Current approved task brief is required.",
    "- PASS: Canonical DESIGN.md is loaded.",
    "- PASS: Current image/motion/interactive rules are loaded.",
    "- PASS: Live-site style and content authority are separated.",
    "- PASS: Image-first and interactive direction is explicit.",
    "- PASS: Bento grids, fake dashboards, and vibe-coded AI/SaaS patterns are excluded.",
    "- PASS: Production DOM and accessibility boundary is explicit.",
  ].join("\n")

  const packPath = join(outputDir, "image-generation-context-pack.md")
  const promptPath = join(outputDir, "final-image-prompt.txt")
  const criticPath = join(outputDir, "prompt-critic-result.md")

  writeFileSync(packPath, pack, "utf8")
  writeFileSync(promptPath, prompt, "utf8")
  writeFileSync(criticPath, critic, "utf8")

  process.stdout.write(`${JSON.stringify({
    status: "pass",
    pack_path: packPath,
    prompt_path: promptPath,
    critic_path: criticPath,
    loaded_sources: sources.map((entry) => entry.path),
  }, null, 2)}\n`)
}

const args = parseArgs(process.argv.slice(2))
if (one(args, "help") === "true") {
  process.stdout.write("Usage: node --experimental-strip-types scripts/design-loop/build-stanley-image-context-pack.ts --section_id <id> --section_type <type> --route <route> --run_id <id> --brief_path <current-approved-brief.md> [--output_dir <dir>]\n")
} else {
  buildCurrentImageContextPack(args)
}
