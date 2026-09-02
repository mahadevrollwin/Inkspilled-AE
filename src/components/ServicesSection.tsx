"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { useStaticLayout } from "@/hooks/useStaticLayout";
import ServicesIntroPattern from "@/components/ServicesIntroPattern";

function ColorDividerLine() {
  return (
    <>
      <span className="h-full w-1/3 bg-ink-red" />
      <span className="h-full w-1/3 bg-[#4caf50]" />
      <span className="h-full w-1/3 bg-ink-blue" />
    </>
  );
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

function RevealWord({
  children,
  opacity,
  y,
  hoverClassName,
}: {
  children: React.ReactNode;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  hoverClassName?: string;
}) {
  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block cursor-default text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.85)] transition-all duration-300 ${
        hoverClassName ? `pointer-events-auto ${hoverClassName}` : ""
      }`}
    >
      {children}
    </motion.span>
  );
}

type Service = {
  title: string;
  href: string;
  tagline: string;
  description: string;
  items: [string, string, string, string];
  image: string;
  backgroundImage: string;
  imageClassName?: string;
};

const SERVICES: Service[] = [
  {
    title: "Branding & Design",
    href: "/services/branding-design",
    tagline: "The Soul Made Visible.",
    description:
      "A Brand Is Not A Simple Logo; It's A Feeling. We Design Visual Identities That Resonate Instantly, Making Your Audience Care Before They Even Click.",
    items: [
      "Logo Design",
      "Event Branding Services",
      "Brochure & Catalogue Design",
      "Packaging Design Services",
    ],
    image: "/services/branding.png",
    backgroundImage: "/services/backgrounds/branding-design.png",
  },
  {
    title: "Film & Production",
    href: "/services/films-production",
    tagline: "Make Them Feel It.",
    description:
      "Moving Pictures Should Actually Move People. From Concept To Final Cut, We Produce Cinematic Stories That Captivate Your Audience And Refuse To Be Ignored.",
    items: [
      "Corporate & Brand Films",
      "Product & E-Commerce Videos",
      "Ad Films & TVCs",
      "Documentaries & Short Films",
    ],
    image: "/services/film.png",
    backgroundImage: "/services/backgrounds/film-production.png",
  },
  {
    title: "AI & CGI",
    href: "/services/ai-cg",
    tagline: "Culture, Not Just Content",
    description:
      "Don't Just Exist in Their Feed; Dominate It. We Turn Passive Scrollers Into Passionate Advocates By Sparking Conversations That Actually Matter.",
    items: [
      "Instagram Marketing",
      "LinkedIn Marketing",
      "Facebook Marketing",
      "YouTube Marketing",
    ],
    image: "/services/ai-cgi.png",
    backgroundImage: "/services/backgrounds/ai-cgi.png",
  },
  {
    title: "Strategy & Planning",
    href: "/services/strategy-planning",
    tagline: "Precision Before Production",
    description:
      "Creativity needs a compass. We build the tactical architecture of your brand, ensuring every move you make hits exactly where it needs to.",
    items: [
      "Brand Strategy & Identity",
      "Creative Campaign Strategy",
      "Content Strategy",
      "YouTube Marketing",
    ],
    image: "/services/strategy.png",
    backgroundImage: "/services/backgrounds/strategy-planning.png",
  },
  {
    title: "Social Media Marketing",
    href: "/services/social-media-marketing",
    tagline: "Culture, Not Just Content.",
    description:
      "Don't Just Exist In Their Feed—Dominate It. We Turn Passive Scrollers Into Passionate Advocates By Sparking Conversations That Actually Matter.",
    items: [
      "Instagram Marketing",
      "Facebook Marketing",
      "LinkedIn Marketing",
      "YouTube Marketing",
    ],
    image: "/services/social-media-marketing.png",
    backgroundImage: "/services/backgrounds/social-media-marketing.png",
  },
  {
    title: "Digital Marketing",
    href: "/services/digital-marketing",
    tagline: "Traffic That Transforms Trends.",
    description:
      "Clicks Are Cheap; Conversions Are An Art Form. We Turn Algorithms Into Your Unfair Advantage, Transforming Targeted Data Into Undeniable Revenue.",
    items: [
      "SEO Services",
      "Google Ads & PPC Services",
      "Meta Ads Services",
      "Analytics & Reporting",
    ],
    image: "/services/digital-marketing.png",
    backgroundImage: "/services/backgrounds/digital-marketing.png",
  },
  {
    title: "UI, UX Design & Development",
    href: "/services/website-design-development",
    tagline: "Your Digital Flagship.",
    description:
      "A Website Shouldn't Just Be A Brochure; It Should Be A Destination. We Design Seamless Digital Journeys That Look Breathtaking And Convert Ruthlessly.",
    items: [
      "UI/UX Design & Development",
      "Website Redesign Services",
      "Responsive Web Development",
      "E-Commerce Development",
    ],
    image: "/services/web-design-development.png",
    backgroundImage: "/services/backgrounds/web-design-development.png",
  },
];

const SERVICE_SCROLL_START = 0.626;
const SERVICE_SCROLL_END = 0.82;
const CAROUSEL_STEP_HOLD = 0.5;
const CAROUSEL_STEP_TRANSITION = 0.44;
const CAROUSEL_FINAL_HOLD = 0.9;
const SERVICE_CONTENT_FADE_RANGE = 0.95;

const CARD_GAP = 50;
const CARD_ACTIVE_WIDTH = 420;
const CARD_INACTIVE_WIDTH = 325;
const CARD_ACTIVE_HEIGHT = 425;
const CARD_INACTIVE_HEIGHT = 325;

const CARD_SLOTS = [
  { x: 0, width: CARD_ACTIVE_WIDTH, height: CARD_ACTIVE_HEIGHT, zIndex: 30 },
  {
    x: CARD_ACTIVE_WIDTH + CARD_GAP,
    width: CARD_INACTIVE_WIDTH,
    height: CARD_INACTIVE_HEIGHT,
    zIndex: 20,
  },
  {
    x: CARD_ACTIVE_WIDTH + CARD_GAP + CARD_INACTIVE_WIDTH + CARD_GAP,
    width: CARD_INACTIVE_WIDTH,
    height: CARD_INACTIVE_HEIGHT,
    zIndex: 10,
  },
] as const;

const CAROUSEL_VIEWPORT_WIDTH =
  CARD_SLOTS[0].width +
  CARD_GAP +
  CARD_SLOTS[1].width +
  CARD_GAP +
  CARD_SLOTS[2].width / 2;

const MAX_CAROUSEL_SEGMENT = SERVICES.length - 1;

const HIDDEN_CARD_SLOT = {
  x: CARD_SLOTS[2].x + CARD_INACTIVE_WIDTH + CARD_GAP,
  width: CARD_INACTIVE_WIDTH,
  height: CARD_INACTIVE_HEIGHT,
  zIndex: 0,
};

function isVisibleCarouselSlot(slot: number) {
  return slot < CARD_SLOTS.length;
}

function slotLayout(slot: number) {
  return isVisibleCarouselSlot(slot) ? CARD_SLOTS[slot] : HIDDEN_CARD_SLOT;
}

const SERVICE_CARD_SHELL_CLASS =
  "overflow-hidden rounded-[28px] rounded-tr-none border-[5px] border-white shadow-2xl";

const SERVICE_CARD_FACE_CLASS =
  "relative h-full w-full overflow-hidden rounded-[22px] rounded-tr-none";

const SECTION_CONTENT_ALIGN_CLASS =
  "ml-[max(0px,calc((100vw-1400px)/2))] pl-6 md:pl-10";

const SERVICE_LIST_ITEM_CLASS =
  "relative pl-4 font-body text-[3.1vw] text-white/55 before:absolute before:left-0 before:text-white/35 before:content-['•'] md:text-sm";

const CARD_EXIT_LEFT_OFFSET = 180;
const CARD_EXIT_PHASE_END = 0.45;
const INACTIVE_CARD_OPACITY = 0.5;
const INACTIVE_CARD_BLUR_PX = 2;

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function getActiveServiceIndex(progress: number) {
  const clamped = Math.min(Math.max(progress, 0), MAX_CAROUSEL_SEGMENT);

  if (Math.abs(clamped - Math.round(clamped)) < 0.015) {
    return Math.round(clamped);
  }

  const base = Math.floor(clamped);
  const fractional = clamped - base;

  if (fractional < 0.5) {
    return Math.min(base, MAX_CAROUSEL_SEGMENT);
  }

  return Math.min(base + 1, MAX_CAROUSEL_SEGMENT);
}

function getRestServiceIndex(progress: number) {
  return Math.min(
    Math.max(Math.round(progress), 0),
    MAX_CAROUSEL_SEGMENT,
  );
}

function isCarouselAtRest(progress: number) {
  const clamped = Math.min(Math.max(progress, 0), MAX_CAROUSEL_SEGMENT);
  return (
    Math.abs(clamped - Math.round(clamped)) < 0.035 ||
    clamped >= MAX_CAROUSEL_SEGMENT - 0.035
  );
}

function mapScrollToCarouselProgress(normalizedScroll: number) {
  const clamped = Math.min(Math.max(normalizedScroll, 0), 1);
  const totalTimeline =
    MAX_CAROUSEL_SEGMENT * (CAROUSEL_STEP_HOLD + CAROUSEL_STEP_TRANSITION) +
    CAROUSEL_FINAL_HOLD;
  const position = clamped * totalTimeline;

  let cursor = 0;

  for (let index = 0; index <= MAX_CAROUSEL_SEGMENT; index++) {
    const holdWeight =
      index === MAX_CAROUSEL_SEGMENT
        ? CAROUSEL_FINAL_HOLD
        : CAROUSEL_STEP_HOLD;

    if (position <= cursor + holdWeight) {
      return index;
    }

    cursor += holdWeight;

    if (index < MAX_CAROUSEL_SEGMENT) {
      if (position <= cursor + CAROUSEL_STEP_TRANSITION) {
        const transitionT =
          (position - cursor) / CAROUSEL_STEP_TRANSITION;
        return index + smoothstep(transitionT);
      }

      cursor += CAROUSEL_STEP_TRANSITION;
    }
  }

  return MAX_CAROUSEL_SEGMENT;
}

function getCardVisualState(cardIndex: number, progress: number) {
  const clamped = Math.min(Math.max(progress, 0), MAX_CAROUSEL_SEGMENT);

  if (isCarouselAtRest(clamped)) {
    const restIndex = getRestServiceIndex(clamped);
    const queueSlot =
      (cardIndex - restIndex + SERVICES.length) % SERVICES.length;
    const layout = slotLayout(queueSlot);
    const visible = isVisibleCarouselSlot(queueSlot);

    return {
      x: layout.x,
      width: layout.width,
      height: layout.height,
      zIndex: layout.zIndex,
      opacity: visible ? 1 : 0,
      scale: 1,
      slot: visible ? queueSlot : -1,
    };
  }

  const segment = Math.min(Math.floor(clamped), MAX_CAROUSEL_SEGMENT - 1);
  const t = clamped - segment;
  const fromSlot = (cardIndex - segment + SERVICES.length) % SERVICES.length;
  const toSlot =
    (cardIndex - (segment + 1) + SERVICES.length) % SERVICES.length;
  const from = slotLayout(fromSlot);
  const to = slotLayout(toSlot);
  const eased = smoothstep(t);

  if (fromSlot === 0) {
    if (t < CARD_EXIT_PHASE_END) {
      const exitT = smoothstep(t / CARD_EXIT_PHASE_END);

      return {
        x: -CARD_EXIT_LEFT_OFFSET * exitT,
        width: from.width,
        height: from.height,
        zIndex: 50,
        opacity: 1 - exitT,
        scale: 1 - exitT * 0.1,
        slot: 0,
      };
    }

    const settleT = smoothstep(
      (t - CARD_EXIT_PHASE_END) / (1 - CARD_EXIT_PHASE_END),
    );

    return {
      x: to.x,
      width: to.width,
      height: to.height,
      zIndex: to.zIndex,
      opacity: isVisibleCarouselSlot(toSlot) ? settleT : 0,
      scale: 1,
      slot: isVisibleCarouselSlot(toSlot) ? toSlot : -1,
    };
  }

  if (toSlot === 0) {
    const activeHandoff = t >= 0.5;
    const handoffT = smoothstep(Math.min(Math.max((t - 0.5) / 0.5, 0), 1));

    return {
      x: from.x + (to.x - from.x) * eased,
      width: from.width + (to.width - from.width) * eased,
      height: from.height + (to.height - from.height) * eased,
      zIndex: activeHandoff ? to.zIndex : from.zIndex,
      opacity: isVisibleCarouselSlot(fromSlot) ? 1 : eased,
      scale: 0.97 + handoffT * 0.03,
      slot: activeHandoff ? 0 : fromSlot,
    };
  }

  if (!isVisibleCarouselSlot(fromSlot) && isVisibleCarouselSlot(toSlot)) {
    return {
      x: to.x,
      width: to.width,
      height: to.height,
      zIndex: to.zIndex,
      opacity: eased,
      scale: 0.95 + eased * 0.05,
      slot: toSlot,
    };
  }

  if (isVisibleCarouselSlot(fromSlot) && !isVisibleCarouselSlot(toSlot)) {
    return {
      x: from.x + (to.x - from.x) * eased,
      width: from.width + (to.width - from.width) * eased,
      height: from.height + (to.height - from.height) * eased,
      zIndex: from.zIndex,
      opacity: 1 - eased,
      scale: 1,
      slot: fromSlot,
    };
  }

  return {
    x: from.x + (to.x - from.x) * eased,
    width: from.width + (to.width - from.width) * eased,
    height: from.height + (to.height - from.height) * eased,
    zIndex: t < 0.5 ? from.zIndex : to.zIndex,
    opacity: 1,
    scale: 1,
    slot: t < 0.5 ? fromSlot : toSlot,
  };
}

function serviceContentMotion(index: number, progress: number) {
  const offset = progress - index;
  const distance = Math.abs(offset);

  if (distance >= SERVICE_CONTENT_FADE_RANGE) {
    return { opacity: 0, y: offset > 0 ? 28 : -28 };
  }

  const opacity = Math.max(
    0,
    1 - smoothstep(distance / SERVICE_CONTENT_FADE_RANGE),
  );
  const y = offset * 24 * (1 - opacity * 0.4);

  return { opacity, y };
}

function serviceOpacityForIndex(index: number, progress: number): number {
  return serviceContentMotion(index, progress).opacity;
}

function serviceYForIndex(index: number, progress: number): number {
  return serviceContentMotion(index, progress).y;
}

const SERVICE_BACKGROUND_WIDTH = 1024;
const SERVICE_BACKGROUND_HEIGHT = 393;
const SERVICE_BACKGROUND_IMAGE_CLASS =
  "block h-auto w-full max-w-[1600px] object-left";
const SERVICE_BACKGROUND_WRAPPER_CLASS = "absolute left-0 top-16 w-full";

function ServiceBackgroundImage({ src, className }: { src: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={SERVICE_BACKGROUND_WIDTH}
      height={SERVICE_BACKGROUND_HEIGHT}
      decoding="async"
      draggable={false}
      className={className ?? "block h-auto w-full max-w-[1024px] object-left"}
    />
  );
}

const CAROUSEL_DRAG_PIXELS_PER_STEP = CARD_ACTIVE_WIDTH + CARD_GAP;
const CAROUSEL_DRAG_CLICK_THRESHOLD = 6;

type CarouselDragHandlers = {
  onPointerDownCapture: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerCancel: (event: React.PointerEvent<HTMLElement>) => void;
  onClickCapture: (event: React.MouseEvent<HTMLElement>) => void;
  onCardClick: (
    cardIndex: number,
  ) => (event: React.MouseEvent<HTMLElement>) => void;
};

function useCarouselProgress(scrollYProgress: MotionValue<number>) {
  const scrollCarouselTarget = useTransform(scrollYProgress, (value) => {
    if (value < SERVICE_SCROLL_START) return 0;

    const normalized = Math.min(
      (value - SERVICE_SCROLL_START) /
        (SERVICE_SCROLL_END - SERVICE_SCROLL_START),
      1,
    );

    return mapScrollToCarouselProgress(normalized);
  });

  const carouselProgressTarget = useMotionValue(0);
  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const didDragRef = useRef(false);
  const dragStartRef = useRef({ x: 0, progress: 0 });

  useMotionValueEvent(scrollCarouselTarget, "change", (latest) => {
    if (!isDraggingRef.current) {
      carouselProgressTarget.set(latest);
    }
  });

  const carouselProgress = useSpring(carouselProgressTarget, {
    stiffness: 400,
    damping: 40,
    mass: 1,
  });

  const finishDrag = (event: React.PointerEvent<HTMLElement>) => {
    if (!isPointerDownRef.current && !isDraggingRef.current) {
      return;
    }

    isPointerDownRef.current = false;

    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      carouselProgressTarget.set(Math.round(carouselProgressTarget.get()));
    }
  };

  const carouselDragHandlers: CarouselDragHandlers = {
    onPointerDownCapture: (event) => {
      if (event.button !== 0) {
        return;
      }

      isPointerDownRef.current = true;
      isDraggingRef.current = false;
      didDragRef.current = false;
      dragStartRef.current = {
        x: event.clientX,
        progress: carouselProgressTarget.get(),
      };
    },
    onPointerMove: (event) => {
      if (!isPointerDownRef.current) {
        return;
      }

      const deltaX = event.clientX - dragStartRef.current.x;

      if (Math.abs(deltaX) <= CAROUSEL_DRAG_CLICK_THRESHOLD && !isDraggingRef.current) {
        return;
      }

      if (!isDraggingRef.current) {
        isDraggingRef.current = true;
        didDragRef.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
      }

      const next = Math.min(
        Math.max(
          dragStartRef.current.progress - deltaX / CAROUSEL_DRAG_PIXELS_PER_STEP,
          0,
        ),
        MAX_CAROUSEL_SEGMENT,
      );

      carouselProgressTarget.set(next);
      carouselProgress.jump(next);
    },
    onPointerUp: finishDrag,
    onPointerCancel: finishDrag,
    onClickCapture: (event) => {
      if (!didDragRef.current) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      didDragRef.current = false;
    },
    onCardClick: (cardIndex) => (event) => {
      if (didDragRef.current) {
        event.preventDefault();
        return;
      }

      if (event.defaultPrevented) {
        return;
      }

      event.preventDefault();
      window.open(SERVICES[cardIndex].href, "_blank", "noopener,noreferrer");
    },
  };

  return { carouselProgress, carouselDragHandlers };
}

function SyncedServiceBackground({
  index,
  carouselProgress,
}: {
  index: number;
  carouselProgress: MotionValue<number>;
}) {
  const opacity = useTransform(carouselProgress, (progress) =>
    serviceOpacityForIndex(index, progress),
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0" aria-hidden>
      <div className={SERVICE_BACKGROUND_WRAPPER_CLASS}>
        <ServiceBackgroundImage
          src={SERVICES[index].backgroundImage}
          className={SERVICE_BACKGROUND_IMAGE_CLASS}
        />
      </div>
    </motion.div>
  );
}

function ServiceBackgroundPanel({
  carouselProgress,
  panelOpacity,
}: {
  carouselProgress: MotionValue<number>;
  panelOpacity: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ opacity: panelOpacity }}
      className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[58%] max-w-[820px] overflow-hidden md:block"
      aria-hidden
    >
      {SERVICES.map((service, index) => (
        <SyncedServiceBackground
          key={service.title}
          index={index}
          carouselProgress={carouselProgress}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-[#141414]/30 to-[#141414]" />
    </motion.div>
  );
}

function StaticServiceBackground({ service }: { service: Service }) {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-[58%] max-w-[820px] overflow-hidden md:block"
      aria-hidden
    >
      <div className={SERVICE_BACKGROUND_WRAPPER_CLASS}>
        <ServiceBackgroundImage
          src={service.backgroundImage}
          className={SERVICE_BACKGROUND_IMAGE_CLASS}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-[#141414]/30 to-[#141414]" />
    </div>
  );
}

function MobileServiceBackground({ activeIndex }: { activeIndex: number }) {
  const service = SERVICES[activeIndex];

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(62vw,420px)] overflow-hidden md:hidden"
      aria-hidden
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={service.backgroundImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <ServiceBackgroundImage src={service.backgroundImage} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-[#141414]/55" />
    </div>
  );
}

type LetterReveal = {
  opacity: MotionValue<number>;
  x: MotionValue<number>;
};

type WordReveal = {
  opacity: MotionValue<number>;
  x: MotionValue<number>;
};

function IntroText({
  yourLetters,
  creativeOpacity,
  creativeY,
  digitalOpacity,
  digitalY,
  agencyOpacity,
  agencyY,
  sublineWords,
  wrapperOpacity,
  wrapperScale,
}: {
  yourLetters: LetterReveal[];
  creativeOpacity: MotionValue<number>;
  creativeY: MotionValue<number>;
  digitalOpacity: MotionValue<number>;
  digitalY: MotionValue<number>;
  agencyOpacity: MotionValue<number>;
  agencyY: MotionValue<number>;
  sublineWords: WordReveal[];
  wrapperOpacity: MotionValue<number>;
  wrapperScale: MotionValue<number>;
}) {
  const yourLabel = "Your";
  const sublineLabel = "From Scalability & Growth";
  const sublineParts = ["From", "Scalability", "&", "Growth"];
  const introVisibility = useTransform(wrapperOpacity, (value) =>
    value > 0 ? "visible" : "hidden",
  );

  return (
    <motion.div
      style={{ opacity: wrapperOpacity, scale: wrapperScale, visibility: introVisibility }}
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6"
    >
      <div className="w-full max-w-4xl text-left">
        <p
          aria-label={yourLabel}
          className="mb-3 font-display text-[40px] font-bold leading-none text-white"
        >
          {yourLabel.split("").map((letter, index) => (
            <RevealLetter
              key={`${letter}-${index}`}
              opacity={yourLetters[index].opacity}
              x={yourLetters[index].x}
            >
              {letter}
            </RevealLetter>
          ))}
        </p>

        <h2
          aria-hidden
          className="pointer-events-auto font-proxima-nova text-[80px] font-extrabold leading-[1.05]"
        >
          <RevealWord
            hoverClassName="hover:text-[#EE3328] hover:[-webkit-text-stroke:1.5px_#EE3328]"
            opacity={creativeOpacity}
            y={creativeY}
          >
            Creative
          </RevealWord>{" "}
          <RevealWord
            hoverClassName="hover:text-[#79C146] hover:[-webkit-text-stroke:1.5px_#79C146]"
            opacity={digitalOpacity}
            y={digitalY}
          >
            Digital
          </RevealWord>{" "}
          <RevealWord
            hoverClassName="hover:text-[#127DC2] hover:[-webkit-text-stroke:1.5px_#127DC2]"
            opacity={agencyOpacity}
            y={agencyY}
          >
            Agency
          </RevealWord>
        </h2>

        <p
          aria-label={sublineLabel}
          className="mt-5 text-right font-display text-[40px] font-bold leading-none text-[#fff]"
        >
          {sublineParts.map((word, index) => (
            <span key={`${word}-${index}`}>
              <RevealLetter
                opacity={sublineWords[index].opacity}
                x={sublineWords[index].x}
              >
                {word}
              </RevealLetter>
              {index < sublineParts.length - 1 ? " " : null}
            </span>
          ))}
        </p>
      </div>
    </motion.div>
  );
}

function ServiceCardFace({ service }: { service: Service }) {
  return (
    <div className={SERVICE_CARD_FACE_CLASS}>
      <Image
        src={service.image}
        alt={service.title}
        fill
        className={`pointer-events-none object-cover object-center ${service.imageClassName ?? ""}`}
        sizes="420px"
      />
    </div>
  );
}

function openServicePage(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

function ServiceCardLink({
  service,
  pointerEvents,
  cursor,
}: {
  service: Service;
  pointerEvents?: MotionValue<"auto" | "none">;
  cursor?: MotionValue<"pointer" | "default">;
}) {
  const className = `block h-full w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white`;
  const ariaLabel = `Open ${service.title} page`;

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    openServicePage(service.href);
  }

  const link = (
    <a
      href={service.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      <ServiceCardFace service={service} />
    </a>
  );

  if (pointerEvents) {
    return (
      <motion.div style={{ pointerEvents, cursor }} className="h-full w-full">
        {link}
      </motion.div>
    );
  }

  return link;
}

function AnimatedServiceCard({
  service,
  cardIndex,
  carouselProgress,
  carouselDragHandlers,
}: {
  service: Service;
  cardIndex: number;
  carouselProgress: MotionValue<number>;
  carouselDragHandlers: CarouselDragHandlers;
}) {
  const { onCardClick, ...cardDragHandlers } = carouselDragHandlers;
  const x = useTransform(carouselProgress, (progress) =>
    getCardVisualState(cardIndex, progress).x,
  );
  const width = useTransform(carouselProgress, (progress) =>
    getCardVisualState(cardIndex, progress).width,
  );
  const height = useTransform(carouselProgress, (progress) =>
    getCardVisualState(cardIndex, progress).height,
  );
  const zIndex = useTransform(carouselProgress, (progress) =>
    getCardVisualState(cardIndex, progress).zIndex,
  );
  const cardOpacity = useTransform(carouselProgress, (progress) => {
    const state = getCardVisualState(cardIndex, progress);

    if (state.opacity <= 0 || state.slot < 0) {
      return state.opacity;
    }

    if (state.slot === 0) {
      return state.opacity;
    }

    return state.opacity * INACTIVE_CARD_OPACITY;
  });
  const cardBlur = useTransform(carouselProgress, (progress) => {
    const state = getCardVisualState(cardIndex, progress);

    if (state.slot > 0 && state.opacity > 0.01) {
      return INACTIVE_CARD_BLUR_PX;
    }

    return 0;
  });
  const cardFilter = useTransform(cardBlur, (blur) => `blur(${blur}px)`);
  const cardScale = useTransform(carouselProgress, (progress) =>
    getCardVisualState(cardIndex, progress).scale,
  );
  const cardPointerEvents = useTransform(carouselProgress, (progress) => {
    const state = getCardVisualState(cardIndex, progress);
    return state.opacity > 0.01 ? "auto" : "none";
  });
  const cardCursor = useTransform(carouselProgress, (progress) => {
    const state = getCardVisualState(cardIndex, progress);
    return state.opacity > 0.01 ? "pointer" : "default";
  });

  return (
    <motion.div
      {...cardDragHandlers}
      onClick={onCardClick(cardIndex)}
      style={{
        x,
        width,
        height,
        zIndex,
        opacity: cardOpacity,
        scale: cardScale,
        filter: cardFilter,
        transformOrigin: "bottom left",
        pointerEvents: cardPointerEvents,
        cursor: cardCursor,
      }}
      className={`absolute bottom-0 left-0 ${SERVICE_CARD_SHELL_CLASS}`}
    >
      <ServiceCardLink
        service={service}
        pointerEvents={cardPointerEvents}
        cursor={cardCursor}
      />
    </motion.div>
  );
}

function ServiceCardCarousel({
  carouselProgress,
  carouselDragHandlers,
}: {
  carouselProgress: MotionValue<number>;
  carouselDragHandlers: CarouselDragHandlers;
}) {
  const { onCardClick: _onCardClick, ...containerDragHandlers } =
    carouselDragHandlers;

  return (
    <div className="w-full overflow-hidden">
      <div
        className="relative ml-auto h-[425px] cursor-grab touch-none active:cursor-grabbing"
        style={{
          width: CAROUSEL_VIEWPORT_WIDTH,
          clipPath: `inset(0 0 0 -${CARD_EXIT_LEFT_OFFSET}px)`,
        }}
        {...containerDragHandlers}
      >
        {SERVICES.map((service, index) => (
          <AnimatedServiceCard
            key={service.title}
            service={service}
            cardIndex={index}
            carouselProgress={carouselProgress}
            carouselDragHandlers={carouselDragHandlers}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  size = "large",
  clickable = false,
  inactive = false,
}: {
  service: Service;
  size?: "large" | "medium" | "small";
  clickable?: boolean;
  inactive?: boolean;
}) {
  const sizeClass =
    size === "large"
      ? "h-[425px] w-[420px]"
      : size === "medium"
        ? "h-[325px] w-[325px]"
        : "h-[325px] w-[325px]";

  return (
    <div
      className={`${sizeClass} relative shrink-0 ${SERVICE_CARD_SHELL_CLASS} ${
        inactive ? "opacity-50 blur-[2px]" : ""
      }`}
    >
      {clickable ? (
        <ServiceCardLink service={service} />
      ) : (
        <ServiceCardFace service={service} />
      )}
    </div>
  );
}

function ServiceDetails({
  service,
  opacity,
  y,
}: {
  service: Service;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}) {
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0">
      <h3 className="font-display text-3xl font-bold text-white md:text-4xl">
        {service.title}
      </h3>
      <p className="mt-2 font-body text-base text-white/70 md:text-lg">
        {service.tagline}
      </p>

      <div className="mt-5 flex h-[3px] w-full max-w-xs">
        <ColorDividerLine />
      </div>

      <p className="mt-5 font-body text-sm leading-relaxed text-white/65 md:text-[15px]">
        {service.description}
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2">
        {service.items.map((item) => (
          <li key={item} className={SERVICE_LIST_ITEM_CLASS}>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function SyncedServiceDetails({
  index,
  carouselProgress,
}: {
  index: number;
  carouselProgress: MotionValue<number>;
}) {
  const opacity = useTransform(carouselProgress, (progress) =>
    serviceOpacityForIndex(index, progress),
  );
  const y = useTransform(carouselProgress, (progress) =>
    serviceYForIndex(index, progress),
  );

  return (
    <ServiceDetails service={SERVICES[index]} opacity={opacity} y={y} />
  );
}

function ServicesContent({
  carouselProgress,
  opacity,
  y,
  carouselDragHandlers,
}: {
  carouselProgress: MotionValue<number>;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  carouselDragHandlers: CarouselDragHandlers;
}) {
  const pointerEvents = useTransform(opacity, (value) =>
    value > 0.15 ? "auto" : "none",
  );

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="relative z-10 w-full"
    >
      <div className="mx-auto mb-10 max-w-[1400px] px-6 text-center md:mb-14 md:px-10 lg:px-14">
        <p className="font-display text-[30px] font-medium leading-none text-[#fff] md:text-[40px]">
          Seven Disciplines. One Obsession: Your{" "}
          <span className="text-[50px] font-bold leading-none md:text-[80px]">Growth</span>
        </p>
      </div>

      <div className="flex w-full items-center gap-6 lg:gap-10">
        <div
          className={`relative z-10 min-h-[320px] w-full max-w-md shrink-0 ${SECTION_CONTENT_ALIGN_CLASS}`}
        >
          {SERVICES.map((service, index) => (
            <SyncedServiceDetails
              key={service.title}
              index={index}
              carouselProgress={carouselProgress}
            />
          ))}
        </div>

        <div className="min-w-0 flex-1 pr-0 overflow-visible">
          <ServiceCardCarousel
            carouselProgress={carouselProgress}
            carouselDragHandlers={carouselDragHandlers}
          />
        </div>
      </div>
    </motion.div>
  );
}

function StaticServiceContent({ service }: { service: Service }) {
  return (
    <>
      <h3 className="text-center font-display text-[6.8vw] font-bold leading-[1.05] text-white md:text-left md:text-4xl md:leading-normal">
        {service.title}
      </h3>
      <p className="mt-[1.8vw] text-center font-body text-[3.7vw] text-white/70 md:mt-2 md:text-left md:text-lg">
        {service.tagline}
      </p>
      <div className="relative mx-auto mt-[4vw] w-fit md:hidden">
        <span
          aria-hidden
          className="invisible block whitespace-nowrap font-proxima-nova text-[7.4vw] font-extrabold leading-none"
        >
          Creative Digital Agency
        </span>
        <div className="absolute inset-x-0 top-1/2 flex h-[3px] -translate-y-1/2">
          <ColorDividerLine />
        </div>
      </div>
      <div className="mt-5 hidden h-[3px] w-full max-w-xs md:flex">
        <ColorDividerLine />
      </div>
      <p className="mt-[4vw] text-center font-body text-[3.35vw] leading-relaxed text-white/65 md:mt-5 md:text-left md:text-[15px]">
        {service.description}
      </p>
      <ul className="mx-auto mt-[5vw] grid w-fit grid-cols-2 gap-x-[5vw] gap-y-[1.4vw] md:mx-0 md:mt-6 md:gap-x-6 md:gap-y-2">
        {service.items.map((item) => (
          <li key={item} className={SERVICE_LIST_ITEM_CLASS}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function ServicesMobileSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = SERVICES.length;
  const service = SERVICES[activeIndex];
  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === total - 1;

  const goTo = (index: number) => {
    setActiveIndex(Math.min(Math.max(index, 0), total - 1));
  };

  const arrowButtonClass =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#141414] shadow-md transition-opacity enabled:hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="relative w-full md:hidden">
      <MobileServiceBackground activeIndex={activeIndex} />
      <div className="w-full px-6">
        <StaticServiceContent service={service} />
      </div>

      <div className="relative mt-8 w-full px-6 pb-8">
        <div
          className={`relative mx-auto aspect-[420/425] w-full max-w-none ${SERVICE_CARD_SHELL_CLASS}`}
        >
          <ServiceCardLink service={service} />

          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            disabled={isFirstSlide}
            aria-label="Previous service"
            className={`${arrowButtonClass} left-3`}
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
            disabled={isLastSlide}
            aria-label="Next service"
            className={`${arrowButtonClass} right-3`}
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
    </div>
  );
}

function StaticServices() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#141414] py-24">
      <StaticServiceBackground service={SERVICES[0]} />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-[10vw] text-center md:mb-14">
          <div className="md:hidden">
            <p className="services-mobile-text-subtle font-display text-[4.6vw] font-medium leading-none text-[#fff]">
              Your
            </p>
            <h2 className="services-mobile-text-subtle mt-[2.4vw] font-proxima-nova text-[7.4vw] font-extrabold leading-[1.05] text-white">
              Creative Digital Agency
            </h2>
            <p className="services-mobile-text-subtle mt-[2vw] font-display text-[4vw] font-bold leading-none text-[#fff]">
              For Scalability & Growth
            </p>
          </div>

          <div className="hidden md:block">
            <p className="font-display text-[40px] font-medium leading-none text-[#fff]">
              Seven Disciplines. One Obsession: Your{" "}
              <span className="text-[80px] font-bold leading-none">Growth</span>
            </p>
            <h2 className="mt-8 font-proxima-nova text-[80px] font-extrabold leading-[1.05] text-white">
              Your{" "}
              <span className="text-white">Creative</span>{" "}
              <span className="text-white">Digital</span>{" "}
              <span className="text-white">Agency</span>
            </h2>
            <p className="mt-3 font-display text-[40px] font-bold leading-none text-[#fff]">
              From Scalability & Growth
            </p>
          </div>
        </div>

        <ServicesMobileSlider />

        <div className="hidden w-full items-center gap-12 md:flex">
          <div className={`w-full max-w-md shrink-0 ${SECTION_CONTENT_ALIGN_CLASS}`}>
            <StaticServiceContent service={SERVICES[0]} />
          </div>
          <div className="min-w-0 flex-1 overflow-hidden pr-0">
            <div className="w-full overflow-hidden">
              <div
                className="ml-auto overflow-hidden"
                style={{ width: CAROUSEL_VIEWPORT_WIDTH }}
              >
                <div className="flex items-end" style={{ gap: CARD_GAP }}>
                  {SERVICES.map((s, index) => (
                    <ServiceCard
                      key={s.title}
                      service={s}
                      size={index === 0 ? "large" : index === 1 ? "medium" : "small"}
                      clickable
                      inactive={index !== 0}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isStaticLayout = useStaticLayout();
 
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const introWrapperOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.139, 0.392, 0.451],
    [0, 1, 1, 0],
  );
  const introWrapperScale = useTransform(scrollYProgress, [0.392, 0.451], [1, 0.82]);

  const yOpacity = useTransform(scrollYProgress, [0.139, 0.154], [0, 1]);
  const yX = useTransform(scrollYProgress, [0.139, 0.154], [-16, 0]);
  const oOpacity = useTransform(scrollYProgress, [0.154, 0.169], [0, 1]);
  const oX = useTransform(scrollYProgress, [0.154, 0.169], [-16, 0]);
  const uOpacity = useTransform(scrollYProgress, [0.169, 0.183], [0, 1]);
  const uX = useTransform(scrollYProgress, [0.169, 0.183], [-16, 0]);
  const rOpacity = useTransform(scrollYProgress, [0.183, 0.198], [0, 1]);
  const rX = useTransform(scrollYProgress, [0.183, 0.198], [-16, 0]);

  const yourLetters = [
    { opacity: yOpacity, x: yX },
    { opacity: oOpacity, x: oX },
    { opacity: uOpacity, x: uX },
    { opacity: rOpacity, x: rX },
  ];

  const creativeOpacity = useTransform(scrollYProgress, [0.198, 0.256], [0, 1]);
  const creativeY = useTransform(scrollYProgress, [0.198, 0.256], [48, 0]);
  const digitalOpacity = useTransform(scrollYProgress, [0.256, 0.314], [0, 1]);
  const digitalY = useTransform(scrollYProgress, [0.256, 0.314], [48, 0]);
  const agencyOpacity = useTransform(scrollYProgress, [0.314, 0.373], [0, 1]);
  const agencyY = useTransform(scrollYProgress, [0.314, 0.373], [48, 0]);
  const fromOpacity = useTransform(scrollYProgress, [0.373, 0.387], [0, 1]);
  const fromX = useTransform(scrollYProgress, [0.373, 0.387], [-20, 0]);
  const scalabilityOpacity = useTransform(scrollYProgress, [0.387, 0.402], [0, 1]);
  const scalabilityX = useTransform(scrollYProgress, [0.387, 0.402], [-20, 0]);
  const ampOpacity = useTransform(scrollYProgress, [0.402, 0.417], [0, 1]);
  const ampX = useTransform(scrollYProgress, [0.402, 0.417], [-20, 0]);
  const growthOpacity = useTransform(scrollYProgress, [0.417, 0.431], [0, 1]);
  const growthX = useTransform(scrollYProgress, [0.417, 0.431], [-20, 0]);

  const sublineWords = [
    { opacity: fromOpacity, x: fromX },
    { opacity: scalabilityOpacity, x: scalabilityX },
    { opacity: ampOpacity, x: ampX },
    { opacity: growthOpacity, x: growthX },
  ];

  const contentOpacity = useTransform(scrollYProgress, [0.451, 0.606], [0, 1], {
    ease: easeOutCubic,
  });
  const contentY = useTransform(scrollYProgress, [0.451, 0.606], [48, 0], {
    ease: easeOutCubic,
  });
  const { carouselProgress, carouselDragHandlers } =
    useCarouselProgress(scrollYProgress);

  if (isStaticLayout) {
    return <StaticServices />;
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative z-20 h-[750vh] overflow-visible bg-[#141414]"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-gradient-to-r from-black via-[#1a1a1a] to-[#2b2b2b]">
        <ServicesIntroPattern opacity={introWrapperOpacity} />

        <ServiceBackgroundPanel
          carouselProgress={carouselProgress}
          panelOpacity={contentOpacity}
        />

        <IntroText
          yourLetters={yourLetters}
          creativeOpacity={creativeOpacity}
          creativeY={creativeY}
          digitalOpacity={digitalOpacity}
          digitalY={digitalY}
          agencyOpacity={agencyOpacity}
          agencyY={agencyY}
          sublineWords={sublineWords}
          wrapperOpacity={introWrapperOpacity}
          wrapperScale={introWrapperScale}
        />

        <ServicesContent
          carouselProgress={carouselProgress}
          opacity={contentOpacity}
          y={contentY}
          carouselDragHandlers={carouselDragHandlers}
        />
      </div>
    </section>
  );
}
