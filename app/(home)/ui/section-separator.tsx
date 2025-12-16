import type { ReactNode } from "react";

type SectionSeparatorProps = {
  children: ReactNode;
};

export function SectionSeparator({ children }: SectionSeparatorProps) {
  return (
    <div className="relative">
      {/* Top gradient line */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-fd-border/50 to-transparent"
      />

      {/* Diagonal pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-4 w-full bg-[repeating-linear-gradient(-45deg,var(--color-fd-foreground),var(--color-fd-foreground)_1px,transparent_1px,transparent_5px)] opacity-[0.015] dark:opacity-[0.03]"
      />

      {children}
    </div>
  );
}
