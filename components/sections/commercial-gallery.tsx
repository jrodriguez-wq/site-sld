"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { X, ChevronLeft, ChevronRight, Store, Building2, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

// Commercial images (root constructions folder)
const commercialImages = [
  "/constructions/Ca1.webp",
  "/constructions/Ca2.webp",
  "/constructions/Ca3.webp",
  "/constructions/Ca4.webp",
  "/constructions/Ca5.webp",
  "/constructions/ComunidadC.webp",
];

// Residential images (casas folder)
const residentialImages = [
  "/constructions/casas/Casas1.webp",
  "/constructions/casas/Casas2.webp",
  "/constructions/casas/Casas3.webp",
  "/constructions/casas/Casas4.webp",
  "/constructions/casas/Casas5.webp",
  "/constructions/casas/Casas6.webp",
  "/constructions/casas/Casas7.webp",
];

interface CommercialGalleryProps {
  variant?: "full" | "home";
}

export const CommercialGallery = ({ variant = "full" }: CommercialGalleryProps) => {
  const isHome = variant === "home";
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"commercial" | "residential">(
    isHome ? "commercial" : "commercial"
  );

  const currentImages = useMemo(() => {
    return selectedCategory === "commercial" ? commercialImages : residentialImages;
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedImage(null);
  }, [selectedCategory]);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % currentImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + currentImages.length) % currentImages.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowRight") {
        setSelectedImage((prev) => {
          if (prev === null) return null;
          return (prev + 1) % currentImages.length;
        });
      } else if (e.key === "ArrowLeft") {
        setSelectedImage((prev) => {
          if (prev === null) return null;
          return (prev - 1 + currentImages.length) % currentImages.length;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentImages.length]);

  return (
    <>
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] text-white relative scroll-mt-28">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#090040] rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <AnimatedSection>
            {/* Header */}
            <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16 md:mb-20">
              <div className="inline-block mb-4 sm:mb-6">
                <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-2 rounded-full">
                  {isHome ? "Commercial Spaces" : "Our Projects"}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">
                  {isHome ? "Our Commercial Projects" : "Construction Gallery"}
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto">
                {isHome
                  ? "Discover our commercial construction projects. From retail spaces to business units, we deliver excellence in every build."
                  : "Explore our commercial spaces and residential homes. See the quality and craftsmanship in every project we complete."}
              </p>
            </div>

            {/* Category Tabs - Hide on home, show only commercial */}
            {!isHome && (
            <div className="flex justify-center mb-12">
              <div className="inline-flex rounded-2xl bg-white/10 backdrop-blur-sm p-2 border-2 border-white/20 shadow-lg">
                <button
                  onClick={() => setSelectedCategory("commercial")}
                  className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    selectedCategory === "commercial"
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white shadow-lg"
                      : "text-white/80 hover:text-white hover:bg-white/10 hover:-translate-y-0.5"
                  }`}
                >
                  <Store className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Commercial</span>
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                    {commercialImages.length}
                  </span>
                </button>
                <button
                  onClick={() => setSelectedCategory("residential")}
                  className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    selectedCategory === "residential"
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white shadow-lg"
                      : "text-white/80 hover:text-white hover:bg-white/10 hover:-translate-y-0.5"
                  }`}
                >
                  <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Residential</span>
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                    {residentialImages.length}
                  </span>
                </button>
              </div>
            </div>
            )}

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {currentImages.map((src, index) => (
                <div
                  key={src}
                  onClick={() => openModal(index)}
                  className="group relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-[#090040]/20"
                >
                  <Image
                    src={src}
                    alt={`${selectedCategory === "commercial" ? "Commercial" : "Residential"} construction ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                    <span className="text-xs font-semibold text-[#090040]">View Full</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                      <p className="text-xs font-semibold text-gray-900">
                        {selectedCategory === "commercial" ? "Commercial" : "Residential"} Project
                      </p>
                      <p className="text-[10px] text-gray-600 mt-0.5">
                        Image {index + 1} of {currentImages.length}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isHome && (
              <div className="mt-12 flex justify-center">
                <Link
                  href="/commercial"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#D4AF37] text-[#090040] font-semibold hover:bg-[#B8860B] hover:text-white transition-colors"
                >
                  View All Commercial Projects
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            )}
          </AnimatedSection>
        </Container>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in-0 duration-300"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Image Gallery"
        >
          <div
            className="relative bg-white rounded-2xl sm:rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-200/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Close Button */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 sm:p-5 md:p-6 bg-white/95 backdrop-blur-sm border-b border-gray-200">
              <div className="flex items-center gap-3 sm:gap-4">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                  {selectedCategory === "commercial" ? "Commercial" : "Residential"} Project
                </h3>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  {selectedImage + 1} / {currentImages.length}
                </span>
              </div>
              <button
                onClick={closeModal}
                className="p-2 sm:p-2.5 rounded-lg bg-white/80 hover:bg-gray-100 transition-all duration-300 cursor-pointer hover:scale-110 border border-gray-200"
                aria-label="Close Gallery"
                type="button"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900" />
              </button>
            </div>

            {/* Main Image Container */}
            <div className="relative bg-gray-100 h-[75vh] sm:h-[80vh] md:h-[85vh] flex items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28 px-4 sm:px-6 md:px-8">
              <Image
                src={currentImages[selectedImage]}
                alt={`${selectedCategory === "commercial" ? "Commercial" : "Residential"} construction ${selectedImage + 1}`}
                fill
                className="object-contain p-4 sm:p-6 md:p-8"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                priority
              />

              {/* Navigation Buttons */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        prevImage();
                      }
                    }}
                    className="absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white backdrop-blur-sm p-3 sm:p-3.5 rounded-full hover:scale-110 transition-all duration-300 border border-gray-200 shadow-lg z-20 cursor-pointer"
                    aria-label="Previous image"
                    type="button"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        nextImage();
                      }
                    }}
                    className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white backdrop-blur-sm p-3 sm:p-3.5 rounded-full hover:scale-110 transition-all duration-300 border border-gray-200 shadow-lg z-20 cursor-pointer"
                    aria-label="Next image"
                    type="button"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900" />
                  </button>
                </>
              )}
            </div>

            {/* Footer with Image Counter */}
            {currentImages.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-5 md:p-6 bg-white/95 backdrop-blur-sm border-t border-gray-200">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex gap-1.5 sm:gap-2">
                    {currentImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(index);
                        }}
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          index === selectedImage
                            ? "w-8 sm:w-10 bg-[#090040]"
                            : "w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                        type="button"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
