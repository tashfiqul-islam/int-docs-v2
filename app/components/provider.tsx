"use client";

import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import SearchDialog from "@/app/components/ui/search";

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{ SearchDialog }}
      theme={{
        attribute: "class",
        defaultTheme: "system",
        enableSystem: true,
        storageKey: "theme",
      }}
    >
      {children}
    </RootProvider>
  );
}
