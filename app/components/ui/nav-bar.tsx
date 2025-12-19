"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import type * as React from "react";

export default function CustomNavBar() {
  return (
    <NavigationMenu.Root className="relative z-10 flex w-full justify-center">
      <NavigationMenu.List className="flex items-center gap-2">
        <NavigationMenu.Item>
          <Link
            className={triggerClassName}
            href="/docs/getting-started/introduction"
          >
            Documentation
          </Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <Link className={triggerClassName} href="/api-references/rest-api/v2">
            API References
          </Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={triggerClassName}>
            Resources
            <NavigationMenu.Icon className="transition-transform duration-200 ease-in-out data-[popup-open]:rotate-180">
              <ChevronDown className="h-3 w-3" />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className={contentClassName}>
            <ul className="grid w-[600px] grid-cols-2 gap-2 p-2">
              <ListItem
                href="https://fieldnation.com/resource-library?s=&fldn_content_type=6&fldn_content_category=&fldn_work_type="
                title={
                  <span className="inline-flex items-center gap-1.5">
                    Field Nation Blogs
                    <ArrowUpRight className="size-3.5" />
                  </span>
                }
              >
                Announcements & Updates
              </ListItem>
              <ListItem
                href="#"
                title={
                  <span className="flex items-center gap-2">
                    Developer Portal
                    <span className="whitespace-nowrap rounded-full border border-fd-primary/30 bg-fd-primary/10 px-1.5 py-0.5 font-medium text-[10px] text-fd-primary leading-none">
                      Coming Soon
                    </span>
                  </span>
                }
              >
                Main Developer Hub
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={triggerClassName}>
            For LLMs
            <NavigationMenu.Icon className="transition-transform duration-200 ease-in-out data-[popup-open]:rotate-180">
              <ChevronDown className="h-3 w-3" />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className={contentClassName}>
            <ul className="grid w-[600px] grid-cols-2 gap-2 p-2">
              <ListItem
                href="/llms/llms.txt"
                rel="noopener noreferrer"
                target="_blank"
                title={
                  <span className="inline-flex items-center gap-1.5">
                    llms.txt
                    <ArrowUpRight className="size-3.5" />
                  </span>
                }
              >
                Outline of the documentation
              </ListItem>
              <ListItem
                href="/llms/llms-full.txt"
                rel="noopener noreferrer"
                target="_blank"
                title={
                  <span className="inline-flex items-center gap-1.5">
                    llms-full.txt
                    <ArrowUpRight className="size-3.5" />
                  </span>
                }
              >
                Full text of the documentation
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          className="z-50 box-border h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-[var(--duration)] ease-[var(--easing)]"
          collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
          sideOffset={10}
          style={{
            ["--duration" as string]: "0.2s",
            ["--easing" as string]: "ease",
          }}
        >
          <NavigationMenu.Popup className="data-[ending-style]:easing-[ease] relative h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] rounded-xl border border-border/40 bg-popover/95 text-popover-foreground shadow-xl backdrop-blur-sm transition-[opacity,transform,width,height] duration-[var(--duration)] ease-[var(--easing)] data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:duration-150">
            <NavigationMenu.Arrow className="flex fill-popover/95 stroke-[1px] stroke-border/40 transition-[left] duration-[var(--duration)] ease-[var(--easing)] data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=top]:bottom-[-8px] data-[side=right]:left-[-13px] data-[side=left]:rotate-90 data-[side=right]:-rotate-90 data-[side=top]:rotate-180">
              <ArrowSvg />
            </NavigationMenu.Arrow>
            <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}

const triggerClassName =
  "box-border flex items-center justify-center gap-1.5 h-9 " +
  "px-3 rounded-md bg-transparent text-sm font-medium " +
  "text-muted-foreground transition-colors hover:text-foreground hover:bg-accent/50 " +
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring " +
  "data-[popup-open]:bg-accent/50 data-[popup-open]:text-foreground " +
  "select-none no-underline cursor-pointer";

const contentClassName =
  "p-1 sm:w-max sm:min-w-[400px] sm:w-max " +
  "transition-[opacity,transform,translate] duration-[var(--duration)] ease-[var(--easing)] " +
  "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 " +
  "data-[starting-style]:data-[activation-direction=left]:translate-x-[-10px] " +
  "data-[starting-style]:data-[activation-direction=right]:translate-x-[10px] " +
  "data-[ending-style]:data-[activation-direction=left]:translate-x-[10px] " +
  "data-[ending-style]:data-[activation-direction=right]:translate-x-[-10px]";

interface ListItemProps
  extends Omit<React.ComponentPropsWithoutRef<"a">, "title"> {
  title: React.ReactNode;
  href: string;
}

function ListItem({
  title,
  children,
  href,
  className,
  ...props
}: ListItemProps) {
  return (
    <li>
      <NavigationMenu.Link
        render={
          <Link
            className={`flex h-full select-none flex-col gap-2 rounded-xl border border-fd-border/50 bg-fd-card p-4 no-underline outline-none transition-all duration-200 hover:border-fd-primary/30 hover:bg-fd-accent/50 hover:text-fd-accent-foreground hover:shadow-md focus:bg-fd-accent/50 ${className || ""}`}
            href={href}
            {...props}
          />
        }
      >
        <div className="font-semibold text-foreground text-sm">{title}</div>
        <p className="line-clamp-2 font-normal text-[13px] text-muted-foreground leading-relaxed">
          {children}
        </p>
      </NavigationMenu.Link>
    </li>
  );
}

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg fill="none" height="10" viewBox="0 0 20 10" width="20" {...props}>
      <title>Dropdown Arrow</title>
      <path
        className="fill-inherit"
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
      />
      <path className="fill-inherit" d="M0 10 L2.13172 8 H18.5349 L20 10" />
    </svg>
  );
}
