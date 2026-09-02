import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailsContent from "@/components/BlogDetailsContent";
import Footer from "@/components/Footer";
import LetsTalkSection from "@/components/LetsTalkSection";
import Navbar from "@/components/Navbar";
import {
  getBlogBySlug,
  getBlogSlugs,
  getRelatedBlogs,
} from "@/sanity/fetch";

type BlogDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 0;

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailsPageProps): Promise<Metadata> {
  const post = await getBlogBySlug((await params).slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Inkspilled`,
    description: post.excerpt,
  };
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = await getRelatedBlogs(slug, 3);

  return (
    <main>
      <Navbar />
      <BlogDetailsContent post={post} related={related} />
      <LetsTalkSection />
      <Footer />
    </main>
  );
}
