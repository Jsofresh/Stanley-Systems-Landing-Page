import { CTALink } from "@/components/cta-link"

const proofItems = [
  {
    title: "Real demo workflows",
    detail: "Built around QuickBooks Online and Housecall Pro demo workflows, not a fake client dashboard.",
  },
  {
    title: "Billing evidence",
    detail: "The demo includes invoiced jobs, A/R aging, completed-job intake, and office notifications.",
  },
  {
    title: "Live paths tested",
    detail: "Completed-job intake is live end-to-end, and A/R follow-up has already run in the demo environment.",
  },
] as const

export function ProofStripSection() {
  return (
    <section
      id="proof"
      data-audit-page="/"
      data-audit-section="home.proof"
      data-audit-priority="3"
      data-audit-offer="Workflow Audit"
      data-audit-purpose="Provide compact proof that office-side leaks cost money and attention."
      className="relative z-10 scroll-mt-28 px-4 py-8 sm:scroll-mt-32 sm:py-10 lg:scroll-mt-36 lg:py-12"
    >
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#e9e2d7] bg-white/95 px-6 py-7 shadow-[0_16px_40px_rgba(15,23,42,0.05)] sm:px-8 sm:py-8 lg:px-10">
        <div className="max-w-none text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Honest proof of system</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.8rem] lg:leading-[1.08]">
            The proof is working workflow evidence, not invented testimonials.
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg">
            Stanley Systems is showing what has been built and tested in the demo environment, plus practical proof patterns from real office workflow problems. The claim stays focused on workflow evidence, not a public paying-client claim.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {proofItems.map((item) => (
            <div key={item.title} className="rounded-[1.4rem] border border-[#e8e1d3] bg-[#fbfaf7] p-5 shadow-sm">
              <div className="text-xl font-semibold leading-7 text-slate-900">{item.title}</div>
              <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-[15px]">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTALink
            href="/stanley-systems-case-study"
            kind="case_study"
            location="proof_section"
            className="inline-flex items-center rounded-full border border-[#d8d1c4] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#f4efe6]"
          >
            Read the proof case
          </CTALink>
          <CTALink
            href="/contact"
            kind="book_meeting"
            location="proof_section_primary"
            className="inline-flex items-center rounded-full bg-[#15803D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#166534]"
          >
            Book the Workflow Audit
          </CTALink>
        </div>
      </div>
    </section>
  )
}
