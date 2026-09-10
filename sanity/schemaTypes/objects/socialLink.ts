import { defineField, defineType } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "labelAr", title: "Label (Arabic)", type: "string" }),
    defineField({ name: "href", type: "url", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
