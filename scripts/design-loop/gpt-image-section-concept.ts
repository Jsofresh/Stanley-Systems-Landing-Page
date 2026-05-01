#!/usr/bin/env node
import { createHash } from "crypto"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { basename, join, resolve } from "path"

const DEFAULT_MODEL = "gpt-image-2"
const DEFAULT_QUALITY = "medium"
const MODEL_ALIAS = "GPT-Image2Medium"
const DEFAULT_SIZE = "1024x1024"
const DEFAULT_ENV_PATH = "/home/jaden/.openclaw/gateway.systemd.env"
const DEFAULT_ARTIFACT_ROOT = "/home/jaden/.openclaw/workspace/project/software-factory/artifacts/gpt-image-section-concepts"

type Args = Record<string, string[]>

type OpenAIImageResponse = {
  data?: Array<{ b64_json?: string; url?: string; revised_prompt?: string }>
  error?: { message?: string; type?: string; code?: string | null }
}

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

function one(args: Args, key: string, fallback = ""): string {
  return args[key]?.at(-1) || fallback
}

function many(args: Args, key: string): string[] {
  return (args[key] || [])
    .flatMap((value) => value.split(","))
    .map((value) => value.trim())
    .filter(Boolean)
}

function requireArg(args: Args, key: string): string {
  const value = one(args, key)
  if (!value) throw new Error(`Missing required --${key}`)
  return value
}

