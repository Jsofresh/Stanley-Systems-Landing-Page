import { NextRequest, NextResponse } from 'next/server'
import { appendFile, mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const STORAGE_DIR = '/home/jaden/.local/share/stanley-systems/data/stanley-demo/customer-intake'

function utcDayStamp(iso: string) {
  return iso.slice(0, 10)
}

function safeString(value: unknown, max = 1200) {
  return String(value ?? '').trim().slice(0, max)
}

function normalizePhone(value: string) {
  return value.replace(/[^+\d]/g, '').slice(0, 32)
}

async function persist(record: Record<string, unknown>, receivedAt: string) {
  await mkdir(STORAGE_DIR, { recursive: true })
  await appendFile(path.join(STORAGE_DIR, `${utcDayStamp(receivedAt)}.jsonl`), `${JSON.stringify(record)}\n`, 'utf8')
}

async function listRecent(limit = 30) {
  const today = path.join(STORAGE_DIR, `${utcDayStamp(new Date().toISOString())}.jsonl`)
  const text = await readFile(today, 'utf8').catch(() => '')
  return text.split(/\r?\n/).filter(Boolean).slice(-limit).map((line) => {
    try { return JSON.parse(line) } catch { return null }
  }).filter(Boolean)
}

export async function GET() {
  return NextResponse.json({ ok: true, source: 'bayview_customer_intake', event: 'health_check', recent: await listRecent(10) })
}

export async function POST(request: NextRequest) {
  const receivedAt = new Date().toISOString()
  const body = await request.json().catch(() => ({}))
  const record = {
    source: 'customer_intake_form',
    event: 'intake_submitted',
    receivedAt,
    customerName: safeString(body.customerName, 160),
    phone: normalizePhone(safeString(body.phone, 80)),
    email: safeString(body.email, 180).toLowerCase(),
    address: safeString(body.address, 260),
    issueType: safeString(body.issueType, 120),
    urgency: safeString(body.urgency, 80),
    preferredWindow: safeString(body.preferredWindow, 160),
    description: safeString(body.description, 1600),
    sourceChannel: safeString(body.sourceChannel || 'online_form', 80),
    consentToText: Boolean(body.consentToText),
  }

  if (!record.customerName || !record.phone || !record.address || !record.description) {
    return NextResponse.json({ ok: false, error: 'missing_required_fields', required: ['customerName', 'phone', 'address', 'description'] }, { status: 400 })
  }

  await persist(record, receivedAt)
  return NextResponse.json({ ok: true, source: 'bayview_customer_intake', event: 'intake_submitted', receivedAt, intake: record })
}
