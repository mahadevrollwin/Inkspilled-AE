"use client";

import { useRef, type ReactNode } from "react";
import {
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useStaticLayout } from "@/hooks/useStaticLayout";
import DecorativeIcons from "./DecorativeIcons";
import CircuitGraphic, { HERO_CONTENT_FADE_END } from "./CircuitGraphic";
import HeroRightGraphic from "./HeroRightGraphic";

const HEADING_LINE_CLASS =
  "font-display text-[clamp(42px,13vw,60px)] font-bold uppercase leading-[0.95] text-ink-dark md:text-[120px]";
const HEADING_STAGGER = {
  creative: "pl-0",
  branding: "mt-3 pl-0 md:mt-[60px] md:pl-[20%]",
} as const;
const AGENCY_BLOCK_CLASS =
  "mt-3 w-full pl-0 text-center md:mt-[60px] md:w-fit md:pl-[45%] md:text-left";
const HERO_COPY_DESKTOP = (
  <>
    Strategic branding, visual identity, and creative storytelling
    <br />
    that help ambitious businesses stand out, earn trust,
    <br />
    and grow faster.
  </>
);
const HERO_COPY_MOBILE =
  "Strategic branding, visual identity, and creative storytelling that help ambitious businesses stand out, earn trust, and grow faster.";
const LOREM_CLASS =
  "w-full max-w-none select-text text-center font-body text-[clamp(13px,3.6vw,15px)] leading-relaxed text-black md:max-w-[440px] md:shrink md:text-left md:text-[14px]";
const LOREM_MOBILE_CLASS = `${LOREM_CLASS} mt-0 md:hidden`;
const CREATIVE_ROW_CLASS =
  "hidden items-end gap-[clamp(64px,9vw,180px)] md:flex";
const HERO_CONTENT_CLASS =
  "relative z-10 mx-auto flex min-h-screen flex-col px-6 pt-16 md:block md:h-full md:min-h-0 md:max-w-[1400px] md:px-10";
const HERO_MOBILE_TEXT_CLASS =
  "flex flex-1 flex-col justify-center md:contents";
const HERO_HEADING_CLASS =
  "relative mt-4 w-full text-center md:absolute md:inset-x-10 md:top-[24%] md:mt-0 md:text-left";

