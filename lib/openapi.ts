import { readFile } from "node:fs/promises";
import { createOpenAPI } from "fumadocs-openapi/server";
import YAML from "yaml";

// Central OpenAPI configuration:
// - Reads local versioned OpenAPI specs
// - Uses a local proxy route to avoid CORS in playground
// - Provides stable schema IDs for multiple specs to avoid ambiguity
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
      "./openapi/rest/v2/openapi.yaml": rest,
      "./openapi/webhooks/v3/openapi.yaml": webhooks,
      // Also provide short IDs for convenience
      rest_v2: rest,
      webhooks_v3: webhooks,
    };
  },
  proxyUrl: "/api/proxy",
});
