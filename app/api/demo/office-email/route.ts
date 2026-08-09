import { NextRequest, NextResponse } from 'next/server'
import { appendFile, mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const STORAGE_DIR = '/home/jaden/.local/share/stanley-systems/data/stanley-demo/office-emails'

const demoStaff: Record<string, string> = {
  dana: 'Dana Brooks <dana@bayviewheating.demo>',
  carla: 'Carla Nguyen <carla@bayviewheating.demo>',
  mike: 'Mike Reynolds <mike@bayviewheating.demo>',
  luis: 'Luis Martinez <luis@bayviewheating.demo>',
  trevor: 'Trevor Hayes <trevor@bayviewheating.demo>',
  marcus: 'Marcus Reed <marcus@bayviewheating.demo>',
}

function utcDayStamp(iso: string) {
  return iso.slice(0, 10)
}

function safeString(value: unknown, max = 2000) {
  return String(value ?? '').trim().slice(0, max)
}

async function persist(record: Record<string, unknown>, receivedAt: string) {
  await mkdir(STORAGE_DIR, { recursive: true })
  await appendFile(path.join(STORAGE_DIR, `${utcDayStamp(receivedAt)}.jsonl`), `${JSON.stringify(record)}\n`, 'utf8')
}

async function listRecent(limit = 40) {
  const today = path.join(STORAGE_DIR, `${utcDayStamp(new Date().toISOString())}.jsonl`)
  const text = await readFile(today, 'utf8').catch(() => '')
  return text.split(/\r?\n/).filter(Boolean).slice(-limit).map((line) => {
    try { return JSON.parse(line) } catch { return null }
  }).filter(Boolean)
}

export async function GET() {
  return NextResponse.json({ ok: true, source: 'bayview_office_email', event: 'health_check', staff: demoStaff, recent: await listRecent(20) })
}

export async function POST(request: NextRequest) {
  const receivedAt = new Date().toISOString()
  const body = await request.json().catch(() => ({}))
  const fromKey = safeString(body.fromKey || 'dana', 40).toLowerCase()
  const toKeys = Array.isArray(body.toKeys) ? body.toKeys.map((v) => safeString(v, 40).toLowerCase()) : ['carla']
  const record = {
    source: 'office_email_simulator',
    event: 'office_email_received',
    receivedAt,
    from: demoStaff[fromKey] || safeString(body.from, 180) || demoStaff.dana,
    to: toKeys.map((key) => demoStaff[key]).filter(Boolean).length ? toKeys.map((key) => demoStaff[key]).filter(Boolean) : [demoStaff.carla],
    cc: Array.isArray(body.cc) ? body.cc.map((v) => safeString(v, 180)).filter(Boolean) : [],
    subject: safeString(body.subject, 240),
    body: safeString(body.body, 3000),
    relatedCustomerName: safeString(body.relatedCustomerName, 160),
    relatedAddress: safeString(body.relatedAddress, 240),
    priority: safeString(body.priority || 'normal', 40),
  }

  if (!record.subject || !record.body) {
    return NextResponse.json({ ok: false, error: 'missing_required_fields', required: ['subject', 'body'] }, { status: 400 })
  }

  await persist(record, receivedAt)
  return NextResponse.json({ ok: true, source: 'bayview_office_email', event: 'office_email_received', receivedAt, email: record })
}
