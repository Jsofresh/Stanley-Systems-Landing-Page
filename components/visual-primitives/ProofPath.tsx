import * as React from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { ConnectorArrow } from './ConnectorArrow'

export type ProofPathStep = {
  label: string
  icon?: LucideIcon
}

export type ProofPathProps = React.ComponentProps<'div'> & {
  title: string
  outcome?: string
  steps: ProofPathStep[]
}

export function ProofPath({ title, outcome, steps, className, ...props }: ProofPathProps) {
  return (
    <div className={cn('rounded-2xl border border-slate-200 bg-white p-4 shadow-sm', className)} {...props}>
      <p className="text-sm font-semibold text-slate-950">{title}</p>
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <React.Fragment key={`${step.label}-${index}`}>
              <div className="flex min-w-0 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                {Icon && <Icon className="size-4 shrink-0 text-emerald-700" aria-hidden="true" />}
                <span className="text-xs font-medium text-slate-800">{step.label}</span>
              </div>
              {index < steps.length - 1 && <ConnectorArrow className="hidden w-10 md:block" />}
            </React.Fragment>
          )
        })}
      </div>
      {outcome && <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-900">{outcome}</p>}
    </div>
  )
}
