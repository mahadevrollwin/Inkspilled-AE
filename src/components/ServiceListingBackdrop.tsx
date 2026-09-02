"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

const LAYER =
  "absolute -left-[6%] -top-[14%] h-[128%] w-[112%] will-change-transform";

export default function ServiceListingBackdrop({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const animated = !reduceMotion;

  const gridY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const linesY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 190]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const orbsY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const wordY = useTransform(scrollYProgress, [0, 1], [40, -120]);
  const shardY = useTransform(scrollYProgress, [0, 1], [30, -160]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {animated ? (
        <motion.div style={{ y: gridY }} className={`${LAYER} brand-section-grid-center`} />
      ) : (
        <div className={`${LAYER} brand-section-grid-center`} />
      )}

      {animated ? (
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className={`${LAYER} origin-center`}
        >
          <InkTexture />
        </motion.div>
      ) : (
        <div className={LAYER}>
          <InkTexture />
        </div>
      )}

      {animated ? (
        <motion.div style={{ y: linesY }} className={LAYER}>
          <Constellation />
        </motion.div>
      ) : (
        <div className={LAYER}>
          <Constellation />
        </div>
      )}

      {animated ? (
        <motion.div style={{ y: orbsY }} className={LAYER}>
          <Orbs />
        </motion.div>
      ) : (
        <div className={LAYER}>
          <Orbs />
        </div>
      )}

      {animated ? (
        <motion.div style={{ y: wordY }} className="absolute -left-[2%] top-[8%] select-none">
          <p className="service-listing-word-drift font-display text-[28vw] font-extrabold leading-[0.78] tracking-[-0.07em] text-ink-dark/[0.07] md:text-[17vw]">
            SPILL
          </p>
        </motion.div>
      ) : (
        <div className="absolute -left-[2%] top-[8%] select-none">
          <p className="font-display text-[28vw] font-extrabold leading-[0.78] tracking-[-0.07em] text-ink-dark/[0.07] md:text-[17vw]">
            SPILL
          </p>
        </div>
      )}

      {animated ? (
        <motion.div style={{ y: shardY }} className="absolute inset-0">
          <Shards />
        </motion.div>
      ) : (
        <div className="absolute inset-0">
          <Shards />
        </div>
      )}
    </div>
  );
}

function InkTexture() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/hero-magnific-right.png"
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className="object-cover object-[68%_center] opacity-[0.28] invert contrast-125"
      />
    </div>
  );
}

function Constellation() {
  return (
    <svg
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1400 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient
          id="service-listing-line"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#dc5c52" stopOpacity="0.22" />
          <stop offset="48%" stopColor="#4caf50" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#29b6e8" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke="url(#service-listing-line)"
        strokeWidth="1.25"
        strokeDasharray="8 12"
        className="service-listing-lines"
        opacity="0.55"
      >
        <path d="M40 120 L520 40 L980 220 L1360 80" />
        <path d="M0 360 L420 280 L860 480 L1400 300" />
        <path d="M120 680 L500 540 L940 760 L1320 620" />
        <path d="M760 0 L900 280 L720 520 L980 860" />
        <path d="M1080 40 L960 300 L1180 520 L1040 820" />
      </g>
      <g fill="#dc5c52">
        <circle cx="520" cy="40" r="3.5" opacity="0.28" />
        <circle cx="860" cy="480" r="3" opacity="0.24" />
      </g>
      <g fill="#29b6e8">
        <circle cx="980" cy="220" r="3.5" opacity="0.26" />
        <circle cx="1180" cy="520" r="3" opacity="0.24" />
      </g>
      <g fill="#4caf50">
        <circle cx="420" cy="280" r="3" opacity="0.22" />
        <circle cx="900" cy="280" r="3.5" opacity="0.22" />
      </g>
    </svg>
  );
}

function Orbs() {
  return (
    <>
      <span className="service-listing-orb-float absolute left-[6%] top-[12%] h-64 w-64 rounded-full bg-ink-red/25 blur-3xl md:h-80 md:w-80" />
      <span className="service-listing-orb-float-slow absolute right-[4%] top-[42%] h-72 w-72 rounded-full bg-ink-blue/22 blur-3xl md:h-96 md:w-96" />
      <span className="service-listing-orb-float absolute bottom-[8%] left-[38%] h-56 w-56 rounded-full bg-[#4caf50]/20 blur-3xl md:h-72 md:w-72" />
    </>
  );
}

function Shards() {
  return (
    <>
      <span className="service-listing-shard-float absolute left-[7%] top-[24%] block h-16 w-16 rounded-[18px] rounded-tr-none border-2 border-ink-red/40 bg-ink-red/15 shadow-[0_16px_36px_rgba(220,92,82,0.18)] md:h-24 md:w-24" />
      <span className="service-listing-shard-float-alt absolute right-[9%] top-[52%] block h-16 w-16 rotate-12 rounded-[18px] rounded-tr-none border-2 border-ink-blue/40 bg-ink-blue/15 shadow-[0_16px_36px_rgba(41,182,232,0.18)] md:h-24 md:w-24" />
      <span className="service-listing-shard-float absolute bottom-[18%] left-[44%] block h-16 w-16 -rotate-6 rounded-[18px] rounded-tr-none border-2 border-[#4caf50]/40 bg-[#4caf50]/15 shadow-[0_16px_36px_rgba(76,175,80,0.18)] md:h-24 md:w-24" />
    </>
  );
}
