"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import {
  createSingularityScene,
  WHO_WE_ARE_SINGULARITY_BG,
} from "@/lib/who-we-are-singularity";

type WhoWeAreSingularityBackgroundProps = {
  scrollYProgress?: MotionValue<number>;
  animated?: boolean;
};

export default function WhoWeAreSingularityBackground({
  scrollYProgress,
  animated = true,
}: WhoWeAreSingularityBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    if (!scrollYProgress) return;

    scrollRef.current = scrollYProgress.get();

    return scrollYProgress.on("change", (value) => {
      scrollRef.current = value;
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    let scene: ReturnType<typeof createSingularityScene> | null = null;

    try {
      scene = createSingularityScene(container, {
        animated,
        reducedMotion,
        instanceCount: isMobile ? 2500 : 5000,
        getScrollProgress: () => scrollRef.current,
      });
    } catch {
      scene = null;
    }

    return () => {
      scene?.dispose();
    };
  }, [animated]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: WHO_WE_ARE_SINGULARITY_BG }}
    >
      <div ref={containerRef} className="absolute inset-0 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_48%_at_50%_44%,rgba(1,1,3,0.82)_0%,rgba(1,1,3,0.5)_42%,rgba(1,1,3,0.12)_68%,transparent_88%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_12%,rgba(1,1,3,0.55)_52%,rgba(1,1,3,0.95)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#010103]/55 via-transparent to-[#010103]/70" />
    </div>
  );
}
