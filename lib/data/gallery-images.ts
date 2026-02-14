import type { GalleryImage } from "@/components/image-display";

/**
 * Gallery images for the home page: Homes, Constructions, and Aerials.
 * Paths are relative to /public (use leading slash for Next Image).
 */
export const galleryImages: GalleryImage[] = [
  // ——— Homes ———
  {
    id: "home-casa",
    src: "/recurses/casa.webp",
    alt: "SLD suburban community with quality single-family homes and green lawns",
    title: "Our Communities",
    category: "Homes",
  },
  {
    id: "home-casas",
    src: "/recurses/casas.webp",
    alt: "Housing development with modern two-story homes and manicured landscaping",
    title: "Quality Neighborhoods",
    category: "Homes",
  },
  // ——— Constructions ———
  {
    id: "const-ca4",
    src: "/constructions/Ca4.webp",
    alt: "Residential construction site with concrete block walls and scaffolding",
    title: "Work in Progress",
    category: "Constructions",
  },
  {
    id: "const-casas1",
    src: "/constructions/casas/Casas1.webp",
    alt: "New home construction interior with roof trusses and natural light",
    title: "Building Phase",
    category: "Constructions",
  },
  {
    id: "const-casas2",
    src: "/constructions/casas/Casas2.webp",
    alt: "SLD construction site during development",
    title: "Development Site",
    category: "Constructions",
  },
  {
    id: "const-casas3",
    src: "/constructions/casas/Casas3.webp",
    alt: "Residential construction in progress",
    title: "Construction Progress",
    category: "Constructions",
  },
  {
    id: "const-casas4",
    src: "/constructions/casas/Casas4.webp",
    alt: "New home under construction",
    title: "New Build",
    category: "Constructions",
  },
  {
    id: "const-casas5",
    src: "/constructions/casas/Casas5.webp",
    alt: "SLD construction project",
    title: "Project Site",
    category: "Constructions",
  },
  {
    id: "const-casas6",
    src: "/constructions/casas/Casas6.webp",
    alt: "Home construction by Standard Land Development",
    title: "Building Dreams",
    category: "Constructions",
  },
  {
    id: "const-casas7",
    src: "/constructions/casas/Casas7.webp",
    alt: "Residential development construction",
    title: "Development in Progress",
    category: "Constructions",
  },
  // ——— Aerials ———
  {
    id: "aerial-comunidad",
    src: "/constructions/ComunidadC.webp",
    alt: "Aerial view of completed SLD community with homes and landscaping",
    title: "Completed Community",
    category: "Aerials",
  },
  {
    id: "aerial-ca3",
    src: "/constructions/Ca3.webp",
    alt: "Aerial view of suburban neighborhood with modern two-story homes",
    title: "Aerial Neighborhood",
    category: "Aerials",
  },
  {
    id: "aerial-foto",
    src: "/recurses/foto-aerea.webp",
    alt: "Aerial view of SLD development and surrounding area",
    title: "Development Overview",
    category: "Aerials",
  },
];
