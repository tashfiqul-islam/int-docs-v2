import type { MetadataRoute } from "next";

import appleTouch from "~/assets/swags/apple-touch-icon.png";
import favicon from "~/assets/swags/favicon.ico";
import icon192 from "~/assets/swags/icon-192.png";
import icon512 from "~/assets/swags/icon-512.png";

// Required for static export
export const dynamic = "force-static";
export const revalidate = false;

const _SITE_URL =
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
        src: icon192.src,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: icon512.src,
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: appleTouch.src,
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: favicon.src,
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
