"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import type { ServicePageData } from "@/data/services";
import ServiceOfferingsBackdrop from "@/components/ServiceOfferingsBackdrop";

const EASE = [0.22, 1, 0.36, 1] as const;
const WATERMARK_COLORS = ["#dc5c52", "#79c146", "#29b6e8"] as const;

const WATERMARK_STOP_WORDS = new Set([
  "and",
  "the",
  "of",
  "a",
  "an",
  "&",
  "brand",
]);

const WATERMARK_ACRONYMS = new Set(["2D", "3D", "UX", "UI", "SEO", "VFX", "PPC", "CRO"]);

function offeringWatermark(title: string) {
  const tokens = title
    .split(/\s+/)
    .flatMap((part) => part.split("/"))
    .map((part) => part.replace(/^&/, "").trim())
    .filter(Boolean)
    .filter((part) => !WATERMARK_STOP_WORDS.has(part.toLowerCase()));

  if (!tokens.length) {
    return title.replace(/[^a-zA-Z0-9]/g, "").slice(0, 2).toUpperCase();
  }

  const first = tokens[0].replace(/[^a-zA-Z0-9]/g, "");

  if (tokens.length === 1) {
    return (first.length <= 3 ? first : first.slice(0, 2)).toUpperCase();
  }

  if (WATERMARK_ACRONYMS.has(first.toUpperCase())) {
    return first.toUpperCase();
  }

  return tokens
    .slice(0, 2)
    .map((token) => {
      const compact = token.replace(/[^a-zA-Z0-9]/g, "");
      if (/^\d/.test(compact)) return compact.slice(0, 2);
      return compact.charAt(0);
    })
    .join("")
    .toUpperCase();
}

