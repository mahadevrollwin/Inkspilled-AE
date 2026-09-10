import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LegalPageContent from "@/components/LegalPageContent";
import Navbar from "@/components/Navbar";
import { PRIVACY_POLICY } from "@/data/legal";
import { PRIVACY_SEO, toMetadata } from "@/data/seo";
import { getLocaleParam } from "@/i18n/params";

export const metadata: Metadata = toMetadata(PRIVACY_SEO);

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await getLocaleParam(params);
  return (
    <main>
      <Navbar />
      <LegalPageContent content={PRIVACY_POLICY} />
      <Footer />
    </main>
  );
}
