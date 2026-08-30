import Image from "next/image"

type VideoDemoPlaceholderProps = {
  title: string
  posterSrc: string
  alt: string
}

export function VideoDemoPlaceholder({ title, posterSrc, alt }: VideoDemoPlaceholderProps) {
  return (
    <figure
      data-video-placeholder
      className="group relative aspect-video overflow-hidden rounded-[2rem] border border-white/14 bg-[#071422] text-white shadow-[0_34px_90px_rgba(0,0,0,.3)] sm:min-h-[320px]"
    >
      <Image
        src={posterSrc}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 56vw, 100vw"
        className="object-cover object-center opacity-62 transition duration-700 group-hover:scale-[1.015]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,20,34,.94)_0%,rgba(7,20,34,.2)_72%)]" />
      <figcaption className="absolute inset-x-6 bottom-6 flex items-center gap-5 sm:inset-x-8 sm:bottom-8">
        <span aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#53D986] text-sm font-black tracking-[.12em] text-[#071422] shadow-[0_18px_46px_rgba(83,217,134,.3)]">
          VIDEO
        </span>
        <span>
          <span className="block text-2xl font-bold leading-tight tracking-[-0.025em] sm:text-3xl">{title}</span>
          <span className="mt-1 block text-sm font-bold text-white/62 sm:text-base">Production slot reserved</span>
        </span>
      </figcaption>
    </figure>
  )
}
