"use client";

import { create } from "@orama/orama";
import { useDocsSearch } from "fumadocs-core/search/client";
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
import { useI18n } from "fumadocs-ui/contexts/i18n";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

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

/**
 * Initialize Orama search instance for static search mode.
 * This is called once when the search client initializes.
 */
function initOrama() {
  return create({
    schema: {
      _: "string",
      tag: "string",
    },
    language: "english",
  });
}

/**
 * Default search dialog using Fumadocs' static search with Orama.
 * Includes a custom Popover filter for Doc/API tags.
 */
export default function DefaultSearchDialog(props: SharedProps) {
  const { locale } = useI18n();
  const [tag, setTag] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const { search, setSearch, query } = useDocsSearch({
    type: "static",
    initOrama,
    locale,
    tag,
  });

  return (
    <SearchDialog
      isLoading={query.isLoading}
      onSearchChange={setSearch}
      search={search}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        {search.length > 0 && (
          <SearchDialogList items={query.data === "empty" ? [] : query.data} />
        )}
        <SearchDialogFooter className="flex flex-row flex-wrap items-center gap-2">
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
              className="flex flex-col gap-1 border-fd-border bg-fd-background p-1"
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
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  );
}
