import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

type ConnectorCardProps = {
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
};

export function ConnectorCard({
  connector,
  onMouseEnter,
  onMouseLeave,
}: ConnectorCardProps) {
  const sizeClasses =
    "needsLargerSize" in connector && connector.needsLargerSize
      ? "!h-16 md:!h-20 lg:!h-24"
      : "";

  const darkEnhanceClasses =
    "needsDarkEnhance" in connector && connector.needsDarkEnhance
      ? "dark:brightness-125 dark:contrast-125"
      : "";

  return (
    <Link
      className="group relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-2xl border border-fd-border/50 bg-fd-card p-4 transition-all duration-300 hover:border-fd-primary/40 hover:shadow-fd-primary/10 hover:shadow-xl md:p-8"
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
            className={`h-12 w-auto max-w-full object-contain transition-all duration-300 group-hover:scale-110 md:h-16 lg:h-20 dark:hidden ${sizeClasses}`}
            height={80}
            src={connector.logo}
            width={160}
          />
          {/* Dark mode logo */}
          <Image
            alt={`${connector.name} logo`}
            className={`hidden h-12 w-auto max-w-full object-contain transition-all duration-300 group-hover:scale-110 md:h-16 lg:h-20 dark:block ${sizeClasses}`}
            height={80}
            src={connector.logoDark ?? connector.logo}
            width={160}
          />
        </>
      ) : (
        <Image
          alt={`${connector.name} logo`}
          className={`h-12 w-auto max-w-full object-contain transition-all duration-300 group-hover:scale-110 md:h-16 lg:h-20 ${darkEnhanceClasses} ${sizeClasses}`}
          height={80}
          src={connector.logo}
          width={160}
        />
      )}

      {/* Hover overlay */}
      <div className="absolute right-0 bottom-0 left-0 flex translate-y-full items-center justify-center bg-gradient-to-t from-fd-card via-fd-card/95 to-transparent px-4 py-3 transition-transform duration-300 ease-out group-hover:translate-y-0">
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
