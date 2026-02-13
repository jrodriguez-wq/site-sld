"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Container } from "@/components/ui/container";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category?: string;
  width?: number;
  height?: number;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  eyebrow?: string;
  headline?: string;
  highlightedText?: string;
  layout?: "grid" | "masonry";
  columns?: 2 | 3 | 4;
  showCategories?: boolean;
  /** Order of category filter buttons; must include "All". Unlisted categories appended. */
  categoryOrder?: string[];
  theme?: "dark" | "light";
  className?: string;
  useContainer?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const imageVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

const lightboxVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const imageZoomVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE_OUT } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

const ImageGallery = ({
  images,
  eyebrow = "Gallery",
  headline = "Our",
  highlightedText = "Portfolio",
  layout = "grid",
  columns = 3,
  showCategories = true,
  categoryOrder,
  theme = "light",
  className = "",
  useContainer = true,
}: ImageGalleryProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isZoomed, setIsZoomed] = useState(false);

  const isDark = theme === "dark";

  const uniqueCategories: string[] = Array.from(
    new Set(
      images
        .map((img) => (img.category ?? "").trim())
        .filter((c): c is string => c.length > 0)
    )
  );
  const categories: string[] = categoryOrder?.length
    ? ["All", ...categoryOrder.filter((c) => c !== "All" && uniqueCategories.includes(c)), ...uniqueCategories.filter((c) => !categoryOrder.includes(c))]
    : ["All", ...uniqueCategories];
  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((img) => (img.category ?? "").trim() === activeCategory.trim());

  const navigatePrev = useCallback(() => {
    setSelectedIndex((prev) => {
      const next = prev === 0 ? filteredImages.length - 1 : prev - 1;
      setSelectedImage(filteredImages[next]);
      setIsZoomed(false);
      return next;
    });
  }, [filteredImages]);

  const navigateNext = useCallback(() => {
    setSelectedIndex((prev) => {
      const next = prev === filteredImages.length - 1 ? 0 : prev + 1;
      setSelectedImage(filteredImages[next]);
      setIsZoomed(false);
      return next;
    });
  }, [filteredImages]);

  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
        setIsZoomed(false);
      }
      if (e.key === "ArrowLeft") navigatePrev();
      if (e.key === "ArrowRight") navigateNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage, navigatePrev, navigateNext]);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setIsZoomed(false);
  };

  const gridColsClass = {
    2: "grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6",
    3: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6",
    4: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6",
  };
  const gridClass = layout === "grid" ? gridColsClass[columns] : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5";

  const Wrapper = useContainer ? Container : "div";
  const wrapperClassName = useContainer ? "relative z-10" : "relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12";

  return (
    <>
      <section
        ref={sectionRef}
        aria-labelledby="gallery-heading"
        className={`
          relative overflow-hidden py-14 sm:py-20 md:py-24 lg:py-28
          ${isDark ? "bg-linear-to-br from-[#090040] via-[#2d2c55] to-[#090040]" : "bg-slate-50"}
          ${className}
        `}
      >
        {(isDark && (
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        )) || (
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #090040 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        )}

        <Wrapper className={wrapperClassName}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 sm:mb-12">
            <div>
              <span
                className={`
                  inline-flex items-center gap-3 mb-3 sm:mb-4
                  text-[11px] font-semibold tracking-[0.2em] uppercase
                  ${isDark ? "text-[#D4AF37]" : "text-slate-500"}
                `}
              >
                <span className="w-8 h-px bg-current opacity-50" />
                {eyebrow}
              </span>
              <h2 id="gallery-heading">
                <span
                  className={`
                    block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight
                    ${isDark ? "text-white" : "text-slate-900"}
                  `}
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {headline}
                </span>
                {highlightedText && (
                  <span
                    className="block mt-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight"
                    style={{
                      fontFamily: "var(--font-serif)",
                      background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {highlightedText}
                  </span>
                )}
              </h2>
            </div>

            {showCategories && categories.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                    aria-label={category === "All" ? "Show all images" : `Filter by ${category}`}
                    className={`
                      px-4 py-2.5 text-sm font-medium tracking-wide rounded-full transition-all duration-300
                      ${activeCategory === category
                        ? isDark
                          ? "bg-[#D4AF37] text-[#090040]"
                          : "bg-[#090040] text-white"
                        : isDark
                          ? "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="visible"
            animate="visible"
            className={`grid ${layout === "grid" ? gridColsClass[columns] : gridClass}`}
          >
            {filteredImages.length === 0 ? (
              <div
                className={`col-span-full py-16 text-center rounded-2xl ${isDark ? "text-white/70 bg-white/5" : "text-slate-500 bg-slate-100"}`}
              >
                <p className="text-sm font-medium">No images in this category.</p>
                <button
                  type="button"
                  onClick={() => setActiveCategory("All")}
                  className={`mt-3 text-sm font-semibold underline underline-offset-2 ${isDark ? "text-[#D4AF37] hover:text-[#FFD700]" : "text-[#090040] hover:text-[#2d2c55]"}`}
                >
                  View all
                </button>
              </div>
            ) : (
              filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  variants={imageVariants}
                  initial="visible"
                  animate="visible"
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${image.title || image.alt}`}
                  onClick={() => openLightbox(image, index)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), openLightbox(image, index))}
                  className={`
                    group relative overflow-hidden rounded-2xl cursor-pointer
                    ${layout === "masonry" && index % 3 === 0 ? "row-span-2" : ""}
                    ${isDark ? "bg-white/5" : "bg-slate-200"}
                  `}
                >
                  <div className={`relative ${layout === "masonry" && index % 3 === 0 ? "aspect-3/4" : "aspect-4/3"}`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#090040]/80 via-[#090040]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div
                        className="w-14 h-14 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500"
                        style={{ background: "rgba(255,255,255,0.1)" }}
                      >
                        <ZoomIn className="w-6 h-6 text-white" aria-hidden />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      {image.category && (
                        <span className="text-[#D4AF37] text-xs font-semibold tracking-wider uppercase">
                          {image.category}
                        </span>
                      )}
                      {(image.title || image.alt) && (
                        <h3 className="text-white font-semibold mt-1">{image.title || image.alt}</h3>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
          </motion.div>
        </Wrapper>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            variants={lightboxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#090040]/95 backdrop-blur-xl"
            onClick={() => {
              setSelectedImage(null);
              setIsZoomed(false);
            }}
          >
            <button
              type="button"
              onClick={() => {
                setSelectedImage(null);
                setIsZoomed(false);
              }}
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigatePrev();
              }}
              className="absolute left-4 sm:left-8 z-10 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateNext();
              }}
              className="absolute right-4 sm:right-8 z-10 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage.id}
                variants={imageZoomVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`relative w-full max-w-[90vw] h-[70vh] sm:h-[75vh] max-h-[85vh] ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className={`object-contain rounded-lg transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
                  sizes="90vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-linear-to-t from-[#090040] to-transparent">
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                <div>
                  {(selectedImage.title || selectedImage.alt) && (
                    <h3 className="text-white font-semibold text-lg">{selectedImage.title || selectedImage.alt}</h3>
                  )}
                  {selectedImage.category && (
                    <p className="text-white/50 text-sm">{selectedImage.category}</p>
                  )}
                </div>
                <span className="text-white/50 text-sm">
                  {selectedIndex + 1} / {filteredImages.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { ImageGallery };
