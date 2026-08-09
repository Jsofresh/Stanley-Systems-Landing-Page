import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { posts } from "./posts"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  const [featured, ...rest] = posts
  const byProblem = rest.reduce<Record<string, typeof posts>>((groups, post) => {
    const key = post.category || "Guides"
    groups[key] = groups[key] || []
    groups[key].push(post)
    return groups
  }, {})

  return (
    <>
      <SiteHeader />
      <main className="bg-[#F7F4EC] text-[#102033]">
        <section className="mx-auto max-w-7xl px-4 pb-10 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
          <h1 className="max-w-4xl text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#071D3A] sm:text-[3.45rem] lg:text-[4.2rem]">Plain-English fixes for billing delays, handoffs, and missed follow-up.</h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#42596C]">Read how service businesses lose money after the work is already earned — and what cleaner office systems change.</p>
        </section>

        {featured && (
          <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <article className="grid gap-8 rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_18px_54px_rgba(7,29,58,0.06)] sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <h2 className="mt-3 text-[2rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-[2.75rem]">{featured.title}</h2>
              </div>
              <div>
                <p className="text-base font-medium leading-7 text-[#536173]">{featured.excerpt}</p>
                <Link href={`/blog/${featured.slug}`} className="mt-5 inline-flex items-center text-sm font-extrabold text-[#116832] underline underline-offset-4">Read article <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </div>
            </article>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-[#071D3A] p-6 text-white sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em]">Want the leak found in your own business?</h2>
              <p className="mt-3 max-w-3xl text-base font-medium leading-7 text-[#DDEBE2]">The AI Profit Map turns the ideas here into a specific fix list for your office workflow.</p>
            </div>
            <Link href="/ai-profit-map" className="mt-6 inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:bg-[#F4FBF5] lg:mt-0">Buy the AI Profit Map</Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(byProblem).flatMap(([category, categoryPosts]) =>
              categoryPosts.map((post) => (
                <article key={post.slug} className="flex h-full flex-col rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(7,29,58,0.07)]">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6A7A68]">{category} · {post.publishedLabel} · {post.readTime}</p>
                  <h3 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.03em] text-[#071D3A]">{post.title}</h3>
                  <p className="mt-3 flex-1 text-sm font-medium leading-6 text-[#536173]">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center text-sm font-extrabold text-[#116832] underline underline-offset-4">Read article</Link>
                </article>
              )),
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
