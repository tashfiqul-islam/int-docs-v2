"use client";

import Image from "next/image";
import primaryLogo from "~/assets/swags/primary-logo.svg";

/**
 * Logo component using Field Nation's primary brand logo.
 * Uses the primary-logo.svg from swags folder for consistent branding.
 * Note: Fumadocs navbar already wraps the title in a Link, so we don't need to add one here.
 */
export function ThemeLogo({ className }: { className?: string }) {
  return (
    <Image
      alt="Field Nation"
      className={`${className ?? ""}`}
      height={36}
      src={primaryLogo}
      style={{ width: "auto", height: "36px", maxHeight: "36px" }}
      width={36}
    />
  );
}
