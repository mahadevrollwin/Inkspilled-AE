import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LetsTalkSection from "@/components/LetsTalkSection";
import Navbar from "@/components/Navbar";
import ServiceListingContent from "@/components/ServiceListingContent";
import { getLocaleParam } from "@/i18n/params";
import { getServices } from "@/sanity/fetch";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Services | Inkspilled",
  description:
    "Explore Inkspilled services, branding, film, AI & CGI, strategy, social, digital marketing and website design in Dubai.",
};

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
