import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Provider } from "@/app/components/provider";
import { SafeA11yFix } from "@/app/components/safe-a11y-fix";
import "./app.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const jetBrainsMono = localFont({
  src: [
    {
      path: "./assets/fonts/code/JetBrainsMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/code/JetBrainsMono-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./assets/fonts/code/JetBrainsMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Favicons from swags folder (theme-independent, using primary branding)
import appleTouch from "@/app/assets/swags/apple-touch-icon.png";
import favicon from "@/app/assets/swags/favicon.ico";
import faviconSvg from "@/app/assets/swags/favicon.svg";
import icon192 from "@/app/assets/swags/icon-192.png";

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
      { url: favicon.src },
      {
        url: faviconSvg.src,
        type: "image/svg+xml",
      },
      {
        url: icon192.src,
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: appleTouch.src,
        sizes: "180x180",
        type: "image/png",
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
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={`${openSans.variable} ${jetBrainsMono.variable} ${openSans.className}`}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden font-sans">
        <Provider>{children}</Provider>
        <SafeA11yFix />
      </body>
    </html>
  );
}
