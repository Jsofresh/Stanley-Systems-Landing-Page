import * as React from 'react'
import { CheckCircle2 } from 'lucide-react'

import { cn } from '@/lib/utils'

export type ToolFitLineProps = React.ComponentProps<'p'>

export function ToolFitLine({ className, children, ...props }: ToolFitLineProps) {
  return (
    <p className={cn('inline-flex items-start gap-2 text-sm leading-6 text-slate-600', className)} {...props}>
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-700" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
