import type * as React from 'react'
import { ArrowRight } from 'lucide-react'

import { CTALink } from '@/components/cta-link'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  BillingCheckDisplayAsset,
  CashApprovedDisplayAsset,
  CompletedJobDisplayAsset,
  CustomerReactivationCheckDisplayAsset,
  InvoiceApprovedDisplayAsset,
  RepeatCustomerCycleDisplayAsset,
  ReviewGrowthDisplayAsset,
} from '@/components/visual-kit/display-assets'
import type { DisplayAssetProps } from '@/components/visual-kit/display-assets'

export type SystemsThatMakeMoneySectionProps = React.HTMLAttributes<HTMLElement>

type DisplayAsset = (props: DisplayAssetProps) => JSX.Element

type ProductSystem = {
  eyebrow: string
  title: string
  promise: string
  chips: string[]
  href: string
  analyticsLocation: string
  packageName: string
  flowTitle: string
  bottomLine: string
  Icon: DisplayAsset
  flow: Array<{ label: string; sublabel: string; Icon: DisplayAsset; final?: boolean }>
}

const systems: ProductSystem[] = [
  {
    eyebrow: 'CASHFLOW CONTROL',
    title: 'Cashflow Control System',
    promise: 'Turn finished work into collected cash faster.',
    chips: ['Same-day invoice path', 'Cleaner billing handoffs', 'Fewer stuck balances'],
    href: '/systems/cashflow-control',
    analyticsLocation: 'home_systems_cashflow_control',
    packageName: 'Cashflow Control System',
    flowTitle: 'How cash starts moving',
    bottomLine: 'For shops where completed work still waits on office follow-up.',
    Icon: CashApprovedDisplayAsset,
    flow: [
      { label: 'Job finished', sublabel: 'work is complete', Icon: CompletedJobDisplayAsset },
      { label: 'Invoice ready', sublabel: 'billing has what it needs', Icon: BillingCheckDisplayAsset },
      { label: 'Cash collected', sublabel: 'owner sees movement', Icon: CashApprovedDisplayAsset, final: true },
    ],
  },
  {
    eyebrow: 'REPEAT REVENUE',
    title: 'Repeat Revenue System',
    promise: 'Get more money from the customers you already earned.',
    chips: ['Past customers reactivated', 'More 5-star reviews', 'More referral opportunities'],
    href: '/systems/repeat-revenue',
    analyticsLocation: 'home_systems_repeat_revenue',
    packageName: 'Repeat Revenue System',
    flowTitle: 'How customers turn into booked work',
    bottomLine: 'For shops with old customers, happy customers, and missed calls sitting unused.',
    Icon: RepeatCustomerCycleDisplayAsset,
    flow: [
      { label: 'Past customer', sublabel: 'earned trust', Icon: CustomerReactivationCheckDisplayAsset },
      { label: 'Review or referral', sublabel: 'proof creates demand', Icon: ReviewGrowthDisplayAsset },
      { label: 'Booked work', sublabel: 'new job path', Icon: InvoiceApprovedDisplayAsset, final: true },
    ],
  },
]

function OutcomeChips({ chips }: { chips: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <span
          key={chip}
          className="rounded-full border border-[#D7E9DC] bg-[#F3FAF1] px-2.5 py-1 text-[11px] font-extrabold leading-none text-[#087B3F]"
        >
          {chip}
        </span>
      ))}
    </div>
  )
}

