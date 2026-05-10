import Image from "next/image"
import { page } from "./tokens"

export function ProblemObjection() {
  return (
    <section data-section="problem-objection" data-nav-theme="light" className={page.sectionTight}>
      <div className={page.wrap}>
        <div className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <h2 className={page.h2}>The software is not always broken. The handoff around it is.</h2>
            <p className={`${page.lead} mt-5`}>
              QuickBooks, Housecall Pro, Jobber, ServiceTitan, and other tools already handle parts of billing, reminders, payments, and reporting. That is not the problem. The problem is what happens between the steps.
            </p>
            <p className={`${page.body} mt-4 text-base leading-7`}>
              The audit looks for the repeated reminders, missing details, office gaps, and payroll hours that keep jobs, invoices, estimates, reviews, referrals, and customer follow-up from moving cleanly.
            </p>
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-[#dfe8e1] bg-white shadow-[0_18px_54px_rgba(7,29,58,0.06)]">
            <Image
              src="/images/uploaded/money-leak-map/money-leak-map-reminders-gaps-office-payroll.jpg"
              alt="Money Leak Map showing reminders, office gaps, and payroll waste found in workflow handoffs."
              width={881}
              height={1280}
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
