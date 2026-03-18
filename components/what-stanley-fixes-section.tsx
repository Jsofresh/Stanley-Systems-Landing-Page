const fixes = [
  {
    title: "Lead follow-up",
    points: ["Reply faster across web, text, and inbox", "Stop good inquiries from going cold", "Route serious leads to the right next step"],
  },
  {
    title: "Invoice workflow",
    points: ["Get completed work into billing faster", "Reduce missing details before invoices go out", "Shorten the gap between work done and cash collected"],
  },
  {
    title: "Intake to operations handoff",
    points: ["Move customer/job info cleanly into the next system", "Cut back on missed notes and status confusion", "Keep the front office and field team in sync"],
  },
  {
    title: "Admin automation between tools",
    points: ["Connect the systems you already use", "Reduce copy-paste work", "Make the workflow run the same way every time"],
  },
]

export function WhatStanleyFixesSection() {
  return (
    <section className="px-4 py-12 sm:py-16 lg:py-20 relative z-10">
      <div className="max-w-7xl mx-auto rounded-[2.25rem] border border-[#ece7dc] bg-[#fbfaf7]/95 px-7 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16 shadow-[0_24px_70px_rgba(15,23,42,0.07)]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#e8e1d3] bg-white px-5 py-2.5 text-base font-semibold text-slate-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#15803D]"></span>
            What we can build for you
          </div>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
            What we can build for you
          </h2>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700 sm:text-xl lg:text-[1.35rem] lg:leading-9">
            We automate the repetitive backend work that slows down service businesses. That usually means invoicing, follow-ups, job data flow, and visibility into what is getting stuck.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {fixes.map((fix) => (
            <div key={fix.title} className="rounded-[1.75rem] border border-[#e8e1d3] bg-white p-7 sm:p-8 shadow-[0_16px_36px_rgba(15,23,42,0.06)]">
              <h3 className="text-2xl font-semibold leading-8 text-slate-900">{fix.title}</h3>
              <ul className="mt-5 space-y-4">
                {fix.points.map((point) => (
                  <li key={point} className="flex items-start gap-4 text-slate-700 text-base leading-8 sm:text-lg">
                    <span className="mt-3 h-3 w-3 rounded-full bg-[#15803D] flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
