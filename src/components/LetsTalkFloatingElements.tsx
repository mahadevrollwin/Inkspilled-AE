"use client";

import {
  motion,
  motionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";

export const STATIC_SCROLL_PROGRESS = motionValue(0);

type FloatingItem = {
  id: string;
  top: string;
  left?: string;
  right?: string;
  size: number;
  rotate: number;
  blur: number;
  opacity: number;
  color: string;
  parallaxY: number;
  parallaxX: number;
  floatDuration: number;
  floatDelay: number;
};

const FLOATING_ITEMS: FloatingItem[] = [
  {
    id: "leaf-1",
    top: "6%",
    left: "4%",
    size: 56,
    rotate: -32,
    blur: 0,
    opacity: 0.9,
    color: "#dc5c52",
    parallaxY: 48,
    parallaxX: 18,
    floatDuration: 9,
    floatDelay: 0,
  },
  {
    id: "leaf-2",
    top: "12%",
    right: "6%",
    size: 84,
    rotate: 28,
    blur: 10,
    opacity: 0.55,
    color: "#29b6e8",
    parallaxY: 72,
    parallaxX: -24,
    floatDuration: 11,
    floatDelay: 0.8,
  },
  {
    id: "leaf-3",
    top: "34%",
    left: "2%",
    size: 40,
    rotate: 18,
    blur: 6,
    opacity: 0.7,
    color: "#4caf50",
    parallaxY: 36,
    parallaxX: 12,
    floatDuration: 8,
    floatDelay: 1.4,
  },
  {
    id: "leaf-4",
    top: "58%",
    right: "3%",
    size: 68,
    rotate: -18,
    blur: 0,
    opacity: 0.85,
    color: "#dc5c52",
    parallaxY: 56,
    parallaxX: -16,
    floatDuration: 10,
    floatDelay: 0.3,
  },
  {
    id: "leaf-5",
    top: "72%",
    left: "8%",
    size: 92,
    rotate: 42,
    blur: 14,
    opacity: 0.45,
    color: "#29b6e8",
    parallaxY: 80,
    parallaxX: 22,
    floatDuration: 12,
    floatDelay: 1.8,
  },
  {
    id: "leaf-6",
    top: "18%",
    left: "18%",
    size: 32,
    rotate: -8,
    blur: 12,
    opacity: 0.4,
    color: "#4caf50",
    parallaxY: 28,
    parallaxX: -8,
    floatDuration: 7,
    floatDelay: 2.2,
  },
  {
    id: "leaf-7",
    top: "44%",
    right: "14%",
    size: 48,
    rotate: -48,
    blur: 4,
    opacity: 0.75,
    color: "#dc5c52",
    parallaxY: 44,
    parallaxX: -20,
    floatDuration: 9.5,
    floatDelay: 1.1,
  },
  {
    id: "leaf-8",
    top: "82%",
    right: "10%",
    size: 36,
    rotate: 22,
    blur: 8,
    opacity: 0.6,
    color: "#29b6e8",
    parallaxY: 32,
    parallaxX: 14,
    floatDuration: 8.5,
    floatDelay: 0.6,
  },
  {
    id: "leaf-9",
    top: "8%",
    right: "22%",
    size: 28,
    rotate: 55,
    blur: 16,
    opacity: 0.35,
    color: "#4caf50",
    parallaxY: 24,
    parallaxX: -10,
    floatDuration: 10.5,
    floatDelay: 2.6,
  },
  {
    id: "leaf-10",
    top: "64%",
    left: "14%",
    size: 52,
    rotate: -12,
    blur: 0,
    opacity: 0.8,
    color: "#29b6e8",
    parallaxY: 52,
    parallaxX: 16,
    floatDuration: 9.2,
    floatDelay: 1.6,
  },
];

function LeafShape({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
      aria-hidden
    >
      <path
        d="M32 4C18 14 10 30 12 48C14 62 24 72 32 76C40 72 50 62 52 48C54 30 46 14 32 4Z"
        fill={color}
      />
      <path
        d="M32 76V8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M32 24C26 30 22 36 20 42"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M32 30C38 36 42 42 44 48"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FloatingLeaf({
  item,
  scrollYProgress,
  animated,
}: {
  item: FloatingItem;
  scrollYProgress: MotionValue<number>;
  animated: boolean;
}) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, item.parallaxY],
  );
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, item.parallaxX],
  );

  const positionStyle = {
    top: item.top,
    left: item.left,
    right: item.right,
    width: item.size,
    height: item.size * 1.25,
    rotate: `${item.rotate}deg`,
    opacity: item.opacity,
    filter: item.blur > 0 ? `blur(${item.blur}px)` : undefined,
    animationDuration: `${item.floatDuration}s`,
    animationDelay: `${item.floatDelay}s`,
  };

  if (!animated) {
    return (
      <div
        className="pointer-events-none absolute lets-talk-float"
        style={positionStyle}
      >
        <LeafShape color={item.color} />
      </div>
    );
  }

  return (
    <motion.div
      className="pointer-events-none absolute will-change-transform"
      style={{
        top: item.top,
        left: item.left,
        right: item.right,
        width: item.size,
        height: item.size * 1.25,
        y,
        x,
      }}
    >
      <div
        className="lets-talk-float h-full w-full"
        style={{
          rotate: `${item.rotate}deg`,
          opacity: item.opacity,
          filter: item.blur > 0 ? `blur(${item.blur}px)` : undefined,
          animationDuration: `${item.floatDuration}s`,
          animationDelay: `${item.floatDelay}s`,
        }}
      >
        <LeafShape color={item.color} />
      </div>
    </motion.div>
  );
}

type LetsTalkFloatingElementsProps = {
  scrollYProgress?: MotionValue<number>;
  animated?: boolean;
};

export default function LetsTalkFloatingElements({
  scrollYProgress = STATIC_SCROLL_PROGRESS,
  animated = false,
}: LetsTalkFloatingElementsProps) {
  const isScrollAnimated = animated && scrollYProgress !== STATIC_SCROLL_PROGRESS;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      {FLOATING_ITEMS.map((item) => (
        <FloatingLeaf
          key={item.id}
          item={item}
          scrollYProgress={scrollYProgress}
          animated={isScrollAnimated}
        />
      ))}
    </div>
  );
}
