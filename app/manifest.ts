import type { MetadataRoute } from "next";

import android192 from "~/assets/light/android-chrome-192x192.png";
import android512 from "~/assets/light/android-chrome-512x512.png";
import appleTouch from "~/assets/light/apple-touch-icon.png";
import favicon from "~/assets/light/favicon.ico";
import favicon16 from "~/assets/light/favicon-16x16.png";
import favicon32 from "~/assets/light/favicon-32x32.png";

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
        src: android192.src,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: android512.src,
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: appleTouch.src,
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: favicon32.src,
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: favicon16.src,
        sizes: "16x16",
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
