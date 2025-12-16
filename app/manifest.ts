import type { MetadataRoute } from "next";

// Required for static export
export const dynamic = "force-static";
export const revalidate = false;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://developers.fieldnation.com";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Field Nation Developer Platform",
    short_name: "FN DX",
    description:
      "Official Field Nation developer experience with docs, API references, guides, and webhooks.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#ffffff",
    theme_color: "#E1703D",
    lang: "en-US",
    dir: "ltr",
    prefer_related_applications: false,
    icons: [
      {
        src: `${SITE_URL}/light/android-chrome-192x192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${SITE_URL}/light/android-chrome-512x512.png`,
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: `${SITE_URL}/light/apple-touch-icon.png`,
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: `${SITE_URL}/light/favicon-32x32.png`,
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: `${SITE_URL}/light/favicon-16x16.png`,
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: `${SITE_URL}/light/favicon.ico`,
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
