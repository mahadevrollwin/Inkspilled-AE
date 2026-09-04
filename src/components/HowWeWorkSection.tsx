"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useStaticLayout } from "@/hooks/useStaticLayout";
import HowWeWorkOrbBackground from "@/components/HowWeWorkOrbBackground";

type WorkStep = {
  number: string;
  title: string;
  description: string;
  stagger: number;
};

const WORK_STEPS: WorkStep[] = [
  {
    number: "01",
    title: "Dip",
    description:
      "We listen first: your goals, your market, your audience, and what truly sets you apart.",
    stagger: 0,
  },
  {
    number: "02",
    title: "Sketch",
    description:
      "Insight becomes direction. A clear strategy guides every decision ahead.",
    stagger: 0,
  },
  {
    number: "03",
    title: "Spill",
    description:
      "Ideas take shape: design, content, and production crafted to land with impact.",
    stagger: 0,
  },
  {
    number: "04",
    title: "Set",
    description:
      "We take it to market and keep it moving. Launch, measure, refine, grow.",
    stagger: 0,
  },
];

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

const SUBTITLE_WORDS = ["From", "Idea", "To", "Impact."] as const;
const SUBTITLE_CLASS =
  "mt-3 whitespace-nowrap font-display text-lg font-bold text-[#e8e8e8] md:text-xl";
const SUBTITLE_LABEL = "From Idea To Impact.";
const SECTION_SCROLL_HEIGHT = "320vh";
const ANIMATION_COMPLETE = 0.55;
const RAW_REVEAL_DONE = 0.3;
const RAW_HOLD_END = 0.34;
const RAW_ANIMATION_END = 0.68;
const STEPS_START = 0.52;
const STEP_DURATION = 0.11;

function mapAnimationProgress(raw: number) {
  const clamped = Math.min(Math.max(raw, 0), 1);

  if (clamped <= RAW_REVEAL_DONE) {
    return (clamped / RAW_REVEAL_DONE) * ANIMATION_COMPLETE;
  }

  if (clamped <= RAW_HOLD_END) {
    return ANIMATION_COMPLETE;
  }

  if (clamped >= RAW_ANIMATION_END) {
    return 1;
  }

  const exitT = (clamped - RAW_HOLD_END) / (RAW_ANIMATION_END - RAW_HOLD_END);
  return ANIMATION_COMPLETE + exitT * (1 - ANIMATION_COMPLETE);
}

function RevealSubtitleWord({
  children,
  opacity,
  x,
}: {
  children: React.ReactNode;
  opacity: MotionValue<number>;
  x: MotionValue<number>;
}) {
  return (
    <motion.span style={{ opacity, x }} className="inline-block">
      {children}
    </motion.span>
  );
}

