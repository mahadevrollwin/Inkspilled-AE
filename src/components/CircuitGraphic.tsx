"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";
import AutoPlayVideo from "@/components/AutoPlayVideo";
import { STATIC_LAYOUT_MEDIA_QUERY } from "@/lib/breakpoints";

const CIRCUIT_VIDEO_SRC_DESKTOP = "/videos/video-ink.mp4";
const CIRCUIT_VIDEO_SRC_MOBILE = "/videos/ink-mobile-main.mp4";
const EXPAND_START = 0.52;
const EXPAND_END = 0.9;
export const HERO_CONTENT_FADE_END = 0.48;

type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

function getExpandProgress(scrollProgress: number) {
  if (scrollProgress <= EXPAND_START) return 0;
  if (scrollProgress >= EXPAND_END) return 1;

  return smoothstep(
    (scrollProgress - EXPAND_START) / (EXPAND_END - EXPAND_START),
  );
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function useIsMobileViewport() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(STATIC_LAYOUT_MEDIA_QUERY);
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function CircuitVideo() {
  const isMobile = useIsMobileViewport();

  return (
    <AutoPlayVideo
      src={isMobile ? CIRCUIT_VIDEO_SRC_MOBILE : CIRCUIT_VIDEO_SRC_DESKTOP}
      className={
        isMobile
          ? "block h-auto w-full"
          : "absolute inset-0 h-full w-full object-cover"
      }
      aria-label="Technology and innovation process animation"
    />
  );
}

function CircuitVideoFrame() {
  return (
    <div className="relative w-full overflow-hidden bg-ink-blue md:h-full">
      <CircuitVideo />
    </div>
  );
}

const PLACEHOLDER_CLASS =
  "relative w-full md:absolute md:bottom-0 md:left-0 md:w-[46%] md:max-w-[580px] md:px-10";

function CircuitGraphicStatic() {
  return (
    <div className={PLACEHOLDER_CLASS}>
      <div className="relative w-full overflow-hidden md:aspect-[532/299]">
        <CircuitVideoFrame />
      </div>
    </div>
  );
}

function CircuitGraphicExpanded({
  scrollProgress,
  containerRef,
}: {
  scrollProgress: MotionValue<number>;
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [frozenOrigin, setFrozenOrigin] = useState<Rect | null>(null);
  const [expandProgress, setExpandProgress] = useState(0);
  const [liveRect, setLiveRect] = useState<Rect | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const measureRects = () => {
    const container = containerRef.current;
    const placeholder = placeholderRef.current;
    if (!container || !placeholder) return null;

    const containerRect = container.getBoundingClientRect();
    const placeholderRect = placeholder.getBoundingClientRect();

    return {
      placeholder: {
        top: placeholderRect.top - containerRect.top,
        left: placeholderRect.left - containerRect.left,
        width: placeholderRect.width,
        height: placeholderRect.height,
      },
      container: {
        width: container.offsetWidth,
        height: container.offsetHeight,
      },
    };
  };

  useEffect(() => {
    const update = () => {
      const measured = measureRects();
      if (!measured) return;

      setLiveRect(measured.placeholder);
      setContainerSize(measured.container);
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [containerRef]);

  useMotionValueEvent(scrollProgress, "change", (value) => {
    const next = getExpandProgress(value);

    setExpandProgress((previous) => {
      if (next > 0 && previous === 0) {
        setFrozenOrigin(measureRects()?.placeholder ?? null);
      }

      if (next === 0) {
        setFrozenOrigin(null);
      }

      return next;
    });
  });

  useEffect(() => {
    const next = getExpandProgress(scrollProgress.get());

    setExpandProgress((previous) => {
      if (next > 0 && previous === 0) {
        setFrozenOrigin(measureRects()?.placeholder ?? null);
      }

      if (next === 0) {
        setFrozenOrigin(null);
      }

      return next;
    });
  }, [scrollProgress, containerRef]);

  const origin =
    expandProgress > 0 && frozenOrigin
      ? frozenOrigin
      : liveRect;

  const target = {
    top: 0,
    left: 0,
    width: containerSize.width,
    height: containerSize.height,
  };

  const videoStyle =
    origin && containerSize.width > 0
      ? {
          top: lerp(origin.top, target.top, expandProgress),
          left: lerp(origin.left, target.left, expandProgress),
          width: lerp(origin.width, target.width, expandProgress),
          height: lerp(origin.height, target.height, expandProgress),
        }
      : null;

  return (
    <>
      <div ref={placeholderRef} className={PLACEHOLDER_CLASS} aria-hidden>
        {expandProgress === 0 ? (
          <div className="relative aspect-[532/299] w-full overflow-hidden">
            <CircuitVideoFrame />
          </div>
        ) : (
          <div className="relative aspect-[532/299] w-full" />
        )}
      </div>

      {expandProgress > 0 && videoStyle ? (
        <div
          style={{
            ...videoStyle,
            position: "absolute",
            zIndex: 20,
          }}
          className="overflow-hidden bg-ink-blue will-change-[top,left,width,height]"
        >
          <CircuitVideoFrame />
        </div>
      ) : null}
    </>
  );
}

export default function CircuitGraphic({
  scrollProgress,
  containerRef,
}: {
  scrollProgress?: MotionValue<number>;
  containerRef?: React.RefObject<HTMLElement | null>;
}) {
  if (!scrollProgress || !containerRef) {
    return <CircuitGraphicStatic />;
  }

  return (
    <CircuitGraphicExpanded
      scrollProgress={scrollProgress}
      containerRef={containerRef}
    />
  );
}
