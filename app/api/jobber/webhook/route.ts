import { NextRequest, NextResponse } from "next/server"
import { appendFile, mkdir } from "node:fs/promises"
import path from "node:path"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const STORAGE_DIR = "/home/jaden/.local/share/stanley-systems/data/stanley-demo/jobber-webhooks"
const N8N_FORWARD_URL = process.env.STANLEY_JOBBER_WEBHOOK_FORWARD_URL || "https://n8n.stanley-systems.com/webhook/stanley-demo-jobber-intake/jobber-demo-webhook/stanley-demo-jobber-webhook"

function utcDayStamp(iso: string) {
  return iso.slice(0, 10)
}

function asPlainObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {}
}

function safeHeaderValue(value: string) {
  if (!value) return value
  if (/authorization|token|secret|signature|cookie|key/i.test(value)) return "present_redacted"
  return value.slice(0, 300)
}

function collectSafeHeaders(request: NextRequest) {
  const headers: Record<string, string> = {}
  for (const [key, value] of request.headers.entries()) {
    const normalized = key.toLowerCase()
    if (["host", "user-agent", "content-type", "content-length"].includes(normalized)) {
      headers[normalized] = value.slice(0, 300)
      continue
    }
    if (/authorization|token|secret|signature|cookie|key/i.test(normalized)) {
      headers[normalized] = "present_redacted"
    }
  }
  return headers
}

async function parseRequestBody(request: NextRequest) {
  const contentType = request.headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return request.json().catch(() => ({}))
  }

  const text = await request.text().catch(() => "")
  if (!text) return {}

  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(text))
  }

  try {
    return JSON.parse(text)
  } catch {
    return { rawText: text.slice(0, 5000) }
  }
}

async function persistWebhook(record: Record<string, unknown>, receivedAt: string) {
  await mkdir(STORAGE_DIR, { recursive: true })
  const dailyLogPath = path.join(STORAGE_DIR, `${utcDayStamp(receivedAt)}.jsonl`)
  await appendFile(dailyLogPath, `${JSON.stringify(record)}\n`, "utf8")
}

async function forwardToN8n(record: Record<string, unknown>) {
  if (!N8N_FORWARD_URL) {
    return {
      attempted: false,
      delivered: false as const,
      status: null,
      detail: "STANLEY_JOBBER_WEBHOOK_FORWARD_URL not set",
    }
  }

  try {
    const response = await fetch(N8N_FORWARD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(8000),
    })
    const detail = await response.text().catch(() => "")
    return {
      attempted: true,
      delivered: response.ok,
      status: response.status,
      detail: detail.slice(0, 1000),
    }
  } catch (error) {
    return {
      attempted: true,
      delivered: false,
      status: null,
      detail: error instanceof Error ? error.message : "Unknown forward error",
    }
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    source: "jobber",
    event: "webhook_health_check",
    forwardConfigured: Boolean(N8N_FORWARD_URL),
  })
}

export async function POST(request: NextRequest) {
  try {
    const receivedAt = new Date().toISOString()
    const body = await parseRequestBody(request)
    const bodyObject = asPlainObject(body)

    const record = {
      source: "jobber",
      event: "webhook_received",
      receivedAt,
      headers: collectSafeHeaders(request),
      payload: bodyObject,
    }

    await persistWebhook(record, receivedAt)
    const forward = await forwardToN8n(record)

    return NextResponse.json({
      ok: true,
      source: "jobber",
      event: "webhook_received",
      receivedAt,
      forward,
    })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        source: "jobber",
        event: "webhook_error",
        error: error instanceof Error ? error.message : "Unknown webhook error",
      },
      { status: 400 },
    )
  }
}
