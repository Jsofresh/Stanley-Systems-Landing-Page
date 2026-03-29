import { CTALink } from "@/components/cta-link"

const proofItems = [
  {
    title: "Coastline Marine Service",
    result: "Live billing-handoff cleanup in progress",
    detail: "Current priority is Wallace to QuickBooks, followed by intake into Wallace so completed work can move toward billing with less office reconstruction.",
    href: "/stanley-systems-case-study",
    cta: "Read the case study",
  },
  {
    title: "Missed estimate follow-up",
    result: "Revenue leaks before it looks like a problem",
    detail: "Good jobs disappear when the next step is not triggered, tracked, and owned. That is a workflow problem, not a motivation problem.",
    href: "/missed-estimate-follow-up-for-service-businesses",
    cta: "See the follow-up breakdown",
  },
  {
    title: "Slow invoicing",
    result: "Cash gets delayed after the work is already done",
    detail: "The owner feels it as slower collections, extra office cleanup, and one more thing that keeps coming back for clarification.",
    href: "/speed-up-invoicing-for-service-businesses",
    cta: "See the invoicing page",
  },
] as const

export function ProofStripSection() {
  return (
    <section className="relative z-10 px-4 py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#e9e2d7] bg-white/95 px-6 py-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)] sm:px-8 sm:py-7 lg:px-10">
        <div>
          <div className="max-w-none text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Proof in plain English</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.8rem] lg:leading-[1.08]">
              The strongest proof right now is specific workflow evidence.
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-700 sm:text-lg">
              Stanley Systems is not pretending to have a giant stack of polished case studies yet. The honest proof is where the bottleneck lives, what is being prioritized, and why the cleanup matters operationally.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {proofItems.map((item, index) => (
            <div key={item.title} className="rounded-[1.4rem] border border-[#e8e1d3] bg-[#fbfaf7] p-5 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{item.title}</div>
              <div className="mt-3 text-xl font-semibold leading-7 text-slate-900">{item.result}</div>
              <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-[15px]">{item.detail}</p>
              <CTALink
                href={item.href}
                kind={item.href === "/stanley-systems-case-study" ? "case_study" : "internal_page"}
                location={`proof_strip_${index + 1}`}
                className="mt-5 inline-flex items-center rounded-full border border-[#d8d1c4] bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-[#f4efe6]"
              >
                {item.cta}
              </CTALink>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
