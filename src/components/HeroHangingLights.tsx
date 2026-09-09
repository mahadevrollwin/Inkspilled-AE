"use client";

import { motion, useMotionValue, useReducedMotion, type MotionValue, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const LIGHTS = [
  {
    color: "#dc5c52",
    glow: "rgba(220, 92, 82, 0.7)",
    left: "3.8%",
    cord: 92,
    delay: 0.05,
  },
  {
    color: "#4caf50",
    glow: "rgba(76, 175, 80, 0.7)",
    left: "8.6%",
    cord: 148,
    delay: 0.18,
  },
  {
    color: "#29b6e8",
    glow: "rgba(41, 182, 232, 0.7)",
    left: "13.4%",
    cord: 114,
    delay: 0.31,
  },
] as const;

function HangingLight({
  color,
  glow,
  left,
  cord,
  delay,
  reduceMotion,
  lit,
}: {
  color: string;
  glow: string;
  left: string;
  cord: number;
  delay: number;
  reduceMotion: boolean | null;
  lit: MotionValue<number>;
}) {
  const glowOpacity = useTransform(lit, (value) => 0.2 + value * 0.8);
  const glowScale = useTransform(lit, (value) => 0.55 + value * 0.45);
  const bulbBrightness = useTransform(lit, (value) => 0.35 + value * 0.65);

  return (
    <motion.div
      aria-hidden
      className="absolute top-0 flex w-8 -translate-x-1/2 flex-col items-center"
      style={{ left }}
      initial={reduceMotion ? false : { y: -220, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.05, delay, ease: EASE }}
    >
      <span
        className="w-px bg-[#232323]/45"
        style={{ height: cord }}
      />
      <span className="h-1.5 w-3.5 rounded-sm bg-[#2b2b2b]" />
      <motion.span
        className="relative mt-[1px] h-7 w-[18px] rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 30%, #fff 0%, ${color} 42%, ${color} 100%)`,
          opacity: bulbBrightness,
          boxShadow: `0 0 14px ${glow}`,
        }}
      >
        <motion.span
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            opacity: glowOpacity,
            scale: glowScale,
            background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          }}
        />
      </motion.span>
    </motion.div>
  );
}

export default function HeroHangingLights({
  progress,
}: {
  progress?: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const alwaysOn = useMotionValue(1);
  const source = progress ?? alwaysOn;
  const lit = useTransform(source, [0, 0.18, 0.4], [1, 0.45, 0]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] hidden md:block"
    >
      {LIGHTS.map((light) => (
        <HangingLight
          key={light.color}
          {...light}
          reduceMotion={reduceMotion}
          lit={lit}
        />
      ))}
    </div>
  );
}
