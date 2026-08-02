import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'

export type SourceSystem = 'jobber' | 'quickbooks' | 'twilio' | 'intake' | 'email' | 'stanley'

export type NormalizedEvent = {
  id: string
  source: SourceSystem
  eventType: string
  occurredAt: string
  entityType?: string
  entityId?: string
  entityName?: string
  customerName?: string
  phoneLast4?: string
  summary: string
  evidence: string
  rawPath?: string
}

export type EntityMatch = {
  customerName: string
  confidence: number
  matchedBy: string[]
  relatedEvents: string[]
  jobber?: { clientUrl?: string; requestUrl?: string; jobUrl?: string; quoteUrl?: string; invoiceUrl?: string; state?: string }
  qbo?: { customerId?: string; invoiceId?: string; estimateId?: string; state?: string }
  sms?: { lastBody?: string; lastFromLast4?: string; lastAt?: string }
  intake?: { description?: string; urgency?: string; address?: string; lastAt?: string }
  email?: { subject?: string; body?: string; from?: string; priority?: string; lastAt?: string }
}

export type ActionQueueItem = {
  id: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  status: 'ready_for_review' | 'needs_operator_decision' | 'blocked_waiting_on_data'
  actionType: 'create_qbo_invoice' | 'draft_customer_followup' | 'owner_alert' | 'create_jobber_note' | 'follow_up_estimate' | 'reschedule_job' | 'parts_status_update' | 'create_jobber_request' | 'reconcile_office_email' | 'review_signal'
  customerName: string
  title: string
  whyItMatters: string
  evidence: string[]
  proposedAction: string
  approvalRequired: boolean
}

export type OpsLayerSnapshot = {
  generatedAt: string
  counts: { normalizedEvents: number; entityMatches: number; actionQueue: number; critical: number; high: number }
  normalizedEvents: NormalizedEvent[]
  entityMatches: EntityMatch[]
  actionQueue: ActionQueueItem[]
}

const DATA_ROOT = '/home/jaden/.local/share/stanley-systems/data/stanley-demo'
const JOBBER_SEED_PATHS = [
  path.join(DATA_ROOT, 'jobber-busy-day-seed-2026-06-10-rerun.json'),
  path.join(DATA_ROOT, 'jobber-busy-day-seed-2026-06-10.json'),
]
const QBO_SEED_PATH = path.join(DATA_ROOT, 'qbo-seed-2026-06-10.json')
const TWILIO_DIR = path.join(DATA_ROOT, 'twilio-sms')
const CUSTOMER_INTAKE_DIR = path.join(DATA_ROOT, 'customer-intake')
const OFFICE_EMAIL_DIR = path.join(DATA_ROOT, 'office-emails')
const JOBBER_WEBHOOK_DIR = path.join(DATA_ROOT, 'jobber-webhooks')
const QBO_WEBHOOK_DIR = path.join(DATA_ROOT, 'qbo-webhooks')

const scenarioCatalog: Record<string, { state: string; demoNote: string; jobber?: Partial<EntityMatch['jobber']>; qbo?: Partial<EntityMatch['qbo']> }> = {
  'Sarah Johnson': {
    state: 'completed_missing_invoice_and_replacement_opportunity',
    demoNote: 'Jobber has AC repair and replacement opportunity; QBO intentionally has no invoice.',
    jobber: { clientUrl: 'https://secure.getjobber.com/clients/143056696', requestUrl: 'https://secure.getjobber.com/work_requests/30596637', jobUrl: 'https://secure.getjobber.com/work_orders/147544333', quoteUrl: 'https://secure.getjobber.com/quotes/60658198', state: 'completed_missing_invoice' },
    qbo: { state: 'customer_only_missing_invoice' },
  },
}

function safeJsonParse<T = any>(text: string): T | null {
  try { return JSON.parse(text) as T } catch { return null }
}

async function readJson<T = any>(filePath: string): Promise<T | null> {
  try {
    return safeJsonParse<T>(await readFile(filePath, 'utf8'))
  } catch {
    return null
  }
}

async function newestJsonlFiles(dir: string, limit = 4) {
  try {
    const files = await readdir(dir)
    const dated = await Promise.all(files.filter((f) => f.endsWith('.jsonl')).map(async (f) => {
      const full = path.join(dir, f)
      const s = await stat(full)
      return { full, mtime: s.mtimeMs }
    }))
    return dated.sort((a, b) => b.mtime - a.mtime).slice(0, limit).map((x) => x.full)
  } catch {
    return []
  }
}

