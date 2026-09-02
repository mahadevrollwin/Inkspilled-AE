import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site title", type: "string" }),
    defineField({
      name: "siteDescription",
      title: "Site description",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
    defineField({ name: "phoneMobile", title: "Mobile phone", type: "string" }),
    defineField({ name: "phoneOffice", title: "Office phone", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 3 }),
    defineField({ name: "location", title: "Location label", type: "string" }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "footerLinksLeft",
      title: "Footer links (left column)",
      type: "array",
      of: [{ type: "footerLink" }],
    }),
    defineField({
      name: "footerLinksRight",
      title: "Footer links (right column)",
      type: "array",
      of: [{ type: "footerLink" }],
    }),
    defineField({
      name: "budgetOptions",
      title: "Contact form budget options",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
