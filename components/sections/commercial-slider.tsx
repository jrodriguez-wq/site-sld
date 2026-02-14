"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ChevronLeft, ChevronRight, Store } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

const commercialImages = [
  "/constructions/Ca1.webp",
  "/constructions/Ca2.webp",
  "/constructions/Ca3.webp",
  "/constructions/Ca4.webp",
  "/constructions/Ca5.webp",
  "/constructions/ComunidadC.webp",
  "/constructions/casas/Casas1.webp",
  "/constructions/casas/Casas2.webp",
  "/constructions/casas/Casas3.webp",
  "/constructions/casas/Casas4.webp",
  "/constructions/casas/Casas5.webp",
  "/constructions/casas/Casas6.webp",
  "/constructions/casas/Casas7.webp",
];

export const CommercialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbnailContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % commercialImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Auto-scroll thumbnails when currentIndex changes (only within container, not page scroll)
  useEffect(() => {
    const activeThumbnail = thumbnailRefs.current[currentIndex];
    const container = thumbnailContainerRef.current;
    
    if (activeThumbnail && container) {
      // Calculate scroll position to center the thumbnail
      const scrollLeft = activeThumbnail.offsetLeft - (container.offsetWidth / 2) + (activeThumbnail.offsetWidth / 2);
      
      // Only scroll within the container, prevent page scroll
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + commercialImages.length) % commercialImages.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % commercialImages.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-[#090040] via-[#2d2c55] to-[#090040] text-white relative">
      <Container>
        <AnimatedSection delay={0.1}>
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#090040] rounded-full blur-3xl" />
          </div>

          {/* Header */}
          <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16 relative z-10">
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <Store className="h-5 w-5 sm:h-6 sm:w-6 text-[#D4AF37]" />
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-2 rounded-full">
                Commercial Spaces
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">
                Our Commercial Projects
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto">
              Discover our commercial construction projects. From retail spaces to business units, we deliver excellence in every build.
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative z-10">
            <div
              className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl group"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Main Image */}
              <div className="relative w-full h-full">
                <Image
                  src={commercialImages[currentIndex]}
                  alt={`Commercial construction project ${currentIndex + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Image Counter */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg">
                  <p className="text-xs sm:text-sm font-bold text-[#090040]">
                    {currentIndex + 1} / {commercialImages.length}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons - Always visible on mobile, hover on desktop */}
              <button
                onClick={handlePrevious}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 sm:bg-white/80 sm:group-hover:bg-white/95 backdrop-blur-md rounded-full p-2.5 sm:p-3 transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl z-10 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-[#090040]" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 sm:bg-white/80 sm:group-hover:bg-white/95 backdrop-blur-md rounded-full p-2.5 sm:p-3 transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl z-10 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#090040]" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="mt-8 sm:mt-10 md:mt-12 mb-4 sm:mb-6">
              <div className="relative px-4 sm:px-6 md:px-8">
                <div 
                  ref={thumbnailContainerRef}
                  className="flex gap-4 sm:gap-5 md:gap-6 justify-start overflow-x-auto overflow-y-hidden overscroll-x-contain custom-scrollbar scroll-smooth py-6 sm:py-8 md:py-10"
                >
                  {commercialImages.map((src, index) => (
                    <button
                      key={src}
                      ref={(el) => {
                        thumbnailRefs.current[index] = el;
                      }}
                      onClick={() => goToSlide(index)}
                      className={`relative w-32 h-24 sm:w-36 sm:h-28 md:w-40 md:h-32 rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 cursor-pointer ${
                        index === currentIndex
                          ? "border-[#090040] opacity-100 shadow-lg ring-2 ring-[#090040]/20"
                          : "border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-300 hover:-translate-y-1 hover:shadow-md"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    >
                      <Image
                        src={src}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
                      />
                      {index === currentIndex && (
                        <div className="absolute inset-0 bg-[#090040]/10" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
};
