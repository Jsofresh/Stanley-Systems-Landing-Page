import * as React from 'react'

import { cn } from '@/lib/utils'

export type VisualCardProps = React.ComponentProps<'div'> & {
  tone?: 'default' | 'green' | 'navy' | 'warning'
}

const toneClasses = {
  default: 'border-slate-200 bg-white shadow-sm',
  green: 'border-emerald-200 bg-emerald-50/70 shadow-sm',
  navy: 'border-slate-800 bg-slate-950 text-white shadow-sm',
  warning: 'border-amber-200 bg-amber-50/80 shadow-sm',
}

export function VisualCard({ tone = 'default', className, ...props }: VisualCardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border p-5 md:p-7',
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  )
}
