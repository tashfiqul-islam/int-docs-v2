"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Fragment, useEffect, useState } from "react";
import ccpaLogo from "~/assets/compliance/ccpa.svg";
import pciLogo from "~/assets/compliance/pci.svg";
import soc2Logo from "~/assets/compliance/soc2.svg";
import appWindow from "~/assets/socials/app-window.svg";
import linkedInLogo from "~/assets/socials/brand-linkedin.svg";
import xLogo from "~/assets/socials/brand-x.svg";
import { ConnectedThemeSwitcher } from "~/components/ui/connected-theme-switcher";
import { FooterWatermark } from "./footer-watermark";

type FooterLink = {
  text: string;
  href: string;
  external?: boolean;
};

// Consolidated and expanded link structure
const footerLinks: Record<string, FooterLink[]> = {
  developers: [
    { text: "REST API", href: "/api-references/rest-api/v2" },
    { text: "Webhooks", href: "/docs/webhooks/v3/introduction" },
    { text: "FSM Connectors", href: "/docs/connectors/introduction" },
  ],
  support: [
    {
      text: "Help Center",
      href: "https://support.fieldnation.com",
      external: true,
    },
    {
      text: "Submit a Case",
      href: "https://app.fieldnation.com/support-cases",
      external: true,
    },
  ],
  company: [
    {
      text: "About",
      href: "https://www.fieldnation.com/about",
      external: true,
    },
    {
      text: "Integrations",
      href: "https://fieldnation.com/field-nation-integrations",
      external: true,
    },
    {
      text: "Product Updates",
      href: "https://fieldnation.com/whats-new/buyers",
      external: true,
    },
    {
      text: "Resources",
      href: "https://www.fieldnation.com/resource-library",
      external: true,
    },
  ],
};

// Legal links - displayed inline in footer bar
const legalLinks = [
  {
    text: "Privacy",
    href: "https://www.fieldnation.com/privacy",
    external: true,
  },
  { text: "Terms", href: "https://app.fieldnation.com/legal", external: true },
  { text: "Trust", href: "https://trust.fieldnation.com/", external: true },
];

const socialLinks = [
  { src: appWindow, href: "https://fieldnation.com", label: "Website" },
  {
    src: linkedInLogo,
    href: "https://www.linkedin.com/company/field-nation",
    label: "LinkedIn",
  },
  { src: xLogo, href: "https://x.com/FieldNation", label: "Twitter" },
] as const;

const complianceLogos = [
  { src: ccpaLogo, alt: "CCPA", name: "ccpa", className: "h-11" },
  { src: pciLogo, alt: "PCI DSS", name: "pci", className: "h-11" },
  { src: soc2Logo, alt: "SOC 2", name: "soc2", className: "h-13" },
] as const;

