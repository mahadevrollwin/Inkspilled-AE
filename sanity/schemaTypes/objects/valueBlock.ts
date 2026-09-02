import { defineField, defineType } from "sanity";

export const valueBlock = defineType({
  name: "valueBlock",
  title: "Value",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "copy", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "title", subtitle: "copy" },
  },
});
