import type * as React from 'react'

import {
  CashflowControlSystemPackageCard,
  DisplayHeadline,
  RepeatRevenueSystemPackageCard,
} from '@/components/stanley-system'
import { cn } from '@/lib/utils'

export type SystemsThatMakeMoneySectionProps = React.HTMLAttributes<HTMLElement>

const cashflowCtaProps = {
  'data-analytics-event': 'package_learn_more_clicked',
  'data-analytics-kind': 'systems',
  'data-analytics-location': 'home_section_5_cashflow_control',
  'data-package-name': 'Cashflow Control System',
} as React.AnchorHTMLAttributes<HTMLAnchorElement>

const repeatRevenueCtaProps = {
  'data-analytics-event': 'package_learn_more_clicked',
  'data-analytics-kind': 'systems',
  'data-analytics-location': 'home_section_5_repeat_revenue',
  'data-package-name': 'Repeat Revenue System',
} as React.AnchorHTMLAttributes<HTMLAnchorElement>

export function SystemsThatMakeMoneySection({ className, ...props }: SystemsThatMakeMoneySectionProps) {
  return (
    <section
      id="systems"
      className={cn(
        'relative isolate overflow-hidden bg-white px-5 py-16 md:px-8 lg:px-10',
        'before:pointer-events-none before:absolute before:-left-24 before:top-12 before:-z-10 before:size-72 before:rounded-full before:bg-[radial-gradient(circle,rgba(221,247,232,0.60)_0%,rgba(244,251,245,0.34)_48%,rgba(255,255,255,0)_74%)]',
        'after:pointer-events-none after:absolute after:-right-28 after:bottom-6 after:-z-10 after:size-80 after:rounded-full after:bg-[radial-gradient(circle,rgba(234,246,230,0.58)_0%,rgba(255,255,255,0)_70%)]',
        className,
      )}
      aria-labelledby="systems-that-make-money-heading"
      {...props}
    >
      <div className="mx-auto max-w-[90rem]">
        <div className="mx-auto max-w-[62rem] text-center">
          <DisplayHeadline
            id="systems-that-make-money-heading"
            before="Systems that"
            highlight={<>make money<span className="text-[#071421]">.</span></>}
          />
          <p className="mx-auto mt-6 max-w-[46rem] text-pretty text-lg font-medium leading-8 text-slate-600">
            Service businesses already have people working hard. Stanley Systems turns the handoffs where money stalls into visible systems that move cash and demand forward.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <CashflowControlSystemPackageCard ctaProps={cashflowCtaProps} />
          <RepeatRevenueSystemPackageCard ctaProps={repeatRevenueCtaProps} />
        </div>
      </div>
    </section>
  )
}
