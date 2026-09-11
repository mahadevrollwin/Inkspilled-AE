"use client";

import Image from "@/components/SeoImage";
import LocaleLink from "@/components/LocaleLink";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BLOG_IMAGE_FALLBACK,
  getBlogDetailBlocks,
  sanitizeBlogPost,
  toBlogContentBlocks,
  type BlogCarouselBlock,
  type BlogContentBlock,
  type BlogMediaRow,
  type BlogPost,
} from "@/data/blogs";

const EASE = [0.22, 1, 0.36, 1] as const;

const CAROUSEL_ARROW_CLASS =
  "inline-flex h-10 w-10 items-center justify-center rounded-tl-[8px] rounded-tr-none rounded-br-[8px] rounded-bl-[8px] border border-ink-dark/15 bg-white text-ink-dark transition-opacity hover:opacity-75";

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
        <LocaleLink
          href={`/blog/${post.slug}`}
          className="relative block w-full overflow-hidden bg-[#111]"
        >
          <Image
            src={post.image || BLOG_IMAGE_FALLBACK}
            alt=""
            width={1600}
            height={900}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </LocaleLink>

        <p className="mt-4 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-gray">
          {post.category}
        </p>

        <h3 className="mt-2 font-display text-base font-bold leading-snug text-ink-dark md:text-lg">
          <LocaleLink
            href={`/blog/${post.slug}`}
            className="transition-opacity hover:opacity-75"
          >
            {post.title}
          </LocaleLink>
        </h3>

        <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ink-dark md:text-[15px]">
          {post.excerpt}
        </p>

        <div className="mt-5">
          <LocaleLink
            href={`/blog/${post.slug}`}
            className="inline-flex items-center justify-center rounded-tl-[8px] rounded-tr-none rounded-br-[8px] rounded-bl-[8px] border border-ink-dark bg-white px-5 py-2.5 font-body text-xs font-bold text-ink-dark transition-opacity hover:opacity-75 md:text-sm"
          >
            Explore More
          </LocaleLink>
        </div>
      </article>
    </Reveal>
  );
}

function ArticleBlocks({
  blocks,
  startDelay = 0,
}: {
  blocks: BlogContentBlock[];
  startDelay?: number;
}) {
  return (
    <>
      {blocks.map((block, index) => (
        <Reveal
          key={`${block.image || block.text.slice(0, 24)}-${index}`}
          delay={startDelay + 0.04 * index}
        >
          {block.image ? (
            <figure>
              <div className="overflow-hidden rounded-[28px] rounded-tr-none bg-[#111]">
                <Image
                  src={block.image}
                  alt={block.alt || block.caption || ""}
                  width={1600}
                  height={900}
                  className="h-auto w-full"
                  sizes="(max-width: 1400px) 100vw, 900px"
                />
              </div>
              {block.caption ? (
                <figcaption className="mt-3 font-body text-sm leading-relaxed text-ink-gray">
                  {block.caption}
                </figcaption>
              ) : null}
            </figure>
          ) : block.heading ? (
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

function MediaExcerptRow({
  row,
  index,
}: {
  row: BlogMediaRow;
  index: number;
}) {
  const hasThumbnail = Boolean(row.image);
  const thumbnailOnRight = index % 2 === 1;

  const thumbnail = hasThumbnail ? (
    <div className="md:col-span-6 lg:col-span-6">
      <div className="relative w-full overflow-hidden rounded-[28px] rounded-tr-none bg-[#111]">
        <Image
          src={row.image}
          alt=""
          width={1600}
          height={900}
          preload={index === 0}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
        />
      </div>
    </div>
  ) : null;

  const text = (
    <div className={hasThumbnail ? "md:col-span-6 lg:col-span-6" : "w-full"}>
      <p className="font-display text-2xl font-bold leading-snug tracking-[-0.02em] text-ink-dark md:text-3xl lg:text-[34px] lg:leading-[1.2]">
        {row.text}
      </p>
    </div>
  );

  return (
    <Reveal delay={0.04 * index}>
      <div
        className={
          hasThumbnail
            ? "grid items-start gap-8 md:grid-cols-12 md:gap-10 lg:gap-14"
            : "w-full"
        }
      >
        {hasThumbnail && thumbnailOnRight ? (
          <>
            {text}
            {thumbnail}
          </>
        ) : (
          <>
            {thumbnail}
            {text}
          </>
        )}
      </div>
    </Reveal>
  );
}

function BlogImageCarousel({
  block,
  delay = 0,
}: {
  block: BlogCarouselBlock;
  delay?: number;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slides = block.slides;

  if (!slides.length) return null;

  function scrollBySlide(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const width = scroller.clientWidth;
    const max = Math.max(scroller.scrollWidth - width, 0);
    let next = scroller.scrollLeft + direction * width;

    if (next > max + 8) next = 0;
    if (next < -8) next = max;

    scroller.scrollTo({ left: next, behavior: "smooth" });
  }

  return (
    <Reveal delay={delay}>
      <div className="w-full">
        {block.title ? (
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-ink-gray">
            {block.title}
          </p>
        ) : null}

        <div className="relative overflow-hidden rounded-[28px] rounded-tr-none bg-[#111]">
          <div
            ref={scrollerRef}
            className="blog-image-carousel flex touch-pan-x snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
          >
            {slides.map((slide, index) => (
              <div
                key={`${slide.src}-${index}`}
                className="relative w-full min-w-full shrink-0 snap-start snap-always"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt || ""}
                  width={1600}
                  height={900}
                  className="h-auto w-full"
                  sizes="(max-width: 1400px) 100vw, 1400px"
                />
              </div>
            ))}
          </div>
        </div>

        {slides.length > 1 ? (
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous slide"
              className={CAROUSEL_ARROW_CLASS}
              onClick={() => scrollBySlide(-1)}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              className={CAROUSEL_ARROW_CLASS}
              onClick={() => scrollBySlide(1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        ) : null}
      </div>
    </Reveal>
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
  const detailBlocks = getBlogDetailBlocks(displayPost);
  let mediaRowIndex = 0;

  return (
    <>
      <section className="bg-[#141414] pb-12 pt-28 text-white md:pb-16 md:pt-36">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <Reveal direction="left">
            <LocaleLink
              href="/blog"
              className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white"
            >
              ← Back To Blog
            </LocaleLink>

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
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          {detailBlocks.length > 0 ? (
            <div className="space-y-10 md:space-y-14">
              {detailBlocks.map((block, index) => {
                if (block.type === "carousel") {
                  return (
                    <BlogImageCarousel
                      key={`carousel-${block.title || "slides"}-${index}`}
                      block={block}
                      delay={0.04 * index}
                    />
                  );
                }

                const rowIndex = mediaRowIndex;
                mediaRowIndex += 1;
                return (
                  <MediaExcerptRow
                    key={`media-${block.text.slice(0, 32)}-${index}`}
                    row={block}
                    index={rowIndex}
                  />
                );
              })}
            </div>
          ) : null}

          <div
            className={
              detailBlocks.length > 0
                ? "mt-10 border-t border-ink-dark/10 pt-10 md:mt-12 md:pt-12"
                : ""
            }
          >
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <article className="space-y-7 md:space-y-8 lg:col-span-8">
                <ArticleBlocks blocks={body} />
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
            <LocaleLink
              href="/blog"
              className="inline-flex items-center justify-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-ink-dark bg-ink-dark px-5 py-3 font-body text-sm font-bold text-white transition-opacity hover:opacity-75"
            >
              Explore More Articles
            </LocaleLink>
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
