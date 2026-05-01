import * as React from 'react'

import { cn } from '@/lib/utils'

export type ConnectorArrowProps = React.SVGProps<SVGSVGElement> & {
  direction?: 'right' | 'down'
}

export function ConnectorArrow({ direction = 'right', className, ...props }: ConnectorArrowProps) {
  const rotate = direction === 'down' ? 'rotate-90' : ''

  return (
    <svg
      viewBox="0 0 96 24"
      fill="none"
      aria-hidden="true"
      className={cn('h-6 w-16 shrink-0 text-emerald-500', rotate, className)}
      {...props}
    >
      <path d="M4 12h82" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 6" />
      <path d="M78 5l10 7-10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