async function readJsonl(dir: string, limit = 150) {
  const files = await newestJsonlFiles(dir)
  const rows: any[] = []
  for (const file of files.reverse()) {
    const text = await readFile(file, 'utf8').catch(() => '')
    for (const line of text.split(/\r?\n/)) {
      if (!line.trim()) continue
      const parsed = safeJsonParse(line)
      if (parsed) rows.push({ ...parsed, __rawPath: file })
    }
  }
  return rows.slice(-limit)
}

function idFor(...parts: Array<string | number | undefined | null>) {
  return parts.filter(Boolean).join(':').replace(/[^a-zA-Z0-9:_-]+/g, '-').slice(0, 180)
}

function last4(value?: string | null) {
  const digits = (value || '').replace(/\D/g, '')
  return digits.slice(-4) || undefined
}

function normalizePhoneBody(body: string) {
  return body.toLowerCase()
}

function namesFromSources(jobberRecords: any[], qboRecords: any[], intakeRows: any[], emailRows: any[]) {
  const names = new Set<string>(Object.keys(scenarioCatalog))
  for (const r of jobberRecords) if (r?.name) names.add(r.name)
  for (const r of qboRecords) if (r?.name) names.add(r.name)
  for (const r of intakeRows) if (r?.customerName) names.add(r.customerName)
  for (const r of emailRows) if (r?.relatedCustomerName) names.add(r.relatedCustomerName)
  return [...names]
}

function inferCustomerFromSms(body: string, names: string[]) {
  const lower = normalizePhoneBody(body)
  const direct = names.find((name) => lower.includes(name.toLowerCase()) || lower.includes(name.split(' ').slice(-1)[0].toLowerCase()))
  if (direct) return { name: direct, matchedBy: ['sms_body_name_or_last_name'], confidence: 0.86 }
  if (lower.includes('1428 pine') || lower.includes('pine street')) return { name: 'Sarah Johnson', matchedBy: ['sms_body_address'], confidence: 0.9 }
  return { name: undefined, matchedBy: [], confidence: 0.2 }
}

async function loadJobberSeedRecords() {
  for (const p of JOBBER_SEED_PATHS) {
    const obj = await readJson<any>(p)
    if (obj?.records?.length) return obj.records as any[]
  }
  return []
}

async function loadQboSeedRecords() {
  const obj = await readJson<any>(QBO_SEED_PATH)
  return obj?.records || []
}

function eventFromJobberSeed(r: any): NormalizedEvent {
  const parts = []
  if (r.requestUrl) parts.push('request')
  if (r.jobUrl) parts.push('job')
  if (r.quoteUrl) parts.push('quote')
  if (r.invoiceUrl) parts.push('invoice')
  return {
    id: idFor('jobber-seed', r.name, r.state),
    source: 'jobber',
    eventType: `demo_state.${r.state || 'unknown'}`,
    occurredAt: new Date().toISOString(),
    entityType: 'customer',
    entityName: r.name,
    customerName: r.name,
    summary: `${r.name}: Jobber has ${parts.join(', ') || 'client'} activity (${r.state}).`,
    evidence: [r.clientUrl, r.requestUrl, r.jobUrl, r.quoteUrl, r.invoiceUrl].filter(Boolean).join(' | '),
    rawPath: JOBBER_SEED_PATHS[0],
  }
}

function eventFromQboSeed(r: any): NormalizedEvent {
  const action = r.action || (r.invoiceId ? 'invoice' : r.estimateId ? 'estimate' : 'customer_only')
  return {
    id: idFor('qbo-seed', r.name, action, r.invoiceId || r.estimateId || r.customerId),
    source: 'quickbooks',
    eventType: `demo_accounting.${action}`,
    occurredAt: new Date().toISOString(),
    entityType: r.invoiceId ? 'invoice' : r.estimateId ? 'estimate' : 'customer',
    entityId: r.invoiceId || r.estimateId || r.customerId,
    entityName: r.name,
    customerName: r.name,
    summary: `${r.name}: QBO ${action.replace(/_/g, ' ')}${r.docNumber ? ` #${r.docNumber}` : ''}${r.totalAmt ? ` for $${r.totalAmt}` : ''}.`,
    evidence: JSON.stringify({ customerId: r.customerId, invoiceId: r.invoiceId, estimateId: r.estimateId, docNumber: r.docNumber, totalAmt: r.totalAmt }),
    rawPath: QBO_SEED_PATH,
  }
}

