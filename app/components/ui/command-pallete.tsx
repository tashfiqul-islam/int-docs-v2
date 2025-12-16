"use client";

import {
  AnimatePresence,
  motion,
  type Transition,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Link from "fumadocs-core/link";
import { useDocsSearch } from "fumadocs-core/search/client";
import type { SharedProps } from "fumadocs-ui/components/dialog/search";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  ChevronRight,
  CodeXml,
  FileText,
  Hash,
  Plug,
  Rocket,
  Search,
  Webhook,
  X,
} from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
} from "react";

type Command = {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly shortcutKey: string;
  readonly description: string;
  readonly href: string;
  readonly value: string;
};

type HighlightedText = {
  readonly type: "text";
  readonly content: string;
  readonly styles?: {
    readonly highlight?: boolean;
  };
};

type SearchResult = {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly url: string;
  readonly type: "page" | "heading" | "text";
  readonly breadcrumbs?: readonly string[];
  readonly contentWithHighlights?: readonly HighlightedText[];
  readonly section?: string;
};

type GroupedSearchResults = {
  readonly section: string;
  readonly icon: LucideIcon;
  readonly results: readonly SearchResult[];
};

const commands = [
  {
    icon: Rocket,
    label: "Getting Started",
    shortcutKey: "1",
    description:
      "Learn the fundamentals and get started with Field Nation Integration",
    href: "/docs/getting-started/introduction",
    value: "getting-started",
  },
  {
    icon: Plug,
    label: "Connectors",
    shortcutKey: "2",
    description: "Pre-built integrations for popular ERP and CRM platforms",
    href: "/docs/connectors/introduction",
    value: "connectors",
  },
  {
    icon: CodeXml,
    label: "REST API",
    shortcutKey: "3",
    description: "Programmatic access to Field Nation platform via REST API",
    href: "/docs/rest-api/introduction",
    value: "rest-api",
  },
  {
    icon: Webhook,
    label: "Webhooks",
    shortcutKey: "4",
    description: "Real-time event notifications via Platform Event Streams",
    href: "/docs/webhooks/introduction",
    value: "webhooks",
  },
] satisfies readonly Command[];

export function useModifierKey(): "⌘" | "Ctrl" {
  const getModifier = useCallback((): "⌘" | "Ctrl" => {
    if (typeof window === "undefined") {
      return "⌘";
    }
    return window.navigator.userAgent.includes("Windows") ? "Ctrl" : "⌘";
  }, []);

  return useSyncExternalStore(
    () => {
      return () => {
        // No-op unsubscribe
      };
    },
    getModifier,
    () => "⌘"
  );
}

function formatShortcut(
  modifier: "⌘" | "Ctrl",
  key: string
): `${typeof modifier}${string}` | `${typeof modifier} ${string}` {
  return modifier === "Ctrl" ? `${modifier} ${key}` : `${modifier}${key}`;
}

const overlayTransition: Transition = { duration: 0.24, ease: "easeOut" };

function getPanelVariants(shouldReduceMotion: boolean | null): Variants {
  if (shouldReduceMotion) {
    return {
      initial: { opacity: 0, y: 0, scale: 1 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 0, scale: 1 },
    };
  }
  return {
    initial: { opacity: 0, scale: 0.96, y: 20, filter: "blur(6px)" },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.28, ease: [0.18, 0.89, 0.32, 1.12] },
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      y: 12,
      filter: "blur(8px)",
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    },
  };
}

type CommandItemProps = {
  readonly cmd: Command;
  readonly index: number;
  readonly shouldReduceMotion: boolean | null;
  readonly modifier: "⌘" | "Ctrl";
  readonly onSelect: () => void;
  readonly isSelected: boolean;
  readonly itemRef?: (node: HTMLLIElement | null) => void;
};

