"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import HeroMagnificSchematic from "./HeroMagnificSchematic";

export default function HeroRightGraphic({
  progress,
  chromeOpacity,
}: {
  progress: MotionValue<number>;
  chromeOpacity?: MotionValue<number>;
}) {
  const y = useTransform(progress, [0, 1], [0, -160]);

  return (
    <motion.div
      aria-hidden
      style={{ y, opacity: chromeOpacity }}
      className="pointer-events-none absolute inset-0 z-[1]"
    >
      <HeroMagnificSchematic />
    </motion.div>
  );
}
