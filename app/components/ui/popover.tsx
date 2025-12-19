import { Popover as BasePopover } from "@base-ui/react/popover";
import type * as React from "react";
import { cn } from "~/lib/utils";

function Popover({ ...props }: React.ComponentProps<typeof BasePopover.Root>) {
  return <BasePopover.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof BasePopover.Trigger>) {
  return <BasePopover.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof BasePopover.Popup> & {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner align={align} sideOffset={sideOffset}>
        <BasePopover.Popup
          className={cn(
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in",
            className
          )}
          data-slot="popover-content"
          {...props}
        />
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

// In Base UI 1.0.0, Anchor might not be directly under Popover or might be called differently.
// Usually, Trigger serves as the default anchor. If specific anchor is needed:
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof BasePopover.Trigger>) {
  return <BasePopover.Trigger data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
