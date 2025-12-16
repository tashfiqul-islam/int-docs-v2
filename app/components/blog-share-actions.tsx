"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover";
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";
import { Check, ChevronDown, Copy, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const optionVariants = (className?: string) =>
  `inline-flex items-center gap-2 rounded-lg p-2 text-sm hover:bg-fd-accent hover:text-fd-accent-foreground [&_svg]:size-4 ${className ?? ""}`;

type BlogShareActionsProps = {
  /**
   * URL to share
   */
  shareUrl: string;
  /**
   * Title of the blog post
   */
  title: string;
};

export function BlogShareActions({ shareUrl, title }: BlogShareActionsProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [checked, onClick] = useCopyButton(async () => {
    const fullUrl =
      typeof window !== "undefined"
        ? new URL(shareUrl, window.location.origin).toString()
        : shareUrl;
    await navigator.clipboard.writeText(fullUrl);
  });

  const socialItems = useMemo(() => {
    const fullUrl =
      typeof window !== "undefined"
        ? encodeURIComponent(
            new URL(shareUrl, window.location.origin).toString()
          )
        : encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);

    const isDark = mounted && resolvedTheme === "dark";
    const xLogo = isDark
      ? "/logo/socials/x_dark.svg"
      : "/logo/socials/x_light.svg";

    return [
      {
        title: "Share on X",
        href: `https://twitter.com/intent/tweet?url=${fullUrl}&text=${encodedTitle}`,
        icon: (
          <Image
            alt="X"
            className="size-4"
            height={16}
            src={xLogo}
            width={16}
          />
        ),
      },
      {
        title: "Share on Reddit",
        href: `https://www.reddit.com/submit?url=${fullUrl}&title=${encodedTitle}`,
        icon: (
          <Image
            alt="Reddit"
            className="size-4"
            height={16}
            src="/logo/socials/reddit.svg"
            width={16}
          />
        ),
      },
      {
        title: "Share on Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`,
        icon: (
          <Image
            alt="Facebook"
            className="size-4"
            height={16}
            src="/logo/socials/facebook-icon.svg"
            width={16}
          />
        ),
      },
      {
        title: "Share on Discord",
        href: `https://discord.com/channels/@me?content=${fullUrl}`,
        icon: (
          <Image
            alt="Discord"
            className="size-4"
            height={16}
            src="/logo/socials/discord.svg"
            width={16}
          />
        ),
      },
    ];
  }, [shareUrl, title, mounted, resolvedTheme]);

  return (
    <div
      className="inline-flex items-center overflow-hidden rounded-md shadow-sm"
      style={{
        backgroundColor: "var(--color-fd-primary)",
        color: "var(--color-fd-primary-foreground)",
      }}
    >
      {/* Left side: Copy Link Button */}
      <button
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "sm",
            className:
              "gap-2 rounded-none text-inherit hover:bg-white/10 [&_svg]:size-3.5",
          })
        )}
        onClick={onClick}
        style={{ borderRight: "1px solid rgba(255, 255, 255, 0.5)" }}
        type="button"
      >
        {checked ? <Check /> : <Copy />}
        Share
      </button>

      {/* Right side: Social Dropdown */}
      <Popover>
        <PopoverTrigger
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "gap-2 rounded-none text-inherit hover:bg-white/10",
            })
          )}
          type="button"
        >
          <ChevronDown className="size-3.5" />
        </PopoverTrigger>
        <PopoverContent align="end" className="flex flex-col p-2">
          {socialItems.map((item) => (
            <a
              className={cn(optionVariants())}
              href={item.href}
              key={item.href}
              rel="noreferrer noopener"
              target="_blank"
            >
              {item.icon}
              {item.title}
              <ExternalLinkIcon className="ms-auto size-3.5 text-fd-muted-foreground" />
            </a>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
