import type { InferPageType } from "fumadocs-core/source";
import { notFound } from "next/navigation";
import { getLLMText } from "@/lib/get-llm-text";
import { apiReferencesSource, source } from "@/lib/source";

// Required for static export
export const dynamic = "force-static";
export const revalidate = false;

type DocPage = ReturnType<typeof source.getPages>[number];
type ApiPage = ReturnType<typeof apiReferencesSource.getPages>[number];
type AnyPage = DocPage | ApiPage;
type Page =
  | InferPageType<typeof source>
  | InferPageType<typeof apiReferencesSource>;

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

function formatPages(title: string, pages: AnyPage[]): string {
  if (pages.length === 0) {
    return "";
  }
  const sorted = [...pages].sort((a, b) => {
    const titleA = a.data.title ?? "";
    const titleB = b.data.title ?? "";
    return titleA.localeCompare(titleB);
  });
  const items = sorted.map(
    (page) => `- ${page.data.title ?? "Untitled"} — ${page.url}`
  );
  return [`### ${title}`, ...items, ""].join("\n");
}

function buildOutline(): string {
  const docs = source.getPages();
  const api = apiReferencesSource.getPages();

  const docsGrouped = groupByCategory(docs);
  const apiGrouped = groupByCategory(api);

  const lines: string[] = [
    "# Field Nation Integrations Documentation Outline",
    "",
  ];

  lines.push("## Documentation", "");
  for (const [key, pages] of orderedEntries(docsGrouped, DOC_ORDER)) {
    const label = DOC_CATEGORY_LABELS[key] ?? key;
    const block = formatPages(label, pages);
    if (block) {
      lines.push(block);
    }
  }

  lines.push("## API References", "");
  for (const [key, pages] of orderedEntries(apiGrouped, API_ORDER)) {
    const label = API_CATEGORY_LABELS[key] ?? key;
    const block = formatPages(label, pages);
    if (block) {
      lines.push(block);
    }
  }

  return lines.join("\n").trimEnd();
}

function groupByCategory(pages: AnyPage[]): Record<string, AnyPage[]> {
  const grouped: Record<string, AnyPage[]> = {};
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
  grouped: Record<string, AnyPage[]>,
  order: readonly T[]
): [string, AnyPage[]][] {
  const result: [string, AnyPage[]][] = [];
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

async function buildFull(): Promise<string> {
  const docs = source.getPages();
  const api = apiReferencesSource.getPages();
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
      lines.push(`### ${page.data.title}`, `URL: ${page.url}`, "");
      lines.push(await getLLMText(page), "", "---", "");
    }
  }

  // API content
  lines.push("## API References", "");
  for (const [key, pages] of orderedEntries(apiGrouped, API_ORDER)) {
    const label = API_CATEGORY_LABELS[key] ?? key;
    lines.push(`## ${label} (${pages.length})`, "");
    for (const page of pages) {
      lines.push(`### ${page.data.title}`, `URL: ${page.url}`, "");
      lines.push(await getLLMText(page), "", "---", "");
    }
  }

  return lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd();
}

async function buildSingle(slugs: string[]): Promise<string | null> {
  const isApi = slugs[0] === "api-references";
  const isDocs = slugs[0] === "docs";
  let withoutPrefix = slugs;
  if (isApi || isDocs) {
    withoutPrefix = slugs.slice(1);
  }
  const page: Page | undefined = isApi
    ? apiReferencesSource.getPage(withoutPrefix)
    : source.getPage(withoutPrefix);

  if (!page) {
    return null;
  }
  return await getLLMText(page);
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const resolved = await params;
  const slugs = stripTxtSuffix(resolved.slug ?? []);

  // Handle dummy param used for static export (should not be accessed)
  if (slugs.length === 1 && slugs[0] === "_static") {
    notFound();
  }

  // /llms -> outline
  if (slugs.length === 0 || (slugs.length === 1 && slugs[0] === "llms")) {
    const body = await buildOutline();
    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  // /llms/llms-full.txt
  if (slugs.length === 1 && slugs[0] === "llms-full") {
    const body = await buildFull();
    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  // /llms/docs/... or /llms/api-references/... -> per page
  const body = await buildSingle(slugs);
  if (!body) {
    notFound();
  }

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export function generateStaticParams() {
  const isStaticExport = process.env.NEXT_EXPORT === "true";

  // For static export, Next.js requires at least one param from generateStaticParams()
  // However, route handlers with optional catch-all [[...slug]] cause directory/file conflicts.
  // The static files generated by the script in public/ will be served instead.
  // Return minimal params to satisfy Next.js requirement, but these won't conflict
  // because static files take precedence.
  if (isStaticExport) {
    // Return a single dummy param to satisfy Next.js requirement
    // The actual routes are handled by static files in public/
    return [{ slug: ["_static"] }];
  }

  // For non-static mode (dev/prod with server), generate params for route handler
  const params: { slug?: string[] }[] = [
    { slug: [] }, // Root /llms
    { slug: ["llms-full"] }, // /llms/llms-full
  ];

  // Generate params for all pages in non-static mode
  const docsPages = source.getPages();
  for (const page of docsPages) {
    const urlParts = page.url.split("/").filter(Boolean);
    if (urlParts.length > 0 && urlParts[0] === "docs") {
      params.push({ slug: urlParts });
    }
  }

  const apiPages = apiReferencesSource.getPages();
  for (const page of apiPages) {
    const urlParts = page.url.split("/").filter(Boolean);
    if (urlParts.length > 0 && urlParts[0] === "api-references") {
      params.push({ slug: urlParts });
    }
  }

  return params;
}

function stripTxtSuffix(slugs: string[]): string[] {
  if (slugs.length === 0) {
    return slugs;
  }
  const copy = [...slugs];
  const last = copy.at(-1);
  if (last?.endsWith(".txt")) {
    copy[copy.length - 1] = last.slice(0, -4);
  }
  return copy;
}
