"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import {
  HOW_WE_WORK_BG,
  createOrbRenderer,
} from "@/lib/how-we-work-orb-shader";

type HowWeWorkOrbBackgroundProps = {
  scrollYProgress?: MotionValue<number>;
  animated?: boolean;
};

export default function HowWeWorkOrbBackground({
  scrollYProgress,
  animated = true,
}: HowWeWorkOrbBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0.5);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    if (!scrollYProgress) return;

    scrollRef.current = scrollYProgress.get();

    return scrollYProgress.on("change", (value) => {
      scrollRef.current = value;
    });
  }, [scrollYProgress]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let renderer: ReturnType<typeof createOrbRenderer> | null = null;

    try {
      renderer = createOrbRenderer(canvas);
    } catch {
      renderer = null;
    }

    if (!renderer) return;

    let frameId = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const { width, height } = container.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(width * dpr));
      const nextHeight = Math.max(1, Math.floor(height * dpr));

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }
    };

    const renderFrame = (now: number) => {
      resize();
      const time = reducedMotionRef.current || !animated ? 0 : now * 0.001;
      const scrollOffset = (scrollRef.current - 0.5) * 2;
      renderer?.render(canvas.width, canvas.height, time, scrollOffset);
      frameId = window.requestAnimationFrame(renderFrame);
    };

    resize();
    frameId = window.requestAnimationFrame(renderFrame);

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [animated]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: HOW_WE_WORK_BG }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070A18]/50 via-transparent to-[#070A18]/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,transparent_0%,#070A18_72%)]" />
    </div>
  );
}
