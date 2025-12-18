"use client";

import Image from "next/image";
import Link from "next/link";

import autotask from "~/assets/connectors/autotask.svg";
import connectwise from "~/assets/connectors/connectwise.svg";
import freshdesk from "~/assets/connectors/freshdesk.svg";
import netsuite from "~/assets/connectors/netsuite.svg";
import quickbase from "~/assets/connectors/quickbase.svg";
import restDark from "~/assets/connectors/rest-dark.svg";
import restLight from "~/assets/connectors/rest-light.svg";
import salesforce from "~/assets/connectors/salesforce.svg";
import serviceNow from "~/assets/connectors/service-now.svg";
import smartsheet from "~/assets/connectors/smartsheet.svg";

const connectors = [
  {
    name: "Salesforce",
    logo: salesforce,
    href: "/docs/connectors/platforms/salesforce/overview",
  },
  {
    name: "ServiceNow",
    logo: serviceNow,
    href: "/docs/connectors/platforms/servicenow/overview",
    needsDarkEnhance: true,
  },
  {
    name: "ConnectWise",
    logo: connectwise,
    href: "/docs/connectors/platforms/connectwise/overview",
    needsDarkEnhance: true,
  },
  {
    name: "Autotask",
    logo: autotask,
    href: "/docs/connectors/platforms/autotask/overview",
  },
  {
    name: "Freshdesk",
    logo: freshdesk,
    href: "/docs/connectors/platforms/freshdesk/overview",
  },
  {
    name: "NetSuite",
    logo: netsuite,
    href: "/docs/connectors/platforms/netsuite/overview",
    needsDarkEnhance: true,
  },
  {
    name: "Quickbase",
    logo: quickbase,
    href: "/docs/connectors/platforms/quickbase/overview",
    needsDarkEnhance: true,
    needsLargerSize: true,
  },
  {
    name: "Smartsheet",
    logo: smartsheet,
    href: "/docs/connectors/platforms/smartsheet/overview",
    needsDarkEnhance: true,
  },
  {
    name: "REST Connector",
    logo: restLight,
    logoDark: restDark,
    href: "/docs/connectors/platforms/rest-connector/overview",
  },
] as const;

export function ConnectorsShowcase() {
  return (
    <section className="relative flex min-h-[600px] items-center justify-center bg-fd-card/30 py-12 md:py-16 xl:h-screen xl:min-h-0 xl:py-0">
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

        {/* Connectors grid - 3 columns, 3 rows */}
        <div className="mx-auto mb-12 grid max-w-4xl grid-cols-3 gap-6 md:gap-8">
          {connectors.map((connector) => (
            <Link
              className="group relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-2xl border border-fd-border/50 bg-fd-card p-6 transition-all duration-300 hover:border-fd-primary/40 hover:shadow-fd-primary/10 hover:shadow-xl md:p-8"
              href={connector.href}
              key={connector.name}
              title={connector.name}
            >
              {"logoDark" in connector ? (
                <>
                  {/* Light mode logo */}
                  <Image
                    alt={`${connector.name} logo`}
                    className="h-12 w-auto max-w-full object-contain transition-all duration-300 group-hover:scale-110 md:h-16 lg:h-20 dark:hidden"
                    height={80}
                    src={connector.logo}
                    width={160}
                  />
                  {/* Dark mode logo */}
                  <Image
                    alt={`${connector.name} logo`}
                    className="hidden h-12 w-auto max-w-full object-contain brightness-125 contrast-125 transition-all duration-300 group-hover:scale-110 md:h-16 lg:h-20 dark:block"
                    height={80}
                    src={connector.logoDark}
                    width={160}
                  />
                </>
              ) : (
                <Image
                  alt={`${connector.name} logo`}
                  className={`h-12 w-auto max-w-full object-contain transition-all duration-300 group-hover:scale-110 md:h-16 lg:h-20 ${
                    "needsDarkEnhance" in connector &&
                    connector.needsDarkEnhance
                      ? "dark:brightness-125 dark:contrast-125"
                      : ""
                  } ${"needsLargerSize" in connector && connector.needsLargerSize ? "!h-16 md:!h-20 lg:!h-24" : ""}`}
                  height={80}
                  src={connector.logo}
                  width={160}
                />
              )}

              {/* Hover overlay - slides up from bottom */}
              <div className="absolute right-0 bottom-0 left-0 flex translate-y-full items-center justify-center bg-gradient-to-t from-fd-card via-fd-card/95 to-transparent px-4 py-3 transition-transform duration-300 ease-out group-hover:translate-y-0">
                <span
                  className="font-medium text-xs tracking-wide md:text-sm"
                  style={{ color: "var(--color-fd-primary)" }}
                >
                  View Details →
                </span>
              </div>
            </Link>
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
