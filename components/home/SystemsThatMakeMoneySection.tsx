import type * as React from 'react'
import { ArrowRight } from 'lucide-react'

import { CTALink } from '@/components/cta-link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  BillingCheckDisplayAsset,
  CashApprovedDisplayAsset,
  CompletedJobDisplayAsset,
  CustomerReactivationCheckDisplayAsset,
  InvoiceApprovedDisplayAsset,
  InvoiceSentDisplayAsset,
  ReferralNetworkDisplayAsset,
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
  accentLabel: string
  Icon: DisplayAsset
  flow: Array<{ label: string; sublabel: string; Icon: DisplayAsset; final?: boolean }>
}

const systems: ProductSystem[] = [
  {
    eyebrow: 'CASHFLOW CONTROL',
    title: 'Cashflow Control System',
    promise: 'Turn finished work into collected cash faster.',
    chips: ['Faster invoices', 'Cleaner billing handoffs', 'Fewer stuck balances'],
    href: '/systems/cashflow-control',
    analyticsLocation: 'home_systems_cashflow_control',
    packageName: 'Cashflow Control System',
    accentLabel: 'Same-day invoice path',
    Icon: CashApprovedDisplayAsset,
    flow: [
      { label: 'Completed job', sublabel: 'work finished', Icon: CompletedJobDisplayAsset },
      { label: 'Billing ready', sublabel: 'office has the handoff', Icon: BillingCheckDisplayAsset },
      { label: 'Invoice sent', sublabel: 'no waiting on memory', Icon: InvoiceSentDisplayAsset },
      { label: 'Cash collected', sublabel: 'owner sees movement', Icon: CashApprovedDisplayAsset, final: true },
    ],
  },
  {
    eyebrow: 'REPEAT REVENUE',
    title: 'Repeat Revenue System',
    promise: 'Make your best customers your best lead generation.',
    chips: ['Past customers reactivated', 'More 5-star reviews', 'More referral opportunities'],
    href: '/systems/repeat-revenue',
    analyticsLocation: 'home_systems_repeat_revenue',
    packageName: 'Repeat Revenue System',
    accentLabel: 'Booked work loop',
    Icon: RepeatCustomerCycleDisplayAsset,
    flow: [
      { label: 'Past customer', sublabel: 'earned trust', Icon: CustomerReactivationCheckDisplayAsset },
      { label: 'Review proof', sublabel: 'visible reputation', Icon: ReviewGrowthDisplayAsset },
      { label: 'Referral offer', sublabel: 'clear next ask', Icon: ReferralNetworkDisplayAsset },
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
          className="rounded-full border border-[#D7E9DC] bg-[#F3FAF1] px-3 py-1.5 text-[12px] font-extrabold leading-none text-[#087B3F]"
        >
          {chip}
        </span>
      ))}
    </div>
  )
}

