"use client";

import type { ServicePageData } from "@/data/services";

const BLOB_PATHS = [
  "M 28 11 C 39 6.4 58 5.6 71 9.2 C 82.4 12.3 88.9 20.5 87.4 29.6 C 86 38.2 78 45.2 66.8 47.5 C 57.4 49.5 50.7 46.4 44.9 45.2 C 39.5 43.4 34.5 43.1 29.3 40.2 C 22.5 36.5 18.5 31.1 19.8 25.2 C 21.1 19.5 23.5 14.3 28 11 Z",
  "M 26 12.5 C 37.4 6.6 56.9 5 72 9.8 C 83.8 13.6 87.8 21.6 86.3 30.6 C 84.5 40.2 75.4 45.4 65.6 47.3 C 55.8 49.5 49.2 45.7 43.5 45 C 36.8 44.1 31.4 44.6 27 40.2 C 22 35.4 17.5 30.3 19.8 23.6 C 21.8 17.8 22.2 15.1 26 12.5 Z",
  "M 29.2 10.4 C 42.5 5.7 59.2 6.6 72.8 10.6 C 83.3 13.6 89.8 22 88.6 31.4 C 87.4 40.2 81.5 46.2 70.2 47.9 C 61.8 49.2 54.5 47 46.2 44.6 C 40 42.5 34.5 43.1 29.5 38.9 C 23.6 33.7 22 27.7 24.2 22.5 C 25.6 17.5 27.9 12.4 29.2 10.4 Z",
] as const;

const BLOB_ANIMATE_VALUES = `${BLOB_PATHS[0]};${BLOB_PATHS[1]};${BLOB_PATHS[2]};${BLOB_PATHS[0]}`;

type ServiceBlobMediaProps = {
  service: ServicePageData;
  index: number;
};

export default function ServiceBlobMedia({
  service,
  index,
}: ServiceBlobMediaProps) {
  const blobId = `service-blob-${index}`;
  const pathId = `${blobId}-path`;
  const clipId = `${blobId}-clip`;
  const edgeGradientId = `${blobId}-edge`;
  const fadeGradientId = `${blobId}-fade`;
  const shineGradientId = `${blobId}-shine`;
  const floatDelay = `${index * 1.4}s`;

  return (
    <div className="group relative aspect-[16/10] min-h-[260px] w-full sm:min-h-[320px]">
      <div
        aria-hidden
        className="service-blob-glow absolute left-1/2 top-[52%] h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${service.accent}66 0%, ${service.accent}22 42%, transparent 72%)`,
        }}
      />

      <div
        className="service-blob-float absolute inset-0"
        style={{ animationDelay: floatDelay }}
      >
        <svg
          viewBox="0 0 100 62"
          className="h-full w-full overflow-visible drop-shadow-[0_22px_50px_rgba(20,20,20,0.2)]"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <path id={pathId} d={BLOB_PATHS[0]}>
              <animate
                attributeName="d"
                dur="14s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.34;0.68;1"
                keySplines=".42 0 .58 1;.42 0 .58 1;.42 0 .58 1"
                values={BLOB_ANIMATE_VALUES}
              />
            </path>

            <clipPath id={clipId}>
              <use href={`#${pathId}`} />
            </clipPath>

            <linearGradient
              id={edgeGradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.62" />
            </linearGradient>

            <linearGradient id={fadeGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.08" />
              <stop offset="45%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.78" />
            </linearGradient>

            <radialGradient id={shineGradientId} cx="30%" cy="20%" r="55%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g clipPath={`url(#${clipId})`}>
            <image
              href={service.image}
              x="0"
              y="0"
              width="100"
              height="62"
              preserveAspectRatio="xMidYMid slice"
              className="origin-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <rect
              x="0"
              y="0"
              width="100"
              height="62"
              fill={`url(#${shineGradientId})`}
            />
            <rect
              x="0"
              y="0"
              width="100"
              height="62"
              fill={`url(#${fadeGradientId})`}
            />
            <rect
              x="0"
              y="0"
              width="100"
              height="0.9"
              fill={service.accent}
            />
          </g>

          <use
            href={`#${pathId}`}
            fill="none"
            stroke={`url(#${edgeGradientId})`}
            strokeWidth="0.42"
            opacity="0.82"
          />
        </svg>
      </div>
    </div>
  );
}
