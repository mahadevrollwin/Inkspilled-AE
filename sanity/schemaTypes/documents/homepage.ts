import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadlineTop",
      title: "Hero headline (top line)",
      type: "string",
    }),
    defineField({
      name: "heroHeadlines",
      title: "Hero rotating headlines",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "heroTagline", title: "Hero tagline", type: "text", rows: 3 }),
    defineField({
      name: "brandTitle",
      title: "Brand section title",
      type: "string",
    }),
    defineField({
      name: "whoWeAreCopy",
      title: "Who we are copy",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "letsTalkCopy",
      title: "Let's talk copy",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "letsTalkButtonLabel",
      title: "Let's talk button label",
      type: "string",
    }),
    defineField({
      name: "blogSectionEyebrow",
      title: "Blog section eyebrow",
      type: "string",
    }),
    defineField({
      name: "blogSectionTitle",
      title: "Blog section title",
      type: "string",
    }),
  ],
});
