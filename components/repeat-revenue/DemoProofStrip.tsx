import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"

import { proofCards } from "./tokens"

export function DemoProofStrip() {
  return (
    <section id="demo" data-section="demo-proof" className="scroll-mt-[120px] bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[1.25rem] border border-[#D5DEE8] bg-[#F8F4EA] p-6 shadow-[0_16px_40px_rgba(33,51,67,0.08)] lg:grid-cols-[0.92fr_1.08fr] lg:p-8">
        <div>
          <p className="text-sm font-bold text-[#1F7A3A]">Demo proof</p>
          <h2 className="mt-4 text-[2.35rem] font-semibold leading-[1.03] tracking-[-0.045em] text-[#213343] sm:text-5xl">
            See the system before you buy.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#33475B]">
            Watch how Stanley Systems turns customer records, missed calls, reviews, referrals, and old buyers into a clear follow-up path your office can use.
          </p>
          <p className="mt-4 text-base leading-7 text-[#33475B]">
            Before you buy, the demo should show what happens after the job is done, who gets contacted, how a reply reaches the office, and how open follow-up opportunities stay visible.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/how-stanley-systems-works" prefetch={false} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#1F7A3A] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#17612E]">
              Watch demo proof <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/workflow-audit" prefetch={false} className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-[#1F7A3A] bg-white/40 px-6 py-3 text-sm font-bold text-[#213343] transition hover:bg-[#E8F6EC]">
              Start with the Workflow Audit
            </Link>
          </div>
        </div>

        <div>
          <div className="relative rounded-[1.1rem] border border-[#D5DEE8] bg-white p-3 shadow-[0_14px_34px_rgba(33,51,67,0.08)]">
            <Image
              src="/images/repeat-revenue/demo-video-placeholder.png"
              alt="Repeat Revenue Demo preview showing customer list, review ask, referral ask, missed call, and next job."
              width={1536}
              height={1024}
              className="aspect-video w-full rounded-xl object-cover"
            />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-[#1F7A3A] shadow-[0_14px_34px_rgba(33,51,67,0.18)]" aria-hidden="true">
              <Play className="ml-1 h-7 w-7 fill-current" />
            </span>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {proofCards.map(([title, text]) => (
              <article key={title} className="rounded-xl border border-[#D5DEE8] bg-white p-5">
                <h3 className="text-xl font-bold tracking-[-0.025em] text-[#213343]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#516F90]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
