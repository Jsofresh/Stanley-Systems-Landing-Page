import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"

export default function PAGE() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#FBFCF7] text-[#071D3A] pt-20">
        <section className="mx-auto max-w-7xl px-4 pb-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
          <h1 className="max-w-5xl text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[4.4rem]">Not sure if you need another admin or a better office workflow?</h1>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-[#42596C]">Use the form below to send Stanley Systems the bottleneck. We will route you to the Admin Drag Calculator, AI Office Map, Installation Sprint, or a simple fit answer.</p>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
