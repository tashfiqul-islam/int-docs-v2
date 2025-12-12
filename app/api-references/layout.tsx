import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";
import { apiReferencesSource } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  const base = baseOptions();
  return (
    <DocsLayout nav={base.nav} tree={apiReferencesSource.pageTree}>
      {children}
    </DocsLayout>
  );
}
