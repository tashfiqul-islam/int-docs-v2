#!/usr/bin/env bun
/**
 * Generate static LLM content files for all documentation pages
 * These files are placed in public/llms.mdx/ and can be accessed as static files
 * even in static export mode.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { getLLMText } from "../lib/get-llm-text";
import { apiReferencesSource, source } from "../lib/source";

const LEADING_SLASH_REGEX = /^\//;

async function generateLLMFiles() {
  console.log("🚀 Generating static LLM content files...\n");

  let generatedCount = 0;
  let errorCount = 0;

  // Generate files for docs pages
  const docsPages = source.getPages();
  console.log(`📚 Processing ${docsPages.length} docs pages...`);

  for (const page of docsPages) {
    try {
      const content = await getLLMText(page);
      // Create path: public/docs/getting-started/introduction.mdx
      // URL: /docs/getting-started/introduction.mdx -> served as static file
      const relativePath = page.url.replace(LEADING_SLASH_REGEX, "");
      const filePath = join(process.cwd(), "public", `${relativePath}.mdx`);
      const fileDir = dirname(filePath);

      await mkdir(fileDir, { recursive: true });
      await writeFile(filePath, content, "utf-8");
      generatedCount += 1;
    } catch (error) {
      console.error(`❌ Error generating ${page.url}:`, error);
      errorCount += 1;
    }
  }

  // Generate files for API reference pages
  const apiPages = apiReferencesSource.getPages();
  console.log(`🔌 Processing ${apiPages.length} API reference pages...`);

  for (const page of apiPages) {
    try {
      const content = await getLLMText(page);
      // Create path: public/api-references/rest-api/v2/index.mdx
      // URL: /api-references/rest-api/v2/index.mdx -> served as static file
      const relativePath = page.url.replace(LEADING_SLASH_REGEX, "");
      const filePath = join(process.cwd(), "public", `${relativePath}.mdx`);
      const fileDir = dirname(filePath);

      await mkdir(fileDir, { recursive: true });
      await writeFile(filePath, content, "utf-8");
      generatedCount += 1;
    } catch (error) {
      console.error(`❌ Error generating ${page.url}:`, error);
      errorCount += 1;
    }
  }

  console.log(`\n✅ Generated ${generatedCount} LLM content files`);
  if (errorCount > 0) {
    console.log(`⚠️  ${errorCount} errors occurred`);
  }
  console.log(
    "📁 Files generated to public/docs/ and public/api-references/\n"
  );
}

generateLLMFiles().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
