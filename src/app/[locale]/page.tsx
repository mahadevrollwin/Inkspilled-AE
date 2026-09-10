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
import { getLocaleParam } from "@/i18n/params";
import { getFaqs, getFeaturedBlogs, getHomepageContent } from "@/sanity/fetch";

export const metadata: Metadata = toMetadata(HOME_SEO);

export const revalidate = 0;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocaleParam(params);
  const [homepage, faqs, featuredBlogs] = await Promise.all([
    getHomepageContent(locale),
    getFaqs(locale),
    getFeaturedBlogs(2, locale),
  ]);

  return (
    <main>
      <Navbar />
      <Hero
        headlines={homepage.heroHeadlines}
        tagline={homepage.heroTagline}
        ctaLabel={homepage.heroButtonLabel}
      />
      <BrandSection title={homepage.brandTitle} copy={homepage.brandCopy} />
      <WhoWeAreSection copy={homepage.whoWeAreCopy} />
      <ServicesSection />
      <HowWeWorkSection />
      <BlogSection
        posts={featuredBlogs}
        eyebrow={homepage.blogSectionEyebrow}
        title={homepage.blogSectionTitle}
      />
      <LetsTalkSection
        copy={homepage.letsTalkCopy}
        buttonLabel={homepage.letsTalkButtonLabel}
      />
      <FaqSection items={faqs} />
      <Footer />
    </main>
  );
}