function eventFromSms(row: any, names: string[]): NormalizedEvent {
  const body = row.Body || row.body || row.payload?.Body || ''
  const match = inferCustomerFromSms(body, names)
  return {
    id: idFor('twilio', row.MessageSid || row.messageSid || row.receivedAt, body.slice(0, 20)),
    source: 'twilio',
    eventType: 'technician_sms.received',
    occurredAt: row.receivedAt || row.timestamp || new Date().toISOString(),
    entityType: 'technician_message',
    entityId: row.MessageSid || row.messageSid,
    entityName: row.From || row.from,
    customerName: match.name,
    phoneLast4: last4(row.From || row.from),
    summary: `Technician SMS${match.name ? ` matched to ${match.name}` : ''}: “${String(body).slice(0, 140)}”`,
    evidence: body,
    rawPath: row.__rawPath,
  }
}

function inferCustomerFromText(text: string, names: string[]) {
  const lower = normalizePhoneBody(text)
  const direct = names.find((name) => lower.includes(name.toLowerCase()) || lower.includes(name.split(' ').slice(-1)[0].toLowerCase()))
  if (direct) return { name: direct, matchedBy: ['text_name_or_last_name'], confidence: 0.86 }
  if (lower.includes('1428 pine') || lower.includes('pine street')) return { name: 'Sarah Johnson', matchedBy: ['text_address'], confidence: 0.9 }
  return { name: undefined, matchedBy: [], confidence: 0.2 }
}

function eventFromIntake(row: any): NormalizedEvent {
  const issue = [row.issueType, row.urgency].filter(Boolean).join(' / ')
  return {
    id: idFor('intake', row.customerName, row.receivedAt, row.phone),
    source: 'intake',
    eventType: 'customer_intake.submitted',
    occurredAt: row.receivedAt || new Date().toISOString(),
    entityType: 'customer_request',
    entityName: row.customerName,
    customerName: row.customerName,
    phoneLast4: last4(row.phone),
    summary: `${row.customerName}: online intake submitted${issue ? ` (${issue})` : ''}.`,
    evidence: JSON.stringify({ address: row.address, phoneLast4: last4(row.phone), issueType: row.issueType, urgency: row.urgency, preferredWindow: row.preferredWindow, description: row.description, consentToText: row.consentToText }),
    rawPath: row.__rawPath,
  }
}

function eventFromOfficeEmail(row: any, names: string[]): NormalizedEvent {
  const body = `${row.subject || ''}\n${row.body || ''}\n${row.relatedCustomerName || ''}\n${row.relatedAddress || ''}`
  const match = row.relatedCustomerName ? { name: row.relatedCustomerName } : inferCustomerFromText(body, names)
  return {
    id: idFor('office-email', row.receivedAt, row.subject),
    source: 'email',
    eventType: 'office_email.received',
    occurredAt: row.receivedAt || new Date().toISOString(),
    entityType: 'office_email',
    entityName: row.subject,
    customerName: match.name,
    summary: `Office email${match.name ? ` about ${match.name}` : ''}: “${String(row.subject || '').slice(0, 120)}”`,
    evidence: JSON.stringify({ from: row.from, to: row.to, priority: row.priority, subject: row.subject, body: row.body, relatedAddress: row.relatedAddress }),
    rawPath: row.__rawPath,
  }
}

function eventFromJobberWebhook(row: any): NormalizedEvent | null {
  const event = row?.payload?.data?.webHookEvent
  if (!event?.topic) return null
  return {
    id: idFor('jobber-webhook', event.topic, event.itemId, row.receivedAt),
    source: 'jobber',
    eventType: `webhook.${event.topic}`,
    occurredAt: row.receivedAt || new Date().toISOString(),
    entityType: event.topic.split('_')[0]?.toLowerCase(),
    entityId: event.itemId,
    summary: `Jobber webhook: ${event.topic}`,
    evidence: JSON.stringify({ topic: event.topic, itemId: event.itemId }),
    rawPath: row.__rawPath,
  }
}

