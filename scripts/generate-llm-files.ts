#!/usr/bin/env bun
/**
 * Generate static LLM content files for all documentation pages
 * These files are placed in public/llms.mdx/ and can be accessed as static files
 * even in static export mode.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type {
  Node as PageTreeNode,
  Root as PageTreeRoot,
} from "fumadocs-core/page-tree";
import { getLLMText } from "../lib/get-llm-text";
import { apiReferencesSource, source } from "../lib/source";

const LEADING_SLASH_REGEX = /^\//;

/**
 * Extract URL->Name mapping from pageTree recursively
 * The pageTree contains the actual page names from frontmatter
 */
function buildNameMap(tree: PageTreeRoot): Map<string, string> {
  const map = new Map<string, string>();

  function traverse(node: PageTreeNode) {
    if (node.type === "page" && node.url && node.name) {
      map.set(node.url, String(node.name));
    } else if (node.type === "folder") {
      if (node.index?.url && node.name) {
        map.set(node.index.url, String(node.name));
      }
      for (const child of node.children) {
        traverse(child);
      }
    }
  }

  for (const child of tree.children) {
    traverse(child);
  }

  return map;
}

// Build name maps from both pageTrees
const docsNameMap = buildNameMap(source.pageTree);
const apiNameMap = buildNameMap(apiReferencesSource.pageTree);

