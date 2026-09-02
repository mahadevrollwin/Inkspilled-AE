"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Infinity as InfinityIcon } from "lucide-react";
import CountUpValue from "@/components/CountUpValue";

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS_EYEBROW = "Why brands choose us";
const STATS_TITLE = "We build brands people remember";
const STATS = [
  { value: "100+", label: "Projects Delivered" },
  { value: "∞", label: "Ink in the Well" },
  { value: "18", label: "Markets Reached" },
  { value: "2023", label: "Since the First Spill" },
] as const;

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function BrandStatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#141414] py-16 text-white md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(41,182,232,0.25), transparent 55%), radial-gradient(ellipse 50% 45% at 80% 40%, rgba(220,92,82,0.2), transparent 50%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
            {STATS_EYEBROW}
          </p>
          <h2 className="mt-4 max-w-xl font-display text-2xl font-bold leading-snug text-white md:text-3xl">
            {STATS_TITLE}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => {
            const isInfinity = stat.value === "∞";

            return (
              <Reveal key={stat.label} delay={0.05 * index}>
                <div className="rounded-[20px] rounded-tr-none border border-white/10 bg-white/5 px-6 py-7 backdrop-blur-sm">
                  <p className="font-display text-4xl font-extrabold leading-none text-white md:text-5xl">
                    {isInfinity ? (
                      <span
                        className="inline-flex items-center"
                        aria-label="Infinity"
                      >
                        <InfinityIcon
                          className="h-10 w-10 md:h-12 md:w-12"
                          strokeWidth={2.4}
                          aria-hidden
                        />
                      </span>
                    ) : (
                      <CountUpValue delay={0.08 * index} value={stat.value} />
                    )}
                  </p>
                  <p className="mt-3 font-body text-sm text-white/65">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
