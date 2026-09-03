import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import LetsTalkSection from "@/components/LetsTalkSection";
import Navbar from "@/components/Navbar";
import OtherServicesSection from "@/components/OtherServicesSection";
import ServicePageContent from "@/components/ServicePageContent";
import SocialMediaMarquee, {
  SERVICE_PLATFORM_ICONS,
} from "@/components/SocialMediaMarquee";
import { getServiceSeo, toMetadata } from "@/data/seo";
import { getServiceBySlug, getServiceSlugs } from "@/sanity/fetch";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 0;

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return toMetadata(
    getServiceSeo(slug, {
      title: `${service.title} | Inkspilled`,
      description: service.intro?.length
        ? service.intro.join(" ")
        : service.summary,
    }),
  );
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getServiceBySlug((await params).slug);

  if (!service) {
    notFound();
  }

  return (
    <main
      className="service-page"
      style={{ "--service-accent": service.accent } as CSSProperties}
    >
      <Navbar />
      <ServicePageContent service={service}>
        {SERVICE_PLATFORM_ICONS[service.slug] ? (
          <SocialMediaMarquee platforms={SERVICE_PLATFORM_ICONS[service.slug]} />
        ) : null}
        <OtherServicesSection currentSlug={service.slug} />
      </ServicePageContent>
      <LetsTalkSection />
      <Footer />
    </main>
  );
}
