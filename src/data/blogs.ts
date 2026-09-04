export type BlogContentBlock = {
  text: string;
  heading?: boolean;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: Array<string | BlogContentBlock>;
};

export function isBlogHeading(text: string) {
  const trimmed = text.trim();
  return (
    /^\d{1,2}[\.\)\:]\s+\S/.test(trimmed) ||
    /^\d{1,2}\s+[-–—]\s+\S/.test(trimmed) ||
    /^#{1,6}\s+\S/.test(trimmed)
  );
}

export function toBlogContentBlocks(
  content: BlogPost["content"],
): { text: string; heading: boolean }[] {
  return content.map((item) => {
    if (typeof item === "string") {
      return { text: item, heading: isBlogHeading(item) };
    }

    return {
      text: item.text,
      heading: Boolean(item.heading) || isBlogHeading(item.text),
    };
  });
}

export const BLOGS_PER_PAGE = 9;

const IMAGE_CYCLE = [
  "/blog/blog-01.png",
  "/blog/blog-02.png",
  "/blog/blog-03.png",
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "building-brands-that-feel-human",
    title: "Building Brands That Feel Human In A Digital First World",
    excerpt:
      "Great brands do more than look polished. They create recognition, trust, and emotion before a single word is read.",
    image: IMAGE_CYCLE[0],
    category: "Branding",
    date: "March 12, 2026",
    readTime: "6 min read",
    author: "Inkspilled Studio",
    content: [
      "In a crowded digital landscape, visual polish is no longer enough. Audiences decide how they feel about a brand in seconds, long before they understand the offer.",
      "That is why the strongest identities start with clarity. Positioning, personality, and promise must work together so every touchpoint feels intentional rather than decorative.",
      "At Inkspilled, we treat branding as a living system. Logos, colour, typography, and motion are tools, but the real goal is recognition that compounds over time.",
      "When a brand feels human, people remember it. They talk about it. And they choose it again without needing to be convinced twice.",
    ],
  },
  {
    slug: "why-creative-strategy-comes-before-campaigns",
    title: "Why Creative Strategy Should Always Come Before Campaigns",
    excerpt:
      "Beautiful work without direction is expensive noise. Strategy turns ideas into outcomes your audience can feel.",
    image: IMAGE_CYCLE[1],
    category: "Strategy",
    date: "March 5, 2026",
    readTime: "5 min read",
    author: "Inkspilled Studio",
    content: [
      "Campaigns fail most often when they begin with execution. Teams jump to formats, channels, and aesthetics before agreeing on the problem worth solving.",
      "Creative strategy reverses that order. It defines the audience, the tension, and the idea that can travel across media without losing meaning.",
      "With a clear strategy in place, every asset has a job. Social cuts, films, landing pages, and print all reinforce one narrative instead of competing for attention.",
      "The result is work that feels confident because it knows exactly who it is speaking to and why it matters.",
    ],
  },
  {
    slug: "designing-websites-that-convert-without-shouting",
    title: "Designing Websites That Convert Without Shouting",
    excerpt:
      "Conversion is not about louder CTAs. It is about clarity, pacing, and trust built into every scroll.",
    image: IMAGE_CYCLE[2],
    category: "Web Design",
    date: "February 26, 2026",
    readTime: "7 min read",
    author: "Inkspilled Studio",
    content: [
      "A website should feel like a guided conversation, not a billboard. Visitors arrive with intent, and good design respects that by removing friction at every step.",
      "Hierarchy matters more than decoration. Strong headlines, readable copy, and purposeful imagery help people move forward without feeling pushed.",
      "Motion and interaction can support conversion when they reveal content at the right moment. Used poorly, they become distraction.",
      "The best digital experiences look calm because the decisions behind them were rigorous.",
    ],
  },
  {
    slug: "social-content-that-earns-attention",
    title: "Social Content That Earns Attention Instead Of Interrupting It",
    excerpt:
      "Feeds reward relevance. The brands that win create culture, not just calendars of posts.",
    image: IMAGE_CYCLE[0],
    category: "Social Media",
    date: "February 18, 2026",
    readTime: "5 min read",
    author: "Inkspilled Studio",
    content: [
      "Most social content disappears because it was made to fill a schedule, not to spark a reaction. Frequency without insight is still invisible.",
      "High performing brands build a point of view. They know what they stand for, how they sound, and which formats suit each platform.",
      "Instagram, LinkedIn, and YouTube reward different behaviours. Treating them as one channel flattens both creativity and performance.",
      "When content feels native and purposeful, engagement becomes a byproduct rather than a desperate target.",
    ],
  },
  {
    slug: "the-case-for-cinematic-brand-films",
    title: "The Case For Cinematic Brand Films In Modern Marketing",
    excerpt:
      "Film remains one of the fastest ways to make people feel something lasting about your brand.",
    image: IMAGE_CYCLE[1],
    category: "Film",
    date: "February 10, 2026",
    readTime: "6 min read",
    author: "Inkspilled Studio",
    content: [
      "Short attention spans have not killed storytelling. They have made intentional storytelling more valuable.",
      "A brand film can communicate tone, ambition, and emotion in ways a static asset never will. Done well, it becomes the centre of a wider campaign system.",
      "Production craft matters, but so does editing rhythm. Every frame should earn its place in the cut.",
      "When cinema meets strategy, film stops being decoration and starts becoming brand memory.",
    ],
  },
  {
    slug: "ai-and-cg-without-losing-the-craft",
    title: "Using AI And CG Without Losing The Craft",
    excerpt:
      "New tools expand what is possible. Taste and direction still decide what is worth making.",
    image: IMAGE_CYCLE[2],
    category: "AI & CGI",
    date: "February 3, 2026",
    readTime: "6 min read",
    author: "Inkspilled Studio",
    content: [
      "AI and computer graphics can accelerate exploration, but speed alone does not create distinctive work.",
      "The difference is art direction. Without a clear visual language, generative tools produce novelty that ages in weeks.",
      "We use these technologies as production partners: for visualisation, ideation, and scenes that would be impractical to shoot.",
      "Craft remains the filter. If an image cannot serve the brand story, it does not ship.",
    ],
  },
  {
    slug: "digital-marketing-that-respects-the-brand",
    title: "Digital Marketing That Respects The Brand And The Numbers",
    excerpt:
      "Performance and brand are not opposing forces. The best campaigns make them reinforce each other.",
    image: IMAGE_CYCLE[0],
    category: "Digital Marketing",
    date: "January 27, 2026",
    readTime: "5 min read",
    author: "Inkspilled Studio",
    content: [
      "Paid media can scale reach quickly, but weak creative still burns budget. Algorithms reward relevance, not desperation.",
      "Strong digital marketing starts with message market fit, then uses testing to refine delivery rather than invent the idea after launch.",
      "SEO, PPC, and Meta campaigns work best when they share the same narrative spine as the rest of the brand.",
      "When performance channels protect brand quality, growth becomes more sustainable and less expensive over time.",
    ],
  },
  {
    slug: "packaging-as-a-silent-salesperson",
    title: "Packaging Design As Your Silent Salesperson",
    excerpt:
      "On shelf and on screen, packaging has seconds to communicate value, personality, and trust.",
    image: IMAGE_CYCLE[1],
    category: "Branding",
    date: "January 20, 2026",
    readTime: "4 min read",
    author: "Inkspilled Studio",
    content: [
      "Packaging is often the first physical handshake between brand and customer. It has to work from arm’s length and in a thumbnail.",
      "Good packaging balances hierarchy, material honesty, and distinctive form. It should feel inevitable for the product inside.",
      "In ecommerce, unboxing becomes content. Structure and print details can extend the brand experience beyond the sale.",
      "When packaging is treated as strategy rather than decoration, it sells even when no one is speaking.",
    ],
  },
  {
    slug: "motion-graphics-that-carry-meaning",
    title: "Motion Graphics That Carry Meaning, Not Just Movement",
    excerpt:
      "Motion should clarify ideas. If it only decorates, it is visual noise wearing a trendy jacket.",
    image: IMAGE_CYCLE[2],
    category: "Motion",
    date: "January 13, 2026",
    readTime: "5 min read",
    author: "Inkspilled Studio",
    content: [
      "Motion graphics thrive when they explain relationships: process, hierarchy, transformation, or emotion.",
      "Timing, easing, and typography do as much storytelling as the illustration itself. Soft transitions can feel premium; abrupt ones can feel urgent.",
      "For brands, a consistent motion language becomes as recognisable as a colour palette.",
      "We design motion systems that scale from social cuts to presentations without losing identity.",
    ],
  },
  {
    slug: "dubai-creative-agency-lessons",
    title: "Lessons From Building Creative Work For Ambitious Dubai Brands",
    excerpt:
      "Dubai’s market moves fast. Clarity, craft, and cultural awareness keep creative work relevant.",
    image: IMAGE_CYCLE[0],
    category: "Studio Notes",
    date: "January 6, 2026",
    readTime: "6 min read",
    author: "Inkspilled Studio",
    content: [
      "Working in Dubai means designing for multicultural audiences with high expectations for quality and speed.",
      "Ambition is common. Differentiation comes from how carefully a brand translates ambition into a clear creative system.",
      "We have learned that local relevance and global polish can coexist when research and craft stay equally rigorous.",
      "The brands that endure here invest in identity before chasing trends.",
    ],
  },
  {
    slug: "content-systems-beat-one-off-ideas",
    title: "Why Content Systems Beat One Off Creative Ideas",
    excerpt:
      "A single brilliant post fades. A system keeps your brand present, coherent, and ready to scale.",
    image: IMAGE_CYCLE[1],
    category: "Strategy",
    date: "December 18, 2025",
    readTime: "5 min read",
    author: "Inkspilled Studio",
    content: [
      "One off ideas can create spikes. Systems create momentum. Brands that rely only on inspiration eventually stall.",
      "A content system defines pillars, formats, and production rhythms so teams know what to make next without starting from zero.",
      "Creative freedom still matters, but it works better inside a framework that protects brand consistency.",
      "When the system is strong, experimentation becomes safer and results become easier to measure.",
    ],
  },
  {
    slug: "ux-details-that-shape-brand-trust",
    title: "The UX Details That Quietly Shape Brand Trust",
    excerpt:
      "Trust is built in micro moments: load speed, empty states, form labels, and how errors are handled.",
    image: IMAGE_CYCLE[2],
    category: "Web Design",
    date: "December 9, 2025",
    readTime: "4 min read",
    author: "Inkspilled Studio",
    content: [
      "Users rarely praise good UX out loud, but they notice when it is missing. Friction feels like carelessness.",
      "Small interface decisions communicate brand values. Clear forms feel respectful. Thoughtful empty states feel human.",
      "Accessibility is part of that trust. Inclusive design expands reach and signals professionalism.",
      "We treat UX polish as brand work because every interaction is a brand interaction.",
    ],
  },
];

export function getBlogBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogPage(page: number) {
  const totalPages = Math.max(1, Math.ceil(BLOG_POSTS.length / BLOGS_PER_PAGE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * BLOGS_PER_PAGE;

  return {
    posts: BLOG_POSTS.slice(start, start + BLOGS_PER_PAGE),
    currentPage,
    totalPages,
    totalPosts: BLOG_POSTS.length,
  };
}

export function getRelatedBlogs(slug: string, count = 3) {
  const current = getBlogBySlug(slug);
  if (!current) return [];

  const sameCategory = BLOG_POSTS.filter(
    (post) => post.slug !== slug && post.category === current.category,
  );
  const others = BLOG_POSTS.filter(
    (post) => post.slug !== slug && post.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, count);
}

export const FEATURED_HOME_BLOGS = BLOG_POSTS.slice(0, 2);
