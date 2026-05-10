import Image from "next/image"
import { page } from "./tokens"

export function HowAuditWorks() {
  return (
    <section data-section="how-audit-works" data-nav-theme="light" className="px-4 py-9 sm:px-6 lg:px-8 lg:py-10">
      <div className={page.wrap}>
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <h2 className={page.h2}>A 30-minute walkthrough, then a data-backed money leak map.</h2>
            <p className={`${page.lead} mt-4`}>You explain how the office actually works. Stanley Systems reviews the records and turns the problem into a plain-English map of what is stuck, what it costs, and what to fix first.</p>
            <p className={`${page.body} mt-4 text-base leading-7`}>You choose how to share access: screen share, exports/screenshots, or a temporary invited user. Stanley Systems does not need your password.</p>
          </div>
          <div className="mx-auto max-w-[610px] overflow-hidden rounded-[1.5rem] border border-[#d9e5dc] bg-white shadow-[0_16px_46px_rgba(7,29,58,0.06)]">
            <Image
              src="/images/uploaded/money-leak-map/money-leak-map-3-step-process.jpg"
              alt="Three step Workflow Audit process: walkthrough, data review, and Money Leak Map."
              width={1280}
              height={960}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="h-auto max-h-[500px] w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
