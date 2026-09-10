import type { Metadata } from "next";
import { Cairo, Montserrat } from "next/font/google";
import BlankLinksGuard from "@/components/BlankLinksGuard";
import ChatWidget from "@/components/Chatbot/ChatWidget";
import { HOME_SEO, toMetadata } from "@/data/seo";
import { localeDirection, localeHtmlLang, type Locale } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/locale-context";
import { getLocaleParam, localeStaticParams } from "@/i18n/params";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  ...toMetadata(HOME_SEO),
  icons: {
    icon: [
      { url: "/inkspilled-favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/inkspilled-apple-touch-icon.png",
  },
};

export function generateStaticParams() {
  return localeStaticParams();
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = await getLocaleParam(params);
  const fontClass =
    locale === "ar"
      ? `${cairo.variable} ${cairo.className}`
      : `${montserrat.variable} ${montserrat.className}`;

  return (
    <html
      lang={localeHtmlLang[locale as Locale]}
      dir={localeDirection[locale]}
      className={locale === "ar" ? cairo.variable : montserrat.variable}
    >
      <body className={`${fontClass} antialiased`}>
        <LocaleProvider locale={locale}>
          <BlankLinksGuard />
          {children}
          <ChatWidget />
        </LocaleProvider>
      </body>
    </html>
  );
}
