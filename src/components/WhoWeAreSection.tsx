"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useStaticLayout } from "@/hooks/useStaticLayout";
import WhoWeAreSingularityBackground from "@/components/WhoWeAreSingularityBackground";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

function ColorDividerLine() {
  return (
    <>
      <span className="h-full w-1/3 bg-ink-red" />
      <span className="h-full w-1/3 bg-[#4caf50]" />
      <span className="h-full w-1/3 bg-ink-blue" />
    </>
  );
}

function AnimatedDivider({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.35], [0, 1]);

  return (
    <motion.div
      style={{ scaleX: progress, opacity, transformOrigin: "center center" }}
      className="mt-5 flex h-[3px] w-full"
    >
      <ColorDividerLine />
    </motion.div>
  );
}

const WHO_WE_ARE_HEADING_CLASS = "font-proxima-nova font-extrabold leading-none";
const WHO_WE_ARE_TEXT_SHADOW =
  "[text-shadow:0_2px_24px_rgba(0,0,0,0.9)]";

function OutlinedHeading({
  fillOpacity,
  whoOpacity,
  weOpacity,
  areOpacity,
  animated = false,
}: {
  fillOpacity?: MotionValue<number>;
  whoOpacity?: MotionValue<number>;
  weOpacity?: MotionValue<number>;
  areOpacity?: MotionValue<number>;
  animated?: boolean;
}) {
  const headingClass = animated
    ? `${WHO_WE_ARE_HEADING_CLASS} [font-size:inherit]`
    : `${WHO_WE_ARE_HEADING_CLASS} text-[11vw] sm:text-[64px] md:text-[80px] lg:text-[96px]`;

  const words = (
    <>
      {whoOpacity ? (
        <motion.span style={{ opacity: whoOpacity }}>Who</motion.span>
      ) : (
        <span>Who</span>
      )}
      {weOpacity ? (
        <motion.span style={{ opacity: weOpacity }}> We</motion.span>
      ) : (
        <span> We</span>
      )}
      {areOpacity ? (
        <motion.span style={{ opacity: areOpacity }}> Are?</motion.span>
      ) : (
        <span> Are?</span>
      )}
    </>
  );

  if (!animated && !fillOpacity) {
    return (
      <h2
        className={`${headingClass} text-white ${WHO_WE_ARE_TEXT_SHADOW}`}
      >
        Who We Are?
      </h2>
    );
  }

  return (
    <div className="relative inline-block">
      <h2
        className={`${headingClass} text-transparent ${WHO_WE_ARE_TEXT_SHADOW}`}
        style={{ WebkitTextStroke: "2px #ffffff" }}
      >
        {words}
      </h2>
      {fillOpacity ? (
        <motion.h2
          style={{ opacity: fillOpacity }}
          className={`absolute inset-0 ${headingClass} text-white ${WHO_WE_ARE_TEXT_SHADOW}`}
          aria-hidden
        >
          Who We Are?
        </motion.h2>
      ) : null}
    </div>
  );
}

const ABOUT_US_BUTTON_CLASS =
  "inline-block rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-white/30 bg-white/10 px-10 py-3 font-body text-sm font-medium text-[#fff] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-md transition-[background-color,border-color] hover:border-white/45 hover:bg-white/15";

