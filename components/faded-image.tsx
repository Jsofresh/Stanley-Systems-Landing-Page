import Image from "next/image"
import type { ImageProps } from "next/image"

type FadedImageProps = Omit<ImageProps, "className"> & {
  wrapperClassName?: string
  imageClassName?: string
  fadeColor?: string
  fadeSize?: string
  outerFade?: boolean
  outerFadeColor?: string
}

export function FadedImage({
  wrapperClassName = "",
  imageClassName = "h-auto w-full object-contain",
  fadeColor = "#FBFCF7",
  fadeSize = "6%",
  outerFade = false,
  outerFadeColor = fadeColor,
  ...imageProps
}: FadedImageProps) {
  return (
    <div className={`relative ${wrapperClassName}`}>
      {outerFade ? (
        <div
          className="pointer-events-none absolute -inset-[7%] rounded-[2.5rem] opacity-95 blur-2xl"
          style={{ background: `radial-gradient(circle at 50% 50%, ${outerFadeColor} 0%, ${outerFadeColor} 44%, transparent 72%)` }}
          aria-hidden="true"
        />
      ) : null}
      <div className="relative overflow-hidden">
        <Image {...imageProps} className={imageClassName} />
        <div className="pointer-events-none absolute inset-x-0 top-0" style={{ height: fadeSize, background: `linear-gradient(to bottom, ${fadeColor}, transparent)` }} aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0" style={{ height: fadeSize, background: `linear-gradient(to top, ${fadeColor}, transparent)` }} aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 left-0" style={{ width: fadeSize, background: `linear-gradient(to right, ${fadeColor}, transparent)` }} aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0" style={{ width: fadeSize, background: `linear-gradient(to left, ${fadeColor}, transparent)` }} aria-hidden="true" />
      </div>
    </div>
  )
}
