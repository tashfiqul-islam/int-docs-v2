declare const Bun: typeof globalThis.Bun;

import { createMdxPlugin } from "fumadocs-mdx/bun";

Bun.plugin(createMdxPlugin());