function eventFromQboWebhook(row: any): NormalizedEvent[] {
  const out: NormalizedEvent[] = []
  const notifications = row?.payload?.eventNotifications || []
  for (const n of notifications) {
    for (const e of n?.dataChangeEvent?.entities || []) {
      out.push({
        id: idFor('qbo-webhook', n.realmId, e.name, e.id, e.operation, row.receivedAt),
        source: 'quickbooks',
        eventType: `webhook.${e.name}.${e.operation}`,
        occurredAt: row.receivedAt || new Date().toISOString(),
        entityType: String(e.name || '').toLowerCase(),
        entityId: e.id,
        summary: `QBO webhook: ${e.name} ${e.operation}`,
        evidence: JSON.stringify({ realmId: n.realmId, entity: e.name, id: e.id, operation: e.operation, signature: row.signatureCheck?.reason }),
        rawPath: row.__rawPath,
      })
    }
  }
  return out
}

function buildMatches(names: string[], jobberRecords: any[], qboRecords: any[], smsEvents: NormalizedEvent[], intakeEvents: NormalizedEvent[], emailEvents: NormalizedEvent[], allEvents: NormalizedEvent[]): EntityMatch[] {
  return names.map((name) => {
    const jobber = jobberRecords.find((r) => r.name === name) || scenarioCatalog[name]?.jobber || {}
    const qbo = qboRecords.find((r) => r.name === name) || scenarioCatalog[name]?.qbo || {}
    const related = allEvents.filter((e) => e.customerName === name)
    const sms = smsEvents.filter((e) => e.customerName === name).sort((a, b) => a.occurredAt.localeCompare(b.occurredAt)).at(-1)
    const intake = intakeEvents.filter((e) => e.customerName === name).sort((a, b) => a.occurredAt.localeCompare(b.occurredAt)).at(-1)
    const email = emailEvents.filter((e) => e.customerName === name).sort((a, b) => a.occurredAt.localeCompare(b.occurredAt)).at(-1)
    const matchedBy = ['seeded_demo_name']
    if (sms) matchedBy.push('sms_body_match')
    if (intake) matchedBy.push('online_intake_submission')
    if (email) matchedBy.push('office_email_reference')
    if (jobber?.jobUrl && (qbo?.invoiceId || qbo?.action === 'invoice')) matchedBy.push('jobber_job_to_qbo_invoice')
    if (jobber?.quoteUrl && (qbo?.estimateId || qbo?.action === 'estimate')) matchedBy.push('jobber_quote_to_qbo_estimate')
    return {
      customerName: name,
      confidence: sms || intake || email ? 0.93 : 0.82,
      matchedBy,
      relatedEvents: related.map((e) => e.id),
      jobber: { clientUrl: jobber.clientUrl, requestUrl: jobber.requestUrl, jobUrl: jobber.jobUrl, quoteUrl: jobber.quoteUrl, invoiceUrl: jobber.invoiceUrl, state: jobber.state || scenarioCatalog[name]?.state },
      qbo: { customerId: qbo.customerId, invoiceId: qbo.invoiceId, estimateId: qbo.estimateId, state: qbo.action || qbo.state },
      sms: sms ? { lastBody: sms.evidence, lastFromLast4: sms.phoneLast4, lastAt: sms.occurredAt } : undefined,
      intake: intake ? { description: intake.evidence, urgency: intake.eventType, address: intake.entityName, lastAt: intake.occurredAt } : undefined,
      email: email ? { subject: email.entityName, body: email.evidence, from: email.entityId, priority: email.eventType, lastAt: email.occurredAt } : undefined,
    }
  })
}

function hasWords(text: string | undefined, words: string[]) {
  const lower = (text || '').toLowerCase()
  return words.some((w) => lower.includes(w))
}

