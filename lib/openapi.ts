import { readFile } from "node:fs/promises";
import { createOpenAPI } from "fumadocs-openapi/server";
import YAML from "yaml";

// Central OpenAPI configuration:
// - Reads local versioned OpenAPI specs
// - Uses a local proxy route to avoid CORS in playground
// - Provides stable schema IDs for multiple specs to avoid ambiguity
// Helper to remove single newlines that break rendering, but keep paragraphs
const removeSingleNewlines = (str: string) =>
  str.replace(/(?<!\n)\n(?!\n)/g, " ");

// Type definition for recursive OpenAPI structure
type OpenApiNode =
  | string
  | number
  | boolean
  | null
  | OpenApiNode[]
  | { [key: string]: OpenApiNode };

// Recursive function to sanitize description and summary fields
const sanitizeSpec = (obj: OpenApiNode): OpenApiNode => {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeSpec);
  }
  if (obj !== null && typeof obj === "object") {
    const newObj: { [key: string]: OpenApiNode } = {};
    for (const [key, value] of Object.entries(obj)) {
      if (
        (key === "description" || key === "summary") &&
        typeof value === "string"
      ) {
        newObj[key] = removeSingleNewlines(value);
      } else {
        newObj[key] = sanitizeSpec(value);
      }
    }
    return newObj;
  }
  return obj;
};

export const openapi = createOpenAPI({
  async input() {
    const rest = YAML.parse(
      await readFile("./openapi/rest/v2/openapi.yaml", "utf8")
    );
    const webhooks = YAML.parse(
      await readFile("./openapi/webhooks/v3/openapi.yaml", "utf8")
    );
    return {
      // Schema IDs that match the document paths used in generated MDX files
      "./openapi/rest/v2/openapi.yaml": sanitizeSpec(rest),
      "./openapi/webhooks/v3/openapi.yaml": sanitizeSpec(webhooks),
    };
  },
  // No proxy - browser makes direct requests to the API
  // Requires the Field Nation API to have proper CORS headers
  // (api-sandbox.fndev.net already supports this)
});
