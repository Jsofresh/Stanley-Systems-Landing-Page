import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { InstallationSprintContactForm } from "@/components/installation-sprint-contact-form"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const primary = "inline-flex min-h-14 items-center justify-center rounded-[0.7rem] bg-[#15923D] px-7 py-4 text-lg font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.28)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const heroWins = ["Faster billing", "Fewer dropped handoffs", "Clear next steps"]

export default function PAGE() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#FBFCF7] text-[#071D3A]">
        <section className="relative isolate flex min-h-[700px] overflow-hidden bg-[#071D3A] px-4 pb-16 pt-28 text-white sm:px-6 lg:min-h-[100svh] lg:px-8 lg:pb-20 lg:pt-28">
          <img src="/images/uploaded/package-heroes/stanley-systems-sprint-plan-office-team-van.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-[18%_center]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#061629_0%,rgba(6,22,41,0.96)_17%,rgba(6,22,41,0.80)_38%,rgba(6,22,41,0.28)_58%,rgba(6,22,41,0.04)_78%,rgba(6,22,41,0.08)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,22,41,0.10)_0%,rgba(6,22,41,0.02)_48%,#061629_100%)]" />
          <div className={`${shell} flex min-h-[560px] w-full items-center lg:min-h-0`}>
            <div className="max-w-[650px] 2xl:-translate-x-16">
              <h1 className="text-balance text-[3.25rem] font-semibold leading-[0.96] tracking-[-0.033em] text-white sm:text-[3.95rem] lg:text-[4.15rem]">Get more done with the team you already have.</h1>
              <ul className="mt-7 grid gap-2.5 text-xl font-semibold leading-7 text-white/88" aria-label="Installation Sprint outcomes">
                {heroWins.map((item) => (
                  <li key={item} className="flex items-center gap-3.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#15923D] text-white shadow-[0_8px_18px_rgba(21,146,61,0.28)]"><Check className="h-[1.1rem] w-[1.1rem]" strokeWidth={3} /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="#installation-contact" className={primary}>Install Your First Workflow <ArrowRight className="ml-2 h-5 w-5" /></Link><Link href="/pricing" className="inline-flex min-h-14 items-center justify-center whitespace-nowrap rounded-[0.7rem] border border-white/60 bg-[#071D3A]/20 px-7 py-4 text-lg font-extrabold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/12">Compare Map, Sprint, and Ops</Link></div>
            </div>
          </div>
        </section>


        <section className={`${shell} py-16 lg:py-24`} aria-labelledby="sprint-demo-title">
          <div className="mx-auto max-w-4xl text-center">
            <h2 id="sprint-demo-title" className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[4rem]">AI Office Installation Sprint</h2>
          </div>
          <div className="mt-9 overflow-hidden rounded-[2rem] border border-[#DDEBE2] bg-[#071D3A] shadow-[0_30px_90px_rgba(7,29,58,0.18)]">
            <video
              src="/videos/installation-sprint/office-installation-sprint-demo.mp4"
              poster="/videos/installation-sprint/office-installation-sprint-demo-poster.jpg"
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full bg-[#071D3A]"
            />
          </div>
        </section>

        <InstallationSprintContactForm />
      </main>
      <Footer />
    </>
  )
}
