"use client";

import Image from "next/image";
import {
  motion,
  motionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";

export const STATIC_SCROLL_PROGRESS = motionValue(0);

type AbstractSectionBackgroundProps = {
  scrollYProgress?: MotionValue<number>;
  variant?: "brand" | "center";
  baseColor?: string;
  lineGradientId?: string;
};

export default function AbstractSectionBackground({
  scrollYProgress = STATIC_SCROLL_PROGRESS,
  variant = "brand",
  baseColor = "#ececea",
  lineGradientId = "abstract-section-line",
}: AbstractSectionBackgroundProps) {
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const linesY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 190]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const orbsY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const isAnimated = scrollYProgress !== STATIC_SCROLL_PROGRESS;
  const gridClass =
    variant === "center" ? "brand-section-grid-center" : "brand-section-grid";

  const parallaxLayerClass =
    "absolute -left-[6%] -top-[14%] h-[128%] w-[112%] will-change-transform";

  const linesLayer = (
    <svg
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1400 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={lineGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc5c52" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#232323" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#29b6e8" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke={`url(#${lineGradientId})`}
        strokeWidth="1.25"
        strokeDasharray="8 12"
        className="brand-section-lines"
      >
        <path d="M40 120 L520 40 L980 220 L1360 80" />
        <path d="M0 360 L420 280 L860 480 L1400 300" />
        <path d="M120 680 L500 540 L940 760 L1320 620" />
        <path d="M760 0 L900 280 L720 520 L980 860" />
        <path d="M1080 40 L960 300 L1180 520 L1040 820" />
      </g>
      <g fill="#232323" opacity="0.35">
        <circle cx="520" cy="40" r="3" />
        <circle cx="980" cy="220" r="3" />
        <circle cx="420" cy="280" r="2.5" />
        <circle cx="860" cy="480" r="3" />
        <circle cx="500" cy="540" r="2.5" />
        <circle cx="900" cy="280" r="3" />
        <circle cx="1180" cy="520" r="2.5" />
      </g>
    </svg>
  );

  const imageLayer = (
    <div className="relative h-full w-full">
      <Image
        src="/hero-magnific-right.png"
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className="object-cover object-[72%_center] opacity-[0.34] invert contrast-125"
      />
    </div>
  );

  const orbsLayer = (
    <>
      <span className="absolute left-[12%] top-[20%] h-56 w-56 rounded-full bg-ink-red/10 blur-3xl" />
      <span className="absolute right-[10%] top-[55%] h-72 w-72 rounded-full bg-ink-blue/10 blur-3xl" />
      <span className="absolute left-[58%] top-[68%] h-48 w-48 rounded-full bg-[#4caf50]/10 blur-3xl" />
    </>
  );

  const overlay =
    variant === "center" ? (
      <>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 42%, ${baseColor} 0%, ${baseColor}cc 34%, ${baseColor}66 58%, transparent 78%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-white/25" />
      </>
    ) : (
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, ${baseColor} 0%, ${baseColor}e0 24%, transparent 42%)`,
        }}
      />
    );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: baseColor }}
    >
      {isAnimated ? (
        <>
          <motion.div
            style={{ y: gridY }}
            className={`${parallaxLayerClass} ${gridClass}`}
          />
          <motion.div style={{ y: linesY }} className={parallaxLayerClass}>
            {linesLayer}
          </motion.div>
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className={`${parallaxLayerClass} origin-center`}
          >
            {imageLayer}
          </motion.div>
          <motion.div style={{ y: orbsY }} className={parallaxLayerClass}>
            {orbsLayer}
          </motion.div>
        </>
      ) : (
        <>
          <div className={`${parallaxLayerClass} ${gridClass}`} />
          <div className={parallaxLayerClass}>{linesLayer}</div>
          <div className={parallaxLayerClass}>{imageLayer}</div>
          <div className={parallaxLayerClass}>{orbsLayer}</div>
        </>
      )}

      {overlay}
    </div>
  );
}
