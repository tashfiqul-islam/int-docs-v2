"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Mobile Menu Trigger Component
 * Replaces the default Fumadocs chevron toggle with a hamburger menu
 */
export function MobileMenuTrigger() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on route change
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      setIsOpen(false);
    }
  }, [pathname]);

  const isActive = (path: string) => pathname.startsWith(path);

  const linkClass = (active: boolean) =>
    `flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors no-underline ${
      active
        ? "bg-fd-primary/10 text-fd-primary"
        : "text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground"
    }`;

  if (!mounted) {
    return null;
  }

  // Hide on subpages that have their own sidebar navigation
  const isSubpage =
    pathname.startsWith("/docs") || pathname.startsWith("/api-references");
  if (isSubpage) {
    return null;
  }

  return (
    <>
      {/* Global style to add spacing for hamburger - only when hamburger is visible */}
      <style>{`
        @media (max-width: 1023px) {
          button[aria-label="Open Search"] {
            margin-right: 3rem !important;
          }
        }
      `}</style>

      {/* Fixed hamburger on far right, beside search icon */}
      <div className="fixed top-0 right-3 z-50 flex h-14 items-center lg:hidden">
        <button
          aria-label="Toggle Mobile Menu"
          className="flex size-9 items-center justify-center rounded-lg border border-fd-border/40 bg-fd-card/50 text-fd-muted-foreground transition-all hover:bg-fd-accent hover:text-fd-foreground active:scale-95"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-14 right-4 left-4 z-50 flex flex-col gap-1 rounded-xl border border-fd-border/50 bg-fd-popover/95 p-2 shadow-2xl backdrop-blur-md"
            exit={{ opacity: 0, y: -10 }}
            initial={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Top-level links */}
            <Link
              className={linkClass(isActive("/docs"))}
              href="/docs/getting-started/introduction/"
              onClick={() => setIsOpen(false)}
            >
              Documentation
            </Link>
            <Link
              className={linkClass(isActive("/api-references"))}
              href="/api-references/rest-api/v2/"
              onClick={() => setIsOpen(false)}
            >
              API References
            </Link>

            {/* Resources Section */}
            <div className="mt-2 border-fd-border/30 border-t pt-2">
              <span className="block px-3 py-2 font-semibold text-fd-foreground text-sm">
                Resources
              </span>
              <div className="space-y-0.5 pl-3">
                <Link
                  className={linkClass(false)}
                  href="https://fieldnation.com/resource-library?s=&fldn_content_type=6&fldn_content_category=&fldn_work_type="
                  onClick={() => setIsOpen(false)}
                  target="_blank"
                >
                  <span className="flex items-center gap-1.5">
                    Field Nation Blogs
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </Link>
                <div className="flex cursor-not-allowed items-center px-3 py-2 text-fd-muted-foreground/50 text-sm">
                  Developer Portal (Coming Soon)
                </div>
              </div>
            </div>

            {/* For LLMs Section */}
            <div className="mt-2 border-fd-border/30 border-t pt-2">
              <span className="block px-3 py-2 font-semibold text-fd-foreground text-sm">
                For LLMs
              </span>
              <div className="space-y-0.5 pl-3">
                <Link
                  className={linkClass(false)}
                  href="/llms/llms.txt"
                  onClick={() => setIsOpen(false)}
                  target="_blank"
                >
                  <span className="flex items-center gap-1.5">
                    llms.txt
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </Link>
                <Link
                  className={linkClass(false)}
                  href="/llms/llms-full.txt"
                  onClick={() => setIsOpen(false)}
                  target="_blank"
                >
                  <span className="flex items-center gap-1.5">
                    llms-full.txt
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
