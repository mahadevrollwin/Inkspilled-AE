import {
  BLOG_POSTS,
  BLOGS_PER_PAGE,
  type BlogPost,
  getBlogBySlug as getStaticBlogBySlug,
  getBlogPage as getStaticBlogPage,
  getRelatedBlogs as getStaticRelatedBlogs,
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
    "We are a full-service creative studio helping ambitious brands stand out in crowded markets. Strategy leads, design shapes, and digital scales. That is how we build work people remember.",
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
  officeHours: "Sunday to Thursday, 9:00 AM to 6:00 PM GST",
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
  brandTitle: "We Build Brands That Lead.",
  whoWeAreCopy:
    "Inkspilled is a creative studio in Dubai for businesses that refuse to blend in. We lead with strategy, shape identity through design, and bring ideas alive as a full-service creative and technology studio. From startups finding a voice to category leaders entering new markets, we build brands people remember and choose. Creative leads. Digital scales. That's the Inkspilled edge.",
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
  socialLinks: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "YouTube", href: "#" },
  ],
  footerLinksLeft: [
    { label: "About Us", href: "/about" },
    { label: "Privacy Policy", href: "#" },
  ],
  footerLinksRight: [
    { label: "Portfolio", href: "#" },
    { label: "Blog", href: "/blog" },
    { label: "Terms Of Use", href: "#" },
  ],
  budgetOptions: [
    "AED 10K to AED 50K",
    "AED 50K to AED 100K",
    "AED 100K to AED 250K",
    "AED 250K to AED 500K",
    "AED 500K & Above",
  ],
};

const DEFAULT_FAQS = [
  {
    question: "What Services Does Inkspilled Offer?",
    answer:
      "Inkspilled Is A Dubai Based Creative Design Agency That Offers Brand Strategy, Logo And Identity Design, Creative Design And Motion, And Video Production. We Also Handle Content, Social Media, And Digital Growth. Every Service Is Built On A Creative First Foundation, With Digital Marketing As The Performance Layer.",
  },
  {
    question: "How Is Inkspilled Different From A Creative Marketing Agency?",
    answer:
      "Unlike A Creative Marketing Agency, Inkspilled Leads With Creative Strategy And Brand Building, Then Uses Digital To Amplify The Results. Most Agencies Start With Ads, We Start With The Brand. This Creative First Approach Is Why Clients Rank Us Among The Best Creative Agencies In Dubai For Work That Performs.",
  },
  {
    question: "How Much Does A Creative Agency Cost In Dubai?",
    answer:
      "Project Costs Depend On Scope, Timeline, And Deliverables. Brand Identity Projects, Campaign Creative, And Retainer Partnerships Are Scoped Individually After A Discovery Call. We Provide Transparent Proposals So You Know Exactly What You Are Investing In Before Work Begins.",
  },
  {
    question: "Do You Work With Startups And Small Businesses In Dubai?",
    answer:
      "Yes. We Partner With Startups, Scale-Ups, And Established Brands Across Dubai And The Wider GCC. Whether You Need A First Identity Or A Full Rebrand Before Entering A New Market, We Build Creative Systems That Grow With Your Business.",
  },
  {
    question: "Can You Handle Both Branding And Digital Marketing?",
    answer:
      "Absolutely. Inkspilled Is Built As A Full-Service Creative Studio. We Shape Your Brand Strategy And Visual Identity First, Then Extend That Foundation Into Content, Social, And Performance Marketing So Every Channel Feels Cohesive.",
  },
  {
    question: "Do You Create Arabic-Language Creative Content?",
    answer:
      "Yes. We Develop Bilingual And Arabic-First Creative For Campaigns, Social Content, Brand Films, And Identity Systems, Ensuring Messaging Resonates Culturally While Staying True To Your Brand Voice.",
  },
  {
    question: "How Do I Start A Project With Inkspilled?",
    answer:
      "Reach Out Through Our Contact Page Or Email. We Schedule A Discovery Call To Understand Your Goals, Audience, And Timeline, Then Share A Tailored Proposal With Scope, Deliverables, And Next Steps To Kick Off Your Project.",
  },
];

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

export async function getServices(): Promise<ServicePageData[]> {
  if (!sanityConfigured) return SERVICES;

  try {
    const docs = await fetchFromSanity<SanityServiceDoc[]>(SERVICES_QUERY);
    if (!docs?.length) return SERVICES;
    return docs.map((doc) => {
      const mapped = mapSanityService(doc);
      const staticService = SERVICES.find((service) => service.slug === mapped.slug);
      if (!staticService) return mapped;
      return {
        ...mapped,
        title: staticService.title,
        eyebrow: staticService.eyebrow,
        summary: staticService.summary,
        intro: staticService.intro,
        items: staticService.items,
        offeringsEyebrow: staticService.offeringsEyebrow,
        offeringsTitle: staticService.offeringsTitle,
        heroVideo: staticService.heroVideo,
        accent: staticService.accent || mapped.accent,
      };
    });
  } catch {
    return SERVICES;
  }
}

