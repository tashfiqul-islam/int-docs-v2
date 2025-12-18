"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logoLight from "~/assets/light/logo_light.png";

/**
 * Theme-aware logo component that switches between light and dark logos
 * based on the current theme mode.
 * Note: Fumadocs navbar already wraps the title in a Link, so we don't need to add one here.
 */
export function ThemeLogo({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return <div className={className} style={{ width: 100, height: 24 }} />;
  }

  const logoSrc = logoLight;

  return (
    <Image
      alt="Field Nation"
      className={className}
      height={24}
      priority
      src={logoSrc}
      style={{ width: "auto" }}
      width={100}
    />
  );
}
