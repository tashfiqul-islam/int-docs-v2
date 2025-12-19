import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import CustomNavBar from "@/app/components/ui/nav-bar";
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
        type: "custom",
        children: <CustomNavBar />,
      },
    ],
  };
}
