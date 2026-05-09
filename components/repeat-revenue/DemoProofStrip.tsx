import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"

import { proofCards } from "./tokens"

export function DemoProofStrip() {
  return (
    <section id="demo" data-section="demo-proof" className="scroll-mt-[120px] bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[1.75rem] border border-[#D5DEE8] bg-white p-6 shadow-[0_18px_54px_rgba(16,32,51,0.08)] lg:grid-cols-[0.86fr_1.14fr] lg:p-8">
        <div>
          <p className="text-sm font-bold text-[#15803D]">Demo proof</p>
          <h2 className="mt-4 text-[2.35rem] font-semibold leading-[1.03] tracking-[-0.045em] text-[#102033] sm:text-5xl">
            See the system before you buy.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#33475B]">
            Watch how Stanley Systems turns customer records, missed calls, reviews, referrals, and old buyers into a clear follow-up path your office can use.
          </p>
          <p className="mt-4 text-base leading-7 text-[#33475B]">
            Before you buy, the demo should show what happens after the job is done, who gets contacted, how a reply reaches the office, and how open follow-up opportunities stay visible.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/how-stanley-systems-works" prefetch={false} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#15803D] px-6 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(21,128,61,0.20)] transition hover:bg-[#17612E]">
              Watch demo proof <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/workflow-audit" prefetch={false} className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-[#15803D] bg-white px-6 py-3 text-sm font-bold text-[#102033] transition hover:bg-[#F4FBF6]">
              Start with the Workflow Audit
            </Link>
          </div>
        </div>

        <div>
          <Link href="/how-stanley-systems-works" prefetch={false} className="group relative block min-h-[300px] overflow-hidden rounded-[1.45rem] border border-[#D5E9DC] bg-[#F8FBF9] shadow-[0_20px_64px_rgba(16,32,51,0.10),0_0_42px_rgba(21,128,61,0.12)] sm:min-h-[390px] lg:min-h-[430px]">
            <Image
              src="/images/repeat-revenue/demo-video-placeholder.png"
              alt="3D Repeat Revenue demo visual showing customer records, review ask, referral ask, missed-call recovery, and next-job path as connected product objects."
              width={1536}
              height={1024}
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/94 text-[#15803D] shadow-[0_14px_34px_rgba(33,51,67,0.18)] ring-1 ring-[#C8D8CE]" aria-hidden="true">
              <Play className="ml-1 h-7 w-7 fill-current" />
            </span>
          </Link>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {proofCards.map(([title, text]) => (
              <article key={title} className="rounded-xl border border-[#D5DEE8] bg-white p-5">
                <h3 className="text-xl font-bold tracking-[-0.025em] text-[#102033]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#516F90]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
