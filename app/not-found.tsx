import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Home, Search } from "lucide-react";
import Link from "next/link";
import { baseOptions } from "@/lib/layout.shared";
import { Button } from "~/components/ui/button";

const emptyTree = { name: "Not Found", children: [] };

const NotFound = () => {
  const base = baseOptions();
  return (
    <DocsLayout nav={base.nav} tree={emptyTree}>
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-16">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-brand) var(--not-found-glow-opacity), transparent) 0%, transparent 70%)",
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 h-(--not-found-glow-size) w-(--not-found-glow-size) -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-brand"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-brand) calc(var(--not-found-glow-opacity) * 100%), transparent) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-8 animate-fade-in-up">
            <h1
              className="relative mb-4 font-bold text-9xl leading-none tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-secondary) 50%, var(--color-brand-200) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient-shift 8s ease infinite",
                backgroundSize: "200% 200%",
              }}
            >
              404
            </h1>
            <div className="absolute inset-0 animate-float">
              <div
                className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, var(--color-brand), transparent)",
                }}
              />
            </div>
          </div>

          <div
            className="mb-12 max-w-md animate-fade-in-up space-y-4"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="font-semibold text-2xl text-fd-foreground">
              Page Not Found
            </h2>
            <p className="text-fd-muted-foreground text-lg leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Let's
              get you back on track.
            </p>
          </div>

          <div
            className="mb-8 flex animate-fade-in-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "0.2s" }}
          >
            <Button asChild className="btn-brand group" size="lg">
              <Link href="/">
                <Home className="mr-2 size-4 transition-transform group-hover:scale-110" />
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              className="border-border/40 bg-fd-card/50 backdrop-blur-sm hover:bg-fd-card/80"
              size="lg"
              variant="outline"
            >
              <Link href="/docs/getting-started/introduction">
                <Search className="mr-2 size-4" />
                Browse Documentation
              </Link>
            </Button>
          </div>

          <div
            className="mt-12 grid animate-fade-in-up grid-cols-1 gap-4 sm:grid-cols-3"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              className="group rounded-xl border border-border/40 bg-fd-card/30 p-4 backdrop-blur-sm transition-all duration-200 hover:border-border/60 hover:bg-fd-card/50 hover:shadow-lg"
              href="/docs/connectors/introduction"
            >
              <div className="mb-2 font-semibold text-fd-foreground text-sm">
                Connectors
              </div>
              <p className="text-fd-muted-foreground text-xs">
                Pre-built integrations for popular platforms
              </p>
            </Link>
            <Link
              className="group rounded-xl border border-border/40 bg-fd-card/30 p-4 backdrop-blur-sm transition-all duration-200 hover:border-border/60 hover:bg-fd-card/50 hover:shadow-lg"
              href="/docs/rest-api/introduction"
            >
              <div className="mb-2 font-semibold text-fd-foreground text-sm">
                REST API
              </div>
              <p className="text-fd-muted-foreground text-xs">
                Programmatic access to Field Nation platform
              </p>
            </Link>
            <Link
              className="group rounded-xl border border-border/40 bg-fd-card/30 p-4 backdrop-blur-sm transition-all duration-200 hover:border-border/60 hover:bg-fd-card/50 hover:shadow-lg"
              href="/docs/webhooks/introduction"
            >
              <div className="mb-2 font-semibold text-fd-foreground text-sm">
                Webhooks
              </div>
              <p className="text-fd-muted-foreground text-xs">
                Real-time event notifications
              </p>
            </Link>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
};

export default NotFound;
