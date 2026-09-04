"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { sanitizeBlogPost, toBlogContentBlocks, type BlogPost } from "@/data/blogs";

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
        : { x: 0, y: 36 };

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

function RelatedCard({ post, delay = 0 }: { post: BlogPost; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group flex h-full flex-col text-left">
        <Link
          href={`/blog/${post.slug}`}
          className="relative block w-full overflow-hidden bg-[#111]"
        >
          <Image
            src={post.image}
            alt=""
            width={1600}
            height={900}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Link>

        <p className="mt-4 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-gray">
          {post.category}
        </p>

        <h3 className="mt-2 font-display text-base font-bold leading-snug text-ink-dark md:text-lg">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-opacity hover:opacity-75"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ink-dark md:text-[15px]">
          {post.excerpt}
        </p>

        <div className="mt-5">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center justify-center rounded-tl-[8px] rounded-tr-none rounded-br-[8px] rounded-bl-[8px] border border-ink-dark bg-white px-5 py-2.5 font-body text-xs font-bold text-ink-dark transition-opacity hover:opacity-75 md:text-sm"
          >
            Explore More
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

function BlogThumbnailPlaceholder() {
  return (
    <div
      aria-hidden
      className="relative aspect-[16/10] overflow-hidden rounded-[20px] rounded-tr-none border border-ink-dark/8 bg-[#efefec]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#f6f6f4] via-[#ececea] to-[#deded8]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.65),transparent_55%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid h-11 w-11 place-items-center rounded-full border border-ink-dark/10 bg-white/75 shadow-sm">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-ink-gray/45"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="8.5" cy="10.5" r="1.5" fill="currentColor" stroke="none" />
            <path d="M3 16l5-5 4 4 3-3 6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ArticleBlocks({
  blocks,
  startDelay = 0,
}: {
  blocks: { text: string; heading: boolean }[];
  startDelay?: number;
}) {
  return (
    <>
      {blocks.map((block, index) => (
        <Reveal key={`${block.text.slice(0, 24)}-${index}`} delay={startDelay + 0.04 * index}>
          {block.heading ? (
            <h2 className="font-display text-xl font-bold leading-snug tracking-[-0.02em] text-ink-dark md:text-2xl">
              {block.text.replace(/^#{1,6}\s+/, "")}
            </h2>
          ) : (
            <p className="font-body text-sm leading-7 text-ink-dark md:text-[15px] md:leading-8">
              {block.text}
            </p>
          )}
        </Reveal>
      ))}
    </>
  );
}

export default function BlogDetailsContent({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const displayPost = sanitizeBlogPost(post);
  const relatedPosts = related.map(sanitizeBlogPost);
  const body = toBlogContentBlocks(displayPost.content);
  const gallerySplitIndex = Math.min(2, body.length);
  const openingBlocks = body.slice(0, gallerySplitIndex);
  const closingBlocks = body.slice(gallerySplitIndex);

  return (
    <>
      <section className="bg-[#141414] pb-12 pt-28 text-white md:pb-16 md:pt-36">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <Reveal direction="left">
            <Link
              href="/blog"
              className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white"
            >
              ← Back To Blog
            </Link>

            <p className="mt-8 font-body text-xs font-semibold uppercase tracking-[0.22em] text-ink-red">
              {displayPost.category}
            </p>

            <h1 className="mt-4 max-w-4xl font-display text-[32px] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl lg:text-[56px]">
              {displayPost.title}
            </h1>

            <div className="mt-6">
              <ColorDivider />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-body text-sm text-white/65">
              <span>{displayPost.author}</span>
              <span className="text-white/30" aria-hidden>
                |
              </span>
              <span>{displayPost.date}</span>
              <span className="text-white/30" aria-hidden>
                |
              </span>
              <span>{displayPost.readTime}</span>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 md:mt-12">
            <div className="relative w-full overflow-hidden rounded-[28px] rounded-tr-none bg-[#111]">
              <Image
                src={displayPost.image}
                alt=""
                width={1600}
                height={900}
                preload
                className="h-auto w-full"
                sizes="(max-width: 1400px) 100vw, 1400px"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <p className="max-w-5xl font-display text-2xl font-bold leading-snug tracking-[-0.02em] text-ink-dark md:text-3xl lg:text-[34px] lg:leading-[1.2]">
              {displayPost.excerpt}
            </p>
          </Reveal>

          <div className="mt-10 border-t border-ink-dark/10 pt-10 md:mt-12 md:pt-12">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <article className="space-y-7 md:space-y-8 lg:col-span-8">
                <ArticleBlocks blocks={openingBlocks} />

                {false && body.length > 0 ? (
                  <Reveal delay={0.08}>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
                      <BlogThumbnailPlaceholder />
                      <BlogThumbnailPlaceholder />
                      <BlogThumbnailPlaceholder />
                    </div>
                  </Reveal>
                ) : null}

                <ArticleBlocks blocks={closingBlocks} startDelay={0.1} />
              </article>

              <aside className="lg:col-span-4">
                <Reveal delay={0.06} direction="right">
                  <div className="rounded-[24px] rounded-tr-none border border-ink-dark/10 bg-[#f7f7f5] p-6 md:p-7 lg:sticky lg:top-28">
                    <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-gray">
                      Article Details
                    </p>
                    <dl className="mt-5 space-y-4 font-body text-sm text-ink-dark">
                      <div>
                        <dt className="text-ink-gray">Category</dt>
                        <dd className="mt-1 font-medium">{displayPost.category}</dd>
                      </div>
                      <div>
                        <dt className="text-ink-gray">Published</dt>
                        <dd className="mt-1 font-medium">{displayPost.date}</dd>
                      </div>
                      <div>
                        <dt className="text-ink-gray">Read Time</dt>
                        <dd className="mt-1 font-medium">{displayPost.readTime}</dd>
                      </div>
                      <div>
                        <dt className="text-ink-gray">Author</dt>
                        <dd className="mt-1 font-medium">{displayPost.author}</dd>
                      </div>
                    </dl>
                  </div>
                </Reveal>
              </aside>
            </div>
          </div>

          <Reveal className="mt-14 border-t border-ink-dark/10 pt-10 md:mt-16">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-ink-dark bg-ink-dark px-5 py-3 font-body text-sm font-bold text-white transition-opacity hover:opacity-75"
            >
              Explore More Articles
            </Link>
          </Reveal>
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="bg-[#eaeae8] py-16 md:py-24">
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
            <Reveal className="mb-10 md:mb-14">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-ink-gray">
                Keep Reading
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.025em] text-ink-dark md:text-4xl">
                Related Blogs
              </h2>
              <div className="mt-5">
                <ColorDivider />
              </div>
            </Reveal>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 xl:gap-x-10">
              {relatedPosts.map((item, index) => (
                <RelatedCard
                  key={item.slug}
                  post={item}
                  delay={0.05 * index}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
