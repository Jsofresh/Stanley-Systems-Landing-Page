import { NextResponse } from "next/server"

const WEBHOOK_URL = process.env.STANLEY_CONTACT_WEBHOOK_URL
const FALLBACK_EMAIL = "hello@stanley-systems.com"

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const payload = {
      name: clean(body?.name),
      email: clean(body?.email),
      phone: clean(body?.phone),
      company: clean(body?.company),
      location: clean(body?.location),
      problem: clean(body?.problem),
      source: clean(body?.source) || "website-contact-form",
      page: clean(body?.page) || "/contact",
      submittedAt: new Date().toISOString(),
    }

    if (!payload.name || !payload.email || !payload.problem) {
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
        body: JSON.stringify(payload),
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
