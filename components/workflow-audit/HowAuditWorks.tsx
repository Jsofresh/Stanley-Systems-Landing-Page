import { page } from "./tokens"

const steps = [
  ["Walk through the business process", "30 minutes with the owner, office manager, bookkeeper, or person who knows the office flow.", "You explain how the office actually works. Stanley Systems maps the steps where cash, customers, or time can slip."],
  ["Review the data and handoffs", "Stanley Systems reviews the systems or exports needed to understand what is happening in the real records.", "This can include job records, invoices, estimates, payments, open balances, customer records, review activity, referral tracking, and follow-up notes."],
  ["Get the Money Leak Map", "Stanley Systems turns the walkthrough and data review into a practical report.", "You get a plain-English map of what is stuck, what it is costing, and what should be fixed first."],
]

const deliverables = ["Money Leak Summary", "Workflow Map", "Leak Priority Score", "Transaction Pattern Notes", "First Fix Recommendation", "System Recommendation"]

export function HowAuditWorks() {
  return (
    <section data-section="how-audit-works" data-nav-theme="light" className={page.section}>
      <div className={page.wrap}>
        <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className={page.eyebrow}>How it works</p>
            <h2 className={`${page.h2} mt-3`}>A 30-minute walkthrough, then a data-backed money leak map.</h2>
            <p className={`${page.lead} mt-4`}>You choose how to share access: screen share, exports/screenshots, or a temporary invited user. Stanley Systems does not need your password.</p>
          </div>
          <div className="grid gap-3">
            {steps.map(([title, intro, copy], index) => (
              <article key={title} className={`${page.card} p-5`}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8f6ec] text-sm font-extrabold text-[#116832]">{index + 1}</div>
                  <div>
                    <h3 className={page.h3}>{title}</h3>
                    <p className={`${page.body} mt-2 font-bold text-[#334B60]`}>{intro}</p>
                    <p className={`${page.body} mt-2`}>{copy}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <div className={`${page.panel} p-5`}>
            <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#071D3A]">What you get back</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {deliverables.map((item) => (
                <div key={item} className="rounded-2xl border border-[#e1ebe4] bg-[#fbfcf7] p-4 text-sm font-extrabold leading-5 text-[#071D3A]">{item}</div>
              ))}
            </div>
          </div>
          <aside className="rounded-[2rem] border border-[#cfe8d5] bg-[#f0fbf4] p-5 text-[#116832]">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em]">Sample finding</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#071D3A]">Audit Finding #1</h3>
            <p className="mt-3 text-sm font-bold leading-6 text-[#334B60]">Completed jobs are being marked done before billing has the details needed to invoice.</p>
            <dl className="mt-4 grid gap-2 text-sm font-semibold leading-6">
              <div><dt className="inline font-extrabold">Likely cost: </dt><dd className="inline">delayed cash and repeated office follow-up.</dd></div>
              <div><dt className="inline font-extrabold">First fix: </dt><dd className="inline">same-day billing-ready check.</dd></div>
              <div><dt className="inline font-extrabold">Recommended system: </dt><dd className="inline">Cashflow Control System.</dd></div>
              <div><dt className="inline font-extrabold">Priority: </dt><dd className="inline">High.</dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  )
}
