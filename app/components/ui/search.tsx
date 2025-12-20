"use client";

import { create } from "@orama/orama";
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from "fumadocs-ui/components/dialog/search";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const items = [
  {
    name: "All",
    value: undefined,
  },
  {
    name: "Documentation",
    description: "Guides & Concepts",
    value: "doc",
  },
  {
    name: "API Reference",
    description: "API Endpoints",
    value: "api",
  },
];

import { useDocsSearch } from "fumadocs-core/search/client";
import type { SortedResult } from "fumadocs-core/search/server";
import { useI18n } from "fumadocs-ui/contexts/i18n";

function initOrama() {
  return create({
    schema: {
      title: "string",
      description: "string",
      content: "string",
      tag: "string",
      url: "string",
      type: "string",
    },
    // https://docs.orama.com/docs/orama-js/supported-languages
    language: "english",
  });
}

export default function DefaultSearchDialog(props: SharedProps) {
  const { locale } = useI18n();
  const [tag, setTag] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const { search, setSearch, query } = useDocsSearch({
    type: "static",
    from: "/api/search",
    // biome-ignore lint/suspicious/noExplicitAny: complex Orama type mismatch
    initOrama: initOrama as any,
    tag,
    locale,
  });
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const results =
    query.data && query.data !== "empty"
      ? (query.data as SortedResult[]).map((hit) => ({
          ...hit,
          description:
            // biome-ignore lint/suspicious/noExplicitAny: hits from fumadocs have extra properties
            (hit as any).description ||
            // biome-ignore lint/suspicious/noExplicitAny: hits from fumadocs have extra properties
            (hit as any).content?.slice(0, 100) ||
            // biome-ignore lint/suspicious/noExplicitAny: hits from fumadocs have extra properties
            (hit as any).title,
          breadcrumbs: hit.url
            ? (hit.url as string)
                .split("/")
                .filter(Boolean)
                .slice(0, -1)
                .map((seg: string) => {
                  if (seg === "docs") {
                    return "Docs";
                  }
                  if (seg === "api-references") {
                    return "API Reference";
                  }
                  return seg
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c: string) => c.toUpperCase());
                })
            : [],
        }))
      : "empty";

  return (
    <SearchDialog
      isLoading={query.isLoading}
      onSearchChange={setSearch}
      search={search}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent className="overflow-visible">
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        {results === "empty" ? null : <SearchDialogList items={results} />}
        <SearchDialogFooter className="flex flex-row flex-wrap items-center gap-2">
          {/* Container for popover */}
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
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "-m-1.5 me-auto",
                  })
                )}
              >
                <span className="me-2 text-fd-muted-foreground/80">Filter</span>
                {items.find((item) => item.value === tag)?.name}
                <ChevronDown className="size-3.5 text-fd-muted-foreground" />
              </PopoverTrigger>
              <PopoverContent
                align="start"
                alignOffset={-4}
                className="flex w-[200px] flex-col gap-1 border-fd-border bg-fd-popover p-1"
                container={containerRef}
                sideOffset={8}
              >
                {items.map((item) => {
                  const isSelected = item.value === tag;
                  return (
                    <button
                      className={cn(
                        "rounded-lg px-2 py-1.5 text-start transition-colors",
                        isSelected
                          ? "bg-fd-primary/10 text-fd-primary"
                          : "hover:bg-fd-accent hover:text-fd-accent-foreground"
                      )}
                      key={item.value || "all"}
                      onClick={() => {
                        setTag(item.value);
                        setOpen(false);
                      }}
                      type="button"
                    >
                      <p className="mb-0.5 font-medium text-sm">{item.name}</p>
                      {!!item.description && (
                        <p className="text-xs opacity-70">{item.description}</p>
                      )}
                    </button>
                  );
                })}
              </PopoverContent>
            </Popover>
          </div>
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  );
}
