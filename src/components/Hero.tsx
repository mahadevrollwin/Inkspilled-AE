"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useStaticLayout } from "@/hooks/useStaticLayout";
import DecorativeIcons from "./DecorativeIcons";
import CircuitGraphic, { HERO_CONTENT_FADE_END } from "./CircuitGraphic";
import HeroRightGraphic from "./HeroRightGraphic";

const EASE = [0.22, 1, 0.36, 1] as const;
const HERO_LINES = ["Ink it.", "Move it.", "Make it stick."] as const;
const HERO_LINE_BEAT_MS = 2400;
const HEADING_LINE_CLASS =
  "font-display text-[clamp(36px,8.4vw,104px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink-dark";
const HERO_COPY_CLASS =
  "mt-6 max-w-[34rem] text-center font-body text-[clamp(13px,3.6vw,16px)] leading-relaxed text-black md:mt-8 md:text-[15px]";
const HERO_CONTENT_CLASS =
  "relative z-10 mx-auto flex h-full min-h-screen w-full max-w-[1400px] flex-col items-center justify-center px-6 text-center md:min-h-0 md:px-10";

function KineticHeadline() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_LINES.length);
    }, HERO_LINE_BEAT_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <h1 className={HEADING_LINE_CLASS}>
        {HERO_LINES.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <h1 className={`relative ${HEADING_LINE_CLASS}`}>
      <span className="invisible block" aria-hidden>
        Make it stick.
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={HERO_LINES[index]}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -28, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: EASE }}
          aria-live="polite"
        >
          {HERO_LINES[index]}
        </motion.span>
      </AnimatePresence>
    </h1>
  );
}

function HeroCopy() {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <KineticHeadline />
      <p className={HERO_COPY_CLASS}>
        Strategy that thinks, design that moves, storytelling that sticks.
        <br />
        For brands that refuse to blend in.
      </p>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const isStaticLayout = useStaticLayout();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroChromeOpacity = useTransform(
    scrollYProgress,
    [0, 0.34, HERO_CONTENT_FADE_END],
    [1, 0.5, 0],
  );

  if (isStaticLayout) {
    return (
      <div id="top" className="relative">
        <section className="relative overflow-x-hidden bg-ink-bg md:min-h-screen md:overflow-hidden">
          <DecorativeIcons />
          <div className={HERO_CONTENT_CLASS}>
            <HeroCopy />
          </div>
          <CircuitGraphic />
        </section>
      </div>
    );
  }

  return (
    <div ref={containerRef} id="top" className="relative h-[240vh]">
      <section
        ref={heroSectionRef}
        className="relative sticky top-0 z-10 h-screen overflow-hidden bg-ink-bg"
      >
        <HeroRightGraphic
          progress={scrollYProgress}
          chromeOpacity={heroChromeOpacity}
        />

        <motion.div
          style={{ opacity: heroChromeOpacity }}
          className={`${HERO_CONTENT_CLASS} pointer-events-none`}
        >
          <HeroCopy />
        </motion.div>

        <CircuitGraphic
          scrollProgress={scrollYProgress}
          containerRef={heroSectionRef}
        />
      </section>
    </div>
  );
}
