import { ArrowRight, CheckCircle2 } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  DelayedInvoiceDisplayAsset,
  FileEstimateDisplayAsset,
  FirstFixWrenchDisplayAsset,
  InactiveCustomersDisplayAsset,
  MoneyLeakMapDisplayAsset,
  PhoneMissedTransparentDisplayAsset,
  ResultCheckDisplayAsset,
  UploadedRevenueDropWarningDisplayAsset,
} from "@/components/visual-kit/display-assets"
import type { DisplayAssetProps } from "@/components/visual-kit/display-assets"

type DisplayAsset = (props: DisplayAssetProps) => JSX.Element

const calculatorHref = "/invoicing-delay-cash-flow-calculator"

const leakSignals: Array<{
  label: string
  check: string
  note: string
  Icon: DisplayAsset
}> = [
  {
    label: "Delayed invoices",
    check: "Finished work waiting on billing movement",
    note: "Cashflow signal",
    Icon: DelayedInvoiceDisplayAsset,
  },
  {
    label: "Dormant customers",
    check: "Past buyers with no recent next step",
    note: "Repeat revenue signal",
    Icon: InactiveCustomersDisplayAsset,
  },
  {
    label: "Open estimates",
    check: "Quoted work stuck without follow-up",
    note: "Estimate signal",
    Icon: FileEstimateDisplayAsset,
  },
  {
    label: "Missed calls",
    check: "Inbound demand that never becomes booked work",
    note: "Front-desk signal",
    Icon: PhoneMissedTransparentDisplayAsset,
  },
]

const insightCards = [
  ["Biggest leak", "Delayed invoices"],
  ["First fix to inspect", "Invoice follow-up"],
  ["Next step", "Workflow Audit"],
] as const

function PreviewSignalRow({ Icon, check, label, note }: (typeof leakSignals)[number]) {
  return (
    <div className="group grid grid-cols-[48px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border border-[#DDEBE2] bg-white px-3.5 py-3 shadow-[0_10px_24px_rgba(7,29,58,0.035)] transition duration-300 hover:border-[#BFDCC8] hover:bg-[#FBFEFA] sm:grid-cols-[52px_minmax(0,1fr)_auto] sm:px-4">
      <div className="grid h-12 w-12 place-items-center rounded-[14px] bg-[#EFF8EB] ring-1 ring-[#D6E9DA]">
        <Icon size={46} />
      </div>
      <div className="min-w-0">
        <p className="text-[15px] font-extrabold leading-tight tracking-[-0.015em] text-[#071D3A] sm:text-[16px]">{label}</p>
        <p className="mt-1 text-[12px] font-semibold leading-4 text-[#536A7D] sm:text-[13px]">{check}</p>
      </div>
      <span className="hidden rounded-full border border-[#D5E7DA] bg-[#F3FAF1] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#087B3F] sm:inline-flex">
        {note}
      </span>
    </div>
  )
}

function ReportMetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] border border-[#D8E8DE] bg-white p-4 shadow-[0_10px_24px_rgba(7,29,58,0.045)]">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.13em] text-[#087B3F]">{label}</p>
      <p className="mt-2 text-[19px] font-extrabold leading-tight tracking-[-0.025em] text-[#071D3A]">{value}</p>
    </div>
  )
}

function ReportInsightCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] border border-[#DDEBE2] bg-[#FBFEFA] p-3.5">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#5B7164]">{label}</p>
      <p className="mt-1.5 text-[15px] font-extrabold leading-tight tracking-[-0.015em] text-[#071D3A]">{value}</p>
    </div>
  )
}

