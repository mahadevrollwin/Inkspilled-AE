"use client";

import {
  motion,
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

export default function HeroRightGraphic({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const smoothProgress = useSpring(progress, MOTION_SPRING);

  // Same travel distance as before, with a softer ease so the rise never steps.
  const y = useTransform(smoothProgress, (latest) => easeInOutQuint(latest) * -160);

  return (
    <motion.div
      aria-hidden
      style={{ y, willChange: "transform" }}
      className="pointer-events-none absolute inset-0 z-[1]"
    >
      <HeroMagnificSchematic progress={smoothProgress} />
    </motion.div>
  );
}
