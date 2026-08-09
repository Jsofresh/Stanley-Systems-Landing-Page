import * as React from 'react'

import { cn } from '@/lib/utils'

export type MetricCalloutProps = React.ComponentProps<'div'> & {
  label: string
  value: string
  helper?: string
}

export function MetricCallout({ label, value, helper, className, ...props }: MetricCalloutProps) {
  return (
    <div className={cn('rounded-2xl border border-slate-200 bg-white p-4 shadow-sm', className)} {...props}>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
      {helper && <p className="mt-1 text-sm leading-6 text-slate-600">{helper}</p>}
    </div>
  )
}
