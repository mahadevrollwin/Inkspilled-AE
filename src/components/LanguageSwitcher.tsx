"use client";

import { usePathname } from "next/navigation";
import { localeCookieName, localeLabels, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-context";
import { switchLocalePath } from "@/i18n/path";

const OTHER_LOCALE: Record<Locale, Locale> = {
  en: "ar",
  ar: "en",
};

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const nextLocale = OTHER_LOCALE[locale];
  const href = switchLocalePath(pathname, nextLocale);

  return (
    <a
      href={href}
      hrefLang={nextLocale}
      lang={nextLocale}
      onClick={() => {
        document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
      }}
      className={`inline-flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-tl-[8px] rounded-tr-none rounded-br-[8px] rounded-bl-[8px] border border-[#cfcfcf]/85 bg-[#1f1f1f] px-3 font-body text-xs font-semibold tracking-wide text-white/90 transition-[background-color,color,border-color] duration-300 ease-out hover:border-white hover:bg-white hover:text-[#141414] sm:h-9 sm:px-3.5 sm:text-[13px] ${className}`.trim()}
      aria-label={
        nextLocale === "ar" ? "التبديل إلى العربية" : "Switch to English"
      }
    >
      {localeLabels[nextLocale]}
    </a>
  );
}
