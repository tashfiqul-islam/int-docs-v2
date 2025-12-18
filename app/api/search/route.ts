import { createSearchAPI } from "fumadocs-core/search/server";
import { apiReferencesSource, source } from "@/lib/source";

export const revalidate = false;

export const { staticGET: GET } = createSearchAPI("advanced", {
  indexes: [
    ...source.getPages().map((page) => {
      // biome-ignore lint/suspicious/noExplicitAny: StructuredData type is not exported by fumadocs-core
      const data = page.data as any;
      return {
        title: data.title || "Untitled",
        description: data.description || "",
        url: page.url,
        id: page.url,
        structuredData: data.structuredData,
        tag: "doc",
      };
    }),
    ...apiReferencesSource.getPages().map((page) => {
      // biome-ignore lint/suspicious/noExplicitAny: StructuredData type is not exported by fumadocs-core
      const data = page.data as any;
      return {
        title: data.title || "Untitled",
        description: data.description || "",
        url: page.url,
        id: page.url,
        structuredData: data.structuredData,
        tag: "api",
      };
    }),
  ],
  language: "english",
});