function WhoWeAreContentPanel({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/20 bg-white/[0.07] px-6 py-10 shadow-[0_8px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl backdrop-saturate-150 md:px-12 md:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px] bg-[#010103]/25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/[0.16] via-white/[0.05] to-white/[0.02]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
      />
      <div className="relative text-center">{children}</div>
    </div>
  );
}

function AboutUsButton({ className = "" }: { className?: string }) {
  return (
    <Link href="/about" className={`${ABOUT_US_BUTTON_CLASS} ${className}`.trim()}>
      About Us
    </Link>
  );
}

/** Mobile-only: fade up on enter, reverse on scroll back up. */
function MobileWhoWeAreReveal({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: REVEAL_EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function WhoWeAreSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isStaticLayout = useStaticLayout();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const whoOpacity = useTransform(scrollYProgress, [0.06, 0.18], [0, 1]);
  const weOpacity = useTransform(scrollYProgress, [0.2, 0.34], [0, 1]);
  const areOpacity = useTransform(scrollYProgress, [0.36, 0.5], [0, 1]);

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.52], [0, 1]);
  const fillOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  const headingFontSize = useTransform(scrollYProgress, [0, 0.58, 0.9], [93, 93, 40]);
  const headingY = useTransform(scrollYProgress, [0.58, 0.9], [0, -48]);

  const paragraphOpacity = useTransform(scrollYProgress, [0.58, 0.72], [0, 1]);
  const paragraphY = useTransform(scrollYProgress, [0.58, 0.72], [28, 0]);
  const buttonOpacity = useTransform(scrollYProgress, [0.62, 0.68], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.62, 0.68], [20, 0]);

  const staticContent = (
    <WhoWeAreContentPanel>
      <div className="mx-auto flex flex-col items-center text-center">
        <OutlinedHeading />
        <div className="mt-5 flex h-[3px] w-full max-w-[750px]">
          <ColorDividerLine />
        </div>
        <p
          className={`mt-[30px] font-body text-sm leading-relaxed text-white/95 md:text-base ${WHO_WE_ARE_TEXT_SHADOW}`}
        >
          Inkspilled Is A Creative Branding Agency In Dubai For Businesses That Refuse
          To Blend In. We Lead With Strategy, Shape Identity Through Design, And Bring
          Ideas Alive As A Full Service Creative Studio. From Startups Finding A Voice
          To Category Leaders Entering New Markets, We Build Brands People Remember And
          Choose. Creative Leads. Digital Scales. That Is The Inkspilled Edge.
        </p>
        <AboutUsButton className="mt-10" />
      </div>
    </WhoWeAreContentPanel>
  );

  if (isStaticLayout) {
    return (
      <section id="about" className="relative overflow-hidden bg-[#010103] py-12 md:py-24">
        <WhoWeAreSingularityBackground />
        <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-4xl items-start px-4 md:min-h-[70vh] md:items-center md:px-6">
          <MobileWhoWeAreReveal>{staticContent}</MobileWhoWeAreReveal>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 h-[260vh] overflow-visible bg-[#010103]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden py-10">
        <WhoWeAreSingularityBackground
          scrollYProgress={scrollYProgress}
          animated
        />
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 md:px-6">
          <WhoWeAreContentPanel>
            <motion.div
              style={{ fontSize: headingFontSize, y: headingY }}
              className="mx-auto w-full max-w-[750px] will-change-transform"
            >
              <OutlinedHeading
                animated
                fillOpacity={fillOpacity}
                whoOpacity={whoOpacity}
                weOpacity={weOpacity}
                areOpacity={areOpacity}
              />
              <AnimatedDivider progress={lineProgress} />
            </motion.div>

            <div className="w-full">
              <motion.p
                style={{ opacity: paragraphOpacity, y: paragraphY }}
                className={`font-body text-sm leading-relaxed text-white/95 md:text-base ${WHO_WE_ARE_TEXT_SHADOW}`}
              >
                Inkspilled Is A Creative Branding Agency In Dubai For Businesses That
                Refuse To Blend In. We Lead With Strategy, Shape Identity Through
                Design, And Bring Ideas Alive As A Full Service Creative Studio. From
                Startups Finding A Voice To Category Leaders Entering New Markets, We
                Build Brands People Remember And Choose. Creative Leads. Digital Scales.
                That Is The Inkspilled Edge.
              </motion.p>

              <motion.div
                style={{ opacity: buttonOpacity, y: buttonY }}
                className="mt-10"
              >
                <AboutUsButton />
              </motion.div>
            </div>
          </WhoWeAreContentPanel>
        </div>
      </div>
    </section>
  );
}
