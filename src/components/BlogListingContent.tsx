"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { BlogPost } from "@/data/blogs";

const EASE = [0.22, 1, 0.36, 1] as const;

function ColorDivider() {
  return (
    <div className="flex h-[3px] w-28 overflow-hidden" aria-hidden>
      <span className="w-1/3 bg-ink-red" />
      <span className="w-1/3 bg-[#79c146]" />
      <span className="w-1/3 bg-ink-blue" />
    </div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const reduceMotion = useReducedMotion();
  const offset =
    direction === "left"
      ? { x: -40, y: 0 }
      : direction === "right"
        ? { x: 40, y: 0 }
        : { x: 0, y: 40 };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BlogCard({ post, delay = 0 }: { post: BlogPost; delay?: number }) {
  const href = `/blog/${post.slug}`;

  return (
    <Reveal delay={delay} className="h-full">
      <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-[28px] rounded-tr-none border border-black/[0.08] bg-white text-left shadow-[0_18px_40px_rgba(20,20,20,0.08)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_64px_rgba(20,20,20,0.14)]">
        <Link
          href={href}
          className="relative block w-full shrink-0 overflow-hidden bg-[#111]"
        >
          <Image
            src={post.image}
            alt=""
            width={1600}
            height={900}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        <div className="flex flex-1 flex-col px-5 pb-6 pt-5 md:px-6 md:pb-7 md:pt-6">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-gray">
            {post.category} · {post.readTime}
          </p>

          <h2 className="mt-2 font-display text-base font-bold leading-snug text-ink-dark md:text-lg">
            <Link href={href} className="transition-opacity hover:opacity-75">
              {post.title}
            </Link>
          </h2>

          <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ink-dark md:mt-4 md:text-[15px]">
            {post.excerpt}
          </p>

          <div className="mt-5 md:mt-6">
            <Link
              href={href}
              className="inline-flex items-center justify-center rounded-tl-[8px] rounded-tr-none rounded-br-[8px] rounded-bl-[8px] border border-ink-dark bg-white px-5 py-2.5 font-body text-xs font-bold text-ink-dark transition-[background-color,color] duration-300 hover:bg-ink-dark hover:text-white md:px-6 md:py-3 md:text-sm"
            >
              Explore More
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Reveal className="mt-16 flex items-center justify-center gap-2 md:mt-20">
      {currentPage > 1 ? (
        <Link
          href={currentPage === 2 ? "/blog" : `/blog?page=${currentPage - 1}`}
          className="inline-flex h-10 min-w-10 items-center justify-center rounded-tl-[8px] rounded-br-[8px] border border-ink-dark px-3 font-body text-sm font-medium text-ink-dark transition-opacity hover:opacity-75"
          aria-label="Previous page"
        >
          Prev
        </Link>
      ) : null}

      {pages.map((page) => {
        const href = page === 1 ? "/blog" : `/blog?page=${page}`;
        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex h-10 min-w-10 items-center justify-center rounded-tl-[8px] rounded-br-[8px] border font-body text-sm font-bold transition-opacity hover:opacity-75 ${
              isActive
                ? "border-ink-dark bg-ink-dark text-white"
                : "border-ink-dark/30 bg-white text-ink-dark"
            }`}
          >
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          href={`/blog?page=${currentPage + 1}`}
          className="inline-flex h-10 min-w-10 items-center justify-center rounded-tl-[8px] rounded-br-[8px] border border-ink-dark px-3 font-body text-sm font-medium text-ink-dark transition-opacity hover:opacity-75"
          aria-label="Next page"
        >
          Next
        </Link>
      ) : null}
    </Reveal>
  );
}

export default function BlogListingContent({
  posts,
  currentPage,
  totalPages,
  totalPosts,
}: {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#141414] pb-16 pt-32 text-white md:pb-20 md:pt-40">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 85% 20%, rgba(220,92,82,0.35), transparent 55%), radial-gradient(ellipse 50% 50% at 10% 80%, rgba(41,182,232,0.2), transparent 50%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <Reveal direction="left">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
              Straight From The Studio
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-[42px] font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[72px]">
              Blog
            </h1>
            <div className="mt-7">
              <ColorDivider />
            </div>
            <p className="mt-7 max-w-xl font-body text-sm leading-7 text-white/72 md:text-[15px]">
              Ideas, insight, and creative thinking built for ambitious brands.
              Browse {totalPosts} articles from the Inkspilled studio.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          {posts.length ? (
            <div className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
              {posts.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  delay={0.04 + (index % 3) * 0.06}
                />
              ))}
            </div>
          ) : (
            <Reveal>
              <p className="mx-auto max-w-xl text-center font-body text-sm leading-7 text-ink-gray md:text-[15px]">
                New articles are on the way. Check back soon for fresh ideas from
                the Inkspilled studio.
              </p>
            </Reveal>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </section>
    </>
  );
}
