import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const primary = "inline-flex min-h-14 items-center justify-center rounded-full bg-[#15803D] px-8 py-4 text-base font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const auditCheckoutHref = pricingPackageById.workflow_audit.stripePaymentLink.url


export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#FBF8F2] text-[#071D3A]">
        <section id="assessment" className="relative isolate flex min-h-[100svh] scroll-mt-[120px] items-center overflow-hidden bg-[#071D3A] py-24 text-white lg:min-h-screen lg:py-28">
          <img src="/images/uploaded/ai-office/owner-reviewing-paperwork.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,29,58,0.98)_0%,rgba(7,29,58,0.91)_46%,rgba(7,29,58,0.62)_78%,rgba(7,29,58,0.5)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(83,217,134,0.2),transparent_34%),linear-gradient(180deg,rgba(7,29,58,0.08)_0%,rgba(7,29,58,0.88)_100%)]" />
          <div className={shell}>
            <div className="max-w-[900px]">
              <h1 className="text-balance text-[3rem] font-semibold leading-[0.96] tracking-[-0.025em] sm:text-[5.6rem] sm:tracking-[-0.045em]">Find the Office Work AI Should Remove First.</h1>
              <p className="mt-6 max-w-[780px] text-xl font-semibold leading-9 text-white/84">Get concrete fixes, staff AI prompts, workflow tips, tool recommendations, and the first install priority — not a recap of how your office already works.</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href={auditCheckoutHref} target="_blank" rel="noopener noreferrer" className={primary}>Book the AI Office Map <ArrowRight className="ml-2 h-5 w-5" /></a>
                <Link href="/ai-office-blueprint" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/30 bg-white/12 px-8 py-4 text-base font-extrabold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18">Get the Free Blueprint</Link>
              </div>
              <div className="mt-7 flex max-w-[760px] flex-wrap gap-3">
                {["Fix list", "Staff AI prompts", "Install priority", "$197 credited toward Sprint"].map((item) => (
                  <div key={item} className="rounded-full border border-white/14 bg-white/[0.07] px-4 py-2 text-sm font-extrabold text-white/82 backdrop-blur-md">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section data-motion-exempt className={`${shell} pt-16 pb-10 lg:pt-24 lg:pb-12`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-[2.25rem] font-semibold leading-[1] tracking-[-0.035em] text-[#071D3A] sm:text-[4rem]">See What the Map Gives You</h2>
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

        <section id="buy" data-motion-exempt className="bg-[#071D3A] py-16 text-white lg:py-24">
          <div className={`${shell} grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center`}>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9BE7AE]">Buy the Map</p>
              <h2 className="mt-3 text-[2.35rem] font-semibold leading-[1] tracking-[-0.04em] text-white sm:text-[4.35rem]">Ready to find the first workflow worth fixing?</h2>
              <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-white/72">Buy the AI Office Map for $197. We trace the office drag, turn it into concrete fixes and staff-ready AI plays, then point you at the first workflow worth installing.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {["$197 flat purchase", "45–60 minute work session", "$197 credited toward your Sprint"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-extrabold text-white/88">{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#9BE7AE]">Checkout</p>
              <div className="mt-4 rounded-[1.5rem] bg-white p-5 text-[#071D3A]">
                <div className="flex items-end justify-between gap-4 border-b border-[#DDEBE2] pb-5">
                  <div>
                    <p className="text-sm font-extrabold text-[#536173]">AI Office Map</p>
                    <p className="mt-1 text-5xl font-semibold tracking-[-0.06em]">$197</p>
                  </div>
                  <p className="rounded-full bg-[#DDF7E8] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#116832]">paid diagnostic</p>
                </div>
                <div className="mt-5 grid gap-3">
                  {["Fix list, quick wins, and workflow priorities", "Staff AI prompts your team can use immediately", "Tool guidance and the first install recommendation"].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm font-bold leading-6 text-[#536173]"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" />{item}</div>
                  ))}
                </div>
              </div>
              <a href={auditCheckoutHref} target="_blank" rel="noopener noreferrer" className={`${primary} mt-6 w-full`}>Book the AI Office Map <ArrowRight className="ml-2 h-5 w-5" /></a>
              <p className="mt-4 text-center text-sm font-semibold leading-6 text-white/58">Checkout opens in Stripe. After purchase, you will pick the best time for the Map.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