function CommandItem({
  cmd,
  index,
  shouldReduceMotion,
  modifier,
  onSelect,
  isSelected,
  itemRef,
}: CommandItemProps) {
  const Icon = cmd.icon;
  const shortcut = useMemo(
    () => formatShortcut(modifier, cmd.shortcutKey),
    [modifier, cmd.shortcutKey]
  );
  return (
    <motion.li
      animate={{ opacity: 1, y: 0 }}
      initial={{
        opacity: shouldReduceMotion ? 1 : 0,
        y: shouldReduceMotion ? 0 : 12,
      }}
      key={cmd.label}
      ref={itemRef}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              delay: 0.04 * index,
              duration: 0.24,
              ease: "easeOut",
            }
      }
    >
      <Link
        aria-selected={isSelected}
        className={`group flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 ${
          isSelected
            ? "border-border bg-fd-card/10"
            : "border-transparent bg-fd-card/5 hover:border-border hover:bg-fd-card/10"
        }`}
        href={cmd.href}
        onClick={onSelect}
        role="option"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 bg-fd-card/5 text-brand shadow-sm backdrop-blur">
            <Icon aria-hidden className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="font-medium text-fd-muted-foreground text-sm">
              {cmd.label}
            </span>
            <span className="text-fd-muted-foreground text-xs">
              {cmd.description}
            </span>
          </div>
        </div>
        <kbd className="rounded-full border border-border/40 bg-fd-card/5 px-2 py-1 text-fd-muted-foreground text-xs shadow-sm">
          {shortcut}
        </kbd>
      </Link>
    </motion.li>
  );
}

function BackgroundEffects({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean | null;
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: [0.25, 0.55, 0.25],
                scale: [0.92, 1.08, 0.98],
              }
        }
        className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/20 blur-[150px]"
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }
        }
      />
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : { opacity: [0.2, 0.5, 0.2], rotate: [0, 12, 0] }
        }
        className="absolute right-[-5%] bottom-[-30%] h-72 w-72 rounded-full bg-brand-secondary/20 blur-[160px]"
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }
        }
      />
    </div>
  );
}

type SearchResultItemProps = {
  readonly result: SearchResult;
  readonly index: number;
  readonly shouldReduceMotion: boolean | null;
  readonly onSelect: () => void;
  readonly isSelected: boolean;
  readonly itemRef?: (node: HTMLLIElement | null) => void;
};

function renderHighlights(
  highlights: readonly HighlightedText[]
): React.ReactNode {
  return highlights.map((node, i) => {
    const key = `${i}-${String(node.content).slice(0, 20)}`;
    if (node.styles?.highlight) {
      return (
        <mark
          className="rounded bg-brand/20 px-0.5 text-brand-foreground"
          key={key}
        >
          {node.content}
        </mark>
      );
    }
    return <span key={key}>{node.content}</span>;
  });
}

function Breadcrumbs({
  breadcrumbs,
  maxItems = 4,
}: {
  readonly breadcrumbs: readonly string[];
  readonly maxItems?: number;
}) {
  const displayBreadcrumbs = useMemo(() => {
    if (breadcrumbs.length <= maxItems) {
      return breadcrumbs;
    }
    // Show first item, ellipsis, and last (maxItems - 1) items
    const first = breadcrumbs[0];
    const last = breadcrumbs.slice(-(maxItems - 2));
    return [first, "...", ...last];
  }, [breadcrumbs, maxItems]);

  return (
    <div className="inline-flex items-center gap-1 text-fd-muted-foreground text-xs">
      {displayBreadcrumbs.map((crumb, i) => {
        const crumbKey = `${String(crumb)}-${i}`;
        const isEllipsis = crumb === "...";
        return (
          <React.Fragment key={crumbKey}>
            {i > 0 ? (
              <ChevronRight aria-hidden className="h-3 w-3 shrink-0" />
            ) : null}
            <span className={isEllipsis ? "px-1" : "truncate"}>{crumb}</span>
          </React.Fragment>
        );
      })}
    </div>
  );
}

