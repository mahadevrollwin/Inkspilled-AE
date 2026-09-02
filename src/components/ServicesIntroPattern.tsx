"use client";

import { motion, type MotionValue } from "framer-motion";

const ORBS = [
  {
    className: "services-intro-orb services-intro-orb-a bg-ink-red/25",
    style: { width: 280, height: 280, top: "8%", left: "62%" },
  },
  {
    className: "services-intro-orb services-intro-orb-b bg-[#4caf50]/20",
    style: { width: 220, height: 220, top: "58%", left: "78%" },
  },
  {
    className: "services-intro-orb services-intro-orb-c bg-ink-blue/22",
    style: { width: 320, height: 320, top: "42%", left: "-4%" },
  },
  {
    className: "services-intro-orb services-intro-orb-d bg-ink-red/15",
    style: { width: 160, height: 160, top: "72%", left: "18%" },
  },
] as const;

const FLOATING_DOTS = [
  { top: "14%", left: "22%", delay: "0s", size: 4 },
  { top: "28%", left: "48%", delay: "1.2s", size: 3 },
  { top: "18%", left: "86%", delay: "2.1s", size: 5 },
  { top: "46%", left: "70%", delay: "0.6s", size: 3 },
  { top: "64%", left: "38%", delay: "1.8s", size: 4 },
  { top: "78%", left: "88%", delay: "0.3s", size: 3 },
  { top: "82%", left: "56%", delay: "2.6s", size: 5 },
  { top: "36%", left: "12%", delay: "1.5s", size: 3 },
] as const;

export default function ServicesIntroPattern({
  opacity,
}: {
  opacity: MotionValue<number>;
}) {
  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      <div className="services-intro-grid absolute inset-0 opacity-[0.28]" />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="services-intro-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc5c52" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#4caf50" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#29b6e8" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <g
          fill="none"
          stroke="url(#services-intro-line)"
          strokeWidth="1"
          strokeDasharray="10 14"
          className="services-intro-lines"
        >
          <path d="M-40 180 L420 40 L860 260 L1280 90" />
          <path d="M-20 420 L380 300 L760 520 L1300 340" />
          <path d="M60 720 L480 560 L900 780 L1380 600" />
          <path d="M220 -20 L360 260 L180 520 L420 820" />
          <path d="M980 -40 L860 280 L1120 500 L940 860" />
        </g>
        <g fill="#ffffff" className="services-intro-nodes">
          <circle cx="420" cy="40" r="2.5" />
          <circle cx="860" cy="260" r="2.5" />
          <circle cx="380" cy="300" r="2" />
          <circle cx="760" cy="520" r="2.5" />
          <circle cx="480" cy="560" r="2" />
          <circle cx="360" cy="260" r="2" />
          <circle cx="860" cy="280" r="2.5" />
          <circle cx="1120" cy="500" r="2" />
        </g>
      </svg>

      {ORBS.map((orb) => (
        <span
          key={orb.className}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          style={orb.style}
        />
      ))}

      {FLOATING_DOTS.map((dot, index) => (
        <span
          key={`${dot.top}-${dot.left}-${index}`}
          className="services-intro-dot absolute rounded-full bg-white/55"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            animationDelay: dot.delay,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />
    </motion.div>
  );
}