export function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted ? resolvedTheme === "dark" : true; // Default to dark aesthetic before mount

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className="relative">
      {/* Watermark Section */}
      <FooterWatermark />

      {/* Main Footer Content */}
      <footer
        className="relative z-20 border-fd-border/40 border-t bg-fd-card/50"
        style={{ marginTop: "-1px" }}
      >
        {/* Spotlight line on top edge */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 left-0 h-px"
          style={{
            background: isDark
              ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
              : "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)",
          }}
        />

        {/* Subtle top glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-32 w-1/2 -translate-x-1/2 opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(50% 100% at 50% 0%, hsl(var(--color-fd-primary) / 0.3) 0%, transparent 100%)",
          }}
        />

        {/* ===== UPPER SECTION: Content ===== */}
        <div className="mx-auto max-w-(--fd-layout-width) px-6 pt-10 pb-8 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Brand Column - Compact */}
            <div className="lg:col-span-3">
              <Link className="mb-4 inline-block" href="/">
                <h3 className="font-bold text-fd-foreground text-xl tracking-tight">
                  Field Nation{" "}
                  <span style={{ color: "var(--color-fd-primary)" }}>DX</span>
                </h3>
              </Link>
              <p className="mb-5 text-fd-muted-foreground text-sm leading-relaxed">
                Build powerful integrations with the leading field service
                marketplace. Access REST APIs, webhooks, and connectors to
                streamline your workflows.
              </p>

              {/* Status Badge */}
              <Link
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-medium text-xs transition-all hover:scale-[1.02]"
                href="https://status.fieldnation.com"
                rel="noopener noreferrer"
                style={{
                  borderColor: "hsl(var(--color-fd-primary) / 0.3)",
                  backgroundColor: "hsl(var(--color-fd-primary) / 0.08)",
                  color: "var(--color-fd-primary)",
                }}
                target="_blank"
              >
                <span
                  className="size-1.5 animate-pulse rounded-full"
                  style={{ backgroundColor: "var(--color-fd-primary)" }}
                />
                Platform Status
              </Link>

              {/* Social Links */}
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Link
                    aria-label={social.label}
                    className="group flex size-10 items-center justify-center rounded-lg bg-fd-muted/50 transition-all hover:scale-105 hover:bg-fd-primary/10"
                    href={social.href}
                    key={social.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div
                      className="size-5 bg-fd-muted-foreground transition-colors group-hover:bg-fd-primary"
                      style={{
                        maskImage: `url(${typeof social.src === "string" ? social.src : social.src.src})`,
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskImage: `url(${typeof social.src === "string" ? social.src : social.src.src})`,
                        WebkitMaskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                      }}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Links Columns - 2 columns */}
            <div className="grid grid-cols-2 gap-10 lg:col-span-5 lg:gap-12">
              {/* Developers + Support */}
              <div>
                <h4 className="mb-4 font-semibold text-fd-foreground text-xs uppercase tracking-wider">
                  Developers
                </h4>
                <ul className="space-y-2.5">
                  {footerLinks.developers.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="text-fd-muted-foreground text-sm transition-colors hover:text-fd-foreground"
                        href={link.href}
                        {...(link.external && {
                          rel: "noopener noreferrer",
                          target: "_blank",
                        })}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Support sub-section */}
                <h4 className="mt-6 mb-4 font-semibold text-fd-foreground text-xs uppercase tracking-wider">
                  Support
                </h4>
                <ul className="space-y-2.5">
                  {footerLinks.support.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="text-fd-muted-foreground text-sm transition-colors hover:text-fd-foreground"
                        href={link.href}
                        {...(link.external && {
                          rel: "noopener noreferrer",
                          target: "_blank",
                        })}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="mb-4 font-semibold text-fd-foreground text-xs uppercase tracking-wider">
                  Company
                </h4>
                <ul className="space-y-2.5">
                  {footerLinks.company.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="text-fd-muted-foreground text-sm transition-colors hover:text-fd-foreground"
                        href={link.href}
                        {...(link.external && {
                          rel: "noopener noreferrer",
                          target: "_blank",
                        })}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Column - Contact Sales + Compliance */}
            <div className="lg:col-span-4">
              <div className="rounded-xl border border-fd-border bg-linear-to-br from-fd-muted/50 to-fd-muted/20 p-5 dark:border-fd-border/50 dark:from-fd-background dark:to-fd-muted/30">
                <h4 className="mb-2 font-semibold text-fd-foreground text-sm">
                  Want to learn more?
                </h4>
                <p className="mb-4 text-fd-muted-foreground text-xs leading-relaxed">
                  Connect with our team to discuss your integration needs.
                </p>
                <Link
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium text-sm text-white transition-all hover:scale-[1.02] hover:opacity-90"
                  href="https://fieldnation.com/field-nation-integrations?integration_systems=Other#section-10"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "#bc5409" }}
                  target="_blank"
                >
                  Contact Sales
                  <svg
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <title>Arrow right</title>
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>

              {/* Compliance Logos - Under CTA */}
              <Link
                className="mt-4 flex items-center justify-center gap-5 rounded-lg border border-fd-border bg-fd-muted/40 px-4 py-3 transition-all hover:bg-fd-muted/60 dark:border-fd-border/30 dark:bg-fd-muted/20 dark:hover:bg-fd-muted/40"
                href="https://trust.fieldnation.com/"
                rel="noopener noreferrer"
                target="_blank"
                title="View our security certifications"
              >
                {complianceLogos.map((logo, index) => (
                  <Fragment key={logo.name}>
                    <Image
                      alt={logo.alt}
                      className={`${logo.className} w-auto object-contain`}
                      height={48}
                      src={logo.src}
                      width={96}
                    />
                    {index < complianceLogos.length - 1 && (
                      <div className="h-6 w-px bg-fd-border/40" />
                    )}
                  </Fragment>
                ))}
              </Link>
            </div>
          </div>
        </div>

        {/* ===== LOWER SECTION: Legal Bar ===== */}
        <div className="mx-auto max-w-(--fd-layout-width) px-6 lg:px-8">
          <div className="border-fd-border/60 border-t py-4">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              {/* Left: Copyright + Legal Links */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-fd-muted-foreground text-xs">
                <span>© {currentYear} Field Nation</span>
                <span className="hidden text-fd-border sm:inline">·</span>
                {legalLinks.map((link, index) => (
                  <Fragment key={link.href}>
                    <Link
                      className="transition-colors hover:text-fd-foreground"
                      href={link.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {link.text}
                    </Link>
                    {index < legalLinks.length - 1 && (
                      <span className="hidden text-fd-border sm:inline">·</span>
                    )}
                  </Fragment>
                ))}
              </div>

              {/* Right: Theme + Attribution */}
              <div className="flex items-center gap-4">
                {/* Theme Switcher */}
                <ConnectedThemeSwitcher />

                <span className="text-fd-border">·</span>

                {/* Attribution */}
                <p className="text-fd-muted-foreground text-xs">
                  Built with{" "}
                  <Link
                    className="font-medium transition-colors hover:text-fd-foreground"
                    href="https://fumadocs.vercel.app"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-fd-primary)" }}
                    target="_blank"
                  >
                    Fumadocs
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
