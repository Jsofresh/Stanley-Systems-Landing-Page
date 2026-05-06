import type { ReactNode } from 'react'

type CustomerRevenueStepCardProps = {
  step: string
  title: string
  line: string
  visual: ReactNode
  compact?: boolean
  className?: string
}

export function CustomerRevenueStepCard({
  step,
  title,
  line,
  visual,
  compact = false,
  className = '',
}: CustomerRevenueStepCardProps) {
  return (
    <article
      className={[
        'relative z-10 min-w-0 rounded-[1.25rem] border border-[#dce8dc] bg-white shadow-[0_14px_38px_rgba(16,32,51,0.07)]',
        compact ? 'grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3 p-3' : 'p-4',
        className,
      ].join(' ')}
    >
      <div className={compact ? 'flex flex-col items-center gap-2' : 'flex items-center justify-between gap-3'}>
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-xs font-bold text-white">
          {step}
        </span>
        <span
          className={[
            'flex shrink-0 items-center justify-center rounded-2xl border border-[#e6efe5] bg-[#fbf8f2]',
            compact ? 'h-12 w-12' : 'h-16 w-16',
          ].join(' ')}
        >
          {visual}
        </span>
      </div>
      <div className={compact ? 'min-w-0' : 'mt-4'}>
        <h3 className="text-base font-semibold leading-tight tracking-normal text-[#071421]">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-[#667085]">{line}</p>
      </div>
    </article>
  )
}
