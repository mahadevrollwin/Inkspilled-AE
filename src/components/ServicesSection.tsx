"use client";

import { useMemo, useRef, useState } from "react";
import Image from "@/components/SeoImage";
import { cleanImageSrc } from "@/lib/clean-image-src";
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
import { useDictionary, useLocaleContext } from "@/i18n/locale-context";
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

type ServiceCopy = {
  title: string;
  tagline: string;
  description: string;
  items: string[];
};

type Service = ServiceCopy & {
  href: string;
  image: string;
  backgroundImage: string;
  imageClassName?: string;
  ar: ServiceCopy;
};

const SERVICES: Service[] = [
  {
    title: "Brand & Design",
    href: "/services/branding-design",
    tagline: "The soul made visible.",
    description:
      "A brand isn't a logo, it's a feeling. We design identities that resonate instantly and hold together everywhere, so your audience cares before they even click.",
    items: [
      "Brand Strategy & Positioning",
      "Brand Identity & Logo Design",
      "Motion Identity",
      "Print & Packaging",
      "Event & Environmental Branding",
    ],
    image: "/services/inkspilled-brand-and-design-dubai.png",
    backgroundImage: "/services/backgrounds/inkspilled-brand-design-background.png",
    ar: {
      title: "العلامة والتصميم",
      tagline: "الروح كما تُرى.",
      description:
        "العلامة ليست شعاراً، بل شعور. نصمّم هويات تلامس الجمهور فوراً وتتماسك في كل مكان، فيهتمّون بك قبل أن ينقروا.",
      items: [
        "استراتيجية العلامة والتموضع",
        "الهوية البصرية وتصميم الشعار",
        "الهوية المتحركة",
        "المطبوعات والتغليف",
        "هوية الفعاليات والفراغات",
      ],
    },
  },
  {
    title: "Film & Production",
    href: "/services/films-production",
    tagline: "Make them feel it.",
    description:
      "Moving pictures should actually move people. From concept to final cut, we produce cinematic stories that capture attention and refuse to be ignored.",
    items: [
      "Corporate & Brand Films",
      "Ad Films & TVCs",
      "Product & Ecommerce Videos",
      "Social & Short Form Content",
      "Event & Documentary Films",
      "Photography",
    ],
    image: "/services/inkspilled-film-and-production-dubai.png",
    backgroundImage: "/services/backgrounds/inkspilled-film-production-background.png",
    ar: {
      title: "الأفلام والإنتاج",
      tagline: "اجعلهم يشعرون بها.",
      description:
        "الصورة المتحركة يجب أن تحرّك الناس. من الفكرة إلى القصّ النهائي، ننتج سرداً سينمائياً يخطف الانتباه ويرفض أن يُتجاهل.",
      items: [
        "أفلام الشركات والعلامات",
        "الأفلام الإعلانية والتلفزيونية",
        "فيديوهات المنتجات والتجارة الإلكترونية",
        "المحتوى الاجتماعي والقصير",
        "أفلام الفعاليات والوثائقيات",
        "التصوير الفوتوغرافي",
      ],
    },
  },
  {
    title: "AI & CGI",
    href: "/services/ai-cg",
    tagline: "Beyond the camera",
    description:
      "Some ideas can't be shot, they have to be built. We use AI and CGI to create visuals beyond the reach of a camera: animation, 3D, and imagery that make the impossible look effortless.",
    items: [
      "2D & 3D Animation",
      "Motion Graphics",
      "Explainer & Infographic Videos",
      "AI Content & Visuals",
      "3D Product Visualization",
      "VFX & Compositing",
    ],
    image: "/services/inkspilled-ai-and-cgi-dubai.png",
    backgroundImage: "/services/backgrounds/inkspilled-ai-cgi-background.png",
    ar: {
      title: "الذكاء الاصطناعي والرسوم الحاسوبية",
      tagline: "أبعد من الكاميرا",
      description:
        "بعض الأفكار لا تُصوَّر، بل تُبنى. نستخدم الذكاء الاصطناعي والرسوم الحاسوبية لصنع مشاهد لا تبلغها الكاميرا: حركة، وثلاثي أبعاد، وصور تجعل المستحيل يبدو سهلاً.",
      items: [
        "الرسوم المتحركة ثنائية وثلاثية الأبعاد",
        "الرسوم المتحركة الجرافيكية",
        "فيديوهات الشرح والإنفوجرافيك",
        "المحتوى والصور بالذكاء الاصطناعي",
        "تصوّر المنتجات ثلاثي الأبعاد",
        "المؤثرات البصرية والتركيب",
      ],
    },
  },
  {
    title: "Strategy & Planning",
    href: "/services/strategy-planning",
    tagline: "Precision before production",
    description:
      "Creativity needs a compass. We build the strategic architecture of your brand, so every move you make lands exactly where it needs to.",
    items: [
      "Brand Strategy",
      "Campaign Strategy",
      "Content Strategy",
      "Market & Audience Research",
      "Copywriting & Brand Voice",
    ],
    image: "/services/inkspilled-strategy-and-planning-dubai.png",
    backgroundImage: "/services/backgrounds/inkspilled-strategy-planning-background.png",
    ar: {
      title: "الاستراتيجية والتخطيط",
      tagline: "الدقة قبل الإنتاج",
      description:
        "الإبداع يحتاج بوصلة. نبني الهيكل الاستراتيجي لعلامتك، حتى تقع كل خطوة في مكانها الصحيح.",
      items: [
        "استراتيجية العلامة",
        "استراتيجية الحملات",
        "استراتيجية المحتوى",
        "بحث السوق والجمهور",
        "الكتابة وصوت العلامة",
      ],
    },
  },
  {
    title: "Social Media Marketing",
    href: "/services/social-media-marketing",
    tagline: "Culture, not just content",
    description:
      "Don't just exist in their feed, earn a place in it. We turn passive scrollers into an audience that shows up, engages, and sticks around.",
    items: [
      "Social Media Management",
      "Content Creation",
      "Community Management",
      "Influencer Marketing",
    ],
    image: "/services/inkspilled-social-media-marketing-dubai.png",
    backgroundImage: "/services/backgrounds/inkspilled-social-media-marketing-background.png",
    ar: {
      title: "التسويق عبر التواصل الاجتماعي",
      tagline: "ثقافة، لا مجرد محتوى",
      description:
        "لا تكتفِ بالظهور في الخلاصة، اربح مكاناً فيها. نحوّل المتصفّحين العابرين إلى جمهور يحضر ويتفاعل ويبقى.",
      items: [
        "إدارة حسابات التواصل",
        "صناعة المحتوى",
        "إدارة المجتمع",
        "التسويق عبر المؤثرين",
      ],
    },
  },
  {
    title: "Digital Marketing",
    href: "/services/digital-marketing",
    tagline: "Traffic that transforms.",
    description:
      "Clicks are cheap; conversions are an art form. We turn targeted data into an unfair advantage and attention into undeniable revenue.",
    items: [
      "SEO",
      "Google Ads & PPC",
      "Meta Ads",
      "Email & WhatsApp Marketing",
      "Landing Pages & CRO",
    ],
    image: "/services/inkspilled-digital-marketing-dubai.png",
    backgroundImage: "/services/backgrounds/inkspilled-digital-marketing-background.png",
    ar: {
      title: "التسويق الرقمي",
      tagline: "زيارات تتحوّل.",
      description:
        "النقرات رخيصة، والتحويل فن. نحوّل البيانات المستهدفة إلى أفضلية، والانتباه إلى إيراد لا يُنكر.",
      items: [
        "تحسين محركات البحث",
        "إعلانات جوجل والدفع بالنقرة",
        "إعلانات ميتا",
        "التسويق عبر البريد وواتساب",
        "صفحات الهبوط وتحسين التحويل",
      ],
    },
  },
  {
    title: "Product Design & Development",
    href: "/services/website-design-development",
    tagline: "Our digital flagship",
    description:
      "A website shouldn't just be a brochure, it should be a destination. We design and build seamless digital products that look breathtaking and convert ruthlessly.",
    items: [
      "UX/UI Design",
      "Web Design & Development",
      "Mobile App Design & Development",
      "Ecommerce Development",
      "Web Apps & Platforms",
      "AI Chatbots & Automation",
    ],
    image: "/services/inkspilled-web-design-development-dubai.png",
    backgroundImage: "/services/backgrounds/inkspilled-web-design-development-background.png",
    ar: {
      title: "تصميم وتطوير المنتجات",
      tagline: "منصّتنا الرقمية",
      description:
        "الموقع ليس كتيّباً، بل وجهة. نصمّم ونبني منتجات رقمية سلسة تبهر البصر وتحوّل بلا رحمة.",
      items: [
        "تصميم تجربة وواجهة المستخدم",
        "تصميم وتطوير المواقع",
        "تصميم وتطوير التطبيقات",
        "تطوير المتاجر الإلكترونية",
        "تطبيقات الويب والمنصّات",
        "روبوتات الدردشة والأتمتة",
      ],
    },
  },
];

