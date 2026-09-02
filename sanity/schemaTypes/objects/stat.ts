import { defineField, defineType } from "sanity";

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});
