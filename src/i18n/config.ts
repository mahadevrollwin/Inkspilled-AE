export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeCookieName = "NEXT_LOCALE";

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  ar: "ar",
};

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "ar";
}

export function toLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale;
}