function getSectionFromUrl(url: string): {
  section: string;
  icon: LucideIcon;
} {
  if (url.startsWith("/docs/getting-started")) {
    return { section: "Getting Started", icon: Rocket };
  }
  if (url.startsWith("/docs/connectors")) {
    return { section: "Connectors", icon: Plug };
  }
  if (url.startsWith("/docs/rest-api") || url.startsWith("/api-reference")) {
    return { section: "REST API", icon: CodeXml };
  }
  if (url.startsWith("/docs/webhooks")) {
    return { section: "Webhooks", icon: Webhook };
  }
  if (url.startsWith("/docs/resources")) {
    return { section: "Resources", icon: BookOpen };
  }
  if (url.startsWith("/docs")) {
    return { section: "Documentation", icon: FileText };
  }
  return { section: "Other", icon: FileText };
}

type ResultContentProps = {
  readonly result: SearchResult;
  readonly isPage: boolean;
  readonly isHeading: boolean;
};

function ResultContent({ result, isPage, isHeading }: ResultContentProps) {
  return (
    <div className="min-w-0 flex-1">
      <p
        className={`min-w-0 truncate text-sm ${
          isPage || isHeading
            ? "font-medium text-fd-foreground"
            : "text-fd-muted-foreground/80"
        }`}
      >
        {isHeading ? (
          <Hash
            aria-hidden
            className="mr-1 inline h-3.5 w-3.5 text-fd-muted-foreground"
          />
        ) : null}
        {result.contentWithHighlights
          ? renderHighlights(result.contentWithHighlights)
          : result.title}
      </p>
      {result.type === "text" && result.description ? (
        <p className="mt-1 line-clamp-2 text-fd-muted-foreground text-xs">
          {result.description}
        </p>
      ) : null}
      {result.breadcrumbs !== undefined && result.breadcrumbs.length > 0 ? (
        <div className="mt-1.5">
          <Breadcrumbs breadcrumbs={result.breadcrumbs} maxItems={3} />
        </div>
      ) : null}
    </div>
  );
}

function SearchResultItem({
  result,
  index,
  shouldReduceMotion,
  onSelect,
  isSelected,
  itemRef,
}: SearchResultItemProps) {
  const isPage = result.type === "page";
  const isHeading = result.type === "heading";

  return (
    <motion.li
      animate={{ opacity: 1, y: 0 }}
      initial={{
        opacity: shouldReduceMotion ? 1 : 0,
        y: shouldReduceMotion ? 0 : 12,
      }}
      key={result.id}
      ref={itemRef}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              delay: 0.04 * index,
              duration: 0.24,
              ease: "easeOut",
            }
      }
    >
      <Link
        aria-selected={isSelected}
        className={`group relative flex w-full flex-col gap-1.5 rounded-2xl border px-4 py-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 ${
          isSelected
            ? "border-border bg-fd-card/10"
            : "border-transparent bg-fd-card/5 hover:border-border hover:bg-fd-card/10"
        } ${isPage ? "" : "pl-5"}`}
        href={result.url}
        onClick={onSelect}
        role="option"
      >
        {!isPage && (
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-3 w-px bg-border"
          />
        )}

        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-fd-card/5 text-brand shadow-sm backdrop-blur">
            {isHeading ? (
              <Hash aria-hidden className="h-3.5 w-3.5" />
            ) : (
              <FileText aria-hidden className="h-3.5 w-3.5" />
            )}
          </span>
          <ResultContent
            isHeading={isHeading}
            isPage={isPage}
            result={result}
          />
        </div>
      </Link>
    </motion.li>
  );
}

function SearchResultGroup({
  group,
  startIndex,
  shouldReduceMotion,
  onSelect,
  selectedIndex,
  itemRefs,
}: {
  readonly group: GroupedSearchResults;
  readonly startIndex: number;
  readonly shouldReduceMotion: boolean | null;
  readonly onSelect: () => void;
  readonly selectedIndex: number;
  readonly itemRefs: React.MutableRefObject<Array<HTMLLIElement | null>>;
}) {
  const Icon = group.icon;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1 py-2">
        <Icon aria-hidden className="h-4 w-4 text-brand" />
        <h3 className="font-semibold text-fd-muted-foreground text-xs uppercase tracking-wider">
          {group.section}
        </h3>
        <span className="text-fd-muted-foreground/60 text-xs">
          ({group.results.length})
        </span>
      </div>
      <ul aria-label={`${group.section} results`} className="space-y-2">
        {group.results.map((result, groupIndex) => {
          const index = startIndex + groupIndex;
          return (
            <SearchResultItem
              index={index}
              isSelected={index === selectedIndex}
              itemRef={(node) => {
                itemRefs.current[index] = node;
              }}
              key={result.id}
              onSelect={onSelect}
              result={result}
              shouldReduceMotion={shouldReduceMotion}
            />
          );
        })}
      </ul>
    </div>
  );
}

