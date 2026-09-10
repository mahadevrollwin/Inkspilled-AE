"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useStaticLayout } from "@/hooks/useStaticLayout";
import { useDictionary, useLocaleContext } from "@/i18n/locale-context";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_INNER_CLASS = "mx-auto w-full max-w-[1400px]";
const FAQ_COLUMN_CLASS = `${FAQ_INNER_CLASS} px-6 md:px-10`;
const SECTION_SCROLL_HEIGHT = "450vh";
const SCROLL_TAIL_HEIGHT = "4vh";
const DIVIDER_COLORS = ["bg-ink-red", "bg-[#4caf50]", "bg-ink-blue"] as const;

const HEADING_SIZE_START = 90;
const HEADING_SIZE_END = 60;

const PHASE = {
  lettersStart: 0.06,
  lettersEnd: 0.4,
  headerMoveStart: 0.52,
  headerMoveEnd: 0.72,
  interactiveStart: 0.72,
  interactiveEnd: 0.9,
} as const;

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

function mapAnimationProgress(raw: number) {
  const clamped = Math.min(Math.max(raw, 0), 1);
  const animStart = 0.12;
  const animEnd = 0.68;
  const holdEnd = 0.92;

  if (clamped <= animStart) return 0;

  if (clamped <= animEnd) {
    const t = smoothstep((clamped - animStart) / (animEnd - animStart));
    return t;
  }

  if (clamped <= holdEnd) return 1;

  const exitT = (clamped - holdEnd) / (1 - holdEnd);
  return 1 + exitT * 0.08;
}

