import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ArrowRight, ClipboardList } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { BlueprintIntakeForm } from "@/components/ai-office-blueprint/blueprint-intake-form"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"

const heroBackground = {
  src: "/images/uploaded/ai-office-blueprint/dark-workflow-forms-green-glow-v3.jpg",
  alt: "Dark workflow forms with a green glow",
}

const blueprintOutputImage = {
  src: "/images/uploaded/ai-office-blueprint/custom-plays-prompts-capacity-win-v2.jpg",
  alt: "Blueprint output card showing custom plays, prompts, and one capacity win",
  width: 1280,
  height: 960,
}

export const metadata: Metadata = {
  title: "Free AI Office Blueprint | Stanley Systems",
  description: "Get a custom AI Office Blueprint with practical AI staff plays, copy/paste prompts, a quick capacity win, and the best office workflow to improve first.",
}

export default function AiOfficeBlueprintPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#FBF8F2] text-[#071D3A]">
        <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#071D3A] pb-16 pt-32 text-white lg:pb-20 lg:pt-36">
          <Image src={heroBackground.src} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,20,34,0.98)_0%,rgba(7,20,34,0.92)_32%,rgba(7,20,34,0.58)_56%,rgba(7,20,34,0.1)_78%,rgba(7,20,34,0.02)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,20,34,0.36)_0%,rgba(7,20,34,0.08)_42%,rgba(7,20,34,0.42)_100%)]" />
          <div className={`${shell} grid w-full gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center`}>
            <div className="max-w-[680px]">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#9BE7AE]">Free AI Office Blueprint</p>
              <h1 className="mt-4 max-w-4xl text-balance text-[3rem] font-semibold leading-[0.96] tracking-[-0.025em] sm:text-[5.6rem] sm:tracking-[-0.045em]">Get the Free AI Office Blueprint</h1>
              <p className="mt-6 max-w-[650px] text-xl font-semibold leading-9 text-white/84">Fill out one focused office workflow form. We’ll send back a custom AI Office Blueprint with practical AI staff plays for real office work — billing prep, follow-up, handoffs, job notes, customer replies, Excel, and admin cleanup.</p>
              <a href="#blueprint-form" className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-[#15803D] px-8 py-4 text-base font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]">Get My Free Blueprint <ArrowRight className="ml-2 h-5 w-5" /></a>
            </div>
            <div className="relative mx-auto w-full max-w-[560px] lg:mr-[-7vw] lg:max-w-[720px] xl:mr-[-10vw] xl:max-w-[820px] 2xl:mr-[-12vw]">
              <Image src={blueprintOutputImage.src} alt={blueprintOutputImage.alt} width={blueprintOutputImage.width} height={blueprintOutputImage.height} priority className="h-auto w-full rounded-[1.75rem] shadow-[0_26px_90px_rgba(0,0,0,0.32)]" sizes="(min-width: 1280px) 56vw, (min-width: 1024px) 50vw, 100vw" />
            </div>
          </div>
        </section>

        <section data-motion-exempt className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start xl:grid-cols-[minmax(0,1fr)_360px]">
            <div id="blueprint-form" className="scroll-mt-44 lg:scroll-mt-48">
              <div className="mx-auto max-w-[820px]">
                <BlueprintIntakeForm />
              </div>
            </div>
            <aside className="rounded-[1.75rem] border border-[#CFE8D5] bg-[#EEF8EE] p-6 lg:sticky lg:top-32">
              <ClipboardList className="h-8 w-8 text-[#116832]" />
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">What the form gives us</h2>
              <p className="mt-3 text-base font-semibold leading-7 text-[#536173]">Specific tools, stuck points, staff cleanup work, billing drag, missed follow-up, and one messy example. That gives us enough detail to make the first Blueprint useful instead of generic.</p>
              <Link href="/workflow-audit" className="mt-6 inline-flex text-sm font-extrabold text-[#116832]">Need the full Map instead? <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
