"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import LocaleLink from "@/components/LocaleLink";
import ContactForm from "@/components/ContactForm";
import { useDictionary, useLocaleContext } from "@/i18n/locale-context";
import LetsTalkCreatureBackground from "@/components/LetsTalkCreatureBackground";
import { useStaticLayout } from "@/hooks/useStaticLayout";

const INNER_CLASS = "mx-auto w-full max-w-[1400px]";
const COLUMN_CLASS = `${INNER_CLASS} px-6 md:px-10`;
const DIVIDER_COLORS = ["bg-ink-red", "bg-[#4caf50]", "bg-ink-blue"] as const;

function LetsTalkHeading() {
  const t = useDictionary();
  return (
    <div className="inline-flex flex-col items-start">
      <p className="font-display text-[28px] font-bold leading-none text-[#d4d4d4] md:text-[32px]">
        {t.letsTalk.titleTop}
      </p>
      <div className="mt-1 inline-flex flex-col items-stretch">
        <h2 className="font-display text-[clamp(56px,12vw,90px)] font-extrabold leading-none text-[#e8e8e8]">
          {t.letsTalk.titleMain}
        </h2>
        <div className="mt-4 flex h-[3px] w-full md:mt-5">
          {DIVIDER_COLORS.map((colorClass) => (
            <span key={colorClass} className={`h-full w-1/3 ${colorClass}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LetsTalkCopy({
  copy,
  buttonLabel,
}: {
  copy: string;
  buttonLabel: string;
}) {
  return (
    <>
      <p className="mt-8 max-w-md font-body text-sm leading-relaxed text-[#fff] md:text-[15px]">
        {copy}
      </p>

      <LocaleLink
        href="/contact"
        className="mt-8 inline-flex rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-[#fff] px-6 py-3 font-body text-xs text-[#fff] transition-opacity hover:opacity-85 md:text-sm"
      >
        {buttonLabel}
      </LocaleLink>
    </>
  );
}

function StaticLetsTalkSection({
  copy,
  buttonLabel,
}: {
  copy: string;
  buttonLabel: string;
}) {
  return (
    <section
      id="contact"
      className="relative z-10 flex min-h-[100svh] scroll-mt-24 items-center overflow-hidden bg-black py-20 md:py-24"
    >
      <LetsTalkCreatureBackground />
      <div className={`relative z-10 w-full ${COLUMN_CLASS}`}>
        <div className="grid items-start gap-12 wide:grid-cols-2 wide:gap-16">
          <div>
            <LetsTalkHeading />
            <LetsTalkCopy copy={copy} buttonLabel={buttonLabel} />
          </div>
          <div id="contact-form">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LetsTalkSection({
  copy,
  buttonLabel,
}: {
  copy?: string;
  buttonLabel?: string;
}) {
  const t = useDictionary();
  const { dir } = useLocaleContext();
  const resolvedCopy = copy || t.letsTalk.copy;
  const resolvedButton = buttonLabel || t.hero.cta;
  const sectionRef = useRef<HTMLElement>(null);
  const isStaticLayout = useStaticLayout();
  const textFromX = dir === "rtl" ? 72 : -72;
  const cardFromX = dir === "rtl" ? -72 : 72;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.92", "start 0.42"],
  });

  const { scrollYProgress: backgroundScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const textX = useTransform(scrollYProgress, [0, 1], [textFromX, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const cardX = useTransform(scrollYProgress, [0, 1], [cardFromX, 0]);

  if (isStaticLayout) {
    return (
      <StaticLetsTalkSection copy={resolvedCopy} buttonLabel={resolvedButton} />
    );
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-10 flex min-h-[100svh] scroll-mt-24 items-center overflow-hidden bg-black py-20 md:py-24"
    >
      <LetsTalkCreatureBackground
        scrollYProgress={backgroundScrollYProgress}
        animated
      />
      <div className={`relative z-10 w-full ${COLUMN_CLASS}`}>
        <div className="grid items-start gap-12 wide:grid-cols-2 wide:gap-16">
          <motion.div
            style={{ opacity: textOpacity, x: textX }}
            className="min-w-0 will-change-transform"
          >
            <LetsTalkHeading />
            <LetsTalkCopy copy={resolvedCopy} buttonLabel={resolvedButton} />
          </motion.div>

          <motion.div
            id="contact-form"
            style={{ opacity: cardOpacity, x: cardX }}
            className="will-change-transform"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
