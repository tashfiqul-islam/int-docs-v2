import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import VersionSwitcher from "~/components/ui/version-switcher";

export default function Layout({ children }: { children: ReactNode }) {
  const base = baseOptions();
  return (
    <DocsLayout
      nav={base.nav}
      sidebar={{
        footer: <VersionSwitcher />,
      }}
      tree={source.pageTree}
    >
      {children}
    </DocsLayout>
  );
}
