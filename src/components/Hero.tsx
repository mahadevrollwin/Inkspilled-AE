"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
const HERO_LINES = [
  { text: "Ink it", dotClass: "text-ink-red" },
  { text: "Move it", dotClass: "text-[#4caf50]" },
  { text: "Make it stick", dotClass: "text-ink-blue" },
] as const;
const HERO_LINE_BEAT_MS = 2400;
const HEADING_LINE_CLASS =
  "font-display text-[clamp(36px,8.4vw,104px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink-dark";
const HERO_COPY_CLASS =
  "mt-6 max-w-[34rem] text-center font-body text-[clamp(13px,3.6vw,16px)] leading-relaxed text-black md:mt-8 md:text-[15px]";
const HERO_CONTENT_CLASS =
  "relative z-10 mx-auto flex h-full min-h-screen w-full max-w-[1400px] flex-col items-center justify-center px-6 text-center md:min-h-0 md:px-10";
const HERO_BUTTON_CLASS =
  "pointer-events-auto mt-8 inline-flex items-center justify-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] bg-ink-dark px-8 py-3.5 font-body text-sm font-semibold text-white transition-opacity hover:opacity-85";

function HeadlineLine({
  text,
  dotClass,
}: {
  text: string;
  dotClass: string;
}) {
  return (
    <>
      {text}
      <span className={dotClass}>.</span>
    </>
  );
}

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
          <span key={line.text} className="block">
            <HeadlineLine text={line.text} dotClass={line.dotClass} />
          </span>
        ))}
      </h1>
    );
  }

  const active = HERO_LINES[index];

  return (
    <h1 className={`relative ${HEADING_LINE_CLASS}`}>
      <span className="invisible block" aria-hidden>
        Make it stick.
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={active.text}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -28, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: EASE }}
          aria-live="polite"
        >
          <HeadlineLine text={active.text} dotClass={active.dotClass} />
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
      <Link href="/contact" className={HERO_BUTTON_CLASS}>
        Start A Project
      </Link>
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