// Get page name from map, fallback to URL-based title
function getPageName(url: string, map: Map<string, string>): string {
  const name = map.get(url);
  if (name) {
    return name;
  }

  // Fallback: extract name from URL slug
  const segments = url.split("/").filter(Boolean);
  const lastSegment = segments.at(-1) ?? "page";
  return lastSegment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildOutline(): string {
  const docs = source.getPages();
  const api = apiReferencesSource.getPages();

  const DOC_CATEGORY_LABELS: Record<string, string> = {
    "getting-started": "Getting Started",
    "rest-api": "REST API",
    webhooks: "Webhooks",
    connectors: "Connectors",
    resources: "Resources",
  };

  const API_CATEGORY_LABELS: Record<string, string> = {
    "rest-api": "REST API",
    webhooks: "Webhooks",
  };

  const DOC_ORDER = [
    "getting-started",
    "rest-api",
    "webhooks",
    "connectors",
    "resources",
  ] as const;

  const API_ORDER = ["rest-api", "webhooks"] as const;

  function formatPages(
    title: string,
    pages: typeof docs,
    nameMap: Map<string, string>
  ): string {
    if (pages.length === 0) {
      return "";
    }
    const sorted = [...pages].sort((a, b) => {
      const nameA = getPageName(a.url, nameMap);
      const nameB = getPageName(b.url, nameMap);
      return nameA.localeCompare(nameB);
    });
    const items = sorted.map(
      (page) => `- ${getPageName(page.url, nameMap)} — ${page.url}`
    );
    return [`### ${title}`, ...items, ""].join("\n");
  }

  function groupByCategory(pages: typeof docs): Record<string, typeof docs> {
    const grouped: Record<string, typeof docs> = {};
    for (const page of pages) {
      const key = page.slugs?.[0] ?? "other";
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(page);
    }
    return grouped;
  }

  function orderedEntries<T extends string>(
    grouped: Record<string, typeof docs>,
    order: readonly T[]
  ): [string, typeof docs][] {
    const result: [string, typeof docs][] = [];
    for (const key of order) {
      if (grouped[key]) {
        result.push([key, grouped[key]]);
      }
    }
    for (const [key, pages] of Object.entries(grouped)) {
      if (!order.includes(key as T)) {
        result.push([key, pages]);
      }
    }
    return result;
  }

  const docsGrouped = groupByCategory(docs);
  const apiGrouped = groupByCategory(api);

  const lines: string[] = [
    "# Field Nation Integrations Documentation Outline",
    "",
  ];

  lines.push("## Documentation", "");
  for (const [key, pages] of orderedEntries(docsGrouped, DOC_ORDER)) {
    const label = DOC_CATEGORY_LABELS[key] ?? key;
    const block = formatPages(label, pages, docsNameMap);
    if (block) {
      lines.push(block);
    }
  }

  lines.push("## API References", "");
  for (const [key, pages] of orderedEntries(apiGrouped, API_ORDER)) {
    const label = API_CATEGORY_LABELS[key] ?? key;
    const block = formatPages(label, pages, apiNameMap);
    if (block) {
      lines.push(block);
    }
  }

  return lines.join("\n").trimEnd();
}

async function buildFull(): Promise<string> {
  const docs = source.getPages();
  const api = apiReferencesSource.getPages();

  const DOC_CATEGORY_LABELS: Record<string, string> = {
    "getting-started": "Getting Started",
    "rest-api": "REST API",
    webhooks: "Webhooks",
    connectors: "Connectors",
    resources: "Resources",
  };

  const API_CATEGORY_LABELS: Record<string, string> = {
    "rest-api": "REST API",
    webhooks: "Webhooks",
  };

  const DOC_ORDER = [
    "getting-started",
    "rest-api",
    "webhooks",
    "connectors",
    "resources",
  ] as const;

  const API_ORDER = ["rest-api", "webhooks"] as const;

  function groupByCategory(pages: typeof docs): Record<string, typeof docs> {
    const grouped: Record<string, typeof docs> = {};
    for (const page of pages) {
      const key = page.slugs?.[0] ?? "other";
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(page);
    }
    return grouped;
  }

  function orderedEntries<T extends string>(
    grouped: Record<string, typeof docs>,
    order: readonly T[]
  ): [string, typeof docs][] {
    const result: [string, typeof docs][] = [];
    for (const key of order) {
      if (grouped[key]) {
        result.push([key, grouped[key]]);
      }
    }
    for (const [key, pages] of Object.entries(grouped)) {
      if (!order.includes(key as T)) {
        result.push([key, pages]);
      }
    }
    return result;
  }

  const docsGrouped = groupByCategory(docs);
  const apiGrouped = groupByCategory(api);

  const lines: string[] = [
    "# Field Nation Integrations — Full Text",
    "",
    "## Table of Contents",
  ];

  const docToc: string[] = [];
  for (const [key, pages] of orderedEntries(docsGrouped, DOC_ORDER)) {
    const label = DOC_CATEGORY_LABELS[key] ?? key;
    docToc.push(`- ${label} (${pages.length})`);
  }
  const apiToc: string[] = [];
  for (const [key, pages] of orderedEntries(apiGrouped, API_ORDER)) {
    const label = API_CATEGORY_LABELS[key] ?? key;
    apiToc.push(`- ${label} (${pages.length})`);
  }

  if (docToc.length) {
    lines.push("", "### Documentation", ...docToc);
  }
  if (apiToc.length) {
    lines.push("", "### API References", ...apiToc);
  }

  lines.push("");

  // Docs content
  lines.push("## Documentation", "");
  for (const [key, pages] of orderedEntries(docsGrouped, DOC_ORDER)) {
    const label = DOC_CATEGORY_LABELS[key] ?? key;
    lines.push(`## ${label} (${pages.length})`, "");
    for (const page of pages) {
      lines.push(
        `### ${getPageName(page.url, docsNameMap)}`,
        `URL: ${page.url}`,
        ""
      );
      lines.push(
        await getLLMText(page, { title: getPageName(page.url, docsNameMap) }),
        "",
        "---",
        ""
      );
    }
  }

  // API content
  lines.push("## API References", "");
  for (const [key, pages] of orderedEntries(apiGrouped, API_ORDER)) {
    const label = API_CATEGORY_LABELS[key] ?? key;
    lines.push(`## ${label} (${pages.length})`, "");
    for (const page of pages) {
      lines.push(
        `### ${getPageName(page.url, apiNameMap)}`,
        `URL: ${page.url}`,
        ""
      );
      lines.push(
        await getLLMText(page, { title: getPageName(page.url, apiNameMap) }),
        "",
        "---",
        ""
      );
    }
  }

  return lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd();
}

async function generateLLMFiles() {
  console.log("🚀 Generating static LLM content files...\n");

  let generatedCount = 0;
  let errorCount = 0;

  // Generate root /llms/llms.txt and /llms/llms-full.txt files for static export
  // These are needed because route handlers with optional catch-all cause conflicts
  try {
    const outlineContent = buildOutline();
    const llmsDir = join(process.cwd(), "public", "llms");
    await mkdir(llmsDir, { recursive: true });
    const outlinePath = join(llmsDir, "llms.txt");
    await writeFile(outlinePath, outlineContent, "utf-8");
    generatedCount += 1;
    console.log("✅ Generated /llms/llms.txt");
  } catch (error) {
    console.error("❌ Error generating /llms/llms.txt:", error);
    errorCount += 1;
  }

  try {
    const fullContent = await buildFull();
    const fullPath = join(process.cwd(), "public", "llms", "llms-full.txt");
    await mkdir(dirname(fullPath), { recursive: true });
    await writeFile(fullPath, fullContent, "utf-8");
    generatedCount += 1;
    console.log("✅ Generated /llms/llms-full.txt");
  } catch (error) {
    console.error("❌ Error generating /llms/llms-full.txt:", error);
    errorCount += 1;
  }

  // Generate files for docs pages
  const docsPages = source.getPages();
  console.log(`📚 Processing ${docsPages.length} docs pages...`);

  for (const page of docsPages) {
    try {
      const content = await getLLMText(page, {
        title: getPageName(page.url, docsNameMap),
      });
      // Create path: public/llms/docs/getting-started/introduction.txt
      // URL: /llms/docs/getting-started/introduction.txt -> served as static file
      // This matches what LLMActions component expects: /llms${page.url}.txt
      const relativePath = page.url.replace(LEADING_SLASH_REGEX, "");
      const filePath = join(
        process.cwd(),
        "public",
        "llms",
        `${relativePath}.txt`
      );
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
      const content = await getLLMText(page, {
        title: getPageName(page.url, apiNameMap),
      });
      // Create path: public/llms/api-references/rest-api/v2/index.txt
      // URL: /llms/api-references/rest-api/v2/index.txt -> served as static file
      // This matches what LLMActions component expects: /llms${page.url}.txt
      const relativePath = page.url.replace(LEADING_SLASH_REGEX, "");
      const filePath = join(
        process.cwd(),
        "public",
        "llms",
        `${relativePath}.txt`
      );
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
    "📁 Files generated to public/llms/docs/ and public/llms/api-references/\n"
  );
}

generateLLMFiles().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
