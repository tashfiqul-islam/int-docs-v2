import {
  rehypeCodeDefaultOptions,
  remarkMdxMermaid,
} from "fumadocs-core/mdx-plugins";
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import { transformerTwoslash } from "fumadocs-twoslash";
import { createFileSystemTypesCache } from "fumadocs-twoslash/cache-fs";
import z from "zod";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      index: z.boolean().default(false),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export const apiReferences = defineDocs({
  dir: "content/api-references",
  docs: {
    schema: frontmatterSchema.extend({
      index: z.boolean().default(false),
      icon: z.string().optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  plugins: [lastModified()],
  mdxOptions: {
    remarkPlugins: [remarkMdxMermaid],
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      langs: [
        // JavaScript/TypeScript
        "ts",
        "tsx",
        "js",
        "jsx",
        "javascript",
        "typescript",

        // Backend languages
        "python",
        "py",
        "php",
        "java",
        "apex",

        // Shell/CLI
        "bash",
        "sh",
        "shell",
        "zsh",

        // Data formats
        "json",
        "jsonnet",
        "yaml",
        "yml",
        "xml",
        "properties",
        "ini",

        // Database
        "sql",
      ],
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash({
          typesCache: createFileSystemTypesCache({
            dir: ".next/twoslash",
            cwd: process.cwd(),
          }),
        }),
      ],
    },
  },
});
