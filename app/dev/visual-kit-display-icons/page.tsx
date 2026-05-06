export default function RejectedDisplayIconPilotPreviewPage() {
  return (
    <main className="min-h-screen bg-[#f7faf7] px-6 py-10 text-slate-950">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0caf58]">
          Internal / rejected pilot
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Coded display-icon SVG pilot rejected</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          The hand-coded SVG display icon recreation path is intentionally no longer canonical. The approved
          Stanley Systems display icons should use image-backed display assets instead.
        </p>
        <p className="mt-4 text-sm leading-6 text-slate-500">
          This route remains only as a marker so future local preview links explain why the old pilot should not be used.
        </p>
      </section>
    </main>
  )
}
