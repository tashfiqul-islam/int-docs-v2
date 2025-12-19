import { lstat, readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { generateFiles } from "fumadocs-openapi";
import { openapi } from "../lib/openapi";

// Helper function to sanitize strings for file system
function sanitizeForFileSystem(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// Helper function to ensure forward slashes in paths, including encoded ones
function normalizePath(p: string): string {
  return p.replace(/\\/g, "/").replace(/%5C/g, "/");
}

// Helper to clean and normalize a single href
function resolveRelativePath(href: string): string {
  // Normalize backslashes and encoded backslashes
  let normalized = normalizePath(href);

  // Fix the redundant /api-references/../../api-references pattern
  // This happens because of how fumadocs calculates relative paths on Windows
  if (normalized.includes("/../")) {
    const parts = normalized.split("/");
    const cleanParts: string[] = [];
    for (const part of parts) {
      if (part === "..") {
        cleanParts.pop();
      } else if (part !== "." && part !== "") {
        cleanParts.push(part);
      }
    }
    normalized = `/${cleanParts.join("/")}`;
  }
  return normalized;
}

// Recursive function to walk directory and fix backslashes in MDX files
async function fixBackslashes(dir: string) {
  const files = await readdir(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = await lstat(fullPath);
    if (stat.isDirectory()) {
      await fixBackslashes(fullPath);
    } else if (file.endsWith(".mdx")) {
      const content = await readFile(fullPath, "utf8");
      if (
        content.includes("\\") ||
        content.includes("%5C") ||
        content.includes("/..")
      ) {
        const fixedContent = content.replace(
          /href="([^"]+)"/g,
          (_match, href) => `href="${resolveRelativePath(href)}"`
        );
        if (fixedContent !== content) {
          await writeFile(fullPath, fixedContent);
          console.log(`✅ Fixed paths in ${relative(process.cwd(), fullPath)}`);
        }
      }
    }
  }
}

// Helper function to determine API type from schema ID and path
function determineApiType(schemaId: string, path: string): "rest" | "webhook" {
  if (
    schemaId.includes("rest") ||
    schemaId.includes("v2") ||
    path.includes("/rest/")
  ) {
    return "rest";
  }
  if (
    schemaId.includes("webhook") ||
    schemaId.includes("v3") ||
    path.includes("/webhook")
  ) {
    return "webhook";
  }
  return "rest"; // Default to REST
}

// Helper function to get operation ID from operation item
function getOperationId(
  operationId: string | undefined,
  path: string,
  method: string
): string {
  if (operationId && operationId !== path) {
    return sanitizeForFileSystem(operationId);
  }
  // Derive from path: /api/rest/v2/workorders -> workorders
  const pathParts = path.split("/").filter(Boolean);
  const lastPart = pathParts.at(-1) ?? "endpoint";
  const sanitized = sanitizeForFileSystem(lastPart);
  return `${sanitized}-${method.toLowerCase()}`;
}

// Helper function to clean tag name by removing prefixes
function cleanTagName(tag: string, apiType: "rest" | "webhook"): string {
  // Remove "work-orders." prefix for REST API
  if (apiType === "rest" && tag.startsWith("work-orders.")) {
    return tag.replace("work-orders.", "");
  }
  // Remove "webhooks." prefix for Webhooks
  if (apiType === "webhook" && tag.startsWith("webhooks.")) {
    return tag.replace("webhooks.", "");
  }
  return tag;
}

// Helper function to generate file path for operation
function generateOperationPath(
  schemaId: string,
  operationItem: {
    path: string;
    method: string;
    tag: string;
    operationId?: string;
  }
): string {
  const apiType = determineApiType(schemaId, operationItem.path);
  const cleanedTag = cleanTagName(operationItem.tag, apiType);
  const sanitizedTag = sanitizeForFileSystem(cleanedTag);
  const sanitizedOpId = getOperationId(
    operationItem.operationId,
    operationItem.path,
    operationItem.method
  );

  const basePath =
    apiType === "rest"
      ? `api-references/rest-api/v2/${sanitizedTag}`
      : `api-references/webhooks/v3/${sanitizedTag}`;

  return `${basePath}/${sanitizedOpId}`;
}

async function main() {
  await generateFiles({
    input: openapi,
    output: "./content",
    // Generate one file per operation
    per: "operation",
    // Don't use groupBy - we'll handle folder structure in name function
    groupBy: "none",
    // Custom name function to organize files by API type and version
    name: (output) => {
      if (output.type !== "operation") {
        // Handle webhook output
        if ("name" in output.item) {
          return `api-references/webhooks/v3/${sanitizeForFileSystem(output.item.name)}`;
        }
        return "api";
      }

      // output.item is OperationItem for operations
      const operationItem = output.item as {
        path: string;
        method: string;
        tags?: string[];
        operationId?: string;
      };

      const tag = operationItem.tags?.[0] ?? "api";

      return generateOperationPath(output.schemaId, {
        path: operationItem.path,
        method: operationItem.method,
        tag,
        operationId: operationItem.operationId,
      });
    },
    // Include descriptions in generated files
    includeDescription: true,
    // Add generated comment
    addGeneratedComment: true,
    // Generate index pages for REST API and Webhooks
    index: {
      url: {
        baseUrl: "/api-references",
        contentDir: "content/api-references",
      },
      items: [
        {
          path: "api-references/rest-api/v2/index.mdx",
          only: ["./openapi/rest/v2/openapi.yaml"],
          description:
            "Complete REST API v2 reference with interactive playground",
        },
        {
          path: "api-references/webhooks/v3/index.mdx",
          only: ["./openapi/webhooks/v3/openapi.yaml"],
          description:
            "Complete Webhooks v3 reference with interactive playground",
        },
      ],
    },
  });

  // Post-process to fix Windows backslashes in generated links
  console.log("🛠️ Normalizing paths in generated files...");
  await fixBackslashes(join(process.cwd(), "content/api-references"));
  console.log("✅ Done!");
}

main().catch(console.error);
