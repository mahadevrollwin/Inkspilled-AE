"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePhoneLayout } from "@/hooks/useStaticLayout";
import LocaleLink from "@/components/LocaleLink";
import { useDictionary } from "@/i18n/locale-context";
import { ChevronDown } from "lucide-react";
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
  "pointer-events-auto mt-8 inline-flex items-center justify-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] bg-ink-dark px-6 py-3 font-body text-xs text-white transition-opacity hover:opacity-85 md:text-sm";

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

function HeroScrollHint({
  opacity,
  stayAboveVideo = false,
}: {
  opacity?: MotionValue<number>;
  stayAboveVideo?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const hint = (
    <div
      aria-hidden
      className={`pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-ink-dark ${
        stayAboveVideo ? "z-30" : "z-20"
      }`}
    >
      <svg viewBox="0 0 24 36" className="h-8 w-[18px]" fill="none">
        <rect
          x="1.25"
          y="1.25"
          width="21.5"
          height="33.5"
          rx="10.75"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <motion.circle
          cx="12"
          cy="10"
          r="2.1"
          fill="#29b6e8"
          animate={reduceMotion ? undefined : { cy: [9, 16, 9], opacity: [1, 0.35, 1] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </svg>
      <motion.span
        animate={reduceMotion ? undefined : { y: [0, 4, 0], opacity: [0.45, 1, 0.45] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <ChevronDown className="h-4 w-4" strokeWidth={2.2} />
      </motion.span>
    </div>
  );

  if (!opacity) return hint;

  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 z-20">
      {hint}
    </motion.div>
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
          <div className="relative md:contents">
            <DecorativeIcons />
            <HeroHangingLights />
            <div className={HERO_CONTENT_CLASS}>
              {copy}
            </div>
            <HeroScrollHint />
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
        <HeroRightGraphic progress={scrollYProgress} />

        <motion.div
          style={{ opacity: heroChromeOpacity }}
          className={`${HERO_CONTENT_CLASS} pointer-events-none`}
        >
          {copy}
        </motion.div>

        <HeroScrollHint stayAboveVideo />

        <CircuitGraphic
          scrollProgress={scrollYProgress}
          containerRef={heroSectionRef}
        />
      </section>
    </div>
  );
}
