'use client'

import { FormEvent, useMemo, useState } from 'react'

type ApiResult = { ok?: boolean; [key: string]: unknown }

const emailPresets = [
  {
    label: 'Dispatcher → Office: new urgent lead',
    fromKey: 'carla',
    toKeys: ['dana'],
    relatedCustomerName: 'Maya Robinson',
    relatedAddress: '88 Valley Street, San Francisco, CA 94110',
    priority: 'high',
    subject: 'New intake - no heat / elderly parent at home',
    body: 'Dana — online form came in from Maya Robinson at 88 Valley. No heat, elderly parent in the house, wants someone today. Can you check Jobber for duplicate customer and get a tech slot? If we cannot get there today, Mike needs to know before 2pm.',
  },
  {
    label: 'Office → Owner: billing gap',
    fromKey: 'dana',
    toKeys: ['mike'],
    relatedCustomerName: 'Tom Whitaker',
    relatedAddress: '2140 Castro Street, San Francisco, CA 94131',
    priority: 'critical',
    subject: 'Tom Whitaker job looks done but I cannot find QBO invoice',
    body: 'Mike — Trevor marked Whitaker done in the notes yesterday. Jobber has the job, but I do not see a QuickBooks invoice. Customer asked for the receipt before end of day. Can Stanley flag this and prep the invoice draft?',
  },
  {
    label: 'Tech → Dispatcher: messy field note',
    fromKey: 'luis',
    toKeys: ['carla'],
    relatedCustomerName: 'Sarah Johnson',
    relatedAddress: '1428 Pine Street, San Francisco, CA 94109',
    priority: 'high',
    subject: 'Johnson AC repair finished + replacement interest',
    body: 'Carla, finished Johnson at Pine. Cap swapped, unit running but system is old and struggling. She asked about full replacement before summer. Please make sure invoice goes out and quote follow-up does not get lost.',
  },
]

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label style={{ display: 'grid', gap: 7, color: '#cbd5e1', fontSize: 13, fontWeight: 700 }}>{label}{children}</label>
}

const inputStyle = { width: '100%', border: '1px solid rgba(148,163,184,.25)', background: 'rgba(15,23,42,.78)', color: '#e5f4ef', borderRadius: 12, padding: '11px 12px', outline: 'none' }

