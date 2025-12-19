import type { MetadataRoute } from "next";

// Required for static export
export const dynamic = "force-static";
export const revalidate = false;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://developers.fieldnation.com";
const TRAILING_SLASH_REGEX = /\/$/;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
      },
      {
        userAgent: ["GPTBot", "CCBot", "Google-Extended"],
        allow: ["/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL.replace(TRAILING_SLASH_REGEX, ""),
  };
}
