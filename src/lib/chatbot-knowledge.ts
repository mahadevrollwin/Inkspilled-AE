export const INKSPILLED_CONTACT = {
  address: "B-803, Prime Business Center, JVC, Dubai, United Arab Emirates",
  phoneMobile: "+971 58 579 9959",
  phoneOffice: "04 578 4920",
  location: "Dubai, United Arab Emirates",
  email: "hello@inkspilled.ae",
  consultationCta: "Book A Free Consultation Today via the Let's Talk section on our website",
};

export const CHATBOT_FAQ = [
  {
    keywords: ["service", "offer", "do you do", "what do you", "disciplines"],
    answer:
      "Inkspilled offers Brand & Design, Film & Production, AI & CGI, Strategy & Planning, Social Media Marketing, Digital Marketing, and Product Design & Development. We are a creative-first agency. Brand strategy and identity come before performance marketing.",
  },
  {
    keywords: ["address", "location", "where are you", "office", "find you", "located"],
    answer: `Inkspilled is based in Dubai, UAE. Our office address is ${INKSPILLED_CONTACT.address}. Phone: ${INKSPILLED_CONTACT.phoneMobile} or ${INKSPILLED_CONTACT.phoneOffice}.`,
  },
  {
    keywords: ["phone", "call", "contact number", "mobile", "reach you"],
    answer: `You can reach Inkspilled at ${INKSPILLED_CONTACT.phoneMobile} or ${INKSPILLED_CONTACT.phoneOffice}. You can also use the contact section on our website to book a free consultation.`,
  },
  {
    keywords: ["price", "pricing", "cost", "how much", "budget", "quote"],
    answer:
      "Project costs depend on scope, timeline, and deliverables. We provide transparent proposals after a discovery call so you know exactly what you are investing in before work begins. Book a free consultation through our Let's Talk section to get a tailored quote.",
  },
  {
    keywords: ["start", "begin", "hire", "work with", "project", "get started"],
    answer:
      "To start a project, reach out through our website contact section or book a free consultation. We schedule a discovery call to understand your goals, audience, and timeline, then share a tailored proposal with scope and next steps.",
  },
  {
    keywords: ["process", "how we work", "how do you work", "workflow", "steps"],
    answer:
      "Our process has four steps: Discover (goals and audience), Strategise (brand roadmap), Create (design and production), and Launch (deploy and optimise across channels).",
  },
  {
    keywords: ["startup", "small business", "sme"],
    answer:
      "Yes, we partner with startups, scale-ups, and established brands across Dubai and the wider GCC. Whether you need a first identity or a full rebrand, we build creative systems that grow with your business.",
  },
  {
    keywords: ["arabic", "bilingual", "language"],
    answer:
      "Yes. We develop bilingual and Arabic-first creative for campaigns, social content, brand films, and identity systems.",
  },
  {
    keywords: ["branding", "logo", "identity", "brand design"],
    answer:
      "Our Brand & Design service covers logo design, visual identity, event branding, brochure and catalogue design, and packaging. We believe a brand is not just a logo, it is a feeling that helps your audience care before they click.",
  },
  {
    keywords: ["social media", "instagram", "facebook", "linkedin", "youtube"],
    answer:
      "We offer Social Media Marketing across Instagram, Facebook, LinkedIn, and YouTube, focused on culture and conversation, not just posting content.",
  },
  {
    keywords: ["digital marketing", "seo", "ppc", "google ads", "meta ads"],
    answer:
      "Our Digital Marketing services include SEO, Google Ads & PPC, Meta Ads, and analytics & reporting, turning targeted data into measurable growth.",
  },
  {
    keywords: ["web", "website", "development", "ui", "ux", "ecommerce"],
    answer:
      "We design and develop websites that look stunning and convert, including UI/UX design, responsive development, website redesign, and e-commerce builds.",
  },
  {
    keywords: ["film", "video", "production", "tvc", "commercial"],
    answer:
      "Our Film & Production team creates corporate and brand films, product videos, ad films & TVCs, and documentaries, cinematic storytelling that moves people.",
  },
  {
    keywords: ["different", "why inkspilled", "unique", "vs", "compare"],
    answer:
      "Unlike typical marketing agencies, Inkspilled leads with creative strategy and brand building, then uses digital to amplify results. We start with the brand, not the ads, a creative-first approach trusted by ambitious businesses in Dubai.",
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon"],
    answer:
      "Hello! I am the Inkspilled assistant. Ask me about our services, Dubai office, pricing approach, process, or how to start a project.",
  },
  {
    keywords: ["thank", "thanks"],
    answer:
      "You are welcome! If you would like to speak with our team directly, book a free consultation through the Let's Talk section on our website.",
  },
] as const;

