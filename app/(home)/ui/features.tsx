"use client";

import { Code2, GitBranch, Puzzle, Shield, Webhook, Zap } from "lucide-react";
import Link from "next/link";

const mainFeatures = [
  {
    icon: Code2,
    title: "REST API",
    description:
      "Comprehensive RESTful API with 200+ endpoints for work orders, providers, payments, and more.",
    href: "/api-references/rest-api/v2",
    badge: "v2",
  },
  {
    icon: Webhook,
    title: "Real-time Webhooks",
    description:
      "Event-driven updates for work order status changes, assignments, completions, and custom events.",
    href: "/docs/webhooks/introduction",
    badge: "30+ Events",
  },
] as const;

const secondaryFeatures = [
  {
    icon: Puzzle,
    title: "Pre-built Connectors",
    description:
      "14 ready-to-use connectors for Salesforce, ServiceNow, and more.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "OAuth 2.0, HMAC signatures, and encryption at rest.",
  },
  {
    icon: GitBranch,
    title: "Sandbox Environment",
    description: "Test your integrations safely before going live.",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "99.9% uptime SLA with global edge network.",
  },
] as const;

export function Features() {
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
          <p
            className="mb-3 font-medium text-sm uppercase tracking-wider"
            style={{ color: "var(--color-fd-primary)" }}
          >
            Developer Tools
          </p>
          <h2 className="mb-4 font-bold text-3xl text-fd-foreground tracking-tight md:text-4xl lg:text-5xl">
            Using Another Software for Field Services?
          </h2>
          <p className="mx-auto max-w-3xl text-fd-muted-foreground text-lg leading-relaxed md:text-xl">
            Field Nation provides a sandbox environment for building and
            testing, plus access to REST-based APIs and Webhooks to perform
            calls and retrieve data from our platform.
          </p>
        </div>

        {/* Main features - Large cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:gap-8">
          {mainFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                className="group relative overflow-hidden rounded-2xl border border-fd-border bg-fd-card p-6 transition-all duration-300 hover:border-fd-primary/30 hover:shadow-fd-primary/5 hover:shadow-lg lg:p-8"
                href={feature.href}
                key={feature.title}
              >
                {/* Background decoration */}
                <div
                  className="absolute -top-12 -right-12 size-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, hsl(var(--color-fd-primary)/0.15), transparent 70%)",
                  }}
                />

                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className="inline-flex rounded-xl p-3 transition-colors group-hover:bg-fd-primary/15"
                      style={{
                        backgroundColor: "hsl(var(--color-fd-primary) / 0.1)",
                      }}
                    >
                      <Icon
                        className="size-6 transition-transform group-hover:scale-110"
                        style={{ color: "var(--color-fd-primary)" }}
                      />
                    </div>
                    <span
                      className="rounded-full px-3 py-1 font-mono text-xs"
                      style={{
                        backgroundColor: "hsl(var(--color-fd-primary) / 0.1)",
                        color: "var(--color-fd-primary)",
                      }}
                    >
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="mb-2 font-semibold text-fd-foreground text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-base text-fd-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Secondary features - Dashed border grid */}
        <div className="relative rounded-xl border border-fd-border/60 border-dashed">
          <div className="grid grid-cols-1 divide-y divide-dashed divide-fd-border/60 sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
            {secondaryFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  className="group p-6 transition-colors hover:bg-fd-accent/30"
                  key={feature.title}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <Icon
                      className="size-5"
                      style={{ color: "var(--color-fd-primary)" }}
                    />
                    <h3 className="font-medium text-fd-foreground text-sm">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-fd-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
