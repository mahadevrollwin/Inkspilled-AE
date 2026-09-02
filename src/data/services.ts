export type ServiceItem = {
  title: string;
  description: string;
};

export type ServicePageData = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  intro?: string[];
  offeringsEyebrow: string;
  offeringsTitle: string;
  image: string;
  backgroundImage: string;
  accent: string;
  items: ServiceItem[];
};

export const SERVICES: ServicePageData[] = [
  {
    slug: "branding-design",
    title: "Brand & Design",
    eyebrow: "The soul made visible",
    summary:
      "Your logo is not your brand. Your brand is what people feel a half-second before they remember your name. We design that feeling and every mark, colour, and motion that carries it.",
    intro: [
      "Your logo is not your brand. Your brand is what they feel before they read the name.",
      "We design that feeling and every mark, colour, and movement that carries it. From the first sketch to the way it moves on screen, we build identities that hold together everywhere: on a shelf, in a scroll, across a stage. One brand, one voice, impossible to mistake for anyone else.",
    ],
    image: "/services/branding.png",
    backgroundImage: "/services/backgrounds/branding-design.png",
    accent: "#dc5c52",
    offeringsEyebrow: "THE CRAFT",
    offeringsTitle: "We don't decorate brands. We give them a spine.",
    items: [
      {
        title: "Brand Strategy & Positioning",
        description:
          "Every strong brand starts with a decision about what it stands for. We dig into who you're for, what you promise, and why anyone should care, then shape the positioning, messaging, and guidelines that keep you consistent everywhere. Pretty is easy. Right is the part we get correct first.",
      },
      {
        title: "Brand Identity & Logo Design",
        description:
          "Your logo is just the signature; the identity is the whole handwriting. We build the complete system: the mark and its variations, the colors, the type, and the rules that hold it together, so everything you make looks unmistakably like you. Legible on a favicon, alive on a facade.",
      },
      {
        title: "Motion Identity",
        description:
          "A brand shouldn't sit still. We bring yours to life with animated logos, transitions, and signature movements that make it feel alive across every reel, ad, and screen. It's the difference between a brand people see and one they instantly recognize the moment it moves.",
      },
      {
        title: "Print & Packaging",
        description:
          "This is your brand in the hand—the brochure, the catalogue, the box on the shelf, the menu on the table. We design print and packaging that guides the eye, tells the story, and rewards a second look, with the finish and detail that turn a product into something worth choosing.",
      },
      {
        title: "Event & Environmental Branding",
        description:
          "An event is a brand you can walk through, and a space is a brand you can stand inside. We design the full physical world of your brand—stage, signage, backdrops, wayfinding, and installations—so every touchpoint from the entrance to the exit feels intentional, immersive, and impossible to forget.",
      },
    ],
  },
  {
    slug: "films-production",
    title: "Film & Production",
    eyebrow: "Make them feel it",
    summary:
      "Three seconds to earn the fourth. We make films that win them — hook first, story fast, payoff sharp. The kind people finish, then send to someone else.",
    intro: [
      "You have three seconds to earn the fourth.",
      "Most brands lose people before the story even starts. We make films that win them — hook first, story fast, payoff sharp. From the first concept to the final colour pass, everything happens under one roof and one standard: the kind of film people actually finish, then send to someone else.",
    ],
    image: "/services/film.png",
    backgroundImage: "/services/backgrounds/film-production.png",
    accent: "#79c146",
    offeringsEyebrow: "THE LENS",
    offeringsTitle: "Anyone can press record. We make them stay.",
    items: [
      {
        title: "Corporate & Brand Films",
        description:
          "The film that says who you are with feeling, not a script read off a wall. We craft brand and corporate films that make people care about your company — the story, the people, the why — told with the polish of a studio and the warmth of a human.",
      },
      {
        title: "Ad Films & TVCs",
        description:
          "An ad has one job: make someone act. We produce ad films and TVCs built around a sharp idea and a sharper hook — broadcast-ready, scroll-ready, and engineered to stick in the head long after the screen goes dark.",
      },
      {
        title: "Product & E-commerce Videos",
        description:
          "A product video is a silent salesperson that never clocks out. We shoot and craft product and e-commerce films that show the detail, sell the benefit, and turn “I'm not sure” into “add to cart” — clean, cinematic, and made to convert.",
      },
      {
        title: "Social & Short-Form Content",
        description:
          "The always-on content that keeps your brand in the feed. Reels, shorts, and vertical videos built for the platforms people actually live on — high-volume, on-brand, and made to stop the thumb without ever looking cheap.",
      },
      {
        title: "Event & Documentary Films",
        description:
          "Some stories only happen once. We capture events, launches, and brand journeys as films with a pulse — after movies, founder stories, and documentaries that don't just record the moment but make people feel like they were in the room.",
      },
      {
        title: "Photography",
        description:
          "Some moments are best held still. We shoot product, brand, and event photography with the same eye we bring to film — clean, considered, and lit to make the ordinary look premium. The stills that fill your website, feed, catalogue, and campaigns, all shot to look unmistakably like you.",
      },
    ],
  },
  {
    slug: "ai-cg",
    title: "AI & CGI",
    eyebrow: "Impossible, made visible",
    summary:
      "The camera has limits. We don't. When an idea is too big, too bold, or too impossible to shoot, we build it instead — frame by frame, pixel by pixel, real enough to touch.",
    intro: [
      "The camera has limits. We don't.",
      "When an idea is too big to build, too bold to stage, or flat-out impossible to shoot, we make it anyway — frame by frame, pixel by pixel, real enough to touch. This is where imagination stops waiting for permission from the physical world. Craft, not shortcut. Made, not shot.",
    ],
    image: "/services/ai-cgi.png",
    backgroundImage: "/services/backgrounds/ai-cgi.png",
    accent: "#127dc2",
    offeringsEyebrow: "THE FRONTIER",
    offeringsTitle: "If it can be imagined, it can be built. So we build it.",
    items: [
      {
        title: "2D & 3D Animation",
        description:
          "From clean, characterful 2D to fully-realised 3D worlds, we animate ideas that a camera could never capture. Story-driven, detail-obsessed, and built to hold attention — whether it's a brand mascot, a stylised explainer, or a cinematic 3D sequence.",
      },
      {
        title: "Motion Graphics",
        description:
          "Where information starts to move. We turn static ideas — data, concepts, messages — into kinetic type, animated elements, and graphics that make the complex feel obvious and the ordinary feel premium. The polish that makes everything look intentional.",
      },
      {
        title: "Explainer & Infographic Videos",
        description:
          "Making the complicated click. We craft explainer and infographic videos that take a dense product, service, or idea and turn it into something anyone can understand in under a minute. Clear, engaging, and built to turn \"I don't get it\" into \"I need it.\"",
      },
      {
        title: "AI Content & Visuals",
        description:
          "The new frontier, handled with a real creative eye. We use AI to generate striking, original visuals and content at a speed and scale traditional production can't match — never as a shortcut, always as a tool in trained hands. Bold, on-brand, and impossible to source anywhere else.",
      },
      {
        title: "3D Product Visualization",
        description:
          "Your product, rendered perfect before it's even manufactured. We build photoreal 3D visualizations that show every angle, finish, and detail with a precision no photoshoot can match. Ideal for e-commerce, launches, and real estate, where the render is the sell.",
      },
      {
        title: "VFX & Compositing",
        description:
          "The invisible craft that makes it all believable. We blend CG, live footage, and effects into seamless final frames — the fixes, enhancements, and impossible shots that make a video look like it cost far more than it did. If you can imagine it, we can composite it in.",
      },
    ],
  },
  {
    slug: "strategy-planning",
    title: "Strategy & Planning",
    eyebrow: "Precision before production",
    summary:
      "Pretty is easy. Right is the hard part. Before a single pixel moves, we decide what to say, who to say it to, and why they should care. Everything good starts here.",
    intro: [
      "Pretty is easy. Right is the hard part.",
      "Before a single pixel moves or a frame gets shot, someone has to decide what to say, who to say it to, and why they should care. That's the work nobody sees and everything depends on. We do the thinking first — so everything that comes after has a reason to exist.",
    ],
    image: "/services/strategy.png",
    backgroundImage: "/services/backgrounds/strategy-planning.png",
    accent: "#dc5c52",
    offeringsEyebrow: "THE THINKING",
    offeringsTitle: "Everything looks obvious once someone's done the hard part.",
    items: [
      {
        title: "Brand Strategy",
        description:
          "Every strong brand starts with a decision about what it stands for. We define your positioning, your promise, and your voice — the foundation every design, film, and campaign is built on top of. Get this right, and everything downstream gets easier.",
      },
      {
        title: "Campaign Strategy",
        description:
          "A great campaign isn't a burst of content — it's one idea, told a hundred ways, all pointing the same direction. We shape the concept, the message, and the arc, so your campaign builds toward a result instead of just filling a calendar.",
      },
      {
        title: "Content Strategy",
        description:
          "Posting without a plan is just noise. We map what you say, where you say it, and why — turning scattered content into a system with a point of view. The result is a brand that shows up consistently and actually gives people a reason to keep watching.",
      },
      {
        title: "Market & Audience Research",
        description:
          "Great strategy is built on evidence, not guesses. We dig into your market, your audience, and your competitors to find what they want, what they're tired of, and where the gap is. It's the homework that makes every decision after it sharper.",
      },
      {
        title: "Copywriting & Brand Voice",
        description:
          "The right words do half the selling. We craft the language your brand speaks in — taglines, website copy, campaign lines, and the tone that ties it all together so you sound as sharp as you look. One consistent voice, across every place your brand opens its mouth.",
      },
    ],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    eyebrow: "Culture, not just content",
    summary:
      "A post is not a presence. We give your brand a voice worth following and the discipline to use it daily — until the feed stops feeling like marketing and starts feeling like you.",
    intro: [
      "A post is not a presence.",
      "Anyone can publish. Building a brand people actually want to follow is the harder, quieter work. A clear voice, a real rhythm, and content that always looks like it came from the same intentional place. We run your social the way it deserves to be run: daily, on-brand, and built to grow a community, not just a follower count.",
    ],
    image: "/services/social-media-marketing.png",
    backgroundImage: "/services/backgrounds/social-media-marketing.png",
    accent: "#79c146",
    offeringsEyebrow: "THE RHYTHM",
    offeringsTitle: "Brands aren't followed. They're worth following.",
    items: [
      {
        title: "Social Media Management",
        description:
          "The engine behind a feed that never misses. We handle the strategy, the calendar, and the day-to-day posting — so your brand shows up consistently, on time, and on message, without you ever having to think about it. One team, one voice, running the whole show.",
      },
      {
        title: "Content Creation",
        description:
          "The reels, posts, stories, and graphics that make people stop scrolling. Designed, written, and edited in-house so everything stays on brand and on standard, a steady stream of content that looks considered, not churned out.",
      },
      {
        title: "Community Management",
        description:
          "Followers are an audience; a community is an asset. We manage the replies, DMs, and comments that turn passive scrollers into people who actually engage — showing up in the conversation so your brand feels human, responsive, and worth sticking around for.",
      },
      {
        title: "Influencer Marketing",
        description:
          "The right voice can do in one post what ads take months to build. We find, vet, and manage the creators who genuinely fit your brand — handling everything from outreach to content to results, so the partnership feels authentic and actually moves the needle.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    eyebrow: "Traffic that transforms",
    summary:
      "Reach is vanity. Results are the point. We spend where it works, cut where it doesn't, and turn the scroll into the sale — with receipts for every dirham.",
    intro: [
      "Reach is vanity. Results are the point.",
      "Getting seen is easy. Getting someone to act is the whole job. We build performance-driven campaigns around one honest question: is this driving growth? Then spend where it works, cut where it doesn't, and turn the scroll into the sale. Every dirham accounted for, every result you can actually measure.",
    ],
    image: "/services/digital-marketing.png",
    backgroundImage: "/services/backgrounds/digital-marketing.png",
    accent: "#127dc2",
    offeringsEyebrow: "THE ENGINE",
    offeringsTitle: "We don't chase clicks. We chase the sale behind them.",
    items: [
      {
        title: "SEO",
        description:
          "The traffic you don't have to keep paying for. We optimize your site, content, and structure so the right people find you on Google — climbing the rankings for the searches that actually lead to business, and building an asset that compounds long after the work is done.",
      },
      {
        title: "Google Ads & PPC",
        description:
          "Show up the moment someone's ready to buy. We build and manage Google and PPC campaigns that put you in front of high-intent searchers, tightly targeted, constantly optimized, and tuned to bring down cost-per-click while driving up the results that count.",
      },
      {
        title: "Meta Ads",
        description:
          "Where attention lives, we make it work. We run Facebook and Instagram ad campaigns built on scroll-stopping creative and sharp targeting — testing relentlessly to find what converts, then scaling it hard. Great creative meets real strategy, because both come from the same studio.",
      },
      {
        title: "Email & WhatsApp Marketing",
        description:
          "The channels you actually own. We design email and WhatsApp campaigns that nurture leads, win back customers, and drive repeat sales — direct, personal, and built to keep your brand in the conversation long after the first click.",
      },
      {
        title: "Landing Pages & CRO",
        description:
          "Traffic is wasted on a page that doesn't convert. We design and optimize landing pages built around a single goal, then test and refine every element — headline, layout, button — to turn more of your visitors into customers. The difference between clicks and sales.",
      },
    ],
  },
  {
    slug: "website-design-development",
    title: "Product Design & Development",
    eyebrow: "Your digital flagship",
    summary:
      "The click is a promise. We keep it. Interfaces that feel obvious, load fast, and look like the brand — designed and built by the same people, so nothing gets lost between the mock-up and the machine.",
    intro: [
      "The click is a promise. We keep it.",
      "A great product feels obvious: every tap lands where you expect, every screen loads before you lose patience, and the whole thing feels like the brand behind it. We design and build digital products that work as well as they look: from the first user flow to the final line of code, handled by one team so nothing gets lost between the mock-up and the machine.",
    ],
    image: "/services/web-design-development.png",
    backgroundImage: "/services/backgrounds/web-design-development.png",
    accent: "#dc5c52",
    offeringsEyebrow: "THE BUILD",
    offeringsTitle: "Design decides how it feels. Code decides if it works. We refuse to choose.",
    items: [
      {
        title: "UX/UI Design",
        description:
          "Great products are designed twice: once for how they work, once for how they feel. We map the user journeys, wireframe the flows, and craft interfaces that make every path obvious. The result is a product people understand instantly and enjoy using, before a single line of code is written.",
      },
      {
        title: "Web Design & Development",
        description:
          "Custom websites, designed and built from scratch — no dropped-in templates, no compromises between how it looks and how it runs. Fast, responsive, and unmistakably yours, with clean code and search-ready structure baked in. Whether it's a fresh build or a full redesign, we make sites that work as hard as you do.",
      },
      {
        title: "Mobile App Design & Development",
        description:
          "An app lives in someone's pocket — it has to earn that spot. We design and build iOS and Android apps that feel effortless: intuitive, fast, and polished to the last interaction. From concept and interface to a product that's ready to ship and easy to grow.",
      },
      {
        title: "E-commerce Development",
        description:
          "An online store is a shop that never closes — so it has to sell on its own. We build e-commerce experiences on Shopify, WooCommerce, or custom platforms, designed around the one thing that matters: turning browsers into buyers. Fast, frictionless, and built to scale with you.",
      },
      {
        title: "Web Apps & Platforms",
        description:
          "When a website isn't enough, we build the real thing: dashboards, portals, SaaS products, and custom tools that do actual work. Considered, engineered, and built to handle complexity without ever feeling complicated. The heavy lifting, made to look easy.",
      },
      {
        title: "AI Chatbots & Automation",
        description:
          "A brand that answers in seconds, day or night. We build custom AI chatbots trained on your business — not a generic script — that answer questions, qualify leads, and book calls automatically. Add in workflow automation, and the repetitive work runs itself, freeing your team for the conversations that actually need a human.",
      },
    ],
  },
];

export const SERVICE_MENU_ITEMS = SERVICES.map(({ slug, title }) => ({
  title,
  href: `/services/${slug}`,
}));

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}
