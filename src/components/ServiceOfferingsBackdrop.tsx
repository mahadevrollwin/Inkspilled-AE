"use client";

import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { CSSProperties } from "react";

const ICON_COLORS = ["#dc5c52", "#79c146", "#29b6e8"] as const;

type IconPlacement = {
  top: string;
  left?: string;
  right?: string;
  rotate: number;
  size: number;
};

const PLACEMENT_SETS: IconPlacement[][] = [
  [
    { top: "6%", left: "3%", rotate: -10, size: 96 },
    { top: "44%", left: "46%", rotate: 8, size: 108 },
    { top: "84%", right: "4%", rotate: -6, size: 88 },
  ],
  [
    { top: "9%", right: "5%", rotate: 12, size: 100 },
    { top: "48%", left: "3%", rotate: -14, size: 84 },
    { top: "78%", left: "47%", rotate: 6, size: 112 },
  ],
  [
    { top: "5%", left: "44%", rotate: 4, size: 92 },
    { top: "36%", right: "3%", rotate: -9, size: 104 },
    { top: "88%", left: "4%", rotate: 11, size: 86 },
  ],
  [
    { top: "12%", left: "4%", rotate: -7, size: 90 },
    { top: "52%", right: "46%", rotate: 14, size: 110 },
    { top: "81%", right: "5%", rotate: -4, size: 94 },
  ],
  [
    { top: "8%", right: "4%", rotate: 9, size: 98 },
    { top: "41%", left: "45%", rotate: -12, size: 86 },
    { top: "86%", left: "3%", rotate: 5, size: 106 },
  ],
  [
    { top: "7%", left: "47%", rotate: -8, size: 102 },
    { top: "50%", right: "3%", rotate: 7, size: 88 },
    { top: "83%", left: "4%", rotate: -11, size: 96 },
  ],
  [
    { top: "10%", left: "3%", rotate: 13, size: 84 },
    { top: "39%", right: "47%", rotate: -5, size: 108 },
    { top: "79%", right: "4%", rotate: 8, size: 92 },
  ],
];

function hashSeed(seed: string) {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export default function ServiceOfferingsBackdrop({
  scrollYProgress,
  seed,
}: {
  scrollYProgress: MotionValue<number>;
  seed: string;
}) {
  const reduceMotion = useReducedMotion();
  const rawLinesY = useTransform(scrollYProgress, [0, 1], [56, -110]);
  const rawIconsY = useTransform(scrollYProgress, [0, 1], [-28, 64]);
  const rawDrift = useTransform(scrollYProgress, [0, 1], [-12, 16]);
  const linesY = useSpring(rawLinesY, { stiffness: 52, damping: 24, mass: 0.45 });
  const iconsY = useSpring(rawIconsY, { stiffness: 48, damping: 26, mass: 0.5 });
  const driftX = useSpring(rawDrift, { stiffness: 44, damping: 28, mass: 0.55 });

  const placements = PLACEMENT_SETS[hashSeed(seed) % PLACEMENT_SETS.length];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(#232323 1px, transparent 1px), linear-gradient(90deg, #232323 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        className="absolute -inset-[12%]"
        style={reduceMotion ? undefined : { y: linesY }}
      >
        <svg
          className="h-full w-full opacity-[0.16]"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="service-offerings-line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc5c52" />
              <stop offset="50%" stopColor="#79c146" />
              <stop offset="100%" stopColor="#29b6e8" />
            </linearGradient>
          </defs>
          <g
            stroke="url(#service-offerings-line)"
            strokeWidth="1"
            strokeDasharray="7 16"
          >
            <path d="M-40 140 L360 70 L820 210 L1480 90" />
            <path d="M-60 380 L400 300 L880 470 L1500 340" />
            <path d="M40 640 L480 540 L940 720 L1460 580" />
            <path d="M180 -20 L260 280 L120 560 L340 920" />
            <path d="M1180 -30 L1080 260 L1260 520 L1120 900" />
          </g>
          <g fill="#232323" opacity="0.45">
            <circle cx="360" cy="70" r="2.4" />
            <circle cx="820" cy="210" r="2.4" />
            <circle cx="400" cy="300" r="2" />
            <circle cx="880" cy="470" r="2.4" />
            <circle cx="480" cy="540" r="2" />
            <circle cx="1080" cy="260" r="2.2" />
          </g>
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { y: iconsY, x: driftX }}
      >
        {placements.map((placement, index) => {
          const color = ICON_COLORS[index];

          return (
            <div
              key={`${seed}-${color}`}
              className="service-bg-icon absolute rounded-[16px] rounded-tr-none border-[3px] bg-transparent"
              style={{
                top: placement.top,
                left: placement.left,
                right: placement.right,
                width: placement.size,
                height: placement.size,
                borderColor: color,
                transform: `rotate(${placement.rotate}deg)`,
                "--icon-glow": color,
              } as CSSProperties}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
