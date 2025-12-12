import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { Metadata } from "next";
import { Footer } from "~/(home)/footer";
import { HeroSection } from "~/(home)/hero-section";
import { baseOptions } from "../lib/layout.shared";

export const metadata: Metadata = {
  title: "Field Nation Developer Platform",
  description:
    "Official documentation site for Field Nation Integration. Developer Portal providing API references, architecture guides, and platform information.",
  openGraph: {
    title: "Field Nation Developer Platform",
    description:
      "Official documentation site for Field Nation Integration. Developer Portal providing API references, architecture guides, and platform information.",
    type: "website",
    siteName: "Field Nation Developer Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Nation Developer Platform",
    description:
      "Official documentation site for Field Nation Integration. Developer Portal providing API references, architecture guides, and platform information.",
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col" data-homepage>
      <div className="flex-1">
        <HomeLayout {...baseOptions()}>
          <HeroSection />
        </HomeLayout>
      </div>
      <Footer />
    </div>
  );
}
