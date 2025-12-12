import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

// Statically cached for static site generation (GitHub Actions)
export const revalidate = false;

export const { staticGET: GET } = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: "english",
});
