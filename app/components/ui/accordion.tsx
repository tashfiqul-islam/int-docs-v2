import {
  type AccordionMultipleProps,
  type AccordionSingleProps,
  Content,
  Header,
  Item,
  Root,
  Trigger,
} from "@radix-ui/react-accordion";
import { ChevronRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "~/lib/utils";

export const Accordions = ({
  type = "single",
  className,
  defaultValue,
  ...props
}:
  | Omit<AccordionSingleProps, "value" | "onValueChange">
  | Omit<AccordionMultipleProps, "value" | "onValueChange">) => (
  <Root
    className={cn(
      "divide-y divide-fd-border overflow-hidden rounded-lg border bg-fd-card",
      className
    )}
    type={type}
    {...props}
  />
);

export const Accordion = ({
  title,
  className,
  id,
  value = String(title),
  children,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof Item>, "value" | "title"> & {
  title: string | ReactNode;
  value?: string;
}) => (
  <Item className={cn("scroll-m-24", className)} value={value} {...props}>
    <Header
      className="not-prose flex flex-row items-center font-medium text-fd-card-foreground has-focus-visible:bg-fd-accent"
      data-accordion-value={value}
      id={id}
    >
      <Trigger className="group flex flex-1 items-center gap-2 px-3 py-2.5 text-start focus-visible:outline-none">
        <ChevronRight className="size-4 shrink-0 text-fd-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
        {title}
      </Trigger>
    </Header>
    <Content className="overflow-hidden data-[state=closed]:animate-fd-accordion-up data-[state=open]:animate-fd-accordion-down">
      <div className="prose-no-margin px-4 pb-2 text-[15px]">{children}</div>
    </Content>
  </Item>
);
