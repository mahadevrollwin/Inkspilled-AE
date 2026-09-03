import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandSection from "@/components/BrandSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import ServicesSection from "@/components/ServicesSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import FaqSection from "@/components/FaqSection";
import BlogSection from "@/components/BlogSection";
import LetsTalkSection from "@/components/LetsTalkSection";
import Footer from "@/components/Footer";
import { HOME_SEO, toMetadata } from "@/data/seo";
import { getFaqs, getFeaturedBlogs, getHomepageContent } from "@/sanity/fetch";

export const metadata: Metadata = toMetadata(HOME_SEO);

export const revalidate = 0;

export default async function Home() {
  const [homepage, faqs, featuredBlogs] = await Promise.all([
    getHomepageContent(),
    getFaqs(),
    getFeaturedBlogs(),
  ]);

  return (
    <main>
      <Navbar />
      <Hero />
      <BrandSection />
      <WhoWeAreSection />
      <ServicesSection />
      <HowWeWorkSection />
      <BlogSection
        posts={featuredBlogs}
        eyebrow={homepage.blogSectionEyebrow}
        title={homepage.blogSectionTitle}
      />
      <LetsTalkSection />
      <FaqSection items={faqs} />
      <Footer />
    </main>
  );
}
