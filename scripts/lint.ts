import type { InferPageType } from "fumadocs-core/source";
import {
  type FileObject,
  printErrors,
  scanURLs,
  validateFiles,
} from "next-validate-link";
import { apiReferencesSource, source } from "@/lib/source";

async function checkLinks() {
  // Get all pages from docs source
  const docsPages = source.getPages();
  const apiPages = apiReferencesSource.getPages();
  const allPages = [...docsPages, ...apiPages];

  // Get headings for docs pages

  const scanned = await scanURLs({
    // pick a preset for your React framework
    preset: "next",
  });

  // Manually populate the scanned URLs with our docs pages
  // This avoids issues with populate key matching
  for (const page of allPages) {
    // Map takes (url -> metadata), we use empty object for metadata
    scanned.urls.set(page.url, {});
  }

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
