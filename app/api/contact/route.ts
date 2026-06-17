import { NextResponse } from "next/server"

const WEBHOOK_URL = process.env.STANLEY_CONTACT_WEBHOOK_URL
const FALLBACK_EMAIL = "jaden@stanley-systems.com"

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function cleanBoolean(value: unknown) {
  return value === true
}

function cleanAlertType(body: Record<string, unknown>) {
  return clean(body?.telegram_alert_type) || clean(body?.form_type) || clean(body?.status) || "contact_form"
}

function yesNo(value: boolean) {
  return value ? "Yes" : "No"
}

function buildTelegramMessage(payload: Record<string, unknown>) {
  const formType = clean(payload.form_type) || clean(payload.telegram_alert_type) || "contact_routing_request"
  const title = formType === "ai_office_map_info" ? "🗺️ AI Office Map info request" : "📬 Stanley Systems website contact"
  const lines = [
    title,
    `Type: ${formType}`,
    `Name: ${clean(payload.name) || "Not provided"}`,
    `Company: ${clean(payload.company) || clean(payload.business) || "Not provided"}`,
    `Email: ${clean(payload.email) || "Not provided"}`,
    `Phone: ${clean(payload.phone) || "Not provided"}`,
    `Business type: ${clean(payload.businessType) || clean(payload.business_type) || "Not provided"}`,
    `Bottleneck: ${clean(payload.bottleneck) || clean(payload.main_issue) || "Not provided"}`,
    `Invoice delay: ${clean(payload.invoiceDelay) || "Not provided"}`,
    `Current process: ${clean(payload.currentProcess) || "Not provided"}`,
    `Problem: ${clean(payload.problem) || clean(payload.message) || "Not provided"}`,
    `SMS consent: ${yesNo(payload.smsConsent === true)}`,
    `Page: ${clean(payload.page) || clean(payload.source_page) || "/contact"}`,
    `Source: ${clean(payload.source) || "website-contact-form"}`,
    `Submitted: ${clean(payload.submitted_at) || clean(payload.submittedAt) || new Date().toISOString()}`,
  ]

  return lines.join("\n")
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const payload = {
      telegram_alert_type: cleanAlertType(body ?? {}),
      name: clean(body?.name),
      email: clean(body?.email),
      phone: clean(body?.phone),
      business: clean(body?.business),
      company: clean(body?.company) || clean(body?.business),
      location: clean(body?.location),
      business_type: clean(body?.business_type) || clean(body?.businessType),
      main_issue: clean(body?.main_issue) || clean(body?.problem) || clean(body?.message),
      message: clean(body?.message) || clean(body?.problem) || clean(body?.main_issue),
      intent: clean(body?.intent) || clean(body?.form_type),
      source_page: clean(body?.source_page) || clean(body?.page) || clean(body?.current_path),
      source_section: clean(body?.source_section) || clean(body?.source),
      question: clean(body?.question) || clean(body?.message),
      current_system: clean(body?.current_system),
      consent: clean(body?.consent),
      timestamp: clean(body?.timestamp) || clean(body?.submitted_at) || new Date().toISOString(),
      website: clean(body?.website),
      page_source: clean(body?.page_source),
      current_path: clean(body?.current_path),
      businessType: clean(body?.businessType) || clean(body?.business_type),
      bottleneck: clean(body?.bottleneck),
      invoiceDelay: clean(body?.invoiceDelay),
      currentProcess: clean(body?.currentProcess),
      problem: clean(body?.problem),
      smsConsent: cleanBoolean(body?.smsConsent),
      status: clean(body?.status) || "contact_request",
      form_type: clean(body?.form_type) || "contact_form",
      utm_source: clean(body?.utm_source),
      utm_medium: clean(body?.utm_medium),
      utm_campaign: clean(body?.utm_campaign),
      utm_content: clean(body?.utm_content),
      utm_term: clean(body?.utm_term),
      referrer: clean(body?.referrer),
      source: clean(body?.source) || "website-contact-form",
      page: clean(body?.page) || "/contact",
      submitted_at: clean(body?.submitted_at) || new Date().toISOString(),
      submittedAt: new Date().toISOString(),
    }

    const telegram_message = buildTelegramMessage(payload)
    const webhookPayload = {
      ...payload,
      telegram_message,
    }

    if (payload.website) {
      return NextResponse.json({ ok: true, message: "Thanks. Stanley Systems received your note.", delivery: "filtered" })
    }

    if (payload.form_type === "assessment_intake") {
      if (!payload.name || !payload.email || !payload.phone || !payload.company || !payload.problem || !payload.currentProcess) {
        return NextResponse.json(
          { ok: false, error: "Missing required fields." },
          { status: 400 },
        )
      }
    } else if (payload.form_type === "pre_buy_question") {
      if (!payload.name || !payload.email || !payload.company || !payload.problem) {
        return NextResponse.json(
          { ok: false, error: "Missing required fields." },
          { status: 400 },
        )
      }
    } else if (payload.form_type === "money_leak_checks") {
      if (!payload.email) {
        return NextResponse.json(
          { ok: false, error: "Email is required for leak checks." },
          { status: 400 },
        )
      }
    } else if (payload.form_type === "installation_sprint_contact") {
      if (!payload.name || !payload.email || !payload.company || !payload.businessType || !payload.problem) {
        return NextResponse.json(
          { ok: false, error: "Missing required fields." },
          { status: 400 },
        )
      }
    } else if (payload.form_type === "ai_office_map_info") {
      if (!payload.name || !payload.email || !payload.company || !payload.businessType || !payload.problem) {
        return NextResponse.json(
          { ok: false, error: "Missing required fields." },
          { status: 400 },
        )
      }
    } else if (!payload.name || !payload.email || !payload.company || !payload.businessType || !payload.bottleneck || !payload.currentProcess || !payload.problem) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 },
      )
    }

    if (WEBHOOK_URL) {
      const webhookResponse = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
        signal: AbortSignal.timeout(8000),
      })

      if (!webhookResponse.ok) {
        const responseText = await webhookResponse.text().catch(() => "")
        return NextResponse.json(
          {
            ok: false,
            error: "Contact webhook failed.",
            detail: responseText || `Webhook returned ${webhookResponse.status}`,
          },
          { status: 502 },
        )
      }
    }

    return NextResponse.json({
      ok: true,
      message: WEBHOOK_URL
        ? "Thanks. Stanley Systems received your note and will reply soon."
        : `Thanks. Stanley Systems saved your message path, but STANLEY_CONTACT_WEBHOOK_URL is not set yet. For now, email ${FALLBACK_EMAIL}.`,
      delivery: WEBHOOK_URL ? "webhook" : "not-configured",
    })
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not process contact request." },
      { status: 500 },
    )
  }
}
