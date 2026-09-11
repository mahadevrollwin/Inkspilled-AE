import { defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  BLOG_POSTS,
  BLOGS_PER_PAGE,
  type BlogPost,
  getBlogBySlug as getStaticBlogBySlug,
  getRelatedBlogs as getStaticRelatedBlogs,
  sanitizeBlogPost,
} from "@/data/blogs";
import {
  SERVICES,
  type ServicePageData,
  getServiceBySlug as getStaticServiceBySlug,
} from "@/data/services";
import { INKSPILLED_CONTACT } from "@/lib/chatbot-knowledge";
import { sanityConfigured, sanityFetch } from "./client";
import {
  mapSanityAboutPage,
  mapSanityBlogPost,
  mapSanityBlogPosts,
  mapSanityContactPage,
  mapSanityFaq,
  mapSanityHomepage,
  mapSanityService,
  mapSanitySiteSettings,
  type AboutPageContentData,
  type ContactPageContentData,
  type HomepageContentData,
  type SiteSettingsData,
} from "./mappers";
import {
  ABOUT_PAGE_QUERY,
  BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_SLUGS_QUERY,
  CONTACT_PAGE_QUERY,
  FAQS_QUERY,
  FEATURED_BLOGS_QUERY,
  HOMEPAGE_QUERY,
  SERVICE_BY_SLUG_QUERY,
  SERVICE_SLUGS_QUERY,
  SERVICES_QUERY,
  SITE_SETTINGS_QUERY,
  type SanityAboutPageDoc,
  type SanityBlogDoc,
  type SanityContactPageDoc,
  type SanityFaqDoc,
  type SanityHomepageDoc,
  type SanityServiceDoc,
  type SanitySiteSettingsDoc,
} from "./queries";

const DEFAULT_ABOUT_PAGE: AboutPageContentData = {
  eyebrow: "Creative Branding Agency · Dubai",
  title: "About Inkspilled",
  intro:
    "We are a full service creative studio helping ambitious brands stand out in crowded markets. Strategy leads, design shapes, and digital scales. That is how we build work people remember.",
  storyEyebrow: "Our Story",
  storyTitle: "Built For Brands That Refuse To Blend In",
  storyParagraphs: [
    "Inkspilled started with a simple belief: great brands are not assembled from templates. They are shaped through sharp thinking, distinctive design, and storytelling that earns attention.",
    "From our studio in Dubai, we partner with startups finding their voice and category leaders entering new markets. Our teams span branding, film, digital, and web, working as one unit so every channel feels connected.",
    "This page uses placeholder copy for now. Replace it with your founding story, milestones, and the principles that define how your team works.",
  ],
  valuesEyebrow: "What We Stand For",
  valuesTitle: "Values That Guide The Work",
  values: [
    {
      title: "Strategy First",
      copy:
        "Every visual decision starts with a clear point of view. We define the story before we design the surface.",
    },
    {
      title: "Craft With Conviction",
      copy:
        "From identity systems to film and digital, we build work that feels intentional, not interchangeable.",
    },
    {
      title: "Partners, Not Vendors",
      copy:
        "We embed with your team, challenge assumptions, and stay accountable from kickoff through launch.",
    },
  ],
  stats: [
    { value: "120+", label: "Brands Launched" },
    { value: "08", label: "Years In Dubai" },
    { value: "40+", label: "Creative Specialists" },
    { value: "7", label: "Shades Of One Ink" },
  ],
  ctaTitle: "Ready To Build Something People Remember?",
  ctaCopy:
    "Tell us what you are building and we will show you what is possible, from brand identity to campaigns, film, and digital.",
  ctaButtonLabel: "Start A Conversation",
};

