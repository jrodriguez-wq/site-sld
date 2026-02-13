"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Share2, Grid3X3, LayoutGrid } from "lucide-react";

// Types
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category?: string;
  width?: number;
  height?: number;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  eyebrow?: string;
  headline?: string;
  highlightedText?: string;
  layout?: "grid" | "masonry";
  columns?: 2 | 3 | 4;
  showCategories?: boolean;
  theme?: "dark" | "light";
  className?: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const lightboxVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const imageZoomVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    transition: { duration: 0.2 } 
  },
};

const ImageGallery = ({
  images,
  eyebrow = "Gallery",
  headline = "Our",
  highlightedText = "Portfolio",
  layout = "grid",
  columns = 3,
  showCategories = true,
  theme = "dark",
  className = "",
}: ImageGalleryProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isZoomed, setIsZoomed] = useState(false);

  const isDark = theme === "dark";

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))];
  
  // Filter images
  const filteredImages = activeCategory === "All" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  // Keyboard navigation
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
  }, [selectedImage, selectedIndex]);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setIsZoomed(false);
  };

  const navigatePrev = useCallback(() => {
    const newIndex = selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
    setIsZoomed(false);
  }, [selectedIndex, filteredImages]);

  const navigateNext = useCallback(() => {
    const newIndex = selectedIndex === filteredImages.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
    setIsZoomed(false);
  }, [selectedIndex, filteredImages]);

  const gridColsClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <>
      <section
        ref={sectionRef}
        className={`
          relative overflow-hidden py-24 sm:py-32
          ${isDark ? "bg-slate-950" : "bg-slate-50"}
          ${className}
        `}
      >
        {/* Background */}
        {isDark && (
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12"
          >
            <div>
              <span className={`
                inline-flex items-center gap-3 mb-4
                text-[11px] font-semibold tracking-[0.25em] uppercase
                ${isDark ? "text-amber-400" : "text-amber-600"}
              `}>
                <span className="w-8 h-px bg-current opacity-50" />
                {eyebrow}
              </span>
              <h2>
                <span 
                  className={`
                    block text-3xl sm:text-4xl lg:text-5xl font-light leading-tight tracking-tight
                    ${isDark ? "text-white" : "text-slate-900"}
                  `}
                  style={{ fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)" }}
                >
                  {headline}
                </span>
                {highlightedText && (
                  <span 
                    className="block mt-1 text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight"
                    style={{ 
                      fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                      background: "linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #f59e0b 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {highlightedText}
                  </span>
                )}
              </h2>
            </div>

            {/* Categories */}
            {showCategories && categories.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`
                      px-5 py-2.5 text-sm font-medium tracking-wide rounded-full transition-all duration-300
                      ${activeCategory === category
                        ? isDark 
                          ? "bg-amber-500 text-slate-950" 
                          : "bg-slate-900 text-white"
                        : isDark 
                          ? "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10" 
                          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`grid ${gridColsClass[columns]} gap-4 sm:gap-6`}
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={imageVariants}
                layout
                className={`
                  group relative overflow-hidden rounded-2xl cursor-pointer
                  ${layout === "masonry" && index % 3 === 0 ? "row-span-2" : ""}
                  ${isDark ? "bg-slate-800" : "bg-slate-200"}
                `}
                onClick={() => openLightbox(image, index)}
              >
                <div className={`relative ${layout === "masonry" && index % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Zoom Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    {image.category && (
                      <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">
                        {image.category}
                      </span>
                    )}
                    {image.title && (
                      <h3 className="text-white font-semibold mt-1">{image.title}</h3>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            variants={lightboxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl"
            onClick={() => {
              setSelectedImage(null);
              setIsZoomed(false);
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedImage(null);
                setIsZoomed(false);
              }}
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigatePrev();
              }}
              className="absolute left-4 sm:left-8 z-10 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateNext();
              }}
              className="absolute right-4 sm:right-8 z-10 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage.id}
                variants={imageZoomVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`
                  relative max-w-[90vw] max-h-[85vh] 
                  ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1600}
                  height={1200}
                  className={`
                    object-contain max-h-[85vh] rounded-lg transition-transform duration-500
                    ${isZoomed ? "scale-150" : "scale-100"}
                  `}
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Bottom Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 to-transparent">
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                <div>
                  {selectedImage.title && (
                    <h3 className="text-white font-semibold text-lg">{selectedImage.title}</h3>
                  )}
                  {selectedImage.category && (
                    <p className="text-white/50 text-sm">{selectedImage.category}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/50 text-sm">
                    {selectedIndex + 1} / {filteredImages.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { ImageGallery };
export type { ImageGalleryProps, GalleryImage };
