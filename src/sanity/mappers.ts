import type { PortableTextBlock } from "./portable-text";
import { isBlogHeading, type BlogContentBlock, type BlogPost } from "@/data/blogs";
import { SERVICES, type ServicePageData } from "@/data/services";
import { resolveImageUrl } from "./image";
import type {
  SanityAboutPageDoc,
  SanityBlogDoc,
  SanityContactPageDoc,
  SanityFaqDoc,
  SanityHomepageDoc,
  SanityServiceDoc,
  SanitySiteSettingsDoc,
} from "./queries";

const HEADING_STYLES = new Set(["h1", "h2", "h3", "h4"]);

function portableTextToBlocks(
  blocks: PortableTextBlock[] | undefined,
): BlogContentBlock[] {
  if (!blocks?.length) return [];

  return blocks.flatMap((block) => {
    if (block._type !== "block" || !Array.isArray(block.children)) {
      return [];
    }

    const text = block.children
      .map((child) => ("text" in child ? String(child.text) : ""))
      .join("")
      .trim();

    if (!text) return [];

    const heading =
      HEADING_STYLES.has(block.style || "") || isBlogHeading(text);

    return [{ text, heading }];
  });
}

function formatPublishedDate(value?: string): string {
  if (!value) return "";

  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function mapSanityService(doc: SanityServiceDoc): ServicePageData {
  const fallback = SERVICES.find((service) => service.slug === doc.slug);

  return {
    slug: doc.slug,
    title: fallback?.title || doc.title,
    eyebrow: fallback?.eyebrow || doc.eyebrow || "",
    summary: fallback?.summary || doc.summary || "",
    intro: fallback?.intro,
    offeringsEyebrow: fallback?.offeringsEyebrow || "THE CRAFT",
    offeringsTitle:
      fallback?.offeringsTitle || "We don't decorate brands. We give them a spine.",
    accent: doc.accent || "#dc5c52",
    image: resolveImageUrl(doc.image, doc.imagePath) || "/services/branding.png",
    backgroundImage:
      resolveImageUrl(doc.backgroundImage, doc.backgroundImagePath) ||
      resolveImageUrl(doc.image, doc.imagePath) ||
      "/services/branding.png",
    heroVideo: fallback?.heroVideo || "/videos/services/branding-design.mp4",
    items: fallback?.items?.length
      ? fallback.items
      : (doc.items || []).map((item) => ({
          title: item.title,
          description: item.description || "",
        })),
  };
}

export function mapSanityBlogPost(doc: SanityBlogDoc): BlogPost {
  const blocks = portableTextToBlocks(doc.body);

  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt || "",
    image: resolveImageUrl(doc.image, doc.imagePath) || "/blog/blog-01.png",
    category: doc.category || "Studio Notes",
    date: formatPublishedDate(doc.publishedAt),
    readTime: doc.readTime || "5 min read",
    author: doc.author || "Inkspilled Studio",
    content: blocks.length > 0 ? blocks : [{ text: doc.excerpt || "", heading: false }],
  };
}

export function mapSanityBlogPosts(docs: SanityBlogDoc[] | null | undefined) {
  if (!docs?.length) return [];

  return docs.flatMap((doc) => {
    try {
      const post = mapSanityBlogPost(doc);
      return post.slug ? [post] : [];
    } catch {
      return [];
    }
  });
}

export function mapSanityFaq(doc: SanityFaqDoc) {
  return {
    question: doc.question,
    answer: doc.answer,
  };
}

export type AboutPageContentData = {
  eyebrow: string;
  title: string;
  intro: string;
  storyEyebrow: string;
  storyTitle: string;
  storyParagraphs: string[];
  valuesEyebrow: string;
  valuesTitle: string;
  values: { title: string; copy: string }[];
  stats: { value: string; label: string }[];
  ctaTitle: string;
  ctaCopy: string;
  ctaButtonLabel: string;
};

export type ContactOffice = {
  label: string;
  company: string;
  lines: string[];
  phone?: string;
  mapHref?: string;
};

export type ContactPageContentData = {
  eyebrow: string;
  title: string;
  intro: string;
  metaPills: string[];
  formTitle: string;
  formIntro: string;
  statsEyebrow: string;
  statsTitle: string;
  stats: { value: string; label: string }[];
  locationTitle: string;
  locationIntro: string;
  officeLabel: string;
  officeCompany: string;
  officeLines: string[];
  offices: ContactOffice[];
  officeHours: string;
  careersTitle: string;
  careersCopy: string;
  careersButtonLabel: string;
};

export type HomepageContentData = {
  heroHeadlineTop: string;
  heroHeadlines: string[];
  heroTagline: string;
  brandTitle: string;
  whoWeAreCopy: string;
  letsTalkCopy: string;
  letsTalkButtonLabel: string;
  blogSectionEyebrow: string;
  blogSectionTitle: string;
};

