import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react"
import { notFound } from "next/navigation"
import { MarketingPageShell } from "@/components/marketing-page-shell"
import { getPostBySlug, posts } from "../posts"

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Article not found | Stanley Systems",
    }
  }

  return {
    title: post.seoTitle,
    description: post.metaDescription,
  }
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <MarketingPageShell>
      <article className="px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to articles
          </Link>

          <div className="mt-8 rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur sm:p-10">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="rounded-full bg-[#f8f4ee] px-3 py-1 font-medium text-slate-700">{post.category}</span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {post.readTime}
              </span>
              <span>{post.publishedLabel}</span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-6 text-xl leading-9 text-slate-600">{post.intro}</p>
          </div>

          <div className="mt-8 rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur sm:p-10">
            <div className="space-y-12">
              {post.sections.map((section) => (
                <section key={section.heading} className="space-y-5">
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-lg leading-8 text-slate-700">
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets ? (
                    <ul className="space-y-3 pl-6 text-lg leading-8 text-slate-700">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="list-disc">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-[#d9e5ff] bg-[#f4f8ff] p-8 shadow-[0_18px_60px_rgba(21,38,74,0.06)] sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{post.ctaTitle}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{post.ctaBody}</p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Talk to Stanley
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    </MarketingPageShell>
  )
}
