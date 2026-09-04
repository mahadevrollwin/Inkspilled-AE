import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LegalPageContent from "@/components/LegalPageContent";
import Navbar from "@/components/Navbar";
import { TERMS_AND_CONDITIONS } from "@/data/legal";
import { TERMS_SEO, toMetadata } from "@/data/seo";

export const metadata: Metadata = toMetadata(TERMS_SEO);

export default function TermsAndConditionsPage() {
  return (
    <main>
      <Navbar />
      <LegalPageContent content={TERMS_AND_CONDITIONS} />
      <Footer />
    </main>
  );
}
