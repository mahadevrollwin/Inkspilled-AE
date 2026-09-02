"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import ContactBriefForm from "@/components/ContactBriefForm";
import BrandStatsSection from "@/components/BrandStatsSection";
import type {
  ContactOffice,
  ContactPageContentData,
} from "@/sanity/mappers";

const EASE = [0.22, 1, 0.36, 1] as const;
const DIVIDER_COLORS = ["bg-ink-red", "bg-[#4caf50]", "bg-ink-blue"] as const;

function OfficeCard({ office }: { office: ContactOffice }) {
  const phoneHref = office.phone?.replace(/\s/g, "");

  return (
    <article className="flex h-full flex-col rounded-[28px] rounded-tr-none border border-ink-dark/10 bg-white p-6 shadow-[0_18px_40px_rgba(20,20,20,0.06)] md:p-8">
      <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-red">
        {office.label}
      </p>
      <h3 className="mt-2 font-display text-lg font-bold text-ink-dark">
        {office.company}
      </h3>
      {office.phone || office.mapHref ? (
        <address className="mt-4 flex-1 space-y-0.5 not-italic">
          {office.lines.map((line) => (
            <p
              key={line}
              className="font-body text-sm leading-relaxed text-ink-gray"
            >
              {line}
            </p>
          ))}
        </address>
      ) : (
        <div className="mt-4 flex-1 space-y-0.5">
          {office.lines.map((line) => (
            <p
              key={line}
              className="font-body text-sm leading-relaxed text-ink-gray"
            >
              {line}
            </p>
          ))}
        </div>
      )}

      {office.phone || office.mapHref ? (
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {office.phone && phoneHref ? (
            <a
              href={`tel:${phoneHref}`}
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-ink-dark transition-opacity hover:opacity-75"
            >
              <Phone size={15} aria-hidden />
              {office.phone}
            </a>
          ) : null}
          {office.mapHref ? (
            <a
              href={office.mapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-ink-blue transition-opacity hover:opacity-75"
            >
              <MapPin size={15} aria-hidden />
              View on map
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

function ColorDivider({ className = "w-28" }: { className?: string }) {
  return (
    <div className={`flex h-[3px] overflow-hidden ${className}`} aria-hidden>
      {DIVIDER_COLORS.map((colorClass) => (
        <span key={colorClass} className={`w-1/3 ${colorClass}`} />
      ))}
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
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 font-body text-xs text-white/75 backdrop-blur-sm md:text-[13px]">
      {children}
    </span>
  );
}

function PreferToTalkPanel({
  contactEmail,
  phoneMobile,
  officeHours,
}: {
  contactEmail: string;
  phoneMobile: string;
  officeHours: string;
}) {
  const whatsappHref = `https://wa.me/${phoneMobile.replace(/\D/g, "")}`;

  return (
    <aside className="rounded-[28px] rounded-tr-none border border-ink-dark/10 bg-[#f7f7f5] p-6 md:p-8">
      <h3 className="font-display text-xl font-bold text-ink-dark md:text-2xl">
        Prefer to talk?
      </h3>
      <p className="mt-3 font-body text-sm leading-relaxed text-ink-gray">
        For anything urgent or if you would rather skip the form, reach us
        directly. We usually respond within one business day.
      </p>

      <ul className="mt-6 space-y-4">
        <li>
          <a
            href={`tel:${phoneMobile.replace(/\s/g, "")}`}
            className="group flex items-start gap-3 font-body text-sm text-ink-dark transition-opacity hover:opacity-75"
          >
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-tl-[8px] rounded-tr-none rounded-br-[8px] rounded-bl-[8px] border border-ink-dark/15 bg-white">
              <Phone size={16} aria-hidden />
            </span>
            <span>
              <span className="block font-semibold">Call us</span>
              <span className="text-ink-gray">{phoneMobile}</span>
            </span>
          </a>
        </li>
        <li>
          <a
            href={`mailto:${contactEmail}`}
            className="group flex items-start gap-3 font-body text-sm text-ink-dark transition-opacity hover:opacity-75"
          >
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-tl-[8px] rounded-tr-none rounded-br-[8px] rounded-bl-[8px] border border-ink-dark/15 bg-white">
              <Mail size={16} aria-hidden />
            </span>
            <span>
              <span className="block font-semibold">Email us</span>
              <span className="text-ink-gray">{contactEmail}</span>
            </span>
          </a>
        </li>
        <li>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 font-body text-sm text-ink-dark transition-opacity hover:opacity-75"
          >
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-tl-[8px] rounded-tr-none rounded-br-[8px] rounded-bl-[8px] border border-ink-dark/15 bg-white">
              <MessageCircle size={16} aria-hidden />
            </span>
            <span>
              <span className="block font-semibold">Message on WhatsApp</span>
              <span className="text-ink-gray">Quick reply during office hours</span>
            </span>
          </a>
        </li>
      </ul>

      <div className="mt-8 border-t border-ink-dark/10 pt-6">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-ink-gray">
          Office hours
        </p>
        <p className="mt-2 font-body text-sm text-ink-dark">
          {officeHours}
        </p>
        <p className="mt-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-ink-gray">
          New business &amp; partnerships
        </p>
        <p className="mt-2 font-body text-sm text-ink-dark">
          {phoneMobile} · {contactEmail}
        </p>
      </div>
    </aside>
  );
}

export default function ContactPageContent({
  content,
  contactEmail,
  phoneMobile,
}: {
  content: ContactPageContentData;
  contactEmail: string;
  phoneMobile: string;
}) {
  const titleLines = content.title.split("\n");

  return (
    <>
      <section className="relative overflow-hidden bg-[#141414] pb-14 pt-32 text-white md:pb-20 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 85% 20%, rgba(220,92,82,0.35), transparent 55%), radial-gradient(ellipse 50% 50% at 10% 80%, rgba(41,182,232,0.2), transparent 50%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <Reveal direction="left">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
              {content.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-[42px] font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[72px]">
              {titleLines[0]}
              {titleLines[1] ? (
                <>
                  <br />
                  <span className="text-white/95">{titleLines[1]}</span>
                </>
              ) : null}
            </h1>
            <div className="mt-7">
              <ColorDivider className="w-32" />
            </div>
            <p className="mt-7 max-w-2xl font-body text-sm leading-7 text-white/72 md:text-[15px]">
              {content.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {content.metaPills.map((pill) => (
                <MetaPill key={pill}>{pill}</MetaPill>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="p-8 md:p-16"
        style={{ background: "var(--cream)" }}
      >
        <div className="mx-auto w-full max-w-[1400px] lg:relative lg:z-10 lg:-mt-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_380px]">
            <Reveal>
              <div className="rounded-[28px] rounded-tr-none border-2 border-white bg-white p-6 shadow-[0_18px_50px_rgba(20,20,20,0.14)] md:p-8">
                <h2 className="font-display text-2xl font-bold text-ink-dark md:text-3xl">
                  {content.formTitle}
                </h2>
                <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-ink-gray md:text-[15px]">
                  {content.formIntro}
                </p>
                <div className="mt-8">
                  <ContactBriefForm />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} direction="right">
              <PreferToTalkPanel
                contactEmail={contactEmail}
                phoneMobile={phoneMobile}
                officeHours={content.officeHours}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <BrandStatsSection />

      <section className="bg-[#eaeae8] py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-ink-dark md:text-3xl">
              {content.locationTitle}
            </h2>
            <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-ink-gray md:text-[15px]">
              {content.locationIntro}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.offices.map((office, index) => (
              <Reveal key={office.label} delay={0.06 * index} className="h-full">
                <OfficeCard office={office} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-dark/10 bg-white py-14 md:py-16">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="font-display text-xl font-bold text-ink-dark md:text-2xl">
                  {content.careersTitle}
                </h2>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-gray">
                  {content.careersCopy}
                </p>
              </div>
              <Link
                href={`mailto:${contactEmail}?subject=Careers%20at%20Inkspilled`}
                className="inline-flex shrink-0 items-center justify-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-ink-dark bg-ink-dark px-6 py-3 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {content.careersButtonLabel}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
