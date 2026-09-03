"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";

const PHRASES = [
  "Brand Strategy & Positioning",
  "Motion Identity",
  "Print & Packaging",
  "Social Media Management",
  "Content Creation",
  "Influencer Marketing",
  "UX/UI Design",
  "E-commerce Development",
] as const;

const TOKENS = PHRASES.flatMap((phrase) =>
  phrase
    .toUpperCase()
    .split(/\s+/)
    .filter((word) => word && word !== "&"),
);

const ROW_COUNT = 22;
const COL_COUNT = 8;
const LENS_SIZE = 220;

const ROWS = Array.from({ length: ROW_COUNT }, (_, row) => {
  const start = (row * 3) % TOKENS.length;
  return Array.from(
    { length: COL_COUNT },
    (_, col) => TOKENS[(start + col) % TOKENS.length],
  );
});

function WordGrid({ bright = false }: { bright?: boolean }) {
  return (
    <div
      className={`flex h-full flex-col justify-between px-2 ${
        bright ? "text-[#ffe9b0]" : "text-[#c4a36a]/38"
      }`}
    >
      {ROWS.map((row, rowIndex) => (
        <p
          key={`row-${rowIndex}`}
          className={`flex items-center gap-x-3 font-display text-[10px] font-semibold uppercase leading-none tracking-[0.18em] md:text-[12px] lg:text-[13px] ${
            rowIndex % 2 === 1 ? "pl-5 md:pl-8" : ""
          }`}
        >
          {row.map((word, wordIndex) => (
            <span key={`${rowIndex}-${wordIndex}-${word}`} className="shrink-0">
              {word}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

export default function AboutHeroWordField() {
  const reduceMotion = useReducedMotion();
  const fieldRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0, active: false });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [lens, setLens] = useState({ x: 0, y: 0, active: false });
  const [fieldSize, setFieldSize] = useState({ width: 0, height: 0 });

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const target = targetRef.current;
    const current = currentRef.current;
    current.x += (target.x - current.x) * 0.18;
    current.y += (target.y - current.y) * 0.18;

    const stillMoving =
      Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.35;

    setLens({
      x: current.x,
      y: current.y,
      active: target.active || stillMoving,
    });

    if (target.active || stillMoving) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
    }
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const updatePointer = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const bounds = fieldRef.current?.getBoundingClientRect();
      if (!bounds) return;
      targetRef.current = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        active: true,
      };
      startLoop();
    },
    [startLoop],
  );

  const hideLens = useCallback(() => {
    targetRef.current.active = false;
    setLens((prev) => ({ ...prev, active: false }));
  }, []);

  useEffect(() => stopLoop, [stopLoop]);

  useLayoutEffect(() => {
    const node = fieldRef.current;
    if (!node) return;

    const updateSize = () => {
      setFieldSize({ width: node.offsetWidth, height: node.offsetHeight });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={fieldRef}
      aria-hidden
      onPointerMove={reduceMotion ? undefined : updatePointer}
      onPointerEnter={reduceMotion ? undefined : updatePointer}
      onPointerLeave={reduceMotion ? undefined : hideLens}
      className="relative h-full w-full overflow-hidden lg:cursor-none"
    >
      <WordGrid />

      {reduceMotion ? (
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <WordGrid bright />
        </div>
      ) : lens.active ? (
        <>
          <div
            className="pointer-events-none absolute overflow-hidden rounded-full"
            style={{
              width: LENS_SIZE,
              height: LENS_SIZE,
              left: lens.x - LENS_SIZE / 2,
              top: lens.y - LENS_SIZE / 2,
              clipPath: "circle(50% at 50% 50%)",
              boxShadow:
                "inset 14px 10px 22px rgba(255, 245, 210, 0.18), inset -12px -16px 26px rgba(0, 0, 0, 0.45), 0 0 28px rgba(255, 214, 120, 0.28)",
            }}
          >
            <div
              className="absolute"
              style={{
                width: fieldSize.width,
                height: fieldSize.height,
                left: -(lens.x - LENS_SIZE / 2),
                top: -(lens.y - LENS_SIZE / 2),
                transform: `scale(1.42)`,
                transformOrigin: `${lens.x}px ${lens.y}px`,
              }}
            >
              <WordGrid bright />
            </div>
            <span
              className="absolute left-[18%] top-[16%] h-[34%] w-[28%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0.08) 46%, transparent 70%)",
              }}
            />
          </div>
          <div
            className="pointer-events-none absolute rounded-full border border-[#ffe9b0]/35"
            style={{
              width: LENS_SIZE,
              height: LENS_SIZE,
              left: lens.x - LENS_SIZE / 2,
              top: lens.y - LENS_SIZE / 2,
            }}
          />
        </>
      ) : null}
    </div>
  );
}
