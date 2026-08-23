import { getCloudinaryImageUrl } from "@/lib/cloudinary";

/**
 * Working photography only.
 * `/houses/*` is empty on disk — never use it for PageHero.
 * `/hero/*` lives on Cloudinary (see data/cloudinary-urls.generated.ts).
 */
export const SITE_IMAGES = {
  homeHero: getCloudinaryImageUrl("/hero/1w5a1489-e5.webp"),
  models: getCloudinaryImageUrl("/hero/aurora.webp"),
  interiors: getCloudinaryImageUrl("/hero/1w5a0814-1.webp"),
  elevation: getCloudinaryImageUrl("/hero/1w5a1505-e5.webp"),
  kitchen: getCloudinaryImageUrl("/hero/1w5a0754-e4.webp"),
  aerial: "/recurses/foto-aerea.webp",
  community: "/constructions/ComunidadC.webp",
  construction: "/constructions/Ca1.webp",
  neighborhood: "/recurses/casas.webp",
  finishedHome: "/recurses/casa.webp",
} as const;
