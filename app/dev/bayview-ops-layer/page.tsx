import { buildOpsLayerSnapshot } from '@/lib/stanley-demo/ops-layer'

export const dynamic = 'force-dynamic'

const priorityColor: Record<string, string> = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#94a3b8',
}

export default async function BayviewOpsLayerPage() {
  const snapshot = await buildOpsLayerSnapshot()
  const topActions = snapshot.actionQueue.slice(0, 12)
  const recentEvents = snapshot.normalizedEvents.slice(0, 18)
  const matches = snapshot.entityMatches.filter((m) => m.relatedEvents.length || m.sms).slice(0, 18)

  return (
    <main style={{ minHeight: '100vh', background: '#071013', color: '#e5f4ef', fontFamily: 'Inter, ui-sans-serif, system-ui', padding: 24 }}>
      <section style={{ maxWidth: 1360, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <p style={{ margin: '0 0 8px', color: '#7dd3fc', letterSpacing: 2, textTransform: 'uppercase', fontSize: 12 }}>Stanley Systems Demo</p>
            <h1 style={{ margin: 0, fontSize: 44, lineHeight: 1.02 }}>Bayview Operating Layer</h1>
            <p style={{ maxWidth: 760, color: '#a7b8b3', fontSize: 17, lineHeight: 1.55 }}>
              Jobber, QuickBooks, and technician texts normalized into matched customers, operational gaps, and an approval-gated action queue.
            </p>
          </div>
          <div style={{ textAlign: 'right', color: '#a7b8b3', fontSize: 13 }}>
            <div>Generated</div>
            <strong style={{ color: '#e5f4ef' }}>{new Date(snapshot.generatedAt).toLocaleString()}</strong>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 12, marginBottom: 24 }}>
          {[
            ['Normalized Events', snapshot.counts.normalizedEvents],
            ['Matched Entities', snapshot.counts.entityMatches],
            ['Action Queue', snapshot.counts.actionQueue],
            ['Critical', snapshot.counts.critical],
            ['High', snapshot.counts.high],
          ].map(([label, value]) => (
            <div key={label} style={{ border: '1px solid rgba(148,163,184,.22)', background: 'rgba(15,23,42,.7)', borderRadius: 18, padding: 18 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.4 }}>{label}</div>
              <div style={{ fontSize: 34, fontWeight: 800, marginTop: 8 }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr .9fr', gap: 18, alignItems: 'start' }}>
          <section style={{ border: '1px solid rgba(148,163,184,.22)', background: 'rgba(2,6,23,.75)', borderRadius: 22, padding: 18 }}>
            <h2 style={{ margin: '0 0 14px', fontSize: 24 }}>Operator Action Queue</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {topActions.map((item) => (
                <article key={item.id} style={{ border: '1px solid rgba(148,163,184,.18)', background: 'rgba(15,23,42,.72)', borderRadius: 16, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <div style={{ color: priorityColor[item.priority], fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.3, fontWeight: 800 }}>{item.priority} · {item.actionType.replaceAll('_', ' ')}</div>
                      <h3 style={{ margin: '6px 0', fontSize: 18 }}>{item.title}</h3>
                    </div>
                    <span style={{ alignSelf: 'start', border: '1px solid rgba(125,211,252,.35)', color: '#7dd3fc', borderRadius: 999, padding: '5px 9px', fontSize: 12 }}>{item.status.replaceAll('_', ' ')}</span>
                  </div>
                  <p style={{ color: '#b7c7c2', margin: '8px 0', lineHeight: 1.45 }}>{item.whyItMatters}</p>
                  <p style={{ margin: '8px 0 0', color: '#e5f4ef' }}><strong>Proposed:</strong> {item.proposedAction}</p>
                  <details style={{ marginTop: 10, color: '#94a3b8' }}>
                    <summary>Evidence</summary>
                    <ul>
                      {item.evidence.map((e) => <li key={e} style={{ overflowWrap: 'anywhere', marginTop: 6 }}>{e}</li>)}
                    </ul>
                  </details>
                </article>
              ))}
            </div>
          </section>

          <section style={{ display: 'grid', gap: 18 }}>
            <div style={{ border: '1px solid rgba(148,163,184,.22)', background: 'rgba(2,6,23,.75)', borderRadius: 22, padding: 18 }}>
              <h2 style={{ margin: '0 0 14px', fontSize: 22 }}>Entity Matching</h2>
              <div style={{ display: 'grid', gap: 10 }}>
                {matches.map((m) => (
                  <div key={m.customerName} style={{ borderBottom: '1px solid rgba(148,163,184,.14)', paddingBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <strong>{m.customerName}</strong>
                      <span style={{ color: '#86efac' }}>{Math.round(m.confidence * 100)}%</span>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{m.matchedBy.join(' · ')}</div>
                    <div style={{ color: '#cbd5e1', fontSize: 13, marginTop: 5 }}>
                      Jobber: {m.jobber?.state || (m.jobber?.jobUrl ? 'job activity' : 'none')}<br />
                      QBO: {m.qbo?.state || 'none'}{m.qbo?.invoiceId ? ` · invoice ${m.qbo.invoiceId}` : ''}{m.qbo?.estimateId ? ` · estimate ${m.qbo.estimateId}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ border: '1px solid rgba(148,163,184,.22)', background: 'rgba(2,6,23,.75)', borderRadius: 22, padding: 18 }}>
              <h2 style={{ margin: '0 0 14px', fontSize: 22 }}>Recent Normalized Events</h2>
              <div style={{ display: 'grid', gap: 9 }}>
                {recentEvents.map((e) => (
                  <div key={e.id} style={{ borderLeft: `3px solid ${e.source === 'twilio' ? '#22c55e' : e.source === 'jobber' ? '#38bdf8' : '#f59e0b'}`, paddingLeft: 10 }}>
                    <div style={{ fontSize: 12, color: '#94a3b8', textTransform: 'uppercase' }}>{e.source} · {e.eventType}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.35 }}>{e.summary}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
