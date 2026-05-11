import Image from "next/image"
import { page } from "./tokens"

export function HowAuditWorks() {
  return (
    <section data-section="how-audit-works" data-nav-theme="light" className="px-4 py-9 sm:px-6 lg:px-8 lg:py-10">
      <div className={page.wrap}>
        <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <h2 className={page.h2}>A 30-minute walkthrough, then a money leak map from your records.</h2>
          </div>
          <div className="grid gap-3 sm:hidden">
            {["Walkthrough", "Record review", "Money Leak Map"].map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl border border-[#d9e5dc] bg-white p-4 shadow-[0_10px_28px_rgba(7,29,58,0.05)]">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e7f6eb] text-sm font-black text-[#116832]">{index + 1}</span>
                <span className="text-base font-extrabold text-[#071D3A]">{step}</span>
              </div>
            ))}
          </div>
          <div className="mx-auto hidden w-full max-w-[760px] overflow-hidden rounded-[1.5rem] border border-[#d9e5dc] bg-white shadow-[0_16px_46px_rgba(7,29,58,0.06)] sm:block">
            <Image
              src="/images/uploaded/money-leak-map/money-leak-map-3-step-process.jpg"
              alt="Three step Cash Flow Assessment process: walkthrough, data review, and Money Leak Map."
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
