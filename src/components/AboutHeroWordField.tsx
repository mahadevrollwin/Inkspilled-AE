"use client";

import {
  useCallback,
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
  const lensRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [fieldSize, setFieldSize] = useState({ width: 0, height: 0 });

  const setLensVisible = useCallback((visible: boolean) => {
    const opacity = visible ? "1" : "0";
    if (lensRef.current) lensRef.current.style.opacity = opacity;
    if (ringRef.current) ringRef.current.style.opacity = opacity;
  }, []);

  const moveLens = useCallback((clientX: number, clientY: number) => {
    const bounds = fieldRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const x = clientX - bounds.left;
    const y = clientY - bounds.top;
    const half = LENS_SIZE / 2;
    const shift = `translate3d(${x - half}px, ${y - half}px, 0)`;

    if (lensRef.current) {
      lensRef.current.style.transform = shift;
      lensRef.current.style.opacity = "1";
    }
    if (ringRef.current) {
      ringRef.current.style.transform = shift;
      ringRef.current.style.opacity = "1";
    }
    if (innerRef.current) {
      innerRef.current.style.transform = `translate3d(${-(x - half)}px, ${-(y - half)}px, 0) scale(1.42)`;
      innerRef.current.style.transformOrigin = `${x}px ${y}px`;
    }
  }, []);

  const updatePointer = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      moveLens(event.clientX, event.clientY);
    },
    [moveLens],
  );

  const hideLens = useCallback(() => {
    setLensVisible(false);
  }, [setLensVisible]);

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
      ) : (
        <>
          <div
            ref={lensRef}
            className="pointer-events-none absolute left-0 top-0 overflow-hidden rounded-full will-change-transform"
            style={{
              width: LENS_SIZE,
              height: LENS_SIZE,
              opacity: 0,
              clipPath: "circle(50% at 50% 50%)",
              boxShadow:
                "inset 14px 10px 22px rgba(255, 245, 210, 0.18), inset -12px -16px 26px rgba(0, 0, 0, 0.45), 0 0 28px rgba(255, 214, 120, 0.28)",
            }}
          >
            <div
              ref={innerRef}
              className="absolute left-0 top-0 will-change-transform"
              style={{
                width: fieldSize.width,
                height: fieldSize.height,
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
            ref={ringRef}
            className="pointer-events-none absolute left-0 top-0 rounded-full border border-[#ffe9b0]/35 will-change-transform"
            style={{
              width: LENS_SIZE,
              height: LENS_SIZE,
              opacity: 0,
            }}
          />
        </>
      )}
    </div>
  );
}
