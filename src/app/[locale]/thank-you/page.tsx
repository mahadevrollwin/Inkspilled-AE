import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ThankYouContent from "@/components/ThankYouContent";
import { THANK_YOU_SEO, toMetadata } from "@/data/seo";
import { getLocaleParam } from "@/i18n/params";

export const metadata: Metadata = {
  ...toMetadata(THANK_YOU_SEO),
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await getLocaleParam(params);

  return (
    <>
      <Navbar />
      <ThankYouContent />
      <Footer />
    </>
  );
}
