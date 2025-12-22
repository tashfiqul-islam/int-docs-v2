import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { ConnectedThemeSwitcher } from "@/app/components/ui/connected-theme-switcher";
import VersionSwitcher from "@/app/components/ui/version-switcher";
import { baseOptions } from "@/lib/layout.shared";
import { apiReferencesSource, getAvailableVersions } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  const base = baseOptions();
  const versions = getAvailableVersions();

  return (
    <DocsLayout
      nav={base.nav}
      sidebar={{
        prefetch: false,
        footer: (
          <div className="flex w-full items-center">
            <VersionSwitcher availableVersions={versions} />
            <div className="ml-auto">
              <ConnectedThemeSwitcher />
            </div>
          </div>
        ),
      }}
      tree={apiReferencesSource.pageTree}
    >
      {children}
    </DocsLayout>
  );
}
