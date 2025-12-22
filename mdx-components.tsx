import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Callout } from "fumadocs-ui/components/callout";
import { Card as BaseCard, Cards } from "fumadocs-ui/components/card";
import {
  CodeBlock,
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  Pre,
} from "fumadocs-ui/components/codeblock";
import type { ImageZoomProps } from "fumadocs-ui/components/image-zoom";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Step, Steps } from "fumadocs-ui/components/steps";
import {
  Tab,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { APIPage as BaseAPIPage } from "@/app/components/api-page";
import { Mermaid } from "@/app/components/mdx/mermaid";
import { resolveIcon } from "@/lib/source";

// Custom Card wrapper that resolves icon strings to React elements
function Card({
  icon,
  ...props
}: React.ComponentProps<typeof BaseCard> & {
  icon?: string | React.ReactNode;
}) {
  // If icon is a string, resolve it using the shared icon resolver
  const resolvedIcon = typeof icon === "string" ? resolveIcon(icon) : icon;

  return <BaseCard {...props} icon={resolvedIcon} />;
}

function APIPage(props: React.ComponentProps<typeof BaseAPIPage>) {
  return <BaseAPIPage {...props} />;
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Accordion,
    Accordions,
    Callout,
    CodeBlock,
    CodeBlockTab,
    CodeBlockTabs,
    CodeBlockTabsList,
    CodeBlockTabsTrigger,
    Pre,
    Tab,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Step,
    Steps,
    img: (props: ImageZoomProps) => <ImageZoom {...props} />,
    Mermaid,
    Card,
    Cards,
    APIPage,
    ...components,
  };
}
