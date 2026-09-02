"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  motionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { BlogPost } from "@/data/blogs";
import { FEATURED_HOME_BLOGS } from "@/data/blogs";
import { useStaticLayout } from "@/hooks/useStaticLayout";

const STATIC_SCROLL_PROGRESS = motionValue(0);

const INNER_CLASS = "mx-auto w-full max-w-[1400px]";
const COLUMN_CLASS = `${INNER_CLASS} px-6 md:px-10`;

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

function BlogReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: REVEAL_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

function IntroExploreMoreButton() {
  return (
    <Link
      href="/blog"
      className="ml-[5px] inline-flex shrink-0 items-center justify-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-[#000] bg-[#000] px-4 py-3 font-body text-sm font-bold text-[#fff] transition-opacity hover:opacity-75"
    >
      Explore More
    </Link>
  );
}

function BlogIntro({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title?: string;
}) {
  const source = eyebrow?.trim() || "More From Inkspilled";
  const words = source.split(/\s+/);
  const lastWord = words[words.length - 1] ?? "Inkspilled";
  const name = lastWord.toLowerCase() === "inkspilled" ? lastWord : "Inkspilled";
  const kicker =
    lastWord.toLowerCase() === "inkspilled"
      ? words.slice(0, -1).join(" ") || "More From"
      : "More From";

  return (
    <div className="inline-flex w-full max-w-full flex-col items-end">
      <div className="inline-block max-w-full text-right">
        <p className="whitespace-nowrap font-display text-[28px] font-bold leading-none tracking-[-0.03em] text-ink-dark sm:text-[32px] md:text-[36px] lg:text-[42px]">
          {kicker}
        </p>

        <h2 className="mt-1 font-display text-[60px] font-bold leading-[0.88] tracking-[-0.04em] text-ink-dark md:text-[80px]">
          {name}
        </h2>

        <p className="mt-5 font-body text-[20px] font-normal leading-tight text-[#000]">
          {title ?? "Straight From The Studio"}
        </p>

        <div className="mt-10 flex w-full min-w-0 items-center justify-between gap-8 text-left md:gap-10">
          <p className="min-w-0 text-left font-body text-[14px] font-normal leading-snug text-[#000]">
            <span className="block md:whitespace-nowrap">Ideas, Insight, And Creative</span>
            <span className="block md:whitespace-nowrap">Thinking, Built For Your Screen</span>
          </p>
          <IntroExploreMoreButton />
        </div>
      </div>
    </div>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const href = `/blog/${post.slug}`;

  return (
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
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </Link>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5 md:px-6 md:pb-7 md:pt-6">
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-gray">
          {post.category} · {post.readTime}
        </p>

        <h3 className="mt-2 font-display text-base font-bold leading-snug text-ink-dark md:text-lg">
          <Link href={href} className="transition-opacity hover:opacity-75">
            {post.title}
          </Link>
        </h3>

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
  );
}

function BlogSectionBackground({
  scrollYProgress = STATIC_SCROLL_PROGRESS,
}: {
  scrollYProgress?: MotionValue<number>;
}) {
  const imageY = useTransform(scrollYProgress, [0, 1], [90, -140]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const isAnimated = scrollYProgress !== STATIC_SCROLL_PROGRESS;

  const imageLayer = (
    <div className="relative h-full w-full">
      <Image
        src="/blog/blog-03.png"
        alt=""
        fill
        quality={100}
        className="object-cover object-[center_62%]"
        sizes="100vw"
      />
    </div>
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-white"
    >
      {isAnimated ? (
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute -left-[8%] -top-[18%] h-[136%] w-[116%] origin-center will-change-transform"
        >
          {imageLayer}
        </motion.div>
      ) : (
        <div className="absolute -left-[8%] -top-[18%] h-[136%] w-[116%]">
          {imageLayer}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-white from-0% via-white/92 via-42% to-white/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-white/45" />
    </div>
  );
}

function BlogSectionContent({
  posts,
  eyebrow,
  title,
}: {
  posts: BlogPost[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <div className="grid gap-y-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-stretch lg:gap-y-10 lg:gap-x-20 xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)] xl:gap-y-14 xl:gap-x-24">
      <BlogReveal>
        <BlogIntro eyebrow={eyebrow} title={title} />
      </BlogReveal>

      <div className="grid items-stretch gap-8 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-10 xl:gap-x-10">
        {posts.map((post, index) => (
          <BlogReveal key={post.slug} delay={0.08 + index * 0.1} className="h-full">
            <BlogCard post={post} />
          </BlogReveal>
        ))}
      </div>
    </div>
  );
}

function StaticBlogSection({
  posts,
  eyebrow,
  title,
}: {
  posts: BlogPost[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section
      id="blog"
      className="relative z-0 flex min-h-[100svh] scroll-mt-24 items-center overflow-hidden bg-white py-16 md:py-20"
    >
      <BlogSectionBackground />
      <div className={`relative z-10 w-full ${COLUMN_CLASS}`}>
        <BlogSectionContent posts={posts} eyebrow={eyebrow} title={title} />
      </div>
    </section>
  );
}

export default function BlogSection({
  posts = FEATURED_HOME_BLOGS,
  eyebrow,
  title,
}: {
  posts?: BlogPost[];
  eyebrow?: string;
  title?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const isStaticLayout = useStaticLayout();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  if (isStaticLayout) {
    return (
      <StaticBlogSection posts={posts} eyebrow={eyebrow} title={title} />
    );
  }

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative z-0 flex min-h-[100svh] scroll-mt-24 items-center overflow-hidden bg-white py-16 md:py-20"
    >
      <BlogSectionBackground scrollYProgress={scrollYProgress} />
      <div className={`relative z-10 w-full ${COLUMN_CLASS}`}>
        <BlogSectionContent posts={posts} eyebrow={eyebrow} title={title} />
      </div>
    </section>
  );
}
