import type * as React from 'react'

import { cn } from '../../lib/utils'

import { DisplayHeadline } from './DisplayHeadline'
import { GreenUnderline } from './GreenUnderline'

export type SystemPageSectionTone = 'warm' | 'white' | 'mint'
export type SystemPageSectionWidth = 'page' | 'wide' | 'narrow'

export type SystemPageSectionProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  title?: React.ReactNode
  accent?: React.ReactNode
  description?: React.ReactNode
  headerAlign?: 'left' | 'center'
  tone?: SystemPageSectionTone
  width?: SystemPageSectionWidth
  children: React.ReactNode
}

const sectionToneClassNames: Record<SystemPageSectionTone, string> = {
  warm: 'bg-[#f7f7f4]',
  white: 'bg-white',
  mint: 'bg-[#f4fbf5]',
}

const widthClassNames: Record<SystemPageSectionWidth, string> = {
  page: 'max-w-7xl',
  wide: 'max-w-[90rem]',
  narrow: 'max-w-5xl',
}

export function SystemPageSection({
  title,
  accent,
  description,
  headerAlign = 'left',
  tone = 'warm',
  width = 'page',
  className,
  children,
  ...props
}: SystemPageSectionProps) {
  const hasHeader = Boolean(title || accent || description)

  return (
    <section className={cn('relative isolate overflow-hidden py-18 text-[#102033] md:py-28', sectionToneClassNames[tone], className)} {...props}>
      <span aria-hidden="true" className="pointer-events-none absolute -left-24 top-16 -z-10 size-72 rounded-full bg-[rgba(21,128,61,0.06)] blur-3xl" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-10 -z-10 size-80 rounded-full bg-[rgba(21,128,61,0.045)] blur-3xl" />
      <div className={cn('mx-auto w-full px-6 lg:px-8', widthClassNames[width])}>
        {hasHeader ? (
          <header className={cn('mb-10 md:mb-14', headerAlign === 'center' ? 'mx-auto max-w-5xl text-center' : 'max-w-4xl')}>
            {title ? (
              <DisplayHeadline as="h2" size="page" className={headerAlign === 'center' ? 'mx-auto' : undefined}>
                {title}
                {accent ? (
                  <>
                    {' '}
                    <GreenUnderline>{accent}</GreenUnderline>
                  </>
                ) : null}
              </DisplayHeadline>
            ) : null}
            {description ? (
              <p className={cn('mt-5 max-w-3xl text-pretty text-[clamp(1.02rem,1.35vw,1.18rem)] leading-[1.7] text-[#455467]', headerAlign === 'center' && 'mx-auto')}>
                {description}
              </p>
            ) : null}
          </header>
        ) : null}

        {children}
      </div>
    </section>
  )
}
