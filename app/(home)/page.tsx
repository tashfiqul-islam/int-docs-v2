import { ConnectorsShowcase } from "./ui/connectors-showcase";
import { Features } from "./ui/features";
import { Footer } from "./ui/footer";
import { HeroSection } from "./ui/hero-section";
import { PlatformStatement } from "./ui/platform-statement";
import { SectionSeparator } from "./ui/section-separator";
import { StructuredData } from "./ui/structured-data";

export default function HomePage() {
  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData type="organization" />
      <StructuredData type="software" />
      <StructuredData type="faq" />

      <main className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Connectors Showcase */}
        <SectionSeparator>
          <ConnectorsShowcase />
        </SectionSeparator>

        {/* Features Section */}
        <SectionSeparator>
          <Features />
        </SectionSeparator>

        {/* Platform Statement */}
        <SectionSeparator>
          <PlatformStatement />
        </SectionSeparator>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
