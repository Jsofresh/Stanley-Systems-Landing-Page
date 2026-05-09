import Image from "next/image"
import { sectionShell } from "./tokens"

export function ObjectionGap() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className={sectionShell}>
        <div className="grid gap-7 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">The real gap</p>
            <h2 className="mt-3 text-[2.35rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">
              Your software already handles parts of billing. The gap is what happens between the steps.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#536173] sm:text-lg">
              QuickBooks, Housecall Pro, Jobber, ServiceTitan, and other tools already handle parts of invoicing, reminders, payments, and reporting. That is not the problem. The problem is the gap between job completion, billing readiness, invoice follow-up, and owner visibility. Stanley Systems does not replace your software. It makes the handoff around it harder to miss.
            </p>
          </div>
          <Image
            src="/images/uploaded/cashflow-control/cashflow-control-catches-the-gap.jpg"
            alt="Cashflow Control catches the gap between job completion, invoice readiness, invoice sent, and follow-up."
            width={960}
            height={1280}
            className="h-auto w-full rounded-[2rem] shadow-[0_18px_48px_rgba(7,29,58,0.08)]"
          />
        </div>
      </div>
    </section>
  )
}