const DEFAULT_CONTACT_PAGE: ContactPageContentData = {
  eyebrow: "START HERE",
  title: "It's time to\nSpill Something Great.",
  intro:
    "Tell us a little about your brand and where you would like to take it. We will get back to you, usually within one business day.",
  metaPills: [
    "Headquartered, India · UAE · USA",
    "Idea To Launch",
    "Mon to Fri, 9:00 to 18:00 (GST + 4)",
  ],
  formTitle: "Leave us a brief",
  formIntro: "Share your requirements and the services you're interested in.",
  statsEyebrow: "Why brands choose us",
  statsTitle: "We build brands people remember",
  stats: [
    { value: "100+", label: "Projects Delivered" },
    { value: "∞", label: "Ink in the Well" },
    { value: "7", label: "Shades Of One Ink" },
    { value: "2023", label: "Since the First Spill" },
  ],
  locationTitle: "WHERE TO FIND US",
  locationIntro:
    "Dubai and India today, the US on the way. Wherever your project lands, it's the same team and the same standard behind it.",
  officeLabel: "DUBAI",
  officeCompany: "Inkspilled Technologies LLC",
  officeLines: [
    "B-803, Prime Business Center",
    "JVC, Dubai, United Arab Emirates",
  ],
  offices: [
    {
      label: "DUBAI",
      company: "Inkspilled Technologies LLC",
      lines: [
        "B-803, Prime Business Center",
        "JVC, Dubai, United Arab Emirates",
      ],
      phone: "+971 58 579 9959",
      mapHref: "https://maps.google.com/?q=Prime+Business+Center+JVC+Dubai",
    },
    {
      label: "INDIA",
      company: "Inkspilled Media Pvt. Ltd.",
      lines: ["18, 3rd Floor, Hauz Khas Village", "New Delhi, India"],
      phone: "+91 9990044819",
      mapHref: "https://maps.google.com/?q=18+3rd+Floor+Hauz+Khas+Village+New+Delhi",
    },
    {
      label: "USA · COMING SOON",
      company: "Expanding to the United States.",
      lines: ["Same studio, new coast."],
    },
  ],
  officeHours: "Monday to Friday, 9:00 AM to 6:00 PM (GST +4)",
  careersTitle: "Great work starts with great people.",
  careersCopy:
    "We are always on the lookout for talented creatives and strategists. Send us a portfolio. We respond well to beautifully crafted work.",
  careersButtonLabel: "Get in touch about careers →",
};

const DEFAULT_HOMEPAGE: HomepageContentData = {
  heroHeadlineTop: "Ink it.",
  heroHeadlines: ["Ink it.", "Move it.", "Make it stick."],
  heroTagline:
    "Strategy that thinks, design that moves, storytelling that sticks. For brands that refuse to blend in.",
  heroButtonLabel: "Start A Project",
  brandTitle: "We Build Brands That Lead.",
  brandCopy:
    "Anyone can make you look good. We make you impossible to ignore, with strategy that earns attention, design that holds it, and stories people actually pass on. One studio, start to finish.",
  whoWeAreCopy:
    "Inkspilled is a creative studio in Dubai for businesses that refuse to blend in. We lead with strategy, shape identity through design, and bring ideas alive as a full service creative and technology studio. From startups finding a voice to category leaders entering new markets, we build brands people remember and choose. Creative leads. Digital scales. That's the Inkspilled edge.",
  letsTalkCopy:
    "Looking to hire a creative studio in Dubai? You just found it. Tell us what you're building, and we'll show you what's possible.",
  letsTalkButtonLabel: "Start A Project",
  blogSectionEyebrow: "More From Inkspilled",
  blogSectionTitle: "Straight From The Studio",
};

