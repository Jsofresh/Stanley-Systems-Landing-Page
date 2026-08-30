import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { LoginForm } from "@/components/portal/login-form"
import { getPortalSession } from "@/lib/portal/session"

export const dynamic = "force-dynamic"
export const metadata: Metadata = {
  title: "Client Login | Stanley Systems",
  description: "Sign in to your Stanley Systems company workspace.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/login" },
}

export default function LoginPage() {
  let portalConfigured = true
  let hasPortalSession = false
  try {
    hasPortalSession = Boolean(getPortalSession())
  } catch {
    portalConfigured = false
  }
  if (hasPortalSession) redirect("/portal")
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#071422] px-4 py-6 text-white sm:px-6">
      <div className="mx-auto flex min-h-[calc(100svh-3rem)] w-full max-w-6xl min-w-0 flex-col">
        <header className="flex min-w-0 items-center justify-between gap-3">
          <Link href="/" className="min-w-0 text-lg font-bold tracking-tight text-white">
            Stanley Systems
          </Link>
          <Link
            href="/"
            className="shrink-0 rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white transition hover:border-[#53D986] hover:text-[#8DF3A4]"
          >
            Back to site
          </Link>
        </header>

        <section className="grid min-w-0 flex-1 items-center gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_440px]">
          <div className="max-w-2xl min-w-0">
            <h1 className="max-w-full text-balance break-words text-[clamp(3rem,10vw,5.5rem)] font-extrabold leading-[.92] tracking-[-.045em] text-white">
              Your office. One secure workspace.
            </h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-white/66 [overflow-wrap:anywhere] sm:[overflow-wrap:normal]">
              Sign in to Stanley AI Office with the role and permissions assigned to your company account.
            </p>
          </div>

          <div className="min-w-0 rounded-[2rem] border border-white/10 bg-[#fffdf8] p-5 text-[#102033] shadow-[0_30px_90px_rgba(0,0,0,.28)] sm:p-8">
            <div>
              <h2 className="text-2xl font-bold text-[#102033]">Sign in</h2>
              <p className="mt-2 text-sm leading-6 text-[#667085]">Use the credentials assigned to your company account.</p>
            </div>
            {portalConfigured ? <LoginForm /> : <div role="alert" className="mt-6 rounded-2xl border border-[#f1c7c7] bg-[#fff4f4] p-4 text-sm font-semibold leading-6 text-[#991b1b]">Client access is temporarily unavailable. Please contact Stanley Systems for assistance.</div>}
          </div>
        </section>
      </div>
    </main>
  )
}
