import { defineField, defineType } from "sanity";
import {
  arabicFieldset,
  arPortableText,
  arString,
  arText,
  portableTextMembers,
} from "../localized";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
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
    defineField({
      name: "excerpt",
      title: "Card excerpt",
      description: "Short summary used on blog listing and related cards.",
      type: "text",
      rows: 3,
    }),
    arText("excerpt", "Card excerpt"),
    defineField({
      name: "image",
      title: "Card image",
      description: "Image used on blog listing and related cards.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imagePath",
      title: "Card image path (fallback)",
      description: "Optional static path when no Sanity card image is uploaded.",
      type: "string",
    }),
    defineField({
      name: "mediaRows",
      title: "Detail content blocks",
      description:
        "Mix thumbnail + excerpt rows and image carousels. Thumbnail rows alternate left/right. No thumbnail = full-width text.",
      type: "array",
      of: [{ type: "blogMediaRow" }, { type: "blogCarousel" }],
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
    arString("category", "Category"),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({ name: "readTime", title: "Read time", type: "string" }),
    arString("readTime", "Read time"),
    defineField({ name: "author", title: "Author", type: "string" }),
    arString("author", "Author"),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Body",
      description: "Article copy. Use the toolbar to insert images between paragraphs.",
      type: "array",
      of: portableTextMembers,
    }),
    arPortableText("body", "Body"),
  ],
  orderings: [
    {
      title: "Published date, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
      date: "publishedAt",
    },
    prepare({ title, subtitle, media, date }) {
      return {
        title,
        subtitle: [subtitle, date ? new Date(date).toLocaleDateString() : null]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});
