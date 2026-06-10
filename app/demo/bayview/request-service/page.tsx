'use client'

import { FormEvent, useState } from 'react'

const inputStyle = { width: '100%', border: '1px solid rgba(15,23,42,.18)', background: '#ffffff', color: '#0f172a', borderRadius: 12, padding: '12px 13px', outline: 'none', fontSize: 15 }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label style={{ display: 'grid', gap: 7, color: '#1f2937', fontSize: 13, fontWeight: 800 }}>{label}{children}</label>
}

export default function BayviewRequestServicePage() {
  const [form, setForm] = useState({
    customerName: 'Maya Robinson',
    phone: '+1 415 555 0188',
    email: 'maya.robinson@example.com',
    address: '88 Valley Street, San Francisco, CA 94110',
    issueType: 'No heat',
    urgency: 'Emergency / same-day',
    preferredWindow: 'Today before 4pm',
    description: 'No heat since last night. Elderly parent is home. Furnace clicks but does not start. Please text updates.',
    sourceChannel: 'bayview_mock_customer_form',
    consentToText: true,
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function submit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setMessage('')
    const res = await fetch('/api/demo/customer-intake', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const json = await res.json().catch(() => ({}))
    if (res.ok && json.ok) {
      setStatus('submitted')
      setMessage('Request received. Bayview Heating & Air will review the service request and follow up shortly.')
    } else {
      setStatus('error')
      setMessage('Something was missing. Please check the required fields and try again.')
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 42%, #fff7ed 100%)', color: '#0f172a', fontFamily: 'Inter, ui-sans-serif, system-ui', padding: 24 }}>
      <section style={{ maxWidth: 1120, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'center', marginBottom: 26 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: '#0369a1', fontWeight: 900, letterSpacing: 1.5, textTransform: 'uppercase', fontSize: 12 }}>
              <span style={{ width: 12, height: 12, background: '#f97316', borderRadius: 999, display: 'inline-block' }} /> Bayview Heating & Air
            </div>
            <h1 style={{ margin: '10px 0 8px', fontSize: 46, lineHeight: 1.02 }}>Request HVAC service</h1>
            <p style={{ margin: 0, maxWidth: 700, color: '#475569', fontSize: 18, lineHeight: 1.55 }}>Tell us what is happening, how urgent it is, and when you are available. Our office will review the request and follow up with the next available appointment window.</p>
          </div>
          <div style={{ background: '#0f172a', color: '#e0f2fe', borderRadius: 20, padding: 18, minWidth: 240, boxShadow: '0 20px 60px rgba(15,23,42,.18)' }}>
            <div style={{ fontSize: 12, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: 1.3, fontWeight: 900 }}>Service area</div>
            <div style={{ fontSize: 22, fontWeight: 900, marginTop: 6 }}>San Francisco Bay Area</div>
            <div style={{ color: '#cbd5e1', marginTop: 8 }}>Heating, cooling, tune-ups, diagnostics, replacements.</div>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr .75fr', gap: 20, alignItems: 'start' }}>
          <form onSubmit={submit} style={{ background: 'rgba(255,255,255,.9)', border: '1px solid rgba(15,23,42,.12)', borderRadius: 24, padding: 22, boxShadow: '0 24px 80px rgba(15,23,42,.12)', display: 'grid', gap: 14 }}>
            <h2 style={{ margin: 0, fontSize: 25 }}>Service request details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Full name"><input style={inputStyle} value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} required /></Field>
              <Field label="Phone"><input style={inputStyle} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></Field>
            </div>
            <Field label="Email"><input style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
            <Field label="Service address"><input style={inputStyle} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required /></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="What do you need help with?">
                <select style={inputStyle} value={form.issueType} onChange={(e) => setForm({ ...form, issueType: e.target.value })}>
                  <option>No heat</option>
                  <option>AC not cooling</option>
                  <option>System making noise</option>
                  <option>Maintenance tune-up</option>
                  <option>Replacement estimate</option>
                  <option>Other HVAC issue</option>
                </select>
              </Field>
              <Field label="Urgency">
                <select style={inputStyle} value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value })}>
                  <option>Emergency / same-day</option>
                  <option>This week</option>
                  <option>Flexible</option>
                  <option>Quote only</option>
                </select>
              </Field>
            </div>
            <Field label="Preferred appointment window"><input style={inputStyle} value={form.preferredWindow} onChange={(e) => setForm({ ...form, preferredWindow: e.target.value })} /></Field>
            <Field label="Describe the problem"><textarea style={{ ...inputStyle, minHeight: 150, resize: 'vertical' }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></Field>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, color: '#334155' }}>
              <input type="checkbox" checked={form.consentToText} onChange={(e) => setForm({ ...form, consentToText: e.target.checked })} /> Text updates are okay
            </label>
            <button disabled={status === 'submitting'} style={{ border: 0, background: '#f97316', color: '#111827', padding: '15px 18px', borderRadius: 14, fontSize: 16, fontWeight: 950, cursor: 'pointer' }}>{status === 'submitting' ? 'Submitting…' : 'Request service'}</button>
            {message && <div style={{ background: status === 'error' ? '#fee2e2' : '#dcfce7', color: status === 'error' ? '#991b1b' : '#14532d', borderRadius: 14, padding: 14, fontWeight: 800 }}>{message}</div>}
          </form>

          <aside style={{ display: 'grid', gap: 14 }}>
            <div style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,.12)', borderRadius: 22, padding: 20 }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 22 }}>What happens next?</h3>
              <ol style={{ margin: 0, paddingLeft: 20, color: '#475569', lineHeight: 1.6 }}>
                <li>The office reviews your request.</li>
                <li>A dispatcher checks the schedule.</li>
                <li>A technician gets the details before arrival.</li>
                <li>Billing and follow-up stay tied to the job.</li>
              </ol>
            </div>
            <div style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: 22, padding: 20 }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 21 }}>Need urgent help?</h3>
              <p style={{ margin: 0, lineHeight: 1.55, color: '#cbd5e1' }}>If heat or cooling is out and someone vulnerable is home, mark the request emergency and include the best callback number. The office prioritizes urgent service issues first.</p>
              <div style={{ marginTop: 14, color: '#7dd3fc', fontWeight: 900 }}>Call or text: (617) 958-6372</div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