function buildActionQueue(matches: EntityMatch[]): ActionQueueItem[] {
  const items: ActionQueueItem[] = []
  for (const m of matches) {
    const sms = m.sms?.lastBody || ''
    const intakeText = m.intake?.description || ''
    const emailText = `${m.email?.subject || ''}\n${m.email?.body || ''}`
    const signalText = `${sms}\n${intakeText}\n${emailText}`
    const jobberState = m.jobber?.state || ''
    const hasJob = Boolean(m.jobber?.jobUrl)
    const hasQboInvoice = Boolean(m.qbo?.invoiceId) || m.qbo?.state === 'invoice'
    const hasQboEstimate = Boolean(m.qbo?.estimateId) || m.qbo?.state === 'estimate'
    const hasJobberQuote = Boolean(m.jobber?.quoteUrl)

    if (hasJob && !hasQboInvoice && (hasWords(jobberState, ['missing_invoice', 'completed']) || hasWords(signalText, ['finished', 'done', 'complete', 'invoice']))) {
      items.push({
        id: idFor('action', m.customerName, 'create-qbo-invoice'),
        priority: 'critical',
        status: 'ready_for_review',
        actionType: 'create_qbo_invoice',
        customerName: m.customerName,
        title: `Create/check QBO invoice for ${m.customerName}`,
        whyItMatters: 'Jobber/field evidence says work happened, but QBO has no invoice record matched to this customer.',
        evidence: [m.jobber?.jobUrl, m.sms?.lastBody, `QBO state: ${m.qbo?.state || 'none'}`].filter(Boolean) as string[],
        proposedAction: 'Prepare an invoice draft in QuickBooks and attach a Jobber note summarizing the source evidence. Do not send externally without owner approval.',
        approvalRequired: true,
      })
    }

    if ((hasJobberQuote || hasWords(jobberState, ['quote', 'estimate', 'opportunity', 'permit']) || hasWords(signalText, ['replacement', 'estimate', 'quote'])) && !hasQboEstimate) {
      items.push({
        id: idFor('action', m.customerName, 'follow-up-estimate'),
        priority: hasWords(jobberState, ['permit', 'replacement']) ? 'high' : 'medium',
        status: 'ready_for_review',
        actionType: 'follow_up_estimate',
        customerName: m.customerName,
        title: `Follow up estimate opportunity for ${m.customerName}`,
        whyItMatters: 'The operational record contains a sales opportunity that can go cold if office follow-up lags.',
        evidence: [m.jobber?.quoteUrl, m.sms?.lastBody, `Jobber state: ${jobberState}`].filter(Boolean) as string[],
        proposedAction: 'Draft customer follow-up and/or QBO estimate review task. Keep it approval-gated before sending.',
        approvalRequired: true,
      })
    }

    if (hasWords(jobberState, ['angry']) || hasWords(signalText, ['angry', 'upset', 'mad', 'frustrated', 'stopped again'])) {
      items.push({
        id: idFor('action', m.customerName, 'owner-alert'),
        priority: 'critical',
        status: 'needs_operator_decision',
        actionType: 'owner_alert',
        customerName: m.customerName,
        title: `Owner/dispatcher alert for ${m.customerName}`,
        whyItMatters: 'A frustrated customer can become a review/refund risk if nobody owns the handoff.',
        evidence: [m.sms?.lastBody, `Jobber state: ${jobberState}`].filter(Boolean) as string[],
        proposedAction: 'Alert owner/dispatcher with source context and suggested callback script. No customer send without approval.',
        approvalRequired: true,
      })
    }

    if (hasWords(jobberState, ['reschedule']) || hasWords(signalText, ['reschedule', 'move appointment'])) {
      items.push({
        id: idFor('action', m.customerName, 'reschedule'),
        priority: 'high',
        status: 'ready_for_review',
        actionType: 'reschedule_job',
        customerName: m.customerName,
        title: `Reschedule needed for ${m.customerName}`,
        whyItMatters: 'Customer asked to move an appointment; schedule needs an office action before it turns into a no-show.',
        evidence: [m.sms?.lastBody, `Jobber state: ${jobberState}`].filter(Boolean) as string[],
        proposedAction: 'Prepare reschedule task for dispatcher and draft customer confirmation.',
        approvalRequired: true,
      })
    }

    if (hasWords(jobberState, ['parts_on_order']) || hasWords(signalText, ['part', 'board', 'ordered'])) {
      items.push({
        id: idFor('action', m.customerName, 'parts-status'),
        priority: 'medium',
        status: 'ready_for_review',
        actionType: 'parts_status_update',
        customerName: m.customerName,
        title: `Parts/status update for ${m.customerName}`,
        whyItMatters: 'Parts delays create inbound calls unless the office proactively updates the customer.',
        evidence: [m.sms?.lastBody, `Jobber state: ${jobberState}`].filter(Boolean) as string[],
        proposedAction: 'Draft customer status update and internal Jobber note.',
        approvalRequired: true,
      })
    }

    if (m.intake && !m.jobber?.requestUrl) {
      items.push({
        id: idFor('action', m.customerName, 'create-jobber-request'),
        priority: hasWords(signalText, ['emergency', 'same-day', 'no heat', 'elderly', 'urgent']) ? 'critical' : 'high',
        status: 'ready_for_review',
        actionType: 'create_jobber_request',
        customerName: m.customerName,
        title: `Create Jobber request for new intake: ${m.customerName}`,
        whyItMatters: 'A customer asked for service through the online form, but there is no matched Jobber request yet.',
        evidence: [m.intake.description || '', `Jobber request: ${m.jobber?.requestUrl || 'none'}`].filter(Boolean),
        proposedAction: 'Prepare a Jobber request with the intake details, service address, urgency, and text-consent note for dispatcher review.',
        approvalRequired: true,
      })
    }

    if (m.email) {
      items.push({
        id: idFor('action', m.customerName, 'reconcile-office-email', m.email.lastAt),
        priority: hasWords(signalText, ['critical', 'urgent', 'today', 'cannot find', 'needs to know']) ? 'high' : 'medium',
        status: 'ready_for_review',
        actionType: 'reconcile_office_email',
        customerName: m.customerName,
        title: `Reconcile office email for ${m.customerName}`,
        whyItMatters: 'Staff are discussing work in email; Stanley should attach the signal to the customer/job and turn it into a clear office action.',
        evidence: [m.email.subject || '', m.email.body || ''].filter(Boolean),
        proposedAction: 'Create an internal action bundle: matched customer, referenced job/accounting state, next owner, and draft response or Jobber note.',
        approvalRequired: true,
      })
    }

    if (m.sms?.lastBody) {
      items.push({
        id: idFor('action', m.customerName, 'jobber-note'),
        priority: 'medium',
        status: 'ready_for_review',
        actionType: 'create_jobber_note',
        customerName: m.customerName,
        title: `Add technician note to Jobber for ${m.customerName}`,
        whyItMatters: 'The field update should not stay buried in a technician text thread.',
        evidence: [m.sms.lastBody],
        proposedAction: 'Create a Jobber note on the matched customer/job with the normalized technician update.',
        approvalRequired: true,
      })
    }
  }

  const rank = { critical: 0, high: 1, medium: 2, low: 3 }
  return items.sort((a, b) => rank[a.priority] - rank[b.priority] || a.customerName.localeCompare(b.customerName))
}

