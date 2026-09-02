import { apiVersion, dataset, projectId, useCdn } from "../../sanity/env";

export const sanityConfigured = Boolean(projectId);

type QueryParams = Record<string, unknown>;

function getQueryUrl(
  query: string,
  params: QueryParams = {},
  preferCdn: boolean = useCdn,
) {
  const host = preferCdn ? "apicdn" : "api";
  let url = `https://${projectId}.${host}.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  for (const [key, value] of Object.entries(params)) {
    url += `&$${key}=${encodeURIComponent(JSON.stringify(value))}`;
  }

  return url;
}

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  useCdn: preferCdn = useCdn,
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  useCdn?: boolean;
}): Promise<T> {
  if (!sanityConfigured) {
    throw new Error("Sanity is not configured");
  }

  const response = await fetch(getQueryUrl(query, params, preferCdn), {
    next: {
      revalidate: revalidate === false ? 0 : revalidate,
    },
  });

  if (!response.ok) {
    throw new Error(`Sanity query failed (${response.status})`);
  }

  const payload = (await response.json()) as { result: T };
  return payload.result;
}
