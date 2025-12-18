import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { ThemeLogo } from "~/components/theme-logo";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2.5">
          <ThemeLogo className="h-8 w-auto" />
          <span className="font-semibold text-base">Developer Platform</span>
        </div>
      ),
    },
    links: [
      {
        text: "Documentation",
        url: "/docs/getting-started/introduction",
        active: "nested-url",
        on: "nav",
      },
      {
        text: "API References",
        url: "/api-references/rest-api/v2",
        on: "nav",
      },
      {
        text: (
          <span className="flex items-center gap-1">
            Resources
            <ChevronDown className="size-3 transition-transform duration-300 group-data-[state=open]:rotate-180" />
          </span>
        ),
        type: "menu",
        items: [
          {
            text: (
              <span className="inline-flex items-center gap-1.5">
                Blog
                <ArrowUpRight className="size-3.5" />
              </span>
            ),
            url: "https://fieldnation.com/resource-library?s=&fldn_content_type=6&fldn_content_category=&fldn_work_type=",
            description: "Announcements & Updates",
            external: true,
          },
          {
            text: (
              <span className="flex items-center gap-2">
                Dev Portal
                <span className="whitespace-nowrap rounded-full border border-fd-primary/30 bg-fd-primary/10 px-1.5 py-0.5 font-medium text-[10px] text-fd-primary leading-none">
                  Coming Soon
                </span>
              </span>
            ),
            url: "#",
            description: "Main Developer Hub",
          },
        ],
      },
      {
        text: (
          <span className="flex items-center gap-1">
            For LLMs
            <ChevronDown className="size-3 transition-transform duration-300 group-data-[state=open]:rotate-180" />
          </span>
        ),
        type: "menu",
        items: [
          {
            text: (
              <span className="inline-flex items-center gap-1.5">
                llms.txt
                <ArrowUpRight className="size-3.5" />
              </span>
            ),
            url: "/llms/llms.txt",
            description: "Outline of the documentation",
            external: true,
          },
          {
            text: (
              <span className="inline-flex items-center gap-1.5">
                llms-full.txt
                <ArrowUpRight className="size-3.5" />
              </span>
            ),
            url: "/llms/llms-full.txt",
            description: "Full text of the documentation",
            external: true,
          },
        ],
      },
    ],
  };
}