function CommandList({
  filteredCommands,
  groupedSearchResults,
  isLoading,
  shouldReduceMotion,
  modifier,
  onSelect,
  selectedIndex,
  itemRefs,
}: {
  readonly filteredCommands: readonly Command[];
  readonly groupedSearchResults: readonly GroupedSearchResults[] | null;
  readonly isLoading: boolean;
  readonly shouldReduceMotion: boolean | null;
  readonly modifier: "⌘" | "Ctrl";
  readonly onSelect: () => void;
  readonly selectedIndex: number;
  readonly itemRefs: React.MutableRefObject<Array<HTMLLIElement | null>>;
}) {
  const hasSearchResults =
    groupedSearchResults !== null && groupedSearchResults.length > 0;
  const hasCommands = filteredCommands.length > 0;

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border/60 bg-fd-card/5 p-6 text-center text-fd-muted-foreground text-sm backdrop-blur">
        <p>Searching...</p>
      </div>
    );
  }

  if (!(hasSearchResults || hasCommands)) {
    return (
      <div className="rounded-2xl border border-border/60 bg-fd-card/5 p-6 text-center text-fd-muted-foreground text-sm backdrop-blur">
        <p>No results found. Try a different search term.</p>
      </div>
    );
  }

  if (hasSearchResults) {
    let currentIndex = 0;
    return (
      <section aria-label="Search results" className="space-y-4">
        {groupedSearchResults.map((group) => {
          const groupStartIndex = currentIndex;
          currentIndex += group.results.length;
          return (
            <SearchResultGroup
              group={group}
              itemRefs={itemRefs}
              key={group.section}
              onSelect={onSelect}
              selectedIndex={selectedIndex}
              shouldReduceMotion={shouldReduceMotion}
              startIndex={groupStartIndex}
            />
          );
        })}
      </section>
    );
  }

  return (
    <ul aria-label="Documentation sections" className="space-y-2">
      {filteredCommands.map((cmd, index) => (
        <CommandItem
          cmd={cmd}
          index={index}
          isSelected={index === selectedIndex}
          itemRef={(node) => {
            itemRefs.current[index] = node;
          }}
          key={cmd.label}
          modifier={modifier}
          onSelect={onSelect}
          shouldReduceMotion={shouldReduceMotion}
        />
      ))}
    </ul>
  );
}

type CommandPaletteProps = Partial<SharedProps> & {
  readonly showTrigger?: boolean;
};

