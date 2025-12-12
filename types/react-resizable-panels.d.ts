declare module "react-resizable-panels" {
  import type * as React from "react";

  export const PanelGroup: React.ComponentType<{
    children?: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }>;

  export const Panel: React.ComponentType<{
    children?: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }>;

  export const PanelResizeHandle: React.ComponentType<{
    children?: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }>;
}
