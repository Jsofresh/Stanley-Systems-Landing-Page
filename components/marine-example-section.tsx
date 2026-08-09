export function MarineExampleSection() {
  return (
    <section id="proof" className="relative z-10 px-4 pb-7 pt-1 sm:pb-9">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.35rem] border border-[#b9d8c0] bg-[linear-gradient(180deg,#ffffff_0%,#eff8f0_100%)] px-4 py-5 shadow-[0_22px_64px_rgba(16,32,51,0.12)] sm:rounded-[1.75rem] sm:px-6 sm:py-6 lg:px-7">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="lg:pt-1">
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#071421] sm:text-3xl lg:text-[2.45rem] lg:leading-[1.04]">
              10+ hours/week back. Same-day invoicing. Fewer office errors.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#44556B] sm:text-base sm:leading-7">
              A marine service shop had finished work getting slowed by repeated data entry and job-to-billing handoffs. Stanley Systems cleaned up the path so billing moved faster and the office stopped retyping the same details.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Plumbing", "HVAC", "Electrical", "Marine", "Field service"].map((trade) => (
                <span key={trade} className="rounded-full border border-[#cfe5d1] bg-white px-3 py-1.5 text-xs font-bold text-[#102033]">
                  {trade}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["10+ hours/week", "saved from admin handoffs and repeated data entry"],
                ["Same-day invoicing", "billing got what it needed faster after the job"],
                ["Fewer errors", "less retyping meant fewer avoidable office mistakes"],
              ].map(([value, label]) => (
                <div key={value} className="rounded-[1rem] border border-white/12 bg-white px-4 py-4 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                  <div className="text-xl font-black leading-tight text-[#15803D]">{value}</div>
                  <div className="mt-2 text-sm font-semibold leading-5 text-[#102033]">{label}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1rem] border border-[#F2C8CE]/35 bg-[#fff7f7] p-4">
                <div className="text-xs font-black uppercase tracking-[0.14em] text-[#B42318]">Before</div>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#102033]">
                  Job details lived across notes, calls, and software. The office rebuilt the story before billing.
                </p>
              </div>
              <div className="rounded-[1rem] border border-[#9BE7B2]/45 bg-[#EAF8EF] p-4">
                <div className="text-xs font-black uppercase tracking-[0.14em] text-[#116832]">After</div>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#102033]">
                  The job-to-billing handoff got cleaner, exceptions stood out, and invoices moved faster.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
