"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function parseStatValue(value: string): {
  end: number;
  suffix: string;
  minDigits: number;
} {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { end: 0, suffix: value, minDigits: 1 };

  const digits = match[1];
  const keepLeadingZeros = digits.length > 1 && digits.startsWith("0");

  return {
    end: Number(digits),
    suffix: match[2],
    minDigits: keepLeadingZeros ? digits.length : 1,
  };
}

export default function CountUpValue({
  value,
  delay = 0,
}: {
  value: string;
  delay?: number;
}) {
  const { end, suffix, minDigits } = parseStatValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setDisplay(end);
      return;
    }

    setDisplay(0);
    const controls = animate(0, end, {
      duration: 1.4,
      delay,
      ease: EASE,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [delay, end, isInView, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums" aria-label={value}>
      {String(display).padStart(minDigits, "0")}
      {suffix}
    </span>
  );
}