function AnimatedBlock({
  children,
  className,
  progress,
  yRange,
  xRange,
  opacityRange,
  opacityInput = [0, 0.7, 1],
}: {
  children: ReactNode;
  className?: string;
  progress: MotionValue<number>;
  yRange: [number, number];
  xRange: [number, number];
  opacityRange: [number, number, number];
  opacityInput?: [number, number, number];
}) {
  const y = useTransform(progress, [0, 1], yRange);
  const x = useTransform(progress, [0, 1], xRange);
  const opacity = useTransform(progress, opacityInput, opacityRange);

  return (
    <motion.div style={{ y, x, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

function AnimatedLine({
  children,
  className,
  progress,
  yRange,
  xRange,
  opacityRange,
  opacityInput = [0, 0.7, 1],
}: {
  children: ReactNode;
  className?: string;
  progress: MotionValue<number>;
  yRange: [number, number];
  xRange: [number, number];
  opacityRange: [number, number, number];
  opacityInput?: [number, number, number];
}) {
  const y = useTransform(progress, [0, 1], yRange);
  const x = useTransform(progress, [0, 1], xRange);
  const opacity = useTransform(progress, opacityInput, opacityRange);

  return (
    <motion.span style={{ y, x, opacity }} className={`block ${className ?? ""}`}>
      {children}
    </motion.span>
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

  const loremOpacity = useTransform(
    scrollYProgress,
    [0, 0.32, HERO_CONTENT_FADE_END],
    [1, 0.45, 0],
  );
  const loremY = useTransform(scrollYProgress, [0, HERO_CONTENT_FADE_END], [0, -40]);
  const heroChromeOpacity = useTransform(
    scrollYProgress,
    [0, 0.34, HERO_CONTENT_FADE_END],
    [1, 0.5, 0],
  );
  const headingOpacityRange: [number, number, number] = [1, 0.35, 0];
  const headingFadeInput: [number, number, number] = [0, 0.36, HERO_CONTENT_FADE_END];

  if (isStaticLayout) {
    return (
      <div id="top" className="relative">
        <section className="relative overflow-x-hidden bg-ink-bg md:min-h-screen md:overflow-hidden">
          <DecorativeIcons />
          <div className={HERO_CONTENT_CLASS}>
            <div className={HERO_MOBILE_TEXT_CLASS}>
              <p className={LOREM_MOBILE_CLASS}>{HERO_COPY_MOBILE}</p>
              <h1 className={HERO_HEADING_CLASS}>
                <div className={CREATIVE_ROW_CLASS}>
                  <span
                    className={`shrink-0 ${HEADING_LINE_CLASS} ${HEADING_STAGGER.creative}`}
                  >
                    Create
                  </span>
                  <p className={`relative z-20 hidden md:block ${LOREM_CLASS}`}>
                    {HERO_COPY_DESKTOP}
                  </p>
                </div>
                <span
                  className={`block md:hidden ${HEADING_LINE_CLASS} ${HEADING_STAGGER.creative}`}
                >
                  Create
                </span>
                <span className={`block ${HEADING_LINE_CLASS} ${HEADING_STAGGER.branding}`}>
                  Disrupt
                </span>
                <div className={AGENCY_BLOCK_CLASS}>
                  <span className={`block ${HEADING_LINE_CLASS}`}>Dominate</span>
                </div>
              </h1>
            </div>
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
          <div className={HERO_MOBILE_TEXT_CLASS}>
            <motion.p
              style={{ opacity: loremOpacity, y: loremY }}
              className={LOREM_MOBILE_CLASS}
            >
              {HERO_COPY_MOBILE}
            </motion.p>

            <h1 className={HERO_HEADING_CLASS}>
              <div className={CREATIVE_ROW_CLASS}>
                <AnimatedLine
                  progress={scrollYProgress}
                  className={`shrink-0 ${HEADING_LINE_CLASS} ${HEADING_STAGGER.creative}`}
                  yRange={[0, -50]}
                  xRange={[0, -18]}
                  opacityRange={headingOpacityRange}
                  opacityInput={headingFadeInput}
                >
                  Create
                </AnimatedLine>

                <motion.p
                  style={{ opacity: loremOpacity, y: loremY }}
                  className={`relative z-20 hidden md:block ${LOREM_CLASS}`}
                >
                  {HERO_COPY_DESKTOP}
                </motion.p>
              </div>

              <AnimatedLine
                progress={scrollYProgress}
                className={`block md:hidden ${HEADING_LINE_CLASS} ${HEADING_STAGGER.creative}`}
                yRange={[0, -50]}
                xRange={[0, -18]}
                opacityRange={headingOpacityRange}
                opacityInput={headingFadeInput}
              >
                Create
              </AnimatedLine>

              <AnimatedLine
                progress={scrollYProgress}
                className={`${HEADING_LINE_CLASS} ${HEADING_STAGGER.branding}`}
                yRange={[0, -80]}
                xRange={[0, 28]}
                opacityRange={headingOpacityRange}
                opacityInput={headingFadeInput}
              >
                Disrupt
              </AnimatedLine>

              <AnimatedBlock
                progress={scrollYProgress}
                className={AGENCY_BLOCK_CLASS}
                yRange={[0, -110]}
                xRange={[0, 56]}
                opacityRange={headingOpacityRange}
                opacityInput={headingFadeInput}
              >
                <span className={`block ${HEADING_LINE_CLASS}`}>Dominate</span>
              </AnimatedBlock>
            </h1>
          </div>
        </motion.div>

        <CircuitGraphic
          scrollProgress={scrollYProgress}
          containerRef={heroSectionRef}
        />
      </section>
    </div>
  );
}
