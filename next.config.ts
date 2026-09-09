import type { NextConfig } from "next";
import path from "path";

const IMAGE_REDIRECTS: Array<[string, string]> = [
  ["/header-logo.png", "/inkspilled-creative-agency-logo.png"],
  ["/footer-logo.png", "/inkspilled-creative-agency-mark.png"],
  ["/hero-magnific-right.png", "/inkspilled-hero-creative-artwork.png"],
  ["/hero-magnific.png", "/inkspilled-hero-creative-diagram.png"],
  ["/hero-circuit-graphic.png", "/inkspilled-hero-circuit-graphic.png"],
  ["/icon.png", "/inkspilled-favicon.png"],
  ["/apple-icon.png", "/inkspilled-apple-touch-icon.png"],
  ["/blog/blog-01.png", "/blog/inkspilled-branding-insights.png"],
  ["/blog/blog-02.png", "/blog/inkspilled-creative-strategy-insights.png"],
  ["/blog/blog-03.png", "/blog/inkspilled-web-design-insights.png"],
  ["/services/branding.png", "/services/inkspilled-brand-and-design-dubai.png"],
  ["/services/branding.jpg", "/services/inkspilled-brand-and-design-dubai.jpg"],
  ["/services/film.png", "/services/inkspilled-film-and-production-dubai.png"],
  ["/services/film.jpg", "/services/inkspilled-film-and-production-dubai.jpg"],
  ["/services/ai-cgi.png", "/services/inkspilled-ai-and-cgi-dubai.png"],
  ["/services/ai-cgi.jpg", "/services/inkspilled-ai-and-cgi-dubai.jpg"],
  ["/services/strategy.png", "/services/inkspilled-strategy-and-planning-dubai.png"],
  ["/services/social-media-marketing.png", "/services/inkspilled-social-media-marketing-dubai.png"],
  ["/services/digital-marketing.png", "/services/inkspilled-digital-marketing-dubai.png"],
  ["/services/web-design-development.png", "/services/inkspilled-web-design-development-dubai.png"],
  ["/services/backgrounds/branding-design.png", "/services/backgrounds/inkspilled-brand-design-background.png"],
  ["/services/backgrounds/film-production.png", "/services/backgrounds/inkspilled-film-production-background.png"],
  ["/services/backgrounds/ai-cgi.png", "/services/backgrounds/inkspilled-ai-cgi-background.png"],
  ["/services/backgrounds/strategy-planning.png", "/services/backgrounds/inkspilled-strategy-planning-background.png"],
  ["/services/backgrounds/social-media-marketing.png", "/services/backgrounds/inkspilled-social-media-marketing-background.png"],
  ["/services/backgrounds/digital-marketing.png", "/services/backgrounds/inkspilled-digital-marketing-background.png"],
  ["/services/backgrounds/web-design-development.png", "/services/backgrounds/inkspilled-web-design-development-background.png"],
];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
    unoptimized: true,
    localPatterns: [{ pathname: "/**" }],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    const offeringNames = [
      "2d-3d-animation",
      "3d-product-visualization",
      "ad-films-tvcs",
      "ai-chatbots-automation",
      "ai-content-visuals",
      "brand-identity-logo-design",
      "brand-strategy-positioning",
      "brand-strategy",
      "campaign-strategy",
      "community-management",
      "content-creation",
      "content-strategy",
      "copywriting-brand-voice",
      "corporate-brand-films",
      "ecommerce-development",
      "email-whatsapp-marketing",
      "event-documentary-films",
      "event-environmental-branding",
      "explainer-infographic-videos",
      "google-ads-ppc",
      "influencer-marketing",
      "landing-pages-cro",
      "market-audience-research",
      "meta-ads",
      "mobile-app-design-development",
      "motion-graphics",
      "motion-identity",
      "photography",
      "print-packaging",
      "product-ecommerce-videos",
      "seo",
      "social-media-management",
      "social-short-form-content",
      "ux-ui-design",
      "vfx-compositing",
      "web-apps-platforms",
      "web-design-development",
    ];

    const brandRedirects = Array.from({ length: 15 }, (_, index) => {
      const pad = String(index + 1).padStart(2, "0");
      return [
        `/brand/brand-${pad}.png`,
        `/brand/inkspilled-brand-portfolio-${pad}.png`,
      ] as [string, string];
    });

    const offeringRedirects = offeringNames.map(
      (name) =>
        [
          `/services/offerings/${name}.jpg`,
          `/services/offerings/inkspilled-${name}-dubai.jpg`,
        ] as [string, string],
    );

    return [...IMAGE_REDIRECTS, ...brandRedirects, ...offeringRedirects].map(
      ([source, destination]) => ({
        source,
        destination,
        permanent: true,
      }),
    );
  },
};

export default nextConfig;
