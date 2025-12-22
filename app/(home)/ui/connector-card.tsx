import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

interface ConnectorCardProps {
  connector: {
    name: string;
    href: string;
    logo: string | StaticImageData;
    logoDark?: string | StaticImageData;
    needsDarkEnhance?: boolean;
    needsLargerSize?: boolean;
  };
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/**
 * Interactive card displaying a connector logo with light/dark mode support.
 * Shows a hover overlay with "Learn More" prompt.
 */
export function ConnectorCard({
  connector,
  onMouseEnter,
  onMouseLeave,
}: ConnectorCardProps) {
  const sizeClasses =
    "needsLargerSize" in connector && connector.needsLargerSize
      ? "!h-10 md:!h-12 lg:!h-14"
      : "";

  const darkEnhanceClasses =
    "needsDarkEnhance" in connector && connector.needsDarkEnhance
      ? "dark:brightness-125 dark:contrast-125"
      : "";

  return (
    <Link
      className="group relative flex aspect-5/2 items-center justify-center overflow-hidden rounded-xl border border-fd-border/50 bg-fd-card p-2.5 transition-all duration-300 hover:border-fd-primary/40 hover:shadow-fd-primary/10 hover:shadow-xl md:p-4"
      href={connector.href}
      key={connector.name}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      title={connector.name}
    >
      {"logoDark" in connector ? (
        <>
          {/* Light mode logo */}
          <Image
            alt={`${connector.name} logo`}
            className={`h-6 w-auto max-w-full object-contain transition-all duration-300 group-hover:scale-110 md:h-8 lg:h-9 dark:hidden ${sizeClasses}`}
            src={connector.logo}
            style={{ width: "auto" }}
          />
          {/* Dark mode logo */}
          <Image
            alt={`${connector.name} logo`}
            className={`hidden h-6 w-auto max-w-full object-contain transition-all duration-300 group-hover:scale-110 md:h-8 lg:h-9 dark:block ${sizeClasses}`}
            src={connector.logoDark ?? connector.logo}
            style={{ width: "auto" }}
          />
        </>
      ) : (
        <Image
          alt={`${connector.name} logo`}
          className={`h-6 w-auto max-w-full object-contain transition-all duration-300 group-hover:scale-110 md:h-8 lg:h-9 ${darkEnhanceClasses} ${sizeClasses}`}
          src={connector.logo}
          style={{ width: "auto" }}
        />
      )}

      {/* Hover overlay */}
      <div className="absolute right-0 bottom-0 left-0 flex translate-y-full items-center justify-center bg-linear-to-t from-fd-card via-fd-card/95 to-transparent px-4 py-3 transition-transform duration-300 ease-out group-hover:translate-y-0">
        <span
          className="font-medium text-xs tracking-wide md:text-sm"
          style={{ color: "var(--color-fd-primary)" }}
        >
          Learn More →
        </span>
      </div>
    </Link>
  );
}
