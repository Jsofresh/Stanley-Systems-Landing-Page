import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { PackageHero } from "@/components/package-hero"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"

export const metadata: Metadata = {
  title: "Repeat Revenue | Stanley Systems",
  description: "Repeat Revenue helps service businesses bring past customers back, ask for reviews and referrals, recover missed calls, and keep customer follow-up moving.",
  alternates: { canonical: "https://stanley-systems.com/systems/repeat-revenue" },
}

const automations = [
  ["Past customer follow-up", "Past customers get timed follow-up instead of disappearing after the job is done."],
  ["Review asks", "Stanley Systems can automatically ask happy customers for a Google review after a completed job, while they are most likely to respond."],
  ["Referral asks", "The referral system gives customers a reason to send friends your way, creating more customer opportunities from work you already earned."],
  ["Missed-call recovery", "Keep new demand from disappearing when the office is busy."],
  ["Private feedback routing", "Unhappy replies get routed privately so your team can respond before the issue becomes a public review."],
  ["Shop-specific follow-up", "Build the follow-up gaps that matter in your shop, even when they are too specific to list publicly."],
]

function ImageCard({ src, alt, width, height, priority = false }: { src: string; alt: string; width: number; height: number; priority?: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[720px] drop-shadow-[0_26px_54px_rgba(7,29,58,0.10)]">
      <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,rgba(244,251,245,0.92),rgba(244,251,245,0)_68%)] blur-2xl" aria-hidden="true" />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="relative h-auto w-full rounded-[1.2rem] object-contain"
      />
    </div>
  )
}

export default function SystemPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-white text-[#071D3A]">
        <PackageHero
          eyebrow="Repeat Revenue System"
          title="Turn Good Customers Into Reviews, Referrals, and the Next Job"
          subheading="Repeat Revenue keeps past customers, review asks, referral asks, reminders, and missed-call recovery moving so work you already earned keeps creating more booked jobs."
          imageSrc="/images/uploaded/package-heroes/all-pro-homeowner-review-calls-dashboard.jpg"
          imageAlt="Service business owner reviewing homeowner follow-up, review requests, referral asks, and repeat-job reminders."
          imageWidth={1280}
          imageHeight={720}
          objectPosition="58% center"
          primaryHref="/workflow-audit"
          primaryLabel="Start the Cash Flow Assessment"
          secondaryHref="/systems-installation-sprint"
          secondaryLabel="See how the Sprint works"
          cards={[
            { label: "47 customers ready for follow-up", detail: "Past buyers are not left cold." },
            { label: "12 review requests queued", detail: "Good jobs turn into public proof." },
            { label: "5 repeat jobs booked", detail: "Old customers come back again." },
            { label: "Referral ask scheduled", detail: "Happy customers get prompted at the right time." },
          ]}
        />

        <section data-section="repeat-systems" className="bg-white py-14 sm:py-16">
          <div className={shell}>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Bring past customers back with follow-up your team can actually trust.</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {automations.map((item) => (
                <article key={item[0]} className="rounded-[1.35rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white">
                  <h3 className="text-xl font-semibold tracking-[-0.025em] text-[#102033]">{item[0]}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#536173]">{item[1]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-section="repeat-sprint-build" className="bg-[#F4FBF5] py-14 sm:py-16">
          <div className={`${shell} grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-center`}>
            <div>
              <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">How Repeat Revenue gets built</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Stanley Systems does the build for you: mapping the follow-up gaps, setting up the workflows, reminders, handoffs, and checks that bring past customers back and ask good customers for reviews or referrals.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <ImageCard
                src="/images/uploaded/2026-05-25-jaden/repeat-revenue-follow-up-review-referral-routing.jpg"
                alt="Repeat Revenue follow-up, review, referral, and response routing workflow."
                width={1280}
                height={720}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
