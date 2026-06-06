import { NextResponse } from "next/server"

const WEBHOOK_URL =
  process.env.STANLEY_CALCULATOR_STARTED_WEBHOOK_URL ||
  process.env.STANLEY_CALCULATOR_COMPLETED_WEBHOOK_URL ||
  process.env.STANLEY_CONTACT_WEBHOOK_URL

type JsonRecord = Record<string, unknown>

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 500) : ""
}

function cleanNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string") {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return 0
}

function cleanRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {}
}

function money(value: unknown) {
  return `$${Math.round(cleanNumber(value)).toLocaleString()}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    const inputs = cleanRecord(body?.inputs)
    const attribution = cleanRecord(body?.attribution)

    const startedAt = cleanString(body?.started_at) || new Date().toISOString()
    const sourcePage = cleanString(body?.source_page) || "/invoicing-delay-cash-flow-calculator"
    const visitorId = cleanString(body?.visitor_id)
    const sessionId = cleanString(body?.session_id)

    const payload = {
      telegram_alert_type: "calculator_started",
      status: "calculator_started",
      form_type: "calculator_started",
      source: "stanley-website-calculator",
      source_page: sourcePage,
      page: sourcePage,
      started_at: startedAt,
      submitted_at: startedAt,
      visitor_id: visitorId,
      session_id: sessionId,
      inputs: {
        average_invoice_value: cleanNumber(inputs.average_invoice_value),
        jobs_per_month: cleanNumber(inputs.jobs_per_month),
        invoice_delay_days: cleanNumber(inputs.invoice_delay_days),
        office_hours_lost_per_job: cleanNumber(inputs.office_hours_lost_per_job),
        unbilled_jobs: cleanNumber(inputs.unbilled_jobs),
        correction_rate_percent: cleanNumber(inputs.correction_rate_percent),
        saved_customer_records: cleanNumber(inputs.saved_customer_records),
        average_repeat_job_value: cleanNumber(inputs.average_repeat_job_value),
        missed_calls_per_month: cleanNumber(inputs.missed_calls_per_month),
      },
      attribution: {
        referrer: cleanString(attribution.referrer),
        utm_source: cleanString(attribution.utm_source),
        utm_medium: cleanString(attribution.utm_medium),
        utm_campaign: cleanString(attribution.utm_campaign),
        utm_content: cleanString(attribution.utm_content),
        utm_term: cleanString(attribution.utm_term),
      },
      telegram_message: [
        "🟢 Calculator started",
        `Page: ${sourcePage}`,
        `Avg invoice: ${money(inputs.average_invoice_value)}`,
        `Jobs/mo: ${cleanNumber(inputs.jobs_per_month).toLocaleString()}`,
        `Invoice delay: ${cleanNumber(inputs.invoice_delay_days).toLocaleString()} days`,
        `Visitor: ${visitorId || "Not provided"}`,
      ].join("\n"),
    }

    if (!WEBHOOK_URL) {
      return NextResponse.json({ ok: true, delivery: "not-configured", message: "Calculator start captured, but no webhook URL is configured." })
    }

    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!webhookResponse.ok) {
      const responseText = await webhookResponse.text().catch(() => "")
      return NextResponse.json(
        { ok: false, error: "Calculator start webhook failed.", detail: responseText || `Webhook returned ${webhookResponse.status}` },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true, delivery: "webhook" })
  } catch {
    return NextResponse.json({ ok: false, error: "Could not process calculator start." }, { status: 500 })
  }
}
