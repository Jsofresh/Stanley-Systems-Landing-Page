import { NextResponse } from "next/server"
import { execFile } from "node:child_process"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function escapeForCli(value: string) {
  // Keep it simple: avoid untrusted quoting complexity by stripping newlines.
  return value.replace(/[\r\n]+/g, " ").trim()
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const to = clean(body?.to)
    const name = clean(body?.name)
    const company = clean(body?.company)
    const phone = clean(body?.phone)
    const trade = clean(body?.trade)
    const severity = clean(body?.severity)
    const breakdown = clean(body?.breakdown)

    if (!to || !name || !company || !trade || !severity || !breakdown) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 })
    }

    const subject = `Your billing breakdown + checklist (${trade})`

    const text = [
      `Hi ${name},`,
      "",
      "Here’s the full breakdown and the fix checklist.",
      "",
      breakdown,
      "",
      "If you want, reply to this email with 2–3 details about your current invoicing process and I’ll point to the exact step that is causing the delay.",
      "",
      "Stanley Systems",
      "hello@stanley-systems.com",
    ].join("\n")

    // Use gws CLI to send via Gmail as hello@stanley-systems.com.
    // NOTE: gws auth must already be configured on the VPS.
    const args = [
      "gmail",
      "send",
      "--to",
      escapeForCli(to),
      "--cc",
      "hello@stanley-systems.com",
      "--subject",
      escapeForCli(subject),
      "--text",
      text,
    ]

    const { stdout } = await execFileAsync("gws", args, {
      env: {
        ...process.env,
        // Prevent accidental output formatting changes.
        GWS_OUTPUT: "json",
      },
      maxBuffer: 1024 * 1024,
    })

    // Best-effort: do not parse stdout strictly; just acknowledge send attempt.
    return NextResponse.json({ ok: true, message: "Email queued." })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Could not send email."
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
