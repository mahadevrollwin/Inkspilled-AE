import { defineField, defineType } from "sanity";

export const blogCarouselSlide = defineType({
  name: "blogCarouselSlide",
  title: "Carousel slide",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imagePath",
      title: "Image path (fallback)",
      type: "string",
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
    }),
    defineField({
      name: "altAr",
      title: "Alt text (Arabic)",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "alt",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Slide",
        media,
      };
    },
  },
});

export const blogCarousel = defineType({
  name: "blogCarousel",
  title: "Image carousel",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Caption (optional)",
      type: "string",
    }),
    defineField({
      name: "titleAr",
      title: "Caption (Arabic)",
      type: "string",
    }),
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      of: [{ type: "blogCarouselSlide" }],
      validation: (Rule) => Rule.min(2).error("Add at least 2 slides for a carousel"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      slides: "slides",
    },
    prepare({ title, slides }) {
      const count = Array.isArray(slides) ? slides.length : 0;
      return {
        title: title || "Image carousel",
        subtitle: `${count} slide${count === 1 ? "" : "s"}`,
      };
    },
  },
});
