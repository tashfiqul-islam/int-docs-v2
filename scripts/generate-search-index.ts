#!/usr/bin/env bun
/**
 * Generate static search index for Orama
 * This file is executed during build to create public/search-index.json
 */

import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { create, insert, save } from "@orama/orama";
import { apiReferencesSource, source } from "../lib/source";

async function generateSearchIndex() {
  console.log("🔍 Generating static search index for Orama...");

  // Define schema matching what standard Fumadocs search likely expects
  // or at least what is useful.
  const db = await create({
    schema: {
      id: "string",
      title: "string",
      description: "string",
      content: "string",
      url: "string",
      type: "string", // 'page' | 'heading'
      section: "string",
    },
  });

  // Define minimal interface to satisfy linting without importing internal types
  type PageDataWithToc = {
    toc?: { url: string; title: string; depth: number }[];
    title: string;
    description?: string;
  };

  const docsPages = source.getPages();
  const apiPages = apiReferencesSource.getPages();
  const allPages = [...docsPages, ...apiPages];

  let count = 0;

  for (const page of allPages) {
    const section = page.url.startsWith("/docs")
      ? "Documentation"
      : "API Reference";

    // Index the page itself
    await insert(db, {
      id: page.url,
      title: page.data.title,
      description: page.data.description || "",
      content: page.data.description || "", // Use description as content for basic search
      url: page.url,
      type: "page",
      section,
    });
    count += 1;

    // Index headings from Table of Contents
    const toc = (page.data as unknown as PageDataWithToc).toc || [];
    for (const item of toc) {
      if (item.depth <= 3) {
        // Index h2 and h3
        await insert(db, {
          id: `${page.url}#${item.url}`, // Create unique hash ID
          title: item.title,
          description: "",
          content: item.title,
          url: `${page.url}#${item.url}`,
          type: "heading",
          section,
        });
        count += 1;
      }
    }
  }

  const index = await save(db);
  const outputPath = join(process.cwd(), "public", "search-index.json");

  await writeFile(outputPath, JSON.stringify(index), "utf-8");

  console.log(`✅ Generated search index with ${count} entries`);
  console.log(`📁 Saved to ${outputPath}`);
}

generateSearchIndex().catch((error) => {
  console.error("❌ Error generating search index:", error);
  process.exit(1);
});
