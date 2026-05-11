import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"

import { proofCards } from "./tokens"

export function DemoProofStrip() {
  return (
    <section id="demo" data-section="demo-proof" className="scroll-mt-[120px] bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-[#D5DEE8] bg-white shadow-[0_18px_54px_rgba(16,32,51,0.08)]">
        <div className="grid gap-0 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <h2 className="text-[2.25rem] font-semibold leading-[1.03] tracking-[-0.045em] text-[#102033] sm:text-5xl">
              See the system before you buy.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#33475B] sm:text-lg">
              Watch how Stanley Systems turns customer records, missed calls, reviews, referrals, and old buyers into a clear follow-up path your office can use.
            </p>
            <p className="mt-3 text-base leading-7 text-[#33475B]">
              Before you buy, the demo should show who gets contacted, how replies reach the office, and how open follow-up opportunities stay visible.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/how-stanley-systems-works" prefetch={false} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#15803D] px-6 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(21,128,61,0.20)] transition hover:bg-[#17612E]">
                Watch demo proof <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/workflow-audit" prefetch={false} className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-[#15803D] bg-white px-6 py-3 text-sm font-bold text-[#102033] transition hover:bg-[#F4FBF6]">
                Start with the Cash Flow Assessment
              </Link>
            </div>
          </div>

          <Link href="/how-stanley-systems-works" prefetch={false} className="group relative block min-h-[300px] overflow-hidden bg-[#F8FBF9] sm:min-h-[380px] lg:min-h-[430px]">
            <Image
              src="/images/repeat-revenue/demo-video-placeholder.png"
              alt="3D Repeat Revenue demo visual showing customer list, missed call, review ask, referral ask, and booked job objects connected by green paths."
              width={1536}
              height={1024}
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/94 text-[#15803D] shadow-[0_14px_34px_rgba(33,51,67,0.18)] ring-1 ring-[#C8D8CE]" aria-hidden="true">
              <Play className="ml-1 h-7 w-7 fill-current" />
            </span>
          </Link>
        </div>

        <div className="grid gap-3 border-t border-[#D5DEE8] bg-[#F8FBF9] p-4 md:grid-cols-2 xl:grid-cols-4">
          {proofCards.map(([title, text]) => (
            <article key={title} className="rounded-xl border border-[#D5DEE8] bg-white p-4">
              <h3 className="text-lg font-bold tracking-[-0.025em] text-[#102033]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#516F90]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
