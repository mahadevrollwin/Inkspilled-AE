"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "@/i18n/locale-context";
import { localizePath } from "@/i18n/path";

type LocaleLinkProps = ComponentProps<typeof Link>;

export default function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const locale = useLocale();
  const localizedHref =
    typeof href === "string" ? localizePath(locale, href) : href;

  return <Link href={localizedHref} {...props} />;
}
