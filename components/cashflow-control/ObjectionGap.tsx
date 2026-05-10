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
              Your tools hold the pieces. Stanley Systems automates the path between them.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#536173] sm:text-lg">
              QuickBooks, Housecall Pro, Jobber, ServiceTitan, intake forms, webhooks, and payment tools already handle parts of the work. The problem is the manual connection between customer intake, technician updates, office review, accounting, invoice creation, final bill, and follow-up. Stanley Systems does not replace your software. It builds the automation layer that moves information through it.
            </p>
          </div>
          <Image
            src="/images/uploaded/cashflow-control/automates-the-workflow.jpg"
            alt="Cashflow Control automates the workflow and flags missing billing details before cash gets stuck."
            width={1280}
            height={720}
            className="h-auto w-full rounded-[2rem] shadow-[0_18px_48px_rgba(7,29,58,0.08)]"
          />
        </div>
      </div>
    </section>
  )
}
