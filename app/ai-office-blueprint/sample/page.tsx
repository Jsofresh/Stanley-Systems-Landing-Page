import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"

export default function BlueprintSamplePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#FBF8F2] pt-28 text-[#071D3A]">
        <section data-motion-exempt className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#15803D]">Sample Output</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">AI Office Blueprint Sample</h1>
              <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-[#536173]">See the kind of workflow report we send back: AI staff plays, copy/paste prompts, and the first office bottleneck to fix.</p>
            </div>
            <Link href="/ai-office-blueprint" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white">Get My Free Blueprint <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </div>
        </section>
        <section data-motion-exempt className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <iframe title="AI Office Blueprint sample" src="/ai-office-blueprint/sample-html" className="h-[80vh] w-full rounded-[1.5rem] border border-[#DDEBE2] bg-white shadow-[0_18px_54px_rgba(7,29,58,0.08)]" />
        </section>
      </main>
      <Footer />
    </>
  )
}
