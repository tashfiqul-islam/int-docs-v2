import type { InferPageType } from "fumadocs-core/source";
import type { apiReferencesSource, source } from "@/lib/source";

type Page =
  | InferPageType<typeof source>
  | InferPageType<typeof apiReferencesSource>;

// Get source URL - use GitHub URL if available, otherwise use local file path
function getSourceUrl(page: Page): string {
  const isApiRef = page.url.startsWith("/api-references");
  const contentRoot = isApiRef ? "content/api-references" : "content/docs";

  // You can set these via environment variables when deploying:
  // GITHUB_REPO=your-username/your-repo
  // GITHUB_BRANCH=main (optional, defaults to 'main')
  const githubRepo = process.env.GITHUB_REPO;
  const githubBranch = process.env.GITHUB_BRANCH || "main";

  if (githubRepo) {
    return `https://raw.githubusercontent.com/${githubRepo}/${githubBranch}/${contentRoot}/${page.path}`;
  }

  // For local development, return relative path from project root
  return `${contentRoot}/${page.path}`;
}

/**
 * Strips MDX/HTML components from markdown, converting them to plain markdown
 * Preserves code blocks to avoid removing JSX/HTML from code examples
 */
// Regex patterns for code block matching
const CODE_BLOCK_PLACEHOLDER_REGEX = /__CODE_BLOCK_\d+__/g;

function stripMDXComponents(text: string): string {
  // First, extract and preserve code blocks
  const codeBlocks: string[] = [];
  const codeBlockRegex = /```[\s\S]*?```/g;
  let match: RegExpExecArray | null = null;

  // Extract all code blocks
  // biome-ignore lint/suspicious/noAssignInExpressions: Required for regex.exec pattern
  while ((match = codeBlockRegex.exec(text)) !== null) {
    codeBlocks.push(match[0]);
  }

  // Replace code blocks with placeholders
  let codeBlockIndex = 0;
  const textWithPlaceholders = text.replace(/```[\s\S]*?```/g, () => {
    const placeholder = `__CODE_BLOCK_${codeBlockIndex}__`;
    codeBlockIndex += 1;
    return placeholder;
  });

  // Now strip MDX components from the text (code blocks are safe)
  let cleaned = textWithPlaceholders
    // Convert Callout to blockquote
    .replace(
      /<Callout[^>]*type="([^"]*)"[^>]*>([\s\S]*?)<\/Callout>/gi,
      (_, type, content) => {
        const cleanContent = content.replace(/<[^>]+>/g, "").trim();
        // Use text prefixes instead of emojis for better compatibility
        let prefix = "";
        if (type === "warning") {
          prefix = "[WARNING] ";
        } else if (type === "error") {
          prefix = "[ERROR] ";
        } else if (type === "info") {
          prefix = "[INFO] ";
        }
        return cleanContent ? `> ${prefix}${cleanContent}` : "";
      }
    )
    .replace(/<Callout[^>]*>([\s\S]*?)<\/Callout>/gi, (_, content) => {
      const cleanContent = content.replace(/<[^>]+>/g, "").trim();
      return cleanContent ? `> ${cleanContent}` : "";
    })
    // Handle CodeBlockTabs - extract the default/first tab's code block
    .replace(
      /<CodeBlockTabs[^>]*defaultValue="([^"]*)"[^>]*>[\s\S]*?<CodeBlockTab[^>]*value="\1"[^>]*>([\s\S]*?)<\/CodeBlockTab>[\s\S]*?<\/CodeBlockTabs>/gi,
      (_, _defaultValue, content) => {
        // Look for code block in the tab content
        const codeMatch = content.match(CODE_BLOCK_PLACEHOLDER_REGEX);
        return codeMatch ? codeMatch[0] : "";
      }
    )
    // Fallback: extract first code block from any tab
    .replace(
      /<CodeBlockTabs[^>]*>[\s\S]*?<CodeBlockTab[^>]*>([\s\S]*?)<\/CodeBlockTab>[\s\S]*?<\/CodeBlockTabs>/gi,
      (_, content) => {
        const codeMatch = content.match(CODE_BLOCK_PLACEHOLDER_REGEX);
        return codeMatch ? codeMatch[0] : "";
      }
    )
    // Remove remaining CodeBlockTabs components
    .replace(/<CodeBlockTabs[^>]*>[\s\S]*?<\/CodeBlockTabs>/gi, "")
    .replace(/<CodeBlockTabsList[^>]*>[\s\S]*?<\/CodeBlockTabsList>/gi, "")
    .replace(
      /<CodeBlockTabsTrigger[^>]*>([\s\S]*?)<\/CodeBlockTabsTrigger>/gi,
      ""
    )
    .replace(
      /<CodeBlockTab[^>]*>([\s\S]*?)<\/CodeBlockTab>/gi,
      (_, content) => {
        const codeMatch = content.match(CODE_BLOCK_PLACEHOLDER_REGEX);
        return codeMatch ? codeMatch[0] : "";
      }
    )
    // Remove any remaining HTML/MDX tags (but not our placeholders)
    .replace(/<(?![_])[^>]+>/g, "")
    // Normalize multiple newlines
    .replace(/\n{3,}/g, "\n\n");

  // Restore code blocks
  codeBlocks.forEach((codeBlock, index) => {
    cleaned = cleaned.replace(`__CODE_BLOCK_${index}__`, codeBlock);
  });

  return cleaned.trim();
}

export async function getLLMText(
  page: Page,
  options?: { title?: string; description?: string }
) {
  const firstSlug = page.slugs?.[0] ?? "";
  const isApiRef = page.url.startsWith("/api-references");
  const categoryMap = {
    "getting-started": "Getting Started",
    "rest-api": "REST API",
    webhooks: "Webhooks",
    connectors: "Connectors",
    resources: "Resources",
  } as Record<string, string>;
  const category = isApiRef
    ? "API References"
    : (categoryMap[firstSlug] ?? firstSlug ?? "Documentation");

  // Try to get processed markdown, fallback to raw if not available
  let processed: string;
  try {
    const dataWithGetText = page.data as {
      getText: (type: string) => Promise<string>;
    };
    processed = await dataWithGetText.getText("processed");
  } catch {
    // Fallback to raw markdown if processed is not available (e.g., in build scripts)
    const dataWithGetText = page.data as {
      getText: (type: string) => Promise<string>;
    };
    processed = await dataWithGetText.getText("raw");
  }
  const sourceUrl = getSourceUrl(page);

  // Strip MDX components to get pure markdown for better LLM consumption
  const cleanMarkdown = stripMDXComponents(processed);

  // Use provided title/description or fall back to page.data (which may be undefined at build time)
  const title =
    options?.title ?? (page.data as { title?: string })?.title ?? "Untitled";
  const description =
    options?.description ??
    (page.data as { description?: string })?.description ??
    "";

  return `# ${category}: ${title}
URL: ${page.url}
Source: ${sourceUrl}

${description}

${cleanMarkdown}`;
}
