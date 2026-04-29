import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Film, FolderOpen, PlayCircle, ShieldCheck, Video } from "lucide-react"
import { hasValidRemotionToken, REMOTION_ACCESS_COOKIE } from "@/lib/remotion-access"

const repoPath = "/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/remotion"
const outputPath = "/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/public/broll"

export default function RemotionPage() {
  const cookieStore = cookies()
  const token = cookieStore.get(REMOTION_ACCESS_COOKIE)?.value

  if (!hasValidRemotionToken(token)) {
    redirect("/remotion/login")
  }

  return (
    <main className="min-h-screen bg-[#f7f7f4] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-[2rem] border border-[#d9e6d7] bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-[#d9e6d7] bg-[#f2faf1] px-4 py-2 text-sm font-semibold text-[#166534]">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Private Remotion access
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Stanley video editor</h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                This is your private entry point for the Remotion video project. Edit the composition files, rerender, and review outputs without exposing the route publicly.
              </p>
            </div>
            <Link
              href="/"
              className="rounded-full border border-[#e8dfd0] px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#f6f3ed]"
            >
              Back to site
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-[1.75rem] border border-[#e8dfd0] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-3">
              <FolderOpen className="h-5 w-5 text-slate-800" />
              <h2 className="text-xl font-semibold text-slate-900">Project paths</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div>
                <div className="font-semibold text-slate-900">Remotion project</div>
                <code className="mt-1 block rounded-xl bg-slate-950 px-4 py-3 text-xs text-slate-100">{repoPath}</code>
              </div>
              <div>
                <div className="font-semibold text-slate-900">Rendered videos</div>
                <code className="mt-1 block rounded-xl bg-slate-950 px-4 py-3 text-xs text-slate-100">{outputPath}</code>
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[#e8dfd0] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-3">
              <PlayCircle className="h-5 w-5 text-slate-800" />
              <h2 className="text-xl font-semibold text-slate-900">Quick commands</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div>
                <div className="font-semibold text-slate-900">List compositions</div>
                <code className="mt-1 block rounded-xl bg-slate-950 px-4 py-3 text-xs text-slate-100">cd {repoPath} && npm exec remotion compositions src/index.tsx</code>
              </div>
              <div>
                <div className="font-semibold text-slate-900">Render a still</div>
                <code className="mt-1 block rounded-xl bg-slate-950 px-4 py-3 text-xs text-slate-100">cd {repoPath} && npx remotion still src/index.tsx billing-leak-mobile ../public/broll/test-still.png --frame=1500 --overwrite</code>
              </div>
              <div>
                <div className="font-semibold text-slate-900">Render a video</div>
                <code className="mt-1 block rounded-xl bg-slate-950 px-4 py-3 text-xs text-slate-100">cd {repoPath} && npx remotion render billing-leak-mobile ../public/broll/billing-leak-mobile-custom.mp4 --concurrency=1 --overwrite</code>
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-[1.75rem] border border-[#e8dfd0] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <div className="flex items-center gap-3">
            <Video className="h-5 w-5 text-slate-800" />
            <h2 className="text-xl font-semibold text-slate-900">How you can edit it</h2>
          </div>
          <ol className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>1. Open the Remotion project folder on the server.</li>
            <li>2. Edit the composition file you want, usually <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-900">src/compositions/BillingLeakMobile.tsx</code>.</li>
            <li>3. Render a still first to verify the exact frame you changed.</li>
            <li>4. Render the full MP4 only after the still looks right.</li>
            <li>5. Pull the finished file from <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-900">public/broll</code>.</li>
          </ol>
        </section>

        <section className="rounded-[1.75rem] border border-[#e8dfd0] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <div className="flex items-center gap-3">
            <Film className="h-5 w-5 text-slate-800" />
            <h2 className="text-xl font-semibold text-slate-900">Current video targets</h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.25rem] border border-[#e8dfd0] bg-[#fbfaf7] p-4">
              <div className="text-sm font-semibold text-slate-900">Billing leak mobile</div>
              <div className="mt-2 text-sm text-slate-600">Primary editable composition for the current Stanley explainer work.</div>
              <code className="mt-3 block rounded-xl bg-slate-950 px-4 py-3 text-xs text-slate-100">billing-leak-mobile</code>
            </div>
            <div className="rounded-[1.25rem] border border-[#e8dfd0] bg-[#fbfaf7] p-4">
              <div className="text-sm font-semibold text-slate-900">Legacy short</div>
              <div className="mt-2 text-sm text-slate-600">Earlier Stanley short-form build kept in the same Remotion project.</div>
              <code className="mt-3 block rounded-xl bg-slate-950 px-4 py-3 text-xs text-slate-100">stanley-demo-short-vertical</code>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
