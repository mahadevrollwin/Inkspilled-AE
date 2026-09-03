"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import BrandStatsSection from "@/components/BrandStatsSection";
import AboutHeroWordField from "@/components/AboutHeroWordField";
import type { AboutPageContentData } from "@/sanity/mappers";

const EASE = [0.22, 1, 0.36, 1] as const;
const DIVIDER_COLORS = ["bg-ink-red", "bg-[#4caf50]", "bg-ink-blue"] as const;

function ColorDivider({ className = "w-28" }: { className?: string }) {
  return (
    <div className={`flex h-[3px] overflow-hidden ${className}`} aria-hidden>
      {DIVIDER_COLORS.map((colorClass) => (
        <span key={colorClass} className={`w-1/3 ${colorClass}`} />
      ))}
    </div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const reduceMotion = useReducedMotion();
  const offset =
    direction === "left"
      ? { x: -40, y: 0 }
      : direction === "right"
        ? { x: 40, y: 0 }
        : { x: 0, y: 40 };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPageContent({
  content,
}: {
  content: AboutPageContentData;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#141414] pb-16 pt-32 text-white md:pb-20 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 85% 20%, rgba(220,92,82,0.35), transparent 55%), radial-gradient(ellipse 50% 50% at 10% 80%, rgba(41,182,232,0.2), transparent 50%)",
          }}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-[min(48%,560px)] lg:block">
          <div className="pointer-events-auto h-full">
            <AboutHeroWordField />
          </div>
        </div>

        <div className="relative z-[2] mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <Reveal direction="left">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
              {content.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-[42px] font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[72px]">
              {content.title}
            </h1>
            <div className="mt-7">
              <ColorDivider />
            </div>
            <p className="mt-7 max-w-2xl font-body text-sm leading-7 text-white/72 md:text-[15px]">
              {content.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[1400px] gap-12 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16 md:px-10">
          <Reveal>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-ink-gray">
              {content.storyEyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink-dark md:text-4xl">
              {content.storyTitle}
            </h2>
            <ColorDivider className="mt-6 w-24" />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-5 font-body text-sm leading-relaxed text-ink-gray md:text-[15px]">
              {content.storyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f4f4f2] py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <Reveal className="max-w-2xl"> 
            <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-ink-gray">
              {content.valuesEyebrow}  
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-ink-dark md:text-4xl">
              {content.valuesTitle} 
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
            {content.values.map((value, index) => (
              <Reveal key={value.title} delay={0.06 * index}>
                <article className="h-full rounded-[24px] border border-black/5 bg-white p-7 shadow-[0_12px_40px_rgba(20,20,20,0.06)]">
                  <h3 className="font-display text-xl font-bold text-ink-dark">
                    {value.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink-gray md:text-[15px]">
                    {value.copy}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BrandStatsSection />

      <section className="bg-[#f4f4f2] py-16 md:py-20">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center md:px-10">
          <Reveal>
            <h2 className="max-w-xl font-display text-3xl font-extrabold leading-tight text-ink-dark md:text-4xl">
              {content.ctaTitle}
            </h2>
            <p className="mt-4 max-w-lg font-body text-sm leading-relaxed text-ink-gray md:text-[15px]">
              {content.ctaCopy}
            </p>
          </Reveal>

          <Reveal delay={0.08} direction="right">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-ink-dark bg-ink-dark px-8 py-3.5 font-body text-sm font-semibold text-white transition-opacity hover:opacity-85"
            >
              {content.ctaButtonLabel}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
