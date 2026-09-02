import { defineField, defineType } from "sanity";

export const footerLink = defineType({
  name: "footerLink",
  title: "Footer Link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "href", type: "string", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
