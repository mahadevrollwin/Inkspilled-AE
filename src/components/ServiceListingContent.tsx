"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import type { ServicePageData } from "@/data/services";
import ServiceListingBackdrop from "@/components/ServiceListingBackdrop";
import AboutHeroWordField from "@/components/AboutHeroWordField";

const EASE = [0.22, 1, 0.36, 1] as const;

function ColorDivider() {
  return (
    <div className="flex h-[3px] w-28 overflow-hidden" aria-hidden>
      <span className="w-1/3 bg-ink-red" />
      <span className="w-1/3 bg-[#79c146]" />
      <span className="w-1/3 bg-ink-blue" />
    </div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const reduceMotion = useReducedMotion();
  const offset =
    direction === "left"
      ? { x: -40, y: 0 }
      : direction === "right"
        ? { x: 40, y: 0 }
        : { x: 0, y: 40 };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px 15% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ServiceCard({
  service,
  index,
  delay = 0,
}: {
  service: ServicePageData;
  index: number;
  delay?: number;
}) {
  const href = `/services/${service.slug}`;
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal delay={delay} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] rounded-tr-none border border-black/[0.08] text-left shadow-[0_18px_40px_rgba(20,20,20,0.08)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_64px_rgba(20,20,20,0.14)]">
        <Link
          href={href}
          className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#202020]"
        >
          <Image
            src={service.image}
            alt=""
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <div
            className="absolute left-0 top-0 h-1.5 w-full"
            style={{ backgroundColor: service.accent }}
          />
          <span className="absolute bottom-3 right-4 font-display text-5xl font-extrabold leading-none tracking-[-0.06em] text-white/35 md:text-6xl">
            {number}
          </span>
        </Link>

        <div className="flex flex-1 flex-col bg-white px-5 pb-6 pt-5 md:px-6 md:pb-7 md:pt-6">
          <h2 className="font-display text-xl font-bold leading-snug tracking-[-0.02em] text-ink-dark md:text-2xl">
            <Link href={href} className="transition-opacity hover:opacity-75">
              {service.title}
            </Link>
          </h2>

          <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ink-gray md:mt-4 md:text-[15px]">
            {service.summary}
          </p>

          <div className="mt-6">
            <Link
              href={href}
              className="inline-flex items-center justify-center rounded-tl-[8px] rounded-tr-none rounded-br-[8px] rounded-bl-[8px] border border-ink-dark bg-white px-5 py-2.5 font-body text-xs font-bold text-ink-dark transition-[background-color,color] duration-300 hover:bg-ink-dark hover:text-white md:px-6 md:py-3 md:text-sm"
            >
              Explore More →
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function ServiceListingContent({
  services,
}: {
  services: ServicePageData[];
}) {
  const listingRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: listingRef,
    offset: ["start end", "end start"],
  });

  return (
    <>
      <section className="relative overflow-hidden bg-[#141414] pb-16 pt-32 text-white md:pb-20 md:pt-40">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 85% 20%, rgba(220,92,82,0.35), transparent 55%), radial-gradient(ellipse 50% 50% at 10% 80%, rgba(41,182,232,0.2), transparent 50%)",
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-[1] hidden lg:flex">
          <div className="flex h-full w-full min-w-0">
            <span
              aria-hidden
              className="invisible shrink-0 whitespace-nowrap pl-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))] font-display text-[42px] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-[72px]"
            >
              Services
            </span>
            <div
              className="pointer-events-auto min-h-0 min-w-0 flex-1"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 4%, rgba(0,0,0,0.35) 12%, #000 28%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 4%, rgba(0,0,0,0.35) 12%, #000 28%)",
              }}
            >
              <AboutHeroWordField />
            </div>
          </div>
        </div>

        <div className="pointer-events-none relative z-[2] mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <Reveal direction="left">
            <p className="max-w-xl font-body text-xs font-semibold leading-relaxed tracking-[0.08em] text-white/55 md:text-sm">
              Inkspills. It doesn&apos;t sit in the bottle
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-[42px] font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[72px]">
              Services
            </h1>
            <div className="mt-7">
              <ColorDivider />
            </div>
            <p className="mt-7 max-w-2xl font-body text-sm leading-7 text-white/72 md:text-[15px]">
              We&apos;re a creative and technology studio with one obsession:
              making brands move. Seven disciplines under one roof, brand,
              film, AI, strategy, marketing, and the builds that hold it
              together, run by a single team from first idea to final frame.
              No handoffs. One standard. Everything, done well.
            </p>
            <Link
              href="/contact"
              className="pointer-events-auto mt-8 inline-flex items-center justify-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-white px-6 py-3 font-body text-xs text-white transition-colors hover:bg-white hover:text-[#141414] md:text-sm"
            >
              Start A Project
            </Link>
          </Reveal>
        </div>
      </section>

      <section
        ref={listingRef}
        className="relative bg-white py-16 md:py-24"
      >
        <ServiceListingBackdrop scrollYProgress={scrollYProgress} />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <div className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
            {services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                delay={0.04 + (index % 3) * 0.06}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