function readOpenAIKey(envPath: string): { key: string; source: string } {
  if (process.env.OPENAI_API_KEY) return { key: process.env.OPENAI_API_KEY, source: "process.env.OPENAI_API_KEY" }
  if (!existsSync(envPath)) throw new Error(`OPENAI_API_KEY not in environment and env file missing: ${envPath}`)
  const text = readFileSync(envPath, "utf8")
  const match = text.match(/(?:^|\n)\s*OPENAI_API_KEY\s*=\s*(.+)/)
  if (!match) throw new Error(`OPENAI_API_KEY not found in ${envPath}`)
  const key = match[1].trim().replace(/^['"]|['"]$/g, "")
  if (!key) throw new Error(`OPENAI_API_KEY is empty in ${envPath}`)
  return { key, source: envPath }
}


function pathSummary(paths: string[]): Array<{ path: string; exists: boolean; bytes?: number }> {
  return paths.map((path) => {
    const resolved = resolve(path)
    if (!existsSync(resolved)) return { path: resolved, exists: false }
    return { path: resolved, exists: true, bytes: readFileSync(resolved).byteLength }
  })
}

function readPathSnippets(paths: string[], maxCharsPerFile = 2400): string {
  return paths
    .map((path) => {
      const resolved = resolve(path)
      if (!existsSync(resolved)) return `\n## Missing context file\n${resolved}\n`
      const text = readFileSync(resolved, "utf8")
      return `\n## Context file: ${resolved}\n${text.slice(0, maxCharsPerFile)}${text.length > maxCharsPerFile ? "\n[TRUNCATED]" : ""}\n`
    })
    .join("\n")
}

function buildPrompt(args: Args): string {
  const promptText = one(args, "prompt_text")
  const promptFile = one(args, "prompt_file")
  const basePrompt = promptFile ? readFileSync(resolve(promptFile), "utf8") : promptText
  if (!basePrompt.trim()) throw new Error("Provide --prompt_text or --prompt_file")

  const tasteReferencePaths = many(args, "taste_reference_paths")
  const badPatternPaths = many(args, "bad_pattern_paths")
  const contextPaths = many(args, "context_paths")
  const currentScreenshotPaths = many(args, "current_screenshot_paths")

  const metadata = [
    `Section id: ${requireArg(args, "section_id")}`,
    `Route: ${requireArg(args, "route")}`,
    `Section type: ${requireArg(args, "section_type")}`,
    `Generation goal: ${requireArg(args, "generation_goal")}`,
    `Model alias: ${MODEL_ALIAS}`,
    `Model: ${DEFAULT_MODEL}`,
    `Quality: ${DEFAULT_QUALITY}`,
  ].join("\n")

  const pathManifest = JSON.stringify(
    {
      taste_reference_paths: pathSummary(tasteReferencePaths),
      bad_pattern_paths: pathSummary(badPatternPaths),
      current_screenshot_paths: pathSummary(currentScreenshotPaths),
      context_paths: pathSummary(contextPaths),
    },
    null,
    2,
  )

  return [
    "You are generating Stanley Systems website section concept art for a design loop.",
    "Generated concepts are reference artifacts only. They must not be pasted into production UI.",
    "Codex will rebuild the selected concept as real responsive DOM/CSS/SVG/React UI.",
    "Do not bake final critical copy, CTA behavior, or business logic into the image as the only source of truth.",
    "Use light mode, Stanley Systems deep navy/forest green/white/neutral palette, premium practical service-business feel.",
    "Avoid generic SaaS dashboards, repeated simple icon-card stacks, robots, AI motifs, fake testimonials, clutter, dark mode, orange, gold, amber, sepia, and visually empty centers.",
    "",
    "## Run metadata",
    metadata,
    "",
    "## Path manifest for references and current screenshots",
    pathManifest,
    "",
    "## Context excerpts",
    readPathSnippets([...tasteReferencePaths, ...badPatternPaths, ...contextPaths].slice(0, 8)),
    "",
    "## User/director prompt",
    basePrompt.trim(),
  ].join("\n")
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (one(args, "help") === "true") {
    console.log(`Usage: node --experimental-strip-types scripts/design-loop/gpt-image-section-concept.ts \\
  --section_id customer-revenue \\
  --route / \\
  --section_type "Customer Revenue System" \\
  --generation_goal "Generate 2-3 stronger concept images" \\
  --prompt_text "..." \\
  --taste_reference_paths path1,path2 \\
  --bad_pattern_paths path1 \\
  --context_paths path1,path2 \\
  --current_screenshot_paths path1,path2 \\
  --output_dir /path/to/output \\
  --count 3\n\nDefault model/profile: ${MODEL_ALIAS} (${DEFAULT_MODEL}, quality=${DEFAULT_QUALITY})`)
    return
  }

  const sectionId = requireArg(args, "section_id")
  requireArg(args, "route")
  requireArg(args, "section_type")
  requireArg(args, "generation_goal")
  const count = Number(one(args, "count", "3"))
  if (!Number.isInteger(count) || count < 1 || count > 3) throw new Error("--count must be an integer from 1 to 3")
  const size = one(args, "size", DEFAULT_SIZE)
  const envPath = one(args, "openai_env_path", DEFAULT_ENV_PATH)
  const timestamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")
  const runId = one(args, "run_id", `${sectionId}-${MODEL_ALIAS}-${timestamp}`)
  const outputDir = resolve(one(args, "output_dir", join(DEFAULT_ARTIFACT_ROOT, sectionId, runId)))
  mkdirSync(outputDir, { recursive: true })

  const prompt = buildPrompt(args)
  const promptPath = join(outputDir, "prompt.txt")
  writeFileSync(promptPath, prompt, "utf8")

  const { key, source } = readOpenAIKey(envPath)
  const endpoint = "https://api.openai.com/v1/images/generations"
  const requestBody = {
    model: DEFAULT_MODEL,
    prompt,
    size,
    quality: DEFAULT_QUALITY,
    n: count,
  }
  const started = Date.now()

  const baseManifest = {
    run_id: runId,
    timestamp_utc: timestamp,
    section_id: sectionId,
    model_alias: MODEL_ALIAS,
    model: DEFAULT_MODEL,
    quality: DEFAULT_QUALITY,
    size,
    endpoint,
    output_dir: outputDir,
    prompt_path: promptPath,
    requested_count: count,
    openai_api_key_present: true,
    openai_api_key_source: source,
    secret_value_exposed: false,
    fallback_model_used: false,
    hard_rule: "Do not fall back to older image models or Higgsfield for this loop unless explicitly re-run with a different wrapper.",
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
    const responseText = await response.text()
    writeFileSync(join(outputDir, "openai-response.redacted.json"), responseText, "utf8")
    let parsed: OpenAIImageResponse = {}
    try {
      parsed = JSON.parse(responseText) as OpenAIImageResponse
    } catch {
      parsed = { error: { message: responseText.slice(0, 1000), type: "non_json_response" } }
    }

    if (!response.ok) {
      const failure = {
        ...baseManifest,
        success: false,
        http_status: response.status,
        failure_type: parsed.error?.type || "openai_error",
        failure_code: parsed.error?.code || null,
        failure_message: parsed.error?.message || "OpenAI image generation failed",
        duration_seconds: Number(((Date.now() - started) / 1000).toFixed(2)),
        generated_images: [],
      }
      writeFileSync(join(outputDir, "run-manifest.json"), JSON.stringify(failure, null, 2), "utf8")
      writeFileSync(join(outputDir, "failure.log"), `${failure.failure_message}\n`, "utf8")
      console.error(JSON.stringify(failure, null, 2))
      process.exit(2)
    }

    const images: Array<{ path: string; bytes: number; sha256: string; index: number; revised_prompt?: string }> = []
    for (const [index, item] of (parsed.data || []).entries()) {
      if (!item.b64_json) continue
      const imageBuffer = Buffer.from(item.b64_json, "base64")
      const imagePath = join(outputDir, `concept-${String(index + 1).padStart(2, "0")}-${MODEL_ALIAS}.png`)
      writeFileSync(imagePath, imageBuffer)
      images.push({
        path: imagePath,
        bytes: imageBuffer.byteLength,
        sha256: createHash("sha256").update(imageBuffer).digest("hex"),
        index: index + 1,
        revised_prompt: item.revised_prompt,
      })
    }
    const manifest = {
      ...baseManifest,
      success: true,
      http_status: response.status,
      duration_seconds: Number(((Date.now() - started) / 1000).toFixed(2)),
      generated_images: images,
      generated_image_count: images.length,
    }
    writeFileSync(join(outputDir, "run-manifest.json"), JSON.stringify(manifest, null, 2), "utf8")
    console.log(JSON.stringify(manifest, null, 2))
  } catch (error) {
    const failure = {
      ...baseManifest,
      success: false,
      failure_type: "wrapper_exception",
      failure_message: error instanceof Error ? error.message : String(error),
      duration_seconds: Number(((Date.now() - started) / 1000).toFixed(2)),
      generated_images: [],
    }
    writeFileSync(join(outputDir, "run-manifest.json"), JSON.stringify(failure, null, 2), "utf8")
    writeFileSync(join(outputDir, "failure.log"), `${failure.failure_message}\n`, "utf8")
    console.error(JSON.stringify(failure, null, 2))
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