export async function buildOpsLayerSnapshot(): Promise<OpsLayerSnapshot> {
  const [jobberRecords, qboRecords, smsRows, intakeRows, emailRows, jobberWebhookRows, qboWebhookRows] = await Promise.all([
    loadJobberSeedRecords(),
    loadQboSeedRecords(),
    readJsonl(TWILIO_DIR),
    readJsonl(CUSTOMER_INTAKE_DIR),
    readJsonl(OFFICE_EMAIL_DIR),
    readJsonl(JOBBER_WEBHOOK_DIR),
    readJsonl(QBO_WEBHOOK_DIR),
  ])
  const names = namesFromSources(jobberRecords, qboRecords, intakeRows, emailRows)
  const seedEvents = [...jobberRecords.map(eventFromJobberSeed), ...qboRecords.map(eventFromQboSeed)]
  const smsEvents = smsRows.map((r) => eventFromSms(r, names))
  const intakeEvents = intakeRows.map(eventFromIntake)
  const emailEvents = emailRows.map((r) => eventFromOfficeEmail(r, names))
  const webhookEvents = [
    ...jobberWebhookRows.map(eventFromJobberWebhook).filter(Boolean) as NormalizedEvent[],
    ...qboWebhookRows.flatMap(eventFromQboWebhook),
  ]
  const normalizedEvents = [...seedEvents, ...smsEvents, ...intakeEvents, ...emailEvents, ...webhookEvents]
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))
    .slice(0, 250)
  const matches = buildMatches(names, jobberRecords, qboRecords, smsEvents, intakeEvents, emailEvents, normalizedEvents)
  const actionQueue = buildActionQueue(matches)
  return {
    generatedAt: new Date().toISOString(),
    counts: {
      normalizedEvents: normalizedEvents.length,
      entityMatches: matches.length,
      actionQueue: actionQueue.length,
      critical: actionQueue.filter((a) => a.priority === 'critical').length,
      high: actionQueue.filter((a) => a.priority === 'high').length,
    },
    normalizedEvents,
    entityMatches: matches,
    actionQueue,
  }
}
