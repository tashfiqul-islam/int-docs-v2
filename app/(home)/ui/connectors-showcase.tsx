"use client";

import Link from "next/link";
import autotask from "~/assets/connectors/autotask.svg";
import autotaskLightBlue from "~/assets/connectors/autotask-light-blue.svg";
import connectwise from "~/assets/connectors/connectwise.svg";
import connectwiseLightBlue from "~/assets/connectors/connectwise-light-blue.svg";
import freshdesk from "~/assets/connectors/freshdesk.svg";
import freshdeskWhite from "~/assets/connectors/freshdesk-white.svg";
import netsuite from "~/assets/connectors/netsuite.svg";
import netsuiteWhite from "~/assets/connectors/netsuite-white.svg";
import quickbase from "~/assets/connectors/quickbase.svg";
import quickbaseWhite from "~/assets/connectors/quickbase-white.svg";
import rest from "~/assets/connectors/rest.svg";
import restConnectorWhite from "~/assets/connectors/rest-connector-white.svg";
import salesforce from "~/assets/connectors/salesforce.svg";
import serviceNow from "~/assets/connectors/service-now.svg";
import serviceNowWhite from "~/assets/connectors/service-now-white.svg";
import smartsheet from "~/assets/connectors/smartsheet.svg";
import smartsheetLightBlue from "~/assets/connectors/smartsheet-light-blue.svg";
import { HoverEffect } from "~/components/ui/card-hover-effect";
import { ConnectorCard } from "./connector-card";

const connectors = [
  {
    name: "Salesforce",
    logo: salesforce,
    href: "/docs/connectors/platforms/salesforce/overview",
  },
  {
    name: "ServiceNow",
    logo: serviceNow,
    logoDark: serviceNowWhite,
    href: "/docs/connectors/platforms/servicenow/overview",
  },
  {
    name: "ConnectWise",
    logo: connectwise,
    logoDark: connectwiseLightBlue,
    href: "/docs/connectors/platforms/connectwise/overview",
  },
  {
    name: "Autotask",
    logo: autotask,
    logoDark: autotaskLightBlue,
    href: "/docs/connectors/platforms/autotask/overview",
  },
  {
    name: "Freshdesk",
    logo: freshdesk,
    logoDark: freshdeskWhite,
    href: "/docs/connectors/platforms/freshdesk/overview",
  },
  {
    name: "NetSuite",
    logo: netsuite,
    logoDark: netsuiteWhite,
    href: "/docs/connectors/platforms/netsuite/overview",
  },
  {
    name: "Quickbase",
    logo: quickbase,
    logoDark: quickbaseWhite,
    href: "/docs/connectors/platforms/quickbase/overview",
  },
  {
    name: "Smartsheet",
    logo: smartsheet,
    logoDark: smartsheetLightBlue,
    href: "/docs/connectors/platforms/smartsheet/overview",
  },
  {
    name: "REST Connector",
    logo: rest,
    logoDark: restConnectorWhite,
    href: "/docs/connectors/platforms/rest-connector/overview",
  },
] as const;

export function ConnectorsShowcase() {
  return (
    <section className="relative flex min-h-[600px] items-center justify-center bg-slate-50 py-12 lg:py-24 xl:h-screen xl:min-h-0 xl:py-0 dark:bg-neutral-900/40">
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

        {/* Connectors grid - Fluid columns */}
        <div className="mx-auto mb-12 max-w-4xl">
          <HoverEffect
            className="grid-cols-2 py-0 md:grid-cols-3"
            items={[...connectors]}
            keyExtractor={(connector) => connector.name}
            renderItem={(connector, handlers) => (
              <ConnectorCard connector={connector} {...handlers} />
            )}
          />
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
