const proofItems = [
  {
    title: "Marine service business",
    result: "Saved 10+ admin hours a week",
    detail: "Removed repeated data entry and cleaned up the billing handoff.",
  },
  {
    title: "Field service company",
    result: "Stopped quotes from sitting untouched",
    detail: "Added a clearer follow-up path so good leads did not cool off in the office.",
  },
  {
    title: "Owner-led local business",
    result: "Cut down owner interruptions",
    detail: "Tightened the handoff between intake, office work, and the next step.",
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
              The problems Stanley Systems fixes are common.
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-700 sm:text-lg">
              Here is the kind of cleanup owners usually care about first: faster billing, better follow-up, and fewer office bottlenecks.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {proofItems.map((item) => (
            <div key={item.title} className="rounded-[1.4rem] border border-[#e8e1d3] bg-[#fbfaf7] p-5 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{item.title}</div>
              <div className="mt-3 text-xl font-semibold leading-7 text-slate-900">{item.result}</div>
              <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-[15px]">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
