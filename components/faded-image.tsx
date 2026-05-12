import Image from "next/image"
import type { ImageProps } from "next/image"

type FadedImageProps = Omit<ImageProps, "className"> & {
  wrapperClassName?: string
  imageClassName?: string
  fadeColor?: string
  fadeSize?: string
}

export function FadedImage({
  wrapperClassName = "",
  imageClassName = "h-auto w-full object-contain",
  fadeColor = "#FBFCF7",
  fadeSize = "6%",
  ...imageProps
}: FadedImageProps) {
  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      <Image {...imageProps} className={imageClassName} />
      <div className="pointer-events-none absolute inset-x-0 top-0" style={{ height: fadeSize, background: `linear-gradient(to bottom, ${fadeColor}, transparent)` }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0" style={{ height: fadeSize, background: `linear-gradient(to top, ${fadeColor}, transparent)` }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 left-0" style={{ width: fadeSize, background: `linear-gradient(to right, ${fadeColor}, transparent)` }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0" style={{ width: fadeSize, background: `linear-gradient(to left, ${fadeColor}, transparent)` }} aria-hidden="true" />
    </div>
  )
}
