import * as React from 'react'

import { cn } from '@/lib/utils'

export type SectionShellProps = React.ComponentProps<'section'> & {
  title?: React.ReactNode
  description?: React.ReactNode
  headerClassName?: string
  containerClassName?: string
}

export function SectionShell({
  title,
  description,
  className,
  headerClassName,
  containerClassName,
  children,
  ...props
}: SectionShellProps) {
  return (
    <section className={cn('bg-white py-16 text-slate-950 md:py-24', className)} {...props}>
      <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', containerClassName)}>
        {(title || description) && (
          <div className={cn('mx-auto mb-10 max-w-3xl text-center md:mb-14', headerClassName)}>
            {title && <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">{title}</h2>}
            {description && <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">{description}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
