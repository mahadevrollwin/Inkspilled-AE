import type { CSSProperties, ImgHTMLAttributes } from "react";
import { cleanImageSrc } from "@/lib/clean-image-src";

type SeoImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  preload?: boolean;
  draggable?: boolean | "true" | "false";
  style?: CSSProperties;
};

export default function SeoImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  preload = false,
  draggable,
  style,
}: SeoImageProps) {
  const imageSrc = cleanImageSrc(src);
  const shouldPreload = priority || preload;
  const fillStyle: CSSProperties | undefined = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        ...style,
      }
    : style;

  return (
    // Native img keeps the public file URL with no optimizer or cache-busting query.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      style={fillStyle}
      loading={shouldPreload ? "eager" : "lazy"}
      fetchPriority={shouldPreload ? "high" : "auto"}
      decoding="async"
      draggable={draggable as ImgHTMLAttributes<HTMLImageElement>["draggable"]}
    />
  );
}