export type SiteSettingsData = {
  siteTitle: string;
  siteDescription: string;
  contactEmail: string;
  phoneMobile: string;
  phoneOffice: string;
  address: string;
  location: string;
  socialLinks: { label: string; href: string }[];
  footerLinksLeft: { label: string; href: string }[];
  footerLinksRight: { label: string; href: string }[];
  budgetOptions: string[];
};

export function mapSanityAboutPage(
  doc: SanityAboutPageDoc | null,
  fallback: AboutPageContentData,
): AboutPageContentData {
  if (!doc) return fallback;

  return {
    eyebrow: doc.eyebrow || fallback.eyebrow,
    title: doc.title || fallback.title,
    intro: doc.intro || fallback.intro,
    storyEyebrow: doc.storyEyebrow || fallback.storyEyebrow,
    storyTitle: doc.storyTitle || fallback.storyTitle,
    storyParagraphs:
      doc.storyParagraphs?.length ? doc.storyParagraphs : fallback.storyParagraphs,
    valuesEyebrow: doc.valuesEyebrow || fallback.valuesEyebrow,
    valuesTitle: doc.valuesTitle || fallback.valuesTitle,
    values:
      doc.values?.length ?
        doc.values.map((value) => ({
          title: value.title,
          copy: value.copy || "",
        }))
      : fallback.values,
    stats: fallback.stats,
    ctaTitle: doc.ctaTitle || fallback.ctaTitle,
    ctaCopy: doc.ctaCopy || fallback.ctaCopy,
    ctaButtonLabel: doc.ctaButtonLabel || fallback.ctaButtonLabel,
  };
}

export function mapSanityContactPage(
  doc: SanityContactPageDoc | null,
  fallback: ContactPageContentData,
): ContactPageContentData {
  if (!doc) return fallback;

  return {
    eyebrow: fallback.eyebrow,
    title: doc.title || fallback.title,
    intro: doc.intro || fallback.intro,
    metaPills: fallback.metaPills,
    formTitle: doc.formTitle || fallback.formTitle,
    formIntro: doc.formIntro || fallback.formIntro,
    statsEyebrow: doc.statsEyebrow || fallback.statsEyebrow,
    statsTitle: fallback.statsTitle,
    stats: fallback.stats,
    locationTitle: fallback.locationTitle,
    locationIntro: fallback.locationIntro,
    officeLabel: fallback.officeLabel,
    officeCompany: fallback.officeCompany,
    officeLines: fallback.officeLines,
    offices: fallback.offices,
    officeHours: doc.officeHours || fallback.officeHours,
    careersTitle: doc.careersTitle || fallback.careersTitle,
    careersCopy: doc.careersCopy || fallback.careersCopy,
    careersButtonLabel:
      doc.careersButtonLabel || fallback.careersButtonLabel,
  };
}

export function mapSanityHomepage(
  doc: SanityHomepageDoc | null,
  fallback: HomepageContentData,
): HomepageContentData {
  if (!doc) return fallback;

  return {
    heroHeadlineTop: fallback.heroHeadlineTop,
    heroHeadlines: fallback.heroHeadlines,
    heroTagline: fallback.heroTagline,
    brandTitle: doc.brandTitle || fallback.brandTitle,
    whoWeAreCopy: fallback.whoWeAreCopy,
    letsTalkCopy: fallback.letsTalkCopy,
    letsTalkButtonLabel: fallback.letsTalkButtonLabel,
    blogSectionEyebrow: doc.blogSectionEyebrow || fallback.blogSectionEyebrow,
    blogSectionTitle: doc.blogSectionTitle || fallback.blogSectionTitle,
  };
}

export function mapSanitySiteSettings(
  doc: SanitySiteSettingsDoc | null,
  fallback: SiteSettingsData,
): SiteSettingsData {
  if (!doc) return fallback;

  return {
    siteTitle: doc.siteTitle || fallback.siteTitle,
    siteDescription: doc.siteDescription || fallback.siteDescription,
    contactEmail: fallback.contactEmail,
    phoneMobile: doc.phoneMobile || fallback.phoneMobile,
    phoneOffice: doc.phoneOffice || fallback.phoneOffice,
    address: doc.address || fallback.address,
    location: doc.location || fallback.location,
    socialLinks: doc.socialLinks?.length ? doc.socialLinks : fallback.socialLinks,
    footerLinksLeft:
      doc.footerLinksLeft?.length ? doc.footerLinksLeft : fallback.footerLinksLeft,
    footerLinksRight:
      doc.footerLinksRight?.length ? doc.footerLinksRight : fallback.footerLinksRight,
    budgetOptions:
      doc.budgetOptions?.length ? doc.budgetOptions : fallback.budgetOptions,
  };
}