export function RevenueLeakCalculatorPreview() {
  return (
    <section
      data-section="revenue-leak-calculator-preview"
      aria-labelledby="revenue-leak-calculator-preview-heading"
      className="relative isolate overflow-hidden bg-[#FBFCF7] px-5 py-16 text-[#071D3A] md:px-8 lg:px-10 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(8,166,75,0.10),rgba(251,252,247,0)_62%)]" />
      <div className="mx-auto max-w-[84rem]">
        <div className="mx-auto max-w-[780px] text-center">
          <Badge className="border-[#CDE4D3] bg-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#087B3F] shadow-sm" variant="outline">
            Revenue Leak Calculator preview
          </Badge>
          <h2
            id="revenue-leak-calculator-preview-heading"
            style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            className="mt-5 text-balance text-[38px] font-extrabold leading-[0.98] tracking-[-0.045em] text-[#071D3A] sm:text-[50px] lg:text-[58px] [font-family:var(--font-heading)]"
          >
            Run the numbers. Then see what to fix first.
          </h2>
          <p className="mx-auto mt-5 max-w-[690px] text-pretty text-[16px] font-medium leading-7 text-[#334B60] sm:text-[18px]">
            Use the Revenue Leak Calculator to estimate where cash, customers, and follow-up are slipping through the cracks.
          </p>
        </div>

        <Card className="mx-auto mt-10 overflow-hidden rounded-[28px] border-[#D7E7DC] bg-white/95 p-0 shadow-[0_28px_80px_rgba(7,29,58,0.10)]">
          <CardHeader className="border-b border-[#E3ECE6] bg-gradient-to-r from-white via-[#FBFEFA] to-[#F1FAEE] px-5 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-[15px] bg-[#EAF6E6] ring-1 ring-[#CFE6D6]">
                  <MoneyLeakMapDisplayAsset size={48} priority />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#087B3F]">Revenue Leak Report Preview</p>
                  <p className="mt-1 text-[20px] font-extrabold leading-tight tracking-[-0.03em] text-[#071D3A]">Static sample — click through to run your real numbers</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[#D6E9DA] bg-white px-3 py-2 text-[12px] font-extrabold text-[#087B3F] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#08A64B] motion-safe:animate-pulse" />
                Preview only
              </div>
            </div>
          </CardHeader>

          <CardContent className="grid gap-0 p-0 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="border-b border-[#E4EEE7] bg-[#FCFDF9] p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[12px] font-extrabold uppercase tracking-[0.15em] text-[#087B3F]">What the calculator checks</p>
                  <h3 className="mt-2 text-[25px] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#071D3A] sm:text-[31px]">
                    Sample leak signals, not homepage inputs.
                  </h3>
                </div>
                <UploadedRevenueDropWarningDisplayAsset className="hidden sm:inline-flex" size={72} />
              </div>

              <div className="mt-6 grid gap-3.5">
                {leakSignals.map((signal) => (
                  <PreviewSignalRow key={signal.label} {...signal} />
                ))}
              </div>

              <div className="mt-5 rounded-[18px] border border-[#D8E8DE] bg-white p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#08A64B]" aria-hidden="true" />
                  <p className="text-[13px] font-semibold leading-6 text-[#42596C]">
                    The homepage does not calculate anything here. The job of this block is to make the real calculator click feel obvious.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white p-5 sm:p-6 lg:p-8">
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#08A64B]/45 to-transparent motion-safe:animate-pulse" />
              <div className="rounded-[24px] border border-[#D8E8DE] bg-gradient-to-b from-white to-[#F5FBF2] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#087B3F]">Sample monthly revenue held back</p>
                    <p
                      style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                      className="mt-3 text-[56px] font-extrabold leading-none tracking-[-0.06em] text-[#071D3A] sm:text-[68px] [font-family:var(--font-mono-metric),var(--font-heading),sans-serif]"
                    >
                      $23,450
                    </p>
                  </div>
                  <ResultCheckDisplayAsset size={80} priority />
                </div>
                <p className="mt-5 max-w-[520px] text-[15px] font-semibold leading-7 text-[#3E5568]">
                  The calculator estimates where money is stuck, then points you toward the first fix.
                </p>

                <Separator className="my-6 bg-[#DCEAE1]" />

                <div className="grid gap-3 sm:grid-cols-3">
                  {insightCards.map(([label, value]) => (
                    <ReportInsightCard key={label} label={label} value={value} />
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <ReportMetricCard label="Report style" value="Leak map" />
                  <ReportMetricCard label="Primary action" value="Run real numbers" />
                </div>
              </div>

              <div className="mt-6 flex flex-col items-stretch gap-3 sm:items-start">
                <CTALink
                  href={calculatorHref}
                  kind="calculator"
                  location="home_revenue_leak_preview"
                  analyticsEvent="calculator_cta_clicked"
                  ctaLabel="Find the Revenue Leaks"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-[12px] bg-[#08A64B] px-5 py-3 text-[15px] font-extrabold text-white shadow-[0_16px_34px_rgba(8,166,75,0.22)] transition hover:-translate-y-0.5 hover:bg-[#087B3F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08A64B] sm:px-6"
                >
                  Find the Revenue Leaks
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </CTALink>
                <p className="max-w-[560px] text-[13px] font-semibold leading-6 text-[#52697C]">
                  After the calculator, the Workflow Audit turns the numbers into a fix plan.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