function AnimatedSubtitle({
  animationProgress,
}: {
  animationProgress: MotionValue<number>;
}) {
  return (
    <p
      aria-label={SUBTITLE_LABEL}
      className={SUBTITLE_CLASS}
    >
      {SUBTITLE_WORDS.map((word, index) => (
        <span key={word}>
          <AnimatedSubtitleWord
            word={word}
            index={index}
            animationProgress={animationProgress}
          />
          {index < SUBTITLE_WORDS.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}

function AnimatedSubtitleWord({
  word,
  index,
  animationProgress,
}: {
  word: string;
  index: number;
  animationProgress: MotionValue<number>;
}) {
  const start = 0.3 + index * 0.025;
  const end = start + 0.05;

  const opacity = useTransform(animationProgress, [start, end], [0, 1]);
  const x = useTransform(animationProgress, [start, end], [-18, 0]);

  return (
    <RevealSubtitleWord opacity={opacity} x={x}>
      {word}
    </RevealSubtitleWord>
  );
}

const WORK_STEP_NUMBER_CLASS =
  "shrink-0 font-display text-[60px] font-bold leading-none text-ink-blue md:text-[72px]";

function WorkStepContent({ step }: { step: WorkStep }) {
  return (
    <>
      <div className="flex flex-nowrap items-baseline justify-center gap-2">
        <span className={WORK_STEP_NUMBER_CLASS}>
          {step.number}
        </span>
        <span className="shrink-0 whitespace-nowrap font-display text-lg font-bold text-[#f5f5f5] md:text-xl">
          {step.title}
        </span>
      </div>

      <div className="mx-auto mt-3 h-px w-full max-w-xs bg-white/20" />

      <p className="mx-auto mt-4 max-w-sm font-body text-[13px] leading-relaxed text-[#d4d4d4] md:text-sm">
        {step.description}
      </p>
    </>
  );
}

function StaticHowWeWork() {
  return (
    <section id="how-we-work" className="relative scroll-mt-24 overflow-hidden bg-[#070A18] py-24 pt-32 md:pt-36">
      <HowWeWorkOrbBackground animated={false} />
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        <div className="text-center">
          <h2 className="font-display text-[48px] font-extrabold leading-none text-[#f5f5f5] md:text-[80px]">
            How We Work
          </h2>
          <p className={SUBTITLE_CLASS}>
            {SUBTITLE_LABEL}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {WORK_STEPS.map((step) => (
            <div key={step.number} className="max-lg:!mt-0" style={{ marginTop: step.stagger }}>
              <div className="flex flex-nowrap items-baseline gap-2">
                <span className={WORK_STEP_NUMBER_CLASS}>
                  {step.number}
                </span>
                <span className="shrink-0 whitespace-nowrap font-display text-lg font-bold text-[#f5f5f5] md:text-xl">
                  {step.title}
                </span>
              </div>
              <div className="mt-3 h-px w-full bg-white/20" />
              <p className="mt-4 font-body text-[13px] leading-relaxed text-[#d4d4d4] md:text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedWorkStep({
  step,
  index,
  animationProgress,
  totalSteps,
}: {
  step: WorkStep;
  index: number;
  animationProgress: MotionValue<number>;
  totalSteps: number;
}) {
  const start = STEPS_START + index * STEP_DURATION;
  const fadeInEnd = start + STEP_DURATION * 0.28;
  const fadeOutStart = start + STEP_DURATION * 0.72;
  const end = start + STEP_DURATION;
  const isLast = index === totalSteps - 1;

  const opacity = useTransform(animationProgress, (progress) => {
    if (progress < start) return 0;
    if (progress < fadeInEnd) {
      return (progress - start) / (fadeInEnd - start);
    }
    if (isLast || progress < fadeOutStart) return 1;
    if (progress < end) {
      return 1 - (progress - fadeOutStart) / (end - fadeOutStart);
    }
    return 0;
  });

  const y = useTransform(animationProgress, (progress) => {
    if (progress < start) return 48;
    if (progress < fadeInEnd) {
      const t = (progress - start) / (fadeInEnd - start);
      return 48 * (1 - t);
    }
    if (!isLast && progress > fadeOutStart && progress < end) {
      const t = (progress - fadeOutStart) / (end - fadeOutStart);
      return -28 * t;
    }
    return 0;
  });

  const scale = useTransform(animationProgress, (progress) => {
    if (progress < start) return 0.96;
    if (progress < fadeInEnd) {
      const t = (progress - start) / (fadeInEnd - start);
      return 0.96 + t * 0.04;
    }
    if (!isLast && progress > fadeOutStart && progress < end) {
      const t = (progress - fadeOutStart) / (end - fadeOutStart);
      return 1 - t * 0.04;
    }
    return 1;
  });

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex items-start justify-center will-change-transform"
    >
      <div className="w-full max-w-md px-2 text-center md:max-w-lg">
        <WorkStepContent step={step} />
      </div>
    </motion.div>
  );
}

function StepIndicator({
  index,
  animationProgress,
}: {
  index: number;
  animationProgress: MotionValue<number>;
}) {
  const start = STEPS_START + index * STEP_DURATION;
  const end = start + STEP_DURATION;

  const opacity = useTransform(animationProgress, (progress) => {
    if (progress < start) return 0.25;
    if (progress >= start && progress < end) return 1;
    if (index === WORK_STEPS.length - 1 && progress >= end) return 1;
    return 0.25;
  });

  const scale = useTransform(animationProgress, (progress) => {
    if (progress >= start && progress < end) return 1.25;
    if (index === WORK_STEPS.length - 1 && progress >= end) return 1.25;
    return 1;
  });

  return (
    <motion.span
      style={{ opacity, scale }}
      className="h-1.5 w-6 rounded-full bg-ink-blue"
    />
  );
}

function StepIndicators({
  animationProgress,
}: {
  animationProgress: MotionValue<number>;
}) {
  const rowOpacity = useTransform(
    animationProgress,
    [STEPS_START, STEPS_START + 0.04],
    [0, 1],
  );

  return (
    <motion.div
      aria-hidden
      style={{ opacity: rowOpacity }}
      className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-2"
    >
      {WORK_STEPS.map((step, index) => (
        <StepIndicator
          key={step.number}
          index={index}
          animationProgress={animationProgress}
        />
      ))}
    </motion.div>
  );
}

export default function HowWeWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isStaticLayout = useStaticLayout();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const animationProgress = useTransform(scrollYProgress, mapAnimationProgress);

  const titleOpacity = useTransform(animationProgress, [0.02, 0.16], [0, 1]);
  const titleColor = useTransform(animationProgress, [0.02, 0.19], ["#707070", "#f5f5f5"]);
  const titleFontSize = useTransform(animationProgress, (progress) => {
    if (progress <= 0.02) return 20;
    if (progress <= 0.24) {
      const t = smoothstep((progress - 0.02) / (0.24 - 0.02));
      return 20 + t * 100;
    }
    if (progress <= 0.43) {
      const t = smoothstep((progress - 0.24) / (0.43 - 0.24));
      return 120 + t * -40;
    }
    return 80;
  });
  const contentY = useTransform(animationProgress, [0.02, 0.24, 0.43], [120, 24, 0]);

  if (isStaticLayout) {
    return <StaticHowWeWork />;
  }

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="relative z-10 scroll-mt-24 overflow-visible bg-[#070A18]"
      style={{ height: SECTION_SCROLL_HEIGHT }}
    >
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center justify-center overflow-hidden px-6 pb-4 pt-6 md:top-[70px] md:h-[calc(100svh-70px)] md:px-10 md:pt-8">
        <HowWeWorkOrbBackground scrollYProgress={scrollYProgress} />
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center will-change-transform"
        >
          <motion.div
            style={{ opacity: titleOpacity }}
            className="text-center"
          >
            <motion.h2
              style={{ color: titleColor, fontSize: titleFontSize }}
              className="whitespace-nowrap font-display font-extrabold leading-none"
            >
              How We Work
            </motion.h2>

            <AnimatedSubtitle animationProgress={animationProgress} />
          </motion.div>

          <div className="relative mt-10 h-[220px] w-full md:mt-12 md:h-[200px]">
            {WORK_STEPS.map((step, index) => (
              <AnimatedWorkStep
                key={step.number}
                step={step}
                index={index}
                totalSteps={WORK_STEPS.length}
                animationProgress={animationProgress}
              />
            ))}

            <StepIndicators animationProgress={animationProgress} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
