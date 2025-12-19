import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const isExport = process.env.NEXT_EXPORT === "true";

const config: NextConfig = {
  // React strict mode - enabled by default in App Router
  reactStrictMode: true,

  // React Compiler (New in Next.js 16) - automatic memoization for better performance
  reactCompiler: true,

  // Enable static export only when explicitly requested
  output: isExport ? "export" : undefined,

  // Required for GitHub Pages to resolve routes correctly (e.g. /docs -> /docs/index.html)
  trailingSlash: true,

  // Base path for GitHub Pages deployment
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,

  // Image optimization configuration
  images: {
    // Multiple quality levels for different use cases
    qualities: [100, 75],
    // Required for static export - use unoptimized images
    unoptimized: true,
  },

  // Allow LAN access to dev resources like /_next/* to silence cross-origin warnings
  allowedDevOrigins: [
    "192.168.68.55",
    "192.168.68.55:3000",
    "http://192.168.68.55",
    "http://192.168.68.55:3000",
  ],

  // Packages that should not be bundled by Next.js
  // Note: 'typescript' and 'twoslash' are already auto-excluded by Next.js
  // but we keep them explicit for clarity (required for fumadocs-twoslash)
  serverExternalPackages: [
    "@takumi-rs/image-response",
    "typescript",
    "twoslash",
  ],

  // Note: rewrites() don't work with static export
  // .mdx files are served as static files from public/ directory
};

const withMDX = createMDX();

export default withMDX(config);
