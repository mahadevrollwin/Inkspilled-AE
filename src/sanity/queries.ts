import type { PortableTextBlock } from "./portable-text";

function loc(field: string) {
  return `"${field}": select($locale == "ar" && defined(${field}Ar) && ${field}Ar != "" => ${field}Ar, ${field})`;
}

function locArray(field: string) {
  return `"${field}": select($locale == "ar" && count(${field}Ar) > 0 => ${field}Ar, ${field})`;
}

const SERVICE_PROJECTION = `
  _id,
  ${loc("title")},
  "slug": slug.current,
  ${loc("eyebrow")},
  ${loc("summary")},
  accent,
  image,
  imagePath,
  backgroundImage,
  backgroundImagePath,
  ${loc("homepageTagline")},
  ${loc("homepageDescription")},
  items[] {
    ${loc("title")},
    ${loc("description")}
  },
  order
`;

const BLOG_PROJECTION = `
  _id,
  ${loc("title")},
  "slug": slug.current,
  ${loc("excerpt")},
  image,
  imagePath,
  mediaRows[] {
    _type,
    _key,
    ${loc("text")},
    image,
    imagePath,
    ${loc("title")},
    slides[] {
      image,
      imagePath,
      ${loc("alt")}
    }
  },
  ${loc("category")},
  publishedAt,
  ${loc("readTime")},
  ${loc("author")},
  featured,
  ${locArray("body")}
`;

export const SERVICES_QUERY = `*[_type == "service"] | order(order asc, title asc) {${SERVICE_PROJECTION}}`;

export const SERVICE_BY_SLUG_QUERY = `*[_type == "service" && slug.current == $slug][0] {${SERVICE_PROJECTION}}`;

export const SERVICE_SLUGS_QUERY = `*[_type == "service" && defined(slug.current)]{ "slug": slug.current }`;

export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {${BLOG_PROJECTION}}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {${BLOG_PROJECTION}}`;

export const BLOG_SLUGS_QUERY = `*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }`;

export const FEATURED_BLOGS_QUERY = `*[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...2] {${BLOG_PROJECTION}}`;

export const FAQS_QUERY = `*[_type == "faq"] | order(order asc) {
  _id,
  ${loc("question")},
  ${loc("answer")},
  order
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  ${loc("siteTitle")},
  ${loc("siteDescription")},
  contactEmail,
  phoneMobile,
  phoneOffice,
  ${loc("address")},
  ${loc("location")},
  ${loc("navAboutLabel")},
  ${loc("navServicesLabel")},
  ${loc("navBlogLabel")},
  ${loc("navContactLabel")},
  ${loc("footerTagline")},
  ${loc("footerQuickLinksHeading")},
  ${loc("footerServicesHeading")},
  ${loc("footerCopyright")},
  socialLinks[] { ${loc("label")}, href },
  footerLinksLeft[] { ${loc("label")}, href },
  footerLinksRight[] { ${loc("label")}, href },
  ${locArray("budgetOptions")}
}`;

export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0] {
  ${loc("eyebrow")},
  ${loc("title")},
  ${loc("intro")},
  ${loc("storyEyebrow")},
  ${loc("storyTitle")},
  ${locArray("storyParagraphs")},
  ${loc("valuesEyebrow")},
  ${loc("valuesTitle")},
  values[] { ${loc("title")}, ${loc("copy")} },
  stats[] { value, ${loc("label")} },
  ${loc("ctaTitle")},
  ${loc("ctaCopy")},
  ${loc("ctaButtonLabel")}
}`;

export const CONTACT_PAGE_QUERY = `*[_type == "contactPage"][0] {
  ${loc("eyebrow")},
  ${loc("title")},
  ${loc("intro")},
  ${locArray("metaPills")},
  ${loc("formTitle")},
  ${loc("formIntro")},
  ${loc("statsEyebrow")},
  ${loc("statsTitle")},
  stats[] { value, ${loc("label")} },
  ${loc("locationTitle")},
  ${loc("locationIntro")},
  ${loc("officeLabel")},
  ${loc("officeCompany")},
  ${locArray("officeLines")},
  ${loc("officeHours")},
  ${loc("careersTitle")},
  ${loc("careersCopy")},
  ${loc("careersButtonLabel")}
}`;

export const HOMEPAGE_QUERY = `*[_type == "homepage"][0] {
  ${loc("heroHeadlineTop")},
  ${locArray("heroHeadlines")},
  ${loc("heroTagline")},
  ${loc("heroButtonLabel")},
  ${loc("brandTitle")},
  ${loc("brandCopy")},
  ${loc("whoWeAreCopy")},
  ${loc("letsTalkCopy")},
  ${loc("letsTalkButtonLabel")},
  ${loc("blogSectionEyebrow")},
  ${loc("blogSectionTitle")}
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
  mediaRows?: {
    _type?: string;
    _key?: string;
    text?: string;
    image?: { asset?: { _ref?: string } };
    imagePath?: string;
    title?: string;
    slides?: {
      image?: { asset?: { _ref?: string } };
      imagePath?: string;
      alt?: string;
    }[];
  }[];
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
  navAboutLabel?: string;
  navServicesLabel?: string;
  navBlogLabel?: string;
  navContactLabel?: string;
  footerTagline?: string;
  footerQuickLinksHeading?: string;
  footerServicesHeading?: string;
  footerCopyright?: string;
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
  heroButtonLabel?: string;
  brandTitle?: string;
  brandCopy?: string;
  whoWeAreCopy?: string;
  letsTalkCopy?: string;
  letsTalkButtonLabel?: string;
  blogSectionEyebrow?: string;
  blogSectionTitle?: string;
};
