import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function OneMessageDemoSection({ compact = false }: { compact?: boolean }) {
  return (
    <section id={compact ? undefined : "one-message-demo"} data-nav-theme="dark" data-analytics-view="one_message_demo_started" className={`scroll-mt-28 overflow-hidden bg-[#071422] px-5 text-white md:px-8 lg:px-10 ${compact ? "py-14" : "py-16 lg:flex lg:min-h-screen lg:items-center lg:py-20"}`}>
      <div className="mx-auto grid w-full max-w-[88rem] gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
        <div className="max-w-[620px]">
          <h2 className="text-balance text-[clamp(3rem,6vw,5.8rem)] font-extrabold leading-[.9] tracking-[-.045em]">One message. Real office work.</h2>
          <p className="mt-5 max-w-lg text-lg font-semibold leading-8 text-white/72">Stanley checks the sources, prepares the next step, and returns proof.</p>
          <Link href="/systems-installation-sprint" className="mt-7 inline-flex min-h-14 items-center rounded-full bg-[#15803D] px-7 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#116832]">See How It Works <ArrowRight className="ml-2 h-5 w-5" /></Link>
        </div>
        <div className="relative min-h-[430px] overflow-hidden lg:min-h-[620px]" data-demo-image-slot="awaiting-jaden-image">
          <Image src="/images/uploaded/homepage/ai-office/staff-ai-playbook-next-step-ready.jpg" alt="Office work prepared with the next approved step ready" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-contain object-center" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#071422] to-transparent" />
        </div>
      </div>
    </section>
  )
}
