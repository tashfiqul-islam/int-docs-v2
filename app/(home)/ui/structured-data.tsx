type StructuredDataType = "organization" | "software" | "faq";

import logoLight from "~/assets/light/logo_light.png";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://developers.fieldnation.com";

const structuredDataMap = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Field Nation",
    url: "https://www.fieldnation.com",
    logo: `${SITE_URL}${logoLight.src}`,
    description:
      "Field service management marketplace connecting businesses with skilled technicians worldwide",
    sameAs: [
      "https://twitter.com/fieldnation",
      "https://www.linkedin.com/company/field-nation",
      "https://github.com/fieldnation",
    ],
  },
  software: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Field Nation Integration Platform",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    description:
      "Integration platform for connecting field service management tools with Field Nation marketplace",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Field Nation Integration Platform?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Field Nation Integration Platform provides REST APIs, webhooks, and pre-built connectors to integrate field service management tools with the Field Nation marketplace.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a Field Nation account to use the API?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you need an active Field Nation Buyer account and an integration contract to access the API and receive credentials.",
        },
      },
      {
        "@type": "Question",
        name: "What connectors are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Field Nation offers 14 pre-built connectors including Salesforce, ServiceNow, ConnectWise, Autotask, NetSuite, and more.",
        },
      },
    ],
  },
} as const;

export function StructuredData({ type }: { type: StructuredDataType }) {
  const data = structuredDataMap[type];

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe - static structured data for SEO
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}
