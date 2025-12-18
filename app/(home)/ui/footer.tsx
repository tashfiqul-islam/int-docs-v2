"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import ccpaLogo from "~/assets/compliance/ccpa.svg";
import pciLogo from "~/assets/compliance/pci.svg";
import soc2Logo from "~/assets/compliance/soc2.svg";
import appWindow from "~/assets/socials/app-window.svg";
import linkedInLogo from "~/assets/socials/brand-linkedin.svg";
import xLogo from "~/assets/socials/brand-x.svg";
import { FooterWatermark } from "./footer-watermark";

type FooterLink = {
  text: string;
  href: string;
  external?: boolean;
};

const footerLinks: Record<string, FooterLink[]> = {
  resources: [
    { text: "Client API", href: "/api-references/rest-api/v2" },
    { text: "Webhooks", href: "/docs/webhooks/introduction" },
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
    {
      text: "Get Started",
      href: "https://fieldnation.com/get-started?cta=main_nav_get_started",
      external: true,
    },
  ],
  company: [
    {
      text: "About Field Nation",
      href: "https://www.fieldnation.com/about",
      external: true,
    },
    {
      text: "Field Nation Integrations",
      href: "https://fieldnation.com/field-nation-integrations",
      external: true,
    },
    {
      text: "Product Updates",
      href: "https://fieldnation.com/whats-new/buyers",
      external: true,
    },
    {
      text: "Resource Library",
      href: "https://www.fieldnation.com/resource-library",
      external: true,
    },
  ],
  policies: [
    {
      text: "Legal",
      href: "https://app.fieldnation.com/legal",
      external: true,
    },
    {
      text: "Privacy Policy",
      href: "https://www.fieldnation.com/privacy",
      external: true,
    },
    {
      text: "Trust Center",
      href: "https://trust.fieldnation.com/",
      external: true,
    },
  ],
};

const socialLinks = [
  {
    src: appWindow,
    href: "https://fieldnation.com",
    label: "Field Nation Website",
  },
  {
    src: linkedInLogo,
    href: "https://www.linkedin.com/company/field-nation",
    label: "LinkedIn",
  },
  {
    src: xLogo,
    href: "https://x.com/FieldNation",
    label: "Twitter",
  },
] as const;

const complianceLogos = [
  {
    src: soc2Logo,
    alt: "SOC 2 Certified",
    name: "soc2",
    className: "p-0 h-18",
  },
  { src: pciLogo, alt: "PCI Compliant", name: "pci", className: "p-0 h-12" },
  { src: ccpaLogo, alt: "CCPA Compliant", name: "ccpa", className: "p-0 h-14" },
] as const;

export function Footer() {
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
        {/* Top gradient line */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-fd-border/50 to-transparent"
        />

        <div className="mx-auto max-w-[var(--fd-layout-width)] px-4 py-4 md:px-6 lg:px-8 lg:py-6">
          <div className="grid gap-8 md:grid-cols-2 lg:flex lg:justify-between lg:gap-0">
            {/* Brand */}
            <div>
              <Link className="mb-4 inline-block" href="/">
                <h3
                  className="font-bold text-xl"
                  style={{ color: "var(--color-fd-primary)" }}
                >
                  Field Nation DX
                </h3>
              </Link>
              <p className="mb-6 max-w-xs text-balance text-fd-muted-foreground text-sm leading-relaxed">
                Build powerful integrations with the leading field service
                marketplace platform.
              </p>

              {/* Status Badge */}
              <Link
                className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors hover:bg-fd-accent"
                href="https://status.fieldnation.com"
                rel="noopener noreferrer"
                style={{
                  borderColor: "hsl(var(--color-fd-primary) / 0.3)",
                  backgroundColor: "hsl(var(--color-fd-primary) / 0.1)",
                  color: "var(--color-fd-primary)",
                }}
                target="_blank"
              >
                <span
                  className="size-2 animate-pulse rounded-full"
                  style={{ backgroundColor: "var(--color-fd-primary)" }}
                />
                Check Platform Status
              </Link>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <Link
                    aria-label={social.label}
                    className="group transition-transform hover:scale-110"
                    href={social.href}
                    key={social.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div
                      className="size-5 bg-fd-muted-foreground transition-colors duration-300 group-hover:bg-fd-primary"
                      style={{
                        maskImage: `url(${
                          typeof social.src === "string"
                            ? social.src
                            : social.src.src
                        })`,
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskImage: `url(${
                          typeof social.src === "string"
                            ? social.src
                            : social.src.src
                        })`,
                        WebkitMaskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                      }}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="mb-4 font-semibold text-fd-foreground text-sm">
                Resources
              </h4>
              <ul className="space-y-3 text-fd-muted-foreground text-sm">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="inline-flex transition-colors hover:text-fd-primary"
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

            {/* Support */}
            <div>
              <h4 className="mb-4 font-semibold text-fd-foreground text-sm">
                Support
              </h4>
              <ul className="space-y-3 text-fd-muted-foreground text-sm">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="inline-flex transition-colors hover:text-fd-primary"
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
              <h4 className="mb-4 font-semibold text-fd-foreground text-sm">
                Company
              </h4>
              <ul className="space-y-3 text-fd-muted-foreground text-sm">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="inline-flex transition-colors hover:text-fd-primary"
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

            {/* Policies (formerly Legal) */}
            <div>
              <h4 className="mb-4 font-semibold text-fd-foreground text-sm">
                Policies
              </h4>
              <ul className="space-y-3 text-fd-muted-foreground text-sm">
                {footerLinks.policies.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="inline-flex transition-colors hover:text-fd-primary"
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

          {/* Bottom bar */}
          <div className="mt-3 flex flex-col items-center justify-between gap-7 border-fd-border/40 border-t pt-5 md:flex-row">
            <p className="text-fd-muted-foreground text-sm">
              © {currentYear} Field Nation. All rights reserved.
            </p>

            {/* Compliance Logos */}
            <div className="flex items-center gap-8 rounded-lg bg-white px-4 py-2 dark:bg-neutral-800">
              {complianceLogos.map((logo, index) => (
                <Fragment key={logo.name}>
                  <div
                    className="flex items-center justify-center"
                    title={logo.alt}
                  >
                    <Image
                      alt={logo.alt}
                      className={`w-auto object-contain ${logo.className}`}
                      height={56}
                      src={logo.src}
                      width={96}
                    />
                  </div>
                  {index < complianceLogos.length - 1 && (
                    <div className="h-8 w-px bg-fd-border" />
                  )}
                </Fragment>
              ))}
            </div>

            <p className="text-fd-muted-foreground text-xs">
              Built with{" "}
              <Link
                className="font-medium transition-colors hover:text-fd-primary"
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
      </footer>
    </div>
  );
}
