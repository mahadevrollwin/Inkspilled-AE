import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({
      name: "metaPills",
      title: "Meta pills",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "formTitle", title: "Form title", type: "string" }),
    defineField({ name: "formIntro", title: "Form intro", type: "text", rows: 2 }),
    defineField({
      name: "statsEyebrow",
      title: "Stats eyebrow",
      type: "string",
    }),
    defineField({ name: "statsTitle", title: "Stats title", type: "string" }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{ type: "stat" }],
    }),
    defineField({
      name: "locationTitle",
      title: "Location section title",
      type: "string",
    }),
    defineField({
      name: "locationIntro",
      title: "Location section intro",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "officeLabel", title: "Office label", type: "string" }),
    defineField({ name: "officeCompany", title: "Office company", type: "string" }),
    defineField({
      name: "officeLines",
      title: "Office address lines",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "officeHours", title: "Office hours", type: "string" }),
    defineField({
      name: "careersTitle",
      title: "Careers title",
      type: "string",
    }),
    defineField({ name: "careersCopy", title: "Careers copy", type: "text", rows: 3 }),
    defineField({
      name: "careersButtonLabel",
      title: "Careers button label",
      type: "string",
    }),
  ],
});