export function CommandPalette({
  open: controlledOpen,
  onOpenChange,
  showTrigger,
}: CommandPaletteProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const modifier = useModifierKey();
  const [, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const { locale } = useI18n();

  const {
    search,
    setSearch,
    query: searchQuery,
  } = useDocsSearch({
    type: "static",
    locale,
  });

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? (controlledOpen ?? false) : internalOpen;
  const shouldShowTrigger = showTrigger ?? !isControlled;

  const searchResults = useMemo((): readonly SearchResult[] | null => {
    if (!search.trim() || searchQuery.data === "empty" || !searchQuery.data) {
      return null;
    }
    return searchQuery.data.map((item) => {
      const title =
        typeof item.content === "string"
          ? item.content
          : (item.breadcrumbs?.[item.breadcrumbs.length - 1]?.toString() ?? "");
      const breadcrumbs =
        item.breadcrumbs?.map((crumb) =>
          typeof crumb === "string" ? crumb : String(crumb)
        ) ?? [];
      const contentWithHighlights =
        item.contentWithHighlights?.map((highlight) => ({
          type: "text" as const,
          content:
            typeof highlight.content === "string"
              ? highlight.content
              : String(highlight.content),
          styles: highlight.styles,
        })) ?? undefined;
      const { section } = getSectionFromUrl(item.url);
      return {
        id: item.id,
        title: title || item.url,
        description:
          item.type === "text" && typeof item.content === "string"
            ? item.content
            : undefined,
        url: item.url,
        type: item.type,
        breadcrumbs: breadcrumbs.length > 0 ? breadcrumbs : undefined,
        contentWithHighlights,
        section,
      };
    });
  }, [search, searchQuery.data]);

  const groupedSearchResults = useMemo(():
    | readonly GroupedSearchResults[]
    | null => {
    if (!searchResults) {
      return null;
    }

    // Group results by section, prioritizing pages, then headings, then text
    const grouped = new Map<string, SearchResult[]>();

    // Sort results: pages first, then headings, then text
    const sortedResults = [...searchResults].sort((a, b) => {
      const typeOrder = { page: 0, heading: 1, text: 2 };
      return typeOrder[a.type] - typeOrder[b.type];
    });

    for (const result of sortedResults) {
      const section = result.section ?? "Other";
      const existing = grouped.get(section) ?? [];
      existing.push(result);
      grouped.set(section, existing);
    }

    // Convert to array and sort by section priority
    const sectionOrder = [
      "Getting Started",
      "Connectors",
      "REST API",
      "Webhooks",
      "Resources",
      "Documentation",
      "Other",
    ];

    return Array.from(grouped.entries())
      .map(([section, results]) => {
        const { icon } = getSectionFromUrl(results[0]?.url ?? "");
        return { section, icon, results } satisfies GroupedSearchResults;
      })
      .sort((a, b) => {
        const aIndex = sectionOrder.indexOf(a.section);
        const bIndex = sectionOrder.indexOf(b.section);
        if (aIndex === -1 && bIndex === -1) {
          return a.section.localeCompare(b.section);
        }
        if (aIndex === -1) {
          return 1;
        }
        if (bIndex === -1) {
          return -1;
        }
        return aIndex - bIndex;
      });
  }, [searchResults]);

  const filteredCommands = useMemo((): readonly Command[] => {
    if (search.trim()) {
      return [];
    }
    return commands;
  }, [search]);

  const allItems = useMemo(() => {
    if (groupedSearchResults) {
      return groupedSearchResults.flatMap((group) => group.results);
    }
    return filteredCommands;
  }, [groupedSearchResults, filteredCommands]);

  const panelVariants = getPanelVariants(shouldReduceMotion);
  const triggerShortcut = useMemo(
    () => formatShortcut(modifier, "K"),
    [modifier]
  );

  const handleSelect = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      setInternalOpen(false);
    }
    setQuery("");
    setSearch("");
    setSelectedIndex(0);
    previousActiveElementRef.current?.focus();
    previousActiveElementRef.current = null;
  }, [isControlled, onOpenChange, setSearch]);

  const handleOpen = useCallback(() => {
    previousActiveElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    if (isControlled) {
      onOpenChange?.(true);
    } else {
      setInternalOpen(true);
    }
    setSelectedIndex(0);
  }, [isControlled, onOpenChange]);

  const navigateToItem = useCallback(
    (index: number) => {
      const item = allItems[index];
      if (!item) {
        return;
      }

      try {
        const url = "href" in item ? item.href : item.url;
        startTransition(() => {
          window.location.href = url;
        });
        handleSelect();
      } catch (error) {
        console.error("Failed to navigate:", error);
        handleSelect();
      }
    },
    [allItems, handleSelect]
  );

  const handlePaletteKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleSelect();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev < allItems.length - 1 ? prev + 1 : 0));
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allItems.length - 1));
        return;
      }

      if (event.key === "Enter" && allItems[selectedIndex]) {
        event.preventDefault();
        navigateToItem(selectedIndex);
        return;
      }

      if (!search.trim()) {
        const keyNum = Number.parseInt(event.key, 10);
        if (
          Number.isInteger(keyNum) &&
          keyNum >= 1 &&
          keyNum <= filteredCommands.length &&
          filteredCommands[keyNum - 1]
        ) {
          event.preventDefault();
          navigateToItem(keyNum - 1);
        }
      }
    },
    [
      allItems,
      selectedIndex,
      navigateToItem,
      handleSelect,
      search,
      filteredCommands,
    ]
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timeoutId = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timeoutId);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setSearch(query);
  }, [query, setSearch]);

  const previousQueryRef = useRef(query);
  useEffect(() => {
    if (previousQueryRef.current !== query) {
      setSelectedIndex(0);
      previousQueryRef.current = query;
    }
  }, [query]);

  useEffect(() => {
    const selectedElement = itemRefs.current[selectedIndex];
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  useEffect(() => {
    itemRefs.current = new Array(allItems.length).fill(null);
  }, [allItems.length]);

  useEffect(() => {
    if (!shouldShowTrigger || isControlled) {
      return;
    }

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key === "k" &&
        !event.shiftKey &&
        !event.altKey
      ) {
        event.preventDefault();
        if (isOpen) {
          handleSelect();
        } else {
          handleOpen();
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [isOpen, handleSelect, handleOpen, shouldShowTrigger, isControlled]);

  return (
    <div className="relative">
      {shouldShowTrigger ? (
        <motion.button
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label="Open command palette"
          className="group flex items-center gap-3 rounded-full border border-border/60 bg-fd-card/80 px-4 py-2.5 text-fd-muted-foreground text-sm shadow-[0_12px_30px_-15px_rgba(15,23,42,0.6)] backdrop-blur-lg transition-shadow duration-300 hover:shadow-[0_18px_45px_-20px_rgba(15,23,42,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={handleOpen}
          type="button"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        >
          <Search aria-hidden className="h-4 w-4 text-brand" />
          <span className="font-medium">Search documentation…</span>
          <kbd className="ml-auto rounded-full border border-border/60 bg-fd-card/5 px-2 py-0.5 text-fd-muted-foreground text-xs">
            {triggerShortcut}
          </kbd>
        </motion.button>
      ) : null}

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              animate={{ opacity: 1 }}
              aria-hidden
              className="fixed inset-0 z-60 bg-fd-background/60 backdrop-blur-lg"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={handleSelect}
              transition={overlayTransition}
            />

            <div className="fixed inset-0 z-65 flex items-start justify-center px-4 pt-24 sm:px-6">
              <motion.div
                aria-label="Command palette"
                aria-modal="true"
                onKeyDown={handlePaletteKeyDown}
                role="dialog"
                {...panelVariants}
                className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-border/60 bg-fd-card/90 backdrop-blur-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <BackgroundEffects shouldReduceMotion={shouldReduceMotion} />

                <div className="relative flex items-center gap-3 border-border/60 border-b px-5 py-4">
                  <Search aria-hidden className="h-5 w-5 text-brand" />
                  <input
                    aria-autocomplete="list"
                    aria-controls="command-list"
                    aria-expanded={allItems.length > 0}
                    autoComplete="off"
                    className="flex-1 bg-transparent text-fd-muted-foreground text-sm outline-none placeholder:text-fd-muted-foreground"
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={handlePaletteKeyDown}
                    placeholder="Search docs…"
                    ref={inputRef}
                    role="combobox"
                    type="text"
                    value={query}
                  />
                  <motion.button
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-fd-card/5 text-fd-muted-foreground transition-colors hover:bg-fd-card/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    onClick={handleSelect}
                    type="button"
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { rotate: 90, scale: 1.05 }
                    }
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
                  >
                    <X aria-hidden className="h-4 w-4" />
                    <span className="sr-only">Close command palette</span>
                  </motion.button>
                </div>

                <motion.div
                  animate={{ opacity: 1 }}
                  className="relative max-h-96 overflow-y-auto px-3 py-3"
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CommandList
                    filteredCommands={filteredCommands}
                    groupedSearchResults={groupedSearchResults}
                    isLoading={searchQuery.isLoading}
                    itemRefs={itemRefs}
                    modifier={modifier}
                    onSelect={handleSelect}
                    selectedIndex={selectedIndex}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </motion.div>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