export async function getServiceBySlug(
  slug: string,
): Promise<ServicePageData | undefined> {
  const staticService = getStaticServiceBySlug(slug);

  if (!sanityConfigured) return staticService;

  try {
    const doc = await fetchFromSanity<SanityServiceDoc | null>(
      SERVICE_BY_SLUG_QUERY,
      { slug },
    );
    if (!doc) return staticService;

    const mapped = mapSanityService(doc);
    if (!staticService) return mapped;

    return {
      ...mapped,
      title: staticService.title,
      eyebrow: staticService.eyebrow,
      summary: staticService.summary,
      intro: staticService.intro,
      items: staticService.items,
      offeringsEyebrow: staticService.offeringsEyebrow,
      offeringsTitle: staticService.offeringsTitle,
      heroVideo: staticService.heroVideo,
      accent: staticService.accent || mapped.accent,
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

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!sanityConfigured) return BLOG_POSTS;

  try {
    const docs = await fetchBlogFromSanity<SanityBlogDoc[]>(BLOG_POSTS_QUERY);
    return mapSanityBlogPosts(docs);
  } catch (error) {
    console.error("Failed to fetch blog posts from Sanity", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!sanityConfigured) return getStaticBlogBySlug(slug);

  try {
    const doc = await fetchBlogFromSanity<SanityBlogDoc | null>(
      BLOG_POST_BY_SLUG_QUERY,
      { slug },
    );
    if (!doc?.slug) return getStaticBlogBySlug(slug);
    return mapSanityBlogPost(doc);
  } catch (error) {
    console.error(`Failed to fetch blog post "${slug}" from Sanity`, error);
    return getStaticBlogBySlug(slug);
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

export async function getBlogPage(page: number) {
  const posts = await getBlogPosts();
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

export async function getRelatedBlogs(slug: string, count = 3) {
  const posts = await getBlogPosts();
  const current = posts.find((post) => post.slug === slug);
  if (!current) return getStaticRelatedBlogs(slug, count);

  const sameCategory = posts.filter(
    (post) => post.slug !== slug && post.category === current.category,
  );
  const others = posts.filter(
    (post) => post.slug !== slug && post.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, count);
}

export async function getFeaturedBlogs(count = 2) {
  if (!sanityConfigured) return BLOG_POSTS.slice(0, count);

  try {
    const docs = await fetchBlogFromSanity<SanityBlogDoc[]>(FEATURED_BLOGS_QUERY);
    const featured = mapSanityBlogPosts(docs);
    if (featured.length) return featured.slice(0, count);
  } catch (error) {
    console.error("Failed to fetch featured blogs from Sanity", error);
  }

  const posts = await getBlogPosts();
  return posts.slice(0, count);
}

export async function getFaqs() {
  if (!sanityConfigured) return DEFAULT_FAQS;

  try {
    const docs = await fetchFromSanity<SanityFaqDoc[]>(FAQS_QUERY);
    if (!docs?.length) return DEFAULT_FAQS;
    return docs.map(mapSanityFaq);
  } catch {
    return DEFAULT_FAQS;
  }
}

export async function getSiteSettings() {
  if (!sanityConfigured) return DEFAULT_SITE_SETTINGS;

  try {
    const doc = await fetchFromSanity<SanitySiteSettingsDoc | null>(
      SITE_SETTINGS_QUERY,
    );
    return mapSanitySiteSettings(doc, DEFAULT_SITE_SETTINGS);
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function getAboutPageContent() {
  if (!sanityConfigured) return DEFAULT_ABOUT_PAGE;

  try {
    const doc = await fetchFromSanity<SanityAboutPageDoc | null>(
      ABOUT_PAGE_QUERY,
    );
    return mapSanityAboutPage(doc, DEFAULT_ABOUT_PAGE);
  } catch {
    return DEFAULT_ABOUT_PAGE;
  }
}

export async function getContactPageContent() {
  if (!sanityConfigured) return DEFAULT_CONTACT_PAGE;

  try {
    const doc = await fetchFromSanity<SanityContactPageDoc | null>(
      CONTACT_PAGE_QUERY,
    );
    return mapSanityContactPage(doc, DEFAULT_CONTACT_PAGE);
  } catch {
    return DEFAULT_CONTACT_PAGE;
  }
}

export async function getHomepageContent() {
  if (!sanityConfigured) return DEFAULT_HOMEPAGE;

  try {
    const doc = await fetchFromSanity<SanityHomepageDoc | null>(HOMEPAGE_QUERY);
    return mapSanityHomepage(doc, DEFAULT_HOMEPAGE);
  } catch {
    return DEFAULT_HOMEPAGE;
  }
}
