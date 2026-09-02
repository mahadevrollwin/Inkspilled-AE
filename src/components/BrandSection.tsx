"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import AbstractSectionBackground from "@/components/AbstractSectionBackground";
import { useStaticLayout } from "@/hooks/useStaticLayout";

const BRAND_IMAGES = Array.from({ length: 15 }, (_, index) => ({
  src: `/brand/brand-${String(index + 1).padStart(2, "0")}.png`,
  alt: `Brand showcase ${index + 1}`,
}));

const CARD_WIDTH = 230;
const COLLAGE_INSET = 18;

const BRAND_IMAGE_DIMENSIONS = [
  { width: 412, height: 650 },
  { width: 412, height: 523 },
  { width: 412, height: 408 },
  { width: 412, height: 529 },
  { width: 412, height: 650 },
  { width: 412, height: 523 },
  { width: 412, height: 412 },
  { width: 412, height: 412 },
  { width: 412, height: 529 },
  { width: 412, height: 650 },
  { width: 412, height: 650 },
  { width: 412, height: 549 },
  { width: 412, height: 424 },
  { width: 412, height: 387 },
  { width: 412, height: 499 },
] as const;

type BrandCardConfig = {
  src: string;
  alt: string;
  left: number;
  top: number;
  width: number;
  height: number;
  zIndex: number;
  rowIndex: number;
  columnIndex: number;
  shiftX: number;
  shiftY: number;
  progressStart: number;
  progressEnd: number;
};

const COLUMN_LAYOUT = [
  {
    imageIndices: [0, 3, 6, 9, 12],
  },
  {
    imageIndices: [1, 4, 7, 10, 13],
  },
  {
    imageIndices: [2, 5, 8, 11, 14],
  },
] as const;

