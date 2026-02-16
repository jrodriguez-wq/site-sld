import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Imágenes: unoptimized para evitar límite de Vercel; WebP ya generado en local.
  images: {
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  // Tree-shake packages pesados para reducir bundle
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
  },
  // Compresión
  compress: true,
};

export default nextConfig;
