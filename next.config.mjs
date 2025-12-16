import { createMDX } from "fumadocs-mdx/next";

const isExport = process.env.NEXT_EXPORT === "true";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Enable static export only when explicitly requested
  output: isExport ? "export" : undefined,
  images: {
    qualities: [100, 75],
    // Required for static export - use unoptimized images
    unoptimized: true,
  },
  // Allow LAN access to dev resources like /_next/* to silence the cross-origin warning
  allowedDevOrigins: [
    "192.168.68.55",
    "192.168.68.55:3000",
    "http://192.168.68.55",
    "http://192.168.68.55:3000",
  ],
  serverExternalPackages: [
    "@takumi-rs/image-response",
    "typescript",
    "twoslash",
  ],
  // Note: rewrites() don't work with static export
  // .mdx files are served as static files from public/ directory
  // The page components detect .mdx requests and call notFound() to allow static file serving
};

const withMDX = createMDX({
  // customise the config file path
  // configPath: "source.config.ts"
});

export default withMDX(config);
