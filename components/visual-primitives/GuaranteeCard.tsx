import * as React from 'react'
import { ShieldCheck } from 'lucide-react'

import { cn } from '@/lib/utils'

export type GuaranteeCardProps = React.ComponentProps<'aside'> & {
  title?: string
}

export function GuaranteeCard({ title = 'Guarantee', className, children, ...props }: GuaranteeCardProps) {
  return (
    <aside
      className={cn('rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950', className)}
      {...props}
    >
      <div className="flex items-center gap-2 text-sm font-semibold">
        <ShieldCheck className="size-4" aria-hidden="true" />
        {title}
      </div>
      <div className="mt-2 text-sm leading-6 text-emerald-900">{children}</div>
    </aside>
  )
}
