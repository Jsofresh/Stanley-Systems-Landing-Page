import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import { AiOfficeMapInfoForm } from "@/components/ai-office-map-info-form"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const primary = "inline-flex min-h-14 items-center justify-center rounded-full bg-[#15803D] px-8 py-4 text-base font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const auditCheckoutHref = pricingPackageById.workflow_audit.stripePaymentLink.url

export const metadata: Metadata = {
  title: "AI Profit Map for Service Business Office Work | Stanley Systems",
  description:
    "The AI Profit Map shows where office work is costing time, cash, and customer follow-up, then gives service businesses an AI office fix plan.",
  alternates: {
    canonical: "https://stanley-systems.com/ai-profit-map",
  },
  openGraph: {
    title: "AI Profit Map | Stanley Systems",
    description:
      "Find where office work is costing time, cash, and customer follow-up. Get an AI office plan for service businesses.",
    url: "https://stanley-systems.com/ai-profit-map",
    type: "website",
  },
}

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#FBF8F2] text-[#071D3A]">
        <section id="assessment" className="relative isolate flex min-h-[100svh] scroll-mt-[120px] items-center overflow-hidden bg-[#071D3A] py-24 text-white lg:min-h-screen lg:py-28">
          <img src="/images/uploaded/ai-office/owner-reviewing-paperwork.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,29,58,0.90)_0%,rgba(7,29,58,0.78)_44%,rgba(7,29,58,0.44)_76%,rgba(7,29,58,0.30)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(83,217,134,0.16),transparent_34%),linear-gradient(180deg,rgba(7,29,58,0.02)_0%,rgba(7,29,58,0.62)_100%)]" />
          <div className="w-full px-4 sm:px-6 lg:px-0">
            <div className="max-w-[900px] lg:ml-[15vw]">
              <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#8DF3A4]">AI Profit Map</p>
              <h1 className="text-balance text-[3rem] font-semibold leading-[0.96] tracking-[-0.025em] sm:text-[5.6rem] sm:tracking-[-0.045em]">AI Profit Map</h1>
              <p className="mt-6 max-w-[780px] text-xl font-semibold leading-9 text-white/84">Find where office work is costing time, cash, and customer follow-up. Then get the AI fix plan to make the business more profitable.</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href={auditCheckoutHref} target="_blank" rel="noopener noreferrer" className={primary}>Buy the $97 AI Profit Map <ArrowRight className="ml-2 h-5 w-5" /></a>
                <Link href="/ai-office-blueprint" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/30 bg-white/12 px-8 py-4 text-base font-extrabold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18">Get the Free Blueprint</Link>
              </div>
              <p className="mt-5 max-w-[720px] text-base font-semibold leading-7 text-white/66">Built for service businesses with office drag around billing prep, job notes, records, follow-up, handoffs, and inbox work.</p>
            </div>
          </div>
        </section>

        <section data-motion-exempt className={`${shell} pt-16 pb-10 lg:pt-24 lg:pb-12`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-[2.25rem] font-semibold leading-[1] tracking-[-0.035em] text-[#071D3A] sm:text-[4rem]">See What the Profit Map Gives You</h2>
          </div>
          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-[2rem] border border-[#CFE8D5] bg-[#071D3A] p-2 shadow-[0_24px_70px_rgba(7,29,58,0.18)] sm:p-3">
            <video
              className="aspect-video w-full rounded-[1.5rem] bg-[#071D3A] object-cover"
              src="/videos/ai-office-map-demo-preview.mp4"
              poster="/images/uploaded/ai-office/ai-office-map-demo-preview-poster.jpg"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </section>

        <section id="buy" data-motion-exempt className="relative isolate scroll-mt-[120px] overflow-hidden bg-[#03162d] py-14 text-white sm:py-16 lg:py-20">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_18%,rgba(18,65,106,0.5),transparent_36%),radial-gradient(circle_at_50%_100%,rgba(39,174,96,0.12),transparent_42%),linear-gradient(180deg,#041b35_0%,#03152b_58%,#020f22_100%)]" />
          <div className="absolute inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className={`${shell} text-center`}>
            <h2 className="mx-auto max-w-4xl text-balance text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.032em] text-white sm:text-[4rem] lg:text-[4.45rem]">Buy the AI Profit Map</h2>

            <div className="mx-auto mt-6 max-w-[520px] rounded-[1.35rem] border border-white/13 bg-white/[0.035] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.34)] backdrop-blur-md sm:p-6">
              <p className="text-[3.4rem] font-semibold leading-none tracking-[-0.045em] text-white sm:text-[3.95rem]">$97</p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-[#8DF3A4] sm:text-sm">Counts as $194 toward the Sprint for 14 days</p>
              <a href={auditCheckoutHref} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-16 w-full items-center justify-center rounded-full border border-[#7df19b]/50 bg-[#22c55e] px-6 py-4 text-lg font-extrabold text-white shadow-[0_18px_44px_rgba(34,197,94,0.28),inset_0_1px_0_rgba(255,255,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#16a34a] sm:text-xl">
                Buy the AI Profit Map <ArrowRight className="ml-3 h-6 w-6" aria-hidden="true" />
              </a>
            </div>

            <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-4 text-left text-base font-semibold text-white/88 sm:text-lg">
              {["Office Drag Review", "AI Opportunity Map", "Priority Fix List", "Profit Walkthrough", "$194 Installation Credit"].map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-[#8DF3A4]" aria-hidden="true" />
                  <span>{item}</span>
                  {index < 4 ? <span className="ml-5 hidden h-7 w-px bg-white/20 lg:inline-block" aria-hidden="true" /> : null}
                </div>
              ))}
            </div>
            <div className="mx-auto mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-base font-semibold text-white/54 sm:text-lg">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 shrink-0 text-[#8DF3A4]/90" aria-hidden="true" />
                <span>Checkout in Stripe</span>
              </div>
              <span className="hidden text-white/35 sm:inline">•</span>
              <span>Pick your walkthrough time after purchase</span>
            </div>
          </div>
        </section>

        <AiOfficeMapInfoForm />
      </main>
      <Footer />
    </>
  )
}
