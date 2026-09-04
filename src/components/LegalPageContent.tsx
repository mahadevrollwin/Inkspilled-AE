import type { LegalPageData } from "@/data/legal";

const DIVIDER_COLORS = ["bg-ink-red", "bg-[#4caf50]", "bg-ink-blue"] as const;

export default function LegalPageContent({
  content,
}: {
  content: LegalPageData;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#141414] pb-16 pt-32 text-white md:pb-20 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 85% 20%, rgba(220,92,82,0.35), transparent 55%), radial-gradient(ellipse 50% 50% at 10% 80%, rgba(41,182,232,0.2), transparent 50%)",
          }}
        />
        <div className="relative z-[2] mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
            {content.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-[42px] font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[72px]">
            {content.title}
          </h1>
          <div className="mt-7 flex h-[3px] w-28 overflow-hidden" aria-hidden>
            {DIVIDER_COLORS.map((colorClass) => (
              <span key={colorClass} className={`w-1/3 ${colorClass}`} />
            ))}
          </div>
          <p className="mt-7 max-w-2xl font-body text-sm leading-7 text-white/88 md:text-[15px]">
            {content.intro}
          </p>
          <p className="mt-4 font-body text-xs tracking-wide text-white/55">
            Last updated {content.updated}
          </p>
        </div>
      </section>

      <section className="bg-[#eaeae8] py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <div className="max-w-3xl space-y-10">
            {content.sections.map((section) => (
              <article key={section.heading}>
                <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink-dark md:text-2xl">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-[#3f3f3f] md:text-[15px] md:leading-7">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
