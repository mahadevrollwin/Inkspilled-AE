import type { Metadata } from "next";
import Footer from "@/components/Footer";
import BlogListingContent from "@/components/BlogListingContent";
import LetsTalkSection from "@/components/LetsTalkSection";
import Navbar from "@/components/Navbar";
import { getBlogPage } from "@/sanity/fetch";

type BlogListingPageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export const metadata: Metadata = {
  title: "Blog | Inkspilled",
  description:
    "Ideas, insight, and creative thinking from Inkspilled — a creative branding agency in Dubai.",
};

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
