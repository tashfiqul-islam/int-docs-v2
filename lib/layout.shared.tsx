import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { ThemeLogo } from "~/components/theme-logo";
import { MobileMenuTrigger } from "~/components/ui/mobile-menu-trigger";
import CustomNavBar from "~/components/ui/nav-bar";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2.5">
          <ThemeLogo className="h-8 w-auto" />
          <span className="font-semibold text-base">Developer Platform</span>
        </div>
      ),
      children: <MobileMenuTrigger />,
    },
    links: [
      {
        type: "custom",
        children: (
          <div className="flex items-center" key="custom-nav">
            <CustomNavBar />
          </div>
        ),
      },
    ],
  };
}