function localizeService(service: Service, locale: "en" | "ar"): Service {
  if (locale !== "ar") return service;
  return { ...service, ...service.ar };
}

function useLocalizedServices() {
  const { locale } = useLocaleContext();
  return useMemo(
    () => SERVICES.map((service) => localizeService(service, locale)),
    [locale],
  );
}

const SERVICE_SCROLL_START = 0.626;
const SERVICE_SCROLL_END = 0.82;
const INTRO_GROWTH_VISIBLE = 0.431;
const INTRO_HOLD_END = 0.5;
const INTRO_FADE_END = 0.56;
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
  "ms-[max(0px,calc((100vw-1400px)/2))] ps-6 md:ps-10 lg:ps-14";
const SERVICE_SWIPE_THRESHOLD_PX = 56;

const SERVICE_LIST_ITEM_CLASS =
  "relative ps-4 font-body text-[3.1vw] leading-snug text-white/55 before:absolute before:start-0 before:top-[0.45em] before:text-[0.7em] before:leading-none before:text-white/35 before:content-['•'] md:text-[13px]";
const SERVICES_INTRO_SUBLINE_CLASS =
  "mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-white/65 md:mt-5 md:text-[15px]";
const INTRO_TITLE_HOVER = [
  "hover:text-[#EE3328] hover:[-webkit-text-stroke:1.5px_#EE3328]",
  "hover:text-[#79C146] hover:[-webkit-text-stroke:1.5px_#79C146]",
  "hover:text-[#127DC2] hover:[-webkit-text-stroke:1.5px_#127DC2]",
] as const;

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
  "block h-auto w-full max-w-[1600px] object-left rtl:object-right";
