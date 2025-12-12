import { apiReferences, docs } from "fumadocs-mdx:collections/server";
import { type InferPageType, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { openapiPlugin } from "fumadocs-openapi/server";
import { icons } from "lucide-react";
import { createElement } from "react";

// Regex for detecting emoji icons (Unicode emoji range)
const EMOJI_REGEX = /^[\u{1F300}-\u{1F9FF}]/u;

// Shared icon resolver function that can be used by both loader and components
export function resolveIcon(icon: string | undefined): React.ReactNode {
  if (!icon) {
    return;
  }

  // Handle emoji icons - return them as-is
  if (EMOJI_REGEX.test(icon)) {
    return icon;
  }

  // Handle Lucide icon names - use the icons object from lucide-react
  if (icon in icons) {
    return createElement(icons[icon as keyof typeof icons]);
  }

  // Log missing icons in development for debugging
  if (process.env.NODE_ENV === "development") {
    console.warn(`[Fumadocs] Icon "${icon}" not found in lucide-react icons`);
  }

  return;
}

export const source = loader({
  icon(icon) {
    return resolveIcon(icon);
  },
  source: docs.toFumadocsSource(),
  baseUrl: "/docs",
  plugins: [lucideIconsPlugin(), openapiPlugin()],
});

export const apiReferencesSource = loader({
  icon(icon) {
    return resolveIcon(icon);
  },
  source: apiReferences.toFumadocsSource(),
  baseUrl: "/api-references",
  plugins: [lucideIconsPlugin(), openapiPlugin()],
});

// Helper function to get page image for API references
export function getPageImage(page: InferPageType<typeof apiReferencesSource>) {
  const segments = [...page.slugs, "image.png"];
  return {
    segments,
    url: `/og/api-references/${segments.join("/")}`,
  };
}

// Helper function to get LLM text for API references
type AnyPage =
  | InferPageType<typeof source>
  | InferPageType<typeof apiReferencesSource>;

export async function getLLMText(page: AnyPage) {
  const processed = await page.data.getText("processed");
  return `# ${page.data.title} (${page.url})

${processed}`;
}

export function getAllPages(): AnyPage[] {
  return [...source.getPages(), ...apiReferencesSource.getPages()];
}
