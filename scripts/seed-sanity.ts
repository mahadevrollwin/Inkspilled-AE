import { createClient } from "@sanity/client";
import { BLOG_POSTS } from "../src/data/blogs";
import { SERVICES } from "../src/data/services";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before seeding.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token,
  useCdn: false,
});

async function seedServices() {
  for (const [index, service] of SERVICES.entries()) {
    await client.createOrReplace({
      _id: `service-${service.slug}`,
      _type: "service",
      title: service.title,
      slug: { _type: "slug", current: service.slug },
      eyebrow: service.eyebrow,
      summary: service.summary,
      accent: service.accent,
      imagePath: service.image,
      backgroundImagePath: service.backgroundImage,
      items: service.items,
      order: index,
    });
    console.log(`Seeded service: ${service.title}`);
  }
}

async function seedBlogs() {
  for (const [index, post] of BLOG_POSTS.entries()) {
    await client.createOrReplace({
      _id: `blog-${post.slug}`,
      _type: "blogPost",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      imagePath: post.image,
      category: post.category,
      readTime: post.readTime,
      author: post.author,
      featured: index < 2,
      body: post.content.map((paragraph) => ({
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", text: paragraph, marks: [] }],
      })),
    });
    console.log(`Seeded blog: ${post.title}`);
  }
}

async function seedFaqs() {
  const faqs = [
    {
      question: "What Services Does Inkspilled Offer?",
      answer:
        "Inkspilled Is A Dubai Based Creative Design Agency That Offers Brand Strategy, Logo And Identity Design, Creative Design And Motion, And Video Production. We Also Handle Content, Social Media, And Digital Growth.",
    },
    {
      question: "How Do I Start A Project With Inkspilled?",
      answer:
        "Reach Out Through Our Contact Page Or Email. We Schedule A Discovery Call To Understand Your Goals, Audience, And Timeline, Then Share A Tailored Proposal.",
    },
  ];

  for (const [index, faq] of faqs.entries()) {
    await client.createOrReplace({
      _id: `faq-${index + 1}`,
      _type: "faq",
      question: faq.question,
      answer: faq.answer,
      order: index,
    });
  }
  console.log("Seeded FAQs");
}

async function seedSingletons() {
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: "Inkspilled — Creative Branding Agency in Dubai",
    contactEmail: "hello@inkspilled.ae",
    phoneMobile: "+971 58 579 9959",
    phoneOffice: "04 578 4920",
    address: "B-803, Prime Business Center, JVC, Dubai, United Arab Emirates",
    location: "Dubai, United Arab Emirates",
    budgetOptions: [
      "AED 10K – AED 50K",
      "AED 50K – AED 100K",
      "AED 100K – AED 250K",
      "AED 250K – AED 500K",
      "AED 500K & Above",
    ],
  });

  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    title: "About Inkspilled",
    eyebrow: "Creative Branding Agency · Dubai",
  });

  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    eyebrow: "Get in touch",
    title: "It's time to\nSpill Something Great.",
  });

  await client.createOrReplace({
    _id: "homepage",
    _type: "homepage",
    blogSectionEyebrow: "More From Inkspilled",
    blogSectionTitle: "Straight From The Studio",
  });

  console.log("Seeded singleton documents");
}

async function main() {
  console.log(`Seeding Sanity project ${projectId} (${dataset})...`);
  await seedServices();
  await seedBlogs();
  await seedFaqs();
  await seedSingletons();
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
