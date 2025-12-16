import { Calendar, User } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/source";
import blogBanner from "~/assets/blog-banner.png";
import { BlogShareActions } from "~/components/blog-share-actions";

type BlogPageData = {
  body: React.ComponentType<{
    components?: Record<string, React.ComponentType<Record<string, unknown>>>;
  }>;
  lastModified?: string;
  toc?: Array<{ url: string; title: string; depth: number }>;
  title: string;
  description?: string;
  author?: string;
  date?: Date;
  tags?: string[];
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slugs = resolvedParams.slug ?? [];

  // Handle empty slug (root /blog) - show blog index
  if (slugs.length === 0) {
    return <BlogIndex />;
  }

  const page = blogPosts.getPage(slugs);

  if (!page) {
    notFound();
  }

  const pageData = page.data as BlogPageData;
  const MDX = pageData.body;

  return (
    <main className="min-h-screen bg-fd-background">
      {/* Individual post page */}
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 lg:px-8">
        {/* Metadata */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
          {pageData.author ? (
            <div className="flex items-center gap-2">
              <User
                className="size-4"
                style={{ color: "var(--color-fd-primary)" }}
              />
              <span style={{ color: "var(--color-fd-primary)" }}>
                {pageData.author}
              </span>
            </div>
          ) : null}
          {pageData.date ? (
            <div className="flex items-center gap-2">
              <Calendar
                className="size-4"
                style={{ color: "var(--color-fd-primary)" }}
              />
              <time
                dateTime={pageData.date.toISOString()}
                style={{ color: "var(--color-fd-primary)" }}
              >
                {pageData.date.toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </time>
            </div>
          ) : null}
        </div>

        {/* Title */}
        <h1 className="mb-4 font-bold text-3xl text-fd-foreground leading-tight tracking-tight md:text-4xl">
          {pageData.title}
        </h1>

        {/* Description */}
        {pageData.description ? (
          <p className="mb-8 text-fd-muted-foreground text-lg leading-relaxed">
            {pageData.description}
          </p>
        ) : null}

        {/* Actions */}
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <BlogShareActions shareUrl={page.url} title={pageData.title} />
          <Link
            className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-4 py-2 font-medium text-fd-foreground text-sm transition-colors hover:bg-fd-accent"
            href="/blog"
          >
            ← Back to Blog
          </Link>
        </div>

        {/* Divider */}
        <hr className="mb-10 border-fd-border" />

        {/* Content */}
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <MDX />
        </article>
      </div>
    </main>
  );
}

function BlogIndex() {
  const posts = blogPosts.getPages();

  // Sort by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dataA = a.data as BlogPageData;
    const dataB = b.data as BlogPageData;
    const dateA = dataA.date ? new Date(dataA.date).getTime() : 0;
    const dateB = dataB.date ? new Date(dataB.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <main className="min-h-screen bg-fd-background">
      {/* Hero Banner - Contained with padding and rounded corners */}
      <section className="px-4 pt-6 md:px-6 lg:px-8">
        <div className="relative mx-auto h-[200px] max-w-[var(--fd-layout-width)] overflow-hidden rounded-2xl md:h-[280px]">
          {/* Background Image */}

          <Image
            alt="Field Nation Developer Blog"
            className="absolute inset-0 h-full w-full object-cover"
            fill
            placeholder="blur"
            priority
            src={blogBanner}
          />
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Banner Content - Positioned at bottom left */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
            <h1 className="mb-2 font-bold font-mono text-3xl text-white md:text-4xl">
              Field Nation Blog
            </h1>
            <p className="max-w-lg text-sm text-white/80 md:text-base">
              Latest announcements and updates from Field Nation.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid - Separate Section */}
      <section className="bg-fd-background py-16">
        <div className="mx-auto max-w-[var(--fd-layout-width)] px-4 md:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedPosts.map((post) => {
              const data = post.data as BlogPageData;
              return (
                <Link
                  className="group flex flex-col rounded-xl border border-fd-border bg-fd-card p-5 transition-all duration-300 hover:border-fd-primary/40 hover:shadow-fd-primary/5 hover:shadow-xl"
                  href={post.url}
                  key={post.url}
                >
                  <h2 className="mb-2 font-semibold text-fd-foreground leading-snug transition-colors group-hover:text-fd-primary">
                    {data.title}
                  </h2>
                  {data.description ? (
                    <p className="mb-4 line-clamp-2 flex-1 text-fd-muted-foreground text-sm leading-relaxed">
                      {data.description}
                    </p>
                  ) : null}
                  {data.date ? (
                    <time
                      className="mt-auto text-xs"
                      dateTime={data.date.toISOString()}
                      style={{ color: "var(--color-fd-primary)" }}
                    >
                      {data.date.toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </time>
                  ) : null}
                </Link>
              );
            })}
          </div>

          {sortedPosts.length === 0 ? (
            <p className="py-12 text-center text-fd-muted-foreground">
              No blog posts yet. Check back soon!
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  const params = blogPosts.generateParams();
  return [{ slug: [] }, ...params];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slugs = resolvedParams.slug ?? [];

  if (slugs.length === 0) {
    return {
      title: "Developer Blog | Field Nation",
      description:
        "Latest announcements and updates from Field Nation developer team.",
    };
  }

  const page = blogPosts.getPage(slugs);

  if (!page) {
    notFound();
  }

  const pageData = page.data as BlogPageData;

  return {
    title: `${pageData.title} | Field Nation Blog`,
    description: pageData.description,
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      type: "article",
    },
  };
}
