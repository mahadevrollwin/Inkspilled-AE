import { defineField, type FieldDefinition } from "sanity";

export const arabicFieldset = {
  name: "arabic",
  title: "Arabic",
  options: { collapsible: true, collapsed: false },
};

export function arString(name: string, title: string): FieldDefinition {
  return defineField({
    name: `${name}Ar`,
    title: `${title} (Arabic)`,
    type: "string",
    fieldset: "arabic",
  });
}

export function arText(
  name: string,
  title: string,
  rows = 3,
): FieldDefinition {
  return defineField({
    name: `${name}Ar`,
    title: `${title} (Arabic)`,
    type: "text",
    rows,
    fieldset: "arabic",
  });
}

export function arStringArray(name: string, title: string): FieldDefinition {
  return defineField({
    name: `${name}Ar`,
    title: `${title} (Arabic)`,
    type: "array",
    of: [{ type: "string" }],
    fieldset: "arabic",
  });
}

export function arPortableText(name: string, title: string): FieldDefinition {
  return defineField({
    name: `${name}Ar`,
    title: `${title} (Arabic)`,
    type: "array",
    of: [{ type: "block" }],
    fieldset: "arabic",
  });
}
