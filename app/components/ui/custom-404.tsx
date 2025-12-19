import { FileQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import appWindowIcon from "~/assets/icons/app-window.svg";
import { buttonVariants } from "~/components/ui/button";
import { IconFolderOpen } from "~/components/ui/icons";
import { cn } from "~/lib/utils";

export function Custom404() {
  return (
    <section className="grid min-h-screen place-items-center bg-fd-background px-4">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-fd-primary/20 blur-xl" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-fd-primary/20 bg-fd-primary/10 shadow-xl">
                <FileQuestion
                  className="h-12 w-12 text-fd-primary"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fd-primary/20 bg-fd-primary/10 px-4 py-1.5 font-semibold text-fd-primary text-sm">
            Error 404
          </div>

          <h1 className="mb-4 font-bold text-5xl text-fd-foreground leading-tight md:text-6xl lg:text-7xl">
            Page Not Found
          </h1>

          <h2 className="mb-6 font-semibold text-fd-muted-foreground text-xl md:text-2xl">
            Sorry, we misplaced that page!
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-base text-fd-muted-foreground leading-relaxed md:text-lg">
            Our digital librarian seems to have misplaced the page you
            requested. The page you're looking for might have been moved,
            deleted, or doesn't exist.
          </p>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              className={cn(
                buttonVariants({ size: "lg" }),
                "group h-12 gap-2 rounded-lg px-8 font-semibold text-base shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              )}
              href="/"
              style={{
                backgroundColor: "var(--color-fd-primary)",
                color: "var(--color-fd-primary-foreground)",
                boxShadow: "0 8px 24px -4px hsl(var(--color-fd-primary)/0.3)",
              }}
            >
              <Image
                alt="Home"
                className="brightness-0 invert"
                height={16}
                src={appWindowIcon}
                width={16}
              />
              Go to Homepage
            </Link>
            <Link
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 gap-2 rounded-lg border-2 px-8 font-semibold text-base backdrop-blur-sm transition-all duration-300 hover:border-fd-primary/40 hover:bg-fd-accent/50"
              )}
              href="/docs/getting-started/introduction"
            >
              <IconFolderOpen className="size-4" />
              View Documentation
            </Link>
          </div>

          <div className="border-fd-border border-t pt-8">
            <p className="mb-4 font-medium text-fd-muted-foreground text-sm">
              Quick Links
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-fd-primary hover:bg-fd-primary/10 hover:text-fd-primary/80"
                )}
                href="/docs/api/clients"
              >
                Client API
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-fd-primary hover:bg-fd-primary/10 hover:text-fd-primary/80"
                )}
                href="/docs/webhooks"
              >
                Webhook
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-fd-primary hover:bg-fd-primary/10 hover:text-fd-primary/80"
                )}
                href="/docs/connectors"
              >
                FSM Connectors
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-fd-primary hover:bg-fd-primary/10 hover:text-fd-primary/80"
                )}
                href="/docs/api-references"
              >
                API References
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
