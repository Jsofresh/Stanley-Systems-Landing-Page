import {
  CheckCircle,
  DollarCircle,
  FileEstimate,
  FileInvoice,
  MessageBubble,
  PhoneMissed,
  ShieldCheck,
  TrendUp,
  User,
  Users,
  type VisualPrimitiveProps,
} from '@/components/visual-kit'

type IconEntry = {
  name: string
  Component: (props: VisualPrimitiveProps) => JSX.Element
}

const icons: IconEntry[] = [
  { name: 'CheckCircle', Component: CheckCircle },
  { name: 'DollarCircle', Component: DollarCircle },
  { name: 'FileEstimate', Component: FileEstimate },
  { name: 'FileInvoice', Component: FileInvoice },
  { name: 'MessageBubble', Component: MessageBubble },
  { name: 'PhoneMissed', Component: PhoneMissed },
  { name: 'ShieldCheck', Component: ShieldCheck },
  { name: 'TrendUp', Component: TrendUp },
  { name: 'User', Component: User },
  { name: 'Users', Component: Users },
]

const iconSizes = [
  { label: 'small', size: 28 },
  { label: 'default', size: 64 },
  { label: 'large', size: 96 },
]

export const metadata = {
  title: 'Internal Visual Kit Primitive Preview',
  robots: {
    index: false,
    follow: false,
  },
}

export default function VisualKitPrimitivesPreviewPage() {
  return (
    <main className="min-h-screen bg-[#f6faf7] px-5 py-8 text-[#05244d] sm:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-[28px] border border-[#d8ead8] bg-white p-6 shadow-[0_24px_70px_rgba(5,36,77,0.08)]">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#087b3f]">
            Internal / non-production preview
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#05244d] sm:text-4xl">
            Stanley Systems Visual Kit — Primitive Icons
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#42526a] sm:text-base">
            Local-only visual approval checkpoint for Batch 1. This route is not linked from the public site and only exists so Stanley H can render, screenshot, and review the primitive SVG component family before composites.
          </p>
        </div>

        <div className="grid gap-5">
          {icons.map(({ name, Component }) => (
            <article
              key={name}
              className="rounded-[24px] border border-[#dceadb] bg-white p-5 shadow-[0_18px_50px_rgba(5,36,77,0.07)]"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.03em] text-[#05244d]">{name}</h2>
                  <p className="text-xs text-[#667085]">Default, small, large, green, navy, and labeled accessibility render.</p>
                </div>
                <div className="rounded-full border border-[#cdebc0] bg-[#eaf6e6] px-3 py-1 text-xs font-semibold text-[#087b3f]">
                  SVG React primitive
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
                <div className="rounded-[18px] border border-[#e5efe4] bg-[#fbfdfb] p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#667085]">Sizes</p>
                  <div className="flex flex-wrap items-end gap-6">
                    {iconSizes.map(({ label, size }) => (
                      <div key={label} className="flex min-w-20 flex-col items-center gap-2 text-[#08a64b]">
                        <Component size={size} ariaLabel={`${name} ${label} preview`} />
                        <span className="text-xs font-medium text-[#42526a]">{label} {size}px</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[18px] border border-[#d6ead3] bg-[#f1faee] p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#087b3f]">Stanley green</p>
                  <div className="flex items-center justify-center text-[#08a64b]">
                    <Component size={76} ariaLabel={`${name} green preview`} />
                  </div>
                </div>

                <div className="rounded-[18px] border border-[#d9e2ec] bg-[#f7fafc] p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#05244d]">Deep navy</p>
                  <div className="flex items-center justify-center text-[#05244d]">
                    <Component size={76} ariaLabel={`${name} navy preview`} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
