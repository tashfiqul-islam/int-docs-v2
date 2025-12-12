import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "@takumi-rs/image-response";
import DocsTemplateV1 from "@takumi-rs/template/docs-template-v1";
import { notFound } from "next/navigation";
import { source } from "@/lib/source";

export const revalidate = false;

function truncate(text: string | undefined, max = 160) {
  if (!text) {
    return "";
  }
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

export function generateStaticParams() {
  const params = source.generateParams();
  return params.map((param) => {
    const slugs = Array.isArray(param) ? param : (param.slug ?? []);
    const slugArray = slugs.map((s) => String(s));
    return { slug: [...slugArray, "image.webp"] };
  });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const resolvedParams = await params;
  const slugs = resolvedParams.slug ?? [];
  const pageSlugs = slugs.slice(0, -1);
  const page = source.getPage(pageSlugs);

  if (!page) {
    return notFound();
  }

  const logoPath = join(process.cwd(), "public", "light", "logo_light.png");
  const logo = readFileSync(logoPath);

  const title = page.data.title ?? "Field Nation Developer Platform";
  const description =
    truncate(page.data.description) || "Field Nation developer documentation";

  return new ImageResponse(
    <DocsTemplateV1
      description={description}
      icon={
        <img
          alt="Field Nation"
          src="logo_light.png"
          style={{ width: "4rem", height: "4rem" }}
        />
      }
      primaryColor="#f16a22"
      primaryTextColor="#f16a22"
      site="Field Nation Developer Platform"
      title={title}
    />,
    {
      persistentImages: [
        {
          src: "logo_light.png",
          data: Buffer.from(logo),
        },
      ],
      width: 1200,
      height: 630,
      format: "webp",
    }
  );
}
