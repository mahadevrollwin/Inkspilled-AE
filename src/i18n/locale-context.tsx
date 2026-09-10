"use client";

import { createContext, useContext } from "react";
import { defaultLocale, localeDirection, type Locale } from "@/i18n/config";
import { dictionaries, type Dictionary } from "@/i18n/dictionaries";

type LocaleContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  dir: localeDirection[defaultLocale],
  t: dictionaries[defaultLocale],
});

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider
      value={{
        locale,
        dir: localeDirection[locale],
        t: dictionaries[locale],
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext).locale;
}

export function useDictionary() {
  return useContext(LocaleContext).t;
}

export function useLocaleContext() {
  return useContext(LocaleContext);
}
