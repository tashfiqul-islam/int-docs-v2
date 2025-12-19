import type { MetadataRoute } from "next";
import { apiReferencesSource, source } from "@/lib/source";

// Required for static export
export const dynamic = "force-static";
export const revalidate = false;

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://developers.fieldnation.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as ChangeFreq,
      priority: 1,
    },
    {
      url: `${SITE_URL}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly" as ChangeFreq,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/api-references/rest-api/v2`,
      lastModified: new Date(),
      changeFrequency: "weekly" as ChangeFreq,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/api-references/webhooks/v3`,
      lastModified: new Date(),
      changeFrequency: "weekly" as ChangeFreq,
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/resources/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/resources/release-notes`,
      lastModified: new Date(),
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.4,
    },
  ];

  const docPages = source.getPages().map(({ url, data }) => ({
    url: `${SITE_URL}${url}`,
    lastModified:
      "lastModified" in data && data.lastModified
        ? new Date(data.lastModified as string)
        : new Date(),
    changeFrequency: "weekly" as ChangeFreq,
    priority: 0.7,
  }));

  const apiPages = apiReferencesSource.getPages().map(({ url, data }) => ({
    url: `${SITE_URL}${url}`,
    lastModified:
      "lastModified" in data && data.lastModified
        ? new Date(data.lastModified as string)
        : new Date(),
    changeFrequency: "weekly" as ChangeFreq,
    priority: 0.75,
  }));

  const seen = new Set<string>();
  const allPages = [...staticPages, ...docPages, ...apiPages].filter(
    (entry) => {
      if (seen.has(entry.url)) {
        return false;
      }
      seen.add(entry.url);
      return true;
    }
  );

  return allPages;
}
