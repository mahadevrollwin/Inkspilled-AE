import { defineField, defineType } from "sanity";
import { arabicFieldset, arString, arText } from "../localized";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fieldsets: [arabicFieldset],
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    arString("question", "Question"),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    arText("answer", "Answer", 4),
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
    select: { title: "question" },
  },
});
