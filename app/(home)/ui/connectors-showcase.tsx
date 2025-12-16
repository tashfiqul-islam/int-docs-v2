"use client";

import Image from "next/image";
import Link from "next/link";

import autotask from "~/assets/connectors/autotask.svg";
import connectwise from "~/assets/connectors/connectwise.svg";
import freshdesk from "~/assets/connectors/freshdesk.svg";
import ifs from "~/assets/connectors/ifs.svg";
import netsuite from "~/assets/connectors/netsuite.svg";
import quickbase from "~/assets/connectors/quickbase.svg";
import salesforce from "~/assets/connectors/salesforce.svg";
import serviceNow from "~/assets/connectors/service-now.svg";
import smartsheet from "~/assets/connectors/smartsheet.svg";

const connectors = [
  { name: "Salesforce", logo: salesforce },
  { name: "ServiceNow", logo: serviceNow },
  { name: "ConnectWise", logo: connectwise },
  { name: "Autotask", logo: autotask },
  { name: "Freshdesk", logo: freshdesk },
  { name: "IFS", logo: ifs },
  { name: "NetSuite", logo: netsuite },
  { name: "Quickbase", logo: quickbase },
  { name: "Smartsheet", logo: smartsheet },
] as const;

export function ConnectorsShowcase() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center bg-fd-card/30">
      {/* Top gradient line */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-fd-border/50 to-transparent"
      />

      <div className="mx-auto w-full max-w-[var(--fd-layout-width)] px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24">
        {/* Section header */}
        <div className="mb-12 text-center lg:mb-16">
          <h2 className="mb-4 font-bold text-3xl text-fd-foreground tracking-tight md:text-4xl lg:text-5xl">
            Connect to What You're Already Using
          </h2>
          <p className="mx-auto max-w-3xl text-fd-muted-foreground text-lg leading-relaxed md:text-xl">
            Maintain one source of truth by seamlessly integrating Field Nation
            into your existing field service management solution. All in one
            system.
          </p>
        </div>

        {/* Connectors grid */}
        <div className="mb-12 grid grid-cols-3 gap-4 sm:grid-cols-5 md:gap-6 lg:grid-cols-9 lg:gap-4">
          {connectors.map((connector) => (
            <div
              className="group flex aspect-square items-center justify-center rounded-xl border border-fd-border/50 bg-fd-card p-4 transition-all duration-300 hover:border-fd-primary/30 hover:shadow-fd-primary/5 hover:shadow-lg"
              key={connector.name}
              title={connector.name}
            >
              <Image
                alt={`${connector.name} logo`}
                className="size-10 object-contain opacity-70 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 md:size-12 dark:opacity-60 dark:brightness-0 dark:invert dark:group-hover:opacity-90"
                height={48}
                src={connector.logo}
                width={48}
              />
            </div>
          ))}
        </div>

        {/* "More connectors" message */}
        <div className="text-center">
          <p className="mb-6 text-fd-muted-foreground">
            <span className="font-medium text-fd-foreground">
              Don't see your integration?
            </span>{" "}
            Tell us what platform you use and we'll help connect it to Field
            Nation.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-fd-primary-foreground text-sm transition-all hover:scale-[1.02] hover:shadow-lg"
              href="/docs/connectors/introduction"
              style={{
                backgroundColor: "var(--color-fd-primary)",
                boxShadow: "0 4px 16px -2px hsl(var(--color-fd-primary)/0.3)",
              }}
            >
              View All Connectors
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-6 py-3 font-medium text-fd-foreground text-sm transition-all hover:border-fd-primary/30 hover:bg-fd-accent/50"
              href="https://fieldnation.com/integrations-new?integration_systems=Other#section-10"
              rel="noopener noreferrer"
              target="_blank"
            >
              Request Integration
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
