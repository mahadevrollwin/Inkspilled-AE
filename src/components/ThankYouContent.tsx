"use client";

import LocaleLink from "@/components/LocaleLink";
import { useDictionary } from "@/i18n/locale-context";

const DIVIDER_COLORS = ["bg-ink-red", "bg-[#4caf50]", "bg-ink-blue"] as const;

export default function ThankYouContent() {
  const t = useDictionary();

  return (
    <main className="relative min-h-[70vh] overflow-hidden bg-[#1a1a1a] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 15% 20%, rgba(220,92,82,0.28), transparent 55%), radial-gradient(ellipse 60% 50% at 85% 75%, rgba(41,182,232,0.22), transparent 50%)",
        }}
      />

      <section className="relative mx-auto flex w-full max-w-[1400px] flex-col items-start justify-center px-6 py-28 md:px-10 md:py-36">
        <p className="font-display text-[28px] font-bold leading-none text-[#d4d4d4] md:text-[32px]">
          {t.thankYou.kicker}
        </p>
        <div className="mt-1 inline-flex flex-col items-stretch">
          <h1 className="font-display text-[64px] font-extrabold leading-none text-[#e8e8e8] md:text-[90px]">
            {t.thankYou.title}
          </h1>
          <div className="mt-4 flex h-[3px] w-full max-w-[280px] md:mt-5 md:max-w-[360px]">
            {DIVIDER_COLORS.map((colorClass) => (
              <span key={colorClass} className={`h-full w-1/3 ${colorClass}`} />
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-xl font-body text-sm leading-relaxed text-white/90 md:text-[16px]">
          {t.thankYou.copy}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <LocaleLink
            href="/"
            className="inline-flex items-center justify-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-white bg-white px-6 py-3 font-body text-sm font-semibold text-[#1a1a1a] transition-opacity hover:opacity-90"
          >
            {t.thankYou.home}
          </LocaleLink>
          <LocaleLink
            href="/contact"
            className="inline-flex items-center justify-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-white px-6 py-3 font-body text-sm text-white transition-opacity hover:opacity-85"
          >
            {t.thankYou.another}
          </LocaleLink>
        </div>
      </section>
    </main>
  );
}
