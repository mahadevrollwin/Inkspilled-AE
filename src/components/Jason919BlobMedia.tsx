"use client";

/**
 * Organic blob mask animation from CodePen Jason919/PgMWBm (00-Blob-Mask-05).
 * Uses the same SVG path keyframes and 15s morph timing as the reference pen.
 */
const BLOB_PATHS = [
  "M96.194,545.164C125.381,742.6,278.183,886.822,508.245,782.093s484.16-61.81,496.178-247.231S870.507,186.334,582.071,167.449,67.007,347.724,96.194,545.164Z",
  "M89.5,435c-8.7,185.7,89.947,397.509,362.691,327.872s478.752-8.7,562.9-174.091S945.449,237.7,652.395,165.158,98.2,249.3,89.5,435Z",
  "M97.356,395.853c-69.19,200.875,104.9,578.073,399.518,410.678s524.507-183.02,533.435-370.5S896.066,163.9,669.687,148.19,166.546,194.978,97.356,395.853Z",
] as const;

const BLOB_ANIMATE_VALUES = `${BLOB_PATHS[0]};${BLOB_PATHS[1]};${BLOB_PATHS[2]};${BLOB_PATHS[0]}`;

type Jason919BlobMediaProps = {
  imageSrc: string;
  imageAlt: string;
  index?: number;
  className?: string;
  size?: "hero" | "section";
};

export default function Jason919BlobMedia({
  imageSrc,
  imageAlt,
  index = 0,
  className = "",
  size = "hero",
}: Jason919BlobMediaProps) {
  const blobId = `j919-blob-${index}`;
  const pathId = `${blobId}-path`;
  const clipId = `${blobId}-clip`;
  const gradientId = `${blobId}-gradient`;
  const shineId = `${blobId}-shine`;

  const sizeClass = size === "hero" ? "max-w-[560px]" : "max-w-full";

  return (
    <div
      className={`group relative mx-auto w-full ${sizeClass} ${className}`}
      style={{ aspectRatio: "1120 / 1000" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1120 1000"
        className="h-full w-full overflow-visible drop-shadow-[0_28px_60px_rgba(20,20,20,0.22)]"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="70.711%"
            x2="0%"
            y1="70.711%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#7eb8e8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#a8d8f0" stopOpacity="0.45" />
          </linearGradient>

          <radialGradient id={shineId} cx="28%" cy="22%" r="58%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <path id={pathId} d={BLOB_PATHS[0]}>
            <animate
              attributeName="d"
              dur="15s"
              repeatCount="indefinite"
              values={BLOB_ANIMATE_VALUES}
            />
          </path>

          <clipPath id={clipId}>
            <use href={`#${pathId}`} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          <image
            href={imageSrc}
            x="0"
            y="0"
            width="1120"
            height="1000"
            preserveAspectRatio="xMidYMid slice"
            className="origin-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <rect
            x="0"
            y="0"
            width="1120"
            height="1000"
            fill={`url(#${shineId})`}
          />
        </g>

        <use
          href={`#${pathId}`}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          opacity="0.65"
        />
      </svg>

      <span className="sr-only">{imageAlt}</span>
    </div>
  );
}
