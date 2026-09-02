"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import {
  createCreatureRenderer,
  LETS_TALK_CREATURE_BG,
} from "@/lib/lets-talk-creature-shader";

type LetsTalkCreatureBackgroundProps = {
  scrollYProgress?: MotionValue<number>;
  animated?: boolean;
};

export default function LetsTalkCreatureBackground({
  scrollYProgress,
  animated = true,
}: LetsTalkCreatureBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
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

    let renderer: ReturnType<typeof createCreatureRenderer> | null = null;

    try {
      renderer = createCreatureRenderer(canvas);
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
      const wheelY = (scrollRef.current - 0.5) * 6000;
      renderer?.render(canvas.width, canvas.height, time, wheelY);
      frameId = window.requestAnimationFrame(renderFrame);
    };

    resize();
    frameId = window.requestAnimationFrame(renderFrame);

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      renderer?.dispose();
    };
  }, [animated]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: LETS_TALK_CREATURE_BG }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_0%,rgba(0,0,0,0.35)_58%,rgba(0,0,0,0.82)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/55" />
    </div>
  );
}
