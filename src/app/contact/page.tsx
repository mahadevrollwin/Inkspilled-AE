import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getContactPageContent, getSiteSettings } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Contact Us | Inkspilled",
  description:
    "Get in touch with Inkspilled — a creative branding agency in Dubai. Share your brief, book a consultation, or reach us by phone, email, or WhatsApp.",
};

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
