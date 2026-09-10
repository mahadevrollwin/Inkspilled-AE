import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LegalPageContent from "@/components/LegalPageContent";
import Navbar from "@/components/Navbar";
import { TERMS_AND_CONDITIONS } from "@/data/legal";
import { TERMS_SEO, toMetadata } from "@/data/seo";
import { getLocaleParam } from "@/i18n/params";

export const metadata: Metadata = toMetadata(TERMS_SEO);

export default async function TermsAndConditionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await getLocaleParam(params);
  return (
    <main>
      <Navbar />
      <LegalPageContent content={TERMS_AND_CONDITIONS} />
      <Footer />
    </main>
  );
}
