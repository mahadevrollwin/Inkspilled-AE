import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({ name: "storyEyebrow", title: "Story eyebrow", type: "string" }),
    defineField({ name: "storyTitle", title: "Story title", type: "string" }),
    defineField({
      name: "storyParagraphs",
      title: "Story paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "valuesEyebrow",
      title: "Values eyebrow",
      type: "string",
    }),
    defineField({ name: "valuesTitle", title: "Values title", type: "string" }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [{ type: "valueBlock" }],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{ type: "stat" }],
    }),
    defineField({ name: "ctaTitle", title: "CTA title", type: "string" }),
    defineField({ name: "ctaCopy", title: "CTA copy", type: "text", rows: 3 }),
    defineField({ name: "ctaButtonLabel", title: "CTA button label", type: "string" }),
  ],
});