function ServiceFramedImage({
  src,
  alt,
  variant = "hero",
  accent = "#dc5c52",
  index = 0,
}: {
  src: string;
  alt: string;
  variant?: "hero" | "section";
  accent?: string;
  index?: number;
}) {
  const reduceMotion = useReducedMotion();
  const imageRadius =
    variant === "hero" ? "rounded-[30px] rounded-tr-none" : "rounded-[28px] rounded-tr-none";
  const frameClass =
    variant === "hero"
      ? "mx-auto aspect-square w-full max-w-[560px] border-[5px] border-white shadow-2xl service-framed-image service-framed-image-hero"
      : "aspect-square w-full max-w-[400px] border-[3px] shadow-[0_18px_40px_rgba(20,20,20,0.1)] service-framed-image service-framed-image-section";

  return (
    <div
      className={`group relative overflow-hidden ${frameClass} ${imageRadius}`}
      style={
        {
          "--frame-accent": accent,
          "--frame-delay": `${index * 0.5}s`,
          ...(variant === "section" ? { borderColor: accent } : {}),
        } as React.CSSProperties
      }
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={
          variant === "hero"
            ? "(max-width: 1023px) 90vw, 46vw"
            : "(max-width: 1023px) 400px, 400px"
        }
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      {!reduceMotion ? (
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 ${imageRadius} service-framed-image-glow`}
        />
      ) : null}
    </div>
  );
}

function ColorDivider() {
  return (
    <div className="flex h-[3px] w-28 overflow-hidden" aria-hidden>
      <span className="w-1/3 bg-ink-red" />
      <span className="w-1/3 bg-[#79c146]" />
      <span className="w-1/3 bg-ink-blue" />
    </div>
  );
}

function splitOfferingTitle(title: string, slug: string) {
  if (slug === "website-design-development") {
    const sentences = title.split(/(?<=\.)\s+/);
    if (sentences.length < 3) return sentences;
    return [sentences.slice(0, -1).join(" "), sentences[sentences.length - 1]];
  }

  if (slug === "ai-cg") {
    return title.split(/(?<=\.)\s+/);
  }

  return title.split(/(?<=[.,])\s+/);
}

function Reveal({
  children,
  direction = "up",
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const offset =
    direction === "left"
      ? { x: -48, y: 0 }
      : direction === "right"
        ? { x: 48, y: 0 }
        : { x: 0, y: 42 };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ServicePageContent({
  service,
  children,
}: {
  service: ServicePageData;
  children?: React.ReactNode;
}) {
  const creamRef = useRef<HTMLDivElement>(null);
  const offeringsRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: creamRef,
    offset: ["start end", "end start"],
  });

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#141414] pb-20 pt-32 text-white md:pb-24 md:pt-40 lg:min-h-[720px] lg:py-40">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={service.backgroundImage}
          className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
        >
          <source src={service.heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-[#141414]/35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#141414] via-[#141414]/80 to-[#141414]/35" />

        <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-12 px-6 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal direction="left">
            <p
              className="font-body text-xs font-semibold uppercase tracking-[0.24em]"
              style={{ color: service.accent }}
            >
              {service.eyebrow}
            </p>
            <h1 className="mt-5 max-w-2xl font-display text-[42px] font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[72px]">
              {service.title}
            </h1>
            <div className="mt-7">
              <ColorDivider />
            </div>
            <div className="mt-7 max-w-xl space-y-4 font-body">
              {(service.intro?.length ? service.intro : [service.summary]).map(
                (paragraph, index) => (
                  <p
                    key={paragraph}
                    className={
                      service.intro?.length && index === 0
                        ? "text-sm font-bold leading-7 text-white/72 md:text-[15px]"
                        : "text-sm leading-7 text-white/72 md:text-[15px]"
                    }
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>
            <Link
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px] border border-white px-6 py-3 font-body text-xs text-white transition-colors hover:bg-white hover:text-[#141414] md:text-sm"
            >
              Start A Project
            </Link>
          </Reveal>
        </div>
      </section>

      <div ref={creamRef} className="relative bg-[#eaeae8]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(#232323 1px, transparent 1px), linear-gradient(90deg, #232323 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <ServiceOfferingsBackdrop
          scrollYProgress={scrollYProgress}
          seed={service.slug}
          showIcons={false}
        />
      <section
        ref={offeringsRef}
        id="services-list"
        className="relative isolate overflow-hidden scroll-mt-20 py-20 md:py-28"
      >
        <ServiceOfferingsBackdrop
          scrollYProgress={scrollYProgress}
          seed={service.slug}
          showLines={false}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <Reveal
            className={`mx-auto mb-16 text-center md:mb-24 ${
              service.slug === "website-design-development"
                ? "max-w-4xl"
                : service.slug === "ai-cg"
                  ? "max-w-3xl"
                  : "max-w-2xl"
            }`}
          >
            <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-ink-gray">
              {service.offeringsEyebrow}
            </p>
            <h2
              className={
                service.slug === "website-design-development"
                  ? "mt-4 font-display text-[1.5rem] font-bold leading-snug tracking-[-0.025em] text-ink-dark md:text-[1.7rem]"
                  : service.slug === "ai-cg"
                    ? "mt-4 font-display text-[1.65rem] font-bold leading-snug tracking-[-0.025em] text-ink-dark md:text-[1.85rem]"
                    : "mt-4 font-display text-3xl font-bold leading-snug tracking-[-0.025em] text-ink-dark md:text-4xl"
              }
            >
              {splitOfferingTitle(service.offeringsTitle, service.slug).map(
                (line, index) => (
                  <Fragment key={`${line}-${index}`}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </Fragment>
                ),
              )}
            </h2>
            <div className="mx-auto mt-6 w-fit">
              <ColorDivider />
            </div>
          </Reveal>

          <div className="space-y-20 md:space-y-28">
            {service.items.map((item, index) => {
              const imageFirst = index % 2 === 1;
              const watermark = offeringWatermark(item.title);

              return (
                <article
                  key={item.title}
                  className="relative grid items-center gap-9 lg:grid-cols-2 lg:gap-16"
                >
                  <Reveal
                    direction={imageFirst ? "right" : "left"}
                    className={
                      imageFirst
                        ? "relative z-10 lg:order-2"
                        : "relative z-10"
                    }
                  >
                    <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-ink-dark md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-5 max-w-xl font-body text-sm leading-7 text-ink-gray md:text-[15px]">
                      {item.description}
                    </p>
                  </Reveal>

                  <Reveal
                    direction={imageFirst ? "left" : "right"}
                    className={
                      imageFirst
                        ? "flex justify-center lg:order-1 lg:justify-start"
                        : "flex justify-center lg:justify-end"
                    }
                    delay={0.06}
                  >
                    <div className="relative w-full max-w-[400px]">
                      <span
                        aria-hidden
                        className={`service-offering-watermark pointer-events-none absolute top-1/2 z-0 select-none whitespace-nowrap font-display font-extrabold leading-[0.78] tracking-[-0.07em] ${
                          watermark.length > 2
                            ? "text-[7rem] md:text-[10rem] lg:text-[12rem]"
                            : "text-[10rem] md:text-[15rem] lg:text-[18rem]"
                        } ${imageFirst ? "right-0 left-auto" : "left-0"}`}
                        style={
                          {
                            "--watermark-color": WATERMARK_COLORS[index % WATERMARK_COLORS.length],
                            "--watermark-shift": imageFirst ? "95%" : "-95%",
                            animationDelay: `${index * 0.7}s`,
                          } as React.CSSProperties
                        }
                      >
                        {watermark}
                      </span>
                      <div className="relative z-10">
                        <ServiceFramedImage
                          src={item.image || service.image}
                          alt={item.title}
                          variant="section"
                          accent={service.accent}
                          index={index}
                        />
                      </div>
                    </div>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>
        {children}
      </div>
    </>
  );
}
