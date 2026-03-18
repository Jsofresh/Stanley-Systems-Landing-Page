export function MarineExampleSection() {
  return (
    <section className="relative z-10 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#ece7dc] bg-white px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="lg:pt-2">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[3.35rem] lg:leading-[1.04]">
              Real results from a workflow like yours
            </h2>
            <p className="mt-4 max-w-xl text-xl leading-9 text-slate-600 sm:text-[1.3rem] lg:text-[1.38rem] lg:leading-10">
              Coastline Marine is proof this works in a real service business. Billing, handoffs, and follow-up all moved faster without forcing the team into a whole new system or adding more manual admin.
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-[#e8e1d3] bg-[#fbfaf7] p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[#15803D] text-lg leading-none">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <div className="rounded-full border border-[#d9e7d2] bg-[#eff9ee] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#166534] sm:text-[12px]">
                  TRUSTED SERVICE
                </div>
              </div>
              <p className="mt-4 text-[1.02rem] leading-7 text-slate-700 sm:text-[1.08rem]">
                “Stanley Systems helped us save 10+ hours a week of manual data entry and cut down the kind of human errors that were slowing the business down. The workflow is cleaner, billing moves faster, and the team is not stuck retyping the same information all day.”
              </p>
              <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Coastline Marine
              </div>
            </div>
          </div>

          <div className="grid h-full gap-4 sm:grid-cols-2 auto-rows-fr">
            <div className="h-full rounded-[1.5rem] border border-[#edd6d8] bg-[linear-gradient(180deg,#fff7f7_0%,#fdf0f1_100%)] p-5 shadow-[0_10px_24px_rgba(127,29,29,0.05)]">
              <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#b91c1c]">Before</div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700 sm:text-[15px]">
                <li>Job info lives in too many places</li>
                <li>Office staff re-enter the same details by hand</li>
                <li>Completed work waits too long to reach billing</li>
              </ul>
            </div>
            <div className="h-full rounded-[1.5rem] border border-[#d9e7d2] bg-[#f3f8ef] p-5 shadow-[0_10px_24px_rgba(21,128,61,0.05)]">
              <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">After</div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700 sm:text-[15px]">
                <li>Intake moves cleanly into the next step</li>
                <li>Staff review exceptions instead of retyping everything</li>
                <li>Billing gets what it needs faster</li>
              </ul>
            </div>
            <div className="flex h-full flex-col rounded-[1.5rem] border border-[#e8e1d3] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] sm:col-span-2">
              <div className="text-base font-semibold uppercase tracking-[0.12em] text-slate-900 sm:text-[1.02rem]">Coastline Marine results</div>
              <div className="mt-4 grid flex-1 gap-3 sm:grid-cols-3">
                <div className="flex h-full flex-col rounded-2xl border border-[#e8e1d3] bg-[#fbfaf7] px-4 py-5">
                  <div className="text-xl font-semibold text-slate-900">10+ hrs/week</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">saved from admin handoffs and repeated data entry</div>
                </div>
                <div className="flex h-full flex-col rounded-2xl border border-[#e8e1d3] bg-[#fbfaf7] px-4 py-5">
                  <div className="text-xl font-semibold text-slate-900">Same-day invoicing</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">instead of billing sitting for days after the job</div>
                </div>
                <div className="flex h-full flex-col rounded-2xl border border-[#e8e1d3] bg-[#fbfaf7] px-4 py-5">
                  <div className="text-xl font-semibold text-slate-900">Fewer errors</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">because the office stopped retyping the same details</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
