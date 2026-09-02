import type { PortableTextBlock } from "./portable-text";

export const SERVICES_QUERY = `*[_type == "service"] | order(order asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  eyebrow,
  summary,
  accent,
  image,
  imagePath,
  backgroundImage,
  backgroundImagePath,
  homepageTagline,
  homepageDescription,
  items[] {
    title,
    description
  },
  order
}`;

export const SERVICE_BY_SLUG_QUERY = `*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  eyebrow,
  summary,
  accent,
  image,
  imagePath,
  backgroundImage,
  backgroundImagePath,
  homepageTagline,
  homepageDescription,
  items[] {
    title,
    description
  },
  order
}`;

export const SERVICE_SLUGS_QUERY = `*[_type == "service" && defined(slug.current)]{ "slug": slug.current }`;

export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  image,
  imagePath,
  category,
  publishedAt,
  readTime,
  author,
  featured,
  body
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  image,
  imagePath,
  category,
  publishedAt,
  readTime,
  author,
  featured,
  body
}`;

export const BLOG_SLUGS_QUERY = `*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }`;

export const FEATURED_BLOGS_QUERY = `*[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...2] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  image,
  imagePath,
  category,
  publishedAt,
  readTime,
  author,
  featured,
  body
}`;

export const FAQS_QUERY = `*[_type == "faq"] | order(order asc) {
  _id,
  question,
  answer,
  order
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  siteTitle,
  siteDescription,
  contactEmail,
  phoneMobile,
  phoneOffice,
  address,
  location,
  socialLinks[] { label, href },
  footerLinksLeft[] { label, href },
  footerLinksRight[] { label, href },
  budgetOptions
}`;

export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0] {
  eyebrow,
  title,
  intro,
  storyEyebrow,
  storyTitle,
  storyParagraphs,
  valuesEyebrow,
  valuesTitle,
  values[] { title, copy },
  stats[] { value, label },
  ctaTitle,
  ctaCopy,
  ctaButtonLabel
}`;

export const CONTACT_PAGE_QUERY = `*[_type == "contactPage"][0] {
  eyebrow,
  title,
  intro,
  metaPills,
  formTitle,
  formIntro,
  statsEyebrow,
  statsTitle,
  stats[] { value, label },
  locationTitle,
  locationIntro,
  officeLabel,
  officeCompany,
  officeLines,
  officeHours,
  careersTitle,
  careersCopy,
  careersButtonLabel
}`;

export const HOMEPAGE_QUERY = `*[_type == "homepage"][0] {
  heroHeadlineTop,
  heroHeadlines,
  heroTagline,
  brandTitle,
  whoWeAreCopy,
  letsTalkCopy,
  letsTalkButtonLabel,
  blogSectionEyebrow,
  blogSectionTitle
}`;

export type SanityServiceDoc = {
  _id: string;
  title: string;
  slug: string;
  eyebrow?: string;
  summary?: string;
  accent?: string;
  image?: { asset?: { _ref?: string } };
  imagePath?: string;
  backgroundImage?: { asset?: { _ref?: string } };
  backgroundImagePath?: string;
  homepageTagline?: string;
  homepageDescription?: string;
  items?: { title: string; description?: string }[];
  order?: number;
};

export type SanityBlogDoc = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  image?: { asset?: { _ref?: string } };
  imagePath?: string;
  category?: string;
  publishedAt?: string;
  readTime?: string;
  author?: string;
  featured?: boolean;
  body?: PortableTextBlock[];
};

export type SanityFaqDoc = {
  _id: string;
  question: string;
  answer: string;
  order?: number;
};

export type SanitySiteSettingsDoc = {
  siteTitle?: string;
  siteDescription?: string;
  contactEmail?: string;
  phoneMobile?: string;
  phoneOffice?: string;
  address?: string;
  location?: string;
  socialLinks?: { label: string; href: string }[];
  footerLinksLeft?: { label: string; href: string }[];
  footerLinksRight?: { label: string; href: string }[];
  budgetOptions?: string[];
};

export type SanityAboutPageDoc = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  storyEyebrow?: string;
  storyTitle?: string;
  storyParagraphs?: string[];
  valuesEyebrow?: string;
  valuesTitle?: string;
  values?: { title: string; copy?: string }[];
  stats?: { value: string; label: string }[];
  ctaTitle?: string;
  ctaCopy?: string;
  ctaButtonLabel?: string;
};

export type SanityContactPageDoc = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  metaPills?: string[];
  formTitle?: string;
  formIntro?: string;
  statsEyebrow?: string;
  statsTitle?: string;
  stats?: { value: string; label: string }[];
  locationTitle?: string;
  locationIntro?: string;
  officeLabel?: string;
  officeCompany?: string;
  officeLines?: string[];
  officeHours?: string;
  careersTitle?: string;
  careersCopy?: string;
  careersButtonLabel?: string;
};

export type SanityHomepageDoc = {
  heroHeadlineTop?: string;
  heroHeadlines?: string[];
  heroTagline?: string;
  brandTitle?: string;
  whoWeAreCopy?: string;
  letsTalkCopy?: string;
  letsTalkButtonLabel?: string;
  blogSectionEyebrow?: string;
  blogSectionTitle?: string;
};
