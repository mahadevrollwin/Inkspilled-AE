import type { StructureResolver } from "sanity/structure";

const singletonTypes = new Set([
  "siteSettings",
  "aboutPage",
  "contactPage",
  "homepage",
]);

const singletonIds: Record<string, string> = {
  siteSettings: "siteSettings",
  aboutPage: "aboutPage",
  contactPage: "contactPage",
  homepage: "homepage",
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inkspilled Content")
     .items([
      S.listItem()
        .title("Site Settings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId(singletonIds.siteSettings),
        ),
      S.listItem()
        .title("Homepage")
        .child(
          S.document().schemaType("homepage").documentId(singletonIds.homepage),
        ),
      S.listItem()
        .title("About Page")
        .child(
          S.document().schemaType("aboutPage").documentId(singletonIds.aboutPage),
        ),
      S.listItem()
        .title("Contact Page")
        .child(
          S.document()
            .schemaType("contactPage")
            .documentId(singletonIds.contactPage),
        ),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("blogPost").title("Blog Posts"),
      S.documentTypeListItem("faq").title("FAQs"),
    ]);

export { singletonTypes };
