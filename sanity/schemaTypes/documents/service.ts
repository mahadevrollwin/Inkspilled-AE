import { defineField, defineType } from "sanity";
import { arabicFieldset, arString, arText } from "../localized";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fieldsets: [arabicFieldset],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    arString("title", "Title"),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    arString("eyebrow", "Eyebrow"),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    arText("summary", "Summary"),
    defineField({
      name: "accent",
      title: "Accent color",
      type: "string",
      description: "Hex color, e.g. #dc5c52",
    }),
    defineField({
      name: "image",
      title: "Card image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imagePath",
      title: "Card image path (fallback)",
      type: "string",
      description: "Use when not uploading to Sanity, e.g. /services/inkspilled-brand-and-design-dubai.png",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "backgroundImagePath",
      title: "Background image path (fallback)",
      type: "string",
    }),
    defineField({
      name: "homepageTagline",
      title: "Homepage tagline",
      type: "string",
    }),
    arString("homepageTagline", "Homepage tagline"),
    defineField({
      name: "homepageDescription",
      title: "Homepage description",
      type: "text",
      rows: 3,
    }),
    arText("homepageDescription", "Homepage description"),
    defineField({
      name: "items",
      title: "Sub-services",
      type: "array",
      of: [{ type: "serviceItem" }],
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "eyebrow", media: "image" },
  },
});
