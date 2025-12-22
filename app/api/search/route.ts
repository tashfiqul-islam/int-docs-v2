import type { StructuredData } from "fumadocs-core/mdx-plugins";
import { createSearchAPI } from "fumadocs-core/search/server";
import { apiReferencesSource, source } from "@/lib/source";

export const revalidate = false;

interface PageDataWithStructuredData {
  title?: string;
  description?: string;
  structuredData: StructuredData;
}

/** Search API endpoint combining docs and API reference indexes */
export const { staticGET: GET } = createSearchAPI("advanced", {
  indexes: [
    ...source.getPages().map((page) => ({
      title: page.data.title || "",
      description: page.data.description || "",
      url: page.url,
      id: page.url,
      structuredData: (page.data as unknown as PageDataWithStructuredData)
        .structuredData,
      tag: "doc",
    })),
    ...apiReferencesSource.getPages().map((page) => ({
      title: page.data.title || "",
      description: page.data.description || "",
      url: page.url,
      id: page.url,
      structuredData: (page.data as unknown as PageDataWithStructuredData)
        .structuredData,
      tag: "api",
    })),
  ],
});
