import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { InstallationSprintContactForm } from "@/components/installation-sprint-contact-form"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const primary = "inline-flex min-h-14 items-center justify-center rounded-full bg-[#15803D] px-8 py-4 text-base font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"

export default function PAGE() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#FBFCF7] text-[#071D3A]">
        <section className="relative isolate flex min-h-[680px] overflow-hidden bg-[#071D3A] px-4 pb-20 pt-32 text-white sm:px-6 lg:min-h-[100svh] lg:px-8 lg:pb-28 lg:pt-36">
          <img src="/images/uploaded/package-heroes/stanley-systems-sprint-plan-office-team-van.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#071D3A_0%,rgba(7,29,58,0.96)_20%,rgba(7,29,58,0.74)_48%,rgba(7,29,58,0.28)_72%,rgba(7,29,58,0.52)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,29,58,0.74)_0%,rgba(7,29,58,0.18)_42%,#071D3A_100%)]" />
          <div className={`${shell} flex min-h-[520px] w-full items-center lg:min-h-0`}>
            <div className="max-w-[820px]">
              <h1 className="text-balance text-[2.65rem] font-semibold leading-[1.03] tracking-[-0.025em] text-white sm:text-[4.15rem]">Install the office workflows your team actually needs.</h1>
              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/78">Starting at $3,500, Stanley Systems turns your AI Office Map into staff training, a company playbook, and practical AI-guided workflows around the software your team already uses.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="#installation-contact" className={primary}>Talk about an AI Office Installation Sprint <ArrowRight className="ml-2 h-4 w-4" /></Link><Link href="/pricing" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/35 bg-white/12 px-8 py-4 text-base font-extrabold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18">Compare Map, AI Office Installation Sprint, and Ops</Link></div>
            </div>
          </div>
        </section>

        <section id="sprint-includes" className={`${shell} scroll-mt-[120px] py-14 lg:py-18`} aria-labelledby="sprint-includes-title">
          <div className="grid gap-5 rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_24px_70px_rgba(7,29,58,0.07)] sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#15803D]">What the Sprint includes</p>
              <h2 id="sprint-includes-title" className="mt-3 text-[2.15rem] font-semibold leading-[1.05] tracking-[-0.025em] text-[#071D3A] sm:text-[3rem]">The Map becomes working office habits.</h2>
              <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-[#536173]">The Sprint is for the workflow that is already clear enough to build. It is not a vague strategy call.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["1-3 priority workflows installed", "Staff AI training session", "Company playbook and SOPs", "Prompt/template pack", "Proof report", "30 days light support"].map((item) => (
                <div key={item} className="rounded-2xl border border-[#DDEBE2] bg-[#F4FBF5] px-4 py-3 text-sm font-extrabold leading-6 text-[#102033]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${shell} py-16 lg:py-24`} aria-labelledby="sprint-demo-title">
          <div className="mx-auto max-w-4xl text-center">
            <h2 id="sprint-demo-title" className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[4rem]">AI Office Installation Sprint Demo</h2>
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
