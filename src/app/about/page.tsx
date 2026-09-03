import type { Metadata } from "next";
import AboutPageContent from "@/components/AboutPageContent";
import Footer from "@/components/Footer";
import LetsTalkSection from "@/components/LetsTalkSection";
import Navbar from "@/components/Navbar";
import { ABOUT_SEO, toMetadata } from "@/data/seo";
import { getAboutPageContent } from "@/sanity/fetch";

export const metadata: Metadata = toMetadata(ABOUT_SEO);

export default async function AboutPage() {
  const content = await getAboutPageContent();

  return (
    <main>
      <Navbar />
      <AboutPageContent content={content} />
      <LetsTalkSection />
      <Footer />
    </main>
  );
}
