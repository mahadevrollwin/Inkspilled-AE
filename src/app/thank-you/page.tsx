import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Thank You, Inkspilled",
  description:
    "Thanks for reaching out to Inkspilled. We have received your inquiry and will be in touch shortly.",
};

const DIVIDER_COLORS = ["bg-ink-red", "bg-[#4caf50]", "bg-ink-blue"] as const;

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
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
            Message
          </p>
          <div className="mt-1 inline-flex flex-col items-stretch">
            <h1 className="font-display text-[64px] font-extrabold leading-none text-[#e8e8e8] md:text-[90px]">
              Received
            </h1>
            <div className="mt-4 flex h-[3px] w-full max-w-[280px] md:mt-5 md:max-w-[360px]">
              {DIVIDER_COLORS.map((colorClass) => (
                <span key={colorClass} className={`h-full w-1/3 ${colorClass}`} />
              ))}
            </div>
          </div>

          <p className="mt-8 max-w-xl font-body text-sm leading-relaxed text-white/90 md:text-[16px]">
            Thank you for getting in touch with Inkspilled. Your inquiry is on
            its way to our team. We will review the details and reply shortly
            with next steps.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-white bg-white px-6 py-3 font-body text-sm font-semibold text-[#1a1a1a] transition-opacity hover:opacity-90"
            >
              Back To Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-white px-6 py-3 font-body text-sm text-white transition-opacity hover:opacity-85"
            >
              Send Another Message
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
