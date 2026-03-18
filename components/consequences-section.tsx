const consequences = [
  {
    stat: "Lost jobs",
    title: "The first company to reply usually wins",
    description: "If follow-up waits until the office catches up, the job often goes somewhere else before your team even responds.",
  },
  {
    stat: "Cash flow drag",
    title: "Late billing slows everything down",
    description: "When completed work sits around waiting to be invoiced, cash stays stuck instead of coming back into the business.",
  },
  {
    stat: "Wasted admin time",
    title: "Double entry eats the day",
    description: "Every time staff copy info between tools, they lose time and create more places for mistakes to happen.",
  },
  {
    stat: "Owner dependence",
    title: "The business keeps coming back to you",
    description: "If the workflow only works when the owner or office manager remembers everything, the business never really runs cleanly.",
  },
]

export function ConsequencesSection() {
  return (
    <section className="px-4 py-12 sm:py-16 lg:py-20 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-[4rem] lg:leading-[1.02] font-semibold tracking-tight text-slate-900">
            What this is costing you
          </h2>
          <p className="mt-6 max-w-4xl mx-auto text-xl leading-9 text-slate-700 sm:text-[1.45rem] lg:text-[1.55rem] lg:leading-10">
            These problems are not just annoying. They slow down cash flow, waste labor hours, create mistakes, and keep the owner stuck in the middle of the operation.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {consequences.map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-[#e8e1d3] bg-white p-7 sm:p-8 shadow-[0_16px_36px_rgba(15,23,42,0.06)]">
              <div className="text-base font-semibold uppercase tracking-[0.14em] text-[#b91c1c]">{item.stat}</div>
              <h3 className="mt-5 text-2xl font-semibold leading-8 text-slate-900">{item.title}</h3>
              <p className="mt-4 text-base leading-8 text-slate-700 sm:text-lg">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
