import Image from "next/image"
import { page } from "./tokens"

export function HowAuditWorks() {
  return (
    <section data-section="how-audit-works" data-nav-theme="light" className="px-4 py-9 sm:px-6 lg:px-8 lg:py-10">
      <div className={page.wrap}>
        <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <h2 className={page.h2}>A 30-minute walkthrough, then a data-backed money leak map.</h2>
          </div>
          <div className="mx-auto w-full max-w-[760px] overflow-hidden rounded-[1.5rem] border border-[#d9e5dc] bg-white shadow-[0_16px_46px_rgba(7,29,58,0.06)]">
            <Image
              src="/images/uploaded/money-leak-map/money-leak-map-3-step-process.jpg"
              alt="Three step Workflow Audit process: walkthrough, data review, and Money Leak Map."
              width={1280}
              height={960}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="h-auto max-h-[560px] w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
