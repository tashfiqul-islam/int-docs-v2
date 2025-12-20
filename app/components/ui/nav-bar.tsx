"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState, useTransition } from "react";

/**
 * Navigation Bar Component
 */
export default function CustomNavBar() {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [_activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Detect active section based on pathname
  const isActive = (path: string) => pathname.startsWith(path);

  // Handle menu hover with transitions
  const handleMenuHover = (menuId: string | null) => {
    startTransition(() => {
      setActiveMenu(menuId);
    });
  };

  return (
    <div className="flex w-full items-center justify-between lg:justify-center">
      {/* Desktop Navigation - Only rendered on Desktop to avoid context errors */}
      {mounted && isLargeScreen ? (
        <div className="hidden items-center gap-1.5 lg:flex">
          <NavigationMenu.Root
            className="relative z-50"
            onValueChange={(value) => handleMenuHover(value)}
            render={(props) => <div {...props} />}
          >
            <div className="flex items-center gap-1.5">
              {/* Documentation Link */}
              <NavigationMenu.Item render={(props) => <div {...props} />}>
                <Link
                  className={getTriggerClassName(isActive("/docs"))}
                  href="/docs/getting-started/introduction"
                >
                  <motion.span
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    Documentation
                  </motion.span>
                  {isActive("/docs") ? <ActiveIndicator /> : null}
                </Link>
              </NavigationMenu.Item>

              {/* API References Link */}
              <NavigationMenu.Item render={(props) => <div {...props} />}>
                <Link
                  className={getTriggerClassName(isActive("/api-references"))}
                  href="/api-references/rest-api/v2"
                >
                  <motion.span
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    API References
                  </motion.span>
                  {isActive("/api-references") ? <ActiveIndicator /> : null}
                </Link>
              </NavigationMenu.Item>

              {/* Resources Dropdown */}
              <NavigationMenu.Item
                render={(props) => <div {...props} />}
                value="resources"
              >
                <NavigationMenu.Trigger
                  className={getTriggerClassName(false)}
                  onPointerEnter={() => handleMenuHover("resources")}
                  onPointerLeave={() => handleMenuHover(null)}
                >
                  <motion.span
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5"
                    initial={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    Resources
                    <NavigationMenu.Icon className="transition-transform duration-300 ease-out data-popup-open:rotate-180">
                      <ChevronDown className="h-3.5 w-3.5" />
                    </NavigationMenu.Icon>
                  </motion.span>
                </NavigationMenu.Trigger>

                <NavigationMenu.Content
                  className={contentClassName}
                  render={(props) => <div {...props} />}
                >
                  <motion.div
                    animate={{ opacity: 1 }}
                    className="grid w-150 grid-cols-2 gap-3 p-3"
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <ListItem
                      delay={0}
                      href="https://fieldnation.com/resource-library?s=&fldn_content_type=6&fldn_content_category=&fldn_work_type="
                      title={
                        <span className="inline-flex items-center gap-1.5">
                          Field Nation Blogs
                          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      }
                    >
                      Announcements & Updates
                    </ListItem>
                    <ListItem
                      delay={0.05}
                      disabled
                      href="#"
                      title={
                        <span className="flex items-center gap-2">
                          Developer Portal
                          <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-fd-primary/30 bg-fd-primary/10 px-2 py-0.5 font-medium text-[10px] text-fd-primary leading-none">
                            <Sparkles className="size-2.5" />
                            Coming Soon
                          </span>
                        </span>
                      }
                    >
                      Main Developer Hub
                    </ListItem>
                  </motion.div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              {/* For LLMs Dropdown */}
              <NavigationMenu.Item
                render={(props) => <div {...props} />}
                value="llms"
              >
                <NavigationMenu.Trigger
                  className={getTriggerClassName(false)}
                  onPointerEnter={() => handleMenuHover("llms")}
                  onPointerLeave={() => handleMenuHover(null)}
                >
                  <motion.span
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5"
                    initial={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    For LLMs
                    <NavigationMenu.Icon className="transition-transform duration-300 ease-out data-popup-open:rotate-180">
                      <ChevronDown className="h-3.5 w-3.5" />
                    </NavigationMenu.Icon>
                  </motion.span>
                </NavigationMenu.Trigger>

                <NavigationMenu.Content
                  className={contentClassName}
                  render={(props) => <div {...props} />}
                >
                  <motion.div
                    animate={{ opacity: 1 }}
                    className="grid w-150 grid-cols-2 gap-3 p-3"
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <ListItem
                      delay={0}
                      href="/llms/llms.txt"
                      rel="noopener noreferrer"
                      target="_blank"
                      title={
                        <span className="inline-flex items-center gap-1.5">
                          llms.txt
                          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      }
                    >
                      Outline of the documentation
                    </ListItem>
                    <ListItem
                      delay={0.05}
                      href="/llms/llms-full.txt"
                      rel="noopener noreferrer"
                      target="_blank"
                      title={
                        <span className="inline-flex items-center gap-1.5">
                          llms-full.txt
                          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      }
                    >
                      Full text of the documentation
                    </ListItem>
                  </motion.div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            </div>

            {/* Portal for dropdown menus */}
            <NavigationMenu.Portal>
              <NavigationMenu.Positioner
                className="z-50 box-border h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-300 ease-out"
                collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
                sideOffset={12}
                style={{
                  ["--duration" as string]: "0.3s",
                  ["--easing" as string]: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <NavigationMenu.Popup className="relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-xl border border-fd-border/50 bg-fd-popover/98 text-fd-popover-foreground shadow-2xl shadow-black/10 backdrop-blur-md transition-[opacity,transform,width,height] duration-300 ease-out data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-200 dark:shadow-black/30">
                  <NavigationMenu.Arrow className="flex fill-fd-popover/98 stroke-[1.5px] stroke-fd-border/50 transition-[left] duration-300 ease-out data-[side=bottom]:-top-2.25 data-[side=left]:-right-3.5 data-[side=top]:-bottom-2.25 data-[side=right]:-left-3.5 data-[side=left]:rotate-90 data-[side=right]:-rotate-90 data-[side=top]:rotate-180">
                    <ArrowSvg />
                  </NavigationMenu.Arrow>
                  <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden rounded-xl" />
                </NavigationMenu.Popup>
              </NavigationMenu.Positioner>
            </NavigationMenu.Portal>

            {/* Loading indicator */}
            <AnimatePresence>
              {isPending ? (
                <motion.div
                  animate={{ width: "100%", opacity: 1 }}
                  className="absolute -bottom-px left-0 h-0.5 bg-linear-to-r from-fd-primary/0 via-fd-primary to-fd-primary/0"
                  exit={{ opacity: 0 }}
                  initial={{ width: "0%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              ) : null}
            </AnimatePresence>
          </NavigationMenu.Root>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Active Indicator Component
 * Shows a subtle indicator under active navigation items
 */
function ActiveIndicator() {
  return (
    <motion.span
      animate={{ opacity: 1, scale: 1 }}
      className="absolute -bottom-px left-1/2 h-0.5 w-[70%] -translate-x-1/2 rounded-full bg-fd-primary"
      exit={{ opacity: 0, scale: 0.8 }}
      initial={{ opacity: 0, scale: 0.8 }}
      layoutId="activeIndicator"
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 30,
      }}
    />
  );
}

/**
 * Get dynamic trigger class names based on active state
 */
function getTriggerClassName(isActive: boolean): string {
  const baseClasses =
    "relative box-border flex h-9 items-center justify-center gap-1.5 rounded-lg bg-transparent px-3.5 font-medium text-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-1 select-none no-underline cursor-pointer";

  const stateClasses = isActive
    ? "text-fd-foreground bg-fd-accent/70 hover:bg-fd-accent/90"
    : "text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent/50 data-[popup-open]:bg-fd-accent/60 data-[popup-open]:text-fd-foreground";

  return `${baseClasses} ${stateClasses}`;
}

/**
 * Content transition classes for dropdown menus
 */
const contentClassName =
  "p-1.5 transition-[opacity,transform] duration-300 ease-out data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 data-[starting-style]:data-[activation-direction=left]:translate-x-[-12px] data-[starting-style]:data-[activation-direction=right]:translate-x-[12px] data-[ending-style]:data-[activation-direction=left]:translate-x-[12px] data-[ending-style]:data-[activation-direction=right]:translate-x-[-12px]";

/**
 * List Item Props
 */
type ListItemProps = {
  title: ReactNode;
  children: ReactNode;
  href: string;
  delay?: number;
  disabled?: boolean;
  className?: string;
  rel?: string;
  target?: string;
};

/**
 * List Item Component for dropdown menu items
 */
function ListItem({
  title,
  children,
  href,
  delay = 0,
  disabled = false,
  className = "",
  ...props
}: ListItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -10 }}
      onHoverEnd={() => setIsHovered(false)}
      onHoverStart={() => setIsHovered(true)}
      transition={{ duration: 0.3, delay }}
    >
      <NavigationMenu.Link
        render={
          <Link
            className={`group relative flex h-full select-none flex-col gap-2.5 overflow-hidden rounded-xl border border-fd-border/50 bg-fd-card p-4 no-underline outline-none transition-all duration-300 ease-out hover:border-fd-primary/40 hover:bg-fd-accent/50 hover:text-fd-accent-foreground hover:shadow-fd-primary/5 hover:shadow-lg focus-visible:bg-fd-accent/50 focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2 ${
              disabled ? "pointer-events-none opacity-60" : ""
            } ${className}`}
            href={disabled ? "#" : href}
            {...props}
          />
        }
      >
        {/* Hover gradient effect */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-linear-to-br from-fd-primary/5 via-transparent to-fd-primary/5"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-2.5">
          <div className="font-semibold text-fd-foreground text-sm leading-tight">
            {title}
          </div>
          <p className="line-clamp-2 font-normal text-[13px] text-fd-muted-foreground leading-relaxed">
            {children}
          </p>
        </div>

        {/* Hover border glow */}
        <motion.div
          animate={{
            borderColor: isHovered
              ? "rgba(241, 106, 34, 0.2)"
              : "rgba(241, 106, 34, 0)",
          }}
          className="absolute inset-0 rounded-xl border-2 border-fd-primary/0"
          transition={{ duration: 0.3 }}
        />
      </NavigationMenu.Link>
    </motion.div>
  );
}

/**
 * Arrow SVG for dropdown menu pointer
 */
function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg fill="none" height="11" viewBox="0 0 20 11" width="20" {...props}>
      <title>Dropdown Arrow</title>
      <path
        className="fill-inherit"
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V10H18.5349C17.5468 10 16.5936 9.63423 15.8591 8.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
      />
      <path className="stroke-inherit" d="M0 10 L2.13172 8 H18.5349 L20 10" />
    </svg>
  );
}