function ProductFlow({ flow, flowTitle }: Pick<ProductSystem, 'flow' | 'flowTitle'>) {
  return (
    <div className="rounded-[16px] border border-[#DDEBE2] bg-white p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-3">
      <p className="mb-2 text-[13px] font-extrabold leading-tight tracking-[-0.01em] text-[#071D3A]">{flowTitle}</p>
      <div className="grid gap-2">
        {flow.map(({ Icon, final, label, sublabel }, index) => (
          <div key={label} className="relative">
            {index < flow.length - 1 ? (
              <span aria-hidden="true" className="absolute left-[19px] top-[39px] h-[10px] w-px bg-[#A9D9B7]" />
            ) : null}
            <div
              className={cn(
                'grid grid-cols-[38px_minmax(0,1fr)_auto] items-center gap-2.5 rounded-[13px] border px-2.5 py-1.5',
                final
                  ? 'border-[#A9D9B7] bg-[#EFF8EB] shadow-[0_10px_20px_rgba(8,166,75,0.08)]'
                  : 'border-[#E1ECE5] bg-[#FCFDF9]',
              )}
            >
              <div className="grid h-9 w-9 place-items-center rounded-[11px] bg-white ring-1 ring-[#D9E9DF]">
                <Icon size={34} />
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-extrabold leading-tight tracking-[-0.01em] text-[#071D3A]">{label}</p>
                <p className="mt-0.5 text-[11.5px] font-semibold leading-4 text-[#536A7D]">{sublabel}</p>
              </div>
              <span
                className={cn(
                  'h-2.5 w-2.5 rounded-full ring-4',
                  final ? 'bg-[#08A64B] ring-[#DDF2E2]' : 'bg-[#A8CBB2] ring-[#EDF6EF]',
                )}
                aria-hidden="true"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductSystemCard({ system }: { system: ProductSystem }) {
  const { Icon } = system

  return (
    <Card className="h-full overflow-hidden rounded-[22px] border-[#D8E8DE] bg-gradient-to-b from-white to-[#F7FCF4] p-0 shadow-[0_16px_44px_rgba(7,29,58,0.06)]">
      <CardContent className="flex h-full flex-col p-4 sm:p-4 lg:p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#087B3F]">{system.eyebrow}</p>
            <h3
              style={{ fontFamily: "var(--font-heading)" }}
              className="mt-1.5 text-[26px] font-extrabold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-[30px] [font-family:var(--font-heading)]"
            >
              {system.title}
            </h3>
            <p className="mt-1.5 max-w-[520px] text-[14px] font-semibold leading-5 text-[#41596C]">{system.promise}</p>
          </div>
          <div className="hidden h-[50px] w-[50px] shrink-0 place-items-center rounded-[15px] border border-[#D8E8DE] bg-white shadow-sm sm:grid">
            <Icon size={46} priority />
          </div>
        </div>

        <div className="mt-3">
          <OutcomeChips chips={system.chips} />
        </div>

        <div className="mt-3 flex-1">
          <ProductFlow flowTitle={system.flowTitle} flow={system.flow} />
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#DDEBE2] pt-3">
          <p className="max-w-[330px] text-[12px] font-semibold leading-5 text-[#5A7080]">
            {system.bottomLine}
          </p>
          <CTALink
            href={system.href}
            kind="systems"
            location={system.analyticsLocation}
            analyticsEvent="package_learn_more_clicked"
            packageName={system.packageName}
            ctaLabel="Learn more"
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-[10px] border border-[#BFDCC8] bg-white px-4 py-2.5 text-[13px] font-extrabold text-[#087B3F] shadow-[0_10px_20px_rgba(7,29,58,0.06)] transition hover:-translate-y-0.5 hover:border-[#08A64B] hover:bg-[#F3FAF1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08A64B]"
          >
            Learn more
            <ArrowRight className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
          </CTALink>
        </div>
      </CardContent>
    </Card>
  )
}

export function SystemsThatMakeMoneySection({ className, ...props }: SystemsThatMakeMoneySectionProps) {
  return (
    <section
      id="systems"
      data-section="systems-that-move-money"
      className={cn('relative isolate overflow-hidden bg-[#FBFCF7] px-5 py-8 md:px-8 lg:px-10 lg:py-9', className)}
      aria-labelledby="systems-that-move-money-heading"
      {...props}
    >
      <div className="pointer-events-none absolute inset-x-0 top-6 -z-10 mx-auto h-44 max-w-[680px] rounded-full bg-[radial-gradient(circle,rgba(8,166,75,0.08),rgba(251,252,247,0)_68%)] blur-2xl" />
      <div className="mx-auto max-w-[78rem]">
        <div className="mx-auto max-w-[800px] text-center">
          <h2
            id="systems-that-move-money-heading"
            style={{ fontFamily: "var(--font-heading)" }}
            className="text-balance text-[36px] font-extrabold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[46px] lg:text-[50px] [font-family:var(--font-heading)]"
          >
            Systems that Move Money
          </h2>
          <p className="mx-auto mt-3 max-w-[760px] text-pretty text-[15px] font-medium leading-6 text-[#334B60] sm:text-[16px]">
            Stanley Systems helps service businesses move finished work into cash, past customers into booked work, and missed opportunities into cleaner revenue paths.
          </p>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2 lg:items-stretch">
          {systems.map((system) => (
            <ProductSystemCard key={system.title} system={system} />
          ))}
        </div>
      </div>
    </section>
  )
}
