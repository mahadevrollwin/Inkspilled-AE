import type { SchemaTypeDefinition } from "sanity";
import { aboutPage } from "./documents/aboutPage";
import { blogPost } from "./documents/blogPost";
import { contactPage } from "./documents/contactPage";
import { faq } from "./documents/faq";
import { homepage } from "./documents/homepage";
import { service } from "./documents/service";
import { siteSettings } from "./documents/siteSettings";
import { footerLink } from "./objects/footerLink";
import { serviceItem } from "./objects/serviceItem";
import { socialLink } from "./objects/socialLink";
import { stat } from "./objects/stat";
import { valueBlock } from "./objects/valueBlock";

export const schemaTypes: SchemaTypeDefinition[] = [
  service,
  blogPost,
  faq,
  siteSettings,
  aboutPage,
  contactPage,
  homepage,
  serviceItem,
  stat,
  valueBlock,
  socialLink,
  footerLink,
];
