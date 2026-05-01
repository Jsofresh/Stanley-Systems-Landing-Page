import * as React from 'react'
import { MapPin } from 'lucide-react'

import { cn } from '@/lib/utils'

export type StuckPointBadgeProps = React.ComponentProps<'div'> & {
  label?: string
}

export function StuckPointBadge({ label = 'Stuck point found', className, ...props }: StuckPointBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white shadow-sm',
        className,
      )}
      {...props}
    >
      <MapPin className="size-3.5 text-emerald-300" aria-hidden="true" />
      {label}
    </div>
  )
}
