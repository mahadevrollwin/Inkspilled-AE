"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import HeroMagnificSchematic from "./HeroMagnificSchematic";

const MOTION_SPRING = {
  stiffness: 58,
  damping: 22,
  mass: 0.6,
  restDelta: 0.0004,
} as const;

function easeInOutQuint(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2;
}

function easeOutCubic(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return 1 - (1 - t) ** 3;
}

export default function HeroRightGraphic({
  progress,
  chromeOpacity,
}: {
  progress: MotionValue<number>;
  chromeOpacity?: MotionValue<number>;
}) {
  const fallbackOpacity = useMotionValue(1);
  const smoothProgress = useSpring(progress, MOTION_SPRING);
  const smoothOpacity = useSpring(chromeOpacity ?? fallbackOpacity, {
    stiffness: 70,
    damping: 26,
    mass: 0.5,
    restDelta: 0.0004,
  });

  // Same travel distance as before, with a softer ease so the rise never steps.
  const y = useTransform(smoothProgress, (latest) => easeInOutQuint(latest) * -160);
  const opacity = useTransform(smoothOpacity, (latest) => easeOutCubic(latest));

  return (
    <motion.div
      aria-hidden
      style={{ y, opacity, willChange: "transform, opacity" }}
      className="pointer-events-none absolute inset-0 z-[1]"
    >
      <HeroMagnificSchematic />
    </motion.div>
  );
}
