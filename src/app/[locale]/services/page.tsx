import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LetsTalkSection from "@/components/LetsTalkSection";
import Navbar from "@/components/Navbar";
import ServiceListingContent from "@/components/ServiceListingContent";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocaleParam } from "@/i18n/params";
import { getServices } from "@/sanity/fetch";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getLocaleParam(params);
  const t = getDictionary(locale);

  return {
    title: `${t.services.listingTitle} | Inkspilled`,
    description: t.services.listingIntro,
  };
}

export default async function ServiceListingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocaleParam(params);
  const services = await getServices(locale);

  return (
    <main>
      <Navbar />
      <ServiceListingContent services={services} />
      <LetsTalkSection />
      <Footer />
    </main>
  );
}
