import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CONTACT_SEO, toMetadata } from "@/data/seo";
import { getContactPageContent, getSiteSettings } from "@/sanity/fetch";

export const metadata: Metadata = toMetadata(CONTACT_SEO);

export default async function ContactPage() {
  const [content, settings] = await Promise.all([
    getContactPageContent(),
    getSiteSettings(),
  ]);

  return (
    <main>
      <Navbar />
      <ContactPageContent
        content={content}
        contactEmail={settings.contactEmail}
        phoneMobile={settings.phoneMobile}
      />
      <Footer />
    </main>
  );
}
