import type { Metadata } from "next";

export type SeoContent = {
  title: string;
  description: string;
};

export function toMetadata({ title, description }: SeoContent): Metadata {
  return { title, description };
}

export const HOME_SEO: SeoContent = {
  title: "Creative Branding Agency in Dubai | Inkspilled",
  description:
    "Inkspilled is a creative branding agency in Dubai delivering brand strategy, design, film, and digital marketing for ambitious brands. Get a free consultation.",
};

export const ABOUT_SEO: SeoContent = {
  title: "About Inkspilled | Creative Branding Agency in Dubai",
  description:
    "Meet Inkspilled, a full-service creative branding agency in Dubai. Strategy-first branding, design, film, and digital for brands that refuse to blend in.",
};

export const CONTACT_SEO: SeoContent = {
  title: "Contact Inkspilled | Creative Agency in Dubai",
  description:
    "Contact Inkspilled, a creative agency in Dubai. Share your brief, book a free consultation, or reach us by phone, email, or WhatsApp. Reply within one business day.",
};

export const BLOG_LISTING_SEO: SeoContent = {
  title: "Creative & Marketing Insights Blog | Inkspilled Dubai",
  description:
    "Ideas, insight, and creative thinking from Inkspilled, a creative branding agency in Dubai. Branding, marketing, and design articles for ambitious brands.",
};

export const SERVICE_SEO: Record<string, SeoContent> = {
  "branding-design": {
    title: "Branding & Logo Design Services in Dubai | Inkspilled",
    description:
      "Brand strategy, logo and identity design, motion identity, and packaging by Inkspilled, a branding agency in Dubai building identities you can't mistake.",
  },
  "films-production": {
    title: "Video Production & Corporate Film Company in Dubai | Inkspilled",
    description:
      "Corporate films, ad films & TVCs, product videos, and photography from Inkspilled, a video production company in Dubai making films people finish and share.",
  },
  "ai-cg": {
    title: "AI, CGI, 3D Animation & Motion Graphics in Dubai | Inkspilled",
    description:
      "2D & 3D animation, motion graphics, AI content, 3D product visualization, and VFX from Inkspilled, CGI and AI creative production in Dubai.",
  },
  "strategy-planning": {
    title: "Brand Strategy & Creative Planning Agency in Dubai | Inkspilled",
    description:
      "Brand strategy, campaign strategy, content strategy, market research, and brand voice from Inkspilled, the thinking-first creative strategy agency in Dubai.",
  },
  "social-media-marketing": {
    title: "Social Media Marketing Agency in Dubai | Inkspilled",
    description:
      "Social media management, content creation, community management, and influencer marketing from Inkspilled, a social media marketing agency in Dubai.",
  },
  "digital-marketing": {
    title: "Digital Marketing Agency in Dubai | SEO & PPC | Inkspilled",
    description:
      "SEO, Google Ads & PPC, Meta Ads, email/WhatsApp, and CRO from Inkspilled, a performance-driven digital marketing agency in Dubai. Every dirham measured.",
  },
  "website-design-development": {
    title: "Web Design & Development Company in Dubai | Inkspilled",
    description:
      "UI/UX design, web design & development, mobile apps, e-commerce, and web platforms from Inkspilled, a web design and development company in Dubai.",
  },
};

const CREATIVE_REFRESH_SEO: SeoContent = {
  title: "7 Signs Your Brand Needs a Creative Refresh | Inkspilled",
  description:
    "Brand feeling dated? Here are 7 honest signs it's time for a creative refresh, and how a Dubai branding agency turns brand fatigue into momentum.",
};

const TRENDS_2026_SEO: SeoContent = {
  title: "Top 10 Creative Marketing Trends to Watch in 2026 | Inkspilled",
  description:
    "The 10 creative marketing trends shaping 2026: AI as collaborator, social SEO, short-form video, and more. A scannable cheat sheet for UAE brands.",
};

const SOCIAL_VS_PAID_SEO: SeoContent = {
  title: "Social Media vs. Paid Ads: Where Should Your Budget Go? | Inkspilled",
  description:
    "Social media vs paid ads: which deserves your budget? A clear guide to marketing budget allocation for Dubai brands, from organic reach to paid ROI.",
};

const BLOG_POST_SEO_BY_SLUG: Record<string, SeoContent> = {
  "7-signs-your-brand-needs-a-creative-refresh": CREATIVE_REFRESH_SEO,
  "top-10-creative-marketing-trends-to-watch-in-2026": TRENDS_2026_SEO,
  "social-media-vs-paid-ads-where-should-your-budget-go": SOCIAL_VS_PAID_SEO,
};

const BLOG_POST_SEO: {
  test: (slug: string, title: string) => boolean;
  seo: SeoContent;
}[] = [
  {
    test: (slug, title) =>
      /creative-refresh|7-signs/.test(slug) ||
      /7 signs.*creative refresh/i.test(title),
    seo: CREATIVE_REFRESH_SEO,
  },
  {
    test: (slug, title) =>
      /marketing-trends|trends-to-watch/.test(slug) ||
      /creative marketing trends/i.test(title),
    seo: TRENDS_2026_SEO,
  },
  {
    test: (slug, title) =>
      /paid-ads|social-media-vs/.test(slug) ||
      /social media vs\.? paid ads/i.test(title),
    seo: SOCIAL_VS_PAID_SEO,
  },
];

export function getServiceSeo(
  slug: string,
  fallback: SeoContent,
): SeoContent {
  return SERVICE_SEO[slug] ?? fallback;
}

export function getBlogPostSeo(
  slug: string,
  title: string,
  fallbackDescription: string,
): SeoContent {
  const bySlug = BLOG_POST_SEO_BY_SLUG[slug];
  if (bySlug) return bySlug;

  const found = BLOG_POST_SEO.find((item) => item.test(slug, title));
  return (
    found?.seo ?? {
      title: `${title} | Inkspilled`,
      description: fallbackDescription,
    }
  );
}
