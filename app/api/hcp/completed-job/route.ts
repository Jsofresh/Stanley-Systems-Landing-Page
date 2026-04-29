import { NextResponse } from "next/server"
import { mkdir, appendFile } from "node:fs/promises"
import path from "node:path"

const STORAGE_DIR = "/home/jaden/.openclaw/data/hcp-completed-jobs"
const N8N_FORWARD_URL = process.env.STANLEY_HCP_COMPLETED_JOB_WEBHOOK_URL || "https://n8n.stanley-systems.com/webhook/s4XTGHZII1QhPZti/webhook/hcp-job-completed"

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {}
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function parseMaybeJsonArray(value: unknown) {
  if (Array.isArray(value)) return value
  if (typeof value !== "string") return []
  const trimmed = value.trim()
  if (!trimmed) return []
  try {
    const parsed = JSON.parse(trimmed)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function utcDayStamp(iso: string) {
  return iso.slice(0, 10)
}

async function persistEvent(record: Record<string, unknown>, receivedAt: string) {
  await mkdir(STORAGE_DIR, { recursive: true })
  const dailyLogPath = path.join(STORAGE_DIR, `${utcDayStamp(receivedAt)}.jsonl`)
  await appendFile(dailyLogPath, `${JSON.stringify(record)}\n`, "utf8")
}

async function forwardToN8n(record: Record<string, unknown>) {
  if (!N8N_FORWARD_URL) {
    return { attempted: false, delivered: false as const, status: null, detail: "STANLEY_HCP_COMPLETED_JOB_WEBHOOK_URL not set" }
  }

  try {
    const response = await fetch(N8N_FORWARD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
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

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const customer = asObject(body?.customer)
    const serviceAddress = asObject(body?.service_address)
    const segmentsInfo = asObject(body?.segments_info)
    const receivedAt = new Date().toISOString()

    const payload = {
      source: asString(body?.source) || "housecall_pro",
      event: asString(body?.event) || "new_completed_job",
      receivedAt,
      raw: body,
      job: {
        id: asString(body?.id),
        totalAmountInCents: asString(body?.total_amount_in_cents),
        tags: parseMaybeJsonArray(body?.tags),
        servicePros: parseMaybeJsonArray(body?.service_pros),
        remainingOpenSegments: asString(segmentsInfo?.remaining_open_segments),
      },
      customer: {
        id: asString(customer?.id),
        displayName: asString(customer?.display_name),
        firstName: asString(customer?.first_name),
        lastName: asString(customer?.last_name),
        email: asString(customer?.email),
        mobileNumber: asString(customer?.mobile_number),
        notificationsEnabled: asString(customer?.notifications_enabled),
        tags: parseMaybeJsonArray(customer?.tags),
      },
      serviceAddress: {
        street: asString(serviceAddress?.street),
        streetLine2: asString(serviceAddress?.street_line_2),
        city: asString(serviceAddress?.city),
        state: asString(serviceAddress?.state),
        zip: asString(serviceAddress?.zip),
      },
    }

    await persistEvent(payload, receivedAt)
    const forward = await forwardToN8n(payload)

    return NextResponse.json({ ok: true, received: payload, forward })
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not process Housecall Pro completed job webhook." },
      { status: 400 },
    )
  }
}