/** Deterministic 0–1 noise so SSR/layout stay stable. */
function unitNoise(seedA: number, seedB: number) {
  const n = Math.sin(seedA * 127.1 + seedB * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

function rangedNoise(seedA: number, seedB: number, min: number, max: number) {
  return min + unitNoise(seedA, seedB) * (max - min);
}

function getCardHeight(imageIndex: number) {
  const { width, height } = BRAND_IMAGE_DIMENSIONS[imageIndex];
  return Math.round((CARD_WIDTH * height) / width);
}

function getCardShiftY(
  column: (typeof COLUMN_LAYOUT)[number],
  rowIndex: number,
  imageIndex: number,
) {
  if (rowIndex === 0) return 0;

  const prevHeight = getCardHeight(column.imageIndices[rowIndex - 1]);
  // Random vertical overlap amount while scrolling (into the card above).
  const factor = rangedNoise(imageIndex, 5, 0.14, 0.46);
  return prevHeight * factor + rangedNoise(imageIndex, 6, 0, 18);
}

function getCardProgressWindow(columnIndex: number, rowIndex: number) {
  // Finish card motion by the time the gallery bottom is in view.
  const start = Math.min(0.12, rowIndex * 0.025 + columnIndex * 0.012);
  const end = Math.min(0.92, 0.72 + rowIndex * 0.035 + columnIndex * 0.01);
  return { progressStart: start, progressEnd: end };
}

function buildBrandCards(): BrandCardConfig[] {
  const cards: BrandCardConfig[] = [];
  let columnLeft = 0;

  COLUMN_LAYOUT.forEach((column, columnIndex) => {
    // Irregular column start + left/right gutter between columns.
    let currentTop = rangedNoise(columnIndex, 1, 0, 64);
    const columnX = columnLeft;

    column.imageIndices.forEach((imageIndex, rowIndex) => {
      const height = getCardHeight(imageIndex);
      const { progressStart, progressEnd } = getCardProgressWindow(
        columnIndex,
        rowIndex,
      );

      // Random spacing on all four sides (stable per image).
      const spaceLeft = rangedNoise(imageIndex, 2, -16, 22);
      const spaceTop = rangedNoise(imageIndex, 3, -10, 28);
      const spaceBottom = rangedNoise(imageIndex, 4, 6, 42);

      cards.push({
        ...BRAND_IMAGES[imageIndex],
        left: COLLAGE_INSET + columnX + spaceLeft,
        top: COLLAGE_INSET + currentTop + spaceTop,
        width: CARD_WIDTH,
        height,
        // Later / side cards sit above neighbors when they overlap.
        zIndex: rowIndex * 10 + (columnIndex === 1 ? 2 : columnIndex === 0 ? 5 : 8),
        rowIndex,
        columnIndex,
        shiftX: 0,
        shiftY: getCardShiftY(column, rowIndex, imageIndex),
        progressStart,
        progressEnd,
      });

      currentTop += height + spaceBottom;
    });

    columnLeft += CARD_WIDTH + rangedNoise(columnIndex, 7, 10, 40);
  });

  return cards;
}

const BRAND_CARDS = buildBrandCards();
const COLLAGE_WIDTH =
  Math.max(...BRAND_CARDS.map((card) => card.left + card.width)) + COLLAGE_INSET;
const COLLAGE_HEIGHT =
  Math.max(...BRAND_CARDS.map((card) => card.top + card.height)) +
  COLLAGE_INSET;
/** Matches gallery top padding: pt-6 / md:pt-8 */
const GALLERY_EDGE_PADDING = 32;
/** Visible gallery area inside the sticky viewport (below nav / padding). */
const GALLERY_VIEWPORT_HEIGHT = 820;
/** Collage bottom after vertical overlap settles. */
const VISUAL_COLLAGE_BOTTOM = Math.max(
  ...BRAND_CARDS.map((card) => card.top + card.height - card.shiftY),
);
/**
 * Pin distance ends when the overlapped gallery bottom sits with the same
 * spacing as the gallery top (GALLERY_EDGE_PADDING).
 */
const GALLERY_SCROLL_TRAVEL = Math.max(
  0,
  VISUAL_COLLAGE_BOTTOM - GALLERY_VIEWPORT_HEIGHT + GALLERY_EDGE_PADDING,
);

function ColorDividerLine() {
  return (
    <>
      <span className="h-full w-1/3 bg-ink-red" />
      <span className="h-full w-1/3 bg-[#4caf50]" />
      <span className="h-full w-1/3 bg-ink-blue" />
    </>
  );
}

function StaticDivider() {
  return (
    <div className="mt-6 flex h-[3px] w-full">
      <ColorDividerLine />
    </div>
  );
}

function AnimatedDivider({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.35], [0, 1]);

  return (
    <motion.div
      style={{ scaleX: progress, opacity, transformOrigin: "center center" }}
      className="mt-6 flex h-[3px] w-full"
    >
      <ColorDividerLine />
    </motion.div>
  );
}

const GET_QUOTE_BUTTON_CLASS =
  "inline-block rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] px-8 py-3 font-body text-sm font-medium text-white transition-opacity hover:opacity-85";

const BRAND_COPY =
  "Strategic Branding, Visual Identity, And Creative Storytelling That Help Ambitious Businesses Stand Out, Earn Trust, And Grow Faster.";

const BRAND_COPY_LINES = [
  "Strategic Branding, Visual Identity, And Creative Storytelling",
  "That Help Ambitious Businesses Stand Out, Earn Trust,",
  "And Grow Faster.",
];

const SECTION_CONTAINER_CLASS = "mx-auto w-full max-w-[1400px] px-6 md:px-10";

function BrandMobileAnimatedCopy() {
  const copyRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(copyRef, {
    once: true,
    amount: 0.45,
    margin: "0px 0px -8% 0px",
  });

  return (
    <p
      ref={copyRef}
      className="mt-6 w-full max-w-md font-body text-sm leading-relaxed text-ink-gray md:hidden"
    >
      {BRAND_COPY_LINES.map((line, index) => (
        <motion.span
          key={line}
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{
            duration: 0.55,
            delay: index * 0.16,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="block"
        >
          {line}
        </motion.span>
      ))}
    </p>
  );
}

function GetQuoteButton({
  buttonBg,
  className = "mt-8",
}: {
  buttonBg?: MotionValue<string>;
  className?: string;
}) {
  if (buttonBg) {
    return (
      <motion.a
        href="#"
        style={{ backgroundColor: buttonBg }}
        className={`${GET_QUOTE_BUTTON_CLASS} ${className}`.trim()}
      >
        Get A Quote
      </motion.a>
    );
  }

  return (
    <a
      href="#"
      className={`${GET_QUOTE_BUTTON_CLASS} bg-ink-dark ${className}`.trim()}
    >
      Get A Quote
    </a>
  );
}

function BrandContent({
  progress,
  buttonBg,
}: {
  progress?: MotionValue<number>;
  buttonBg?: MotionValue<string>;
}) {
  return (
    <div className="w-full max-w-none md:max-w-xl">
      <motion.h2
        className="font-display leading-[0.95] text-ink-dark"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.45, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="block w-fit text-3xl font-bold md:text-4xl"
          initial={{ opacity: 0, x: 56 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.45, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          We Build
        </motion.span>

        <span className="inline-block max-w-full">
          <span className="block text-[18vw] font-extrabold leading-[0.9] sm:text-[88px] md:text-[108px] lg:text-[128px]">
            Brands
          </span>
          <motion.span
            className="ml-auto block w-fit text-right text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0, x: -56 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.45, margin: "0px 0px -8% 0px" }}
            transition={{
              duration: 0.7,
              delay: 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            That Lead.
          </motion.span>
        </span>
      </motion.h2>

      {progress ? <AnimatedDivider progress={progress} /> : <StaticDivider />}

      <BrandMobileAnimatedCopy />

      <p className="mt-6 hidden w-full max-w-md font-body text-sm leading-relaxed text-ink-gray md:block md:text-base">
        {BRAND_COPY}
      </p>

      <GetQuoteButton buttonBg={buttonBg} />
    </div>
  );
}

function BrandCollageCardAnimated({
  card,
  scrollYProgress,
}: {
  card: BrandCardConfig;
  scrollYProgress: MotionValue<number>;
}) {
  const cardX = useTransform(
    scrollYProgress,
    [card.progressStart, card.progressEnd],
    [0, card.shiftX],
  );
  const cardY = useTransform(
    scrollYProgress,
    [card.progressStart, card.progressEnd],
    [0, -card.shiftY],
  );

  return (
    <motion.div
      style={{
        left: card.left,
        top: card.top,
        width: card.width,
        height: card.height,
        zIndex: card.zIndex,
        x: cardX,
        y: cardY,
      }}
      className="absolute overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.12)] will-change-transform"
    >
      <Image
        src={card.src}
        alt={card.alt}
        width={card.width}
        height={card.height}
        className="h-full w-full object-cover"
        sizes="230px"
      />
    </motion.div>
  );
}

function BrandCollageCard({
  card,
  scrollYProgress,
}: {
  card: BrandCardConfig;
  scrollYProgress?: MotionValue<number>;
}) {
  if (scrollYProgress) {
    return (
      <BrandCollageCardAnimated card={card} scrollYProgress={scrollYProgress} />
    );
  }

  return (
    <div
      style={{
        left: card.left,
        top: card.top,
        width: card.width,
        height: card.height,
        zIndex: card.zIndex,
      }}
      className="absolute overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
    >
      <Image
        src={card.src}
        alt={card.alt}
        width={card.width}
        height={card.height}
        className="h-full w-full object-cover"
        sizes="230px"
      />
    </div>
  );
}

function BrandCollageGallery({
  scrollY,
  scrollYProgress,
}: {
  scrollY?: MotionValue<number>;
  scrollYProgress?: MotionValue<number>;
}) {
  const collage = (
    <div
      className="relative"
      style={{
        width: COLLAGE_WIDTH,
        height: COLLAGE_HEIGHT,
      }}
    >
      {BRAND_CARDS.map((card) => (
        <BrandCollageCard
          key={card.src}
          card={card}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );

  return (
    <div className="pointer-events-none absolute inset-y-0 left-[42%] right-0 hidden overflow-hidden md:block lg:left-[44%]">
      <div className="flex h-full items-start justify-start px-4 pb-6 pt-6 md:px-6 md:pb-8 md:pt-8">
        {scrollY ? (
          <motion.div style={{ y: scrollY }} className="will-change-transform">
            {collage}
          </motion.div>
        ) : (
          collage
        )}
      </div>
    </div>
  );
}

function BrandMobileSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = BRAND_IMAGES.length;

  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 1500);

    return () => window.clearInterval(timer);
  }, [activeIndex, total]);

  return (
    <div className="relative w-full pb-12 pt-8 md:hidden">
      <div className="relative aspect-[230/325] w-full overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
        <Image
          src={BRAND_IMAGES[activeIndex].src}
          alt={BRAND_IMAGES[activeIndex].alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority={activeIndex === 0}
        />

        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous brand image"
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-dark shadow-md transition-opacity hover:opacity-85"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next brand image"
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-dark shadow-md transition-opacity hover:opacity-85"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function BrandSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isStaticLayout = useStaticLayout();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const galleryScrollY = useTransform(
    scrollYProgress,
    [0, 0.95, 1],
    [0, -GALLERY_SCROLL_TRAVEL, -GALLERY_SCROLL_TRAVEL],
  );

  const buttonBg = useTransform(
    scrollYProgress,
    [0.12, 0.45],
    ["#c5c5c5", "#232323"],
  );

  const lineProgress = useTransform(scrollYProgress, [0.08, 0.28], [0, 1]);

  if (isStaticLayout) {
    return (
      <section className="relative min-h-screen overflow-visible bg-[#ececea] md:min-h-screen">
        <AbstractSectionBackground
          variant="brand"
          baseColor="#ececea"
          lineGradientId="brand-section-line"
        />
        <div
          className={`${SECTION_CONTAINER_CLASS} relative z-10 flex flex-col overflow-visible md:min-h-screen md:flex-row md:items-center`}
        >
          <div className="relative z-10 flex w-full items-center py-12 md:h-full md:max-w-xl md:py-0">
            <BrandContent />
          </div>
          <BrandMobileSlider />
          <BrandCollageGallery />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative z-20 overflow-visible bg-[#ececea]"
      style={{ height: `calc(100vh + ${GALLERY_SCROLL_TRAVEL}px)` }}
    >
      <div className="relative sticky top-0 h-screen overflow-hidden">
        <AbstractSectionBackground
          scrollYProgress={scrollYProgress}
          variant="brand"
          baseColor="#ececea"
          lineGradientId="brand-section-line"
        />
        <div className={`${SECTION_CONTAINER_CLASS} relative z-10 h-full`}>
          <div className="relative z-10 flex h-full w-full max-w-xl items-center">
            <BrandContent progress={lineProgress} buttonBg={buttonBg} />
          </div>

          <BrandCollageGallery
            scrollY={galleryScrollY}
            scrollYProgress={scrollYProgress}
          />
        </div>
      </div>
    </section>
  );
}