const SERVICE_BACKGROUND_WRAPPER_CLASS = "absolute start-0 top-16 w-full";

function ServiceBackgroundImage({ src, className }: { src: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={cleanImageSrc(src)}
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
  const { dir } = useLocaleContext();
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
      const dragDelta = dir === "rtl" ? deltaX : -deltaX;

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
          dragStartRef.current.progress +
            dragDelta / CAROUSEL_DRAG_PIXELS_PER_STEP,
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
      className="pointer-events-none absolute inset-y-0 start-0 z-[1] hidden w-[58%] max-w-[820px] overflow-hidden wide:block"
      aria-hidden
    >
      {SERVICES.map((service, index) => (
        <SyncedServiceBackground
          key={service.title}
          index={index}
          carouselProgress={carouselProgress}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-[#141414]/30 to-[#141414] rtl:bg-gradient-to-l" />
    </motion.div>
  );
}

function StaticServiceBackground({ service }: { service: Service }) {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 start-0 -z-10 hidden w-[58%] max-w-[820px] overflow-hidden wide:block"
      aria-hidden
    >
      <div className={SERVICE_BACKGROUND_WRAPPER_CLASS}>
        <ServiceBackgroundImage
          src={service.backgroundImage}
          className={SERVICE_BACKGROUND_IMAGE_CLASS}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-[#141414]/30 to-[#141414] rtl:bg-gradient-to-l" />
    </div>
  );
}

function MobileServiceBackground({ activeIndex }: { activeIndex: number }) {
  const service = SERVICES[activeIndex];

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(62vw,420px)] overflow-hidden wide:hidden"
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

type TitleWordReveal = {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
};

function IntroText({
  kickerReveals,
  kickerBlock,
  titleWords,
  sublineReveals,
  wrapperOpacity,
  wrapperScale,
}: {
  kickerReveals: LetterReveal[];
  kickerBlock: LetterReveal;
  titleWords: TitleWordReveal[];
  sublineReveals: WordReveal[];
  wrapperOpacity: MotionValue<number>;
  wrapperScale: MotionValue<number>;
}) {
  const t = useDictionary();
  const { locale } = useLocaleContext();
  const kicker = t.services.introKicker;
  const kickerParts = locale === "ar" ? [kicker] : Array.from(kicker);
  const titleLabels = t.services.introTitleWords;
  const sublineLabel = t.services.introSubline;
  const sublineParts = t.services.introSublineWords;
  const introVisibility = useTransform(wrapperOpacity, (value) =>
    value > 0 ? "visible" : "hidden",
  );

  return (
    <motion.div
      style={{ opacity: wrapperOpacity, scale: wrapperScale, visibility: introVisibility }}
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6"
    >
      <div className="w-full max-w-4xl text-start">
        <p
          aria-label={kicker}
          className="mb-3 font-display text-[40px] font-bold leading-none text-white"
        >
          {kickerParts.map((part, index) => {
            const reveal =
              kickerParts.length === 1
                ? kickerBlock
                : kickerReveals[index] ?? kickerBlock;
            return (
              <RevealLetter
                key={`${part}-${index}`}
                opacity={reveal.opacity}
                x={reveal.x}
              >
                {part}
              </RevealLetter>
            );
          })}
        </p>

        <h2
          aria-label={titleLabels.join(" ")}
          className="pointer-events-auto font-proxima-nova text-[80px] font-extrabold leading-[1.05]"
        >
          {titleLabels.map((word, index) => (
            <span key={`${word}-${index}`}>
              <RevealWord
                hoverClassName={INTRO_TITLE_HOVER[index % INTRO_TITLE_HOVER.length]}
                opacity={titleWords[index]?.opacity ?? titleWords[0].opacity}
                y={titleWords[index]?.y ?? titleWords[0].y}
              >
                {word}
              </RevealWord>
              {index < titleLabels.length - 1 ? " " : null}
            </span>
          ))}
        </h2>

        <p
          aria-label={sublineLabel}
          className="mt-5 text-end font-display text-[40px] font-bold leading-none text-[#fff]"
        >
          {sublineParts.map((word, index) => {
            const reveal = sublineReveals[index] ?? sublineReveals[0];
            return (
              <span key={`${word}-${index}`}>
                <RevealLetter opacity={reveal.opacity} x={reveal.x}>
                  {word}
                </RevealLetter>
                {index < sublineParts.length - 1 ? " " : null}
              </span>
            );
          })}
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
  const { dir } = useLocaleContext();
  const { onCardClick, ...cardDragHandlers } = carouselDragHandlers;
  const x = useTransform(carouselProgress, (progress) => {
    const value = getCardVisualState(cardIndex, progress).x;
    return dir === "rtl" ? -value : value;
  });
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
        transformOrigin: dir === "rtl" ? "bottom right" : "bottom left",
        pointerEvents: cardPointerEvents,
        cursor: cardCursor,
      }}
      className={`absolute bottom-0 start-0 ${SERVICE_CARD_SHELL_CLASS}`}
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
  const { dir } = useLocaleContext();
  const { onCardClick: _onCardClick, ...containerDragHandlers } =
    carouselDragHandlers;

  return (
    <div className="w-full overflow-hidden">
      <div
        className="relative ms-auto h-[425px] cursor-grab touch-none active:cursor-grabbing"
        style={{
          width: CAROUSEL_VIEWPORT_WIDTH,
          clipPath:
            dir === "rtl"
              ? `inset(0 -${CARD_EXIT_LEFT_OFFSET}px 0 0)`
              : `inset(0 0 0 -${CARD_EXIT_LEFT_OFFSET}px)`,
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

function ServiceOfferingsList({
  items,
  className = "",
  singleColumn = false,
}: {
  items: string[];
  className?: string;
  singleColumn?: boolean;
}) {
  if (singleColumn) {
    return (
      <ul className={`mt-6 flex w-full flex-col gap-y-2.5 ${className}`.trim()}>
        {items.map((item) => (
          <li key={item} className={SERVICE_LIST_ITEM_CLASS}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  const midpoint = Math.ceil(items.length / 2);
  const columns = [items.slice(0, midpoint), items.slice(midpoint)];

  return (
    <div className={`mt-6 flex w-full gap-x-8 ${className}`.trim()}>
      {columns
        .filter((column) => column.length > 0)
        .map((column) => (
        <ul
          key={column.join("|")}
          className="flex min-w-0 flex-1 flex-col gap-y-2.5"
        >
          {column.map((item) => (
            <li key={item} className={SERVICE_LIST_ITEM_CLASS}>
              {item}
            </li>
          ))}
        </ul>
        ))}
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
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <h3 className="font-display text-3xl font-bold text-white md:text-4xl">
        {service.title}
      </h3>
      <p className="mt-2 font-body text-base text-white/70 md:text-lg">
        {service.tagline}
      </p>

      <div className="mt-5 flex h-[3px] w-full max-w-xs">
        <ColorDividerLine />
      </div>

      <p className="mt-5 min-h-[4.75rem] font-body text-sm leading-relaxed text-white/65 md:text-[15px]">
        {service.description}
      </p>

      <ServiceOfferingsList items={service.items} />
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
  const services = useLocalizedServices();
  const opacity = useTransform(carouselProgress, (progress) =>
    serviceOpacityForIndex(index, progress),
  );
  const y = useTransform(carouselProgress, (progress) =>
    serviceYForIndex(index, progress),
  );

  return (
    <ServiceDetails service={services[index]} opacity={opacity} y={y} />
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
  const t = useDictionary();
  const services = useLocalizedServices();
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
          {t.services.introLeadBefore}
          <span className="text-[50px] font-bold leading-none md:text-[80px]">
            {t.services.introLeadEmphasis}
          </span>
          {t.services.introLeadAfter}
        </p>
        <p className={SERVICES_INTRO_SUBLINE_CLASS}>{t.services.introCopy}</p>
      </div>

      <div className="flex w-full items-end gap-6 lg:gap-10">
        <div
          className={`relative z-10 h-[425px] w-full max-w-[520px] shrink-0 ${SECTION_CONTENT_ALIGN_CLASS}`}
        >
          {services.map((service, index) => (
            <SyncedServiceDetails
              key={service.href}
              index={index}
              carouselProgress={carouselProgress}
            />
          ))}
        </div>

        <div className="min-w-0 flex-1 pe-0 overflow-visible">
          <ServiceCardCarousel
            carouselProgress={carouselProgress}
            carouselDragHandlers={carouselDragHandlers}
          />
        </div>
      </div>
    </motion.div>
  );
}

function ServiceSliderArrow({
  direction,
  disabled,
  onClick,
  className,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous service" : "Next service"}
      className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#141414] shadow-md transition-opacity enabled:hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40 ${className ?? ""}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        {direction === "prev" ? (
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

function StaticServiceContent({
  service,
  dividerNav,
}: {
  service: Service;
  dividerNav?: {
    prev: React.ReactNode;
    next: React.ReactNode;
  };
}) {
  const introTitle = useDictionary().services.introTitleWords.join(" ");
  return (
    <>
      <h3 className="text-center font-display text-[clamp(28px,6.8vw,48px)] font-bold leading-[1.05] text-white wide:text-start wide:text-4xl wide:leading-normal">
        {service.title}
      </h3>
      <p className="mt-[1.8vw] text-center font-body text-[clamp(14px,3.7vw,20px)] text-white/70 wide:mt-2 wide:text-start wide:text-lg">
        {service.tagline}
      </p>
      {dividerNav ? (
        <div className="relative mx-auto mt-5 hidden w-full items-center gap-3 md:flex md:gap-4 wide:hidden">
          {dividerNav.prev}
          <div className="flex h-[3px] min-w-0 flex-1">
            <ColorDividerLine />
          </div>
          {dividerNav.next}
        </div>
      ) : null}
      <div
        className={`relative mx-auto mt-[4vw] w-fit wide:hidden ${dividerNav ? "md:hidden" : ""}`}
      >
        <span
          aria-hidden
          className="invisible block whitespace-nowrap font-proxima-nova text-[7.4vw] font-extrabold leading-none"
        >
          {introTitle}
        </span>
        <div className="absolute inset-x-0 top-1/2 flex h-[3px] -translate-y-1/2">
          <ColorDividerLine />
        </div>
      </div>
      <div className="mt-5 hidden h-[3px] w-full max-w-xs wide:flex">
        <ColorDividerLine />
      </div>
      <p className="mt-[4vw] text-center font-body text-[clamp(13px,3.35vw,16px)] leading-relaxed text-white/65 wide:mt-5 wide:min-h-[4.75rem] wide:text-start wide:text-[15px]">
        {service.description}
      </p>
      <ServiceOfferingsList
        items={service.items}
        className={`mx-auto w-full max-w-md wide:mx-0 wide:max-w-none ${dividerNav ? "md:hidden" : ""}`}
      />
    </>
  );
}

function ServicesMobileSlider() {
  const services = useLocalizedServices();
  const [activeIndex, setActiveIndex] = useState(0);
  const swipeOriginX = useRef<number | null>(null);
  const swipeDeltaX = useRef(0);
  const skipClickRef = useRef(false);
  const total = services.length;
  const service = services[activeIndex];
  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === total - 1;

  const goTo = (index: number) => {
    setActiveIndex(Math.min(Math.max(index, 0), total - 1));
  };

  const goBy = (step: number) => {
    setActiveIndex((current) =>
      Math.min(Math.max(current + step, 0), total - 1),
    );
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    swipeOriginX.current = event.clientX;
    swipeDeltaX.current = 0;
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (swipeOriginX.current == null) return;
    swipeDeltaX.current = event.clientX - swipeOriginX.current;
  };

  const endSwipe = () => {
    if (swipeOriginX.current == null) return;
    const deltaX = swipeDeltaX.current;
    swipeOriginX.current = null;
    swipeDeltaX.current = 0;

    if (deltaX <= -SERVICE_SWIPE_THRESHOLD_PX) {
      skipClickRef.current = true;
      goBy(1);
    } else if (deltaX >= SERVICE_SWIPE_THRESHOLD_PX) {
      skipClickRef.current = true;
      goBy(-1);
    }
  };

  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!skipClickRef.current) return;
    skipClickRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  const prevArrow = (
    <ServiceSliderArrow
      direction="prev"
      disabled={isFirstSlide}
      onClick={() => goTo(activeIndex - 1)}
    />
  );
  const nextArrow = (
    <ServiceSliderArrow
      direction="next"
      disabled={isLastSlide}
      onClick={() => goTo(activeIndex + 1)}
    />
  );

  return (
    <div
      className="relative w-full touch-pan-y wide:hidden"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endSwipe}
      onPointerCancel={endSwipe}
      onClickCapture={onClickCapture}
    >
      <MobileServiceBackground activeIndex={activeIndex} />
      <div className="w-full px-6">
        <StaticServiceContent
          service={service}
          dividerNav={{
            prev: prevArrow,
            next: nextArrow,
          }}
        />
      </div>

      <div className="relative mt-8 w-full min-w-0 px-6 pb-8 md:mt-8 md:flex md:items-center md:gap-8 md:pb-10">
        <ServiceOfferingsList
          items={service.items}
          singleColumn
          className="hidden md:mt-0 md:flex md:w-[min(38%,16rem)] md:max-w-[16rem] md:shrink-0 md:text-start"
        />
        <div className="min-w-0 w-full md:flex md:flex-1 md:justify-end">
          <div
            className={`relative mx-auto aspect-[420/425] w-full max-w-[28rem] md:mx-0 ${SERVICE_CARD_SHELL_CLASS}`}
          >
            <ServiceCardLink service={service} />

            <div className="md:hidden">
              <ServiceSliderArrow
                direction="prev"
                disabled={isFirstSlide}
                onClick={() => goTo(activeIndex - 1)}
                className="absolute top-1/2 start-3 -translate-y-1/2"
              />
              <ServiceSliderArrow
                direction="next"
                disabled={isLastSlide}
                onClick={() => goTo(activeIndex + 1)}
                className="absolute top-1/2 end-3 -translate-y-1/2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StaticServices() {
  const t = useDictionary();
  const services = useLocalizedServices();
  const introTitle = t.services.introTitleWords.join(" ");
  return (
    <section id="services" className="relative overflow-hidden bg-[#141414] py-24">
      <StaticServiceBackground service={services[0]} />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-[10vw] text-center md:mb-14">
          <div className="wide:hidden">
            <div className="md:mx-auto md:max-w-3xl md:rounded-[28px] md:rounded-tr-none md:border md:border-white/15 md:bg-white/[0.06] md:p-12 md:shadow-[0_18px_48px_rgba(0,0,0,0.28)] md:backdrop-blur-md">
              <p className="services-mobile-text-subtle font-display text-[4.6vw] font-medium leading-none text-[#fff] md:text-[clamp(26px,4vw,40px)]">
                {t.services.introKicker}
              </p>
              <h2 className="services-mobile-text-subtle mt-[2.4vw] font-proxima-nova text-[7.4vw] font-extrabold leading-[1.05] text-white md:mt-5 md:text-[clamp(44px,6.4vw,64px)]">
                {introTitle}
              </h2>
              <p className="services-mobile-text-subtle mt-[2vw] font-display text-[4vw] font-bold leading-none text-[#fff] md:mt-5 md:text-[clamp(24px,3.6vw,36px)]">
                {t.services.introSubline}
              </p>
            </div>
            <p className="mt-14 hidden font-body text-base font-extrabold uppercase tracking-[0.24em] text-white/55 md:block">
              {t.services.introEyebrow}
            </p>
          </div>

          <div className="hidden wide:block">
            <p className="font-display text-[40px] font-medium leading-none text-[#fff]">
              {t.services.introLeadBefore}
              <span className="text-[80px] font-bold leading-none">
                {t.services.introLeadEmphasis}
              </span>
              {t.services.introLeadAfter}
            </p>
            <p className={SERVICES_INTRO_SUBLINE_CLASS}>{t.services.introCopy}</p>
            <h2 className="mt-8 font-proxima-nova text-[80px] font-extrabold leading-[1.05] text-white">
              {t.services.introKicker}{" "}
              {t.services.introTitleWords.map((word) => (
                <span key={word} className="text-white">
                  {word}{" "}
                </span>
              ))}
            </h2>
            <p className="mt-3 font-display text-[40px] font-bold leading-none text-[#fff]">
              {t.services.introSubline}
            </p>
          </div>
        </div>

        <ServicesMobileSlider />

        <div className="hidden w-full items-end gap-12 wide:flex">
          <div
            className={`flex h-[425px] w-full max-w-[520px] shrink-0 flex-col justify-center ${SECTION_CONTENT_ALIGN_CLASS}`}
          >
            <StaticServiceContent service={services[0]} />
          </div>
          <div className="min-w-0 flex-1 overflow-hidden pe-0">
            <div className="w-full overflow-hidden">
              <div
                className="ms-auto overflow-hidden"
                style={{ width: CAROUSEL_VIEWPORT_WIDTH }}
              >
                <div className="flex items-end" style={{ gap: CARD_GAP }}>
                  {services.map((s, index) => (
                    <ServiceCard
                      key={s.href}
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
  const { dir } = useLocaleContext();
  const kickerFromX = dir === "rtl" ? 16 : -16;
  const sublineFromX = dir === "rtl" ? 20 : -20;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const introWrapperOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.139, INTRO_HOLD_END, INTRO_FADE_END],
    [0, 1, 1, 0],
  );
  const introWrapperScale = useTransform(
    scrollYProgress,
    [INTRO_HOLD_END, INTRO_FADE_END],
    [1, 0.82],
  );

  const yOpacity = useTransform(scrollYProgress, [0.139, 0.154], [0, 1]);
  const yX = useTransform(scrollYProgress, [0.139, 0.154], [kickerFromX, 0]);
  const oOpacity = useTransform(scrollYProgress, [0.154, 0.169], [0, 1]);
  const oX = useTransform(scrollYProgress, [0.154, 0.169], [kickerFromX, 0]);
  const uOpacity = useTransform(scrollYProgress, [0.169, 0.183], [0, 1]);
  const uX = useTransform(scrollYProgress, [0.169, 0.183], [kickerFromX, 0]);
  const rOpacity = useTransform(scrollYProgress, [0.183, 0.198], [0, 1]);
  const rX = useTransform(scrollYProgress, [0.183, 0.198], [kickerFromX, 0]);
  const kickerBlockOpacity = useTransform(
    scrollYProgress,
    [0.139, 0.198],
    [0, 1],
  );
  const kickerBlockX = useTransform(
    scrollYProgress,
    [0.139, 0.198],
    [kickerFromX, 0],
  );

  const kickerReveals = [
    { opacity: yOpacity, x: yX },
    { opacity: oOpacity, x: oX },
    { opacity: uOpacity, x: uX },
    { opacity: rOpacity, x: rX },
  ];
  const kickerBlock = { opacity: kickerBlockOpacity, x: kickerBlockX };

  const creativeOpacity = useTransform(scrollYProgress, [0.198, 0.256], [0, 1]);
  const creativeY = useTransform(scrollYProgress, [0.198, 0.256], [48, 0]);
  const digitalOpacity = useTransform(scrollYProgress, [0.256, 0.314], [0, 1]);
  const digitalY = useTransform(scrollYProgress, [0.256, 0.314], [48, 0]);
  const agencyOpacity = useTransform(scrollYProgress, [0.314, 0.373], [0, 1]);
  const agencyY = useTransform(scrollYProgress, [0.314, 0.373], [48, 0]);
  const titleWords = [
    { opacity: creativeOpacity, y: creativeY },
    { opacity: digitalOpacity, y: digitalY },
    { opacity: agencyOpacity, y: agencyY },
  ];
  const fromOpacity = useTransform(scrollYProgress, [0.373, 0.387], [0, 1]);
  const fromX = useTransform(scrollYProgress, [0.373, 0.387], [sublineFromX, 0]);
  const scalabilityOpacity = useTransform(scrollYProgress, [0.387, 0.402], [0, 1]);
  const scalabilityX = useTransform(scrollYProgress, [0.387, 0.402], [sublineFromX, 0]);
  const ampOpacity = useTransform(scrollYProgress, [0.402, 0.417], [0, 1]);
  const ampX = useTransform(scrollYProgress, [0.402, 0.417], [sublineFromX, 0]);
  const growthOpacity = useTransform(
    scrollYProgress,
    [0.417, INTRO_GROWTH_VISIBLE],
    [0, 1],
  );
  const growthX = useTransform(
    scrollYProgress,
    [0.417, INTRO_GROWTH_VISIBLE],
    [sublineFromX, 0],
  );

  const sublineReveals = [
    { opacity: fromOpacity, x: fromX },
    { opacity: scalabilityOpacity, x: scalabilityX },
    { opacity: ampOpacity, x: ampX },
    { opacity: growthOpacity, x: growthX },
  ];

  const contentOpacity = useTransform(
    scrollYProgress,
    [INTRO_FADE_END, SERVICE_SCROLL_START],
    [0, 1],
    { ease: easeOutCubic },
  );
  const contentY = useTransform(
    scrollYProgress,
    [INTRO_FADE_END, SERVICE_SCROLL_START],
    [48, 0],
    { ease: easeOutCubic },
  );
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
          kickerReveals={kickerReveals}
          kickerBlock={kickerBlock}
          titleWords={titleWords}
          sublineReveals={sublineReveals}
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
