import {
  getPageTreePeers,
  type Root as PageTreeRoot,
} from "fumadocs-core/page-tree";
// biome-ignore lint/performance/noNamespaceImport: Twoslash exports multiple components that need to be spread
import * as Twoslash from "fumadocs-twoslash/ui";
import { Card, Cards } from "fumadocs-ui/components/card";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { ArrowBigRight, BookOpen, Hand, Shovel } from "lucide-react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { apiReferencesSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { LLMActions } from "~/components/llm-actions";
import { TypeTable } from "~/components/type-table";
import { Accordion, Accordions } from "~/components/ui/accordion";

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slugs = resolvedParams.slug ?? [];

  // Handle empty slug (root /api-references) - redirect to REST API index
  if (slugs.length === 0) {
    redirect("/api-references/rest-api/v2");
  }

  const page = apiReferencesSource.getPage(slugs);

  if (!page) {
    notFound();
  }

  const pageData = page.data as {
    body: React.ComponentType<{
      components?: Record<string, React.ComponentType<Record<string, unknown>>>;
    }>;
    lastModified?: string;
    toc?: Array<{ url: string; title: string; depth: number }>;
    title: string;
    description?: string;
    index?: boolean;
  };
  const MDX = pageData.body;
  const frontmatter = page.data;

  const lastUpdateProps = pageData.lastModified
    ? { lastUpdate: new Date(pageData.lastModified) }
    : {};

  return (
    <DocsPage
      editOnGithub={{
        owner: "fieldnation",
        repo: "integration-docs",
        sha: "main",
        path: `/content/api-references/${page.path}?plain=1`,
      }}
      {...lastUpdateProps}
      tableOfContent={{
        style: "clerk",
      }}
      toc={pageData.toc}
    >
      <DocsTitle>{frontmatter.title}</DocsTitle>
      <DocsDescription className="!mb-2">
        {frontmatter.description}
      </DocsDescription>
      <div className="w-fit">
        <LLMActions
          markdownUrl={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/llms${page.url}.txt`}
        />
      </div>
      <hr className="mt-4 border-fd-border" />
      <DocsBody>
        <MDX
          components={
            getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(apiReferencesSource, page),
              ...Twoslash,
              Hand,
              BookOpen,
              ArrowBigRight,
              Shovel,
              DocsCategory,
              Tabs,
              Tab,
              Accordion,
              Accordions,
              TypeTable,
            }) as Record<string, React.ComponentType<Record<string, unknown>>>
          }
        />
        {pageData.index ? (
          <DocsCategory
            tree={apiReferencesSource.pageTree as PageTreeRoot}
            url={page.url}
          />
        ) : null}
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const params = apiReferencesSource.generateParams();
  // For static export, we must include the empty slug case for optional catch-all routes
  // The empty slug will be handled by redirecting in the Page component
  return [{ slug: [] }, ...params];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slugs = resolvedParams.slug ?? [];

  const page = apiReferencesSource.getPage(slugs);

  if (!page) {
    notFound();
  }

  const title = `${page.data.title} - Field Nation Integration`;
  const metadataBase = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://developers.fieldnation.com"
  );
  const ogImageUrl = new URL(
    `/og/api-references/${slugs.join("/")}/image.webp`,
    metadataBase
  ).toString();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title,
      description: page.data.description,
      images: [ogImageUrl],
    },
    twitter: {
      images: [ogImageUrl],
    },
  };
}

function DocsCategory({ tree, url }: { tree: PageTreeRoot; url: string }) {
  return (
    <Cards>
      {getPageTreePeers(tree, url).map((peer) => (
        <Card href={peer.url} key={peer.url} title={peer.name}>
          {peer.description}
        </Card>
      ))}
    </Cards>
  );
}
