import { randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { forwardBlueprintRequest } from "@/lib/ai-office-blueprint/webhook-adapter"
import { generateMockBlueprint } from "@/lib/ai-office-blueprint/mock-generator"
import { renderAiOfficeBlueprintHtml } from "@/lib/ai-office-blueprint/renderer"
import type { AiOfficeBlueprintIntake } from "@/lib/ai-office-blueprint/types"

const MAX_REQUEST_BYTES = 24_000
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>()

const requiredFields: Array<keyof AiOfficeBlueprintIntake> = [
  "name",
  "email",
  "businessName",
  "businessType",
  "teamSize",
  "fieldServiceSoftware",
  "accountingSoftware",
  "spreadsheetUsage",
  "informationStuck",
  "copyCheckRewrite",
  "billingDelays",
  "missedFollowUp",
  "toolsInvolved",
  "desiredOutputType",
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
    let delivery
    try {
      delivery = await forwardBlueprintRequest(submissionId, intake)
    } catch {
      return NextResponse.json(
        { ok: false, error: "Could not queue the Blueprint. Please try again.", submissionId },
        { status: 502 },
      )
    }

    if (!delivery.accepted) {
      return NextResponse.json(
        {
          ok: false,
          error: "Could not queue the Blueprint. Please try again.",
          submissionId,
        },
        { status: 502 },
      )
    }

    if (delivery.delivery === "mock") {
      const blueprint = generateMockBlueprint(intake, submissionId)
      const html = renderAiOfficeBlueprintHtml(blueprint)
      return NextResponse.json({
        ok: true,
        queued: true,
        delivery: "preview",
        submissionId,
        message: "Your Blueprint preview is queued. Check your email for the finished version.",
        preview: {
          blueprint,
          html,
        },
      })
    }

    return NextResponse.json({
      ok: true,
      queued: true,
      delivery: "queued",
      submissionId,
      message: "Your Blueprint is queued. Check your email for the finished version.",
      result: delivery.response ?? null,
    })
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not process the Blueprint request." },
      { status: 500 },
    )
  }
}
