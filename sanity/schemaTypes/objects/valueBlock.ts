import { defineField, defineType } from "sanity";

export const valueBlock = defineType({
  name: "valueBlock",
  title: "Value",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "titleAr", title: "Title (Arabic)", type: "string" }),
    defineField({ name: "copy", type: "text", rows: 3 }),
    defineField({ name: "copyAr", title: "Copy (Arabic)", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "title", subtitle: "copy" },
  },
});
