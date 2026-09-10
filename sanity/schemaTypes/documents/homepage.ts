import { defineField, defineType } from "sanity";
import {
  arabicFieldset,
  arString,
  arStringArray,
  arText,
} from "../localized";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fieldsets: [arabicFieldset],
  fields: [
    defineField({
      name: "heroHeadlineTop",
      title: "Hero headline (top line)",
      type: "string",
    }),
    arString("heroHeadlineTop", "Hero headline (top line)"),
    defineField({
      name: "heroHeadlines",
      title: "Hero rotating headlines",
      type: "array",
      of: [{ type: "string" }],
    }),
    arStringArray("heroHeadlines", "Hero rotating headlines"),
    defineField({ name: "heroTagline", title: "Hero tagline", type: "text", rows: 3 }),
    arText("heroTagline", "Hero tagline"),
    defineField({
      name: "heroButtonLabel",
      title: "Hero button label",
      type: "string",
    }),
    arString("heroButtonLabel", "Hero button label"),
    defineField({
      name: "brandTitle",
      title: "Brand section title",
      type: "string",
    }),
    arString("brandTitle", "Brand section title"),
    defineField({
      name: "brandCopy",
      title: "Brand section copy",
      type: "text",
      rows: 3,
    }),
    arText("brandCopy", "Brand section copy"),
    defineField({
      name: "whoWeAreCopy",
      title: "Who we are copy",
      type: "text",
      rows: 4,
    }),
    arText("whoWeAreCopy", "Who we are copy"),
    defineField({
      name: "letsTalkCopy",
      title: "Let's talk copy",
      type: "text",
      rows: 3,
    }),
    arText("letsTalkCopy", "Let's talk copy"),
    defineField({
      name: "letsTalkButtonLabel",
      title: "Let's talk button label",
      type: "string",
    }),
    arString("letsTalkButtonLabel", "Let's talk button label"),
    defineField({
      name: "blogSectionEyebrow",
      title: "Blog section eyebrow",
      type: "string",
    }),
    arString("blogSectionEyebrow", "Blog section eyebrow"),
    defineField({
      name: "blogSectionTitle",
      title: "Blog section title",
      type: "string",
    }),
    arString("blogSectionTitle", "Blog section title"),
  ],
});
