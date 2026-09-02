import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import LetsTalkSection from "@/components/LetsTalkSection";
import Navbar from "@/components/Navbar";
import ServicePageContent from "@/components/ServicePageContent";
import SocialMediaMarquee, {
  SERVICE_PLATFORM_ICONS,
} from "@/components/SocialMediaMarquee";
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
  const service = await getServiceBySlug((await params).slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} | Inkspilled`,
    description: service.intro?.length
      ? service.intro.join(" ")
      : service.summary,
  };
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
      <ServicePageContent service={service} />
      {SERVICE_PLATFORM_ICONS[service.slug] ? (
        <SocialMediaMarquee platforms={SERVICE_PLATFORM_ICONS[service.slug]} />
      ) : null}
      <LetsTalkSection />
      <Footer />
    </main>
  );
}
