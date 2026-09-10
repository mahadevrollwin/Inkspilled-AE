"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { usePhoneLayout } from "@/hooks/useStaticLayout";
import LocaleLink from "@/components/LocaleLink";
import { useDictionary } from "@/i18n/locale-context";
import DecorativeIcons from "./DecorativeIcons";
import CircuitGraphic, { HERO_CONTENT_FADE_END } from "./CircuitGraphic";
import HeroRightGraphic from "./HeroRightGraphic";
import HeroHangingLights from "./HeroHangingLights";

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

const DOT_CLASSES = ["text-ink-red", "text-[#4caf50]", "text-ink-blue"] as const;

function stripTrailingDot(text: string) {
  return text.replace(/[.。٫]+$/u, "").trim();
}

function HeadlineLine({
  text,
  dotClass,
}: {
  text: string;
  dotClass: string;
}) {
  return (
    <>
      {stripTrailingDot(text)}
      <span className={dotClass}>.</span>
    </>
  );
}

function KineticHeadline({ lines }: { lines: string[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const headlines = lines.length ? lines : [...HERO_LINES.map((line) => line.text)];

  useEffect(() => {
    if (reduceMotion || headlines.length < 2) return undefined;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % headlines.length);
    }, HERO_LINE_BEAT_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion, headlines.length]);

  if (reduceMotion) {
    return (
      <h1 className={HEADING_LINE_CLASS}>
        {headlines.map((line, lineIndex) => (
          <span key={line} className="block">
            <HeadlineLine
              text={line}
              dotClass={DOT_CLASSES[lineIndex % DOT_CLASSES.length]}
            />
          </span>
        ))}
      </h1>
    );
  }

  const active = headlines[index] || headlines[0];
  const longest = headlines.reduce(
    (current, line) => (line.length > current.length ? line : current),
    headlines[0] || "",
  );

  return (
    <h1 className={`relative ${HEADING_LINE_CLASS}`}>
      <span className="invisible block" aria-hidden>
        {stripTrailingDot(longest)}.
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={active}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -28, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: EASE }}
          aria-live="polite"
        >
          <HeadlineLine
            text={active}
            dotClass={DOT_CLASSES[index % DOT_CLASSES.length]}
          />
        </motion.span>
      </AnimatePresence>
    </h1>
  );
}

function HeroCopy({
  headlines,
  tagline,
  ctaLabel,
}: {
  headlines: string[];
  tagline: string;
  ctaLabel: string;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <KineticHeadline lines={headlines} />
      <p className={HERO_COPY_CLASS}>{tagline}</p>
      <LocaleLink href="/contact" className={HERO_BUTTON_CLASS}>
        {ctaLabel}
      </LocaleLink>
    </div>
  );
}

export default function Hero({
  headlines,
  tagline,
  ctaLabel,
}: {
  headlines?: string[];
  tagline?: string;
  ctaLabel?: string;
}) {
  const t = useDictionary();
  const resolvedHeadlines = headlines?.length ? headlines : t.hero.headlines;
  const resolvedTagline = tagline || t.hero.tagline;
  const resolvedCta = ctaLabel || t.hero.cta;
  const copy = (
    <HeroCopy
      headlines={resolvedHeadlines}
      tagline={resolvedTagline}
      ctaLabel={resolvedCta}
    />
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const isStaticLayout = usePhoneLayout();

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
          <HeroHangingLights />
          <div className={HERO_CONTENT_CLASS}>
            {copy}
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
        <HeroHangingLights progress={scrollYProgress} />
        <HeroRightGraphic
          progress={scrollYProgress}
          chromeOpacity={heroChromeOpacity}
        />

        <motion.div
          style={{ opacity: heroChromeOpacity }}
          className={`${HERO_CONTENT_CLASS} pointer-events-none`}
        >
          {copy}
        </motion.div>

        <CircuitGraphic
          scrollProgress={scrollYProgress}
          containerRef={heroSectionRef}
        />
      </section>
    </div>
  );
}
