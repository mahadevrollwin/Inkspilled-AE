import {
  defaultLocale,
  isLocale,
  type Locale,
} from "@/i18n/config";

const ABSOLUTE_HREF = /^(?:[a-z]+:)?\/\//i;

export function stripLocalePrefix(pathname: string): string {
  const match = pathname.match(/^\/(en|ar)(?=\/|$)/);
  if (!match) return pathname || "/";
  const stripped = pathname.slice(match[0].length);
  if (!stripped) return "/";
  return stripped.startsWith("/") ? stripped : `/${stripped}`;
}

export function pathnameLocale(pathname: string): Locale | null {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : null;
}

export function localizePath(
  locale: Locale,
  href: string | undefined | null,
): string {
  if (!href) return locale === defaultLocale ? "/" : `/${locale}`;

  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }

  if (ABSOLUTE_HREF.test(href) || href.startsWith("/api/")) {
    return href;
  }

  const [pathAndQuery, hash] = href.split("#");
  const [pathname, query] = pathAndQuery.split("?");
  const hashSuffix = hash ? `#${hash}` : "";
  const querySuffix = query ? `?${query}` : "";

  if (pathname === "" || pathname === ".") {
    return href;
  }

  const normalized = stripLocalePrefix(pathname || "/");
  const prefixed =
    locale === defaultLocale
      ? normalized
      : normalized === "/"
        ? `/${locale}`
        : `/${locale}${normalized}`;

  return `${prefixed}${querySuffix}${hashSuffix}`;
}

export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  return localizePath(nextLocale, stripLocalePrefix(pathname));
}
