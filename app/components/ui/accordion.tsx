import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { ChevronRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "~/lib/utils";

export const Accordions = ({
  type = "single",
  className,
  ...props
}: Omit<
  ComponentPropsWithoutRef<typeof BaseAccordion.Root>,
  "type" | "multiple"
> & {
  type?: "single" | "multiple";
}) => {
  const isMultiple = type === "multiple";
  return (
    <BaseAccordion.Root
      className={cn(
        "divide-y divide-fd-border overflow-hidden rounded-lg border bg-fd-card",
        className
      )}
      // biome-ignore lint/suspicious/noExplicitAny: Base UI Accordion types for 'multiple' are complex
      multiple={isMultiple as any}
      {...props}
    />
  );
};

export const Accordion = ({
  title,
  className,
  id,
  value = String(title),
  children,
  ...props
}: Omit<
  ComponentPropsWithoutRef<typeof BaseAccordion.Item>,
  "value" | "title"
> & {
  title: string | ReactNode;
  value?: string;
}) => (
  <BaseAccordion.Item
    className={cn("scroll-m-24", className)}
    value={value}
    {...props}
  >
    <BaseAccordion.Header
      className="not-prose flex flex-row items-center font-medium text-fd-card-foreground has-focus-visible:bg-fd-accent"
      id={id}
    >
      <BaseAccordion.Trigger className="group flex flex-1 items-center gap-2 px-3 py-2.5 text-start focus-visible:outline-none">
        <ChevronRight className="size-4 shrink-0 text-fd-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
        {title}
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
    <BaseAccordion.Panel className="overflow-hidden data-[state=closed]:animate-fd-accordion-up data-[state=open]:animate-fd-accordion-down">
      <div className="prose-no-margin px-4 pb-2 text-[15px]">{children}</div>
    </BaseAccordion.Panel>
  </BaseAccordion.Item>
);
