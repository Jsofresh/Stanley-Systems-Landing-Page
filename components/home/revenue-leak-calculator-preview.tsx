import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DelayedInvoiceDisplayAsset,
  FileEstimateDisplayAsset,
  InactiveCustomersDisplayAsset,
  MoneyLeakMapDisplayAsset,
  PhoneMissedTransparentDisplayAsset,
} from "@/components/visual-kit/display-assets"
import type { DisplayAssetProps } from "@/components/visual-kit/display-assets"

type DisplayAsset = (props: DisplayAssetProps) => JSX.Element

const calculatorHref = "/invoicing-delay-cash-flow-calculator"

const leakRows: Array<{
  label: string
  detail: string
  Icon: DisplayAsset
}> = [
  {
    label: "Delayed invoices",
    detail: "Finished work waiting on billing",
    Icon: DelayedInvoiceDisplayAsset,
  },
  {
    label: "Dormant customers",
    detail: "Past customers with no next step",
    Icon: InactiveCustomersDisplayAsset,
  },
  {
    label: "Open estimates",
    detail: "Quoted work sitting without follow-up",
    Icon: FileEstimateDisplayAsset,
  },
  {
    label: "Missed calls",
    detail: "Inbound demand that never gets booked",
    Icon: PhoneMissedTransparentDisplayAsset,
  },
]

const outcomeTiles = [
  "Biggest leak: Delayed invoices",
  "First fix: Invoice follow-up",
  "Next step: Workflow Audit",
] as const

function PreviewCheckRow({ Icon, detail, label }: (typeof leakRows)[number]) {
  return (
    <div className="grid grid-cols-[34px_minmax(0,1fr)] items-center gap-2.5 rounded-[13px] border border-[#DDEBE2] bg-white px-2.5 py-2 shadow-[0_8px_18px_rgba(7,29,58,0.03)]">
      <div className="grid h-8 w-8 place-items-center rounded-[10px] bg-[#EFF8EB] ring-1 ring-[#D6E9DA]">
        <Icon size={32} />
      </div>
      <div className="min-w-0">
        <p className="text-[14px] font-extrabold leading-tight tracking-[-0.01em] text-[#071D3A]">{label}</p>
        <p className="mt-0.5 text-[11.5px] font-semibold leading-4 text-[#536A7D]">{detail}</p>
      </div>
    </div>
  )
}

function OutcomeTile({ children }: { children: string }) {
  const [label, value] = children.split(": ")

  return (
    <div className="rounded-[13px] border border-[#DDEBE2] bg-[#FBFEFA] px-3 py-2">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#5B7164]">{label}</p>
      <p className="mt-1 text-[14px] font-extrabold leading-tight tracking-[-0.01em] text-[#071D3A]">{value}</p>
    </div>
  )
}

export function RevenueLeakCalculatorPreview() {
  return (
    <section
      data-section="revenue-leak-calculator-preview"
      data-nav-theme="light"
      aria-labelledby="revenue-leak-calculator-preview-heading"
      className="relative isolate overflow-hidden bg-[#FBFCF7] px-5 py-8 text-[#071D3A] md:px-8 lg:px-10 lg:py-9"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-[radial-gradient(circle_at_50%_0%,rgba(8,166,75,0.09),rgba(251,252,247,0)_64%)]" />
      <div className="mx-auto max-w-[78rem]">
        <div className="mx-auto max-w-[760px] text-center">
          <Badge className="border-[#CDE4D3] bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#087B3F] shadow-sm" variant="outline">
            Revenue Leak Calculator
          </Badge>
          <h2
            id="revenue-leak-calculator-preview-heading"
            style={{ fontFamily: "var(--font-heading)" }}
            className="mt-3 text-balance text-[32px] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#071D3A] sm:text-[42px] lg:text-[48px] [font-family:var(--font-heading)]"
          >
            Run the numbers. See where money is getting stuck.
          </h2>
          <p className="mx-auto mt-3 max-w-[680px] text-pretty text-[15px] font-medium leading-6 text-[#334B60] sm:text-[16px]">
            Use the Revenue Leak Calculator to estimate delayed cash, missed follow-up, old customers, and calls that never turn into booked work.
          </p>
        </div>

        <Card className="mx-auto mt-5 overflow-hidden rounded-[22px] border-[#D7E7DC] bg-white/95 p-0 shadow-[0_18px_48px_rgba(7,29,58,0.075)]">
          <CardHeader className="border-b border-[#E3ECE6] bg-gradient-to-r from-white via-[#FBFEFA] to-[#F1FAEE] px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-[#EAF6E6] ring-1 ring-[#CFE6D6]">
                <MoneyLeakMapDisplayAsset size={36} priority />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#087B3F]">Revenue Leak Preview</p>
                <p className="mt-0.5 text-[13px] font-semibold leading-5 text-[#42596C] sm:text-[14px]">
                  A quick sample of what the calculator looks for before you run your real numbers.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="grid gap-0 p-0 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-[#E4EEE7] bg-[#FCFDF9] p-4 sm:p-4 lg:border-b-0 lg:border-r lg:p-5">
              <h3 className="text-[20px] font-extrabold leading-tight tracking-[-0.03em] text-[#071D3A]">
                What it checks
              </h3>

              <div className="mt-3 grid gap-2">
                {leakRows.map((row) => (
                  <PreviewCheckRow key={row.label} {...row} />
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden bg-white p-4 sm:p-4 lg:p-5">
              <div className="rounded-[18px] border border-[#D8E8DE] bg-gradient-to-b from-white to-[#F5FBF2] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#087B3F]">Sample monthly revenue held back</p>
                <p
                  style={{ fontFamily: "var(--font-heading)" }}
                  className="mt-1.5 text-[52px] font-extrabold leading-none tracking-[-0.055em] text-[#071D3A] sm:text-[62px] [font-family:var(--font-heading)]"
                >
                  $23,450
                </p>
                <p className="mt-2.5 max-w-[520px] text-[14px] font-semibold leading-5 text-[#3E5568] sm:text-[15px]">
                  The calculator shows where money is stuck, then points you toward the first fix.
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {outcomeTiles.map((tile) => (
                    <OutcomeTile key={tile}>{tile}</OutcomeTile>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex flex-col items-stretch gap-2 sm:items-start">
                <CTALink
                  href={calculatorHref}
                  kind="calculator"
                  location="home_revenue_leak_preview"
                  analyticsEvent="calculator_cta_clicked"
                  ctaLabel="Find My Revenue Leaks"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-[12px] bg-[#08A64B] px-5 py-2.5 text-[14px] font-extrabold text-white shadow-[0_12px_24px_rgba(8,166,75,0.18)] transition hover:-translate-y-0.5 hover:bg-[#087B3F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08A64B] sm:px-6"
                >
                  Find My Revenue Leaks
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </CTALink>
                <p className="max-w-[560px] text-[12px] font-semibold leading-5 text-[#52697C]">
                  No homepage inputs. This preview sends you to the full calculator.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
