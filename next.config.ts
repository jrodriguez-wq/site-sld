import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization: use Next.js optimizer (Vercel/host). Set NEXT_IMAGE_UNOPTIMIZED=1 to disable if needed.
  images: {
    unoptimized: process.env.NEXT_IMAGE_UNOPTIMIZED === "1",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  // Long-lived cache: videos (and other static assets) are cached 1 year. When the user
  // navigates away and comes back, the browser uses the cached file and does not re-download.
  async headers() {
    return [
      {
        source: "/SLD-video1.mp4",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/SLD-video2.MP4",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/houses/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/recurses/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/constructions/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/hero/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/modelos-optimized/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/logos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/blog/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      // Next.js compiled JS/CSS bundles — safe forever (content hash in filename)
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      // Optimized images from /_next/image
      {
        source: "/_next/image",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      // Favicon and manifest
      {
        source: "/favicon/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      // HTML pages: serve cached instantly, revalidate in background
      {
        source: "/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=60, stale-while-revalidate=86400" }],
      },
    ];
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-select",
      "@radix-ui/react-slider",
      "@radix-ui/react-tabs",
    ],
    optimizeCss: true,
  },
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
