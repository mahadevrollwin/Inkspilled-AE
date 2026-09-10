import { defineField, defineType } from "sanity";

export const blogMediaRow = defineType({
  name: "blogMediaRow",
  title: "Thumbnail + excerpt row",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Excerpt",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "textAr",
      title: "Excerpt (Arabic)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Thumbnail",
      description:
        "Optional. Leave empty for full-width text. Odd/even rows alternate thumbnail side on the details page.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imagePath",
      title: "Thumbnail path (fallback)",
      description: "Optional static path when no Sanity image is uploaded.",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "text",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Untitled row",
        subtitle: media ? "With thumbnail" : "Text only (full width)",
        media,
      };
    },
  },
});