function normalize(text: string) {
  return text.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function scoreFaqMatch(query: string, keywords: readonly string[]) {
  const normalizedQuery = normalize(query);
  let score = 0;

  for (const keyword of keywords) {
    const normalizedKeyword = normalize(keyword);
    if (normalizedQuery.includes(normalizedKeyword)) {
      score += normalizedKeyword.split(" ").length + 2;
    }
  }

  return score;
}

export function generateFallbackReply(messages: ChatMessage[]): string {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");

  if (!lastUserMessage) {
    return "How can I help you today? Ask about Inkspilled services, our Dubai office, pricing, or how to get started.";
  }

  const query = lastUserMessage.content;
  let bestMatch: (typeof CHATBOT_FAQ)[number] | null = null;
  let bestScore = 0;

  for (const item of CHATBOT_FAQ) {
    const score = scoreFaqMatch(query, item.keywords);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && bestScore >= 3) {
    return bestMatch.answer;
  }

  const normalizedQuery = normalize(query);

  if (
    normalizedQuery.includes("who are you") ||
    normalizedQuery.includes("what is inkspilled") ||
    normalizedQuery.includes("about inkspilled")
  ) {
    return "Inkspilled is a creative branding agency in Dubai. We help ambitious businesses stand out through strategic branding, visual identity, film, digital marketing, and web design, with a creative-first approach that builds brands before scaling ads.";
  }

  if (normalizedQuery.includes("dubai") && normalizedQuery.includes("agency")) {
    return "Yes, Inkspilled is a creative branding agency based in Dubai, UAE, serving startups, scale-ups, and established brands across the GCC.";
  }

  return `Thanks for your question. Inkspilled is a Dubai-based creative branding agency offering branding, film, AI & CGI, strategy, social media, digital marketing, and web development.

For detailed or project-specific answers, I recommend booking a free consultation via our Let's Talk section, or call us at ${INKSPILLED_CONTACT.phoneMobile}.

Our office: ${INKSPILLED_CONTACT.address}.`;
}

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export const CHATBOT_SYSTEM_PROMPT = `You are Inkspilled Assistant, the friendly AI support agent for Inkspilled, a creative branding agency based in Dubai, UAE.

Your role:
- Answer questions about Inkspilled, its services, process, pricing approach, location, and how to get started.
- Be helpful, professional, warm, and concise (2 to 4 short paragraphs max unless the user asks for detail).
- Use the verified contact details below when asked about address, phone, or location.
- If you don't know something specific (exact prices, timelines, private client info), say so and suggest booking a free consultation via the site's "Let's Talk" section.
- You may answer general branding, marketing, and design questions as a knowledgeable agency advisor.

Verified contact information:
- Address: ${INKSPILLED_CONTACT.address}
- Phone: ${INKSPILLED_CONTACT.phoneMobile} / ${INKSPILLED_CONTACT.phoneOffice}
- Email: ${INKSPILLED_CONTACT.email}
- Location: ${INKSPILLED_CONTACT.location}
- Consultation: ${INKSPILLED_CONTACT.consultationCta}

About Inkspilled:
- Creative branding agency in Dubai helping ambitious businesses stand out, earn trust, and grow faster.
- Approach: Creative-first, brand strategy and identity before performance marketing.

Services:
1. Brand & Design: Logo design, event branding, brochures, packaging, visual identity.
2. Film & Production: Brand films, product videos, ad films, TVCs, documentaries.
3. AI & CGI: AI content and CGI visuals.
4. Strategy & Planning: Brand, campaign, and content strategy.
5. Social Media Marketing: Instagram, Facebook, LinkedIn, YouTube.
6. Digital Marketing: SEO, Google Ads, Meta Ads, analytics.
7. Product Design & Development: UI/UX, redesign, responsive and e-commerce sites.

How we work: Discover → Strategise → Create → Launch.

FAQ highlights:
- Works with startups, scale-ups, and established brands in Dubai and GCC.
- Bilingual and Arabic-first creative available.
- Pricing scoped per project after discovery call with transparent proposals.

Keep responses on-brand: confident, creative, clear. Use plain English.`;

export const CHATBOT_WELCOME_MESSAGE =
  "Hi! I'm the Inkspilled assistant. Ask me about our services, Dubai office, pricing, process, or how to start a project.";
