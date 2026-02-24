/**
 * Resuelve rutas lógicas de imágenes de modelos a URLs de Cloudinary.
 * Solo las rutas presentes en el mapeo (hero + modelos-optimized) devuelven URL de Cloudinary;
 * el resto se devuelven como ruta local.
 */

import { CLOUDINARY_PATH_TO_URL } from "@/data/cloudinary-urls.generated";

/**
 * Devuelve la URL de Cloudinary para una ruta lógica si existe en el mapeo;
 * si no, devuelve la misma ruta (para servir desde public).
 */
export const getCloudinaryImageUrl = (localPath: string): string => {
  if (!localPath) return localPath;
  const normalized = localPath.startsWith("/") ? localPath : `/${localPath}`;
  return CLOUDINARY_PATH_TO_URL[localPath] ?? CLOUDINARY_PATH_TO_URL[normalized] ?? localPath;
};
