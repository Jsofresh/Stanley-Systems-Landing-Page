import { CTALink } from "@/components/cta-link"
import {
  InactiveCustomersDisplayAsset,
  UploadedEstimateCalculatorDisplayAsset,
  UploadedInvoiceClockWarningDisplayAsset,
  UploadedPhoneCallGrowthDisplayAsset,
  UploadedRevenueDropWarningDisplayAsset,
  UploadedShieldCheckDisplayAsset,
} from "@/components/visual-kit/display-assets"
import type { DisplayAssetProps } from "@/components/visual-kit/display-assets"
import { ConnectorArrow } from "@/components/visual-primitives/ConnectorArrow"
import { SectionShell } from "@/components/visual-primitives/SectionShell"
import { VisualCard } from "@/components/visual-primitives/VisualCard"

const auditHref = "#audit"

type DisplayAsset = (props: DisplayAssetProps) => JSX.Element

const leakRows: Array<{
  label: string
  detail: string
  value: string
  Icon: DisplayAsset
}> = [
  { label: "Delayed invoices", detail: "Invoices overdue 30+ days", value: "18", Icon: UploadedInvoiceClockWarningDisplayAsset },
  { label: "Dormant customers", detail: "No activity in 90+ days", value: "24", Icon: InactiveCustomersDisplayAsset },
  { label: "Open estimates", detail: "Estimates older than 30 days", value: "26", Icon: UploadedEstimateCalculatorDisplayAsset },
  { label: "Missed calls", detail: "Calls missed last 30 days", value: "15", Icon: UploadedPhoneCallGrowthDisplayAsset },
]

const auditOutputs: Array<{
  title: string
  finding: string
  firstFix: string
  Icon: DisplayAsset
  emphasis?: "money" | "move"
}> = [
  {
    title: "Biggest leak",
    finding: "Delayed invoices",
    firstFix: "18 overdue invoices are tied up in aging receivables.",
    Icon: UploadedInvoiceClockWarningDisplayAsset,
  },
  {
    title: "Likely monthly revenue held back",
    finding: "$23,450",
    firstFix: "Money that should be moving through the business each month.",
    Icon: UploadedRevenueDropWarningDisplayAsset,
    emphasis: "money",
  },
  {
    title: "First recommended move",
    finding: "Tighten invoice follow-up",
    firstFix: "Send aging invoices faster and follow up before cash gets stuck.",
    Icon: UploadedPhoneCallGrowthDisplayAsset,
    emphasis: "move",
  },
]

