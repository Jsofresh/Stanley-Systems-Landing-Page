import * as React from 'react'
import { AlertTriangle } from 'lucide-react'

import { cn } from '@/lib/utils'

export type LeakMarkerProps = React.ComponentProps<'div'> & {
  label?: string
}

export function LeakMarker({ label = 'Leak point', className, ...props }: LeakMarkerProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800',
        className,
      )}
      {...props}
    >
      <AlertTriangle className="size-3.5" aria-hidden="true" />
      {label}
    </div>
  )
}
