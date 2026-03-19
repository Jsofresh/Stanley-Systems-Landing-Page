import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"

export function NotFoundContent() {
  return (
    <section className="px-4 pb-20 pt-32 sm:pt-36 lg:pt-40">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[2rem] border border-[#e8dfd0] bg-white/85 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-12 lg:p-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e8dfd0] bg-[#f8f4ee] px-4 py-2 text-sm font-medium text-slate-700">
            <Search className="h-4 w-4" />
            Page not found
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">Looks like this page moved or never existed.</h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            If you were trying to learn about Stanley Systems, the best next step is to head back to the homepage, read the blog, or go straight to the contact page.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Back to homepage
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#e8dfd0] bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#faf7f2]"
            >
              Contact Stanley Systems
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-2 py-3 text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4 rotate-180" />
              View blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
