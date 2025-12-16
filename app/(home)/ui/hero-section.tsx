"use client";

import { ArrowRight, BookOpen, Code2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import homeDark from "~/assets/home_dark.png";
import homeLight from "~/assets/home_light.png";
import { Button } from "~/components/ui/button";

export function HeroSection() {
  return (
    <section className="overflow-hidden border-fd-border/50 border-b bg-fd-background py-20 pb-32 sm:py-32 lg:pb-32 xl:pb-36">
      <div className="container relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--color-fd-primary)/0.12),transparent_50%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--color-fd-primary)/0.18),transparent_50%)]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--color-fd-border)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--color-fd-border)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative mx-auto w-full max-w-[var(--fd-layout-width)] px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 flex animate-fade-in justify-center lg:justify-start">
              <Link
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-medium text-sm backdrop-blur-sm transition-all hover:bg-fd-accent/50"
                href="/blog/introducing-developer-platform"
                style={{
                  borderColor: "hsl(var(--color-fd-primary) / 0.3)",
                  backgroundColor: "hsl(var(--color-fd-primary) / 0.08)",
                  color: "var(--color-fd-primary)",
                }}
              >
                <span className="text-base">✨</span>
                <span>Refreshed Developer Portal</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* Main heading */}
            <h1 className="mb-6 animate-fade-in-up-1 text-balance font-bold text-4xl text-fd-foreground leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
              <span className="relative inline-block">
                <span
                  className="relative z-10"
                  style={{ color: "var(--color-fd-primary)" }}
                >
                  Field Nation
                </span>
                {/* Underline SVG decoration */}
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -bottom-1 h-3 w-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 12"
                >
                  <path
                    className="text-fd-primary/40"
                    d="M2 8C20 3, 40 2, 60 3C75 4, 85 6, 98 8"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
              </span>{" "}
              DX
            </h1>

            {/* Subheading */}
            <p className="mx-auto mb-8 max-w-xl animate-fade-in-up-2 text-balance text-fd-muted-foreground text-lg leading-relaxed lg:mx-0 lg:text-xl">
              Build powerful integrations with our REST API, webhooks, and
              pre-built connectors. Automate work order management, sync
              provider data, and scale your field service operations.
            </p>

            {/* CTA Buttons */}
            <div className="flex animate-fade-in-up-3 flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button
                asChild
                className="group h-12 gap-2 rounded-lg px-8 font-semibold text-base shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                size="lg"
                style={{
                  backgroundColor: "var(--color-fd-primary)",
                  color: "var(--color-fd-primary-foreground)",
                  boxShadow: "0 8px 24px -4px hsl(var(--color-fd-primary)/0.3)",
                }}
              >
                <Link href="/docs/getting-started/introduction">
                  <BookOpen className="size-4" />
                  View Documentation
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 gap-2 rounded-lg border-2 px-8 font-semibold text-base backdrop-blur-sm transition-all duration-300 hover:border-fd-primary/40 hover:bg-fd-accent/50"
                size="lg"
                variant="outline"
              >
                <Link href="/api-references/rest-api/v2">
                  <Code2 className="size-4" />
                  Explore API
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex animate-fade-in-delay flex-wrap items-center justify-center gap-6 text-fd-muted-foreground text-sm lg:justify-start lg:gap-8">
              <div className="flex items-center gap-2">
                <div
                  className="size-2 animate-pulse rounded-full"
                  style={{ backgroundColor: "var(--color-fd-primary)" }}
                />
                <span className="font-medium">200+ API Endpoints</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="size-2 animate-pulse rounded-full"
                  style={{
                    backgroundColor: "var(--color-fd-primary)",
                    animationDelay: "0.3s",
                  }}
                />
                <span className="font-medium">14 Pre-built Connectors</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="size-2 animate-pulse rounded-full"
                  style={{
                    backgroundColor: "var(--color-fd-primary)",
                    animationDelay: "0.6s",
                  }}
                />
                <span className="font-medium">Real-time Webhooks</span>
              </div>
            </div>
          </div>

          {/* Right: Visual - 3D Perspective Floating Effect */}
          <div
            className="relative hidden animate-slide-in-right lg:block"
            style={{ perspective: "1500px" }}
          >
            {/* Glass surface behind - STATIC, no hover effect */}
            {/* Creates 3D depth - starts 16px from left edge, extends 20px past right edge */}
            <div
              className="absolute rounded-2xl border border-fd-border/50 bg-fd-muted dark:bg-fd-accent/40"
              style={{
                top: "24px",
                left: "16px",
                right: "-20px",
                bottom: "-16px",
                borderRadius: "1.25rem",
                boxShadow: `
                  0 50px 100px -25px rgba(0,0,0,0.3)
                `,
                transform: "rotateY(-8deg) rotateX(4deg) translateZ(-30px)",
                transformStyle: "preserve-3d",
              }}
            />

            {/* Screenshot container - HAS hover effect */}
            <div
              className="relative transition-transform duration-500 hover:scale-[1.02]"
              style={{
                transform: "rotateY(-8deg) rotateX(4deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Soft ambient shadow underneath */}
              <div
                className="absolute inset-0 translate-y-8 rounded-3xl opacity-40 blur-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, hsl(var(--color-fd-primary)/0.4), transparent 70%)",
                  transform: "translateZ(-50px)",
                }}
              />

              {/* Main image container */}
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.1),
                    0 25px 50px -12px rgba(0,0,0,0.4),
                    0 12px 24px -8px rgba(0,0,0,0.3),
                    inset 0 1px 0 rgba(255,255,255,0.1)
                  `,
                }}
              >
                {/* Screenshot images */}
                <div className="relative">
                  {/* Light mode image */}
                  <Image
                    alt="Field Nation Developer Portal"
                    className="block h-auto w-full dark:hidden"
                    height={600}
                    priority
                    src={homeLight}
                    width={900}
                  />
                  {/* Dark mode image */}
                  <Image
                    alt="Field Nation Developer Portal"
                    className="hidden h-auto w-full dark:block"
                    height={600}
                    priority
                    src={homeDark}
                    width={900}
                  />
                </div>
              </div>

              {/* Subtle reflection/glow on top edge */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
