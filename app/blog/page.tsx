import Link from "next/link"
import { ArrowRight, Clock3 } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"
import { posts } from "./posts"

export default function BlogPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">
              Operations · Strategy · Trust
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              Practical writing on bottlenecks, workflows, and operational cleanup.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Plain-English articles for service-business owners who want to understand where the drag is coming from and what a clean fix actually looks like.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.title}
                className="flex h-full flex-col rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur"
              >
                <div className="flex items-center justify-between gap-4 text-sm text-slate-500">
                  <span className="rounded-full bg-[#f8f4ee] px-3 py-1 font-medium text-slate-700">{post.category}</span>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">{post.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">{post.excerpt}</p>
                <div className="mt-auto flex justify-center pt-8">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 transition hover:text-slate-700"
                  >
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </MarketingPageShell>
  )
}
