"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover";
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";
import { Check, ChevronDown, Copy, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import aiStudioDark from "@/app/assets/logo/llm-icons/aistudio-dark.svg";
import aiStudioLight from "@/app/assets/logo/llm-icons/aistudio-light.svg";
import claudeIcon from "@/app/assets/logo/llm-icons/claude-ai-icon.svg";
import markdownDark from "@/app/assets/logo/llm-icons/markdown_dark.svg";
import markdownLight from "@/app/assets/logo/llm-icons/markdown_light.svg";
import openAiDark from "@/app/assets/logo/llm-icons/OpenAI_dark.svg";
import openAiLight from "@/app/assets/logo/llm-icons/OpenAI_light.svg";
import perplexityIcon from "@/app/assets/logo/llm-icons/perplexity.svg";
import { buttonVariants } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

const cache = new Map<string, string>();

const optionVariants = (className?: string) =>
  `inline-flex items-center gap-2 rounded-lg p-2 text-sm hover:bg-fd-accent hover:text-fd-accent-foreground [&_svg]:size-4 ${className ?? ""}`;

interface LLMActionProps {
  /**
   * A URL to fetch the raw Markdown/MDX content of page
   */
  markdownUrl: string;
}

export function LLMActions({ markdownUrl }: LLMActionProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [checked, onClick] = useCopyButton(async () => {
    const cached = cache.get(markdownUrl);
    if (cached) {
      await navigator.clipboard.writeText(cached);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(markdownUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const content = await response.text();
      cache.set(markdownUrl, content);
      await navigator.clipboard.writeText(content);
    } catch (error) {
      console.error("Failed to copy markdown:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  });

  const llmItems = useMemo(() => {
    const fullMarkdownUrl =
      typeof window !== "undefined"
        ? new URL(markdownUrl, window.location.origin)
        : "loading";
    const q = [
      `Please analyze the documentation at ${fullMarkdownUrl} and process it as follows:`,
      "",
      "**Context:** This is the Field Nation Integrations documentation. I will have you answer questions and get guidance to build integrations with the Field Nation platform.",
      "",
      "**Instructions:**",
      "1. Read and comprehend the entire document thoroughly.",
      "2. This will serve as our reference context for this conversation.",
      "",
      "**Please provide:**",
      "1. **Executive Summary** (2-3 sentences): Core purpose and scope of the documentation.",
      "2. **Key Concepts** (bulleted list): Main technical concepts, terms, or components of the documentation.",
      "3. **Critical Details**: Important prerequisites, limitations, or warnings of the documentation.",
      "4. **Structure Overview**: How the documentation is organized.",
      "5. **Practical Applications**: Main use cases or implementation scenarios of the documentation.",
      "",
      "**Format:** Use clear headings and concise explanations suitable for developers familiar with REST APIs but new to this system.",
      "",
      "**After your analysis:** I may ask specific questions about implementation details, so maintain the full context for reference. Do not provide any other information or commentary.",
    ].join("\n");

    const isDark = mounted && resolvedTheme === "dark";
    const openAILogo = isDark ? openAiDark : openAiLight;
    const markdownLogo = isDark ? markdownDark : markdownLight;
    const aiStudioIcon = isDark ? aiStudioDark : aiStudioLight;

    return [
      {
        title: "View as Markdown",
        href: markdownUrl,
        icon: (
          <Image
            alt="Markdown"
            className="size-4"
            height={16}
            src={markdownLogo}
            width={16}
          />
        ),
      },
      {
        title: "Open in ChatGPT",
        href: `https://chatgpt.com/?${new URLSearchParams({
          hints: "search",
          q,
        })}`,
        icon: (
          <Image
            alt="ChatGPT"
            className="size-4"
            height={16}
            src={openAILogo}
            width={16}
          />
        ),
      },
      {
        title: "Open in AI Studio",
        href: `https://aistudio.google.com/prompts/new_chat?${new URLSearchParams(
          {
            prompt: q,
          }
        )}`,
        icon: (
          <Image
            alt="AI Studio"
            className="size-4"
            height={16}
            src={aiStudioIcon}
            width={16}
          />
        ),
      },
      {
        title: "Open in Claude",
        href: `https://claude.ai/new?${new URLSearchParams({
          q,
        })}`,
        icon: (
          <Image
            alt="Claude"
            className="size-4"
            height={16}
            src={claudeIcon}
            width={16}
          />
        ),
      },
      {
        title: "Open in Perplexity",
        href: `https://www.perplexity.ai/?${new URLSearchParams({
          q,
        })}`,
        icon: (
          <Image
            alt="Perplexity"
            className="size-4"
            height={16}
            src={perplexityIcon}
            width={16}
          />
        ),
      },
    ];
  }, [markdownUrl, mounted, resolvedTheme]);

  return (
    <div className="inline-flex items-center rounded-md border border-border bg-background shadow-sm">
      {/* Left side: Copy Markdown Button */}
      <button
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "sm",
            className:
              "gap-2 rounded-r-none border-border border-r [&_svg]:size-3.5 [&_svg]:text-fd-muted-foreground",
          })
        )}
        disabled={isLoading}
        onClick={onClick}
        type="button"
      >
        {checked ? <Check /> : <Copy />}
        Copy Markdown
      </button>

      {/* Right side: LLM Dropdown */}
      <Popover>
        <PopoverTrigger
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "gap-2 rounded-l-none",
            })
          )}
          type="button"
        >
          <ChevronDown className="size-3.5 text-fd-muted-foreground" />
        </PopoverTrigger>
        <PopoverContent align="end" className="flex flex-col p-2">
          {llmItems.map((item) => (
            <a
              className={cn(optionVariants())}
              href={item.href}
              key={item.href}
              rel="noreferrer noopener"
              target="_blank"
            >
              {item.icon}
              {item.title}
              <ExternalLinkIcon className="ms-auto size-3.5 text-fd-muted-foreground" />
            </a>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