function HeaderStep({
  Icon,
  index,
  title,
  description,
}: {
  Icon: DisplayAsset
  index: string
  title: string
  description: string
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative grid h-[76px] w-[76px] shrink-0 place-items-center rounded-[20px] bg-[#EAF6E6] sm:h-[84px] sm:w-[84px]">
        <Icon size={72} priority />
        <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-white text-[11px] font-extrabold text-[#087B3F] shadow-sm">
          {index}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="text-[24px] font-extrabold leading-none tracking-[-0.025em] text-[#071D3A] sm:text-[28px]">
          {title}
        </h3>
        <p className="mt-2 text-[14px] font-semibold leading-5 text-[#3F5568] sm:text-[15px]">{description}</p>
      </div>
    </div>
  )
}

export function WorkflowAuditMechanismSection() {
  return (
    <SectionShell
      data-section="workflow-audit-mechanism"
      aria-labelledby="workflow-audit-mechanism-heading"
      className="relative isolate overflow-hidden bg-[#FCFDF9] py-10 text-[#071D3A] sm:py-12 lg:min-h-screen lg:py-10"
      containerClassName="max-w-[1210px]"
      headerClassName="mb-5 max-w-[980px] md:mb-6"
      title={
        <span
          id="workflow-audit-mechanism-heading"
          className="block text-balance text-[36px] font-extrabold leading-[0.98] tracking-[-0.035em] text-[#071D3A] sm:text-[48px] lg:text-[56px]"
        >
          Run the numbers. Then see what to fix first.
        </span>
      }
      description={
        <span className="mx-auto block max-w-[700px] text-pretty text-[15px] font-medium leading-6 text-[#334B60] sm:text-[18px] sm:leading-7">
          Estimate where revenue is slipping through the cracks. Then the AI Office Map turns those numbers into a clear plan.
        </span>
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[170px] -z-10 mx-auto h-[220px] max-w-[780px] rounded-full bg-[radial-gradient(circle_at_center,rgba(8,166,75,0.035),rgba(255,255,255,0)_74%)] blur-3xl"
      />

      <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_52px_minmax(0,1fr)] lg:items-stretch lg:gap-0">
        <VisualCard className="flex h-full flex-col rounded-[20px] border-[#DEE9E3] bg-white p-5 shadow-[0_16px_38px_rgba(7,29,58,0.07)] sm:p-6 lg:p-6">
          <HeaderStep
            index="1"
            title="Leak Estimator"
            description="Enter a few numbers from your business."
            Icon={UploadedRevenueDropWarningDisplayAsset}
          />

          <div className="mt-5 flex-1 overflow-hidden rounded-[15px] border border-[#E4EBE7] bg-white">
            {leakRows.map(({ detail, Icon, label, value }, index) => (
              <div
                key={label}
                className="grid grid-cols-[66px_minmax(0,1fr)_68px] items-center gap-3 border-b border-[#E9EFEB] px-3.5 py-3 last:border-b-0 sm:grid-cols-[74px_minmax(0,1fr)_88px] sm:px-4 sm:py-3.5"
              >
                <div className="relative grid h-16 w-16 place-items-center rounded-[18px] bg-[#F0F8EC] sm:h-[70px] sm:w-[70px]">
                  <Icon size={64} />
                  <span className="absolute -bottom-1 -right-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-white px-1 text-[9px] font-extrabold text-[#087B3F] shadow-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[15px] font-extrabold leading-tight tracking-[-0.01em] text-[#071D3A] sm:text-[17px]">{label}</p>
                  <p className="mt-0.5 text-[12px] font-medium leading-4 text-[#536A7D] sm:text-[13px]">{detail}</p>
                </div>
                <div className="rounded-[9px] border border-[#DDE6E0] bg-white px-3 py-2 text-center text-[16px] font-bold text-[#071D3A]">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="-mt-px flex items-center justify-between gap-4 rounded-b-[15px] border border-[#DDE9E1] bg-[#EAF6E6] px-4 py-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <UploadedEstimateCalculatorDisplayAsset size={60} />
              <p className="text-[13px] font-extrabold leading-4 text-[#087B3F] sm:text-[14px]">
                Estimated Monthly Revenue at Risk
              </p>
            </div>
            <p className="shrink-0 text-[28px] font-extrabold tracking-[-0.03em] text-[#087B3F] sm:text-[34px]">$23,450</p>
          </div>
        </VisualCard>

        <div className="relative z-10 flex items-center justify-center lg:-mx-4">
          <div className="grid h-[62px] w-[62px] place-items-center rounded-full border border-[#DDE9E1] bg-white text-[#08A64B] shadow-[0_14px_34px_rgba(7,29,58,0.12)] lg:h-[70px] lg:w-[70px]">
            <ConnectorArrow className="hidden h-10 w-14 text-[#08A64B] lg:block [&_path:first-child]:[stroke-dasharray:0] [&_path:first-child]:[stroke-width:3] [&_path:last-child]:[stroke-width:3]" />
            <ConnectorArrow direction="down" className="h-12 w-9 text-[#08A64B] lg:hidden [&_path:first-child]:[stroke-dasharray:0] [&_path:first-child]:[stroke-width:3] [&_path:last-child]:[stroke-width:3]" />
          </div>
        </div>

        <VisualCard className="flex h-full flex-col rounded-[20px] border-[#DEE9E3] bg-white p-5 shadow-[0_16px_38px_rgba(7,29,58,0.07)] sm:p-6 lg:p-6">
          <HeaderStep
            index="2"
            title="AI Office Map"
            description="We analyze your leaks and show you what to fix first."
            Icon={UploadedShieldCheckDisplayAsset}
          />

          <div className="mt-5 grid flex-1 gap-3 rounded-[15px] border border-[#E4EBE7] bg-white p-3">
            {auditOutputs.map(({ emphasis, finding, firstFix, Icon, title }) => (
              <article
                key={title}
                className={`flex items-start gap-3 rounded-[13px] border p-3.5 shadow-none ${
                  emphasis === "move"
                    ? "border-[#CFE6D6] bg-[#F3FAF1]"
                    : emphasis === "money"
                      ? "border-[#D6E8DC] bg-[#FBFEFA]"
                      : "border-[#E6ECE8] bg-white"
                }`}
              >
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[18px] bg-[#F0F8EC]">
                  <Icon size={64} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#087B3F]">{title}</p>
                  <p className="mt-1 text-[20px] font-extrabold leading-tight tracking-[-0.02em] text-[#071D3A] sm:text-[22px]">{finding}</p>
                  <p className="mt-1.5 text-[12px] font-medium leading-5 text-[#52697C] sm:text-[13px]">{firstFix}</p>
                </div>
              </article>
            ))}
          </div>
        </VisualCard>
      </div>

      <div className="mt-5 flex justify-center lg:mt-6">
        <CTALink
          href={auditHref}
          kind="systems"
          location="home_section_4_workflow_audit_mechanism"
          ctaLabel="Book AI Office Map"
          className="inline-flex min-h-[56px] w-full max-w-[390px] items-center justify-center rounded-[12px] bg-[#08A64B] px-6 py-3 text-[20px] font-extrabold tracking-[-0.01em] text-white shadow-[0_14px_28px_rgba(8,166,75,0.2)] transition hover:-translate-y-0.5 hover:bg-[#087B3F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08A64B] sm:w-auto sm:min-w-[390px] sm:text-[23px]"
        >
          Book AI Office Map
          <span className="ml-4 text-[30px] leading-none" aria-hidden="true">›</span>
        </CTALink>
      </div>
    </SectionShell>
  )
}
