import Image from "next/image"
import { CTALink } from "@/components/cta-link"
import {
  IconArrowRight,
  IconClockDollar,
  IconFileDollar,
  IconFileInvoice,
  IconShieldCheck,
  IconUsers,
  type TablerIcon,
} from "@tabler/icons-react"

const auditSteps: Array<{
  number: string
  title: string
  body: string
}> = [
  {
    number: "1",
    title: "Confirm the leak",
    body: "Find where cash and office time get stuck.",
  },
  {
    number: "2",
    title: "Show what it costs",
    body: "See delayed cash and wasted hours in plain numbers.",
  },
  {
    number: "3",
    title: "Fix the first thing first",
    body: "Leave with the clearest first fix.",
  },
]

const leakMetrics: Array<{
  label: string
  value: string
  suffix: string
  Icon: TablerIcon
}> = [
  { label: "Delayed invoices", value: "$3,250", suffix: "at risk", Icon: IconFileInvoice },
  { label: "Open estimates", value: "$7,500", suffix: "waiting", Icon: IconFileDollar },
  { label: "Office rework", value: "30+", suffix: "hrs / mo", Icon: IconClockDollar },
  { label: "Inactive customers", value: "12+", suffix: "months", Icon: IconUsers },
]

export function HowItWorksSection() {
  return (
    <section
      id="audit"
      data-audit-page="/"
      data-audit-section="home.workflow-audit"
      data-audit-priority="5"
      data-audit-offer="Workflow Audit"
      data-audit-purpose="Show that the Workflow Audit finds money leaks hiding inside the office workflow."
      className="relative z-10 scroll-mt-28 px-4 py-5 sm:scroll-mt-32 sm:py-8 lg:scroll-mt-36 lg:py-10"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] border border-[#d9e4d0] bg-[linear-gradient(180deg,#f4faef_0%,#fbfaf4_68%,#fffefa_100%)] p-4 shadow-[0_20px_58px_rgba(16,32,51,0.08)] sm:rounded-[2rem] sm:p-5 lg:p-7 xl:p-8">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.47fr)_minmax(0,0.53fr)] xl:items-center xl:gap-7">
          <div className="min-w-0">
            <h2 className="max-w-[35rem] text-[1.86rem] font-semibold leading-[1.03] tracking-normal text-[#102033] sm:text-[2.95rem] sm:leading-[1.01] lg:text-[3.3rem] xl:text-[3.06rem]">
              The calculator shows the leak. The Workflow Audit finds the source.
            </h2>

            <p className="mt-2.5 max-w-[35rem] text-[0.98rem] leading-7 text-[#48576C] sm:mt-3 sm:text-base sm:leading-7">
              The calculator estimates the size of the leak. The Workflow Audit shows exactly which invoices, estimates, calls, and follow-ups are causing it.
            </p>

            <div className="mt-3.5 grid gap-2.5 sm:mt-4 md:grid-cols-3">
              {auditSteps.map(({ number, title, body }) => (
                <article key={title} className="flex h-full min-h-[6.4rem] flex-col rounded-[0.9rem] border border-[#e1dacd] bg-white/95 p-3 shadow-[0_9px_20px_rgba(16,32,51,0.04)] sm:min-h-[7.2rem]">
                  <span className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-[0.8rem] font-bold leading-none text-white">
                    {number}
                  </span>
                  <h3 className="mt-2 text-[0.95rem] font-bold leading-tight text-[#102033]">{title}</h3>
                  <p className="mt-1 text-[0.84rem] leading-5 text-[#536174]">{body}</p>
                </article>
              ))}
            </div>

            <div className="mt-4.5 sm:mt-5">
              <CTALink
                href="/contact"
                kind="book_meeting"
                location="workflow_audit_section"
                className="inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-[#15803D] px-7 text-base font-semibold text-white shadow-[0_16px_34px_rgba(21,128,61,0.28)] ring-1 ring-[#15803D]/15 transition hover:bg-[#116832] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D] sm:w-auto"
              >
                Book the Workflow Audit
                <IconArrowRight className="h-5 w-5" stroke={2} aria-hidden />
              </CTALink>

              <p className="mt-3 flex max-w-[34rem] items-start gap-2.5 rounded-[1rem] border border-[#cfe8d5] bg-[#edf9f1] px-3.5 py-3 text-[0.9rem] leading-6 text-[#34465B] shadow-[0_10px_24px_rgba(21,128,61,0.07)]">
                <IconShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#15803D]" stroke={2} aria-hidden />
                <span>
                  If Stanley Systems cannot find one clear money leak we can fix, qualified businesses get the audit fee back.{" "}
                  <a href="/terms-and-conditions#audit-guarantee-terms" className="font-semibold text-[#102033] underline decoration-[#15803D]/35 underline-offset-4 transition hover:text-[#15803D]">
                    See guarantee terms.
                  </a>
                </span>
              </p>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-[1.25rem] border border-[#e1dacd] bg-white p-3.5 shadow-[0_20px_54px_rgba(16,32,51,0.095)] sm:rounded-[1.6rem] sm:p-4.5 lg:p-5">
            <div>
              <h3 className="text-[1.48rem] font-semibold leading-tight tracking-normal text-[#102033] sm:text-[2.05rem]">
                Audit Output Preview
              </h3>
              <p className="mt-1 max-w-[34rem] text-[0.92rem] leading-6 text-[#667085] sm:text-[0.98rem] sm:leading-6">
                Where delayed cash, missed follow-up, and wasted office hours show up
              </p>
            </div>

            <div className="relative mx-auto mt-3 aspect-[16/7.8] w-full max-w-full overflow-hidden rounded-[1rem] border border-[#edf0e8] bg-[#fbfaf7] sm:mt-3.5 sm:aspect-[16/7.15] sm:min-h-[10.6rem] sm:rounded-[1.2rem]">
              <Image
                src="/images/generated/audit-output-preview-illustration.webp"
                alt=""
                fill
                sizes="(min-width: 1280px) 610px, (min-width: 768px) 90vw, 100vw"
                className="object-contain"
                priority={false}
              />
            </div>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {leakMetrics.map(({ label, value, suffix, Icon }) => (
                <article key={label} className="rounded-[0.95rem] border border-[#c7dec8] bg-[#fbfefa] p-3 shadow-[0_10px_22px_rgba(16,32,51,0.06)]">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.7rem] bg-[#E7F8ED] text-[#15803D] shadow-[0_7px_16px_rgba(21,128,61,0.08)]">
                      <Icon className="h-4.5 w-4.5" stroke={1.85} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[0.86rem] font-bold leading-tight text-[#102033]">{label}</div>
                      <div className="mt-1 text-[1.78rem] font-extrabold leading-none tracking-normal text-[#15803D] sm:text-[1.98rem]">{value}</div>
                      <div className="mt-0.5 text-[0.83rem] font-semibold leading-tight text-[#3F4E62]">{suffix}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-3 text-center text-[0.82rem] leading-5 text-[#667085]">Example figures shown for illustration.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
