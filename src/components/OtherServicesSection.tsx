"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SERVICES, type ServicePageData } from "@/data/services";

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

function OtherServiceCard({
  service,
  reduceMotion,
}: {
  service: ServicePageData;
  reduceMotion: boolean | null;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      draggable={false}
      className="other-service-card group relative flex h-full flex-col rounded-[18px] rounded-tr-none border border-black/[0.08] bg-white shadow-[0_12px_28px_rgba(20,20,20,0.08)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_22px_44px_rgba(20,20,20,0.16)]"
      style={{ "--card-accent": service.accent } as CSSProperties}
    >
      {!reduceMotion ? (
        <span aria-hidden className="other-service-card-spin" />
      ) : (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[3] rounded-[inherit] opacity-0 shadow-[inset_0_0_0_2px_var(--card-accent)] transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      <span className="relative z-[1] block overflow-hidden rounded-[18px] rounded-tr-none">
        <span className="relative block aspect-[16/11] bg-[#202020] lg:aspect-[3/4]">
          <Image
            src={service.image}
            alt=""
            fill
            draggable={false}
            className="pointer-events-none object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 16vw"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%]"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.5) 22%, rgba(0,0,0,0.28) 46%, rgba(0,0,0,0.12) 68%, rgba(0,0,0,0) 100%)",
            }}
          />
          <span
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{ backgroundColor: service.accent }}
          />
          <span className="absolute bottom-0 left-0 right-0 p-4 lg:p-3">
            <span className="block font-display text-[15px] font-bold leading-snug tracking-[-0.02em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.55)] lg:text-[13px] xl:text-[14px]">
              {service.title}
            </span>
            <span className="mt-2 inline-flex items-center gap-1 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-white">
              Explore
              <span aria-hidden>→</span>
            </span>
          </span>
        </span>
      </span>
    </Link>
  );
}

const ARROW_CLASS =
  "grid h-10 w-10 place-items-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-ink-dark bg-white text-ink-dark transition-opacity hover:opacity-80";

function OtherServicesMobileSlider({
  services,
  reduceMotion,
}: {
  services: ServicePageData[];
  reduceMotion: boolean | null;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBySlide(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const width = scroller.clientWidth;
    const max = Math.max(scroller.scrollWidth - width, 0);
    let next = scroller.scrollLeft + direction * width;

    if (next > max + 8) next = 0;
    if (next < -8) next = max;

    scroller.scrollTo({ left: next, behavior: "smooth" });
  }

  return (
    <div className="md:hidden">
      <div
        ref={scrollerRef}
        className="other-services-slider flex touch-pan-x snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
      >
        {services.map((service) => (
          <div
            key={service.slug}
            className="w-full min-w-full shrink-0 snap-start snap-always px-0"
          >
            <OtherServiceCard service={service} reduceMotion={reduceMotion} />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous service"
          className={ARROW_CLASS}
          onClick={() => scrollBySlide(-1)}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          aria-label="Next service"
          className={ARROW_CLASS}
          onClick={() => scrollBySlide(1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default function OtherServicesSection({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const reduceMotion = useReducedMotion();
  const otherServices = SERVICES.filter((service) => service.slug !== currentSlug);

  if (!otherServices.length) return null;

  return (
    <section
      aria-label="Other services"
      className="relative z-10 py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <div className="mb-10 text-center md:mb-12">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-ink-gray">
            Keep Exploring
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.025em] text-ink-dark md:text-4xl">
            Other Services
          </h2>
          <div className="mx-auto mt-5 w-fit">
            <ColorDivider />
          </div>
        </div>

        <OtherServicesMobileSlider
          services={otherServices}
          reduceMotion={reduceMotion}
        />

        <ul className="hidden grid-cols-1 gap-4 sm:grid-cols-2 md:grid md:gap-5 lg:grid-cols-6 lg:gap-3 xl:gap-4">
          {otherServices.map((service, index) => (
            <motion.li
              key={service.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.05, ease: EASE }}
            >
              <OtherServiceCard service={service} reduceMotion={reduceMotion} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
