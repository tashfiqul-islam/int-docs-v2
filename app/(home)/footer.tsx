"use client";

import Link from "next/link";
import { memo } from "react";

export const Footer = memo(function FooterComponent() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border border-t bg-fd-background">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-4 text-fd-muted-foreground text-sm sm:justify-between">
          <p>© {currentYear} Field Nation. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link
              className="transition-colors hover:text-fd-foreground"
              href="https://fieldnation.com/legal"
              rel="noopener noreferrer"
              target="_blank"
            >
              Legal
            </Link>
            <span className="text-fd-muted-foreground/50">•</span>
            <Link
              className="transition-colors hover:text-fd-foreground"
              href="https://trust.fieldnation.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Trust
            </Link>
            <span className="text-fd-muted-foreground/50">•</span>
            <Link
              className="transition-colors hover:text-fd-foreground"
              href="https://status.fieldnation.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
});
