import * as React from 'react'

import { cn } from '@/lib/utils'

export type MobileVisualStackProps = React.ComponentProps<'div'>

export function MobileVisualStack({ className, ...props }: MobileVisualStackProps) {
  return (
    <div
      className={cn('grid gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center', className)}
      {...props}
    />
  )
}
