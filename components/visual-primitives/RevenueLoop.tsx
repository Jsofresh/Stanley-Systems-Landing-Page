import * as React from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export type RevenueLoopItem = {
  label: string
  description?: string
  icon?: LucideIcon
}

export type RevenueLoopProps = React.ComponentProps<'div'> & {
  centerLabel?: string
  items: RevenueLoopItem[]
}

export function RevenueLoop({ centerLabel = 'Repeat Revenue System', items, className, ...props }: RevenueLoopProps) {
  return (
    <div className={cn('relative rounded-3xl border border-emerald-100 bg-emerald-50/60 p-5 md:p-8', className)} {...props}>
      <div className="mx-auto mb-5 flex size-36 items-center justify-center rounded-full border border-emerald-200 bg-white p-5 text-center text-sm font-semibold leading-5 text-slate-950 shadow-sm md:absolute md:left-1/2 md:top-1/2 md:mb-0 md:-translate-x-1/2 md:-translate-y-1/2">
        {centerLabel}
      </div>
      <div className="grid gap-3 md:grid-cols-2 md:gap-5">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                {Icon && <Icon className="size-5 text-emerald-700" aria-hidden="true" />}
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
              </div>
              {item.description && <p className="mt-2 text-xs leading-5 text-slate-600">{item.description}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
