"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useStaticLayout } from "@/hooks/useStaticLayout";

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

const HERO_VIDEO_SRC = "/videos/video-ink.mp4";
const HERO_VIDEO_MOBILE_SRC = "/videos/ink-mobile-main.mp4";
const MIN_HEIGHT_VH = 10;
const MAX_HEIGHT_VH = 100;

function getVideoHeightVh(progress: number) {
  const eased = smoothstep(Math.min(Math.max(progress, 0), 1));

  return MIN_HEIGHT_VH + eased * (MAX_HEIGHT_VH - MIN_HEIGHT_VH);
}

function VideoPlayer() {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover md:hidden"
      >
        <source src={HERO_VIDEO_MOBILE_SRC} type="video/mp4" />
      </video>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
    </>
  );
}

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isStaticLayout = useStaticLayout();
  const [videoHeightVh, setVideoHeightVh] = useState(MIN_HEIGHT_VH);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setVideoHeightVh(getVideoHeightVh(value));
  });

  useEffect(() => {
    setVideoHeightVh(getVideoHeightVh(scrollYProgress.get()));
  }, [scrollYProgress]);

  if (isStaticLayout) {
    return (
      <section ref={sectionRef} className="relative min-h-screen bg-ink-red">
        <div className="relative h-screen w-full">
          <VideoPlayer />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-ink-red">
      <div className="sticky top-0 z-30 h-screen w-full overflow-hidden bg-ink-red">
        <div
          style={{ height: `${videoHeightVh}vh` }}
          className="relative w-full overflow-hidden"
        >
          <VideoPlayer />
        </div>
      </div>
    </section>
  );
}
