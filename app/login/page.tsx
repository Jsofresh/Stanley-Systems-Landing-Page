import Link from "next/link"
import { LoginForm } from "@/components/portal/login-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] px-4 py-6 text-[#102033] sm:px-6">
      <div className="mx-auto flex min-h-[calc(100svh-3rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-[#102033]">
            Stanley Systems
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[#ded6c8] bg-white px-4 py-2 text-sm font-bold text-[#435266] transition hover:text-[#15803d]"
          >
            Back to site
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1fr_440px]">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase text-[#15803d]">Client Login</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-[#102033] sm:text-5xl">
              Company Brain access for service-business teams.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#5f6d7a]">
              Sign in as a real test persona for Bayview Service Co. Each user gets a distinct actor, role, and session before the Stanley UI talks to the brain-test Company Brain runtime.
            </p>
          </div>

          <div className="rounded-2xl border border-[#ded6c8] bg-[#fffdf8] p-5 shadow-[0_24px_70px_rgba(16,32,51,0.10)] sm:p-7">
            <div>
              <h2 className="text-2xl font-bold text-[#102033]">Sign in</h2>
              <p className="mt-2 text-sm leading-6 text-[#667085]">Non-production Company Brain personas. The session is routed through the live Stanley UI to brain-test.</p>
            </div>
            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  )
}
