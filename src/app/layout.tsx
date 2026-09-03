import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import BlankLinksGuard from "@/components/BlankLinksGuard";
import ChatWidget from "@/components/Chatbot/ChatWidget";
import { HOME_SEO, toMetadata } from "@/data/seo";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  ...toMetadata(HOME_SEO),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className={`${montserrat.className} antialiased`}>
        <BlankLinksGuard />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
