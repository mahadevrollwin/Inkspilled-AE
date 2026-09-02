"use client";

import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const ICONS = [
  { top: "6%", left: "3%", size: 72, color: "#dc5c52", kind: "frame" as const, rotate: -8 },
  { top: "14%", right: "5%", size: 56, color: "#29b6e8", kind: "target" as const, rotate: 12 },
  { top: "34%", left: "1.5%", size: 64, color: "#79c146", kind: "nodes" as const, rotate: -4 },
  { top: "38%", right: "3%", size: 78, color: "#dc5c52", kind: "pen" as const, rotate: 10 },
  { top: "58%", left: "4%", size: 52, color: "#29b6e8", kind: "plus" as const, rotate: 0 },
  { top: "64%", right: "2%", size: 70, color: "#79c146", kind: "frame" as const, rotate: -14 },
  { top: "82%", left: "6%", size: 60, color: "#dc5c52", kind: "target" as const, rotate: 6 },
  { top: "86%", right: "7%", size: 48, color: "#29b6e8", kind: "nodes" as const, rotate: -10 },
];

function IconMark({
  kind,
  color,
}: {
  kind: (typeof ICONS)[number]["kind"];
  color: string;
}) {
  if (kind === "frame") {
    return (
      <path
        d="M10 10h44L70 26v44H10V10Z"
        stroke={color}
        strokeWidth="1.4"
        fill="none"
      />
    );
  }

  if (kind === "target") {
    return (
      <>
        <circle cx="40" cy="40" r="22" stroke={color} strokeWidth="1.3" fill="none" />
        <circle cx="40" cy="40" r="10" stroke={color} strokeWidth="1.3" fill="none" />
        <path d="M40 8v12M40 60v12M8 40h12M60 40h12" stroke={color} strokeWidth="1.3" />
      </>
    );
  }

  if (kind === "pen") {
    return (
      <path
        d="M22 58l8-22 28-16-12 30-24 8Zm8-22 12 12"
        stroke={color}
        strokeWidth="1.4"
        fill="none"
        strokeLinejoin="round"
      />
    );
  }

  if (kind === "plus") {
    return (
      <path d="M40 16v48M16 40h48" stroke={color} strokeWidth="1.4" />
    );
  }

  return (
    <>
      <circle cx="22" cy="28" r="4" stroke={color} strokeWidth="1.3" fill="none" />
      <circle cx="54" cy="22" r="3.5" stroke={color} strokeWidth="1.3" fill="none" />
      <circle cx="48" cy="54" r="5" stroke={color} strokeWidth="1.3" fill="none" />
      <path d="M25 30l26-6M52 26l-3 24" stroke={color} strokeWidth="1.2" />
    </>
  );
}

export default function ServiceOfferingsBackdrop({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const rawLinesY = useTransform(scrollYProgress, [0, 1], [56, -110]);
  const rawIconsY = useTransform(scrollYProgress, [0, 1], [-36, 80]);
  const rawDrift = useTransform(scrollYProgress, [0, 1], [-16, 20]);
  const linesY = useSpring(rawLinesY, { stiffness: 52, damping: 24, mass: 0.45 });
  const iconsY = useSpring(rawIconsY, { stiffness: 48, damping: 26, mass: 0.5 });
  const driftX = useSpring(rawDrift, { stiffness: 44, damping: 28, mass: 0.55 });

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
        {ICONS.map((icon) => (
          <svg
            key={`${icon.kind}-${icon.top}-${icon.left ?? icon.right}`}
            viewBox="0 0 80 80"
            className="absolute opacity-[0.18]"
            style={{
              top: icon.top,
              left: icon.left,
              right: icon.right,
              width: icon.size,
              height: icon.size,
              transform: `rotate(${icon.rotate}deg)`,
            }}
            fill="none"
          >
            <IconMark kind={icon.kind} color={icon.color} />
          </svg>
        ))}
      </motion.div>
    </div>
  );
}
