import { page } from "./tokens"

const cards = [
  ["Finished work gets stuck before billing", "The job is done, but the office still has to chase notes, photos, prices, line items, payment status, or customer details."],
  ["Follow-up depends on memory", "Invoices, estimates, reviews, referrals, and past customers only get attention if someone remembers at the right time."],
  ["The owner becomes the backup system", "When the office path breaks, the owner gets pulled back into details that should have been handled already."],
]

export function ProblemObjection() {
  return (
    <section data-section="problem-objection" data-nav-theme="light" className={page.sectionTight}>
      <div className={page.wrap}>
        <div className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <h2 className={page.h2}>The software is not always broken. The handoff around it is.</h2>
            <p className={`${page.lead} mt-5`}>
              QuickBooks, Housecall Pro, Jobber, ServiceTitan, and other tools already handle parts of billing, reminders, payments, and reporting. That is not the problem. The problem is what happens between the steps.
            </p>
            <p className={`${page.body} mt-4 text-base leading-7`}>
              A job gets marked complete, but billing still needs details. An invoice goes out, but follow-up depends on memory. An estimate gets sent, but nobody owns the next step. A happy customer never gets asked for the review or referral. The owner only hears about the issue after cash is already late.
            </p>
          </div>
          <div className="grid gap-3">
            {cards.map(([title, copy], index) => (
              <article key={title} className={`${page.card} grid gap-3 p-5 sm:grid-cols-[48px_1fr]`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f6ec] text-sm font-extrabold text-[#116832]">0{index + 1}</div>
                <div>
                  <h3 className={page.h3}>{title}</h3>
                  <p className={`${page.body} mt-2`}>{copy}</p>
                </div>
              </article>
            ))}
            <div className="rounded-[1.35rem] border border-[#cfe8d5] bg-[#f0fbf4] p-5 text-[#116832]">
              <p className="text-base font-extrabold">Already have reminders? Good.</p>
              <p className="mt-2 text-sm font-semibold leading-6">
                The audit does not assume your tools are useless. It finds the gaps around the tools you already use. Stanley Systems does not replace your software. It shows where the handoff around it is still costing money, payroll hours, or owner attention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
