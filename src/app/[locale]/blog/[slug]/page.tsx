import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailsContent from "@/components/BlogDetailsContent";
import Footer from "@/components/Footer";
import LetsTalkSection from "@/components/LetsTalkSection";
import Navbar from "@/components/Navbar";
import { getBlogPostSeo, toMetadata } from "@/data/seo";
import { locales } from "@/i18n/config";
import { getLocaleParam } from "@/i18n/params";
import {
  getBlogBySlug,
  getBlogSlugs,
  getRelatedBlogs,
} from "@/sanity/fetch";

type BlogDetailsPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const revalidate = 0;

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocaleParam(params);
  const post = await getBlogBySlug(slug, locale);

  if (!post) {
    return {};
  }

  return toMetadata(getBlogPostSeo(post.slug, post.title, post.excerpt));
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { slug } = await params;
  const locale = await getLocaleParam(params);
  const post = await getBlogBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const related = await getRelatedBlogs(slug, 3, locale);

  return (
    <main>
      <Navbar />
      <BlogDetailsContent post={post} related={related} />
      <LetsTalkSection />
      <Footer />
    </main>
  );
}
