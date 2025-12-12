"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Browser } from "~/components/ui/browser";
import { Button } from "~/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-fd-background py-16 md:py-18 lg:py-20">
      {/* Animated gradient background - improved for dark mode */}
      <div className="-z-10 absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--color-fd-primary)/0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_50%,hsl(var(--color-fd-primary)/0.12),transparent_60%)]" />
        <div
          className="absolute top-1/4 left-1/4 size-96 animate-pulse rounded-full opacity-[0.12] blur-3xl dark:opacity-[0.15]"
          style={{
            backgroundColor: "var(--color-fd-primary)",
          }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 size-96 animate-pulse rounded-full opacity-[0.12] blur-3xl dark:opacity-[0.15]"
          style={{
            backgroundColor: "var(--color-fd-primary)",
            animationDelay: "1s",
          }}
        />
      </div>

      {/* Grid pattern overlay - improved for dark mode */}
      <div className="-z-10 mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--color-border)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--color-border)/0.08)_1px,transparent_1px)] bg-size-[24px_24px] dark:bg-[linear-gradient(to_right,hsl(var(--color-border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--color-border)/0.15)_1px,transparent_1px)]" />

      <div className="relative flex w-full items-center justify-center px-4 md:px-6 lg:px-6">
        <div className="mx-auto grid w-full max-w-[1320px] gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left side - Content */}
          <div className="flex flex-col gap-6 text-left lg:pr-6">
            {/* Badge */}
            <div
              className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 font-medium text-sm backdrop-blur-sm transition-colors"
              style={{
                borderColor: "hsl(var(--color-fd-primary) / 0.25)",
                backgroundColor: "hsl(var(--color-fd-primary) / 0.08)",
                color: "var(--color-fd-primary)",
              }}
            >
              <span>Integration Developer Portal</span>
            </div>

            {/* Main heading */}
            <h1 className="text-balance font-bold text-4xl text-fd-foreground leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Build Powerful Integrations with{" "}
              <span className="relative inline-block">
                <span
                  className="relative z-10 bg-clip-text text-transparent"
                  style={{
                    color: "var(--color-fd-primary)",
                  }}
                >
                  Field Nation
                </span>
                <span
                  className="absolute inset-0 z-0 opacity-30 blur-xl dark:opacity-40"
                  style={{
                    backgroundColor: "var(--color-fd-primary)",
                  }}
                />
              </span>
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl text-balance text-fd-muted-foreground text-lg leading-relaxed sm:text-xl dark:text-fd-muted-foreground/90">
              Connect your field service management tools, ERP systems, and
              platforms seamlessly. Choose from pre-built connectors or build
              custom integrations with our REST API and Webhooks.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <Button
                asChild
                className="group h-12 gap-2 rounded-lg px-8 font-semibold text-base shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                size="lg"
                style={{
                  backgroundColor: "var(--color-fd-primary)",
                  color: "var(--color-fd-primary-foreground)",
                  boxShadow:
                    "0 10px 25px -5px hsl(var(--color-fd-primary)/0.25)",
                }}
              >
                <Link href="/docs/getting-started/introduction">
                  View Documentation
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 gap-2 rounded-lg border-2 px-8 font-semibold text-base backdrop-blur-sm transition-all duration-300 hover:border-fd-primary/30 dark:hover:border-fd-primary/40"
                size="lg"
                style={{
                  borderColor: "hsl(var(--color-border) / 0.5)",
                  backgroundColor: "hsl(var(--color-fd-card) / 0.6)",
                  color: "var(--color-fd-foreground)",
                }}
                variant="outline"
              >
                <Link href="/docs/getting-started/introduction">
                  Get Started
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-8 text-fd-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <div
                  className="size-2 animate-pulse rounded-full"
                  style={{
                    backgroundColor: "var(--color-fd-primary)",
                  }}
                />
                <span>14 Pre-built Connectors</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="size-2 animate-pulse rounded-full"
                  style={{
                    backgroundColor: "var(--color-fd-primary)",
                    animationDelay: "0.3s",
                  }}
                />
                <span>Sandbox Environment</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="size-2 animate-pulse rounded-full"
                  style={{
                    backgroundColor: "var(--color-fd-primary)",
                    animationDelay: "0.7s",
                  }}
                />
                <span>Comprehensive API</span>
              </div>
            </div>
          </div>

          {/* Right side - Browser Preview */}
          <div className="flex h-full items-center justify-center lg:justify-end lg:pl-6">
            <Browser
              className="h-full max-h-[520px] w-full max-w-4xl"
              enableBookmarks={false}
              enableDownloads={false}
              enableHistory={false}
              enableSettings={false}
              enableTabManagement={false}
              showBookmarksBar={false}
              showStatusBar={false}
              showWindowControls={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
