import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { ExternalLinkIcon } from "lucide-react";
import { ThemeLogo } from "~/components/theme-logo";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2.5">
          <ThemeLogo className="h-6 w-auto" />
          <span className="font-semibold text-base">Developer Platform</span>
        </div>
      ),
    },
    links: [
      {
        text: "Documentation",
        url: "/docs/getting-started/introduction",
        active: "nested-url",
        on: "nav", // Only show in navbar, not sidebar
      },
      {
        text: "API References",
        url: "/api-references/rest-api/v2",
        on: "nav", // Only show in navbar, not sidebar
      },
      {
        text: (
          <span className="inline-flex items-center gap-1.5">
            Dev Portal
            <ExternalLinkIcon className="size-3.5" />
          </span>
        ),
        url: "https://fieldnation.com",
        external: true,
        on: "nav", // Only show in navbar, not sidebar
      },
      {
        text: "For LLMs",
        type: "menu",
        on: "nav", // Only show in navbar, not sidebar
        items: [
          {
            text: "llms.txt",
            url: "/llms/llms.txt",
            description: "Outline of the documentation",
            external: true,
          },
          {
            text: "llms-full.txt",
            url: "/llms/llms-full.txt",
            description: "Full text of the documentation",
            external: true,
          },
        ],
      },
    ],
  };
}
