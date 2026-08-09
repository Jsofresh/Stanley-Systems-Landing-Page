import * as React from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export type FlowStepProps = React.ComponentProps<'div'> & {
  icon?: LucideIcon
  label: string
  description?: string
  active?: boolean
  index?: number
}

export function FlowStep({ icon: Icon, label, description, active, index, className, ...props }: FlowStepProps) {
  return (
    <div
      className={cn(
        'group relative flex min-w-0 items-center gap-3 rounded-2xl border bg-white p-3 text-left shadow-sm',
        active ? 'border-emerald-400 ring-4 ring-emerald-100' : 'border-slate-200',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-xl',
          active ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700',
        )}
        aria-hidden="true"
      >
        {Icon ? <Icon className="size-5" /> : <span className="text-sm font-semibold">{index}</span>}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-950">{label}</p>
        {description && <p className="mt-0.5 text-xs leading-5 text-slate-600">{description}</p>}
      </div>
    </div>
  )
}
