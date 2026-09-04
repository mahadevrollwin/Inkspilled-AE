import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LegalPageContent from "@/components/LegalPageContent";
import Navbar from "@/components/Navbar";
import { PRIVACY_POLICY } from "@/data/legal";
import { PRIVACY_SEO, toMetadata } from "@/data/seo";

export const metadata: Metadata = toMetadata(PRIVACY_SEO);

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Navbar />
      <LegalPageContent content={PRIVACY_POLICY} />
      <Footer />
    </main>
  );
}
