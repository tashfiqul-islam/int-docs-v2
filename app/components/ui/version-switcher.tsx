"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

const VERSION_REGEX = /^v\d+$/;

type Section = "rest-api" | "webhooks" | null;

export default function VersionSwitcher({
  availableVersions,
}: {
  availableVersions: Record<string, string[]>;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [section, setSection] = useState<Section>(null);
  const [currentVersion, setCurrentVersion] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Current sections supported: rest-api, webhooks
    const pathSegments = pathname.split("/").filter(Boolean);
    // Path structure is usually: [prefix, section, version, ...]
    // prefix is 'docs' or 'api-references'

    let activeSection: Section = null;
    let activeVersion = "";

    if (pathname.includes("/rest-api/")) {
      activeSection = "rest-api";
    } else if (pathname.includes("/webhooks/")) {
      activeSection = "webhooks";
    }

    if (activeSection) {
      // Find the version segment in the path (first segment that matches v\d+)
      const foundVersion = pathSegments.find((s) => VERSION_REGEX.test(s));
      if (foundVersion) {
        activeVersion = foundVersion;
      }
    }

    setSection(activeSection);
    setCurrentVersion(activeVersion);
  }, [pathname]);

  if (!section) {
    return null;
  }

  const options = availableVersions[section] || [];

  // Don't show if no versions discovered for this section
  if (options.length === 0) {
    return null;
  }

  const handleVersionSelect = (newVersion: string) => {
    if (newVersion === currentVersion) {
      setOpen(false);
      return;
    }

    setCurrentVersion(newVersion);
    setOpen(false);

    // Replace the version segment in the current path and navigate
    // Example: /docs/rest-api/v2/intro -> /docs/rest-api/v1/intro
    const newPath = pathname.replace(`/${currentVersion}/`, `/${newVersion}/`);
    router.push(newPath);
  };

  return (
    <div
      className="flex items-center"
      ref={(node) => {
        if (node) {
          setContainerRef(node);
        }
      }}
    >
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger
          aria-label="Select version"
          className="flex h-8 w-auto items-center gap-1.5 rounded-full border border-fd-border/50 bg-fd-secondary/50 px-3 py-1 text-fd-primary text-sm transition-colors hover:bg-fd-accent focus:border-fd-primary focus:outline-none"
        >
          <span className="font-medium">{currentVersion}</span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 opacity-50 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="z-50 min-w-[100px] gap-1 p-1"
          container={containerRef}
          side="top"
          sideOffset={8}
        >
          {options.map((option) => (
            <button
              className={cn(
                "flex w-full items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-fd-accent",
                currentVersion === option
                  ? "bg-fd-accent font-medium text-fd-primary"
                  : "text-fd-muted-foreground"
              )}
              key={option}
              onClick={() => handleVersionSelect(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
