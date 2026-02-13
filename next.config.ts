import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Desactiva la optimización de imágenes en Vercel (evita consumir el límite de transformations).
  // Las imágenes se sirven estáticas; la optimización se hace en local.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
