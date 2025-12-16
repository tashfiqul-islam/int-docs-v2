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
      { url: "/light/favicon.ico", media: "(prefers-color-scheme: light)" },
      { url: "/dark/favicon.ico", media: "(prefers-color-scheme: dark)" },
      {
        url: "/light/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/dark/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/light/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/dark/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/light/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/dark/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/light/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/dark/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    other: [
      {
        rel: "manifest",
        url: "/light/site.webmanifest",
        media: "(prefers-color-scheme: light)",
      },
      {
        rel: "manifest",
        url: "/dark/site.webmanifest",
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
