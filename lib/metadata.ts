import type { Metadata } from "next";

export function constructMetadata({
  title = "Field Nation Developer Portal",
  description = "Documentation and API references for Field Nation integrations.",
  image = "/og/docs/getting-started/introduction/image.webp",
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
    applicationName: "Field Nation Developer Portal",
    category: "technology",
    classification: "Documentation",
    authors: [{ name: "Field Nation", url: "https://www.fieldnation.com" }],
    creator: "Field Nation",
    publisher: "Field Nation",
    alternates: {
      canonical: "./",
    },
    openGraph: {
      title,
      description,
      siteName: "Field Nation Developer Portal",
      url: "./",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@fieldnation",
      site: "@fieldnation",
    },
    verification: {
      google:
        "google-site-verification=gJthkFVvVwWskOEuM41ma1sg-JB_yY_I8zctc9ZH2Gg", // need to replace or genearate again (https://search.google.com/search-console/welcome)
    },
    appleWebApp: {
      capable: true,
      title: "FN Developers",
      statusBarStyle: "default",
    },
    icons,
    metadataBase: new URL("https://developers.fieldnation.com"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
