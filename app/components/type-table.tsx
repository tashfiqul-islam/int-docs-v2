import { cva } from "class-variance-authority";
import Link from "fumadocs-core/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ParameterNode {
  name: string;
  description: ReactNode;
}

export interface TypeNode {
  /**
   * Additional description of the field
   */
  description?: ReactNode;

  /**
   * type signature (short)
   */
  type: ReactNode;

  /**
   * type signature (full)
   */
  typeDescription?: ReactNode;

  /**
   * Optional `href` for the type
   */
  typeDescriptionLink?: string;

  default?: ReactNode;

  required?: boolean;
  deprecated?: boolean;

  parameters?: ParameterNode[];

  returns?: ReactNode;
}

const keyVariants = cva("text-fd-primary", {
  variants: {
    deprecated: {
      true: "text-fd-primary/50 line-through",
    },
  },
});

export function TypeTable({ type }: { type: Record<string, TypeNode> }) {
  return (
    <div className="@container my-6 flex flex-col overflow-hidden rounded-2xl border bg-fd-card p-1 text-fd-card-foreground text-sm">
      <div className="not-prose flex items-center px-3 py-1 font-medium text-fd-muted-foreground">
        <p className="w-[25%]">Prop</p>
        <p className="w-[25%]">Type</p>
        <p className="@max-xl:hidden w-[50%]">Description</p>
      </div>
      {Object.entries(type).map(([key, value]) => (
        <Item item={value} key={key} name={key} />
      ))}
    </div>
  );
}

function Item({
  name,
  item: {
    required = false,
    deprecated,
    type,
    typeDescriptionLink,
    description,
  },
}: {
  name: string;
  item: TypeNode;
}) {
  return (
    <div className="group not-prose relative flex w-full flex-row items-center overflow-hidden rounded-xl px-3 py-2 text-start hover:bg-fd-accent">
      <code
        className={cn(
          keyVariants({
            deprecated,
            className: "w-[25%] min-w-0 shrink-0 pe-2 font-medium",
          })
        )}
      >
        {name}
        {!required && "?"}
      </code>
      {typeDescriptionLink ? (
        <Link
          className="w-[25%] min-w-0 shrink-0 pe-2 font-mono underline"
          href={typeDescriptionLink}
        >
          {type}
        </Link>
      ) : (
        <span className="w-[25%] min-w-0 shrink-0 pe-2 font-mono">{type}</span>
      )}
      <p className="@max-lg:hidden w-[50%] min-w-0">{description}</p>
    </div>
  );
}
