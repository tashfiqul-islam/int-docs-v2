"use client";

import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  Layers,
  Zap,
} from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: Layers,
    title: "One Source of Truth",
    description: "Eliminate data silos across your systems",
  },
  {
    icon: Zap,
    title: "Zero Manual Entry",
    description: "Automate data flow between platforms",
  },
  {
    icon: Eye,
    title: "Real-time Visibility",
    description: "Track every work order instantly",
  },
  {
    icon: Clock,
    title: "Faster Response",
    description: "Act on issues before they escalate",
  },
] as const;

export function PlatformStatement() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-fd-background">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--color-fd-primary)/0.06),transparent_70%)]" />
        {/* Animated gradient orbs */}
        <div
          className="absolute top-1/4 left-1/3 size-72 animate-pulse rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: "var(--color-fd-primary)" }}
        />
        <div
          className="absolute right-1/4 bottom-1/3 size-64 animate-pulse rounded-full opacity-15 blur-3xl"
          style={{
            backgroundColor: "var(--color-fd-primary)",
            animationDelay: "1s",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[var(--fd-layout-width)] px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Value proposition */}
          <div>
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-medium text-xs"
              style={{
                borderColor: "hsl(var(--color-fd-primary) / 0.3)",
                backgroundColor: "hsl(var(--color-fd-primary) / 0.1)",
                color: "var(--color-fd-primary)",
              }}
            >
              <CheckCircle2 className="size-3" />
              Why Integrate
            </div>

            <h2 className="mb-6 font-bold text-3xl text-fd-foreground leading-tight tracking-tight md:text-4xl lg:text-5xl">
              Stop managing work in{" "}
              <span className="relative">
                <span
                  className="relative z-10"
                  style={{ color: "var(--color-fd-primary)" }}
                >
                  multiple systems
                </span>
                <span
                  className="absolute bottom-1 left-0 -z-10 h-3 w-full opacity-25"
                  style={{ backgroundColor: "var(--color-fd-primary)" }}
                />
              </span>
            </h2>

            <p className="mb-8 max-w-lg text-fd-muted-foreground text-lg leading-relaxed">
              When your field service tools talk to each other, everyone
              wins—fewer errors, faster turnaround, and complete visibility into
              every job.
            </p>

            {/* Benefits grid */}
            <div className="mb-8 grid grid-cols-2 gap-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    className="group flex items-start gap-3 rounded-xl border border-fd-border/50 bg-fd-card/50 p-4 transition-all duration-300 hover:border-fd-primary/30 hover:bg-fd-card"
                    key={benefit.title}
                  >
                    <div
                      className="mt-0.5 rounded-lg p-2 transition-colors group-hover:bg-fd-primary/15"
                      style={{
                        backgroundColor: "hsl(var(--color-fd-primary) / 0.1)",
                      }}
                    >
                      <Icon
                        className="size-4"
                        style={{ color: "var(--color-fd-primary)" }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-fd-foreground text-sm">
                        {benefit.title}
                      </h3>
                      <p className="text-fd-muted-foreground text-xs leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              className="group inline-flex items-center gap-2 font-medium text-sm transition-colors"
              href="/docs/getting-started/introduction"
              style={{ color: "var(--color-fd-primary)" }}
            >
              Start integrating today
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right: Customer story card */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-fd-primary/10 via-transparent to-fd-primary/5 opacity-50 blur-xl" />

            <div className="relative overflow-hidden rounded-2xl border border-fd-border bg-fd-card shadow-xl">
              {/* Card header with gradient */}
              <div
                className="px-6 py-4"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--color-fd-primary) / 0.08), transparent)",
                }}
              >
                <p
                  className="font-semibold text-xs uppercase tracking-wider"
                  style={{ color: "var(--color-fd-primary)" }}
                >
                  Success Story
                </p>
              </div>

              <div className="p-6 pt-0">
                {/* Quote */}
                <blockquote
                  className="mb-6 border-l-2 pl-4 text-fd-foreground text-lg italic leading-relaxed"
                  style={{ borderColor: "var(--color-fd-primary)" }}
                >
                  "Pivital leverages Field Nation’s Salesforce integration to
                  improve service efficiency and transparency."
                </blockquote>

                {/* Company info */}
                <div className="mb-6 flex items-center gap-4">
                  <div
                    className="flex size-12 items-center justify-center rounded-xl font-bold text-lg"
                    style={{
                      backgroundColor: "hsl(var(--color-fd-primary) / 0.1)",
                      color: "var(--color-fd-primary)",
                    }}
                  >
                    P
                  </div>
                  <div>
                    <h4 className="font-semibold text-fd-foreground">
                      PIVITAL
                    </h4>
                    <p className="text-fd-muted-foreground text-sm">
                      Field Service Provider
                    </p>
                  </div>
                </div>

                {/* Results */}
                <div className="mb-6 grid grid-cols-2 gap-4 rounded-xl bg-fd-muted/30 p-4">
                  <div className="text-center">
                    <p
                      className="font-bold text-2xl"
                      style={{ color: "var(--color-fd-primary)" }}
                    >
                      40%
                    </p>
                    <p className="text-fd-muted-foreground text-xs">
                      Less manual work
                    </p>
                  </div>
                  <div className="text-center">
                    <p
                      className="font-bold text-2xl"
                      style={{ color: "var(--color-fd-primary)" }}
                    >
                      2x
                    </p>
                    <p className="text-fd-muted-foreground text-xs">
                      Faster turnaround
                    </p>
                  </div>
                </div>

                <Link
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-lg py-3 font-medium text-sm transition-all hover:scale-[1.02]"
                  href="https://fieldnation.com/resources/pivital-leverages-salesforce-integration?cta=integrations"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: "hsl(var(--color-fd-primary) / 0.1)",
                    color: "var(--color-fd-primary)",
                  }}
                  target="_blank"
                >
                  Read the full story
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
