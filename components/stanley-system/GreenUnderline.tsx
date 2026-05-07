import type * as React from 'react'

import { cn } from '../../lib/utils'

export type GreenUnderlineProps = React.HTMLAttributes<HTMLSpanElement> & {
  underlineClassName?: string
  underlineOffsetClassName?: string
}

export function GreenUnderline({
  children,
  className,
  underlineClassName,
  underlineOffsetClassName,
  ...props
}: GreenUnderlineProps) {
  return (
    <span
      className={cn('relative inline-block text-[#15803D]', className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 320 42"
        preserveAspectRatio="none"
        className={cn(
          'pointer-events-none absolute left-[-0.03em] top-[0.92em] z-0 h-[0.26em] w-[calc(100%+0.06em)] overflow-visible',
          underlineOffsetClassName,
        )}
      >
        <path
          d="M8 30C56 8 118 7 170 19C221 31 270 28 312 12"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="12"
          className={cn('text-[#08a64b]', underlineClassName)}
        />
        <path
          d="M14 35C70 21 126 20 174 26C222 33 266 31 306 22"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="5.5"
          className="text-[#7ee09f] opacity-70"
        />
      </svg>
    </span>
  )
}
