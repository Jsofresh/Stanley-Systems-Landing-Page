import { NextResponse } from "next/server"

const WEBHOOK_URL = process.env.STANLEY_CONTACT_WEBHOOK_URL
const FALLBACK_EMAIL = "hello@stanley-systems.com"

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function cleanBoolean(value: unknown) {
  return value === true
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const payload = {
      telegram_alert_type: "paid_buyer_onboarding",
      form_type: "paid_buyer_onboarding",
      name: clean(body?.name),
      business: clean(body?.business),
      email: clean(body?.email),
      phone: clean(body?.phone),
      whatBought: clean(body?.whatBought),
      fieldJobDispatchSystem: clean(body?.fieldJobDispatchSystem),
      accountingBillingSystem: clean(body?.accountingBillingSystem),
      biggestLeak: clean(body?.biggestLeak),
      accessReadiness: clean(body?.accessReadiness),
      preferredCallTime: clean(body?.preferredCallTime),
      notes: clean(body?.notes),
      smsConsent: cleanBoolean(body?.smsConsent),
      source: clean(body?.source) || "paid-buyer-onboarding-form",
      page: clean(body?.page) || "/checkout/onboarding",
      submitted_at: clean(body?.submitted_at) || new Date().toISOString(),
      submittedAt: new Date().toISOString(),
    }

    if (
      !payload.name ||
      !payload.business ||
      !payload.email ||
      !payload.phone ||
      !payload.whatBought ||
      !payload.fieldJobDispatchSystem ||
      !payload.accountingBillingSystem ||
      !payload.biggestLeak ||
      !payload.accessReadiness ||
      !payload.preferredCallTime
    ) {
      return NextResponse.json(
        { ok: false, error: "Missing required onboarding fields." },
        { status: 400 },
      )
    }

    if (WEBHOOK_URL) {
      const webhookResponse = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!webhookResponse.ok) {
        const responseText = await webhookResponse.text().catch(() => "")
        return NextResponse.json(
          {
            ok: false,
            error: "Onboarding webhook failed.",
            detail: responseText || `Webhook returned ${webhookResponse.status}`,
          },
          { status: 502 },
        )
      }
    }

    return NextResponse.json({
      ok: true,
      message: WEBHOOK_URL
        ? "Thanks. Stanley Systems received your onboarding details. Book your call if you have not already."
        : `Thanks. This onboarding form is built, but STANLEY_CONTACT_WEBHOOK_URL is not set for notification delivery yet. For now, email ${FALLBACK_EMAIL}.`,
      delivery: WEBHOOK_URL ? "webhook" : "not-configured",
    })
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not process onboarding request." },
      { status: 500 },
    )
  }
}
