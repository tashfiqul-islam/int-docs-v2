import type { Metadata } from "next";

export function constructMetadata({
  title = "Field Nation Developer Portal",
  description = "Documentation and API references for Field Nation integrations.",
  image = "/api/og",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@fieldnation",
    },
    icons,
    metadataBase: new URL("https://docs.fieldnation.com"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
