import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { VideoDemoPlaceholder } from "@/components/video-demo-placeholder"
import { commandMapPricingPackage } from "@/lib/pricing/source-of-truth"

export const metadata: Metadata = {
  title: "AI Office Command Map | Stanley Systems",
  description: "Get one standardized starter automation installed with you, two DIY automation kits, and three personalized office-action blueprints for $197.",
  alternates: { canonical: "/ai-office-command-map" },
  openGraph: { title: "AI Office Command Map | Stanley Systems", description: "Get one installed starter, two reusable kits, and three workflow blueprints for $197.", url: "https://stanley-systems.com/ai-office-command-map", siteName: "Stanley Systems", images: [{ url: "https://stanley-systems.com/stanley-systems-logo-reference.jpg", width: 1024, height: 1024, alt: "Stanley Systems logo" }], type: "website" },
  twitter: { card: "summary_large_image", title: "AI Office Command Map | Stanley Systems", description: "One installed starter, two reusable kits, and three workflow blueprints for $197.", images: ["https://stanley-systems.com/stanley-systems-logo-reference.jpg"] },
}

const mapDeliverables = [
  {
    number: "01",
    title: "Install one practical first win",
    copy: "A report, document, or follow-up package selected from a clear starter menu.",
  },
  {
    number: "02",
    title: "Give the team two reusable kits",
    copy: "Clear prompts, templates, setup steps, and a short walkthrough.",
  },
  {
    number: "03",
    title: "Map the next three workflows",
    copy: "See the bottleneck, controls, expected result, and next action.",
  },
]

const installedExamples = [
  "A source-backed weekly office report",
  "A document or spreadsheet generator",
  "A follow-up draft package prepared for approval",
]

const faqs = [
  ["Is this a custom software project?", "No. You select one starter workflow from a defined menu, then Stanley Systems installs it with you."],
  ["Do I need to share passwords in a form?", "No. Never place passwords, API keys, private customer records, or access tokens in the public intake."],
  ["How much time will I need?", "Scheduling and your expected time commitment are confirmed before work begins. The starter is selected and installed with you."],
  ["What happens after purchase?", "You complete a safe intake, choose the starter with Stanley Systems, install it together, receive two DIY kits and three personalized blueprints, then review the broader installation path."],
]

export default function CommandMapPage() {
  return (
    <>
      <SiteHeader />
      <main data-analytics-view="command_map_viewed" className="overflow-hidden bg-[#F7F4ED] text-[#071D3A]">
        <section data-nav-theme="dark" className="relative flex min-h-[100svh] items-center bg-[#071422] px-5 pb-14 pt-32 text-white md:px-8 lg:px-12">
          <div aria-hidden="true" className="absolute -left-40 top-36 h-[32rem] w-[32rem] rounded-full bg-[#15803D]/15 blur-[120px]" />
          <div className="relative mx-auto grid w-full max-w-[92rem] items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
            <div>
              <h1 className="max-w-[820px] text-balance text-[clamp(3.3rem,6.2vw,5.8rem)] font-extrabold leading-[0.89] tracking-[-0.05em]">
                Find the office bottleneck worth <span className="text-[#53D986]">fixing first.</span>
              </h1>
              <p className="mt-6 max-w-[690px] text-lg font-semibold leading-8 text-white/72 sm:text-xl">
                The $197 AI Office Command Map gives you one installed starter, two reusable DIY kits, and three company-specific workflow blueprints—before you commit to the full installation.
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a
                  href={commandMapPricingPackage.stripePaymentLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="command_map_checkout_clicked"
                  data-package-id="ai_office_command_map"
                  data-package-name="AI Office Command Map"
                  className="inline-flex min-h-16 items-center justify-center rounded-full bg-[#15803D] px-8 text-lg font-extrabold text-white shadow-[0_22px_54px_rgba(10,85,38,.4)] transition hover:-translate-y-1 hover:bg-[#116832]"
                >
                  Get the Command Map — $197 <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <p className="font-bold text-white/48">One-time purchase</p>
              </div>
              <Link href="/ai-office-capacity-calculator" className="mt-7 inline-flex font-extrabold text-white/66 underline decoration-white/25 underline-offset-4 transition hover:text-white">
                Not ready? Calculate your Admin Drag first.
              </Link>
            </div>

            <VideoDemoPlaceholder
              title="See the Command Map from intake to installed starter."
              posterSrc="/images/uploaded/homepage/ai-office/ai-office-map-laptop.jpg"
              alt="Service business owner reviewing an AI Office Map on a laptop"
            />
          </div>
        </section>

        <section data-nav-theme="light" className="px-5 py-16 md:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-[92rem] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-[#0B3B60]/10 bg-white shadow-[0_32px_82px_rgba(7,29,58,.13)]">
              <Image
                src="/images/uploaded/homepage/ai-office/ai-office-blueprint-product-shot.jpg"
                alt="AI Office blueprint with staff plays, reusable prompts, and a quick-win plan"
                width={1250}
                height={1024}
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="h-auto w-full"
              />
            </div>
            <div>
              <h2 className="text-balance text-[clamp(2.7rem,4.8vw,4.3rem)] font-extrabold leading-[0.93] tracking-[-0.045em]">
                Leave with something working—and know <span className="text-[#15803D]">what comes next.</span>
              </h2>
              <div className="mt-7 divide-y divide-[#0B3B60]/12 border-y border-[#0B3B60]/12">
                {mapDeliverables.map(({ number, title, copy }) => (
                  <article key={number} className="grid gap-4 py-5 sm:grid-cols-[4.5rem_1fr] sm:items-start">
                    <div className="flex items-center gap-3 sm:block">
                      <p className="text-4xl font-black tracking-[-0.05em] text-[#15803D]">{number}</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold tracking-[-0.025em] sm:text-3xl">{title}</h3>
                      <p className="mt-2 text-base font-semibold leading-6 text-[#536173]">{copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section data-nav-theme="dark" className="bg-[#0B3B60] px-5 py-20 text-white md:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-4xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-6xl">Leave with a working first win.</h2>
              <ul className="mt-8 space-y-5">
                {installedExamples.map((item) => (
                  <li key={item} className="flex gap-4 text-lg font-bold leading-7 sm:text-xl">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#8DF3A4]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/16 pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
              <h2 className="text-4xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-6xl">Good fit if...</h2>
              <p className="mt-7 text-lg font-semibold leading-8 text-white/68 sm:text-xl">
                You have repeated office work, can provide approved inputs, and want a practical first win without committing to a full installation.
              </p>
            </div>
          </div>
        </section>

        <section data-nav-theme="light" className="px-5 py-20 md:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-5xl font-extrabold tracking-[-0.04em]">Command Map questions.</h2>
            <div className="mt-9 divide-y divide-[#D5E5DA] border-y border-[#D5E5DA]">
              {faqs.map(([question, answer]) => (
                <details key={question} className="py-5">
                  <summary className="cursor-pointer text-xl font-extrabold">{question}</summary>
                  <p className="mt-3 font-semibold leading-7 text-[#536173]">{answer}</p>
                </details>
              ))}
            </div>
            <div className="mt-12 rounded-[2rem] bg-[#071422] p-8 text-center text-white sm:p-10">
              <h2 className="text-3xl font-extrabold">Ready for the connected installation?</h2>
              <p className="mt-3 font-semibold text-white/68">See the Founding Partner offer and apply for fit.</p>
              <Link href="/systems-installation-sprint" className="mt-6 inline-flex min-h-14 items-center rounded-full bg-[#15803D] px-7 font-extrabold transition hover:bg-[#116832]">
                See the Installation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
