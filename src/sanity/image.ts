import { dataset, projectId } from "../../sanity/env";

function buildSanityCdnUrl(ref: string): string {
  const [, id, dimensions, format] = ref.split("-");
  if (!id || !dimensions || !format || !projectId) return "";
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
}

export function resolveImageUrl(
  image: { asset?: { _ref?: string } } | null | undefined,
  fallbackPath?: string | null,
): string {
  const ref = image?.asset?._ref;
  if (ref) {
    const url = buildSanityCdnUrl(ref);
    if (url) return url;
  }
  return fallbackPath || "";
}
