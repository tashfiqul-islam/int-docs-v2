import type { InferPageType } from "fumadocs-core/source";
import {
  type FileObject,
  printErrors,
  scanURLs,
  validateFiles,
} from "next-validate-link";
import { source } from "@/lib/source";

async function checkLinks() {
  // Get all pages from docs source
  const docsPages = source.getPages();

  // Get headings for docs pages
  const docsHeadings = docsPages.map((page) => ({
    value: {
      slug: page.slugs,
    },
    hashes: getHeadings(page),
  }));

  const scanned = await scanURLs({
    // pick a preset for your React framework
    preset: "next",
    populate: {
      "docs/[[...slug]]": docsHeadings,
    },
  });

  // Get files from docs source
  const docsFiles = await getDocsFiles(docsPages);
  const allFiles = [...docsFiles];

  printErrors(
    await validateFiles(allFiles, {
      scanned,
      // check `href` attributes in different MDX components
      markdown: {
        components: {
          Card: { attributes: ["href"] },
        },
      },
      // check relative paths
      checkRelativePaths: "as-url",
    }),
    true
  );
}

function getHeadings(page: InferPageType<typeof source>): string[] {
  const toc =
    "toc" in page.data ? (page.data.toc as Array<{ url: string }>) : [];
  return toc.map((item: { url: string }) => item.url.slice(1));
}

function getDocsFiles(
  pages: InferPageType<typeof source>[]
): Promise<FileObject[]> {
  const promises = pages.map(
    async (page): Promise<FileObject> => ({
      path: page.absolutePath ?? page.url,
      content: await (
        page.data as { getText: (type: string) => Promise<string> }
      ).getText("raw"),
      url: page.url,
      data: page.data,
    })
  );

  return Promise.all(promises);
}

checkLinks().catch((error) => {
  console.error("Error checking links:", error);
  process.exit(1);
});
