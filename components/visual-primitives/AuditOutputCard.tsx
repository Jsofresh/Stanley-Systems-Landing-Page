import * as React from 'react'

import { cn } from '@/lib/utils'

export type AuditOutputCardProps = React.ComponentProps<'div'> & {
  title?: string
  finding: string
  revenueLeak?: string
  drag?: string
  firstFix?: string
}

export function AuditOutputCard({
  title = 'Audit output',
  finding,
  revenueLeak,
  drag,
  firstFix,
  className,
  ...props
}: AuditOutputCardProps) {
  const rows = [
    revenueLeak ? ['Estimated admin drag', revenueLeak] : null,
    drag ? ['Estimated drag', drag] : null,
    firstFix ? ['Build priority', firstFix] : null,
  ].filter(Boolean) as [string, string][]

  return (
    <div className={cn('rounded-2xl border border-slate-200 bg-white p-5 shadow-sm', className)} {...props}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{title}</p>
      <p className="mt-3 text-base font-semibold text-slate-950">{finding}</p>
      {rows.length > 0 && (
        <dl className="mt-5 grid gap-3">
          {rows.map(([label, value]) => (
            <div key={label} className="rounded-xl bg-slate-50 p-3">
              <dt className="text-xs font-medium text-slate-500">{label}</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-950">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