function ProductFlow({ accentLabel, flow }: Pick<ProductSystem, 'accentLabel' | 'flow'>) {
  return (
    <div className="rounded-[22px] border border-[#DDEBE2] bg-white p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#5B7164]">Product-style flow</p>
        <Badge variant="outline" className="border-[#CFE6D6] bg-[#F5FBF2] text-[11px] font-extrabold text-[#087B3F]">
          {accentLabel}
        </Badge>
      </div>
      <div className="grid gap-2.5">
        {flow.map(({ Icon, final, label, sublabel }, index) => (
          <div key={label} className="relative">
            {index < flow.length - 1 ? (
              <span aria-hidden="true" className="absolute left-[25px] top-[52px] h-[18px] w-px bg-[#A9D9B7]" />
            ) : null}
            <div
              className={cn(
                'grid grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-3 rounded-[16px] border px-3 py-2.5',
                final
                  ? 'border-[#A9D9B7] bg-[#EFF8EB] shadow-[0_12px_26px_rgba(8,166,75,0.10)]'
                  : 'border-[#E1ECE5] bg-[#FCFDF9]',
              )}
            >
              <div className="grid h-[52px] w-[52px] place-items-center rounded-[14px] bg-white ring-1 ring-[#D9E9DF]">
                <Icon size={48} />
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-extrabold leading-tight tracking-[-0.015em] text-[#071D3A]">{label}</p>
                <p className="mt-0.5 text-[12px] font-semibold leading-4 text-[#536A7D]">{sublabel}</p>
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
    <Card className="h-full overflow-hidden rounded-[28px] border-[#D8E8DE] bg-gradient-to-b from-white to-[#F7FCF4] p-0 shadow-[0_22px_70px_rgba(7,29,58,0.075)]">
      <CardContent className="flex h-full flex-col p-5 sm:p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#087B3F]">{system.eyebrow}</p>
            <h3
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              className="mt-3 text-[30px] font-extrabold leading-[0.98] tracking-[-0.045em] text-[#071D3A] sm:text-[36px] [font-family:var(--font-heading)]"
            >
              {system.title}
            </h3>
            <p className="mt-3 max-w-[520px] text-[16px] font-semibold leading-7 text-[#41596C]">{system.promise}</p>
          </div>
          <div className="hidden h-[72px] w-[72px] shrink-0 place-items-center rounded-[20px] border border-[#D8E8DE] bg-white shadow-sm sm:grid">
            <Icon size={68} priority />
          </div>
        </div>

        <div className="mt-5">
          <OutcomeChips chips={system.chips} />
        </div>

        <div className="mt-6 flex-1">
          <ProductFlow accentLabel={system.accentLabel} flow={system.flow} />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#DDEBE2] pt-5">
          <p className="hidden max-w-[260px] text-[12px] font-semibold leading-5 text-[#5A7080] sm:block">
            Built to make the next revenue move visible inside the business.
          </p>
          <CTALink
            href={system.href}
            kind="systems"
            location={system.analyticsLocation}
            analyticsEvent="package_learn_more_clicked"
            packageName={system.packageName}
            ctaLabel="Learn more"
            className="inline-flex min-h-10 items-center justify-center rounded-[10px] bg-[#071D3A] px-4 py-2.5 text-[13px] font-extrabold text-white shadow-[0_12px_28px_rgba(7,29,58,0.16)] transition hover:-translate-y-0.5 hover:bg-[#0B2A4D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08A64B]"
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
      className={cn('relative isolate overflow-hidden bg-[#FBFCF7] px-5 py-16 md:px-8 lg:px-10 lg:py-20', className)}
      aria-labelledby="systems-that-move-money-heading"
      {...props}
    >
      <div className="pointer-events-none absolute inset-x-0 top-10 -z-10 mx-auto h-72 max-w-[760px] rounded-full bg-[radial-gradient(circle,rgba(8,166,75,0.10),rgba(251,252,247,0)_68%)] blur-2xl" />
      <div className="mx-auto max-w-[84rem]">
        <div className="mx-auto max-w-[790px] text-center">
          <Badge className="border-[#CDE4D3] bg-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#087B3F] shadow-sm" variant="outline">
            Stanley Systems product suite
          </Badge>
          <h2
            id="systems-that-move-money-heading"
            style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            className="mt-5 text-balance text-[40px] font-extrabold leading-[0.96] tracking-[-0.05em] text-[#071D3A] sm:text-[54px] lg:text-[64px] [font-family:var(--font-heading)]"
          >
            Systems that Move Money
          </h2>
          <p className="mx-auto mt-5 max-w-[720px] text-pretty text-[16px] font-medium leading-7 text-[#334B60] sm:text-[18px]">
            Stanley Systems helps service businesses turn finished work, past customers, reviews, referrals, and missed calls into cleaner revenue paths.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {systems.map((system) => (
            <ProductSystemCard key={system.title} system={system} />
          ))}
        </div>
      </div>
    </section>
  )
}
