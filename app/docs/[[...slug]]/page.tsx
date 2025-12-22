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
import { notFound } from "next/navigation";
import { ClientRedirect } from "@/app/components/client-redirect";
import { LLMActions } from "@/app/components/llm-actions";
import { TypeTable } from "@/app/components/type-table";
import { Accordion, Accordions } from "@/app/components/ui/accordion";
import { source } from "@/lib/source";
import { withBasePath } from "@/lib/utils";
import { getMDXComponents } from "@/mdx-components";

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slugs = resolvedParams.slug ?? [];

  // Handle empty slug - redirect to getting-started/introduction
  if (slugs.length === 0) {
    return <ClientRedirect to="/docs/getting-started/introduction/" />;
  }

  const page = source.getPage(slugs);

  if (!page) {
    notFound();
  }

  const pageData = page.data as {
    body: React.ComponentType<{
      components?: Record<string, React.ComponentType>;
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
        path: `/content/docs/${page.path}?plain=1`,
      }}
      {...lastUpdateProps}
      tableOfContent={{
        style: "clerk",
      }}
      toc={pageData.toc}
    >
      <DocsTitle>{frontmatter.title}</DocsTitle>
      <DocsDescription className="mb-2!">
        {frontmatter.description}
      </DocsDescription>
      <div className="w-fit">
        <LLMActions markdownUrl={withBasePath(`/llms${page.url}.txt`)} />
      </div>
      <hr className="mt-4 border-fd-border" />
      <DocsBody>
        <MDX
          components={
            getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
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
          <DocsCategory tree={source.pageTree as PageTreeRoot} url={page.url} />
        ) : null}
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const params = await source.generateParams();
  // Ensure root /docs is generated for the redirect
  return [...params, { slug: [] }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slugs = resolvedParams.slug ?? [];

  // For /docs (empty slug), use getting-started/introduction metadata
  const page = source.getPage(
    slugs.length === 0 ? ["getting-started", "introduction"] : slugs
  );

  if (!page) {
    notFound();
  }

  const title = `${page.data.title} - Field Nation Integration`;
  const metadataBase = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://developers.fieldnation.com"
  );
  const ogImageUrl = new URL(
    `/og/docs/${slugs.join("/")}/image.webp`,
    metadataBase
  ).toString();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title,
      description: page.data.description,
      url: new URL(page.url, metadataBase).toString(),
      siteName: "Field Nation Developer Platform",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.data.description,
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
