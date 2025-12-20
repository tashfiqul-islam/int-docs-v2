import { ImageResponse } from "@takumi-rs/image-response";
import DocsTemplateV1 from "@takumi-rs/template/docs-template-v1";
import { notFound } from "next/navigation";
import { apiReferencesSource } from "@/lib/source";

export const revalidate = false;

function truncate(text: string | undefined, max = 160) {
  if (!text) {
    return "";
  }
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

export function generateStaticParams() {
  const params = apiReferencesSource.generateParams();
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
  const page = apiReferencesSource.getPage(pageSlugs);

  if (!page) {
    return notFound();
  }

  const title = page.data.title ?? "Field Nation API Reference";
  const description =
    truncate(page.data.description) || "Field Nation REST & Webhooks reference";

  return new ImageResponse(
    <DocsTemplateV1
      description={description}
      icon={
        <div
          style={{
            width: "4rem",
            height: "4rem",
            backgroundColor: "#f16a22",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "white",
          }}
        >
          FN
        </div>
      }
      primaryColor="#f16a22"
      primaryTextColor="#f16a22"
      site="Field Nation API Reference"
      title={title}
    />,
    {
      width: 1200,
      height: 630,
      format: "webp",
    }
  );
}
