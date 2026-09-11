import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CONTACT_SEO, toMetadata } from "@/data/seo";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocaleParam } from "@/i18n/params";
import { getContactPageContent, getSiteSettings } from "@/sanity/fetch";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getLocaleParam(params);
  const t = getDictionary(locale);

  return toMetadata(
    locale === "ar"
      ? { title: t.contact.seoTitle, description: t.contact.seoDescription }
      : CONTACT_SEO,
  );
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocaleParam(params);
  const [content, settings] = await Promise.all([
    getContactPageContent(locale),
    getSiteSettings(locale),
  ]);

  return (
    <main>
      <Navbar />
      <ContactPageContent
        content={content}
        contactEmail={settings.contactEmail}
        phoneMobile={settings.phoneMobile}
        budgetOptions={settings.budgetOptions}
      />
      <Footer />
    </main>
  );
}
