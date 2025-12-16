declare module "fumadocs-mdx:collections/server" {
  import type { loader } from "fumadocs-core/source";

  export const docs: {
    toFumadocsSource(): ReturnType<typeof loader>["source"];
  };

  export const apiReferences: {
    toFumadocsSource(): ReturnType<typeof loader>["source"];
  };

  export const blog: {
    toFumadocsSource(): ReturnType<typeof loader>["source"];
  };
}
