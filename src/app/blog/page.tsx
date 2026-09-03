import type { Metadata } from "next";
import Footer from "@/components/Footer";
import BlogListingContent from "@/components/BlogListingContent";
import LetsTalkSection from "@/components/LetsTalkSection";
import Navbar from "@/components/Navbar";
import { BLOG_LISTING_SEO, toMetadata } from "@/data/seo";
import { getBlogPage } from "@/sanity/fetch";

type BlogListingPageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export const metadata: Metadata = toMetadata(BLOG_LISTING_SEO);

export const revalidate = 0;

export default async function BlogListingPage({
  searchParams,
}: BlogListingPageProps) {
  const params = await searchParams;
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const pageNumber = Number.parseInt(rawPage ?? "1", 10);
  const { posts, currentPage, totalPages, totalPosts } = await getBlogPage(
    Number.isFinite(pageNumber) ? pageNumber : 1,
  );

  return (
    <main>
      <Navbar />
      <BlogListingContent
        posts={posts}
        currentPage={currentPage}
        totalPages={totalPages}
        totalPosts={totalPosts}
      />
      <LetsTalkSection />
      <Footer />
    </main>
  );
}
