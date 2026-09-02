import type { Metadata } from "next";
import AboutPageContent from "@/components/AboutPageContent";
import Footer from "@/components/Footer";
import LetsTalkSection from "@/components/LetsTalkSection";
import Navbar from "@/components/Navbar";
import { getAboutPageContent } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "About Us | Inkspilled",
  description:
    "Learn about Inkspilled — a creative branding agency in Dubai helping ambitious brands stand out through strategy, design, film, and digital.",
};

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
