import { Provider } from "~/components/provider";
import "./app.css";
import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import type { ReactNode } from "react";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

// Dark mode icons
import darkAndroid192 from "~/assets/dark/android-chrome-192x192.png";
import darkAppleTouch from "~/assets/dark/apple-touch-icon.png";
import darkFavicon from "~/assets/dark/favicon.ico";
import darkFavicon16 from "~/assets/dark/favicon-16x16.png";
import darkFavicon32 from "~/assets/dark/favicon-32x32.png";
// Light mode icons
import lightAndroid192 from "~/assets/light/android-chrome-192x192.png";
import lightAppleTouch from "~/assets/light/apple-touch-icon.png";
import lightFavicon from "~/assets/light/favicon.ico";
import lightFavicon16 from "~/assets/light/favicon-16x16.png";
import lightFavicon32 from "~/assets/light/favicon-32x32.png";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Field Nation Developer Platform",
    template: "%s - Field Nation Developer Platform",
  },
  description:
    "Official documentation site for Field Nation Integration. Developer Portal providing API references, architecture guides, and platform information.",
  applicationName: "Field Nation Developer Platform",
  authors: [{ name: "Field Nation" }],
  keywords: [
    "Field Nation",
    "Developer Platform",
    "API Reference",
    "REST API",
    "Webhooks",
    "Integrations",
    "Marketplace",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: lightFavicon.src, media: "(prefers-color-scheme: light)" },
      { url: darkFavicon.src, media: "(prefers-color-scheme: dark)" },
      {
        url: lightFavicon16.src,
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: darkFavicon16.src,
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: lightFavicon32.src,
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: darkFavicon32.src,
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: lightAndroid192.src,
        sizes: "192x192",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: darkAndroid192.src,
        sizes: "192x192",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: lightAppleTouch.src,
        sizes: "180x180",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: darkAppleTouch.src,
        sizes: "180x180",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "Field Nation Developer Platform",
    title: "Field Nation Developer Platform",
    description:
      "Official documentation site for Field Nation Integration. Developer Portal providing API references, architecture guides, and platform information.",
    url: "https://developers.fieldnation.com",
    locale: "en_US",
    images: [
      {
        url: "/og/docs/getting-started/introduction/image.webp",
        width: 1200,
        height: 630,
        alt: "Field Nation Developer Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Nation Developer Platform",
    description:
      "Official documentation site for Field Nation Integration. Developer Portal providing API references, architecture guides, and platform information.",
    images: ["/og/docs/getting-started/introduction/image.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={`${openSans.variable} ${openSans.className}`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden font-sans">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
