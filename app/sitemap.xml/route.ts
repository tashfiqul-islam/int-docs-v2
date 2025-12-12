import { apiReferencesSource, source } from "@/lib/source";

// Statically generate sitemap for static export
export const revalidate = false;

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

type PageEntry = {
  path: string;
  change: ChangeFreq;
  priority: number;
  lastModified?: Date;
};

export function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://developers.fieldnation.com";

  const staticPages: PageEntry[] = [
    { path: "/", change: "weekly", priority: 1 },
    { path: "/docs", change: "weekly", priority: 0.9 },
    { path: "/api-references/rest-api/v2", change: "weekly", priority: 0.9 },
    { path: "/api-references/webhooks/v3", change: "weekly", priority: 0.85 },
    { path: "/resources/faq", change: "monthly", priority: 0.6 },
    { path: "/resources/release-notes", change: "monthly", priority: 0.4 },
  ];

  const docPages: PageEntry[] = source.getPages().map(({ url, data }) => ({
    path: url,
    change: "weekly",
    priority: 0.7,
    lastModified: data.lastModified ? new Date(data.lastModified) : undefined,
  }));

  const apiPages: PageEntry[] = apiReferencesSource
    .getPages()
    .map(({ url, data }) => ({
      path: url,
      change: "weekly",
      priority: 0.75,
      lastModified: data.lastModified ? new Date(data.lastModified) : undefined,
    }));

  const seen = new Set<string>();
  const allPages = [...staticPages, ...docPages, ...apiPages].filter(
    (entry) => {
      if (seen.has(entry.path)) {
        return false;
      }
      seen.add(entry.path);
      return true;
    }
  );

  const urls = allPages.map((entry) => pageXml(baseUrl, entry)).join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`,
    {
      headers: {
        "content-type": "application/xml",
      },
    }
  );
}

function pageXml(
  baseUrl: string,
  { path, change, priority, lastModified }: PageEntry
) {
  const normalizedPath =
    path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
  const loc = `${baseUrl}${normalizedPath}`;
  const lastMod = lastModified
    ? `\n  <lastmod>${lastModified.toISOString()}</lastmod>`
    : "";

  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${change}</changefreq>
    <priority>${priority}</priority>${lastMod}
  </url>`;
}
