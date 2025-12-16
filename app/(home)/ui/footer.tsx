"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

type FooterLink = {
  text: string;
  href: string;
  external?: boolean;
};

const footerLinks: Record<string, FooterLink[]> = {
  resources: [
    { text: "Documentation", href: "/docs/getting-started/introduction" },
    { text: "API Reference", href: "/api-references/rest-api/v2" },
    { text: "Connectors", href: "/docs/connectors/introduction" },
    { text: "Webhooks", href: "/docs/webhooks/introduction" },
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
      text: "Status Page",
      href: "https://status.fieldnation.com",
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
      text: "Get Started",
      href: "https://fieldnation.com/get-started?cta=main_nav_get_started",
      external: true,
    },
    {
      text: "Resource Library",
      href: "https://www.fieldnation.com/resource-library",
      external: true,
    },
  ],
  legal: [
    {
      text: "Terms of Service",
      href: "https://www.fieldnation.com/terms",
      external: true,
    },
    {
      text: "Privacy Policy",
      href: "https://www.fieldnation.com/privacy",
      external: true,
    },
    {
      text: "Security",
      href: "https://www.fieldnation.com/security",
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
    icon: Github,
    href: "https://github.com/fieldnation",
    label: "GitHub",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/fieldnation",
    label: "Twitter",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/field-nation",
    label: "LinkedIn",
  },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-fd-border/40 border-t bg-fd-card/50">
      {/* Top gradient line */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-fd-border/50 to-transparent"
      />

      <div className="mx-auto max-w-[var(--fd-layout-width)] px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link className="mb-4 inline-block" href="/">
              <h3
                className="font-bold text-xl"
                style={{ color: "var(--color-fd-primary)" }}
              >
                Field Nation
              </h3>
            </Link>
            <p className="mb-6 max-w-xs text-balance text-fd-muted-foreground text-sm leading-relaxed">
              Build powerful integrations with the leading field service
              marketplace platform.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    aria-label={social.label}
                    className="rounded-lg p-2 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-primary"
                    href={social.href}
                    key={social.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon className="size-5" />
                  </Link>
                );
              })}
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

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold text-fd-foreground text-sm">
              Legal
            </h4>
            <ul className="space-y-3 text-fd-muted-foreground text-sm">
              {footerLinks.legal.map((link) => (
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
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-fd-border/40 border-t pt-8 md:flex-row">
          <p className="text-fd-muted-foreground text-sm">
            © {currentYear} Field Nation. All rights reserved.
          </p>
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
  );
}
