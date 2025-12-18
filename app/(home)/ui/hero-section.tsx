"use client";

import { ArrowRight, BookOpen, Code2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import fujitsu from "~/assets/companies/fujitsu.svg";
import pomeroy from "~/assets/companies/pomeroy.svg";
import pomeroyLight from "~/assets/companies/pomeroy-light.svg";
import worldlink from "~/assets/companies/worldlink.svg";
import xtium from "~/assets/companies/xtium.svg";
import xtiumDark from "~/assets/companies/xtium-dark.svg";
import homeDark from "~/assets/home_dark.png";
import homeLight from "~/assets/home_light.png";
import { Button } from "~/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden border-fd-border/50 border-b bg-fd-background py-12 md:py-16 xl:h-[calc(100vh-4rem)] xl:min-h-[calc(100vh-4rem)] xl:py-0">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--color-fd-primary)/0.12),transparent_50%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--color-fd-primary)/0.18),transparent_50%)]" />

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--color-fd-border)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--color-fd-border)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Main content - this is the only flex child */}
      <div className="relative z-10 mx-auto flex w-full max-w-[var(--fd-layout-width)] flex-col items-center justify-center px-4 md:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[45%_55%] lg:gap-16">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 flex animate-fade-in justify-center lg:justify-start">
              <Link
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-medium text-sm backdrop-blur-sm transition-all hover:bg-fd-accent/50"
                href="https://fieldnation.com/resource-library?s=&fldn_content_type=6&fldn_content_category=&fldn_work_type="
                rel="noopener noreferrer"
                style={{
                  borderColor: "hsl(var(--color-fd-primary) / 0.3)",
                  backgroundColor: "hsl(var(--color-fd-primary) / 0.08)",
                  color: "var(--color-fd-primary)",
                }}
                target="_blank"
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
          </div>

          {/* Right: Visual - 3D Perspective Floating Effect */}
          <div
            className="relative hidden animate-slide-in-right lg:block lg:-translate-x-16"
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
                    width={1000}
                  />
                  {/* Dark mode image */}
                  <Image
                    alt="Field Nation Developer Portal"
                    className="hidden h-auto w-full dark:block"
                    height={600}
                    priority
                    src={homeDark}
                    width={1000}
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

        {/* Trusted By - Company Logos */}
        <div className="mt-36 animate-fade-in-delay">
          <h3 className="mb-8 text-center font-semibold text-fd-muted-foreground text-sm uppercase tracking-widest">
            Trusted by Industry Leaders
          </h3>
          <div className="flex flex-wrap items-center justify-center">
            {/* Fujitsu */}
            <div className="flex items-center px-6 lg:px-8">
              <Image
                alt="Fujitsu"
                className="h-8 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:h-10 dark:brightness-0 dark:invert hover:dark:brightness-100 hover:dark:invert-0"
                height={40}
                src={fujitsu}
                width={120}
              />
            </div>
            {/* Separator */}
            <div className="h-8 w-px bg-fd-border/50 md:h-10" />
            {/* Pomeroy - light/dark variants */}
            <div className="flex items-center px-6 lg:px-8">
              <Image
                alt="Pomeroy"
                className="h-8 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:h-10 dark:hidden"
                height={40}
                src={pomeroyLight}
                width={120}
              />
              <Image
                alt="Pomeroy"
                className="hidden h-8 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:h-10 dark:block"
                height={40}
                src={pomeroy}
                width={120}
              />
            </div>
            {/* Separator */}
            <div className="h-8 w-px bg-fd-border/50 md:h-10" />
            {/* WorldLink */}
            <div className="flex items-center px-6 lg:px-8">
              <Image
                alt="WorldLink"
                className="h-8 w-auto opacity-70 grayscale invert transition-all hover:opacity-100 hover:grayscale-0 md:h-10 dark:invert-0"
                height={40}
                src={worldlink}
                width={120}
              />
            </div>
            {/* Separator */}
            <div className="h-8 w-px bg-fd-border/50 md:h-10" />
            {/* Xtium - light/dark variants */}
            <div className="flex items-center px-6 lg:px-8">
              <Image
                alt="Xtium"
                className="h-8 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:h-10 dark:hidden"
                height={40}
                src={xtium}
                width={120}
              />
              <Image
                alt="Xtium"
                className="hidden h-8 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:h-10 dark:block"
                height={40}
                src={xtiumDark}
                width={120}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
