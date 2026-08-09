import { spawn } from "node:child_process"
import { randomUUID } from "node:crypto"
import { appendFile, mkdir } from "node:fs/promises"
import { mkdirSync, openSync } from "node:fs"
import path from "node:path"
import { NextResponse } from "next/server"
import { forwardBlueprintRequest } from "@/lib/ai-office-blueprint/webhook-adapter"
import type { AiOfficeBlueprintIntake } from "@/lib/ai-office-blueprint/types"

const MAX_REQUEST_BYTES = 24_000
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const SUBMISSION_LOG_PATH = "/home/jaden/.local/share/stanley-systems/data/stanley-landing/ai-office-blueprint-submissions.jsonl"
const WORKER_SCRIPT_PATH = "/home/jaden/stanley-landing/scripts/ai-office-blueprint/process_blueprint_submission.py"
const WORKER_LOG_DIR = "/home/jaden/.local/share/stanley-systems/data/stanley-landing/logs"
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>()

const requiredFields: Array<keyof AiOfficeBlueprintIntake> = [
  "name",
  "email",
  "businessName",
  "businessType",
  "fieldServiceSoftware",
  "informationStuck",
  "copyCheckRewrite",
  "billingDelays",
  "aiComfortLevel",
  "messyOfficeExample",
]

const fieldLimits: Record<keyof AiOfficeBlueprintIntake, number> = {
  name: 120,
  email: 180,
  businessName: 160,
  businessType: 160,
  teamSize: 120,
  fieldServiceSoftware: 180,
  accountingSoftware: 180,
  spreadsheetUsage: 500,
  informationStuck: 1400,
  copyCheckRewrite: 1400,
  billingDelays: 1400,
  missedFollowUp: 1400,
  toolsInvolved: 900,
  desiredOutputType: 900,
  aiComfortLevel: 120,
  messyOfficeExample: 2200,
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  return forwarded || request.headers.get("x-real-ip") || "local"
}

function isRateLimited(key: string) {
  const now = Date.now()
  const bucket = rateLimitBuckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  bucket.count += 1
  return bucket.count > RATE_LIMIT_MAX
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function cleanIntake(body: Record<string, unknown>): AiOfficeBlueprintIntake {
  return {
    name: clean(body.name),
    email: clean(body.email),
    businessName: clean(body.businessName),
    businessType: clean(body.businessType),
    teamSize: clean(body.teamSize),
    fieldServiceSoftware: clean(body.fieldServiceSoftware),
    accountingSoftware: clean(body.accountingSoftware),
    spreadsheetUsage: clean(body.spreadsheetUsage),
    informationStuck: clean(body.informationStuck),
    copyCheckRewrite: clean(body.copyCheckRewrite),
    billingDelays: clean(body.billingDelays),
    missedFollowUp: clean(body.missedFollowUp),
    toolsInvolved: clean(body.toolsInvolved),
    desiredOutputType: clean(body.desiredOutputType),
    aiComfortLevel: clean(body.aiComfortLevel),
    messyOfficeExample: clean(body.messyOfficeExample),
  }
}

function validateIntake(intake: AiOfficeBlueprintIntake) {
  const missing = requiredFields.filter((field) => !intake[field])
  if (missing.length) return { ok: false as const, error: "Missing required fields.", missing }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(intake.email)) return { ok: false as const, error: "Enter a valid email address.", missing: ["email"] }

  const oversized = (Object.keys(fieldLimits) as Array<keyof AiOfficeBlueprintIntake>).filter((field) => intake[field].length > fieldLimits[field])
  if (oversized.length) {
    return { ok: false as const, error: "One or more fields is too long. Shorten the details and try again.", missing: oversized }
  }

  return { ok: true as const }
}

async function saveSubmission(record: unknown) {
  await mkdir(path.dirname(SUBMISSION_LOG_PATH), { recursive: true })
  await appendFile(SUBMISSION_LOG_PATH, `${JSON.stringify(record)}\n`, "utf8")
}

function triggerRealtimeBlueprintWorker(submissionId: string) {
  try {
    mkdirSync(WORKER_LOG_DIR, { recursive: true })
    const out = openSync(path.join(WORKER_LOG_DIR, "ai-office-blueprint-realtime-worker.log"), "a")
    const err = openSync(path.join(WORKER_LOG_DIR, "ai-office-blueprint-realtime-worker.error.log"), "a")
    const args = ["--submission-id", submissionId]
    if (process.env.AI_OFFICE_BLUEPRINT_EMAIL_DRY_RUN === "1") args.push("--dry-run")
    const child = spawn(WORKER_SCRIPT_PATH, args, {
      detached: true,
      stdio: ["ignore", out, err],
      env: {
        ...process.env,
        STANLEY_BLUEPRINT_WORKER_SOURCE: "api-realtime",
      },
    })
    child.unref()
    return { triggered: true, mode: process.env.AI_OFFICE_BLUEPRINT_EMAIL_DRY_RUN === "1" ? "realtime-dry-run" : "realtime-email", pid: child.pid }
  } catch (error) {
    return { triggered: false, mode: "realtime-email", error: error instanceof Error ? error.message : "worker spawn failed" }
  }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0)
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ ok: false, error: "Blueprint request is too large." }, { status: 413 })
  }

  if (isRateLimited(clientKey(request))) {
    return NextResponse.json({ ok: false, error: "Too many Blueprint requests. Please wait a minute and try again." }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 })
  }

  try {
    if (clean(body.website)) {
      return NextResponse.json({ ok: false, error: "Could not queue the Blueprint. Please try again." }, { status: 400 })
    }
    const intake = cleanIntake(body ?? {})
    const validation = validateIntake(intake)

    if (!validation.ok) {
      return NextResponse.json(validation, { status: 400 })
    }

    const submissionId = `aob_${randomUUID()}`
    const submittedAt = new Date().toISOString()
    await saveSubmission({
      submissionId,
      submittedAt,
      status: "queued_for_hermes_email",
      requestedDelivery: "hermes_generated_html_email",
      template: "templates/ai-office-blueprint/fable-blueprint-template.html",
      intake,
    })

    const realtimeWorker = triggerRealtimeBlueprintWorker(submissionId)
    void forwardBlueprintRequest(submissionId, intake).catch(() => undefined)

    return NextResponse.json({
      ok: true,
      queued: true,
      status: "queued_for_hermes_email",
      delivery: "realtime-worker",
      submissionId,
      message: "Good. Your answers were accepted. Stanley Systems is building the custom Blueprint now and will email it to you shortly.",
      realtimeWorker,
      result: null,
    })
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not process the Blueprint request." },
      { status: 500 },
    )
  }
}