const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  siteTitle: "Inkspilled, Creative Branding Agency in Dubai",
  siteDescription:
    "Inkspilled is a creative branding agency in Dubai crafting bold identities, strategy and design for ambitious brands.",
  contactEmail: "hello@inkspilled.ae",
  phoneMobile: INKSPILLED_CONTACT.phoneMobile,
  phoneOffice: INKSPILLED_CONTACT.phoneOffice,
  address: INKSPILLED_CONTACT.address,
  location: INKSPILLED_CONTACT.location,
  navAboutLabel: "About Us",
  navServicesLabel: "Services",
  navBlogLabel: "Blog",
  navContactLabel: "Contact",
  footerTagline:
    "A creative and technology studio building brands that move from identity and film to marketing and the digital products behind them. One team, one standard, for brands that refuse to blend in.",
  footerQuickLinksHeading: "Quick Links",
  footerServicesHeading: "Services",
  footerCopyright: "© 2026 Inkspilled. All Rights Reserved.",
  socialLinks: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "YouTube", href: "#" },
  ],
  footerLinksLeft: [
    { label: "About Us", href: "/about" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  footerLinksRight: [
    { label: "Portfolio", href: "#" },
    { label: "Blog", href: "/blog" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
  budgetOptions: [
    "AED 10K to AED 50K",
    "AED 50K to AED 100K",
    "AED 100K to AED 250K",
    "AED 250K to AED 500K",
    "AED 500K & Above",
  ],
};

function homepageFallback(locale: Locale): HomepageContentData {
  if (locale === "en") return DEFAULT_HOMEPAGE;
  const t = getDictionary(locale);
  return {
    ...DEFAULT_HOMEPAGE,
    heroHeadlineTop: `${t.hero.headlines[0]}.`,
    heroHeadlines: t.hero.headlines.map((line) => `${line}.`),
    heroTagline: t.hero.tagline,
    heroButtonLabel: t.hero.cta,
    brandTitle: `${t.brand.titleTop} ${t.brand.titleMain} ${t.brand.titleBottom}`,
    brandCopy: t.brand.copy,
    whoWeAreCopy: t.whoWeAre.copy,
    letsTalkCopy: t.letsTalk.copy,
    letsTalkButtonLabel: t.hero.cta,
    blogSectionEyebrow: t.blog.homeKicker + " " + t.blog.homeName,
    blogSectionTitle: t.blog.eyebrow,
  };
}

function siteSettingsFallback(locale: Locale): SiteSettingsData {
  if (locale === "en") return DEFAULT_SITE_SETTINGS;
  const t = getDictionary(locale);
  return {
    ...DEFAULT_SITE_SETTINGS,
    navAboutLabel: t.nav.about,
    navServicesLabel: t.nav.services,
    navBlogLabel: t.nav.blog,
    navContactLabel: t.nav.contact,
    footerTagline: t.footer.tagline,
    footerQuickLinksHeading: t.footer.quickLinks,
    footerServicesHeading: t.footer.services,
    footerCopyright: t.footer.copyright,
    footerLinksLeft: [
      { label: t.nav.about, href: "/about" },
      { label: "سياسة الخصوصية", href: "/privacy-policy" },
    ],
    footerLinksRight: [
      { label: "أعمالنا", href: "#" },
      { label: t.nav.blog, href: "/blog" },
      { label: "الشروط والأحكام", href: "/terms-and-conditions" },
    ],
  };
}

async function fetchFromSanity<T>(query: string, params: Record<string, unknown> = {}) {
  return sanityFetch<T>({ query, params });
}

async function fetchBlogFromSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
) {
  return sanityFetch<T>({
    query,
    params,
    revalidate: 0,
    useCdn: false,
  });
}

export async function getServices(
  locale: Locale = defaultLocale,
): Promise<ServicePageData[]> {
  if (!sanityConfigured) return SERVICES;

  try {
    const docs = await fetchFromSanity<SanityServiceDoc[]>(SERVICES_QUERY, {
      locale,
    });
    if (!docs?.length) return SERVICES;
    return docs.map((doc) => {
      const mapped = mapSanityService(doc);
      const staticService = SERVICES.find((service) => service.slug === mapped.slug);
      if (!staticService) return mapped;
      return {
        ...mapped,
        intro: staticService.intro,
        offeringsEyebrow: staticService.offeringsEyebrow,
        offeringsTitle: staticService.offeringsTitle,
        heroVideo: staticService.heroVideo,
        accent: mapped.accent || staticService.accent,
      };
    });
  } catch {
    return SERVICES;
  }
}

export async function getServiceBySlug(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<ServicePageData | undefined> {
  const staticService = getStaticServiceBySlug(slug);

  if (!sanityConfigured) return staticService;

  try {
    const doc = await fetchFromSanity<SanityServiceDoc | null>(
      SERVICE_BY_SLUG_QUERY,
      { slug, locale },
    );
    if (!doc) return staticService;

    const mapped = mapSanityService(doc);
    if (!staticService) return mapped;

    return {
      ...mapped,
      intro: staticService.intro,
      offeringsEyebrow: staticService.offeringsEyebrow,
      offeringsTitle: staticService.offeringsTitle,
      heroVideo: staticService.heroVideo,
      accent: mapped.accent || staticService.accent,
    };
  } catch {
    return staticService;
  }
}

export async function getServiceSlugs(): Promise<string[]> {
  if (!sanityConfigured) return SERVICES.map((service) => service.slug);

  try {
    const docs = await fetchFromSanity<{ slug: string }[]>(SERVICE_SLUGS_QUERY);
    if (!docs?.length) return SERVICES.map((service) => service.slug);
    return [
      ...new Set([
        ...SERVICES.map((service) => service.slug),
        ...docs.map((doc) => doc.slug).filter(Boolean),
      ]),
    ];
  } catch {
    return SERVICES.map((service) => service.slug);
  }
}

export async function getBlogPosts(
  locale: Locale = defaultLocale,
): Promise<BlogPost[]> {
  if (!sanityConfigured) return BLOG_POSTS.map(sanitizeBlogPost);

  try {
    const docs = await fetchBlogFromSanity<SanityBlogDoc[]>(BLOG_POSTS_QUERY, {
      locale,
    });
    return mapSanityBlogPosts(docs, locale);
  } catch (error) {
    console.error("Failed to fetch blog posts from Sanity", error);
    return [];
  }
}

export async function getBlogBySlug(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<BlogPost | undefined> {
  if (!sanityConfigured) {
    const post = getStaticBlogBySlug(slug);
    return post ? sanitizeBlogPost(post) : undefined;
  }

  try {
    const doc = await fetchBlogFromSanity<SanityBlogDoc | null>(
      BLOG_POST_BY_SLUG_QUERY,
      { slug, locale },
    );
    if (!doc?.slug) {
      const post = getStaticBlogBySlug(slug);
      return post ? sanitizeBlogPost(post) : undefined;
    }
    return mapSanityBlogPost(doc, locale);
  } catch (error) {
    console.error(`Failed to fetch blog post "${slug}" from Sanity`, error);
    const post = getStaticBlogBySlug(slug);
    return post ? sanitizeBlogPost(post) : undefined;
  }
}

export async function getBlogSlugs(): Promise<string[]> {
  if (!sanityConfigured) return BLOG_POSTS.map((post) => post.slug);

  try {
    const docs = await fetchBlogFromSanity<{ slug: string }[]>(BLOG_SLUGS_QUERY);
    if (!docs?.length) return [];
    return docs.map((doc) => doc.slug).filter(Boolean);
  } catch (error) {
    console.error("Failed to fetch blog slugs from Sanity", error);
    return [];
  }
}

export async function getBlogPage(page: number, locale: Locale = defaultLocale) {
  const posts = await getBlogPosts(locale);
  const totalPages = Math.max(1, Math.ceil(posts.length / BLOGS_PER_PAGE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * BLOGS_PER_PAGE;

  return {
    posts: posts.slice(start, start + BLOGS_PER_PAGE),
    currentPage,
    totalPages,
    totalPosts: posts.length,
  };
}

export async function getRelatedBlogs(
  slug: string,
  count = 3,
  locale: Locale = defaultLocale,
) {
  const posts = await getBlogPosts(locale);
  const current = posts.find((post) => post.slug === slug);
  if (!current) {
    return getStaticRelatedBlogs(slug, count).map(sanitizeBlogPost);
  }

  const sameCategory = posts.filter(
    (post) => post.slug !== slug && post.category === current.category,
  );
  const others = posts.filter(
    (post) => post.slug !== slug && post.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, count);
}

export async function getFeaturedBlogs(
  count = 2,
  locale: Locale = defaultLocale,
) {
  if (!sanityConfigured) return BLOG_POSTS.slice(0, count).map(sanitizeBlogPost);

  try {
    const docs = await fetchBlogFromSanity<SanityBlogDoc[]>(FEATURED_BLOGS_QUERY, {
      locale,
    });
    const featured = mapSanityBlogPosts(docs, locale);
    if (featured.length) return featured.slice(0, count);
  } catch (error) {
    console.error("Failed to fetch featured blogs from Sanity", error);
  }

  const posts = await getBlogPosts(locale);
  return posts.slice(0, count);
}

function faqsFallback(locale: Locale) {
  return getDictionary(locale).faq.items;
}

function hasArabicText(value: string) {
  return /[\u0600-\u06FF]/.test(value);
}

export async function getFaqs(locale: Locale = defaultLocale) {
  const fallback = faqsFallback(locale);

  if (!sanityConfigured) return fallback;

  try {
    const docs = await fetchFromSanity<SanityFaqDoc[]>(FAQS_QUERY, { locale });
    if (!docs?.length) return fallback;

    const mapped = docs
      .map(mapSanityFaq)
      .filter((item) => item.question && item.answer);

    if (!mapped.length) return fallback;

    if (locale === "ar" && !mapped.some((item) => hasArabicText(item.question))) {
      return fallback;
    }

    return mapped;
  } catch {
    return fallback;
  }
}

export async function getSiteSettings(locale: Locale = defaultLocale) {
  const fallback = siteSettingsFallback(locale);
  if (!sanityConfigured) return fallback;

  try {
    const doc = await fetchFromSanity<SanitySiteSettingsDoc | null>(
      SITE_SETTINGS_QUERY,
      { locale },
    );
    return mapSanitySiteSettings(doc, fallback);
  } catch {
    return fallback;
  }
}

function aboutFallback(locale: Locale): AboutPageContentData {
  if (locale === "en") return DEFAULT_ABOUT_PAGE;
  const t = getDictionary(locale);
  return {
    eyebrow: t.about.eyebrow,
    title: t.about.title,
    intro: t.about.intro,
    storyEyebrow: t.about.storyEyebrow,
    storyTitle: t.about.storyTitle,
    storyParagraphs: t.about.storyParagraphs,
    valuesEyebrow: t.about.valuesEyebrow,
    valuesTitle: t.about.valuesTitle,
    values: t.about.values,
    stats: t.about.stats,
    ctaTitle: t.about.ctaTitle,
    ctaCopy: t.about.ctaCopy,
    ctaButtonLabel: t.about.ctaButtonLabel,
  };
}

export async function getAboutPageContent(locale: Locale = defaultLocale) {
  const fallback = aboutFallback(locale);
  if (!sanityConfigured) return fallback;

  try {
    const doc = await fetchFromSanity<SanityAboutPageDoc | null>(
      ABOUT_PAGE_QUERY,
      { locale },
    );
    return mapSanityAboutPage(doc, fallback, locale);
  } catch {
    return fallback;
  }
}

export async function getContactPageContent(locale: Locale = defaultLocale) {
  if (!sanityConfigured) return DEFAULT_CONTACT_PAGE;

  try {
    const doc = await fetchFromSanity<SanityContactPageDoc | null>(
      CONTACT_PAGE_QUERY,
      { locale },
    );
    return mapSanityContactPage(doc, DEFAULT_CONTACT_PAGE);
  } catch {
    return DEFAULT_CONTACT_PAGE;
  }
}

export async function getHomepageContent(locale: Locale = defaultLocale) {
  const fallback = homepageFallback(locale);
  if (!sanityConfigured) return fallback;

  try {
    const doc = await fetchFromSanity<SanityHomepageDoc | null>(HOMEPAGE_QUERY, {
      locale,
    });
    return mapSanityHomepage(doc, fallback);
  } catch {
    return fallback;
  }
}