function RevealLetter({
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

function AnimatedFaqLetter({
  char,
  index,
  totalChars,
  animationProgress,
}: {
  char: string;
  index: number;
  totalChars: number;
  animationProgress: MotionValue<number>;
}) {
  const letterSpan =
    (PHASE.lettersEnd - PHASE.lettersStart) / Math.max(totalChars, 1);
  const start = PHASE.lettersStart + index * letterSpan;
  const end = start + letterSpan * 0.85;
  const opacity = useTransform(animationProgress, [start, end], [0, 1]);
  const x = useTransform(animationProgress, [start, end], [-20, 0]);

  return (
    <RevealLetter opacity={opacity} x={x}>
      {char === " " ? "\u00A0" : char}
    </RevealLetter>
  );
}

function AnimatedFaqHeader({
  animationProgress,
}: {
  animationProgress: MotionValue<number>;
}) {
  const heading = useDictionary().faq.heading;
  const { locale } = useLocaleContext();
  const units =
    locale === "ar" ? heading.split(" ") : Array.from(heading);
  const titleFontSize = useTransform(animationProgress, (progress) => {
    if (progress <= PHASE.headerMoveStart) return HEADING_SIZE_START;
    if (progress <= PHASE.headerMoveEnd) {
      const t = smoothstep(
        (progress - PHASE.headerMoveStart) /
          (PHASE.headerMoveEnd - PHASE.headerMoveStart),
      );
      return HEADING_SIZE_START + t * (HEADING_SIZE_END - HEADING_SIZE_START);
    }
    return HEADING_SIZE_END;
  });

  const dividerReveal = useTransform(
    animationProgress,
    [PHASE.lettersStart, PHASE.lettersEnd],
    [0, 1],
  );

  return (
    <motion.div
      style={{ fontSize: titleFontSize }}
      className="mx-auto inline-flex w-fit max-w-full flex-col items-stretch text-center"
    >
      <h2
        aria-label={heading}
        className="whitespace-nowrap font-display font-bold leading-none text-black"
      >
        {units.map((unit, index) => (
          <span key={`${unit}-${index}`}>
            <AnimatedFaqLetter
              char={unit}
              index={index}
              totalChars={units.length}
              animationProgress={animationProgress}
            />
            {locale === "ar" && index < units.length - 1 ? "\u00A0" : null}
          </span>
        ))}
      </h2>

      <motion.div
        style={{
          scaleX: dividerReveal,
          transformOrigin: "center center",
        }}
        className="mt-5 flex h-[3px] w-full"
        aria-hidden
      >
        {DIVIDER_COLORS.map((colorClass) => (
          <span key={colorClass} className={`h-full w-1/3 ${colorClass}`} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0 text-[#333]"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function FaqAccordionItem({
  item,
  index,
  open,
  onToggle,
  animateContent = true,
}: {
  item: FaqItem;
  index: number;
  open: boolean;
  onToggle: (index: number) => void;
  animateContent?: boolean;
}) {
  const isStaticLayout = useStaticLayout();
  const prefix = useDictionary().faq.questionPrefix;
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="overflow-hidden rounded-tl-[20px] rounded-tr-[0px] rounded-br-[20px] rounded-bl-[20px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04]">
      <button
        id={buttonId}
        type="button"
        onClick={() => onToggle(index)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start md:px-6 md:py-5"
      >
        <span className="min-w-0 flex-1 font-body text-sm leading-snug text-[#222] md:text-base">
          <span className="me-2 inline-block font-bold">{prefix}</span>
          <span dir="auto">{item.question}</span>
        </span>
        <ChevronIcon open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key={`faq-answer-${index}`}
            initial={
              !animateContent || isStaticLayout
                ? false
                : { opacity: 0, height: 0 }
            }
            animate={{ opacity: 1, height: "auto" }}
            exit={
              !animateContent || isStaticLayout
                ? undefined
                : { opacity: 0, height: 0 }
            }
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#e4e4e4] px-5 pb-5 pt-4 md:px-6 md:pb-6 md:pt-5">
              <p className="font-body text-sm leading-relaxed text-[#222] md:text-[15px]">
                {item.answer}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function FaqAccordion({
  animateContent = true,
  items,
}: {
  animateContent?: boolean;
  items: FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="box-border flex w-full flex-col gap-3 md:gap-4">
      {items.map((item, index) => (
        <FaqAccordionItem
          key={item.question}
          item={item}
          index={index}
          open={openIndex === index}
          onToggle={handleToggle}
          animateContent={animateContent}
        />
      ))}
    </div>
  );
}

function FaqInteractiveBlock({
  animateContent = true,
  items,
  opacity,
  y,
  pointerEvents,
}: {
  animateContent?: boolean;
  items: FaqItem[];
  opacity?: MotionValue<number>;
  y?: MotionValue<number>;
  pointerEvents?: MotionValue<"auto" | "none">;
}) {
  const content = (
    <div className="box-border w-full">
      <FaqAccordion animateContent={animateContent} items={items} />
    </div>
  );

  if (opacity && y) {
    return (
      <motion.div
        style={{
          opacity,
          y,
          pointerEvents,
        }}
        className="box-border w-full will-change-transform"
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

function StaticFaqSection({ items }: { items: FaqItem[] }) {
  const heading = useDictionary().faq.heading;
  return (
    <section id="faq" className="relative scroll-mt-24 bg-[#f3f3f3] py-24">
      <div className={FAQ_COLUMN_CLASS}>
        <div className="mx-auto inline-flex w-fit flex-col items-stretch text-center">
          <h2 className="font-display text-3xl font-bold text-black md:text-4xl">
            {heading}
          </h2>
          <div className="mt-5 flex h-[3px] w-full">
            {DIVIDER_COLORS.map((colorClass) => (
              <span key={colorClass} className={`h-full w-1/3 ${colorClass}`} />
            ))}
          </div>
        </div>
        <div className="mt-10">
          <FaqInteractiveBlock animateContent={false} items={items} />
        </div>
      </div>
    </section>
  );
}

export default function FaqSection({ items }: { items?: FaqItem[] }) {
  const dictionaryItems = useDictionary().faq.items;
  const { locale } = useLocaleContext();
  const resolvedItems =
    locale === "ar" &&
    items?.length &&
    !items.some((item) => /[\u0600-\u06FF]/.test(item.question))
      ? dictionaryItems
      : items?.length
        ? items
        : dictionaryItems;
  const sectionRef = useRef<HTMLElement>(null);
  const isStaticLayout = useStaticLayout();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const animationProgress = useTransform(scrollYProgress, mapAnimationProgress);

  const interactiveOpacity = useTransform(
    animationProgress,
    [PHASE.interactiveStart, PHASE.interactiveEnd],
    [0, 1],
  );
  const interactiveY = useTransform(
    animationProgress,
    [PHASE.interactiveStart, PHASE.interactiveEnd],
    [96, 0],
  );
  const interactivePointerEvents = useTransform(interactiveOpacity, (value) =>
    value > 0.25 ? "auto" : "none",
  );

  if (isStaticLayout) {
    return <StaticFaqSection items={resolvedItems} />;
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="faq"
        className="relative scroll-mt-24 overflow-visible bg-[#f3f3f3]"
        style={{ height: SECTION_SCROLL_HEIGHT }}
      >
        <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-start justify-center overflow-x-hidden overflow-y-hidden px-6 pb-8 pt-6 md:top-[70px] md:h-[calc(100svh-70px)] md:px-10 md:pb-10 md:pt-8">
          <div className={`${FAQ_INNER_CLASS} flex w-full flex-col items-center`}>
            <motion.div className="w-full origin-center text-center will-change-transform max-md:scale-[0.42] sm:max-md:scale-[0.58] md:scale-100">
              <AnimatedFaqHeader animationProgress={animationProgress} />
            </motion.div>

            <div className="mt-5 w-full pb-8">
              <FaqInteractiveBlock
                animateContent
                items={resolvedItems}
                opacity={interactiveOpacity}
                y={interactiveY}
                pointerEvents={interactivePointerEvents}
              />
            </div>
          </div>
        </div>
      </section>
      <div
        aria-hidden
        className="bg-[#f3f3f3]"
        style={{ height: SCROLL_TAIL_HEIGHT }}
      />
    </>
  );
}