export default function BayviewIntakePage() {
  const [intake, setIntake] = useState({
    customerName: 'Maya Robinson',
    phone: '+1 415 555 0188',
    email: 'maya.robinson.demo@example.com',
    address: '88 Valley Street, San Francisco, CA 94110',
    issueType: 'No heat',
    urgency: 'Emergency / same-day',
    preferredWindow: 'Today before 4pm',
    description: 'No heat since last night. Elderly parent is home. Furnace clicks but does not start. Please text updates.',
    sourceChannel: 'online_form',
    consentToText: true,
  })
  const [email, setEmail] = useState(emailPresets[0])
  const [lastResult, setLastResult] = useState<ApiResult | null>(null)
  const [busy, setBusy] = useState(false)

  const preview = useMemo(() => lastResult ? JSON.stringify(lastResult, null, 2) : '', [lastResult])

  async function submitIntake(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    const res = await fetch('/api/demo/customer-intake', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(intake) })
    const json = await res.json()
    setLastResult(json)
    setBusy(false)
  }

  async function submitEmail(e?: FormEvent) {
    e?.preventDefault()
    setBusy(true)
    const res = await fetch('/api/demo/office-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(email) })
    const json = await res.json()
    setLastResult(json)
    setBusy(false)
  }

  return (
    <main style={{ minHeight: '100vh', background: '#071013', color: '#e5f4ef', fontFamily: 'Inter, ui-sans-serif, system-ui', padding: 24 }}>
      <section style={{ maxWidth: 1240, margin: '0 auto' }}>
        <p style={{ margin: '0 0 8px', color: '#7dd3fc', letterSpacing: 2, textTransform: 'uppercase', fontSize: 12 }}>Bayview Heating & Air</p>
        <h1 style={{ margin: 0, fontSize: 42, lineHeight: 1.02 }}>Customer Intake + Office Email Simulator</h1>
        <p style={{ maxWidth: 760, color: '#a7b8b3', fontSize: 17, lineHeight: 1.55 }}>
          Submit messy customer requests and staff emails into the Stanley Systems operating layer. Nothing sends to real customers — this writes demo events for matching, gap detection, and operator actions.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, alignItems: 'start' }}>
          <form onSubmit={submitIntake} style={{ border: '1px solid rgba(148,163,184,.22)', background: 'rgba(2,6,23,.75)', borderRadius: 22, padding: 18, display: 'grid', gap: 13 }}>
            <h2 style={{ margin: 0, fontSize: 24 }}>Online Customer Intake Form</h2>
            <Field label="Customer name"><input style={inputStyle} value={intake.customerName} onChange={(e) => setIntake({ ...intake, customerName: e.target.value })} /></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Phone"><input style={inputStyle} value={intake.phone} onChange={(e) => setIntake({ ...intake, phone: e.target.value })} /></Field>
              <Field label="Email"><input style={inputStyle} value={intake.email} onChange={(e) => setIntake({ ...intake, email: e.target.value })} /></Field>
            </div>
            <Field label="Service address"><input style={inputStyle} value={intake.address} onChange={(e) => setIntake({ ...intake, address: e.target.value })} /></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Issue type"><input style={inputStyle} value={intake.issueType} onChange={(e) => setIntake({ ...intake, issueType: e.target.value })} /></Field>
              <Field label="Urgency"><input style={inputStyle} value={intake.urgency} onChange={(e) => setIntake({ ...intake, urgency: e.target.value })} /></Field>
            </div>
            <Field label="Preferred window"><input style={inputStyle} value={intake.preferredWindow} onChange={(e) => setIntake({ ...intake, preferredWindow: e.target.value })} /></Field>
            <Field label="What is happening?"><textarea style={{ ...inputStyle, minHeight: 128 }} value={intake.description} onChange={(e) => setIntake({ ...intake, description: e.target.value })} /></Field>
            <label style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#cbd5e1', fontSize: 14 }}>
              <input type="checkbox" checked={intake.consentToText} onChange={(e) => setIntake({ ...intake, consentToText: e.target.checked })} /> Customer says text updates are okay
            </label>
            <button disabled={busy} style={{ border: 0, borderRadius: 14, padding: '13px 16px', background: '#22c55e', color: '#04130a', fontWeight: 900, cursor: 'pointer' }}>Submit intake event</button>
          </form>

          <form onSubmit={submitEmail} style={{ border: '1px solid rgba(148,163,184,.22)', background: 'rgba(2,6,23,.75)', borderRadius: 22, padding: 18, display: 'grid', gap: 13 }}>
            <h2 style={{ margin: 0, fontSize: 24 }}>Office Staff Email Simulator</h2>
            <Field label="Preset">
              <select style={inputStyle} value={emailPresets.findIndex((p) => p.label === email.label)} onChange={(e) => setEmail(emailPresets[Number(e.target.value)])}>
                {emailPresets.map((preset, i) => <option key={preset.label} value={i}>{preset.label}</option>)}
              </select>
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="From key"><input style={inputStyle} value={email.fromKey} onChange={(e) => setEmail({ ...email, fromKey: e.target.value })} /></Field>
              <Field label="To keys"><input style={inputStyle} value={email.toKeys.join(', ')} onChange={(e) => setEmail({ ...email, toKeys: e.target.value.split(',').map((x) => x.trim()).filter(Boolean) })} /></Field>
            </div>
            <Field label="Related customer"><input style={inputStyle} value={email.relatedCustomerName} onChange={(e) => setEmail({ ...email, relatedCustomerName: e.target.value })} /></Field>
            <Field label="Related address"><input style={inputStyle} value={email.relatedAddress} onChange={(e) => setEmail({ ...email, relatedAddress: e.target.value })} /></Field>
            <Field label="Subject"><input style={inputStyle} value={email.subject} onChange={(e) => setEmail({ ...email, subject: e.target.value })} /></Field>
            <Field label="Body"><textarea style={{ ...inputStyle, minHeight: 178 }} value={email.body} onChange={(e) => setEmail({ ...email, body: e.target.value })} /></Field>
            <button disabled={busy} style={{ border: 0, borderRadius: 14, padding: '13px 16px', background: '#38bdf8', color: '#03131f', fontWeight: 900, cursor: 'pointer' }}>Send simulated office email</button>
          </form>
        </div>

        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <a href="/dev/bayview-ops-layer" style={{ display: 'block', border: '1px solid rgba(125,211,252,.35)', color: '#7dd3fc', borderRadius: 16, padding: 16, textDecoration: 'none', background: 'rgba(15,23,42,.7)' }}>Open Bayview Operating Layer →</a>
          <pre style={{ margin: 0, border: '1px solid rgba(148,163,184,.22)', background: 'rgba(15,23,42,.7)', borderRadius: 16, padding: 16, color: '#cbd5e1', overflow: 'auto', maxHeight: 220 }}>{preview || 'Submit a form/email to see the stored event response here.'}</pre>
        </div>
      </section>
    </main>
  )
}
