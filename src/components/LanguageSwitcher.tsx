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
      className={`inline-flex items-center font-body text-[13px] font-semibold tracking-wide text-white/80 transition-colors hover:text-white ${className}`.trim()}
      aria-label={
        nextLocale === "ar" ? "التبديل إلى العربية" : "Switch to English"
      }
    >
      {localeLabels[nextLocale]}
    </a>
  );
}
