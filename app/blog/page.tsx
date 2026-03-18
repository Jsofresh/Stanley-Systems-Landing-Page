import Link from "next/link"
import { ArrowRight, Clock3 } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"

const posts = [
  {
    title: "The real cost of slow invoicing in a service business",
    excerpt:
      "Late invoices are not just an accounting annoyance. They create cash-flow drag, owner stress, and avoidable follow-up work that compounds every week.",
    category: "Operations",
    readTime: "4 min read",
  },
  {
    title: "Why most automation projects fail before they ever help the team",
    excerpt:
      "The problem usually is not the software. It is trying to automate a messy handoff instead of fixing the workflow the team already struggles with.",
    category: "Strategy",
    readTime: "5 min read",
  },
  {
    title: "What a trustworthy automation partner should actually deliver",
    excerpt:
      "Clear ownership, documented workflows, and practical systems your team can understand beat flashy demos every time.",
    category: "Trust & Ownership",
    readTime: "3 min read",
  },
]

export default function BlogPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Practical writing on bottlenecks, workflows, and operational cleanup.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-600 sm:text-[1.32rem]">
              This preview blog is set up as a professional resource hub for Stanley Systems. It gives the site a real publishing surface instead of a dead-end placeholder.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.title}
                className="rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur"
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
                <div className="mt-8">
                  <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 transition hover:text-slate-700">
                    Talk to Stanley
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
